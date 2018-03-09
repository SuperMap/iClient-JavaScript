import {graphThemeLayer} from '../../../src/leaflet/overlay/GraphThemeLayer';
import {tiledMapLayer} from '../../../src/leaflet/mapping/TiledMapLayer';
import {themeFeature} from '../../../src/leaflet/overlay/theme/ThemeFeature';
import '../../resources/chinaConsumptionLevel';

var options = {
    isOverLay: true
};
var url = GlobeParameter.China4326URL;
describe('leaflet_GraphThemeLayer', () => {
    var originalTimeout;
    var testDiv, map;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        map = L.map("map", {
            crs: L.CRS.EPSG4326,
            center: [40, 117],
            maxZoom: 18,
            zoom: 0
        });
        tiledMapLayer(url).addTo(map);
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
        map.remove();
    });

    it('initialize', () => {
        var barThemeLayer = graphThemeLayer("BarThemeLayer", "Bar", {isOverLay: false}).addTo(map);
        barThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        barThemeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000],
            barStyle: {fillOpacity: 0.7},
            barHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundStyle: {fillColor: "#CCE8CF"},
            backgroundRadius: [5, 5, 5, 5],
            showShadow: true,
            barShadowStyle: {shadowBlur: 8, shadowOffsetX: 2, shadowOffsetY: 2, shadowColor: "rgba(100,100,100,0.8)"},
            barLinearGradient: [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]]
        };
        expect(barThemeLayer).not.toBeNull();
        expect(barThemeLayer.chartsType).toBe("Bar");
        expect(barThemeLayer.charts.length).toEqual(0);
        var chartsSetting = barThemeLayer.chartsSetting;
        expect(chartsSetting.axisXLabels.length).toEqual(5);
        expect(chartsSetting.axisYLabels.length).toEqual(5);
        expect(chartsSetting.axisYTick).toEqual(4);
        expect(chartsSetting.backgroundRadius.length).toEqual(4);
        expect(chartsSetting.backgroundStyle.fillColor).toBe("#CCE8CF");
        expect(chartsSetting.barHoverStyle.fillOpacity).toEqual(1);
        expect(chartsSetting.barStyle.fillOpacity).toEqual(0.7);
        expect(chartsSetting.barLinearGradient.length).toEqual(5);
        expect(chartsSetting.barShadowStyle).not.toBeNull();
        expect(chartsSetting.codomain.length).toEqual(2);
        expect(chartsSetting.barShadowStyle).not.toBeNull();
        expect(chartsSetting.height).toEqual(100);
        expect(chartsSetting.width).toEqual(240);
        expect(chartsSetting.showShadow).toBeTruthy();
        expect(barThemeLayer.options.isOverLay).toBeFalsy();
        expect(barThemeLayer.name).toBe("BarThemeLayer");
        expect(barThemeLayer.id).not.toBeNull();
        expect(barThemeLayer.themeFields.length).toEqual(5);
        barThemeLayer.clear();
    });

    it('setChartsType', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar", options).addTo(map);
        themeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000]
        };
        expect(themeLayer.chartsType).toBe("Bar");
        themeLayer.setChartsType("Line");
        expect(themeLayer.chartsType).toBe("Line");
        themeLayer.clear();
    });

    it('addFeatures_point', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        themeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        themeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000],
            barStyle: {fillOpacity: 0.7},
            barHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundStyle: {fillColor: "#CCE8CF"},
            backgroundRadius: [5, 5, 5, 5],
            showShadow: true,
            barShadowStyle: {shadowBlur: 8, shadowOffsetX: 2, shadowOffsetY: 2, shadowColor: "rgba(100,100,100,0.8)"},
            barLinearGradient: [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]]
        };
        expect(themeLayer.features.length).toEqual(0);
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            var provinceInfo = chinaConsumptionLevel[i];
            var geometry = L.point(provinceInfo[1], provinceInfo[2]);
            var atrributes = {};
            atrributes.NAME = provinceInfo[0];
            atrributes.CON2009 = provinceInfo[3];
            atrributes.CON2010 = provinceInfo[4];
            atrributes.CON2011 = provinceInfo[5];
            atrributes.CON2012 = provinceInfo[6];
            atrributes.CON2013 = provinceInfo[7];
            var fea = themeFeature(geometry, atrributes);
            features.push(fea);
        }
        themeLayer.addFeatures(features);
        var LayerFeatures = themeLayer.features;
        expect(LayerFeatures.length).toBeGreaterThan(0);
        expect(LayerFeatures[0].geometry.y).toEqual(39.904557);
        expect(LayerFeatures[0].geometry.x).toEqual(116.407283);
        expect(LayerFeatures[0].data).toEqual(LayerFeatures[0].attributes);
        expect(LayerFeatures[0].data).toEqual(Object({
            CON2009: 22023,
            CON2010: 24982,
            CON2011: 27760,
            CON2012: 30350,
            CON2013: 33337,
            NAME: "北京市"
        }));
        var shape1 = themeLayer.getShapesByFeatureID();
        var shape2 = themeLayer.getShapesByFeatureID(LayerFeatures[0].id);
        expect(shape1.length).toEqual(17);
        expect(shape2.length).toEqual(5);
        var weightFieldValue = themeLayer.getWeightFieldValue(LayerFeatures[0], "CON2009", 0);
        expect(weightFieldValue).toEqual(22023);
        var weightFieldValue2 = themeLayer.getWeightFieldValue(LayerFeatures[0], "CON2007", 10);
        expect(weightFieldValue2).toEqual(10);
        var weightFieldValue3 = themeLayer.getWeightFieldValue(LayerFeatures[0], "CON2007");
        expect(weightFieldValue3).toEqual(0);
        themeLayer.features[0].geometry.x = 39;
        var redraw = themeLayer.redraw();
        expect(themeLayer.features[0].geometry.x).toEqual(39);
        expect(redraw).toBeTruthy();
        themeLayer.clear();
    });

    it('isQuadrilateralOverLap', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        themeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        themeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000]
        };
        var quadrilateral, quadrilateral2;
        quadrilateral = [{"x": 1, "y": 1}, {"x": 3, "y": 1}, {"x": 6, "y": 4}, {"x": 2, "y": 10}, {"x": 1, "y": 1}];
        quadrilateral2 = [{"x": 1, "y": 1}, {"x": 3, "y": 1}, {"x": 6, "y": 4}, {"x": 2, "y": 10}, {"x": 1, "y": 1}];
        var isPointInPoly = themeLayer.isQuadrilateralOverLap(quadrilateral, quadrilateral2);
        expect(isPointInPoly).toBeTruthy();
        themeLayer.clear();
    });

    // 此方法为iclient8的私有方法,不支持leaflet对象,此处测试传入iclient对象的情况
    it('isPointInPoly', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar", options).addTo(map);
        themeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        themeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000]
        };
        var point = {"x": 2, "y": 5};
        var polygon = [{"x": 1, "y": 1}, {"x": 3, "y": 1}, {"x": 6, "y": 4}, {"x": 2, "y": 10}, {"x": 1, "y": 1}];
        var isPointInPoly = themeLayer.isPointInPoly(point, polygon);
        expect(isPointInPoly).toBeTruthy();
        themeLayer.clear();
    });

    //overlayWeightField默认为空
    it('drawCharts_overlayWeightField = null', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar", {
            isOverLay: false
        }).addTo(map);
        themeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        themeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000],
            barStyle: {fillOpacity: 0.7},
            barHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundStyle: {fillColor: "#CCE8CF"},
            backgroundRadius: [5, 5, 5, 5],
            showShadow: true,
            barShadowStyle: {shadowBlur: 8, shadowOffsetX: 2, shadowOffsetY: 2, shadowColor: "rgba(100,100,100,0.8)"},
            barLinearGradient: [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]]
        };
        themeLayer.drawCharts();
        expect(themeLayer).not.toBeNull();
        themeLayer.clear();
    });

    //overlayWeightField = "CON2013"
    it('drawCharts_overlayWeightField != null', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar", {
            isOverLay: false
        }).addTo(map);
        themeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        themeLayer.overlayWeightField = "CON2013";
        themeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000],
            barStyle: {fillOpacity: 0.7},
            barHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundStyle: {fillColor: "#CCE8CF"},
            backgroundRadius: [5, 5, 5, 5],
            showShadow: true,
            barShadowStyle: {shadowBlur: 8, shadowOffsetX: 2, shadowOffsetY: 2, shadowColor: "rgba(100,100,100,0.8)"},
            barLinearGradient: [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]]
        };
        themeLayer.drawCharts();
        expect(themeLayer).not.toBeNull();
        themeLayer.clear();
    });

    //从专题图中删除 feature。删除所有传递进来的某一个矢量要素。
    it('removeFeatures', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        themeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        themeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000],
            barStyle: {fillOpacity: 0.7},
            barHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundStyle: {fillColor: "#CCE8CF"},
            backgroundRadius: [5, 5, 5, 5],
            showShadow: true,
            barShadowStyle: {shadowBlur: 8, shadowOffsetX: 2, shadowOffsetY: 2, shadowColor: "rgba(100,100,100,0.8)"},
            barLinearGradient: [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]]
        };
        expect(themeLayer.features.length).toEqual(0);
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            var provinceInfo = chinaConsumptionLevel[i];
            var geometry = L.point(provinceInfo[1], provinceInfo[2]);
            var atrributes = {};
            atrributes.NAME = provinceInfo[0];
            atrributes.CON2009 = provinceInfo[3];
            atrributes.CON2010 = provinceInfo[4];
            atrributes.CON2011 = provinceInfo[5];
            atrributes.CON2012 = provinceInfo[6];
            atrributes.CON2013 = provinceInfo[7];
            var fea = themeFeature(geometry, atrributes);
            features.push(fea);
        }
        themeLayer.addFeatures(features);
        expect(themeLayer.features.length).toEqual(31);
        expect(themeLayer.features[0].data.NAME).toEqual("北京市");
        var removeFeature = themeLayer.features[0];
        themeLayer.removeFeatures(removeFeature);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.features.length).toEqual(30);
        expect(themeLayer.features[0].data.NAME).toEqual("天津市");
        themeLayer.clear();
    });

    it('clearCache', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar", options).addTo(map);
        themeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        themeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000]
        };
        themeLayer.charts = [1, 2, 3];
        themeLayer.cache = {'name': 'ONETWO'};
        expect(themeLayer.charts.length).toEqual(3);
        expect(themeLayer.cache).toEqual(Object({
            name: "ONETWO"
        }));
        themeLayer.clearCache();
        expect(themeLayer.charts.length).toEqual(0);
        expect(themeLayer.cache).toEqual(Object({}));
    });

    //测试其父类“/theme/ThemeLayer”中的接口
    //销毁addFeatures_point方法添加的所有要素
    it('destroyFeatures', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        themeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        themeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000],
            barStyle: {fillOpacity: 0.7},
            barHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundStyle: {fillColor: "#CCE8CF"},
            backgroundRadius: [5, 5, 5, 5],
            showShadow: true,
            barShadowStyle: {shadowBlur: 8, shadowOffsetX: 2, shadowOffsetY: 2, shadowColor: "rgba(100,100,100,0.8)"},
            barLinearGradient: [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]]
        };
        expect(themeLayer.features.length).toEqual(0);
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            var provinceInfo = chinaConsumptionLevel[i];
            var geometry = L.point(provinceInfo[1], provinceInfo[2]);
            var atrributes = {};
            atrributes.NAME = provinceInfo[0];
            atrributes.CON2009 = provinceInfo[3];
            atrributes.CON2010 = provinceInfo[4];
            atrributes.CON2011 = provinceInfo[5];
            atrributes.CON2012 = provinceInfo[6];
            atrributes.CON2013 = provinceInfo[7];
            var fea = themeFeature(geometry, atrributes);
            features.push(fea);
        }
        themeLayer.addFeatures(features);
        themeLayer.destroyFeatures(undefined);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.features.length).toEqual(0);
        themeLayer.clear();
    });

    //查看当前图层中的有效数据
    it('getFeatures', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        themeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        themeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000],
            barStyle: {fillOpacity: 0.7},
            barHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundStyle: {fillColor: "#CCE8CF"},
            backgroundRadius: [5, 5, 5, 5],
            showShadow: true,
            barShadowStyle: {shadowBlur: 8, shadowOffsetX: 2, shadowOffsetY: 2, shadowColor: "rgba(100,100,100,0.8)"},
            barLinearGradient: [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]]
        };
        expect(themeLayer.features.length).toEqual(0);
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            var provinceInfo = chinaConsumptionLevel[i];
            var geometry = L.point(provinceInfo[1], provinceInfo[2]);
            var atrributes = {};
            atrributes.NAME = provinceInfo[0];
            atrributes.CON2009 = provinceInfo[3];
            atrributes.CON2010 = provinceInfo[4];
            atrributes.CON2011 = provinceInfo[5];
            atrributes.CON2012 = provinceInfo[6];
            atrributes.CON2013 = provinceInfo[7];
            var fea = themeFeature(geometry, atrributes);
            features.push(fea);
        }
        themeLayer.addFeatures(features);
        var clonedFeatures = themeLayer.getFeatures();
        expect(clonedFeatures).not.toBeNull();
        expect(clonedFeatures.length).toEqual(31);
        for (var i = 0; i < clonedFeatures.length; i++) {
            expect(clonedFeatures[i].CLASS_NAME).toEqual("SuperMap.Feature.Vector");
        }
        themeLayer.clear();
    });

    //在专题图的要素数组 features 里面遍历每一个 feature，当 feature[property] === value 时，返回此 feature
    it('getFeatureBy', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        themeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        themeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000],
            barStyle: {fillOpacity: 0.7},
            barHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundStyle: {fillColor: "#CCE8CF"},
            backgroundRadius: [5, 5, 5, 5],
            showShadow: true,
            barShadowStyle: {shadowBlur: 8, shadowOffsetX: 2, shadowOffsetY: 2, shadowColor: "rgba(100,100,100,0.8)"},
            barLinearGradient: [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]]
        };
        expect(themeLayer.features.length).toEqual(0);
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            var provinceInfo = chinaConsumptionLevel[i];
            var geometry = L.point(provinceInfo[1], provinceInfo[2]);
            var atrributes = {};
            atrributes.NAME = provinceInfo[0];
            atrributes.CON2009 = provinceInfo[3];
            atrributes.CON2010 = provinceInfo[4];
            atrributes.CON2011 = provinceInfo[5];
            atrributes.CON2012 = provinceInfo[6];
            atrributes.CON2013 = provinceInfo[7];
            var fea = themeFeature(geometry, atrributes);
            features.push(fea);
        }
        themeLayer.addFeatures(features);
        var resultFeatures = themeLayer.getFeatures();
        var id = resultFeatures[0].id;
        var result = themeLayer.getFeatureBy("id", id);
        expect(result).not.toBeNull();
        expect(result.id).toEqual(id);
        expect(result.attributes.NAME).toEqual("北京市");
        themeLayer.clear();
    });

    //通过给定一个 id，返回对应的矢量要素
    it('getFeatureById', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        themeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        themeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000],
            barStyle: {fillOpacity: 0.7},
            barHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundStyle: {fillColor: "#CCE8CF"},
            backgroundRadius: [5, 5, 5, 5],
            showShadow: true,
            barShadowStyle: {shadowBlur: 8, shadowOffsetX: 2, shadowOffsetY: 2, shadowColor: "rgba(100,100,100,0.8)"},
            barLinearGradient: [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]]
        };
        expect(themeLayer.features.length).toEqual(0);
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            var provinceInfo = chinaConsumptionLevel[i];
            var geometry = L.point(provinceInfo[1], provinceInfo[2]);
            var atrributes = {};
            atrributes.NAME = provinceInfo[0];
            atrributes.CON2009 = provinceInfo[3];
            atrributes.CON2010 = provinceInfo[4];
            atrributes.CON2011 = provinceInfo[5];
            atrributes.CON2012 = provinceInfo[6];
            atrributes.CON2013 = provinceInfo[7];
            var fea = themeFeature(geometry, atrributes);
            features.push(fea);
        }
        themeLayer.addFeatures(features);
        var resultFeatures = themeLayer.getFeatures();
        var id = resultFeatures[0].id;
        var result = themeLayer.getFeatureById(id);
        expect(result).not.toBeNull();
        expect(result.id).toEqual(id);
        expect(result.attributes.NAME).toEqual("北京市");
        themeLayer.clear();
    });

    // 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
    it('getFeaturesByAttribute', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        themeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        themeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000],
            barStyle: {fillOpacity: 0.7},
            barHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundStyle: {fillColor: "#CCE8CF"},
            backgroundRadius: [5, 5, 5, 5],
            showShadow: true,
            barShadowStyle: {shadowBlur: 8, shadowOffsetX: 2, shadowOffsetY: 2, shadowColor: "rgba(100,100,100,0.8)"},
            barLinearGradient: [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]]
        };
        expect(themeLayer.features.length).toEqual(0);
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            var provinceInfo = chinaConsumptionLevel[i];
            var geometry = L.point(provinceInfo[1], provinceInfo[2]);
            var atrributes = {};
            atrributes.NAME = provinceInfo[0];
            atrributes.CON2009 = provinceInfo[3];
            atrributes.CON2010 = provinceInfo[4];
            atrributes.CON2011 = provinceInfo[5];
            atrributes.CON2012 = provinceInfo[6];
            atrributes.CON2013 = provinceInfo[7];
            var fea = themeFeature(geometry, atrributes);
            features.push(fea);
        }
        themeLayer.addFeatures(features);
        var result = themeLayer.getFeaturesByAttribute("NAME", "北京市");
        expect(result).not.toBeNull();
        expect(result.length).toEqual(1);
        expect(result[0].attributes.NAME).toEqual("北京市");
        themeLayer.clear();
    });

    //设置图层的不透明度,取值[0-1]之间。
    it('setOpacity', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar", options).addTo(map);
        themeLayer.setOpacity(0.5);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.options.opacity).toEqual(0.5);
        themeLayer.clear();
    });

    //添加专题图
    it('onAdd', () => {
        var themeLayer = graphThemeLayer("BarThemeLayer", "Bar", options);
        themeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        themeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000],
            barStyle: {fillOpacity: 0.7},
            barHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundStyle: {fillColor: "#CCE8CF"},
            backgroundRadius: [5, 5, 5, 5],
            showShadow: true,
            barShadowStyle: {shadowBlur: 8, shadowOffsetX: 2, shadowOffsetY: 2, shadowColor: "rgba(100,100,100,0.8)"},
            barLinearGradient: [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]]
        };
        expect(themeLayer.features.length).toEqual(0);
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            var provinceInfo = chinaConsumptionLevel[i];
            var geometry = L.point(provinceInfo[1], provinceInfo[2]);
            var atrributes = {};
            atrributes.NAME = provinceInfo[0];
            atrributes.CON2009 = provinceInfo[3];
            atrributes.CON2010 = provinceInfo[4];
            atrributes.CON2011 = provinceInfo[5];
            atrributes.CON2012 = provinceInfo[6];
            atrributes.CON2013 = provinceInfo[7];
            var fea = themeFeature(geometry, atrributes);
            features.push(fea);
        }
        themeLayer.addFeatures(features);
        themeLayer.onAdd(map);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsType).toBe("Bar");
        expect(themeLayer.charts.length).toEqual(31);
        expect(themeLayer.features.length).toEqual(31);
        expect(themeLayer.options.isOverLay).toBeTruthy();
        expect(themeLayer.name).toBe("BarThemeLayer");
        expect(themeLayer.id).not.toBeNull();
        expect(themeLayer.themeFields.length).toEqual(5);
        var chartsSetting = themeLayer.chartsSetting;
        expect(chartsSetting.axisXLabels.length).toEqual(5);
        expect(chartsSetting.axisYLabels.length).toEqual(5);
        expect(chartsSetting.axisYTick).toEqual(4);
        expect(chartsSetting.backgroundRadius.length).toEqual(4);
        expect(chartsSetting.backgroundStyle.fillColor).toBe("#CCE8CF");
        expect(chartsSetting.barHoverStyle.fillOpacity).toEqual(1);
        expect(chartsSetting.barStyle.fillOpacity).toEqual(0.7);
        expect(chartsSetting.barLinearGradient.length).toEqual(5);
        expect(chartsSetting.barShadowStyle).not.toBeNull();
        expect(chartsSetting.codomain.length).toEqual(2);
        expect(chartsSetting.barShadowStyle).not.toBeNull();
        expect(chartsSetting.height).toEqual(100);
        expect(chartsSetting.width).toEqual(240);
        themeLayer.clear();
    });

    //测其父类“/common/overlay/Bar”中的接口
    it('Bar', () => {
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            // 省居民消费水平（单位：元）信息
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = L.point([provinceInfo[1], provinceInfo[2]]);
            var attrs = {};
            attrs.NAME = provinceInfo[0];
            attrs.CON2009 = provinceInfo[3];
            attrs.CON2010 = provinceInfo[4];
            attrs.CON2011 = provinceInfo[5];
            attrs.CON2012 = provinceInfo[6];
            attrs.CON2013 = provinceInfo[7];
            var fea = themeFeature(geo, attrs);
            features.push(fea);
        }
        var chartsSettingForBarCommon = {
            width: 260,
            height: 120,
            codomain: [0, 40000],
            xShapeBlank: [15, 15, 15],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundRadius: [5, 5, 5, 5],
            backgroundStyle: {
                fillColor: "#d1eeee",
                shadowBlur: 12,
                shadowColor: "#d1eeee"
            }
        };
        var themeLayerOptions = {
            map: map,
            isOverLay: true,
            attributions: " ",
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            opacity: 0.9,
            chartsSetting: {},
        };
        var chartsSettingForBar = chartsSettingForBarCommon;
        chartsSettingForBar.barStyle = {fillOpacity: 0.7};      // 柱状图中柱条的（表示字段值的图形）样式
        chartsSettingForBar.barHoverStyle = {fillOpacity: 1};      //  柱条 hover 样式
        //阴影样式
        chartsSettingForBar.barShadowStyle = {
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
            shadowColor: "rgba(100,100,100,0.8)"
        };
        chartsSettingForBar.barLinearGradient = [
            ["#00FF00", "#00CD00"],
            ["#00CCFF", "#5E87A2"],
            ["#00FF66", "#669985"],
            ["#CCFF00", "#94A25E"],
            ["#FF9900", "#A2945E"]];

        themeLayerOptions.chartsSetting = chartsSettingForBar;
        var themeLayer = graphThemeLayer("BarLayer", "Bar", themeLayerOptions);
        themeLayer.addFeatures(features);
        map.addLayer(themeLayer);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsType).toEqual("Bar");
        expect(themeLayer.themeFields.length).toEqual(5);
        expect(themeLayer.chartsSetting.xShapeBlank.length).toEqual(3);
        expect(themeLayer.chartsSetting.axisYTick).toEqual(4);
        expect(themeLayer.chartsSetting.axisXLabels.length).toEqual(5);
        expect(themeLayer.chartsSetting.axisXLabels[0]).toEqual("09年");
        themeLayer.clear();
    });

    //另一组参数
    it('Bar_xShapeBlank = undefined', () => {
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            // 省居民消费水平（单位：元）信息
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = L.point([provinceInfo[1], provinceInfo[2]]);
            var attrs = {};
            attrs.NAME = provinceInfo[0];
            attrs.CON2009 = provinceInfo[3];
            attrs.CON2010 = provinceInfo[4];
            attrs.CON2011 = provinceInfo[5];
            attrs.CON2012 = provinceInfo[6];
            attrs.CON2013 = provinceInfo[7];
            var fea = themeFeature(geo, attrs);
            features.push(fea);
        }
        var chartsSettingForBarCommon = {
            width: 260,
            height: 120,
            codomain: [0, 40000],
            useAxis: false,
            backgroundRadius: [5, 5, 5, 5],
            backgroundStyle: {
                fillColor: "#d1eeee",
                shadowBlur: 12,
                shadowColor: "#d1eeee"
            },
            barHoverAble: false,
            barClickAble: true
        };
        var themeLayerOptions = {
            map: map,
            isOverLay: true,
            attributions: " ",
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            opacity: 0.9,
            chartsSetting: {},
        };
        var chartsSettingForBar = chartsSettingForBarCommon;
        chartsSettingForBar.barStyle = {fillOpacity: 0.7};      // 柱状图中柱条的（表示字段值的图形）样式
        chartsSettingForBar.barHoverStyle = {fillOpacity: 1};      //  柱条 hover 样式
        //阴影样式
        chartsSettingForBar.barShadowStyle = {
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
            shadowColor: "rgba(100,100,100,0.8)"
        };
        chartsSettingForBar.barLinearGradient = [
            ["#00FF00", "#00CD00"],
            ["#00CCFF", "#5E87A2"],
            ["#00FF66", "#669985"],
            ["#CCFF00", "#94A25E"],
            ["#FF9900", "#A2945E"]];

        themeLayerOptions.chartsSetting = chartsSettingForBar;
        var themeLayer = graphThemeLayer("BarLayer", "Bar", themeLayerOptions);
        themeLayer.addFeatures(features);
        map.addLayer(themeLayer);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsType).toEqual("Bar");
        expect(themeLayer.features.length).toEqual(31);
        expect(themeLayer.themeFields.length).toEqual(5);
        expect(themeLayer.chartsSetting.dataViewBoxParameter.length).toEqual(4);
        for (var i = 0; i < themeLayer.chartsSetting.dataViewBoxParameter.length; i++) {
            expect(themeLayer.chartsSetting.dataViewBoxParameter[i]).toEqual(5);
        }
        expect(themeLayer.chartsSetting.useAxis).toBeFalsy();
        themeLayer.clear();
    });

    //测其父类“/common/overlay/Bar3D”中的接口
    it('Bar3D', () => {
        var themeLayerOptions = {
            map: map,
            isOverLay: true,
            attributions: " ",
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            opacity: 0.9,
            chartsSetting: {},
        };
        var chartsSettingForBarAddBar3DCommon = {
            width: 260,
            height: 120,
            codomain: [0, 40000],
            xShapeBlank: [15, 15, 15],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundRadius: [5, 5, 5, 5],
            backgroundStyle: {
                fillColor: "#d1eeee",
                shadowBlur: 12,
                shadowColor: "#d1eeee"
            }
        };
        var chartsSettingForBar3D = chartsSettingForBarAddBar3DCommon;
        chartsSettingForBar3D.useXReferenceLine = true;
        chartsSettingForBar3D.xReferenceLineStyle = {strokeColor: "#008acd", strokeOpacity: 0.4};
        // 3d 柱条正面样式（3d 柱条的侧面和顶面会以 3d 柱条正面样式为默认样式）
        chartsSettingForBar3D.barFaceStyle = {stroke: true};
        // 按字段设置 3d 柱条正面样式
        chartsSettingForBar3D.barFaceStyleByFields = [
            {fillColor: "#FFB980"},
            {fillColor: "#5AB1EF"},
            {fillColor: "#B6A2DE"},
            {fillColor: "#2EC7C9"},
            {fillColor: "#D87A80"}];
        // 3d 柱条正面 hover 样式（3d 柱条的侧面和顶面 hover 会以 3d 柱条正面 hover 样式为默认 hover 样式）
        chartsSettingForBar3D.barFaceHoverStyle = {
            stroke: true,
            strokeWidth: 1,
            strokeColor: "#ffff00"
        };

        themeLayerOptions.chartsSetting = chartsSettingForBar3D;
        var themeLayer = graphThemeLayer("Bar3DLayer", "Bar3D", themeLayerOptions);
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            // 省居民消费水平（单位：元）信息
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = L.point([provinceInfo[1], provinceInfo[2]]);
            var attrs = {};
            attrs.NAME = provinceInfo[0];
            attrs.CON2009 = provinceInfo[3];
            attrs.CON2010 = provinceInfo[4];
            attrs.CON2011 = provinceInfo[5];
            attrs.CON2012 = provinceInfo[6];
            attrs.CON2013 = provinceInfo[7];
            var fea = themeFeature(geo, attrs);
            features.push(fea);
        }
        themeLayer.addFeatures(features);
        map.addLayer(themeLayer);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsType).toEqual("Bar3D");
        expect(themeLayer.charts.length).toEqual(31);
        expect(themeLayer.chartsSetting).not.toBeNull();
        expect(themeLayer.features.length).toEqual(31);
        expect(themeLayer.themeFields.length).toEqual(5);
        expect(themeLayer.chartsSetting.dataViewBoxParameter[0]).toEqual(45);
        expect(themeLayer.chartsSetting.dataViewBoxParameter[1]).toEqual(25);
        expect(themeLayer.chartsSetting.dataViewBoxParameter[2]).toEqual(20);
        expect(themeLayer.chartsSetting.dataViewBoxParameter[3]).toEqual(20);
        expect(themeLayer.chartsSetting.axis3DParameter).toEqual(20);
        expect(themeLayer.chartsSetting.axisYTick).toEqual(4);
        themeLayer.clear();
    });

    //另一组参数
    it('Bar3D_xShapeBlank = undefined', () => {
        var themeLayerOptions = {
            map: map,
            isOverLay: true,
            attributions: " ",
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            opacity: 0.9,
            chartsSetting: {},
        };
        var chartsSettingForBarAddBar3DCommon = {
            width: 260,
            height: 120,
            codomain: [0, 40000],
            useAxis: false,
            bar3DParameter: -1,
            backgroundRadius: [5, 5, 5, 5],
            backgroundStyle: {
                fillColor: "#d1eeee",
                shadowBlur: 12,
                shadowColor: "#d1eeee"
            },
            barHoverAble: false,
            barClickAble: true
        };
        var chartsSettingForBar3D = chartsSettingForBarAddBar3DCommon;
        chartsSettingForBar3D.useXReferenceLine = true;
        chartsSettingForBar3D.xReferenceLineStyle = {strokeColor: "#008acd", strokeOpacity: 0.4};
        // 3d 柱条正面样式（3d 柱条的侧面和顶面会以 3d 柱条正面样式为默认样式）
        chartsSettingForBar3D.barFaceStyle = {stroke: true};
        // 按字段设置 3d 柱条正面样式
        chartsSettingForBar3D.barFaceStyleByFields = [
            {fillColor: "#FFB980"},
            {fillColor: "#5AB1EF"},
            {fillColor: "#B6A2DE"},
            {fillColor: "#2EC7C9"},
            {fillColor: "#D87A80"}];
        // 3d 柱条正面 hover 样式（3d 柱条的侧面和顶面 hover 会以 3d 柱条正面 hover 样式为默认 hover 样式）
        chartsSettingForBar3D.barFaceHoverStyle = {
            stroke: true,
            strokeWidth: 1,
            strokeColor: "#ffff00"
        };

        themeLayerOptions.chartsSetting = chartsSettingForBar3D;
        var themeLayer = graphThemeLayer("Bar3DLayer", "Bar3D", themeLayerOptions);
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            // 省居民消费水平（单位：元）信息
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = L.point([provinceInfo[1], provinceInfo[2]]);
            var attrs = {};
            attrs.NAME = provinceInfo[0];
            attrs.CON2009 = provinceInfo[3];
            attrs.CON2010 = provinceInfo[4];
            attrs.CON2011 = provinceInfo[5];
            attrs.CON2012 = provinceInfo[6];
            attrs.CON2013 = provinceInfo[7];
            var fea = themeFeature(geo, attrs);
            features.push(fea);
        }
        themeLayer.addFeatures(features);
        map.addLayer(themeLayer);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsType).toEqual("Bar3D");
        expect(themeLayer.charts.length).toEqual(31);
        expect(themeLayer.features.length).toEqual(31);
        expect(themeLayer.themeFields.length).toEqual(5);
        expect(themeLayer.chartsSetting.dataViewBoxParameter.length).toEqual(4);
        for (var i = 0; i < themeLayer.chartsSetting.dataViewBoxParameter.length; i++) {
            expect(themeLayer.chartsSetting.dataViewBoxParameter[i]).toEqual(5);
        }
        expect(themeLayer.chartsSetting.useAxis).toBeFalsy();
        themeLayer.clear();
    });

    //测其父类“/common/overlay/Line”中的接口
    it('Line', () => {
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            // 省居民消费水平（单位：元）信息
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = L.point([provinceInfo[1], provinceInfo[2]]);
            var attrs = {};
            attrs.NAME = provinceInfo[0];
            attrs.CON2009 = provinceInfo[3];
            attrs.CON2010 = provinceInfo[4];
            attrs.CON2011 = provinceInfo[5];
            attrs.CON2012 = provinceInfo[6];
            attrs.CON2013 = provinceInfo[7];
            var fea = themeFeature(geo, attrs);
            features.push(fea);
        }
        var themeLayerOptions = {
            map: map,
            isOverLay: true,
            attributions: " ",
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            opacity: 0.9,
            chartsSetting: {},
        };
        var chartsSettingForLine = {
            width: 220,
            height: 100,
            codomain: [0, 40000],
            xShapeBlank: [10, 10],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundStyle: {fillColor: "#d1eeee"},
            backgroundRadius: [5, 5, 5, 5],
            useXReferenceLine: true,
            pointStyle: {
                pointRadius: 5,
                shadowBlur: 12,
                shadowColor: "#D8361B",
                fillOpacity: 0.8
            },
            pointHoverStyle: {
                stroke: true,
                strokeColor: "#D8361B",
                strokeWidth: 2,
                fillColor: "#ffffff",
                pointRadius: 4
            },
        };
        chartsSettingForLine.pointStyle.fillColor = "#9966CC";
        themeLayerOptions.chartsSetting = chartsSettingForLine;
        var themeLayer = graphThemeLayer("LineLayer", "Line", themeLayerOptions);
        themeLayer.addFeatures(features);
        map.addLayer(themeLayer);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsType).toEqual("Line");
        expect(themeLayer.charts.length).toEqual(31);
        expect(themeLayer.features.length).toEqual(31);
        expect(themeLayer.chartsSetting.axisYTick).toEqual(4);
        expect(themeLayer.chartsSetting.dataViewBoxParameter[0]).toEqual(45);
        expect(themeLayer.chartsSetting.dataViewBoxParameter[1]).toEqual(15);
        expect(themeLayer.chartsSetting.dataViewBoxParameter[2]).toEqual(15);
        expect(themeLayer.chartsSetting.dataViewBoxParameter[3]).toEqual(15);
        expect(themeLayer.chartsSetting.xShapeBlank.length).toEqual(2);
        themeLayer.clear();
    });

    //另一组参数
    it('Line_xShapeBlank = undefined', () => {
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            // 省居民消费水平（单位：元）信息
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = L.point([provinceInfo[1], provinceInfo[2]]);
            var attrs = {};
            attrs.NAME = provinceInfo[0];
            attrs.CON2009 = provinceInfo[3];
            attrs.CON2010 = provinceInfo[4];
            attrs.CON2011 = provinceInfo[5];
            attrs.CON2012 = provinceInfo[6];
            attrs.CON2013 = provinceInfo[7];
            var fea = themeFeature(geo, attrs);
            features.push(fea);
        }
        var themeLayerOptions = {
            map: map,
            isOverLay: true,
            attributions: " ",
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            opacity: 0.9,
            chartsSetting: {},
        };
        var chartsSettingForLine = {
            width: 220,
            height: 100,
            codomain: [0, 40000],
            useAxis: false,
            backgroundStyle: {fillColor: "#d1eeee"},
            backgroundRadius: [5, 5, 5, 5],
            useXReferenceLine: true,
            pointStyle: {
                pointRadius: 5,
                shadowBlur: 12,
                shadowColor: "#D8361B",
                fillOpacity: 0.8
            },
            pointHoverAble: false,
            pointClickAble: true,
        };
        chartsSettingForLine.pointStyle.fillColor = "#9966CC";
        themeLayerOptions.chartsSetting = chartsSettingForLine;
        var themeLayer = graphThemeLayer("LineLayer", "Line", themeLayerOptions);
        themeLayer.addFeatures(features);
        map.addLayer(themeLayer);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsType).toEqual("Line");
        expect(themeLayer.charts.length).toEqual(31);
        expect(themeLayer.features.length).toEqual(31);
        expect(themeLayer.chartsSetting.dataViewBoxParameter.length).toEqual(4);
        for (var i = 0; i < themeLayer.chartsSetting.dataViewBoxParameter.length; i++) {
            expect(themeLayer.chartsSetting.dataViewBoxParameter[i]).toEqual(5);
        }
        expect(themeLayer.chartsSetting.useAxis).toBeFalsy();
        expect(themeLayer.chartsSetting.pointClickAble).toBeTruthy();
        expect(themeLayer.chartsSetting.pointHoverAble).toBeFalsy();
        themeLayer.clear();
    });

    //测其父类“/common/overlay/Point”中的接口
    it('Point', () => {
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            // 省居民消费水平（单位：元）信息
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = L.point([provinceInfo[1], provinceInfo[2]]);
            var attrs = {};
            attrs.NAME = provinceInfo[0];
            attrs.CON2009 = provinceInfo[3];
            attrs.CON2010 = provinceInfo[4];
            attrs.CON2011 = provinceInfo[5];
            attrs.CON2012 = provinceInfo[6];
            attrs.CON2013 = provinceInfo[7];
            var fea = themeFeature(geo, attrs);
            features.push(fea);
        }
        var themeLayerOptions = {
            map: map,
            isOverLay: true,
            attributions: " ",
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            opacity: 0.9,
            chartsSetting: {},
        };
        var chartsSettingForPoint = {
            width: 220,
            height: 100,
            codomain: [0, 40000],
            xShapeBlank: [10, 10],
            axisYTick: 4,
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],
            backgroundStyle: {fillColor: "#d1eeee"},
            backgroundRadius: [5, 5, 5, 5],
            useXReferenceLine: true,
            pointStyle: {
                pointRadius: 5,
                shadowBlur: 12,
                shadowColor: "#D8361B",
                fillOpacity: 0.8
            },
            pointHoverStyle: {
                stroke: true,
                strokeColor: "#D8361B",
                strokeWidth: 2,
                fillColor: "#ffffff",
                pointRadius: 4
            },
        };
        chartsSettingForPoint.pointStyle.fillColor = "#D8361B";
        themeLayerOptions.chartsSetting = chartsSettingForPoint;
        var themeLayer = graphThemeLayer("PiontLayer", "Point", themeLayerOptions);
        themeLayer.addFeatures(features);
        map.addLayer(themeLayer);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsType).toEqual("Point");
        expect(themeLayer.charts.length).toEqual(31);
        expect(themeLayer.features.length).toEqual(31);
        expect(themeLayer.chartsSetting.axisYTick).toEqual(4);
        expect(themeLayer.chartsSetting.dataViewBoxParameter[0]).toEqual(45);
        expect(themeLayer.chartsSetting.dataViewBoxParameter[1]).toEqual(15);
        expect(themeLayer.chartsSetting.dataViewBoxParameter[2]).toEqual(15);
        expect(themeLayer.chartsSetting.dataViewBoxParameter[3]).toEqual(15);
        expect(themeLayer.chartsSetting.xShapeBlank.length).toEqual(2);
        themeLayer.clear();

    });

    //另一组参数
    it('Point_xShapeBlank = undefined', () => {
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            // 省居民消费水平（单位：元）信息
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = L.point([provinceInfo[1], provinceInfo[2]]);
            var attrs = {};
            attrs.NAME = provinceInfo[0];
            attrs.CON2009 = provinceInfo[3];
            attrs.CON2010 = provinceInfo[4];
            attrs.CON2011 = provinceInfo[5];
            attrs.CON2012 = provinceInfo[6];
            attrs.CON2013 = provinceInfo[7];
            var fea = themeFeature(geo, attrs);
            features.push(fea);
        }
        var themeLayerOptions = {
            map: map,
            isOverLay: true,
            attributions: " ",
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            opacity: 0.9,
            chartsSetting: {},
        };
        var chartsSettingForPoint = {
            width: 220,
            height: 100,
            codomain: [0, 40000],
            useAxis: false,
            backgroundStyle: {fillColor: "#d1eeee"},
            backgroundRadius: [5, 5, 5, 5],
            useXReferenceLine: true,
            pointStyle: {
                pointRadius: 5,
                shadowBlur: 12,
                shadowColor: "#D8361B",
                fillOpacity: 0.8
            },
            pointHoverAble: false,
            pointClickAble: true,
        };
        chartsSettingForPoint.pointStyle.fillColor = "#D8361B";
        themeLayerOptions.chartsSetting = chartsSettingForPoint;
        var themeLayer = graphThemeLayer("PiontLayer", "Point", themeLayerOptions);
        themeLayer.addFeatures(features);
        map.addLayer(themeLayer);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsType).toEqual("Point");
        expect(themeLayer.charts.length).toEqual(31);
        expect(themeLayer.features.length).toEqual(31);
        expect(themeLayer.chartsSetting.dataViewBoxParameter.length).toEqual(4);
        for (var i = 0; i < themeLayer.chartsSetting.dataViewBoxParameter.length; i++) {
            expect(themeLayer.chartsSetting.dataViewBoxParameter[i]).toEqual(5);
        }
        expect(themeLayer.chartsSetting.useAxis).toBeFalsy();
        expect(themeLayer.chartsSetting.pointClickAble).toBeTruthy();
        expect(themeLayer.chartsSetting.pointHoverAble).toBeFalsy();
        themeLayer.clear();

    });

    //测其父类“/common/overlay/Pie”中的接口 一组参数
    it('Pie', () => {
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            // 省居民消费水平（单位：元）信息
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = L.point([provinceInfo[1], provinceInfo[2]]);
            var attrs = {};
            attrs.NAME = provinceInfo[0];
            attrs.CON2009 = provinceInfo[3];
            attrs.CON2010 = provinceInfo[4];
            attrs.CON2011 = provinceInfo[5];
            attrs.CON2012 = provinceInfo[6];
            attrs.CON2013 = provinceInfo[7];
            var fea = themeFeature(geo, attrs);
            features.push(fea);
        }
        var themeLayerOptions = {
            map: map,
            isOverLay: true,
            attributions: " ",
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            opacity: 0.9,
            chartsSetting: {},
        };
        var chartsSettingForPie = {
            width: 240,
            height: 100,
            codomain: [0, 40000],       // 允许图表展示的值域范围，此范围外的数据将不制作图表
            sectorStyle: {fillOpacity: 0.8},      // 柱状图中柱条的（表示字段值的图形）样式
            sectorStyleByFields: [
                {fillColor: "#FFB980"},
                {fillColor: "#5AB1EF"},
                {fillColor: "#B6A2DE"},
                {fillColor: "#2EC7C9"},
                {fillColor: "#D87A80"}],
            sectorHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],      // 水平方向上的空白间距参数
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],         // y 轴标签内容
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],         // x 轴标签内容
            backgroundStyle: {fillColor: "#CCE8CF"},        // 背景样式
            backgroundRadius: [5, 5, 5, 5],        // 背景框圆角参数
        };
        themeLayerOptions.chartsSetting = chartsSettingForPie;
        var themeLayer = graphThemeLayer("PieLayer", "Pie", themeLayerOptions);
        themeLayer.addFeatures(features);
        map.addLayer(themeLayer);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsType).toEqual("Pie");
        expect(themeLayer.charts.length).toEqual(31);
        expect(themeLayer.features.length).toEqual(31);
        expect(themeLayer.chartsSetting.xShapeBlank.length).toEqual(3);
        expect(themeLayer.chartsSetting.axisXLabels.length).toEqual(5);
        expect(themeLayer.chartsSetting.sectorStyle.fillOpacity).toEqual(0.8);
        expect(themeLayer.chartsSetting.sectorStyleByFields.length).toEqual(5);
        themeLayer.clear();
    });

    //另一组参数
    it('Pie_sectorStyleByFields = undefined', () => {
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            // 省居民消费水平（单位：元）信息
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = L.point([provinceInfo[1], provinceInfo[2]]);
            var attrs = {};
            attrs.NAME = provinceInfo[0];
            attrs.CON2009 = provinceInfo[3];
            attrs.CON2010 = provinceInfo[4];
            attrs.CON2011 = provinceInfo[5];
            attrs.CON2012 = provinceInfo[6];
            attrs.CON2013 = provinceInfo[7];
            var fea = themeFeature(geo, attrs);
            features.push(fea);
        }
        var themeLayerOptions = {
            map: map,
            isOverLay: true,
            attributions: " ",
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            opacity: 0.9,
            chartsSetting: {},
        };
        var chartsSettingForPie = {
            width: 240,
            height: 100,
            codomain: [0, 40000],       // 允许图表展示的值域范围，此范围外的数据将不制作图表
            sectorStyle: {fillOpacity: 0.8},      // 柱状图中柱条的（表示字段值的图形）样式
            sectorHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],      // 水平方向上的空白间距参数
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],         // y 轴标签内容
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],         // x 轴标签内容
            useBackground: true,
            backgroundStyle: {fillColor: "#CCE8CF"},        // 背景样式
            backgroundRadius: [5, 5, 5, 5],        // 背景框圆角参数
            sectorHoverAble: false,
            sectorClickAble: true
        };
        themeLayerOptions.chartsSetting = chartsSettingForPie;
        var themeLayer = graphThemeLayer("PieLayer", "Pie", themeLayerOptions);
        themeLayer.addFeatures(features);
        map.addLayer(themeLayer);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsType).toEqual("Pie");
        expect(themeLayer.charts.length).toEqual(31);
        expect(themeLayer.features.length).toEqual(31);
        expect(themeLayer.chartsSetting.xShapeBlank.length).toEqual(3);
        expect(themeLayer.chartsSetting.axisXLabels.length).toEqual(5);
        expect(themeLayer.chartsSetting.sectorStyle.fillOpacity).toEqual(0.8);
        themeLayer.clear();
    });

    //测其父类“/common/overlay/Ring”中的接口
    it('Ring', () => {
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            // 省居民消费水平（单位：元）信息
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = L.point([provinceInfo[1], provinceInfo[2]]);
            var attrs = {};
            attrs.NAME = provinceInfo[0];
            attrs.CON2009 = provinceInfo[3];
            attrs.CON2010 = provinceInfo[4];
            attrs.CON2011 = provinceInfo[5];
            attrs.CON2012 = provinceInfo[6];
            attrs.CON2013 = provinceInfo[7];
            var fea = themeFeature(geo, attrs);
            features.push(fea);
        }
        var themeLayerOptions = {
            map: map,
            isOverLay: true,
            attributions: " ",
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            opacity: 0.9,
            chartsSetting: {},
        };
        var chartsSettingForRing = {
            width: 240,
            height: 100,
            codomain: [0, 40000],       // 允许图表展示的值域范围，此范围外的数据将不制作图表
            sectorStyle: {fillOpacity: 0.8},      // 柱状图中柱条的（表示字段值的图形）样式
            sectorStyleByFields: [
                {fillColor: "#FFB980"},
                {fillColor: "#5AB1EF"},
                {fillColor: "#B6A2DE"},
                {fillColor: "#2EC7C9"},
                {fillColor: "#D87A80"}],
            sectorHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],      // 水平方向上的空白间距参数
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],         // y 轴标签内容
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],         // x 轴标签内容
            useBackground: true,
            backgroundStyle: {fillColor: "#CCE8CF"},        // 背景样式
            backgroundRadius: [5, 5, 5, 5],        // 背景框圆角参数
        };
        chartsSettingForRing.innerRingRadius = 20;
        themeLayerOptions.chartsSetting = chartsSettingForRing;
        var themeLayer = graphThemeLayer("RingLayer", "Ring", themeLayerOptions);
        themeLayer.addFeatures(features);
        map.addLayer(themeLayer);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsType).toEqual("Ring");
        expect(themeLayer.charts.length).toEqual(31);
        expect(themeLayer.features.length).toEqual(31);
        expect(themeLayer.chartsSetting.xShapeBlank.length).toEqual(3);
        expect(themeLayer.chartsSetting.axisXLabels.length).toEqual(5);
        expect(themeLayer.chartsSetting.sectorStyle.fillOpacity).toEqual(0.8);
        expect(themeLayer.chartsSetting.sectorStyleByFields.length).toEqual(5);
        themeLayer.clear();
    });

    //另一组参数
    it('Ring_sectorStyleByFields = undefined', () => {
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            // 省居民消费水平（单位：元）信息
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = L.point([provinceInfo[1], provinceInfo[2]]);
            var attrs = {};
            attrs.NAME = provinceInfo[0];
            attrs.CON2009 = provinceInfo[3];
            attrs.CON2010 = provinceInfo[4];
            attrs.CON2011 = provinceInfo[5];
            attrs.CON2012 = provinceInfo[6];
            attrs.CON2013 = provinceInfo[7];
            var fea = themeFeature(geo, attrs);
            features.push(fea);
        }
        var themeLayerOptions = {
            map: map,
            isOverLay: true,
            attributions: " ",
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            opacity: 0.9,
            chartsSetting: {},
        };
        var chartsSettingForRing = {
            width: 240,
            height: 100,
            codomain: [0, 40000],       // 允许图表展示的值域范围，此范围外的数据将不制作图表
            sectorStyle: {fillOpacity: 0.8},      // 柱状图中柱条的（表示字段值的图形）样式
            sectorHoverStyle: {fillOpacity: 1},
            xShapeBlank: [10, 10, 10],      // 水平方向上的空白间距参数
            axisYLabels: ["4万", "3万", "2万", "1万", "0"],         // y 轴标签内容
            axisXLabels: ["09年", "10年", "11年", "12年", "13年"],         // x 轴标签内容
            useBackground: true,
            backgroundStyle: {fillColor: "#CCE8CF"},        // 背景样式
            backgroundRadius: [5, 5, 5, 5],        // 背景框圆角参数
            sectorHoverAble: false,
            sectorClickAble: true
        };
        chartsSettingForRing.innerRingRadius = 20;
        themeLayerOptions.chartsSetting = chartsSettingForRing;
        var themeLayer = graphThemeLayer("RingLayer", "Ring", themeLayerOptions);
        themeLayer.addFeatures(features);
        map.addLayer(themeLayer);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsSetting.xShapeBlank.length).toEqual(3);
        expect(themeLayer.chartsSetting.axisXLabels.length).toEqual(5);
        expect(themeLayer.chartsSetting.sectorStyle.fillOpacity).toEqual(0.8);
        themeLayer.clear();
    });
});

