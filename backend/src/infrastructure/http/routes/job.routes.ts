import { Router } from "express";
import { JobController } from "../controllers/job.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { CreateJobSchema } from "@my-app/shared";

export const createJobRouter = (jobController: JobController) => {
    const router = Router();

    router.get('/', jobController.getAllJobs);
    router.get('/:id', jobController.getJobId);
    router.post('/', validate(CreateJobSchema), jobController.create);
    
    return router;
}
