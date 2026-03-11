import { Job, Prisma } from "@prisma/client";

export interface JobRepository {
    findById(id: string): Promise<Job | null>;
    findMany(where?: Prisma.JobWhereInput): Promise<Job[]>;
    // Business-Specific: Get only open roles
    findActiveJobs(): Promise<Job[]>;
    create(data: Prisma.JobCreateInput): Promise<Job>;
    update(id: string, data: Prisma.JobUpdateInput): Promise<Job>;
    delete(id: string): Promise<Job>;
}
