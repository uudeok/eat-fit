export const EMOJI_LIST = [
    { label: '기분짱', key: 'good', path: 'emotion_good.png', filledPath: 'emotion_fill_good.png' },
    { label: '슬퍼', key: 'sad', path: 'emotion_sad.png', filledPath: 'emotion_fill_sad.png' },
    { label: '우울행', key: 'gloomy', path: 'emotion_gloomy.png', filledPath: 'emotion_fill_gloomy.png' },
    { label: '배고파', key: 'hungry', path: 'emotion_hungry.png', filledPath: 'emotion_fill_hungry.png' },
    { label: '피곤행', key: 'tired', path: 'emotion_tired.png', filledPath: 'emotion_fill_tired.png' },
    { label: '화났어', key: 'angry', path: 'emotion_angry.png', filledPath: 'emotion_fill_angry.png' },
] as const;

export const EMOJI_LABEL = [
    { label: '기분짱', key: 'good' },
    { label: '슬퍼', key: 'sad' },
    { label: '우울행', key: 'gloomy' },
    { label: '배고파', key: 'hungry' },
    { label: '피곤행', key: 'tired' },
    { label: '화났어', key: 'angry' },
] as const;

export const EMOJI = {
    good: '기분짱',
    sad: '슬퍼',
    gloomy: '우울행',
    tired: '피곤행',
    angry: '화났어',
    hungry: '배고파',
};

export type EmojiKey = (typeof EMOJI_LABEL)[number]['key'];
