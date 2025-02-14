import styles from '@styles/component/weightChart.module.css';
import Icons from '@/assets';
import { ListRow, Text } from '@/components/common';
import { useFetchGoalsByStatus } from '@/service/queries';

const WeightChartHeader = () => {
    const { data: goalData } = useFetchGoalsByStatus('progress');

    const GOAL_WEIGHT = [
        { value: goalData?.weight, label: '시작 몸무게', icon: <Icons.FillLaughFace width={15} /> },
        { value: goalData?.targetWeight, label: '목표 몸무게', icon: <Icons.Flag width={15} /> },
    ];

    return (
        <div className={styles.header}>
            {GOAL_WEIGHT.map((weight, idx) => (
                <ListRow
                    className={styles.weightSummary}
                    key={idx}
                    left={
                        <Text color="white" size="xlg" bold>
                            {weight.icon} {weight.label}
                        </Text>
                    }
                    right={
                        <Text size="xlg" color="white" bold>
                            {weight.value}kg
                        </Text>
                    }
                />
            ))}
        </div>
    );
};

export default WeightChartHeader;
