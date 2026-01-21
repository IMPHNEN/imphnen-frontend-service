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
    export CI=true
    export NO_COLOR=1
    export TERM=dumb
    export NX_SKIP_NX_CACHE=true
    export NX_TASKS_RUNNER_DYNAMIC_OUTPUT=false
    export NX_NATIVE=false
    ${pkgs.lib.concatStringsSep "\n" (pkgs.lib.mapAttrsToList (k: v: "export ${k}=\"${v}\"") envVars)}
    # Run nx build, ignore terminal crash after successful build
    ./node_modules/.bin/nx build ${name} --output-style=static || test -d dist/apps/${name}
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
