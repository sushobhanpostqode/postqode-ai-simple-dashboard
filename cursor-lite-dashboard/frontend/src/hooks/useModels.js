import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getModels } from "@/services/mockApi";

export const useModels = () => {
    return useQuery({
        queryKey: ["models"],
        queryFn: getModels,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
