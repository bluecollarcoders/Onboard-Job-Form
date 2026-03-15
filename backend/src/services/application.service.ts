import { Application } from "@prisma/client";
import { ApplicationRepository } from "src/domain/repositories/application.repository.js";

interface CreateApplicationDTO {
    userId: string;
    jobId: string;
    coverLetter?: string;
}

export class ApplicationService {
    constructor(private appRepo: ApplicationRepository) {}

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
