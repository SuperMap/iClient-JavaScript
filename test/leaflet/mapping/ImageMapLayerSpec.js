require('../../../src/leaflet/mapping/ImageMapLayer');

var url = GlobeParameter.imageURL;
describe('TiledMapLayer', function () {
    var originalTimeout;
    var testDiv, map , imageLayerObject;
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
        imageLayerObject = L.supermap.imageMapLayer(url).addTo(map);
    });
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        imageLayerObject = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(function () {
        document.body.removeChild(testDiv);
        map.remove();
    });

    it('constructor test', function () {
        var tempOptions = {
            redirect:true,
            prjCoordSys: {"epsgCode": 3857}
        };
        imageLayerObject = L.supermap.imageMapLayer(url, tempOptions);
        expect(imageLayerObject).not.toBeNull();
        expect(imageLayerObject.options.redirect).toBe(true);
        expect(imageLayerObject.options.prjCoordSys.epsgCode).toBe(3857);
    });

    it('getTileUrl test', function () {
        var tempOptions = {
            redirect:true,
            prjCoordSys: {"epsgCode": 4326}
        };
        imageLayerObject = L.supermap.imageMapLayer(url, tempOptions).addTo(map);
        expect(imageLayerObject).not.toBeNull();
        expect(imageLayerObject.options.redirect).toBe(true);
        expect(imageLayerObject.options.prjCoordSys.epsgCode).toBe(4326);

        var coords = L.point(120.14, 30.24);
        var tileUrl = imageLayerObject.getTileUrl(coords);
        expect(tileUrl).toBe("http://localhost:8090/iserver/services/map-world/rest/maps/世界地图_Day/image.png?width=256&height=256&redirect=true&transparent=false&cacheEnabled=true&prjCoordSys={\"epsgCode\":4326}&overlapDisplayed=true&viewBounds={\"leftBottom\" : {\"x\":2387268743.959911,\"y\":-20037508.34278071},\"rightTop\" : {\"x\":2407306252.3027,\"y\":-20037508.34278071}}");
    });
});