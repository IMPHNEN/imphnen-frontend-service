{
  description = "Imphnen Frontend Service - Nx Monorepo";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        # NPM dependencies hash (update with: nix run nixpkgs#prefetch-npm-deps -- package-lock.json)
        npmDepsHash = "sha256-xmG0ej6GJk1HIFFmrB9CpovNA20sJ7RanFLMBCxKdy0=";

        # Import helpers
        mkViteApp = import ./nix/mkViteApp.nix {
          inherit pkgs npmDepsHash;
          src = ./.;
        };

        landingApp = import ./nix/landing.nix {
          inherit pkgs npmDepsHash;
          src = ./.;
        };

      in {
        packages = {
          # Static Vite apps
          backoffice = mkViteApp { name = "backoffice"; buildScript = "backoffice:build"; };
          gacha = mkViteApp { name = "gacha"; buildScript = "gacha:build"; };
          dimentorin = mkViteApp { name = "dimentorin"; buildScript = "dimentorin:build"; };
          hackathon = mkViteApp { name = "hackathon"; buildScript = "hackathon:build"; };
          infra = mkViteApp { name = "infra"; buildScript = "infra:build"; };
          qrcampaign = mkViteApp { name = "qrcampaign"; buildScript = "qrcampaign:build"; };

          # Next.js app
          landing = landingApp;

          # Default package
          default = self.packages.${system}.landing;
        };

        # Development shell
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
            nodePackages.npm
            bun

            # Useful dev tools
            git
            jq
          ];

          shellHook = ''
            echo "🚀 Imphnen Frontend Development Shell"
            echo "Node.js: $(node --version)"
            echo "npm: $(npm --version)"
            echo ""
            echo "Available commands:"
            echo "  npm install     - Install dependencies"
            echo "  nx dev <app>    - Start development server"
            echo "  nx build <app>  - Build an app"
            echo ""
            echo "Apps: landing, backoffice, gacha, dimentorin, hackathon, qrcampaign"
            echo ""
            echo "Build packages with:"
            echo "  nix build .#landing"
            echo "  nix build .#backoffice"
            echo "  nix build .#gacha"
            echo "  nix build .#dimentorin"
            echo "  nix build .#hackathon"
            echo "  nix build .#qrcampaign"
          '';
        };
      }
    ) // {
      # NixOS modules for deployment
      nixosModules = {
        landing = import ./nix/modules/landing.nix { inherit self; };

        backoffice = import ./nix/modules/static-app.nix { inherit self; } { appName = "backoffice"; };
        gacha = import ./nix/modules/static-app.nix { inherit self; } { appName = "gacha"; };
        dimentorin = import ./nix/modules/static-app.nix { inherit self; } { appName = "dimentorin"; };
        hackathon = import ./nix/modules/static-app.nix { inherit self; } { appName = "hackathon"; };
        infra = import ./nix/modules/static-app.nix { inherit self; } { appName = "infra"; };
        qrcampaign = import ./nix/modules/static-app.nix { inherit self; } { appName = "qrcampaign"; };

        # All-in-one module that enables all apps
        all = { config, lib, pkgs, ... }: {
          imports = [
            self.nixosModules.landing
            self.nixosModules.backoffice
            self.nixosModules.gacha
            self.nixosModules.dimentorin
            self.nixosModules.hackathon
            self.nixosModules.infra
            self.nixosModules.qrcampaign
          ];
        };
      };

      # Overlay for easy integration
      overlays.default = final: prev: {
        imphnen = {
          landing = self.packages.${final.system}.landing;
          backoffice = self.packages.${final.system}.backoffice;
          gacha = self.packages.${final.system}.gacha;
          dimentorin = self.packages.${final.system}.dimentorin;
          hackathon = self.packages.${final.system}.hackathon;
          infra = self.packages.${final.system}.infra;
          qrcampaign = self.packages.${final.system}.qrcampaign;
          # Function to build hackathon with custom environment variables (e.g., Supabase)
          mkHackathonWithEnv = envVars: import ./nix/mkViteApp.nix {
            pkgs = final;
            src = self;
            npmDepsHash = "sha256-xmG0ej6GJk1HIFFmrB9CpovNA20sJ7RanFLMBCxKdy0=";
          } { name = "hackathon"; buildScript = "hackathon:build"; inherit envVars; };
        };
      };
    };
}
