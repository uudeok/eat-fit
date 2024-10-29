import { z } from 'zod';

/* 소문자, 대문자, 한글, 숫자 입력 가능 2자이상 10자 이하 */
// const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;

export const contentValidation = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const input = e.target as HTMLTextAreaElement;

    if (input.value.length > 150) {
        input.value = input.value.slice(0, 150);
    }

    return input.value;
};

export const mypageEditFormSchema = z.object({
    id: z.string(),
    avatarUrl: z.string(),
    nickname: z
        .string()
        .trim()
        .regex(nicknameRegex, { message: '한글, 영어, 숫자만 입력 가능합니다 (띄어쓰기 허용X)' })
        .min(2, { message: '최소 2자 이상이어야 합니다.' })
        .max(10, { message: '최대 10자 이내로 입력해야 합니다.' }),
    content: z.string().trim().max(150, { message: '내용은 150자 이내로 입력해야 합니다.' }),
});
