# NixOS Module for Static Vite Apps (nginx-based)
{ self }:

{ appName }:

{ config, lib, pkgs, ... }:

let
  cfg = config.services."imphnen-${appName}";
in {
  options.services."imphnen-${appName}" = {
    enable = lib.mkEnableOption "Imphnen ${appName}";

    domain = lib.mkOption {
      type = lib.types.str;
      description = "Domain name for the app";
    };

    package = lib.mkOption {
      type = lib.types.package;
      default = self.packages.${pkgs.system}.${appName};
      description = "The ${appName} package to use";
    };

    enableSSL = lib.mkOption {
      type = lib.types.bool;
      default = true;
      description = "Enable ACME SSL";
    };

    extraLocations = lib.mkOption {
      type = lib.types.attrsOf lib.types.anything;
      default = {};
      description = "Additional nginx locations";
    };

    extraConfig = lib.mkOption {
      type = lib.types.lines;
      default = "";
      description = "Extra nginx configuration";
    };
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
          "/" = {
            tryFiles = "$uri $uri/ /index.html";
          };

          # Cache static assets
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
}
