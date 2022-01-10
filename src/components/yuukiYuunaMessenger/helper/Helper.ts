// Helper function to make cartesian coordinates out of polar coordinates
const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

// helper function to draw an arc via svg using angles
export const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
}

// Helper function to split a string at a space at < maxLength
export const splitString = (str: string, maxLength: number) => {
    const strs = [];
    while (str.length > maxLength) {
        // Get the position of the last space inside maxLength
        let pos = str.substring(0, maxLength).lastIndexOf(' ');
        // If there is no space, then cut the string at maxLength
        pos = pos <= 0 ? maxLength : pos;
        // Push the cut string into an array
        strs.push(str.substring(0, pos));
        // Get the index of the next word after the cut
        let i = str.indexOf(' ', pos) + 1;
        // If there is no next word or the next word is larger than maxLength, the current position is used
        if (i < pos || i > pos + maxLength)
            i = pos;
        // Set the next part of the string after the cut as new string
        str = str.substring(i);
    }
    // Push the remaining string into the array
    strs.push(str);
    return strs;
}

// Types and constants
export type fairyNames = 'inugami' | 'aobozu' | 'kodama' | 'gyuki' | 'yoshiteru';
export type messages = { index: number, text: string[], fairy: fairyNames, lines: number, prevWidth: number }[];
export const fairies: ['inugami', 'aobozu', 'kodama', 'gyuki', 'yoshiteru'] = ['inugami', 'aobozu', 'kodama', 'gyuki', 'yoshiteru'];
export type fairySettings = { name: string, icon: string, bg: string, light: string, gradient: string[], pos: [number, number] };
export const fairyMap = new Map<fairyNames, any>([
    ['inugami', { name: '風', icon: '/assets/yuukiYuunaMessenger/Inugami.webp', pos: [38, 525], bg: "rgba(232, 244, 171, 1)", light: "rgba(243, 249, 212, 1)", gradient: ['#F9F0BF', '#ECD22F'] }],
    ['aobozu', { name: '東郷', icon: '/assets/yuukiYuunaMessenger/Aobozu.webp', pos: [118, 500], bg: "rgba(86, 214, 231, 1)", light: "rgba(170, 234, 242, 1)", gradient: ['#C1EEFA', '#3485F0'] }],
    ['kodama', { name: '樹', icon: '/assets/yuukiYuunaMessenger/Kodama.webp', pos: [198, 565], bg: "rgba(189, 231, 122, 1)", light: "rgba(222, 243, 188, 1)", gradient: ['#CCFCC5', '#71EA36'] }],
    ['gyuki', { name: '友奈', icon: '/assets/yuukiYuunaMessenger/Gyuki.webp', pos: [278, 470], bg: "rgba(235, 163, 164, 1)", light: "rgba(244, 209, 209, 1)", gradient: ['#FCCAF0', '#EF7ABB'] }],
    ['yoshiteru', { name: '夏凛', icon: '/assets/yuukiYuunaMessenger/yoshiteru.webp', pos: [358, 520], bg: "rgba(200, 78, 77, 1)", light: "rgba(227, 166, 165, 1)", gradient: ['#FEC8C2', '#F03B2C'] }]
]);
