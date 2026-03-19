import { z } from 'zod';

export const CreateJobSchema = z.object({
    title: z.string().min(3),
    company: z.string().min(2),
    description: z.string().min(10),
    location: z.string().optional(),
    salary: z.string().optional(),
    postedById: z.cuid(),
});

// Generate the Type.
export type CreateJobDTO = z.infer<typeof CreateJobSchema>;
