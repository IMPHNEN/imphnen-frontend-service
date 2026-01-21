# Example: How to use in imphnen-infrastructure
#
# In your imphnen-infrastructure flake.nix:
#
# {
#   inputs = {
#     nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
#     imphnen-frontend = {
#       url = "github:your-org/imphnen-frontend-service";
#       # Or use local path during development:
#       # url = "path:/path/to/imphnen-frontend-service";
#     };
#   };
#
#   outputs = { self, nixpkgs, imphnen-frontend, ... }: {
#     nixosConfigurations.your-server = nixpkgs.lib.nixosSystem {
#       system = "x86_64-linux";
#       modules = [
#         # Import all modules at once
#         imphnen-frontend.nixosModules.all
#
#         # Or import individually:
#         # imphnen-frontend.nixosModules.landing
#         # imphnen-frontend.nixosModules.backoffice
#
#         ./your-server-config.nix
#       ];
#     };
#   };
# }
#
# Then in your-server-config.nix:

{ config, pkgs, ... }:

{
  # Enable Landing (Next.js) - runs as systemd service
  services.imphnen-landing = {
    enable = true;
    port = 3000;
    hostname = "0.0.0.0";
    openFirewall = true;
    # environmentFile = /run/secrets/landing-env;  # For secrets
  };

  # Enable Backoffice (Static) - served by nginx
  services.imphnen-backoffice = {
    enable = true;
    domain = "backoffice.imphnen.dev";
    enableSSL = true;
  };

  # Enable Gacha (Static)
  services.imphnen-gacha = {
    enable = true;
    domain = "gacha.imphnen.dev";
    enableSSL = true;
  };

  # Enable Dimentorin (Static)
  services.imphnen-dimentorin = {
    enable = true;
    domain = "dimentorin.imphnen.dev";
    enableSSL = true;
  };

  # Enable Hackathon (Static)
  services.imphnen-hackathon = {
    enable = true;
    domain = "hackathon.imphnen.dev";
    enableSSL = true;
  };

  # Nginx reverse proxy for landing (if needed)
  services.nginx.virtualHosts."imphnen.dev" = {
    forceSSL = true;
    enableACME = true;
    locations."/" = {
      proxyPass = "http://127.0.0.1:3000";
      proxyWebsockets = true;
    };
  };

  # Enable ACME for SSL
  security.acme = {
    acceptTerms = true;
    defaults.email = "admin@imphnen.dev";
  };
}
