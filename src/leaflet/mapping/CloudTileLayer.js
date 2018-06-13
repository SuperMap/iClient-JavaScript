import L from "leaflet";
import "../core/Base";

/**
 * @class L.supermap.cloudTileLayer
 * @classdesc 超图云服务图层。
 * @category ThirdPartyMap
 * @extends {L.TileLayer}
 * @param {string} [url='http://t2.supermapcloud.com/FileService/image?map={mapName}&type={type}&x={x}&y={y}&z={z}'] - 服务地址。
 * @param {Object} options - 图层可选参数。
 * @param {number} options.layersID - 图层ID，如果有layersID，则是在使用专题图。
 * @param {boolean} options.redirect - 是否从定向，如果为 true，则将请求重定向到图片的真实地址；如果为 false，则响应体中是图片的字节流。
 * @param {boolean} options.transparent - 是否背景透明。
 * @param {boolean} options.cacheEnabled - 启用缓存。
 * @param {boolean} options.clipRegionEnabled - 是否启用地图裁剪。
 * @param {Object} options.prjCoordSys - 请求的地图的坐标参考系统。 如：prjCoordSys={"epsgCode":3857}。
 * @param {boolean} options.overlapDisplayed - 地图对象在同一范围内时，是否重叠显示。
 * @param {string} options.overlapDisplayedOptions - 避免地图对象压盖显示的过滤选项。
 * @param {string} options.tileversion - 切片版本名称，cacheEnabled 为 true 时有效。
 * @param {L.Proj.CRS} options.crs - 坐标系统类。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {string} options.attribution - 版权信息。
 * @param {number} options.minZoom - 最小缩放级别。
 * @param {number} options.maxZoom - 最大缩放级别。
 * @param {string} options.mapName - 地图名称。
 */
export var CloudTileLayer = L.TileLayer.extend({

    defaultURL: 'http://t2.supermapcloud.com/FileService/image',

    options: {
        /**
         * @member {String} L.supermap.cloudTileLayer.prototype.options
         * @description 地图名称，默认为 quanguo。
         */
        mapName: "quanguo",
        /**
         * @member {String} L.supermap.cloudTileLayer.prototype.type 
         * @description 地图投影。
         */
        type: "web",
        minZoom: 3,
        maxZoom: 18,
        attribution: "Map Data ©2014 SuperMap - GS(2014)6070号-data©Navinfo with <span>© <a href='http://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>"

    },

    initialize: function (url, options) {
        L.setOptions(this, options);
        var cloudURL = url || this.defaultURL;
        this._url = cloudURL + "?map=" + this.options.mapName + "&type=" + this.options.type;
        L.stamp(this);
    },

    /**
     * @function L.supermap.cloudTileLayer.prototype.getTileUrl
     * @description 获取切片地址
     * @param {Object} coords - 行列号
     * @return {string} 切片地址
     */
    getTileUrl: function (coords) {
        var layerUrl = this._url;
        var tileUrl = layerUrl + "&x=" + coords.x + "&y=" + coords.y + "&z=" + coords.z;
        //支持代理
        if (this.options.tileProxy) {
            tileUrl = this.options.tileProxy + encodeURIComponent(tileUrl);
        }
        return tileUrl;
    }
});
export var cloudTileLayer = function (url, options) {
    return new CloudTileLayer(url, options);
};

L.supermap.cloudTileLayer = cloudTileLayer;