import { Job, Prisma } from "@prisma/client";
import { JobRepository } from "src/domain/repositories/job.repository.js";

export class Jobservice {

    // Inject the INTERFACE.
    constructor(private jobRepo: JobRepository) {}

    async getAllOpenRoles(): Promise<Job[]> {
        return this.jobRepo.findActiveJobs();
    }

    async getJobDetails(id: string): Promise<Job | null> {
        const job = await this.jobRepo.findById(id);

        if (!job) throw new Error("Job not found");
        
        return job;
    }

    async postNewJob(data: Prisma.JobCreateInput): Promise<Job> {
        // Business Rule: We make all new jobs to start as 'active'.
        return this.jobRepo.create({
            ...data,
            isActive: true
        });
    }
}
