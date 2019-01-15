/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import {
    FetchRequest, CommonUtil, StringExt, FilterParameter,
    GetFeaturesBySQLParameters,
    GetFeaturesBySQLService,
    QueryBySQLParameters,
    QueryOption,
    Lang,
    ArrayStatistic,
    ColorsPickerUtil
} from '@supermap/iclient-common';
import { Util } from '../core/Util';
import convert from 'xml-js';
import canvg from 'canvg';
import jsonsql from 'jsonsql';

mapboxgl.supermap = mapboxgl.supermap || {};

const MB_SCALEDENOMINATOR_3857 = ['559082264.0287178', '279541132.0143589', '139770566.0071794', '69885283.00358972',
    '34942641.50179486', '17471320.75089743', '8735660.375448715', '4367830.1877224357', '2183915.093862179', '1091957.546931089',
    '545978.7734655447', '272989.7734655447', '272989.3867327723', '136494.6933663862', '68247.34668319309', '34123.67334159654',
    '17061.83667079827', '8530.918335399136', '4265.459167699568', '2132.729583849784'];
const MB_SCALEDENOMINATOR_4326 = [
    '5.590822640287176E8', '2.795411320143588E8', '1.397705660071794E8', '6.98852830035897E7', '3.494264150179485E7',
    '1.7471320750897426E7', '8735660.375448713', '4367830.187724357', '2183915.0938621783', '1091957.5469310891',
    '545978.7734655446', '272989.3867327723', '136494.69336638614', '68247.34668319307', '34123.673341596535',
    '17061.836670798268', '8530.918335399134']
const DEFAULT_WELLKNOWNSCALESET = ['GoogleCRS84Quad', 'GoogleMapsCompatible'];

/**
 * @class mapboxgl.supermap.WebMap
 * @category  iPortal/Online
 * @classdesc 对接 iPortal/Online 地图类。目前支持地图坐标系包括：'EPSG:3857'，'EPSG:4326'，'EPSG:4490'，'EPSG:4214'，'EPSG:4610'。
 * <div style="padding: 20px;border: 1px solid #eee;border-left-width: 5px;border-radius: 3px;border-left-color: #ce4844;">
 *      <p style="color: #ce4844">Notice</p>
 *      <p style="font-size: 13px">该功能依赖 <a href='http://iclient.supermap.io/web/libs/geostats/geostats.js'>geostats</a> 插件，请确认引入该插件。</p>
 *      `<script type="text/javascript" src="http://iclient.supermap.io/web/libs/geostats/geostats.js"></script>`
 * </div>
 * @param {number} id - iPortal|Online 地图 ID。
 * @param {Object} options - 参数。
 * @param {string} [options.target='map'] - 地图容器 ID。
 * @param {string} [options.server="http://www.supermapol.com"] - 地图的地址。
 * @param {string} [options.credentialKey] - 凭证密钥。
 * @param {string} [options.credentialValue] - 凭证值。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.excludePortalProxyUrl] - server 传递过来的 URL 是否带有代理。
 * @fires mapboxgl.supermap.WebMap#getmapfailed
 * @fires mapboxgl.supermap.WebMap#getwmtsfailed
 * @fires mapboxgl.supermap.WebMap#getlayersfailed
 * @fires mapboxgl.supermap.WebMap#getfeaturesfailed
 * @fires mapboxgl.supermap.WebMap#addlayerssucceeded
 * @extends {mapboxgl.Evented}
 */
export class WebMap extends mapboxgl.Evented {

    constructor(id, options) {
        super();
        this.mapId = id;
        options = options || {};
        this.server = options.server || 'http://www.supermapol.com';
        this.credentialKey = options.credentialKey;
        this.credentialValue = options.credentialValue;
        this.withCredentials = options.withCredentials || false;
        this.target = options.target || "map";
        this._createWebMap();
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._createWebMap
     * @description 登陆窗口后添加地图图层。
     */
    _createWebMap() {
        let urlArr = this.server.split('');
        if (urlArr[urlArr.length - 1] !== '/') {
            this.server += '/';
        }
        let mapUrl = this.server + 'web/maps/' + this.mapId + '/map';
        if (this.credentialValue && this.credentialKey) {
            mapUrl += ('?' + this.credentialKey + '=' + this.credentialValue);
        }
        let filter = 'getUrlResource.json?url=';
        if (this.excludePortalProxyUrl && this.server.indexOf(filter) > -1) {
            //大屏需求,或者有加上代理的
            let urlArray = this.server.split(filter);
            if (urlArray.length > 1) {
                mapUrl = urlArray[0] + filter + this.server + 'web/maps/' + this.mapId + '/map.json';
            }
        }
        this._getMapInfo(mapUrl);
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._createMap
     * @description 创建地图。
     */
    _createMap(mapInfo) {
        // 获取字体样式
        let fonts = [];
        let layers = mapInfo.layers;
        // 获取 label 图层字体类型
        if (layers && layers.length > 0) {
            layers.forEach((layer) => {
                layer.labelStyle && fonts.push(layer.labelStyle.fontFamily);
            }, this)
        }
        fonts.push("'supermapol-icons'")
        let fontFamilys = fonts.join(',')

        // zoom center
        let oldcenter = mapInfo.center, zoom = mapInfo.level || 0, center;
        zoom = zoom === 0 ? 0 : zoom - 1
        center = oldcenter ? this._unproject([oldcenter.x, oldcenter.y]) : new mapboxgl.LngLat(0, 0);
        // 初始化 map
        this.map = new mapboxgl.Map({
            container: this.target,
            center: center,
            zoom: zoom,
            style: {
                'version': 8,
                'sources': {},
                // "glyphs": 'http://iclsvr.supermap.io/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature/sdffonts/{fontstack}/{range}.pbf',
                'layers': []
            },
            crs: this.baseProjection,
            localIdeographFontFamily: fontFamilys || ''
        });
        this.fire('mapinitialized');
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._getMapInfo
     * @description 获取地图的 JSON 信息。
     * @param {string} url - 请求地图的 url。
     */
    _getMapInfo(url) {
        let mapUrl = url.indexOf('.json') === -1 ? `${url}.json` : url;
        FetchRequest.get(mapUrl, null, { withCredentials: this.withCredentials }).then(response => {
            return response.json();
        }).then(mapInfo => {
            this.baseProjection = mapInfo.projection;

            //存储地图的名称以及描述等信息，返回给用户
            this.mapParams = {
                title: mapInfo.title,
                description: mapInfo.description
            };
            const projectionMap = { 'EPSG:4490': 'EPSG:4490', 'EPSG:4214': 'EPSG:4214', 'EPSG:4610': 'EPSG:4610', 'EPSG:3857': 'EPSG:3857', 'EPSG:4326': 'EPSG:4326' } // 坐标系异常处理 
            if (this.baseProjection in projectionMap) {
                this._createMap(mapInfo, this.mapSetting);
                let layers = mapInfo.layers;
                this.map.on('load', () => {
                    this._addBaseMap(mapInfo);

                    if (!layers || layers.length === 0) {
                        this._sendMapToUser(0, 0);
                    } else {
                        this._addLayers(layers);
                    }
                })
            } else {
                throw Error(Lang.i18n('msg_crsunsupport'));
            }

        }).catch(error => {
            /**
             * @event mapboxgl.supermap.WebMap#getmapfailed
             * @description 获取地图信息失败。
             * @property {Object} error - 失败原因。
             */
            this.fire('getmapfailed', { 'error': error });
        });
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._addBaseMap
     * @description 添加底图。
     * @param {Object} mapInfo - map 信息。
     */
    _addBaseMap(mapInfo) {
        this._createBaseLayer(mapInfo)
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._createBaseLayer
     * @description 创建底图。
     * @param {Object} mapInfo - map 信息。
     */
    _createBaseLayer(mapInfo) {
        let layerInfo = mapInfo.baseLayer || mapInfo;
        let layerType = layerInfo.layerType; //底图和rest地图兼容
        if (layerType.indexOf('TIANDITU_VEC') > -1 || layerType.indexOf('TIANDITU_IMG') > -1
            || layerType.indexOf('TIANDITU_TER') > -1) {
            layerType = layerType.substr(0, 12);
        }
        let mapUrls = {
            CLOUD: 'http://t2.supermapcloud.com/FileService/image?map=quanguo&type=web&x={x}&y={y}&z={z}',
            CLOUD_BLACK: 'http://t3.supermapcloud.com/MapService/getGdp?x={x}&y={y}&z={z}',
            OSM: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            GOOGLE: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0',
            GOOGLE_CN: 'https://mt{0-3}.google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
            JAPAN_STD: 'http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
            JAPAN_PALE: 'http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
            JAPAN_RELIEF: 'http://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png',
            JAPAN_ORT: 'http://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg'
        }, url;
        switch (layerType) {
            case "TIANDITU_VEC":
            case "TIANDITU_IMG":
            case "TIANDITU_TER":
                this._createTiandituLayer(mapInfo);
                break;
            case 'BING':
                this._createBingLayer(layerInfo.name);
                break;
            case "WMS":
                this._createWMSLayer(layerInfo);
                break;
            case "WMTS":
                this._createWMTSLayer(layerInfo);
                break;
            case 'TILE':
            case 'SUPERMAP_REST':
                this._createDynamicTiledLayer(layerInfo);
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
                url = mapUrls[layerType];
                this._createXYZLayer(layerInfo, url);
                break;
            default:
                break;
        }
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._createTiandituLayer
     * @description 创建天地图底图。
     * @param {Object} mapInfo - map 信息。
     */
    _createTiandituLayer(mapInfo) {
        let tiandituUrls = this._getTiandituUrl(mapInfo);
        let layerType = mapInfo.baseLayer.layerType;
        let isLabel = Boolean(mapInfo.baseLayer.labelLayerVisible);
        let labelUrl = tiandituUrls['labelUrl'];
        let tiandituUrl = tiandituUrls['tiandituUrl'];
        this._addBaselayer(tiandituUrl, 'tianditu-layers-' + layerType)
        isLabel && this._addBaselayer([labelUrl], 'tianditu-label-layers-' + layerType)
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._createWMTSLayer
     * @description 创建 WMTS 底图。
     * @param {Object} mapInfo - map 信息。
     */
    _createWMTSLayer(layerInfo) {
        let wmtsUrl = this._getWMTSUrl(layerInfo);
        this._filterWMTSIsMatched(layerInfo, (isMatched, matchMaxZoom) => {
            isMatched && this._addBaselayer([wmtsUrl], 'wmts-layers' + layerInfo.name, 0, matchMaxZoom)
        })
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._filterWMTSIsMatched
     * @description 过滤能够跟mapboxgl匹配的wmts服务。
     * @param {Object} mapInfo - map 信息。
     * @callback matchedCallback
     */
    _filterWMTSIsMatched(mapInfo, matchedCallback) {
        let isMatched = false,
            matchMaxZoom = 22,
            url = mapInfo.url;
        let options = {
            withCredentials: false,
            withoutFormatSuffix: true
        };

        FetchRequest.get(url, null, options).then((response) => {
            return response.text();
        }).then((capabilitiesText) => {
            let converts = convert ? convert : window.convert;
            let tileMatrixSet = JSON.parse(converts.xml2json(capabilitiesText, { compact: true, spaces: 4 })).Capabilities.Contents.TileMatrixSet;
            for (let i = 0; i < tileMatrixSet.length; i++) {
                if (tileMatrixSet[i]['ows:Identifier'] && tileMatrixSet[i]['ows:Identifier']['_text'] === mapInfo.tileMatrixSet) {
                    if (DEFAULT_WELLKNOWNSCALESET.includes(tileMatrixSet[i]['WellKnownScaleSet']['_text'])) {
                        isMatched = true;
                    } else if (tileMatrixSet[i]['WellKnownScaleSet'] && tileMatrixSet[i]['WellKnownScaleSet']['_text'] === 'Custom') {
                        let matchedScaleDenominator = [];
                        //坐标系判断
                        let defaultCRSScaleDenominators = this.map.crs === 'EPSG:3857' ? MB_SCALEDENOMINATOR_3857 : MB_SCALEDENOMINATOR_4326;

                        for (let j = 0, len = defaultCRSScaleDenominators.length; j < len; j++) {
                            if (!tileMatrixSet[i].TileMatrix[j]) {
                                break;
                            }
                            if (defaultCRSScaleDenominators[j] !== tileMatrixSet[i].TileMatrix[j]['ScaleDenominator']['_text']) {
                                break;
                            }
                            matchedScaleDenominator.push(defaultCRSScaleDenominators[j]);
                        }
                        matchMaxZoom = matchedScaleDenominator.length - 1;
                        if (matchedScaleDenominator.length !== 0) {
                            isMatched = true;
                        } else {
                            throw Error(Lang.i18n('msg_tilematrixsetunsupport'))

                        }
                    } else {
                        throw Error(Lang.i18n('msg_tilematrixsetunsupport'))

                    }
                }
            }
            matchedCallback(isMatched, matchMaxZoom);
        }).catch((error) => {
            /**
             * @event mapboxgl.supermap.WebMap#getwmtsfailed
             * @description 获取 WMTS 图层信息失败。
             * @property {Object} error - 失败原因。
             * @property {mapboxgl.Map} map - MapBoxGL Map 对象。
             */
            this.fire('getwmtsfailed', { 'error': error, 'map': this.map });
        });
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._createBingLayer
     * @description 创建 Bing 图层。
     */
    _createBingLayer(layerName) {
        let bingUrl = 'http://dynamic.t0.tiles.ditu.live.com/comp/ch/{quadkey}?it=G,TW,L,LA&mkt=zh-cn&og=109&cstl=w4c&ur=CN&n=z';
        this.addLayer([bingUrl], 'bing-layers-' + layerName)
    }

    /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._createXYZLayer
    * @description 创建 XYZ 底图。
    * @param {String} url - url 地址。
    */
    _createXYZLayer(layerInfo, url) {
        let urlArr = []
        if (layerInfo.layerType === 'OSM') {
            let res = url.match(/\w\-\w/g)[0];
            let start = res[0];
            let end = res[2];
            let alphabet = ""
            for (let i = 97; i < 123; i++) {
                alphabet += String.fromCharCode(i);
            }
            let alphabetArr = alphabet.split("");

            let startIndex = alphabetArr.indexOf(start);
            let endIndex = alphabetArr.indexOf(end);

            let res3 = alphabetArr.slice(startIndex, endIndex + 1);

            for (let i = 0; i < res3.length; i++) {
                let replaceRes = url.replace(/{\w\-\w}/g, res3[i]);
                urlArr.push(replaceRes);
            }

        } else if (layerInfo.layerType === 'GOOGLE_CN') {
            let res = url.match(/\d\-\d/g)[0];
            let start = res[0];
            let end = res[2];

            for (let i = start; i <= end; i++) {
                let replaceRes = url.replace(/{\d\-\d}/g, i);
                urlArr.push(replaceRes);
            }
        } else {
            urlArr = [url];
        }
        this._addBaselayer(urlArr, 'XYZ-layers-' + layerInfo.name);
    }

    /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._createDynamicTiledLayer
    * @description 创建 iserver 底图。
    * @param {Object} layerInfo - 图层信息。
    */
    _createDynamicTiledLayer(layerInfo) {
        let url = layerInfo.url + '/zxyTileImage.png?z={z}&x={x}&y={y}';
        this._addBaselayer([url], 'tile-layers-' + layerInfo.name);
    }

    /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._createWMSLayer
    * @description 创建 WMS 图层。
    * @param {Object} mapInfo - map 信息。
    */
    _createWMSLayer(layerInfo) {
        let WMSUrl = this._getWMSUrl(layerInfo);
        this._addBaselayer([WMSUrl], 'WMS-layers-' + layerInfo.name);
    }

    /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._createVectorLayer
    * @description 创建 Vector 图层。
    * @param {Object} layerInfo - map 信息。
    * @param {Array} features - 属性 信息。
    */
    _createVectorLayer(layerInfo, features) {
        let style = layerInfo.style;
        let type = layerInfo.featureType;
        let layerID = layerInfo.layerID;
        let visible = layerInfo.visible;
        let layerStyle = {};
        layerStyle.style = this._transformStyleToMapBoxGl(style, type)
        layerStyle.layout = { 'visibility': visible }
        let source = {
            'type': 'geojson',
            'data': {
                "type": "FeatureCollection",
                "features": features
            }
        };
        this._addOverlayToMap(type, source, layerID, layerStyle)
        // 如果面有边框
        type === 'POLYGON' && style.strokeColor && this._addStrokeLineForPoly(style, source, layerID + '-strokeLine', visible);
    }

    /**
     * @function mapboxgl.supermap.WebMap.prototype._getTiandituUrl
     * @private
     * @description 创建天地图url;
     * @param {Object} mapInfo - map 信息。
     */
    _getTiandituUrl(mapInfo) {
        let re = /t0/gi;
        let tiandituUrls = {};
        let layerType = mapInfo.baseLayer.layerType.split('_')[1].toLowerCase();
        let isLabel = Boolean(mapInfo.baseLayer.labelLayerVisible);
        // let isLabel = true;
        let url = "http://t0.tianditu.com/{layer}_{proj}/wmts?";
        let labelUrl = url;
        let layerLabelMap = {
            "vec": "cva",
            "ter": "cta",
            "img": "cia"
        }
        let tilematrixSet = this.baseProjection === "EPSG:4326" ? "c" : "w";
        let options = {
            service: 'WMTS',
            request: 'GetTile',
            style: "default",
            version: '1.0.0',
            layer: layerType,
            tilematrixSet: tilematrixSet,
            format: "tiles",
            width: 256,
            height: 256
        }

        url += this._getParamString(options, url) + '&tilematrix={z}&tilerow={y}&tilecol={x}';
        let tiandituUrl = url.replace("{layer}", layerType).replace("{proj}", tilematrixSet);
        let tiandituUrlArr = [];
        for (let i = 0; i < 8; i++) {
            tiandituUrlArr.push(tiandituUrl.replace(re, `t${i}`));
        }
        tiandituUrls['tiandituUrl'] = tiandituUrlArr;

        // 如果有 label 图层
        if (isLabel) {
            let labelLayer = layerLabelMap[layerType];
            options.layer = labelLayer;
            labelUrl += this._getParamString(options, labelUrl) + '&tilematrix={z}&tilerow={y}&tilecol={x}';
            labelUrl = labelUrl.replace("{layer}", labelLayer).replace("{proj}", tilematrixSet);
            let labelUrlArr = [];
            for (let i = 0; i < 8; i++) {
                labelUrlArr.push(labelUrl.replace(re, `t${i}`));
            }
            tiandituUrls['labelUrl'] = labelUrlArr;
        }

        return tiandituUrls;
    }

    /**
     * @function mapboxgl.supermap.WebMap.prototype._getWMSUrl
     * @private
     * @description 创建 WMS url;
     * @param {Object} mapInfo - map 信息。
     */
    _getWMSUrl(mapInfo) {
        let url = mapInfo.url;
        url = url.split('?')[0];
        let strArr = url.split('/');
        let options = {
            service: 'WMS',
            request: 'GetMap',
            layers: strArr[strArr.length - 1],
            styles: "",
            format: "image/png",
            transparent: 'true',
            version: '1.1.1',
            width: 256,
            height: 256,
            srs: this.baseProjection
        }
        let bbox = this.baseProjection === "EPSG:4326" ? '{bbox-epsg-4326}' : '{bbox-epsg-3857}';
        url += this._getParamString(options, url) + `&bbox=${bbox}`;
        return url;
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._addLayers
     * @description 添加叠加图层。
     * @param {Object} mapInfo - 图层信息。
     */
    _addLayers(layers) {
        //存储地图上所有的图层对象
        this.layers = layers;

        let features, layerAdded = 0, len = layers.length;
        layers.forEach((layer, index) => {
            if ((layer.dataSource && layer.dataSource.serverId) || layer.layerType === "MARKER") {
                // 获取 serverID
                let serverId = layer.dataSource ? layer.dataSource.serverId : layer.serverId;
                let url = `${this.server}web/datas/${serverId}/content.json?pageSize=9999999&currentPage=1`;
                // 获取图层数据
                serverId && FetchRequest.get(url, null, { withCredentials: this.withCredentials }).then(response => {
                    return response.json()
                }).then(data => {
                    if (data.succeed === false) {
                        //请求失败
                        layerAdded++;
                        this._sendMapToUser(layerAdded, len);
                        /**
                        * @event mapboxgl.supermap.WebMap#getlayersfailed
                        * @description 获取图层信息失败。
                        * @property {Object} error - 失败原因。
                        * @property {mapboxgl.Map} map - MapBoxGL Map 对象。
                        */
                        this.fire('getlayersfailed', { 'error': data.error, 'map': this.map });
                        return;
                    }
                    if (data.type) {
                        if (data.type === "JSON" || data.type === "GEOJSON") {
                            data.content = JSON.parse(data.content.trim());
                            features = this._formatGeoJSON(data.content, layer);
                        } else if (data.type === 'EXCEL' || data.type === 'CSV') {
                            features = this._excelData2Feature(data.content, layer);
                        }
                        this._addLayer(layer, features, index);
                        layerAdded++;
                        this._sendMapToUser(layerAdded, len);
                    }
                }).catch((error) => {
                    layerAdded++;
                    this._sendMapToUser(layerAdded, len);
                    this.fire('getlayersfailed', { 'error': error, 'map': this.map });
                })
            } else if (layer.layerType === 'SUPERMAP_REST' || layer.layerType === "TILE" || layer.layerType === "WMS" || layer.layerType === "WMTS") {
                this._createBaseLayer(layer);
                layerAdded++;
                this._sendMapToUser(layerAdded, len);
            } else if (layer.dataSource && layer.dataSource.type === "REST_DATA") {
                let dataSource = layer.dataSource;
                //从restData获取数据
                this._getFeatureBySQL(dataSource.url, [dataSource.dataSourseName || layer.name], (result) => {
                    features = this._parseGeoJsonData2Feature({
                        allDatas: { features: result.result.features.features },
                        fileCode: layer.projection,
                        featureProjection: this.baseProjection
                    });

                    this._addLayer(layer, features, index);
                    layerAdded++;
                    this._sendMapToUser(layerAdded, len);
                }, (err) => {
                    layerAdded++;
                    this._sendMapToUser(layerAdded, len);
                    /**
                    * @event mapboxgl.supermap.WebMap#getfeaturesfailed
                    * @description 获取图层要素失败。
                    * @property {Object} error - 失败原因。
                    */
                    this.fire('getfeaturesfailed', { 'error': err });
                });
            } else if (layer.dataSource && layer.dataSource.type === "REST_MAP" && layer.dataSource.url) {
                this._queryFeatureBySQL(layer.dataSource.url, layer.dataSource.layerName, 'smid=1', null, null, (result) => {
                    let recordsets = result && result.result.recordsets;
                    let recordset = recordsets && recordsets[0];
                    let attributes = recordset.fields;
                    if (recordset && attributes) {
                        let fileterAttrs = [];
                        for (let i in attributes) {
                            let value = attributes[i];
                            if (value.indexOf('Sm') !== 0 || value === "SmID") {
                                fileterAttrs.push(value);
                            }
                        }
                        this._getFeatures(fileterAttrs, layer, (features) => {
                            this._addLayer(layer, features, index);
                            layerAdded++;
                            this._sendMapToUser(layerAdded, len);
                        }, err => {
                            layerAdded++;
                            this.fire('getfeaturesfailed', { 'error': err, 'map': this.map })
                        });
                    }
                }, (err) => {
                    this.fire('getlayersfailed', { 'error': err, 'map': this.map });
                })
            }
        }, this);
    }
    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._getFeatures
     * @description 将单个图层添加到地图上。
     * @param layerInfo  某个图层的图层信息
     * @param {Array.<GeoJSON>} features - feature。
     */
    _getFeatures(fields, layerInfo, resolve, reject) {
        let source = layerInfo.dataSource;
        //示例数据
        let fileCode = layerInfo.projection;
        this._queryFeatureBySQL(source.url, source.layerName, null, fields, null, (result) => {
            let recordsets = result.result.recordsets[0];
            let features = recordsets.features.features;

            let featuresObj = this._parseGeoJsonData2Feature({
                allDatas: { features },
                fileCode: fileCode,
                featureProjection: this.baseProjection
            }, 'JSON');
            resolve(featuresObj);
        }, (err) => {
            reject(err);
        });
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._addLayer
     * @description 将单个图层添加到地图上。
     * @param layerInfo  某个图层的图层信息
     * @param {Array.<GeoJSON>} features - feature。
     */
    _addLayer(layerInfo, features, index) {
        let layerType = layerInfo.layerType;
        layerInfo.layerID = layerType + '-' + layerInfo.name + '-' + index;
        layerInfo.visible = layerInfo.visible ? 'visible' : 'none';
        // mbgl 目前不能处理 geojson 复杂面情况
        // mbgl isssue https://github.com/mapbox/mapbox-gl-js/issues/7023
        if (features[0] && features[0].geometry.type === 'Polygon') {
            features = this._handleMultyPolygon(features);
        }

        if (layerInfo.style && layerInfo.filterCondition) {
            //将 feature 根据过滤条件进行过滤, 分段专题图和单值专题图因为要计算 styleGroup 所以暂时不过滤
            if (layerType !== "RANGE" && layerType !== "UNIQUE") {
                features = this._getFiterFeatures(layerInfo.filterCondition, features);
            }
        }

        if (layerType === "VECTOR") {
            if (layerInfo.featureType === "POINT") {
                if (layerInfo.style.type === 'SYMBOL_POINT') {
                    this._createSymbolLayer(layerInfo, features);
                } else {
                    this._createGraphicLayer(layerInfo, features);
                }
            } else {
                //线和面
                this._createVectorLayer(layerInfo, features)
            }
        } else if (layerType === "UNIQUE") {
            this._createUniqueLayer(layerInfo, features);
        } else if (layerType === "RANGE") {
            this._createRangeLayer(layerInfo, features);
        } else if (layerType === "HEAT") {
            this._createHeatLayer(layerInfo, features);
        } else if (layerType === "MARKER") {
            this._createMarkerLayer(layerInfo, features)
        }
        if (layerInfo.labelStyle && layerInfo.labelStyle.labelField) {
            // 存在标签专题图
            this._addLabelLayer(layerInfo, features);
        }
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._addLabelLayer
     * @description 添加标签图层。
     * @param layerInfo  某个图层的图层信息。
     * @param {Array.<GeoJSON>} features - feature。
     */
    _addLabelLayer(layerInfo, features) {
        let labelStyle = layerInfo.labelStyle;
        
        this.map.addLayer({
            "id": layerInfo.layerID + 'label',
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": features
                }
            },
            "paint": {
                'text-color': labelStyle.fill
            },
            "layout": {
                "text-field": `{${labelStyle.labelField}}`,
                'text-size': parseFloat(labelStyle.fontSize) || 12,
                'text-offset': labelStyle.offsetX ? [labelStyle.offsetX / 10 || 0, labelStyle.offsetY / 10 || 0] : [0,-1.5],
                'text-font': ["DIN Offc Pro Italic", "Arial Unicode MS Regular"],
                'visibility': layerInfo.visible
            }
        });
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._createSymbolLayer
     * @description 添加 symbol 图层。
     * @param layerInfo  某个图层的图层信息。
     * @param {Array.<GeoJSON>} features - feature。
     */
    _createSymbolLayer(layerInfo, features) {
        //用来请求symbol_point字体文件
        let target = document.getElementById(`${this.target}`);
        target.classList.add('supermapol-icons-map');

        let style = layerInfo.style;
        let unicode = layerInfo.style.unicode;
        let text = String.fromCharCode(parseInt(unicode.replace(/^&#x/, ''), 16));
        let layerID = layerInfo.layerID;
        this.map.addSource(layerID + '-source', {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": []
            }
        });
        this.map.addLayer({
            "id": layerID,
            "type": "symbol",
            "source": layerID + '-source',
            "paint": {
                "text-color": style.fillColor
            },
            "layout": {
                "text-field": text,
                'text-font': ["DIN Offc Pro Italic", "Arial Unicode MS Regular"],
                'visibility': layerInfo.visible
            }
        });
        this.map.getSource(layerID + '-source').setData({
            "type": "FeatureCollection",
            "features": features
        });

    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._createGraphicLayer
     * @description 创建 Graphic 图层。
     * @param {Object} layerInfo - map 信息。
     * @param {Array} features - 属性 信息。
    */
    _createGraphicLayer(layerInfo, features) {
        let style = layerInfo.style;
        let layerStyle = {};
        let layerID = layerInfo.layerID;
        let source = {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": features
            }
        }

        if (style.type === "IMAGE_POINT") {
            let imageInfo = style.imageInfo;
            let imgDom = imageInfo.img;
            if (!imgDom || !imgDom.src) {
                //要组装成完整的url
                imageInfo.url = this.server + imageInfo.url;
            }
            this.map.loadImage(imageInfo.url || imgDom.src, (error, image) => {
                if (error) { console.log(error) }
                let iconSize = Number.parseFloat((style.radius / image.height).toFixed(2)) * 2;
                this.map.addImage('imageIcon', image);
                this.map.addLayer({
                    "id": layerID,
                    "type": "symbol",
                    "source": source,
                    "layout": {
                        "icon-image": "imageIcon",
                        'icon-size': iconSize,
                        'visibility': layerInfo.visible
                    }
                });
            });
        } else if (style.type === "SVG_POINT") {
            let svg_url = style.url;
            if (!this.svgDiv) {
                this.svgDiv = document.createElement('div');
                document.body.appendChild(this.svgDiv);
            }
            this._getCanvasFromSVG(svg_url, this.svgDiv, (canvas) => {
                let imgUrl = canvas.toDataURL("img/png");
                imgUrl && this.map.loadImage(imgUrl, (error, image) => {
                    if (error) { console.log(error) }
                    let iconSize = Number.parseFloat((style.radius / canvas.width).toFixed(2));
                    this.map.addImage('imageIcon', image);
                    this.map.addLayer({
                        "id": layerID,
                        "type": "symbol",
                        "source": source,
                        "layout": {
                            "icon-image": 'imageIcon',
                            'icon-size': iconSize,
                            'visibility': layerInfo.visible
                        }
                    });
                }, this);
            });
        } else {
            layerStyle.style = this._transformStyleToMapBoxGl(style, layerInfo.featureType);
            layerStyle.layout = { 'visibility': layerInfo.visible };
            this._addOverlayToMap("POINT", source, layerID, layerStyle)
        }
    }

    /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._createUniqueLayer
    * @description 创建单值图层。
    * @param layerInfo  某个图层的图层信息
    * @param features   图层上的 feature
    */
    _createUniqueLayer(layerInfo, features) {
        let styleGroup = this._getUniqueStyleGroup(layerInfo, features);
        features = this._getFiterFeatures(layerInfo.filterCondition, features);

        let style = layerInfo.style;
        let layerStyle = {};
        let themeField = layerInfo.themeSetting.themeField;
        let type = layerInfo.featureType;
        let expression = ["match", ["get", "index"]];
        let layerID = layerInfo.layerID;
        features.forEach((row) => {
            styleGroup.forEach((item) => {
                if (item.value === row.properties[themeField]) {
                    expression.push(row.properties['index'], item.color)
                }
            })
        })
        expression.push('#ffffff');
        layerStyle.style = this._transformStyleToMapBoxGl(style, type, expression);
        let visible = layerInfo.visible;
        layerStyle.layout = { 'visibility': visible }
        let source = {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": features
            }
        }
        this._addOverlayToMap(type, source, layerID, layerStyle)
        type === 'POLYGON' && style.strokeColor && this._addStrokeLineForPoly(style, source, layerID + '-strokeLine', visible);
    }

    /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._getUniqueStyleGroup
    * @description 获取单值的目标字段与颜色的对应数组。
    * @param layerInfo  某个图层的图层信息
    * @param features   图层上的 feature
    */
    _getUniqueStyleGroup(parameters, features) {
        // 找出所有的单值
        let featureType = parameters.featureType, style = parameters.style, themeSetting = parameters.themeSetting;
        let fieldName = themeSetting.themeField,
            colors = themeSetting.colors;

        let names = [], customSettings = themeSetting.customSettings;
        for (let i in features) {
            let properties = features[i].properties;
            let name = properties[fieldName];
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
        let curentColors = colors || this.defaultParameters.colors;
        curentColors = ColorsPickerUtil.getGradientColors(curentColors, names.length);

        //生成styleGroup
        let styleGroup = [];
        names.forEach((name, index) => {
            let color = curentColors[index];
            if (name in customSettings) {
                color = customSettings[name];
            }
            if (featureType === "LINE") {
                style.strokeColor = color;
            } else {
                style.fillColor = color;
            }
            styleGroup.push({ color: color, value: name });
        }, this);

        return styleGroup;
    }

    /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._getWMTSUrl
    * @description 根据传入的配置信息拼接wmts url。
    * @param options 配置对象
    */
    _getWMTSUrl(options) {
        let obj = {
            service: 'WMTS',
            request: 'GetTile',
            version: '1.0.0',
            style: 'default',
            layer: options.layer,
            tilematrixSet: options.tileMatrixSet,
            format: 'image/png'
        }
        let url = options.url;

        url += this._getParamString(obj, url) + '&tilematrix={z}&tilerow={y}&tilecol={x}';

        return url;
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._createMarkerLayer
     * @description 添加标记图层。
     * @param {Array.<GeoJSON>} features - feature。
     */
    _createMarkerLayer(layerInfo, features) {
        features && features.forEach((feature) => {
            let geomType = feature.geometry.type.toUpperCase();
            let defaultStyle = feature.dv_v5_markerStyle;
            if (geomType === 'POINT' && defaultStyle.text) {
                //说明是文字的feature类型
                geomType = "TEXT";
            }
            let featureInfo = this.setFeatureInfo(feature);
            feature.properties['useStyle'] = defaultStyle;
            feature.properties['featureInfo'] = featureInfo;
            if (geomType === 'POINT' && defaultStyle.src &&
                (defaultStyle.src.indexOf('http://') === -1 && defaultStyle.src.indexOf('https://') === -1)) {
                //说明地址不完整
                defaultStyle.src = this.server + defaultStyle.src;
            }

            let source = {
                "type": "geojson",
                "data": feature
            };
            let index = feature.properties.index;
            let layerID = geomType + '-' + index;
            // image-marker
            geomType === 'POINT' && defaultStyle.src && defaultStyle.src.indexOf('svg') <= -1 && this.map.loadImage(defaultStyle.src, (error, image) => {
                if (error) { console.log(error) }
                this.map.addImage(index + '', image);
                this.map.addLayer({
                    "id": layerID,
                    "type": "symbol",
                    "source": source,
                    "layout": {
                        "icon-image": index + '',
                        "icon-size": defaultStyle.scale,
                        'visibility': layerInfo.visible
                    }
                });
            }, this);

            // svg-marker
            if (geomType === 'POINT' && defaultStyle.src && defaultStyle.src.indexOf('svg') > -1) {
                if (!this.svgDiv) {
                    this.svgDiv = document.createElement('div');
                    document.body.appendChild(this.svgDiv);
                }
                this._getCanvasFromSVG(defaultStyle.src, this.svgDiv, (canvas) => {
                    let imgUrl = canvas.toDataURL("img/png");
                    imgUrl && this.map.loadImage(imgUrl, (error, image) => {
                        if (error) { console.log(error) }
                        this.map.addImage(index + '', image);
                        this.map.addLayer({
                            "id": layerID,
                            "type": "symbol",
                            "source": source,
                            "layout": {
                                "icon-image": index + '',
                                "icon-size": defaultStyle.scale,
                                'visibility': layerInfo.visible
                            }
                        });
                    }, this);
                });
            }
            // point-line-polygon-marker
            if (!defaultStyle.src) {
                let layeStyle = { 'layout': {} };
                if (geomType === 'LINESTRING' && defaultStyle.lineCap) {
                    geomType = 'LINE';
                    layeStyle.layout = { 'line-cap': defaultStyle.lineCap };
                }
                let visible = layerInfo.visible;
                layeStyle.layout.visibility = visible;
                // get style
                layeStyle.style = this._transformStyleToMapBoxGl(defaultStyle, geomType);
                this._addOverlayToMap(geomType, source, layerID, layeStyle);
                // 若面有边框
                geomType === 'POLYGON' && defaultStyle.strokeColor && this._addStrokeLineForPoly(defaultStyle, source, layerID + '-strokeLine', visible);
            }
        }, this)
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype.setFeatureInfo
     * @description 设置 feature 信息。
     * @param {Array.<GeoJSON>} features - feature。
     */
    setFeatureInfo(feature) {
        let featureInfo;
        let info = feature.dv_v5_markerInfo;
        if (info && info.dataViz_title) {
            //有featureInfo信息就不需要再添加
            featureInfo = info;
        } else {
            // featureInfo = this.getDefaultAttribute();
            return info;
        }
        let properties = feature.properties;
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
     * @function mapboxgl.supermap.WebMap.prototype._createHeatLayer
     * @description 添加热力图。
     * @param {Array.<GeoJSON>} features - feature。
     */
    _createHeatLayer(layerInfo, features) {
        let style = layerInfo.themeSetting;
        let layerOption = {};
        layerOption.gradient = style.colors.slice();
        layerOption.radius = parseInt(style.radius);
        //自定义颜色
        let customSettings = style.customSettings;
        for (let i in customSettings) {
            layerOption.gradient[i] = customSettings[i];
        }
        // 权重字段恢复
        if (style.weight) {
            this._changeWeight(features, style.weight);
        }

        let color = ["interpolate", ["linear"], ["heatmap-density"]]
        let length = layerOption.gradient.length
        let step = (1 / length).toFixed(2);
        layerOption.gradient.forEach((item, index) => {
            color.push(index * step);
            if (index === 0) {
                item = Util.hexToRgba(item, 0);
            }
            color.push(item);
        })

        let paint = {
            "heatmap-color": color,
            "heatmap-radius": style.radius + 15,
            'heatmap-intensity': { "base": 1, "stops": [[0, 0.8], [22, 1]] }
        }
        if (features[0].weight && features.length >= 4) {
            let weight = [];
            features.forEach(item => {
                weight.push(item.weight);
            })
            let max = ArrayStatistic.getMax(weight);
            let min = ArrayStatistic.getMin(weight);
            paint["heatmap-weight"] = ["interpolate", ["linear"], ["get", 'weight'], min, 0, max, 1];
        }

        this.map.addLayer({
            'id': layerInfo.layerID,
            "type": "heatmap",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": features
                }
            },
            "paint": paint
        });
    }

    /**
      * @private
      * @function mapboxgl.supermap.WebMap.prototype._changeWeight
      * @description 改变当前权重字段
      * @param {Array.<GeoJSON>} features - feature。
      * @param {String} weightFeild - 权重字段
      */
    _changeWeight(features, weightFeild) {
        this.fieldMaxValue = {};
        this._getMaxValue(features, weightFeild);
        let maxValue = this.fieldMaxValue[weightFeild];
        features.forEach((feature) => {
            let attributes = feature.properties;
            let value = attributes[weightFeild];
            feature['weight'] = value / maxValue;
        })
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._getMaxValue
     * @description 获取当前字段对应的最大值，用于计算权重。
     * @param {Array.<GeoJSON>} features - feature。
     * @param {String} weightFeild - 权重字段
     */
    _getMaxValue(features, weightField) {
        let values = [], attributes;
        let field = weightField;
        if (this.fieldMaxValue[field]) { return }
        features.forEach((feature) => {
            //收集当前权重字段对应的所有值
            attributes = feature.properties;
            attributes && parseFloat(attributes[field]) && values.push(parseFloat(attributes[field]));
        });
        this.fieldMaxValue[field] = ArrayStatistic.getArrayStatistic(values, 'Maximum');
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._createRangeLayer
     * @description 添加分段专题图。
     * @param {Array.<GeoJSON>} features - feature。
     */
    _createRangeLayer(layerInfo, features) {
        let fieldName = layerInfo.themeSetting.themeField;
        let style = layerInfo.style;
        let featureType = layerInfo.featureType;
        let styleGroups = this._getRangeStyleGroup(layerInfo, features);
        features = this._getFiterFeatures(layerInfo.filterCondition, features);

        let source = {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": features
            }
        };

        // 获取 expression
        let expression = ["match", ["get", 'index']];
        features.forEach((row) => {
            let tartget = parseFloat(row.properties[fieldName]);
            for (let i = 0; i < styleGroups.length; i++) {
                if (styleGroups[i].start <= tartget && tartget < styleGroups[i].end) {
                    expression.push(row.properties['index'], styleGroups[i].color);
                    // return;
                }
            }
            !tartget && expression.push(row.properties['index'], 'rgba(0, 0, 0, 0)');
        }, this);
        expression.push('rgba(0, 0, 0, 0)');

        // 获取样式
        let layerStyle = { 'layout': {} };
        if (featureType === 'LINE' && style.lineCap) {
            layerStyle.layout = { 'line-cap': style.lineCap };
        }
        let visible = layerInfo.visible;
        layerStyle.layout.visibility = visible;
        layerStyle.style = this._transformStyleToMapBoxGl(style, featureType, expression)
        // 添加图层
        let layerID = layerInfo.layerID;
        this._addOverlayToMap(featureType, source, layerID, layerStyle)
        // 如果面有边框
        featureType === 'POLYGON' && style.strokeColor && this._addStrokeLineForPoly(style, source, layerID + '-strokeline', visible);
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._getFiterFeatures
     * @description 通过过滤条件查询满足的 feature。
     * @param {String} filterCondition - 过滤条件。
     * @param {array} allFeatures - 图层上的 feature 集合
     */
    _getFiterFeatures(filterCondition, allFeatures) {
        if (!filterCondition) {
            return allFeatures;
        }
        let jsonsqls = jsonsql ? jsonsql : window.jsonsql
        let condition = this._replaceFilterCharacter(filterCondition);
        let sql = "select * from json where (" + condition + ")";
        let filterFeatures = [];
        for (let i = 0; i < allFeatures.length; i++) {
            let feature = allFeatures[i];
            let filterResult = false;
            try {
                filterResult = jsonsqls.query(sql, {
                    properties: feature.properties
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
     * @function mapboxgl.supermap.WebMap.prototype._replaceFilterCharacter
     * @description 获取过滤字符串。
     * @param {String} filterString - 过滤条件。
     */
    _replaceFilterCharacter(filterString) {
        filterString = filterString.replace(/=/g, '==').replace(/AND|and/g, '&&').replace(/or|OR/g, '||').replace(/<==/g, '<=').replace(/>==/g, '>=');
        return filterString;
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._getRangeStyleGroup
     * @description 获取分段样式。
     * @param {Array.<GeoJSON>} features - feature。
     */
    _getRangeStyleGroup(layerInfo, features) {
        // 找出分段值
        let featureType = layerInfo.featureType;
        let style = layerInfo.style;
        let values = [], attributes;

        let themeSetting = layerInfo.themeSetting;
        let customSettings = themeSetting.customSettings;
        let fieldName = themeSetting.themeField;
        let segmentCount = themeSetting.segmentCount;

        features.forEach((feature) => {
            attributes = feature.properties || feature.get("Properties");
            if (attributes) {
                //过滤掉非数值的数据
                attributes[fieldName] && Util.isNumber(attributes[fieldName]) && values.push(parseFloat(attributes[fieldName]));
            } else if (feature.get(fieldName) && Util.isNumber(feature.get(fieldName))) {
                feature.get(fieldName) && values.push(parseFloat(feature.get(fieldName)));
            }
        }, this);

        let segements = ArrayStatistic.getArraySegments(values, themeSetting.segmentMethod, segmentCount);
        if (segements) {
            let itemNum = segmentCount;
            if (attributes && segements[0] === segements[attributes.length - 1]) {
                itemNum = 1;
                segements.length = 2;
            }

            //保留两位有效数
            for (let key in segements) {
                let value = segements[key];
                value = key == 0 ? Math.floor(value * 100) / 100 : Math.ceil(value * 100) / 100 + 0.1;// 加0.1 解决最大值没有样式问题
                segements[key] = Number(value.toFixed(2));
            }

            //获取一定量的颜色
            let curentColors = themeSetting.colors;
            // curentColors = ColorsPickerUtil.getGradientColors(curentColors, itemNum, 'RANGE');

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

                let start = segements[i];
                let end = segements[i + 1];
                let styleObj = JSON.parse(JSON.stringify(style));
                styleGroups.push({ style: styleObj, color: color, start: start, end: end });
            }
            return styleGroups;
        }
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._formatGeoJSON
     * @description 格式 GeoJSON。
     * @param {GeoJSON} data - GeoJSON 数据。
     */
    _formatGeoJSON(data) {
        let features = data.features;
        features.forEach((row, index) => {
            row.properties['index'] = index;
            // TODO 待优化 坐标转换
            // if (fileCode !== 'EPSG:4326') {
            //     if(row.geometry.coordinates[0] instanceof Array){
            //         row.geometry.coordinates.forEach((coords, index) => {
            //             let lnglat = this._unproject(coords);
            //             row.geometry.coordinates[index] = [lnglat.lng, lnglat.lat];
            //         }, this)
            //         return;
            //     }
            //     let lnglat = this._unproject(row.geometry.coordinates);
            //     row.geometry.coordinates = [lnglat.lng, lnglat.lat];
            // }
        })
        return features;
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._excelData2Feature将 
     * @description csv 和 xls 文件内容转换成 geojson
     * @param content  文件内容
     * @param layerInfo  图层信息
     * @returns {Array}  feature的数组集合
     */
    _excelData2Feature(dataContent) {
        let fieldCaptions = dataContent.colTitles;
        // let fileCode = layerInfo.projection;
        //位置属性处理
        let xfieldIndex = -1,
            yfieldIndex = -1;
        for (let i = 0, len = fieldCaptions.length; i < len; i++) {
            if (this._isXField(fieldCaptions[i])) {
                xfieldIndex = i;
            }
            if (this._isYField(fieldCaptions[i])) {
                yfieldIndex = i;
            }
        }

        // feature 构建后期支持坐标系 4326/3857
        let features = [];

        for (let i = 0, len = dataContent.rows.length; i < len; i++) {
            let row = dataContent.rows[i];

            let x = Number(row[xfieldIndex]),
                y = Number(row[yfieldIndex]);
            // let coordinates = [x, y];
            // TODO 待优化 坐标转换
            // if (fileCode !== 'EPSG:4326') {
            //     if(row.geometry.coordinates[0] instanceof Array){
            //         row.geometry.coordinates.forEach((coords, index) => {
            //             let lnglat = this._unproject(coords);
            //             row.geometry.coordinates[index] = [lnglat.lng, lnglat.lat];
            //         }, this)
            //         return;
            //     }
            //     let lnglat = this._unproject(row.geometry.coordinates);
            //     row.geometry.coordinates = [lnglat.lng, lnglat.lat];
            // }

            //属性信息
            let attributes = {};
            for (let index in dataContent.colTitles) {
                let key = dataContent.colTitles[index];
                attributes[key] = dataContent.rows[i][index];
            }
            attributes['index'] = i + '';
            //目前csv 只支持处理点，所以先生成点类型的 geojson
            let feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [x, y]
                },
                "properties": attributes
            };
            features.push(feature);
        }
        return features;
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._sendMapToUser
     * @description 返回最终的 map 对象给用户，供他们操作使用。
     * @param count
     * @param layersLen
     */
    _sendMapToUser(count, layersLen) {
        if (count === layersLen) {
            /**
            * @event mapboxgl.supermap.WebMap#addlayerssucceeded
            * @description 添加图层成功。
            * @property {mapboxgl.Map} map - MapBoxGL Map 对象。
            * @property {Object} mapparams - 地图信息。
            * @property {string} mapParams.title - 地图标题。
            * @property {string} mapParams.description - 地图描述。
            * @property {Array.<Object>} layers - 地图上所有的图层对象
            */
            this.fire('addlayerssucceeded', { 'map': this.map, 'mapparams': this.mapParams, 'layers': this.layers })
        }
    }

    /**
     * @function mapboxgl.supermap.WebMap.prototype._unproject
     * @private
     * @description 墨卡托转经纬度。
     * @param {} point - 待转换的点。
     */
    _unproject(point) {
        var d = 180 / Math.PI,
            r = 6378137,
            ts = Math.exp(-point[1] / r),
            phi = Math.PI / 2 - 2 * Math.atan(ts);
        for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
            con = 1;
            dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
            phi += dphi;
        }
        return new mapboxgl.LngLat(point[0] * d / r, phi * d);
    }

    /**
     * @function mapboxgl.supermap.WebMap.prototype._getParamString
     * @private
     * @param {Object} obj - 待添加的参数。
     * @param {string} existingUrl - 待添加参数的 url。
     * @param {Boolean} [uppercase] - 参数是否转换为大写。
     */
    _getParamString(obj, existingUrl, uppercase) {
        var params = [];
        for (var i in obj) {
            params.push((uppercase ? i.toUpperCase() : i) + '=' + (obj[i]));
        }
        return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
    }

    /**
     * @private
     * @description 判断是否地理X坐标
     * @param data
     */
    _isXField(data) {
        var lowerdata = data.toLowerCase();
        return (lowerdata === "x" || lowerdata === "smx" ||
            lowerdata === "jd" || lowerdata === "经度" || lowerdata === "东经" || lowerdata === "longitude" ||
            lowerdata === "lot" || lowerdata === "lon" || lowerdata === "lng");
    }

    /**
     * @private
     * @description 判断是否地理Y坐标
     * @param data
     */
    _isYField(data) {
        var lowerdata = data.toLowerCase();
        return (lowerdata === "y" || lowerdata === "smy" ||
            lowerdata === "wd" || lowerdata === "纬度" || lowerdata === "北纬" ||
            lowerdata === "latitude" || lowerdata === "lat");
    }

    /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._transformStyleToMapBoxGl
    * @description 根据图层类型将 layerInfo 中的 style 属性格式转换为 mapboxgl 中的 style 格式。
    * @param {Object} style - layerInfo中的style属性
    * @param {String} type - 图层类型
    * @param {Array} [expression] - 存储颜色值得表达式 
    */
    _transformStyleToMapBoxGl(style, type, expression) {
        let transTable = {};
        if ((style.type === 'POINT' || style.type === 'BASIC_POINT' || type === 'POINT') && type !== 'LINE') {
            transTable = {
                "fillColor": "circle-color",
                "strokeWidth": "circle-stroke-width",
                "fillOpacity": "circle-opacity",
                "radius": "circle-radius",
                "strokeColor": "circle-stroke-color",
                "strokeOpacity": "circle-stroke-opacity"
            }
        } else if (type === 'LINE') {
            transTable = {
                "strokeWidth": "line-width",
                "strokeColor": "line-color",
                "strokeOpacity": "line-opacity"
            }
        } else if (type === 'POLYGON') {
            transTable = {
                "fillColor": "fill-color",
                "fillOpacity": "fill-opacity",
                "strokeColor": "fill-outline-color"
            }
        }

        let newObj = {}
        for (let item in style) {
            if (transTable[item]) {
                newObj[transTable[item]] = style[item];
            }
        }
        if (expression) {
            if (newObj["circle-color"]) {
                newObj["circle-color"] = expression;
            } else if (newObj['line-color']) {
                newObj['line-color'] = expression;
            } else {
                newObj['fill-color'] = expression
            }
        }
        if (style.lineDash && style.lineDash !== 'solid' && type === 'LINE') {
            newObj['line-dasharray'] = this._dashStyle(style);
        }
        return newObj;
    }

    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype.._dashStyle
     * @description 符号样式。
     * @param {Object} style - 样式参数。
     * @param {number} widthFactor - 宽度系数。
     */
    _dashStyle(style) {
        if (!style) {
            return [];
        }
        // var w = style.strokeWidth * widthFactor;
        var w = 1;
        var str = style.strokeDashstyle || style.lineDash;
        switch (str) {
            case 'solid':
                return [];
            case 'dot':
                return [1, 4 * w];
            case 'dash':
                return [4 * w, 4 * w];
            case 'dashdot':
                return [4 * w, 4 * w, 1 * w, 4 * w];
            case 'longdash':
                return [8 * w, 4 * w];
            case 'longdashdot':
                return [8 * w, 4 * w, 1, 4 * w];
            default:
                if (!str) {
                    return [];
                }
                if (CommonUtil.isArray(str)) {
                    return str;
                }
                str = StringExt.trim(str).replace(/\s+/g, ",");
                return str.replace(/\[|\]/gi, "").split(",");
        }
    }

    /**
     * @private
     * @description 将SVG转换成Canvas
     * @param svgUrl
     * @param divDom
     * @param callBack
     */
    _getCanvasFromSVG(svgUrl, divDom, callBack) {
        //一个图层对应一个canvas
        let canvas = document.createElement('canvas');
        canvas.id = 'dataviz-canvas-' + Util.newGuid(8);
        canvas.style.display = "none";
        divDom.appendChild(canvas);
        let canvgs = window.canvg ? window.canvg : canvg;
        canvgs(canvas.id, svgUrl, {
            ignoreMouse: true,
            ignoreAnimation: true,
            renderCallback: () => {
                if (canvas.width > 300 || canvas.height > 300) {
                    return;
                }
                callBack(canvas);
            },
            forceRedraw: () => {
                return false
            }
        });
    }
    /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._addOverlayToMap
    * @description 添加基础矢量图层到 MAP
    * @param {Object} style - mabgl style 
    * @param {String} type - 图层类型
    */
    _addOverlayToMap(type, source, layerID, layerStyle) {
        let mbglTypeMap = {
            "POINT": 'circle',
            "LINE": "line",
            "POLYGON": "fill"
        }
        type = mbglTypeMap[type];
        if (type === 'circle' || type === 'line' || type === 'fill') {
            this.map.addLayer({
                "id": layerID,
                "type": type,
                "source": source,
                "paint": layerStyle.style,
                'layout': layerStyle.layout || {}
            });
        }
    }

    _addBaselayer(url, layerID, minzoom = 0, maxzoom = 22) {
        this.map.addLayer({
            'id': layerID,
            "type": "raster",
            "source": {
                "type": "raster",
                "tiles": url,
                "tileSize": 256
            },
            "minzoom": minzoom,
            "maxzoom": maxzoom
        })
    }
    /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._addStrokeLineForPoly
    * @description 添加面的边框。
    * @param {Object} style - mabgl style 
    */
    _addStrokeLineForPoly(style, source, layerID, visible) {
        let lineStyle = {};
        lineStyle.style = this._transformStyleToMapBoxGl(style, 'LINE');
        lineStyle.layout = { 'visibility': visible }
        this._addOverlayToMap('LINE', source, layerID, lineStyle)
    }
    /**
     * @private
     * @function mapboxgl.supermap.WebMap.prototype._parseGeoJsonData2Feature
     * @description 将从restData地址上获取的json转换成feature（从iserver中获取的json转换成feature）
     * @param {object} metaData - json内容
     * @returns {Array}  ol.feature的数组集合
     */
    _parseGeoJsonData2Feature(metaData) {
        let allFeatures = metaData.allDatas.features,
            features = [];
        for (let i = 0, len = allFeatures.length; i < len; i++) {
            // TODO 坐标转换
            let feature = allFeatures[i];
            let coordinate = feature.geometry.coordinates;
            if (allFeatures[i].geometry.type === 'Point') {
                // 标注图层 还没有属性值时候不加
                if (allFeatures[i].properties) {
                    allFeatures[i].properties.lon = coordinate[0];
                    allFeatures[i].properties.lat = coordinate[1];
                }
            }
            features.push(feature);
        }
        return features;
    }

    /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._getFeatureBySQL
    * @description 通过 sql 方式查询数据。
    */
    _getFeatureBySQL(url, datasetNames, processCompleted, processFaild) {
        let getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
        getFeatureParam = new FilterParameter({
            name: datasetNames.join().replace(":", "@"),
            attributeFilter: 'SMID > 0'
        });
        getFeatureBySQLParams = new GetFeaturesBySQLParameters({
            queryParameter: getFeatureParam,
            datasetNames: datasetNames,
            fromIndex: 0,
            toIndex: 100000,
            returnContent: true
        });
        let options = {
            eventListeners: {
                processCompleted: getFeaturesEventArgs => {
                    processCompleted && processCompleted(getFeaturesEventArgs);
                },
                processFailed: e => {
                    processFaild && processFaild(e);
                }
            }
        };
        getFeatureBySQLService = new GetFeaturesBySQLService(url, options);
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    }

    /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._queryFeatureBySQL
    * @description 通过 sql 方式查询数据。
    */
    _queryFeatureBySQL(url, layerName, attributeFilter, fields, epsgCode, processCompleted, processFaild, startRecord, recordLength, onlyAttribute) {
        var queryParam, queryBySQLParams, queryBySQLService;
        queryParam = new FilterParameter({
            name: layerName,
            attributeFilter: attributeFilter
        });
        if (fields) {
            queryParam.fields = fields;
        }
        var params = {
            queryParams: [queryParam]
        };
        if (onlyAttribute) {
            params.queryOption = QueryOption.ATTRIBUTE;
        }
        startRecord && (params.startRecord = startRecord);
        recordLength && (params.expectCount = recordLength);
        if (epsgCode) {
            params.prjCoordSys = {
                epsgCode: epsgCode
            }
        }
        queryBySQLParams = new QueryBySQLParameters(params);
        queryBySQLService = new mapboxgl.supermap.QueryService(url);
        queryBySQLService.queryBySQL(queryBySQLParams, data => {
            data.type === 'processCompleted' ? processCompleted(data) : processFaild(data)
        });
    }

    /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._handleMultyPolygon
    * @description 处理复杂面情况
    */
    _handleMultyPolygon(features) {
        features.forEach(feature => {
            if (feature.geometry.type !== 'Polygon') {
                return;
            }
            let coords = feature.geometry.coordinates;
            if (coords.length > 1) {
                let coordinates = [];
                coords.forEach(coord => {
                    coordinates.push([coord])
                });
                feature.geometry.coordinates = coordinates;
                feature.geometry.type = "MultiPolygon";
            }
        });
        return features;
    }
}

mapboxgl.supermap.WebMap = WebMap;