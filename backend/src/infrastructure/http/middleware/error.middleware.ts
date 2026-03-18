import { Request, Response, NextFunction } from "express";
import { AppError } from "@domain/error/base.error.js";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        const status = err.code === 'ALREADY_APPLIED' ? 409 :
                       err.code === 'JOB_NOT_FOUND' ? 404 :
                       err.code === 'JOB_CLOSED' ? 410 : 400

            return res.status(status).json({
                error: err.code,
                message: err.message
            });
    }

    console.error('[Unhandled Error]:', err);

    return res.status(500).json({
        error: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred.'
    });
};
