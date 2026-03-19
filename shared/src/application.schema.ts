import { z } from 'zod';

export const CreateApplicationSchema = z.object({
    userId: z.cuid(),
    jobId: z.cuid(),
    coverLetter: z.string().min(1).optional()

});

export type CreateApplicationDTO = z.infer<typeof CreateApplicationSchema>;
