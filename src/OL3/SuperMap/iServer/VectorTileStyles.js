require('../../../Core/visual/CartoCSS');
require('../../StyleUtils');

ol.supermap.VectorTileStyles = function (options) {
    ol.Observable.call(this);
    if (!options) {
        return;
    }
    if (options.view) {
        ol.supermap.VectorTileStyles.setView(options.view);
    }
    if (options.url) {
        ol.supermap.VectorTileStyles.setUrl(options.url);
    }
    if (options.cartoCss) {
        ol.supermap.VectorTileStyles.setCartoCss(options.cartoCss);
    }
    if (options.selectdStyle) {
        ol.supermap.VectorTileStyles.setSelectedStyle(options.selectdStyle);
    }
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
            var vectorStylesXHR = new XMLHttpRequest();
            vectorStylesXHR.open("GET", ol.supermap.VectorTileStyles.getUrl() + '/tileFeature/vectorstyles.json', false);
            vectorStylesXHR.onreadystatechange = function () {
                if (vectorStylesXHR.readyState == 4) {
                    var vectorStyles = JSON.parse(vectorStylesXHR.responseText);
                    var cartoCss;
                    if (vectorStyles) {
                        cartoCss = vectorStyles.style;
                        //替换一些关键符号
                        for (var attr in layersInfo) {
                            var newAttr = attr.replace(/[@#\s]/gi, "___");
                            cartoCss = cartoCss.replace(attr.replace(/[#]/gi, "\\#"), newAttr);
                        }
                        cartoCss = cartoCss.replace(/[#]/gi, "\n#");
                        //将zoom转化为scale，以免引起混淆
                        cartoCss = cartoCss.replace(/\[zoom/gi, "[scale");
                    }
                    if (ol.supermap.VectorTileStyles.getCartoCss()) {
                        cartoCss = ol.supermap.VectorTileStyles.getCartoCss();
                    }
                    var cartoShadersArray = new SuperMap.CartoCSS(cartoCss).getShaders();
                    var cartoShaders = {};
                    cartoShadersArray.map(function (cartoShader) {
                        cartoShaders[cartoShader.elements[0].clean] = cartoShader;
                    })
                    ol.supermap.VectorTileStyles.setCartoShaders(cartoShaders);
                    var shaders = {};
                    for (var i in layersInfo) {
                        shaders[i] = layersInfo[i].style;
                    }
                    ol.supermap.VectorTileStyles.setShaders(shaders);
                }
            }
            vectorStylesXHR.send(null);
        }
    }
    layersXHR.open("GET", ol.supermap.VectorTileStyles.getUrl() + '/layers.json', false);
    layersXHR.send(null);
    this.on('featureSelected', function (e) {
        ol.supermap.VectorTileStyles.setSelectedId(e.element.selectedId);
        ol.supermap.VectorTileStyles.setLayerName(e.element.layerName);
    });
};
ol.inherits(ol.supermap.VectorTileStyles, ol.Observable);

ol.supermap.VectorTileStyles.setShaders = function (shaders) {
    this.shaders = shaders;
}

ol.supermap.VectorTileStyles.getShaders = function () {
    return this.shaders;
}

ol.supermap.VectorTileStyles.setCartoShaders = function (cartoShaders) {
    this.cartoShaders = cartoShaders;
}

ol.supermap.VectorTileStyles.getCartoShaders = function () {
    return this.cartoShaders;
}

ol.supermap.VectorTileStyles.setCartoCss = function (cartoCss) {
    this.cartoCss = cartoCss;
}

ol.supermap.VectorTileStyles.getCartoCss = function () {
    return this.cartoCss;
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

ol.supermap.VectorTileStyles.setSelectedStyle = function (selectedStyle) {
    this.selectedStyle = selectedStyle;
}

ol.supermap.VectorTileStyles.getSelectedStyle = function () {
    return this.selectedStyle;
}

ol.supermap.VectorTileStyles.prototype.getFeatureStyle = function (feature) {
    if (ol.supermap.VectorTileStyles.getShaders()) {
        if (ol.supermap.VectorTileStyles.getSelectedStyle()) {
            var layerName = ol.supermap.VectorTileStyles.getLayerName();
            var selectedId = ol.supermap.VectorTileStyles.getSelectedId();
            if (layerName === feature.getProperties().layerName && feature.getProperties().id === selectedId) {
                return ol.supermap.VectorTileStyles.getSelectedStyle();
            }
        }
        return ol.supermap.VectorTileStyles.getStyle(feature);
    }
}

ol.supermap.VectorTileStyles.getStyle = function (feature) {
    var shader = ol.supermap.VectorTileStyles.getShaders()[feature.getProperties().layerName],
        url = ol.supermap.VectorTileStyles.getUrl();
    if (ol.supermap.VectorTileStyles.getCartoShaders()[feature.getProperties().layerName.replace(/(@)/gi, '___')]) {
        var view = ol.supermap.VectorTileStyles.getView(),
            zoom = view.getZoom(),
            scale = ol.supermap.Util.resolutionToScale(view.getResolution(), 96, Unit.METER),
            shader = ol.supermap.VectorTileStyles.getCartoShaders()[feature.getProperties().layerName.replace(/(@)/gi, '___')],
            style = ol.supermap.StyleUtils.getStyleFromCarto(zoom, scale, shader, feature, true, url);
        if (feature.getProperties().type === 'TEXT') {
            return new ol.style.Style({
                text: new ol.style.Text({
                    font: style.fontFamily + ' ' + style.fontSize,
                    text: feature.getProperties().texts[0],
                    textAlign: style.textAlign,
                    textBaseline: style.textBaseline,
                    fill: new ol.style.Fill({
                        color: style.foreColor
                    }),
                    stroke: new ol.style.Stroke({
                        color: style.backColor
                    }),
                    offsetX: style.offsetX,
                    offsetY: style.offsetY
                })
            })
        }
        if (feature.getProperties().type === 'POINT') {
            return new ol.style.Style({
                fill: new ol.style.Fill({
                    color: style.fillStyle
                })
            });
        }
        if (feature.getProperties().type === 'LINE') {
            var stroke = new ol.style.Stroke({
                color: style.strokeStyle,
                width: style.lineWidth,
                lineCap: style.lineCap,
                lineDash: style.lineDasharray,
                lineDashOffset: style.offset,
                lineJoin: style.lineJoin,
                miterLimit: style.miterLimit
            });
            return new ol.style.Style({
                stroke: stroke
            });
        }
        if (feature.getProperties().type === 'REGION') {
            var fill = new ol.style.Fill({
                color: style.fillStyle
            });
            var stroke = new ol.style.Stroke({
                color: style.strokeStyle,
                width: style.lineWidth,
                lineCap: style.lineCap,
                lineDash: style.lineDasharray,
                lineDashOffset: style.offset,
                lineJoin: style.lineJoin,
                miterLimit: style.miterLimit
            });
            return new ol.style.Style({
                fill: fill,
                stroke: stroke
            });
        }
    }
    if (ol.supermap.VectorTileStyles.getShaders()[feature.getProperties().layerName]) {
        return ol.supermap.StyleUtils.getValidStyleFromLayerInfo(shader, feature, url);
    }
}

module.exports = ol.supermap.VectorTileStyles;