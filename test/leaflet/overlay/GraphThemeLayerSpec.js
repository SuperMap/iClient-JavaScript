require('../../../src/leaflet/overlay/GraphThemeLayer');
require('../../resources/chinaConsumptionLevel');

var options = {
    isOverLay: true
};
var url = GlobeParameter.China4326URL;
describe('leaflet_GraphThemeLayer', function () {
    var originalTimeout;
    var testDiv, map;
    beforeAll(function () {
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
        L.supermap.tiledMapLayer(url).addTo(map);
    });
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(function () {
        window.document.body.removeChild(testDiv);
        map.remove();
    });

    it('initialize', function () {
        var barThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar", {isOverLay: false}).addTo(map);
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
        expect(barThemeLayer.options.name).toBe("BarThemeLayer");
        expect(barThemeLayer.themeFields.length).toEqual(5);
        barThemeLayer.clear();
    });

    it('setChartsType', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar", options).addTo(map);
        graphThemeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000]
        };
        expect(graphThemeLayer.chartsType).toBe("Bar");
        graphThemeLayer.setChartsType("Line");
        expect(graphThemeLayer.chartsType).toBe("Line");
        graphThemeLayer.clear();
    });

    it('addFeatures_point', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        graphThemeLayer.chartsSetting = {
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
        expect(graphThemeLayer.features.length).toEqual(0);
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
            var fea = L.supermap.themeFeature(geometry, atrributes);
            features.push(fea);
        }
        graphThemeLayer.addFeatures(features);
        var LayerFeatures = graphThemeLayer.features;
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
        var shape1 = graphThemeLayer.getShapesByFeatureID();
        var shape2 = graphThemeLayer.getShapesByFeatureID(LayerFeatures[0].id);
        expect(shape1.length).toEqual(17);
        expect(shape2.length).toEqual(5);
        var weightFieldValue = graphThemeLayer.getWeightFieldValue(LayerFeatures[0], "CON2009", 0);
        expect(weightFieldValue).toEqual(22023);
        var weightFieldValue2 = graphThemeLayer.getWeightFieldValue(LayerFeatures[0], "CON2007", 10);
        expect(weightFieldValue2).toEqual(10);
        var weightFieldValue3 = graphThemeLayer.getWeightFieldValue(LayerFeatures[0], "CON2007");
        expect(weightFieldValue3).toEqual(0);
        graphThemeLayer.features[0].geometry.x = 39;
        var redraw = graphThemeLayer.redraw();
        expect(graphThemeLayer.features[0].geometry.x).toEqual(39);
        expect(redraw).toBeTruthy();
        graphThemeLayer.clear();
    });

    it('isQuadrilateralOverLap', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        graphThemeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000]
        };
        var quadrilateral, quadrilateral2;
        quadrilateral = [{"x": 1, "y": 1}, {"x": 3, "y": 1}, {"x": 6, "y": 4}, {"x": 2, "y": 10}, {"x": 1, "y": 1}];
        quadrilateral2 = [{"x": 1, "y": 1}, {"x": 3, "y": 1}, {"x": 6, "y": 4}, {"x": 2, "y": 10}, {"x": 1, "y": 1}];
        var isPointInPoly = graphThemeLayer.isQuadrilateralOverLap(quadrilateral, quadrilateral2);
        expect(isPointInPoly).toBeTruthy();
        graphThemeLayer.clear();
    });

    // 此方法为iclient8的私有方法,不支持leaflet对象,此处测试传入iclient对象的情况
    //it('isPointInPoly', function () {
    //    var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar", options).addTo(map);
    //    graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
    //    graphThemeLayer.chartsSetting = {
    //        width: 240,
    //        height: 100,
    //        codomain: [0, 40000]
    //    };
    //    var point = {"x": 2, "y": 5};
    //    var polygon = [{"x": 1, "y": 1}, {"x": 3, "y": 1}, {"x": 6, "y": 4}, {"x": 2, "y": 10}, {"x": 1, "y": 1}];
    //    var isPointInPoly = graphThemeLayer.isPointInPoly(point, polygon);
    //    expect(isPointInPoly).toBeTruthy();
    //    graphThemeLayer.clear();
    //});

    //overlayWeightField默认为空
    it('drawCharts_overlayWeightField = null', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar", {
            isOverLay: false
        }).addTo(map);
        graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        graphThemeLayer.chartsSetting = {
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
        graphThemeLayer.drawCharts();
        expect(graphThemeLayer).not.toBeNull();
        graphThemeLayer.clear();
    });

    //overlayWeightField = "CON2013"
    it('drawCharts_overlayWeightField != null', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar", {
            isOverLay: false
        }).addTo(map);
        graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        graphThemeLayer.overlayWeightField = "CON2013";
        graphThemeLayer.chartsSetting = {
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
        graphThemeLayer.drawCharts();
        expect(graphThemeLayer).not.toBeNull();
        graphThemeLayer.clear();
    });

    //从专题图中删除 feature。删除所有传递进来的某一个矢量要素。
    it('removeFeatures', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        graphThemeLayer.chartsSetting = {
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
        expect(graphThemeLayer.features.length).toEqual(0);
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
            var fea = L.supermap.themeFeature(geometry, atrributes);
            features.push(fea);
        }
        graphThemeLayer.addFeatures(features);
        expect(graphThemeLayer.features.length).toEqual(31);
        expect(graphThemeLayer.features[0].data.NAME).toEqual("北京市");
        var removeFeature = graphThemeLayer.features[0];
        graphThemeLayer.removeFeatures(removeFeature);
        expect(graphThemeLayer).not.toBeNull();
        expect(graphThemeLayer.features.length).toEqual(30);
        expect(graphThemeLayer.features[0].data.NAME).toEqual("天津市");
        graphThemeLayer.clear();
    });

    it('clearCache', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar", options).addTo(map);
        graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        graphThemeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000]
        };
        graphThemeLayer.charts = [1, 2, 3];
        graphThemeLayer.cache = {'name': 'ONETWO'};
        expect(graphThemeLayer.charts.length).toEqual(3);
        expect(graphThemeLayer.cache).toEqual(Object({
            name: "ONETWO"
        }));
        graphThemeLayer.clearCache();
        expect(graphThemeLayer.charts.length).toEqual(0);
        expect(graphThemeLayer.cache).toEqual(Object({}));
    });

    //测试其父类“/theme/ThemeLayer”中的接口
    //销毁addFeatures_point方法添加的所有要素
    it('destroyFeatures', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        graphThemeLayer.chartsSetting = {
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
        expect(graphThemeLayer.features.length).toEqual(0);
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
            var fea = L.supermap.themeFeature(geometry, atrributes);
            features.push(fea);
        }
        graphThemeLayer.addFeatures(features);
        graphThemeLayer.destroyFeatures(undefined);
        expect(graphThemeLayer).not.toBeNull();
        expect(graphThemeLayer.features.length).toEqual(0);
        graphThemeLayer.clear();
    });

    //查看当前图层中的有效数据
    it('getFeatures', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        graphThemeLayer.chartsSetting = {
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
        expect(graphThemeLayer.features.length).toEqual(0);
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
            var fea = L.supermap.themeFeature(geometry, atrributes);
            features.push(fea);
        }
        graphThemeLayer.addFeatures(features);
        var clonedFeatures = graphThemeLayer.getFeatures();
        expect(clonedFeatures).not.toBeNull();
        expect(clonedFeatures.length).toEqual(31);
        for (var i = 0; i < clonedFeatures.length; i++) {
            expect(clonedFeatures[i].CLASS_NAME).toEqual("SuperMap.Feature.Vector");
        }
        graphThemeLayer.clear();
    });

    //在专题图的要素数组 features 里面遍历每一个 feature，当 feature[property] === value 时，返回此 feature
    it('getFeatureBy', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        graphThemeLayer.chartsSetting = {
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
        expect(graphThemeLayer.features.length).toEqual(0);
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
            var fea = L.supermap.themeFeature(geometry, atrributes);
            features.push(fea);
        }
        graphThemeLayer.addFeatures(features);
        var resultFeatures = graphThemeLayer.getFeatures();
        var id = resultFeatures[0].id;
        var result = graphThemeLayer.getFeatureBy("id", id);
        expect(result).not.toBeNull();
        expect(result.id).toEqual(id);
        expect(result.attributes.NAME).toEqual("北京市");
        graphThemeLayer.clear();
    });

    //通过给定一个 id，返回对应的矢量要素
    it('getFeatureById', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        graphThemeLayer.chartsSetting = {
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
        expect(graphThemeLayer.features.length).toEqual(0);
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
            var fea = L.supermap.themeFeature(geometry, atrributes);
            features.push(fea);
        }
        graphThemeLayer.addFeatures(features);
        var resultFeatures = graphThemeLayer.getFeatures();
        var id = resultFeatures[0].id;
        var result = graphThemeLayer.getFeatureById(id);
        expect(result).not.toBeNull();
        expect(result.id).toEqual(id);
        expect(result.attributes.NAME).toEqual("北京市");
        graphThemeLayer.clear();
    });

    // 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
    it('getFeaturesByAttribute', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar").addTo(map);
        graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        graphThemeLayer.chartsSetting = {
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
        expect(graphThemeLayer.features.length).toEqual(0);
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
            var fea = L.supermap.themeFeature(geometry, atrributes);
            features.push(fea);
        }
        graphThemeLayer.addFeatures(features);
        var result = graphThemeLayer.getFeaturesByAttribute("NAME", "北京市");
        expect(result).not.toBeNull();
        expect(result.length).toEqual(1);
        expect(result[0].attributes.NAME).toEqual("北京市");
        graphThemeLayer.clear();
    });

    //设置图层的不透明度,取值[0-1]之间。
    it('setOpacity', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar", options).addTo(map);
        graphThemeLayer.setOpacity(0.5);
        expect(graphThemeLayer).not.toBeNull();
        expect(graphThemeLayer.options.opacity).toEqual(0.5);
        graphThemeLayer.clear();
    });

    //添加专题图
    it('onAdd', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar", options);
        graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        graphThemeLayer.chartsSetting = {
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
        expect(graphThemeLayer.features.length).toEqual(0);
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
            var fea = L.supermap.themeFeature(geometry, atrributes);
            features.push(fea);
        }
        graphThemeLayer.addFeatures(features);
        graphThemeLayer.onAdd(map);
        expect(graphThemeLayer).not.toBeNull();
        expect(graphThemeLayer.chartsType).toBe("Bar");
        expect(graphThemeLayer.charts.length).toEqual(31);
        expect(graphThemeLayer.features.length).toEqual(31);
        expect(graphThemeLayer.options.isOverLay).toBeTruthy();
        expect(graphThemeLayer.options.name).toBe("BarThemeLayer");
        expect(graphThemeLayer.themeFields.length).toEqual(5);
        var chartsSetting = graphThemeLayer.chartsSetting;
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
        graphThemeLayer.clear();
    });

    //测其父类“/common/overlay/Bar”中的接口
    it('Bar', function () {
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
            var fea = L.supermap.themeFeature(geo, attrs);
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
        var themeLayer = L.supermap.graphThemeLayer("BarLayer", "Bar", themeLayerOptions);
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
    it('Bar_xShapeBlank = undefined', function () {
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
            var fea = L.supermap.themeFeature(geo, attrs);
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
        var themeLayer = L.supermap.graphThemeLayer("BarLayer", "Bar", themeLayerOptions);
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
    it('Bar3D', function () {
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
        var themeLayer = L.supermap.graphThemeLayer("Bar3DLayer", "Bar3D", themeLayerOptions);
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
            var fea = L.supermap.themeFeature(geo, attrs);
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
    it('Bar3D_xShapeBlank = undefined', function () {
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
        var themeLayer = L.supermap.graphThemeLayer("Bar3DLayer", "Bar3D", themeLayerOptions);
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
            var fea = L.supermap.themeFeature(geo, attrs);
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
    it('Line', function () {
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
            var fea = L.supermap.themeFeature(geo, attrs);
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
        var themeLayer = L.supermap.graphThemeLayer("LineLayer", "Line", themeLayerOptions);
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
    it('Line_xShapeBlank = undefined', function () {
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
            var fea = L.supermap.themeFeature(geo, attrs);
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
        var themeLayer = L.supermap.graphThemeLayer("LineLayer", "Line", themeLayerOptions);
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
    it('Point', function () {
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
            var fea = L.supermap.themeFeature(geo, attrs);
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
        var themeLayer = L.supermap.graphThemeLayer("PiontLayer", "Point", themeLayerOptions);
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
    it('Point_xShapeBlank = undefined', function () {
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
            var fea = L.supermap.themeFeature(geo, attrs);
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
        var themeLayer = L.supermap.graphThemeLayer("PiontLayer", "Point", themeLayerOptions);
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
    it('Pie', function () {
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
            var fea = L.supermap.themeFeature(geo, attrs);
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
        chartsSettingForPie = {
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
        var themeLayer = L.supermap.graphThemeLayer("PieLayer", "Pie", themeLayerOptions);
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
    it('Pie_sectorStyleByFields = undefined', function () {
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
            var fea = L.supermap.themeFeature(geo, attrs);
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
        chartsSettingForPie = {
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
        var themeLayer = L.supermap.graphThemeLayer("PieLayer", "Pie", themeLayerOptions);
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
    it('Ring', function () {
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
            var fea = L.supermap.themeFeature(geo, attrs);
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
        chartsSettingForRing = {
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
        var themeLayer = L.supermap.graphThemeLayer("RingLayer", "Ring", themeLayerOptions);
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
    it('Ring_sectorStyleByFields = undefined', function () {
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
            var fea = L.supermap.themeFeature(geo, attrs);
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
        chartsSettingForRing = {
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
        var themeLayer = L.supermap.graphThemeLayer("RingLayer", "Ring", themeLayerOptions);
        themeLayer.addFeatures(features);
        map.addLayer(themeLayer);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsSetting.xShapeBlank.length).toEqual(3);
        expect(themeLayer.chartsSetting.axisXLabels.length).toEqual(5);
        expect(themeLayer.chartsSetting.sectorStyle.fillOpacity).toEqual(0.8);
        themeLayer.clear();
    });
});

