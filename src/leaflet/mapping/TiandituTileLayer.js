import L from "leaflet";
import "../core/Base";
import {WMTSLayer} from "./TileLayer.WMTS";

/**
 * @class L.supermap.tiandituTileLayer
 * @classdesc 天地图图层类。
 * @category ThirdPartyMap
 * @extends L.supermap.wmtsLayer
 * @param options -{Object} 切片图层参数。如：<br>
 *        url - {string} 地图地址。<br>
 *        layerType - {string} 图层类型。(vec:矢量图层，img:影像图层，ter:地形图层)<br>
 *        style - {string} 图层风格。<br>
 *        format - {string} 格式。<br>
 *        isLabel - {boolean} 是否是标注图层<br>
 *        subdomains - {Array<number>} 子域名数组。<br>
 *        attribution - {string} 版权信息
 */
export var TiandituTileLayer = WMTSLayer.extend({

    layerLabelMap: {
        "vec": "cva",
        "ter": "cta",
        "img": "cia"
    },
    layerZoomMap: {
        "vec": 18,
        "ter": 14,
        "img": 18
    },
    options: {
        layerType: "vec",    //(vec:矢量图层，vec:矢量标签图层，img:影像图层,cia:影像标签图层，ter:地形,cta:地形标签图层)
        isLabel: false,
        attribution: "Map Data <a href='http://www.tianditu.com' target='_blank'><img style='background-color:transparent;bottom:2px;opacity:1;' src='http://api.tianditu.com/img/map/logo.png' width='53px' height='22px' opacity='0'></a> with <span>© <a href='http://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>",
        url: "http://t{s}.tianditu.com/{layer}_{proj}/wmts?",
        zoomOffset: 1,
        dpi: 96,
        style: "default",
        format: "tiles",
        subdomains: [0, 1, 2, 3, 4, 5, 6, 7]
    },

    initialize: function (options) {
        options = options || {};
        L.setOptions(this, options);
        this.options.layer = this.options.isLabel ? this.layerLabelMap[this.options.layerType] : this.options.layerType;
        this.options.maxZoom = this.layerZoomMap[this.options.layerType];
        WMTSLayer.prototype.initialize.call(this, this.options.url, this.options);
        L.stamp(this);
    },
    onAdd: function (map) {
        this.options.tilematrixSet = map.options.crs.code === "EPSG:4326" ? "c" : "w";
        this._url = this._url.replace("{layer}", this.options.layer).replace("{proj}", this.options.tilematrixSet);
        WMTSLayer.prototype.onAdd.call(this, map);
    }
});
export var tiandituTileLayer = function (options) {
    return new TiandituTileLayer(options);
};

L.supermap.tiandituTileLayer = tiandituTileLayer;