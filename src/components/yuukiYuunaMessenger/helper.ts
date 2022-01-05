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

export const fairies: ['inugami' , 'aobozu' , 'kodama' , 'gyuki'] = ['inugami', 'aobozu', 'kodama', 'gyuki'];
export const fairyColors = new Map([['inugami', "rgba(232, 244, 171, .75)"], ['aobozu', "rgba(86, 214, 231, .75)"], ['kodama', "rgba(189, 231, 122, .75)"], ['gyuki', "rgba(235, 163, 164, .75)"]]);