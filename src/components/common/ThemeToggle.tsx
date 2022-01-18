import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [dark, setDark] = useState<boolean>(false);

    useEffect(() => {
        setDark(localStorage.theme === 'dark');
    }, [])

    return (
        <button className='xs:hover:scale-[1.2] xs:active:scale-100 xs:transition-transform' aria-label='Toggle Theme' title={dark ? 'Change to Light Theme' : 'Change to Dark Theme'} onClick={() => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.theme = isDark ? 'dark' : undefined;
            setDark(prev => !prev);
        }}>
            <i  className={`text-transparent bg-clip-text bg-gradient-to-br dark:from-pink-500 dark:to-violet-500 from-violet-500 to-blue-500 ${dark ? 'fas fa-sun text-xl xs:text-2xl' : 'fas fa-moon text-lg xs:text-xl'}`}></i>
        </button>
    );
};

export default ThemeToggle;