import "dotenv/config";
import { prisma } from "..//src/infrastructure/database/prisma.client";

async function main() {
    console.log('🌱 Starting seed...');

    // 1. Create the Recruiter 
    const recruiter = await prisma.user.upsert({
        where: { email: 'kelsey@rapid.co' },
        update: {},
        create: {
            email: 'kelsey@rapid.co',
            name: 'Kelsey Kline',
            role: 'RECRUITER',
            onboardingStatus: 'COMPLETED'
        },
    });

    // 2. Create the Job
    const job = await prisma.job.create({
        data: {
            title: 'Software Developer',
            company: 'Rapid',
            location: 'Remote',
            salary: '190,000',
            description: 'Join the team at Rapid...',
            postedById: recruiter.id,
        },
    });

    // 3 Create Yourself as the Candidate
    const candidate = await prisma.user.upsert({
        where: { email: 'info@calebmatteis.online' },
        update: {},
        create: {
            email: 'info@calebmatteis.online',
            name: 'Caleb Matteis',
            role: 'CANDIDATE',
        },
    });

    // 4 Create the Application + The Intial History Event
    await prisma.application.create({
        data: {
            userId: candidate.id,
            jobId: job.id,
            status: 'SUBMITTED',
            coverLetter: 'I am excited to apply for this role!',
            statusHistory: {
                create: {
                    toStatus: 'SUBMITTED',
                    // Note: changedById is null here because it was a system action (User Applied)
                },
            },
        },
    });

    console.log(' Seed successful.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally( async () => {
        await prisma.$disconnect();
    });
