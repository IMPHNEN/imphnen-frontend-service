import { join } from 'path';

export default {
  plugins: {
    '@tailwindcss/postcss': {
      base: join(import.meta.dirname, '../../'),
    },
  },
};
