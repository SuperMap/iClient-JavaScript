import { VectorTileSuperMapRest } from '../../../src/openlayers/overlay/VectorTileSuperMapRest';
import {
    FetchRequest
} from '@supermap/iclient-common/util/FetchRequest';
import { MapService } from '../../../src/openlayers/services/MapService';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorTileLayer from 'ol/layer/VectorTile';

var url = GlobeParameter.ChinaURL;
const mapObject = {
    "viewBounds": {
        "top": 1.0018754171380693E7,
        "left": -1.0018754171380727E7,
        "bottom": -1.0018754171380745E7,
        "leftBottom": {
            "x": -1.0018754171380727E7,
            "y": -1.0018754171380745E7
        },
        "right": 1.0018754171380712E7,
        "rightTop": {
            "x": 1.0018754171380712E7,
            "y": 1.0018754171380693E7
        }
    }, "bounds": {
        "top": 2.0037508342789087E7,
        "left": -2.0037508342789248E7,
        "bottom": -2.003750834278914E7,
        "leftBottom": {
            "x": -2.0037508342789248E7,
            "y": -2.003750834278914E7
        },
        "right": 2.0037508342789244E7,
        "rightTop": {
            "x": 2.0037508342789244E7,
            "y": 2.0037508342789087E7
        }
    }, "viewer": {
        "leftTop": {
            "x": 0,
            "y": 0
        },
        "top": 0,
        "left": 0,
        "bottom": 256,
        "rightBottom": {
            "x": 256,
            "y": 256
        },
        "width": 256,
        "right": 256,
        "height": 256
    }, "coordUnit": "METER", visibleScales: [],
}
describe('openlayers_VectorTileSuperMapRest', () => {
    var testDiv, map, vectorTileOptions, vectorTileSource, originalTimeout, vectorLayer;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
            return Promise.resolve(new Response(JSON.stringify(mapObject)));
        });

    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
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
            vectorTileOptions.tileLoadFunction = (tile) => {
                tile.setLoader(() => {
                    tile.setFeatures([])
                })
            };
            vectorTileSource = new VectorTileSuperMapRest(vectorTileOptions);
            vectorTileSource.once('tileloadend', () => {
                expect(vectorTileOptions).not.toBeNull();
                expect(vectorTileOptions.crossOrigin).toBe("anonymous");
                expect(vectorTileSource).not.toBeNull();
                done();
            })
            vectorLayer = new VectorTileLayer({
                source: vectorTileSource
            });
            map.addLayer(vectorLayer);


        });

    });
    it('custom_tileLoadFunction', (done) => {
        var spy = jasmine.createSpy('test')
        var tileLoadFunction = (tile) => {
            tile.setLoader(() => {
                spy();
                tile.setFeatures([])
            })
        };
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
            vectorLayer.getSource().once('tileloadend', () => {
                expect(vectorTileOptions).not.toBeNull();
                expect(spy).toHaveBeenCalled();
                done();

            })
        });


    });
});