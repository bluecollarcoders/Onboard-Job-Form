import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller.js";

export const dashboardRouter = (dashboardController: DashboardController) => {
    const router = Router();

    router.get('/', dashboardController.getStats);

    return router;
}
