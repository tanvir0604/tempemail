import z from "zod";
import { GetListSchema } from "./common.schemas";

export const GetMailCowListSchema = GetListSchema;

export type GetMailCowListDto = z.infer<typeof GetMailCowListSchema>;

export const CreateMailCowNewAliasSchema = z.object({
  email: z.email(),
  username: z.string(),
  apiUrl: z.string(),
  apiKey: z.string(),
});

export type CreateMailCowNewAliasDto = z.infer<
  typeof CreateMailCowNewAliasSchema
>;

export const CreateImapConnectionSchema = z.object({
  host: z.email(),
  port: z.number(),
  username: z.string(),
  password: z.string(),
});

export type CreateImapConnectionDto = z.infer<
  typeof CreateImapConnectionSchema
>;
