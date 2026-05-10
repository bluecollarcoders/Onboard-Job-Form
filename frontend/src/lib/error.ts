export interface ApiErrorDetails {
    path: string,
    message: string
}

export class ApiError extends Error {
    public readonly status: number;
    public readonly code: string;
    public readonly details: ApiErrorDetails[] | undefined;
    constructor(
        status: number,
        code: string,
        message: string,
        details?: ApiErrorDetails[]
    ) {
        super(message);

        this.status = status;
        this.code = code;
        this.details = details;
        this.name = 'ApiError';

        const ErrorWithStackTrace = Error as typeof Error & {
            captureStackTrace?: (targetObject: object, constructorOpt?: Function) => void;
        };

        ErrorWithStackTrace.captureStackTrace?.(this, ApiError);

    }

}
