require('../../core/Base');
require('./VectorFeatureType');
require("./VectorTileFormat");
require('./TextSymbolizer');
require('./PointSymbolizer');
require('./LineSymbolizer');
require('./RegionSymbolizer');
require('./VectorTileJSON');
require('./VectorTilePBF');
var L = require("leaflet");

var VectorTile = L.Class.extend({

    initialize: function (options, done) {
        this.layer = options.layer;
        this.tileSize = options.layer.getTileSize();
        this.format = options.format;
        this.coords = options.coords;
        this.renderer = options.renderer;
        this.done = done;
        this.layer._textVectorTiles = {};
    },

    renderTile: function () {
        var me = this, layer = me.layer, coords = me.coords;
        var tileFeatureUrl = layer._getTileUrl(coords);

        var format = [L.supermap.VectorTileFormat.MVT, L.supermap.VectorTileFormat.PBF];

        var tileFeaturePromise;
        if (format.indexOf(me.format.toUpperCase()) > -1) {
            tileFeaturePromise = L.supermap.vectorTilePBF(tileFeatureUrl);
        } else {
            tileFeaturePromise = L.supermap.vectorTileJSON(tileFeatureUrl)
        }

        tileFeaturePromise.getTile().then(function (tileFeature) {
            me.render(tileFeature, coords);
        }).catch(function (ex) {
            console.error('error', ex)
        });
    },

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
                if (layerStyleInfo.type === L.supermap.VectorFeatureType.LABEL
                    && feat.type === L.supermap.VectorFeatureType.POINT
                    && feat.properties.attributes) {
                    feat.type = L.supermap.VectorFeatureType.TEXT;
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

        if (feat.type !== L.supermap.VectorFeatureType.TEXT) {
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
            case L.supermap.VectorFeatureType.POINT:
                layer = new L.PointSymbolizer(feat, pxPerExtent);
                break;
            case L.supermap.VectorFeatureType.LINE:
                layer = new L.LineSymbolizer(feat, pxPerExtent);
                break;
            case L.supermap.VectorFeatureType.REGION:
                layer = new L.RegionSymbolizer(feat, pxPerExtent);
                break;
            case L.supermap.VectorFeatureType.TEXT:
                layer = new L.TextSymbolizer(feat, pxPerExtent);
                break;
            default:
                break;
        }
        var vectorLayer = this.layer;

        if (vectorLayer.options.interactive) {
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
            case L.supermap.VectorFeatureType.POINT:
                return L.extend({}, L.CircleMarker.prototype.options, style);
            case L.supermap.VectorFeatureType.LINE:
                return L.extend({}, L.Polyline.prototype.options, style);
            case L.supermap.VectorFeatureType.REGION:
                return L.extend({}, L.Polygon.prototype.options, style);
            case L.supermap.VectorFeatureType.TEXT:
                return L.extend({}, L.TextSymbolizer.prototype.options, style);
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
            case L.supermap.VectorFeatureType.POINT:
                return L.extend({}, defaultOptions, L.CircleMarker.prototype.options);
            case L.supermap.VectorFeatureType.LINE:
                return L.extend({}, defaultOptions, L.Polyline.prototype.options);
            case L.supermap.VectorFeatureType.REGION:
                return L.extend({}, defaultOptions, L.Polygon.prototype.options);
            case L.supermap.VectorFeatureType.TEXT:
                return L.extend({}, defaultOptions, L.TextSymbolizer.prototype.options);
            default:
                break;
        }
    },

});

L.supermap.vectorTile = function (options, done) {
    return new VectorTile(options, done);
};
module.exports = VectorTile;