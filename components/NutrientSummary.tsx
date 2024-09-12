import styles from '@styles/component/nutrientSummary.module.css';
import { List, Text, ProgressBar, ListRow, CircleText, ListCol } from './common';

const NutrientSummary = () => {
    const NUTRIENTS = [
        { label: '탄', value: '15g', bgColor: 'var(--mainColorDk)' },
        { label: '단', value: '20g', bgColor: 'var(--orange300)' },
        { label: '지', value: '8g', bgColor: 'var(--red300)' },
    ];

    return (
        <>
            <List className={styles.calories}>
                <ListCol
                    top={
                        <Text size="xxlg" bold color="white">
                            850 / 1600 Kcal
                        </Text>
                    }
                    bottom={<ProgressBar current={850} total={1600} />}
                />
            </List>

            <div className={styles.nutrients}>
                {NUTRIENTS.map((nutrient) => (
                    <ListRow
                        key={nutrient.label}
                        className={styles.nutrientItem}
                        left={<CircleText text={nutrient.label} size={24} background={nutrient.bgColor} />}
                        right={
                            <Text color="white" bold size="xlg">
                                {nutrient.value}
                            </Text>
                        }
                    />
                ))}
            </div>
        </>
    );
};

export default NutrientSummary;
