import '../core/Base';
import L from "leaflet";
import {WMTSLayer} from "./TileLayer.WMTS";
export var TiandituTileLayer = WMTSLayer.extend({
    defaultURL: 'http://t{s}.tianditu.com/img_w/wmts?"',
    options: {
        layer: "img",
        style: "default",
        tilematrixSet: "w",
        format: "tiles",
        subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
        attribution: "Map Data <a href='http://www.tianditu.com'><img style='background-color:transparent;bottom:2px;opacity:1;' src='http://api.tianditu.com/img/map/logo.png' width='53px' height='22px' opacity='0'></a> with <span>© <a href='http://iclient.supermapol.com'>SuperMap iClient</a></span>"


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
