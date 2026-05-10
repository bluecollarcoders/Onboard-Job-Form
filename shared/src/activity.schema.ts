import { z } from 'zod';

export const ActivityItemSchema = z.object({
    id: z.string(),
    type: z.enum(['new_application', 'status_update', 'offer_accepted', 'new_job']),
    personName: z.string(),
    personRole: z.string(),
    message: z.string(),
    description: z.string(),
    timestamp: z.string()
});

export type ActivityItemDTO = z.infer<typeof ActivityItemSchema>;
