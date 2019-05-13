/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import ol from "openlayers";
import { FetchRequest, CommonUtil } from "@supermap/iclient-common";
import { olExtends } from "./olExtends";
import remove from "lodash.remove";

/**
 * @class ol.supermap.MapboxStyles
 * @classdesc Mapbox 矢量瓦片风格。
 * <div style="padding: 20px;border: 1px solid #eee;border-left-width: 5px;border-radius: 3px;border-left-color: #ce4844;">
 *      <p style="color: #ce4844">Notice</p>
 *      <p style="font-size: 13px">该功能依赖 <a href='https://github.com/boundlessgeo/ol-mapbox-style'>ol-mapbox-style</a> 插件，请确认引入该插件。</p>
 *      `<script type="text/javascript" src="https://rawgit.com/boundlessgeo/ol-mapbox-style/v2.11.2/dist/olms.js"></script>`
 * </div>
 * @category  Visualization VectorTile
 * @param {Object} options - 初始化参数。
 * @param {(string|undefined)} [options.url] - SuperMap iServer 地图服务地址，例如'http://localhost:8090/iserver/services/map-mvt-test/rest/maps/test'，与options.style互斥，优先级低于options.style。
 * @param {(Object|string|undefined)} [options.style] - Mapbox Style JSON 对象或获取 Mapbox Style JSON 对象的 URL。与 options.url 互斥，优先级高于 options.url。
 * @param {Array.<number>} [options.resolutions] - 地图分辨率数组，用于映射 zoom 值。通常情況与地图的 {@link ol.View} 的分辨率一致。</br>
 * 默认值为：[78271.51696402048,39135.75848201024, 19567.87924100512,9783.93962050256,4891.96981025128,2445.98490512564, 1222.99245256282,611.49622628141,305.748113140705,152.8740565703525, 76.43702828517625,38.21851414258813,19.109257071294063,9.554628535647032, 4.777314267823516,2.388657133911758,1.194328566955879,0.5971642834779395, 0.29858214173896974,0.14929107086948487,0.07464553543474244]。
 * @param {(string|Array.<string>|undefined)} [options.source] - Mapbox Style 'source'的 key 值或者 'layer' 的 ID 数组。
 * 当配置 'source' 的 key 值时，source 为该值的 layer 会被加载；
 * 当配置为 'layer' 的 ID 数组时，指定的 layer 会被加载，注意被指定的 layer 需要有相同的 source。
 * 当不配置时，默认为 Mapbox Style JSON 的 `sources` 对象中的第一个。
 * @param {ol.Map} [options.map] - Openlayers 地图对象，仅用于面填充样式，若没有面填充样式可不填。
 * @param {ol.StyleFunction} [options.selectedStyle] -选中样式Function。
 * @example
 *  var mbStyle = new ol.supermap.MapboxStyles({
            url: url,
            source: 'California',
            resolutions: [78271.51696402048,39135.75848201024, 19567.87924100512,9783.93962050256,4891.96981025128,2445.98490512564]
    })
    mbStyle.on('styleLoaded', function () {
           var vectorLayer = new ol.layer.VectorTile({
                //设置避让参数
                declutter: true,
                source: new ol.source.VectorTileSuperMapRest({
                    url: url,
                    format: new ol.format.MVT({
                        featureClass: ol.Feature
                    }),
                    tileType: 'ScaleXY'
                }),
                style: mbStyle.featureStyleFuntion
            });
            map.addLayer(vectorLayer);
        })
 */
export class MapboxStyles extends ol.Observable {
    constructor(options) {
        super();
        options = options || {};
        this.spriteRegEx = /^(.*)(\?.*)$/;
        this.defaultFont = ["DIN Offc Pro Medium", "Arial Unicode MS Regular"];
        this.map = options.map;
        this.source = options.source;
        this.styleTarget =
            options.style || options.url + "/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true";
        this.resolutions = options.resolutions;
        this.selectedObjects = [];
        this.selectedStyle =
            options.selectedStyle ||
            function() {
                return new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: "rgba(255, 0, 0, 1)"
                    }),
                    stroke: new ol.style.Stroke({
                        color: "rgba(255, 0, 0, 1)",
                        width: 10
                    }),
                    text: new ol.style.Text({
                        font: 'normal 400 11.19px "Microsoft YaHei"',
                        placement: "point",
                        fill: new ol.style.Fill({
                            color: "blue"
                        })
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        fill: new ol.style.Fill({
                            color: "blue"
                        })
                    })
                });
            };
        this.layersBySourceLayer = {};
        olExtends(this.map);
        this._loadStyle(this.styleTarget);
    }
    /**
     * @function ol.supermap.MapboxStyles.prototype.getStyleFunction
     * @description 获取 ol.FeatureStyleFunction。
     * @returns {ol.FeatureStyleFunction} 返回 ol.FeatureStyleFunction。
     */
    getStyleFunction() {
        return this.featureStyleFuntion;
    }
    /**
     * @function ol.supermap.MapboxStyles.prototype.getStylesBySourceLayer
     * @description 根据图层名称获取样式。
     * @param {string} sourceLayer - 数据图层名称。
     */
    getStylesBySourceLayer(sourceLayer) {
        if (this.layersBySourceLayer[sourceLayer]) {
            return this.layersBySourceLayer[sourceLayer];
        }
        const layers = [];
        for (let index = 0; index < this._mbStyle.layers.length; index++) {
            const layer = this._mbStyle.layers[index];
            if (layer["source-layer"] !== sourceLayer) {
                continue;
            }
            layers.push(layer);
        }
        this.layersBySourceLayer[sourceLayer] = layers;
        return layers;
    }
    /**
     * @function ol.supermap.MapboxStyles.prototype.setSelectedId
     * @description 设置选中要素，该要素将会用 `selectedStyle` 样式绘制。调用该方法后需要调用 `ol.layer.VectorTile` 的 `changed`,才能生效。
     * @param {number} selectedId - 要素ID。
     * @param {string} sourceLayer - 要素所在图层名称。
     */
    setSelectedId(selectedId, sourceLayer) {
        this.selectedObjects = [];
        this.selectedObjects.push({
            id: selectedId,
            sourceLayer: sourceLayer
        });
    }
    /**
     * @typedef {Object} ol.supermap.MapboxStyles.selectedObject
     * @description 要选择的要素对象。
     * @property {number} selectedId - 要素ID。
     * @property {string} sourceLayer - 要素所在图层名称。
     */

    /**
     * @function ol.supermap.MapboxStyles.prototype.setSelectedObjects
     * @version 10.x.x
     * @description 设置选中要素或要素数组，该要素将会用 `selectedStyle` 样式绘制。调用该方法后需要调用 `ol.layer.VectorTile` 的 `changed`,才能生效。
     * @param {ol.supermap.MapboxStyles.selectedObject|Array.<ol.supermap.MapboxStyles.selectedObject>} addSelectedObjects - 选择的要素或要素数组。
     */
    setSelectedObjects(selectedObjects) {
        if (!Array.isArray(selectedObjects)) {
            selectedObjects = [selectedObjects];
        }
        this.selectedObjects = [];
        this.selectedObjects = selectedObjects;
    }
    /**
     * @function ol.supermap.MapboxStyles.prototype.addSelectedObjects
     * @version 10.x.x
     * @description 增加选中的要素或要素数组，该要素将会用 `selectedStyle` 样式绘制。调用该方法后需要调用 `ol.layer.VectorTile` 的 `changed`,才能生效。
     * @param {ol.supermap.MapboxStyles.selectedObject|Array.<ol.supermap.MapboxStyles.selectedObject>} addSelectedObjects - 选择的要素或要素数组。
     */
    addSelectedObjects(selectedObjects) {
        if (!Array.isArray(selectedObjects)) {
            selectedObjects = [selectedObjects];
        }
        this.selectedObjects.push(...selectedObjects);
    }
    /**
     * @function ol.supermap.MapboxStyles.prototype.clearSelectedObjects
     * @version 10.x.x
     * @description 清空选中状态。调用该方法后需要调用 `ol.layer.VectorTile` 的 `changed`,才能生效。
     */
    removeSelectedObjects(selectedObjects) {
        if (!Array.isArray(selectedObjects)) {
            selectedObjects = [selectedObjects];
        }
        selectedObjects.forEach(element => {
            remove(this.selectedObjects, obj => {
                return element.id === obj.id && element.sourceLayer === obj.sourceLayer;
            });
        });
    }
    /**
     * @function ol.supermap.MapboxStyles.prototype.clearSelectedObjects
     * @version 10.x.x
     * @description 清空选中状态。调用该方法后需要调用 `ol.layer.VectorTile` 的 `changed`,才能生效。
     */
    clearSelectedObjects() {
        this.selectedObjects = [];
    }
    /**
     * @function ol.supermap.MapboxStyles.prototype.updateStyles
     * @description 更新图层样式。
     * @param {Object} layerStyles - 图层样式或图层样式数组。
     */
    updateStyles(layerStyles) {
        if (Object.prototype.toString.call(layerStyles) !== "[object Array]") {
            layerStyles = [layerStyles];
        }
        const layerObj = {};
        for (const item in layerStyles) {
            const layerStyle = layerStyles[item];
            layerObj[layerStyle.id] = layerStyle;
        }
        let count = 0;
        for (const key in this._mbStyle.layers) {
            const oldLayerStyle = this._mbStyle.layers[key];
            if (count >= layerStyles.length) {
                break;
            }
            const newLayerStyle = layerObj[oldLayerStyle.id];
            if (!newLayerStyle) {
                continue;
            }
            CommonUtil.extend(oldLayerStyle, newLayerStyle);
            count++;
        }
        this._createStyleFunction();
    }
    /**
     * @function ol.supermap.MapboxStyles.prototype.setStyle
     * @version 9.1.1
     * @description 设置 Mapbox style 对象。
     * @param {Object} style - Mapbox style 对象。
     */
    setStyle(style) {
        this.layersBySourceLayer = {};
        this._loadStyle(style);
    }
    _loadStyle(style) {
        if (Object.prototype.toString.call(style) == "[object Object]") {
            this._mbStyle = style;
            this._resolve();
        } else {
            FetchRequest.get(style)
                .then(response => response.json())
                .then(mbStyle => {
                    this._mbStyle = mbStyle;
                    this._resolve();
                });
        }
    }
    _resolve() {
        if (!this.source) {
            this.source = Object.keys(this._mbStyle.sources)[0];
        }
        if (this._mbStyle.sprite) {
            const spriteScale = window.devicePixelRatio >= 1.5 ? 0.5 : 1;
            const sizeFactor = spriteScale == 0.5 ? "@2x" : "";
            //兼容一下iServer 等iServer修改
            this._mbStyle.sprite = this._mbStyle.sprite.replace("@2x", "");
            const spriteUrl = this._toSpriteUrl(this._mbStyle.sprite, this.path, sizeFactor + ".json");
            FetchRequest.get(spriteUrl)
                .then(response => response.json())
                .then(spritesJson => {
                    this._spriteData = spritesJson;
                    this._spriteImageUrl = this._toSpriteUrl(this._mbStyle.sprite, this.path, sizeFactor + ".png");
                    this._spriteImage = null;
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.onload = () => {
                        this._spriteImage = img;
                        this._initStyleFunction();
                    };
                    img.src = this._spriteImageUrl;
                });
        } else {
            this._initStyleFunction();
        }
    }
    _initStyleFunction() {
        if (!this.resolutions && this._mbStyle.metadata && this._mbStyle.metadata.indexbounds) {
            const indexbounds = this._mbStyle.metadata.indexbounds;
            var max = Math.max(indexbounds[2] - indexbounds[0], indexbounds[3] - indexbounds[1]);
            const defaultResolutions = [];
            for (let index = 0; index < 30; index++) {
                defaultResolutions.push(max / 512 / Math.pow(2, index));
            }
            this.resolutions = defaultResolutions;
        }
        this._createStyleFunction();
        /**
         * @event ol.supermap.MapboxStyles#styleloaded
         * @description 样式加载成功后触发。
         */
        this.dispatchEvent("styleloaded");
    }
    _createStyleFunction() {
        if (this.map) {
            window.olms.applyBackground(this.map, this._mbStyle);
        }
        this.featureStyleFuntion = this._getStyleFunction();
    }
    _getStyleFunction() {
        this.fun = window.olms.stylefunction(
            { setStyle: function() {}, set: function() {}, changed: function() {} },
            this._mbStyle,
            this.source,
            this.resolutions,
            this._spriteData,
            "",
            this._spriteImage
        );
        return (feature, resolution) => {
            const style = this.fun(feature, resolution);
            if (
                this.selectedObjects.length > 0 &&
                this.selectedObjects.find(element => {
                    return element.id === feature.getId() && element.sourceLayer === feature.get("layer");
                })
            ) {
                const styleIndex = style && style[0] ? style[0].getZIndex() : 99999;
                let selectStyles = this.selectedStyle(feature, resolution);
                if (!Array.isArray(selectStyles)) {
                    selectStyles = [selectStyles];
                }
                for (let index = 0; index < selectStyles.length; index++) {
                    const selectStyle = selectStyles[index];
                    if (feature.getGeometry().getType() === "Point" && style[0].getText() && selectStyle.getText()) {
                        selectStyle.setFill(null);
                        selectStyle.setStroke(null);
                        selectStyle.setImage();
                        selectStyle.getText().setText(style[0].getText().getText());
                    }
                    selectStyle.setZIndex(styleIndex);
                }
                return selectStyles;
            }
            return style;
        };
    }
    _withPath(url, path) {
        if (path && url.indexOf("http") != 0) {
            url = path + url;
        }
        return url;
    }

    _toSpriteUrl(url, path, extension) {
        url = this._withPath(url, path);
        const parts = url.match(this.spriteRegEx);
        return parts ? parts[1] + extension + (parts.length > 2 ? parts[2] : "") : url + extension;
    }
}
ol.supermap.MapboxStyles = MapboxStyles;
