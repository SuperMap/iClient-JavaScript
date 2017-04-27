var L = require("leaflet");
L.Symbolizer = L.Class.extend({

    initialize: function (feature) {
        this.properties = feature.properties;
        this.type = feature.type;
        this.layerName = feature.layerName;
    },

    render: function (renderer, style) {
        this._renderer = renderer;
        this.options = style;
        renderer._initPath(this);
        renderer._updateStyle(this);
        var elem = this.getElement();
        if (elem && this.layerName) {
            L.DomUtil.addClass(elem, this.layerName);
        }
    },

    updateStyle: function (renderer, style) {
        this.options = style;
        renderer._updateStyle(this);
    },

    getElement: function () {
        return this._path || this._renderer._container;
    },

    _getPixelBounds: function () {
        var parts = this._parts;
        var bounds = L.bounds([]);
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            for (var j = 0; j < part.length; j++) {
                bounds.extend(part[j]);
            }
        }

        var w = this._clickTolerance(),
            p = new L.Point(w, w);

        bounds.min._subtract(p);
        bounds.max._add(p);

        return bounds;
    },
    _clickTolerance: L.Path.prototype._clickTolerance
});
module.exports = L.Symbolizer;
