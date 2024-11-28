import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDailySpec } from '../api/dailyApi';
import { CreateDailySpecArgs } from '../@types';
import { dailySpecKeys } from '../utils/queryKey';
import toastNotify from '@/shared/utils/toast';
import { TOAST_MESSAGES } from '@/constants';

export function useCreateDailySpec() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dailyData: CreateDailySpecArgs) => createDailySpec(dailyData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.base });
        },
        onError: (error) => {
            console.error('Error creating DailySpec:', error);

            toastNotify.error(TOAST_MESSAGES.ERROR);
        },
    });
}
