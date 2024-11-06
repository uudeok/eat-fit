'use client';

import styles from '@styles/component/mypageEdit.module.css';
import Icons from '@/assets';
import { ListCol, Text } from '../common';
import { Input, Textarea } from '../common/Form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '../common/Button';
import Image from 'next/image';
import { useImageUpload } from '@/hooks';
import { useUpdateUser } from '@/service/mutations';
import { DecodeUser, encodeUser, UpdateUserType } from '@/service/mappers/userMapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { contentValidation, mypageEditFormSchema } from '@/shared/utils/validation/mypageEditValidation';

const MyPageEdit = ({ userData }: { userData: DecodeUser }) => {
    const router = useRouter();

    const { imageUrl, triggerFileInput, handleFileInputChange, fileRef, uploadImageToS3 } = useImageUpload({
        initialImageUrl: userData?.avatarUrl || '/images/user.svg',
    });

    const { mutateAsync: updateUser } = useUpdateUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateUserType>({
        resolver: zodResolver(mypageEditFormSchema),
        defaultValues: {
            id: userData.id,
            avatarUrl: userData?.avatarUrl,
            nickname: userData?.nickname,
            content: userData?.content,
        },
    });

    const updateUserData = async (data: UpdateUserType) => {
        const uploadedImageUrl = await uploadImageToS3();

        const updateData = {
            id: userData.id,
            avatarUrl: uploadedImageUrl || data.avatarUrl,
            content: data.content,
            nickname: data.nickname,
        };

        const updateUserData = encodeUser({ ...updateData });

        await updateUser(updateUserData);

        router.push('/mypage');
    };

    return (
        <form onSubmit={handleSubmit(updateUserData)} className={styles.layout}>
            <Icons.ArrowLeft width={17} onClick={() => router.back()} />
            <div className={styles.header}>
                <Text bold size="lg">
                    프로필 수정
                </Text>
            </div>

            <div className={styles.imageContainer}>
                <img
                    src={imageUrl || '/images/user.svg'}
                    alt="profile img"
                    width="80px"
                    height="80px"
                    className={styles.avatar}
                />
                <Image
                    src="/images/camera.png"
                    alt="Camera Icon"
                    width={30}
                    height={30}
                    className={styles.cameraIcon}
                    onClick={triggerFileInput}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    ref={fileRef}
                    className={styles.hidden}
                />
            </div>

            <ListCol
                top={
                    <div>
                        <Text bold color="var(--grey700)">
                            닉네임
                        </Text>
                    </div>
                }
                bottom={
                    <div className={styles.nickname}>
                        <Input
                            register={register}
                            name="nickname"
                            placeholder="닉네임"
                            rules={{ required: true }}
                            errors={errors}
                        />
                    </div>
                }
            />

            <Textarea
                register={register}
                name="content"
                placeholder="내 소개를 작성해보세요 (150자)"
                label="내 소개"
                className={styles.content}
                onInput={contentValidation}
            />

            <div className={styles.reviseBtn}>
                <Button role="round" size="lg">
                    수정하기
                </Button>
            </div>
        </form>
    );
};

export default MyPageEdit;
