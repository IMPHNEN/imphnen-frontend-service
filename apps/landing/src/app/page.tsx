import { Community } from './_components/community';
import { Features } from './_components/features';
import { Header } from './_components/header';
import { Hero } from './_components/hero';
import { LearningResources } from './_components/learning-resources';
import { Testimonials } from './_components/testimonials';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Community />
        <LearningResources />
        <Testimonials />
      </main>
    </div>
  );
}
