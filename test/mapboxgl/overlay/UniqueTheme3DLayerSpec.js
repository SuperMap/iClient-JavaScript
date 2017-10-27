require('../../../src/mapboxgl/overlay/RangeTheme3DLayer');
var mapboxgl = require('mapbox-gl');

var dataUrl = GlobeParameter.editServiceURL_leaflet;
var themeField = "LANDTYPE";
describe('mapboxgl_UniqueTheme3DLayer', function () {
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

    it('initialize', function (done) {
        var themeLayer;
        map.on('load', function () {
            var getFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
                queryParameter: new SuperMap.FilterParameter({
                    name: "Jingjin",
                    attributeFilter: "SMID > -1"
                }),
                toIndex: 500,
                datasetNames: ["Jingjin:Landuse_R"]
            });
            var queryFeatures = new SuperMap.GetFeaturesBySQLService(dataUrl, {
                eventListeners: {
                    processCompleted: function (serviceResult) {
                        if (serviceResult.error) {
                            alert("error:" + JSON.stringify(serviceResult.error));
                            return;
                        }
                        var result = serviceResult.result;
                        if (result.features) {
                            themeLayer = new mapboxgl.supermap.UniqueTheme3DLayer("uniqueTheme3DLayer", {
                                height: 6000,
                                enableHighlight: true,
                                themeField: themeField,
                                colorStops: [
                                    ["草地", "#C1FFC1"], ["城市", "#CD7054"], ["灌丛", "#7CCD7C"], ["旱地", "#EE9A49"],
                                    ["湖泊水库", "#8EE5EE"], ["经济林", "#548B54"], ["沙漠", "#DEB887"], ["水浇地", "#E0FFFF"],
                                    ["水田", "#388E8E"], ["用材林", "#556B2F"], ["沼泽", "#2F4F4F"]
                                ],
                                // 显示图例
                                showLegend: true,
                                legendTitle: "土地利用类型"
                            });
                            themeLayer.setData(result.features).addTo(map);
                            map.easeTo({
                                pitch: 60,
                                bearing: 0
                            });
                        }
                    }
                },
                format: SuperMap.DataFormat.GEOJSON
            });
            queryFeatures.processAsync(getFeatureBySQLParams);
            setTimeout(function () {
                expect(themeLayer).not.toBeNull();
                expect(themeLayer.colorStops.length).toEqual(11);
                expect(themeLayer.data.type).toBe("FeatureCollection");
                expect(themeLayer.data.features.length).toBeGreaterThan(0);
                for (var i = 0; i < themeLayer.data.features.length; i++) {
                    expect(themeLayer.data.features[i].type).toBe("Feature");
                    expect(themeLayer.data.features[i].id).not.toBeNull();
                    expect(themeLayer.data.features[i].properties).not.toBeNull();
                    expect(themeLayer.data.features[i].geometry).not.toBeNull();
                }
                expect(themeLayer.enableHighlight).toBeTruthy();
                expect(themeLayer.height).toEqual(6000);
                expect(themeLayer.heightField).toBe("height");
                expect(themeLayer.id).toBe("uniqueTheme3DLayer");
                expect(themeLayer.highlight.color).toBe("#ADA91E");
                expect(themeLayer.legendTitle).toBe("土地利用类型");
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

