import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        author: z.string().default("Michael Duren"),
        image: z.string().optional(),
        heroImage: image().optional(),
        cardImage: image().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
    blog: blogCollection,
};
