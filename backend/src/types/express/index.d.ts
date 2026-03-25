
declare global {
    namespace Express {
        export interface Request {
            validatedQuery?: Record<string, unknown>;
        }
    }
}

export{};
