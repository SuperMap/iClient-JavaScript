/**
 *SuperMapLeaflet基础模块
 * 1、定义命名空间
 * 2、提供必要的转换工具
 */
L.supermap = L.supermap || {};
require('../Core/format/GeoJSON');
require('./NonEarthCRS');

L.Util.toGeoJSON = function (feature) {
    if (!feature) {
        return feature;
    }
    var result, format = new SuperMap.Format.GeoJSON();
    if (feature.geometry) {
        result = JSON.parse(format.write(feature.geometry));
    } else {
        result = JSON.parse(format.write(feature));
    }
    return result;
};

L.Util.toSuperMapGeometry = function (geometry) {
    if (!geometry) {
        return geometry;
    }
    var result, format = new SuperMap.Format.GeoJSON();
    if (["FeatureCollection", "Feature", "Geometry"].indexOf(geometry.type) != -1) {
        result = format.read(geometry, geometry.type);
    } else if (typeof geometry.toGeoJSON === "function") {
        var geojson = geometry.toGeoJSON();
        result = (geojson) ? format.read(geojson, geojson.type) : geometry;
    }

    var serverResult = result;
    if (L.Util.isArray(result)) {
        if (result.length === 1) {
            serverResult = result[0];
        } else if (result.length > 1) {
            serverResult = [];
            result.map(function (item) {
                serverResult.push(item.geometry);
            });
        }
    }

    return (serverResult && serverResult.geometry) ? serverResult.geometry : serverResult;

};