import { Request, Response, NextFunction } from "express";
import { DashboardService } from "@services/dashboard.service.js";
import { DashboardStatsSchema } from "@my-app/shared";

export class DashboardController {

    constructor(private dashboardService: DashboardService) {}

    getStats = async (req: Request, res: Response, next: NextFunction) => {

        try {

            const dashboardStats = await this.dashboardService.getDashboardStats();
            const validatedStats = DashboardStatsSchema.parse(dashboardStats);
            res.json(validatedStats);

        } catch (error) {
            console.error('Dashboard stats error:', error);
            next(error);
        }

    }
    
}
