import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [dark, setDark] = useState<boolean>(false);

    useEffect(() => {
        setDark(localStorage.theme === 'dark');
    }, [])

    return (
        <button className='hover:scale-[1.2] active:scale-100 transition-transform' aria-label='Toggle Theme' title={dark ? 'Change to Light Theme' : 'Change to Dark Theme'} onClick={() => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.theme = isDark ? 'dark' : undefined;
            setDark(prev => !prev);
        }}>
            <i style={{ fontSize: !dark ? '1.3rem' : undefined }} className={`text-2xl text-transparent bg-clip-text bg-gradient-to-br dark:from-pink-500 dark:to-violet-500 from-violet-500 to-blue-500 ${dark ? 'fas fa-sun' : 'fas fa-moon'}`}></i>
        </button>
    );
};

export default ThemeToggle;