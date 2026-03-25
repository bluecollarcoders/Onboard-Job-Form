import { Router } from "express";
import { JobController } from "../controllers/job.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { validateQuery } from "../middleware/validateQuery.middleware.js";
import { CreateJobSchema, SearchJobsSchema } from "@my-app/shared";

export const createJobRouter = (jobController: JobController) => {
    const router = Router();

    router.get('/', validateQuery(SearchJobsSchema), jobController.getAllJobs);
    router.get('/:id', jobController.getJobId);
    router.post('/', validate(CreateJobSchema), jobController.create);
    
    return router;
}
