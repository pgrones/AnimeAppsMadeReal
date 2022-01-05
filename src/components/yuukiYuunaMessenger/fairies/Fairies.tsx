import React from 'react';
import FairyIcon from './FairyIcon';

const Fairies: React.FC<{ setSelected: Function }> = React.memo(({ setSelected }) => {
    return (
        <div className="h-full justify-around items-center flex flex-row py-5">
            <FairyIcon setSelected={setSelected} key="inugami" selection="inugami" icon="/assets/yuukiYuunaMessenger/Inugami.png" name="風" bgColor="#E8F4AB" fontColor="#E8F4AB" scale="0.95" animationDelay="0.2s" />,
            <FairyIcon setSelected={setSelected} key="aobozu" selection="aobozu" icon="/assets/yuukiYuunaMessenger/Aobozu.png" name="東郷" bgColor="#56D6E7" fontColor="#BCE6ED" scale="1.3" animationDelay="0.5s" />,
            <FairyIcon setSelected={setSelected} key="kodama" selection="kodama" icon="/assets/yuukiYuunaMessenger/Kodama.png" name="樹" bgColor="#BDE77A" fontColor="#D7F4B0" scale="1.3" animationDelay="0.7s" />,
            <FairyIcon setSelected={setSelected} key="gyuki" selection="gyuki" icon="/assets/yuukiYuunaMessenger/Gyuki.png" name="友奈" bgColor="#EBA3A4" fontColor="#EBA3A4" scale="0.75" animationDelay="0s" />
        </div>
    );
});

export default Fairies;