// Core apiFetch helper
import { z } from 'zod';

const API_BASE_URL ='http://127.0.0.1:5000';

const ApiErrorSchema = z.object({
    error: z.string(),
    message: z.string(),
    details: z.array(z.object({
        path: z.string(),
        message: z.string()
    })).optional()

});

