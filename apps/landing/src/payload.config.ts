import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import https from 'https';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { CallToActionSection } from './collections/CallToActionSection';
import { CommunitiesSection } from './collections/CommunitiesSection';
import { FeaturesSection } from './collections/FeaturesSection';
import { HeroSection } from './collections/HeroSection';
import { LearningResourcesSection } from './collections/LearningResourcesSection';
import { Media } from './collections/Media';
import { TestimonialsSection } from './collections/TestimonialsSection';
import { Users } from './collections/Users';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      importMapFile: path.resolve(
        __dirname,
        'app',
        '(payload)',
        'admin',
        'importMap.js'
      ),
    },
  },
  collections: [Users, Media],
  globals: [
    HeroSection,
    FeaturesSection,
    CommunitiesSection,
    LearningResourcesSection,
    TestimonialsSection,
    CallToActionSection,
  ],
  editor: lexicalEditor(),
  secret: process.env.CMS_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.CMS_POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          disableLocalStorage: true,
        },
      },
      bucket: 'landing-cms',
      config: {
        endpoint: process.env.CMS_STORAGE_ENDPOINT,
        credentials: {
          accessKeyId: process.env.CMS_STORAGE_ACCESS_KEY_ID!,
          secretAccessKey: process.env.CMS_STORAGE_SECRET_ACCESS_KEY!,
        },
        region: process.env.CMS_STORAGE_REGION!,
        forcePathStyle: true,
        requestHandler: new NodeHttpHandler({
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        }),
      },
    }),
  ],
});
