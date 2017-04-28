require('../../core/Base');
require('./VectorFeatureType');
require('./TextSymbolizer');
require('./PointSymbolizer');
require('./LineSymbolizer');
require('./RegionSymbolizer');
var L = require("leaflet");
var SuperMap = require('../../../common/SuperMap');
var TileFeatureProcessor = require('./TileFeatureProcessor');
var VectorTile = L.Class.extend({

    initialize: function (options, done) {
        this.layer = options.layer;
        this.tileSize = options.layer.getTileSize();
        this.coords = options.coords;
        this.renderer = options.renderer;
        this.done = done;
    },

    renderTile: function () {
        var me = this, layer = me.layer, coords = me.coords;
        var tileFeatureUrl = layer._getTileUrl(coords);
        SuperMap.Request.get(tileFeatureUrl, null, {
            timeout: 10000,
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            if (!json) {
                return null;
            }
            var tileFeature = TileFeatureProcessor.processTileFeature(json.recordsets);
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

            var type = (layer.features[0]) ? layer.features[0].type : 1;

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

                var styleOptions = tileLayer.getVectorTileLayerStyle(coords, feat)
                    || me._defaultStyle(type);

                //根据id和layerName识别唯一要素
                var id = feat.properties.id,
                    styleKey = tileLayer._getFeatureKey(id, layerName),
                    styleOverride = tileLayer._overriddenStyles[styleKey];

                styleOptions = styleOverride ? styleOverride : styleOptions;
                styleOptions = (styleOptions instanceof Function) ? styleOptions(feat.properties, coords.z) : styleOptions;
                styleOptions = !(styleOptions instanceof Array) ? [styleOptions] : styleOptions;

                if (!styleOptions.length) {
                    continue;
                }

                var featureLayer = me._createFeatureLayer(feat, pxPerExtent);

                if (!featureLayer) {
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
                var featureKey = tileLayer._getFeatureKey(id, layerName);
                renderer._features[featureKey] = {
                    layerName: layerName,
                    feature: featureLayer
                };
            }
        }

        if (tileLayer._map) {
            renderer.addTo(tileLayer._map);
        }

        L.Util.requestAnimFrame(me.done.bind(coords, null, null));
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
        }
    }

});
L.supermap.vectorTile = function (options, done) {
    return new VectorTile(options, done);
};
module.exports = VectorTile;