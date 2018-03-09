import {rankSymbolThemeLayer} from '../../../src/leaflet/overlay/RankSymbolThemeLayer';
import {tiledMapLayer} from '../../../src/leaflet/mapping/TiledMapLayer';
import {ChartType} from '../../../src/common/REST';
import {themeFeature} from '../../../src/leaflet/overlay/theme/ThemeFeature';
import '../../resources/chinaConsumptionLevel';

var China4326URL = GlobeParameter.China4326URL;

describe('leaflet_RankSymbolThemeLayer', () => {
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
            zoom: 2
        });
        tiledMapLayer(China4326URL).addTo(map);
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

    it('addFeatures', () => {
        //initialize
        var themeLayer = rankSymbolThemeLayer("ThemeLayer", ChartType.CIRCLE);
        themeLayer.themeField = "CON2009";
        themeLayer.symbolSetting = {
            codomain: [0, 40000],
            maxR: 100,
            minR: 0,
            circleStyle: {fillOpacity: 0.8},
            fillColor: "#FFA500",
            circleHoverStyle: {fillOpacity: 1}
        };
        themeLayer.addTo(map);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.chartsType).toBe("Circle");
        expect(themeLayer.name).toBe("ThemeLayer");
        expect(themeLayer.id).not.toBeNull();
        expect(themeLayer.themeField).toBe("CON2009");
        expect(themeLayer.symbolType).toBe("Circle");
        expect(themeLayer.features.length).toEqual(0);
        //addFeatures
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = L.point(provinceInfo[1], provinceInfo[2]);
            var attrs = {NAME: provinceInfo[0], CON2009: provinceInfo[3]};
            var feature = themeFeature(geo, attrs);
            features.push(feature);
        }
        themeLayer.addFeatures(features);
        expect(themeLayer.features.length).toBeGreaterThan(0);
        themeLayer.clear();
    });

    it('setSymbolType', () => {
        var themeLayer = rankSymbolThemeLayer("ThemeLayer", ChartType.BAR);
        themeLayer.themeField = "CON2009";
        themeLayer.symbolSetting = {
            codomain: [0, 40000],
            maxR: 100,
            minR: 0,
            circleStyle: {fillOpacity: 0.8},
            fillColor: "#FFA500",
            circleHoverStyle: {fillOpacity: 1}
        };
        expect(themeLayer.chartsType).toBe('Bar');
        expect(themeLayer.symbolType).toBe('Bar');
        //setSymbolType
        themeLayer.setSymbolType('Circle');
        expect(themeLayer.chartsType).toBe('Bar');
        expect(themeLayer.symbolType).toBe('Circle');
        themeLayer.clear();
    });
});