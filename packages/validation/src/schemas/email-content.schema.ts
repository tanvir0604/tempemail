import z from "zod";
import { GetListSchema } from "./common.schemas";

export const GetEmailContentListSchema = GetListSchema;

export type GetEmailContentListDto = z.infer<typeof GetEmailContentListSchema>;

export const CreateEmailContentSchema = z.object({
  tempEmailRef: z.email(),
  content: z.json(),
  messageId: z.string(),
  references: z.string().optional(),
  uid: z.number().optional(),
});

export type CreateEmailContentDto = z.infer<typeof CreateEmailContentSchema>;

export const UpdateEmailContentSchema = z.object({
  id: z.string().optional(),
  tempEmailRef: z.email().optional(),
  messageId: z.string().optional(),
  references: z.string().optional(),
  content: z.json().optional(),
  uid: z.number().optional(),
});

export type UpdateEmailContentDto = z.infer<typeof UpdateEmailContentSchema>;
