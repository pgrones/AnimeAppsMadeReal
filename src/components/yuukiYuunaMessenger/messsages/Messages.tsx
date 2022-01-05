import React from 'react';
import History from './History';
import SingleMessage from './SingleMessage';

const Messages = React.memo(() => {
    return (
        <div className="relative h-full overflow-auto">
            <svg className="absolute" width="100%" height="100%" viewBox="0 0 400 670">
                <History />
            </svg>
            <svg className="absolute" width="100%" height="100%" viewBox="0 0 400 670">
                <SingleMessage />
                <SingleMessage prevWidth={25 + 14 * (2 - 1)} />
                <SingleMessage prevWidth={(25 + 14 * (2 - 1)) * 2} />
                <SingleMessage prevWidth={(25 + 14 * (2 - 1)) * 3} />
                <SingleMessage prevWidth={(25 + 14 * (2 - 1)) * 4} />
                <SingleMessage prevWidth={(25 + 14 * (2 - 1)) * 5} />
                <SingleMessage prevWidth={(25 + 14 * (2 - 1)) * 6} />
            </svg>           
        </div>
    );
});

export default Messages;