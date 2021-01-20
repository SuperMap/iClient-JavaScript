import { Unit } from '../REST';

export var getMeterPerMapUnit = function(mapUnit) {
    var earchRadiusInMeters = 6378137;
    var meterPerMapUnit;
    if (mapUnit === Unit.METER) {
        meterPerMapUnit = 1;
    } else if (mapUnit === Unit.DEGREE) {
        // 每度表示多少米。
        meterPerMapUnit = (Math.PI * 2 * earchRadiusInMeters) / 360;
    } else if (mapUnit === Unit.KILOMETER) {
        meterPerMapUnit = 1.0e-3;
    } else if (mapUnit === Unit.INCH) {
        meterPerMapUnit = 1 / 2.5399999918e-2;
    } else if (mapUnit === Unit.FOOT) {
        meterPerMapUnit = 0.3048;
    } else {
        return meterPerMapUnit;
    }
    return meterPerMapUnit;
};

export function getWrapNum(x, includeMax = true, includeMin = true, range = [-180, 180]) {
    var max = range[1],
        min = range[0],
        d = max - min;
    if (x === max && includeMax) {
        return x;
    }
    if (x === min && includeMin) {
        return x;
    }
    var tmp = (((x - min) % d) + d) % d;
    if (tmp === 0 && includeMax) {
        return max;
    }
    return ((((x - min) % d) + d) % d) + min;
}

export function conversionDegree(degrees) {
    const degree = parseInt(degrees);
    let fraction = parseInt((degrees - degree) * 60);
    let second = parseInt(((degrees - degree) * 60 - fraction) * 60);
    fraction = parseInt(fraction / 10) === 0 ? `0${fraction}` : fraction;
    second = parseInt(second / 10) === 0 ? `0${second}` : second;
    return `${degree}°${fraction}'${second}`;
}
