import { Request, Response } from "express";
import type { NextFunction } from "express";
import { JobService } from "@services/job.service.js";
import { CreateJobDTO } from "@my-app/shared";

export class JobController {
    constructor(private jobService: JobService) {}
    
     getAllJobs = async  (req: Request, res: Response, next: NextFunction) => {

        try {
            const jobs = await this.jobService.getAllOpenRoles(req.validatedQuery);
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

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body as CreateJobDTO;
            const newJob = await this.jobService.postNewJob(data);
            res.status(201).json(newJob);
        } catch (error) {
            next(error);
        }
    }
}
