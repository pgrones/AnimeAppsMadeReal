import React, { useEffect, useState } from 'react';
import Fairies from './fairies/Fairies';
import { fairies, fairyColors } from './helper';
import Messages from './messsages/Messages';

const YuukiYuunaMessenger = () => {
    const [selected, setSelected] = useState<'inugami' | 'aobozu' | 'kodama' | 'gyuki'>('inugami');

    useEffect(() => {
        setSelected(fairies[Math.floor(Math.random() * 4)]);
    }, [])

    return (
        <div className="relative min-h-[calc(100vh_-_120px)] h-full w-full bg-contain rounded bg-[url(/assets/yuukiYuunaMessenger/background.png)]">
            <div className="absolute h-full w-full">
                <Messages />
            </div>
            <div className="bottom-img absolute h-full w-full bg-contain rounded bg-[url(/assets/yuukiYuunaMessenger/background.png)] bg-clip-content pt-[100%]" />
            <div className="absolute bottom-0 h-2/5 w-full">
                <Fairies setSelected={setSelected} />
            </div>
            <div className="absolute bottom-3 w-full">
                <div className="flex w-full justify-center">
                    <input 
                    style={{ background: fairyColors.get(selected), borderColor: fairyColors.get(selected)?.replace('.75', '1') }}
                     className="w-full mx-10 rounded-full border-2 px-2 outline-none text-black" 
                     />
                </div>
            </div>
        </div>
    );
};

export default YuukiYuunaMessenger;