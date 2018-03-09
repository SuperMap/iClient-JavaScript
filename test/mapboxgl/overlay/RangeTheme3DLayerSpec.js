import {RangeTheme3DLayer} from '../../../src/mapboxgl/overlay/RangeTheme3DLayer';
import {GetFeaturesBySQLService} from '../../../src/common/iServer/GetFeaturesBySQLService';
import {GetFeaturesBySQLParameters} from '../../../src/common/iServer/GetFeaturesBySQLParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {DataFormat} from '../../../src/common/REST';
import mapboxgl from 'mapbox-gl';

var dataUrl = GlobeParameter.editServiceURL_leaflet;
var themeField = "POP_DENSITY99";
describe('mapboxgl_RangeTheme3DLayer', () => {
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
        map = new mapboxgl.Map({
            container: 'map',
            style: {
                "version": 8,
                "sources": {
                    "raster-tiles": {
                        "type": "raster",
                        "tiles": [GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}'],
                        "tileSize": 256
                    }
                },
                "layers": [{
                    "id": "simple-tiles",
                    "type": "raster",
                    "source": "raster-tiles",
                    "minzoom": 0,
                    "maxzoom": 22
                }]
            },
            center: [116.640545, 40.531714],
            zoom: 7
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
        map.remove();
    });

    it('initialize', (done) => {
        var themeLayer;
        map.on('load', () => {
            var getFeatureBySQLParams = new GetFeaturesBySQLParameters({
                queryParameter: new FilterParameter({
                    name: "Jingjin",
                    attributeFilter: "SMID > -1"
                }),
                toIndex: 500,
                datasetNames: ["Jingjin:BaseMap_R"]
            });
            var queryFeatures = new GetFeaturesBySQLService(dataUrl, {
                eventListeners: {
                    processCompleted: (serviceResult) => {
                        if (serviceResult.error) {
                            alert("error:" + JSON.stringify(serviceResult.error));
                            return;
                        }
                        var result = serviceResult.result;
                        if (result.features) {
                            //创建专题图图层
                            themeLayer = new RangeTheme3DLayer("range3DThemeLayer", {
                                heightField: themeField,
                                parseNumber: true,
                                enableHighlight: true,

                                heightStops: [
                                    [0.01, 1000], [0.1, 5000], [0.2, 6000]
                                ],
                                colorStops: [
                                    [0, "#FDE2CA"], [0.02, "#FACE9C"], [0.04, "#F09C42"], [0.06, "#D0770B"], [0.1, "#945305"], [0.2, "#593000"]
                                ],
                                // 显示图例
                                showLegend: true,
                                legendTitle: "人口密度"
                            });
                            themeLayer.setHighlightStyleOptions({color: "#058e94"});
                            themeLayer.setData(result.features).addTo(map);
                            map.easeTo({
                                pitch: 60,
                                bearing: 0
                            })
                        }
                    }
                },
                format: DataFormat.GEOJSON
            });
            queryFeatures.processAsync(getFeatureBySQLParams);
            setTimeout(() => {
                expect(themeLayer).not.toBeNull();
                expect(themeLayer.colorStops.length).toEqual(6);
                expect(themeLayer.data.type).toBe("FeatureCollection");
                expect(themeLayer.data.features.length).toBeGreaterThan(0);
                for (var i = 0; i < themeLayer.data.features.length; i++) {
                    expect(themeLayer.data.features[i].type).toBe("Feature");
                    expect(themeLayer.data.features[i].id).not.toBeNull();
                    expect(themeLayer.data.features[i].properties).not.toBeNull();
                    expect(themeLayer.data.features[i].geometry).not.toBeNull();
                }
                expect(themeLayer.enableHighlight).toBeTruthy();
                expect(themeLayer.heightField).toBe("POP_DENSITY99");
                expect(themeLayer.heightStops.length).toEqual(3);
                expect(themeLayer.id).toBe("range3DThemeLayer");
                expect(themeLayer.highlight.color).toBe("#058e94");
                expect(themeLayer.legendTitle).toBe("人口密度");
                var layerStyleOptions = themeLayer.getLayerStyleOptions();
                expect(layerStyleOptions).not.toBeNull();
                expect(layerStyleOptions).not.toBeUndefined();
                var highlightStyleOptions = themeLayer.getHighlightStyleOptions();
                expect(highlightStyleOptions).not.toBeNull();
                expect(highlightStyleOptions).not.toBeUndefined();
                themeLayer.remove();
                done();
            }, 5000)
        });
    });
});

