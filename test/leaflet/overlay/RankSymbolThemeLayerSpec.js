require('../../../src/leaflet/overlay/UniqueThemeLayer');
require('../../tool/chinaConsumptionLevel');

var China4326URL = GlobeParameter.China4326URL;

describe('leaflet_testRankSymbolThemeLayer', function () {
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
            zoom: 2
        });
        L.supermap.tiledMapLayer(China4326URL).addTo(map);
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


    it('addFeatures', function () {
        //initialize
        var rankSymbolThemeLayer = L.supermap.rankSymbolThemeLayer("ThemeLayer", SuperMap.ChartType.CIRCLE).addTo(map);
        rankSymbolThemeLayer.themeField = "CON2009";
        rankSymbolThemeLayer.symbolSetting = {
            codomain: [0, 40000],
            maxR: 100,
            minR: 0,
            circleStyle: {fillOpacity: 0.8},
            fillColor: "#FFA500",
            circleHoverStyle: {fillOpacity: 1}
        };
        rankSymbolThemeLayer.addTo(map);
        expect(rankSymbolThemeLayer).not.toBeNull();
        expect(rankSymbolThemeLayer.chartsType).toBe("Circle");
        expect(rankSymbolThemeLayer.options.name).toBe("ThemeLayer");
        expect(rankSymbolThemeLayer.themeField).toBe("CON2009");
        expect(rankSymbolThemeLayer.symbolType).toBe("Circle");
        expect(rankSymbolThemeLayer.features.length).toEqual(0);
        //addFeatures
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = L.point(provinceInfo[1], provinceInfo[2]);
            var attrs = {NAME: provinceInfo[0], CON2009: provinceInfo[3]};
            var feature = L.supermap.themeFeature(geo, attrs);
            features.push(feature);
        }
        rankSymbolThemeLayer.addFeatures(features);
        expect(rankSymbolThemeLayer.features.length).toBeGreaterThan(0);
        rankSymbolThemeLayer.clear();
    });

    it('setSymbolType', function () {
        var rankSymbolThemeLayer = L.supermap.rankSymbolThemeLayer("ThemeLayer", SuperMap.ChartType.BAR);
        rankSymbolThemeLayer.themeField = "CON2009";
        rankSymbolThemeLayer.symbolSetting = {
            codomain: [0, 40000],
            maxR: 100,
            minR: 0,
            circleStyle: {fillOpacity: 0.8},
            fillColor: "#FFA500",
            circleHoverStyle: {fillOpacity: 1}
        };
        expect(rankSymbolThemeLayer.chartsType).toBe('Bar');
        expect(rankSymbolThemeLayer.symbolType).toBe('Bar');
        //setSymbolType
        rankSymbolThemeLayer.setSymbolType('Circle');
        expect(rankSymbolThemeLayer.chartsType).toBe('Bar');
        expect(rankSymbolThemeLayer.symbolType).toBe('Circle');
        rankSymbolThemeLayer.clear();
    });
});