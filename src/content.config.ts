import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string().min(1),
    seo_title: z.string().min(1).max(60).optional(),
    description: z.string().min(1),
    author: z.literal('Pranjal Pandey').default('Pranjal Pandey'),
    tags: z.array(z.string().min(1)).default([]),
    audience: z.enum(['business', 'individuals', 'research']).default('business'),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(true),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string().min(1),
    status: z.enum(['preprint', 'peer-reviewed']),
    url: z.url(),
    authors: z.array(z.string().min(1)).min(1),
    published: z.coerce.date(),
  }),
});

export const collections = { writing, research };
