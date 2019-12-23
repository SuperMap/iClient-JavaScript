import * as ol from 'ol';
window.ol = ol;
import "../../../libs/openlayers/plugins/ol-mapbox-style/2.11.2/olms";
import { MapboxStyles } from "../../../../src/openlayers/overlay/vectortile/MapboxStyles";
import { FetchRequest } from "../../../../src/common/util/FetchRequest";
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import * as olColor from 'ol/color';

describe("openlayers_MapboxStyles", () => {
    var url = GlobeParameter.californiaURL;
    var testDiv, map, mapboxStyles, originalTimeout, stylesOptions;
    var feature, feature3, feature2;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);

        map = new Map({
            target: "map",
            view: new View({
                center: [-122.228687503369, 38.1364932162598],
                zoom: 10,
                minZoom: 10,
                maxZoom: 14,
                projection: "EPSG:4326"
            })
        });
        stylesOptions = {
            url: url,
            map: map,
            source: "California"
        };
        feature = new Feature({
            geometry: new Polygon([[[0, 0], [-10, 30], [-30, 0], [0, 0]]]),
            layer: "Military_R@California"
        });
        feature.setId(1);
        feature2 = new Feature({
            geometry: new Polygon([[[5, 5], [-15, 35], [-35, 5], [5, 5]]]),
            layer: "Military_R@California"
        });
        feature2.setId(2);
        feature3 = new Feature({
            geometry: new Polygon([[[10, 10], [-20, 40], [-20, 10], [10, 10]]]),
            layer: "Military_R@California"
        });
        feature3.setId(3);
        spyOn(FetchRequest, "get").and.callFake((testUrl, params, options) => {
            if (testUrl.indexOf("vectorstyles.json") > 0) {
                expect(testUrl).toBe(url + "/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true");
                return Promise.resolve(new Response(JSON.stringify(vectorstylesEscapedJson)));
            } else if (testUrl.indexOf("sprite.json") > 0) {
                return Promise.resolve(new Response(JSON.stringify(spriteEscapedJson)));
            }
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
    const defaultColor = [249, 224, 219, 0.9];
    const highlightColor = [255, 0, 0, 1];
    const matchFillColor = function(style, expectColor) {
        matchColor(style.getFill().getColor(),expectColor);
    };
    const matchColor = function(sourceColor, expectColor) {
        expect(sourceColor).not.toBeNull();
        const color = olColor.asArray(sourceColor);
        expectColor[0] && expect(color[0]).toBeCloseTo(expectColor[0]);
        expectColor[1] && expect(color[1]).toBeCloseTo(expectColor[1]);
        expectColor[2] && expect(color[2]).toBeCloseTo(expectColor[2]);
        expectColor[3] && expect(color[3]).toBeCloseTo(expectColor[3]);
    };
    it("getStyleFunction", done => {
        var style;
        mapboxStyles = new MapboxStyles(stylesOptions);
        mapboxStyles.on("styleloaded", () => {
            style = mapboxStyles.getStyleFunction();
            expect(style).not.toBeNull();
            done();
        });
    });

    it("getStyleFunction,setSelectedId", done => {
        mapboxStyles = new MapboxStyles(stylesOptions);
        mapboxStyles.on("styleloaded", () => {
            var style = mapboxStyles.getStyleFunction()(feature, 2.388657133911758);
            expect(style).not.toBeNull();
            matchFillColor(style[0],defaultColor);
            matchColor(style[1].getStroke().getColor(),defaultColor)
            mapboxStyles.updateStyles({
                paint: {
                    "fill-color": "rgba(249,0,0,0.90)"
                },
                id: "Military_R@California#26",
                maxzoom: 17
            });
            style = mapboxStyles.getStyleFunction()(feature, 2.388657133911758 / 2);
            expect(style).not.toBeNull();
            expect(style.length).toBe(2);
            matchFillColor(style[0],[249,0,0,0.9]);
            matchColor(style[1].getStroke().getColor(),defaultColor)
            mapboxStyles.setSelectedId(1, "Military_R@California");
            style = mapboxStyles.getStyleFunction()(feature, 2.388657133911758);
            expect(style).not.toBeNull();
            matchFillColor(style[0],highlightColor);
            done();
        });
    });

    it("selectedObjects", done => {
        mapboxStyles = new MapboxStyles(stylesOptions);
        mapboxStyles.on("styleloaded", () => {
            var style = mapboxStyles.getStyleFunction()(feature, 2.388657133911758);
            expect(style).not.toBeNull();
            matchFillColor(style[0],defaultColor);
            mapboxStyles.setSelectedObjects({ id: 1, sourceLayer: "Military_R@California" });
            style = mapboxStyles.getStyleFunction()(feature, 2.388657133911758);
            expect(style).not.toBeNull();
            matchFillColor(style[0],highlightColor);

            //add
            mapboxStyles.addSelectedObjects({ id: 2, sourceLayer: "Military_R@California" });
            style = mapboxStyles.getStyleFunction()(feature, 2.388657133911758);
            expect(style).not.toBeNull();
            matchFillColor(style[0],highlightColor);
            style = mapboxStyles.getStyleFunction()(feature2, 2.388657133911758);
            expect(style).not.toBeNull();
            matchFillColor(style[0],highlightColor);

            //remove
            mapboxStyles.removeSelectedObjects({ id: 2, sourceLayer: "Military_R@California" });
            style = mapboxStyles.getStyleFunction()(feature, 2.388657133911758);
            expect(style).not.toBeNull();
            matchFillColor(style[0],highlightColor);
            style = mapboxStyles.getStyleFunction()(feature2, 2.388657133911758);
            expect(style).not.toBeNull();
            matchFillColor(style[0],defaultColor);

            //set
            mapboxStyles.setSelectedObjects({ id: 2, sourceLayer: "Military_R@California" });
            style = mapboxStyles.getStyleFunction()(feature, 2.388657133911758);
            expect(style).not.toBeNull();
            matchFillColor(style[0],defaultColor);
            style = mapboxStyles.getStyleFunction()(feature2, 2.388657133911758);
            expect(style).not.toBeNull();
            matchFillColor(style[0],highlightColor);

            //clear
            mapboxStyles.clearSelectedObjects();
            style = mapboxStyles.getStyleFunction()(feature, 2.388657133911758);
            expect(style).not.toBeNull();
            matchFillColor(style[0],defaultColor);
            style = mapboxStyles.getStyleFunction()(feature2, 2.388657133911758);
            expect(style).not.toBeNull();
            matchFillColor(style[0],defaultColor);
            done();
        });
    });

    it("getStylesBySourceLayer", done => {
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

    it("init_StyleObject", done => {
        var style;
        mapboxStyles = new MapboxStyles({
            style: vectorstylesEscapedJson,
            map: map,
            source: "California"
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

    it("init_StyleObject_nullSource", done => {
        var style;
        mapboxStyles = new MapboxStyles({
            style: vectorstylesEscapedJson,
            map: map
        });
        mapboxStyles.on("styleloaded", () => {
            try {
                style = mapboxStyles.getStyleFunction();
                expect(style).not.toBeNull();
                expect(mapboxStyles.source).toEqual("California");
                done();
            } catch (e) {
                console.log("'init_StyleObject_nullSource'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it("init_StyleUrl", done => {
        var style;
        mapboxStyles = new MapboxStyles({
            style: url + "/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true",
            map: map,
            source: "California"
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
});
