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