import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/services/mockApi";

export const useDashboardStats = () => {
    return useQuery({
        queryKey: ["dashboardStats"],
        queryFn: getDashboardStats,
        staleTime: 30 * 1000, // 30 seconds
        refetchInterval: 60 * 1000, // Refetch every minute
    });
};
