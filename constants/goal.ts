export const ACTIVITY_LEVEL = {
    very_low: 1.2,
    low: 1.375,
    moderate: 1.55,
    high: 1.725,
    very_high: 1.9,
};

export const MEAL_PLAN = {
    normal: '일반',
    proteinFocused: '근육',
    lowCarbHighFat: '저탄고지',
};

export const MIN_WEIGHT = 30;
export const MAX_WEIGHT = 250;

export const GENDER = [
    { key: 'F', value: '여성', emj: 'female.png', selected: 'female_fill.png' },
    { key: 'M', value: '남성', emj: 'male.png', selected: 'male_fill.png' },
];

export const ACTIVITY_LIST = [
    { key: 'very_low', value: '매우 적음', emj: 'very_low.png', content: '혼자 있는게 제일 좋아 ! 난 집순이,집돌이' },
    { key: 'low', value: '적음', emj: 'low.png', content: '주로 앉아있는 직장인, 학생' },
    { key: 'moderate', value: '보통', emj: 'moderate.png', content: '난 주 1~2회 가볍게 운동해' },
    { key: 'high', value: '많음', emj: 'high.png', content: '꾸준히 하는 운동이 있어' },
    { key: 'very_high', value: '매우 많음', emj: 'very_high.png', content: '육체노동 혹은 매일 땀흘리면서 운동해' },
];
