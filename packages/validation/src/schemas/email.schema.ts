import z from 'zod';

export const SendEmailSchema = z.object({
    to: z.email(),
    from: z.email(),
    subject: z.string(),
    messageId: z.string().optional(),
    references: z.string().optional(),
    text: z.string().optional(),
    html: z.string().optional(),
});
export type SendEmailDto = z.infer<typeof SendEmailSchema>;
