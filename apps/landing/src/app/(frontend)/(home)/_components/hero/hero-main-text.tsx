export function HeroMainText() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/70 leading-tight">
        Programmer Handal <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
          Namun Enggan Ngoding
        </span>
      </h1>
      <p className="max-w-[600px] text-muted-foreground md:text-xl lg:text-lg">
        Bergabunglah bersama 180.000+ programmer Indonesia dan berkembang
        bersama komunitas ini.
      </p>
    </div>
  );
}
