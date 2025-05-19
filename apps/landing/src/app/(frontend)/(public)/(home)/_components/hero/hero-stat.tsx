import { Avatar, AvatarFallback, AvatarImage } from '@components/atoms';

export function HeroStat() {
  return (
    <div className="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5 md:w-fit">
      <div className="flex -space-x-4">
        <Avatar>
          <AvatarImage src="/maulana.webp" />
          <AvatarFallback />
        </Avatar>
        <Avatar>
          <AvatarImage src="/rasyid.webp" />
          <AvatarFallback />
        </Avatar>
        <Avatar>
          <AvatarImage src="/ega.webp" />
          <AvatarFallback />
        </Avatar>
      </div>
      <p className="px-2 text-xs text-muted-foreground">
        <strong className="font-medium text-foreground">180K+</strong>{' '}
        Programmer Indonesia telah bergabung
      </p>
    </div>
  );
}
