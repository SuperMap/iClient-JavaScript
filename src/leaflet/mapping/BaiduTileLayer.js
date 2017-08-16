import '../core/Base';
import L from "leaflet";

/**
 * @class L.supermap.baiduTileLayer
 * @classdesc 百度切片图层类。
 * @extends L.TileLayer{@linkdoc-leaflet/#tilelayer}
 * @param url -{string} 切片地址
 * @param options -{object} 切片参数。如：<br>
 *        minZoom - {number} 最小缩放级别
 *        maxZoom - {number} 最大缩放级别
 *        bounds - {L.bounds} 显示范围
 *        retina - {L.Browser} 浏览器显示分辨率
 *        attribution - {string} 版权信息
 */
export var BaiduTileLayer = L.TileLayer.extend({

    /**
     * @member L.supermap.baiduTileLayer.prototype.url -{string}
     * @description 切片地址
     */
    url: "http://online{num}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles={styles}&udt=20150815&scaler=1",

    options: {
        minZoom: 3,
        maxZoom: 19,
        bounds: L.latLngBounds(L.latLng(-85.0511287798, -180), L.latLng(85.0511287798, 180)),
        retina: L.Browser.retina,
        attribution: "Map Data © 2017 Baidu - GS(2016)2089号 - Data © 长地万方 with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
    },

    initialize: function (url, options) {
        if (url) {
            this.url = url;
        }
        L.setOptions(this, options);
        if (this.options.retina) {
            this.options.maxZoom = 18;
        }
        L.stamp(this);
    },

    /**
     * @function L.supermap.baiduTileLayer.prototype.getTileUrl
     * @description 获取切片地址
     * @param coords - {Object} 坐标参数对象
     */
    getTileUrl: function (coords) {
        return L.Util.template(this.url, {
            num: Math.abs((coords.x + coords.y) % 8) + 1,
            x: coords.x,
            y: -coords.y - 1,
            z: this._getZoomForUrl(),
            styles: this.options.retina ? 'ph' : 'pl'
        })
    }
});
export var baiduTileLayer = function (url, options) {
    return new BaiduTileLayer(url, options);
};

L.supermap.baiduTileLayer = baiduTileLayer;
