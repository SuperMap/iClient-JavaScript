require('../../base')

ol.supermap.Tile = function (options) {
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
    var origin = tileGrid.origin_;
    var origins = tileGrid.origins_;
    var resolutions = tileGrid.resolutions_;

    var tileUrlFunction = function (tileCoord, pixelRatio, projection) {
        var z = tileCoord[0], x = tileCoord[1], y = tileCoord[2], left, bottom, right, top;
        var tileOrigin = getTileOrigin(z);
        left = tileOrigin[0] + (x * width * resolutions[z]);
        bottom = tileOrigin[1] + (y * height * resolutions[z]);
        right = tileOrigin[0] + ((x + 1) * width * resolutions[z]);
        top = tileOrigin[1] + ((y + 1) * height * resolutions[z]);
        return layerUrl + "&viewBounds=" + "{\"leftBottom\" : {\"x\":" + left + ",\"y\":" + bottom + "},\"rightTop\" : {\"x\":" + right + ",\"y\":" + top + "}}";
    }

    function getTileOrigin(z) {
        if (extent) {
            return [extent[0], extent[3]];
        }
        if (origin) {
            return origin;
        }
        if (origins && z) {
            return origins[z];
        }
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
ol.inherits(ol.supermap.Tile, ol.source.TileImage);

ol.supermap.Tile.optionsFromMapJSON = function (url, mapJSONObj) {
    var options = {};
    options.url = url;
    var extent = [mapJSONObj.bounds.left, mapJSONObj.bounds.bottom, mapJSONObj.bounds.right, mapJSONObj.bounds.top];
    var resolutions = getResolutions();

    function getResolutions() {
        var level = 17;
        var dpi = 96;
        var width = (extent[2] - extent[0]);
        var height = (extent[3] - extent[1]);
        var tileSize = width >= height ? width : height;
        var maxReolution;
        if (tileSize === width) {
            maxReolution = tileSize / mapJSONObj.viewer.width;
        } else {
            maxReolution = tileSize / mapJSONObj.viewer.height;
        }
        var resolutions = [];
        var unit = Unit.METER;
        if (mapJSONObj.coordUnit === Unit.DEGREE) {
            unit = Unit.DEGREE;
        }
        if (mapJSONObj.visibleScales.length > 0) {
            for (var i = 0; i < mapJSONObj.visibleScales.length; i++) {
                resolutions.push(ol.supermap.Util.scaleToResolution(mapJSONObj.visibleScales[i], dpi, unit));
            }
        } else {
            for (var i = 0; i < level; i++) {
                resolutions.push(maxReolution / Math.pow(2, i));
            }
        }
        return resolutions;
    }

    options.tileGrid = new ol.tilegrid.TileGrid({
        extent: extent,
        resolutions: resolutions
    });
    return options;
}

module.exports = ol.supermap.Tile;