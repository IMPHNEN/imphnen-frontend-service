import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { FeaturesSection } from './collections/FeaturesSection';
import { HeroSection } from './collections/HeroSection';
import { Media } from './collections/Media';
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
  globals: [HeroSection, FeaturesSection],
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
  plugins: [],
});
