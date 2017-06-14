require('./SVGRenderer');
require('./CanvasRenderer');
require("./VectorTileFormat");
require('./VectorTile');
var L = require("leaflet");
L.VectorGrid = L.GridLayer.extend({
    options: {
        format: L.supermap.VectorTileFormat.JSON,
        renderer: L.svg.renderer,
        vectorTileLayerStyles: {},
        interactive: true
    },

    initialize: function (options) {
        var me = this;
        L.Util.setOptions(me, options);
        L.GridLayer.prototype.initialize.call(me, options);
        me._vectorTiles = {};
        //交互事件使用,键值为id_layerName
        me._overriddenStyles = {};
        me.vectorTileLayerStyles = me.options.vectorTileLayerStyles;
        me.on('tileunload', function (e) {
            var key = me._tileCoordsToKey(e.coords),
                tile = me._vectorTiles[key];

            if (tile && me._map) {
                tile.removeFrom(me._map);
            }
            delete me._vectorTiles[key];
        }, me);
        me.on('tileerror ',me._renderText, me);
        me.on('load',me._renderText, me);
        me._dataLayerNames = {};
    },


    createTile: function (coords, done) {
        var me = this;

        var tileSize = me.getTileSize();
        var renderer = me.options.renderer(coords, tileSize, me.options);

        me._vectorTiles[me._tileCoordsToKey(coords)] = renderer;
        renderer._features = {};

        L.supermap.vectorTile({
            layer: this,
            format: me.options.format,
            coords: coords,
            renderer: renderer
        }, done).renderTile();

        return renderer.getContainer();
    },

    //需要id和layerName才能确定一个要素
    setFeatureStyle: function (id, layerName, layerStyle) {
        var featureKey = this._getFeatureKey(id, layerName);
        this._overriddenStyles[featureKey] = layerStyle;

        for (var tileKey in this._vectorTiles) {
            var tile = this._vectorTiles[tileKey];
            var features = tile._features;
            var data = features[featureKey];
            if (data) {
                var feat = data.feature;
                this._updateStyles(feat, tile, layerStyle);
            }
        }
        return this;
    },

    //需要id和layerName才能确定一个要素
    resetFeatureStyle: function (id, layerName) {
        var featureKey = this._getFeatureKey(id, layerName);
        delete  this._overriddenStyles[featureKey];

        for (var tileKey in this._vectorTiles) {
            var tile = this._vectorTiles[tileKey];
            var data = tile._features[featureKey];
            if (data) {
                var feat = data.feature;
                var styleOptions = this.vectorTileLayerStyles[data.layerName];
                this._updateStyles(feat, tile, styleOptions);
            }
        }
        return this;
    },

    getDataLayerNames: function () {
        return Object.keys(this._dataLayerNames);
    },

    _removeAllTiles: function () {
        L.GridLayer.prototype._removeAllTiles.call(this);
        this._textVectorTiles = {};
    },


    _renderText: function () {
        var textVectorTiles = this._textVectorTiles;
        for (var key in textVectorTiles) {
            var textTiles = textVectorTiles[key];
            var renderer = textTiles.renderer;

            for (var layerId in textTiles.layers) {
                var tile = textTiles.layers[layerId];
                var styleOptions = tile.style,
                    featureLayer = tile.layer;
                for (var j = 0; j < styleOptions.length; j++) {
                    featureLayer.render(renderer, styleOptions[j]);
                    renderer._addPath(featureLayer);
                }

                if (this.options.interactive) {
                    featureLayer.makeInteractive();
                }
            }
        }
    },

    _getFeatureKey: function (id, layerName) {
        id = id || 0;
        layerName = layerName || "null";
        return id + "_" + layerName;
    },

    _updateStyles: function (feat, renderer, styleOptions) {
        styleOptions = (styleOptions instanceof Function) ?
            styleOptions(feat.properties, renderer.getCoord().z) :
            styleOptions;

        if (!(styleOptions instanceof Array)) {
            styleOptions = [styleOptions];
        }

        for (var j = 0; j < styleOptions.length; j++) {
            var style = this._extendStyle(styleOptions[j], feat.type);
            feat.updateStyle(renderer, style);
        }
    },

    //矫正一些参数
    _extendStyle: function (style, type) {
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
    }

});

L.vectorGrid = function (options) {
    return new L.VectorGrid(options);
};
module.exports = L.VectorGrid;
