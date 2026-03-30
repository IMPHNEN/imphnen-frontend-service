{
  description = "Imphnen Frontend Service - Nx Monorepo";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    let
      npmDepsHash = "sha256-6O36QDvjiD7j5MgBhID3+5IeJ47MUeK/025ZTKD0ltU=";

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
          nativeBuildInputs = with pkgs; [ nodejs_22 python3 ];
          buildPhase = ''
            runHook preBuild
            export NX_DAEMON=false HOME=$TMPDIR CI=true NO_COLOR=1 TERM=dumb
            export NX_SKIP_NX_CACHE=true NX_TASKS_RUNNER_DYNAMIC_OUTPUT=false NX_NATIVE=false
            ./node_modules/.bin/nx build landing --output-style=static
            runHook postBuild
          '';
          installPhase = ''
            runHook preInstall
            mkdir -p $out/bin $out/share/landing
            cp -r dist/apps/landing/.next/standalone/* $out/share/landing/
            mkdir -p $out/share/landing/apps/landing/public
            cp -r dist/apps/landing/public/* $out/share/landing/apps/landing/public/ || true
            mkdir -p $out/share/landing/dist/apps/landing/.next/static
            cp -r dist/apps/landing/.next/static/* $out/share/landing/dist/apps/landing/.next/static/
            cat > $out/bin/imphnen-landing <<EOF
            #!${pkgs.bash}/bin/bash
            cd $out/share/landing
            exec ${pkgs.nodejs_22}/bin/node --jitless apps/landing/server.js "\$@"
            EOF
            chmod +x $out/bin/imphnen-landing
            runHook postInstall
          '';
          dontNpmBuild = true;
        };

      mkLandingModule = { config, lib, pkgs, ... }:
        let cfg = config.services.imphnen-landing; in {
          options.services.imphnen-landing = {
            enable = lib.mkEnableOption "Imphnen Landing Page";
            port = lib.mkOption { type = lib.types.port; default = 3000; };
            hostname = lib.mkOption { type = lib.types.str; default = "0.0.0.0"; };
            package = lib.mkOption { type = lib.types.package; default = self.packages.${pkgs.system}.landing; };
            openFirewall = lib.mkOption { type = lib.types.bool; default = false; };
            environmentFile = lib.mkOption { type = lib.types.nullOr lib.types.path; default = null; };
          };
          config = lib.mkIf cfg.enable {
            systemd.services.imphnen-landing = {
              description = "Imphnen Landing Page";
              wantedBy = [ "multi-user.target" ];
              after = [ "network.target" ];
              environment = {
                NODE_ENV = "production";
                PORT = toString cfg.port;
                HOSTNAME = cfg.hostname;
              };
              serviceConfig = {
                Type = "simple";
                ExecStart = "${cfg.package}/bin/imphnen-landing";
                Restart = "on-failure";
                RestartSec = "5s";
                DynamicUser = true;
                NoNewPrivileges = true;
                ProtectSystem = "strict";
                ProtectHome = true;
                PrivateTmp = true;
                ProtectKernelTunables = true;
                ProtectKernelModules = true;
                ProtectControlGroups = true;
                RestrictAddressFamilies = [ "AF_INET" "AF_INET6" "AF_UNIX" ];
                RestrictNamespaces = true;
                LockPersonality = true;
                MemoryDenyWriteExecute = true;
                RestrictRealtime = true;
                RestrictSUIDSGID = true;
              } // lib.optionalAttrs (cfg.environmentFile != null) {
                EnvironmentFile = cfg.environmentFile;
              };
            };
            networking.firewall.allowedTCPPorts = lib.mkIf cfg.openFirewall [ cfg.port ];
          };
        };

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
        landing = mkLandingModule;
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
