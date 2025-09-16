import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MDXContent {
  content: string;
  metadata: Record<string, unknown>;
  slug: string;
  filePath: string;
}

/**
 * Read and parse MDX file
 */
export async function readMDXFile(filePath: string): Promise<MDXContent | null> {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: metadata, content } = matter(fileContent);
    
    const fileName = path.basename(filePath, path.extname(filePath));
    const slug = fileName === 'content' ? path.basename(path.dirname(filePath)) : fileName;

    return {
      content,
      metadata,
      slug,
      filePath
    };
  } catch (error) {
    console.error(`Error reading MDX file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all MDX files in a directory
 */
export async function getMDXFiles(directoryPath: string): Promise<string[]> {
  try {
    if (!fs.existsSync(directoryPath)) {
      return [];
    }

    const files = fs.readdirSync(directoryPath, { withFileTypes: true });
    const mdxFiles: string[] = [];

    for (const file of files) {
      const fullPath = path.join(directoryPath, file.name);
      
      if (file.isDirectory()) {
        // Look for content.mdx in subdirectories
        const contentPath = path.join(fullPath, 'content.mdx');
        if (fs.existsSync(contentPath)) {
          mdxFiles.push(contentPath);
        }
        
        // Also look for any .mdx files directly in subdirectories
        const subFiles = await getMDXFiles(fullPath);
        mdxFiles.push(...subFiles);
      } else if (file.name.endsWith('.mdx')) {
        mdxFiles.push(fullPath);
      }
    }

    return mdxFiles;
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}:`, error);
    return [];
  }
}

/**
 * Extract metadata from content directory structure
 */
export function extractMetadataFromPath(filePath: string, baseDir: string): Record<string, unknown> {
  const relativePath = path.relative(baseDir, filePath);
  const pathParts = relativePath.split(path.sep);
  
  // If file is in a subdirectory, use directory name as slug
  if (pathParts.length > 1) {
    const directoryName = pathParts[pathParts.length - 2];
    return {
      slug: directoryName,
      contentPath: relativePath
    };
  }
  
  // If file is directly in the base directory, use filename as slug
  const fileName = path.basename(filePath, path.extname(filePath));
  return {
    slug: fileName,
    contentPath: relativePath
  };
}

/**
 * Validate MDX frontmatter
 */
export function validateMDXFrontmatter(
  metadata: Record<string, unknown>,
  requiredFields: string[] = []
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const field of requiredFields) {
    if (!(field in metadata) || metadata[field] === undefined || metadata[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Process content images and assets
 */
export function processContentAssets(content: string, assetsBasePath: string): string {
  // Replace relative image paths with absolute paths
  return content.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
    (match, alt, src) => {
      // Convert relative paths to absolute paths
      const absolutePath = path.posix.join(assetsBasePath, src);
      return `![${alt}](${absolutePath})`;
    }
  );
}

/**
 * Generate content index for build-time optimization
 */
export async function generateContentIndex<T>(
  contentDir: string,
  metadataParser: (mdxContent: MDXContent) => T | null
): Promise<T[]> {
  const mdxFiles = await getMDXFiles(contentDir);
  const contentItems: T[] = [];

  for (const filePath of mdxFiles) {
    const mdxContent = await readMDXFile(filePath);
    if (mdxContent) {
      const parsedMetadata = metadataParser(mdxContent);
      if (parsedMetadata) {
        contentItems.push(parsedMetadata);
      }
    }
  }

  return contentItems;
}

/**
 * Create content manifest for client-side use
 */
export function createContentManifest<T>(
  items: T[],
  options: {
    sortBy?: keyof T;
    sortDirection?: 'asc' | 'desc';
    filterDrafts?: boolean;
  } = {}
): {
  items: T[];
  total: number;
  lastUpdated: string;
} {
  let processedItems = [...items];

  // Filter drafts if requested
  if (options.filterDrafts) {
    processedItems = processedItems.filter(
      item => (item as Record<string, unknown>).status !== 'draft'
    );
  }

  // Sort if requested
  if (options.sortBy) {
    processedItems.sort((a, b) => {
      const sortBy = options.sortBy;
      if (!sortBy) return 0;
      
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;
      
      return options.sortDirection === 'desc' ? -comparison : comparison;
    });
  }

  return {
    items: processedItems,
    total: processedItems.length,
    lastUpdated: new Date().toISOString()
  };
}