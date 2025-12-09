import z from 'zod';
import { GetListSchema } from './common.schemas';

export const GetTempEmailListSchema = GetListSchema;

export type GetTempEmailListDto = z.infer<typeof GetTempEmailListSchema>;

export const CreateTempEmailSchema = z.object({
    email: z.email(),
    emailId: z.string(),
    expiredMinutes: z.number().optional(),
    userId: z.string().optional(),
    domainUserId: z.string().optional(),
});

export type CreateTempEmailDto = z.infer<typeof CreateTempEmailSchema>;

export const UpdateTempEmailSchema = z.object({
    id: z.string().optional(),
    email: z.email().optional(),
    emailId: z.string().optional(),
    expiredMinutes: z.number().optional(),
    replyData: z.string().optional(),
    forwardEmail: z.string().optional(),
});

export type UpdateTempEmailDto = z.infer<typeof UpdateTempEmailSchema>;
