import z from "zod";
import { GetListSchema } from "./common.schemas";

export const GetEmailContentListSchema = GetListSchema;

export type GetEmailContentListDto = z.infer<typeof GetEmailContentListSchema>;

export const CreateEmailContentSchema = z.object({
  tempEmailId: z.string(),
  content: z.string(),
});

export type CreateEmailContentDto = z.infer<typeof CreateEmailContentSchema>;

export const UpdateEmailContentSchema = z.object({
  id: z.string().optional(),
  tempEmailId: z.string(),
  content: z.string(),
});

export type UpdateEmailContentDto = z.infer<typeof UpdateEmailContentSchema>;
