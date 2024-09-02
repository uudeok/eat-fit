'use client';

import { useState } from 'react';
import Icons from '@/assets';

const ModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const modeToggle = () => {
        setIsDarkMode((prev) => !prev);
    };

    return <div onClick={modeToggle}>{isDarkMode ? <Icons.FillMoon width={20} /> : <Icons.FillSun width={20} />}</div>;
};

export default ModeToggle;
