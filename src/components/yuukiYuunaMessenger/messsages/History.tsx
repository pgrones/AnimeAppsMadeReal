import React from 'react';

const History = () => {
    return (
        <g>
            {/* Green history circle */}
            <circle r="200" fill="#BDFBD4" />
            {/* White outer lines */}
            <circle r="200" fill="none" stroke="#fff" strokeWidth="12" />
            {/* Light blue outer line */}
            <circle r="200" fill="none" stroke="#A0DCEE" strokeWidth="8" />
            {/* White line around history button */}
            <path d="M 59.5 166.7 A 178 178 0 0 0 167.2 57.5 M 59.8 165.7 L 66.4 183 M 166.5 58.2 L 183.5 64.1" fill="none" stroke="#fff" strokeWidth="2" />
            {/* Blue history button */}
            <path id="historyButton" d="M 66 179.2 A 190 190 0 0 0 179.8 64" fill="none" stroke="#86E3FE" strokeWidth="26" />
            {/* Text and arrow */}
            <text fill="#fff" cursor="pointer">
                <textPath xlinkHref="#historyButton" startOffset="8" alignmentBaseline='central' fontSize="20" fontFamily="'Font Awesome 5 Free'">
                    &#xf35b;
                </textPath>
            </text>
            <text fill="#fff" >
                <textPath xlinkHref="#historyButton" startOffset="34" alignmentBaseline='central' fontSize="14">
                    履歴
                </textPath>
            </text>
        </g>
    );
};

export default History;