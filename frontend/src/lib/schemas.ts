import { z } from 'zod';

export const ApiErrorSchema = z.object({
    error: z.string(),
    message: z.string(),
    details: z.array(z.object({
        path: z.string(),
        message: z.string()
    })).optional()
});

export type ApiErrorResponse = z.infer<typeof ApiErrorSchema>;
