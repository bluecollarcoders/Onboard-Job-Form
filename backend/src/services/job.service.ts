import { Job } from "@prisma/client";
import { JobRepository } from "@domain/job/job.repository.js";
import { JobNotFound } from "@errors/application.errors.js";
import { CreateJobDTO, SearchJobsDTO } from "@my-app/shared";

export class JobService {

    // Inject the INTERFACE.
    constructor(private jobRepo: JobRepository) {}

    async getAllOpenRoles(filters?: SearchJobsDTO): Promise<Job[]> {
        return this.jobRepo.findActiveJobs(filters);
    }

    async getJobDetails(id: string): Promise<Job | null> {
        const job = await this.jobRepo.findById(id);

        if (!job) throw new JobNotFound();
        
        return job;
    }

    async postNewJob(data: CreateJobDTO): Promise<Job> {
        // Business Rule: We make all new jobs to start as 'active'.
        return this.jobRepo.create({
            title: data.title,
            company: data.company,
            description: data.description,
            location: data.location,
            salary: data.salary,
            isActive: true,
            postedBy: {
                connect: { id: data.postedById }
            }
        });
    }
}
