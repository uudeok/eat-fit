let loadingIndicator: HTMLDivElement | null = null;

export const displayLoadingIndicator = () => {
    if (!loadingIndicator) {
        loadingIndicator = document.createElement('div');
        loadingIndicator.textContent = '로딩 중...'; // 메시지 설정
        loadingIndicator.style.position = 'fixed'; // 화면에 고정
        loadingIndicator.style.top = '50%'; // 수직 중앙
        loadingIndicator.style.left = '50%'; // 수평 중앙
        loadingIndicator.style.transform = 'translate(-50%, -50%)'; // 중앙 정렬
        loadingIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // 배경색
        loadingIndicator.style.color = 'white'; // 글자 색상
        loadingIndicator.style.padding = '20px'; // 패딩
        loadingIndicator.style.borderRadius = '8px'; // 모서리 둥글게
        loadingIndicator.style.zIndex = '9999'; // 다른 요소 위에 표시

        // 로딩 인디케이터를 body에 추가
        document.body.appendChild(loadingIndicator);
    }
};

export const hideLoadingIndicator = () => {
    if (loadingIndicator) {
        document.body.removeChild(loadingIndicator);
        loadingIndicator = null;
    }
};
