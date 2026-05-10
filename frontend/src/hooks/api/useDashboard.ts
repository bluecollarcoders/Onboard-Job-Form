import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { dashboardService } from '../../services/dashboard.service';
import { type DashboardStatsDTO } from '@my-app/shared';

// Get stats.
export const useDashboardStats = (): UseQueryResult<DashboardStatsDTO> => {
    return useQuery({
        queryKey: ['dashboard', 'stats'],
        queryFn: () => dashboardService.getStats(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    })
}
