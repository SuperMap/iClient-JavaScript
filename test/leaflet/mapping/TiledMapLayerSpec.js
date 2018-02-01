require('../../../src/leaflet/mapping/TiledMapLayer');

var url = GlobeParameter.ChinaURL;
describe('leaflet_TiledMapLayer', function () {
    var originalTimeout;
    var testDiv, map, tiledMapLayerObject;
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

    it('initialize', function () {
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.prjCoordSys).toBeNull();
    });

    it("getTileUrl, getScale", function () {
        var tempOptions = {
            prjCoordSys: {"epsgCode": 3857}
        };
        var tiledMapLayerObject = L.supermap.tiledMapLayer(url, tempOptions).addTo(map);
        expect(tiledMapLayerObject).not.toBeNull();
        expect(tiledMapLayerObject.options.prjCoordSys.epsgCode).toBe(3857);
        var coords = L.point(1, 4);
        var tileUrl = tiledMapLayerObject.getTileUrl(coords);
        var tileUrlArray = tileUrl.split('?');
        expect(tileUrlArray[0]).toBe(url + '/tileImage.png');
        expect(tileUrlArray[1]).toBe('width=256&height=256&redirect=false&transparent=false&cacheEnabled=true&prjCoordSys=%7B%22epsgCode%22:3857%7D&origin=%7B%22x%22:-20037508.342789244,%22y%22:20037508.342789244%7D&overlapDisplayed=false&scale=3.3803271432053105e-9&x=1&y=4');
        var scale = tiledMapLayerObject.getScale(1);
        expect(scale).toBe(3.3803271432053105e-9);
    });
    it("getTileUrl_tileProxy", function () {
        var tempOptions = {
            tileProxy: 'tileProxy'
        };
        var tiledMapLayerObject = L.supermap.tiledMapLayer(url, tempOptions).addTo(map);
        // tiledMapLayerObject._crs = map.options.crs;
        expect(tiledMapLayerObject).not.toBeNull();
        var coords = L.point(1, 4);
        var tileUrl = tiledMapLayerObject.getTileUrl(coords);
        expect(tileUrl).toBe('tileProxyhttp%3A%2F%2Flocalhost%3A8090%2Fiserver%2Fservices%2Fmap-china400%2Frest%2Fmaps%2FChina%2FtileImage.png%3Fwidth%3D256%26height%3D256%26redirect%3Dfalse%26transparent%3Dfalse%26cacheEnabled%3Dtrue%26origin%3D%257B%2522x%2522%3A-20037508.342789244%2C%2522y%2522%3A20037508.342789244%257D%26overlapDisplayed%3Dfalse%26scale%3D3.3803271432053105e-9%26x%3D1%26y%3D4');
    });

    it('changeTilesVersion', function () {
        var sourceUrl = "http://117.122.248.69:8090//iserver/services/map-ChinaProvinces/rest/maps/ChinaProvinces";
        var tiledMapLayerObject = L.supermap.tiledMapLayer(sourceUrl);
        tiledMapLayerObject.nextTilesVersion();
        expect(tiledMapLayerObject.tempIndex).toBe(0);
        tiledMapLayerObject.lastTilesVersion();
        expect(tiledMapLayerObject.tempIndex).toBe(-2);
    });
});