import Image from 'next/image';

const LoadingAnimation = () => {
    return (
        <div
            className="relative w-32 h-32 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: '#50CFD2' }}
        >
            <Image src="/images/loading.gif" alt="loading" width={100} height={100} priority className="rounded-full" />
        </div>
    );
};

export default LoadingAnimation;
