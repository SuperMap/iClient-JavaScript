import ol from 'openlayers';
import {VectorTileSuperMapRest} from '../../../src/openlayers/overlay/VectorTileSuperMapRest';
import {MapService} from '../../../src/openlayers/services/MapService';

var url = GlobeParameter.ChinaURL;
describe('openlayers_VectorTileSuperMapRest', () => {
    var originalTimeout;
    var testDiv, map, vectorTileOptions, vectorTileSource;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        new MapService(url).getMapInfo((serviceResult) => {
            map = new ol.Map({
                target: 'map',
                view: new ol.View({
                    center: [12957388, 4853991],
                    zoom: 11
                })
            });
            vectorTileOptions = VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            vectorTileSource = new VectorTileSuperMapRest(vectorTileOptions);
            var vectorLayer = new ol.layer.VectorTile({
                source: vectorTileSource
            });
            map.addLayer(vectorLayer);
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

    it('initialize', (done) => {
        setTimeout(() => {
            try {
                expect(vectorTileOptions).not.toBeNull();
                expect(vectorTileOptions.serverType).toBe("ISERVER");
                expect(vectorTileOptions.crossOrigin).toBe("anonymous");
                expect(vectorTileSource).not.toBeNull();
                expect(vectorTileSource.urls.length).toBe(1);
                done();
            } catch (exception) {
                console.log("'initialize'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
            }
        }, 6000);
    });

    xit('serverType of iportal', () => {
        var iportaoUrl = "http://support.supermap.com.cn:8092/web/maps/44";
        var vectorTileOptions, vectorTilesource;

        new MapService(iportaoUrl).getMapInfo((serviceResult) => {
            vectorTileOptions = VectorTileSuperMapRest.optionsFromMapJSON(iportaoUrl, serviceResult.result);
            vectorTilesource = new VectorTileSuperMapRest(vectorTileOptions);
            var vectorLayer = new ol.layer.VectorTile({
                source: vectorTilesource
            });
            map.addLayer(vectorLayer);
        });
        setTimeout(() => {
            try {
                expect(vectorTileOptions).not.toBeNull();
                expect(vectorTileOptions.serverType).toBe("IPORTAL");
                expect(vectorTileOptions.crossOrigin).toBe("anonymous");

                expect(vectorTilesource).not.toBeNull();
                expect(vectorTilesource.urls.length).toBe(1);
                done();
            } catch (exception) {
                console.log("'constructor and static test'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
            }
        }, 6000);
    });
});