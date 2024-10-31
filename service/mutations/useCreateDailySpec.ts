import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDailySpec } from '../api/dailyService';
import { CreateDailySpecArgs } from '../@types';
import { dailySpecKeys } from '../utils/queryKey';

export function useCreateDailySpec() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dailyData: CreateDailySpecArgs) => createDailySpec(dailyData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.base });
        },
        onError: (error) => {
            console.error('Error creating DailySpec:', error);
        },
    });
}
