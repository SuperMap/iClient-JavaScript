/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import {Symbolizer} from './Symbolizer';
import {PolyBase} from './SymbolizerPolyBase';

/**
 * @class L.supermap.LineSymbolizer
 * @classdesc 线符号类。
 * @category Visualization VectorTile
 * @private
 * @extends {L.Polyline}
 * @param {Object} feature - 线要素。
 * @param {number} pxPerExtent - 线长。
 */
export var LineSymbolizer = L.Polyline.extend({

    /**
     * @member L.supermap.LineSymbolizer.prototype.includes
     * @description 包含符号。
     */
    includes: [Symbolizer.prototype, PolyBase],

    initialize: function (feature, pxPerExtent) {
        Symbolizer.prototype.initialize.call(this, feature);
        this._makeFeatureParts(feature, pxPerExtent);
    },

    /**
     * @function L.supermap.LineSymbolizer.prototype.render
     * @description 绘制线符号。
     * @param {Object} renderer - 渲染器。
     * @param {string} style - 符号样式。
     */
    render: function (renderer, style) {
        style.fill = false;
        Symbolizer.prototype.render.call(this, renderer, style);
        this._updatePath();
    },

    /**
     * @function L.supermap.LineSymbolizer.prototype.updateStyle
     * @description 更新替换符号样式。
     * @param {Object} renderer - 渲染器。
     * @param {string} style - 符号样式。
     */
    updateStyle: function (renderer, style) {
        style.fill = false;
        Symbolizer.prototype.updateStyle.call(this, renderer, style);
    }
});