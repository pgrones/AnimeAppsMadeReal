import React, { useEffect, useState } from 'react';

interface Props {
    name: string;
    icon: string;
    bgColor: string;
    fontColor: string;
    scale: string;
    animationDelay: string;
    selection: 'inugami' | 'aobozu' | 'kodama' | 'gyuki';
    setSelected: Function;
}

const FairyIcon: React.FC<Props> = ({ name, icon, bgColor, fontColor, scale, animationDelay, selection, setSelected }) => {
    const [margin, setMargin] = useState<number>()

    useEffect(() => {
        setMargin(Math.ceil(Math.random() * 30) * (Math.round(Math.random()) ? 1 : -1));
    }, [])

    return (
        <div className="fairy flex flex-col items-center" style={{ animationDelay: animationDelay, marginBottom: margin + '%' }}>
            <div className="hover:scale-[1.08] active:scale-[0.98] cursor-pointer transition-all w-24 h-24 rounded-full flex justify-center items-center flex-col border-x-2 border-white"
                style={{ background: bgColor }} onClick={() => setSelected(selection)}>
                <img style={{ transform: "scale(" + scale + ')' }} src={icon} />
            </div>
            <span className="text-lg font-semibold text-outline" style={{ color: fontColor }}>{name}</span>
        </div>
    );
};

export default FairyIcon;