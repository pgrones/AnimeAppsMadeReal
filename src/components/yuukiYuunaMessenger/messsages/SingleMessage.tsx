import React from 'react';
import { describeArc } from '../helper';

const SingleMessage: React.FC<{ prevWidth?: number }> = ({ prevWidth }) => {
    const lines = 2;
    const width = 25 + 14 * (lines - 1);
    const radius = 205.5 + ((prevWidth ?? 1) - 1) + width / 2;
    const arc = describeArc(0, 0, radius, 90, 180 - ((width + 1) / 2) / radius / (Math.PI / 180));
    const arcStart = arc.split(' ').slice(1, 3);

    return (
        <g>
            <defs>
                <linearGradient id={`gradient`}>
                    <stop offset="0%" stopColor="#B0DEEF" />
                    <stop offset="100%" stopColor="#3485F2" />
                </linearGradient>
            </defs>
            <path
                id={`msg`}
                d={arc}
                fill="none"
                stroke="#fff" strokeWidth={width} strokeLinecap="round"
            />
            <path
                d={arc}
                stroke={`url(#gradient)`}
                strokeWidth={width - 4} strokeLinecap="round" fill='none'
            />
            <circle cx={arcStart[0]} cy={arcStart[1]} r={width / 2 - 1} fill={`url(#gradient)`} stroke="#fff" strokeWidth="2" />
            <text color="#446688" fontSize="14" >
                <textPath startOffset={width / 2 - 1 + 5} href={`#msg`}>
                    <tspan x="0" alignmentBaseline={lines > 1 ? "before-edge" : "central"} dy={lines > 1 ? -(width / 2) + 2 : 0} >tspan line</tspan>
                    {new Array(lines - 1).fill('tspan line').map((v, i) => <tspan key={i} x="0" alignmentBaseline="before-edge" dy="1em">{v}</tspan>)}
                </textPath>
            </text>
        </g>
    );
};

export default SingleMessage;
