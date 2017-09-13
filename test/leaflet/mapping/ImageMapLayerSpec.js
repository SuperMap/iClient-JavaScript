require('../../../src/leaflet/mapping/ImageMapLayer');

var url = GlobeParameter.imageURL;
describe('leaflet_ImageLayer', function () {
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
        expect(tileUrl).toBe("http://localhost:8090/iserver/services/map-world/rest/maps/%E4%B8%96%E7%95%8C%E5%9C%B0%E5%9B%BE_Day/image.png?width=256&height=256&redirect=true&transparent=false&cacheEnabled=true&prjCoordSys=%7B%22epsgCode%22:4326%7D&overlapDisplayed=true&viewBounds=%7B%22leftBottom%22%20:%20%7B%22x%22:2387268743.959911,%22y%22:-20037508.34278071%7D,%22rightTop%22%20:%20%7B%22x%22:2407306252.3027,%22y%22:-20037508.34278071%7D%7D");
    });
});