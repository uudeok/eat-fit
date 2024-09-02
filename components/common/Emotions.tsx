'use client';

import Image from 'next/image';
import styles from '../../styles/common/emoji.module.css';
import { useState } from 'react';
import { EMOJI } from '@/constants';

type Props = {
    width: number;
    height: number;
    onClick: (key: string) => void;
};

const Emotions = ({ width, height, onClick }: Props) => {
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

    const handleClick = (key: string) => {
        setSelectedEmotion(key);
        onClick(key);
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
