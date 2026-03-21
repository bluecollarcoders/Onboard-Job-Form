import { Router } from "express";
import { ApplicationController } from "../controllers/application.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { CreateApplicationSchema } from "@my-app/shared";

export const createApplicationRouter = (applicationController: ApplicationController) => {
    const router = Router();

    router.get('/:id', applicationController.searchApplication);
    router.post('/', validate(CreateApplicationSchema), applicationController.apply);

    return router;
}
