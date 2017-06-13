require("../core/Base");
var L = require("leaflet");
var CloudTileLayer = L.TileLayer.extend({
    defaultURL: 'http://t2.supermapcloud.com/FileService/image',
    options: {
        /**
         * APIProperty: mapName
         * {String} 地图名称，默认为 quanguo。
         */
        mapName: "quanguo",
        /**
         * Property: type
         * {String} 地图投影。
         */
        type: "web",
        minZoom: 3,
        maxZoom: 18,
        attribution: 'Map Data ©2013 SuperMap - GS(2011)6014号-data©Navinfo with <a href="http://icltest.supermapol.com/">SuperMap iClient</a>'

    },
    initialize: function (url, options) {
        L.setOptions(this, options);
        var cloudURL = url || this.defaultURL;
        this._url = cloudURL + "?map=" + this.options.mapName + "&type=" + this.options.type + "&x={x}&y={y}&z={z}";
        L.stamp(this);
    }
});
L.supermap.cloudTileLayer = function (url, options) {
    return new CloudTileLayer(url, options);
};

module.exports = CloudTileLayer;
