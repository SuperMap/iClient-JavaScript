require('../core/Base');
require('../../common/security/SecurityManager');
var ol = require('openlayers');
var SuperMap = require('../../common/SuperMap');
ol.supermap.TileSuperMapRest = function (options) {
    if (options.url === undefined) {
        return;
    }
    options.attributions = options.attributions ||
        new ol.Attribution({
            html: 'Map Data <a href="http://support.supermap.com.cn/product/iServer.aspx">SuperMap iServer</a> with <a href="http://icltest.supermapol.com/">SuperMap iClient</a>'
        })

    var layerUrl = options.url + "/tileImage.png?";
    options.serverType = options.serverType || SuperMap.ServerType.ISERVER;
    //为url添加安全认证信息片段
    layerUrl = appendCredential(layerUrl, options.serverType);

    function appendCredential(url, serverType) {
        var newUrl = url, credential, value;
        switch (serverType) {
            case SuperMap.ServerType.ISERVER:
                value = SuperMap.SecurityManager.getToken(url);
                credential = value ? new SuperMap.Credential(value, "token") : null;
                break;
            case SuperMap.ServerType.IPORTAL:
                value = SuperMap.SecurityManager.getToken(url);
                credential = value ? new SuperMap.Credential(value, "token") : null;
                if (!credential) {
                    value = SuperMap.SecurityManager.getKey(url);
                    credential = value ? new SuperMap.Credential(value, "key") : null;
                }
                break;
            case SuperMap.ServerType.ONLINE:
                value = SuperMap.SecurityManager.getKey(url);
                credential = value ? new SuperMap.Credential(value, "key") : null;
                break;
            default:
                value = SuperMap.SecurityManager.getToken(url);
                credential = value ? new SuperMap.Credential(value, "token") : null;
                break;
        }
        if (credential) {
            newUrl += "&" + credential.getUrlParameters();
        }
        return newUrl;
    }

    //是否重定向
    var redirect = false;
    if (options.redirect) {
        redirect = options.opaque;
    }
    layerUrl += "&redirect=" + redirect;
    //切片是否透明
    var transparent = true;
    if (options.opaque !== undefined) {
        transparent = options.opaque;
    }
    layerUrl += "&transparent=" + transparent;
    //设置切片原点
    if (options.origin && options.origin instanceof Array) {
        layerUrl += "&origin={\"x\":" + origin[0] + "," + "\"y\":" + origin[1] + "}";
    }
    options.clipRegionEnabled = false;
    if (options.clipRegion instanceof ol.geom.Geometry) {
        options.clipRegionEnabled = true;
        options.clipRegion = ol.supermap.Util.toSuperMapGeometry(new ol.format.GeoJSON().writeGeometryObject(options.clipRegion));
        options.clipRegion = SuperMap.Util.toJSON(SuperMap.REST.ServerGeometry.fromGeometry(options.clipRegion));
        layerUrl += "&clipRegionEnabled=" + options.clipRegionEnabled + "&clipRegion=" + JSON.stringify(options.clipRegion);
    }
    if (!!options.overlapDisplayed && options.overlapDisplayedOptions) {
        options.overlapDisplayedOptions = options.overlapDisplayedOptions;
        layerUrl += "&overlapDisplayed=" + options.overlapDisplayed + "&overlapDisplayedOptions=" + options.overlapDisplayedOptions.toString();
    }
    var cacheEnabled = true;
    if (!!options.cacheEnabled) {
        cacheEnabled = options.cacheEnabled;
    }
    layerUrl += "&_cache=" + cacheEnabled;
    if (options.cacheEnabled && options.tileversion) {
        layerUrl += "&tileversion=" + tileversion;
    }
    //如果有layersID，则是在使用专题图
    if (options.layersID !== undefined) {
        layerUrl += "&layersID=" + options.layersID;
    }
    if (options.prjCoordSys) {
        layerUrl += "&prjCoordSys=" + options.prjCoordSys;
    }

    function tileUrlFunction(tileCoord, pixelRatio, projection) {
        this.projection = projection;
        if (!this.tileGrid) {
            this.tileGrid = this.getTileGridForProjection(projection);
        }
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = -tileCoord[2] - 1;
        var resolution = this.tileGrid.getResolution(z);
        var dpi = 96;
        var unit = projection.getUnits();
        if (unit === 'degrees') {
            unit = SuperMap.Unit.DEGREE;
        }
        if (unit === 'm') {
            unit = SuperMap.Unit.METER;
        }
        var scale = ol.supermap.Util.resolutionToScale(resolution, dpi, unit);
        var tileSize = ol.size.toSize(this.tileGrid.getTileSize(z, this.tmpSize));
        return layerUrl + "&x=" + x + "&y=" + y + "&width=" + tileSize[0] + "&height=" + tileSize[1] + "&scale=" + scale;
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
ol.inherits(ol.supermap.TileSuperMapRest, ol.source.TileImage);
ol.supermap.TileSuperMapRest.optionsFromMapJSON = function (url, mapJSONObj) {
    var options = {};
    options.url = url;
    options.crossOrigin = 'anonymous';
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
        var unit = SuperMap.Unit.METER;
        if (mapJSONObj.coordUnit === SuperMap.Unit.DEGREE) {
            unit = SuperMap.Unit.DEGREE;
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
};

module.exports = ol.supermap.TileSuperMapRest;