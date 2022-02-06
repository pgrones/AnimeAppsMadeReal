import React, { useState } from 'react';
import { describeArc, fairyMap, fairyNames } from '../helper/helper';
import { useAnimationFrame } from '../helper/Hooks';

const SingleMessage: React.FC<{ id: number, last: boolean, text: string[], fairy: fairyNames, lines: number, prevWidth: number }> = ({ prevWidth, id, last, text, lines, fairy }) => {
    // Width of the message arc - base 11 + 14 for each line of text
    const width = 11 + 14 * lines;
    // Radius of the arc from 0,0 - offset by prevWidth so that the arcs don't overlap
    const radius = 205.5 + prevWidth + width / 2;
    // The endAngle of the arc is slightly less than 180deg since the lincap makes the path grow by width/2
    const endAngle = 180 - ((width + 2) / 2) / radius / (Math.PI / 180);
    // Calculate the d of the path according to the variables above
    const arc = describeArc(0, 0, radius, 90, endAngle);
    // Start coordinates of the path (arc) that are used as coordinates for the circle at the start of the arc
    const arcStart = arc.split(' ').slice(1, 3);
    // Colors for each path
    const fairyGradient = fairyMap.get(fairy)?.gradient;
    // Position of the fairy
    const fairyPos = fairyMap.get(fairy)?.pos;
    // Duration for the rotate animation
    const animationDuration = 300;
    // End coordinates of the line connecting the start of the arc with the fairy icon
    const [[x, y], setXY] = useState([radius.toString(), "0"]);
    // Current rotation of the arc
    const [rotation, setRotation] = useState(-90);

    // Animation for the rotation of the arc
    useAnimationFrame(animationDuration, 0, elapsed => {
        // Set the current rotation of the arc
        const currRotation = Math.min(0, elapsed * 90 / animationDuration - 90);
        setRotation(currRotation);
        // Animate the line together with the arc
        const currEndAngle = Math.min(endAngle, elapsed * 90 / animationDuration + 90);
        const circlePos = describeArc(0, 0, radius, 90, currEndAngle).split(' ');
        setXY([circlePos[1], circlePos[2]]);
    })

    return (
        <g>
            {/* Line connecting the start of the arc with the fairy icon */}
            {last && <line stroke='#fff' strokeWidth="2" x1={fairyPos?.[0]} y1={fairyPos?.[1]} x2={x} y2={y} />}
            {/* Rotate the whole group by 90deg in order to initially hide it */}
            <g className="-rotate-90" style={{ transform: `rotate(${rotation}deg)` }}>
                {/* Gradient along the path */}
                <defs>
                    <linearGradient id={`gradient${id}`}>
                        <stop offset="0%" stopColor={fairyGradient?.[0]} />
                        <stop offset="100%" stopColor={fairyGradient?.[1]} />
                    </linearGradient>
                </defs>
                {/* Border around the arc */}
                <path id={`msg${id}`} d={arc} fill="none" stroke="#fff" strokeWidth={width} strokeLinecap="round" className="drop-shadow-[4px_4px_0_rgba(0,0,0,0.25)]" />
                {/* Arc container of the message */}
                <path d={arc} stroke={`url(#gradient${id})`} strokeWidth={width - 4} strokeLinecap="round" fill='none' />
                {/* Circle at the start of the arc */}
                <circle cx={arcStart[0]} cy={arcStart[1]} r={width / 2 - 1} fill={`url(#gradient${id})`} stroke="#fff" strokeWidth="2" />
                {/* Text inside the arc */}
                <text color="#446688" fontSize="12px" fontFamily="'Kiwi Maru'" paintOrder="stroke" stroke="#fff" strokeWidth="1.5">
                    <textPath startOffset={width / 2 - 1 + 5} href={`#msg${id}`}>
                        <tspan x="0" alignmentBaseline={lines > 1 ? "hanging" : "central"} dominantBaseline={lines > 1 ? "hanging" : "central"} dy={lines > 1 ? -(width / 2) + 6 : -1} >{text[0]}</tspan>
                        {text.length > 1 && text.slice(1).map((v, i) => <tspan key={id + '-' + i} x="0" alignmentBaseline="hanging" dominantBaseline="hanging" dy="1em">{v}</tspan>)}
                    </textPath>
                </text>
            </g>
        </g>
    );
};

export default SingleMessage;