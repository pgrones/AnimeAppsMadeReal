import React, { useEffect, useState } from 'react';
import { fairies, fairyNames, fairySettings } from '../helper/helper';

const margins = ['-15%', '0', '-35%', '15%', '-10%'];

const FairyIcon: React.FC<{ fairyName: fairyNames; fairySettings: fairySettings; setSelected: Function; selected: fairyNames; }> = ({ fairyName, fairySettings, setSelected, selected }) => {
    const [delay, setDalay] = useState<string>();
    const active = selected === fairyName;

    useEffect(() => {
        // Set a random delay for the animation on mount
        setDalay(-Math.random() + 's');
    }, [])

    return (
        <div className="fairy flex flex-col items-center" style={{ animationDelay: delay, marginBottom: margins[fairies.indexOf(fairyName)] }}>
            <div className="hover:scale-[1.1] cursor-pointer transition-all aspect-square p-1 rounded-full flex justify-center items-center flex-col border-x-[3px] border-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.25)]"
                style={{ background: fairySettings.bg, transform: active ? 'scale(1.1)' : undefined, border: active ? '4px solid white' : undefined }} onClick={() => setSelected(fairyName)}>
                <img src={fairySettings.icon} alt={fairyName} width="80" height="80" />
            </div>
            <span className="text-lg font-semibold text-outline pt-1" style={{ color: fairySettings.light }}>{fairySettings.name}</span>
        </div>
    );
};

export default FairyIcon;