import { apiFetch } from "../lib/api";
import { type DashboardStatsDTO } from "@my-app/shared";


export const dashboardService = {
    getStats: (): Promise<DashboardStatsDTO> => {
        return apiFetch<DashboardStatsDTO>('/api/dashboard/')
    }
}
