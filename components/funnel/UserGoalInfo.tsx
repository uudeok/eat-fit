import { Button } from '../common/Button';

type Props = {
    onNext: () => void;
};

const UserGoalInfo = ({ onNext }: Props) => {
    const handleGoalInfo = () => {
        onNext();
    };

    return (
        <form>
            <div>user goal Info</div>

            <Button size="lg" role="confirm" onClick={() => handleGoalInfo()}>
                다음
            </Button>
        </form>
    );
};

export default UserGoalInfo;
