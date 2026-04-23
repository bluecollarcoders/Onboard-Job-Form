
import { ApiError } from "./error";
import { ApiErrorSchema } from "./schemas";

const API_BASE_URL = 'http://127.0.0.1:5000';

export const apiFetch = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    // Check if the response is successful.
    if (!response.ok) {
        const errorData = await response.json();

        // Validate the error data against Zod schema.
        const parsedError = ApiErrorSchema.parse(errorData);

        // Get Instance of ApiError class.
        const apiErrorCall = new ApiError(
            response.status,
            parsedError.error,
            parsedError.message,
            parsedError.details
        );

        // Throw apiErrorCall.
        throw apiErrorCall;
    } 

    // If all is good, return the successful data.
    if (response.status === 204) return {} as T;

    return response.json();
}
