import Link from 'next/link';

export function DesktopNavigation() {
  return (
    <nav className="hidden md:flex items-center gap-8">
      <Link href="/" className="text-sm font-medium relative group">
        <span className="transition-colors hover:text-primary">Home</span>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
      </Link>
      <Link href="/events" className="text-sm font-medium relative group">
        <span className="transition-colors hover:text-primary">Event</span>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
      </Link>
      <Link href="/testimonials" className="text-sm font-medium relative group">
        <span className="transition-colors hover:text-primary">
          Testimonial
        </span>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
      </Link>
    </nav>
  );
}
