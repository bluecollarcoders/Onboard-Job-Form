import { apiFetch } from "src/lib/api";
import { type Job, type CreateJobDTO, type SearchJobsDTO } from "@my-app/shared";

export const jobService = {

    // GET all jobs with optional filters.
    getAll: (filters?: SearchJobsDTO): Promise<Job[]> => {
        const searchParams = new URLSearchParams();
        if (filters?.q) searchParams.set('q', filters.q);
        if (filters?.location) searchParams.set('location', filters.location);

        const query = searchParams.toString();
        const endpoint = query ? `/api/jobs?${query}` : '/api/jobs';

        return apiFetch<Job[]>(endpoint);
    },

    // GET a single job by ID.
    getById: (id: string): Promise<Job> => {
        return apiFetch<Job>(`/api/jobs/${id}`);
    },

    // POST a new job.
    create: (data: CreateJobDTO): Promise<Job> => {
        return apiFetch<Job>('/api/jobs', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

}
