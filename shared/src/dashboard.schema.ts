import { z } from 'zod';
import { ApplicationStatus } from '@prisma/client';
import { ActivityItemSchema } from './activity.schema.js';

export const ActiveJobSchema = z.object({
    id: z.string(),
    title: z.string(),
    company: z.string(),
    location: z.string().nullable(),
    applicationCount: z.number().min(0),
    createdAt: z.string()
});

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
    breakdown: z.array(ApplicationStatusCountSchema).optional(),
    recentActivity: z.array(ActivityItemSchema),
    activeJobsList: z.array(ActiveJobSchema)
});

export type DashboardStatsDTO = z.infer<typeof DashboardStatsSchema>;
export type ApplicationStatusCountDTO = z.infer<typeof ApplicationStatusCountSchema>;
export type ActiveJobDTO = z.infer<typeof ActiveJobSchema>;
