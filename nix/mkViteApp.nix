# Helper function to build Vite-based static apps
{ pkgs, src, npmDepsHash }:

{ name, buildScript, envVars ? {} }:

pkgs.buildNpmPackage {
  pname = "imphnen-${name}";
  version = "0.0.1";
  inherit src npmDepsHash;

  npmFlags = [ "--legacy-peer-deps" ];
  makeCacheWritable = true;

  nativeBuildInputs = with pkgs; [
    nodejs_22
    nodePackages.npm
  ];

  buildPhase = ''
    runHook preBuild
    export NX_DAEMON=false
    export HOME=$TMPDIR
    ${pkgs.lib.concatStringsSep "\n" (pkgs.lib.mapAttrsToList (k: v: "export ${k}=\"${v}\"") envVars)}
    npm run ${buildScript}
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    mkdir -p $out
    cp -r dist/apps/${name}/* $out/
    runHook postInstall
  '';

  dontNpmBuild = true;
}
