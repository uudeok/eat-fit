import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateUserArgs } from '../@types';
import { updateUser } from '../api/usersApi';
import { usersKeys } from '../utils/queryKey';
import toastNotify from '@/shared/utils/toast';
import { TOAST_MESSAGES } from '@/constants';

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateUserArgs) => updateUser(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: usersKeys.base });

            toastNotify.success(TOAST_MESSAGES.SUCCESS);
        },
        onError: (error) => {
            console.error('Error updating User Data:', error);

            toastNotify.error(TOAST_MESSAGES.ERROR);
        },
    });
}
