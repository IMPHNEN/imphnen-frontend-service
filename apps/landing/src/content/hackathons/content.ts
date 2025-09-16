import path from 'path';
import fs from 'fs';
import { HackathonMetadata, HackathonContent, HackathonSummary } from './types';
import { readMDXFile } from '../shared/mdx';
import { validateHackathon } from './validation';
import { toHackathonSummary, calculateHackathonStatus, sortHackathons, filterHackathons } from './utils';

const HACKATHONS_DIR = path.join(process.cwd(), 'src/content/hackathons');

/**
 * Load metadata from a hackathon's metadata.json file
 */
async function loadHackathonMetadata(hackathonDir: string): Promise<HackathonMetadata | null> {
  const metadataPath = path.join(hackathonDir, 'metadata.json');
  
  try {
    if (!fs.existsSync(metadataPath)) {
      console.warn(`No metadata.json found in ${hackathonDir}`);
      return null;
    }

    // Read and parse JSON file
    const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
    const metadata = JSON.parse(metadataContent) as HackathonMetadata;

    // Validate the metadata
    const validation = validateHackathon(metadata);
    if (!validation.isValid) {
      console.error(`Invalid metadata in ${hackathonDir}:`, validation.errors);
      return null;
    }

    // Calculate status if not explicitly set
    const finalMetadata: HackathonMetadata = {
      ...metadata,
      status: metadata.status || calculateHackathonStatus(metadata),
      contentPath: path.relative(HACKATHONS_DIR, hackathonDir),
      lastModified: fs.statSync(metadataPath).mtime.toISOString()
    };

    return finalMetadata;
  } catch (error) {
    console.error(`Error loading metadata from ${metadataPath}:`, error);
    return null;
  }
}

/**
 * Load content from a hackathon's content.mdx file
 */
async function loadHackathonContent(hackathonDir: string): Promise<string | null> {
  const contentPath = path.join(hackathonDir, 'content.mdx');
  
  try {
    if (!fs.existsSync(contentPath)) {
      console.warn(`No content.mdx found in ${hackathonDir}`);
      return null;
    }

    const mdxContent = await readMDXFile(contentPath);
    return mdxContent?.content || null;
  } catch (error) {
    console.error(`Error loading content from ${contentPath}:`, error);
    return null;
  }
}

/**
 * Get all hackathon directories
 */
function getHackathonDirectories(): string[] {
  if (!fs.existsSync(HACKATHONS_DIR)) {
    console.warn(`Hackathons directory not found: ${HACKATHONS_DIR}`);
    return [];
  }

  return fs.readdirSync(HACKATHONS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(HACKATHONS_DIR, dirent.name))
    .filter(dir => {
      // Only include directories that have either metadata.json or content.mdx
      const hasMetadata = fs.existsSync(path.join(dir, 'metadata.json'));
      const hasContent = fs.existsSync(path.join(dir, 'content.mdx'));
      return hasMetadata || hasContent;
    });
}

/**
 * Get all hackathons with full content (build-time)
 */
export async function getAllHackathons(options: {
  includeDrafts?: boolean;
  sortBy?: 'name' | 'registrationStart' | 'status';
  sortDirection?: 'asc' | 'desc';
} = {}): Promise<HackathonContent[]> {
  const hackathonDirs = getHackathonDirectories();
  const hackathons: HackathonContent[] = [];

  for (const dir of hackathonDirs) {
    const metadata = await loadHackathonMetadata(dir);
    if (!metadata) continue;

    // Skip drafts unless explicitly included
    if (!options.includeDrafts && metadata.status === 'draft') {
      continue;
    }

    const content = await loadHackathonContent(dir);
    
    hackathons.push({
      metadata,
      content: content || ''
    });
  }

  // Sort if requested
  if (options.sortBy) {
    const summaries = hackathons.map(h => toHackathonSummary(h.metadata));
    const sortedSummaries = sortHackathons(summaries, options.sortBy, options.sortDirection);
    
    // Reorder hackathons based on sorted summaries
    return sortedSummaries.map(summary => {
      const hackathon = hackathons.find(h => h.metadata.slug === summary.slug);
      return hackathon;
    }).filter((hackathon): hackathon is HackathonContent => hackathon !== undefined);
  }

  return hackathons;
}

/**
 * Get hackathon summaries for listing pages (build-time)
 */
export async function getHackathonSummaries(options: {
  includeDrafts?: boolean;
  sortBy?: 'name' | 'registrationStart' | 'status';
  sortDirection?: 'asc' | 'desc';
  filters?: {
    status?: string[];
    tags?: string[];
    search?: string;
  };
} = {}): Promise<HackathonSummary[]> {
  const hackathons = await getAllHackathons({ 
    includeDrafts: options.includeDrafts,
    sortBy: options.sortBy,
    sortDirection: options.sortDirection
  });

  let summaries = hackathons.map(h => toHackathonSummary(h.metadata));

  // Apply filters if provided
  if (options.filters) {
    summaries = filterHackathons(summaries, options.filters);
  }

  return summaries;
}

/**
 * Get a single hackathon by slug (build-time)
 */
export async function getHackathonBySlug(slug: string): Promise<HackathonContent | null> {
  console.log('Fetching hackathon by slug:', slug);
  const hackathonDir = path.join(HACKATHONS_DIR, slug);
  console.log('Resolved hackathon directory:', hackathonDir);
  
  if (!fs.existsSync(hackathonDir)) {
    return null;
  }

  const metadata = await loadHackathonMetadata(hackathonDir);
  if (!metadata) {
    return null;
  }

  const content = await loadHackathonContent(hackathonDir);

  return {
    metadata,
    content: content || ''
  };
}

/**
 * Get all hackathon slugs (for static generation)
 */
export async function getAllHackathonSlugs(): Promise<string[]> {
  const hackathons = await getAllHackathons({ includeDrafts: false });
  return hackathons.map(h => h.metadata.slug);
}

/**
 * Generate static index file for runtime use
 */
export async function generateHackathonIndex(): Promise<void> {
  const summaries = await getHackathonSummaries({ 
    includeDrafts: false,
    sortBy: 'registrationStart',
    sortDirection: 'desc'
  });

  const indexContent = `// Auto-generated file - do not edit manually
// Generated on: ${new Date().toISOString()}

import { HackathonSummary } from './types';

export const hackathonSummaries: HackathonSummary[] = ${JSON.stringify(summaries, null, 2)};

export const hackathonSlugs = ${JSON.stringify(summaries.map(s => s.slug), null, 2)};

export function getHackathonSummaryBySlug(slug: string): HackathonSummary | undefined {
  return hackathonSummaries.find(h => h.slug === slug);
}

export function getActiveHackathons(): HackathonSummary[] {
  return hackathonSummaries.filter(h => h.status === 'active');
}

export function getUpcomingHackathons(): HackathonSummary[] {
  return hackathonSummaries.filter(h => h.status === 'upcoming');
}

export function getFeaturedHackathons(): HackathonSummary[] {
  return hackathonSummaries.filter(h => (h as any).featured === true);
}
`;

  const indexPath = path.join(HACKATHONS_DIR, 'index.ts');
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  
  console.log(`Generated hackathon index with ${summaries.length} hackathons`);
}

/**
 * Development helper - watch for changes and regenerate index
 */
export function watchHackathonChanges(): void {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  fs.watch(HACKATHONS_DIR, { recursive: true }, (eventType, filename) => {
    if (filename && (filename.includes('metadata.json') || filename.includes('content.mdx'))) {
      console.log(`Hackathon content changed: ${filename}`);
      generateHackathonIndex().catch(console.error);
    }
  });
}

/**
 * Build-time optimization: precompile all hackathon content
 */
export async function precompileHackathons(): Promise<void> {
  console.log('Precompiling hackathon content...');
  
  const hackathons = await getAllHackathons({ includeDrafts: false });
  
  // Generate the main index
  await generateHackathonIndex();
  
  // Could add more optimizations here like:
  // - Image optimization
  // - Content minification
  // - Search index generation
  
  console.log(`Precompiled ${hackathons.length} hackathons`);
}