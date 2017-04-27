/**
 * CartoCSS中的style属性名与leaflet的style属性名的对应表
 * */
require('../../core/Base');
var L = require("leaflet");
L.supermap.CartoStyleMap = {
    "TEXT": {
        "text-size": "fontSize",
        "text-face-name": "fontFamily",

        "text-align": "textAlign",
        'text-weight': 'fontWeight',
        "text-halo-color": "color",
        "text-fill": "fillColor",
        "text-comp-op": "globalCompositeOperation"
    },

    "POINT": {
        "point-file": "iconUrl",
        "point-fill": "fillColor",
        "point-radius": "radius",
        "point-halo-color": "color",
        "point-comp-op": "globalCompositeOperation"
    },
    "LINE": {
        "line-color": "color",
        "line-width": "weight",
        "line-cap": "lineCap",
        "line-join": "lineJoin",
        "line-dash-offset": "dashOffset",
        "line-opacity": "opacity",
        "line-dasharray": "dashArray",
        "line-comp-op": "globalCompositeOperation"
    },
    "REGION": {
        "line-color": "color",
        "line-width": "weight",
        "line-cap": "lineCap",
        "line-join": "lineJoin",
        "line-dash-offset": "dashOffset",
        "line-opacity": "opacity",
        "line-dasharray": "dashArray",

        "polygon-fill": "fillColor",
        "polygon-opacity": "fillOpacity",
        "polygon-comp-op": "globalCompositeOperation"
    }
};

/**
 * 服务端传过来的style属性名与leaflet的style属性名的对应表
 * */
L.supermap.ServerStyleMap = {
    lineWidth: {
        leafletStyle: "weight",
        type: "number",
        unit: "mm",
        defaultValue: 0.1
    },

    fillForeColor: {
        leafletStyle: "fillColor",
        type: "color",
        defaultValue: "rgba(0,0,0,0)"
    },

    foreColor: {
        leafletStyle: "color",
        type: "color",
        defaultValue: "rgba(0,0,0,0)"
    },

    markerSize: {
        leafletStyle: "markerSize",
        type:"number",
        unit:"mm",
        defaultValue:2.4,
    },

    lineColor: {
        leafletStyle: "color",
        type: "color",
        defaultValue: "#000000"
    },

};

/**
 * Canvas中的globalCompositeOperation属性值与CartoCSS中的CompOp属性值对照表
 * */
L.supermap.CompOpMap = {
    "clear": "",
    "src": "",
    "dst": "",
    "src-over": "source-over",
    "dst-over": "destination-over",
    "src-in": "source-in",
    "dst-in": "destination-in",
    "src-out": "source-out",
    "dst-out": "destination-out",
    "src-atop": "source-atop",
    "dst-atop": "destination-atop",
    "xor": "xor",
    "plus": "lighter",
    "minus": "",
    "multiply": "",
    "screen": "",
    "overlay": "",
    "darken": "",
    "lighten": "lighter",
    "color-dodge": "",
    "color-burn": "",
    "hard-light": "",
    "soft-light": "",
    "difference": "",
    "exclusion": "",
    "contrast": "",
    "invert": "",
    "invert-rgb": "",
    "grain-merge": "",
    "grain-extract": "",
    "hue": "",
    "saturation": "",
    "color": "",
    "value": ""
};