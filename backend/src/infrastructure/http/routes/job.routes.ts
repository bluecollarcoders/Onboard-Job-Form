import { Router } from "express";
import { JobController } from "../controllers/job.controller.js";
import { validate } from "../middleware/validate.middleware.js";

export const createJobRouter = (JobController: JobController) => {
    const router = Router();

    router.get('/', JobController.getAllJobs);
    router.get('/:id', JobController.getJobId);
    
    return router;
}
