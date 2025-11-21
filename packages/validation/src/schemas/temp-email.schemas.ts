import z from "zod";
import { GetListSchema } from "./common.schemas";

export const GetTempEmailListSchema = GetListSchema;

export type GetTempEmailListDto = z.infer<typeof GetTempEmailListSchema>;

export const CreateTempEmailSchema = z.object({
  email: z.email(),
  expiredMinutes: z.number().optional(),
});

export type CreateTempEmailDto = z.infer<typeof CreateTempEmailSchema>;

export const UpdateTempEmailSchema = z.object({
  id: z.string().optional(),
  email: z.email(),
  expiredMinutes: z.number().optional(),
});

export type UpdateTempEmailDto = z.infer<typeof UpdateTempEmailSchema>;
