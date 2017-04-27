require('./Symbolizer');
var L = require("leaflet");
var PolyBase = require('./SymbolizerPolyBase');

L.LineSymbolizer = L.Polyline.extend({
    includes: [L.Symbolizer.prototype, PolyBase],

    initialize: function (feature, pxPerExtent) {
        L.Symbolizer.prototype.initialize.call(this, feature);
        this._makeFeatureParts(feature, pxPerExtent);
    },

    render: function (renderer, style) {
        style.fill = false;
        L.Symbolizer.prototype.render.call(this, renderer, style);
        this._updatePath();
    },

    updateStyle: function (renderer, style) {
        style.fill = false;
        L.Symbolizer.prototype.updateStyle.call(this, renderer, style);
    }
});

module.exports = L.LineSymbolizer;