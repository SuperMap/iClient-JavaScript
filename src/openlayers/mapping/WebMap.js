require('../core/Base');
var ol = require('openlayers/dist/ol-debug');
var Request = require('../../common/util/FetchRequest');
var SuperMap = require('../../common/SuperMap');
var StyleUtils = require('../core/StyleUtils');
ol.supermap.WebMap = function (id, options) {
    ol.Observable.call(this);
    this.id = id;
    options = options || {};
    this.target = options.target || 'map';
    this.map = options.map;
    this.server = options.server || 'http://www.supermapol.com';
    this.credentialValue = options.credentialValue;
    this.credentialKey = options.credentialKey || 'key';
    this.load();
};
ol.inherits(ol.supermap.WebMap, ol.Observable);

ol.supermap.WebMap.prototype.load = function () {
    if (this.server.indexOf('http://') < 0 && this.server.indexOf('https://') < 0) {
        this.server = "http://" + this.server;
    }
    var mapUrl = this.server + '/web/maps/' + this.id + '.json';
    if (this.credentialValue) {
        mapUrl += ('?' + this.credentialKey + '=' + this.credentialValue);
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
    })
};
ol.supermap.WebMap.prototype.createLayersByJson = function (layersJson) {
    if (!ol.supermap.Util.isArray(layersJson)) {
        return;
    }
    if (layersJson.length === 0) {
        return;
    }
    var layerQueue = [];
    for (var i = 0; i < layersJson.length; i++) {
        var layerInfo = layersJson[i];
        layerInfo["_originIndex"] = i;
        var layerType = layerInfo.layerType = layerInfo.layerType || "BASE_LAYER";
        var type = layerInfo.type;
        if (layerType !== "BASE_LAYER") {
            //如果图层不是底图，则先加到图层队列里面等待底图完成后再处理
            layerQueue.unshift(layerInfo);
            continue;
        } else {
            this.createLayer(type, layerInfo);
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
    this.dispatchEvent({type: ol.supermap.WebMap.EventType.WEBMAPLOADEND, value: this.map});
};
ol.supermap.WebMap.prototype.addLayer = function (layer, options) {
    if (!this.map) {
        this.createMap(options);
    }
    return this.map.addLayer(layer);
};
ol.supermap.WebMap.prototype.toProjection = function (epsgCode, type, extent) {
    if (epsgCode == -1000 && type == "PCS_NON_EARTH") {
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
};
ol.supermap.WebMap.prototype.createMap = function (options) {
    if (!this.map) {
        var view = new ol.View(options);
        this.map = new ol.Map({
            target: this.target,
            view: view
        });
        view.fit(options.extent);
    }
};
ol.supermap.WebMap.prototype.getResolutionsFromScales = function (scales, dpi, units, datum) {
    var resolutions = [];
    for (var i = 0; i < scales.length; i++) {
        resolutions.push(SuperMap.Util.GetResolutionFromScaleDpi(scales[i], dpi, units, datum))
    }
    return resolutions;
};
ol.supermap.WebMap.prototype.createLayer = function (type, layerInfo) {
    var prjCoordSys = layerInfo.prjCoordSys,
        epsgCode = prjCoordSys && prjCoordSys.epsgCode || this.mapInfo.epsgCode,
        center = this.mapInfo.center || layerInfo.center,
        level = this.mapInfo.level || layerInfo.level,
        bounds = this.mapInfo.extent || layerInfo.bounds,
        scales = layerInfo.scales,
        opacity = layerInfo.opacity,
        origin = [bounds.leftBottom.x, bounds.rightTop.y],
        extent = [bounds.leftBottom.x, bounds.leftBottom.y, bounds.rightTop.x, bounds.rightTop.y];
    var projection = this.toProjection(epsgCode, prjCoordSys ? prjCoordSys.type : '', extent);
    //var crs = this.createCRS(epsgCode, origin, resolution, boundsL);
    var viewOptions = {
        center: [center.x, center.y],
        zoom: level - 1,
        projection: projection,
        extent: extent
    };
    var layer;
    switch (type) {
        case "SUPERMAP_REST" :
            layer = new ol.layer.Tile({
                source: new ol.source.TileSuperMapRest({
                    url: layerInfo.url,
                    opaque: opacity
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
                source: new ol.source.Baidu()
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
};
/**
 * Method: getWmtsResolutionsAndMatrixIds
 * 获取WMTS图层的分辨率数组和标识矩阵
 * */
ol.supermap.WebMap.prototype.getWmtsResolutionsAndMatrixIds = function (wellKnownScaleSet, units, scales, mapOrigin, mapExtent) {
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
};

ol.supermap.WebMap.prototype.createTiandituLayer = function (layerInfo, epsgCode) {
    var proj = epsgCode === 4326 ? "c" : "w";
    var tdtURL =
        "http://t{0-7}.tianditu.com/{type}_{proj}/wmts?";
    var type = layerInfo.type.split('_')[1].toLowerCase();
    if (layerInfo.layerType === 'OVERLAY_LAYER') {
        if (type == "vec")type = "cva"
        if (type == "img")type = "cia"
        if (type == "ter")type = "cta"
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
};
ol.supermap.WebMap.prototype.createMarkersLayer = function (layerInfo) {
    var markers = layerInfo.markers || [],
        style = layerInfo.style,
        opacity = layerInfo.opacity,
        marker, point, size, offset, icon, that = this;
    //todo offset
    var layer = new ol.layer.Vector({
        style: function (feature) {
            return StyleUtils.getStyleFromiPortalMarker(feature.getProperties().icon);
        },
        source: new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(ol.supermap.Util.toGeoJSON(layerInfo.markers)),
            wrapX: false
        })
    });

    return layer;
};
/**
 * Method: createVectorLayer
 * 创建矢量要素图层
 * */
ol.supermap.WebMap.prototype.createVectorLayer = function (layerInfo) {
    var style = layerInfo.style,
        opacity = layerInfo.opacity,
        isVisible = layerInfo.isVisible;
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
                new ol.supermap.GetFeaturesService(url).getFeaturesBySQL(sqlParam).on("complete", function (serviceResult) {
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
                });
            }
        }
    }
};
ol.supermap.WebMap.prototype.createWmsLayer = function (layerInfo) {
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
ol.supermap.WebMap.EventType = {
    WEBMAPLOADEND: 'webmaploadend',
};

module.exports = ol.supermap.WebMap;