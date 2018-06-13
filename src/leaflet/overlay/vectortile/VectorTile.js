import L from "leaflet";
import {VectorFeatureType} from './VectorFeatureType';
import {TextSymbolizer} from './TextSymbolizer';
import {PointSymbolizer} from './PointSymbolizer';
import {LineSymbolizer} from './LineSymbolizer';
import {RegionSymbolizer} from './RegionSymbolizer';
import {VectorTilePBF} from './VectorTilePBF';
import {VectorTileJSON} from './VectorTileJSON';
import {VectorTileFormat} from '../VectorTileFormat';

/**
 * @class L.supermap.VectorTile
 * @classdesc 矢量瓦片图层基类
 * @category Visualization VectorTile
 * @private
 * @extends {L.Class}
 * @param {Object} options - 矢量瓦片类构造可选参数。
 * @param {string} options.layer - 图层名称。
 * @param {number} options.tileSize - 瓦片大小。
 * @param {string} options.format - 返回值类型。
 * @param {Object} options.coords -  坐标系统对象。
 * @param {Object} options.renderer - 渲染器对象。
 * @param {Function} done - 回调函数。
 */
export var VectorTile = L.Class.extend({

    initialize: function (options, done) {
        this.layer = options.layer;
        this.tileSize = options.layer.getTileSize();
        this.format = options.format;
        this.coords = options.coords;
        this.renderer = options.renderer;
        this.done = done;
        this.layer._textVectorTiles = {};
    },

    /**
     * @function L.supermap.VectorTile.prototype.renderTile
     * @description 渲染切片
     */
    renderTile: function () {
        var me = this, layer = me.layer, coords = me.coords;
        var tileFeatureUrl = layer._getTileUrl(coords);

        var format = [VectorTileFormat.MVT, VectorTileFormat.PBF];

        var tileFeaturePromise;
        if (format.indexOf(me.format.toUpperCase()) > -1) {
            tileFeaturePromise = new VectorTilePBF(tileFeatureUrl);
        } else {
            tileFeaturePromise = new VectorTileJSON(tileFeatureUrl)
        }

        tileFeaturePromise.getTile().then(function (tileFeature) {
            me.render(tileFeature, coords);
        })
    },

    /**
     * @function L.supermap.VectorTile.prototype.render
     * @description 渲染切片要素
     * @param {L.feature} tileFeature - 要渲染的切片要素
     * @param {Object} coords - 切片坐标参数对象
     */
    render: function (tileFeature, coords) {
        if (!tileFeature) {
            return;
        }
        var me = this,
            renderer = me.renderer,
            tileLayer = me.layer;

        for (var k = 0; k < tileFeature.length; k++) {
            var layer = tileFeature[k], layerName = layer.layerName;
            tileLayer._dataLayerNames[layerName] = true;
            var pxPerExtent = me.tileSize.divideBy(layer.extent);
            var layerStyleInfo = tileLayer.getLayerStyleInfo(layer.layerName);

            for (var i = 0; i < layer.features.length; i++) {
                var feat = layer.features[i];
                if (!feat) {
                    continue;
                }

                //标签图层处理为文本
                if (layerStyleInfo.type === VectorFeatureType.LABEL
                    && feat.type === VectorFeatureType.POINT
                    && feat.properties.attributes) {
                    feat.type = VectorFeatureType.TEXT;
                }

                var styleOptions = me._getStyleOptions(coords, feat, layerName, me);
                if (!styleOptions.length) {
                    continue;
                }

                var featureLayer = me._createFeatureLayer(feat, pxPerExtent);

                if (!featureLayer) {
                    continue;
                }

                // 保存文本图层单独绘制，避免被压盖
                var param = {scope: me, coords: coords, renderer: renderer};
                if (me._extractTextLayer(feat, featureLayer, styleOptions, param)) {
                    continue;
                }

                for (var j = 0; j < styleOptions.length; j++) {
                    var style = me._validateStyle(styleOptions[j], feat.type);
                    featureLayer.render(renderer, style);
                    renderer._addPath(featureLayer);
                }

                if (tileLayer.options.interactive) {
                    featureLayer.makeInteractive();
                }

                var featureKey = tileLayer._getFeatureKey(feat.id, layerName);
                renderer._features[featureKey] = {
                    layerName: layerName,
                    feature: featureLayer
                };
            }
        }

        if (tileLayer._map) {
            renderer.addTo(tileLayer._map);
        }

        L.Util.requestAnimFrame(me.done.bind(coords, null, me.layer._vectorTiles[me.layer._tileCoordsToKey(coords)]));
    },

    // 保存文本图层单独绘制，避免被压盖
    _extractTextLayer: function (feat, featureLayer, style, param) {

        if (feat.type !== VectorFeatureType.TEXT) {
            return false;
        }

        var me = param.scope,
            coords = param.coords,
            tileLayer = me.layer,
            key = tileLayer._tileCoordsToKey(coords);

        var id = feat.id,
            layerName = feat.layerName;

        var textTileLayers = tileLayer._textVectorTiles[key];
        if (!textTileLayers) {
            textTileLayers = {
                layers: {},
                coords: coords,
                renderer: param.renderer
            };
        }

        // 不同瓦片可能请求到同一个文本图层，为避免重复绘制，只保存绘制最后一个
        textTileLayers.layers[id] = {
            layer: featureLayer,
            style: style,
            layerName: layerName
        };
        tileLayer._textVectorTiles[key] = textTileLayers;
        return true;
    },

    _getStyleOptions: function (coords, feature, layerName, scope) {
        var me = scope;
        var tileLayer = me.layer;
        var styleOptions = tileLayer.getVectorTileLayerStyle(coords, feature) || me._defaultStyle(feature.type);

        //根据id和layerName识别唯一要素
        var id = feature.id,
            styleKey = tileLayer._getFeatureKey(id, layerName),
            styleOverride = tileLayer._overriddenStyles[styleKey];

        styleOptions = styleOverride ? styleOverride : styleOptions;
        styleOptions = (styleOptions instanceof Function) ? styleOptions(feature.properties, coords.z) : styleOptions;
        styleOptions = !(styleOptions instanceof Array) ? [styleOptions] : styleOptions;
        return styleOptions;
    },

    _createFeatureLayer: function (feat, pxPerExtent) {
        var layer;
        switch (feat.type) {
            case VectorFeatureType.POINT:
                layer = new PointSymbolizer(feat, pxPerExtent);
                break;
            case VectorFeatureType.LINE:
                layer = new LineSymbolizer(feat, pxPerExtent);
                break;
            case VectorFeatureType.REGION:
                layer = new RegionSymbolizer(feat, pxPerExtent);
                break;
            case VectorFeatureType.TEXT:
                layer = new TextSymbolizer(feat, pxPerExtent);
                break;
            default:
                break;
        }
        var vectorLayer = this.layer;

        if (layer && vectorLayer.options.interactive) {
            layer.addEventParent(vectorLayer);
        }

        return layer;
    },

    //矫正一些参数
    _validateStyle: function (style, type) {
        //默认leaflet path的边宽为3，矩形颜色填充透明度为0.2，跟iClient不一样，故作调整
        L.Path.prototype.options.weight = 1;
        L.Path.prototype.options.fillOpacity = 1;
        switch (type) {
            case VectorFeatureType.POINT:
                return L.extend({}, L.CircleMarker.prototype.options, style);
            case VectorFeatureType.LINE:
                return L.extend({}, L.Polyline.prototype.options, style);
            case VectorFeatureType.REGION:
                return L.extend({}, L.Polygon.prototype.options, style);
            case VectorFeatureType.TEXT:
                return L.extend({}, TextSymbolizer.prototype.options, style);
            default:
                break;
        }
    },

    //如果cartoCSS和layerInfo都没有得到样式，则使用该默认样式
    _defaultStyle: function (type) {
        var defaultOptions = L.Path.prototype.options;
        defaultOptions.weight = 1;
        defaultOptions.fillOpacity = 1;
        defaultOptions.radius = 3;
        switch (type) {
            case VectorFeatureType.POINT:
                return L.extend({}, defaultOptions, L.CircleMarker.prototype.options);
            case VectorFeatureType.LINE:
                return L.extend({}, defaultOptions, L.Polyline.prototype.options);
            case VectorFeatureType.REGION:
                return L.extend({}, defaultOptions, L.Polygon.prototype.options);
            case VectorFeatureType.TEXT:
                return L.extend({}, defaultOptions, TextSymbolizer.prototype.options);
            default:
                break;
        }
    }

});