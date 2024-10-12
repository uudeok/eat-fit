'use client';

import styles from '@styles/component/mypageEdit.module.css';
import Icons from '@/assets';
import { ListCol, Text } from './common';
import { Input, Textarea } from './common/Form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { UpdateUserArgs, UserType } from '@/service/@types';
import { Button } from './common/Button';
import Image from 'next/image';
import { useImageUpload } from '@/hooks';

const MyPageEdit = ({ userData }: { userData: UserType }) => {
    const router = useRouter();

    const { imageUrl, triggerFileInput, handleFileInputChange, fileRef } = useImageUpload({
        initialImageUrl: userData?.avatar_url || '/user.svg',
    });

    const { register, handleSubmit, setValue } = useForm<UpdateUserArgs>({
        defaultValues: {
            avatar_url: userData?.avatar_url || '/user.svg',
            nickname: userData?.nickname || '',
            content: userData?.content || '',
        },
    });

    const updateUserData = (data: UpdateUserArgs) => {
        console.log(imageUrl);
        console.log('data', data);
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
                    src={imageUrl || '/user.svg'}
                    alt="profile img"
                    width="80px"
                    height="80px"
                    className={styles.avatar}
                />
                <Image
                    src="/camera.png"
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
                    <Text bold color="var(--grey700)">
                        닉네임
                    </Text>
                }
                bottom={
                    <div className={styles.nickname}>
                        <Icons.Pencil width={15} />
                        <Input register={register} name="nickname" placeholder="닉네임" />
                    </div>
                }
            />

            <Textarea
                register={register}
                name="content"
                placeholder="내 소개를 작성해보세요"
                label="내 소개"
                className={styles.content}
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

// 'use client';

// import styles from '@styles/component/mypageEdit.module.css';
// import Icons from '@/assets';
// import { ListCol, Text } from './common';
// import { Input, Textarea } from './common/Form';
// import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
// import { UpdateUserArgs, UserType } from '@/service/@types';
// import { Button } from './common/Button';
// import Image from 'next/image';
// import { useRef } from 'react';

// const MyPageEdit = ({ userData }: { userData: UserType }) => {
//     const router = useRouter();
//     const fileRef = useRef<HTMLInputElement>(null);

//     const avatar_url = userData?.avatar_url || '/user.svg';

//     const { register, handleSubmit, setValue } = useForm<UpdateUserArgs>({
//         defaultValues: {
//             avatar_url: userData?.avatar_url || '/user.svg',
//             nickname: userData?.nickname || '',
//             content: userData?.content || '',
//         },
//     });

//     const updateUserData = (data: UpdateUserArgs) => {
//         console.log('data', data);
//     };

//     const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {
//             console.log(e.target.files);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit(updateUserData)} className={styles.layout}>
//             <Icons.ArrowLeft width={17} onClick={() => router.back()} />
//             <div className={styles.header}>
//                 <Text bold size="lg">
//                     프로필 수정
//                 </Text>
//             </div>

//             <div className={styles.imageContainer}>
//                 <img src={avatar_url} alt="profile img" width="80px" height="80px" className={styles.avatar} />
//                 <Image
//                     src="/camera.png"
//                     alt="Camera Icon"
//                     width={30}
//                     height={30}
//                     className={styles.cameraIcon}
//                     onClick={() => fileRef.current?.click()}
//                 />

//                 <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileInputChange}
//                     ref={fileRef}
//                     className={styles.hidden}
//                 />
//             </div>

//             <ListCol
//                 top={
//                     <Text bold color="var(--grey700)">
//                         닉네임
//                     </Text>
//                 }
//                 bottom={
//                     <div className={styles.nickname}>
//                         <Icons.Pencil width={15} />
//                         <Input register={register} name="nickname" placeholder="닉네임" />
//                     </div>
//                 }
//             />

//             <Textarea
//                 register={register}
//                 name="content"
//                 placeholder="내 소개를 작성해보세요"
//                 label="내 소개"
//                 className={styles.content}
//             />

//             <div className={styles.reviseBtn}>
//                 <Button role="round" size="lg">
//                     수정하기
//                 </Button>
//             </div>
//         </form>
//     );
// };

// export default MyPageEdit;
