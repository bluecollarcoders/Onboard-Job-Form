import { PrismaClient, Job, Prisma } from "@prisma/client";
import { AbstractBaseRepository, BaseDelegate } from "@domain/repositories/base.repository.js";
import { JobRepository } from "@domain/job/job.repository.js";
import { SearchJobsDTO } from "@my-app/shared";

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

    async findActiveJobs(filters?: SearchJobsDTO): Promise<Job[]> {
        const where: Prisma.JobWhereInput = {
            isActive: true,
        };

        if(filters?.q) {
            where.OR = [
                {title: {contains: filters.q, mode: 'insensitive'} },
                {description: {contains: filters.q, mode: 'insensitive'}}
            ];
        }

        if(filters?.location) {
            where.location = { contains: filters?.location, mode: 'insensitive'};
        }


        return this.modelDelegate.findMany({ where });
    }

    // Overiding to include relationships.
    override async findById(id: string): Promise<Job | null> {
        return this.modelDelegate.findUnique({
            where: { id } as Prisma.JobWhereUniqueInput,
            include: { postedBy: true }
        })
    }
}
