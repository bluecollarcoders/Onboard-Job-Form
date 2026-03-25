import { Request, Response, NextFunction } from "express";
import { ApplicationService } from "@services/application.service.js";
import { CreateApplicationDTO } from "@my-app/shared";

export class ApplicationController {
    constructor(private appService: ApplicationService) {}

    /**
     * Allows candidates to apply for a role/job.
     * @param req 
     * @param res 
     * @param next 
     */
    apply = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body as CreateApplicationDTO;
            const apply = await this.appService.applyForJob(data);
            res.status(201).json(apply);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Looks for application details. 
     * @param req 
     * @param res 
     * @param next 
     */
    searchApplication = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string
            const search = await this.appService.getApplicationDetails(id);
            res.json(search)
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/applications/job/:jobId - Get all applications for a specific job.
     * Used by kanban board to load candidates
     * @param req 
     * @param res 
     * @param next 
     */
    getApplicationsByJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const jobId = req.params.jobId as string;
            const applications = await this.appService.getApplicationsByJob(jobId);
            res.json(applications);
        } catch (error) {
            next (error);
        }
    }

    /**
     * PATCH /api/applications/:id/status - Update application status
     * Used by kanban drag & drop and status buttons.
     * @param req 
     * @param res 
     * @param next 
     */
    updateApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const applicationId = req.params.id as string;
            const { status, changedById } = req.body;

            const updateApplication = await this.appService.updateStatus(
                applicationId,
                status,
                changedById
            );

            res.json(updateApplication);
        } catch (error) {
            next(error);
        }
    }
  
}
