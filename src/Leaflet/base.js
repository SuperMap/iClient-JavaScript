/**
 *SuperMapLeaflet基础模块
 * 1、定义命名空间
 * 2、提供必要的转换工具
 */
require('../Core/format/GeoJSON');
require('leaflet');

L.supermap = L.supermap || {};

L.Util.toGeoJSON = function (smObj) {
    if (smObj) {
        var format = new SuperMap.Format.GeoJSON();
        return JSON.parse(format.write(smObj));
    }
};

L.Util.toSuperMapGeometry = function (geoJSON) {
    if (geoJSON && geoJSON.type) {
        var format = new SuperMap.Format.GeoJSON();
        var result = format.read(geoJSON, "Feature");
        return result.geometry;
    }
};