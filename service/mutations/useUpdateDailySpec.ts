import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDailySpec } from '../api/dailyService';
import { dailySpecKeys } from '../queryKey';
import { UpdateDailySpecArgs } from '../@types';

export function useUpdateDailySpec() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateDailySpecArgs) => updateDailySpec(data),
        onSuccess: (data) => {
            // queryClient.invalidateQueries({ queryKey: dailySpecKeys.date(selectedDate) });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.base });
        },
        onError: (error) => {
            console.error('Error updating DailySpec:', error);
        },
    });
}
