import { ApplicationStatus } from "@prisma/client";
import { JobRepository } from "@domain/job/job.repository.js";
import { ApplicationRepository } from "@domain/application/application.repository.js";
import { DashboardStatsDTO } from '@my-app/shared'

export class DashboardService {
    constructor(
        private jobRepo: JobRepository,
        private appRepo: ApplicationRepository
    ) {}

    async getDashboardStats(): Promise<DashboardStatsDTO> {
        const activeJobsCount = await this.jobRepo.countActiveJobs();
        const applicationStats = await this.appRepo.getStatusBreakdown();

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
                newApps,
                inPipeline,
                hired,
                rejected,
                breakdown: applicationStats
            }
    }
}
