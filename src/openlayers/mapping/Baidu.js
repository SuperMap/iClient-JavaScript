require('../core/Base');
var ol = require('openlayers');
ol.source.Baidu = function (opt_options) {

    var options = opt_options || {};

    var attributions = options.attributions || new ol.Attribution({
            html: 'Map Data © 2017 Baidu - GS(2016)2089号 - Data © 长地万方 with <a href="http://icltest.supermapol.com/">SuperMap iClient</a>'
        });
    var tileGrid = ol.source.Baidu.defaultTileGrid();
    var crossOrigin = options.crossOrigin !== undefined ?
        options.crossOrigin : 'anonymous';

    var url = options.url !== undefined ?
        options.url : "http://online{1-8}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles={styles}&udt=20170408";
    var hidpi = options.hidpi || (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1
    ol.source.TileImage.call(this, {
        attributions: attributions,
        cacheSize: options.cacheSize,
        crossOrigin: crossOrigin,
        opaque: options.opaque !== undefined ? options.opaque : true,
        maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
        reprojectionErrorThreshold: options.reprojectionErrorThreshold,
        tileLoadFunction: options.tileLoadFunction,
        url: url,
        projection: 'EPSG:3857',
        wrapX: options.wrapX,
        tilePixelRatio: hidpi ? 2 : 1,
        tileUrlFunction: ol.TileUrlFunction.createFromTemplates(ol.TileUrlFunction.expandUrl(url.replace('{styles}', hidpi ? 'ph' : 'pl')), ol.source.Baidu.defaultTileGrid())
    });
    ol.source.Baidu.prototype.getTileCoordForTileUrlFunction = function (tileCoord, opt_projection) {
        var temp = [tileCoord[0], tileCoord[1], -tileCoord[2] - 1];
        return ol.source.TileImage.prototype.getTileCoordForTileUrlFunction.call(this, temp, opt_projection);
    };
    ol.source.Baidu.prototype.getTileGridForProjection = function (projection) {
        return ol.source.Baidu.defaultTileGrid();
    }

};
ol.inherits(ol.source.Baidu, ol.source.TileImage);
ol.source.Baidu.defaultTileGrid = function () {
    var tileGird = new ol.tilegrid.TileGrid({
        extent: [-33554432, -33554432, 33554432, 33554432],
        resolutions: [131072 * 2, 131072, 65536, 32768, 16284, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5],
        origin: [0, 0],
        minZoom: 3,

    });
    return tileGird;
};
module.exports = ol.source.Baidu;