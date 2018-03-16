import ol from 'openlayers';
import jsonsql from "jsonsql";
import proj4 from "proj4";
import {
    FetchRequest,
    DataFormat,
    ServerFeature,
    ThemeStyle,
    CommonUtil,
    GeoJSON as GeoJSONFormat,
    GeometryPoint,
    GeometryVector,
    GetFeaturesBySQLParameters
} from '@supermap/iclient-common';
import {Util} from '../core/Util';
import {StyleUtils} from '../core/StyleUtils';
import {Graphic} from '../overlay/graphic/Graphic';
import {ThemeFeature} from '../overlay/theme/ThemeFeature';
import {FeatureService} from "../services/FeatureService";
import {Tianditu as TiandituTileLayer} from '../mapping/Tianditu';
import {Unique as UniqueThemeSource} from "../overlay/Unique";
import {Range as RangeThemeSource} from "../overlay/Range";
import {Label as LabelThemeSource} from "../overlay/Label";
import {Logo} from '../control/Logo';
import "@supermap/iclient-common/style/supermapol-icons.css";

ol.supermap = ol.supermap || {};

/**
 * @class ol.supermap.WebMap
 * @category  iPortal/Online
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
export class WebMap extends ol.Observable {

    constructor(id, options) {
        super();
        WebMap.EventType = {
            WEBMAPLOADEND: 'webmaploadend'
        };
        this.id = id;
        options = options || {};
        this.target = options.target || 'map';
        this.map = options.map;
        this.server = options.server || 'http://www.supermapol.com';
        this.credentialValue = options.credentialValue;
        this.credentialKey = options.credentialKey || 'key';
        this.SERVER_TYPE_MAP = {
            "EPSG:4326": "WGS84",
            "EPSG:3857": "MERCATOR",
            "EPSG:900913": "MERCATOR",
            "EPSG:102113": "MERCATOR",
            "EPSG:910101": "GCJ02",
            "EPSG:910111": "GCJ02MERCATOR",
            "EPSG:910102": "BD",
            "EPSG:910112": "BDMERCATOR"
        }
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
        if (!Util.isArray(layersJson)) {
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
                baseLayerJson = layerJson;

            }
        }
        var viewOptions = this._getViewOptions(baseLayerJson);
        if (!this.map) {
            var view = new ol.View(viewOptions);
            var controls = ol.control.defaults({attributionOptions: {collapsed: false}})
                .extend([new Logo()]);
            this.map = new ol.Map({
                target: this.target,
                view: view,
                controls: controls
            });
            var me = this;
            this.map.once('postrender', function () {
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
                me.dispatchEvent({type: WebMap.EventType.WEBMAPLOADEND, value: this});
            });
            view.fit(viewOptions.extent);

        }

    }

    /**
     * @function ol.supermap.WebMap.prototype.addLayer
     * @description 添加图层
     * @param layer -{ol.layer.Vector} ol图层
     */
    addLayer(layer) {
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
            resolutions.push(CommonUtil.GetResolutionFromScaleDpi(scales[i], dpi, units, datum))
        }
        return resolutions;
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
            bounds = layerInfo.bounds || this.mapInfo.extent,
            scales = layerInfo.scales,
            opacity = layerInfo.opacity,
            origin = [bounds.leftBottom.x, bounds.rightTop.y],
            extent = [bounds.leftBottom.x, bounds.leftBottom.y, bounds.rightTop.x, bounds.rightTop.y];
        var projection = this.toProjection(epsgCode, prjCoordSys ? prjCoordSys.type : '', extent);
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
                        }) : ol.source.TileSuperMapRest.createTileGrid(extent),
                        attributions: new ol.Attribution({
                            html: ";Map Data <span>© <a href='http://www.supermapol.com'>SuperMap Online</a></span> with <span>© <a href='http://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>"
                        })
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
                layer = this.createTiandituLayer(layerInfo, epsgCode);
                break;
            case "BAIDU":
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
                });
                break;
            case "CLOUD":
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
                    layer = this.createThemeLayer(layerInfo);
                } else {
                    layer = this.createVectorLayer(layerInfo);
                }
                break;
            default:
                throw new Error('unSupported Layer Type');
        }
        if (layer) {
            this.addLayer(layer);
            if (layer.labelLayer) {
                this.addLayer(layer.labelLayer);
            }
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
                resolutions.push(CommonUtil.getResolutionFromScaleDpi(scales[i], 90.71446714322, units));
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
        var type = layerInfo.type.split('_')[1].toLowerCase();
        var isLabel = layerInfo.layerType === 'OVERLAY_LAYER';
        var layer = new ol.layer.Tile({
            source: new TiandituTileLayer({
                layerType: type,
                isLabel: isLabel,
                projection: "EPSG:" + epsgCode
            })
        });
        return layer;
    }

    /**
     * @function ol.supermap.WebMap.prototype.createMarkersLayer
     * @description 创建图标图层
     * @param layerInfo - {Object} 图层信息
     * @return {ol.layer.Vector} 返回Marker图层对象
     */
    createMarkersLayer(layerInfo) {
        var markers = layerInfo.markers || [];
        //todo offset
        var layer = new ol.layer.Vector({
            style: function (feature) {
                return StyleUtils.getStyleFromiPortalMarker(feature.getProperties().icon);
            },
            source: new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(Util.toGeoJSON(markers)),
                wrapX: false
            })
        });

        return layer;
    }

    /**
     * @function ol.supermap.WebMap.prototype.createVectorLayer
     * @description 创建矢量要素图层
     * @param layerInfo - {Object} 图层信息
     * @return {ol.layer.Vector} 返回矢量要素图层对象
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
                    features: (new ol.format.GeoJSON()).readFeatures(Util.toGeoJSON(layerInfo.features)),
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
                    var sqlParam = new GetFeaturesBySQLParameters({
                        queryParameter: {
                            name: dataset.name + "@" + datasourceName,
                            attributeFilter: "SMID >0"
                        },
                        datasetNames: [datasourceName + ":" + dataset.name]
                    });
                    new FeatureService(url).getFeaturesBySQL(sqlParam).on("complete", fun);
                }
            }
        }
    }

    /**
     * @function ol.supermap.WebMap.prototype.createWmsLayer
     * @description 创建Wms图层
     * @param layerInfo - {Object} 图层信息
     * @return {ol.layer.Tile} 返回Wms图层对象
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

    /**
     * @private
     * @function ol.supermap.WebMap.prototype.createThemeLayer
     * @description 创建专题图图层
     * @param layerInfo - {Object} 图层信息
     * @return {L.Layer} 返回专题图图层对象
     */
    createThemeLayer(layerInfo) {
        var themeSettings = layerInfo.themeSettings && JSON.parse(layerInfo.themeSettings);

        var layer;
        var type = themeSettings.type;
        layerInfo.themeSettings = themeSettings;
        if (type === "HEAT") {
            layer = this.createHeatLayer(layerInfo, themeSettings);
        } else if (type === "UNIQUE") {
            layer = this.createUniqueLayer(layerInfo, themeSettings);
        } else if (type === "RANGE") {
            layer = this.createRangeLayer(layerInfo, themeSettings);
        } else {
            layer = this.createBaseThemeLayer(layerInfo, themeSettings);
        }
        if (layer) {
            this.addFeature2ThemeLayer(layerInfo, layer);
            layer.on('add', (e) => {
                this.registerThemeEvent(e.target);
            })
        }
        if (layerInfo.themeSettings && themeSettings.labelField) {
            var labelLayer = this.createLabelLayer(layerInfo, themeSettings);
            labelLayer.on('add', (e) => {
                this.registerThemeEvent(e.target);
            });
            layer.labelLayer = labelLayer;
        }
        //数据来源都一样。所以不用添加重复的attributions
        layer.getSource().setAttributions(" ");

        return layer;
    }

    createBaseThemeLayer(layerInfo, themeSettings) {
        let style = layerInfo.style, opacity = layerInfo.opacity, vectorType = themeSettings.vectorType,
            featureStyle = style.pointStyle;
        if (vectorType === "LINE") {
            featureStyle.fill = false;
        } else {
            featureStyle.fill = true;
        }

        var imageStyleOptions = {};

        if (featureStyle.fill) {
            imageStyleOptions.fill = new ol.style.Fill({
                color: featureStyle.fillColor
            });
        }
        if (featureStyle.pointRadius) {
            imageStyleOptions.radius = parseFloat(featureStyle.pointRadius);
        }
        if (featureStyle.strokeColor || featureStyle.strokeWidth) {
            imageStyleOptions.stroke = new ol.style.Stroke({
                color: featureStyle.strokeColor,
                width: featureStyle.strokeWidth,
                lineCap: featureStyle.strokeLineCap
            })
        }
        var pointStyle = new ol.style.Style({
            image: new ol.style.Circle(imageStyleOptions)
        });
        if (featureStyle.unicode) {
            let label = featureStyle.label.replace(/^&#x/, '');
            label = String.fromCharCode(parseInt(label, 16));
            pointStyle.setText(new ol.style.Text({
                text: label,
                font: featureStyle.fontSize + " supermapol-icons",
                fill: new ol.style.Fill({color: featureStyle.fontColor})
            }));

        }

        var vectorSource = new ol.source.Vector({
            features: [],
            wrapX: false
        });

        this.registerThemeEvent(vectorSource);

        return new ol.layer.Vector({
            source: vectorSource,
            style: pointStyle,
            opacity: opacity
        });

    }

    createUniqueLayer(layerInfo, themeSettings) {
        var title = layerInfo.title;
        var themeField = themeSettings.field, styleGroups = [], settings = themeSettings.settings,
            isVisible = layerInfo.isVisible, opacity = layerInfo.opacity, vectorType = themeSettings.vectorType;

        for (var i = 0; i < settings.length; i++) {
            var object = {};
            object.value = settings[i].value;
            object.style = settings[i].style;
            styleGroups.push(object);
        }
        var unique = new UniqueThemeSource(title, {
            map: this.map,
            wrapX: false,
            opacity: opacity,
            visibility: isVisible
        });


        unique.style = layerInfo.style.pointStyle;
        if (vectorType === "LINE") {
            unique.style.fill = false;
        }
        unique.style.stroke = true;
        unique.themeField = themeField;
        unique.styleGroups = styleGroups;
        var that = this;
        unique.on('click', function (event) {
            if (event.target && event.target.refDataID) {
                var currenFeature = unique.getFeatureById(event.target.refDataID);
                that.events.triggerEvent("uniquefeatureclicked", currenFeature, unique);
            }
        });
        var themeLayer = new ol.layer.Image({
            source: unique
        });

        this.registerThemeEvent(unique);
        themeLayer.setOpacity(opacity);
        return themeLayer;
    }

    createRangeLayer(layerInfo, themeSettings) {
        var title = layerInfo.title;
        var themeField = themeSettings.field, styleGroups = [], settings = themeSettings.settings,
            isVisible = layerInfo.isVisible, opacity = layerInfo.opacity, vectorType = themeSettings.vectorType,
            featureStyle = layerInfo.style.pointStyle;
        if (vectorType === "LINE") {
            featureStyle.fill = false;
        } else {
            featureStyle.fill = true;
        }
        //组成styleGroup
        for (var i = 0; i < settings.length; i++) {
            var object = {};
            object.start = settings[i].start;
            object.end = settings[i].end;
            object.style = settings[i].style;
            styleGroups.push(object);
        }
        var range = new RangeThemeSource(title, {
            map: this.map,
            wrapX: false,
            opacity: opacity,
            visibility: isVisible
        });
        range.style = layerInfo.style.pointStyle;
        range.style.stroke = true;
        range.themeField = themeField;
        range.styleGroups = styleGroups;
        this.registerThemeEvent(range);
        var themeLayer = new ol.layer.Image({
            source: range
        });
        themeLayer.setOpacity(opacity);
        return themeLayer;
    }

    createLabelLayer(layerInfo, themeSettings) {
        var title = layerInfo.title;
        var labelField = themeSettings.labelField, settings = themeSettings.settings,
            isVisible = layerInfo.isVisible, opacity = layerInfo.opacity;

        //目前只是同一样式
        var style;
        if (!settings || settings.length > 0) {
            style = {
                "fillColor": "#ffffff"
            };
        } else {
            style = settings[0].style;
        }
        var layerStyle = CommonUtil.extend(new ThemeStyle(), style);
        layerStyle.fontWeight = "bold";
        layerStyle.fontSize = "14px";
        //默认显示标签边框背景
        layerStyle.labelRect = true;
        layerStyle.strokeColor = layerStyle.fillColor;
        layerStyle.fontColor = themeSettings.labelColor;
        if (themeSettings.labelFont) {
            layerStyle.fontFamily = themeSettings.labelFont;
        }

        //目前label数据跟其他专题图图层数据来源一样。所以attribution不用重复
        var label = new LabelThemeSource(title, {
            map: this.map,
            attributions: " ",
            wrapX: false,
            opacity: 0.7,
            visibility: isVisible
        });

        label.style = layerStyle;

        label.themeField = labelField;
        //styleGroup, 目前只是同一样式
        label.styleGroups = [];

        this.registerThemeEvent(label);
        var themeLayer = new ol.layer.Image({
            source: label
        });
        themeLayer.setOpacity(opacity);
        return themeLayer;
    }

    createHeatLayer(layerInfo, themeSettings) {
        let colors = themeSettings.colors || ['blue', 'cyan', 'lime', 'yellow', 'red'];
        let gradient = colors, featureWeight, blur, shadow;

        let radius = parseFloat(themeSettings.settings[0].radius);
        //判断单位
        if (themeSettings.heatUnit === "千米" || themeSettings.heatUnit === "km") {
            radius = themeSettings.heatRadius * 1000
        }
        //权重
        if (themeSettings.settings[0] && themeSettings.settings[0].featureWeight) {
            featureWeight = themeSettings.settings[0].featureWeight;
        }
        //阴影
        if (themeSettings.settings[0] && themeSettings.settings[0].shadow) {
            shadow = themeSettings.settings[0].shadow;
        }
        //模糊
        if (themeSettings.settings[0] && themeSettings.settings[0].blur) {
            blur = themeSettings.settings[0].blur;
        }

        var layer = new ol.layer.Heatmap({
            source: new ol.source.Vector({
                features: [],
                wrapX: false
            }),
            blur: blur,
            shadow: shadow,
            radius: radius,
            gradient: gradient,
            weight: featureWeight
        });
        return layer;
    }

    addFeature2ThemeLayer(layerInfo, layer) {
        if (layerInfo.layerType !== "FEATURE_LAYER" || layerInfo.identifier !== "THEME") {
            return;
        }
        var me = this;
        var isRestData = !!layerInfo.datasourceName;
        var cartoCSS = layerInfo.cartoCSS;
        if (cartoCSS) {
            var needTransform = this.getCartoCSS2Obj(cartoCSS).needTransform;
            var isAddFile = this.getCartoCSS2Obj(cartoCSS).isAddFile;
        }

        var url = layerInfo.url, subLayers, subLayer, layerName, credential = layerInfo.credential,
            themeSettings = layerInfo.themeSettings, filter = themeSettings.filter;

        if (isAddFile) {
            var position = JSON.parse(layerInfo.datasourceName);
            var sql = this.getSQLFromFilter(filter);
            if (url) {
                this.getFeatureFromFileAdded(layerInfo, function (data) {
                    var sFeaturesArr = [], features, result;
                    if (data.type === 'EXCEL' || data.type === 'CSV') {
                        features = me.parseFeatureFromEXCEL.apply(me, [data.content.rows, data.content.colTitles, false, position]);
                        for (var x = 0, len = features.length; x < len; x++) {
                            result = jsonsql({attr: features[x].attributes}, sql);
                            if (result.length > 0) {
                                sFeaturesArr.push(features[x])
                            }
                        }
                    } else {
                        features = me.parseFeatureFromJson(data.content);
                        for (var i = 0, length = features.length; i < length; i++) {
                            result = jsonsql({attr: features[i].attributes}, sql);
                            if (result.length > 0) {
                                sFeaturesArr.push(features[i]);
                            }
                        }
                    }
                    var newEpsgCode = me.mapInfo && me.mapInfo.epsgCode,
                        oldEpsgCode = layerInfo.prjCoordSys && layerInfo.prjCoordSys.epsgCode;
                    if (needTransform) {
                        me.changeFeatureLayerEpsgCode(oldEpsgCode, newEpsgCode, layer, sFeaturesArr, function (features) {
                            addFeatures(features);
                        });
                    } else {
                        addFeatures(sFeaturesArr);
                    }
                }, function (err) {// eslint-disable-line no-unused-vars
                });
            } else {
                var newFeautures = [], features = layerInfo.features;
                for (var i = 0, len = features.length; i < len; i++) {
                    var feature = features[i];
                    var sqlResult = jsonsql({attr: feature.attributes}, sql);
                    if (sqlResult.length > 0) {
                        var lon = feature.geometry.points[0].x,
                            lat = feature.geometry.points[0].y;
                        var point = new GeometryPoint(lon, lat);
                        var vector = new GeometryVector(point, feature.attributes, feature.style);
                        newFeautures.push(vector);
                    }
                }
                addFeatures(newFeautures);
            }
        } else if (isRestData) {
            var dataSourceName = layerInfo.datasourceName;
            subLayers = layerInfo.subLayers && JSON.parse(layerInfo.subLayers);
            if (subLayers.length && subLayers.length > 0) {
                subLayer = subLayers[0];
            } else {
                subLayer = subLayers;
            }
            layerName = subLayer && subLayer.name;
            this.getFeaturesBySQL(layerInfo.url, dataSourceName, layerName, themeSettings.filter, DataFormat.ISERVER, (getFeaturesEventArgs) => {
                var features, feature, result = getFeaturesEventArgs.result, addedFeatures = [];
                if (result && result.features) {
                    features = result.features;
                    for (var fi = 0, felen = features.length; fi < felen; fi++) {
                        feature = new ServerFeature.fromJson(features[fi]).toFeature();
                        addedFeatures.push(feature);
                    }
                    var newEpsgCode = me.mapInfo && me.mapInfo.epsgCode,
                        oldEpsgCode = layerInfo.prjCoordSys && layerInfo.prjCoordSys.epsgCode;

                    if (needTransform) {
                        this.changeFeatureLayerEpsgCode(oldEpsgCode, newEpsgCode, layer, addedFeatures, function (features) {
                            addFeatures(features);
                        });
                    } else {
                        addFeatures(features);
                    }
                }
            })
        } else {
            subLayers = layerInfo.subLayers && JSON.parse(layerInfo.subLayers);
            if (subLayers.length && subLayers.length > 0) {
                subLayer = subLayers[0];
            } else {
                subLayer = subLayers;
            }
            layerName = subLayer && subLayer.name;
            var oldEpsgCode = layerInfo.prjCoordSys && layerInfo.prjCoordSys.epsgCode;
            this.getFeaturesBySQL(url, credential, layerName, filter, DataFormat.ISERVER, function (features) {
                var newEpsgCode = me.mapInfo && me.mapInfo.epsgCode;
                if (needTransform) {
                    me.changeFeatureLayerEpsgCode(oldEpsgCode, newEpsgCode, layer, features, function (features) {
                        addFeatures(features);
                    });
                } else {
                    addFeatures(features);
                }
            });
        }

        function addFeatures(features) {
            var source = layer.getSource();
            if (layer.labelLayer) {
                me.addFeature2LabelLayer(layer.labelLayer, features, layerInfo);
            }


            if (layer instanceof ol.layer.Heatmap) {
                var heatFeatures = [], featureWeight;
                if (themeSettings.settings && themeSettings.settings[0] && themeSettings.settings[0].featureWeight) {
                    featureWeight = themeSettings.settings[0].featureWeight;
                }
                for (let i = 0, len = features.length; i < len; i++) {
                    let geometry = features[i].geometry;
                    var attributes = features[i].attributes;
                    var feature = new ol.Feature(attributes);
                    feature.set("geometry", new ol.geom.Point([geometry.x, geometry.y]));
                    if (featureWeight) {
                        feature.set(featureWeight, parseFloat(feature.get(featureWeight)) - 5);
                    }
                    heatFeatures.push(feature);
                }
                source.addFeatures(heatFeatures);
            } else if (layer instanceof ol.layer.Vector) {
                var feats = [];
                for (let j = 0, len = features.length; j < len; j++) {
                    let geometry = features[j].geometry;
                    let attributes = features[j].attributes;
                    let feature = new ol.Feature(attributes);
                    feature.set("geometry", new ol.geom.Point([geometry.x, geometry.y]));
                    feats.push(feature);
                }
                source.addFeatures(feats);
            } else {
                source.addFeatures(features);
            }

        }
    }

    addFeature2LabelLayer(layer, features, layerInfo) {
        if (!features) {
            return;
        }
        var labelSource = layer.getSource();
        var feature, geoTextFeature;
        var themeSettings = layerInfo.themeSettings;
        themeSettings = typeof themeSettings === "string" ? JSON.parse(layerInfo.themeSettings) : layerInfo.themeSettings;
        var themeField = themeSettings.labelField;

        var style = labelSource.style;
        var labelFeatures = [], lngLat;
        var styleInfo = layerInfo.styleString && JSON.parse(layerInfo.styleString);
        for (var i = 0; i < features.length; i++) {
            lngLat = this.getLabelLngLat(themeSettings.vectorType, features[i]);
            //设置标签的偏移量
            this.setLabelOffset(themeSettings.vectorType, styleInfo, features[i], style);
            feature = features[i];
            var attributes = feature.attributes;
            geoTextFeature = new ThemeFeature([lngLat.lng, lngLat.lat, attributes[themeField]], attributes);
            labelFeatures.push(geoTextFeature);
        }
        labelSource.style = style;
        labelSource.addFeatures(labelFeatures);
    }

    setLabelOffset(vectorType, styleInfo, feature, layerStyle) {
        if (vectorType === 'POINT') {
            var pointRadius = styleInfo.pointStyle.pointRadius || 0;
            var strokeWidth = styleInfo.pointStyle.strokeWidth || 0;
            var fontSize = parseInt(styleInfo.pointStyle.fontSize) || 0;
            layerStyle.labelXOffset = 0;
            layerStyle.labelYOffset = styleInfo.pointStyle.unicode ? 20 + fontSize : 25 + (pointRadius + strokeWidth);
        } else {
            return;
        }
    }

    getLabelLngLat(vectorType, feature) {
        var lngLat = {};
        if (vectorType === 'POINT') {
            var geometry = feature.geometry;
            lngLat.lng = geometry.x;
            lngLat.lat = geometry.y;
        } else if (vectorType === 'LINE') {
            //一条线所有顶点的数量
            var length, index;
            var components = feature.geometry.components;
            if (components[0].x) {
                //说明是lineString类型
                length = components.length;
                //线取中间点下一个显示标签
                index = parseInt(length / 2);
                lngLat.lng = components[index].x;
                lngLat.lat = components[index].y;
            } else {
                //说明是MultiLineString类型,取第一条线
                var lineOne = components[0].components;
                length = lineOne.length;
                index = parseInt(length / 2);
                lngLat.lng = lineOne[index].x;
                lngLat.lat = lineOne[index].y;
            }
        } else {
            var centroid = feature.geometry.getCentroid();
            lngLat.lng = centroid.x;
            lngLat.lat = centroid.y;
        }
        return lngLat;
    }

    getFeaturesBySQL(url, datasourceName, datasetName, filter, format, callback) {
        filter = filter || "SMID > 0";
        var sqlParam = new GetFeaturesBySQLParameters({
            queryParameter: {
                name: datasetName + "@" + datasourceName,
                attributeFilter: filter
            },
            datasetNames: [datasourceName + ":" + datasetName]
        });
        new FeatureService(url).getFeaturesBySQL(sqlParam, callback, format);
    }

    changeFeatureLayerEpsgCode(oldEpsgCode, newEpsgCode, layer, features, success) {
        var me = this, i, len;
        var points = [];
        if (!oldEpsgCode || !newEpsgCode) {
            return;
        }
        if (features && features.length > 0) {
            for (i = 0, len = features.length; i < len; i++) {
                var feature = features[i];
                var geometry = feature.geometry;
                var vertices = geometry.getVertices();
                points = points.concat(vertices);
            }
            oldEpsgCode = 'EPSG:' + oldEpsgCode, newEpsgCode = 'EPSG:' + newEpsgCode;
            me.coordsTransform(oldEpsgCode, newEpsgCode, points, function (layer, features) {
                return function (newCoors) {
                    var start = 0, len = newCoors.length;
                    for (i = start; i < len; i++) {
                        var point = points[i], coor = newCoors[i];
                        point.x = coor.x;
                        point.y = coor.y;
                        point.calculateBounds();
                    }
                    for (i = 0, len = features.length; i < len; i++) {
                        var feature = features[i];
                        var geometry = feature.geometry;
                        if (geometry.components) {
                            me.calculateComponents(geometry.components);
                        }
                        geometry.calculateBounds();
                    }
                    success && success.call(me, features);
                }
            }(layer, features));
        }
        return true;
    }

    coordsTransform(fromEpsg, toEpsg, point, success) {
        var newCoord;
        var from = this.SERVER_TYPE_MAP[fromEpsg], to = this.SERVER_TYPE_MAP[toEpsg];
        if (fromEpsg === toEpsg || !from || !to) {
            if (point && point.length !== undefined) {
                newCoord = [];
                for (var i = 0, len = point.length; i < len; i++) {
                    var coor = {x: point[i].x, y: point[i].y};
                    newCoord.push(coor);
                }
            } else {
                newCoord = {x: point.x, y: point.y};
            }
            if (success) {
                success.call(this, newCoord);
            }
        } else {
            var mercator = this.SERVER_TYPE_MAP['EPSG:3857'], wgs84 = this.SERVER_TYPE_MAP['EPSG:4326'];
            if ((from === mercator || from === wgs84) && (to === mercator || to === wgs84)) {
                this.projTransform(fromEpsg, toEpsg, point, success);
            } else {
                var convertType = from + '_' + to;
                this.postTransform(convertType, point, success);
            }
        }
    }

    projTransform(fromEpsg, toEpsg, point, success) {
        var newCoor, me = this;
        if (!proj4) {
            return;
        }
        if (point && point.length !== undefined) {
            newCoor = [];
            for (var i = 0, len = point.length; i < len; i++) {
                var coor = proj4(fromEpsg, toEpsg, [point[i].x, point[i].y]);
                newCoor.push({x: coor[0], y: coor[1]});
            }
        } else {
            newCoor = proj4(fromEpsg, toEpsg, [point.x, point.y]);
            newCoor = {x: newCoor[0], y: newCoor[1]};
        }
        if (success) {
            me.dispatchEvent({type: 'coordconvertsuccess', coordinates: newCoor});
            success.call(me, newCoor);
        }
    }

    getAttributesObjFromTable(cols, colTitles) {
        if (cols.length === 0 || colTitles.length === 0) {
            return;
        }
        var attrArr = [];
        for (var i = 0; i < cols.length; i++) {
            var obj = {};
            for (var j = 0; j < colTitles.length; j++) {
                obj[colTitles[j]] = cols[i][j]
            }
            attrArr.push(obj);
        }
        return attrArr;
    }

    parseFeatureFromEXCEL(rows, colTitles, isGraphic, position) {
        var attrArr = this.getAttributesObjFromTable(rows, colTitles);
        var features = [];
        for (var i = 0, len = attrArr.length; i < len; i++) {
            var lon = attrArr[i][position["lon"]];
            var lat = attrArr[i][position["lat"]];
            if (!lon || !lat) {
                continue;
            }
            lon = parseFloat(lon);
            lat = parseFloat(lat);
            var geometry = new GeometryPoint(lon, lat);
            var pointGraphic;
            if (isGraphic) {
                pointGraphic = new Graphic(geometry, attrArr[i], null);
            } else {
                pointGraphic = new GeometryVector(geometry, attrArr[i], null);
            }
            features.push(pointGraphic);
        }
        return features;


    }

    parseFeatureFromJson(feature) {
        var format = new GeoJSONFormat();
        var features = format.read(feature);
        //兼容insights数据格式
        if (features == null) {
            var content = JSON.parse(feature.replace(/'/, '"'));
            if (content.isAnalyseResult || content.type === 'MapEditor' || content.type === 'DataInsights' || content.type === 'ISERVER') {
                content = content.data.recordsets[0].features;
            }
            format = new GeoJSONFormat();
            features = format.read(content);
        }
        for (var i = 0, len = features.length; i < len; i++) {
            features[i].attributes = features[i].attributes.properties || features[i].attributes;
        }
        return features;

    }

    getFeatureFromFileAdded(layerInfo, success, failed, isGraphic) {
        var url = isGraphic ? layerInfo.url + '?currentPage=1&&pageSize=9999999' : layerInfo.url;
        FetchRequest.get(url).then(response => response.json()).then(data => {
            success && success(data);
        }).catch(err => failed && failed(err));
    }

    getSQLFromFilter(filter) {

        if (!filter) {
            return ' * where (1==1||1>=0)'
        } else {
            filter = filter.replace(/=/g, '==').replace(/and|AND/g, '&&').replace(/or|OR/g, '||').replace(/>==/g, '>=').replace(/<==/g, '<=');
            return ' *  where (' + filter + ')';
        }
    }

    registerThemeEvent(themeLayer) {
        themeLayer.on('click', evt => {
            if (!themeLayer.map) {
                return;
            }
            if (this.selectedFeature) {
                this.fire('featureUnSelected', {feature: this.selectedFeature});
                this.selectedFeature = null;
            }
            let feature;
            if (evt.target && evt.target.refDataID) {
                feature = themeLayer.getFeatureById(evt.target.refDataID);
            }
            if (feature) {
                this.selectedFeature = feature;
                this.dispatchEvent({type: 'featureSelected', feature: feature});
            }
        });
        themeLayer.on('mousemove', evt => {
            if (!themeLayer.map) {
                return;
            }
            if (evt.target && evt.target.refDataID) {
                let feature;
                if (evt.target && evt.target.refDataID) {
                    feature = themeLayer.getFeatureById(evt.target.refDataID);
                }
                if (feature) {
                    this.dispatchEvent({type: 'featureMousemove', feature: feature});
                }

            }
        });
    }

    getCartoCSS2Obj(cartoCSS) {
        var isAddFile, needTransform = false;
        if (cartoCSS.indexOf('}') > -1) {
            cartoCSS = JSON.parse(cartoCSS);
            needTransform = cartoCSS.needTransform;
            isAddFile = cartoCSS.isAddFile;
        } else {
            if (cartoCSS === 'needTransform') {
                needTransform = true;
                isAddFile = false;
            } else {
                isAddFile = cartoCSS === 'true';
            }
        }
        return {
            isAddFile: isAddFile,
            needTransform: needTransform
        }


    }

    _getViewOptions(layerInfo) {
        var prjCoordSys = layerInfo.prjCoordSys,
            epsgCode = prjCoordSys && prjCoordSys.epsgCode || this.mapInfo.epsgCode,
            center = this.mapInfo.center || layerInfo.center,
            level = this.mapInfo.level || layerInfo.level,
            bounds = layerInfo.bounds || this.mapInfo.extent,
            origin = [bounds.leftBottom.x, bounds.rightTop.y],
            extent = [bounds.leftBottom.x, bounds.leftBottom.y, bounds.rightTop.x, bounds.rightTop.y];
        var projection = this.toProjection(epsgCode, prjCoordSys ? prjCoordSys.type : '', extent);
        var viewOptions = {
            center: [center.x, center.y],
            zoom: level,
            projection: projection,
            extent: extent
        };
        switch (layerInfo.type) {
            case "TIANDITU_VEC":
            case "TIANDITU_IMG":
            case "TIANDITU_TER":
                viewOptions.minZoom = 1;
                viewOptions.zoom = 1 + viewOptions.zoom;
                break;
            case "BAIDU":
                viewOptions.resolutions = [131072 * 2, 131072, 65536, 32768, 16284, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5];
                viewOptions.zoom = 3 + viewOptions.zoom;
                viewOptions.minZoom = 3;
                break;
            case "WMTS":
                var identifier = layerInfo.identifier;
                var wellKnownScaleSet = identifier.split("_")[0];
                var info = this.getWmtsResolutionsAndMatrixIds(wellKnownScaleSet, layerInfo.units, layerInfo.scales, origin, extent);
                viewOptions.resolutions = info.resolutions;
                break;
            case "CLOUD":
                viewOptions.zoom = 3 + viewOptions.zoom;
                viewOptions.minZoom = 3;
                break;
            default:
                break;
        }
        return viewOptions;

    }
}

ol.supermap.WebMap = WebMap;