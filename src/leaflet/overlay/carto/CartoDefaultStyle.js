/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';

/**
 * @constant L.supermap.DefaultStyle
 * @description 这个 style 对应的是默认设置。
 * @category BaseTypes Style
 * @private
 */
export var DefaultStyle = {

    /**
     * @constant L.supermap.DefaultStyle.prototype.TEXT
     * @description 默认文本样式。
     */
    "TEXT": {
        fontSize: "14px",
        fontFamily: "Arial Unicode MS Regular,Microsoft YaHei",
        textAlign: "left",
        color: "rgba(255,255,255,0)",
        fillColor: "rgba(80,80,80,1)",
        weight: 1,
        globalAlpha: 1
    },

    /**
     * @constant L.supermap.DefaultStyle.prototype.POINT
     * @description 默认点样式。
     */
    "POINT": {
        fillColor: "#ffcc00",
        color: "#cc3333",
        weight: 1,
        radius: 3,
        opacity: 1
    },

    /**
     * @constant L.supermap.DefaultStyle.prototype.LINE
     * @description 默认线样式。
     */
    "LINE": {
        color: "rgba(0,0,0,0)",
        weight: 1,
        lineCap: "butt",
        lineJoin: "round",

        dashOffset: 0,
        dashArray: [],
        opacity: 1
    },

    /**
     * @constant L.supermap.DefaultStyle.prototype.REGION
     * @description 默认多边形样式。
     */
    "REGION": {
        color: "rgba(0,0,0,0)",
        fillColor: "rgba(0,0,0,0)",
        weight: 1,
        lineCap: "butt",
        lineJoin: "round",
        dashOffset: 0,
        opacity: 1,
        fillOpacity: 1,
        dashArray: []
    }
};

L.supermap.DefaultStyle = DefaultStyle