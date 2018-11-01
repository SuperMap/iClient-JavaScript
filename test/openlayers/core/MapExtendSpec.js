import ol from 'openlayers';
import '../../../src/openlayers/core/MapExtend';
import {
    Graphic as GraphicObj
} from '../../../src/openlayers/overlay/graphic/Graphic'

import {
    Graphic as GraphicSource
} from '../../../src/openlayers/overlay/Graphic.js';


describe('openlayers_MapExtend', () => {
    let originalTimeout, map, testDiv;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
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
                center: [30, 30],
                zoom: 2,
                projection: 'EPSG:4326'
            }),
            renderer: ['canvas']
        });
    });
    afterAll(() => {
        document.body.removeChild(testDiv);
    });
    it('forEachFeatureAtPixel_graphics', (done) => {
        var randomCircleStyles = new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
                color: '#000000'
            }),
            stroke: new ol.style.Stroke({
                color: '#000000'
            })
        });
        const graphics = [];
        graphics[0] = new GraphicObj(new ol.geom.Point([30, 30]));
        graphics[0].setId(0);
        graphics[0].setAttributes({
            name: "graphic_0"
        });
        graphics[0].setStyle(randomCircleStyles);
        graphics[1] = new GraphicObj(new ol.geom.Point([30, 30]));
        graphics[1].setId(1);
        graphics[1].setStyle(randomCircleStyles);
        const graphicLayer = new ol.layer.Image({
            source: new GraphicSource({
                graphics: graphics,
                map: map
            })
        });
        map.addLayer(graphicLayer);

        setTimeout(() => {
            graphicLayer.getSource()._forEachFeatureAtCoordinate([30, 30], 1, (result) => {
                expect(graphics).toContain(result);
            });

            let pixel = map.getPixelFromCoordinate([30, 30]);
            let count = 0;
            map.forEachFeatureAtPixel(pixel,
                (graphic, layer) => {
                    count++;
                    expect(graphics).toContain(graphic);
                    expect(layer).toBe(graphicLayer);
                });
            expect(count).toBe(2); 
            expect(map.getFeaturesAtPixel(pixel).length).toBe(2);
            map.removeLayer(graphicLayer);
            done();
        }, 4000)
    })
    it('forEachFeatureAtPixel_layerGroup_issue26', (done) => {
        var feature = new ol.Feature(new ol.geom.Polygon([
            [
                [0, 0],
                [-10, 30],
                [-30, 0],
                [0, 0]
            ]
        ]));
        var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [feature],
                wrapX: false
            })
        });
        var feature1 = new ol.Feature(new ol.geom.Polygon([
            [
                [0, 0],
                [-15, 30],
                [-30, 0],
                [0, 0]
            ]
        ]));
        var vectorLayer1 = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [feature1],
                wrapX: false
            })
        });
        var feature2 = new ol.Feature(new ol.geom.Polygon([
            [
                [0, 0],
                [-15, 30],
                [-20, 0],
                [0, 0]
            ]
        ]));
        var polygonSource2 = new ol.source.Vector({
            features: [feature2],
            wrapX: false
        });
        var vectorLayer2 = new ol.layer.Vector({
            source: polygonSource2
        });
        const layers = new ol.layer.Group({
            layers: [vectorLayer1, new ol.layer.Group({
                layers: [vectorLayer, vectorLayer2]
            })]
        })
        map.addLayer(layers);

        setTimeout(() => {
            let pixel = map.getPixelFromCoordinate([-11, 7]);
            let count=0;
            map.forEachFeatureAtPixel(pixel,
                (feature, layer) => {
                    count++;
                    expect([feature, feature1, feature2]).toContain(feature);
                    expect([vectorLayer1, vectorLayer, vectorLayer2]).toContain(layer);
                });
            expect(count).toBe(3);
            expect(map.getFeaturesAtPixel(pixel).length).toBe(3);
            map.removeLayer(layers);
            done();
        }, 4000)
    })
})