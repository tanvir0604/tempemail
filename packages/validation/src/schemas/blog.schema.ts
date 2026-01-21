import z, { ZodType } from 'zod';

export const CreateBlogSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    image: z.string().min(1, 'Image is required').url('Invalid URL'),
    content: z.string().min(1, 'Content is required'),
    tag: z.string().min(1, 'Tag is required'),
    readingTime: z.number().min(1, 'Reading time is required'),
    publishedAt: z.date().default(new Date()).optional(),
    status: z.boolean().default(true),
});

export type CreateBlogDto = z.infer<typeof CreateBlogSchema>;

export const UpdateBlogSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, 'Title is required').optional(),
    image: z.string().min(1, 'Image is required').url('Invalid URL').optional(),
    content: z.string().min(1, 'Content is required').optional(),
    tag: z.string().min(1, 'Tag is required').optional(),
    readingTime: z.number().min(1, 'Reading time is required').optional(),
    publishedAt: z.date().optional().optional(),
    status: z.boolean().default(true).optional(),
});

export type UpdateBlogDto = z.infer<typeof UpdateBlogSchema>;
