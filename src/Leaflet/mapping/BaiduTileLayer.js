BaiduTileLayer = L.TileLayer.extend({
    url: "http://online{num}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles={styles}&udt=20150815&scaler=1",
    options: {
        minZoom: 3,
        maxZoom: 19,
        bounds: L.latLngBounds(L.latLng(-85.0511287798, -180), L.latLng(85.0511287798, 180)),
        detectRetina: L.Browser.retina
    },
    initialize: function (url, options) {
        L.setOptions(this, options);
        L.TileLayer.prototype.initialize.call(this, url, options)
    },
    getTileUrl: function (coords) {
        return L.Util.template(this.url, {
            num: Math.abs((coords.x + coords.y) % 8) + 1,
            x: coords.x,
            y: -coords.y - 1,
            z: this._getZoomForUrl(),
            styles: this.options.retina ? 'ph' : 'pl'
        })
    }
})
L.supermap = L.supermap || {};
L.supermap.baiduTileLayer = function (url, options) {
    return new BaiduTileLayer(url, options);
};

module.exports = L.supermap.baiduTileLayer;
