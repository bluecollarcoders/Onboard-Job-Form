import { Request, Response } from "express";
import type { NextFunction } from "express";
import { JobService } from "@services/job.service.js";

export class JobController {
    constructor(private jobService: JobService) {}
    
     getAllJobs = async  (req: Request, res: Response, next: NextFunction) => {
        try {
            const jobs = await this.jobService.getAllOpenRoles();
            res.json(jobs);
        } catch (error) {
            next(error);
        }
    }

    getJobId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const job = await this.jobService.getJobDetails(id!);
            res.json(job);
        } catch (error) {
            next(error);
        }
    }
}
