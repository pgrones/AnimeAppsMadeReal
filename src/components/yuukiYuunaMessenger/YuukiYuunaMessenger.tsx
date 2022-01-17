import React, { useEffect, useRef, useState } from 'react';
import { fairies, fairyMap, fairyNames, messages, splitString } from './helper/Helper';
import Messages from './messsages/Messages';
import defaultMessages from './helper/defaultMessages.json';
import FairyIcon from './fairies/FairyIcon';

const YuukiYuunaMessenger = () => {
    // Selected fairy - can be changed by clicking on a fairy icon
    const [selected, setSelected] = useState<fairyNames>('inugami');
    // The text the user has input
    const [inputText, setInputText] = useState('');
    // Flag indiciating wether the bottom is reached or not
    const [scroll, setScroll] = useState(false);
    // Index for the messages since the key should always be same even if a messages is removed in order to prevent rerenders
    const [index, setIndex] = useState(5);
    // Messages stack
    const [messages, setMessages] = useState<messages>(defaultMessages as messages);
    // Ref to the input field
    const inputRef = useRef<HTMLInputElement>(null);
    // Color for the input field
    const fairyColor = fairyMap.get(selected);

    useEffect(() => {
        // Assign a random fairy on mount
        setSelected(fairies[Math.floor(Math.random() * 5)]);
    }, [])

    const onSend = () => {
        if (inputText.trim()) {
            const copy = [...messages];
            // Calculate the width of all previous messages combined
            let prevWidth = copy.reduce((prev, curr) => prev + 9.5 + 14 * curr.lines, 0);
            // Split the inputText into lines
            let lines = splitString(inputText, (/^[a-z\s\d]*$/i.test(inputText) ? 35 : 18) + copy.length * 2 + (copy.length % 2));
            // Remove all empty lines at the beginning...
            while (lines[0]?.trim() === '') lines.shift();
            // ...and end
            while (lines[-1]?.trim() === '') lines.pop();
            // Calculate the width including the new message
            let width = prevWidth + 9.5 + 14 * lines.length;

            // Scroll if there are too many messages or a message that's too long
            // or once the bottom is reached since any new message overflows at this point
            if (scroll || width > 280) {
                setScroll(true);

                while (width > 280) {
                    // If there aren't any old messages left
                    if (!copy.length) {
                        // Remove the first line of the new message and all following empty lines
                        lines.shift();
                        while (!lines[0].trim()) lines.shift();
                        // At this point there are no previous messages left
                        prevWidth = 0;
                    } else {
                        // If there are old messages left, remove the oldest
                        const removed = copy.shift();
                        // Offset the other messages by the removed one 
                        copy.forEach(c => c.prevWidth -= removed?.prevWidth ?? 0);
                        prevWidth = copy.reduce((prev, curr) => prev + 9.5 + 14 * curr.lines, 0);
                    }
                    // Calculate the new width after messages or lines have been removed
                    width = prevWidth + 9.5 + 14 * lines.length;
                }
            }
            // Push the new message onto the stack
            copy.push({ index, text: lines, fairy: selected, lines: lines.length, prevWidth });
            // Update the states
            setMessages(copy);
            setInputText('');
            setIndex(prev => prev + 1);
        }
    }

    return (
        <div className="w-full xs:translate-x-1/2 lg:translate-x-0">
            <div className="relative aspect-[400/662] xs:-translate-x-1/2 lg:translate-x-0 max-h-[calc(100vh_-_80px)] rounded-none xs:rounded-lg bg-cover bg-no-repeat bg-[url(/assets/yuukiYuunaMessenger/background.webp)]">
                <div className="absolute h-full w-full">
                    <Messages messages={messages} />
                </div>
                <div className="absolute bottom-10 h-2/5 w-full">
                    <div className="h-full max-w-full flex flex-row justify-between items-center px-2 overflow-hidden">
                        {Array.from(fairyMap).map(v =>
                            <FairyIcon key={v[0]} selected={selected} setSelected={(fairy: fairyNames) => { setSelected(fairy); inputRef.current?.focus(); }} fairyName={v[0]} fairySettings={v[1]} />
                        )}
                    </div>
                </div>
                <div className="absolute bottom-3 w-full">
                    <div className="flex w-full justify-center">
                        <input
                            value={inputText} onChange={e => setInputText(e.target.value)} ref={inputRef} onKeyUp={e => e.key === 'Enter' && onSend()}
                            style={{ background: fairyColor?.light, borderColor: fairyColor?.bg }} aria-label="text input"
                            className="h-7 w-full mx-5 rounded-full border-[3px] pl-2 pr-5 outline-none text-black"
                        />
                        <div className="absolute right-5 h-7 w-7 rounded-full flex items-center justify-center cursor-pointer hover:scale-[1.2] active:scale-100 transition-transform"
                            style={{ background: fairyColor?.bg }} onClick={onSend}>
                            <i className="text-slate-800 fas fa-paper-plane" ></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YuukiYuunaMessenger;