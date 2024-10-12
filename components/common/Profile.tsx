'use client';

import styles from '@styles/common/profile.module.css';
import Text from './Text';
import { useFetchUsers } from '@/service/queries';

type AvatarProps = {
    direction?: 'vertical' | 'horizontal';
    size?: 'sm' | 'md' | 'lg';
    showDetails?: boolean;
};

const Profile = (props: AvatarProps) => {
    const { direction = 'horizontal', size = 'sm', showDetails = true } = props;

    const { data: userData } = useFetchUsers();

    const avatar_url = userData?.avatar_url || '/user.svg';

    return (
        <div className={`${styles[direction]} ${styles.layout}`}>
            <img
                src={avatar_url}
                alt="profile img"
                width="45px"
                height="45px"
                className={`${styles.profile} ${styles[size]}`}
            />
            <div className={styles.detail}>
                <Text bold color="var(--grey700)" size="xlg">
                    {userData?.nickname}
                </Text>

                {showDetails && (
                    <div className={styles.detailInfo}>
                        <Text size="sm">피드 0</Text>
                        <Text size="sm">팔로워 0</Text>
                        <Text size="sm">팔로잉 0 </Text>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
