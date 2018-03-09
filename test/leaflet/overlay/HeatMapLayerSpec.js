import {heatMapLayer} from '../../../src/leaflet/overlay/HeatMapLayer';
import {heatMapFeature} from '../../../src/leaflet/overlay/HeatMapLayer';
import {tiledMapLayer} from '../../../src/leaflet/mapping/TiledMapLayer';

var url = GlobeParameter.worldMapURL;
describe('leaflet_HeatMapLayer', () => {
    var originalTimeout;
    var testDiv, map, heatLayer;
    beforeAll(() => {
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
        tiledMapLayer(url).addTo(map);
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        heatLayer = heatMapLayer(
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
        heatLayer.addFeatures(heatPoints);
        heatLayer.addTo(map);
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        map.remove();
        window.document.body.removeChild(testDiv);
    });

    it('initialize', () => {
        expect(heatLayer).not.toBeNull();
        expect(heatLayer.id).toBe("heatmap");
        expect(heatLayer.radius).toEqual(45);
        expect(heatLayer.featureWeight).toBe("value");
        expect(heatLayer.features.length).toEqual(1);
        expect(heatLayer.colors.length).toEqual(5);
        expect(heatLayer.opacity).toEqual(1);
        expect(heatLayer.useGeoUnit).toBeFalsy();
    });

    it("toiClientFeature, add HeatMapFeature", () => {
        var features1 = new heatMapFeature(L.point(0, 0), {"value": 2});
        expect(features1).not.toBeNull();
        expect(features1.geometry.x).not.toBeNull(0);
        expect(features1.geometry.y).not.toBeNull(0);
        expect(features1.attributes.value).toEqual(2);
        var vectorFeature = features1.toFeature();
        expect(vectorFeature).not.toBeNull();
        expect(vectorFeature.CLASS_NAME).toBe("SuperMap.Feature.Vector");
        var features2 = new heatMapFeature(L.latLng(1, 1), {"value": 4});
        var features3 = new heatMapFeature(L.circleMarker(L.latLng(2, 2)), {"value": 8});

        var toiClientFeature = heatLayer.toiClientFeature([features1, features2, features3]);
        expect(toiClientFeature).not.toBeNull();
        expect(toiClientFeature.length).toEqual(3);
        expect(toiClientFeature[0].CLASS_NAME).toBe("SuperMap.Feature.Vector");
        expect(toiClientFeature[1].CLASS_NAME).toBe("SuperMap.Feature.Vector");
        expect(toiClientFeature[2].CLASS_NAME).toBe("SuperMap.Feature.Vector");
    });

    it("addFeatures, removeFeatures, removeAllFeatures", () => {
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
        heatLayer.addFeatures(heatPoints);
        expect(heatLayer.features.length).toEqual(3);
        //测试removeFeatures
        var removeFeatures = [];
        heatLayer.removeFeatures(removeFeatures);
        expect(heatLayer.features.length).toEqual(3);

        heatLayer.removeFeatures(heatLayer.features[0]);
        expect(heatLayer.features.length).toEqual(2);

        removeFeatures.push(heatLayer.features[0]);
        heatLayer.removeFeatures(removeFeatures);
        expect(heatLayer.features.length).toEqual(1);

        removeFeatures = [];
        removeFeatures.push(heatLayer.features[0]);
        heatLayer.removeFeatures(removeFeatures);
        expect(heatLayer.features.length).toEqual(0);

        //测试removeAllFeatures
        heatLayer.addFeatures(heatPoints);
        heatLayer.removeFeatures(heatLayer.features);
        expect(heatLayer.features.length).toEqual(0);

    });

    it("getLocalXY", () => {
        var pixelPoint = heatLayer.getLocalXY(L.point(0, 0));
        expect(pixelPoint).not.toBeNull();
    });

    it("setOpacity", () => {
        heatLayer.setOpacity(0.5);
        var opacity = heatLayer.rootCanvas.style.opacity;
        expect(opacity).toBe('0.5');
    });
});