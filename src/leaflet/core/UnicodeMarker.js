import '../core/Base';
import L from "leaflet";

/**
 * @class L.supermap.baiduTileLayer
 * @classdesc 百度地图图层。
 * @extends L.TileLayer{@linkdoc-leaflet/#tilelayer}
 * @param url -{string} 切片地址
 * @param options -{Object} 切片参数。如：<br>
 *        minZoom - {number} 最小缩放级别 <br>
 *        maxZoom - {number} 最大缩放级别 <br>
 *        bounds - {[L.LatLngBounds]{@linkdoc-leaflet/#latlngbounds}} 显示范围 <br>
 *        retina - {[L.Browser]{@linkdoc-leaflet/#browser}} 浏览器显示分辨率 <br>
 *        attribution - {string} 版权信息 <br>
 */
export var UnicodeMarker = L.Path.extend({
    // @section
    // @aka CircleMarker options
    options: {
        fill: true,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "1em",
        fontFamily: "sans-serif",
        textAlign: "center",
        textBaseline: "middle",
        vfactor: -.5,
        labelRotation: 0,
        labelXOffset: 0,
        labelYOffset: 0,
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
L.supermap.unicodeMarker = unicodeMarker;
L.Canvas.include({
    _updateUnicode: function (layer) {
        if (!this._drawing) {
            return;
        }
        this._drawnLayers[layer._leaflet_id] = layer;
        let pt = layer._point,
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
                    ctx.fillText(labelRows[i], pt.x, pt.y + (lineHeight * i));
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