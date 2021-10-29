/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../../core/Base';

/**
 * @constant CartoStyleMap
 * @description CartoCSS 中的 style 属性名与 leaflet 的 style 属性名的对应表。
 * @category BaseTypes Style
 * @private
 */
export var CartoStyleMap = {

    /*
     * @constant CartoStyleMap.prototype.TEXT
     * @description 默认文本样式。
     */
    "TEXT": {
        "text-size": "fontSize",
        "text-face-name": "fontFamily",
        "text-align": "textAlign",
        "text-name": "textName",
        'text-weight': 'fontWeight',
        "text-halo-color": "color",
        "text-fill": "fillColor",
        "text-comp-op": "globalCompositeOperation"
    },

    /*
     * @constant CartoStyleMap.prototype.POINT
     * @description 默认点样式。
     */
    "POINT": {
        "point-file": "iconUrl",
        "point-fill": "fillColor",
        "point-radius": "radius",
        "point-halo-color": "color",
        "point-comp-op": "globalCompositeOperation"
    },

    /*
     * @constant CartoStyleMap.prototype.LINE
     * @description 默认线样式。
     */
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

    /*
     * @constant CartoStyleMap.prototype.REGION
     * @description 默认多边形样式。
     */
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
 * @constant ServerStyleMap
 * @description 服务端传过来的 style 属性名与 leaflet 的 style 属性名的对应表。
 * @private
 */
export var ServerStyleMap = {

    /**
     * @member ServerStyleMap.prototype.lineWidth
     * @description 线宽。
     */
    lineWidth: {
        leafletStyle: "weight",
        type: "number",
        unit: "mm",
        defaultValue: 0.1
    },

    /**
     * @member ServerStyleMap.prototype.fillForeColor
     * @description 填充前景色。
     */
    fillForeColor: {
        leafletStyle: "fillColor",
        type: "color",
        defaultValue: "rgba(0,0,0,0)"
    },

    /**
     * @member ServerStyleMap.prototype.foreColor
     * @description 前景色。
     */
    foreColor: {
        leafletStyle: "color",
        type: "color",
        defaultValue: "rgba(0,0,0,0)"
    },

    /**
     * @member ServerStyleMap.prototype.markerSize
     * @description 图标大小。
     */
    markerSize: {
        leafletStyle: "markerSize",
        type: "number",
        unit: "mm",
        defaultValue: 2.4
    },

    /**
     * @member ServerStyleMap.prototype.lineColor
     * @description 线要素颜色。
     */
    lineColor: {
        leafletStyle: "color",
        type: "color",
        defaultValue: "#000000"
    }
};

/**
 * @constant CompOpMap
 * @description Canvas 中的 globalCompositeOperation 属性值与 CartoCSS 中的 CompOp 属性值对照表。
 * @private
 */
export var CompOpMap = {
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
