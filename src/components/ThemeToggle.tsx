import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [dark, setDark] = useState<boolean>(false);

    useEffect(() => {
        setDark(localStorage.theme === 'dark');
    }, [])

    return (
        <button onClick={() => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.theme = isDark ? 'dark' : undefined;
            setDark(prev => !prev);
        }}>
            <i className={`text dark:text-white ${dark ? 'fas fa-sun' : 'fas fa-moon'}`}></i>
        </button>
    );
};

export default ThemeToggle;