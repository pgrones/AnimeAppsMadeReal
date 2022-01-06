import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [dark, setDark] = useState<boolean>(false);

    useEffect(() => {
        setDark(localStorage.theme === 'dark');
    }, [])

    return (
        <button className='hover:scale-[1.2] active:scale-100 transition-transform text-xl' aria-label='Toggle Theme' title={dark ? 'Light Theme' : 'Dark Theme'} onClick={() => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.theme = isDark ? 'dark' : undefined;
            setDark(prev => !prev);
        }}>
            <i className={dark ? 'fas fa-sun' : 'fas fa-moon'}></i>
        </button>
    );
};

export default ThemeToggle;