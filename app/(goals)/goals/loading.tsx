import { LoadingAnimation } from '@/components/common';

const GoalLoadingBar = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100">
            <LoadingAnimation />
        </div>
    );
};

export default GoalLoadingBar;
