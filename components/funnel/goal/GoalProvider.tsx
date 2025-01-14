import FunnelProvider from '@/shared/context/FunnelProvider';
import GoalStep from './GoalStep';

const GoalProvider = () => {
    return (
        <FunnelProvider>
            <GoalStep />
        </FunnelProvider>
    );
};

export default GoalProvider;
