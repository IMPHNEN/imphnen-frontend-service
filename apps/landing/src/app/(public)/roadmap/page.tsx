import { FeatureRequestCTA } from './_components/feature-request-cta';
import ProjectsVote from './_components/projects-vote';

export default function Page() {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <FeatureRequestCTA />
      <ProjectsVote />
    </div>
  );
}
