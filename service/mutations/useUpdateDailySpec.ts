import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDailySpec } from '../supabase/dailyService';
import { dailySpecKeys } from '../queryKey';
import { UpdateDailySpecArgs } from '../@types';

export function useUpdateDailySpec(selectedDate: Date) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateDailySpecArgs) => updateDailySpec(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.date(selectedDate) });
        },
        onError: (error) => {
            console.error('Error updating DailySpec:', error);
        },
    });
}
