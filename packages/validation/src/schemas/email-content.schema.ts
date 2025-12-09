import z, { any } from 'zod';
import { GetListSchema } from './common.schemas';

export const GetEmailContentListSchema = GetListSchema;

export type GetEmailContentListDto = z.infer<typeof GetEmailContentListSchema>;

export const CreateEmailContentSchema = z.object({
    tempEmailRef: z.email(),
    content: z.json(),
    fromName: z.string().optional(),
    from: z.string(),
    to: z.string(),
    subject: z.string(),
    text: z.string().optional(),
    html: z.string().optional(),
    messageId: z.string(),
    references: z.string().optional(),
    uid: z.number().optional(),
    attachments: z.any().optional(),
});

export type CreateEmailContentDto = z.infer<typeof CreateEmailContentSchema>;

export const UpdateEmailContentSchema = z.object({
    id: z.string().optional(),
    tempEmailRef: z.email().optional(),
    content: z.json().optional(),
    fromName: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    subject: z.string().optional(),
    text: z.string().optional(),
    html: z.string().optional(),
    messageId: z.string().optional(),
    references: z.string().optional(),
    uid: z.number().optional(),
    attachments: z.any().optional(),
    replyContent: z.string().optional(),
    repliedAt: z.string().optional(),
    forwardEmail: z.string().optional(),
    forwardedAt: z.string().optional(),
});

export type UpdateEmailContentDto = z.infer<typeof UpdateEmailContentSchema>;
