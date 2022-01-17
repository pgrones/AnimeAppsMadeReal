import React, { useEffect, useState } from 'react';

const AniListButton = () => {
    const [dark, setDark] = useState<boolean>(false);

    useEffect(() => {
        setDark(localStorage.theme === 'dark');
        // Listen to changes of the theme and update the state accordingly
        new MutationObserver(mutationsList => {
            mutationsList.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    setDark((mutation.target as HTMLElement).classList.contains('dark'));
                }
            });
        }).observe(document.documentElement,{ attributes: true });
    }, [])

    return (
        <a href="https://anilist.co/user/Alzariel/" target="_blank" rel="noopener noreferrer" title="Visit my profile on AniList" className="mr-3 cursor-pointer hover:scale-[1.2] active:scale-100 transition-transform">
            <svg className="w-5 xs:w-7 h-5 xs:h-7" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <defs>
                    <linearGradient id="gradient">
                        <stop offset="0%" stopColor={dark ? "#ec4899" : "#8b5cf6"} />
                        <stop offset="100%" stopColor={dark ? "#8b5cf6" : "#3b82f6"} />
                    </linearGradient>
                </defs>
                <path fill="url(#gradient)" d="M6.361 2.943L0 21.056h4.942l1.077-3.133H11.4l1.052 3.133H22.9c.71 0 1.1-.392 1.1-1.101V17.53c0-.71-.39-1.101-1.1-1.101h-6.483V4.045c0-.71-.392-1.102-1.101-1.102h-2.422c-.71 0-1.101.392-1.101 1.102v1.064l-.758-2.166zm2.324 5.948l1.688 5.018H7.144z"></path>
            </svg>
        </a>
    );
};

export default AniListButton;