import React, { useEffect, useState } from 'react';
import { fairyNames, fairySettings } from '../helper';

const FairyIcon: React.FC<{ fairyName: fairyNames; fairySettings: fairySettings; setSelected: Function; selected: fairyNames; }> = ({ fairyName, fairySettings, setSelected, selected }) => {
    const [margin, setMargin] = useState<string>();
    const [delay, setDalay] = useState<string>();
    const active = selected === fairyName;

    useEffect(() => {
        setMargin(Math.round((Math.random()) * 35 - 25) + '%');
        setDalay(-Math.random() + 's');
    }, [])

    return (
        <div className="fairy flex flex-col items-center" style={{ animationDelay: delay, marginBottom: margin }}>
            <div className="hover:scale-[1.1] cursor-pointer transition-all w-24 h-24 rounded-full flex justify-center items-center flex-col border-x-2 border-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.25)]"
                style={{ background: fairySettings.bg, transform: active ? 'scale(1.1)' : undefined, border: active ? '4px solid white' : undefined }} onClick={() => setSelected(fairyName)}>
                <img style={{ transform: "scale(" + fairySettings.scale + ')' }} src={fairySettings.icon} alt={fairyName}  width="96" height="96" />
            </div>
            <span className="text-lg font-semibold text-outline pt-1" style={{ color: fairySettings.light }}>{fairySettings.name}</span>
        </div>
    );
};

export default FairyIcon;