import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateUserArgs } from '../@types';
import { updateUser } from '../api/usersService';
import { usersKeys } from '../queryKey';

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateUserArgs) => updateUser(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: usersKeys.base });
        },
        onError: (error) => {
            console.error('Error updating User Data:', error);
        },
    });
}
