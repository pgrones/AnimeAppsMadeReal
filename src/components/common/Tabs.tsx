import React, { useEffect, useState } from 'react';

const Tabs: React.FC<{ tabs: string[] }> = ({ tabs }) => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        for (let i = 0; i < tabs.length; i++) {
            const tab = document.getElementById(`tab${i}`);
            if (tab) tab.style.transform = i === active ? `translateX(calc(-100% * ${i}))` : active > i ? `translateX(calc(-100% * ${active}))` : 'unset';
        }
    }, [active])

    return (
        <div className="relative w-full py-3 flex justify-between items-center">
            <div style={{ transform: `translateX(calc(100% * ${active}))` }} className="transition-transform duration-300 absolute w-1/3 xs:w-1/4 top-2 bottom-2 rounded-lg bg-slate-100/50 dark:bg-slate-900/60" />
            {tabs.map((t, i) =>
                <button
                    key={t}
                    onClick={() => setActive(i)}
                    className={`${i === active ?
                        "cursor-default text-transparent dark:text-transparent font-semibold scale-[1.05]" :
                        "text-slate-700 dark:text-slate-300 xs:font-medium"} 
                        ${i > 2 ? "hidden xs:block": ""} 
                        w-full whitespace-nowrap hover:text-transparent hover:dark:text-transparent hover:font-semibold hover:scale-[1.05] sm:text-xl 
                        bg-clip-text bg-gradient-to-br dark:from-pink-500 dark:to-violet-500 from-violet-500 to-blue-500`}
                >{t}</button>
            )}
        </div>
    );
};

export default Tabs;