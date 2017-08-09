import ol from 'openlayers/dist/ol-debug';
import '../../../common/style/CartoCSS';
import SuperMap from '../../../common/SuperMap';
import StyleUtils from '../../core/StyleUtils';

ol.supermap = ol.supermap || {};

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
            ol.supermap.VectorTileStyles.setSelectedId(e.element.selectedId);
            ol.supermap.VectorTileStyles.setLayerName(e.element.layerName);
        });

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

        function getDefaultSelectedLineStyle() {
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'blue',
                    width: 3
                })
            })
        }

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

    static setCartoShaders(cartoShaders) {
        this.cartoShaders = cartoShaders;
    }

    static getCartoShaders() {
        return this.cartoShaders;
    }

    static setClientCartoShaders(clientCartoShaders) {
        this.clientCartoShaders = clientCartoShaders;
    }

    static getClientCartoShaders() {
        return this.clientCartoShaders;
    }

    static setCartoCss(cartoCss) {
        this.cartoCss = cartoCss;
    }

    static getCartoCss() {
        return this.cartoCss;
    }

    static setDonotNeedServerCartoCss(donotNeedServerCartoCss) {
        this.donotNeedServerCartoCss = donotNeedServerCartoCss;
    }

    static getDonotNeedServerCartoCss() {
        return this.donotNeedServerCartoCss;
    }

    static setLayersInfo(layersInfo) {
        this.layersInfo = layersInfo;
    }

    static getLayersInfo() {
        return this.layersInfo;
    }

    static setUrl(url) {
        this.url = url;
    }

    static getUrl() {
        return this.url;
    }

    static setView(view) {
        this.view = view;
    }

    static getView() {
        return this.view;
    }

    static setSelectedId(selectedId) {
        this.selectedId = selectedId;
    }

    static getSelectedId() {
        return this.selectedId;
    }

    static setLayerName(layerName) {
        this.layerName = layerName;
    }

    static getLayerName() {
        return this.layerName;
    }

    static setSelectedPointStyle(selectedPointStyle) {
        this.selectedPointStyle = selectedPointStyle;
    }

    static setSelectedLineStyle(selectedLineStyle) {
        this.selectedLineStyle = selectedLineStyle;
    }

    static setSelectedRegionStyle(selectedRegionStyle) {
        this.selectedRegionStyle = selectedRegionStyle;
    }

    static setSelectedTextStyle(selectedTextStyle) {
        this.selectedTextStyle = selectedTextStyle;
    }

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

    };

    getFeatureStyle(feature) {
        var selectedStyle;
        var layerName = feature.getProperties().layerName || feature.getProperties().layer;
        var id = feature.getProperties().id || feature.id_;
        if (feature.getProperties().type && feature.getProperties().type.toUpperCase() === 'TEXT') {
            selectedStyle = ol.supermap.VectorTileStyles.getSelectedStyle(feature.getProperties().type.toUpperCase());
            selectedStyle.getText().text_ = feature.getProperties().texts[0];
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