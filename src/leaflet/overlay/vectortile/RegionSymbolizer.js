require('./Symbolizer');
var L = require("leaflet");
var PolyBase = require('./SymbolizerPolyBase');

L.RegionSymbolizer = L.Polygon.extend({
    includes: [L.Symbolizer.prototype, PolyBase],

    initialize: function (feature, pxPerExtent) {
        L.Symbolizer.prototype.initialize.call(this, feature);
        this._makeFeatureParts(feature, pxPerExtent);
    },

    render: function (renderer, style) {
        L.Symbolizer.prototype.render.call(this, renderer, style);
        this._updatePath();
    }
});
module.exports = L.RegionSymbolizer;