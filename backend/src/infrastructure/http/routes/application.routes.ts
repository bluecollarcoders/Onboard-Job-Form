import { Router } from "express";
import { ApplicationController } from "../controllers/application.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { CreateApplicationSchema } from "@my-app/shared";

export const createApplicationRouter = (applicationController: ApplicationController) => {
    const router = Router();

    // Routes.
    router.get('/:id', applicationController.searchApplication);
    router.post('/', validate(CreateApplicationSchema), applicationController.apply);

    // NEW routes for kanban board. 
    router.get('/job/:jobId', applicationController.getApplicationsByJob);
    router.patch('/:id/status', applicationController.updateApplicationStatus);

    return router;
}
