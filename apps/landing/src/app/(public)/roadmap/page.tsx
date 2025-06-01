import { FeatureRequestCTA } from './_components/feature-request-cta';
import ProjectsVote from './_components/projects-vote';

export default function Page() {
  return (
    <div className="pt-4 md:pt-6 pb-56 bg-gray-50 min-h-screen">
      <FeatureRequestCTA />
      <ProjectsVote />
    </div>
  );
}
