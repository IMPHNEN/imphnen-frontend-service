import { Avatar, AvatarImage } from '@components/atoms';

export function HeroStat() {
  return (
    <div className="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5 md:w-fit">
      <div className="flex -space-x-4">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/53475078?v=4" />
        </Avatar>
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/49753444?v=4" />
        </Avatar>
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/97678571?v=4" />
        </Avatar>
      </div>
      <p className="px-2 text-xs text-muted-foreground">
        <strong className="font-medium text-foreground">180K+</strong>{' '}
        Programmer Indonesia telah bergabung
      </p>
    </div>
  );
}
