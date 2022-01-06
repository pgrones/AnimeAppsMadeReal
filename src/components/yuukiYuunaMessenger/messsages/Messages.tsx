import React from 'react';
import { messages } from '../helper';
import History from './History';
import SingleMessage from './SingleMessage';

const Messages: React.FC<{ messages: messages }> = ({ messages }) => {
    return (
        <div className="relative h-full overflow-auto">
            <svg className="absolute" width="100%" height="100%" viewBox="0 0 400 670">
                <History />
            </svg>
            <svg className="absolute" width="100%" height="100%" viewBox="0 0 400 670">
                {messages.map((v, i) => <SingleMessage key={'message' + i} index={i} {...v} />)}
            </svg>
        </div>
    );
};

export default Messages;