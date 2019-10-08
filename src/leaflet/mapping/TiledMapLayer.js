/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import "../core/Base";
import {
    SecurityManager,
    ServerType,
    Unit,
    Credential,
    CommonUtil,
    ServerGeometry
} from '@supermap/iclient-common';
import * as Util from "../core/Util";
import Attributions from '../core/Attributions'

/**
 * @class L.supermap.tiledMapLayer
 * @classdesc SuperMap iServer 的 REST 地图服务的图层(SuperMap iServer Java 6R 及以上分块动态 REST 图层)。使用 TileImage 资源出图。
 * @category iServer Map
 * @extends {L.TileLayer}
 * @example
 *      L.supermap.tiledMapLayer(url).addTo(map);
 * @param {string} url - 地图服务地址,例如: http://{ip}:{port}/iserver/services/map-world/rest/maps/World。
 * @param {Object} options - 参数。
 * @param {string} [options.layersID] - 获取进行切片的地图图层 ID，即指定进行地图切片的图层，可以是临时图层集，也可以是当前地图中图层的组合
 * @param {boolean} [options.redirect=false] - 是否重定向，如果为 true，则将请求重定向到瓦片的真实地址；如果为 false，则响应体中是瓦片的字节流。
 * @param {boolean} [options.transparent=true] - 是否背景透明。
 * @param {boolean} [options.cacheEnabled=true] - 启用缓存。
 * @param {boolean} [options.clipRegionEnabled=false] - 是否启用地图裁剪。
 * @param {L.Path} [options.clipRegion] - 地图显示裁剪的区域。是一个面对象，当 clipRegionEnabled = true 时有效，即地图只显示该区域覆盖的部分。
 * @param {Object} [options.prjCoordSys] - 请求的地图的坐标参考系统。 如：prjCoordSys={"epsgCode":3857}。
 * @param {boolean} [options.overlapDisplayed=false] - 地图对象在同一范围内时，是否重叠显示。
 * @param {string} [options.overlapDisplayedOptions] - 避免地图对象压盖显示的过滤选项。
 * @param {string} [options.tileversion] - 切片版本名称，cacheEnabled 为 true 时有效。如果没有设置 tileversion 参数，而且当前地图的切片集中存在多个版本，则默认使用最后一个更新版本。
 * @param {L.Proj.CRS} [options.crs] - 坐标系统类。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {string} [options.tileProxy] -  代理地址。
 * @param {string} [options.format='png'] - 瓦片表述类型，支持 "png" 、"bmp" 、"jpg" 和 "gif" 四种表述类型。
 * @param {(number|L.Point)} [options.tileSize=256] - 瓦片大小。
 * @param {(SuperMap.NDVIParameter|SuperMap.HillshadeParameter)} [options.rasterfunction] - 栅格分析参数。
 * @param {string} [options.attribution='Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' title='SuperMap iServer' target='_blank'>SuperMap iServer</a></span>'] - 版权信息。
 * @param {Array.<number>} [options.subdomains=[0, 1, 2, 3, 4, 5, 6, 7]] - 子域名数组。
 * @fires L.supermap.tiledMapLayer#tilesetsinfoloaded
 * @fires L.supermap.tiledMapLayer#tileversionschanged
 */
export var TiledMapLayer = L.TileLayer.extend({

    options: {
        //如果有layersID，则是在使用专题图
        layersID: null,
        //如果为 true，则将请求重定向到瓦片的真实地址；如果为 false，则响应体中是瓦片的字节流
        redirect: false,
        transparent: true,
        cacheEnabled: true,
        clipRegionEnabled: false,
        //地图显示裁剪的区域
        clipRegion: null,
        //请求的地图的坐标参考系统。 如：prjCoordSys={"epsgCode":3857}
        prjCoordSys: null,
        //地图对象在同一范围内时，是否重叠显示
        overlapDisplayed: false,
        //避免地图对象压盖显示的过滤选项
        overlapDisplayedOptions: null,
        //切片版本名称，cacheEnabled 为 true 时有效。
        tileversion: null,
        crs: null,
        serverType: ServerType.ISERVER,
        format: 'png',
        //启用托管地址。
        tileProxy:null,
        attribution: Attributions.Common.attribution,
        subdomains: null
    },

    initialize: function (url, options) {
        this._url = url;
        L.TileLayer.prototype.initialize.apply(this, arguments);
        L.setOptions(this, options);
        L.stamp(this);

        //当前切片在切片集中的index
        this.tileSetsIndex = -1;
        this.tempIndex = -1;
    },

    /**
     * @private
     * @function L.supermap.tiledMapLayer.prototype.onAdd
     * @description 添加地图。
     * @param {L.Map} map - 待添加的影像地图参数。
     */
    onAdd: function (map) {
        this._crs = this.options.crs || map.options.crs;
        L.TileLayer.prototype.onAdd.call(this, map);
    },

    /**
     * @function L.supermap.tiledMapLayer.prototype.getTileUrl
     * @description 根据行列号获取瓦片地址。
     * @param {Object} coords - 行列号。
     * @returns {string} 瓦片地址。
     */
    getTileUrl: function (coords) {
        var scale = this.getScaleFromCoords(coords);
        var layerUrl = this._getLayerUrl();
        var tileUrl = layerUrl + "&scale=" + scale + "&x=" + coords.x + "&y=" + coords.y;
        //支持代理
        if (this.options.tileProxy) {
            tileUrl = this.options.tileProxy + encodeURIComponent(tileUrl);
        }
        if (!this.options.cacheEnabled) {
            tileUrl += "&_t=" + new Date().getTime();
        }
        if (this.options.subdomains) {
            tileUrl = L.Util.template(tileUrl, {s: this._getSubdomain(coords)});
        }
        return tileUrl;
    },

    /**
     * @function L.supermap.tiledMapLayer.prototype.getScale
     * @description 根据缩放级别获取比例尺。
     * @param {number} zoom - 缩放级别。
     * @returns {number} 比例尺。
     */
    getScale: function (zoom) {
        var me = this;
        //返回当前比例尺
        var z = zoom || me._map.getZoom();
        return me.scales[z];
    },

    /**
     * @function L.supermap.tiledMapLayer.prototype.getScaleFromCoords
     * @description 通过行列号获取比例尺。
     * @param {Object} coords - 行列号。
     * @returns {number} 比例尺。
     */
    getScaleFromCoords: function (coords) {
        var me = this,
            scale;
        if (me.scales && me.scales[coords.z]) {
            return me.scales[coords.z];
        }
        me.scales = me.scales || {};
        scale = me.getDefaultScale(coords);
        me.scales[coords.z] = scale;
        return scale;
    },

    /**
     * @private
     * @function L.supermap.tiledMapLayer.prototype.getDefaultScale
     * @description 获取默认比例尺信息。
     * @param {Object} coords - 坐标对象参数。
     */
    getDefaultScale: function (coords) {
        var me = this,
            crs = me._crs;
        if (crs.scales) {
            return crs.scales[coords.z];
        } else {
            var tileBounds = me._tileCoordsToBounds(coords);
            var ne = crs.project(tileBounds.getNorthEast());
            var sw = crs.project(tileBounds.getSouthWest());
            var tileSize = me.options.tileSize;
            var resolution = Math.max(
                Math.abs(ne.x - sw.x) / tileSize,
                Math.abs(ne.y - sw.y) / tileSize
            );
            var mapUnit = Unit.METER;
            if (crs.code) {
                var array = crs.code.split(':');
                if (array && array.length > 1) {
                    var code = parseInt(array[1]);
                    mapUnit = code && code >= 4000 && code <= 5000 ? Unit.DEGREE : Unit.METER;
                }
            }
            return Util.resolutionToScale(resolution, 96, mapUnit);
        }
    },


    /**
     * @function L.supermap.tiledMapLayer.prototype.setTileSetsInfo
     * @description 设置瓦片集信息。
     * @param {Object} tileSets - 瓦片对象集。
     */
    setTileSetsInfo: function (tileSets) {
        this.tileSets = tileSets;
        if (L.Util.isArray(this.tileSets)) {
            this.tileSets = this.tileSets[0];
        }
        if (!this.tileSets) {
            return;
        }
        /**
         * @event L.supermap.tiledMapLayer#tilesetsinfoloaded
         * @description 瓦片集信息设置完成后触发。
         * @property {Array.<Object>} tileVersions  - 瓦片集信息。
         */
        this.fire('tilesetsinfoloaded', {
            tileVersions: this.tileSets.tileVersions
        });
        this.changeTilesVersion();
    },

    /**
     * @function L.supermap.tiledMapLayer.prototype.lastTilesVersion
     * @description 请求上一个版本切片，并重新绘制。
     */
    lastTilesVersion: function () {
        this.tempIndex = this.tileSetsIndex - 1;
        this.changeTilesVersion();
    },

    /**
     * @function L.supermap.tiledMapLayer.prototype.nextTilesVersion
     * @description 请求下一个版本切片，并重新绘制。
     */
    nextTilesVersion: function () {
        this.tempIndex = this.tileSetsIndex + 1;
        this.changeTilesVersion();
    },

    /**
     * @function L.supermap.tiledMapLayer.prototype.changeTilesVersion
     * @description 切换到某一版本的切片，并重绘。通过 this.tempIndex 保存需要切换的版本索引
     */
    changeTilesVersion: function () {
        var me = this;
        //切片版本集信息是否存在
        if (me.tileSets == null) {
            //版本信息为空，重新查询，查询成功继续跳转到相应的版本
            //me.getTileSetsInfo();
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
                /**
                 * @event L.supermap.tiledMapLayer#tileversionschanged
                 * @description 切片的版本切换和重绘成功之后触发。
                 * @property {Object} tileVersion  - 该版本的切片。
                 */
                me.fire('tileversionschanged', {
                    tileVersion: tileVersions[me.tempIndex]
                });
            }
        }
    },

    /**
     * @function L.supermap.tiledMapLayer.prototype.updateCurrentTileSetsIndex
     * @description 手动设置当前切片集索引，目前主要提供给控件使用。
     * @param {number} index - 索引值。
     */
    updateCurrentTileSetsIndex: function (index) {
        this.tempIndex = index;
    },

    /**
     * @function L.supermap.tiledMapLayer.prototype.mergeTileVersionParam
     * @description 更改URL请求参数中的切片版本号，并重绘。
     * @param {string} version - 切片版本号。
     * @returns {boolean} 是否成功。
     */
    mergeTileVersionParam: function (version) {
        if (version) {
            this.requestParams["tileversion"] = version;
            this._paramsChanged = true;
            this.redraw();
            this._paramsChanged = false;
            return true;
        }
        return false;
    },

    _getLayerUrl: function () {
        if (this._paramsChanged) {
            this._layerUrl = this._createLayerUrl();
        }
        return this._layerUrl || this._createLayerUrl();
    },

    _createLayerUrl: function () {
        var me = this;
        var layerUrl = me._url + "/tileImage." + this.options.format + "?";
        layerUrl += encodeURI(me._getRequestParamString());
        layerUrl = this._appendCredential(layerUrl);
        this._layerUrl = layerUrl;
        return layerUrl;
    },

    _getRequestParamString: function () {
        this.requestParams = this.requestParams || this._getAllRequestParams();
        var params = [];
        for (var key in this.requestParams) {
            params.push(key + "=" + this.requestParams[key]);
        }
        return params.join('&');
    },

    _getAllRequestParams: function () {
        var me = this,
            options = me.options || {},
            params = {};

        var tileSize = this.options.tileSize;
        if (!(tileSize instanceof L.Point)) {
            tileSize = L.point(tileSize, tileSize);
        }
        params["width"] = tileSize.x;
        params["height"] = tileSize.y;

        params["redirect"] = options.redirect === true;
        params["transparent"] = options.transparent === true;
        params["cacheEnabled"] = !(options.cacheEnabled === false);

        if (options.prjCoordSys) {
            params["prjCoordSys"] = JSON.stringify(options.prjCoordSys);
        }

        if (options.layersID) {
            params["layersID"] = options.layersID.toString();
        }

        if (options.clipRegionEnabled && options.clipRegion instanceof L.Path) {
            options.clipRegion = Util.toSuperMapGeometry(options.clipRegion.toGeoJSON());
            options.clipRegion = CommonUtil.toJSON(ServerGeometry.fromGeometry(options.clipRegion));
            params["clipRegionEnabled"] = options.clipRegionEnabled;
            params["clipRegion"] = JSON.stringify(options.clipRegion);
        }

        //切片的起始参考点，默认为地图范围的左上角。
        var crs = me._crs;
        if (crs.options && crs.options.origin) {
            params["origin"] = JSON.stringify({
                x: crs.options.origin[0],
                y: crs.options.origin[1]
            });
        } else if (crs.projection && crs.projection.bounds) {
            var bounds = crs.projection.bounds;
            var tileOrigin = L.point(bounds.min.x, bounds.max.y);
            params["origin"] = JSON.stringify({
                x: tileOrigin.x,
                y: tileOrigin.y
            });
        }

        if (options.overlapDisplayed === false) {
            params["overlapDisplayed"] = false;
            if (options.overlapDisplayedOptions) {
                params["overlapDisplayedOptions"] = me.overlapDisplayedOptions.toString();
            }
        } else {
            params["overlapDisplayed"] = true;
        }

        if (params.cacheEnabled === true && options.tileversion) {
            params["tileversion"] = options.tileversion.toString();
        }
        if (options.rasterfunction) {
            params["rasterfunction"] = JSON.stringify(options.rasterfunction);
        }

        return params;
    },

    //追加token或key
    _appendCredential: function (url) {
        var newUrl = url,
            credential, value;
        switch (this.options.serverType) {
            case ServerType.IPORTAL:
                value = SecurityManager.getToken(this._url);
                credential = value ? new Credential(value, "token") : null;
                if (!credential) {
                    value = SecurityManager.getKey(this._url);
                    credential = value ? new Credential(value, "key") : null;
                }
                break;
            case ServerType.ONLINE:
                value = SecurityManager.getKey(this._url);
                credential = value ? new Credential(value, "key") : null;
                break;
            default:
                //iserver or others
                value = SecurityManager.getToken(this._url);
                credential = value ? new Credential(value, "token") : null;
                break;
        }
        if (credential) {
            newUrl += "&" + credential.getUrlParameters();
        }
        return newUrl;
    }
});

export var tiledMapLayer = function (url, options) {
    return new TiledMapLayer(url, options);
};

L.supermap.tiledMapLayer = tiledMapLayer;