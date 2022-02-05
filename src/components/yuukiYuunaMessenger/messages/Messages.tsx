import React from 'react';
import { Messages } from '../helper/Helper';
import History from './History';
import SingleMessage from './SingleMessage';

const Messages: React.FC<{ messages: Messages }> = React.memo(({ messages }) => {
    const messagesArray = Object.values(messages);

    return (
        <div className="relative h-full">
            <svg className="absolute" width="100%" height="100%" viewBox="0 0 400 662">
                <History />
            </svg>
            <svg className="absolute" width="100%" height="100%" viewBox="0 0 400 662">
                {messagesArray.map((v, i) => <SingleMessage key={v.timestamp.toString()} last={i === messagesArray.length - 1} {...v} id={v.timestamp as number} />)}
            </svg>
        </div>
    );
});

export default Messages;