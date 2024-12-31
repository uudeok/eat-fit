import GoalStep from '@/components/funnel/goal/GoalStep';
import FunnelProvider from '@/shared/context/FunnelProvider';

const GoalRegisterPage = () => {
    return (
        <FunnelProvider>
            <GoalStep />
        </FunnelProvider>
    );
};

export default GoalRegisterPage;
