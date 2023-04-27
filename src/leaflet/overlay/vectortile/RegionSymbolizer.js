/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import {Symbolizer} from './Symbolizer';
import {PolyBase} from './SymbolizerPolyBase';

/**
 * @class RegionSymbolizer
 * @classdesc 面符号类。
 * @category Visualization VectorTile
 * @private
 * @extends {L.Polygon}
 * @param {Object} feature - 面要素。
 * @param {number} pxPerExtent - 面积像素大小。
 */
export var RegionSymbolizer = L.Polygon.extend({

    /**
     * @member RegionSymbolizer.prototype.includes
     * @description 包含的符号。
     */
    includes: [Symbolizer.prototype, PolyBase],

    initialize: function (feature, pxPerExtent) {
        Symbolizer.prototype.initialize.call(this, feature);
        this._makeFeatureParts(feature, pxPerExtent);
    },

    /**
     * @function RegionSymbolizer.prototype.render
     * @description 绘制面符号。
     * @param {Object} renderer - 渲染器。
     * @param {string} style - 符号样式。
     */
    render: function (renderer, style) {
        Symbolizer.prototype.render.call(this, renderer, style);
        this._updatePath();
    }
});