import '../core/Base';
import L from "leaflet";

/**
 * @class L.supermap.cloudTileLayer
 * @classdesc 云端切片图层类。
 * @extends L.TileLayer
 * @param defaultURL -{String} 默认图层地址
 * @param options -{Object} 云端切片图层可选参数。如：<br>
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
 *        serverType - {String} 服务来源 iServer|iPortal|online。<br>
 *        attribution - {String} 版权信息。
 */
export var CloudTileLayer = L.TileLayer.extend({

    /**
     * @member L.supermap.cloudTileLayer.prototype.defaultURL -{String}
     * @description 默认图层地址
     */
    defaultURL: 'http://t2.supermapcloud.com/FileService/image',

    /**
     * @member L.supermap.cloudTileLayer.prototype.options -{Object}
     * @description 图层参数信息
     */
    options: {
        /*
         * APIProperty: mapName
         * {String} 地图名称，默认为 quanguo。
         */
        mapName: "quanguo",
        /*
         * Property: type
         * {String} 地图投影。
         */
        type: "web",
        minZoom: 3,
        maxZoom: 18,
        attribution: "Map Data ©2013 SuperMap - GS(2011)6014号-data©Navinfo with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"

    },

    initialize: function (url, options) {
        L.setOptions(this, options);
        var cloudURL = url || this.defaultURL;
        this._url = cloudURL + "?map=" + this.options.mapName + "&type=" + this.options.type + "&x={x}&y={y}&z={z}";
        L.stamp(this);
    }
});
export var cloudTileLayer = function (url, options) {
    return new CloudTileLayer(url, options);
};
L.supermap.cloudTileLayer = cloudTileLayer;
