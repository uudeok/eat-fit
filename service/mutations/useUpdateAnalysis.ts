import { useMutation, useQueryClient } from '@tanstack/react-query';
import { analysisKeys } from '../utils/queryKey';
import { updateAnalysis } from '../api/analysisApi';
import { UpdateAnalysisArgs } from '../@types';
import toastNotify from '@/shared/utils/toast';
import { TOAST_MESSAGES } from '@/constants';

export function useUpdateAnalysis() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateAnalysisArgs) => updateAnalysis(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: analysisKeys.base });
        },
        onError: (error) => {
            console.error('Error updating Analysis Data:', error);

            toastNotify.error(TOAST_MESSAGES.ERROR);
        },
    });
}
