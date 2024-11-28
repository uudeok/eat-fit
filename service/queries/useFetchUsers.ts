import { useQuery } from '@tanstack/react-query';
import { usersKeys } from '../utils/queryKey';
import { fetchUsersData } from '../api/usersApi';

const staleTime = 5 * 60 * 1000; // 5분 동안 캐시된 데이터 사용
const gcTime = 10 * 60 * 1000; // 10분 동안 캐시 유지

export const useFetchUsers = () => {
    return useQuery({
        queryKey: usersKeys.base,
        queryFn: fetchUsersData,
        staleTime: staleTime,
        gcTime: gcTime,
    });
};
