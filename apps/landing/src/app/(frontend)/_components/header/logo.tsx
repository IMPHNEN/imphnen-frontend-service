import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="IMPHNEN"
        width={64}
        height={64}
        className="object-cover"
      />
    </Link>
  );
}
