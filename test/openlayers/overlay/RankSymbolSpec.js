import ol from 'openlayers';
import {RankSymbol} from '../../../src/openlayers/overlay/RankSymbol';
import {ThemeFeature} from '../../../src/openlayers/overlay/theme/ThemeFeature';

describe('openlayers_RankSymbol', () => {
    var testDiv, map, originalTimeout;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        map = new ol.Map({
            target: 'map',
            view: new ol.View({
                center: [116.85, 39.79],
                zoom: 4,
                projection: 'EPSG:4326',
                extent: [104.07, 30.54, 119.51, 42.31]
            }),
        });
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
    });

    it('constructor, destroy', () => {
        var themeSource = new RankSymbol("test", "Circle", {
            map: map,
            attributions: " ",
            themeField: "CON2009",
            symbolSetting: {
                codomain: [0, 40000], // 允许图形展示的值域范围，此范围外的数据将不制作图图形
                circleStyle: {fillOpacity: 0.8},
                fillColor: "#FFA500",
                circleHoverStyle: {fillOpacity: 1}
            }
        });
        expect(themeSource).not.toBeNull();
        expect(themeSource.chartsType).toEqual("Circle");
        expect(themeSource.levelRenderer).not.toBeNull();
        expect(themeSource.symbolType).toEqual("Circle");
        expect(themeSource.symbolSetting).not.toBeNull();
        expect(themeSource.themeField).toEqual("CON2009");
        themeSource.destroy();
        expect(themeSource.chartsType).toBeNull();
        expect(themeSource.levelRenderer).toBeNull();
        expect(themeSource.symbolType).toBeNull();
        expect(themeSource.symbolSetting).toBeNull();
        expect(themeSource.themeField).toBeNull();
    });

    it('setSymbolType', (done) => {
        var chinaConsumptionLevel = [
            ["北京市", 116.407283, 39.904557, 22023, 24982, 27760, 30350, 33337],
            ["天津市", 117.215268, 39.120963, 15200, 17852, 20624, 22984, 26261],
            ["上海市", 121.47398, 31.230075, 26582, 32271, 35439, 36893, 39223],
        ];
        var themeSource = new RankSymbol("test", "Point", {
            map: map,
            attributions: " ",
            themeField: "CON2009",
            symbolSetting: {
                width: 400,
                height: 400,
                dataViewBoxParameter: [5, 5, 5, 5],
                codomain: [0, 40000], // 允许图形展示的值域范围，此范围外的数据将不制作图图形
                circleStyle: {fillOpacity: 0.8},
                fillColor: "#FFA500",
                circleHoverStyle: {fillOpacity: 1}
            }
        });
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            // 省居民消费水平（单位：元）信息
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = new ol.geom.Point([provinceInfo[1], provinceInfo[2]]);
            var attrs = {};
            attrs.NAME = provinceInfo[0];
            attrs.CON2009 = provinceInfo[3];
            var fea = new ThemeFeature(geo, attrs);
            features.push(fea);
        }
        themeSource.addFeatures(features);
        setTimeout(() => {
            themeSource.setSymbolType("Point");
            expect(themeSource.symbolType).toEqual("Point");
            themeSource.destroy();
            done();
        }, 5000);
    });

    it('createThematicFeature', (done) => {
        var chinaConsumptionLevel = [
            ["北京市", 116.407283, 39.904557, 22023, 24982, 27760, 30350, 33337],
            ["天津市", 117.215268, 39.120963, 15200, 17852, 20624, 22984, 26261],
            ["上海市", 121.47398, 31.230075, 26582, 32271, 35439, 36893, 39223],
        ];
        var themeSource = new RankSymbol("test", "Point", {
            map: map,
            attributions: " ",
            symbolSetting: {
                codomain: [0, 40000], // 允许图形展示的值域范围，此范围外的数据将不制作图图形
                circleStyle: {fillOpacity: 0.8},
                fillColor: "#FFA500",
                circleHoverStyle: {fillOpacity: 1}
            }
        });
        var features = [];
        for (var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
            // 省居民消费水平（单位：元）信息
            var provinceInfo = chinaConsumptionLevel[i];
            var geo = new ol.geom.Point([provinceInfo[1], provinceInfo[2]]);
            var attrs = {};
            attrs.NAME = provinceInfo[0];
            attrs.CON2009 = provinceInfo[3];
            var fea = new ThemeFeature(geo, attrs);
            features.push(fea);
        }
        setTimeout(() => {
            var result = themeSource.createThematicFeature(features[0]);
            expect(result).toBeFalsy();
            done();
        }, 2000);
    });

});