import z from "zod";
import { GetListSchema } from "./common.schemas";

export const GetDomainListSchema = GetListSchema;

export type GetDomainListDto = z.infer<typeof GetDomainListSchema>;

export const CreateDomainSchema = z.object({
    domain: z.string(),
    apiUrl: z.string(),
    apiKey: z.string(),
    imapHost: z.string(),
    imapPort: z.string(),
});

export type CreateDomainDto = z.infer<typeof CreateDomainSchema>;

export const UpdateDomainSchema = z.object({
    id: z.string().optional(),
    domain: z.string().optional(),
    apiUrl: z.string().optional(),
    apiKey: z.string().optional(),
    imapHost: z.string().optional(),
    imapPort: z.string().optional(),
});

export type UpdateDomainDto = z.infer<typeof UpdateDomainSchema>;
