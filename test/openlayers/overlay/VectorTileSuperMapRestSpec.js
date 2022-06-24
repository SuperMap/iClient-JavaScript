import {VectorTileSuperMapRest} from '../../../src/openlayers/overlay/VectorTileSuperMapRest';
import {MapService} from '../../../src/openlayers/services/MapService';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorTileLayer from 'ol/layer/VectorTile';

var url = GlobeParameter.ChinaURL;
describe('openlayers_VectorTileSuperMapRest', () => {
    var testDiv, map, vectorTileOptions, vectorTileSource,originalTimeout,vectorLayer;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        if (vectorLayer) {
            map.removeLayer(vectorLayer);
        }
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });

    it('initialize', (done) => {
        new MapService(url).getMapInfo((serviceResult) => {
            map = new Map({
                target: 'map',
                view: new View({
                    center: [12957388, 4853991],
                    zoom: 11
                })
            });
            vectorTileOptions = VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            vectorTileSource = new VectorTileSuperMapRest(vectorTileOptions);
            vectorLayer = new VectorTileLayer({
                source: vectorTileSource
            });
            map.addLayer(vectorLayer);
        });
        setTimeout(() => {
            try {
                expect(vectorTileOptions).not.toBeNull();
                expect(vectorTileOptions.crossOrigin).toBe("anonymous");
                expect(vectorTileSource).not.toBeNull();
                done();
            } catch (exception) {
                console.log("'initialize'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
            }
        }, 0);
    });
    it('custom_tileLoadFunction', (done) => {
        var tileLoadFunction = jasmine.createSpy('tileLoadFunction');
        new MapService(url).getMapInfo((serviceResult) => {
            map = new Map({
                target: 'map',
                view: new View({
                    center: [12957388, 4853991],
                    zoom: 11
                })
            });
            vectorTileOptions = VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            vectorTileOptions.tileLoadFunction = tileLoadFunction;
            vectorTileSource = new VectorTileSuperMapRest(vectorTileOptions);
            vectorLayer = new VectorTileLayer({
                source: vectorTileSource
            });
            map.addLayer(vectorLayer);
        });
        setTimeout(() => {
            try {
                expect(vectorTileOptions).not.toBeNull();
                expect(vectorTileSource).not.toBeNull();
                expect(tileLoadFunction).toHaveBeenCalled();
                done();
            } catch (exception) {
                console.log("'initialize'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 0);
    });
});