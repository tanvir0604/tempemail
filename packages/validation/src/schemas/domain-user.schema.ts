import z from "zod";
import { GetListSchema } from "./common.schemas";

export const GetDomainUserListSchema = GetListSchema;

export type GetDomainUserListDto = z.infer<typeof GetDomainUserListSchema>;

export const CreateDomainUserSchema = z.object({
    domainId: z.string().optional(),
    apiUserName: z.string(),
    apiPassword: z.string(),
    imapUserName: z.string(),
    imapPassword: z.string(),
});

export type CreateDomainUserDto = z.infer<typeof CreateDomainUserSchema>;

export const UpdateDomainUserSchema = z.object({
    id: z.string().optional(),
    domainId: z.string().optional(),
    apiUserName: z.string().optional(),
    apiPassword: z.string().optional(),
    imapUserName: z.string().optional(),
    imapPassword: z.string().optional(),
});

export type UpdateDomainUserDto = z.infer<typeof UpdateDomainUserSchema>;
