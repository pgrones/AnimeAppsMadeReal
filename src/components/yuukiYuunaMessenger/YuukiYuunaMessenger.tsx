import React, { useEffect, useRef, useState } from 'react';
import FairyIcon from './fairies/FairyIcon';
import { initDB, onNewMessage, onUserCountChanged } from './helper/FirebaseHelper';
import { fairies, fairyMap, fairyNames, Messages as IMessages, send } from './helper/Helper';
import Messages from './messages/Messages';

const YuukiYuunaMessenger = () => {
    // Selected fairy - can be changed by clicking on a fairy icon
    const [selected, setSelected] = useState<fairyNames>('inugami');
    // The text the user has input
    const [inputText, setInputText] = useState('');
    // Flag indiciating wether the bottom is reached or not
    const [scroll, setScroll] = useState(false);
    // Messages stack
    const [messages, setMessages] = useState<IMessages>({});
    // User Count
    const [userCount, setUserCount] = useState<number>();
    // Ref to the input field
    const inputRef = useRef<HTMLInputElement>(null);
    // Color for the input field
    const fairyColor = fairyMap.get(selected);

    useEffect(() => {
        // Assign a random fairy on mount
        setSelected(fairies[Math.floor(Math.random() * 5)]);
        (async () => {
            await initDB();
            // Listen to new messages
            onNewMessage(setMessages);
            // Listen to currently online users
            onUserCountChanged(setUserCount);
        })();
    }, [])

    const onSend = () => { setInputText(''); send(inputText, selected, messages, scroll, setScroll); };

    return (
        <div className="w-full">
            <div className="relative aspect-[400/662] translate-x-[calc(50vw_-_50%)] lg:translate-x-0 max-h-[calc(100vh_-_80px)] rounded-none xs:rounded-lg bg-cover bg-no-repeat bg-[url(/assets/yuukiYuunaMessenger/background.webp)]">
                <div className="absolute top-0 right-0 z-10 py-1 px-2 rounded-bl-lg bg-slate-100/90 dark:bg-slate-900/90 text-sm">Currently online: {userCount}</div>
                <div className="absolute h-full w-full">
                    {messages && <Messages messages={messages} />}
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
                        <div className="absolute right-5 h-7 w-7 rounded-full flex items-center justify-center cursor-pointer xs:hover:scale-[1.2] xs:active:scale-100 xs:transition-transform"
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