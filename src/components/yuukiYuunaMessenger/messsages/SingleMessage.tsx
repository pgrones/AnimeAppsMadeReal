import React, { useEffect, useRef } from 'react';
import { describeArc, fairyMap, fairyNames } from '../helper';

const SingleMessage: React.FC<{ index: number, text: string[], fairy: fairyNames, lines: number, prevWidth: number }> = ({ prevWidth, index, text, lines, fairy }) => {
    // Width of the message arc - base 11 + 14 for each line of text
    const width = 11 + 14 * lines;
    // Radius of the arc from 0,0 - offset by prevWidth so that the arcs don't overlap
    const radius = 205.5 + prevWidth + width / 2;
    // Calculate the d of the path according to the variables above
    const arc = describeArc(0, 0, radius, 0, 180 - ((width + 2) / 2) / radius / (Math.PI / 180));
    // Start coordinates of the path (arc) that are used as coordinates for the circle at the start of the arc
    const arcStart = arc.split(' ').slice(1, 3);
    // Colors for each path
    const fairyGradient = fairyMap.get(fairy)?.gradient;
    // Ref to the whole svg group in order to animate it using rotate()
    const messagesRef = useRef<SVGGElement>(null);

    // Rotate the path to 0 on mount (starts at -100deg)
    // The first 5 messages are already set, so they animate in as soon as the messenger mounts
    useEffect(() => {
        if (messagesRef.current) {
            if (index < 5) {
                const timeout = setTimeout(() => messagesRef.current!.style.transform = "rotate(0)", index * 500);
                return () => clearTimeout(timeout);
            } else {
                messagesRef.current.style.transform = "rotate(0)";
            }
        }
        return;
    }, [messagesRef.current])

    return (
        // Rotate the whole group by 100deg in order to initially hide it
        <g className="-rotate-[100deg] transition-transform duration-500" ref={messagesRef}>
            {/* Gradient along the path */}
            <defs>
                <linearGradient id={`gradient${index}`}>
                    <stop offset="0%" stopColor={fairyGradient?.[0]} />
                    <stop offset="100%" stopColor={fairyGradient?.[1]} />
                </linearGradient>
            </defs>
            {/* Arc container of the message */}
            <path id={`msg${index}`} d={arc} fill="none" stroke="#fff" strokeWidth={width} strokeLinecap="round" className="drop-shadow-[4px_4px_0_rgba(0,0,0,0.25)]" />
            {/* Border around the arc */}
            <path d={arc} stroke={`url(#gradient${index})`} strokeWidth={width - 4} strokeLinecap="round" fill='none' />
            {/* Circle at the sart of the arc */}
            <circle cx={arcStart[0]} cy={arcStart[1]} r={width / 2 - 1} fill={`url(#gradient${index})`} stroke="#fff" strokeWidth="2" />
            {/* Text inside the arc */}
            <text color="#446688" fontSize="12px" fontFamily="'Kiwi Maru'" className="text-outline-light">
                <textPath startOffset={width / 2 - 1 + 5} href={`#msg${index}`}>
                    <tspan x="0" alignmentBaseline={lines > 1 ? "before-edge" : "central"} dy={lines > 1 ? -(width / 2) + 4 : -1} >{text[0]}</tspan>
                    {text.length > 1 && text.slice(1).map((v, i) => <tspan key={index.toString() + i} x="0" alignmentBaseline="before-edge" dy="1em">{v}</tspan>)}
                </textPath>
            </text>
        </g>
    );
};

export default SingleMessage;