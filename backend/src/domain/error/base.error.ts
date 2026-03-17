export abstract class AppError extends Error {
    // We include a 'code' so the frontend doesn't have to guess.
    constructor(public message: string, public code: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
