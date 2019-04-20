import ol from 'openlayers';
import * as oldebug from 'openlayers/dist/ol-debug';
import '../../../libs/openlayers/plugins/ol-mapbox-style/2.11.2/olms';
import {
    MapboxStyles
} from '../../../../src/openlayers/overlay/vectortile/MapboxStyles';
import {
    MapService
} from '../../../../src/openlayers/services/MapService';
import {
    VectorTileSuperMapRest
} from '../../../../src/openlayers/overlay/VectorTileSuperMapRest';
import {
    FetchRequest
} from '../../../../src/common/util/FetchRequest';

ol.render.canvas = oldebug.render.canvas;
ol.geom.flat = oldebug.geom.flat;

describe('openlayers_MapboxStyles', () => {
    var url = GlobeParameter.californiaURL
    var testDiv, map, mapboxStyles, originalTimeout, stylesOptions;
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
                center: [-122.228687503369, 38.1364932162598],
                zoom: 10,
                minZoom: 10,
                maxZoom: 14,
                projection: 'EPSG:4326',
            })
        });
        stylesOptions = {
            url: url,
            map: map,
            source: 'California'
        };
        spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
            if (testUrl.indexOf("vectorstyles.json") > 0) {
                expect(testUrl).toBe(url + "/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true");
                return Promise.resolve(new Response(JSON.stringify(vectorstylesEscapedJson)));
            } else if (testUrl.indexOf("sprite.json") > 0) {
                return Promise.resolve(new Response(JSON.stringify(spriteEscapedJson)));
            };
            return null;

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

    it('getStyleFunction', (done) => {
        var style;
        mapboxStyles = new MapboxStyles(stylesOptions);
        mapboxStyles.on("styleloaded", () => {
            style = mapboxStyles.getStyleFunction();
            expect(style).not.toBeNull();
            done();
        })
    });

    it('getStyleFunction,setSelectedId', (done) => {
        mapboxStyles = new MapboxStyles(stylesOptions);
        mapboxStyles.on("styleloaded", () => {
            var style = mapboxStyles.getStyleFunction()(feature, 2.388657133911758);
            expect(style).not.toBeNull();
            expect(style[0].getFill().getColor()).not.toBeNull();
            var color = ol.color.asArray(style[0].getFill().getColor());
            expect(color[0]).toBeCloseTo(249);
            expect(color[1]).toBeCloseTo(224);
            expect(color[2]).toBeCloseTo(219);
            expect(color[3]).toBeCloseTo(0.9);
            mapboxStyles.updateStyles({
                "paint": {
                    "fill-color": "rgba(249,0,0,0.90)"
                },
                "id": "Military_R@California#26",
                "maxzoom": 17,
            });
            style = mapboxStyles.getStyleFunction()(feature, 2.388657133911758 / 2);
            expect(style).not.toBeNull();
            expect(style[0].getFill().getColor()).not.toBeNull();
            color = ol.color.asArray(style[0].getFill().getColor());
            expect(color[0]).toBeCloseTo(249);
            expect(color[1]).toBeCloseTo(0);
            expect(color[2]).toBeCloseTo(0);
            expect(color[3]).toBeCloseTo(0.9);
            mapboxStyles.setSelectedId(1, "Military_R@California");
            style = mapboxStyles.getStyleFunction()(feature, 2.388657133911758);
            expect(style).not.toBeNull();
            expect(style[0].getFill().getColor()).not.toBeNull();
            color = ol.color.asArray(style[0].getFill().getColor());
            expect(color[0]).toBeCloseTo(255);
            expect(color[1]).toBeCloseTo(0);
            expect(color[2]).toBeCloseTo(0);
            expect(color[3]).toBeCloseTo(1);
            done();
        })
        var feature = new ol.Feature({
            geometry: new ol.geom.Polygon([
                [
                    [0, 0],
                    [-10, 30],
                    [-30, 0],
                    [0, 0]
                ]
            ]),
            layer: "Military_R@California"
        });
        feature.setId(1);


    });

    it('getStylesBySourceLayer', (done) => {
        mapboxStyles = new MapboxStyles(stylesOptions);
        mapboxStyles.once("styleloaded", () => {
            try {
                var layer = mapboxStyles.getStylesBySourceLayer("Military_R@California");
                expect(layer).not.toBeNull();
                expect(layer[0].paint).not.toBeNull();
                expect(layer[0].paint["fill-color"]).toBe("rgba(249,224,219,0.90)");
                vectorstylesEscapedJson.layers[2].paint["fill-color"] = "rgba(255,0,0,0)";
                mapboxStyles.setStyle(vectorstylesEscapedJson);
                layer = mapboxStyles.getStylesBySourceLayer("Military_R@California");
                expect(layer).not.toBeNull();
                expect(layer[0].paint).not.toBeNull();
                expect(layer[0].paint["fill-color"]).toBe("rgba(255,0,0,0)");
                done();
            } catch (e) {
                console.log("'getStylesBySourceLayer'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('init_StyleObject', (done) => {
        var style;
        mapboxStyles = new MapboxStyles({
            style: vectorstylesEscapedJson,
            map: map,
            source: 'California'
        });
        mapboxStyles.on("styleloaded", () => {
            try {
                style = mapboxStyles.getStyleFunction();
                expect(style).not.toBeNull();
                done();
            } catch (e) {
                console.log("'init_StyleObject'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('init_StyleObject_nullSource', (done) => {
        var style;
        mapboxStyles = new MapboxStyles({
            style: vectorstylesEscapedJson,
            map: map
        });
        mapboxStyles.on("styleloaded", () => {
            try {
                style = mapboxStyles.getStyleFunction();
                expect(style).not.toBeNull();
                expect(mapboxStyles.source).toEqual('California');
                done();
            } catch (e) {
                console.log("'init_StyleObject_nullSource'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('init_StyleUrl', (done) => {
        var style;
        mapboxStyles = new MapboxStyles({
            style: url + "/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true",
            map: map,
            source: 'California'
        });
        mapboxStyles.on("styleloaded", () => {
            try {
                style = mapboxStyles.getStyleFunction();
                expect(style).not.toBeNull();
                done();
            } catch (e) {
                console.log("'init_StyleUrl'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

})