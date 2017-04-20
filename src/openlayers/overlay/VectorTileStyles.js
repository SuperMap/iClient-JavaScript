require('../../common/CartoCSS');
require('../core/StyleUtils');

ol.supermap.VectorTileStyles = function (options) {
    ol.Observable.call(this);
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

ol.inherits(ol.supermap.VectorTileStyles, ol.Observable);

ol.supermap.VectorTileStyles.setCartoShaders = function (cartoShaders) {
    this.cartoShaders = cartoShaders;
}

ol.supermap.VectorTileStyles.getCartoShaders = function () {
    return this.cartoShaders;
}

ol.supermap.VectorTileStyles.setClientCartoShaders = function (clientCartoShaders) {
    this.clientCartoShaders = clientCartoShaders;
}

ol.supermap.VectorTileStyles.getClientCartoShaders = function () {
    return this.clientCartoShaders;
}

ol.supermap.VectorTileStyles.setCartoCss = function (cartoCss) {
    this.cartoCss = cartoCss;
}

ol.supermap.VectorTileStyles.getCartoCss = function () {
    return this.cartoCss;
}

ol.supermap.VectorTileStyles.setDonotNeedServerCartoCss = function (donotNeedServerCartoCss) {
    this.donotNeedServerCartoCss = donotNeedServerCartoCss;
}

ol.supermap.VectorTileStyles.getDonotNeedServerCartoCss = function () {
    return this.donotNeedServerCartoCss;
}

ol.supermap.VectorTileStyles.setLayersInfo = function (layersInfo) {
    this.layersInfo = layersInfo;
}

ol.supermap.VectorTileStyles.getLayersInfo = function () {
    return this.layersInfo;
}

ol.supermap.VectorTileStyles.setUrl = function (url) {
    this.url = url;
}

ol.supermap.VectorTileStyles.getUrl = function () {
    return this.url;
}

ol.supermap.VectorTileStyles.setView = function (view) {
    this.view = view;
}

ol.supermap.VectorTileStyles.getView = function () {
    return this.view;
}

ol.supermap.VectorTileStyles.setSelectedId = function (selectedId) {
    this.selectedId = selectedId;
}

ol.supermap.VectorTileStyles.getSelectedId = function () {
    return this.selectedId;
}

ol.supermap.VectorTileStyles.setLayerName = function (layerName) {
    this.layerName = layerName;
}

ol.supermap.VectorTileStyles.getLayerName = function () {
    return this.layerName;
}

ol.supermap.VectorTileStyles.setSelectedPointStyle = function (selectedPointStyle) {
    this.selectedPointStyle = selectedPointStyle;
}

ol.supermap.VectorTileStyles.setSelectedLineStyle = function (selectedLineStyle) {
    this.selectedLineStyle = selectedLineStyle;
}

ol.supermap.VectorTileStyles.setSelectedRegionStyle = function (selectedRegionStyle) {
    this.selectedRegionStyle = selectedRegionStyle;
}

ol.supermap.VectorTileStyles.setSelectedTextStyle = function (selectedTextStyle) {
    this.selectedTextStyle = selectedTextStyle;
}

ol.supermap.VectorTileStyles.getSelectedStyle = function (type) {
    if (type === 'POINT') {
        return this.selectedPointStyle;
    }
    if (type === 'LINE') {
        return this.selectedLineStyle;
    }
    if (type === 'REGION') {
        return this.selectedRegionStyle;
    }
    if (type === 'TEXT') {
        return this.selectedTextStyle;
    }
}

ol.supermap.VectorTileStyles.prototype.getFeatureStyle = function (feature) {
    var selectedStyle;
    if (feature.getProperties().type === 'TEXT') {
        selectedStyle = ol.supermap.VectorTileStyles.getSelectedStyle(feature.getProperties().type);
        selectedStyle.getText().text_ = feature.getProperties().texts[0];
    } else {
        selectedStyle = ol.supermap.VectorTileStyles.getSelectedStyle(feature.getProperties().type);
    }
    if (selectedStyle) {
        var layerName = ol.supermap.VectorTileStyles.getLayerName();
        var selectedId = ol.supermap.VectorTileStyles.getSelectedId();
        if (layerName === feature.getProperties().layerName && feature.getProperties().id === selectedId) {
            return selectedStyle;
        }
    }
    return ol.supermap.VectorTileStyles.getStyle(feature);
}

ol.supermap.VectorTileStyles.getLayerInfo = function (layerName) {
    var layersInfo = ol.supermap.VectorTileStyles.getLayersInfo();
    if (layersInfo === undefined) {
        return null;
    }
    var layerInfo = layersInfo[layerName];
    if (!layerInfo)return null;
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
};

ol.supermap.VectorTileStyles.getStyle = function (feature) {
    var url = ol.supermap.VectorTileStyles.getUrl(),
        view = ol.supermap.VectorTileStyles.getView(),
        zoom = view.getZoom(),
        dpi = 96,
        scale = ol.supermap.Util.resolutionToScale(view.getResolution(), dpi, SuperMap.Unit.METER),
        layerName = feature.getProperties().layerName.replace(/(@)/gi, '___').replace(/(#)/gi, '___');
    if (ol.supermap.VectorTileStyles.getCartoCss() && ol.supermap.VectorTileStyles.getClientCartoShaders()[layerName]) {
        return getStyleArray(ol.supermap.VectorTileStyles.getClientCartoShaders()[layerName]);
    }
    var layerInfo = ol.supermap.VectorTileStyles.getLayerInfo(feature.getProperties().layerName);
    if (!(feature.getProperties().type === 'POINT' && layerInfo.type === 'LABEL' && feature.getProperties().attributes !== null) && feature.getProperties().type !== 'TEXT' && !ol.supermap.VectorTileStyles.getDonotNeedServerCartoCss() && ol.supermap.VectorTileStyles.getCartoShaders()[layerName]) {
        return getStyleArray(ol.supermap.VectorTileStyles.getCartoShaders()[layerName]);
    }
    if (layerInfo.layerStyle || feature.getProperties().type === 'POINT' && layerInfo.type === 'LABEL' && feature.getProperties().attributes !== null) {
        return ol.supermap.StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, url);
    }
    return ol.supermap.StyleUtils.getStyleFromCarto(zoom, scale, null, feature, true, url);

    function getStyleArray(shaderAttachment) {
        var styleArray = [];
        for (var j in shaderAttachment) {
            shaderAttachment[j].map(function (shader) {
                styleArray.push(ol.supermap.StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, true, url))
            })
        }
        return styleArray;
    }
}

module.exports = ol.supermap.VectorTileStyles;