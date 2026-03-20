import { Request, Response, NextFunction } from "express";
import { ApplicationService } from "@services/application.service.js";
import { CreateApplicationDTO } from "@my-app/shared";

export class ApplicationController {
    constructor(private appService: ApplicationService) {}

    apply = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body as CreateApplicationDTO;
            const apply = await this.appService.applyForJob(data);
            res.status(201).json(apply);
        } catch (error) {
            next(error);
        }
    }

    searchApplication = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string
            const search = await this.appService.getApplicationDetails(id);
            res.json(search)
        } catch (error) {
            next(error);
        }
    }
}
