const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

export const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
}

export const splitString = (str: string, maxLength: number) => {
    const strs = [];
    while (str.length > maxLength) {
        let pos = str.substring(0, maxLength).lastIndexOf(' ');
        pos = pos <= 0 ? maxLength : pos;
        strs.push(str.substring(0, pos));
        let i = str.indexOf(' ', pos) + 1;
        if (i < pos || i > pos + maxLength)
            i = pos;
        str = str.substring(i);
    }
    strs.push(str);
    return strs;
}

export type fairyNames = 'inugami' | 'aobozu' | 'kodama' | 'gyuki' | 'yoshiteru';
export type messages = { text: string[], fairy: fairyNames, lines: number, prevWidth: number }[];
export const fairies: ['inugami', 'aobozu', 'kodama', 'gyuki', 'yoshiteru'] = ['inugami', 'aobozu', 'kodama', 'gyuki', 'yoshiteru'];
export type fairySettings = { name: string; icon: string; scale: string; bg: string; light: string; gradient: string[]; };
export const fairyMap = new Map<fairyNames, fairySettings>([
    ['inugami', { name: '風', icon: '/assets/yuukiYuunaMessenger/Inugami.webp', scale: '0.95', bg: "rgba(232, 244, 171, 1)", light: "rgba(243, 249, 212, 1)", gradient: ['#F9F0BF', '#ECD22F'] }],
    ['aobozu', { name: '東郷', icon: '/assets/yuukiYuunaMessenger/Aobozu.webp', scale: '1.3', bg: "rgba(86, 214, 231, 1)", light: "rgba(170, 234, 242, 1)", gradient: ['#C1EEFA', '#3485F0'] }],
    ['kodama', { name: '樹', icon: '/assets/yuukiYuunaMessenger/Kodama.webp', scale: '1.3', bg: "rgba(189, 231, 122, 1)", light: "rgba(222, 243, 188, 1)", gradient: ['#CCFCC5', '#71EA36'] }],
    ['gyuki', { name: '友奈', icon: '/assets/yuukiYuunaMessenger/Gyuki.webp', scale: '0.75', bg: "rgba(235, 163, 164, 1)", light: "rgba(244, 209, 209, 1)", gradient: ['#FCCAF0', '#EF7ABB'] }],
    ['yoshiteru', { name: '夏凛', icon: '/assets/yuukiYuunaMessenger/yoshiteru.webp', scale: '0.9', bg: "rgba(200, 78, 77, 1)", light: "rgba(227, 166, 165, 1)", gradient: ['#FEC8C2', '#F03B2C'] }]
]);
