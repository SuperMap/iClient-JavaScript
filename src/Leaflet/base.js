/**
 *SuperMapLeaflet基础模块
 * 1、定义命名空间
 * 2、提供必要的转换工具
 */
require('../Core/format/GeoJSON');
require('./NonEarthCRS');
L.supermap = L.supermap || {};
L.Util.toSuperMapGeometry = function (geometry) {
    if (!geometry) {
        return geometry;
    }
    var result, format = new SuperMap.Format.GeoJSON();
    if (["FeatureCollection", "Feature", "Geometry"].indexOf(geometry.type) != -1) {
        result = format.read(geometry, geometry.type);
    } else if (typeof geometry.toGeoJSON === "function") {
        result = format.read(geometry.toGeoJSON(), "Feature");
    }
    return result.geometry;

};