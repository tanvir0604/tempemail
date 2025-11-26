import z from "zod";
import { GetListSchema } from "./common.schemas";

export const GetMailCowListSchema = GetListSchema;

export type GetMailCowListDto = z.infer<typeof GetMailCowListSchema>;

export const CreateMailCowNewAliasSchema = z.object({
    email: z.email(),
    domain: z.string(),
    username: z.string(),
    apiUrl: z.string(),
    apiKey: z.string(),
});

export type CreateMailCowNewAliasDto = z.infer<
    typeof CreateMailCowNewAliasSchema
>;
