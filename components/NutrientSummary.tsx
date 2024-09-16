import styles from '@styles/component/nutrientSummary.module.css';
import { List, Text, ProgressBar, ListRow, CircleText, ListCol } from './common';
import { Meals, Meals2, Meals3 } from '@/constants/meals';
import { calculateNutrientTotals } from '@/shared/utils';
import { useMemo } from 'react';

const MEALS = [Meals, Meals2, Meals3];

const NutrientSummary = () => {
    const meals = MEALS.map((item) => item.meal).flat();
    const nutrientTotals = useMemo(() => calculateNutrientTotals(meals), [meals]);

    const NUTRIENTS = [
        { label: '탄', value: nutrientTotals.carbohydrate, bgColor: 'var(--mainColorDk)' },
        { label: '단', value: nutrientTotals.protein, bgColor: 'var(--orange300)' },
        { label: '지', value: nutrientTotals.fat, bgColor: 'var(--red300)' },
    ];

    return (
        <>
            <List className={styles.calories}>
                <ListCol
                    top={
                        <Text size="xxlg" bold color="white">
                            {nutrientTotals.calories} / 1600 Kcal
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
                                {nutrient.value}g
                            </Text>
                        }
                    />
                ))}
            </div>
        </>
    );
};

export default NutrientSummary;
