import z from "zod";

export const ReplyEmailSchema = z.object({
  to: z.email(),
  from: z.email(),
  subject: z.string(),
  messageId: z.string().optional(),
  references: z.string().optional(),
  text: z.string().optional(),
  html: z.string().optional(),
});
export type ReplyEmailDto = z.infer<typeof ReplyEmailSchema>;
