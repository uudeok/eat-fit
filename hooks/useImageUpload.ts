import { useState, useRef, ChangeEvent } from 'react';

type UseImageUploadOptions = {
    initialImageUrl?: string;
};

export const useImageUpload = ({ initialImageUrl }: UseImageUploadOptions) => {
    const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
    const fileRef = useRef<HTMLInputElement | null>(null);

    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file); // 파일을 base64로 변환
        }
    };

    const triggerFileInput = () => {
        fileRef.current?.click(); // 파일 선택 트리거
    };

    return {
        imageUrl,
        triggerFileInput,
        handleFileInputChange,
        fileRef,
    };
};
