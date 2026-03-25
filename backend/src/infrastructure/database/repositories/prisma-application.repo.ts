import { PrismaClient, Application, Prisma } from "@prisma/client";
import { AbstractBaseRepository, BaseDelegate } from "@domain/repositories/base.repository.js";
import { ApplicationRepository } from "@domain/application/application.repository.js";
import { ApplicationWithRelations } from "@domain/application/application.types.js";

export class PrismaApplicationRepository
    extends AbstractBaseRepository<
    Application,
    Prisma.ApplicationCreateInput,
    Prisma.ApplicationUpdateInput,
    Prisma.ApplicationWhereUniqueInput,
    Prisma.ApplicationWhereInput,
    Prisma.ApplicationFindUniqueArgs
    >
    implements ApplicationRepository 
    {
        private applicationDelegate: PrismaClient['application'];

        constructor(prisma: PrismaClient) {
            super(prisma.application as unknown as BaseDelegate<
                Application,
                Prisma.ApplicationCreateInput,
                Prisma.ApplicationUpdateInput,
                Prisma.ApplicationWhereUniqueInput,
                Prisma.ApplicationWhereInput,
                Prisma.ApplicationFindUniqueArgs
            >);
            this.applicationDelegate = prisma.application;
        }

    
    async findByUserAndJob(userId: string, jobId: string): Promise<Application | null> {
        return this.modelDelegate.findUnique({
            where: {
                userId_jobId: { userId, jobId } 
            },
        });
    }

    async findByJobId(jobId: string): Promise<ApplicationWithRelations[]> {
        return this.applicationDelegate.findMany({
            where: { jobId },
            include: {
                user: true,
                statusHistory: true
            },
            orderBy:{
                createdAt: 'desc'
            }
        })
    }

    async getWithHistory(id: string): Promise<Application | null> {
        return this.modelDelegate.findUnique({
            where: { id } as Prisma.ApplicationWhereUniqueInput,
            include: {
                statusHistory: true, // Crucial for your audit trail
                job: true,
                user: true
            }
        });
    }
}
