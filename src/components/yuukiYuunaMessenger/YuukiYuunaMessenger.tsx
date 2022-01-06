import React, { useEffect, useRef, useState } from 'react';
import { fairies, fairyMap, fairyNames, messages, splitString } from './helper';
import Messages from './messsages/Messages';
import defaultMessages from './defaultMessages.json';
import FairyIcon from './fairies/FairyIcon';

const YuukiYuunaMessenger = () => {
    const [selected, setSelected] = useState<fairyNames>('inugami');
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<messages>(defaultMessages as messages);
    const inputRef = useRef<HTMLInputElement>(null);
    const fairyColor = fairyMap.get(selected);

    useEffect(() => {
        setSelected(fairies[Math.floor(Math.random() * 5)]);
    }, [])

    const onSend = () => {
        if (inputText.trim()) {
            const copy = [...messages];
            const lines = splitString(inputText, (/^[a-z\s\d]*$/i.test(inputText) ? 35 : 18) + copy.length * 2 + (copy.length % 2));
            const prevWidth = copy.reduce((prev, curr) => prev + 9.5 + 14 * curr.lines, 0);
            copy.push({ text: lines, fairy: selected, lines: lines.length, prevWidth: prevWidth });
            setMessages(copy);
        }
    }

    return (
        <div className="relative min-h-[calc(100vh_-_120px)] h-full w-full bg-contain rounded bg-[url(/assets/yuukiYuunaMessenger/background.webp)]">
            <div className="absolute h-full w-full">
                <Messages messages={messages} />
            </div>
            <div className="bottom-img absolute h-full w-full bg-contain rounded bg-[url(/assets/yuukiYuunaMessenger/background.webp)] bg-clip-content pt-[100%]" />
            <div className="absolute bottom-0 h-2/5 w-full">
                <div className="h-full w-full flex flex-row justify-around items-center">
                    {Array.from(fairyMap).map((v) =>
                        <FairyIcon key={v[0]} selected={selected} setSelected={setSelected} fairyName={v[0]} fairySettings={v[1]} />
                    )}
                </div>
            </div>
            <div className="absolute bottom-3 w-full">
                <div className="flex w-full justify-center">
                    <input
                        value={inputText} onChange={e => setInputText(e.target.value)} ref={inputRef} onKeyUp={e => e.key === 'Enter' && onSend()}
                        style={{ background: fairyColor?.light, borderColor: fairyColor?.bg }} aria-label="text input"
                        className="h-7 w-full mx-10 rounded-full border-[3px] pl-2 pr-5 outline-none text-black"
                    />
                    <div className="absolute right-10 h-7 w-7 rounded-full flex items-center justify-center cursor-pointer hover:scale-[1.2] active:scale-100 transition-transform"
                        style={{ background: fairyColor?.bg }} onClick={onSend}>
                        <i className="text-slate-800 fas fa-paper-plane" ></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YuukiYuunaMessenger;