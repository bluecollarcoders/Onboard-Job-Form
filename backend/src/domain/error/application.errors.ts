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

export class JobInactiveError extends AppError {
    constructor() {
        super("This job is inactive and is no longer taking applications", "JOB_INACTIVE");
    }
}

export class ApplicationNotFound extends AppError {
    constructor() {
        super("The application you are looking for does not exist.", "APPLICATION_NOT_FOUND");
    }
}

