import { Request, Response } from "express";
import type { NextFunction } from "express";
import { type ZodType } from "zod";

export const validate = <T extends ZodType>(schema: T) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        } catch (error) {
            next(error);
        }
    };
};
