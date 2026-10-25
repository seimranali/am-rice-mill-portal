import { defineConfig } from 'astro/config';

// Production domain (keep in sync with company.url in src/data/site.ts)
export default defineConfig({
  site: 'https://amricemill.com',
  build: { inlineStylesheets: 'auto' },
});
