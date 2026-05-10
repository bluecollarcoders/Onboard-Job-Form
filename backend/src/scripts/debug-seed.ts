import { prisma } from "@infrastructure/database/prisma.client.js";

async function debugSeed() {
    console.log('🔍 Debugging seed data...\n');

    // Check current state
    const users = await prisma.user.findMany({
        orderBy: { role: 'asc' }
    });

    console.log(`Found ${users.length} users:`);
    users.forEach(user => {
        console.log(`   - ${user.name} (${user.email}) - ${user.role}`);
    });

    const jobs = await prisma.job.findMany();
    console.log(`\nFound ${jobs.length} jobs`);

    const applications = await prisma.application.findMany();
    console.log(`Found ${applications.length} applications`);

    // Try to create one test recruiter to see if there's an issue
    console.log('\n🧪 Testing recruiter creation...');
    try {
        const testRecruiter = await prisma.user.upsert({
            where: { email: 'alex.rivera@clinicalcurator.com' },
            update: {},
            create: {
                email: 'alex.rivera@clinicalcurator.com',
                name: 'Alex Rivera',
                role: 'RECRUITER',
                onboardingStatus: 'COMPLETED'
            }
        });
        console.log(`   ✅ Created/found: ${testRecruiter.name}`);
    } catch (error) {
        console.log(`   ❌ Error creating recruiter:`, error);
    }
}

debugSeed()
    .catch(console.error)
    .finally(() => prisma.$disconnect());