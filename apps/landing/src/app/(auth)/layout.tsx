import { Card } from '@components';
import { ReactNode } from 'react';
import { AnimatedBackground } from './_components/animated-background';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background/20 relative flex min-h-[100dvh] items-center justify-center p-4">
      <AnimatedBackground />
      <div className="z-10 w-full">
        <Card className="bg-background/90 mx-auto w-full max-w-[360px] p-6 shadow-xl backdrop-blur-lg sm:max-w-md sm:p-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full space-y-4">{children}</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
