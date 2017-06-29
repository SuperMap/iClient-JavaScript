require('../../../../src/leaflet/overlay/theme/GraphThemeLayer');
require('../../../tool/chinaConsumptionLevel');

var options = {
    isOverLay: true
};
var url = GlobeParameter.China4326URL;
describe('leaflet_testGraphThemeLayer', function () {
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

    it('construtor and destroy', function () {
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
    it('isPointInPoly', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar", options).addTo(map);
        graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        graphThemeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000]
        };
        var point = {"x": 2, "y": 5};
        var polygon = [{"x": 1, "y": 1}, {"x": 3, "y": 1}, {"x": 6, "y": 4}, {"x": 2, "y": 10}, {"x": 1, "y": 1}];
        var isPointInPoly = graphThemeLayer.isPointInPoly(point, polygon);
        expect(isPointInPoly).toBeTruthy();
        graphThemeLayer.clear();
    });

    it('drawCharts', function () {
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

    it('removeFeatures', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar", options).addTo(map);
        graphThemeLayer.themeFields = ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"];
        graphThemeLayer.chartsSetting = {
            width: 240,
            height: 100,
            codomain: [0, 40000],
        };
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            var provinceInfo = chinaConsumptionLevel[i];
            var geometry = L.point(provinceInfo[2], provinceInfo[1]);
            var fea = new L.supermap.themeFeature(geometry);
            features.push(fea);
        }
        graphThemeLayer.addFeatures(features);
        expect(graphThemeLayer.features.length).toBeGreaterThan(0);
        graphThemeLayer.removeFeatures();
        graphThemeLayer.removeAllFeatures();
        expect(graphThemeLayer.features.length).toEqual(0);
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

    it('createThematicFeature', function () {
        var graphThemeLayer = L.supermap.graphThemeLayer("BarThemeLayer", "Bar", options).addTo(map);
        graphThemeLayer.addTo(map);
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
        var provinceInfo = chinaConsumptionLevel[0];
        var geo = new SuperMap.Geometry.Point(provinceInfo[1], provinceInfo[2]);
        var attrs = {};
        attrs.NAME = provinceInfo[0];
        attrs.CON2009 = provinceInfo[3];
        attrs.CON2010 = provinceInfo[4];
        attrs.CON2011 = provinceInfo[5];
        attrs.CON2012 = provinceInfo[6];
        attrs.CON2013 = provinceInfo[7];
        var feature = new SuperMap.Feature.Vector(geo, attrs);
        graphThemeLayer.createThematicFeature(feature);
        expect(graphThemeLayer).not.toBeNull();
        graphThemeLayer.clear();
    });

});