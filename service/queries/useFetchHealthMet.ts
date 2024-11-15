import { useQuery } from '@tanstack/react-query';
import { healthMetKeys } from '../utils/queryKey';
import { fetchHealthMetDatas } from '../api/healthMetService';

const staleTime = 5 * 60 * 1000; // 5분 동안 캐시된 데이터 사용
const gcTime = 10 * 60 * 1000; // 10분 동안 캐시 유지

export const useFetchHealthMet = (keyword: string) => {
    return useQuery({
        queryKey: healthMetKeys.keyword(keyword),
        queryFn: () => fetchHealthMetDatas(keyword),
        staleTime: staleTime,
        gcTime: gcTime,
        enabled: !!keyword,
    });
};
