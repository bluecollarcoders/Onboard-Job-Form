import { AppError } from "./base.error.js"; 

export class AlreadyAppliedError extends AppError {
    constructor() {
        super("You have already applied for this position.", "ALREADY_APPLIED");
    }
}

export class JobClosedError extends AppError {
    constructor() {
        super("This position is no longer accepting applications.", "JOB_CLOSED");
    }
}

export class JobNotFound extends AppError {
    constructor() {
        super("The job you are applying for does not exist.", "JOB_NOT_FOUND");
    }
}
