require('../core/Base');
require('../../common/security/SecurityManager');
require('../services/MapService');
var ol = require('openlayers/dist/ol-debug');
var SuperMap = require('../../common/SuperMap');
ol.source.TileSuperMapRest = function (options) {
    if (options.url === undefined) {
        return;
    }
    options = options || {};
    options.attributions = options.attributions ||
        new ol.Attribution({
            html: 'Map Data <a href="http://support.supermap.com.cn/product/iServer.aspx">SuperMap iServer</a> with <a href="http://iclient.supermapol.com/">SuperMap iClient</a>'
        });

    var layerUrl = options.url + "/tileImage.png?";
    options.serverType = options.serverType || SuperMap.ServerType.ISERVER;
    //为url添加安全认证信息片段
    layerUrl = appendCredential(layerUrl, options.serverType);
    this.options = options;
    //当前切片在切片集中的index
    this.tileSetsIndex = -1;
    this.tempIndex = -1;
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

    function getAllRequestParams() {
        var me = this, params = {};

        params["redirect"] = options.redirect === true;
        //切片是否透明
        params["transparent"] = options.opaque === true;
        params["cacheEnabled"] = !(options.cacheEnabled === false);
        params["_cache"] = params["cacheEnabled"];

        //设置切片原点
        if (options.origin && options.origin instanceof Array) {
            params["origin"] = JSON.stringify({x: options.origin[0], y: options.origin[1]});
        }

        if (options.prjCoordSys) {
            params["prjCoordSys"] = JSON.stringify(options.prjCoordSys);
        }

        if (options.layersID) {
            params["layersID"] = options.layersID.toString();
        }


        if (options.clipRegion instanceof ol.geom.Geometry) {
            options.clipRegionEnabled = true;
            options.clipRegion = ol.supermap.Util.toSuperMapGeometry(new ol.format.GeoJSON().writeGeometryObject(options.clipRegion));
            options.clipRegion = SuperMap.Util.toJSON(SuperMap.REST.ServerGeometry.fromGeometry(options.clipRegion));
            params["clipRegionEnabled"] = options.clipRegionEnabled;
            params["clipRegion"] = JSON.stringify(options.clipRegion);
        }

        if (!options.overlapDisplayed) {
            params["overlapDisplayed"] = false;
            if (options.overlapDisplayedOptions) {
                params["overlapDisplayedOptions"] = me.overlapDisplayedOptions.toString();
            }
        } else {
            params["overlapDisplayed"] = true;
        }

        if (options.cacheEnabled && options.tileversion) {
            params["tileversion"] = options.tileversion.toString();
        }

        return params;
    }


    function getFullRequestUrl() {
        if (this._paramsChanged) {
            this._layerUrl = createLayerUrl.call(this);
            this._paramsChanged = false;
        }
        return this._layerUrl || createLayerUrl.call(this);
    }

    function createLayerUrl() {
        this._layerUrl = layerUrl + getRequestParamString.call(this);
        return this._layerUrl;
    }

    function getRequestParamString() {
        this.requestParams = this.requestParams || getAllRequestParams.call(this);
        var params = [];
        for (var key in this.requestParams) {
            params.push(key + "=" + this.requestParams[key]);
        }
        return params.join('&');
    }

    function tileUrlFunction(tileCoord, pixelRatio, projection) {
        this.projection = projection;
        if(!this.tileGrid){
            if(this.extent){
                this.tileGrid = ol.source.TileSuperMapRest.createTileGrid(options.extent);
                if(this.resolutions){
                    this.tileGrid.resolutions=this.resolutions;
                }
            }else{
                if(projection.getCode()==="EPSG:3857"){
                    this.tileGrid = ol.source.TileSuperMapRest.createTileGrid([-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892]);
                }
                if(projection.getCode()==="EPSG:4326"){
                    this.tileGrid = ol.source.TileSuperMapRest.createTileGrid([-180,-90,180,90]);
                }
            }
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
        var layerUrl = getFullRequestUrl.call(this);
        return layerUrl + "&x=" + x + "&y=" + y + "&width=" + tileSize[0] + "&height=" + tileSize[1] + "&scale=" + scale;
    }


    // var me =this;
    // if(options.tileGrid){
    //     options.state="ready";
    // }else{
    //     options.state="loading";
    //     SuperMap.FetchRequest.get(options.url ).then(function (response) {
    //         return response.json();
    //     }).then(function(result){
    //         me.tileGrid=ol.source.TileSuperMapRest.optionsFromMapJSON(options.url,result).tileGrid;
    //         me.setState("ready");
    //     });
    // }


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
ol.inherits(ol.source.TileSuperMapRest, ol.source.TileImage);

//获取当前图层切片版本列表,获取成功后存储当前的切片版本信息 并切换多相应的版本
ol.source.TileSuperMapRest.prototype.getTileSetsInfo = function () {
    var me = this;
    new ol.supermap.MapService(me.options.url).getTilesets(getTilesInfoSucceed);

    function getTilesInfoSucceed(info) {
        me.tileSets = info.result;
        if (ol.supermap.Util.isArray(me.tileSets)) {
            me.tileSets = info.result[0];
        }
        me.dispatchEvent({type:'tilesetsinfoloaded',value:{tileVersions: me.tileSets.tileVersions}});
        me.changeTilesVersion();
    }
};

//请求上一个版本切片，并重新绘制。
ol.source.TileSuperMapRest.prototype.lastTilesVersion = function () {
    this.tempIndex = this.tileSetsIndex - 1;
    this.changeTilesVersion();
};

//请求下一个版本切片，并重新绘制。
ol.source.TileSuperMapRest.prototype.nextTilesVersion = function () {
    this.tempIndex = this.tileSetsIndex + 1;
    this.changeTilesVersion();
};

//切换到某一版本的切片，并重绘。
//通过this.tempIndex保存需要切换的版本索引
ol.source.TileSuperMapRest.prototype.changeTilesVersion = function () {
    var me = this;
    //切片版本集信息是否存在
    if (me.tileSets == null) {
        //版本信息为空，重新查询，查询成功继续跳转到相应的版本
        me.getTileSetsInfo();
        return;
    }
    if (me.tempIndex === me.tileSetsIndex || this.tempIndex < 0) {
        return;
    }
    //检测index是否可用
    var tileVersions = me.tileSets.tileVersions;
    if (tileVersions && me.tempIndex < tileVersions.length && me.tempIndex >= 0) {
        var name = tileVersions[me.tempIndex].name;
        var result = me.mergeTileVersionParam(name);
        if (result) {
            me.tileSetsIndex = me.tempIndex;
            me.dispatchEvent({type:'tileversionschanged',value:{tileVersion: tileVersions[me.tempIndex]}});
        }
    }
};

//手动设置当前切片集索引
//目前主要提供给控件使用
ol.source.TileSuperMapRest.prototype.updateCurrentTileSetsIndex = function (index) {
    this.tempIndex = index;
};

//更改URL请求参数中的切片版本号,并重绘
ol.source.TileSuperMapRest.prototype.mergeTileVersionParam = function (version) {
    if (version) {
        this.requestParams["tileversion"] = version;
        this._paramsChanged = true;
        this.refresh();
        return true;
    }
    return false;
};

ol.source.TileSuperMapRest.optionsFromMapJSON = function (url, mapJSONObj) {
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

ol.source.TileSuperMapRest.createTileGrid = function (extent, maxZoom, minZoom, tileSize, origin) {
    var tilegrid = ol.tilegrid.createXYZ({
        extent: extent,
        maxZoom: maxZoom,
        minZoom: minZoom,
        tileSize: tileSize
    });
    return new ol.tilegrid.TileGrid({
            extent: extent,
            minZoom: minZoom,
            origin: origin,
            resolutions: tilegrid.getResolutions(),
            tileSize: tilegrid.getTileSize()
        }
    );
};

module.exports = ol.source.TileSuperMapRest;