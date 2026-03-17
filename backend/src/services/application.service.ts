import { Application } from "@prisma/client";
import { ApplicationRepository } from "@domain/repositories/application.repository.js";
import { JobRepository } from "@domain/repositories/job.repository.js"; 
import { AlreadyAppliedError, JobClosedError, JobNotFound } from "@errors/application.errors.js";

interface CreateApplicationDTO {
    userId: string;
    jobId: string;
    coverLetter?: string;
}

export class ApplicationService {
    constructor(
        private appRepo: ApplicationRepository,
        private jobRepo: JobRepository
    ) {}

    /**
     * Retrieves an application along with it's full history.
     */
    async getApplicationDetails(id: string): Promise<Application | null> {
        return this.appRepo.getWithHistory(id);
    }

    /**
     * Submits a new application and creates the intial 'SUBMITTED' event.
     * Note: We use Prisma's nested writes to ensure this is atomic.
     */
    async applyForJob(data: CreateApplicationDTO): Promise<Application> {

        // Business Rull: Duplicate Prevention.
        const existingApp = await this.appRepo.findByUserAndJob(data.userId, data.jobId);

        if (existingApp) {
            throw new AlreadyAppliedError();
        }

        // Business Rule: Job Validity.
        const job = await this.jobRepo.findById(data.jobId);

        if (!job) {
            throw new JobNotFound();
        }

        if (!job.isActive) {
            throw new JobClosedError();
        }

        return this.appRepo.create({
            // Instead of just passing IDs, we "connect" to existing records.
            user: {
                connect: { id: data.userId }
            },
            job: {
                connect: { id: data.jobId }
            },
            coverLetter: data.coverLetter,
            status: "SUBMITTED",
            statusHistory: {
                create: {
                    toStatus: "SUBMITTED",
                }
            }
        });
    }
}
