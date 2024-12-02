import { LoadingAnimation } from '@/components/common';
import { GoalRegisterType } from '@/service/@types';
import { encodeCreateGoal } from '@/service/mappers/goalMapper';
import { useCreateGoal } from '@/service/mutations';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const GoalRegister = ({ registerData }: { registerData: GoalRegisterType }) => {
    console.log(registerData);
    const router = useRouter();

    const { mutate: createGoal } = useCreateGoal();

    const submitGoalData = () => {
        try {
            const createData = encodeCreateGoal({ ...registerData });
            createGoal({ ...createData });
            router.push('/home');
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        submitGoalData();
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100">
            <LoadingAnimation />
        </div>
    );
};

export default GoalRegister;
