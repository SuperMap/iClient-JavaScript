import '../core/Base';
import L from "leaflet";

/**
 * @class L.supermap.cloudTileLayer
 * @classdesc 云端切片图层类。
 * @param defaultURL -{String} 默认图层地址
 * @param options -{Object} 切片图层参数
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
