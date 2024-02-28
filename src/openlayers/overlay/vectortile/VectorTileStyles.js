/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util as CommonUtil} from '@supermap/iclient-common/commontypes/Util';
import { Unit } from '@supermap/iclient-common/REST';
import { CartoCSS } from '@supermap/iclient-common/style/CartoCSS';
import { JSONFormat } from '@supermap/iclient-common/format/JSON';
import {StyleUtils} from '../../core/StyleUtils';
import {Util} from '../../core/Util';
import Observable from 'ol/Observable';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import FillStyle from 'ol/style/Fill';
import StrokeStyle from 'ol/style/Stroke';
import Text from 'ol/style/Text';
/**
 * @class VectorTileStyles
 * @classdesc 矢量瓦片风格。
 * @modulecategory Overlay
 * @category  Visualization VectorTile
 * @param {Object} options - 交互时所需可选参数。
 * @extends {ol.Observable}
 * @usage
 */
export class VectorTileStyles extends Observable {

    constructor(options) {
        super();
        if (!options) {
            return;
        }
        var donotNeedServerCartoCss = false;
        if (options.donotNeedServerCartoCss !== undefined) {
            donotNeedServerCartoCss = options.donotNeedServerCartoCss
        }
        VectorTileStyles.setDonotNeedServerCartoCss(donotNeedServerCartoCss);
        if (options.view) {
            VectorTileStyles.setView(options.view);
        }
        if (options.url) {
            VectorTileStyles.setUrl(options.url);
        }
        if (options.cartoCss) {
            VectorTileStyles.setCartoCss(options.cartoCss);
        }
        var selectedPointStyle = getDefaultSelectedPointStyle();
        if (options.selectedPointStyle) {
            selectedPointStyle = options.selectedPointStyle;
        }
        VectorTileStyles.setSelectedPointStyle(selectedPointStyle);
        var selectedLineStyle = getDefaultSelectedLineStyle();
        if (options.selectedLineStyle) {
            selectedLineStyle = options.selectedLineStyle;
        }
        VectorTileStyles.setSelectedLineStyle(selectedLineStyle);
        var selectedRegionStyle = getDefaultSelectedRegionStyle();
        if (options.selectedRegionStyle) {
            selectedRegionStyle = options.selectedRegionStyle;
        }
        VectorTileStyles.setSelectedRegionStyle(selectedRegionStyle);
        var selectedTextStyle = getDefaultSelectedTextStyle();
        if (options.selectedTextStyle) {
            selectedTextStyle = options.selectedTextStyle;
        }
        VectorTileStyles.setSelectedTextStyle(selectedTextStyle);
        var layersXHR = new XMLHttpRequest();
        layersXHR.onreadystatechange = function () {
            if (layersXHR.readyState == 4) {
                var result = JSON.parse(layersXHR.responseText);
                var layersInfo = {};
                for (var i = 0, len = result.length; i < len; i++) {
                    var layers = result[i].subLayers.layers;
                    for (var j = 0, len1 = layers.length; j < len1; j++) {
                        layers[j].layerIndex = len1 - j;
                        layersInfo[layers[j].name] = layers[j];
                    }
                }
                VectorTileStyles.setLayersInfo(layersInfo);
                if (!VectorTileStyles.getDonotNeedServerCartoCss()) {
                    var vectorStylesXHR = new XMLHttpRequest();
                    vectorStylesXHR.open("GET", CommonUtil.urlPathAppend(VectorTileStyles.getUrl(), "tileFeature/vectorstyles.json"), false);
                    vectorStylesXHR.onreadystatechange = function () {
                        if (vectorStylesXHR.readyState == 4) {
                            var vectorStyles = new JSONFormat().read(vectorStylesXHR.responseText);
                            var cartoCss;
                            if (vectorStyles.style && vectorStyles.type === 'cartoCSS') {
                                cartoCss = vectorStyles.style;
                                cartoCss = cartoCss.replace(/[@]/gi, "___");
                                cartoCss = cartoCss.replace(/\\#/gi, "___");
                                //替换一些关键符号
                                var cachedLayer = {};
                                layersInfo && Object.keys(layersInfo).sort().forEach(function (attr) {
                                    var newAttr = attr.replace(/[@#\s]/gi, "___");
                                    var to = attr;
                                    var keys = Object.keys(cachedLayer);
                                    for (let index = keys.length; index > -1; index--) {
                                        if (attr.indexOf(keys[index]) > -1) {
                                            to = attr.replace(keys[index], cachedLayer[keys[index]]);
                                            break;
                                        }
                                    }
                                    to = to.replace(/[#]/gi, "\#");
                                    cachedLayer[attr] = newAttr;
                                    cartoCss = cartoCss.replace(new RegExp(to, "g"), newAttr);
                                })
                                cartoCss = cartoCss.replace(/[#]/gi, "\n#");
                                //将zoom转化为scale，以免引起混淆
                                cartoCss = cartoCss.replace(/\[zoom/gi, "[scale");
                            }
                            var cartoShadersArray = new CartoCSS(cartoCss).getShaders();
                            var cartoShaders = {};
                            cartoShadersArray.forEach(function (cartoShader) {
                                cartoShaders[cartoShader.elements[0].clean] = cartoShaders[cartoShader.elements[0].clean] || {};
                                cartoShaders[cartoShader.elements[0].clean][cartoShader.attachment] = cartoShaders[cartoShader.elements[0].clean][cartoShader.attachment] || [];
                                cartoShaders[cartoShader.elements[0].clean][cartoShader.attachment].push(cartoShader);
                                return cartoShader;
                            });
                            VectorTileStyles.setCartoShaders(cartoShaders);
                        }
                    };
                    vectorStylesXHR.send(null);
                }
                if (VectorTileStyles.getCartoCss()) {
                    var clientCartoShadersArray = new CartoCSS(VectorTileStyles.getCartoCss()).getShaders();
                    var clientCartoShaders = {};
                    clientCartoShadersArray.forEach(function (cartoShader) {
                        clientCartoShaders[cartoShader.elements[0].clean] = clientCartoShaders[cartoShader.elements[0].clean] || {};
                        clientCartoShaders[cartoShader.elements[0].clean][cartoShader.attachment] = clientCartoShaders[cartoShader.elements[0].clean][cartoShader.attachment] || [];
                        clientCartoShaders[cartoShader.elements[0].clean][cartoShader.attachment].push(cartoShader);
                        return cartoShader;
                    });
                    VectorTileStyles.setClientCartoShaders(clientCartoShaders);
                }
            }
        };
        layersXHR.open("GET", CommonUtil.urlPathAppend(VectorTileStyles.getUrl(), "layers.json"), false);
        layersXHR.send(null);
        this.on('featureSelected', function (e) {
            VectorTileStyles.setSelectedId(e.selectedId);
            VectorTileStyles.setLayerName(e.layerName);
        });

        /**
         * @function VectorTileStyles.prototype.getDefaultSelectedPointStyle
         * @description 设置默认选择后的点样式。
         */
        function getDefaultSelectedPointStyle() {
            return new Style({
                image: new CircleStyle({
                    radius: 5,
                    fill: new FillStyle({
                        color: 'blue'
                    })
                })
            })
        }

        /**
         * @function VectorTileStyles.prototype.getDefaultSelectedLineStyle
         * @description 设置默认选择后的线样式。
         */
        function getDefaultSelectedLineStyle() {
            return new Style({
                stroke: new StrokeStyle({
                    color: 'blue',
                    width: 3
                })
            })
        }

        /**
         * @function VectorTileStyles.prototype.getDefaultSelectedRegionStyle
         * @description 设置默认选择后的面样式。
         */
        function getDefaultSelectedRegionStyle() {
            return new Style({
                fill: new FillStyle({
                    color: [0, 0, 255, 0.5]
                }),
                stroke: new StrokeStyle({
                    color: 'blue',
                    width: 3
                })
            })
        }

        /**
         * @function VectorTileStyles.prototype.getDefaultSelectedTextStyle
         * @description 设置默认选择后的文本样式。
         */
        function getDefaultSelectedTextStyle() {
            return new Style({
                text: new Text({
                    font: '15px Microsoft YaHei',
                    fill: new FillStyle({
                        color: 'blue'
                    }),
                    stroke: new StrokeStyle({
                        color: 'white',
                        width: 1
                    })
                })
            });
        }
    }

    /**
     * @function VectorTileStyles.setCartoShaders
     * @description 设置服务端 Carto 的阴影。
     * @param {Array} cartoShaders - 服务端 Carto 阴影。
     */
    static setCartoShaders(cartoShaders) {
        this.cartoShaders = cartoShaders;
    }

    /**
     * @function VectorTileStyles.getCartoShaders
     * @description 获取服务端 Carto 的阴影。
     */
    static getCartoShaders() {
        return this.cartoShaders;
    }

    /**
     * @function VectorTileStyles.setClientCartoShaders
     * @description 设置客户端 Carto 的阴影。
     * @param {Array} clientCartoShaders - 客户端 Carto 阴影。
     */
    static setClientCartoShaders(clientCartoShaders) {
        this.clientCartoShaders = clientCartoShaders;
    }

    /**
     * @function VectorTileStyles.getClientCartoShaders
     * @description 获取客户端 Carto 的阴影。
     */
    static getClientCartoShaders() {
        return this.clientCartoShaders;
    }

    /**
     * @function VectorTileStyles.setCartoCss
     * @description 设置 CartoCSS 的样式。
     * @param {Object} cartoCss - CartoCSS 的样式。
     */
    static setCartoCss(cartoCss) {
        this.cartoCss = cartoCss;
    }

    /**
     * @function VectorTileStyles.getCartoCss
     * @description 获取 CartoCSS 的样式。
     */
    static getCartoCss() {
        return this.cartoCss;
    }

    /**
     * @function VectorTileStyles.setDonotNeedServerCartoCss
     * @description 设置是否需要 CartoCss 服务。
     * @param {Object} donotNeedServerCartoCss - 是否需要 CartoCss 服务。
     */
    static setDonotNeedServerCartoCss(donotNeedServerCartoCss) {
        this.donotNeedServerCartoCss = donotNeedServerCartoCss;
    }

    /**
     * @function VectorTileStyles.getDonotNeedServerCartoCss
     * @description 获取是否需要 CartoCss 服务。
     */
    static getDonotNeedServerCartoCss() {
        return this.donotNeedServerCartoCss;
    }

    /**
     * @function VectorTileStyles.setLayersInfo
     * @description 设置图层信息服务。
     * @param {Object} layersInfo - 图层信息。
     */
    static setLayersInfo(layersInfo) {
        this.layersInfo = layersInfo;
    }

    /**
     * @function VectorTileStyles.getLayersInfo
     * @description 获取图层信息服务。
     */
    static getLayersInfo() {
        return this.layersInfo;
    }

    /**
     * @function VectorTileStyles.setUrl
     * @description 设置 URL 地址。
     * @param {string} url - URL 地址。
     */
    static setUrl(url) {
        this.url = url;
    }

    /**
     * @function VectorTileStyles.getUrl
     * @description 获取地址。
     */
    static getUrl() {
        return this.url;
    }

    /**
     * @function VectorTileStyles.setView
     * @description 设置视图。
     * @param {Object} view - 视图。
     */
    static setView(view) {
        this.view = view;
    }

    /**
     * @function VectorTileStyles.getView
     * @description 获取视图。
     */
    static getView() {
        return this.view;
    }

    /**
     * @function VectorTileStyles.setSelectedId
     * @description 设置选择序号。
     * @param {number} selectedId - 选择序号。
     */
    static setSelectedId(selectedId) {
        this.selectedId = selectedId;
    }

    /**
     * @function VectorTileStyles.getSelectedId
     * @description 获取选择序号。
     */
    static getSelectedId() {
        return this.selectedId;
    }

    /**
     * @function VectorTileStyles.setLayerName
     * @description 设置图层名称。
     * @param {string} layerName - 图层名称。
     */
    static setLayerName(layerName) {
        this.layerName = layerName;
    }

    /**
     * @function VectorTileStyles.getLayerName
     * @description 获取图层名称。
     */
    static getLayerName() {
        return this.layerName;
    }

    /**
     * @function VectorTileStyles.setSelectedPointStyle
     * @description 设置选择后点样式。
     * @param {Object} selectedPointStyle - 选择后点样式。
     */
    static setSelectedPointStyle(selectedPointStyle) {
        this.selectedPointStyle = selectedPointStyle;
    }

    /**
     * @function VectorTileStyles.setSelectedLineStyle
     * @description 设置选择后的线样式。
     * @param {Object} selectedLineStyle - 选择后的线样式。
     */
    static setSelectedLineStyle(selectedLineStyle) {
        this.selectedLineStyle = selectedLineStyle;
    }

    /**
     * @function VectorTileStyles.setSelectedRegionStyle
     * @description 设置选择后的面样式。
     * @param {Object} selectedRegionStyle - 选择后的面样式。
     */
    static setSelectedRegionStyle(selectedRegionStyle) {
        this.selectedRegionStyle = selectedRegionStyle;
    }

    /**
     * @function VectorTileStyles.setSelectedTextStyle
     * @description 设置选择后的文本样式。
     * @param {Object} selectedTextStyle - 选择后的文本样式。
     */
    static setSelectedTextStyle(selectedTextStyle) {
        this.selectedTextStyle = selectedTextStyle;
    }

    /**
     * @function VectorTileStyles.getSelectedStyle
     * @description 获取选择后的样式。
     * @param {string} type - 选择后的样式。
     */
    static getSelectedStyle(type) {
        if (type === 'POINT' || type === 'MULTIPOINT') {
            return this.selectedPointStyle;
        }
        if (type === 'LINESTRING' || type === 'MULTILINESTRING') {
            return this.selectedLineStyle;
        }
        if (type === 'POLYGON' || type === 'MULTIPOLYGON') {
            return this.selectedRegionStyle;
        }
        if (type === 'TEXT') {
            return this.selectedTextStyle;
        }
    }

    /**
     * @function VectorTileStyles.getLayerInfo
     * @description 获取图层的信息。
     * @param {string} layerName - 图层名。
     */
    static getLayerInfo(layerName) {
        var layersInfo = VectorTileStyles.getLayersInfo();
        if (layersInfo === undefined) {
            return null;
        }
        var layerInfo = layersInfo[layerName];
        if (!layerInfo) {
            return null;
        }
        var layerInfo_simple = {layerIndex: layerInfo.layerIndex, ugcLayerType: layerInfo.ugcLayerType};
        switch (layerInfo.ugcLayerType) {
            case "VECTOR":
                layerInfo_simple.layerStyle = layerInfo.style ? layerInfo.style : null;
                break;
            case "THEME":
                var theme = layerInfo.theme;
                layerInfo_simple.layerStyle = theme ? theme.defaultStyle : null;
                if (theme && theme.type === "LABEL") {
                    layerInfo_simple.type = theme.type;
                    layerInfo_simple.textField = theme.labelExpression;
                }
                break;
            default :
                //SVTile发布出来的地图没有ugcLayerType属性
                if (layerInfo.style) {
                    layerInfo_simple.layerStyle = layerInfo.style;
                }
                break;
        }
        return layerInfo_simple;
    }

    /**
     * @function VectorTileStyles.getStyle
     * @description 获取样式。
     * @param {string} originalLayerName - 原始图层信息。
     * @param {Object} feature - 要素对象。
     */
    static getStyle(originalLayerName, feature) {
        var url = VectorTileStyles.getUrl(),
            view = VectorTileStyles.getView(),
            zoom = view.getZoom(),
            dpi = 96,
            scale = Util.resolutionToScale(view.getResolution(), dpi, Unit.METER),
            layerName = originalLayerName.replace(/(@)/gi, '___').replace(/(#)/gi, '___');
        // feature对象样式的配置遵循以下优先级：
        // 客户端CartoCSS > 服务器端CartoCSS > 服务器端layer样式 > 客户端默认样式。
        if (VectorTileStyles.getCartoCss() && VectorTileStyles.getClientCartoShaders()[layerName]) {
            return getStyleArray(VectorTileStyles.getClientCartoShaders()[layerName]);
        }
        var layerInfo = VectorTileStyles.getLayerInfo(originalLayerName);
        if (!VectorTileStyles.getDonotNeedServerCartoCss() && VectorTileStyles.getCartoShaders()[layerName]) {
            //如果是文本，这里特殊处理。
            if (feature.getProperties().textStyle || feature.getProperties().TEXT_FEATURE_CONTENT || layerInfo.type == 'LABEL' && layerInfo.textField) {
                var featureStyle = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
                if (feature.getGeometry().getType().toUpperCase() === "POINT") {
                    featureStyle = mergeTextFeatureStyle(layerInfo, feature, url);
                }
                return featureStyle;
            }
            return getStyleArray(VectorTileStyles.getCartoShaders()[layerName]);
        }
        if (layerInfo) {
            return StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
        }

        function getStyleArray(shaderAttachment) {
            var styleArray = [];
            for (var j in shaderAttachment) {
                shaderAttachment[j].map(function (shader) {
                    styleArray.push(StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, true, url))
                    return shader;
                })
            }
            return styleArray;
        }

        /**
         * @function VectorTileStyles.prototype.mergeTextFeatureStyle
         * @description 合并文本要素样式。
         * @param {string} layerInfo - 图层信息。
         * @param {Object} feature - 获取的要素。
         * @param {string} url - 服务地址。
         */
        function mergeTextFeatureStyle(layerInfo, feature, url) {
            var textFeatureStyle = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
            if (layerInfo.type == 'LABEL') {
                feature.setProperties({type: "TEXT"});
                var cartoTextStyles = getStyleArray(VectorTileStyles.getCartoShaders()[layerName]);
                var textStyle = textFeatureStyle.getText();
                for (var i = 0; i < cartoTextStyles.length; i++) {
                    if (!textStyle) {
                        textStyle = cartoTextStyles[i].getText();
                    } else {
                        textStyle.setText(cartoTextStyles[i].getText().getText());
                    }
                }
                textFeatureStyle.setText(textStyle);
                return textFeatureStyle;
            }
            return textFeatureStyle;
        }

    }

    /**
     * @function VectorTileStyles.prototype.getFeatureStyle
     * @description 获取要素样式。
     * @param {Object} feature - 要素。
     */
    getFeatureStyle(feature) {
        var selectedStyle;
        var layerName = feature.getProperties().layerName || feature.getProperties().layer;
        var id = feature.getProperties().id || parseInt(feature.getProperties().SmID);
        if (feature.getProperties().type && feature.getProperties().type.toUpperCase() === 'TEXT') {
            selectedStyle = VectorTileStyles.getSelectedStyle(feature.getProperties().type.toUpperCase());
            if (feature.getProperties().texts) {
                selectedStyle.getText().text_ = feature.getProperties().texts[0];
            } else {
                selectedStyle.getText().text_ = "";
            }
        } else {
            selectedStyle = VectorTileStyles.getSelectedStyle(feature.getGeometry().getType().toUpperCase());
        }
        if (selectedStyle) {
            var selectedLayerName = VectorTileStyles.getLayerName();
            var selectedId = VectorTileStyles.getSelectedId();
            if (selectedLayerName === layerName && id === selectedId) {
                return selectedStyle;
            }
        }
        return VectorTileStyles.getStyle(layerName, feature);
    }
}
