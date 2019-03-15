import ol from 'openlayers';
import {
    TileSuperMapRest
} from '../../../src/openlayers/mapping/TileSuperMapRest';
import {
    MapService
} from '../../../src/openlayers/services/MapService';

var url = GlobeParameter.imageURL;
describe('openlayers_TileSuperMapRest', () => {
    var originalTimeout;
    var testDiv, map, tileOptions, tileSource;
    beforeAll(() => {
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        document.body.appendChild(testDiv);
        //只测了serverType为iserver得情况
        new MapService(url).getMapInfo((serviceResult) => {
            map = new ol.Map({
                target: 'map',
                view: new ol.View({
                    center: [12957388, 4853991],
                    zoom: 11
                })
            });
            tileOptions = TileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            tileSource = new TileSuperMapRest(tileOptions);
            var imageLayer = new ol.layer.Tile({
                source: tileSource
            });
            map.addLayer(imageLayer);
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
        document.body.removeChild(testDiv);
    });

    it('initialize', (done) => {
        setTimeout(() => {
            try {
                expect(tileOptions).not.toBeNull();
                expect(tileOptions.serverType).toBe("ISERVER");
                expect(tileOptions.crossOrigin).toBe("anonymous");
                expect(tileSource).not.toBeNull();
                expect(tileSource.urls.length).toBe(1);
                done();
            } catch (exception) {
                console.log("'initialize'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 6000);

    });

    it('tileUrlFunction', () => {
        var tempOptions = {
            extent: [0, 0, 90, 90],
            prjCoordSys: {
                "epsgCode": 4326
            }
        };
        var pixelRatio = "245";
        var coords = new ol.geom.Point(120.14, 30.24);
        var tileUrl = tileSource.tileUrlFunction(coords, pixelRatio, ol.proj.get("EPSG:4326"));
        expect(tileUrl).not.toBeNull();
        expect(tileSource.getTileGrid().getTileSize()).toEqual(256);
        expect(tileSource.getTileGrid().getResolution(0)).toEqual(90.0 / 256);
    });

    it('tileUrlFunction_tilePoxy', () => {
        tileOptions.tileProxy = "tileProxy";
        var tileSourcetilePoxy = new TileSuperMapRest(tileOptions);
        var tempOptions = {
            redirect: true,
            prjCoordSys: {
                "epsgCode": 4326
            }
        };
        var pixelRatio = "245";
        var coords = new ol.geom.Point(120.14, 30.24);
        var tileUrl = tileSourcetilePoxy.tileUrlFunction(coords, pixelRatio, ol.proj.get("EPSG:4326"));
        // expect(tileUrl).toBe("tileProxyhttp%3A%2F%2Flocalhost%3A8090%2Fiserver%2Fservices%2Fmap-world%2Frest%2Fmaps%2F%25E4%25B8%2596%25E7%2595%258C%25E5%259C%25B0%25E5%259B%25BE_Day%2Fimage.png%3F%26transparent%3Dtrue%26cacheEnabled%3Dfalse%26width%3D256%26height%3D256%26viewBounds%3D%257B%2522leftBottom%2522%2520%3A%2520%257B%2522x%2522%3ANaN%2C%2522y%2522%3ANaN%257D%2C%2522rightTop%2522%2520%3A%2520%257B%2522x%2522%3ANaN%2C%2522y%2522%3ANaN%257D%257D");
        expect(tileUrl).not.toBeNull();
    });

});