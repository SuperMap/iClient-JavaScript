import L from "leaflet";
import "../core/Base";

/**
 * @class L.supermap.cloudTileLayer
 * @classdesc 超图云服务图层。
 * @category ThirdPartyMap
 * @extends L.TileLayer{@linkdoc-leaflet/#tilelayer}
 * @param url -{string} 服务地址，默认为 http://t2.supermapcloud.com/FileService/image?map={mapName}&type={type}&x={x}&y={y}&z={z}
 * @param options -{Object} 图层可选参数。如：<br>
 *        layersID - {number}图层ID，如果有layersID，则是在使用专题图。<br>
 *        redirect - {boolean} 是否从定向，如果为 true，则将请求重定向到图片的真实地址；如果为 false，则响应体中是图片的字节流。<br>
 *        transparent - {boolean}是否背景透明。<br>
 *        cacheEnabled - {boolean} 启用缓存。<br>
 *        clipRegionEnabled - {boolean} 是否启用地图裁剪。<br>
 *        prjCoordSys - {Object} 请求的地图的坐标参考系统。 如：prjCoordSys={"epsgCode":3857}。<br>
 *        overlapDisplayed - {boolean} 地图对象在同一范围内时，是否重叠显示。<br>
 *        overlapDisplayedOptions - {string} 避免地图对象压盖显示的过滤选项。<br>
 *        tileversion - {string} 切片版本名称，cacheEnabled 为 true 时有效。<br>
 *        crs - {{@link L.Proj.CRS}} 坐标系统类。<br>
 *        serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online。<br>
 *        attribution - {string} 版权信息。<br>
 *        minZoom - {number} 最小缩放级别。<br>
 *        maxZoom - {number} 最大缩放级别。<br>
 *        mapName - {string} 地图名称。
 */
export var CloudTileLayer = L.TileLayer.extend({

    defaultURL: 'http://t2.supermapcloud.com/FileService/image',

    options: {
        /**
         * @member L.supermap.cloudTileLayer.prototype.options -{String}
         * @description 地图名称，默认为 quanguo。
         */
        mapName: "quanguo",
        /**
         * @member L.supermap.cloudTileLayer.prototype.type -{{String} }
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
     * @param coords - {Object} 行列号
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