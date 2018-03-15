import ol from 'openlayers';
import {HeatMap} from '../../../src/openlayers/overlay/HeatMap';
import {TileSuperMapRest} from '../../../src/openlayers/mapping/TileSuperMapRest';

var url = GlobeParameter.worldMapURL;
describe('openlayers_HeatMapLayer', () => {
    var originalTimeout;
    var testDiv, map, heatMapSource;
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
                center: [0, 0],
                zoom: 3,
                projection: 'EPSG:4326'
            })
        });
        map.addLayer(new ol.layer.Tile({
            source: new TileSuperMapRest({
                url: url,
            }),
        }));
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

        heatMapSource = new HeatMap(
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
        heatMapSource.addFeatures(heatPoints);
        var heatMapLayer = new ol.layer.Image({
            source: heatMapSource
        });
        map.addLayer(heatMapLayer);
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });

    it('initialize', () => {
        expect(heatMapSource).not.toBeNull();
        expect(heatMapSource.id).toBe("heatmap");
        expect(heatMapSource.radius).toEqual(45);
        expect(heatMapSource.featureWeight).toBe("value");
        expect(heatMapSource.features.length).toEqual(1);
        expect(heatMapSource.colors.length).toEqual(5);
        expect(heatMapSource.opacity).toEqual(1);
        expect(heatMapSource.useGeoUnit).toBeFalsy();
    });

    it("toiClientFeature, add HeatMapFeature", () => {
        var toiClientFeature = heatMapSource.toiClientFeature([new ol.Feature({
            geometry: new ol.geom.Point([0, 0]),
            Properties: {
                "value": 2,
            }
        })]);
        expect(toiClientFeature).not.toBeNull();
        expect(toiClientFeature.length).toEqual(1);
        expect(toiClientFeature[0].CLASS_NAME).toBe("SuperMap.Feature.Vector");
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
        heatMapSource.addFeatures(heatPoints);
        expect(heatMapSource.features.length).toEqual(3);
        //测试removeFeatures
        var removeFeatures = [];
        heatMapSource.removeFeatures(removeFeatures);
        expect(heatMapSource.features.length).toEqual(3);

        heatMapSource.removeFeatures(heatMapSource.features[0]);
        expect(heatMapSource.features.length).toEqual(2);

        removeFeatures.push(heatMapSource.features[0]);
        heatMapSource.removeFeatures(removeFeatures);
        expect(heatMapSource.features.length).toEqual(1);

        removeFeatures = [];
        removeFeatures.push(heatMapSource.features[0]);
        heatMapSource.removeFeatures(removeFeatures);
        expect(heatMapSource.features.length).toEqual(0);

        //测试removeAllFeatures
        heatMapSource.addFeatures(heatPoints);
        heatMapSource.removeFeatures(heatMapSource.features);
        expect(heatMapSource.features.length).toEqual(0);

    });

    it("setOpacity", () => {
        heatMapSource.setOpacity(0.5);
        var opacity = heatMapSource.rootCanvas.style.opacity;
        expect(opacity).toBe('0.5');
    });
});