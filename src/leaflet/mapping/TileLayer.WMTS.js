/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import "../core/Base";

/**
 * @class L.supermap.wmtsLayer
 * @classdesc wmts 图层类。
 * @category OGC
 * @extends {L.TileLayer}
 * @param {string} url - wmts 图层地址。
 * @param {Object} options - wmts 图层可选参数。
 * @param {string} options.layer - 需要显示的图层。
 * @param {string} [options.tileProxy] - 代理地址。
 * @param {Object} [options.style] - 图层样式。
 * @param {string} [options.format='image/png'] - wmts 图像格式（'image/png'用于具有透明度的图层）。
 * @param {(number|L.Point)} [options.tileSize='256'] - 瓦片大小。
 * @param {string} [options.requestEncoding='KVP'] - KVP 或者 REST 的请求方式。
 * @param {string} [options.tilematrixSet] - 瓦片矩阵集。
 * @param {Array.<L.supermap.wmtsLayer.matrix>} [options.matrixIds] - 瓦片矩阵对象。不设置时，默认为获取当前级别为tilematrix参数。
 * @param {string} [options.version='1.0.0'] - 版本。
 * @param {string} [options.attribution] - 版权信息。
 * @param {string} [options.noWrap=true] - 图层是否X方向平铺。
 */
/**
 * @typedef {Object} L.supermap.wmtsLayer.matrix
 * @description 瓦片矩阵。
 * @property {string} identifier - 瓦片矩阵标识符。
 */
export var WMTSLayer = L.TileLayer.extend({

    options: {
        version: '1.0.0',
        style: '',
        tilematrixSet: '',
        format: 'image/png',
        tileSize: 256,
        matrixIds: null,
        layer: '',
        requestEncoding: 'KVP',
        attribution: '',
        noWrap: true
    },

    //todo 自动获取Capabilities
    initialize: function (url, options) { // (String, Object)
        this._url = url;
        L.setOptions(this, options);

        var opt = this.options;
        if (opt.requestEncoding === "REST") {

            var formatSuffixMap = {
                "image/png": "png",
                "image/png8": "png",
                "image/png24": "png",
                "image/png32": "png",
                "png": "png",
                "image/jpeg": "jpg",
                "image/jpg": "jpg",
                "jpeg": "jpg",
                "jpg": "jpg"
            };
            this.formatSuffix = "." + (formatSuffixMap[opt.format] || opt.format.split("/").pop() || "png");
        } else {

            opt.requestEncoding = "KVP";
        }
        
    },

    /**
     * @function L.supermap.wmtsLayer.prototype.getTileUrl
     * @description 根据行列号获取切片地址。
     * @param {Object} coords - 行列号。
     * @returns {string} 切片地址。
     */
    getTileUrl: function (coords) { // (Point, Number) -> String
        var zoom = this._getZoomForUrl();
        var ident = this.options.matrixIds ? this.options.matrixIds[zoom].identifier : zoom;

        var url = L.Util.template(this._url, {s: this._getSubdomain(coords)});

        var obj = {
            service: 'WMTS',
            request: 'GetTile',
            version: this.options.version,
            style: this.options.style,
            tilematrixSet: this.options.tilematrixSet,
            format: this.options.format,
            width: this.options.tileSize,
            height: this.options.tileSize,
            layer: this.options.layer,
            tilematrix: ident,
            tilerow: coords.y,
            tilecol: coords.x
        };

        if (this.options.tileProxy) {
            url = this.options.tileProxy + url;
        }

        if (this.options.requestEncoding === 'KVP') {
            url += L.Util.getParamString(obj, url);
        } else if (this.options.requestEncoding === 'REST') {
            var params = "/" + obj.layer + "/" + obj.style + "/" + obj.tilematrixSet + "/" + obj.tilematrix + "/" + obj.tilerow + "/" + obj.tilecol + this.formatSuffix;
            url += params;
        }
        return url;
    }
});

export var wmtsLayer = function (url, options) {
    return new WMTSLayer(url, options);
};

L.supermap.wmtsLayer = wmtsLayer;