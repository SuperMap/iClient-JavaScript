import '../core/Base';
import L from "leaflet";

/**
 * @class L.supermap.wmtsLayer
 * @classdesc wmts图层类
 * @extends L.TileLayer
 * @param url -{String} wmts图层地址
 * @param options -{object} wmts图层参数
 */
export var WMTSLayer = L.TileLayer.extend({

    /**
     * @member L.supermap.WMTSLayer.prototype.options
     * @description 图层参数
     */
    options: {
        version: '1.0.0',
        style: '',
        tilematrixSet: '',
        format: 'image/png',
        tileSize: 256,
        matrixIds: null,
        layer: '',
        attribution: "with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
    },

    //todo 自动获取Capabilities
    initialize: function (url, options) { // (String, Object)
        this._url = url;
        L.setOptions(this, options);
    },

    /**
     * @function L.supermap.WMTSLayer.prototype.getTileUrl
     * @description 获取切片图层地址
     * @param coords - {Object} 切片图层坐标参数对象
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
        return url + L.Util.getParamString(obj, url);
    }
});

export var wmtsLayer = function (url, options) {
    return new WMTSLayer(url, options);
};
L.supermap.wmtsLayer = wmtsLayer;