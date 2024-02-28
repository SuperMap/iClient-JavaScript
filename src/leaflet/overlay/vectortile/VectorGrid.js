/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
/**
 * Inspired by https://github.com/Leaflet/Leaflet.VectorGrid
 */
import L from "leaflet";
import {SVGRenderer} from './SVGRenderer';
import {CanvasRenderer} from './CanvasRenderer';
import {VectorTile} from './VectorTile';
import {TextSymbolizer} from './TextSymbolizer';
import {VectorTileFormat} from '../VectorTileFormat';
import {VectorFeatureType} from './VectorFeatureType';

/**
 * @class VectorGrid
 * @classdesc 矢量瓦片图层基类。此类存储了矢量瓦片图层风格、矢量瓦片格式、渲染器类型、是否可交互、最大缩放级别等参数。
 * @category Visualization VectorTile
 * @extends {L.GridLayer}
 * @param {Object} options - 参数。
 * @param {Object} [options.vectorTileLayerStyles] - 矢量瓦片图层风格。
 * @param {string} [options.renderer='SVG'] -  渲染器类型。
 * @param {VectorTileFormat} [options.format=VectorTileFormat.JSON] - 矢量瓦片格式。
 * @param {boolean} [options.interactive=true] - 是否可交互。
 * @param {number} [options.maxZoom=23] - 最大缩放级别。
 * @usage
 */
export var VectorGrid = L.GridLayer.extend({

    options: {
        vectorTileLayerStyles: null,
        //SVG or Canvas
        renderer: "SVG",
        format: VectorTileFormat.JSON,
        interactive: true,
        maxZoom:23
    },

    initialize: function (options) {
        var me = this;
        L.setOptions(me, options);
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
        me.on('tileerror ', me._renderText, me);
        me.on('load', me._renderText, me);
        me._dataLayerNames = {};
    },

    /**
     * @private
     * @function VectorGrid.prototype.createTile
     * @description 创建切片图层。
     * @param {Object} coords - 切片坐标参数对象。
     * @param {function} done - todo。
     */
    createTile: function (coords, done) {
        var me = this;

        var tileSize = me.getTileSize();
        var renderer = null;

        if (me.options.renderer === "Canvas") {
            renderer = new CanvasRenderer(coords, tileSize, me.options);
        } else {
            renderer = new SVGRenderer(coords, tileSize, me.options);
        }

        me._vectorTiles[me._tileCoordsToKey(coords)] = renderer;
        renderer._features = {};

        new VectorTile({
            layer: me,
            format: me.options.format,
            coords: coords,
            renderer: renderer
        }, done).renderTile();

        return renderer.getContainer();
    },

    /**
     * @function VectorGrid.prototype.getStyles
     * @description 获取图层样式。
     * @returns {Object} 所有图层的样式。
     */
    getStyles: function () {
        return this.vectorTileLayerStyles;
    },

    /**
     * @function VectorGrid.prototype.getStyle
     * @description 获取指定图层样式。
     * @param {string} layerName - 图层名称。
     * @returns {Object} 指定图层的样式。
     */
    getStyle: function (layerName) {
        return this.vectorTileLayerStyles && this.vectorTileLayerStyles[layerName];
    },

    /**
     * @function VectorGrid.prototype.setFeatureStyle
     * @description 指定要素 ID 和图层名称设置要素风格。
     * @param {number} id - 要素 ID。
     * @param {string} layerName - 图层名称。
     * @param {(Array|function)} layerStyle - 图层样式。
     * @returns {VectorGrid} VectorGrid 的实例对象。
     */
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

    /**
     * @function VectorGrid.prototype.resetFeatureStyle
     * @description 指定要素 ID 和图层名称重绘要素风格。
     * @param {number} id - 要素 ID。
     * @param {string} layerName - 图层名称。
     * @returns {VectorGrid} VectorGrid 的实例对象。
     */
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

    /**
     * @function VectorGrid.prototype.getDataLayerNames
     * @description 获取数据图层名称。
     * @returns {Array} 返回数据图层名称数组。
     */
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
    }

});
