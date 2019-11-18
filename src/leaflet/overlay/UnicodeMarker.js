/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';

/**
 * @class L.supermap.unicodeMarker
 * @classdesc Unicode 字符图标。
 * @category Visualization Marker
 * @extends {L.Path}
 * @param {L.LatLngBounds} latlng - 经纬度坐标。
 * @param {Object} options - 符号参数。
 * @param {string} options.label - 符号 Unicode 值。
 * @param {string} [options.labelRotation='0'] - 符号旋转角度。
 * @param {string} [options.globalAlpha='1'] - 符号的透明值。
 * @param {string} [options.fontStyle='normal'] - 符号的风格。
 * @param {string} [options.fontWeight='normal'] - 符号的粗细。
 * @param {string} [options.fontSize='1em'] - 符号的尺寸。
 * @param {string} [options.fontFamily='sans-serif'] - 符号的字体。
 * @param {string} [options.textAlign='center'] - 符号内容的对齐方式。
 * @param {string} [options.textBaseline='middle'] - 绘制符号时使用的基线。
 * @fires L.supermap.unicodeMarker#move
 */
export var UnicodeMarker = L.Path.extend({
    // @section
    // @aka CircleMarker options
    options: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "1em",
        fontFamily: "sans-serif",
        textAlign: "center",
        textBaseline: "middle",
        vfactor: -.5,
        labelRotation: 0,
        globalAlpha: 1,
        label: ""
    },

    initialize: function (latlng, options) {
        L.Util.setOptions(this, options);
        this._latlng = latlng;
    },

    /**
     * @function L.supermap.unicodeMarker.prototype.setLatLng
     * @description 设置 marker 新坐标。
     * @param {L.LatLng} setLatLng - 需要设置的新坐标。
     */
    setLatLng: function (latlng) {
        this._latlng = latlng;
        this.redraw();
        /**
         * @event L.supermap.unicodeMarker#move
         * @description circle marker 重设坐标之后触发。
         * @property {L.LatLng} latlng - 当前 marker 坐标。
         */
        return this.fire('move', {latlng: this._latlng});
    },

    /**
     * @function L.supermap.unicodeMarker.prototype.getLatLng
     * @description 获取 marker 坐标。
     * @returns {L.LatLng} 返回当前 marker 坐标。
     */
    getLatLng: function () {
        return this._latlng;
    },


    _project: function () {
        this._point = this._map.latLngToLayerPoint(this._latlng);
        this._updateBounds();
    },

    _updateBounds: function () {
        var w = this._clickTolerance(),
            p = [w, w];
        this._pxBounds = new L.Bounds(this._point.subtract(p), this._point.add(p));
    },
    _update: function () {
        if (this._map) {
            this._updatePath();
        }
    },

    _updatePath: function () {
        this._renderer._updateUnicode(this);
    },
    // Needed by the `Canvas` renderer for interactivity
    _containsPoint: function (p) {
        return p.distanceTo(this._point) <= this._clickTolerance();
    }
})
export var unicodeMarker = function (latlng, options) {
    return new UnicodeMarker(latlng, options);
};

L.Canvas.include({
    _updateUnicode: function (layer) {
        if (!this._drawing) {
            return;
        }
        let pt = {x: layer._point.x, y: layer._point.y},
            ctx = this._ctx,
            fontStyle = [layer.options.fontStyle,
                "normal", layer.options.fontWeight,
                layer.options.fontSize,
                layer.options.fontFamily].join(" ");
        let label = layer.options.label.replace(/^&#x/, '');
        label = String.fromCharCode(parseInt(label, 16));
        let labelRows = label.split('\n');
        let numRows = labelRows.length;
        // if (layer.options.labelXOffset || layer.options.labelYOffset) {
        //     let xOffset = isNaN(layer.options.labelXOffset) ? 0 : layer.options.labelXOffset;
        //     let yOffset = isNaN(layer.options.labelYOffset) ? 0 : layer.options.labelYOffset;
        //     pt.x += xOffset;
        //     pt.y -= yOffset;
        // }
        ctx.fillStyle = layer.options.fontColor;
        ctx.globalAlpha = 1.0;
        if (layer.options.fontOpacity >= 0 && layer.options.fontOpacity < 1) {
            ctx.globalAlpha = layer.options.fontOpacity;
        }
        if (ctx.fillText) {
            // HTML5
            ctx.font = fontStyle;
            ctx.textAlign = layer.options.textAlign;
            ctx.textBaseline = layer.options.textBaseline;
            let vfactor = layer.options.vfactor;
            let lineHeight =
                ctx.measureText('Mg').height ||
                ctx.measureText('xx').width;
            pt.y += lineHeight * vfactor * (numRows - 1);
            for (let i = 0; i < numRows; i++) {
                if (layer.options.labelRotation != 0) {
                    ctx.save();
                    ctx.translate(pt.x, pt.y);
                    ctx.rotate(layer.options.labelRotation * Math.PI / 180);
                    ctx.fillText(labelRows[i], 0, (lineHeight * i));
                    ctx.restore();
                } else {
                    ctx.fillText(labelRows[i], pt.x, pt.y);
                }

            }
        } else if (ctx.mozDrawText) {
            // Mozilla pre-Gecko1.9.1 (<FF3.1)
            ctx.mozTextStyle = fontStyle;
            // No built-in text alignment, so we measure and adjust the position
            let hfactor = layer.options.textAlign;
            let vfactor = layer.options.vfactor;
            let lineHeight = ctx.mozMeasureText('xx');
            pt.y += lineHeight * (1 + (vfactor * numRows));
            for (let i = 0; i < numRows; i++) {
                let x = pt.x + (hfactor * ctx.mozMeasureText(labelRows[i]));
                let y = pt.y + (i * lineHeight);
                ctx.translate(x, y);
                ctx.mozDrawText(labelRows[i]);
                ctx.translate(-x, -y);
            }
        }
    }
});

L.supermap.unicodeMarker = unicodeMarker;