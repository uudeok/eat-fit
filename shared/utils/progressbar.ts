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

export const getDdayProgressMessage = (percentage: number) => {
    if (percentage === 100) {
        return '축하합니다! 목표를 달성했어요! 🎉';
    } else if (percentage <= 10) {
        return '시작이 반이죠! 파이팅!';
    } else if (percentage <= 30) {
        return '조금씩 나아지고 있어요! 계속 힘내세요!';
    } else if (percentage <= 50) {
        return '중반에 접어들었어요! 목표에 가까워지고 있습니다!';
    } else if (percentage <= 80) {
        return '거의 다 왔어요! 마지막 스퍼트입니다!';
    } else {
        return '목표가 눈앞이에요! 조금만 더 힘내세요!';
    }
};
