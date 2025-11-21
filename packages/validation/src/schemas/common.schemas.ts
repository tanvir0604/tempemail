import z from 'zod';

export const GetListSchema = z
	.object({
		pageNumber: z.coerce.number().optional().default(1),
		pageSize: z.coerce.number().optional().default(20),
		sortBy: z.string().optional(),
		sortDirection: z.enum(['asc', 'desc']).optional().default('asc'),
		q: z.string().optional(),
	})
	.catchall(z.string().optional());
export type GetListDto = z.infer<typeof GetListSchema>;
