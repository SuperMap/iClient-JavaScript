import L from "leaflet";

/**
 * @class L.supermap.PolyBase
 * @classdesc 多边形基类
 * @category Visualization VectorTile
 * @private
 */
//@type {{_makeFeatureParts: PolyBase._makeFeatureParts, makeInteractive: PolyBase.makeInteractive}}
export var PolyBase = {
    _makeFeatureParts: function (feat, pxPerExtent) {
        pxPerExtent = pxPerExtent || {x: 1, y: 1};
        var rings = feat.geometry;
        var coord;

        this._parts = [];
        for (var i = 0; i < rings.length; i++) {
            var ring = rings[i];
            var part = [];
            for (var j = 0; j < ring.length; j++) {
                coord = ring[j];
                part.push(L.point(coord).scaleBy(pxPerExtent));
            }
            this._parts.push(part);
        }
    },

    /**
         * @function L.supermap.PolyBase.prototype.makeInteractive
         * @description 设置交互
         */
    makeInteractive: function () {
        this._pxBounds = this._getPixelBounds();
    }
};