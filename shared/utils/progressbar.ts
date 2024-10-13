export const getProgressBarColor = (percentage: number) => {
    if (percentage <= 30) return 'linear-gradient(to right, #a1c4fd, #c2e9fb)';
    if (percentage <= 70) return 'linear-gradient(to right, #fbc2eb, #a6c0fe)';
    return 'linear-gradient(to right, #f79caa, #f2a65a)';
};

export const getCircleProgressBarColor = (percentage: number) => {
    if (percentage <= 30) return '#a1c4fd'; // 연한 파란색
    if (percentage <= 70) return '#fbc2eb'; // 핑크색
    return '#f79caa'; // 코랄색
};
