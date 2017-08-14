import '../core/Base';
import L from "leaflet";

/**
 * @class L.supermap.baiduTileLayer
 * @classdesc 百度切片图层类。
 * @extends L.TileLayer
 * @see [L.TileLayer]{@link http://leafletjs.com/reference-1.2.0.html#tilelayer}
 * @param url -{String} 切片地址
 * @param options -{object} 切片可选参数。如：<br>
 *        layersID - {number} 图层ID，如果有layersID，则是在使用专题图。<br>
 *        redirect - {boolean} 是否从定向，如果为 true，则将请求重定向到图片的真实地址；如果为 false，则响应体中是图片的字节流。<br>
 *        transparent - {number} 设置透明度。<br>
 *        cacheEnabled - {String} 启用缓存。<br>
 *        clipRegionEnabled - {boolean} 是否启用地图裁剪。<br>
 *        prjCoordSys - {object} 请求的地图的坐标参考系统。 如：prjCoordSys={"epsgCode":3857}。<br>
 *        overlapDisplayed - {boolean} 地图对象在同一范围内时，是否重叠显示。<br>
 *        overlapDisplayedOptions - {String} 避免地图对象压盖显示的过滤选项。<br>
 *        tileversion - {String} 切片版本名称，cacheEnabled 为 true 时有效。<br>
 *        crs - {L.Proj.CRS} 坐标系统类。<br>
 *        serverType - {String} 服务来源 iServer|iPortal|online
 *        attribution - {String} 版权信息。
 */
export var BaiduTileLayer = L.TileLayer.extend({

    /**
     * @member L.supermap.baiduTileLayer.prototype.url -{String}
     * @description 切片地址
     */
    url: "http://online{num}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles={styles}&udt=20150815&scaler=1",

    /**
     * @member L.supermap.baiduTileLayer.prototype.options -{object}
     * @description 切片参数
     */
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
