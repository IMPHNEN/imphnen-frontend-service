import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getHackathonBySlug, getAllHackathonSlugs } from '@/content/hackathons/content';
import { HackathonDetailPage } from '@/app/(public)/hackathon/[slug]/_components/HackathonDetailPage';

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

  return <HackathonDetailPage hackathon={hackathon} />;
}