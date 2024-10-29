'use client';

import EmptyState from '../common/EmptyState';
import { Button } from '../common/Button';
import { useRouter } from 'next/navigation';

const Community = () => {
    const router = useRouter();

    // const getRandomInt = (count: number) => {
    //     return Math.floor(Math.random() * count);
    // };

    // const random = getRandomInt(2);
    // console.log('rnadom', random);

    // if (random === 1) {
    //     throw new Error('Error occured WeightStatus');
    // }

    return (
        <div className="mt-28">
            <EmptyState bottomText="준비중 입니다." />

            <div className="w-44 m-auto">
                <Button onClick={() => router.push('/home')} role="round">
                    메인으로
                </Button>
            </div>
        </div>
    );
};

export default Community;
