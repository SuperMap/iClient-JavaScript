require('../../base');
require('../../../Core/base');

ol.supermap.TiledMap = function (options) {
    if (options.url === undefined) {
        return;
    }
    var tileGrid = options.tileGrid;
    var height = tileGrid.tileSize === undefined ? 256 : tileGrid.tileSize[0];
    var width = tileGrid.tileSize === undefined ? 256 : tileGrid.tileSize[1];
    var layerUrl = options.url + "/image.png?redirect=false&width=" + width + "&height=" + height;
    //为url添加安全认证信息片段
    if (SuperMap.Credential && SuperMap.Credential.CREDENTIAL) {
        layerUrl += "&" + SuperMap.Credential.CREDENTIAL.getUrlParameters();
    }
    //切片是否透明
    var transparent = true;
    if (options.opaque !== undefined) {
        transparent = options.opaque;
    }
    layerUrl += "&transparent=" + transparent;

    //是否使用缓存
    var cacheEnabled = false;
    if (options.cacheEnabled !== undefined) {
        cacheEnabled = options.cacheEnabled;
    }
    layerUrl += "&cacheEnabled=" + cacheEnabled;

    //如果有layersID，则是在使用专题图
    if (options.layersID !== undefined) {
        layerUrl += "&layersID=" + options.layersID;
    }
    var extent = tileGrid.extent_;
    var resolutions = tileGrid.resolutions_;

    var tileUrlFunction = function (tileCoord, pixelRatio, projection) {
        var z = tileCoord[0], x = tileCoord[1], y = tileCoord[2];
        var tileUrl;
        if (projection.code_ === 'EPSG:4326') {
            var left = extent[0] + (x * 256 * resolutions[z]);
            var bottom = extent[3] + (y * 256 * resolutions[z]);
            var right = extent[0] + ((x + 1) * 256 * resolutions[z]);
            var top = extent[3] + ((y + 1) * 256 * resolutions[z]);
            tileUrl = layerUrl + "&viewBounds=" + "{\"leftBottom\" : {\"x\":" + left + ",\"y\":" + bottom + "},\"rightTop\" : {\"x\":" + right + ",\"y\":" + top + "}}";
        } else {
            y += Math.pow(2, z);
            var left = extent[0] + (x * 256 * resolutions[z]);
            var bottom = extent[1] + (y * 256 * resolutions[z]);
            var right = extent[0] + ((x + 1) * 256 * resolutions[z]);
            var top = extent[1] + ((y + 1) * 256 * resolutions[z]);
            tileUrl = layerUrl + "&viewBounds=" + "{\"leftBottom\" : {\"x\":" + left + ",\"y\":" + bottom + "},\"rightTop\" : {\"x\":" + right + ",\"y\":" + top + "}}";
        }
        return tileUrl;
    }

    ol.source.TileImage.call(this, {
        attributions: options.attributions,
        cacheSize: options.cacheSize,
        crossOrigin: options.crossOrigin,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        reprojectionErrorThreshold: options.reprojectionErrorThreshold,
        state: options.state,
        tileClass: options.tileClass,
        tileGrid: options.tileGrid,
        tileLoadFunction: options.tileLoadFunction,
        tilePixelRatio: options.tilePixelRatio,
        tileUrlFunction: tileUrlFunction,
        url: options.url,
        urls: options.urls,
        wrapX: options.wrapX !== undefined ? options.wrapX : false,
        cacheEnabled: options.cacheEnabled,
        layersID: options.layersID

    });
};
ol.inherits(ol.supermap.TiledMap, ol.source.TileImage);

module.exports = ol.supermap.TiledMap;