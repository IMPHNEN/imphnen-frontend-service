{
  description = "Imphnen Frontend Service - Nx Monorepo";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };

        # NPM dependencies hash (update with: nix run nixpkgs#prefetch-npm-deps -- package-lock.json)
        npmDepsHash = "sha256-6O36QDvjiD7j5MgBhID3+5IeJ47MUeK/025ZTKD0ltU=";

        mkViteApp = import ./nix/mkViteApp.nix {
          inherit pkgs npmDepsHash;
          src = ./.;
        };

        landingApp = import ./nix/landing.nix {
          inherit pkgs npmDepsHash;
          src = ./.;
        };

      in
      {
        packages = {
          backoffice = mkViteApp {
            name = "backoffice";
            buildScript = "backoffice:build";
          };
          gacha = mkViteApp {
            name = "gacha";
            buildScript = "gacha:build";
          };
          dimentorin = mkViteApp {
            name = "dimentorin";
            buildScript = "dimentorin:build";
          };
          hackathon = mkViteApp {
            name = "hackathon";
            buildScript = "hackathon:build";
          };
          infra = mkViteApp {
            name = "infra";
            buildScript = "infra:build";
          };
          qrcampaign = mkViteApp {
            name = "qrcampaign";
            buildScript = "qrcampaign:build";
          };
          landing = landingApp;
          default = self.packages.${system}.landing;
        };

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
            bun
            git
            jq
          ];

          shellHook = ''
            export PATH="$PWD/node_modules/.bin:$PATH"
          '';
        };
      }
    )
    // {
      nixosModules = {
        landing = import ./nix/modules/landing.nix { inherit self; };
        backoffice = import ./nix/modules/static-app.nix { inherit self; } { appName = "backoffice"; };
        gacha = import ./nix/modules/static-app.nix { inherit self; } { appName = "gacha"; };
        dimentorin = import ./nix/modules/static-app.nix { inherit self; } { appName = "dimentorin"; };
        hackathon = import ./nix/modules/static-app.nix { inherit self; } { appName = "hackathon"; };
        infra = import ./nix/modules/static-app.nix { inherit self; } { appName = "infra"; };
        qrcampaign = import ./nix/modules/static-app.nix { inherit self; } { appName = "qrcampaign"; };

        all =
          {
            config,
            lib,
            pkgs,
            ...
          }:
          {
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

      overlays.default = final: prev: {
        imphnen = {
          landing = self.packages.${final.system}.landing;
          backoffice = self.packages.${final.system}.backoffice;
          gacha = self.packages.${final.system}.gacha;
          dimentorin = self.packages.${final.system}.dimentorin;
          hackathon = self.packages.${final.system}.hackathon;
          infra = self.packages.${final.system}.infra;
          qrcampaign = self.packages.${final.system}.qrcampaign;
          mkHackathonWithEnv =
            envVars:
            import ./nix/mkViteApp.nix
              {
                pkgs = final;
                src = self;
                npmDepsHash = "sha256-6O36QDvjiD7j5MgBhID3+5IeJ47MUeK/025ZTKD0ltU=";
              }
              {
                name = "hackathon";
                buildScript = "hackathon:build";
                inherit envVars;
              };
        };
      };
    };
}
