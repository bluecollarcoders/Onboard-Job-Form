import { Application, Prisma } from "@prisma/client";

export interface ApplicationRepository {
    findById(id: string): Promise<Application | null>;
    findByUserAndJob(userId: string, jobId: string): Promise<Application | null>;
    findMany(where?: Prisma.ApplicationWhereInput): Promise<Application[]>;
    create(data: Prisma.ApplicationCreateInput): Promise<Application>;
    update(id: string, data: Prisma.ApplicationUpdateInput): Promise<Application>;
    // Custom Method
    getWithHistory(id: string): Promise<Application | null>;
}
