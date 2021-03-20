/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Unit, SecurityManager, CommonUtil, ServerGeometry } from '@supermap/iclient-common';
import { Util } from '../core/Util';
import TileImage from 'ol/source/TileImage';
import Geometry from 'ol/geom/Geometry';
import GeoJSON from 'ol/format/GeoJSON';
import * as olSize from 'ol/size';
import * as olTilegrid from 'ol/tilegrid';
import TileGrid from 'ol/tilegrid/TileGrid';

/**
 * @class ol.source.TileSuperMapRest
 * @category iServer Map
 * @classdesc SuperMap iServer TileImage 图层源。
 * @param {Object} options - 参数。
 * @param {string} options.url - 地图服务地址,例如: http://{ip}:{port}/iserver/services/map-world/rest/maps/World。
 * @param {ol/tilegrid/TileGrid} [options.tileGrid] - 瓦片网格对象。当不指定时，会通过 options.extent 或投影范围生成。
 * @param {boolean} [options.redirect = false] - 是否重定向。
 * @param {boolean} [options.transparent = true] - 瓦片是否透明。
 * @param {boolean} [options.cacheEnabled = true] - 是否使用服务端的缓存。
 * @param {Object} [options.prjCoordSys] - 请求的地图的坐标参考系统。当此参数设置的坐标系统不同于地图的原有坐标系统时， 系统会进行动态投影，并返回动态投影后的地图瓦片。例如：{"epsgCode":3857}。
 * @param {string} [options.layersID] - 获取进行切片的地图图层 ID，即指定进行地图切片的图层，可以是临时图层集，也可以是当前地图中图层的组合。
 * @param {boolean} [options.clipRegionEnabled = false] - 是否只地图只显示该区域覆盖的部分。true 表示地图只显示该区域覆盖的部分。
 * @param {(ol/geom/Geometry|ol/geom/Geometry)} [options.clipRegion] - 地图显示裁剪的区域。是一个面对象，当 clipRegionEnabled = true 时有效，即地图只显示该区域覆盖的部分。
 * @param {boolean} [options.overlapDisplayed = false] - 地图对象在同一范围内时，是否重叠显示。如果为 true，则同一范围内的对象会直接压盖；如果为 false 则通过 overlapDisplayedOptions 控制对象不压盖显示。
 * @param {SuperMap.OverlapDisplayedOptions} [options.overlapDisplayedOptions] - 避免地图对象压盖显示的过滤选项，当 overlapDisplayed 为 false 时有效，用来增强对地图对象压盖时的处理。
 * @param {string} [options.tileversion] - 切片版本名称，_cache 为 true 时有效。
 * @param {string} [options.tileProxy] - 代理地址。
 * @param {string} [options.format = 'png'] - 瓦片表述类型，支持 "png" 、"webp"、"bmp" 、"jpg"、 "gif" 等图片类型。
 * @param {(SuperMap.NDVIParameter|SuperMap.HillshadeParameter)} [options.rasterfunction] - 栅格分析参数。
 * @extends {ol/source/TileImage}
 */
export class TileSuperMapRest extends TileImage {
    constructor(options) {
        options = options || {};
        options.attributions =
            options.attributions ||
            "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <span>© <a href='https://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>";

        options.format = options.format ? options.format : 'png';

        super({
            attributions: options.attributions,
            cacheSize: options.cacheSize,
            crossOrigin: options.crossOrigin,
            logo: Util.getOlVersion() === '4' ? options.logo : null,
            opaque: options.opaque,
            projection: options.projection,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            state: options.state,
            tileClass: options.tileClass,
            tileGrid: options.tileGrid,
            tileLoadFunction: options.tileLoadFunction,
            tilePixelRatio: options.tilePixelRatio,
            tileUrlFunction: tileUrlFunction,
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
        this.dpi = this.options.dpi || 96;
        var me = this;
        var layerUrl = CommonUtil.urlPathAppend(options.url, 'tileImage.' + options.format);

        /**
         * @function  ol.source.TileSuperMapRest.prototype.getAllRequestParams
         * @description 获取全部请求参数。
         */
        function getAllRequestParams() {
            var me = this,
                params = {};

            params['redirect'] = options.redirect !== undefined ? options.redirect : false;
            //切片是否透明
            params['transparent'] = options.transparent !== undefined ? options.transparent : true;
            params['cacheEnabled'] = !(options.cacheEnabled === false);
            //存储一个cacheEnabled参数
            me.cacheEnabled = params['cacheEnabled'];
            params['_cache'] = params['cacheEnabled'];

            //设置切片原点
            if (this.origin) {
                params['origin'] = JSON.stringify({
                    x: this.origin[0],
                    y: this.origin[1]
                });
            }

            if (options.prjCoordSys) {
                params['prjCoordSys'] = JSON.stringify(options.prjCoordSys);
            }

            if (options.layersID) {
                params['layersID'] = options.layersID.toString();
            }

            if (options.clipRegion instanceof Geometry) {
                options.clipRegionEnabled = true;
                options.clipRegion = Util.toSuperMapGeometry(new GeoJSON().writeGeometryObject(options.clipRegion));
                options.clipRegion = CommonUtil.toJSON(ServerGeometry.fromGeometry(options.clipRegion));
                params['clipRegionEnabled'] = options.clipRegionEnabled;
                params['clipRegion'] = JSON.stringify(options.clipRegion);
            }

            if (!options.overlapDisplayed) {
                params['overlapDisplayed'] = false;
                if (options.overlapDisplayedOptions) {
                    params['overlapDisplayedOptions'] = me.overlapDisplayedOptions.toString();
                }
            } else {
                params['overlapDisplayed'] = true;
            }

            if (params.cacheEnabled && options.tileversion) {
                params['tileversion'] = options.tileversion.toString();
            }
            if (options.rasterfunction) {
                params['rasterfunction'] = JSON.stringify(options.rasterfunction);
            }

            return params;
        }

        /**
         * @function  ol.source.TileSuperMapRest.prototype.getFullRequestUrl
         * @description 获取完整的请求地址。
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
         * @description 获取新建图层地址。
         */
        function createLayerUrl() {
            this.requestParams = this.requestParams || getAllRequestParams.call(this);
            this._layerUrl = CommonUtil.urlAppend(layerUrl, CommonUtil.getParameterString(this.requestParams));
            //为url添加安全认证信息片段
            this._layerUrl = SecurityManager.appendCredential(this._layerUrl);
            return this._layerUrl;
        }

        function tileUrlFunction(tileCoord, pixelRatio, projection) {
            if (!me.tileGrid) {
                if (options.extent) {
                    me.tileGrid = TileSuperMapRest.createTileGrid(options.extent);
                    if (me.resolutions) {
                        me.tileGrid.resolutions = me.resolutions;
                    }
                } else {
                    if (projection.getCode() === 'EPSG:3857') {
                        me.tileGrid = TileSuperMapRest.createTileGrid([
                            -20037508.3427892,
                            -20037508.3427892,
                            20037508.3427892,
                            20037508.3427892
                        ]);
                        me.extent = [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892];
                    }
                    if (projection.getCode() === 'EPSG:4326') {
                        me.tileGrid = TileSuperMapRest.createTileGrid([-180, -90, 180, 90]);
                        me.extent = [-180, -90, 180, 90];
                    }
                }
            }
            me.origin = me.tileGrid.getOrigin(0);
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = ['4', '5'].indexOf(Util.getOlVersion()) > -1 ? -tileCoord[2] - 1 : tileCoord[2];
            var resolution = me.tileGrid.getResolution(z);
            var dpi = me.dpi || 96;
            var unit = projection.getUnits() || Unit.DEGREE;
            // OGC WKT 解析出单位是 degree
            if (unit === 'degrees' || unit === 'degree') {
                unit = Unit.DEGREE;
            }
            //通过wkt方式自定义坐标系的时候，是meter
            if (unit === 'm' || unit === 'meter') {
                unit = Unit.METER;
            }
            var scale = Util.resolutionToScale(resolution, dpi, unit);
            var tileSize = olSize.toSize(me.tileGrid.getTileSize(z, me.tmpSize));
            var layerUrl = getFullRequestUrl.call(me);
            var url =
                layerUrl +
                encodeURI(
                    '&x=' + x + '&y=' + y + '&width=' + tileSize[0] + '&height=' + tileSize[1] + '&scale=' + scale
                );
            //支持代理
            if (me.tileProxy) {
                url = me.tileProxy + encodeURIComponent(url);
            }
            if (!me.cacheEnabled) {
                url += '&_t=' + new Date().getTime();
            }
            return url;
        }
    }

    /**
     * @function  ol.source.TileSuperMapRest.prototype.setTileSetsInfo
     * @description 设置瓦片集信息。
     * @param {Object} tileSets - 瓦片集合。
     */
    setTileSetsInfo(tileSets) {
        this.tileSets = tileSets;
        if (Util.isArray(this.tileSets)) {
            this.tileSets = tileSets[0];
        }
        if (!this.tileSets) {
            return;
        }
        this.dispatchEvent({
            type: 'tilesetsinfoloaded',
            value: {
                tileVersions: this.tileSets.tileVersions
            }
        });
        this.changeTilesVersion();
    }

    /**
     * @function  ol.source.TileSuperMapRest.prototype.lastTilesVersion
     * @description 请求上一个版本切片，并重新绘制。
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
     * @description 切换到某一版本的切片，并重绘。通过 this.tempIndex 保存需要切换的版本索引。
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
                me.dispatchEvent({
                    type: 'tileversionschanged',
                    value: {
                        tileVersion: tileVersions[me.tempIndex]
                    }
                });
            }
        }
    }

    /**
     * @function  ol.source.TileSuperMapRest.prototype.updateCurrentTileSetsIndex
     * @description 更新当前切片集索引，目前主要提供给控件使用。
     * @param {number} index - 索引号。
     */
    updateCurrentTileSetsIndex(index) {
        this.tempIndex = index;
    }

    /**
     * @function  ol.source.TileSuperMapRest.prototype.mergeTileVersionParam
     * @description 更改 URL 请求参数中的切片版本号，并重绘。
     * @param {Object} version - 版本信息。
     * @returns {boolean} 是否成功。
     */
    mergeTileVersionParam(version) {
        if (version) {
            this.requestParams['tileversion'] = version;
            this._paramsChanged = true;
            this.refresh();
            return true;
        }
        return false;
    }

    /**
     * @function  ol.source.TileSuperMapRest.optionsFromMapJSON
     * @description 从 MapJSON 中获取参数对象。
     * @param {string} url - 地址。
     * @param {Object} mapJSONObj - 地图 JSON 对象。
     */
    static optionsFromMapJSON(url, mapJSONObj) {
        var options = {};
        options.url = url;
        options.crossOrigin = 'anonymous';
        var extent = [mapJSONObj.bounds.left, mapJSONObj.bounds.bottom, mapJSONObj.bounds.right, mapJSONObj.bounds.top];
        var resolutions = getResolutions();

        function getResolutions() {
            var level = 22;
            var dpi = 96;
            var width = extent[2] - extent[0];
            var height = extent[3] - extent[1];
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

        options.tileGrid = new TileGrid({
            extent: extent,
            resolutions: resolutions
        });
        return options;
    }

    /**
     * @function  ol.source.TileSuperMapRest.createTileGrid
     * @description 创建切片网格。
     * @param {number} extent - 长度。
     * @param {number} maxZoom - 最大的放大级别。
     * @param {number} minZoom - 最小的放大级别。
     * @param {number} tileSize - 瓦片的尺寸。
     * @param {number} origin - 原点。
     * */
    static createTileGrid(extent, maxZoom, minZoom, tileSize, origin) {
        var tilegrid = olTilegrid.createXYZ({
            extent: extent,
            maxZoom: maxZoom,
            minZoom: minZoom,
            tileSize: tileSize
        });
        return new TileGrid({
            extent: extent,
            minZoom: minZoom,
            origin: origin,
            resolutions: tilegrid.getResolutions(),
            tileSize: tilegrid.getTileSize()
        });
    }
}
