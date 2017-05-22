require("../core/Base");
var L = require("leaflet");
var WMTS = require("./TileLayer.WMTS");
var TiandituTileLayer = WMTS.extend({
    defaultURL: 'http://t{s}.tianditu.com/img_w/wmts?"',
    options: {
        layer: "img",
        style: "default",
        tilematrixSet: "w",
        format: "tiles",
        subdomains: [0, 1, 2, 3, 4, 5, 6, 7]

    },
    initialize: function (url, options) {
        L.setOptions(this, options);
        this._url = url || this.defaultURL;
        L.stamp(this);
    }
});
L.supermap.tiandituTileLayer = function (url, options) {
    return new TiandituTileLayer(url, options);
};
module.exports = TiandituTileLayer;
