require('../../../src/leaflet/mapping/TiledMapLayer');

var url = GlobeParameter.ChinaURL;
describe('leaflet_TiledMapLayer', function () {
    var originalTimeout;
    var testDiv, map , tiledMapLayerObject;
    beforeAll(function () {
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
        tiledMapLayerObject = L.supermap.tiledMapLayer(url).addTo(map);
    });
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(function () {
        document.body.removeChild(testDiv);
        map.remove();
    });

    it('constructor test', function () {
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.prjCoordSys).toBeNull();
    });

    it("getTileUrl and getScale test", function () {
        tiledMapLayerObject = null;
        var tempOptions = {
            prjCoordSys: {"epsgCode":3857},
        };
        tiledMapLayerObject = L.supermap.tiledMapLayer(url,tempOptions).addTo(map);

        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.prjCoordSys.epsgCode).toBe(3857);

        var coords = L.point(1, 4);
        var tileUrl = tiledMapLayerObject.getTileUrl(coords);
        var tileUrlArray = tileUrl.split('?');
        expect(tileUrlArray[0]).toBe('http://localhost:8090/iserver/services/map-china400/rest/maps/China/tileImage.png');
        expect(tileUrlArray[1]).toBe('width=256&height=256&redirect=false&transparent=false&cacheEnabled=true&prjCoordSys=%7B%22epsgCode%22:3857%7D&origin=%7B%22x%22:-20037508.342789244,%22y%22:20037508.342789244%7D&overlapDisplayed=false&scale=3.3803271432053105e-9&x=1&y=4');
        var scale = tiledMapLayerObject.getScale(1);
        expect(scale).toBe(3.3803271432053105e-9);
    });

    it('changeTilesVersion test', function () {
        tiledMapLayerObject = null;
        var sourceUrl = "http://117.122.248.69:8090//iserver/services/map-ChinaProvinces/rest/maps/ChinaProvinces";
        tiledMapLayerObject = L.supermap.tiledMapLayer(sourceUrl);

        tiledMapLayerObject.nextTilesVersion();
        expect(tiledMapLayerObject.tempIndex).toBe(0);
        tiledMapLayerObject.lastTilesVersion();
        expect(tiledMapLayerObject.tempIndex).toBe(-2);
    });
});