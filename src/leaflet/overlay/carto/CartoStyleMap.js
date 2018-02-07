import L from "leaflet";
import '../../core/Base';

/**
 * @constant L.supermap.CartoStyleMap
 * @description CartoCSS中的style属性名与leaflet的style属性名的对应表
 * @category BaseTypes Style
 * @private
 */
export var CartoStyleMap = {

    /*
     * @constant L.supermap.CartoStyleMap.prototype.TEXT
     * @description 默认文本样式
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
     * @constant L.supermap.CartoStyleMap.prototype.POINT
     * @description 默认点样式
     */
    "POINT": {
        "point-file": "iconUrl",
        "point-fill": "fillColor",
        "point-radius": "radius",
        "point-halo-color": "color",
        "point-comp-op": "globalCompositeOperation"
    },

    /*
     * @constant L.supermap.CartoStyleMap.prototype.LINE
     * @description 默认线样式
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
     * @constant L.supermap.CartoStyleMap.prototype.REGION
     * @description 默认多边形样式
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
 * @constant L.supermap.ServerStyleMap
 * @description 服务端传过来的style属性名与leaflet的style属性名的对应表
 * @private
 */
export var ServerStyleMap = {

    /**
     * @member L.supermap.ServerStyleMap.prototype.lineWidth
     * @description 线宽
     */
    lineWidth: {
        leafletStyle: "weight",
        type: "number",
        unit: "mm",
        defaultValue: 0.1
    },

    /**
     * @member L.supermap.ServerStyleMap.prototype.fillForeColor
     * @description 填充前景色
     */
    fillForeColor: {
        leafletStyle: "fillColor",
        type: "color",
        defaultValue: "rgba(0,0,0,0)"
    },

    /**
     * @member L.supermap.ServerStyleMap.prototype.foreColor
     * @description 前景色
     */
    foreColor: {
        leafletStyle: "color",
        type: "color",
        defaultValue: "rgba(0,0,0,0)"
    },

    /**
     * @member L.supermap.ServerStyleMap.prototype.markerSize
     * @description 图标大小
     */
    markerSize: {
        leafletStyle: "markerSize",
        type: "number",
        unit: "mm",
        defaultValue: 2.4
    },

    /**
     * @member L.supermap.ServerStyleMap.prototype.lineColor
     * @description 线要素颜色
     */
    lineColor: {
        leafletStyle: "color",
        type: "color",
        defaultValue: "#000000"
    }
};

/**
 * @constant L.supermap.CompOpMap
 * @description Canvas中的globalCompositeOperation属性值与CartoCSS中的CompOp属性值对照表
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

L.supermap.CartoStyleMap = CartoStyleMap;
L.supermap.ServerStyleMap = ServerStyleMap;
L.supermap.CompOpMap = CompOpMap;