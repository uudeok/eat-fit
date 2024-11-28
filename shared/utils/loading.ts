let loadingIndicator: HTMLDivElement | null = null;

export const displayLoadingIndicator = (text?: string) => {
    if (!loadingIndicator) {
        loadingIndicator = document.createElement('div');
        loadingIndicator.textContent = text ? text : '로딩 중...';
        loadingIndicator.style.position = 'fixed';
        loadingIndicator.style.top = '50%';
        loadingIndicator.style.left = '50%';
        loadingIndicator.style.transform = 'translate(-50%, -50%)'; // 중앙 정렬
        loadingIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        loadingIndicator.style.color = 'white';
        loadingIndicator.style.padding = '20px';
        loadingIndicator.style.borderRadius = '8px';
        loadingIndicator.style.zIndex = '9999';

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
