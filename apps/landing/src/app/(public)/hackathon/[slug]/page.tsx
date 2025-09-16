import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getHackathonBySlug, getAllHackathonSlugs } from '@/content/hackathons/content';
import { getDaysLeftText, getProgressPercent } from '@/content/hackathons/utils';
import Link from 'next/link';
import { Button } from '@components';
import { BsArrowLeft } from 'react-icons/bs';
import { HackathonHero } from './_components/HackathonHero';
import { HackathonStatusBar } from './_components/HackathonStatusBar';
import { HackathonSidebar } from './_components/HackathonSidebar';
import { HackathonTabs } from './_components/HackathonTabs';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface Props {
  params: {
    slug: string;
  };
}

// Generate static params for all hackathons
export async function generateStaticParams() {
  const slugs = await getAllHackathonSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each hackathon
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const hackathon = await getHackathonBySlug(resolvedParams.slug);

  if (!hackathon) {
    return {
      title: 'Hackathon Not Found',
      description: 'The requested hackathon could not be found.',
    };
  }

  const { metadata } = hackathon;

  return {
    title: metadata.seoTitle || `${metadata.name} - IMPHNEN`,
    description: metadata.seoDescription || metadata.description,
    keywords: metadata.tags?.join(', '),
    openGraph: {
      title: metadata.name,
      description: metadata.description,
      images: metadata.socialImage ? [metadata.socialImage] : [metadata.cover],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.name,
      description: metadata.description,
      images: metadata.socialImage ? [metadata.socialImage] : [metadata.cover],
    },
  };
}

export default async function HackathonPage({ params }: Props) {
  const resolvedParams = await params;
  const hackathon = await getHackathonBySlug(resolvedParams.slug);

  if (!hackathon) {
    notFound();
  }

  const { metadata, content } = hackathon;
  
  // Return 404 if no content is found
  if (!content || content.trim() === '') {
    notFound();
  }
  
  const progressPercent = getProgressPercent(metadata);
  const daysLeftText = getDaysLeftText(metadata);

  return (
    <div className="min-h-screen container mx-auto px-4 py-8 bg-background">
      <Link href="/hackathon">
        <Button variant={'bordered'} className='mb-6 font-normal gap-2'>
          <BsArrowLeft /> <span>Back to Hackathons</span>
        </Button>
      </Link>

      <HackathonHero 
        coverImage={metadata.cover}
        hackathonName={metadata.name}
      />

      <HackathonStatusBar
        metadata={metadata}
        progressPercent={progressPercent}
        daysLeftText={daysLeftText}
      />

      <div className="container mx-auto px-4 py-12 flex gap-8">
        {/* Sidebar only */}
        <div className="max-w-xs w-full shrink-0 mx-auto lg:mx-0 lg:col-span-2">
          <HackathonSidebar metadata={metadata} />
        </div>

        {/* Tabs section */}
        <div className="mb-12 col-span-8 lg:col-span-8">
          <HackathonTabs
            metadata={metadata}
            submissions={metadata.submissions}
            contentElement={
              <div className="prose w-full max-w-none">
                <MDXRemote source={content} />
              </div>
            }
          />
        </div>

        
      </div>
    </div>
  );
}