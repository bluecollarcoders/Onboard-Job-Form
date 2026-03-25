import { Request, Response, NextFunction } from "express";
import { type ZodType } from "zod";

  export const validateQuery = <T extends ZodType<Record<string, unknown>>>(schema: T) => {
      return async (req: Request, res: Response, next: NextFunction) => {
          try {
            const parsedQuery = await schema.parseAsync(req.query);

            req.validatedQuery = parsedQuery;
                
              next();
          } catch (error) {
              next(error);
          }
      };
  };

