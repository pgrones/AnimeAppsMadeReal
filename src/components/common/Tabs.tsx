import React, { useEffect, useState } from 'react';

const Tabs: React.FC<{ tabs: string[] }> = ({ tabs }) => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        for (let i = 0; i < tabs.length; i++) {
            const tab = document.getElementById(`tab${i}`);
            if (tab) tab.style.display = i === active ? "flex" : "none";
        }
    }, [active])

    return (
        <div className="w-full py-2 flex justify-between items-center">
            {tabs.map((t, i) =>
                <div key={t} className={'p-2 w-full h-full rounded-lg' + (i === active ? ' bg-slate-100/50 dark:bg-slate-900/60' : '')}>
                    <button
                        className={`${i === active ? "cursor-default text-transparent dark:text-transparent font-semibold scale-[1.05]" : "text-slate-700 dark:text-slate-300 font-medium"} w-full
                    hover:text-transparent hover:dark:text-transparent hover:font-semibold hover:scale-[1.05] text-xl bg-clip-text bg-gradient-to-br dark:from-pink-500 dark:to-violet-500 from-violet-500 to-blue-500`}
                        onClick={() => setActive(i)}
                    >
                        {t}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Tabs;