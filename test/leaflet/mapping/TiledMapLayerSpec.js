import {tiledMapLayer} from '../../../src/leaflet/mapping/TiledMapLayer';

var url = GlobeParameter.ChinaURL;
describe('leaflet_TiledMapLayer', () => {
    var originalTimeout;
    var testDiv, map, tiledMapLayerObject;
    beforeAll(() => {
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        document.body.appendChild(testDiv);
        map = L.map('map', {
            center: [0, 0],
            maxZoom: 18,
            zoom: 1
        });
        tiledMapLayerObject = tiledMapLayer(url).addTo(map);
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
        map.remove();
    });

    it('initialize', () => {
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.prjCoordSys).toBeNull();
    });

    it("getTileUrl, getScale", () => {
        var tempOptions = {
            prjCoordSys: {"epsgCode": 3857}
        };
        var tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.prjCoordSys.epsgCode).toBe(3857);
        var coords = L.point(1, 4);
        var tileUrl = tiledMapLayerObject.getTileUrl(coords);
        var tileUrlArray = tileUrl.split('?');
        expect(tileUrlArray[0]).toBe(url + '/tileImage.png');
        var scale = tiledMapLayerObject.getScale(1);
        expect(scale).toBe(3.3803271432053105e-9);
    });
    it("getTileUrl_tileProxy", () => {
        var tempOptions = {
            tileProxy: 'tileProxy'
        };
        var tiledMapLayerObject = tiledMapLayer(url, tempOptions).addTo(map);
        // tiledMapLayerObject._crs = map.options.crs;
        expect(tiledMapLayerObject).not.toBeNull();
        var coords = L.point(1, 4);
        var tileUrl = tiledMapLayerObject.getTileUrl(coords);
    });

    it('changeTilesVersion', () => {
        var sourceUrl = "http://117.122.248.69:8090//iserver/services/map-ChinaProvinces/rest/maps/ChinaProvinces";
        var tiledMapLayerObject = tiledMapLayer(sourceUrl);
        tiledMapLayerObject.nextTilesVersion();
        expect(tiledMapLayerObject.tempIndex).toBe(0);
        tiledMapLayerObject.lastTilesVersion();
        expect(tiledMapLayerObject.tempIndex).toBe(-2);
    });
});