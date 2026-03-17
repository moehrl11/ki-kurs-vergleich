import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const ratgeber = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ratgeber' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    slug: z.string(),
    kategorie: z.string().default('ratgeber'),
    lesezeit: z.string().optional(),
  }),
});

export const collections = { ratgeber };
