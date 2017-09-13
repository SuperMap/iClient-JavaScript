import '../core/Base';
import L from "leaflet";
import {FetchRequest as Request} from '../../common/util/FetchRequest';
import SuperMap from '../../common/SuperMap';
import {CartoCSSToLeaflet} from '../overlay/carto/CartoCSSToLeaflet' ;
import {NonEarthCRS} from "../core/NonEarthCRS"

/**
 * @class L.supermap.webmap
 * @classdesc 对接iPortal/Online地图类。
 * @extends L.LayerGroup{@linkdoc-leaflet/#layergroup}
 * @param id - {number}iPortal/Online地图id。
 * @param options - {Object} 可选参数。如：<br>
 *        map - {string} 地图容器id。<br>
 *        server - {string} iPortal/Online服务地址。默认为 http://www.supermapol.com <br>
 *        featureLayerPopupEnable - {boolean} 是否启动要素图层提示框。<br>
 *        featureLayerPopup - {string} 提示框提示信息。<br>
 *        credentialValue - {string} 证书值。<br>
 *        credentialKey - {string} 证书密钥。<br>
 *        attribution - {string} 版权信息。
 */
export var WebMap = L.LayerGroup.extend({

    options: {
        map: 'map',
        server: 'http://www.supermapol.com',
        featureLayerPopupEnable: true,
        featureLayerPopup: null,
        credentialValue: null,
        credentialKey: 'key',
        attribution: "Map Data <span>© <a href='http://www.supermapol.com'>SuperMap Online</a></span> with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
    },

    /**
     * @function L.supermap.webmap.prototype.defaultFeatureLayerPopup
     * @description 默认图层弹出框
     * @param layer -{L.Layer} 指定图层
     * @return {string} 图层弹出框内容
     */
    defaultFeatureLayerPopup: function (layer) {
        return layer.feature.properties.attributes.title + ":" + layer.feature.properties.attributes.description;
    },

    initialize: function (id, options) {
        this._layers = {};
        L.setOptions(this, options);
        this.id = id;
        this.load();
        this.cartoCSSToLeaflet = new CartoCSSToLeaflet();
    },

    /**
     * @function L.supermap.webmap.prototype.load
     * @description 登陆后添加地图图层
     */
    load: function () {
        if (this.options.server.indexOf('http://') < 0 && this.options.server.indexOf('https://') < 0) {
            this.options.server = "http://" + this.options.server;
        }
        var mapUrl = this.options.server + '/web/maps/' + this.id + '.json';
        if (this.options.credentialValue) {
            mapUrl += ('?' + this.options.credentialKey + '=' + this.options.credentialValue);
        }
        var me = this;
        Request.get(mapUrl).then(function (response) {
            return response.json()
        }).then(function (jsonObj) {
            if (!jsonObj) {
                return;
            }
            var layers = jsonObj.layers;
            me.mapInfo = jsonObj;
            me.createLayersByJson(layers);
        });
    },

    /**
     * @function L.supermap.webmap.prototype.addLayerWrapper
     * @description 添加图层容器
     * @param layer - {L.Layer} 待添加的图层
     * @param isBaseLayer -{boolean} 是否为底图层
     * @param options - {Object} 创建地图的可选参数
     * @return {this}
     */
    addLayerWrapper: function (layer, isBaseLayer, options) {
        if (isBaseLayer) {
            this.createMap(options);
        }
        return this.addLayer(layer)
    },

    /**
     * @private
     * @function L.supermap.webmap.prototype.createLayersByJson
     * @description 通过json创建图层
     * @param layersJson - {JSON} 图层的json信息
     */
    createLayersByJson: function (layersJson) {
        if (!L.Util.isArray(layersJson)) {
            return;
        }
        if (layersJson.length === 0) {
            return;
        }
        this.layers = [];
        var layerQueue = [];
        for (var i = 0; i < layersJson.length; i++) {
            var layerJson = layersJson[i];
            layerJson["_originIndex"] = i;
            var layerJsonType = layerJson.layerType = layerJson.layerType || "BASE_LAYER";
            if (layerJsonType !== "BASE_LAYER") {
                //如果图层不是底图，则先加到图层队列里面等待底图完成后再处理
                layerQueue.unshift(layerJson);
                continue;
            } else {
                layerJson.isBaseLayer = true;
                this.createLayer(layerJson.type, layerJson);
            }
        }
        //底图加载完成后开始处理图层队列里的图层
        while (layerQueue.length > 0) {
            var layerInfo = layerQueue.pop();
            var type = layerInfo.type;
            var layerType = layerInfo.layerType = layerInfo.layerType || "BASE_LAYER";
            if (layerType !== "OVERLAY_LAYER") {
                type = layerType;
            }
            this.createLayer(type, layerInfo);
        }
        this.fire('mapLoaded', {map: this._map});
    },

    /**
     * @private
     * @function L.supermap.webmap.prototype.createCRS
     * @description 创建坐标对象
     * @param epsgCode - {mnumber} epsg编码
     * @param type - {string} 坐标类型
     * @param resolutions - {number}分辨率
     * @param origin - {SuperMap.Point} 起始点
     * @param bounds -{SuperMap.Bounds} 指定坐标范围
     */
    createCRS: function (epsgCode, type, resolutions, origin, bounds) {
        if (epsgCode < 0) {
            return new NonEarthCRS({
                bounds: bounds,
                origin: origin,
                resolutions: resolutions
            })
        }

        if (epsgCode === 910112 || epsgCode === 910102) {
            return L.CRS.BaiduCRS;
        }
        if (epsgCode === 910111) {
            epsgCode = 3857
            //todo 火星mercator
        }
        if (epsgCode === 910101) {
            epsgCode = 4326
            //todo 火星
        }
        return L.Proj.CRS("EPSG:" + epsgCode,
            {
                origin: origin,
                resolutions: resolutions,
                bounds: bounds
            })
    },

    /**
     * @private
     * @function L.supermap.webmap.prototype.createMap
     * @description 创建地图
     * @param options - {Object} 创建地图所需参数
     */
    createMap: function (options) {
        var crs = options.crs || L.CRS.EPSG3857;
        var bounds = L.latLngBounds(crs.unproject(options.bounds.min), crs.unproject(options.bounds.max));
        this._map = L.map(this.options.map, {
            center: bounds.getCenter(),
            maxZoom: options.maxZoom || 22,
            minZoom: options.minZoom || 0,
            zoom: options.zoom || 0,
            crs: crs
        });
        if (crs instanceof NonEarthCRS) {
            this._map.setZoom(options.zoom ? options.zoom + 2 : 2, {maxZoom: options.maxZoom || 22});
        } else {
            this._map.fitBounds(bounds, {maxZoom: options.maxZoom || 22});
        }


    },

    /**
     * @function L.supermap.webmap.prototype.getResolutionsFromScales
     * @description 通过比例尺获取分辨率
     * @param scales - {Array<number>} 排序比例尺数组
     * @param dpi - {number}屏幕分辨率
     * @param units - {string} 地图的单位
     * @param datum - {SuperMap.Datum} 大地参照系类
     * @return {Array<number>}
     */
    getResolutionsFromScales: function (scales, dpi, units, datum) {
        var resolutions = [];
        for (var i = 0; i < scales.length; i++) {
            resolutions.push(L.Util.GetResolutionFromScaleDpi(scales[i], dpi, units, datum))
        }
        return resolutions;
    },

    /**
     * @function L.supermap.webmap.prototype.createLayer
     * @description 创建图层
     * @param type - {string} 图层类型
     * @param layerInfo - {Object} 图层信息
     */
    createLayer: function (type, layerInfo) {
        var prjCoordSys = layerInfo.prjCoordSys,
            epsgCode = prjCoordSys && prjCoordSys.epsgCode || this.mapInfo.epsgCode,
            center = this.mapInfo.center || layerInfo.center,
            level = this.mapInfo.level || layerInfo.level,
            bounds = this.mapInfo.extent || layerInfo.bounds,
            scales = layerInfo.scales,
            isBaseLayer = layerInfo.isBaseLayer,
            opacity = layerInfo.opacity;
        var mapBounds = L.bounds([bounds.leftBottom.x, bounds.leftBottom.y], [bounds.rightTop.x, bounds.rightTop.y]);
        var layerBounds = layerInfo.bounds ? L.bounds([layerInfo.bounds.leftBottom.x, layerInfo.bounds.leftBottom.y], [layerInfo.bounds.rightTop.x, layerInfo.bounds.rightTop.y]) : null;
        var origin = layerBounds ? L.point(layerBounds.min.x, layerBounds.max.y) : L.point(mapBounds.min.x, mapBounds.max.y);
        var resolutions = !scales ? null : this.getResolutionsFromScales(scales, 96, layerInfo.units);
        var crs = this.createCRS(epsgCode, prjCoordSys ? prjCoordSys.type : '', resolutions, origin, layerBounds || mapBounds);
        var mapOptions = {
            bounds: mapBounds,
            center: L.point(center.x, center.y),
            crs: crs,
            zoom: level
        };
        var layer;
        switch (type) {
            case "SUPERMAP_REST" :
                layer = L.supermap.tiledMapLayer(layerInfo.url, {
                    transparent: true,
                    opacity: opacity
                });
                break;
            case "SUPERMAP_REST_VECTOR":
                //ToDO
                break;
            case "TIANDITU_VEC":
            case "TIANDITU_IMG":
            case "TIANDITU_TER":
                mapOptions.crs = epsgCode === 4326 ? L.CRS.TianDiTu_WGS84 : L.CRS.TianDiTu_Mercator;
                mapOptions.minZoom = 1;
                mapOptions.zoom = 1 + mapOptions.zoom;
                layer = this.createTiandituLayer(layerInfo, epsgCode);
                break;
            case "BAIDU":
                mapOptions.crs = L.CRS.BaiduCRS;
                mapOptions.zoom = 3 + mapOptions.zoom;
                mapOptions.minZoom = 3;
                layer = L.supermap.baiduTileLayer();
                break;
            case 'BING':
                //todo
                break;
            case "WMS":
                layer = this.createWmsLayer(layerInfo);
                break;
            case "WMTS":
                mapOptions.resolutions = this.getResolutionsFromScales(scales, 90.71446714322, layerInfo.units);
                var identifier = layerInfo.identifier;
                var layerName = identifier.substring(identifier.indexOf("_") + 1);
                layer = L.supermap.wmtsLayer(layerInfo.url,
                    {
                        layer: layerName,
                        style: "default",
                        tilematrixSet: identifier,
                        format: "image/png",
                    }
                );
                break;
            case "CLOUD":
                mapOptions.crs = L.CRS.EPSG3857;
                mapOptions.zoom = 3 + mapOptions.zoom;
                mapOptions.minZoom = 3;
                layer = L.supermap.cloudTileLayer(layerInfo.url, {opacity: opacity});
                break;
            case "MARKER_LAYER":
                layer = this.createMarkersLayer(layerInfo, crs);
                break;
            case "FEATURE_LAYER":
                if (layerInfo.identifier == "ANIMATORVECTOR") {
                    //todo
                } else if (layerInfo.identifier == "THEME") {
                    //todo
                } else {
                    layer = this.createVectorLayer(layerInfo, crs);
                }
                break;
            default:
                throw new Error('unSupported Layer Type');
                break;
        }
        if (layer) {
            this.addLayerWrapper(layer, isBaseLayer, mapOptions);
        }
    },

    /**
     * @private
     * @function L.supermap.webmap.prototype.createTiandituLayer
     * @description 创建天地图图层
     * @param layerInfo - {Object} 图层信息
     * @param epsgCode - {number}epsg编码
     * @return {L.supermap.tiandituTileLayer}
     */
    createTiandituLayer: function (layerInfo, epsgCode) {
        var proj = epsgCode === 4326 ? "c" : "w";
        var wmtsURL =
            "http://t{s}.tianditu.com/{type}_{proj}/wmts?";
        var type = layerInfo.type.split('_')[1].toLowerCase();
        if (layerInfo.layerType === 'OVERLAY_LAYER') {
            if (type == "vec") type = "cva"
            if (type == "img") type = "cia"
            if (type == "ter") type = "cta"
        }
        wmtsURL = wmtsURL.replace("{type}", type).replace("{proj}", proj);
        var layer = L.supermap.tiandituTileLayer(wmtsURL,
            {
                layer: type,
                tilematrixSet: proj,
            }
        );
        return layer;
    },

    /**
     * @private
     * @function L.supermap.webmap.prototype.createMarkersLayer
     * @description 创建图标图层
     * @param layerInfo - {Object} 图层信息
     * @param crs - {Object} 坐标对象
     * @return {L.Layer}
     */
    createMarkersLayer: function (layerInfo, crs) {
        var markers = layerInfo.markers || [];
        //style = layerInfo.style,
        //opacity = layerInfo.opacity,
        //marker, point, size, offset, icon, that = this;
        //todo offset
        var coordsToLatLng = function (coords) {
            var ll = crs.unproject(L.point(coords[0], coords[1]));
            return new L.LatLng(ll.lat, ll.lng, coords[2]);
        };

        var layer = L.geoJSON(L.Util.toGeoJSON(markers), {
            pointToLayer: function (geojson, latlng) {
                var m = new L.Marker(latlng);
                m.setStyle = function (style) {
                    if (style) {
                        m.setIcon(style);
                    }
                }
                return m;
            },
            coordsToLatLng: coordsToLatLng, style: function (geoJsonFeature) {
                return that.cartoCSSToLeaflet.getStyleFromiPortalMarker(geoJsonFeature.properties.icon);
            },
        });
        if (this.options.featureLayerPopupEnable) {
            layer.bindPopup(this.options.featureLayerPopup || this.defaultFeatureLayerPopup)
        }
        return layer;
    },

    /**
     * @private
     * @function L.supermap.webmap.prototype.createVectorLayer
     * @description 创建矢量要素图层
     * @param layerInfo - {Object} 图层信息
     * @param crs - {Object} 坐标对象
     * @return {L.Layer}
     */
    createVectorLayer: function (layerInfo, crs) {
        var style = layerInfo.style,
            opacity = layerInfo.opacity,
            isVisible = layerInfo.isVisible,
            me = this;
        //todo readonly = layerInfo.readonly;
        var coordsToLatLng = function (coords) {
            var ll = crs.unproject(L.point(coords[0], coords[1]));
            return new L.LatLng(ll.lat, ll.lng, coords[2]);
        };
        if (!layerInfo.url) {
            var layer = L.geoJSON(L.Util.toGeoJSON(layerInfo.features), {
                pointToLayer: function (geojson, latlng) {
                    var m = new L.Marker(latlng);
                    m.setStyle = function (style) {
                        if (style) {
                            m.setIcon(style);
                        }
                    }
                    return m;
                },
                coordsToLatLng: coordsToLatLng, style: function (geoJsonFeature) {
                    return me.cartoCSSToLeaflet.getStyleFromiPortalStyle(style ? style : {}, geoJsonFeature.geometry.type, geoJsonFeature.properties.style);
                },
                opacity: opacity
            });
            if (this.options.featureLayerPopupEnable) {
                layer.bindPopup(this.options.featureLayerPopup || this.defaultFeatureLayerPopup)
            }
            return layer;
        } else {
            var url = layerInfo.url,
                datasourceName = layerInfo.name,
                datasets = layerInfo.features;
            style = layerInfo.style;
            var fun = function (serviceResult) {
                var layer = L.geoJSON(serviceResult.result, {
                    pointToLayer: function (geojson, latlng) {
                        var m = new L.Marker(latlng);
                        m.setStyle = function (style) {
                            if (style) {
                                m.setIcon(style);
                            }
                        };
                        return m;
                    },
                    coordsToLatLng: coordsToLatLng,
                    style: function (geoJsonFeature) {
                        return me.cartoCSSToLeaflet.getStyleFromiPortalStyle(style ? style : {}, geoJsonFeature.geometry.type, geoJsonFeature.properties.style);
                    },
                    opacity: opacity
                });
                if (this.options.featureLayerPopupEnable) {
                    layer.bindPopup(me.options.featureLayerPopup || me.defaultFeatureLayerPopup)
                }
                me.addLayer(layer);
            };
            for (var setNameIndex = 0; setNameIndex < datasets.length; setNameIndex++) {
                var dataset = datasets[setNameIndex];
                if (dataset.visible) {
                    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
                        queryParameter: {
                            name: dataset.name + "@" + datasourceName,
                            attributeFilter: "SMID >0"
                        },
                        datasetNames: [datasourceName + ":" + dataset.name]
                    });
                    L.supermap.getFeaturesService(url).getFeaturesBySQL(sqlParam).on("complete", fun);
                }
            }
        }
    },

    /**
     * @private
     * @function L.supermap.webmap.prototype.createWmsLayer
     * @description 创建Wms图层
     * @param layerInfo - {Object} 图层信息
     */
    createWmsLayer: function (layerInfo) {
        var url = layerInfo.url,
            opacity = layerInfo.opacity,
            subLayers = layerInfo.subLayers;

        if (!subLayers || subLayers === "undefined" || subLayers === "null") {
            subLayers = "0";
        }
        return L.tileLayer.wms(url, {
            layers: subLayers,
            format: 'image/png',
            transparent: true,
            noWrap: true,
            opacity: opacity
        })
    }
});

export var webMap = function (id, options) {
    return new WebMap(id, options);
};
L.supermap.webmap = webMap