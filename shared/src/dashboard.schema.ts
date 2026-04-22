import { z } from 'zod';
import { ApplicationStatus } from '@prisma/client';

export const ApplicationStatusCountSchema = z.object({
    status: z.enum(Object.values(ApplicationStatus) as [string, ...string[]]),
    _count: z.object({
        id: z.number().min(0)
    })
});

export const DashboardStatsSchema = z.object({
    activeJobs: z.number().min(0),
    newApps: z.number().min(0),
    inPipeline: z.number().min(0),
    hired: z.number().min(0),
    rejected: z.number().min(0),
    breakdown: z.array(ApplicationStatusCountSchema).optional()
});

export type DashboardStatsDTO = z.infer<typeof DashboardStatsSchema>;
export type ApplicationStatusCountDTO = z.infer<typeof ApplicationStatusCountSchema>;
