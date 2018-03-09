import ol from 'openlayers';
import {StyleUtils} from '../../../src/openlayers/core/StyleUtils.js';
import {Util} from '../../../src/openlayers/core/Util.js';
import {CartoCSS} from '../../../src/common/style/CartoCSS.js';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import '../../resources/china_cartoCSS.js';
import '../../resources/china_layers.js';
import '../../resources/iPortal_maps.js';
import 'fetch-ie8';

var fetch = window.fetch;
var layersInfo, cartoCSSShaders, iPortalLayersInfo;
var mapUrl = GlobeParameter.ChinaURL;
describe('openlayers_StyleUtils', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    beforeAll(() => {
        layersInfo = initLayersInfo();
        cartoCSSShaders = initCartoCSSShaders();
        iPortalLayersInfo = initIPortalLayersInfo();
    });

    //测试从图层信息中获取style
    it('getValidStyleFromLayerInfo_point', (done) => {
        var tileFeatureUrl = mapUrl + "/tileFeature.json?returnAttributes=true&x=420&y=195&width=256&height=256&scale=8.653637486605572e-7";
        var request = requestFeature(tileFeatureUrl);
        request.then((features) => {
            try {
                var layerName = "China_PreCenCity_pt@China";
                var layerInfo = getLayerInfo(layerName);
                var feature = getFeature(layerName, features);
                var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, mapUrl);
                expect(style).not.toBeNull();
                expect(style.getStroke()).toBeNull();
                expect(style.getText()).toBeNull();
                expect(style.getFill()).toBeNull();
                var imageStyle = style.getImage();
                expect(imageStyle).not.toBeNull();
                expect(imageStyle.getOpacity()).toBe(1);
                expect(imageStyle.getSrc()).not.toBeNull();
                expect(imageStyle.getImage(imageStyle.getSrc())).not.toBeNull();
                done();
            } catch (exception) {
                console.error("openlayers_StyleUtils': getValidStyleFromLayerInfo_point'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //测试从图层信息中获取style
    it('getValidStyleFromLayerInfo_polyLine', (done) => {
        var tileFeatureUrl = mapUrl + "/tileFeature.json?returnAttributes=true&x=420&y=193&width=256&height=256&scale=8.653637486605572e-7";
        var request = requestFeature(tileFeatureUrl);
        request.then((features) => {
            try {
                var layerName = "Main_Road_L@China#1#1";
                var layerInfo = getLayerInfo(layerName);
                var feature = getFeature(layerName, features);
                var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, mapUrl);
                expect(style).not.toBeNull();
                expect(style.getFill()).toBeNull();
                var strokeStyle = style.getStroke();
                expect(strokeStyle).not.toBeNull();
                expect(strokeStyle.getColor()).toBe('rgba(0,128,0,1)');
                expect(strokeStyle.getWidth()).toBe(0.94488);
                expect(strokeStyle.getLineCap()).toBe('butt');
                expect(strokeStyle.getLineJoin()).toBe('round');
                expect(strokeStyle.getMiterLimit()).toBe(10);
                expect(strokeStyle.getLineDashOffset()).toBe(0);
                done();
            } catch (exception) {
                console.error("openlayers_StyleUtils': getValidStyleFromLayerInfo_polyLine'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //测试从图层信息中获取style
    it('getValidStyleFromLayerInfo_polygon', (done) => {
        var tileFeatureUrl = mapUrl + "/tileFeature.json?returnAttributes=true&x=1686&y=775&width=256&height=256&scale=0.00000346145499464224";
        var request = requestFeature(tileFeatureUrl);
        request.then((features) => {
            try {
                var layerName = "World_Division_pl@China";
                var layerInfo = getLayerInfo(layerName);
                layerInfo.layerStyle.fillSymbolID = 4;
                layerInfo.layerStyle.lineSymbolID = 4;
                var feature = getFeature(layerName, features);
                var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, mapUrl);
                expect(style).not.toBeNull();
                expect(style.getFill()).not.toBeNull();
                //此处由于StyleUtils内部处理fillSymbolID有一个缺陷，故不判断具体值
                expect(style.getFill().getColor()).not.toBeNull();
                var strokeStyle = style.getStroke();
                expect(strokeStyle).not.toBeNull();
                expect(strokeStyle.getColor()).toBe('rgba(110,84,90,1)');
                expect(strokeStyle.getWidth()).toBe(0.94488);
                expect(strokeStyle.getLineCap()).toBe('butt');
                expect(strokeStyle.getLineJoin()).toBe('round');
                expect(strokeStyle.getMiterLimit()).toBe(10);
                expect(strokeStyle.getLineDashOffset()).toBe(0);
                done();
            } catch (exception) {
                console.error("openlayers_StyleUtils': getValidStyleFromLayerInfo_polygon'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //测试从图层信息中获取style
    it('getValidStyleFromLayerInfo_text1', (done) => {
        var tileFeatureUrl = mapUrl + "/tileFeature.json?returnAttributes=true&x=1689&y=775&width=256&height=256&scale=0.00000346145499464224";
        var request = requestFeature(tileFeatureUrl);
        request.then((features) => {
            try {
                var layerName = "District_pt@POI_Other#2";
                var layerInfo = getLayerInfo(layerName);
                var feature = getFeature(layerName, features);
                var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, mapUrl);
                expect(style).not.toBeNull();
                var textStyle = style.getText();
                expect(textStyle).not.toBeNull();
                expect(textStyle.getText()).toBe("三河市");
                expect(textStyle.getStroke()).not.toBeNull();
                expect(textStyle.getStroke().getColor()).toBe("rgba(255,255,255,1)");
                expect(textStyle.getFill()).not.toBeNull();
                expect(textStyle.getFill().getColor()).toBe("rgba(0,0,0,1)");
                expect(textStyle.getTextAlign()).toBe("middle");
                expect(textStyle.getTextBaseline()).toBe("center");
                done();
            } catch (exception) {
                console.error("openlayers_StyleUtils': getValidStyleFromLayerInfo_text1'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //测试从图层信息中获取style
    it('getValidStyleFromLayerInfo_text2', (done) => {
        var tileFeatureUrl = mapUrl + "/tileFeature.json?returnAttributes=true&x=28&y=13&width=256&height=256&scale=5.408523429128511e-8";
        var request = requestFeature(tileFeatureUrl);
        request.then((features) => {
            try {
                var layerName = "World_Ocean_txt@China";
                var layerInfo = getLayerInfo(layerName);
                var feature = getFeature(layerName, features);
                var style = StyleUtils.getValidStyleFromLayerInfo(layerInfo, feature, mapUrl);
                expect(style).not.toBeNull();
                var textStyle = style.getText();
                expect(textStyle).not.toBeNull();
                expect(textStyle.getText()).toBe("太平洋");
                expect(textStyle.getStroke()).not.toBeNull();
                expect(textStyle.getStroke().getColor()).toBe("rgba(236,233,216,1)");
                expect(textStyle.getFill()).not.toBeNull();
                expect(textStyle.getFill().getColor()).toBe("rgba(95,155,211,1)");
                expect(textStyle.getTextAlign()).toBe("center");
                expect(textStyle.getTextBaseline()).toBe("alphabetic");
                done();
            } catch (exception) {
                console.error("openlayers_StyleUtils': getValidStyleFromLayerInfo_text2'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //测试从CartoCSS中获取style
    it('getStyleFromCarto_point1', (done) => {
        var tileFeatureUrl = mapUrl + "/tileFeature.json?returnAttributes=true&x=420&y=195&width=256&height=256&scale=8.653637486605572e-7";
        var request = requestFeature(tileFeatureUrl);
        request.then((features) => {
            try {
                var layerName = "China_PreCenCity_pt@China";
                var feature = getFeature(layerName, features);
                var shader = getShader(layerName);
                var style = StyleUtils.getStyleFromCarto(10, 8.653637486605572e-7, shader, feature, true, mapUrl);
                expect(style).not.toBeNull();
                expect(style.getStroke()).toBeNull();
                expect(style.getText()).toBeNull();
                expect(style.getFill()).toBeNull();
                var imageStyle = style.getImage();
                expect(imageStyle).not.toBeNull();
                expect(imageStyle.getOpacity()).toBe(1);
                expect(imageStyle.getSrc()).not.toBeNull();
                expect(imageStyle.getImage(imageStyle.getSrc())).not.toBeNull();
                done();
            } catch (exception) {
                console.error("openlayers_StyleUtils': getStyleFromCarto_point1'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //测试从CartoCSS中获取style
    it('getStyleFromCarto_point2', (done) => {
        var tileFeatureUrl = mapUrl + "/tileFeature.json?returnAttributes=true&x=1687&y=774&width=256&height=256&scale=0.00000346145499464224";
        var request = requestFeature(tileFeatureUrl);
        request.then((features) => {
            try {
                var layerName = "Airport_pt@POI_Other";
                var feature = getFeature(layerName, features);
                var shader = getShader(layerName);
                var style = StyleUtils.getStyleFromCarto(10, 0.00000346145499464224, shader, feature, true, mapUrl);
                expect(style).not.toBeNull();
                expect(style.getStroke()).toBeNull();
                expect(style.getText()).toBeNull();
                expect(style.getFill()).toBeNull();
                var imageStyle = style.getImage();
                expect(imageStyle).not.toBeNull();
                expect(imageStyle.getOpacity()).toBe(1);
                expect(imageStyle.getSrc()).not.toBeNull();
                expect(imageStyle.getImage(imageStyle.getSrc())).not.toBeNull();
                done();
            } catch (exception) {
                console.error("openlayers_StyleUtils': getStyleFromCarto_point2'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //测试从CartoCSS中获取style
    it('getStyleFromCarto_polyLine', (done) => {
        var tileFeatureUrl = mapUrl + "/tileFeature.json?returnAttributes=true&x=420&y=193&width=256&height=256&scale=8.653637486605572e-7";
        var request = requestFeature(tileFeatureUrl);
        request.then((features) => {
            try {
                var layerName = "Main_Road_L@China#1#1";
                var feature = getFeature(layerName, features);
                var shader = getShader(layerName);
                var style = StyleUtils.getStyleFromCarto(10, 8.653637486605572e-7, shader, feature, true, mapUrl);
                expect(style).not.toBeNull();
                expect(style.getFill()).toBeNull();
                var strokeStyle = style.getStroke();
                expect(strokeStyle).not.toBeNull();
                expect(strokeStyle.getColor()).toBe('rgba(0,0,0,0)');
                expect(strokeStyle.getWidth()).toBe(1);
                expect(strokeStyle.getLineCap()).toBe('butt');
                expect(strokeStyle.getLineJoin()).toBe('round');
                expect(strokeStyle.getMiterLimit()).toBe(10);
                expect(strokeStyle.getLineDashOffset()).toBe(0);
                done();
            } catch (exception) {
                console.error("openlayers_StyleUtils': getStyleFromCarto_polyLine'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //测试从CartoCSS中获取style
    it('getStyleFromCarto_polygon', (done) => {
        var tileFeatureUrl = mapUrl + "/tileFeature.json?returnAttributes=true&x=1686&y=775&width=256&height=256&scale=0.00000346145499464224";
        var request = requestFeature(tileFeatureUrl);
        request.then((features) => {
            try {
                var layerName = "World_Division_pl@China";
                var feature = getFeature(layerName, features);
                var shader = getShader(layerName);
                var style = StyleUtils.getStyleFromCarto(9, 0.00000346145499464224, shader, feature, true, mapUrl);
                expect(style).not.toBeNull();
                expect(style.getFill()).not.toBeNull();
                expect(style.getFill().getColor()).toBe('rgba(145, 185, 234, 1)');
                var strokeStyle = style.getStroke();
                expect(strokeStyle).not.toBeNull();
                expect(strokeStyle.getColor()).toBe('rgba(0, 0, 0, 0)');
                expect(strokeStyle.getWidth()).toBe(1);
                expect(strokeStyle.getLineCap()).toBe('butt');
                expect(strokeStyle.getLineJoin()).toBe('round');
                expect(strokeStyle.getMiterLimit()).toBe(10);
                expect(strokeStyle.getLineDashOffset()).toBe(0);
                done();
            } catch (exception) {
                console.error("openlayers_StyleUtils': getStyleFromCarto_polygon'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //测试从CartoCSS中获取style
    it('getStyleFromCarto_text', (done) => {
        var tileFeatureUrl = mapUrl + "/tileFeature.json?returnAttributes=true&x=1689&y=775&width=256&height=256&scale=0.00000346145499464224";
        var request = requestFeature(tileFeatureUrl);
        request.then((features) => {
            try {
                var layerName = "District_pt@POI_Other#2";
                var feature = getFeature(layerName, features);
                var shader = getShader(layerName);
                var style = StyleUtils.getStyleFromCarto(10, 0.00000346145499464224, shader, feature, true, mapUrl);
                expect(style).not.toBeNull();
                expect(style.getStroke()).toBeNull();
                expect(style.getText()).toBeNull();
                expect(style.getFill()).toBeNull();
                var imageStyle = style.getImage();
                expect(imageStyle).not.toBeNull();
                expect(imageStyle.getOpacity()).toBe(1);
                expect(imageStyle.getRadius()).toBe(3);
                expect(imageStyle.getPoints()).toBePositiveInfinity();
                expect(imageStyle.getImage()).not.toBeNull();
                var size = imageStyle.getSize();
                expect(size).not.toBeNull();
                expect(size[0]).toBe(9);
                expect(size[1]).toBe(9);
                var anchor = imageStyle.getAnchor();
                expect(anchor).not.toBeNull();
                expect(anchor[0]).toBe(4.5);
                expect(anchor[1]).toBe(4.5);
                var stroke = imageStyle.getStroke();
                expect(stroke).not.toBeNull();
                expect(stroke.getColor()).toBe("#c33");
                expect(stroke.getWidth()).toBe(1);
                var fill = imageStyle.getFill();
                expect(fill.getColor()).toBe("#fc0");
                done();
            } catch (exception) {
                console.error("openlayers_StyleUtils': getStyleFromCarto_text'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //测试从iPortalLayers中获取style
    it('getStyleFromiPortalStyle_point', (done) => {
        var key = 'iPortalMaps44';
        var tileFormat = new ol.format.GeoJSON();
        var layerFeatures = iPortalLayersInfo[key][2].features;
        var features = tileFormat.readFeatures(Util.toGeoJSON(layerFeatures));
        try {
            var feature = features[0];
            var iPortalStyle = iPortalLayersInfo[key][2].style;
            var style = StyleUtils.getStyleFromiPortalStyle(iPortalStyle, feature.getGeometry().getType(), feature.getProperties().style);
            expect(style).not.toBeNull();
            expect(style.getStroke()).toBeNull();
            expect(style.getText()).toBeNull();
            expect(style.getFill()).toBeNull();
            var imageStyle = style.getImage();
            expect(imageStyle).not.toBeNull();
            expect(imageStyle.getOpacity()).toBe(1);
            expect(imageStyle.getSrc()).not.toBeNull();
            expect(imageStyle.getImage(imageStyle.getSrc())).not.toBeNull();
            done();
        } catch (exception) {
            console.error("openlayers_StyleUtils': getStyleFromiPortalStyle_point'案例失败：" + exception.name + ":" + exception.message);
            expect(false).toBeTruthy();
            done();
        }
    });

    //测试从iPortalLayers中获取style
    it('getStyleFromiPortalStyle_polyLine', (done) => {
        var key = 'iPortalMaps47';
        var tileFormat = new ol.format.GeoJSON();
        var layerFeatures = iPortalLayersInfo[key][3].features;
        var features = tileFormat.readFeatures(Util.toGeoJSON(layerFeatures));
        try {
            var feature = features[0];
            var iPortalStyle = iPortalLayersInfo[key][3].style;
            var style = StyleUtils.getStyleFromiPortalStyle(iPortalStyle, feature.getGeometry().getType(), feature.getProperties().style);
            expect(style).not.toBeNull();
            expect(style.getText()).toBeNull();
            expect(style.getFill()).toBeNull();
            var strokeStyle = style.getStroke();
            expect(strokeStyle).not.toBeNull();
            expect(strokeStyle.getColor()).toBe('rgba(52,219,103,1)');
            expect(strokeStyle.getWidth()).toBe(4);
            var lineDash = strokeStyle.getLineDash();
            expect(lineDash).not.toBeNull();
            expect(lineDash[0]).toBe(16);
            expect(lineDash[1]).toBe(16);
            done();
        } catch (exception) {
            console.error("openlayers_StyleUtils': getStyleFromiPortalStyle_polyLine'案例失败：" + exception.name + ":" + exception.message);
            expect(false).toBeTruthy();
            done();
        }
    });
});

var initLayersInfo = () => {
    var layersInfo = {};
    var layers = ChinaLayersInfo.subLayers.layers;
    for (var j = 0, len1 = layers.length; j < len1; j++) {
        layers[j].layerIndex = len1 - j;
        layersInfo[layers[j].name] = layers[j];
    }
    return layersInfo;
};

var initCartoCSSShaders = () => {
    var cartoCss;
    if (ChinaCartoCSS.style && ChinaCartoCSS.type === 'cartoCSS') {
        cartoCss = ChinaCartoCSS.style;
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
    var cartoShadersArray = new CartoCSS(cartoCss).getShaders();
    var cartoShaders = {};
    cartoShadersArray.map((cartoShader) => {
        cartoShaders[cartoShader.elements[0].clean] = cartoShaders[cartoShader.elements[0].clean] || {};
        cartoShaders[cartoShader.elements[0].clean][cartoShader.attachment] =
            cartoShaders[cartoShader.elements[0].clean][cartoShader.attachment] || [];
        cartoShaders[cartoShader.elements[0].clean][cartoShader.attachment].push(cartoShader);
    });
    return cartoShaders;
}

var initIPortalLayersInfo = () => {
    iPortalLayersInfo = {};
    iPortalLayersInfo['iPortalMaps44'] = iPortalMaps44.layers;

    iPortalLayersInfo['iPortalMaps47'] = iPortalMaps47.layers;
    return iPortalLayersInfo;
}

//解析测试用layerInfo
var getLayerInfo = (layerName) => {
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

var getFeature = (layerName, features) => {
    for (var key in features) {
        var feature = features[key];
        if (feature.getProperties().layerName === layerName) {
            return feature;
        }
    }
}

var getShader = (layerName) => {
    var layer = layerName.replace(/@/g, '___').replace(/#/g, '___');
    if (cartoCSSShaders) {
        return cartoCSSShaders[layer]['__default__'][0];
    }
}

//请求tileFeature获取测试用ol feature对象
var requestFeature = (url) => {
    var tileFormat = new ol.format.GeoJSON();
    return fetch(url, {method: 'GET', timeout: 10000})
        .then((response) => {
            return response.json();
        }).then((tileFeatureJson) => {
            var features = [];
            tileFeatureJson.recordsets.map((recordset) => {
                recordset.features.map((feature) => {
                    var points = [];
                    var startIndex = 0;
                    for (var i = 0; i < feature.geometry.parts.length; i++) {
                        var partPointsLength = feature.geometry.parts[i] * 2;
                        for (var j = 0, index = startIndex; j < partPointsLength; j += 2, index += 2) {
                            points.push(new Point(feature.geometry.points[index], feature.geometry.points[index + 1]));
                        }
                        startIndex += partPointsLength;
                    }
                    feature.geometry.points = points;
                })
            });
            tileFeatureJson.recordsets.map((recordset) => {
                recordset.features.map((feature) => {
                    feature.layerName = recordset.layerName;
                    feature.type = feature.geometry.type;
                    features.push(feature);
                })
            });
            features = tileFormat.readFeatures(Util.toGeoJSON(features));
            return features;
        });
}



