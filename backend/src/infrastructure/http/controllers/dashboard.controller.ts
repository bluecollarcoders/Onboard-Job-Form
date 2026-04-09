import { Request, Response, NextFunction } from "express";
import { DashboardService } from "@services/dashboard.service.js";

export class DashboardController {

    constructor(private dashboardService: DashboardService) {}

    getStats = async (req: Request, res: Response, next: NextFunction) => {

        try {

            const dashboardStats = await this.dashboardService.getDashboardStats();
            res.json(dashboardStats);

        } catch (error) {
            console.error('Dashboard stats error:', error);
            next(error);
        }

    }
    
}
