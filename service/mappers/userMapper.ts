import { UpdateUserArgs, UserExposeType, UserRoleType, UserType } from '../@types';

export type DecodeUser = {
    id: string;
    username: string;
    nickname: string;
    avatarUrl: string;
    email: string;
    role: UserRoleType;
    expose: UserExposeType;
    content: string;
    createdAt: string;
};

export const decodeUser = (init: UserType): DecodeUser => ({
    id: init.id,
    username: init.username,
    nickname: init.nickname,
    avatarUrl: init.avatar_url || '/user.svg',
    email: init.email,
    role: init.role,
    expose: init.expose,
    content: init.content,
    createdAt: init.created_at,
});

export type UpdateUserType = {
    id: string;
    avatarUrl: string;
    nickname: string;
    content: string;
};

export const encodeUser = (init: UpdateUserType): UpdateUserArgs => ({
    id: init.id,
    avatar_url: init.avatarUrl,
    nickname: init.nickname,
    content: init.content,
});
