import { useQuery } from '@tanstack/react-query';
import { analysisKeys } from '../queryKey';
import { fetchAnalysis } from '../api/analysisService';

const staleTime = 5 * 60 * 1000; // 5분 동안 캐시된 데이터 사용
const gcTime = 10 * 60 * 1000; // 10분 동안 캐시 유지

// enabled true 일때만 쿼리 실행

export const useFetchAnalysis = (condition?: boolean) => {
    return useQuery({
        queryKey: analysisKeys.base,
        queryFn: fetchAnalysis,
        staleTime: staleTime,
        gcTime: gcTime,
        enabled: condition,
    });
};
