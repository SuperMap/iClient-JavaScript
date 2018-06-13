import L from "leaflet";
import {Symbolizer} from './Symbolizer';
import {CanvasRenderer} from './CanvasRenderer';
import {SVGRenderer} from './SVGRenderer';

/**
 * @class L.supermap.TextSymbolizer
 * @classdesc 文本符号类
 * @category Visualization VectorTile
 * @private
 * @extends {L.Path}
 * @param {L.feature} feature - 要素
 * @param {number} pxPerExtent - 文本符号大小
 */
export var TextSymbolizer = L.Path.extend({

    /**
     * @member L.supermap.TextSymbolizer.prototype.includes
     * @description 包含符号
     */
    includes: Symbolizer.prototype,

    options: {
        color: 'white',
        fillColor: 'black',
        fill: true,
        fillOpacity: 1,
        opacity: 0.6,
        weight: 1,
        rotation: 0.0,
        stroke: true,
        fontFamily: "Arial Unicode MS Regular",
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'center',
        offsetX: 1,
        offsetY: 1
    },

    initialize: function (feature, pxPerExtent) {
        Symbolizer.prototype.initialize.call(this, feature);
        this._makeFeatureParts(feature, pxPerExtent);
        this.options.offsetX = pxPerExtent || 1;
        this.options.offsetY = pxPerExtent || 1;
    },

    /**
     * @function L.supermap.TextSymbolizer.prototype.render
     * @description 绘制点符号
     * @param {Object} renderer - 渲染器
     * @param {string} style - 符号样式
     */
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
        var options = this.options;
        this._pxBounds = L.bounds(this._point, this._point);
        Symbolizer.prototype.render.apply(this, [renderer, style]);
        this.options = L.Util.extend(options, style);
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

    /**
     * @function L.supermap.TextSymbolizer.prototype.makeInteractive
     * @description 设置交互
     */
    makeInteractive: function () {
        this._updateBounds();
    },

    /**
     * @function L.supermap.TextSymbolizer.prototype.updateStyle
     * @description 更新替换符号样式
     * @param {Object} renderer - 渲染器
     * @param {string} style - 符号样式
     */
    updateStyle: function (renderer, style) {
        this._updateBounds();
        return Symbolizer.prototype.updateStyle.call(this, renderer, style);
    },


    _updateBounds: function () {
        var w = this._renderer._getTextWidth(this);
        var p = [w / 2, w / 2];
        this._pxBounds = L.bounds(this._point.subtract(p), this._point.add(p));
    },

    _updatePath: function () {
        this._renderer._updateText(this);
    },
    _containsPoint: function (point) { // eslint-disable-line no-unused-vars
        return false;
    }
});

CanvasRenderer.include({
    _getTextWidth: function (layer) {
        return this._ctx.measureText(layer._text).width;
    },
    _updateText: function (layer) {
        if (!this._drawing || layer._empty()) {
            return;
        }
        var container = this.getContainer();
        var size = this._map.getSize();
        container.width = size.x;
        container.height = size.y;
        container.style.width = size.x + 'px';
        container.style.height = size.y + 'px';
        var ctx = this._ctx,
            options = layer.options,
            offsetX = options.offsetX || 1,
            offsetY = options.offsetY || 1,
            p = layer._point.subtract(L.point(offsetX, offsetY));
        if (!options.fill) {
            return;
        }

        this._drawnLayers[layer._leaflet_id] = layer;

        ctx.fillRect(0, 0, size.x, size.y);
        ctx.font = [
            options.fontWeight ? options.fontWeight : "normal",
            options.fontSize ? options.fontSize : "14px",
            options.fontFamily ? options.fontFamily : "Arial Unicode MS Regular,Microsoft Yahei"
        ].join(" ");
        ctx.textAlign = options.textAlign;
        ctx.lineWidth = options.weight;
        ctx.fillStyle = options.fillColor;
        ctx.fillText(layer._text, p.x, p.y);
        ctx.strokeStyle = options.color;
        ctx.strokeText(layer._text, p.x, p.y);
        ctx.rotate(options.rotation);
    }
});

SVGRenderer.include({
    _getTextWidth: function (layer) {
        return layer._path.getComputedTextLength() || 0;
    },

    _initPath: function (layer) {
        var path;

        if (TextSymbolizer && layer instanceof TextSymbolizer) {
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
            offsetX = options.offsetX || 1,
            offsetY = options.offsetY || 1,
            p = layer._point.subtract(L.point(offsetX, offsetY));
        path.setAttribute('x', p.x);
        path.setAttribute('y', p.y);
        options.rotation = options.rotation || 0;
        path.setAttribute('transform', 'rotate(' + options.rotation / Math.PI * 180 + ' ' + p.x + ' ' + p.y + ')');
        path.setAttribute('text-anchor', options.textAlign === 'center' ? 'middle' : options.textAlign);
        path.style.fontSize = options.fontSize;
        path.style.fontFamily = options.fontFamily;
        path.style.fontWeight = options.fontWeight || "normal";
        path.style.glyphOrientationVertical = options.rotation||'';
        if (options.stroke) {
            path.setAttribute('stroke', options.color);
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            path.setAttribute('stroke-opacity', options.opacity);
            path.setAttribute('stroke-width', options.weight > 1 ? options.weight / 10 : options.weight);
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