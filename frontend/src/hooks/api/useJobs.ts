import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobService } from 'src/services/job.service';
import { type SearchJobsDTO, type CreateJobDTO } from '@my-app/shared';
import { toast } from 'react-hot-toast';

// GET all jobs.
export const useJobs = (filters?: SearchJobsDTO) => {
    return useQuery({
        queryKey: ['jobs', filters],
        queryFn: () => jobService.getAll(filters),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    });
}

// GET single job.
export const useJob = (id: string) => {
    return useQuery({
        queryKey: ['jobs', id],
        queryFn: () => jobService.getById(id),
        enabled: !!id,
    });
}

// POST new job.
export const useCreateJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateJobDTO) => jobService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] })
            toast.success('Job created sucessfully!')
        },
        onError: (error) => {
            toast.error(`Failed to create job: ${error.message}`)
        }
    })
}
