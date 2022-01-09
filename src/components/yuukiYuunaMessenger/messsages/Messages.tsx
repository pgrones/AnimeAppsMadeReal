import React from 'react';
import { messages } from '../helper/Helper';
import History from './History';
import SingleMessage from './SingleMessage';

const Messages: React.FC<{ messages: messages }> = ({ messages }) => {
    return (
        <div className="relative h-full">
            <svg className="absolute" width="100%" height="100%" viewBox="0 0 400 662">
                <History />
            </svg>
            <svg className="absolute" width="100%" height="100%" viewBox="0 0 400 662">
                {messages.map((v, i) => <SingleMessage key={`message${v.fairy}${v.index}`} last={i === messages.length - 1} {...v} />)}
            </svg>
        </div>
    );
};

export default Messages;