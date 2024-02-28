/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
/**
 * @constant  pointMap
 * @description 点图。
 * @private
 */
export var pointMap = {
    "point-file": "pointFile",
    "point-fill": "fillStyle",
    "point-radius": "pointRadius",
    "point-halo-radius": "pointHaloRadius",
    "point-halo-color": "pointHaloColor",
    "point-dx": "offsetX",
    "point-dy": "offsetY",
    "point-opacity": "globalAlpha",
    "point-comp-op": "globalCompositeOperation"
};

/**
 * @constant lineMap
 * @description 线图。
 * @private
 */
export var lineMap = {
    "line-color": "strokeStyle",
    "line-width": "lineWidth",
    "line-cap": "lineCap",
    "line-join": "lineJoin",
    "line-miterlimit": "miterLimit",
    "line-dash-offset": "lineDashOffset",
    /*expand*/
    "line-opacity": "strokeOpacity",
    "line-dasharray": "lineDasharray",
    "line-offset": "offset",
    "line-comp-op": "globalCompositeOperation"
};

/**
 * @constant polygonMap
 * @description 面图。
 * @private
 */
export var polygonMap = {
    /*包括LINE的部分，用以设置面的外围边界*/
    "line-color": "strokeStyle",
    "line-width": "lineWidth",
    "line-cap": "lineCap",
    "line-join": "lineJoin",
    "line-miterlimit": "miterLimit",
    "line-dash-offset": "lineDashOffset",
    /*expand*/
    "line-opacity": "strokeOpacity",
    "line-dasharray": "lineDasharray",

    /*以下为面的特性*/
    "polygon-fill": "fillStyle",
    "polygon-dx": "offsetX",
    "polygon-dy": "offsetY",
    "polygon-opacity": "fillOpacity",
    "polygon-comp-op": "globalCompositeOperation"
};

/**
 * @enum StyleMap {Object}
 * @description 地图样式。
 * @category BaseTypes Constant
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.StyleMap.CartoStyleMap;
 *
 * </script>
 * // ES6 Import
 * import { StyleMap } from '{npm}';
 *
 * const result = StyleMap.CartoStyleMap;
 * ```
 */
export var StyleMap = {
    /** CartoCSS 中的 style 属性名与 Canvas 的 style 属性名的对应表 */
    CartoStyleMap: {
        "TEXT": {
            //前两个属性值组成font
            "text-size": "fontSize",
            "text-face-name": "fontFamily",

            "text-align": "textAlign",
            "text-vertical-alignment": "textBaseline",
            "text-horizontal-alignment": "textAlign",
            /*expand*/
            'text-bold': 'bold',
            'text-weight': 'fontWeight',
            "text-name": "textName",
            "text-halo-radius": "haloRadius",
            "text-halo-color": "backColor",
            "text-fill": "foreColor",
            "text-opacity": "globalAlpha",
            "text-dx": "offsetX",
            "text-dy": "offsetY",
            "text-comp-op": "globalCompositeOperation"
        },
        /*expand*/
        "POINT": pointMap,
        "MULTIPOINT": pointMap,
        "LINE": lineMap,
        "LINESTRING": lineMap,
        "MULTILINESTRING": lineMap,
        "REGION": polygonMap,
        "POLYGON": polygonMap,
        "MULTIPOLYGON": polygonMap
    },
    /** 服务端传过来的 style 属性名与 Canvas 的 style 属性名的对应表。 */
    ServerStyleMap: {
        fillBackOpaque: {
            canvasStyle: "",
            type: "bool",
            defaultValue: true
        },
        lineWidth: {
            canvasStyle: "lineWidth",
            type: "number",
            unit: "mm",
            defaultValue: 0.1
        },
        fillBackColor: {
            canvasStyle: "",
            type: "color",
            defaultValue: "rgba(0,0,0,0)"
        },
        markerWidth: {
            canvasStyle: "",
            type: "number",
            unit: "mm",
            defaultValue: ""
        },
        markerAngle: {
            canvasStyle: "",
            type: "number",
            unit: "degree",
            defaultValue: ""
        },
        fillForeColor: {
            canvasStyle: "fillStyle",
            type: "color",
            defaultValue: "rgba(0,0,0,0)"
        },
        foreColor: {
            canvasStyle: "fillStyle",
            type: "color",
            defaultValue: "rgba(0,0,0,0)"
        },
        markerSize: {
            canvasStyle: "markerSize",
            type: "number",
            unit: "mm",
            defaultValue: 2.4
        },
        fillGradientOffsetRatioX: {
            canvasStyle: "",
            type: "number",
            defaultValue: 0
        },
        fillGradientOffsetRatioY: {
            canvasStyle: "",
            type: "number",
            defaultValue: 0
        },
        lineColor: {
            canvasStyle: "strokeStyle",
            type: "color",
            defaultValue: "rgba(0,0,0,0)"
        },
        fillOpaqueRate: {
            canvasStyle: "",
            type: "number",
            defaultValue: 100
        },
        markerHeight: {
            canvasStyle: "",
            type: "number",
            unit: "mm",
            defaultValue: 0
        },
        fillGradientMode: {
            canvasStyle: "",
            type: "string",
            defaultValue: "NONE"
        },
        fillSymbolID: {
            canvasStyle: "",
            type: "number",
            defaultValue: 0
        },
        fillGradientAngle: {
            canvasStyle: "",
            type: "number",
            unit: "degree",
            defaultValue: 0
        },
        markerSymbolID: {
            canvasStyle: "",
            type: "number",
            defaultValue: 0
        },
        lineSymbolID: {
            canvasStyle: "",
            type: "number",
            defaultValue: 0
        }
    },
    /** Canvas 中的 globalCompositeOperation 属性值与 CartoCSS 中的 CompOp 属性值对照表。 */
    CartoCompOpMap: {
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
    }
};
