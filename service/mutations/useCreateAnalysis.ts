import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnalysis } from '../api/analysisService';
import { analysisKeys } from '../utils/queryKey';
import { CreateAnalysisArgs } from '../@types';
import toastNotify from '@/shared/utils/toast';
import { TOAST_MESSAGES } from '@/constants';

export function useCreateAnalysis() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (createData: CreateAnalysisArgs) => createAnalysis(createData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: analysisKeys.base });
        },
        onError: (error) => {
            console.error('Error creating Analysis Data:', error);

            toastNotify.error(TOAST_MESSAGES.ERROR);
        },
    });
}
