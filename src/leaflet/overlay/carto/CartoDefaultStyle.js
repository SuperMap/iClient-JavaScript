/**
 * Constant: L.supermap.DefaultStyle
 * {Object} 这个style对应的是默认设置
 */
require('../../core/Base');
var L = require("leaflet");
L.supermap.DefaultStyle = {
    "TEXT": {
        fontSize: "14px",
        fontFamily: "Arial Unicode MS Regular,Microsoft YaHei",
        textAlign: "left",

        color: "rgba(255,255,255,0)",
        fillColor: "rgba(80,80,80,1)",
        weight: 1,
        globalAlpha: 1,
    },

    "POINT": {
        fillColor: "#ffcc00",
        color: "#cc3333",
        weight: 1,
        radius: 3,
        opacity: 1,
    },

    "LINE": {
        color: "rgba(0,0,0,0)",
        weight: 1,
        lineCap: "butt",
        lineJoin: "round",

        dashOffset: 0,
        dashArray: [],
        opacity: 1,

    },
    "REGION": {
        color: "rgba(0,0,0,0)",
        fillColor: "rgba(0,0,0,0)",
        weight: 1,
        lineCap: "butt",
        lineJoin: "round",
        dashOffset: 0,
        opacity: 1,
        fillOpacity: 1,
        dashArray: [],
    }
};
module.exports = L.supermap.DefaultStyle;
