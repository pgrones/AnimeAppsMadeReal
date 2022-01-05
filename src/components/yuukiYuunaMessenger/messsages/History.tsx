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
            <path d="M 59 166 A 179 179 0 0 0 168 57 M 59 166 L 66 183 M 168 58 L 182.5 64" fill="none" stroke="#fff" strokeWidth="2" />
            {/* Blue history button */}
            <path id="historyButton" d="M 66 179 A 193 193 0 0 0 180 64" fill="none" stroke="#86E3FE" strokeWidth="26" />
            {/* Text and arrow */}
            <text fill="#fff" >
                <textPath href="#historyButton" startOffset="8" alignmentBaseline='central' fontSize="20" fontFamily="'Font Awesome 5 Free'">
                    &#xf35b;
                </textPath>
            </text>
            <text fill="#fff" >
                <textPath href="#historyButton" startOffset="34" alignmentBaseline='central' fontSize="14" >
                    履歴
                </textPath>
            </text>
        </g>
    );
};

export default History;