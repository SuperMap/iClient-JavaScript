import {rangeThemeLayer} from '../../../src/leaflet/overlay/RangeThemeLayer';
import {tiledMapLayer} from '../../../src/leaflet/mapping/TiledMapLayer';
import {ThemeStyle} from '../../../src/common/style/ThemeStyle';

var baseUrl = GlobeParameter.jingjinMapURL + "/maps/京津地区地图";
describe('leaflet_RangeThemeLayer', () => {
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
            zoom: 7
        });
        tiledMapLayer(baseUrl).addTo(map);
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

    it('getStyleByData', () => {
        var themeLayer = rangeThemeLayer("ThemeLayer", {
            // 开启 hover 高亮效果
            isHoverAble: true,
            opacity: 0.8
        });
        themeLayer.style = new ThemeStyle({
            shadowBlur: 16,
            shadowColor: "#000000",
            fillColor: "#FFFFFF"
        });
        // hover 高亮样式
        themeLayer.highlightStyle = new ThemeStyle({
            stroke: true,
            strokeWidth: 4,
            strokeColor: 'blue',
            fillColor: "#00EEEE",
            fillOpacity: 0.8
        });
        // 用于单值专题图的属性字段名称
        themeLayer.themeField = "POP_DENSITY99";
        // 风格数组，设定值对应的样式
        themeLayer.styleGroups = [{
            start: 0,
            end: 0.02,
            style: {
                color: '#FDE2CA'
            }
        }, {
            start: 0.02,
            end: 0.04,
            style: {
                color: '#FACE9C'
            }
        }];
        var feature = {
            attributes: {
                'CITY': "北京市",
                'NAME': "怀柔区",
                'POP_DENSITY99': 0.012517714,
                'SMAREA': 2.296619182358133E9,
                'SMGEOMETRYSIZE': 1928,
                'SMID': 1,
                'SMPERIMETER': 276046.9622576497,
                'SMSDRIE': 116.900505,
                'SMSDRIN': 41.040543,
                'SMSDRIS': 40.22844,
                'SMSDRIW': 116.18578,
                'SMUSERID': 0
            },
            layer: null,
            lonlat: null,
            state: null,
            style: null,
            geometry: {
                'bounds': null,
                components: {
                    components: {
                        components: {
                            'id': "SuperMap.Geometry.Point_383",
                            'x': 116.4548427772861,
                            'y': 40.742015064668564,
                            'type': "NONE"
                        },
                        id: "SuperMap.Geometry.LinearRing_463",

                        length: 1
                    },
                    id: "SuperMap.Geometry.Polygon_464",
                    length: 1
                },
                id: "SuperMap.Geometry.MultiPolygon_465"
            },
            id: "SuperMap.Feature.Vector_466"
        };
        feature.data = feature.attributes;
        var result = themeLayer.getStyleByData(feature);
        expect(result).not.toBeNull();
        expect(result.fill).toBeTruthy();
        expect(result.fontSize).toBe(12);
        expect(result.color).toBe("#FDE2CA");
    });
});