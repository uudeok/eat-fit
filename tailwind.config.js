/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}', // App Router 사용 시
        './components/**/*.{js,ts,jsx,tsx}', // components 폴더에도 적용
    ],
    theme: {
        extend: {
            colors: {
                mainColor: 'var(--mainColor)', // 사용자 정의 색상 추가
            },
        },
    },
    plugins: [],
};
