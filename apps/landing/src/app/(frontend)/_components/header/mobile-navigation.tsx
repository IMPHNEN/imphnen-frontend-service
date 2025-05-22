import Link from 'next/link';

export function MobileNavigation() {
  return (
    <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
      <nav className="container flex flex-col py-4 text-center">
        <Link
          href="/"
          className="py-3 text-sm font-medium border-b border-border/50"
        >
          Home
        </Link>
        <Link
          href="/events"
          className="py-3 text-sm font-medium border-b border-border/50"
        >
          Event
        </Link>
        <Link
          href="/testimonias"
          className="py-3 text-sm font-medium border-b border-border/50"
        >
          Testimonial
        </Link>
        <Link href="/request" className="text-sm font-medium relative group">
          <span className="transition-colors hover:text-primary">
            Request Fitur
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </nav>
    </div>
  );
}
