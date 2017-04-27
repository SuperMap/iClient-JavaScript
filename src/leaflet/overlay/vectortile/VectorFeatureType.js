/**
 *矢量图层要素类型,和SuperMap.CartoStyleMap中的类型相对应
 */
require("../../core/Base");
var L = require("leaflet");
L.supermap.VectorFeatureType = {
    LABEL: "LABEL",//label实际处理成TEXT
    TEXT: "TEXT",
    POINT: "POINT",
    LINE: "LINE",
    REGION: "REGION"
};
module.exports = L.supermap.VectorFeatureType;