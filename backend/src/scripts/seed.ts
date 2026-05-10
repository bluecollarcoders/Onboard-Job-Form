import { prisma } from "@infrastructure/database/prisma.client.js";
import { ApplicationStatus, UserRole } from "@prisma/client";

async function main() {
    console.log('🌱 Starting enhanced incremental seed...');

    // 1. Create Multiple Recruiters
    const recruiters = await createRecruiters();

    // 2. Create Diverse Job Listings
    const jobs = await createJobs(recruiters);

    // 3. Create Candidate Pool
    const candidates = await createCandidates();

    // 4. Create Applications with Realistic Status Distribution
    await createApplications(jobs, candidates, recruiters);

    console.log('✅ Enhanced seed completed successfully!');

    // Print summary
    await printSummary();
}

async function createRecruiters() {
    console.log('👥 Creating recruiters...');

    const recruiterData = [
        {
            email: 'alex.rivera@clinicalcurator.com',
            name: 'Alex Rivera',
            role: 'RECRUITER' as UserRole,
            onboardingStatus: 'COMPLETED' as const
        },
        {
            email: 'sarah.chen@clinicalcurator.com',
            name: 'Sarah Chen',
            role: 'RECRUITER' as UserRole,
            onboardingStatus: 'COMPLETED' as const
        },
        {
            email: 'david.martinez@clinicalcurator.com',
            name: 'David Martinez',
            role: 'RECRUITER' as UserRole,
            onboardingStatus: 'COMPLETED' as const
        },
        {
            email: 'kelsey@rapid.co',
            name: 'Kelsey Kline',
            role: 'RECRUITER' as UserRole,
            onboardingStatus: 'COMPLETED' as const
        }
    ];

    const recruiters = [];
    for (const recruiter of recruiterData) {
        const created = await prisma.user.upsert({
            where: { email: recruiter.email },
            update: {},
            create: recruiter,
        });
        recruiters.push(created);
    }

    console.log(`   ✓ Created/verified ${recruiters.length} recruiters`);
    return recruiters;
}

async function createJobs(recruiters: any[]) {
    console.log('💼 Creating job listings...');

    const jobsData = [
        {
            title: 'Senior Clinical Data Scientist',
            company: 'MedTech Solutions',
            location: 'San Francisco, CA',
            salary: '$150,000 - $200,000',
            description: 'Lead clinical data analysis for breakthrough medical devices. Work with cross-functional teams to derive insights from complex healthcare datasets.',
            isActive: true
        },
        {
            title: 'Staff Clinical Researcher',
            company: 'Biotech Innovations',
            location: 'Boston, MA',
            salary: '$140,000 - $180,000',
            description: 'Design and execute clinical trials for novel therapeutic approaches. Collaborate with regulatory teams and external partners.',
            isActive: true
        },
        {
            title: 'Senior Product Designer',
            company: 'HealthTech Startup',
            location: 'Austin, TX',
            salary: '$130,000 - $170,000',
            description: 'Create intuitive healthcare interfaces that improve patient outcomes. Lead design system initiatives.',
            isActive: true
        },
        {
            title: 'Backend Engineer (Go)',
            company: 'Rapid',
            location: 'Remote',
            salary: '$120,000 - $160,000',
            description: 'Build scalable healthcare APIs. Work on microservices architecture supporting millions of patient records.',
            isActive: true
        },
        {
            title: 'Clinical Operations Manager',
            company: 'PharmaCorp',
            location: 'New York, NY',
            salary: '$110,000 - $140,000',
            description: 'Oversee clinical trial operations from protocol development to study closure. Manage vendor relationships.',
            isActive: true
        },
        {
            title: 'Data Engineer (Healthcare)',
            company: 'MedData Systems',
            location: 'Remote',
            salary: '$135,000 - $175,000',
            description: 'Build data pipelines for clinical research data. Ensure HIPAA compliance and data integrity.',
            isActive: true
        },
        {
            title: 'Clinical Data Manager',
            company: 'TrialTech Solutions',
            location: 'San Diego, CA',
            salary: '$95,000 - $125,000',
            description: 'Manage clinical trial databases and ensure data quality. Support regulatory submissions.',
            isActive: true
        },
        {
            title: 'Senior Frontend Engineer',
            company: 'HealthApp Co',
            location: 'Seattle, WA',
            salary: '$140,000 - $180,000',
            description: 'Build patient-facing web applications using React and TypeScript. Focus on accessibility and performance.',
            isActive: true
        },
        {
            title: 'Biostatistician',
            company: 'Clinical Analytics Inc',
            location: 'Chicago, IL',
            salary: '$120,000 - $150,000',
            description: 'Perform statistical analysis for clinical trials. Develop statistical analysis plans and interpret results.',
            isActive: true
        },
        {
            title: 'DevOps Engineer (Healthcare)',
            company: 'MedCloud Systems',
            location: 'Dallas, TX',
            salary: '$125,000 - $165,000',
            description: 'Manage cloud infrastructure for healthcare applications. Ensure security and compliance.',
            isActive: true
        },
        {
            title: 'Clinical Research Associate',
            company: 'Global Clinical Trials',
            location: 'Miami, FL',
            salary: '$80,000 - $100,000',
            description: 'Monitor clinical trial sites and ensure protocol compliance. Travel required 50%.',
            isActive: true
        },
        {
            title: 'Software Architect',
            company: 'Digital Health Platform',
            location: 'Los Angeles, CA',
            salary: '$180,000 - $220,000',
            description: 'Design scalable architecture for telehealth platform. Lead technical decision-making.',
            isActive: true
        },
        {
            title: 'Regulatory Affairs Specialist',
            company: 'BioRegulatory Consulting',
            location: 'Washington, DC',
            salary: '$100,000 - $130,000',
            description: 'Support FDA submissions and regulatory strategy. Interface with regulatory agencies.',
            isActive: true
        },
        {
            title: 'QA Engineer (Medical Devices)',
            company: 'MedDevice Solutions',
            location: 'Minneapolis, MN',
            salary: '$85,000 - $115,000',
            description: 'Ensure quality of medical device software. Develop test protocols and automation.',
            isActive: true
        },
        {
            title: 'Clinical Trial Manager',
            company: 'Advanced Therapeutics',
            location: 'Philadelphia, PA',
            salary: '$130,000 - $160,000',
            description: 'Lead Phase II/III clinical trials from startup to database lock. Manage budgets and timelines.',
            isActive: true
        }
    ];

    const jobs = [];
    for (let i = 0; i < jobsData.length; i++) {
        const jobData = jobsData[i];
        const recruiter = recruiters[i % recruiters.length]; // Rotate through recruiters

        // Check if job already exists by title and company
        const existingJob = await prisma.job.findFirst({
            where: {
                title: jobData.title,
                company: jobData.company
            }
        });

        const job = existingJob || await prisma.job.create({
            data: {
                ...jobData,
                postedById: recruiter.id
            }
        });
        jobs.push(job);
    }

    console.log(`   ✓ Created/verified ${jobs.length} job listings`);
    return jobs;
}

async function createCandidates() {
    console.log('🎯 Creating candidate pool...');

    const candidatesData = [
        { email: 'info@calebmatteis.online', name: 'Caleb Matteis' },
        { email: 'emily.johnson@email.com', name: 'Emily Johnson' },
        { email: 'michael.rodriguez@email.com', name: 'Michael Rodriguez' },
        { email: 'sarah.wilson@email.com', name: 'Sarah Wilson' },
        { email: 'david.brown@email.com', name: 'David Brown' },
        { email: 'jessica.garcia@email.com', name: 'Jessica Garcia' },
        { email: 'daniel.miller@email.com', name: 'Daniel Miller' },
        { email: 'ashley.davis@email.com', name: 'Ashley Davis' },
        { email: 'christopher.jones@email.com', name: 'Christopher Jones' },
        { email: 'amanda.taylor@email.com', name: 'Amanda Taylor' },
        { email: 'james.anderson@email.com', name: 'James Anderson' },
        { email: 'melissa.thomas@email.com', name: 'Melissa Thomas' },
        { email: 'robert.jackson@email.com', name: 'Robert Jackson' },
        { email: 'jennifer.white@email.com', name: 'Jennifer White' },
        { email: 'matthew.harris@email.com', name: 'Matthew Harris' },
        { email: 'nicole.martin@email.com', name: 'Nicole Martin' },
        { email: 'ryan.thompson@email.com', name: 'Ryan Thompson' },
        { email: 'lauren.garcia@email.com', name: 'Lauren Garcia' },
        { email: 'kevin.martinez@email.com', name: 'Kevin Martinez' },
        { email: 'stephanie.robinson@email.com', name: 'Stephanie Robinson' },
        { email: 'brandon.clark@email.com', name: 'Brandon Clark' },
        { email: 'rachel.lewis@email.com', name: 'Rachel Lewis' },
        { email: 'jason.lee@email.com', name: 'Jason Lee' },
        { email: 'megan.walker@email.com', name: 'Megan Walker' },
        { email: 'andrew.hall@email.com', name: 'Andrew Hall' },
        { email: 'samantha.allen@email.com', name: 'Samantha Allen' },
        { email: 'tyler.young@email.com', name: 'Tyler Young' },
        { email: 'kimberly.wright@email.com', name: 'Kimberly Wright' },
        { email: 'joshua.lopez@email.com', name: 'Joshua Lopez' },
        { email: 'brittany.hill@email.com', name: 'Brittany Hill' },
        { email: 'nathan.scott@email.com', name: 'Nathan Scott' },
        { email: 'danielle.green@email.com', name: 'Danielle Green' },
        { email: 'austin.adams@email.com', name: 'Austin Adams' },
        { email: 'courtney.baker@email.com', name: 'Courtney Baker' },
        { email: 'justin.gonzalez@email.com', name: 'Justin Gonzalez' }
    ];

    const candidates = [];
    for (const candidateData of candidatesData) {
        const candidate = await prisma.user.upsert({
            where: { email: candidateData.email },
            update: {},
            create: {
                email: candidateData.email,
                name: candidateData.name,
                role: 'CANDIDATE' as UserRole,
                onboardingStatus: 'COMPLETED' as const
            }
        });
        candidates.push(candidate);
    }

    console.log(`   ✓ Created/verified ${candidates.length} candidates`);
    return candidates;
}

async function createApplications(jobs: any[], candidates: any[], recruiters: any[]) {
    console.log('📋 Creating applications with realistic status distribution...');

    // Status distribution for realistic dashboard stats
    const statusDistribution = [
        { status: 'SUBMITTED', count: 12 },      // 30% - Brand new applications
        { status: 'RECEIVED', count: 8 },        // 20% - Acknowledged applications
        { status: 'SCREENING', count: 10 },      // 25% - Under review
        { status: 'INTERVIEWING', count: 6 },    // 15% - Active pipeline
        { status: 'OFFER_EXTENDED', count: 3 },  // 7% - Near completion
        { status: 'HIRED', count: 2 },           // 5% - Success stories
        { status: 'REJECTED', count: 1 }         // 2% - Closed applications
    ] as const;

    let applicationCount = 0;

    for (const statusGroup of statusDistribution) {
        for (let i = 0; i < statusGroup.count; i++) {
            const job = jobs[Math.floor(Math.random() * jobs.length)];
            const candidate = candidates[Math.floor(Math.random() * candidates.length)];
            const recruiter = recruiters[Math.floor(Math.random() * recruiters.length)];

            try {
                // Create application
                const application = await prisma.application.create({
                    data: {
                        userId: candidate.id,
                        jobId: job.id,
                        status: statusGroup.status as ApplicationStatus,
                        coverLetter: generateCoverLetter(candidate.name, job.title),
                        notes: statusGroup.status !== 'SUBMITTED' ? generateRecruiterNotes(statusGroup.status) : null,
                        statusHistory: {
                            create: await generateStatusHistory(statusGroup.status as ApplicationStatus, recruiter.id)
                        }
                    }
                });

                applicationCount++;
            } catch (error: any) {
                // Skip if candidate already applied to this job (unique constraint)
                if (error.code === 'P2002') {
                    continue;
                }
                throw error;
            }
        }
    }

    console.log(`   ✓ Created ${applicationCount} applications across all pipeline stages`);
}

function generateCoverLetter(candidateName: string, jobTitle: string): string {
    const templates = [
        `Dear Hiring Manager,\n\nI am excited to apply for the ${jobTitle} position. My background in healthcare technology and passion for improving patient outcomes make me an ideal candidate for this role.\n\nI look forward to discussing how my skills can contribute to your team.\n\nBest regards,\n${candidateName}`,
        `Hello,\n\nI'm writing to express my strong interest in the ${jobTitle} role. With my experience in clinical research and data analysis, I believe I can make a significant impact on your projects.\n\nI would welcome the opportunity to discuss my qualifications further.\n\nSincerely,\n${candidateName}`,
        `To whom it may concern,\n\nThe ${jobTitle} position perfectly aligns with my career goals and expertise. I am particularly drawn to the innovative work your organization is doing in healthcare.\n\nI'm eager to contribute to your mission and grow with your team.\n\nThank you for your consideration,\n${candidateName}`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
}

function generateRecruiterNotes(status: string): string {
    const notesByStatus: Record<string, string[]> = {
        RECEIVED: [
            'Application received, initial review in progress.',
            'Resume looks promising, will review in detail.',
            'Application acknowledged, scheduling review.',
            'Received application, adding to review queue.'
        ],
        SCREENING: [
            'Strong technical background, moving to phone screen.',
            'Excellent resume, scheduling initial interview.',
            'Good fit for the role, proceeding with next steps.',
            'Impressive clinical experience, worth pursuing.'
        ],
        INTERVIEWING: [
            'Great technical interview, scheduling final round.',
            'Strong cultural fit, positive feedback from team.',
            'Solid performance in behavioral interview.',
            'Technical skills validated, checking references.'
        ],
        OFFER_EXTENDED: [
            'Offer sent, negotiating start date and salary.',
            'Candidate requested time to consider, following up.',
            'Strong candidate, competitive offer extended.',
            'Final details being worked out with candidate.'
        ],
        HIRED: [
            'Offer accepted! Starting next month.',
            'Excellent addition to the team, onboarding scheduled.',
            'Great hire, exceeded all interview expectations.'
        ],
        REJECTED: [
            'Not a fit for current role, but worth keeping for future positions.',
            'Lacks required experience, but strong potential for growth roles.'
        ]
    };

    const notes = notesByStatus[status] || ['Status updated.'];
    return notes[Math.floor(Math.random() * notes.length)];
}

async function generateStatusHistory(finalStatus: ApplicationStatus, recruiterId: string) {
    const statusFlow: ApplicationStatus[] = ['SUBMITTED'];

    // Build realistic status progression
    switch (finalStatus) {
        case 'HIRED':
            statusFlow.push('RECEIVED', 'SCREENING', 'INTERVIEWING', 'OFFER_EXTENDED', 'HIRED');
            break;
        case 'OFFER_EXTENDED':
            statusFlow.push('RECEIVED', 'SCREENING', 'INTERVIEWING', 'OFFER_EXTENDED');
            break;
        case 'INTERVIEWING':
            statusFlow.push('RECEIVED', 'SCREENING', 'INTERVIEWING');
            break;
        case 'SCREENING':
            statusFlow.push('RECEIVED', 'SCREENING');
            break;
        case 'RECEIVED':
            statusFlow.push('RECEIVED');
            break;
        case 'REJECTED':
            // Can be rejected at any stage
            const rejectAtStage = Math.random();
            if (rejectAtStage < 0.3) {
                statusFlow.push('REJECTED'); // Rejected immediately
            } else if (rejectAtStage < 0.6) {
                statusFlow.push('RECEIVED', 'REJECTED'); // Rejected after receipt
            } else if (rejectAtStage < 0.9) {
                statusFlow.push('RECEIVED', 'SCREENING', 'REJECTED'); // Rejected after screening
            } else {
                statusFlow.push('RECEIVED', 'SCREENING', 'INTERVIEWING', 'REJECTED'); // Rejected after interview
            }
            break;
        default:
            // SUBMITTED - no additional history
            break;
    }

    // Generate history events with realistic timing
    const history = [];
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - Math.floor(Math.random() * 30)); // 0-30 days ago

    for (let i = 0; i < statusFlow.length; i++) {
        const isInitialSubmission = i === 0;

        history.push({
            fromStatus: i > 0 ? statusFlow[i - 1] : null,
            toStatus: statusFlow[i],
            changedById: isInitialSubmission ? null : recruiterId, // System action vs recruiter action
            createdAt: new Date(currentDate)
        });

        // Add 1-7 days between status changes
        if (i < statusFlow.length - 1) {
            currentDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 7) + 1);
        }
    }

    return history;
}

async function printSummary() {
    const jobCount = await prisma.job.count();
    const candidateCount = await prisma.user.count({ where: { role: 'CANDIDATE' } });
    const recruiterCount = await prisma.user.count({ where: { role: 'RECRUITER' } });
    const applicationCount = await prisma.application.count();

    const statusCounts = await prisma.application.groupBy({
        by: ['status'],
        _count: { id: true }
    });

    console.log('\n📊 Database Summary:');
    console.log(`   Jobs: ${jobCount}`);
    console.log(`   Recruiters: ${recruiterCount}`);
    console.log(`   Candidates: ${candidateCount}`);
    console.log(`   Applications: ${applicationCount}`);
    console.log('\n📈 Application Pipeline:');

    statusCounts.forEach(({ status, _count }) => {
        console.log(`   ${status}: ${_count.id}`);
    });
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });