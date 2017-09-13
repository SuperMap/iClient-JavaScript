import ol from 'openlayers/dist/ol-debug';
import {FetchRequest} from '../../common/util/FetchRequest';
import SuperMap from '../../common/SuperMap';
import StyleUtils from '../core/StyleUtils';
import Logo from '../control/Logo';

ol.supermap = ol.supermap || {};
/**
 * @class ol.supermap.WebMap
 * @classdesc 对接iPortal/Online地图类。
 * @param id - {string} iPortal|Online 地图ID
 * @param options - {Object} 参数。如：<br>
 *        target - {string} 目标类型。<br>
 *        map - {ol.map} 地图对象。<br>
 *        server - {string} 服务地址。<br>
 *        credentialKey - {string} 凭证密钥。<br>
 *        credentialValue - {string} 凭证值。
 * @extends ol.Observable{@linkdoc-openlayers/ol.Observable}
 */
export default class WebMap extends ol.Observable {

    EventType = {
        WEBMAPLOADEND: 'webmaploadend',
    }

    constructor(id, options) {
        super();
        this.id = id;
        options = options || {};
        this.target = options.target || 'map';
        this.map = options.map;
        this.server = options.server || 'http://www.supermapol.com';
        this.credentialValue = options.credentialValue;
        this.credentialKey = options.credentialKey || 'key';
        this.load();
    }

    /**
     * @function ol.supermap.WebMap.prototype.load
     * @description 登陆窗口后添加地图图层
     */
    load() {
        if (this.server.indexOf('http://') < 0 && this.server.indexOf('https://') < 0) {
            this.server = "http://" + this.server;
        }
        var mapUrl = this.server + '/web/maps/' + this.id + '.json';
        if (this.credentialValue) {
            mapUrl += ('?' + this.credentialKey + '=' + this.credentialValue);
        }
        var me = this;
        FetchRequest.get(mapUrl).then(function (response) {
            return response.json()
        }).then(function (jsonObj) {
            if (!jsonObj) {
                return;
            }
            var layers = jsonObj.layers;
            me.mapInfo = jsonObj;
            me.createLayersByJson(layers);
        })
    }

    /**
     * @function ol.supermap.WebMap.prototype.createLayersByJson
     * @description 通过json创建图层
     * @param layersJson - {JSON} 图层的json信息
     */
    createLayersByJson(layersJson) {
        if (!ol.supermap.Util.isArray(layersJson)) {
            return;
        }
        if (layersJson.length === 0) {
            return;
        }
        var layerQueue = [];
        var baseLayerJson;
        for (var i = 0; i < layersJson.length; i++) {
            var layerJson = layersJson[i];
            layerJson["_originIndex"] = i;
            var layerJsonType = layerJson.layerType = layerJson.layerType || "BASE_LAYER";
            if (layerJsonType !== "BASE_LAYER") {
                //如果图层不是底图，则先加到图层队列里面等待底图完成后再处理
                layerQueue.unshift(layerJson);
                continue;
            } else {
                baseLayerJson=layerJson;

            }
        }
        var viewOptions=this._getViewOptions(baseLayerJson);
        if (!this.map) {
            var view = new ol.View(viewOptions);
            var controls = ol.control.defaults({attributionOptions: {collapsed: false}})
                .extend([new Logo()]);
            this.map = new ol.Map({
                target: this.target,
                view: view,
                controls: controls
            });
            var me =this;
            this.map.once('postrender',function () {
                me.createLayer(baseLayerJson.type, baseLayerJson);
                //底图加载完成后开始处理图层队列里的图层
                while (layerQueue.length > 0) {
                    var layerInfo = layerQueue.pop();
                    var type = layerInfo.type;
                    var layerType = layerInfo.layerType = layerInfo.layerType || "BASE_LAYER";
                    if (layerType !== "OVERLAY_LAYER") {
                        type = layerType;
                    }
                    me.createLayer(type, layerInfo);
                }
                me.dispatchEvent({type: ol.supermap.WebMap.EventType.WEBMAPLOADEND, value: this});
            })
            view.fit(viewOptions.extent);

        }


    };

    /**
     * @function ol.supermap.WebMap.prototype.addLayer
     * @description 添加图层
     * @param layer -{ol.layer.Vector} ol图层
     * @param options -{Object} 创建图层所需参数
     */
    addLayer(layer, options) {
        return this.map.addLayer(layer);
    }

    toProjection(epsgCode, type, extent) {
        if (epsgCode == -1000) {
            return new ol.proj.Projection({
                extent: extent,
                units: 'm'
            });
        }
        if (epsgCode === 910112 || epsgCode === 910102) {
            return 'EPSG:3857';
        }
        if (epsgCode === 910111) {
            return 'EPSG:3857'
            //todo 火星mercator
        }
        if (epsgCode === 910101) {
            return 'EPSG:4326'
            //todo 火星
        }
        return 'EPSG:' + epsgCode;
    }

    /**
     * @function ol.supermap.WebMap.prototype.getResolutionsFromScales
     * @description 通过比例尺获取分辨率
     * @param scales - {Array<number>} 排序比例尺数组
     * @param dpi - {number}屏幕分辨率
     * @param units - {string} 地图的单位
     * @param datum - {SuperMap.Datum} 大地参照系类
     */
    getResolutionsFromScales(scales, dpi, units, datum) {
        var resolutions = [];
        if (!scales || scales.length == 0) {
            return resolutions;
        }
        for (var i = 0; i < scales.length; i++) {
            resolutions.push(SuperMap.Util.GetResolutionFromScaleDpi(scales[i], dpi, units, datum))
        }
        return resolutions;
    }

    _getViewOptions(layerInfo) {
        var prjCoordSys = layerInfo.prjCoordSys,
            epsgCode = prjCoordSys && prjCoordSys.epsgCode || this.mapInfo.epsgCode,
            center = this.mapInfo.center || layerInfo.center,
            level = this.mapInfo.level || layerInfo.level,
            bounds = layerInfo.bounds || this.mapInfo.extent,
            extent = [bounds.leftBottom.x, bounds.leftBottom.y, bounds.rightTop.x, bounds.rightTop.y];
        var projection = this.toProjection(epsgCode, prjCoordSys ? prjCoordSys.type : '', extent);

        //var crs = this.createCRS(epsgCode, origin, resolution, boundsL);
        return {
            center: [center.x, center.y],
            zoom: level,
            projection: projection,
            extent: extent
        };

    }

    /**
     * @function ol.supermap.WebMap.prototype.createLayer
     * @description 创建图层
     * @param type - {string} 图层类型
     * @param layerInfo - {Object} 图层信息
     */
    createLayer(type, layerInfo) {
        var prjCoordSys = layerInfo.prjCoordSys,
            epsgCode = prjCoordSys && prjCoordSys.epsgCode || this.mapInfo.epsgCode,
            center = this.mapInfo.center || layerInfo.center,
            level = this.mapInfo.level || layerInfo.level,
            bounds = layerInfo.bounds || this.mapInfo.extent,
            scales = layerInfo.scales,
            opacity = layerInfo.opacity,
            origin = [bounds.leftBottom.x, bounds.rightTop.y],
            extent = [bounds.leftBottom.x, bounds.leftBottom.y, bounds.rightTop.x, bounds.rightTop.y];
        var projection = this.toProjection(epsgCode, prjCoordSys ? prjCoordSys.type : '', extent);

        //var crs = this.createCRS(epsgCode, origin, resolution, boundsL);
        var viewOptions = {
            center: [center.x, center.y],
            zoom: level,
            projection: projection,
            extent: extent
        };
        var layer;
        switch (type) {
            case "SUPERMAP_REST" :
                layer = new ol.layer.Tile({
                    source: new ol.source.TileSuperMapRest({
                        url: layerInfo.url,
                        transparent: true,
                        tileGrid: scales ? new ol.tilegrid.TileGrid({
                            extent: extent,
                            resolutions: this.getResolutionsFromScales(scales, 96)
                        }) : ol.source.TileSuperMapRest.createTileGrid(extent)
                    }),
                    projection: projection
                });
                break;
            case "SUPERMAP_REST_VECTOR":
                //ToDO
                break;
            case "TIANDITU_VEC":
            case "TIANDITU_IMG":
            case "TIANDITU_TER":
                viewOptions.minZoom = 1;
                viewOptions.zoom = 1 + viewOptions.zoom;
                layer = this.createTiandituLayer(layerInfo, epsgCode);
                break;
            case "BAIDU":
                viewOptions.resolutions = [131072 * 2, 131072, 65536, 32768, 16284, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5];
                viewOptions.zoom = 3 + viewOptions.zoom;
                viewOptions.minZoom = 3;
                layer = new ol.layer.Tile({
                    source: new ol.source.BaiduMap()
                });
                break;
            case 'BING':
                layer = new ol.layer.Tile({
                    source: new ol.source.BingMaps()
                });
                break;
            case "WMS":
                layer = this.createWmsLayer(layerInfo);
                break;
            case "WMTS":
                var identifier = layerInfo.identifier;
                var wellKnownScaleSet = identifier.split("_")[0];
                var layerName = identifier.substring(identifier.indexOf("_") + 1);
                var info = this.getWmtsResolutionsAndMatrixIds(wellKnownScaleSet, layerInfo.units, scales, origin, extent);
                viewOptions.resolutions = info.resolutions;
                layer = new ol.layer.Tile({
                    opacity: opacity,
                    source: new ol.source.WMTS({
                        url: layerInfo.url,
                        layer: layerName,
                        matrixSet: identifier,
                        format: 'image/png',
                        tileGrid: new ol.tilegrid.WMTS(info),
                        style: 'default'
                    })
                })
                break;
            case "CLOUD":
                viewOptions.zoom = 3 + viewOptions.zoom;
                viewOptions.minZoom = 3;
                layer = new ol.layer.Tile({
                    source: new ol.source.SuperMapCloud()
                });
                break;
            case "MARKER_LAYER":
                layer = this.createMarkersLayer(layerInfo);
                break;
            case "FEATURE_LAYER":
                if (layerInfo.identifier == "ANIMATORVECTOR") {
                    //todo
                } else if (layerInfo.identifier == "THEME") {
                    //todo
                } else {
                    layer = this.createVectorLayer(layerInfo);
                }
                break;
            default:
                throw new Error('unSupported Layer Type');
                break;
        }
        if (layer) {
            this.addLayer(layer, viewOptions);
        }
    }

    /**
     * @function ol.supermap.WebMap.prototype.getWmtsResolutionsAndMatrixIds
     * @description 获取WMTS图层的分辨率数组和标识矩阵
     * @param wellKnownScaleSet - {Object} 图层的分辨率数据集
     * @param units - {Object} 地图的单位元
     * @param scales - {Array<number>} 排序比例尺数组
     * @param mapOrigin - {Object} 原始地图
     * @param mapExtent - {Object} 地图的程度
     */
    getWmtsResolutionsAndMatrixIds(wellKnownScaleSet, units, scales, mapOrigin, mapExtent) {
        var resolutions = ol.wellKnownScale.getResolutions(wellKnownScaleSet);
        if (!resolutions && scales) {
            for (var i = 0; i < scales.length; i++) {
                resolutions.push(SuperMap.Util.getResolutionFromScaleDpi(scales[i], 90.71446714322, units));
            }
        }
        var origin = ol.wellKnownScale.getOrigin(wellKnownScaleSet);
        if (!origin) {
            origin = mapOrigin;
        }
        var extent = ol.wellKnownScale.getExtent(wellKnownScaleSet);
        if (!extent) {
            extent = mapExtent;
        }
        var matrixIds = ol.wellKnownScale.generateMatrixIds(resolutions.length);
        return {
            resolutions: resolutions,
            origin: origin,
            matrixIds: matrixIds,
            extent: extent
        };
    }

    /**
     * @function ol.supermap.WebMap.prototype.createTiandituLayer
     * @description 创建天地图图层
     * @param layerInfo - {Object} 图层信息
     * @param epsgCode - {number} epsg编码
     * @return {ol.layer.Tile} 获取天地图的图层
     */
    createTiandituLayer(layerInfo, epsgCode) {
        var proj = epsgCode === 4326 ? "c" : "w";
        var tdtURL =
            "http://t{0-7}.tianditu.com/{type}_{proj}/wmts?";
        var type = layerInfo.type.split('_')[1].toLowerCase();
        if (layerInfo.layerType === 'OVERLAY_LAYER') {
            if (type == "vec") type = "cva"
            if (type == "img") type = "cia"
            if (type == "ter") type = "cta"
        }
        tdtURL = tdtURL.replace("{type}", type).replace("{proj}", proj);
        var layer = new ol.layer.Tile({
            source: new ol.source.Tianditu({
                url: tdtURL,
                matrixSet: proj,
                layer: type,
                projection: "EPSG:" + epsgCode
            })
        })
        return layer;
    }

    /**
     * @function ol.supermap.WebMap.prototype.createMarkersLayer
     * @description 创建图标图层
     * @param layerInfo - {Object} 图层信息
     * @return {ol.layer.Vector}
     */
    createMarkersLayer(layerInfo) {
        var markers = layerInfo.markers || [];
        //todo offset
        var layer = new ol.layer.Vector({
            style: function (feature) {
                return StyleUtils.getStyleFromiPortalMarker(feature.getProperties().icon);
            },
            source: new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(ol.supermap.Util.toGeoJSON(markers)),
                wrapX: false
            })
        });

        return layer;
    }

    /**
     * @function ol.supermap.WebMap.prototype.createVectorLayer
     * @description 创建矢量要素图层
     * @param layerInfo - {Object} 图层信息
     * @return {ol.layer.Vector}
     */
    createVectorLayer(layerInfo) {
        var style = layerInfo.style;
        //opacity = layerInfo.opacity,
        //isVisible = layerInfo.isVisible;
        //todo readonly = layerInfo.readonly;
        if (!layerInfo.url) {
            var layer = new ol.layer.Vector({
                style: function (feature) {
                    return StyleUtils.getStyleFromiPortalStyle(style, feature.getGeometry().getType(), feature.getProperties().style);
                },
                source: new ol.source.Vector({
                    features: (new ol.format.GeoJSON()).readFeatures(ol.supermap.Util.toGeoJSON(layerInfo.features)),
                    wrapX: false
                })
            });

            return layer;
        } else {
            var url = layerInfo.url,
                datasourceName = layerInfo.name,
                datasets = layerInfo.features;
            style = layerInfo.style;
            var me = this;
            var fun = function (serviceResult) {
                var layer = new ol.layer.Vector({
                    style: function (feature) {
                        return StyleUtils.getStyleFromiPortalStyle(style, feature.getGeometry().getType(), feature.getProperties().style);
                    },
                    source: new ol.source.Vector({
                        features: (new ol.format.GeoJSON()).readFeatures(serviceResult.element.result),
                        wrapX: false
                    })
                });
                me.map.addLayer(layer);
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
                    new ol.supermap.GetFeaturesService(url).getFeaturesBySQL(sqlParam).on("complete", fun);
                }
            }
        }
    }

    /**
     * @function ol.supermap.WebMap.prototype.createWmsLayer
     * @description 创建Wms图层
     * @param layerInfo - {Object} 图层信息
     * @return {ol.layer.Tile}
     */
    createWmsLayer(layerInfo) {
        var url = layerInfo.url,
            opacity = layerInfo.opacity,
            subLayers = layerInfo.subLayers;

        if (!subLayers || subLayers === "undefined" || subLayers === "null") {
            subLayers = "0";
        }
        return new ol.layer.Tile({
            opacity: opacity,
            source: new ol.source.TileWMS({
                url: url,
                params: {
                    'LAYERS': subLayers,
                    'FORMAT': 'image/png'
                }
            })
        })
    }

}

ol.supermap.WebMap = WebMap;
ol.supermap.WebMap.EventType = {
    WEBMAPLOADEND: 'webmaploadend',
};