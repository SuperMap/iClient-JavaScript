import ol from 'openlayers/dist/ol-debug';
import '../../../common/style/CartoCSS';
import SuperMap from '../../../common/SuperMap';
import StyleUtils from '../../core/StyleUtils';

ol.supermap = ol.supermap || {};

/**
 * @class ol.supermap.VectorTileStyles
 * @classdesc 矢量瓦片风格
 * @private
 * @param options -{Object} 交互时所需可选参数
 * @extends ol.Observable{@linkdoc-openlayers/ol.Observable}
 */
export default class VectorTileStyles extends ol.Observable {

    constructor(options) {
        super();
        if (!options) {
            return;
        }
        var donotNeedServerCartoCss = false;
        if (options.donotNeedServerCartoCss !== undefined) {
            donotNeedServerCartoCss = options.donotNeedServerCartoCss
        }
        ol.supermap.VectorTileStyles.setDonotNeedServerCartoCss(donotNeedServerCartoCss);
        if (options.view) {
            ol.supermap.VectorTileStyles.setView(options.view);
        }
        if (options.url) {
            ol.supermap.VectorTileStyles.setUrl(options.url);
        }
        if (options.cartoCss) {
            ol.supermap.VectorTileStyles.setCartoCss(options.cartoCss);
        }
        var selectdPointStyle = getDefaultSelectedPointStyle();
        if (options.selectdPointStyle) {
            selectdPointStyle = options.selectdPointStyle;
        }
        ol.supermap.VectorTileStyles.setSelectedPointStyle(selectdPointStyle);
        var selectdLineStyle = getDefaultSelectedLineStyle();
        if (options.selectdLineStyle) {
            selectdLineStyle = options.selectdLineStyle;
        }
        ol.supermap.VectorTileStyles.setSelectedLineStyle(selectdLineStyle);
        var selectdRegionStyle = getDefaultSelectedRegionStyle();
        if (options.selectdRegionStyle) {
            selectdRegionStyle = options.selectdRegionStyle;
        }
        ol.supermap.VectorTileStyles.setSelectedRegionStyle(selectdRegionStyle);
        var selectdTextStyle = getDefaultSelectedTextStyle();
        if (options.selectdTextStyle) {
            selectdTextStyle = options.selectdTextStyle;
        }
        ol.supermap.VectorTileStyles.setSelectedTextStyle(selectdTextStyle);
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
                ol.supermap.VectorTileStyles.setLayersInfo(layersInfo);
                if (!ol.supermap.VectorTileStyles.getDonotNeedServerCartoCss()) {
                    var vectorStylesXHR = new XMLHttpRequest();
                    vectorStylesXHR.open("GET", ol.supermap.VectorTileStyles.getUrl() + "/tileFeature/vectorstyles.json", false);
                    vectorStylesXHR.onreadystatechange = function () {
                        if (vectorStylesXHR.readyState == 4) {
                            var vectorStyles = new SuperMap.Format.JSON().read(vectorStylesXHR.responseText);
                            var cartoCss;
                            if (vectorStyles.style && vectorStyles.type === 'cartoCSS') {
                                cartoCss = vectorStyles.style;
                                cartoCss = cartoCss.replace(/[@]/gi, "___");
                                cartoCss = cartoCss.replace(/\\#/gi, "___");
                                //替换一些关键符号
                                for (var attr in layersInfo) {
                                    var newAttr = attr.replace(/[@#\s]/gi, "___");
                                    cartoCss = cartoCss.replace(attr.replace(/[#]/gi, "\\#"), newAttr);
                                }
                                cartoCss = cartoCss.replace(/[#]/gi, "\n#");
                                //将zoom转化为scale，以免引起混淆
                                cartoCss = cartoCss.replace(/\[zoom/gi, "[scale");
                            }
                            var cartoShadersArray = new SuperMap.CartoCSS(cartoCss).getShaders();
                            var cartoShaders = {};
                            cartoShadersArray.map(function (cartoShader) {
                                cartoShaders[cartoShader.elements[0].clean] = cartoShaders[cartoShader.elements[0].clean] || {};
                                cartoShaders[cartoShader.elements[0].clean][cartoShader.attachment] = cartoShaders[cartoShader.elements[0].clean][cartoShader.attachment] || [];
                                cartoShaders[cartoShader.elements[0].clean][cartoShader.attachment].push(cartoShader);
                            })
                            ol.supermap.VectorTileStyles.setCartoShaders(cartoShaders);
                        }
                    }
                    vectorStylesXHR.send(null);
                }
                if (ol.supermap.VectorTileStyles.getCartoCss()) {
                    var clientCartoShadersArray = new SuperMap.CartoCSS(ol.supermap.VectorTileStyles.getCartoCss()).getShaders();
                    var clientCartoShaders = {};
                    clientCartoShadersArray.map(function (cartoShader) {
                        clientCartoShaders[cartoShader.elements[0].clean] = clientCartoShaders[cartoShader.elements[0].clean] || {};
                        clientCartoShaders[cartoShader.elements[0].clean][cartoShader.attachment] = clientCartoShaders[cartoShader.elements[0].clean][cartoShader.attachment] || [];
                        clientCartoShaders[cartoShader.elements[0].clean][cartoShader.attachment].push(cartoShader);
                    })
                    ol.supermap.VectorTileStyles.setClientCartoShaders(clientCartoShaders);
                }
            }
        }
        layersXHR.open("GET", ol.supermap.VectorTileStyles.getUrl() + '/layers.json', false);
        layersXHR.send(null);
        this.on('featureSelected', function (e) {
            ol.supermap.VectorTileStyles.setSelectedId(e.selectedId);
            ol.supermap.VectorTileStyles.setLayerName(e.layerName);
        });
        /*
         * @function ol.supermap.VectorTileStyles.prototype.getDefaultSelectedPointStyle
         * @description 设置默认选择后的点样式
         */
        function getDefaultSelectedPointStyle() {
            return new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                        color: 'blue'
                    })
                })
            })
        }
        /*
         * @function ol.supermap.VectorTileStyles.prototype.getDefaultSelectedLineStyle
         * @description 设置默认选择后的线样式
         */
        function getDefaultSelectedLineStyle() {
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'blue',
                    width: 3
                })
            })
        }
        /*
         * @function ol.supermap.VectorTileStyles.prototype.getDefaultSelectedRegionStyle
         * @description 设置默认选择后的面样式
         */
        function getDefaultSelectedRegionStyle() {
            return new ol.style.Style({
                fill: new ol.style.Fill({
                    color: [0, 0, 255, 0.5]
                }),
                stroke: new ol.style.Stroke({
                    color: 'blue',
                    width: 3
                })
            })
        }
        /*
         * @function ol.supermap.VectorTileStyles.prototype.getDefaultSelectedTextStyle
         * @description 设置默认选择后的文本样式
         */
        function getDefaultSelectedTextStyle() {
            return new ol.style.Style({
                text: new ol.style.Text({
                    font: '15px 微软雅黑',
                    fill: new ol.style.Fill({
                        color: 'blue'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'white',
                        width: 1
                    })
                })
            });
        }
    }

    /**
     * @function ol.supermap.VectorTileStyles.setCartoShaders
     * @description 设置Carto的阴影
     * @param cartoShaders -{Array} Carto阴影
     */
    static setCartoShaders(cartoShaders) {
        this.cartoShaders = cartoShaders;
    }

    /**
     * @function ol.supermap.VectorTileStyles.getCartoShaders
     * @description 获取客户端Carto的阴影
     */
    static getCartoShaders() {
        return this.cartoShaders;
    }

    /**
     * @function ol.supermap.VectorTileStyles.setClientCartoShaders
     * @description 设置客户端Carto的阴影
     * @param clientCartoShaders -{Array} 客户端Carto阴影
     */
    static setClientCartoShaders(clientCartoShaders) {
        this.clientCartoShaders = clientCartoShaders;
    }

    /**
     * @function ol.supermap.VectorTileStyles.getClientCartoShaders
     * @description 获取客户端Carto的阴影
     */
    static getClientCartoShaders() {
        return this.clientCartoShaders;
    }

    /**
     * @function ol.supermap.VectorTileStyles.setCartoCss
     * @description 设置cartoCss的样式
     * @param cartoCss -{Object} cartoCss的样式
     */
    static setCartoCss(cartoCss) {
        this.cartoCss = cartoCss;
    }

    /**
     * @function ol.supermap.VectorTileStyles.getCartoCss
     * @description 获取cartoCss的样式
     */
    static getCartoCss() {
        return this.cartoCss;
    }

    /**
     * @function ol.supermap.VectorTileStyles.setDonotNeedServerCartoCss
     * @description 设置是否需要CartoCss服务
     * @param donotNeedServerCartoCss - {Object} 是否需要CartoCss服务
     */
    static setDonotNeedServerCartoCss(donotNeedServerCartoCss) {
        this.donotNeedServerCartoCss = donotNeedServerCartoCss;
    }

    /**
     * @function ol.supermap.VectorTileStyles.getDonotNeedServerCartoCss
     * @description 获取是否需要CartoCss服务
     */
    static getDonotNeedServerCartoCss() {
        return this.donotNeedServerCartoCss;
    }

    /**
     * @function ol.supermap.VectorTileStyles.setLayersInfo
     * @description 设置图层信息服务
     * @param layersInfo -{Object} 图层信息
     */
    static setLayersInfo(layersInfo) {
        this.layersInfo = layersInfo;
    }
    /**
     * @function ol.supermap.VectorTileStyles.getLayersInfo
     * @description 获取图层信息服务
     */
    static getLayersInfo() {
        return this.layersInfo;
    }

    /**
     * @function ol.supermap.VectorTileStyles.setUrl
     * @description 设置地址
     * @param url -{string} 地址
     */
    static setUrl(url) {
        this.url = url;
    }

    /**
     * @function ol.supermap.VectorTileStyles.getUrl
     * @description 获取地址
     */
    static getUrl() {
        return this.url;
    }

    /**
     * @function ol.supermap.VectorTileStyles.setView
     * @description 设置视图
     * @param view -{Object} 视图
     */
    static setView(view) {
        this.view = view;
    }

    /**
     * @function ol.supermap.VectorTileStyles.getView
     * @description 获取视图
     */
    static getView() {
        return this.view;
    }

    /**
     * @function ol.supermap.VectorTileStyles.setSelectedId
     * @description 设置选择序号
     * @param selectedId -{number} 选择序号
     */
    static setSelectedId(selectedId) {
        this.selectedId = selectedId;
    }

    /**
     * @function ol.supermap.VectorTileStyles.getSelectedId
     * @description 获取选择序号
     */
    static getSelectedId() {
        return this.selectedId;
    }

    /**
     * @function ol.supermap.VectorTileStyles.setLayerName
     * @description 设置图层名称
     * @param layerName -{string} 图层名称
     */
    static setLayerName(layerName) {
        this.layerName = layerName;
    }

    /**
     * @function ol.supermap.VectorTileStyles.getLayerName
     * @description 获取图层名称
     */
    static getLayerName() {
        return this.layerName;
    }

    /**
     * @function ol.supermap.VectorTileStyles.setSelectedPointStyle
     * @description 设置选择后点样式
     * @param selectedPointStyle -{Object} 选择后点样式
     */
    static setSelectedPointStyle(selectedPointStyle) {
        this.selectedPointStyle = selectedPointStyle;
    }

    /**
     * @function ol.supermap.VectorTileStyles.setSelectedLineStyle
     * @description 设置选择后线样式
     * @param selectedLineStyle -{Object} 选择后线样式
     */
    static setSelectedLineStyle(selectedLineStyle) {
        this.selectedLineStyle = selectedLineStyle;
    }

    /**
     * @function ol.supermap.VectorTileStyles.setSelectedRegionStyle
     * @description 设置选择后面样式
     * @param selectedRegionStyle -{Object} 选择后面样式
     */
    static setSelectedRegionStyle(selectedRegionStyle) {
        this.selectedRegionStyle = selectedRegionStyle;
    }

    /**
     * @function ol.supermap.VectorTileStyles.setSelectedRegionStyle
     * @description 设置选择后文本样式
     * @param selectedTextStyle -{Object} 选择后文本样式
     */
    static setSelectedTextStyle(selectedTextStyle) {
        this.selectedTextStyle = selectedTextStyle;
    }

    /**
     * @function ol.supermap.VectorTileStyles.getSelectedStyle
     * @description 设置选择后的样式
     * @param type -{string} 选择后的样式
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
     * @function ol.supermap.VectorTileStyles.getLayerInfo
     * @description 获取图层的信息
     * @param layerName -{string} 图层名
     */
    static getLayerInfo(layerName) {
        var layersInfo = ol.supermap.VectorTileStyles.getLayersInfo();
        if (layersInfo === undefined) {
            return null;
        }
        var layerInfo = layersInfo[layerName];
        if (!layerInfo) return null;
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
     * @function ol.supermap.VectorTileStyles.getStyle
     * @description 获取样式
     * @param originalLayerName -{string} 原始图层信息
     * @param feature -{Object} 要素对象
     */
    static getStyle(originalLayerName, feature) {
        var url = ol.supermap.VectorTileStyles.getUrl(),
            view = ol.supermap.VectorTileStyles.getView(),
            zoom = view.getZoom(),
            dpi = 96,
            scale = ol.supermap.Util.resolutionToScale(view.getResolution(), dpi, SuperMap.Unit.METER),
            layerName = originalLayerName.replace(/(@)/gi, '___').replace(/(#)/gi, '___');
        // feature对象样式的配置遵循以下优先级：
        // 客户端CartoCSS > 服务器端CartoCSS > 服务器端layer样式 > 客户端默认样式。
        if (ol.supermap.VectorTileStyles.getCartoCss() && ol.supermap.VectorTileStyles.getClientCartoShaders()[layerName]) {
            return getStyleArray(ol.supermap.VectorTileStyles.getClientCartoShaders()[layerName]);
        }
        var layerInfo = ol.supermap.VectorTileStyles.getLayerInfo(originalLayerName);
        if (!ol.supermap.VectorTileStyles.getDonotNeedServerCartoCss() && ol.supermap.VectorTileStyles.getCartoShaders()[layerName]) {
            //如果是文本，这里特殊处理。
            if (feature.getProperties().textStyle || feature.getProperties().TEXT_FEATURE_CONTENT || layerInfo.type == 'LABEL' && layerInfo.textField) {
                var featureStyle = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
                if (feature.getGeometry().getType().toUpperCase() === "POINT") {
                    featureStyle = mergeTextFeatureStyle(layerInfo, feature, url);
                }
                return featureStyle;
            }
            return getStyleArray(ol.supermap.VectorTileStyles.getCartoShaders()[layerName]);
        }
        if (layerInfo) {
            return StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
        }
        function getStyleArray(shaderAttachment) {
            var styleArray = [];
            for (var j in shaderAttachment) {
                shaderAttachment[j].map(function (shader) {
                    styleArray.push(StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, true, url))
                })
            }
            return styleArray;
        }

        /*
         * @function ol.supermap.VectorTileStyles.prototype.mergeTextFeatureStyle
         * @description 合并文本要素样式
         * @param layerInfo -{string} 图层信息
         * @param feature -{Object} 获取的要素
         * @param url -{string} 地址
         */
        function mergeTextFeatureStyle(layerInfo, feature, url) {
            var textFeatureStyle = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
            if (layerInfo.type == 'LABEL') {
                feature.setProperties({type: "TEXT"});
                var cartoTextStyles = getStyleArray(ol.supermap.VectorTileStyles.getCartoShaders()[layerName]);
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
     * @function ol.supermap.VectorTileStyles.prototype.getFeatureStyle
     * @description 获取要素样式
     * @param feature -{Object} 要素
     */
    getFeatureStyle(feature) {
        var selectedStyle;
        var layerName = feature.getProperties().layerName || feature.getProperties().layer;
        var id = feature.getProperties().id || feature.id_;
        if (feature.getProperties().type && feature.getProperties().type.toUpperCase() === 'TEXT') {
            selectedStyle = ol.supermap.VectorTileStyles.getSelectedStyle(feature.getProperties().type.toUpperCase());
            if(feature.getProperties().texts){
                selectedStyle.getText().text_ = feature.getProperties().texts[0];
            }else{
                selectedStyle.getText().text_ =  "";
            }
        } else {
            selectedStyle = ol.supermap.VectorTileStyles.getSelectedStyle(feature.getGeometry().getType().toUpperCase());
        }
        if (selectedStyle) {
            var selectedLayerName = ol.supermap.VectorTileStyles.getLayerName();
            var selectedId = ol.supermap.VectorTileStyles.getSelectedId();
            if (selectedLayerName === layerName && id === selectedId) {
                return selectedStyle;
            }
        }
        return ol.supermap.VectorTileStyles.getStyle(layerName, feature);
    }
}

ol.supermap.VectorTileStyles = VectorTileStyles;