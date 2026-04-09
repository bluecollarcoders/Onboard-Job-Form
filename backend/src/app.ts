import express from 'express'
import cors from 'cors';
import { prisma } from "@infrastructure/database/prisma.client.js";

// Repositories
import { PrismaJobRepository } from "@infrastructure/database/repositories/prisma-job.repo.js";
import { PrismaApplicationRepository } from "@infrastructure/database/repositories/prisma-application.repo.js";

// Services
import { JobService } from "@services/job.service.js";
import { ApplicationService } from "@services/application.service.js";
import { DashboardService } from '@services/dashboard.service.js';

// Controllers
import { JobController } from "@infrastructure/http/controllers/job.controller.js";
import { ApplicationController } from "@infrastructure/http/controllers/application.controller.js";
import { DashboardController } from '@infrastructure/http/controllers/dashboard.controller.js';

// Routers
import { createJobRouter } from "@infrastructure/http/routes/job.routes.js";
import { createApplicationRouter } from "@infrastructure/http/routes/application.routes.js";
import { dashboardRouter } from '@infrastructure/http/routes/dashboard.routes.js';

// Middleware
import { errorHandler } from "@infrastructure/http/middleware/error.middleware.js";

const app = express();

// 1. Basic Middleware
app.use(cors());
app.use(express.json());

// 2. Intialize Dependency Chain.
const jobRepo = new PrismaJobRepository(prisma);
const appRepo = new PrismaApplicationRepository(prisma);

const dashboardService = new DashboardService();

const jobService = new JobService(jobRepo);
const applicationService = new ApplicationService(appRepo, jobRepo);

const jobController = new JobController(jobService);
const applicationController = new ApplicationController(applicationService);
const dashboardController = new DashboardController(dashboardService);

// 3. Mount Routers.
app.use('/api/jobs', createJobRouter(jobController));
app.use('/api/applications', createApplicationRouter(applicationController));
app.use('/api/dashboard', dashboardRouter(dashboardController));

// 4. Global Error Handler. (MUST BE LAST).
app.use(errorHandler);

export default app;
