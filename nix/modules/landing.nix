# NixOS Module for Imphnen Landing
{ self }:

{ config, lib, pkgs, ... }:

let
  cfg = config.services.imphnen-landing;
in {
  options.services.imphnen-landing = {
    enable = lib.mkEnableOption "Imphnen Landing Page";

    port = lib.mkOption {
      type = lib.types.port;
      default = 3000;
      description = "Port to run the landing server on";
    };

    hostname = lib.mkOption {
      type = lib.types.str;
      default = "0.0.0.0";
      description = "Hostname to bind to";
    };

    package = lib.mkOption {
      type = lib.types.package;
      default = self.packages.${pkgs.system}.landing;
      description = "The landing package to use";
    };

    openFirewall = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Open firewall for the landing port";
    };

    environmentFile = lib.mkOption {
      type = lib.types.nullOr lib.types.path;
      default = null;
      description = "Environment file for secrets";
    };
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

        # Hardening
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
}
