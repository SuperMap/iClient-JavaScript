/**
 *SuperMapOpenlayers基础模块
 * 1、定义命名空间
 * 2、提供必要的转换工具
 */
require('../Core/format/GeoJSON');

ol.supermap = ol.supermap || {};
ol.supermap.Util = ol.supermap.Util || {};

ol.supermap.Util.toGeoJSON = function (smObj) {
    if (smObj) {
        var format = new SuperMap.Format.GeoJSON();
        return JSON.parse(format.write(smObj));
    }
};

ol.supermap.Util.toSuperMapGeometry = function (geoJSON) {
    if (geoJSON && geoJSON.type) {
        var format = new SuperMap.Format.GeoJSON();
        var result = format.read(geoJSON, "FeatureCollection");
        return result[0].geometry;
    }
};

ol.supermap.Util.resolutionToScale = function (resolution, dpi, mapUnit) {
    var inchPerMeter = 1 / 0.0254;
    // 地球半径。
    var meterPerMapUnit = this.getMeterPerMapUnit(mapUnit);
    var scale = resolution * dpi * inchPerMeter * meterPerMapUnit;
    scale = 1 / scale;
    return scale;
}

ol.supermap.Util.scaleToResolution = function (scale, dpi, mapUnit) {
    var inchPerMeter = 1 / 0.0254;
    var meterPerMapUnitValue = this.getMeterPerMapUnit(mapUnit);
    var resolution = scale * dpi * inchPerMeter * meterPerMapUnitValue;
    resolution = 1 / resolution;
    return resolution;
}

ol.supermap.Util.getMeterPerMapUnit = function (mapUnit) {
    var earchRadiusInMeters = 6378137;
    var meterPerMapUnit;
    if (mapUnit === Unit.METER) {
        meterPerMapUnit = 1;
    } else if (mapUnit === Unit.DEGREE) {
        // 每度表示多少米。
        meterPerMapUnit = Math.PI * 2 * earchRadiusInMeters / 360;
    } else if (mapUnit === Unit.KILOMETER) {
        meterPerMapUnit = 1.0E-3;
    } else if (mapUnit === Unit.INCH) {
        meterPerMapUnit = 1 / 2.5399999918E-2;
    } else if (mapUnit === Unit.FOOT) {
        meterPerMapUnit = 0.3048;
    } else {
        return meterPerMapUnit;
    }
    return meterPerMapUnit;
}

ol.supermap.Util.isArray = function (obj) {
    return Object.prototype.toString.call(obj) == '[object Array]'
};