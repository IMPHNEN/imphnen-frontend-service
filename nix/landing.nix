# Next.js Landing App Package
{ pkgs, src, npmDepsHash }:

pkgs.buildNpmPackage {
  pname = "imphnen-landing";
  version = "0.0.1";
  inherit src npmDepsHash;

  nativeBuildInputs = with pkgs; [
    nodejs_22
    nodePackages.npm
    python3  # Required for node-gyp (sharp, etc.)
  ];

  buildPhase = ''
    runHook preBuild
    export NX_DAEMON=false
    export HOME=$TMPDIR
    npm run landing:build
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    mkdir -p $out/bin $out/share/landing

    # Copy standalone server
    cp -r dist/apps/landing/.next/standalone/* $out/share/landing/

    # Copy public assets
    mkdir -p $out/share/landing/apps/landing/public
    cp -r dist/apps/landing/public/* $out/share/landing/apps/landing/public/ || true

    # Copy static files
    mkdir -p $out/share/landing/dist/apps/landing/.next/static
    cp -r dist/apps/landing/.next/static/* $out/share/landing/dist/apps/landing/.next/static/

    # Create wrapper script
    cat > $out/bin/imphnen-landing <<EOF
    #!/usr/bin/env bash
    cd $out/share/landing
    exec ${pkgs.nodejs_22}/bin/node apps/landing/server.js "\$@"
    EOF
    chmod +x $out/bin/imphnen-landing

    runHook postInstall
  '';

  dontNpmBuild = true;
}
