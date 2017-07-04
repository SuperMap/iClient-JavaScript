/*
 Leaflet对象和SuperMap对象转换工具
 */
require('../core/Base');
var L = require("leaflet");
var SuperMap = require('../../common/SuperMap');
L.supermap.CommontypesConversion = {};
L.supermap.CommontypesConversion.toSuperMapBounds = function (bounds) {
    if (bounds instanceof L.LatLngBounds) {
        return new SuperMap.Bounds(
            bounds.getSouthWest().lng,
            bounds.getSouthWest().lat,
            bounds.getNorthEast().lng,
            bounds.getNorthEast().lat
        );
    }
    if (bounds instanceof L.Bounds) {
        return new SuperMap.Bounds(
            bounds.min.x,
            bounds.min.y,
            bounds.max.x,
            bounds.max.y
        );
    }
    return new SuperMap.Bounds();
};
module.exports = L.supermap.CommontypesConversion;