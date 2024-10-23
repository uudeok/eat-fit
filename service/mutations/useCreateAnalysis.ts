import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnalysis } from '../supabase/analysisService';
import { analysisKeys } from '../queryKey';
import { CreateAnalysisArgs } from '../@types';

export function useCreateAnalysis() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (createData: CreateAnalysisArgs) => createAnalysis(createData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: analysisKeys.base });
        },
        onError: (error) => {
            console.error('Error creating Analysis Data:', error);
        },
    });
}
