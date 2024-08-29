'use client';

import Image from 'next/image';
import styles from '../../styles/common/emoji.module.css';
import { useState } from 'react';

type Props = {
    width: number;
    height: number;
};

export const EMOJI = [
    { label: '기분짱', key: 'good', path: '/emotion_good.png', filledPath: '/emotion_fill_good.png' },
    { label: '슬픔', key: 'sad', path: '/emotion_sad.png', filledPath: '/emotion_fill_sad.png' },
    { label: '우울', key: 'gloomy', path: '/emotion_gloomy.png', filledPath: '/emotion_fill_gloomy.png' },
    { label: '배고픔', key: 'hungry', path: '/emotion_hungry.png', filledPath: '/emotion_fill_hungry.png' },
    { label: '피곤함', key: 'tired', path: '/emotion_tired.png', filledPath: '/emotion_fill_tired.png' },
    { label: '화남', key: 'angry', path: '/emotion_angry.png', filledPath: '/emotion_fill_angry.png' },
];

const Emotions = ({ width, height }: Props) => {
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

    const handleClick = (key: string) => {
        setSelectedEmotion(key);
    };

    return (
        <div className={styles.container}>
            {EMOJI.map((emoji) => (
                <div
                    key={emoji.key}
                    className={`${styles.emotionItem} ${selectedEmotion === emoji.key ? styles.selected : ''}`}
                    onClick={() => handleClick(emoji.key)}
                >
                    <Image
                        src={selectedEmotion === emoji.key ? emoji.filledPath : emoji.path}
                        alt={emoji.label}
                        className={styles.emotionImage}
                        width={width}
                        height={height}
                    />
                    <span className={styles.label}>{emoji.label}</span>
                </div>
            ))}
        </div>
    );
};

export default Emotions;
