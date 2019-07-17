/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import ol from 'openlayers';
import proj4 from "proj4";
import {
    FetchRequest,
    SecurityManager,
    ColorsPickerUtil,
    ArrayStatistic,
    Events,
    CommonUtil
} from '@supermap/iclient-common';
import {
    Util
} from '../core/Util';
import {
    StyleUtils
} from '../core/StyleUtils';

import provincialCenterData from './webmap/config/ProvinceCenter';
import municipalCenterData from './webmap/config/MunicipalCenter';
import jsonsql from 'jsonsql';

window.proj4 = proj4;
window.Proj4js = proj4;
ol.supermap = ol.supermap || {};
//数据转换工具
const transformTools = new ol.format.GeoJSON();
// 迁徙图最大支持要素数量
const MAX_MIGRATION_ANIMATION_COUNT = 1000;
/**
 * @class ol.supermap.WebMap
 * @category  iPortal/Online
 * @classdesc 对接 iPortal/Online 地图类。
 * @param {number} id - 地图的id
 * @param {Object} options - 参数。
 * @param {string} [options.target='map'] - 地图容器id。
 * @param {string} [options.server="http://www.supermapol.com"] - 地图的地址。
 * @param {function} [options.successCallback] - 成功加载地图后调用的函数。
 * @param {function} [options.errorCallback] - 加载地图失败调用的函数。
 * @param {string} [options.credentialKey] - 凭证密钥。
 * @param {string} [options.credentialValue] - 凭证值。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.excludePortalProxyUrl] - server传递过来的url是否带有代理
 * @param {string} [options.tiandituKey] - 天地图的key
 * @param {function} [options.mapSetting.mapClickCallback] - 地图被点击的回调函数
 * @param {function} [options.mapSetting.overlays] - 地图的overlayer
 * @param {function} [options.mapSetting.controls] - 地图的控件
 * @param {function} [options.mapSetting.interactions] - 地图控制的参数
 * @extends {ol.Observable}
 */
export class WebMap extends ol.Observable {

    constructor(id, options) {
        super();
        this.mapId = id;
        options = options || {};
        this.server = options.server || 'http://www.supermapol.com';
        this.successCallback = options.successCallback;
        this.errorCallback = options.errorCallback;
        this.credentialKey = options.credentialKey;
        this.credentialValue = options.credentialValue;
        this.withCredentials = options.withCredentials || false;
        this.target = options.target || "map";
        this.excludePortalProxyUrl = options.excludePortalProxyUrl || false;
        this.tiandituKey = options.tiandituKey;
        //计数叠加图层，处理过的数量（成功和失败都会计数）
        this.layerAdded = 0;
        this.events = new Events(this, null, ["updateDataflowFeature"], true);
        this.createMap(options.mapSetting);
        this.createWebmap();
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createMap
     * @description 创建地图对象以及注册地图事件
     * @param {object} mapSetting - 关于地图的设置以及需要注册的事件
     */
    createMap(mapSetting) {
        let overlays, controls,interactions;
        if (mapSetting) {
            interactions = mapSetting.interactions;
            overlays = mapSetting.overlays;
            controls = mapSetting.controls;
        }
        this.map = new ol.Map({
            interactions: interactions,
            overlays: overlays,
            controls: controls,
            target: this.target
        });
        mapSetting && this.registerMapEvent({
            mapClickCallback: mapSetting.mapClickCallback
        });
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.registerMapEvent
     * @description 注册地图事件
     * @param {object} mapSetting - 关于地图的设置以及需要注册的事件
     */
    registerMapEvent(mapSetting) {
        let map = this.map;
        map.on("click", function (evt) {
            mapSetting.mapClickCallback && mapSetting.mapClickCallback(evt);
        });
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createWebmap
     * @description 创建webmap
     */
    createWebmap() {
        let urlArr = this.server.split('');
        if (urlArr[urlArr.length - 1] !== '/') {
            this.server += '/';
        }

        let mapUrl = this.server + 'web/maps/' + this.mapId + '/map';
        if (this.credentialValue) {
            mapUrl += ('.json?' + this.credentialKey + '=' + this.credentialValue);

        }
        let filter = 'getUrlResource.json?url=';
        if (this.excludePortalProxyUrl && this.server.indexOf(filter) > -1) {
            //大屏需求,或者有加上代理的
            let urlArray = this.server.split(filter);
            if (urlArray.length > 1) {
                mapUrl = urlArray[0] + filter + this.server + 'web/maps/' + this.mapId + '/map.json';
            }
        }
        this.getMapInfo(mapUrl);
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getMapInfo
     * @description 获取地图的json信息
     * @param {string} url - 请求地图的url
     */
    getMapInfo(url) {
        let that = this,
            mapUrl = url;
        if (url.indexOf('.json') === -1) {
            //传递过来的url,没有包括.json,在这里加上。
            mapUrl = `${url}.json`
        }
        FetchRequest.get(that.getRequestUrl(mapUrl), null, {
            withCredentials: this.withCredentials
        }).then(function (response) {
            return response.json();
        }).then(function (mapInfo) {
            if (mapInfo.succeed === false) {
                that.errorCallback && that.errorCallback(mapInfo.error, 'getMapFaild', that.map);
                return;
            }
            if(mapInfo.projection === 'EPSG:910111' || mapInfo.projection === 'EPSG:910112'){
                // 早期数据存在的自定义坐标系  "EPSG:910111": "GCJ02MERCATOR"， "EPSG:910112": "BDMERCATOR"
                mapInfo.projection = "EPSG:3857";
            }else if(mapInfo.projection === 'EPSG:910101' || mapInfo.projection === 'EPSG:910102'){
                 // 早期数据存在的自定义坐标系 "EPSG:910101": "GCJ02", "EPSG:910102": "BD",
                mapInfo.projection = "EPSG:4326";
            }
            that.baseProjection = mapInfo.projection;
            that.mapParams = {
                title: mapInfo.title,
                description: mapInfo.description
            }; //存储地图的名称以及描述等信息，返回给用户

            // 多坐标系支持
            if(proj4){
                ol.proj.setProj4(proj4);
            } 
            // 目前iServer服务中可能出现的EPSG 0，-1，-1000
            if(mapInfo.projection.indexOf("EPSG") === 0 && mapInfo.projection.split(":")[1] <= 0){
                //对于这两种地图，只能view，不能叠加其他图层
                that.createSpecLayer(mapInfo);  
                return;     
            } else if(that.addProjctionFromWKT(mapInfo.projection)){
                mapInfo.projection = that.baseProjection = that.getEpsgInfoFromWKT(mapInfo.projection);
            }else{
                // 不支持的坐标系
                that.errorCallback && that.errorCallback({type: "Not support CS", errorMsg: `Not support CS: ${mapInfo.projection}`}, 'getMapFaild', that.map);
                return;
            }

            if (mapInfo.baseLayer && mapInfo.baseLayer.layerType === 'MAPBOXSTYLE') {
                // 添加矢量瓦片服务作为底图
                that.addMVTBaseMap(mapInfo).then(() => {
                    if (!mapInfo.layers || mapInfo.layers.length === 0) {
                        that.sendMapToUser(0);
                    } else {
                        that.addLayers(mapInfo);
                    }
                    that.createView(mapInfo);
                });
            } else {
                that.addBaseMap(mapInfo);
                if (!mapInfo.layers || mapInfo.layers.length === 0) {
                    that.sendMapToUser(0);
                } else {
                    that.addLayers(mapInfo);
                }
                that.createView(mapInfo);
            }
        }).catch(function (error) {
            that.errorCallback && that.errorCallback(error, 'getMapFaild', that.map);
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createSpecLayer
     * @description 创建坐标系为0和-1000的图层
     * @param {object} mapInfo - 地图信息
     */
    createSpecLayer(mapInfo) {
        let me = this, 
            baseLayerInfo = mapInfo.baseLayer,
            url = baseLayerInfo.url,
            baseLayerType = baseLayerInfo.layerType;  

        let proj = new ol.proj.Projection({
            extent: [mapInfo.extent.leftBottom.x, mapInfo.extent.leftBottom.y, mapInfo.extent.rightTop.x, mapInfo.extent.rightTop.y],
            units: 'm',
            code: 'EPSG:0'
        }); 
        ol.proj.addProjection(proj);
        let options = {
            center: mapInfo.center,
            level: 0 
        }
        //添加view
        me.baseProjection = proj;
        me.createView(options);
        
        let source;
        if(baseLayerType === "TILE"){
            FetchRequest.get(me.getRequestUrl(`${url}.json`), null, {
                withCredentials: this.withCredentials
            }).then(function (response) {
                return response.json();
            }).then(function (result) {
                baseLayerInfo.originResult = result;
                source = new ol.source.TileSuperMapRest({
                    url: baseLayerInfo.url,
                    tileGrid: ol.source.TileSuperMapRest.optionsFromMapJSON(baseLayerInfo.url, baseLayerInfo.originResult).tileGrid
                });
                me.addSpecToMap(source);
            }).catch(function(error) {
                me.errorCallback && me.errorCallback(error, 'getMapFaild', me.map);
            });  
        } else if(baseLayerType === "WMS"){
            source = me.createWMSSource(baseLayerInfo);
            me.addSpecToMap(source);
        } else if(baseLayerType === "WMTS"){
            FetchRequest.get(me.getRequestUrl(url), null, {
                withCredentials: this.withCredentials
            }).then(function (response) {
                return response.text();
            }).then(function(capabilitiesText) {
                baseLayerInfo.extent = [mapInfo.extent.leftBottom.x, mapInfo.extent.leftBottom.y, mapInfo.extent.rightTop.x, mapInfo.extent.rightTop.y];
                baseLayerInfo.scales = me.getWMTSScales(baseLayerInfo.tileMatrixSet, capabilitiesText);
                baseLayerInfo.dpi = 90.6;
                source = me.createWMTSSource(baseLayerInfo);
                me.addSpecToMap(source);
            }).catch(function(error) {
                me.errorCallback && me.errorCallback(error, 'getMapFaild', me.map);
            })
        }else{
            me.errorCallback && me.errorCallback({type: "Not support CS", errorMsg: `Not support CS: ${baseLayerType}`}, 'getMapFaild', me.map);
        } 
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.addSpecToMap
     * @description 将坐标系为0和-1000的图层添加到地图上
     * @param {object} mapInfo - 地图信息
     */
    addSpecToMap(source) {
        let layer = new ol.layer.Tile({
            source: source,
            zIndex: 0
        });
        layer && this.map.addLayer(layer);
        this.sendMapToUser(0);   
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getWMTSScales
     * @description 获取wmts的比例尺
     * @param {object} identifier - 图层存储的标识信息
     * @param {object} capabilitiesText - wmts信息
     */
    getWMTSScales(identifier, capabilitiesText) {
        const format = new ol.format.WMTSCapabilities();
        let capabilities = format.read(capabilitiesText);

        let content = capabilities.Contents,
            tileMatrixSet = content.TileMatrixSet;
        let scales = [];
        for (let i = 0; i < tileMatrixSet.length; i++) {
            if (tileMatrixSet[i].Identifier === identifier) {
                for (let h = 0; h < tileMatrixSet[i].TileMatrix.length; h++) {
                    scales.push(tileMatrixSet[i].TileMatrix[h].ScaleDenominator)
                }
                break;
            }
        }
        return scales;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.addBaseMap
     * @description 添加底图
     * @param {string} mapInfo - 请求地图的url
     */
    addBaseMap(mapInfo) {
        let layer = this.createBaseLayer(mapInfo, null, false);
        // 部分图层是异步的 早期异步没有设计好，所以将就将就吧
        if(layer){
            this.map.addLayer(layer);
        }
        
        if (mapInfo.baseLayer && mapInfo.baseLayer.labelLayerVisible) {
            let layerInfo = mapInfo.baseLayer;
            //存在天地图路网
            let labelLayer = new ol.layer.Tile({
                source: this.createTiandituSource(layerInfo, layerInfo.layerType, mapInfo.projection, true),
                zIndex: layerInfo.zIndex || 0,
                visible: layerInfo.visible
            });
            this.map.addLayer(labelLayer);
        }
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.addMVTBaseMap
     * @description 添加矢量瓦片服务底图
     * @param {object} mapInfo - 地图信息
     */
    addMVTBaseMap(mapInfo) {
        // 获取地图详细信息
        return this.getMBStyle(mapInfo).then(baseLayerInfo => {
            // 创建图层
            return this.createMVTLayer(baseLayerInfo).then(layer => {
                let layerID = Util.newGuid(8);
                if (baseLayerInfo.name) {
                    layer.setProperties({
                        name: baseLayerInfo.name,
                        layerID: layerID,
                        layerType: 'VECTOR_TILE'
                    });
                }

                //否则没有ID，对不上号
                baseLayerInfo.layer = layer;
                baseLayerInfo.layerID = layerID;

                this.map.addLayer(layer);
            });
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createView
     * @description 创建地图视图
     * @param {object} options - 关于地图的信息
     */
    createView(options) {
        let oldcenter = options.center,
            zoom = options.level !== undefined ? options.level : 1,
            maxZoom = options.maxZoom || 22,
            extent,
            projection = this.baseProjection;
        let center = [];
        for (let key in oldcenter) {
            center.push(oldcenter[key]);
        }
        if (center.length === 0) {
            //兼容wms
            center = [0, 0];
        }
        //与DV一致用底图的默认范围，不用存储的范围。否则会导致地图拖不动
        this.baseLayerExtent = extent = options.baseLayer && options.baseLayer.extent;
        if(this.mapParams) {
            this.mapParams.extent = extent;
            this.mapParams.projection = projection;
        }

        // 计算当前最大分辨率
        let maxResolution;
        if(options.baseLayer && ['TILE', 'MAPBOXSTYLE'].includes(options.baseLayer.layerType) && extent && extent.length === 4){
            let width = extent[2] - extent[0];
            let height = extent[3] - extent[1];
            let maxResolution1 = width / 512;
            let maxResolution2 = height / 512;
            maxResolution = Math.max(maxResolution1, maxResolution2);
        }
        
        if(options.baseLayer.visibleScales && options.baseLayer.visibleScales.length > 0){
            maxZoom = options.baseLayer.visibleScales.length;
        }

        this.map.setView(new ol.View({zoom, center, projection, extent, maxResolution, maxZoom}));
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createBaseLayer
     * @description 创建矢量图层，包括底图及其叠加的矢量图层
     * @param {object} mapInfo - 关于地图的信息
     * @param {number} index - 当前图层在地图中的index
     * @param {boolean} isCallBack - 是否调用回调函数
     * @param {scope} {object} this对象
     */
    createBaseLayer(mapInfo, index, isCallBack, scope) { 
        let source, layerInfo, isBaseLayer, that= this;
        
        if(scope){
            // 解决异步回调
            that = scope;
        }

        if(mapInfo.baseLayer) {
            isBaseLayer = true;
            //底图，使用默认的配置，不用存储的
            if(mapInfo.baseLayer.layerType !== 'TILE' && 
            mapInfo.baseLayer.layerType !== 'WMS' &&
            mapInfo.baseLayer.layerType !== 'WMTS'){
                this.getInternetMapInfo(mapInfo.baseLayer);
            }else if(mapInfo.baseLayer.layerType === 'WMTS' && !isCallBack){
                // 通过请求完善信息
               this.getWmtsInfo(mapInfo.baseLayer, this.createBaseLayer, mapInfo);
               return;
            }else if(mapInfo.baseLayer.layerType === 'TILE' && !isCallBack){
                this.getTileInfo(mapInfo.baseLayer, this.createBaseLayer, mapInfo);
                return;
            }else{
                mapInfo.baseLayer.projection = mapInfo.projection;
                mapInfo.baseLayer.extent = [mapInfo.extent.leftBottom.x, mapInfo.extent.leftBottom.y, mapInfo.extent.rightTop.x, mapInfo.extent.rightTop.y];
            }
            layerInfo = mapInfo.baseLayer;
           // layerInfo = mapInfo.baseLayer = this.getInternetMapInfo(mapInfo.baseLayer);
           that.createView(mapInfo);
        } else {
            layerInfo = mapInfo;
        }
        
        let layerType = layerInfo.layerType; //底图和rest地图兼容
        if (layerType.indexOf('TIANDITU_VEC') > -1 || layerType.indexOf('TIANDITU_IMG') > -1 ||
            layerType.indexOf('TIANDITU_TER') > -1) {
            layerType = layerType.substr(0, 12);
        }
        switch (layerType) {
            case "TIANDITU_VEC":
            case "TIANDITU_IMG":
            case "TIANDITU_TER":
                source = this.createTiandituSource(layerInfo, layerType, mapInfo.projection);
                break;
            case "BAIDU":
                source = this.createBaiduSource();
                break;
            case 'BING':
                source = this.createBingSource(layerInfo, mapInfo.projection);
                break;
            case "WMS":
                source = this.createWMSSource(layerInfo);
                break;
            case "WMTS":
                source = that.createWMTSSource(layerInfo);
                break;
            case 'TILE':
            case 'SUPERMAP_REST':
                source = that.createDynamicTiledSource(layerInfo, isBaseLayer);
                break;
            case 'CLOUD':
            case 'CLOUD_BLACK':
            case 'OSM':
            case 'JAPAN_ORT':
            case 'JAPAN_RELIEF':
            case 'JAPAN_PALE':
            case 'JAPAN_STD':
            case 'GOOGLE_CN':
            case 'GOOGLE':
                source = this.createXYZSource(layerInfo);
                break;
            default:
                break;
        }
        var layer = new ol.layer.Tile({
            source: source,
            zIndex: layerInfo.zIndex || 1,
            visible: layerInfo.visible
        });
        var layerID = Util.newGuid(8);
        if (layerInfo.name) {
            layer.setProperties({
                name: layerInfo.name,
                layerID: layerID
            });
        }
        if (!mapInfo.baseLayer) {
            //不是底图
            layer.setVisible(layerInfo.visible);
            layerInfo.opacity && layer.setOpacity(layerInfo.opacity);
            //layerInfo没有存储index属性
            index && layer.setZIndex(index);
        } else {
            //底图增加图层类型，DV分享需要用它来识别版权信息
            layer.setProperties({
                layerType: layerType
            });
        }

        //否则没有ID，对不上号
        layerInfo.layer = layer;
        layerInfo.layerID = layerID;

        if(isCallBack){
            layer.setZIndex(0); // wmts
            that.map.addLayer(layer);
        }

        return layer;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getInternetMapInfo
     * @description 获取底图对应的图层信息，不是用请求回来的底图信息
     * @param {object} baseLayerInfo - 底图信息
     * @returns {Object} 底图的具体信息
     */
    getInternetMapInfo(baseLayerInfo) {
        const baiduBounds = [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892];
        const bounds_4326 = [-180, -90, 180, 90];
        const osmBounds = [-20037508.34, -20037508.34, 20037508.34, 20037508.34];
        const japanReliefBounds = [12555667.53929,1281852.98656,17525908.86651,7484870.70596];
        const japanOrtBounds = [-19741117.14519,-10003921.36848,19981677.71404,19660983.56089];
        
        baseLayerInfo.units= "m";
        switch (baseLayerInfo.layerType){
            case( 'BAIDU'):
                baseLayerInfo.iServerUrl= 'https://map.baidu.com/';
                baseLayerInfo.epsgCode= 'EPSG:3857';
                baseLayerInfo.minZoom= 1;
                baseLayerInfo.maxZoom= 19;
                baseLayerInfo.level= 1;
                baseLayerInfo.extent= baiduBounds;
                // thumbnail: this.getImagePath('bmap.png') 暂时不用到缩略图
                break;
            case ('CLOUD'):
                baseLayerInfo.url= 'http://t2.supermapcloud.com/FileService/image?map=quanguo&type=web&x={x}&y={y}&z={z}';
                baseLayerInfo.epsgCode= 'EPSG:3857';
                baseLayerInfo.minZoom= 1;
                baseLayerInfo.maxZoom= 18;
                baseLayerInfo.level= 1;
                baseLayerInfo.extent= baiduBounds;
                break;
            case ('CLOUD_BLACK'):
                baseLayerInfo.url= 'http://t3.supermapcloud.com/MapService/getGdp?x={x}&y={y}&z={z}';
                baseLayerInfo.epsgCode= 'EPSG:3857';
                baseLayerInfo.minZoom= 1;
                baseLayerInfo.maxZoom= 18;
                baseLayerInfo.level= 1;
                baseLayerInfo.extent= baiduBounds;
                break;
            case ('tencent'):
                baseLayerInfo.epsgCode= 'EPSG:3857';
                baseLayerInfo.minZoom= 1;
                baseLayerInfo.maxZoom= 18;
                baseLayerInfo.level= 1;
                baseLayerInfo.extent= baiduBounds;
                break;
            case ('TIANDITU_VEC_3857'):
            case ('TIANDITU_IMG_3857'):
            case ('TIANDITU_TER_3857'):
                baseLayerInfo.iserverUrl= 'http://map.tianditu.gov.cn/';
                baseLayerInfo.epsgCode= 'EPSG:3857';
                baseLayerInfo.minZoom= 0;
                baseLayerInfo.maxZoom= 19;
                baseLayerInfo.level= 1;
                baseLayerInfo.extent= baiduBounds;
                if(baseLayerInfo.layerType === "TIANDITU_TER_3857"){
                    baseLayerInfo.maxZoom = 14;
                }
                break;
            case ('TIANDITU_VEC_4326'):
            case ('TIANDITU_IMG_4326'):
            case ('TIANDITU_TER_4326'):
                baseLayerInfo.iserverUrl= 'http://map.tianditu.gov.cn/';
                baseLayerInfo.epsgCode= 'EPSG:4326';
                baseLayerInfo.minZoom= 0;
                baseLayerInfo.maxZoom= 19;
                baseLayerInfo.level= 1;
                baseLayerInfo.extent= bounds_4326;
                if(baseLayerInfo.layerType === "TIANDITU_TER_4326"){
                    baseLayerInfo.maxZoom = 14;
                }
                break;
            case ('OSM'):
                baseLayerInfo.url= 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                baseLayerInfo.epsgCode= 'EPSG:3857';
                baseLayerInfo.minZoom= 1;
                baseLayerInfo.maxZoom= 19;
                baseLayerInfo.level= 1;
                baseLayerInfo.extent= osmBounds;
                baseLayerInfo.iserverUrl= 'https://www.openstreetmap.org';
                break;
            case ('GOOGLE'):
                baseLayerInfo.url= 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0';
                baseLayerInfo.epsgCode= 'EPSG:3857';
                baseLayerInfo.minZoom= 1;
                baseLayerInfo.maxZoom= 22;
                baseLayerInfo.level= 1;
                baseLayerInfo.extent= osmBounds;
                baseLayerInfo.iserverUrl= 'http://www.google.cn/maps';
                break;
            case ('JAPAN_STD'):
                baseLayerInfo.url= 'http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png';
                baseLayerInfo.epsgCode= 'EPSG:3857';
                baseLayerInfo.minZoom= 1;
                baseLayerInfo.maxZoom= 19;
                baseLayerInfo.level= 0;
                baseLayerInfo.extent= osmBounds;
                break;
            case ('JAPAN_PALE'):
                baseLayerInfo.url= 'http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png';
                baseLayerInfo.epsgCode= 'EPSG:3857';
                baseLayerInfo.minZoom= 2;
                baseLayerInfo.maxZoom= 19;
                baseLayerInfo.level= 2;
                baseLayerInfo.extent= osmBounds;
                break;
            case ('JAPAN_RELIEF'):
                baseLayerInfo.url= 'http://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png';
                baseLayerInfo.epsgCode= 'EPSG:3857';
                baseLayerInfo.minZoom= 5;
                baseLayerInfo.maxZoom= 14;
                baseLayerInfo.level= 5;
                baseLayerInfo.extent= japanReliefBounds;
                break ;
            case ('JAPAN_ORT'):
                baseLayerInfo.url= 'http://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg';
                baseLayerInfo.epsgCode= 'EPSG:3857';
                baseLayerInfo.minZoom= 2;
                baseLayerInfo.maxZoom= 12;
                baseLayerInfo.level= 2;
                baseLayerInfo.extent= japanOrtBounds;
                break;
        }
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createDynamicTiledSource
     * @description 获取supermap iServer类型的地图的source。
     * @param {object} layerInfo
     * @param {boolean} isBaseLayer 是否是底图
     */
    createDynamicTiledSource(layerInfo, isBaseLayer) {
        let serverType = "IPORTAL",
            credential = layerInfo.credential,
            keyfix = 'Token',
            keyParams = layerInfo.url;
  
        if (layerInfo.url.indexOf("www.supermapol.com") > -1 || layerInfo.url.indexOf("itest.supermapol.com") > -1) {
            keyfix = 'Key';
            keyParams = [keyParams];
            serverType = "ONLINE";
        }
        if (credential) {
            SecurityManager[`register${keyfix}`](keyParams, credential);
        }
        // extent: isBaseLayer ? layerInfo.extent : ol.proj.transformExtent(layerInfo.extent, layerInfo.projection, this.baseProjection),
        let options = {
            transparent: true,
            url: layerInfo.url,
            wrapX: false,
            serverType: serverType,
            // extent: this.baseLayerExtent,
            prjCoordSys:{ epsgCode: isBaseLayer ? layerInfo.projection.split(':')[1] : this.baseProjection.split(':')[1] },
            tileProxy: this.tileProxy
        };
        if(layerInfo.visibleScales && layerInfo.visibleScales.length >0){
            let result = this.getReslutionsFromScales(layerInfo.visibleScales, 96, layerInfo.coordUnit);
            let tileGrid = new ol.tilegrid.TileGrid({
                extent: layerInfo.extent,
                resolutions: result.res
            });
            layerInfo.visibleResolutions = result.res;
            options.tileGrid = tileGrid;
        }else{
            options.extent = this.baseLayerExtent;
        }
        let source = new ol.source.TileSuperMapRest(options);
        SecurityManager[`register${keyfix}`](layerInfo.url);
        return source;
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createTiandituSource
     * @description 创建天地图的source。
     * @param layerInfo 图层信息
     * @param layerType 图层类型
     * @param projection 地理坐标系
     * @param isLabel  是否有路网图层
     * @returns {ol.source.Tianditu} 天地图的source
     */
    createTiandituSource(layerInfo, layerType, projection, isLabel) {
        let options = {
            layerType: layerType.split('_')[1].toLowerCase(),
            isLabel: isLabel || false,
            projection: projection,
            url: `https://t{0-7}.tianditu.com/{layer}_{proj}/wmts?tk=${this.tiandituKey}`
        };
        return new ol.source.Tianditu(options);
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createBaiduSource
     * @description 创建百度地图的source。
     * @returns {ol.source.BaiduMap} baidu地图的source
     */
    createBaiduSource() {
        return new ol.source.BaiduMap()
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createBingSource
     * @description 创建bing地图的source。
     * @returns {ol.source.XYZ} bing地图的source
     */
    createBingSource(layerInfo, projection) {
        let url = 'http://dynamic.t0.tiles.ditu.live.com/comp/ch/{quadKey}?it=G,TW,L,LA&mkt=zh-cn&og=109&cstl=w4c&ur=CN&n=z';
        return new ol.source.XYZ({
            wrapX: false,
            projection: projection,
            tileUrlFunction: function (coordinates) {
                let /*quadDigits = '', */[z, x, y] = [...coordinates];
                y = y > 0 ? y - 1 : -y - 1;
                let index = '';
                for (let i = z; i > 0; i--) {
                    let b = 0;
                    let mask = 1 << (i - 1);
                    if ((x & mask) !== 0) {
                        b++;
                    }
                    if ((y & mask) !== 0) {
                        b += 2;
                    }
                    index += b.toString()
                }
                return url.replace('{quadKey}', index);
            }
        })
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createXYZSource
     * @description 创建图层的XYZsource。
     * @param {Object} layerInfo - 图层信息。。
     * @returns {ol.source.XYZ} xyz的source
     */
    createXYZSource(layerInfo) {
        return new ol.source.XYZ({
            url: layerInfo.url,
            wrapX: false,
            crossOrigin: window.location.host
        })
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createWMSSource
     * @description 创建wms地图source。
     * @param {Object} layerInfo - 图层信息。
     * @returns {ol.source.TileWMS}
     */
    createWMSSource(layerInfo) {
        let that = this;
        return new ol.source.TileWMS({
            url: layerInfo.url,
            wrapX: false,
            params: {
                LAYERS: layerInfo.layers ? layerInfo.layers[0] : "0",
                FORMAT: 'image/png'
            },
            projection: layerInfo.projection || that.baseProjection,
            tileLoadFunction: function (imageTile, src) {
                imageTile.getImage().src = src
            }
        })
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getLayerExtent
     * @description 获取(Supermap Rest/WMS)的图层参数。
     * @param {Object} layerInfo - 图层信息。
     * @param {function} callback - 获得wmts图层参数执行的回调函数
     */
    getLayerExtent(layerInfo, callback){
        let that = this, 
        url = layerInfo.url.trim();
        if(layerInfo.layerType  === "TILE"){
           // 直接使用动态投影方式请求数据
           let projection = {
            epsgCode: that.baseProjection.split(":")[1]
        }
        // bug IE11 不会自动编码
        url += '.json?prjCoordSys=' + encodeURI(JSON.stringify(projection));
        
        }else{
            url += (url.indexOf('?') > -1 ? '&SERVICE=WMS&REQUEST=GetCapabilities' : '?SERVICE=WMS&REQUEST=GetCapabilities');
        }
        let options = {
            withCredentials: this.withCredentials,
            withoutFormatSuffix: true
        };
        FetchRequest.get(that.getRequestUrl(url), null, options).then(function (response) {
            return layerInfo.layerType  === "TILE" ? response.json() : response.text();
        }).then(function (result) {
            if (layerInfo.layerType === "TILE") {
                layerInfo.extent = [result.bounds.left, result.bounds.bottom, result.bounds.right, result.bounds.top];
                layerInfo.projection = `EPSG:${result.prjCoordSys.epsgCode}`;
                callback(layerInfo);
            } else {
                layerInfo.projection = that.baseProjection;
                callback(layerInfo);
            }
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getTileInfo
     * @description 获取rest map的图层参数。
     * @param {Object} layerInfo - 图层信息。
     * @param {function} callback - 获得wmts图层参数执行的回调函数
     */
    getTileInfo(layerInfo, callback, mapInfo){
        let that = this;
        let options = {
            withCredentials: this.withCredentials,
            withoutFormatSuffix: true
        };
        FetchRequest.get(that.getRequestUrl(`${layerInfo.url}.json`), null, options).then(function (response) {
            return response.json();
        }).then(function (result) {
            layerInfo.projection = mapInfo.projection;
            layerInfo.extent = [mapInfo.extent.leftBottom.x, mapInfo.extent.leftBottom.y, mapInfo.extent.rightTop.x, mapInfo.extent.rightTop.y];
             // 比例尺 单位
             if(result.visibleScales){
                layerInfo.visibleScales = result.visibleScales;
                layerInfo.coordUnit = result.coordUnit;
            }
            // 请求结果完成 继续添加图层
            if(mapInfo){
                callback(mapInfo, null, true, that);
            }else{
                callback(layerInfo);
            }
            
        }).catch(function (error) {
            that.errorCallback && that.errorCallback(error, 'getWmtsFaild', that.map)
        });
    }
    
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getWmtsInfo
     * @description 获取wmts的图层参数。
     * @param {Object} layerInfo - 图层信息。
     * @param {function} callback - 获得wmts图层参数执行的回调函数
     */
    getWmtsInfo(layerInfo, callback, mapInfo) {
        let that = this;
        let options = {
            withCredentials: false,
            withoutFormatSuffix: true
        };
        FetchRequest.get(that.getRequestUrl(layerInfo.url), null, options).then(function (response) {
            return response.text();
        }).then(function (capabilitiesText) {
            const format = new ol.format.WMTSCapabilities();
            let capabilities = format.read(capabilitiesText);
            if (that.isValidResponse(capabilities)) {
                let content = capabilities.Contents,
                    tileMatrixSet = content.TileMatrixSet,
                    layers = content.Layer,
                    layer, relSet = [],
                    idx;

                for (let n = 0; n < layers.length; n++) {
                    if (layers[n].Title === layerInfo.name) {
                        idx = n;
                        layer = layers[idx];
                        var layerBounds = layer.WGS84BoundingBox;
                        // tileMatrixSetLink = layer.TileMatrixSetLink;
                        break;
                    }
                }
                let scales = [];
                for (let i = 0; i < tileMatrixSet.length; i++) {
                    if (tileMatrixSet[i].Identifier === layerInfo.tileMatrixSet) {
                        for (let h = 0; h < tileMatrixSet[i].TileMatrix.length; h++) {
                            scales.push(tileMatrixSet[i].TileMatrix[h].ScaleDenominator)
                        }
                        break;
                    }
                }
                let name = layerInfo.name,
                    extent = ol.proj.transformExtent(layerBounds, 'EPSG:4326', that.baseProjection),
                    matrixSet = relSet[idx];
                //将需要的参数补上
                layerInfo.dpi = 90.7;
                layerInfo.extent = extent;
                layerInfo.format = "image/png";
                layerInfo.matrixSet = matrixSet;
                layerInfo.name = name;
                layerInfo.orginEpsgCode = layerInfo.projection;
                layerInfo.overLayer = true;
                //只有这种，Dataviz里面不应该选择
                layerInfo.requestEncoding = 'KVP';
                layerInfo.scales = scales;
                layerInfo.style = "default";
                layerInfo.title = name;
                layerInfo.unit = "m";
                layerInfo.zIndex = idx;
                if(mapInfo){
                    callback(mapInfo, null, true, that);
                }else{
                    callback(layerInfo);
                }
            }
        }).catch(function (error) {
            that.errorCallback && that.errorCallback(error, 'getWmtsFaild', that.map)
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createWMTSSource
     * @description 获取WMTS类型图层的source。
     * @param {Object} layerInfo - 图层信息。
     * @returns {ol.tilegrid}
     */
    createWMTSSource(layerInfo) {
        let extent = layerInfo.extent || ol.proj.get(layerInfo.projection).getExtent();

        // 单位通过坐标系获取 （PS: 以前代码非4326 都默认是米）
        let unit = ol.proj.get(this.baseProjection).getUnits();
        return new ol.source.WMTS({
            url: layerInfo.url,
            layer: layerInfo.name,
            format: 'image/png',
            matrixSet: layerInfo.tileMatrixSet,
            requestEncoding: layerInfo.requestEncoding || 'KVP',
            tileGrid: this.getWMTSTileGrid(extent, layerInfo.scales, unit, layerInfo.dpi),
            tileLoadFunction: function (imageTile, src) {
                imageTile.getImage().src = src
            }
        })
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getWMTSTileGrid
     * @description 获取wmts的瓦片。
     * @param {Object} extent - 图层范围。
     * @param {number} scales - 图层比例尺
     * @param {string} unit - 单位
     * @param {number} dpi - dpi
     * @returns {ol.tilegrid.WMTS}
     */
    getWMTSTileGrid(extent, scales, unit, dpi) {
        let resolutionsInfo = this.getReslutionsFromScales(scales, dpi || 96, unit);
        return new ol.tilegrid.WMTS({
            extent: extent,
            resolutions: resolutionsInfo.res,
            matrixIds: resolutionsInfo.matrixIds
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getReslutionsFromScales
     * @description 根据比例尺（比例尺分母）、地图单位、dpi、获取一个分辨率数组
     * @param {array} scales - 比例尺（比例尺分母）
     * @param {number} dpi - 地图dpi
     * @param {string} unit - 单位
     * @param {number} datumAxis
     * @returns {{res: Array, matrixIds: Array}}
     */
    getReslutionsFromScales(scales, dpi, unit, datumAxis) {
        unit = (unit && unit.toLowerCase()) || 'degrees';
        dpi = dpi > 0 ? dpi : 96;
        datumAxis = datumAxis || 6378137;
        let res = [],
            matrixIds = [];
        //给个默认的
        if (Util.isArray(scales)) {
            scales && scales.forEach(function (scale, idx) {
                matrixIds.push(idx);
                res.push(this.getResolutionFromScale(scale, dpi, unit, datumAxis));
            }, this);
        } else {
            let tileMatrixSet = scales['TileMatrix'];
            tileMatrixSet && tileMatrixSet.forEach(function (tileMatrix) {
                matrixIds.push(tileMatrix['Identifier']);
                res.push(this.getResolutionFromScale(tileMatrix['ScaleDenominator'], dpi, unit, datumAxis));
            }, this);
        }
        return {
            res: res,
            matrixIds: matrixIds
        };
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getResolutionFromScale
     * @description 获取一个WMTS source需要的tileGrid
     * @param {number} scale - 比例尺（比例尺分母）
     * @param {number} dpi - 地图dpi
     * @param {string} unit - 单位
     * @param {number} datumAxis
     * @returns {{res: Array, matrixIds: Array}}
     */
    getResolutionFromScale(scale, dpi, unit, datumAxis) {
        //radio = 10000;
        let res;
        scale = +scale;
        scale = (scale > 1.0) ? (1.0 / scale) : scale;
        if (unit === 'degrees' || unit === 'dd' || unit === 'degree') {
            res = 0.0254 * 10000 / dpi / scale / ((Math.PI * 2 * datumAxis) / 360) / 10000;
        } else {
            res = 0.0254 * 10000 / dpi / scale / 10000;
        }
        return res;

    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.isValidResponse
     * @description 返回信息是否符合对应类型的标准
     * @param {object} response - 返回的信息
     * @returns {boolean}
     */
    isValidResponse(response) {
        let responseEnum = ['Contents', 'OperationsMetadata'],
            valid = true;
        for (let i = 0; i < responseEnum.length; i++) {
            if (!response[responseEnum[i]] || response.error) {
                valid = false;
                break;
            }
        }
        return valid;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.addLayers
     * @description 添加叠加图层
     * @param {object} mapInfo - 地图信息
     */
    addLayers(mapInfo) {
        let layers = mapInfo.layers,
            that = this;
        let features = [],
            len = layers.length;
        if (len > 0) {
            //存储地图上所有的图层对象
            this.layers = layers;
            layers.forEach(function (layer, index) {
                //加上底图的index
                let layerIndex = index + 1;
                if ((layer.dataSource && layer.dataSource.serverId) || layer.layerType === "MARKER" || layer.layerType === 'HOSTED_TILE') {
                    //数据存储到iportal上了
                    let dataSource = layer.dataSource,
                        serverId = dataSource ? dataSource.serverId : layer.serverId;
                    if(!serverId) {
                        that.addLayer(layer, null, layerIndex);
                        that.layerAdded++;
                        that.sendMapToUser(len);
                        return;
                    }
                    if((layer.layerType === "MARKER") || (dataSource && (!dataSource.accessType || dataSource.accessType === 'DIRECT'))) {
                        //原来二进制文件
                        let url = `${that.server}web/datas/${serverId}/content.json?pageSize=9999999&currentPage=1`;
                        url = that.getRequestUrl(url);
                        FetchRequest.get(url, null, {
                            withCredentials: this.withCredentials
                        }).then(function (response) {
                            return response.json()
                        }).then(function (data) {
                            if (data.succeed === false) {
                                //请求失败
                                that.layerAdded++;
                                that.sendMapToUser(len);
                                that.errorCallback && that.errorCallback(data.error, 'getLayerFaild', that.map);
                                return;
                            }
                            if (data && data.type) {
                                if (data.type === "JSON" || data.type === "GEOJSON") {
                                    data.content = JSON.parse(data.content);
                                    features = that.geojsonToFeature(data.content, layer);
                                } else if (data.type === 'EXCEL' || data.type === 'CSV') {
                                    features = that.excelData2Feature(data.content, layer);
                                }
                                that.addLayer(layer, features, layerIndex);
                                that.layerAdded++;
                                that.sendMapToUser(len);
                            }
                        }).catch(function (error) {
                            that.layerAdded++;
                            that.sendMapToUser(len);
                            that.errorCallback && that.errorCallback(error, 'getLayerFaild', that.map);
                        })
                    } else {
                        //关系型文件
                        let isMapService = layer.layerType === 'HOSTED_TILE',
                            serverId = dataSource ? dataSource.serverId : layer.serverId;
                        that.checkUploadToRelationship(serverId).then(function (result) {
                            if(result && result.length > 0) {
                                let datasetName = result[0].name, 
                                    featureType = result[0].type.toUpperCase();
                                that.getDataService(serverId,datasetName).then(function (data) {
                                    let dataItemServices = data.dataItemServices;
                                    if(dataItemServices.length === 0) {
                                        that.layerAdded++;
                                        that.sendMapToUser(len);
                                        that.errorCallback && that.errorCallback(null, 'getLayerFaild', that.map);
                                        return;
                                    }
                                    if(isMapService) {
                                        //需要判断是使用tile还是mvt服务
                                        let dataService = that.getService(dataItemServices, 'RESTDATA');
                                        that.isMvt(dataService.address, datasetName).then(info => {
                                            that.getServiceInfoFromLayer(layerIndex, len, layer, dataItemServices, datasetName, featureType, info);      
                                        }).catch(() => {
                                            //判断失败就走之前逻辑，>数据量用tile
                                            that.getServiceInfoFromLayer(layerIndex, len, layer, dataItemServices, datasetName, featureType); 
                                        })
                                    } else {
                                        that.getServiceInfoFromLayer(layerIndex, len, layer, dataItemServices, datasetName, featureType);    
                                    }
                                });
                            } else {
                                that.layerAdded++;
                                that.sendMapToUser(len);
                                that.errorCallback && that.errorCallback(null, 'getLayerFaild', that.map);
                            }
                        }).catch(function(error){
                            that.layerAdded++;
                            that.sendMapToUser(len);
                            that.errorCallback && that.errorCallback(error, 'getLayerFaild', that.map);
                        })
                    }
                } else if (layer.layerType === 'SUPERMAP_REST' || 
                    layer.layerType === "TILE" ||
                    layer.layerType === "WMS" || 
                    layer.layerType === "WMTS") {
                    if (layer.layerType === "WMTS") {
                        that.getWmtsInfo(layer, function (layerInfo) {
                            that.map.addLayer(that.createBaseLayer(layerInfo, layerIndex));
                        })
                    } else {
                        that.getLayerExtent(layer, function(layerInfo){
                            that.map.addLayer(that.createBaseLayer(layerInfo, layerIndex));
                        });
                    }
                    that.layerAdded++;
                    that.sendMapToUser(len);
                } else if (layer.dataSource && layer.dataSource.type === "REST_DATA") {
                    //从restData获取数据
                    that.getFeaturesFromRestData(layer, layerIndex, len);
                } else if (layer.dataSource && layer.dataSource.type === "REST_MAP" && layer.dataSource.url) {
                    //示例数据
                    Util.queryFeatureBySQL(layer.dataSource.url, layer.dataSource.layerName, 'smid=1', null, null, function (result) {
                        var recordsets = result && result.result.recordsets;
                        var recordset = recordsets && recordsets[0];
                        var attributes = recordset.fields;
                        if (recordset && attributes) {
                            let fileterAttrs = [];
                            for (var i in attributes) {
                                var value = attributes[i];
                                if (value.indexOf('Sm') !== 0 || value === "SmID") {
                                    fileterAttrs.push(value);
                                }
                            }
                            that.getFeatures(fileterAttrs, layer, function (features) {
                                that.addLayer(layer, features, layerIndex);
                                that.layerAdded++;
                                that.sendMapToUser(len);
                            }, function (e) {
                                that.layerAdded++;
                                that.errorCallback && that.errorCallback(e, 'getFeatureFaild', that.map);
                            });
                        }
                    }, function (e) {
                        that.errorCallback && that.errorCallback(e, 'getFeatureFaild', that.map);
                    })
                } else if(layer.layerType === "DATAFLOW_POINT_TRACK" || layer.layerType === "DATAFLOW_HEAT") {
                    that.getDataflowInfo(layer, function () {
                        that.addLayer(layer, features, layerIndex);
                        that.layerAdded++;
                        that.sendMapToUser(len);
                    }, function (e) {
                        that.layerAdded++;
                        that.errorCallback && that.errorCallback(e, 'getFeatureFaild', that.map);
                    })
                }
            }, this);
        }
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getServiceInfoFromLayer
     * @description 判断使用哪种服务上图
     * @param {Number} layerIndex - 图层对应的index
     * @param {Number} len - 成功添加的图层个数
     * @param {Object} layer - 图层信息
     * @param {Array} dataItemServices - 数据发布的服务
     * @param {String} datasetName - 数据服务的数据集名称 
     * @param {String} featureType - feature类型 
     * @param {Object} info - 数据服务的信息 
     */
    getServiceInfoFromLayer(layerIndex, len, layer, dataItemServices, datasetName, featureType, info) {
        let that = this;
        let isMapService = info ? !info.isMvt : layer.layerType === 'HOSTED_TILE',
            isAdded = false;
        dataItemServices.forEach(function (service) {
            if(isAdded) {
                return;
            }
            //有服务了，就不需要循环
            if(service && isMapService && service.serviceType === 'RESTMAP') {
                isAdded = true;
                //地图服务,判断使用mvt还是tile
                that.getTileLayerInfo(service.address).then(function (restMaps) {
                    restMaps.forEach(function (restMapInfo) {
                        let bounds = restMapInfo.bounds;
                        layer.layerType = 'TILE';
                        layer.orginEpsgCode = that.baseProjection;
                        layer.units= restMapInfo.coordUnit && restMapInfo.coordUnit.toLowerCase();
                        layer.extent= [bounds.left, bounds.bottom, bounds.right, bounds.top];
                        layer.visibleScales= restMapInfo.visibleScales;
                        layer.url= restMapInfo.url;
                        layer.sourceType= 'TILE';
                        that.map.addLayer(that.createBaseLayer(layer, layerIndex));
                        that.layerAdded++;
                        that.sendMapToUser(len);
                    })
                })
            } else if(service && !isMapService && service.serviceType === 'RESTDATA') {
                isAdded = true;
                if(info && info.isMvt) {
                    let bounds = info.bounds;
                    layer = Object.assign(layer, {
                        layerType: "VECTOR_TILE", 
                        epsgCode: info.epsgCode,
                        projection: `EPSG:${info.epsgCode}`,
                        bounds: bounds,
                        extent: [bounds.left, bounds.bottom, bounds.right, bounds.top],
                        name: layer.name,
                        url: info.url,
                        visible: layer.visible,
                        featureType: featureType, 
                        serverId: layer.serverId.toString() 
                    });
                    that.map.addLayer(that.addVectorTileLayer(layer, layerIndex, 'RESTDATA'));
                    that.layerAdded++;
                    that.sendMapToUser(len);
                  
                } else {
                    //数据服务
                    isAdded = true;
                    //关系型文件发布的数据服务
                    that.getDatasources(service.address).then(function (datasourceName) {
                        layer.dataSource.dataSourceName = datasourceName + ":" + datasetName;
                        layer.dataSource.url = `${service.address}/data`;
                        that.getFeaturesFromRestData(layer, layerIndex, len);
                    });
                }
            }
        });
        if(!isAdded) {
            //循环完成了，也没有找到合适的服务。有可能服务被删除
            that.layerAdded++;
            that.sendMapToUser(len);
            that.errorCallback && that.errorCallback(null, 'getLayerFaild', that.map);
        }
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getDataflowInfo
     * @description 获取数据流服务的参数
     * @param {object} layerInfo - 图层信息
     * @param {function} success - 成功回调函数
     * @param {function} faild - 失败回调函数
     */
    getDataflowInfo(layerInfo, success, faild) {
        let that = this;
        let url = layerInfo.url, token;
        let requestUrl = that.getRequestUrl(`${url}.json`)
        if(layerInfo.credential && layerInfo.credential.token) {
            token = layerInfo.credential.token;
            requestUrl+= `?token=${token}`;
        }
        FetchRequest.get(requestUrl, null, {
            withCredentials: this.withCredentials
        }).then(function (response) {
            return response.json()
        }).then(function (result) {
            if(result && result.featureMetaData) {
                layerInfo.featureType = result.featureMetaData.featureType.toUpperCase();
                layerInfo.dataSource={dataTypes:{}};
                if(result.featureMetaData.fieldInfos && result.featureMetaData.fieldInfos.length > 0) {
                    result.featureMetaData.fieldInfos.forEach(function (data) {
                        let name = data.name.trim();
                        if(data.type === 'TEXT') {
                            layerInfo.dataSource.dataTypes[name] = "STRING";
                        } else if(['DOUBLE','INT','FLOAT','LONG','SHORT'].includes(data.type)) {
                            layerInfo.dataSource.dataTypes[name] = "NUMBER";
                        } else {
                            layerInfo.dataSource.dataTypes[name] = "UNKNOWN";
                        }
                    })
                }
                layerInfo.wsUrl = result.urls[0].url;
                layerInfo.name = result.urls[0].url.split('iserver/services/')[1].split('/dataflow')[0];
                success();
            } else {
                //失败也要到成功会调函数中，否则不会继续执行
                faild();
            }
        }).catch(function () {
            faild();
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getFeaturesFromRestData
     * @description 从数据服务中获取feature
     * @param {object} layer - 图层信息
     * @param {Number} layerIndex - 图层index
     * @param {Number} layerLength - 图层数量
     */
    getFeaturesFromRestData(layer, layerIndex, layerLength) {
        let that = this,dataSource = layer.dataSource,
            url = layer.dataSource.url,
            dataSourceName= dataSource.dataSourceName || layer.name;
        let requestUrl = that.getRequestUrl(url); 
        //因为itest上使用的https，iserver是http，所以要加上代理
        Util.getFeatureBySQL(requestUrl, [dataSourceName], function (result) {
            let features = that.parseGeoJsonData2Feature({
                allDatas: {
                    features: result.result.features.features
                },
                fileCode: layer.projection,
                featureProjection: that.baseProjection
            });
            that.addLayer(layer, features, layerIndex);
            that.layerAdded++;
            that.sendMapToUser(layerLength);
        }, function (err) {
            that.layerAdded++;
            that.sendMapToUser(layerLength);
            that.errorCallback && that.errorCallback(err, 'getFeatureFaild', that.map)
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getFeatures
     * @description 从地图中获取feature
     * @param {object} fields - 图层信息
     * @param {Number} layerInfo - 图层index
     * @param {Number} success - 成功回调
     * @param {Number} faild - 失败回调
     */
    getFeatures(fields, layerInfo, success, faild) {
        var that = this;
        var source = layerInfo.dataSource;
        var fileCode = layerInfo.projection;
        Util.queryFeatureBySQL(source.url, source.layerName, null, fields, null, function (result) {
            var recordsets = result.result.recordsets[0];
            var features = recordsets.features.features;

            var featuresObj = that.parseGeoJsonData2Feature({
                allDatas: {
                    features
                },
                fileCode: fileCode,
                featureProjection: that.baseProjection
            }, 'JSON');
            success(featuresObj);
        }, function (err) {
            faild(err);
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.sendMapToUser
     * @description 将所有叠加图层叠加后，返回最终的map对象给用户，供他们操作使用
     * @param {number} layersLen - 叠加图层总数
     */
    sendMapToUser(layersLen) {
        if (this.layerAdded === layersLen && this.successCallback) {
            this.successCallback(this.map, this.mapParams, this.layers);
        }
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.excelData2Feature
     * @description 将csv和xls文件内容转换成ol.feature
     * @param {object} content - 文件内容
     * @param {object} layerInfo - 图层信息
     * @returns {Array}  ol.feature的数组集合
     */
    excelData2Feature(content, layerInfo) {
        let rows = content.rows,
            colTitles = content.colTitles;
        // 解决V2恢复的数据中含有空格
        for (let i in colTitles) {
            if (Util.isString(colTitles[i])) {
                colTitles[i] = Util.trim(colTitles[i]);
            }
        }
        let fileCode = layerInfo.projection,
            xIdx = colTitles.indexOf(Util.trim(layerInfo.xyField.xField)),
            yIdx = colTitles.indexOf(Util.trim(layerInfo.xyField.yField)),
            baseLayerEpsgCode = this.baseProjection,
            features = [];

        for (let i = 0, len = rows.length; i < len; i++) {
            let rowDatas = rows[i],
                attributes = {},
                geomX = rows[i][xIdx],
                geomY = rows[i][yIdx];
            // 位置字段信息不存在 过滤数据
            if (geomX !== '' && geomY !== '') {
                let olGeom = new ol.geom.Point([+geomX, +geomY]);
                if (fileCode !== baseLayerEpsgCode) {
                    olGeom.transform(fileCode, baseLayerEpsgCode);
                }
                for (let j = 0, leng = rowDatas.length; j < leng; j++) {
                    attributes[colTitles[j]] = rowDatas[j];
                }
                let feature = new ol.Feature({
                    geometry: olGeom,
                    Properties: attributes
                });
                feature.attributes = attributes;
                features.push(feature);
            }
        }
        return features;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.geojsonToFeature
     * @description geojson 转换为 feature
     * @param {object} layerInfo - 图层信息
     * @returns {Array}  ol.feature的数组集合
     */
    geojsonToFeature(geojson, layerInfo) {
        let allFeatures = geojson.features,
            features = [];
        for (let i = 0, len = allFeatures.length; i < len; i++) {
            let feature = transformTools.readFeature(allFeatures[i], {
                dataProjection: layerInfo.projection || 'EPSG:4326',
                featureProjection: this.baseProjection || 'ESPG:4326'
            });
            //geojson格式的feature属性没有坐标系字段，为了统一，再次加上
            let coordinate = feature.getGeometry().getCoordinates();
            if (allFeatures[i].geometry.type === 'Point') {
                // 标注图层 还没有属性值时候不加
                if (allFeatures[i].properties) {
                    allFeatures[i].properties.lon = coordinate[0];
                    allFeatures[i].properties.lat = coordinate[1];
                }
            }
            feature.attributes = allFeatures[i].properties || {};

            // 标注图层特殊处理
            let isMarker = false;
            let featureInfo;
            let useStyle;
            if (allFeatures[i].dv_v5_markerInfo) {
                featureInfo = allFeatures[i].dv_v5_markerInfo;
                isMarker = true;
            }
            if (allFeatures[i].dv_v5_markerStyle) {
                useStyle = allFeatures[i].dv_v5_markerStyle;
                isMarker = true;
            }
            let properties;
            if (isMarker) {
                properties = Object.assign({}, {
                    featureInfo: featureInfo
                }, {
                        useStyle: useStyle
                    });
                //feature上添加图层的id，为了对应图层
                feature.layerId = layerInfo.timeId;
                //删除不需要的属性，因为这两个属性存储在properties上
                delete feature.attributes.featureInfo;
                delete feature.attributes.useStyle;
            } else if (layerInfo.featureStyles) {
                //V4 版本标注图层处理
                let style = JSON.parse(layerInfo.featureStyles[i].style);
                let attr = feature.attributes;
                let imgUrl;
                if (attr._smiportal_imgLinkUrl.indexOf('http://') > -1 || attr._smiportal_imgLinkUrl.indexOf('https://') > -1) {
                    imgUrl = attr._smiportal_imgLinkUrl;
                } else if (attr._smiportal_imgLinkUrl !== undefined && attr._smiportal_imgLinkUrl !== null &&
                    attr._smiportal_imgLinkUrl !== '') {
                    //上传的图片，加上当前地址
                    imgUrl = `${Util.getIPortalUrl()}resources/markerIcon/${attr._smiportal_imgLinkUrl}`
                }
                featureInfo = {
                    dataViz_description: attr._smiportal_description,
                    dataViz_imgUrl: imgUrl,
                    dataViz_title: attr._smiportal_title,
                    dataViz_url: attr._smiportal_otherLinkUrl
                };
                style.anchor = [0.5, 1];
                style.src = style.externalGraphic;

                useStyle = style;
                properties = Object.assign({}, {
                    featureInfo: featureInfo
                }, {
                        useStyle: useStyle
                    });
                delete attr._smiportal_description;
                delete attr._smiportal_imgLinkUrl;
                delete attr._smiportal_title;
                delete attr._smiportal_otherLinkUrl;
            } else {
                properties = feature.attributes;
            }

            feature.setProperties(properties);
            features.push(feature);
        }
        return features;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.parseGeoJsonData2Feature
     * @description 将从restData地址上获取的json转换成feature（从iserver中获取的json转换成feature）
     * @param {object} metaData - json内容
     * @returns {Array}  ol.feature的数组集合
     */
    parseGeoJsonData2Feature(metaData) {
        let allFeatures = metaData.allDatas.features,
            features = [];
        for (let i = 0, len = allFeatures.length; i < len; i++) {
            let feature = transformTools.readFeature(allFeatures[i], {
                dataProjection: metaData.fileCode || 'EPSG:4326',
                featureProjection: metaData.featureProjection || Util.getBaseLayerProj() || 'EPSG:4326'
            });
            //geojson格式的feature属性没有坐标系字段，为了统一，再次加上
            let coordinate = feature.getGeometry().getCoordinates();
            if (allFeatures[i].geometry.type === 'Point') {
                allFeatures[i].properties.lon = coordinate[0];
                allFeatures[i].properties.lat = coordinate[1];
            }
            feature.attributes = allFeatures[i].properties || {};
            feature.setProperties({
                Properties: feature.attributes
            });
            features.push(feature);
        }
        return features;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.addLayer
     * @description 将叠加图层添加到地图上
     * @param {object} layerInfo - 图层信息
     * @param {array} features - 图层上的feature集合
     * @param {number} index 图层的顺序
     */
    addLayer(layerInfo, features, index) {
        let layer;
        if (layerInfo.layerType === "VECTOR") {
            if (layerInfo.featureType === "POINT") {
                if (layerInfo.style.type === 'SYMBOL_POINT') {
                    layer = this.createSymbolLayer(layerInfo, features);
                } else {
                    layer = this.createGraphicLayer(layerInfo, features);
                }
            } else {
                //线和面
                layer = this.createVectorLayer(layerInfo, features)
            }
        } else if (layerInfo.layerType === "UNIQUE") {
            layer = this.createUniqueLayer(layerInfo, features);
        } else if (layerInfo.layerType === "RANGE") {
            layer = this.createRangeLayer(layerInfo, features);
        } else if (layerInfo.layerType === "HEAT") {
            layer = this.createHeatLayer(layerInfo, features);
        } else if (layerInfo.layerType === "MARKER") {
            layer = this.createMarkerLayer(layerInfo, features);
        } else if(layerInfo.layerType === "DATAFLOW_POINT_TRACK") {
            layer = this.createDataflowLayer(layerInfo, index);
        } else if(layerInfo.layerType === "DATAFLOW_HEAT") {
            layer = this.createDataflowHeatLayer(layerInfo);
        } else if(layerInfo.layerType === "RANK_SYMBOL") {
            layer = this.createRankSymbolLayer(layerInfo, features);
        } else if(layerInfo.layerType === "MIGRATION") {
            layer = this.createMigrationLayer(layerInfo, features);
        }
        let layerID = Util.newGuid(8);
        if (layer) {
            layerInfo.name && layer.setProperties({
                name: layerInfo.name,
                layerID: layerID,
                layerType: layerInfo.layerType 
            });
            
            //刷新下图层，否则feature样式出不来
            if(layerInfo && layerInfo.style && layerInfo.style.imageInfo) {
                let img = new Image();
                img.src = layerInfo.style.imageInfo.url;
                img.onload = function() {
                    layer.getSource().refresh();
                };
            }
            if (layerInfo.layerType === 'MIGRATION') {
                layer.appendTo(this.map);
                // 在这里恢复图层可见性状态
                layer.setVisible(layerInfo.visible);
                // 设置鼠标样式为默认
                layer.setCursor();
            } else {
                layerInfo.opacity != undefined && layer.setOpacity(layerInfo.opacity);
                layer.setVisible(layerInfo.visible);
                this.map.addLayer(layer);
            }
            layer.setZIndex(index);
        }
        layerInfo.layer = layer;
        layerInfo.layerID = layerID;
        if (layerInfo.labelStyle && layerInfo.labelStyle.labelField && layerInfo.layerType !== "DATAFLOW_POINT_TRACK") {
            //存在标签专题图
            //过滤条件过滤feature
            features = layerInfo.filterCondition ? this.getFiterFeatures(layerInfo.filterCondition, features) : features;
            this.addLabelLayer(layerInfo, features);
        }
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.addVectorTileLayer
     * @description 添加vectorTILE图层
     * @param {object} layerInfo - 图层信息
     * @param {number} index 图层的顺序
     * @param {String} type 创建的图层类型，restData为创建数据服务的mvt, restMap为创建地图服务的mvt
     * @returns {Object}  图层对象
     */
    addVectorTileLayer(layerInfo, index, type) {
        let layer;
        if(type === 'RESTDATA') {
            //用的是restdata服务的mvt
            layer = this.createDataVectorTileLayer(layerInfo)
        }   
        let layerID = Util.newGuid(8);
        if (layer) {
            layerInfo.name && layer.setProperties({
                name: layerInfo.name,
                layerID: layerID
            });
            layerInfo.opacity != undefined && layer.setOpacity(layerInfo.opacity);
            layer.setVisible(layerInfo.visible);
            layer.setZIndex(index);
        }
        layerInfo.layer = layer;
        layerInfo.layerID = layerID; 
        return layer;
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createDataVectorTileLayer
     * @description 创建vectorTILE图层
     * @param {object} layerInfo - 图层信息
     * @returns {Object} 图层对象
     */
    createDataVectorTileLayer(layerInfo) {
        //创建图层
        var format = new ol.format.MVT({
            featureClass: ol.Feature
		});
		//要加上这一句，否则坐标，默认都是3857
		ol.format.MVT.prototype.readProjection = function () {
			return new ol.proj.Projection({
				code: '',
				units: ol.proj.Units.TILE_PIXELS
			});
        };
        let featureType = layerInfo.featureType;
        let style = StyleUtils.toOpenLayersStyle(this.getDataVectorTileStyle(featureType), featureType);    
        return new ol.layer.VectorTile({
            //设置避让参数
            source: new ol.source.VectorTileSuperMapRest({
                url: layerInfo.url,
                projection: layerInfo.projection,
                tileType: "ScaleXY",
                format: format
            }),
            style: style
        });
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getDataVectorTileStyle
     * @description 获取数据服务的mvt上图的默认样式
     * @param {String} featureType - 要素类型
     * @returns {Object} 样式参数
     */
    getDataVectorTileStyle(featureType) { 
        let styleParameters = {
            radius: 8, //圆点半径
            fillColor: '#EE4D5A', //填充色
            fillOpacity: 0.9,
            strokeColor: '#ffffff', //边框颜色
            strokeWidth: 1,
            strokeOpacity: 1,
            lineDash: 'solid',
            type: "BASIC_POINT"
        };
        if(["LINE", "LINESTRING", "MULTILINESTRING"].includes(featureType)){
            styleParameters.strokeColor = '#4CC8A3';
            styleParameters.strokeWidth = 2;
        }else if(["REGION", "POLYGON", "MULTIPOLYGON"].includes(featureType)){
            styleParameters.fillColor = '#826DBA';
        }
        return styleParameters;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getFiterFeatures
     * @description 通过过滤条件查询满足的feature
     * @param {string} filterCondition - 过滤条件
     * @param {array} allFeatures - 图层上的feature集合
     */
    getFiterFeatures(filterCondition, allFeatures) {
        let jsonsqls = window.jsonsql ? window.jsonsql : jsonsql;
        let condition = this.replaceFilterCharacter(filterCondition);
        let sql = "select * from json where (" + condition + ")";
        let filterFeatures = [];
        for (let i = 0; i < allFeatures.length; i++) {
            let feature = allFeatures[i];
            let filterResult = false;
            try {
                filterResult = jsonsqls.query(sql, {
                    attributes: feature.attributes
                });
            } catch (err) {
                //必须把要过滤得内容封装成一个对象,主要是处理jsonsql(line : 62)中由于with语句遍历对象造成的问题
                continue;
            }
            if (filterResult && filterResult.length > 0) {
                //afterFilterFeatureIdx.push(i);
                filterFeatures.push(feature);
            }
        }
        return filterFeatures;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.replaceFilterCharacter
     * @description 替换查询语句 中的 and / AND / or / OR / = / !=
     * @param {string} filterString - 过滤条件
     * @return {string} 换成组件能识别的字符串
     */
    replaceFilterCharacter(filterString) {
        filterString = filterString.replace(/=/g, '==').replace(/AND|and/g, '&&').replace(/or|OR/g, '||').replace(/<==/g, '<=').replace(/>==/g, '>=');
        return filterString;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createGraphicLayer
     * @description 添加大数据图层到地图上
     * @param {object} layerInfo - 图层信息
     * @param {array} features - feature的集合
     * @return {string}
     */
    createGraphicLayer(layerInfo, features) {
        features = layerInfo.filterCondition ? this.getFiterFeatures(layerInfo.filterCondition, features) : features;
        let graphics = this.getGraphicsFromFeatures(features, layerInfo.style, layerInfo.featureType);
        let source = new ol.source.Graphic({
            graphics: graphics,
            render: 'canvas',
            map: this.map,
            isHighLight: false        });
        return new ol.layer.Image({
            source: source
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getGraphicsFromFeatures
     * @description 将feature转换成大数据图层对应的Graphics要素
     * @param {array} features - feature的集合
     * @param {object} style - 图层样式
     * @param {string} featureType - feature的类型
     * @return {string}
     */
    getGraphicsFromFeatures(features, style, featureType) {
        let olStyle = StyleUtils.getOpenlayersStyle(style, featureType),
            shape = olStyle.getImage();
        let graphics = [];
        //构建graphic
        for (let i in features) {
            let graphic = new ol.Graphic(features[i].getGeometry(), features[i].attributes);
            graphic.setStyle(shape);
            graphics.push(graphic);
        }
        return graphics;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createSymbolLayer
     * @description 添加符号图层
     * @param {object} layerInfo - 图层信息
     * @param {array} features - feature的集合
     * @return {object}
     */
    createSymbolLayer(layerInfo, features) {
        let style = StyleUtils.getSymbolStyle(layerInfo.style);
        return new ol.layer.Vector({
            style: style,
            source: new ol.source.Vector({
                features: layerInfo.filterCondition ? this.getFiterFeatures(layerInfo.filterCondition, features) : features,
                wrapX: false
            })
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.addLabelLayer
     * @description 添加标签图层
     * @param {object} layerInfo - 图层信息
     * @param {array} features -feature的集合
     * @returns {object}图层对象
     */
    addLabelLayer(layerInfo, features) {
        let labelStyle = layerInfo.labelStyle;
        let style = this.getLabelStyle(labelStyle, layerInfo);
        let layer = new ol.layer.Vector({
            declutter: true,
            styleOL: style,
            labelField: labelStyle.labelField,
            source: new ol.source.Vector({
                features: features,
                wrapX: false
            })
        });
        layer.setStyle(features => {
            let labelField = labelStyle.labelField;
            let label = features.attributes[labelField.trim()] + "";
            if (label === "undefined") {
                return null;
            }
            let styleOL = layer.get('styleOL');
            let text = styleOL.getText();
            if (text && text.setText) {
                text.setText(label);
            }
            return styleOL;
        });
        this.map.addLayer(layer);
        layer.setVisible(layerInfo.visible);
        layer.setZIndex(1000);
        return layer;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getLabelStyle
     * @description 获取标签样式
     * @param {object} parameters - 标签图层样式参数
     * @param {object} layerInfo - 图层样式参数
     * @returns {ol.style.Style}
     */
    getLabelStyle(parameters, layerInfo) {
        let style = layerInfo.style || layerInfo.pointStyle;
        let radius = style.radius || 0;
        let strokeWidth = style.strokeWidth || 0;
        let offsetY = -1.8 * radius - strokeWidth;
        if (offsetY > -20) {
            offsetY = -20;
        }
        parameters.offsetY = offsetY;

        return new ol.style.Style({
            text: new ol.style.Text({
                font: "14px " + parameters.fontFamily,
                placement: 'point',
                textAlign: 'center',
                fill: new ol.style.Fill({
                    color: parameters.fill
                }),
                backgroundFill: new ol.style.Fill({
                    color: [255, 255, 255, 0.7]
                }),
                padding: [3, 3, 3, 3],
                offsetY: parameters.offsetY
            })
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createVectorLayer
     * @description 创建vector图层
     * @param {object} layerInfo - 图层信息
     * @param {array} features -feature的集合
     * @returns {ol.style.Style}
     */
    createVectorLayer(layerInfo, features) {
        let style = StyleUtils.toOpenLayersStyle(layerInfo.style, layerInfo.featureType);
        return new ol.layer.Vector({
            style: style,
            source: new ol.source.Vector({
                features: layerInfo.filterCondition ? this.getFiterFeatures(layerInfo.filterCondition, features) : features,
                wrapX: false
            })
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createHeatLayer
     * @description 创建热力图图层
     * @param {object} layerInfo - 图层信息
     * @param {array} features -feature的集合
     * @returns {ol.layer.Heatmap}
     */
    createHeatLayer(layerInfo, features) {
        //因为热力图，随着过滤，需要重新计算权重
        features = layerInfo.filterCondition ? this.getFiterFeatures(layerInfo.filterCondition, features) : features;
        let source = new ol.source.Vector({
            features: features,
            wrapX: false
        });
        let layerOptions = {
            source: source
        };
        let themeSetting = layerInfo.themeSetting;
        layerOptions.gradient = themeSetting.colors.slice();
        layerOptions.radius = parseInt(themeSetting.radius);
        //自定义颜色
        let customSettings = themeSetting.customSettings;
        for (let i in customSettings) {
            layerOptions.gradient[i] = customSettings[i];
        }
        // 权重字段恢复
        if (themeSetting.weight) {
            this.changeWeight(features, themeSetting.weight);
        }
        return new ol.layer.Heatmap(layerOptions);
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.changeWeight
     * @description 改变当前权重字段
     * @param {array} features - feature的集合
     * @param {string} weightFeild - 权重字段
     */
    changeWeight(features, weightFeild) {
        let that = this;
        this.fieldMaxValue = {};
        this.getMaxValue(features, weightFeild);
        let maxValue = this.fieldMaxValue[weightFeild];
        features.forEach(function (feature) {
            let attributes = feature.get("Properties") || feature.attributes;
            try {
                let value = attributes[weightFeild];
                feature.set('weight', value / maxValue);
            } catch (e) {
                that.errorCallback && that.errorCallback(e);
            }
        })
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getMaxValue
     * @description 获取当前字段对应的最大值，用于计算权重
     * @param {array} features - feature 数组
     * @param {string} weightField - 权重字段
     */
    getMaxValue(features, weightField) {
        let values = [], that = this, attributes;
        let field = weightField;
        if (this.fieldMaxValue[field]) {
            return;
        }
        features.forEach(function (feature) {
            //收集当前权重字段对应的所有值
            attributes = feature.get("Properties") || feature.attributes;
            try {
                values.push(parseFloat(attributes[field]));
            } catch (e) {
                that.errorCallback && that.errorCallback(e);
            }
        });
        this.fieldMaxValue[field] = ArrayStatistic.getArrayStatistic(values, 'Maximum');
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createUniqueLayer
     * @description 获取当前字段对应的最大值，用于计算权重
     * @param {array} layerInfo - 图层信息
     * @param {array} features - 所有feature结合
     */
    createUniqueLayer(layerInfo, features) {
        let styleSource = this.createUniqueSource(layerInfo, features);
        let layer = new ol.layer.Vector({
            styleSource: styleSource,
            source: new ol.source.Vector({
                features: layerInfo.filterCondition ? this.getFiterFeatures(layerInfo.filterCondition, features) : features,
                wrapX: false
            })
        });
        layer.setStyle(feature => {
            let styleSource = layer.get('styleSource');
            let labelField = styleSource.themeField;
            let label = feature.attributes[labelField];
            return styleSource.styleGroups[label].olStyle;
        });

        return layer;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createUniqueSource
     * @description 创建单值图层的source
     * @param {layerInfo} parameters- 图层信息
     * @param {array} features - feature 数组
     * @returns {{map: *, style: *, isHoverAble: *, highlightStyle: *, themeField: *, styleGroups: Array}}
     */
    createUniqueSource(parameters, features) {
        //找到合适的专题字段
        let styleGroup = this.getUniqueStyleGroup(parameters, features);
        return {
            map: this.map, //必传参数 API居然不提示
            style: parameters.style,
            isHoverAble: parameters.isHoverAble,
            highlightStyle: parameters.highlightStyle,
            themeField: parameters.themeSetting.themeField,
            styleGroups: styleGroup
        };
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getUniqueStyleGroup
     * @description 获取单值专题图的styleGroup
     * @param {object} parameters- 图层信息
     * @param {array} features - feature 数组
     * @returns {Array}
     */
    getUniqueStyleGroup(parameters, features) {
        // 找出所有的单值
        let featureType = parameters.featureType,
            style = parameters.style,
            themeSetting = parameters.themeSetting;
        let fieldName = themeSetting.themeField,
            colors = themeSetting.colors;

        let names = [],
            customSettings = themeSetting.customSettings;
        for (let i in features) {
            let attributes = features[i].attributes;
            let name = attributes[fieldName];
            let isSaved = false;
            for (let j in names) {
                if (names[j] === name) {
                    isSaved = true;
                    break;
                }
            }
            if (!isSaved) {
                names.push(name);
            }
        }

        //获取一定量的颜色
        let curentColors = colors;
        curentColors = ColorsPickerUtil.getGradientColors(curentColors, names.length);

        //生成styleGroup
        let styleGroup = [];
        names.forEach(function (name, index) {
            let color = curentColors[index];
            if (name in customSettings) {
                color = customSettings[name];
            }
            if (featureType === "LINE") {
                style.strokeColor = color;
            } else {
                style.fillColor = color;
            }
            // 转化成 ol 样式
            let olStyle = StyleUtils.toOpenLayersStyle(style, featureType);

            styleGroup[name] = {
                olStyle: olStyle,
                color: color,
                value: name
            };
        });

        return styleGroup;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createRangeLayer
     * @description 创建分段图层
     * @param {object} layerInfo- 图层信息
     * @param {array} features - 所有feature结合
     * @returns {ol.layer.Vector}
     */
    createRangeLayer(layerInfo, features) {
        //这里获取styleGroup要用所以的feature
        let styleSource = this.createRangeSource(layerInfo, features);
        let layer = new ol.layer.Vector({
            styleSource: styleSource,
            source: new ol.source.Vector({
                features: layerInfo.filterCondition ? this.getFiterFeatures(layerInfo.filterCondition, features) : features,
                wrapX: false
            })
        });

        layer.setStyle(feature => {
            let styleSource = layer.get('styleSource');
            if (styleSource) {
                let labelField = styleSource.themeField;
                let value = Number(feature.attributes[labelField.trim()]);
                let styleGroups = styleSource.styleGroups;
                for (let i = 0; i < styleGroups.length; i++) {
                    if (i === 0) {
                        if (value >= styleGroups[i].start && value <= styleGroups[i].end) {
                            return styleGroups[i].olStyle;
                        }
                    } else {
                        if (value > styleGroups[i].start && value <= styleGroups[i].end) {
                            return styleGroups[i].olStyle;
                        }
                    }
                }
            }
        });

        return layer;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createRangeSource
     * @description 创建分段专题图的图层source
     * @param {object} parameters- 图层信息
     * @param {array} features - 所以的feature集合
     * @returns {*}
     */
    createRangeSource(parameters, features) {
        //找到合适的专题字段
        let styleGroup = this.getRangeStyleGroup(parameters, features);
        if (styleGroup) {
            return {
                style: parameters.style,
                themeField: parameters.themeSetting.themeField,
                styleGroups: styleGroup
            };
        } else {
            return false;
        }
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getRangeStyleGroup
     * @description 获取分段专题图的styleGroup样式
     * @param {object} parameters- 图层信息
     * @param {array} features - 所以的feature集合
     * @returns {*}
     */
    getRangeStyleGroup(parameters, features) {
        // 找出分段值
        let featureType = parameters.featureType,
            themeSetting = parameters.themeSetting,
            style = parameters.style;
        let count = themeSetting.segmentCount,
            method = themeSetting.segmentMethod,
            colors = themeSetting.colors,
            customSettings = themeSetting.customSettings,
            fieldName = themeSetting.themeField;
        let values = [],
            attributes;
        let segmentCount = count;
        let segmentMethod = method;
        let that = this;
        features.forEach(function (feature) {
            attributes = feature.get("Properties") || feature.attributes;
            try {
                if (attributes) {
                    //过滤掉非数值的数据
                    let value = attributes[fieldName.trim()];
                    if (value && Util.isNumber(value)) {
                        values.push(parseFloat(value));
                    }
                } else if (feature.get(fieldName) && Util.isNumber(feature.get(fieldName))) {
                    if (feature.get(fieldName)) {
                        values.push(parseFloat(feature.get(fieldName)));
                    }
                }
            } catch (e) {
                that.errorCallback && that.errorCallback(e);
            }

        });

        let segements;
        try {
            segements = ArrayStatistic.getArraySegments(values, segmentMethod, segmentCount);
        } catch (e) {
            that.errorCallback && that.errorCallback(e);
        }
        if (segements) {
            let itemNum = segmentCount;
            if (attributes && segements[0] === segements[attributes.length - 1]) {
                itemNum = 1;
                segements.length = 2;
            }

            //保留两位有效数
            for (let key in segements) {
                let value = segements[key];
                if (Number(key) === 0) {
                    // 最小的值下舍入,要用两个等于号。否则有些值判断不对
                    value = Math.floor(value * 100) / 100;
                } else {
                    // 其余上舍入
                    value = Math.ceil(value * 100) / 100 + 0.1; // 加0.1 解决最大值没有样式问题
                }

                segements[key] = Number(value.toFixed(2));
            }

            //获取一定量的颜色
            let curentColors = colors;
            curentColors = ColorsPickerUtil.getGradientColors(curentColors, itemNum, 'RANGE');

            for (let index = 0; index < itemNum; index++) {
                if (index in customSettings) {
                    if (customSettings[index]["segment"]["start"]) {
                        segements[index] = customSettings[index]["segment"]["start"];
                    }
                    if (customSettings[index]["segment"]["end"]) {
                        segements[index + 1] = customSettings[index]["segment"]["end"];
                    }
                }
            }
            //生成styleGroup
            let styleGroups = [];
            for (let i = 0; i < itemNum; i++) {
                let color = curentColors[i];
                if (i in customSettings) {
                    if (customSettings[i].color) {
                        color = customSettings[i].color;
                    }
                }
                if (featureType === "LINE") {
                    style.strokeColor = color;
                } else {
                    style.fillColor = color;
                }

                // 转化成 ol 样式
                let olStyle = StyleUtils.toOpenLayersStyle(style, featureType);

                let start = segements[i];
                let end = segements[i + 1];

                styleGroups.push({
                    olStyle: olStyle,
                    color: color,
                    start: start,
                    end: end
                });
            }

            return styleGroups;
        } else {
            return false;
        }
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createMarkerLayer
     * @description 创建标注图层
     * @param {object} layerInfo- 图层信息
     * @param {array} features - 所以的feature集合
     * @returns {*}
     */
    createMarkerLayer(layerInfo, features) {
        features && this.setEachFeatureDefaultStyle(features);
        return new ol.layer.Vector({
            source: new ol.source.Vector({
                features: features,
                wrapX: false
            })
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createDataflowLayer
     * @description 创建数据流图层
     * @param {object} layerInfo- 图层信息
     * @param {number} layerIndex - 图层的zindex
     * @returns {*}
     */
    createDataflowLayer(layerInfo, layerIndex) {
        let layerStyle = layerInfo.pointStyle, style;
        //获取样式
        style = StyleUtils.getOpenlayersStyle(layerStyle, layerInfo.featureType);

        let source = new ol.source.Vector({
            wrapX: false
        }), labelLayer, labelSource, pathLayer, pathSource;
        let layer = new ol.layer.Vector({
            styleOL: style,
            source: source
        });
        if(layerInfo.labelStyle && layerInfo.visible)  {
            //有标签图层
            labelLayer = this.addLabelLayer(layerInfo);
            //和编辑页面保持一致
            labelLayer.setZIndex(1000);
            labelSource = labelLayer.getSource();
        }
        if(layerInfo.lineStyle && layerInfo.visible) {
            pathLayer = this.createVectorLayer({style:layerInfo.lineStyle, featureType:"LINE"});
            pathSource = pathLayer.getSource();
            pathLayer.setZIndex(layerIndex);
            this.map.addLayer(pathLayer);
        }
        let featureCache = {}, labelFeatureCache={}, pathFeatureCache = {}, that = this;
        let jsonsqls = window.jsonsql ? window.jsonsql : jsonsql;
        this.createDataflowService(layerInfo, function (featureCache, labelFeatureCache, pathFeatureCache) {
            return function (feature) {
                that.events.triggerEvent('updateDataflowFeature', {
                    feature: feature,
                    identifyField: layerInfo.identifyField,
                    layerID: layerInfo.layerID
                });
                if(layerInfo.filterCondition) {
                    //过滤条件
                    let condition = that.replaceFilterCharacter(layerInfo.filterCondition);
                    let sql = "select * from json where (" + condition + ")";
                    let filterResult = jsonsqls.query(sql, {
                        attributes: feature.attributes
                    });
                    if (filterResult && filterResult.length > 0) {
                        that.addDataflowFeature(feature, layerInfo.identifyField, {
                            dataflowSource: source,
                            featureCache: featureCache,
                            labelSource: labelSource,
                            labelFeatureCache: labelFeatureCache,
                            pathSource: pathSource,
                            pathFeatureCache: pathFeatureCache,
                            maxPointCount: layerInfo.maxPointCount
                        });
                    }
                } else {
                    that.addDataflowFeature(feature, layerInfo.identifyField, {
                        dataflowSource: source,
                        featureCache: featureCache,
                        labelSource: labelSource,
                        labelFeatureCache: labelFeatureCache,
                        pathSource: pathSource,
                        pathFeatureCache: pathFeatureCache,
                        maxPointCount: layerInfo.maxPointCount
                    });
                }
            }
        }(featureCache, labelFeatureCache, pathFeatureCache));
        this.setFeatureStyle(layer, layerInfo.directionField, layerStyle.type);
        return layer;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.addDataflowFeature
     * @description 添加数据流的feature
     * @param {object} feature - 服务器更新的feature
     * @param {string} identifyField - 标识feature的字段
     * @param {object} options - 其他参数
     */
    addDataflowFeature(feature, identifyField, options) {
        options.dataflowSource && this.addFeatureFromDataflowService(options.dataflowSource, feature, identifyField, options.featureCache);
        options.labelSource && this.addFeatureFromDataflowService(options.labelSource, feature, identifyField, options.labelFeatureCache);
        options.pathSource && this.addPathFeature(options.pathSource, feature, identifyField, options.pathFeatureCache, options.maxPointCount);
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.addPathFeature
     * @description 添加数据流图层中轨迹线的feature
     * @param {object} source - 轨迹线图层的source
     * @param {object} feature - 轨迹线feature
     * @param {string} identifyField - 标识feature的字段
     * @param {object} featureCache - 存储feature
     * @param {number} maxPointCount - 轨迹线最多点个数数量
     */
    addPathFeature(source, feature, identifyField, featureCache, maxPointCount) {
        let coordinates = [];
        var geoID = feature.get(identifyField);
        if(featureCache[geoID]) {
            //加过feautre
            coordinates = featureCache[geoID].getGeometry().getCoordinates();
            coordinates.push(feature.getGeometry().getCoordinates());
            if(maxPointCount && coordinates.length > maxPointCount) {
                coordinates.splice(0, coordinates.length - maxPointCount);
            }
            featureCache[geoID].getGeometry().setCoordinates(coordinates);
        } else {
            coordinates.push(feature.getGeometry().getCoordinates());
            featureCache[geoID] = new ol.Feature({
                geometry: new ol.geom.LineString(coordinates)
            });
            source.addFeature(featureCache[geoID]);
        }
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.setFeatureStyle
     * @description 设置feature样式
     * @param {object} layer - 图层对象
     * @param {string} directionField - 方向字段
     * @param {string} styleType - 样式的类型
     * @returns {*} 图层上feature对应的样式
     */
    setFeatureStyle(layer, directionField, styleType) {
        let layerStyle = layer.get('styleOL');
        layer.setStyle(feature => {
            //有转向字段
            let value, image;
            if(directionField !== undefined && directionField !== "未设置" && directionField !== "None") {
                value = feature.attributes[directionField];
            } else {
                value = 0;  
            }
            if(value > 360 || value < 0) {
                return null;
            }
            if(styleType === "SYMBOL_POINT") {
                image = layerStyle.getText();
            } else {
                image = layerStyle.getImage();
            }
            //默认用户使用的是角度，换算成弧度
            let rotate = (Math.PI * value) / 180;
            image && image.setRotation(rotate);
            return layerStyle;
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createDataflowHeatLayer
     * @description 创建数据流服务的热力图图层
     * @param {object} layerInfo - 图层参数
     * @returns {*} 热力图图层对象
     */
    createDataflowHeatLayer(layerInfo) {
        let source = this.createDataflowHeatSource(layerInfo);
        let layerOptions = {
            source: source
        };
        layerOptions.gradient = layerInfo.themeSetting.colors.slice();
        layerOptions.radius = parseInt(layerInfo.themeSetting.radius);

        if(layerInfo.themeSetting.customSettings){
            let customSettings = layerInfo.themeSetting.customSettings;
            for (let i in customSettings) {
                layerOptions.gradient[i] = customSettings[i];
            }
        }
        return new ol.layer.Heatmap(layerOptions);
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createDataflowHeatSource
     * @description 创建数据流服务的热力图的source
     * @param {object} layerInfo - 图层参数
     * @returns {*} 热力图source对象
     */
    createDataflowHeatSource(layerInfo) {
        let that = this,
            source = new ol.source.Vector({
            wrapX: false
        });
        let jsonsqls = window.jsonsql ? window.jsonsql : jsonsql;
        let featureCache = {};
        this.createDataflowService(layerInfo, function (featureCache) {
            return function (feature) {
                if(layerInfo.filterCondition) {
                    //过滤条件
                    let condition = that.replaceFilterCharacter(layerInfo.filterCondition);
                    let sql = "select * from json where (" + condition + ")";
                    let filterResult = jsonsqls.query(sql, {
                        attributes: feature.attributes
                    });
                    if (filterResult && filterResult.length > 0) {
                        that.addDataflowFeature(feature, layerInfo.identifyField, {
                            dataflowSource: source,
                            featureCache: featureCache
                        });
                    }
                } else {
                    that.addDataflowFeature(feature, layerInfo.identifyField, {
                        dataflowSource: source,
                        featureCache: featureCache
                    });
                }
                // 权重字段恢复
                if(layerInfo.themeSetting.weight){
                    that.changeWeight(source.getFeatures(), layerInfo.themeSetting.weight);
                }
            }
        }(featureCache));
        return source;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.addFeatureFromDataflowService
     * @description 将feature添加到数据流图层
     * @param {object} source - 图层对应的source
     * @param {object} feature - 需要添加到图层的feature
     * @param {object} identifyField - feature的标识字段
     * @param {object} featureCache - 存储已添加到图层的feature对象
     */
    addFeatureFromDataflowService(source, feature, identifyField, featureCache) {
        //判断是否有这个feature，存在feature就更新位置。
        var geoID = feature.get(identifyField);
        if (geoID !== undefined && featureCache[geoID]) {
            /*if(that.addFeatureFinish) {
                //feature全都加上图层，就缩放范围
                MapManager.zoomToExtent(LayerUtil.getBoundsFromFeatures(source.getFeatures()));
                that.addFeatureFinish = false;
            }*/
            featureCache[geoID].setGeometry(feature.getGeometry());
            featureCache[geoID].setProperties(feature.getProperties());
            featureCache[geoID].attributes = feature.attributes;
            source.changed();
        } else {
            source.addFeature(feature);
            featureCache[geoID] = feature;
        }
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createDataflowService
     * @description 将feature添加到数据流图层
     * @param {object} layerInfo - 图层参数
     * @param {object} callback - 回调函数
     */
    createDataflowService(layerInfo, callback) {
        let that = this;
        let dataflowService = new ol.supermap.DataFlowService(layerInfo.wsUrl).initSubscribe();
        dataflowService.on('messageSucceeded', function (e) {
            let geojson = JSON.parse(e.value.data);
            let feature = transformTools.readFeature(geojson, {
                dataProjection: "EPSG:4326", // todo 坐标系
                featureProjection: that.baseProjection || 'EPSG:4326'
            });
            feature.attributes = geojson.properties;
            callback(feature);

        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.setEachFeatureDefaultStyle
     * @description 为标注图层上的feature设置样式
     * @param {array} features - 所以的feature集合
     */
    setEachFeatureDefaultStyle(features) {
        let that = this;
        features = (Util.isArray(features) || features instanceof ol.Collection) ? features : [features];
        features.forEach(function (feature) {
            let geomType = feature.getGeometry().getType().toUpperCase();
            // let styleType = geomType === "POINT" ? 'MARKER' : geomType;
            let defaultStyle = feature.getProperties().useStyle;
            if(defaultStyle) {
                if (geomType === 'POINT' && defaultStyle.text) {
                    //说明是文字的feature类型
                    geomType = "TEXT";
                }
                let featureInfo = this.setFeatureInfo(feature);
                feature.setProperties({
                    useStyle: defaultStyle,
                    featureInfo: featureInfo
                });
                //标注图层的feature上需要存一个layerId，为了之后样式应用到图层上使用
                // feature.layerId = timeId;
                if (geomType === 'POINT' && defaultStyle.src &&
                    defaultStyle.src.indexOf('http://') === -1 && defaultStyle.src.indexOf('https://') === -1) {
                    //说明地址不完整
                    defaultStyle.src = that.server + defaultStyle.src;
                }
            } else {
                defaultStyle = StyleUtils.getMarkerDefaultStyle(geomType, that.server);
            }
            feature.setStyle(StyleUtils.toOpenLayersStyle(defaultStyle, geomType))
        }, this)
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.setFeatureInfo
     * @description 为feature设置属性
     * @param {array} feature - 单个feature
     * @returns {*}
     */
    setFeatureInfo(feature) {
        let featureInfo;
        if (feature.getProperties().featureInfo && feature.getProperties().featureInfo.dataViz_title !== undefined &&
            feature.getProperties().featureInfo.dataViz_title != null) {
            //有featureInfo信息就不需要再添加
            featureInfo = feature.getProperties().featureInfo;
        } else {
            featureInfo = this.getDefaultAttribute();
        }
        let properties = feature.getProperties();
        for (let key in featureInfo) {
            if (properties[key]) {
                featureInfo[key] = properties[key];
                delete properties[key];
            }
        }
        return featureInfo;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createRankSymbolLayer
     * @description 创建等级符号图层
     * @param {object} layerInfo - 图层信息
     * @param {array} features - 添加到图层上的features
     * @returns {*}
     */
    createRankSymbolLayer(layerInfo, features) {
        let styleSource = this.createRankStyleSource(layerInfo, features, layerInfo.featureType);
        let layer = new ol.layer.Vector({
            styleSource,
            source: new ol.source.Vector({
                features: layerInfo.filterCondition ? this.getFiterFeatures(layerInfo.filterCondition, features) : features,
                wrapX: false
            }),
            renderMode: 'image'
        });
        layer.setStyle(feature => {
            let styleSource = layer.get('styleSource');
            let themeField = styleSource.parameters.themeSetting.themeField;
            let value = Number(feature.attributes[themeField]);
            let styleGroups = styleSource.styleGroups;
            for (let i = 0, len = styleGroups.length; i < len; i++) {
                if (value >= styleGroups[i].start && value < styleGroups[i].end) {
                    return styleSource.styleGroups[i].olStyle;
                }
            }
        });
        return layer;
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createRankSymbolLayer
     * @description 创建等级符号图层的source
     * @param {object} parameters - 图层信息
     * @param {array} features - 添加到图层上的features
     * @param {string} featureType - feature的类型
     * @returns {*}
     */
    createRankStyleSource(parameters, features, featureType) {
        let themeSetting = parameters.themeSetting,
            themeField = themeSetting.themeField;
        let styleGroups = this.getRankStyleGroup(themeField, features, parameters, featureType);
        return styleGroups ? { parameters, styleGroups } : false
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getRankStyleGroup
     * @description 获取等级符号的style
     * @param {string} themeField - 分段字段
     * @param {array} features - 添加到图层上的features
     * @param {object} parameters - 图层参数
     * @param {string} featureType - feature的类型
     * @returns {*}
     */
    getRankStyleGroup(themeField, features, parameters, featureType) {
        // 找出所有的单值
        let values = [],
            segements = [],
            style = parameters.style,
            themeSetting = parameters.themeSetting,
            segmentMethod = themeSetting.segmentMethod || this.defaultParameters.themeSetting.segmentMethod,
            segmentCount = themeSetting.segmentCount || this.defaultParameters.themeSetting.segmentCount,
            customSettings = themeSetting.customSettings,
            minR = parameters.themeSetting.minRadius,
            maxR = parameters.themeSetting.maxRadius;
        features.forEach(feature => {
            let attributes = feature.attributes,
                value = attributes[themeField];
            // 过滤掉空值和非数值
            if (value == null || !Util.isNumber(value)) {
                return;
            }
            values.push(Number(value));
        });
        try {
            segements = ArrayStatistic.getArraySegments(values, segmentMethod, segmentCount);
        } catch (error) {
            console.error(error);
        }

        // 处理自定义 分段
        for (let i = 0; i < segmentCount; i++) {
            if (i in customSettings) {
                let startValue = customSettings[i]['segment']['start'],
                    endValue = customSettings[i]['segment']['end'];
                startValue != null && (segements[i] = startValue);
                endValue != null && (segements[i + 1] = endValue);
            }
        }

        //生成styleGroup
        let styleGroup = [];
        if (segements && segements.length) {
            let len = segements.length,
                incrementR = (maxR - minR) / (len - 1), // 半径增量
                start, end, radius = Number(((maxR + minR) / 2).toFixed(2));
            for (let i = 0; i < len - 1; i++) {
                start = Number(segements[i].toFixed(2));
                end =  Number(segements[i + 1].toFixed(2));
                // 这里特殊处理以下分段值相同的情况（即所有字段值相同）
                radius = start === end ? radius : minR + Math.round(incrementR * i);
                // 最后一个分段时将end+0.01，避免取不到最大值
                end = i === len - 2 ? end + 0.01 : end;
                // 处理自定义 半径
                radius = customSettings[i] && customSettings[i].radius ? customSettings[i].radius : radius;
                // 转化成 ol 样式
                style.radius = radius;
                let olStyle = StyleUtils.getOpenlayersStyle(style, featureType, true);
                styleGroup.push({ olStyle: olStyle, radius, start, end });
            }
            return styleGroup;
        } else {
            return false;
        }
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.checkUploadToRelationship
     * @description 检查是否上传到关系型
     * @param {String} fileId - 文件的id
     *  @returns {Promise<T | never>} 关系型文件一些参数
     */
    checkUploadToRelationship(fileId) {
        let url = this.getRequestUrl(`${this.server}web/datas/${fileId}/datasets.json`);
        return FetchRequest.get(url, null, {
            withCredentials: this.withCredentials
        }).then(function (response) {
            return response.json()
        }).then(function (result) {
            return result;
        });
    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getDatasources
     * @description 获取关系型文件发布的数据服务中数据源的名称
     * @param {String} url - 获取数据源信息的url
     *  @returns {Promise<T | never>} 数据源名称
     */
    getDatasources(url) {
        let requestUrl = this.getRequestUrl(`${url}/data/datasources.json`);
        return FetchRequest.get(requestUrl, null, {
            withCredentials: this.withCredentials   
        }).then(function (response) {
            return response.json()
        }).then(function (datasource) {
            let datasourceNames = datasource.datasourceNames;
            return datasourceNames[0];
        });

    }
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getDataService
     * @description 获取上传的数据信息
     * @param {String} fileId - 文件id
     * @param {String} datasetName 数据服务的数据集名称
     *  @returns {Promise<T | never>} 数据的信息
     */
    getDataService(fileId, datasetName) {
        let url = this.getRequestUrl(`${this.server}web/datas/${fileId}.json`);
        return FetchRequest.get(url, null, {
            withCredentials: this.withCredentials
        }).then(function (response) {
            return response.json()
        }).then(function (result) {
            result.fileId = fileId;
            result.datasetName = datasetName;
            return result;
        });
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getRootUrl
     * @description 获取请求地址
     * @returns {Promise<T | never>} 请求地址
     */
    getRequestUrl(url) {
        if(this.credentialValue) {
            //有token之类的配置项
            url = `${url}&${this.credentialKey}=${this.credentialValue}`;
        }
        //如果传入进来的url带了代理则不需要处理
        if(this.excludePortalProxyUrl) {
            return;
        }
        return CommonUtil.isInTheSameDomain(url) ? url : `${this.getProxy()}${encodeURIComponent(url)}`;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getProxy
     * @description 获取代理地址
     * @returns {Promise<T | never>} 代理地址
     */
    getProxy() {
        return this.server + 'apps/viewer/getUrlResource.json?url=';      
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getTileLayerInfo
     * @description 获取地图服务的信息
     * @param {String} url 地图服务的url（没有地图名字）
     * @returns {Promise<T | never>} 地图服务信息
     */
    getTileLayerInfo(url) {
        let that = this, epsgCode = that.baseProjection.split('EPSG:')[1];
        let requestUrl = that.getRequestUrl(`${url}/maps.json`);
        return FetchRequest.get(requestUrl, null, {
            withCredentials: this.withCredentials
        }).then(function (response) {
            return response.json()
        }).then(function (mapInfo) {
            let promises = [];
            if(mapInfo) {
                mapInfo.forEach(function (info) {
                    let mapUrl = that.getRequestUrl(`${info.path}.json?prjCoordSys=${encodeURI(JSON.stringify({ epsgCode: epsgCode }))}`)
                    let promise = FetchRequest.get(mapUrl, null, {
                        withCredentials: that.withCredentials
                    }).then(function (response) {
                        return response.json()
                    }).then(function (restMapInfo) {
                        restMapInfo.url = info.path;
                        return restMapInfo
                    });
                    promises.push(promise);
                });
            }
            return Promise.all(promises).then(function (allRestMaps) {
                return allRestMaps
            })
        });
    }

    /**
     * 通过wkt参数扩展支持多坐标系
     * 
     * @param {String} wkt 字符串
     * @returns {Boolean} 坐标系是否添加成功
     */
    addProjctionFromWKT(wkt){
        if(typeof(wkt) !== 'string'){
            //参数类型错误
            return false;
        }else{
            if(wkt === "EPSG:4326" || wkt === "EPSG:3857"){
                return true;
            }else{
                let epsgCode = this.getEpsgInfoFromWKT(wkt);
                if(epsgCode){
                    proj4.defs(epsgCode, wkt);
                    return true;
                }else{
                    // 参数类型非wkt标准
                    return false;
                }
            }
        }  
    }

    /**
     * 通过wkt参数获取坐标信息
     * 
     * @param {String} wkt 字符串
     * @returns {String} epsg 如："EPSG:4326"
     */
    getEpsgInfoFromWKT(wkt){
        if(typeof(wkt) !== 'string'){
            return false;
        }else if(wkt.indexOf("EPSG") === 0){
            return wkt;
        }else{
            let lastAuthority = wkt.lastIndexOf("AUTHORITY") + 10,
            endString = wkt.indexOf("]",lastAuthority)-1;
            if(lastAuthority >0 && endString >0){
                return `EPSG:${wkt.substring(lastAuthority, endString).split(",")[1].substr(1)}`;
            }else{
                return false;
            }
        }
    }
    
    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createMigrationLayer
     * @description 创建迁徙图
     * @param {Object} layerInfo 图层信息
     * @param {Array} features 要素数组
     * @returns {ol.layer} 图层
     */
    createMigrationLayer(layerInfo, features) {
        // 获取图层外包DOM
        if (!window.ol3Echarts.prototype.getContainer) {
            window.ol3Echarts.prototype.getContainer = function() {
                return this.$container;
            };
        }
        // 设置图层可见性
        if (!window.ol3Echarts.prototype.setVisible) {
            window.ol3Echarts.prototype.setVisible = function(visible) {
                if (visible) {
                    let options = this.get('options');
                    if (options) {
                      this.setChartOptions(options);
                      this.unset('options');
                    }
                } else {
                    let options = this.getChartOptions();
                    this.set('options', options);
                    this.clear();
                    this.setChartOptions({});
                }
            };
        }
        // 设置图层层级
        if (!window.ol3Echarts.prototype.setZIndex) {
            window.ol3Echarts.prototype.setZIndex = function(zIndex) {
                let container = this.getContainer();
                if (container) {
                    container.style.zIndex = zIndex;
                }
            };
        }
        /**
         * 设置鼠标样式
         * .cursor-default > div {
         *     cursor: default !important;
         * }
         */
        if (!window.ol3Echarts.prototype.setCursor) {
            window.ol3Echarts.prototype.setCursor = function(cursor = 'default') {
                let container = this.getContainer();
                if (container && cursor === 'default') {
                    container.classList.add('cursor-default');
                }
            }
        }
        let properties = Util.getFeatureProperties(features);
        let lineData = this.createLinesData(layerInfo, properties);
        let pointData = this.createPointsData(lineData, layerInfo, properties);
        let options = this.createOptions(layerInfo, lineData, pointData);
        let layer = new window.ol3Echarts(options, {
            hideOnMoving: true,
            hideOnZooming: true
        });
        layer.type = 'ECHARTS';
        return layer;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createOptions
     * @description 创建echarts的options
     * @param {Object} layerInfo 图层信息
     * @param {Array} lineData 线数据
     * @param {Array} pointData 点数据
     * @returns {Object} echarts参数
     */
    createOptions(layerInfo, lineData, pointData) {
        let series;
        let lineSeries = this.createLineSeries(layerInfo, lineData);
        if (pointData && pointData.length) {
            let pointSeries = this.createPointSeries(layerInfo, pointData);
            series = lineSeries.concat(pointSeries);
        } else {
            series = lineSeries.slice();
        }
        let options = {
            series
        }
        return options;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createLineSeries
     * @description 创建线系列
     * @param {Object} layerInfo 图层参数
     * @param {Array} lineData 线数据
     * @returns {Object} 线系列
     */
    createLineSeries(layerInfo, lineData) {
        let lineSetting = layerInfo.lineSetting;
        let animationSetting = layerInfo.animationSetting;
        let linesSeries = [
            // 轨迹线样式
            {
                name: 'line-series',
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: animationSetting.show,
                    constantSpeed: animationSetting.constantSpeed,
                    trailLength: 0,
                    symbol: animationSetting.symbol,
                    symbolSize: animationSetting.symbolSize
                },
                lineStyle: {
                    normal: {
                        color: lineSetting.color,
                        type: lineSetting.type,
                        width: lineSetting.width,
                        opacity: lineSetting.opacity,
                        curveness: lineSetting.curveness
                    }
                },
                data: lineData
            }
        ];

        if (lineData.length > MAX_MIGRATION_ANIMATION_COUNT) {
            linesSeries[0].large = true;
            linesSeries[0].largeThreshold = 100;
            linesSeries[0].blendMode = 'lighter';
        }

        return linesSeries;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createPointSeries
     * @description 创建点系列
     * @param {Object} layerInfo 图层参数
     * @param {Array} pointData 点数据
     * @returns {Object} 点系列
     */
    createPointSeries(layerInfo, pointData) {
        let lineSetting = layerInfo.lineSetting;
        let animationSetting = layerInfo.animationSetting;
        let labelSetting = layerInfo.labelSetting;
        let pointSeries = [{
            name: 'point-series',
            coordinateSystem: 'geo',
            zlevel: 2,
            label: {
                normal: {
                    show: labelSetting.show,
                    position: 'right',
                    formatter: '{b}',
                    color: labelSetting.color,
                    fontFamily: labelSetting.fontFamily
                }
            },
            itemStyle: {
                normal: {
                    color: lineSetting.color || labelSetting.color
                }
            },
            data: pointData
        }]

        if (animationSetting.show) {
            // 开启动画
            pointSeries[0].type = 'effectScatter';
            pointSeries[0].rippleEffect = {
                brushType: 'stroke'
            }
        } else {
            // 关闭动画
            pointSeries[0].type = 'scatter';
        }

        return pointSeries;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createPointsData
     * @param {Array} lineData 线数据
     * @param {Object} layerInfo 图层信息
     * @param {Array} properties 属性
     * @returns {Array} 点数据
     */
    createPointsData(lineData, layerInfo, properties) {
        let data = [],
            labelSetting = layerInfo.labelSetting;
        // 标签隐藏则直接返回
        if (!labelSetting.show || !lineData.length) {
            return data;
        }
        let fromData = [], toData = [];
        lineData.forEach((item, idx) => {
            let coords = item.coords,
                fromCoord = coords[0],
                toCoord = coords[1],
                fromProperty = properties[idx][labelSetting.from],
                toProperty = properties[idx][labelSetting.to];
            // 起始字段去重
            let f = fromData.find(d => {
                return d.value[0] === fromCoord[0] && d.value[1] === fromCoord[1]
            });
            !f && fromData.push({
                name: fromProperty,
                value: fromCoord
            })
            // 终点字段去重
            let t = toData.find(d => {
                return d.value[0] === toCoord[0] && d.value[1] === toCoord[1]
            });
            !t && toData.push({
                name: toProperty,
                value: toCoord
            })
        });
        data = fromData.concat(toData);
        return data;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createLinesData
     * @param {Object} layerInfo 图层信息
     * @param {Array} properties 属性
     * @returns {Array} 线数据
     */
    createLinesData(layerInfo, properties) {
        let data = [];
        if (properties && properties.length) {
            // 重新获取数据
            let from = layerInfo.from,
                to = layerInfo.to,
                fromCoord, toCoord;
            if (from.type === 'XY_FIELD' && from['xField'] && from['yField'] && to['xField'] && to['yField']) {
                properties.forEach(property => {
                    let fromX = property[from['xField']],
                        fromY = property[from['yField']],
                        toX = property[to['xField']],
                        toY = property[to['yField']];
                    if (!fromX || !fromY || !toX || !toY) {
                        return;
                    }

                    fromCoord = [property[from['xField']], property[from['yField']]];
                    toCoord = [property[to['xField']], property[to['yField']]];
                    data.push({
                        coords: [fromCoord, toCoord]
                    })
                });
            } else if(from.type === 'PLACE_FIELD' && from['field'] && to['field']) {
                const centerDatas = provincialCenterData.concat(municipalCenterData);
                
                properties.forEach(property => {
                    let fromField = property[from['field']], 
                        toField = property[to['field']];
                    fromCoord = centerDatas.find(item => {
                        return Util.isMatchAdministrativeName(item.name, fromField);
                    })
                    toCoord = centerDatas.find(item => {
                        return Util.isMatchAdministrativeName(item.name, toField);
                    })
                    if (!fromCoord || !toCoord) {
                        return;
                    }
                    data.push({
                        coords: [fromCoord.coord, toCoord.coord]
                    })
                });
            }
        }
        return data;
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getService
     * @description 获取当前数据发布的服务中的某种类型服务
     * @param {Array} services 服务集合
     * @param {String} type 服务类型，RESTDATA, RESTMAP
     * @returns {Object} 服务
     */
    getService(services, type) {
        let service = services.filter((info) => {
            return info && info.serviceType === type;
        });
        return service[0];
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.isMvt
     * @description 判断当前能否使用数据服务的mvt上图方式
     * @param {String} serviceUrl 数据服务的地址
     * @param {String} datasetName 数据服务的数据集名称
     * @returns {Object} 数据服务的信息
     */
    isMvt(serviceUrl, datasetName) {
        let that = this;
        return this.getDatasetsInfo(serviceUrl, datasetName).then((info) => {
            //判断是否和底图坐标系一直
            if(info.epsgCode == that.baseProjection.split('EPSG:')[1]) {
                return FetchRequest.get(that.getRequestUrl(`${info.url}/tilefeature.mvt`), null, {
                    withCredentials: that.withCredentials      
                }).then(function (response) {
                    return response.json()
                }).then(function (result) {
                    info.isMvt = result.error && result.error.code === 400;
                    return info;
                }).catch(() => {
                    return info; 
                });   
            }
            return info;
        })   
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getDatasetsInfo
     * @description 获取数据集信息
     * @param {String} serviceUrl 数据服务的地址
     * @param {String} datasetName 数据服务的数据集名称
     * @returns {Object} 数据服务的信息
     */
    getDatasetsInfo(serviceUrl, datasetName) {
        let that = this;
        return that.getDatasources(serviceUrl).then(function(datasourceName) {
          //判断mvt服务是否可用 
          let url = `${serviceUrl}/data/datasources/${datasourceName}/datasets/${datasetName}.json`;  
          return FetchRequest.get(that.getRequestUrl(url), null, {
            withCredentials: that.withCredentials       
          }).then(function (response) {
                return response.json()
          }).then(function (datasetsInfo) {
                return {
                    epsgCode: datasetsInfo.datasetInfo.prjCoordSys.epsgCode,   
                    bounds: datasetsInfo.datasetInfo.bounds,  
                    url //返回的是原始url，没有代理。因为用于请求mvt
                };
          });
      })
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getMBStyle
     * @description 生成图层信息
     * @param {object} mapInfo - 地图信息
     */
    getMBStyle(mapInfo) {
        let baseLayer = mapInfo.baseLayer,
            url = baseLayer.dataSource.url,
            layerInfo = {};
        return FetchRequest.get(this.getRequestUrl(url)).then(result => {
            return result.json();
        }).then(styles => {
            let extent = styles.metadata.mapbounds;
            baseLayer.extent = extent; // 这里把extent保存一下

            layerInfo.projection = mapInfo.projection,
            layerInfo.epsgCode = mapInfo.projection,
            layerInfo.visible = baseLayer.visible,
            layerInfo.name = baseLayer.name,
            layerInfo.url = url,
            layerInfo.sourceType = 'VECTOR_TILE',
            layerInfo.layerType = 'VECTOR_TILE',
            layerInfo.styles = styles,
            layerInfo.extent = extent,
            layerInfo.bounds = {
                bottom: extent[1],
                left: extent[0],
                leftBottom: { x: extent[0], y: extent[1] },
                right: extent[2],
                rightTop: { x: extent[2], y: extent[3] },
                top: extent[3]
            }
            return layerInfo;
        })
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createMVTLayer
     * @description 创建矢量瓦片图层
     * @param {object} mapInfo - 图层信息
     */
    createMVTLayer(layerInfo) {
        let styles = layerInfo.styles;
        let resolutions = this.getMVTResolutions(layerInfo.bounds);
        // 创建MapBoxStyle样式
        let mapboxStyles = new ol.supermap.MapboxStyles({
            style: styles,
            source: styles.name,
            resolutions,
            map: this.map
        });
        return new Promise((resolve) => {
            mapboxStyles.on('styleloaded', function () {
                let key = Object.keys(styles.sources)[0] || mapboxStyles.name;
                let url = styles.sources[key].tiles[0];
                let layer = new ol.layer.VectorTile({
                    //设置避让参数
                    declutter: true,
                    source: new ol.source.VectorTile({
                        url,
                        projection: layerInfo.projection,
                        format: new ol.format.MVT({
                            featureClass: ol.Feature
                        }),
                        wrapX: false
                    }),
                    style: mapboxStyles.featureStyleFuntion,
                    visible: layerInfo.visible
                });
                resolve(layer);
            })
        })
    }

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.getMVTResolutions
     * @description 创建矢量瓦片图层
     * @param {array} extent - 瓦片范围
     * @param {number} numbers - 缩放层级数
     */
    getMVTResolutions(extent, numbers = 22) {
        let { left, right, top, bottom } = extent;
        let dx = right - left;
        let dy = top - bottom;
        let calcArgs = dx - dy > 0 ? dx : dy;
        let resolutions = [calcArgs / 512];
        for (let i = 1; i < numbers; i++) {
            resolutions.push(resolutions[i - 1] / 2)
        }
        return resolutions;
    }
}

ol.supermap.WebMap = WebMap;