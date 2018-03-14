import ol from 'openlayers';
import {
    Unit,
    ServerType,
    SecurityManager,
    Credential,
    CommonUtil,
    ServerGeometry
} from '@supermap/iclient-common';
import {Util} from '../core/Util';

/**
 * @class ol.source.TileSuperMapRest
 * @category iServer Map
 * @classdesc SuperMap iServer TileImage图层源。
 * @param options - {Object} 可选参数。如：<br>
 *        url - {string} 服务地址。<br>
 *        tileGrid - [{ol.tilegrid.TileGrid}}]{@linkdoc-openlayers/ol.tilegrid.TileGrid} 瓦片网格对象。<br>
 *        serverType - {SuperMap.ServerType} 服务类型。<br>
 *        redirect - {boolean} 是否重定向，默认为false。<br>
 *        transparent - {boolean} 图片是否透明，默认为true。<br>
 *        cacheEnabled - {boolean} 是否使用服务端的缓存，默认为 true，即使用服务端的缓存。<br>
 *        prjCoordSys - {Object} 请求的地图的坐标参考系统。当此参数设置的坐标系统不同于地图的原有坐标系统时， 系统会进行动态投影，并返回动态投影后的地图图片。例如：{"epsgCode":3857}。<br>
 *        layersID - {string} 获取进行切片的地图图层 ID，即指定进行地图切片的图层，可以是临时图层集，也可以是当前地图中图层的组合。如果此参数缺省则对全部图层进行切片。layersID 可以是临时图层创建时templayers的ID。<br>
 *        clipRegionEnabled - {boolean} 地图显示裁剪的区域。是一个面对象，当 clipRegionEnabled = true 时有效，即地图只显示该区域覆盖的部分。<br>
 *        clipRegion - [{ol.geom.Geometry}]{@linkdoc-openlayers/ol.geom.Geometry} 地图显示裁剪的区域。是一个面对象，当 clipRegionEnabled = true 时有效，即地图只显示该区域覆盖的部分。<br>
 *        overlapDisplayed - {boolean} 地图对象在同一范围内时，是否重叠显示，默认为 false。如果为 true，则同一范围内的对象会直接压盖；如果为 false 则通过 overlapDisplayedOptions 控制对象不压盖显示。<br>
 *        overlapDisplayedOptions - {@link SuperMap.OverlapDisplayedOptions} 避免地图对象压盖显示的过滤选项，当 overlapDisplayed 为 false 时有效，用来增强对地图对象压盖时的处理。<br>
 *        tileversion - {string} 切片版本名称，_cache 为 true 时有效。
 *        tileProxy - {string} 代理地址
 * @extends ol.source.TileImage{@linkdoc-openlayers/ol.source.TileImage}
 */
export class TileSuperMapRest extends ol.source.TileImage {

    constructor(options) {
        options = options || {};
        if (options.url === undefined) {
            return;
        }

        options.attributions = options.attributions ||
            new ol.Attribution({
                html: "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <span>© <a href='http://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>"
            });

        var layerUrl = options.url + "/tileImage.png?";
        options.serverType = options.serverType || ServerType.ISERVER;
        super({
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
        if (options.tileProxy) {
            this.tileProxy = options.tileProxy;
        }
        this.options = options;
        this._url = options.url;
        //当前切片在切片集中的index
        this.tileSetsIndex = -1;
        this.tempIndex = -1;
        var me = this;

        function appendCredential(url, serverType) {
            var newUrl = url, credential, value;
            switch (serverType) {
                case ServerType.IPORTAL:
                    value = SecurityManager.getToken(me._url);
                    credential = value ? new Credential(value, "token") : null;
                    if (!credential) {
                        value = SecurityManager.getKey(me._url);
                        credential = value ? new Credential(value, "key") : null;
                    }
                    break;
                case ServerType.ONLINE:
                    value = SecurityManager.getKey(me._url);
                    credential = value ? new Credential(value, "key") : null;
                    break;
                default:
                    //iserver or others
                    value = SecurityManager.getToken(me._url);
                    credential = value ? new Credential(value, "token") : null;
                    break;
            }
            if (credential) {
                newUrl += "&" + credential.getUrlParameters();
            }
            return newUrl;
        }

        /**
         * @function  ol.source.TileSuperMapRest.prototype.getAllRequestParams
         * @description 获取全部请求参数
         */
        function getAllRequestParams() {
            var me = this, params = {};

            params["redirect"] = options.redirect !== undefined ? options.redirect : false;
            //切片是否透明
            params["transparent"] = options.transparent !== undefined ? options.transparent : true;
            params["cacheEnabled"] = !(options.cacheEnabled === false);
            //存储一个cacheEnabled参数
            me.cacheEnabled = params["cacheEnabled"];
            params["_cache"] = params["cacheEnabled"];

            //设置切片原点
            if (this.origin) {
                params["origin"] = JSON.stringify({x: this.origin[0], y: this.origin[1]});
            }

            if (options.prjCoordSys) {
                params["prjCoordSys"] = JSON.stringify(options.prjCoordSys);
            }

            if (options.layersID) {
                params["layersID"] = options.layersID.toString();
            }


            if (options.clipRegion instanceof ol.geom.Geometry) {
                options.clipRegionEnabled = true;
                options.clipRegion = Util.toSuperMapGeometry(new ol.format.GeoJSON().writeGeometryObject(options.clipRegion));
                options.clipRegion = CommonUtil.toJSON(ServerGeometry.fromGeometry(options.clipRegion));
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

        /**
         * @function  ol.source.TileSuperMapRest.prototype.getFullRequestUrl
         * @description 获取完整的请求地址
         */
        function getFullRequestUrl() {
            if (this._paramsChanged) {
                this._layerUrl = createLayerUrl.call(this);
                this._paramsChanged = false;
            }
            return this._layerUrl || createLayerUrl.call(this);
        }

        /**
         * @function  ol.source.TileSuperMapRest.prototype.createLayerUrl
         * @description 获取新建图层地址
         */
        function createLayerUrl() {
            this._layerUrl = layerUrl + encodeURI(getRequestParamString.call(this));
            //为url添加安全认证信息片段
            this._layerUrl = appendCredential(this._layerUrl, options.serverType);
            return this._layerUrl;
        }

        /**
         * @function  ol.source.TileSuperMapRest.prototype.getRequestParamString
         * @description 获取请求参数的字符串
         */
        function getRequestParamString() {
            this.requestParams = this.requestParams || getAllRequestParams.call(this);
            var params = [];
            for (var key in this.requestParams) {
                params.push(key + "=" + this.requestParams[key]);
            }
            return params.join('&');
        }

        function tileUrlFunction(tileCoord, pixelRatio, projection) {
            if (!me.tileGrid) {
                if (me.extent) {
                    me.tileGrid = TileSuperMapRest.createTileGrid(options.extent);
                    if (me.resolutions) {
                        me.tileGrid.resolutions = me.resolutions;
                    }
                } else {
                    if (projection.getCode() === "EPSG:3857") {
                        me.tileGrid = TileSuperMapRest.createTileGrid([-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892]);
                        me.extent = [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892];
                    }
                    if (projection.getCode() === "EPSG:4326") {
                        me.tileGrid = TileSuperMapRest.createTileGrid([-180, -90, 180, 90]);
                        me.extent = [-180, -90, 180, 90];
                    }
                }
            }
            me.origin = me.tileGrid.getOrigin(0);
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var resolution = me.tileGrid.getResolution(z);
            var dpi = 96;
            var unit = projection.getUnits();
            if (unit === 'degrees') {
                unit = Unit.DEGREE;
            }
            if (unit === 'm') {
                unit = Unit.METER;
            }
            var scale = Util.resolutionToScale(resolution, dpi, unit);
            var tileSize = ol.size.toSize(me.tileGrid.getTileSize(z, me.tmpSize));
            var layerUrl = getFullRequestUrl.call(me);
            var url = layerUrl + encodeURI("&x=" + x + "&y=" + y + "&width=" + tileSize[0] + "&height=" + tileSize[1] + "&scale=" + scale);
            //支持代理
            if (me.tileProxy) {
                url = me.tileProxy + encodeURIComponent(url);
            }
            if (!me.cacheEnabled){
                url += "&_t="+new Date().getTime();
            }
            return url;
        }

    }

    /**
     * @function  ol.source.TileSuperMapRest.prototype.setTileSetsInfo
     * @description 设置瓦片集信息
     * @param tileSets - {Object} 瓦片集合
     */
    setTileSetsInfo(tileSets) {
        this.tileSets = tileSets;
        if (Util.isArray(this.tileSets)) {
            this.tileSets = tileSets[0];
        }
        if (!this.tileSets) {
            return;
        }
        this.dispatchEvent({type: 'tilesetsinfoloaded', value: {tileVersions: this.tileSets.tileVersions}});
        this.changeTilesVersion();
    }

    /**
     * @function  ol.source.TileSuperMapRest.prototype.lastTilesVersion
     * @description 请求上一个版本切片，并重新绘制
     */
    lastTilesVersion() {
        this.tempIndex = this.tileSetsIndex - 1;
        this.changeTilesVersion();
    }

    /**
     * @function  ol.source.TileSuperMapRest.prototype.nextTilesVersion
     * @description 请求下一个版本切片，并重新绘制。
     */
    nextTilesVersion() {
        this.tempIndex = this.tileSetsIndex + 1;
        this.changeTilesVersion();
    }

    /**
     * @function  ol.source.TileSuperMapRest.prototype.changeTilesVersion
     * @description 切换到某一版本的切片，并重绘。通过this.tempIndex保存需要切换的版本索引。
     */
    changeTilesVersion() {
        var me = this;
        //切片版本集信息是否存在
        if (me.tileSets == null) {
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
                me.dispatchEvent({type: 'tileversionschanged', value: {tileVersion: tileVersions[me.tempIndex]}});
            }
        }
    }

    /**
     * @function  ol.source.TileSuperMapRest.prototype.updateCurrentTileSetsIndex
     * @description 更新当前切片集索引，目前主要提供给控件使用。
     * @param index - {number} 索引号
     */
    updateCurrentTileSetsIndex(index) {
        this.tempIndex = index;
    }

    /**
     * @function  ol.source.TileSuperMapRest.prototype.mergeTileVersionParam
     * @description 更改URL请求参数中的切片版本号,并重绘。
     * @param version - {Object} 版本信息
     * @return {boolean} 是否成功
     */
    mergeTileVersionParam(version) {
        if (version) {
            this.requestParams["tileversion"] = version;
            this._paramsChanged = true;
            this.refresh();
            return true;
        }
        return false;
    }

    /**
     * @function  ol.source.TileSuperMapRest.optionsFromMapJSON
     * @description 从 MapJSON 中获取参数对象
     * @param url - {string} 地址
     * @param mapJSONObj -{Object} 地图JSON对象
     */
    static optionsFromMapJSON(url, mapJSONObj) {
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
            var unit = Unit.METER;
            if (mapJSONObj.coordUnit === Unit.DEGREE) {
                unit = Unit.DEGREE;
            }
            if (mapJSONObj.visibleScalesEnabled && mapJSONObj.visibleScales && mapJSONObj.visibleScales.length > 0) {
                for (let i = 0; i < mapJSONObj.visibleScales.length; i++) {
                    resolutions.push(Util.scaleToResolution(mapJSONObj.visibleScales[i], dpi, unit));
                }
            } else {
                for (let i = 0; i < level; i++) {
                    resolutions.push(maxReolution / Math.pow(2, i));
                }
            }

            function sortNumber(a, b) {
                return b - a;
            }

            return resolutions.sort(sortNumber);
        }

        options.tileGrid = new ol.tilegrid.TileGrid({
            extent: extent,
            resolutions: resolutions
        });
        return options;
    }

    /**
     * @function  ol.source.TileSuperMapRest.createTileGrid
     * @description 创建切片网格
     * @param extent - {number} 长度
     * @param maxZoom - {number} 最大的放大级别
     * @param minZoom - {number} 最小的放大级别
     * @param tileSize - {number} 瓦片的尺寸
     * @param origin - {number} 原点
     * */
    static createTileGrid(extent, maxZoom, minZoom, tileSize, origin) {
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
    }
}

ol.source.TileSuperMapRest = TileSuperMapRest;