require('../../../src/leaflet/overlay/GraphicLayer');

var url = "http://supermapiserver:8090/iserver/services/map-world/rest/maps/World";
describe('leaflet_GraphicLayer', function () {
    var originalTimeout;
    var testDiv, map;
    beforeAll(function () {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);

        map = L.map('map', {
            preferCanvas: true,
            crs: L.CRS.EPSG4326,
            center: {lon: 0, lat: 0},
            maxZoom: 18,
            zoom: 1
        });
        L.supermap.tiledMapLayer(url).addTo(map);
    });
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(function () {
        window.document.body.removeChild(testDiv);
        map.remove();
    });

    it('initialize', function (done) {
        var colorCount = 5, count = 5;
        var graphics = [];
        var e = 45;
        var randomCircleStyles = [];
        for (var i = 0; i < colorCount; i++) {
            randomCircleStyles.push(L.supermap.circleStyle({
                color: '#3388ff',
                opacity: 1,
                radius: 2,
                fill: true,
                fillColor: '#3388ff',
                fillOpacity: 1
            }));
        }
        for (var j = 0; j < count; ++j) {
            var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
            graphics[j] = L.supermap.graphic({
                _latlng: L.latLng(coordinates[0], coordinates[1]),
                _canvas: randomCircleStyles[Math.floor(Math.random() * colorCount)].getCanvas()
            });
        }
        var graphicLayer = L.supermap.graphicLayer(graphics).addTo(map);
        setTimeout(function () {
            expect(graphicLayer.graphics.length).toEqual(count);
            for (var i = 0; i < graphicLayer.graphics.length; i++) {
                expect(graphicLayer.graphics[i]._canvas).not.toBeNull();
                expect(graphicLayer.graphics[i]._latlng).not.toBeNull();
            }
            var isContainsPoint = graphicLayer._containsPoint();
            expect(isContainsPoint).not.toBe("false");
            map.removeLayer(graphicLayer);
            done();
        }, 1000)
    });
});

