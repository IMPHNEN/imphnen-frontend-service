{
  description = "Imphnen Frontend Service - Nx Monorepo";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    let
      npmDepsHash = "sha256-zcM+H9fwvwQzug8pPs4VPIY0WmOmaCQKJeLZSS1JjQY=";

      mkViteApp = { pkgs, src }: { name, buildScript, envVars ? {} }:
        pkgs.buildNpmPackage {
          pname = "imphnen-${name}";
          version = "0.0.1";
          inherit src npmDepsHash;
          npmFlags = [ "--legacy-peer-deps" ];
          makeCacheWritable = true;
          nativeBuildInputs = with pkgs; [ nodejs_22 util-linux ];
          buildPhase = ''
            runHook preBuild
            export NX_DAEMON=false HOME=$TMPDIR CI=true NO_COLOR=1 TERM=dumb
            export NX_SKIP_NX_CACHE=true NX_TASKS_RUNNER_DYNAMIC_OUTPUT=false NX_NATIVE=false
            ${pkgs.lib.concatStringsSep "\n" (pkgs.lib.mapAttrsToList (k: v: "export ${k}=\"${v}\"") envVars)}
            script -q -c "./node_modules/.bin/nx build ${name} --output-style=static" /dev/null || true
            test -d dist/apps/${name}
            runHook postBuild
          '';
          installPhase = ''
            runHook preInstall
            mkdir -p $out
            cp -r dist/apps/${name}/* $out/
            runHook postInstall
          '';
          dontNpmBuild = true;
        };

      mkLandingApp = { pkgs, src }:
        pkgs.buildNpmPackage {
          pname = "imphnen-landing";
          version = "0.0.1";
          inherit src npmDepsHash;
          npmFlags = [ "--legacy-peer-deps" ];
          makeCacheWritable = true;
          nativeBuildInputs = with pkgs; [ nodejs_22 util-linux ];
          buildPhase = ''
            runHook preBuild
            export NX_DAEMON=false HOME=$TMPDIR CI=true NO_COLOR=1 TERM=dumb
            export NX_SKIP_NX_CACHE=true NX_TASKS_RUNNER_DYNAMIC_OUTPUT=false NX_NATIVE=false
            script -q -c "./node_modules/.bin/nx build landing --output-style=static" /dev/null || true
            test -d dist/apps/landing
            runHook postBuild
          '';
          installPhase = ''
            runHook preInstall
            mkdir -p $out
            cp -r dist/apps/landing/* $out/
            runHook postInstall
          '';
          dontNpmBuild = true;
        };

      mkLandingModule = mkStaticAppModule "landing";

      mkStaticAppModule = appName: { config, lib, pkgs, ... }:
        let cfg = config.services."imphnen-${appName}"; in {
          options.services."imphnen-${appName}" = {
            enable = lib.mkEnableOption "Imphnen ${appName}";
            domain = lib.mkOption { type = lib.types.str; };
            package = lib.mkOption { type = lib.types.package; default = self.packages.${pkgs.system}.${appName}; };
            enableSSL = lib.mkOption { type = lib.types.bool; default = true; };
            extraLocations = lib.mkOption { type = lib.types.attrsOf lib.types.anything; default = {}; };
            extraConfig = lib.mkOption { type = lib.types.lines; default = ""; };
          };
          config = lib.mkIf cfg.enable {
            services.nginx = {
              enable = true;
              recommendedGzipSettings = true;
              recommendedOptimisation = true;
              recommendedProxySettings = true;
              recommendedTlsSettings = true;
              virtualHosts.${cfg.domain} = {
                forceSSL = cfg.enableSSL;
                enableACME = cfg.enableSSL;
                root = cfg.package;
                locations = {
                  "/" = { tryFiles = "$uri $uri/ /index.html"; };
                  "~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$" = {
                    tryFiles = "$uri =404";
                    extraConfig = ''
                      expires 1y;
                      add_header Cache-Control "public, immutable";
                    '';
                  };
                } // cfg.extraLocations;
                extraConfig = cfg.extraConfig;
              };
            };
          };
        };

    in
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        buildViteApp = mkViteApp { inherit pkgs; src = ./.; };
      in {
        packages = {
          backoffice = buildViteApp { name = "backoffice"; buildScript = "backoffice:build"; };
          gacha = buildViteApp { name = "gacha"; buildScript = "gacha:build"; };
          dimentorin = buildViteApp { name = "dimentorin"; buildScript = "dimentorin:build"; };
          hackathon = buildViteApp { name = "hackathon"; buildScript = "hackathon:build"; };
          infra = buildViteApp { name = "infra"; buildScript = "infra:build"; };
          qrcampaign = buildViteApp { name = "qrcampaign"; buildScript = "qrcampaign:build"; };
          landing = mkLandingApp { inherit pkgs; src = ./.; };
          default = self.packages.${system}.landing;
        };

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [ nodejs_22 bun git jq ];
          shellHook = ''
            export PATH="$PWD/node_modules/.bin:$PATH"
          '';
        };
      }
    ) // {
      nixosModules = {
        landing = mkStaticAppModule "landing";
        backoffice = mkStaticAppModule "backoffice";
        gacha = mkStaticAppModule "gacha";
        dimentorin = mkStaticAppModule "dimentorin";
        hackathon = mkStaticAppModule "hackathon";
        infra = mkStaticAppModule "infra";
        qrcampaign = mkStaticAppModule "qrcampaign";
        all = { ... }: {
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
          mkHackathonWithEnv = envVars:
            mkViteApp { pkgs = final; src = self; } {
              name = "hackathon";
              buildScript = "hackathon:build";
              inherit envVars;
            };
        };
      };
    };
}
