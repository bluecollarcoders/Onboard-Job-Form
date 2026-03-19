import { z } from "zod";

export const CreateUserSchema = z.object({
    email: z.email(),
    name: z.string().min(1).optional(),
    role: z.enum(['ADMIN', 'RECRUITER', 'CANDIDATE']).default('CANDIDATE')
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>
