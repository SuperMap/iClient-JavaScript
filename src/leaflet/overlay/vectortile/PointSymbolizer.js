require('./Symbolizer');
require('./SymbolizerPolyBase');
var L = require("leaflet");
L.PointSymbolizer = L.CircleMarker.extend({
    includes: L.Symbolizer.prototype,

    statics: {
        iconCache: {}
    },

    initialize: function (feature, pxPerExtent) {
        L.Symbolizer.prototype.initialize.call(this, feature);
        this._makeFeatureParts(feature, pxPerExtent);
    },

    render: function (renderer, style) {
        L.Symbolizer.prototype.render.call(this, renderer, style);
        this._radius = style.radius || L.CircleMarker.prototype.options.radius;
        this._updatePath();
    },

    _makeFeatureParts: function (feat, pxPerExtent) {
        pxPerExtent = pxPerExtent || {x: 1, y: 1};
        var coord = feat.geometry[0];
        if (typeof coord[0] === 'object' && 'x' in coord[0]) {
            this._point = L.point(coord[0]).scaleBy(pxPerExtent);
            this._empty = L.Util.falseFn;
        } else {
            this._point = L.point(coord).scaleBy(pxPerExtent);
            this._empty = L.Util.falseFn;
        }
    },

    makeInteractive: function () {
        this._updateBounds();
    },

    updateStyle: function (renderer, style) {
        this._radius = style.radius || this._radius;
        this._updateBounds();
        return L.Symbolizer.prototype.updateStyle.call(this, renderer, style);
    },

    _updateBounds: function () {
        var icon = this.options.iconUrl;
        if (icon && this.options.iconSize) {
            var size = L.point(this.options.iconSize),
                anchor = size && size.divideBy(2, true),
                p = this._point.subtract(anchor);
            this._pxBounds = new L.Bounds(p, p.add(size));
        } else {
            L.CircleMarker.prototype._updateBounds.call(this);
        }
    },

    _updatePath: function () {
        if (this.options.iconUrl) {
            this._renderer._updateIcon(this)
        } else {
            L.CircleMarker.prototype._updatePath.call(this);
        }
    },

    _getImage: function () {
        if (!this.options.iconUrl) {
            return null;
        }
        var url = this.options.iconUrl,
            img = L.PointSymbolizer.iconCache[url];
        if (!img) {
            var iconSize = this.options.iconSize || [50, 50];
            img = L.PointSymbolizer.iconCache[url] = this._createIcon(url, iconSize);
        }
        return img;
    },

    _createIcon: function (url, iconSize) {
        var src = url;

        if (!src) {
            throw new Error('iconUrl not set in Icon options (see the docs).');
        }

        var img = document.createElement('img'), name = "icon";
        img.src = src;
        img.className = 'leaflet-marker-' + name + ' ' + (this.layerName || '');

        var options = this.options;
        var sizeOption = iconSize;

        if (typeof sizeOption === 'number') {
            sizeOption = [sizeOption, sizeOption];
        }
        if (sizeOption) {
            var size = L.point(sizeOption),
                anchor = L.point(size && size.divideBy(2, true));

            if (size) {
                img.style.width = size.x + 'px';
                img.style.height = size.y + 'px';
            }
            if (anchor) {
                img.style.marginLeft = (-anchor.x) + 'px';
                img.style.marginTop = (-anchor.y) + 'px';
            }
        }

        img.onload = function (evt) {
            if (!sizeOption) {
                img.style.width = this.width + 'px';
                img.style.height = this.height + 'px';
            }
        };

        return img;
    },

    _containsPoint: function (p) {
        var icon = this.options.iconUrl;
        if (icon) {
            return this._pxBounds.contains(p);
        } else {
            return L.CircleMarker.prototype._containsPoint.call(this, p);
        }
    }
});

module.exports = L.PointSymbolizer;