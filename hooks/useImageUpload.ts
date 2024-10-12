import { useState, useRef, ChangeEvent } from 'react';
import AWS from 'aws-sdk';
import Compressor from 'compressorjs';

type UseImageUploadOptions = {
    initialImageUrl?: string;
};

const REGION = process.env.NEXT_PUBLIC_AWS_REGION;
const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
const SECRET_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_SCREAT_KEY;

export const useImageUpload = ({ initialImageUrl }: UseImageUploadOptions) => {
    const [originFile, setOriginFile] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);

    const fileRef = useRef<HTMLInputElement | null>(null);

    AWS.config.update({
        region: REGION,
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY_ID,
    });

    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setOriginFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file); // 파일을 base64로 변환
        }
    };

    const triggerFileInput = () => {
        fileRef.current?.click();
    };

    const convertImageToWebP = (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.8,
                maxWidth: 800,
                maxHeight: 800,
                mimeType: 'image/webp',
                success: (compressedFile) => {
                    resolve(compressedFile as File);
                },
                error(err) {
                    console.error('Compression Error:', err);
                    reject(err);
                },
            });
        });
    };

    const uploadImageToS3 = async () => {
        if (!originFile) return null;

        const webpFile = await convertImageToWebP(originFile);

        const upload = new AWS.S3.ManagedUpload({
            params: {
                ACL: 'public-read',
                Bucket: 's3-eatfit-images',
                Key: `upload/${Date.now()}_${originFile.name}`,
                Body: webpFile,
            },
        });

        try {
            const result = await upload.promise();
            return result.Location;
        } catch (error) {
            console.error('S3 Upload Error:', error);
            return null;
        }
    };

    return {
        imageUrl,
        triggerFileInput,
        handleFileInputChange,
        fileRef,
        uploadImageToS3,
    };
};
