require('../../../src/leaflet/overlay/HeatMapLayer');

var url = GlobeParameter.worldMapURL;
var heatMapLayer;
describe('leaflet_HeatMapLayer', function () {
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

        map = L.map('map', {
            preferCanvas: true,
            crs: L.CRS.EPSG4326,
            center: {lon: 0, lat: 0},
            maxZoom: 18,
            zoom: 1
        });
        L.supermap.tiledMapLayer(url).addTo(map);
    });
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

        heatMapLayer = L.supermap.heatMapLayer(
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
        heatMapLayer.addTo(map);
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(function () {
        map.remove();
        window.document.body.removeChild(testDiv);
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

    it("toiClientFeature()_test add HeatMapFeature_Test", function () {
        var features1 = new L.supermap.heatMapFeature(L.point(0, 0), {"value": 2});
        expect(features1).not.toBeNull();
        expect(features1.geometry.x).not.toBeNull(0);
        expect(features1.geometry.y).not.toBeNull(0);
        expect(features1.attributes.value).toEqual(2);
        var vectorFeature = features1.toFeature();
        expect(vectorFeature).not.toBeNull();
        expect(vectorFeature.CLASS_NAME).toBe("SuperMap.Feature.Vector");
        var features2 = new L.supermap.heatMapFeature(L.latLng(1, 1), {"value": 4});
        var features3 = new L.supermap.heatMapFeature(L.circleMarker(L.latLng(2, 2)), {"value": 8});

        var toiClientFeature = heatMapLayer.toiClientFeature([features1, features2, features3]);
        expect(toiClientFeature).not.toBeNull();
        expect(toiClientFeature.length).toEqual(3);
        expect(toiClientFeature[0].CLASS_NAME).toBe("SuperMap.Feature.Vector");
        expect(toiClientFeature[1].CLASS_NAME).toBe("SuperMap.Feature.Vector");
        expect(toiClientFeature[2].CLASS_NAME).toBe("SuperMap.Feature.Vector");
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

    it("getLocalXY_test", function () {
        var pixelPoint = heatMapLayer.getLocalXY(L.point(0, 0));
        expect(pixelPoint).not.toBeNull();
    });

    it("setOpacity_test", function () {
        heatMapLayer.setOpacity(0.5);
        var opacity = heatMapLayer.rootCanvas.style.opacity;
        expect(opacity).toBe('0.5');
    });
});