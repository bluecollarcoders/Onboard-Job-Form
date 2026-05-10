import { prisma } from "@infrastructure/database/prisma.client.js";

async function checkData() {
    console.log('🔍 Database Health Check\n');

    // Count all records
    const userCount = await prisma.user.count();
    const jobCount = await prisma.job.count();
    const applicationCount = await prisma.application.count();
    const statusEventCount = await prisma.applicationStatusEvent.count();

    console.log('📊 Record Counts:');
    console.log(`   Users: ${userCount}`);
    console.log(`   Jobs: ${jobCount}`);
    console.log(`   Applications: ${applicationCount}`);
    console.log(`   Status Events: ${statusEventCount}\n`);

    // Break down users by role
    const usersByRole = await prisma.user.groupBy({
        by: ['role'],
        _count: { id: true }
    });

    console.log('👥 Users by Role:');
    usersByRole.forEach(({ role, _count }) => {
        console.log(`   ${role}: ${_count.id}`);
    });

    // Break down applications by status
    const applicationsByStatus = await prisma.application.groupBy({
        by: ['status'],
        _count: { id: true }
    });

    console.log('\n📋 Applications by Status:');
    applicationsByStatus.forEach(({ status, _count }) => {
        console.log(`   ${status}: ${_count.id}`);
    });

    // Sample data check
    console.log('\n🔍 Sample Records:');

    const sampleJob = await prisma.job.findFirst({
        include: {
            postedBy: true,
            _count: {
                applications: true
            }
        }
    });

    if (sampleJob) {
        console.log(`   Job: "${sampleJob.title}" at ${sampleJob.company}`);
        console.log(`   Posted by: ${sampleJob.postedBy.name}`);
        console.log(`   Applications: ${sampleJob._count.applications}`);
    }

    const sampleApplication = await prisma.application.findFirst({
        include: {
            user: true,
            job: true,
            statusHistory: true
        }
    });

    if (sampleApplication) {
        console.log(`   Application: ${sampleApplication.user.name} → ${sampleApplication.job.title}`);
        console.log(`   Status: ${sampleApplication.status}`);
        console.log(`   History Events: ${sampleApplication.statusHistory.length}`);
    }

    console.log('\n✅ Database check complete!');
}

checkData()
    .catch(console.error)
    .finally(() => prisma.$disconnect());