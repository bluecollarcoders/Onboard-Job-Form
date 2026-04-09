import { ApplicationStatus } from "@prisma/client";
import { prisma } from "@infrastructure/database/prisma.client.js";

type ApplicationStatusCount = {
    status: ApplicationStatus;
    _count: { id: number };
}
export type DashboardStats = {
    activeJobs: number,
    newApps: number,
    inPipeline: number,
    hired: number,
    rejected: number,
    breakdown?: ApplicationStatusCount[]
}

export class DashboardService {

    async getDashboardStats(): Promise<DashboardStats> {
            const activeJobsCount = await prisma.job.count({
                where: {
                    isActive: true
                }
            });

            const applicationStats = await prisma.application.groupBy({
                by: ['status'],
                _count: {
                    id: true
                }
            });

            const count = applicationStats.reduce((acc, s) => {
                acc[s.status] = s._count.id;
                return acc
            }, {} as Partial<Record<ApplicationStatus, number>>);

            const newApps = (count.SUBMITTED || 0) + (count.RECEIVED || 0);
            const inPipeline = (count.SCREENING || 0) + (count.INTERVIEWING || 0) + (count.OFFER_EXTENDED || 0);
            const hired = count.HIRED || 0;
            const rejected = count.REJECTED || 0;

            return {
                activeJobs: activeJobsCount,
                newApps: newApps,
                inPipeline: inPipeline,
                hired: hired,
                rejected: rejected,
                breakdown: applicationStats
            }
    }
}
