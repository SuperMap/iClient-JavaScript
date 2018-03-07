require('../../../src/mapboxgl/overlay/HeatMapLayer');
var mapboxgl = require('mapbox-gl');
window.mapboxgl = mapboxgl;

var url = GlobeParameter.worldMapURL;
var heatMapLayer;
describe('mapboxgl_HeatMapLayer', function () {
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
                        "tiles": [url + '/zxyTileImage.png?z={z}&x={x}&y={y}'],
                        "tileSize": 256,
                    },
                },
                "layers": [{
                    "id": "simple-tiles",
                    "type": "raster",
                    "source": "raster-tiles",
                    "minzoom": 0,
                    "maxzoom": 9
                }]
            },
            center: [0, 0],
            zoom: 1
        });
        heatMapLayer = new mapboxgl.supermap.HeatMapLayer(
            "heatMap",
            {
                "map": map,
                "id": "heatmap",
                "radius": 45,
                "featureWeight": "value",
            }
        );
        var heatPoints = {
            "type": "FeatureCollection",
            "features": [{
                "type": "feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [0, 0]
                },
                "properties": {
                    "value": Math.random() * 9,
                    "geoRadius": null
                }
            }]
        };
        heatMapLayer.addFeatures(heatPoints);
        map.addLayer(heatMapLayer);
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
        map.removeLayer("heatmap");
        map.removeLayer("heatmap_2");
    });

    it('initialize', function () {
        expect(heatMapLayer).not.toBeNull();
        expect(heatMapLayer.id).toBe("heatmap");
        expect(heatMapLayer.radius).toEqual(45);
        expect(heatMapLayer.featureWeight).toBe("value");
        expect(heatMapLayer.features.length).toEqual(1);
        expect(heatMapLayer.colors.length).toEqual(5);
        expect(heatMapLayer.opacity).toEqual(1);
        expect(heatMapLayer.useGeoUnit).toBeFalsy();
    });

    it("toiClientFeature()_test", function () {
        var heatPoints = {
            "type": "FeatureCollection",
            "features": [{
                "type": "feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [0, 0]
                },
                "properties": {
                    "value": 2,
                }
            }]
        };

        var toiClientFeature = heatMapLayer.toiClientFeature(heatPoints);
        expect(toiClientFeature).not.toBeNull();
        expect(toiClientFeature.length).toEqual(1);
        expect(toiClientFeature[0].CLASS_NAME).toBe("SuperMap.Feature.Vector");
    });

    it("addFeatures() , removeFeatures() ,removeAllFeatures() test", function () {
        var heatPoints = {
            "type": "FeatureCollection",
            "features": [{
                "type": "feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [0, 0]
                },
                "properties": {
                    "value": 2,
                }
            }, {
                "type": "feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [1, 1]
                },
                "properties": {
                    "value": 4,
                }
            }, {
                "type": "feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [2, 1]
                },
                "properties": {
                    "value": 8,
                }
            }]
        };
        //测试addFeatures
        heatMapLayer.addFeatures(heatPoints);
        expect(heatMapLayer.features.length).toEqual(3);
        //测试removeFeatures
        var removeFeatures = [];
        heatMapLayer.removeFeatures(removeFeatures);
        expect(heatMapLayer.features.length).toEqual(3);

        heatMapLayer.removeFeatures(heatMapLayer.features[0]);
        expect(heatMapLayer.features.length).toEqual(2);

        removeFeatures.push(heatMapLayer.features[0]);
        heatMapLayer.removeFeatures(removeFeatures);
        expect(heatMapLayer.features.length).toEqual(1);

        removeFeatures = [];
        removeFeatures.push(heatMapLayer.features[0]);
        heatMapLayer.removeFeatures(removeFeatures);
        expect(heatMapLayer.features.length).toEqual(0);

        //测试removeAllFeatures
        heatMapLayer.addFeatures(heatPoints);
        heatMapLayer.removeFeatures(heatMapLayer.features);
        expect(heatMapLayer.features.length).toEqual(0);

    });

    it("setOpacity_test", function () {
        heatMapLayer.setOpacity(0.5);
        var opacity = heatMapLayer.rootCanvas.style.opacity;
        expect(opacity).toBe('0.5');
    });


    it("moveTo_test", function () {
        var heatMapLayer2 = new mapboxgl.supermap.HeatMapLayer(
            "heatMap",
            {
                "map": map,
                "id": "heatmap_2",
                "radius": 45,
                "featureWeight": "value",
            }
        );
        var heatPoints = {
            "type": "FeatureCollection",
            "features": [{
                "type": "feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [1, 1]
                },
                "properties": {
                    "value": Math.random() * 9,
                    "geoRadius": null
                }
            }]
        };
        heatMapLayer2.addFeatures(heatPoints);
        map.addLayer(heatMapLayer2);

        var children = heatMapLayer.rootCanvas.parentNode.children;
        var heatMapLayerIndexBefore, heatMapLayerIndexAfter;
        for (var i = 0; i < children.length; i++) {
            if (heatMapLayer.rootCanvas === children[i]) {
                heatMapLayerIndexBefore = i;
            }
        }

        heatMapLayer.moveTo("heatmap_2");

        for (var i = 0; i < children.length; i++) {
            if (heatMapLayer.rootCanvas === children[i]) {
                heatMapLayerIndexAfter = i;
            }
        }

        expect(heatMapLayerIndexBefore).toEqual(heatMapLayerIndexAfter);
        heatMapLayer.moveTo("heatmap_2", false);
        for (var i = 0; i < children.length; i++) {
            if (heatMapLayer.rootCanvas === children[i]) {
                heatMapLayerIndexAfter = i;
            }
        }
        expect(heatMapLayerIndexBefore).not.toEqual(heatMapLayerIndexAfter);
    });

    it("setVisibility_test", function () {
        heatMapLayer.setVisibility(false);
        expect(heatMapLayer.visibility).toBeFalsy();
    });

    it("removeFeatures_test", function () {
        heatMapLayer.removeFeatures(heatMapLayer.features);
        expect(heatMapLayer.features.length).toBeFalsy();
    });

});