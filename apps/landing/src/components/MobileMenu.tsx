import { useState, useEffect } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';

interface Navigation {
  title: string;
  link: string;
}

interface Props {
  navigations: Navigation[];
  currentPath: string;
}

export default function MobileMenu({ navigations, currentPath }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative z-50 p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label={open ? 'Tutup menu' : 'Buka menu'}
      >
        {open ? <LuX className="size-6" /> : <LuMenu className="size-6" />}
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col">
          <div className="container flex h-20 items-center justify-between">
            <a
              href="/"
              className="relative overflow-hidden rounded"
              onClick={() => setOpen(false)}
            >
              <img src="/logo.webp" alt="IMPHNEN" className="w-24 h-auto" />
            </a>

            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Tutup menu"
            >
              <LuX className="size-6" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center gap-6 py-10">
            {navigations.map(({ link, title }) => (
              <a
                key={link}
                href={link}
                className={`text-2xl font-medium py-2 px-6 rounded-lg transition-colors ${
                  currentPath === link
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => setOpen(false)}
              >
                {title}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
