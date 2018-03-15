import L from "leaflet";
import '../core/Base';

/**
 * @class L.supermap.unicodeMarker
 * @classdesc Unicode字符图标。
 * @category Visualization Marker
 * @extends L.Path{@linkdoc-leaflet/#Path}
 * @param latlng -[L.LatLngBounds]{@linkdoc-leaflet/#latlng} 经纬度坐标
 * @param options -{Object} 符号参数。<br>
 *        label - {string} 符号Unicode值 <br>
 *        labelRotation - {string} 符号旋转角度 <br>
 *        globalAlpha - {string} 符号的透明值 <br>
 *        fontStyle - {string} 符号的风格 <br>
 *        fontWeight - {string} 符号的粗细 <br>
 *        fontSize - {string} 符号的尺寸 <br>
 *        fontFamily - {string} 符号的字体 <br>
 *        textAlign - {string} 符号内容的对齐方式 <br>
 *        textBaseline - {string} 绘制符号时使用的基线 <br>
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

    // @method setLatLng(latLng: LatLng): this
    // Sets the position of a circle marker to a new location.
    setLatLng: function (latlng) {
        this._latlng = latlng;
        this.redraw();
        return this.fire('move', {latlng: this._latlng});
    },

    // @method getLatLng(): LatLng
    // Returns the current geographical position of the circle marker
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
        this._drawnLayers[layer._leaflet_id] = layer;
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