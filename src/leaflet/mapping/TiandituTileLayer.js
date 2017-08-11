import '../core/Base';
import L from "leaflet";
import {WMTSLayer} from "./TileLayer.WMTS";

/**
 * @class L.supermap.tiandituTileLayer
 * @classdesc 天地图切片图层类。
 * @param defaultURL -{String} 默认图层地址
 * @param options -{Object} 切片图层参数
 */
export var TiandituTileLayer = WMTSLayer.extend({

    /**
     * @member L.supermap.tiandituTileLayer.prototype.defaultURL -{String}
     * @description 默认图层地址
     */
    defaultURL: 'http://t{s}.tianditu.com/img_w/wmts?"',

    /**
     * @member L.supermap.tiandituTileLayer.prototype.options -{Object}
     * @description 图层参数信息
     */
    options: {
        layer: "img",
        style: "default",
        tilematrixSet: "w",
        format: "tiles",
        subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
        attribution: "Map Data <a href='http://www.tianditu.com' target='_blank'><img style='background-color:transparent;bottom:2px;opacity:1;' src='http://api.tianditu.com/img/map/logo.png' width='53px' height='22px' opacity='0'></a> with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"


    },

    initialize: function (url, options) {
        L.setOptions(this, options);
        this._url = url || this.defaultURL;
        L.stamp(this);
    }
});
export var tiandituTileLayer = function (url, options) {
    return new TiandituTileLayer(url, options);
};
L.supermap.tiandituTileLayer = tiandituTileLayer;
