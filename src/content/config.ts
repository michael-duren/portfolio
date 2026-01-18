import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        author: z.string().default("Michael Duren"),
        // Keeping legacy image field as string for now if needed, or just remove it if unused
        image: z.string().optional(),
        heroImage: image().optional(),
        cardImage: image().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
    blog: blogCollection,
};
