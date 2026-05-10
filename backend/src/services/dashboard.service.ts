import { ApplicationStatus } from "@prisma/client";
import { JobRepository } from "@domain/job/job.repository.js";
import { ApplicationRepository } from "@domain/application/application.repository.js";
import { DashboardStatsDTO, ActivityItemDTO, ActiveJobDTO } from '@my-app/shared'

export class DashboardService {
    constructor(
        private jobRepo: JobRepository,
        private appRepo: ApplicationRepository
    ) {}

    private async getRecentActivity(days: number = 30): Promise<ActivityItemDTO[]> {

        const recentApplications = await this.appRepo.getRecentApplications(days);
        const recentJobs = await this.jobRepo.getRecentJobs(days);

        // Transform applications to activity items.
        const applicationActivities = recentApplications.map(app => ({
            id: app.id,
            type: 'new_application' as const,
            personName: app.user.name || 'Unknown User', // Handle null name
            personRole: 'candidate',
            message: 'New application from',
            description: `Applied for ${app.job.title} role`,
            timestamp: app.createdAt.toISOString() // Send as string, schema transforms to Date
        }));

        const jobsActivities = recentJobs.map(job => ({
            id: job.id,
            type: 'new_job' as const,
            personName: job.company,
            personRole: 'company',
            message: 'New job posted',
            description: `${job.title} position at ${job.company}`,
            timestamp: job.createdAt.toISOString() // Send as string, schema transforms to Date
        }));

        const mergeActivities = [...applicationActivities, ...jobsActivities];

        // Sort by timestamp (newest first)
        mergeActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        return mergeActivities;
    }

    private async getActiveJobsWithCounts(): Promise<ActiveJobDTO[]> {
        const activeJobs = await this.jobRepo.findActiveJobs();

        // For each job, get the application count.
        const jobsWithCounts = await Promise.all(
            activeJobs.map(async (job) => {
                const applicationCount = await this.appRepo.countApplicationsByJobId(job.id);

                return {
                    id: job.id,
                    title: job.title,
                    company: job.company,
                    location: job.location,
                    applicationCount,
                    createdAt: job.createdAt.toISOString()
                };
            })
        );

        return jobsWithCounts;
    }
    async getDashboardStats(): Promise<DashboardStatsDTO> {
        const activeJobsCount = await this.jobRepo.countActiveJobs();
        const applicationStats = await this.appRepo.getStatusBreakdown();
        const recentActivity = await this.getRecentActivity(60);
        const activeJobsList = await this.getActiveJobsWithCounts();

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
                breakdown: applicationStats,
                recentActivity,
                activeJobsList
            }
    }
}
