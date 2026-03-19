import { PrismaClient, Job, Prisma } from "@prisma/client";
import { AbstractBaseRepository, BaseDelegate } from "@domain/repositories/base.repository.js";
import { JobRepository } from "@domain/job/job.repository.js";

export class PrismaJobRepository
    extends AbstractBaseRepository<
        Job,
        Prisma.JobCreateInput,
        Prisma.JobUpdateInput,
        Prisma.JobWhereUniqueInput,
        Prisma.JobWhereInput,
        Prisma.JobFindUniqueArgs
    >
    implements JobRepository
{
    constructor(prisma: PrismaClient) {
        super(prisma.job as unknown as BaseDelegate<
            Job,
            Prisma.JobCreateInput,
            Prisma.JobUpdateInput,
            Prisma.JobWhereUniqueInput,
            Prisma.JobWhereInput,
            Prisma.JobFindUniqueArgs
            >);
    }

    async findActiveJobs(): Promise<Job[]> {
        return this.modelDelegate.findMany({
            where: { isActive: true }
        });
    }

    // Overiding to include relationships.
    override async findById(id: string): Promise<Job | null> {
        return this.modelDelegate.findUnique({
            where: { id } as Prisma.JobWhereUniqueInput,
            include: { postedBy: true }
        })
    }
}
