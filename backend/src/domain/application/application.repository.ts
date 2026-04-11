import { Application, Prisma } from "@prisma/client";
import { ApplicationWithRelations, ApplicationStatusCount } from "./application.types.js";

export interface ApplicationRepository {
    findById(id: string): Promise<Application | null>;
    findByUserAndJob(userId: string, jobId: string): Promise<Application | null>;
    findMany(where?: Prisma.ApplicationWhereInput): Promise<Application[]>;
    findByJobId(jobId: string): Promise<ApplicationWithRelations[]>;
    create(data: Prisma.ApplicationCreateInput): Promise<Application>;
    update(id: string, data: Prisma.ApplicationUpdateInput): Promise<Application>;
    // Custom Method
    getWithHistory(id: string): Promise<Application | null>;
    getStatusBreakdown(): Promise<ApplicationStatusCount[]>;
}
