import BurnedCalorieStatus from './status/BurnedCalorieStatus';
import MoodStatus from './status/MoodStatus';
import WeightStatus from './status/WeightStatus';

const TodayStatus = () => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <MoodStatus />

            <WeightStatus />

            <BurnedCalorieStatus />
        </div>
    );
};

export default TodayStatus;
