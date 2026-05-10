import { PrismaClient, Job, Prisma } from "@prisma/client";
import { AbstractBaseRepository, BaseDelegate, CountDelegate } from "@domain/repositories/base.repository.js";
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
    private jobDelegate: PrismaClient['job'];

    constructor(prisma: PrismaClient) {
        super(prisma.job as unknown as BaseDelegate<
            Job,
            Prisma.JobCreateInput,
            Prisma.JobUpdateInput,
            Prisma.JobWhereUniqueInput,
            Prisma.JobWhereInput,
            Prisma.JobFindUniqueArgs
            > & CountDelegate<Prisma.JobScalarWhereInput>);
            this.jobDelegate = prisma.job;
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

    async countActiveJobs(): Promise<number> {
        return this.modelDelegate.count({
            where: {
                isActive: true
            }
        });
    }

    // Overiding to include relationships.
    override async findById(id: string): Promise<Job | null> {
        return this.modelDelegate.findUnique({
            where: { id } as Prisma.JobWhereUniqueInput,
            include: { postedBy: true }
        })
    }

    async getRecentJobs(days: number): Promise<Job[]> {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        const result = await this.jobDelegate.findMany({
            where: {
                createdAt: {
                    gte: cutoffDate
                }
            },
            include: { postedBy: true },
            orderBy: { createdAt: 'desc' }
        });

        // Debug logging
        console.log('📊 getRecentJobs Debug:');
        console.log('Total jobs found:', result.length);
        if (result.length > 0) {
            console.log('First job structure:', JSON.stringify(result[0], null, 2));
        }

        return result;
    }
}
