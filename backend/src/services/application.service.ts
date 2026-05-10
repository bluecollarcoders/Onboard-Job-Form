import { Application, ApplicationStatus } from "@prisma/client";
import { ApplicationRepository } from "@domain/application/application.repository.js";
import { CreateApplicationDTO } from "@domain/application/application.schema.js";
import { JobRepository } from "@domain/job/job.repository.js"; 
import { SearchJobsDTO } from "@my-app/shared";
import { AlreadyAppliedError, JobClosedError, JobNotFound, ApplicationNotFound, JobInactiveError } from "@errors/application.errors.js";
import { ApplicationWithRelations } from "@domain/application/application.types.js";

export class ApplicationService {
    constructor(
        private appRepo: ApplicationRepository,
        private jobRepo: JobRepository
    ) {}

    /**
     * Retrieves an application along with it's full history.
     * @param id 
     * @returns 
     */
    async getApplicationDetails(id: string): Promise<Application | null> {
        return this.appRepo.getWithHistory(id);
    }

   /**
    * Gets all applications for a specific job with full candidate details.
    * Validates job exists and includes user info for kanban display.
    * @param jobId 
    * @returns 
    */
    async getApplicationsByJob(jobId: string): Promise<ApplicationWithRelations[]> {
        const job = await this.jobRepo.findById(jobId);

        if(!job) {
            throw new JobNotFound();
        }

        if(!job.isActive) {
            throw new JobInactiveError();
        }

        return this.appRepo.findByJobId(jobId);
    }

    /**
     * Updates applicants job status.
     * @param applicationId 
     * @param newStatus 
     * @param changedById 
     * @returns 
     */
    async updateStatus(applicationId: string, newStatus: ApplicationStatus, changedById: string): Promise<Application>{

        const application = await this.appRepo.findById(applicationId);

        if(!application) {
            throw new ApplicationNotFound();
        }

        return this.appRepo.update(applicationId, {
            status: newStatus,

            statusHistory: {
                create: {
                    fromStatus: application.status,
                    toStatus: newStatus,
                    changedBy: {
                        connect: {id: changedById}
                    }
                }
            }
        });
    }

    /**
     * Submits a new application and creates the intial 'SUBMITTED' event.
     * Note: We use Prisma's nested writes to ensure this is atomic.
     * @param data 
     * @returns 
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
