import React, { useEffect, useState } from 'react';

const Tabs: React.FC<{ tabs: string[] }> = ({ tabs }) => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        for (let i = 0; i < tabs.length; i++) {
            const tab = document.getElementById(`tab${i}`);
            if (tab) tab.style.transform = i === active ? `translateX(calc(-100% * ${i}))` : active > i ? `translateX(calc(-100% * ${active} - 1px))` : 'unset';
        }
    }, [active])

    return (
        <div className="relative w-full py-3 flex justify-between items-center">
            <div style={{ transform: `translateX(calc(100% * ${active}))` }} className="transition-transform duration-300 absolute w-1/3 xs:w-1/4 top-2 bottom-2 rounded-lg bg-slate-100/50 dark:bg-slate-900/60" />
            {tabs.map((t, i) =>
                <button key={t} onClick={() => setActive(i)} className={`w-full${i > 2 ? " hidden xs:block" : ""}`}>
                    <div className={`${i === active ?
                        "cursor-default text-transparent font-semibold scale-100 xs:scale-[1.05]" :
                        "text-slate-700 dark:text-slate-300 xs:font-medium"} ${i === 0 ? "text-left xs:text-center pl-4 xs:pl-0" : i === 2 ? "text-right xs:text-center pr-4 xs:pr-0" : ""} 
                        h-full w-full whitespace-nowrap xs:hover:text-transparent xs:hover:dark:text-transparent xs:hover:font-semibold xs:hover:scale-[1.05] sm:text-xl 
                        bg-clip-text bg-gradient-to-r dark:from-pink-500 dark:to-violet-500 from-violet-500 to-blue-500`}>
                        {t}
                    </div>
                </button>
            )}
        </div>
    );
};

export default Tabs;