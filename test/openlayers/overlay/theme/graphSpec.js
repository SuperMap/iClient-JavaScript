require('../../../../src/openlayers/overlay/theme/graph');
require('../../../tool/chinaConsumptionLevel');

var url = GlobeParameter.China4326URL;
describe('openlayers_graph', function () {
    var originalTimeout;
    var testDiv, map;
    beforeAll(function () {
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        document.body.appendChild(testDiv);

        map = new ol.Map({
            target: 'map',
            view: new ol.View({
                center: [116.85, 39.79],
                zoom: 0,
                projection: "EPSG:4326"
            })
        });
        var layer = new ol.layer.Tile({
            source: new ol.source.TileSuperMapRest({
                url: url
            })
        });
        map.addLayer(layer);
    });
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(function () {
        document.body.removeChild(testDiv);
    });

    it('construtor and destroy', function () {
        var barThemeLayer = new ol.source.Graph("BarThemeLayer", "Bar", {
            map: map,
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            chartsSetting: {
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
                barShadowStyle: {
                    shadowBlur: 8,
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowColor: "rgba(100,100,100,0.8)"
                },
                barLinearGradient: [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]]
            }
        });

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
        expect(barThemeLayer.isOverLay).toBeTruthy();
        expect(barThemeLayer.themeFields.length).toEqual(5);
        barThemeLayer.destroy();
    });

    xit('setChartsType', function () {
        var graphThemeSource = new ol.source.Graph("BarThemeLayer", "Bar", {
            map: map,
            chartsSetting: {
                width: 240,
                height: 100,
                codomain: [0, 40000]
            }
        });

        var layer = new ol.layer.Image({
            source: graphThemeSource
        });
        map.addLayer(layer);

        expect(graphThemeSource.chartsType).toBe("Bar");
        graphThemeSource.setChartsType("Line");
        expect(graphThemeSource.chartsType).toBe("Line");
    });

    it('isQuadrilateralOverLap', function () {
        var graphThemeSource = new ol.source.Graph("BarThemeLayer", "Bar", {
            map: map,
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            chartsSetting: {
                width: 240,
                height: 100,
                codomain: [0, 40000]
            }
        });
        var quadrilateral, quadrilateral2;
        quadrilateral = [{"x": 1, "y": 1}, {"x": 3, "y": 1}, {"x": 6, "y": 4}, {"x": 2, "y": 10}, {"x": 1, "y": 1}];
        quadrilateral2 = [{"x": 1, "y": 1}, {"x": 3, "y": 1}, {"x": 6, "y": 4}, {"x": 2, "y": 10}, {"x": 1, "y": 1}];
        var isPointInPoly = graphThemeSource.isQuadrilateralOverLap(quadrilateral, quadrilateral2);
        expect(isPointInPoly).toBeTruthy();
    });

    // 此方法为iclient8的私有方法,不支持leaflet对象,此处测试传入iclient对象的情况
    it('isPointInPoly', function () {
        var graphThemeSource = new ol.source.Graph("BarThemeLayer", "Bar", {
            map: map,
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            chartsSetting: {
                width: 240,
                height: 100,
                codomain: [0, 40000]
            }
        });
        var point = {"x": 2, "y": 5};
        var polygon = [{"x": 1, "y": 1}, {"x": 3, "y": 1}, {"x": 6, "y": 4}, {"x": 2, "y": 10}, {"x": 1, "y": 1}];
        var isPointInPoly = graphThemeSource.isPointInPoly(point, polygon);
        expect(isPointInPoly).toBeTruthy();
    });

    it('drawCharts', function () {
        var graphThemeSource = new ol.source.Graph("BarThemeLayer", "Bar", {
            map: map,
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            chartsSetting: {
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
                barShadowStyle: {
                    shadowBlur: 8,
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowColor: "rgba(100,100,100,0.8)"
                },
                barLinearGradient: [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]]
            }
        });
        var layer = new ol.layer.Image({
            source: graphThemeSource
        });
        map.addLayer(layer);
        setTimeout(function () {
            graphThemeSource.drawCharts();
            expect(graphThemeSource).not.toBeNull();
        }, 5000);
    });

    xit('removeFeatures', function () {
        var graphThemeSource = new ol.source.Graph("BarThemeLayer", "Bar", {
            map: map,
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            chartsSetting: {
                width: 240,
                height: 100,
                codomain: [0, 40000],
            }
        });
        var layer = new ol.layer.Image({
            source: graphThemeSource
        });
        map.addLayer(layer);
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            var provinceInfo = chinaConsumptionLevel[i];
            var geometry = new ol.geom.Point(provinceInfo[2], provinceInfo[1]);
            var fea = new ol.supermap.ThemeFeature(geometry);
            features.push(fea);
        }
        graphThemeSource.addFeatures(features);
        expect(graphThemeSource.features.length).toBeGreaterThan(0);
        graphThemeSource.removeFeatures();
        graphThemeSource.removeAllFeatures();
        expect(graphThemeSource.features.length).toEqual(0);
    });

    it('clearCache', function () {
        var graphThemeSource = new ol.source.Graph("BarThemeLayer", "Bar", {
            map: map,
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            chartsSetting: {
                width: 240,
                height: 100,
                codomain: [0, 40000]
            }
        });
        graphThemeSource.charts = [1, 2, 3];
        graphThemeSource.cache = {'name': 'ONETWO'};
        expect(graphThemeSource.charts.length).toEqual(3);
        expect(graphThemeSource.cache).toEqual(Object({
            name: "ONETWO"
        }));
        graphThemeSource.clearCache();
        expect(graphThemeSource.charts.length).toEqual(0);
        expect(graphThemeSource.cache).toEqual(Object({}));
    });

    xit('createThematicFeature', function () {
        var graphThemeSource = new ol.source.Graph("BarThemeLayer", "Bar", {
            map: map,
            themeFields: ["CON2009", "CON2010", "CON2011", "CON2012", "CON2013"],
            chartsSetting: {
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
                barShadowStyle: {
                    shadowBlur: 8,
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowColor: "rgba(100,100,100,0.8)"
                },
                barLinearGradient: [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]]
            }
        });
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
        graphThemeSource.createThematicFeature(feature);
        expect(graphThemeSource).not.toBeNull();
    });
});