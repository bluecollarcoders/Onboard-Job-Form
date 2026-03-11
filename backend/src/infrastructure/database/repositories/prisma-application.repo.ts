import { PrismaClient, Application, Prisma } from "@prisma/client";
import { AbstractBaseRepository, BaseDelegate } from "src/domain/repositories/base.repository.js";
import { ApplicationRepository } from "src/domain/repositories/application.repository.js";

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
        constructor(prisma: PrismaClient) {
            super(prisma.application as unknown as BaseDelegate<
                Application,
                Prisma.ApplicationCreateInput,
                Prisma.ApplicationUpdateInput,
                Prisma.ApplicationWhereUniqueInput,
                Prisma.ApplicationWhereInput,
                Prisma.ApplicationFindUniqueArgs
                >);
        }

    
async findByUserAndJob(userId: string, jobId: string): Promise<Application | null> {
        return this.modelDelegate.findUnique({
            where: {
                userId_jobId: { userId, jobId } 
            },
        });
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
