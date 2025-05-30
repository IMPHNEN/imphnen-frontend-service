import { LogoSimple } from '@/app/_components/logo';
import NAVIGATIONS from '@/data/navigations.json';
import SOCIALS from '@/data/socials.json';
import Link from 'next/link';
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LogoSimple />
            </div>
            <p className="text-sm text-muted-foreground">
              Ingin Menjadi Programmer Handal Namun Enggan Ngoding
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaFacebook className="size-6" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaDiscord className="size-6" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaInstagram className="size-6" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaTiktok className="size-6" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaLinkedinIn className="size-6" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Halaman</h3>
            <ul className="space-y-2">
              {NAVIGATIONS.map(({ link, title }) => (
                <li key={link}>
                  <Link
                    href={link}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Link</h3>
            <ul className="space-y-2">
              {SOCIALS.map(({ link, name }) => (
                <li key={name}>
                  <Link
                    href={link}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Patners</h3>
            <ul className="space-y-2"></ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} IMPHNEN - Ingin Menjadi Programmer
            Handal, Namun Enggan Ngoding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
