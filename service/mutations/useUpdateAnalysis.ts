import { useMutation, useQueryClient } from '@tanstack/react-query';
import { analysisKeys } from '../queryKey';
import { updateAnalysis } from '../supabase/analysisService';
import { UpdateAnalysisArgs } from '../@types';

export function useUpdateAnalysis() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateAnalysisArgs) => updateAnalysis(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: analysisKeys.base });
        },
        onError: (error) => {
            console.error('Error updating Analysis Data:', error);
        },
    });
}
