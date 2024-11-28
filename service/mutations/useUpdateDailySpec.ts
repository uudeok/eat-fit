import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDailySpec } from '../api/dailyApi';
import { dailySpecKeys } from '../utils/queryKey';
import { UpdateDailySpecArgs } from '../@types';
import toastNotify from '@/shared/utils/toast';
import { TOAST_MESSAGES } from '@/constants';

export function useUpdateDailySpec() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateDailySpecArgs) => updateDailySpec(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.base });
        },
        onError: (error) => {
            console.error('Error updating DailySpec:', error);

            toastNotify.error(TOAST_MESSAGES.ERROR);
        },
    });
}
