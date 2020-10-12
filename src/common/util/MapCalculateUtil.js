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
