require('./Symbolizer');
L.TextSymbolizer = L.Path.extend({
    includes: L.Symbolizer.prototype,

    options: {
        color: 'black',
        fillColor: 'black',
        fill: true,
        fillOpacity: 1.0,
        weight: 0.2,
        rotation: 0.0,
        stroke: true,
        fontFamily: 'sans-serif',
        fontSize: 12,
        fontWeight: 'normal',
        textAlign: 'center'
    },

    initialize: function (feature, pxPerExtent) {
        L.Symbolizer.prototype.initialize.call(this, feature);
        this._makeFeatureParts(feature, pxPerExtent);
    },

    render: function (renderer, style) {
        //原本类型就是text的情况
        if (this.properties.texts) {
            this._text = this.properties.texts[0];
        }
        //类型是label的情况
        if (!this._text) {
            var attributes = this.properties.attributes;
            this._text = (attributes && this.properties.textField) ?
            attributes[this.properties.textField] || "" : "";
        }
        L.Symbolizer.prototype.render.call(this, renderer, style);
        L.Util.setOptions(this, style);
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
        this._updateBounds();
        return L.Symbolizer.prototype.updateStyle.call(this, renderer, style);
    },


    _updateBounds: function () {
        var w = this._renderer._getTextWidth(this);
        var p = [w / 2, w / 2];
        this._pxBounds = L.bounds(this._point.subtract(p), this._point.add(p));
    },

    _updatePath: function () {
        this._renderer._updateText(this);
    },
    _containsPoint: function (point) {
        return false;
    }
});
L.Canvas.Renderer.include({
    _getTextWidth: function (layer) {
        return this._ctx.measureText(layer._text).width;
    },

    _updateText: function (layer) {
        if (!this._drawing || layer._empty()) {
            return;
        }

        var ctx = this._ctx,
            options = layer.options,
            offsetX = options.offsetX || 0,
            offsetY = options.offsetY || 0,
            p = layer._point.subtract(L.point(offsetX, offsetY));
        if (!options.fill) {
            return;
        }

        this._drawnLayers[layer._leaflet_id] = layer;

        ctx.translate(p.x, p.y);
        ctx.rotate(options.rotation);
        ctx.fillStyle = options.fillColor;
        ctx.font = [
            "normal",
            "normal",
            options.fontWeight ? options.fontWeight : "normal",
            options.fontSize ? options.fontSize : "1em",
            options.fontFamily ? options.fontFamily : "sans-serif"
        ].join(" ");
        ctx.textAlign = options.textAlign;
        ctx.lineWidth = options.weight / 10;
        ctx.fillText(layer._text, 0, 0);
        ctx.strokeStyle = options.color;
        ctx.strokeText(layer._text, 0, 0);
        ctx.rotate(-options.rotation);
        ctx.translate(-p.x, -p.y);
    }
});
L.SVG.Renderer.include({
    _getTextWidth: function (layer) {
        return layer._path.getComputedTextLength();
    },

    _initPath: function (layer) {
        var path;

        if (L.TextSymbolizer && layer instanceof L.TextSymbolizer) {
            path = layer._path = L.SVG.create("text");
            path.textContent = layer._text;
        } else {
            path = layer._path = L.SVG.create("path");
        }

        if (layer.options.className) {
            L.DomUtil.addClass(path, layer.options.className);
        }

        if (layer.options.interactive) {
            L.DomUtil.addClass(path, 'leaflet-interactive');
        }

        this._updateStyle(layer);
        this._layers[L.stamp(layer)] = layer;
    },


    _updateText: function (layer) {
        var path = layer._path,
            options = layer.options,
            offsetX = options.offsetX || 0,
            offsetY = options.offsetY || 0,
            p = layer._point.subtract(L.point(offsetX, offsetY));
        path.setAttribute('x', p.x);
        path.setAttribute('y', p.y);
        options.rotation = options.rotation || 0;
        path.setAttribute('transform', 'rotate(' + options.rotation / Math.PI * 180 + ' ' + p.x + ' ' + p.y + ')');
        path.setAttribute('text-anchor', options.textAlign === 'center' ? 'middle' : options.textAlign);
        path.style.fontSize = options.fontSize;
        path.style.fontFamily = options.fontFamily;
        path.style.glyphOrientationVertical = options.rotation;
        if (options.stroke) {
            path.setAttribute('stroke', options.color);
            path.setAttribute('stroke-opacity', options.opacity);
            path.setAttribute('stroke-width', options.weight / 10);
        } else {
            path.setAttribute('stroke', 'none');
        }
        if (options.fill) {
            path.setAttribute('fill', options.fillColor || options.color);
            path.setAttribute('fill-opacity', options.fillOpacity);
        } else {
            path.setAttribute('fill', 'none');
        }
    }
});