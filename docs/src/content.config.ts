import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Only the docs collection. Starlight ships its own interface strings for both
// locales, so there is nothing for an i18n collection to override yet.
export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
