import L from "leaflet";
import {Symbolizer} from './Symbolizer';
import {PolyBase} from './SymbolizerPolyBase';

/**
 * @class L.supermap.RegionSymbolizer
 * @classdesc 面符号类
 * @category Visualization VectorTile
 * @private
 * @extends {L.Polygon}
 * @param {L.feature} feature - 面要素
 * @param {number} pxPerExtent - 面积像素大小
 */
export var RegionSymbolizer = L.Polygon.extend({

    /**
     * @member L.supermap.RegionSymbolizer.prototype.includes
     * @description 包含符号
     */
    includes: [Symbolizer.prototype, PolyBase],

    initialize: function (feature, pxPerExtent) {
        Symbolizer.prototype.initialize.call(this, feature);
        this._makeFeatureParts(feature, pxPerExtent);
    },

    /**
     * @function L.supermap.RegionSymbolizer.prototype.render
     * @description 绘制面符号
     * @param {Object} renderer - 渲染器
     * @param {string} style - 符号样式
     */
    render: function (renderer, style) {
        Symbolizer.prototype.render.call(this, renderer, style);
        this._updatePath();
    }
});