import {graphicLayer} from '../../../src/leaflet/overlay/GraphicLayer';
import {tiledMapLayer} from '../../../src/leaflet/mapping/TiledMapLayer';
import {circleStyle} from '../../../src/leaflet/overlay/graphic/CircleStyle';
import {graphic} from '../../../src/leaflet/overlay/graphic/Graphic';

var url = "http://supermapiserver:8090/iserver/services/map-world/rest/maps/World";
describe('leaflet_GraphicLayer', () => {
    var originalTimeout;
    var testDiv, map;
    beforeAll(() => {
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
        tiledMapLayer(url).addTo(map);
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        map.remove();
        window.document.body.removeChild(testDiv);
    });

    it('initialize', (done) => {
        var colorCount = 5, count = 5;
        var graphics = [];
        var e = 45;
        var randomCircleStyles = [];
        for (var i = 0; i < colorCount; i++) {
            randomCircleStyles.push(circleStyle({
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
            graphics[j] = graphic({
                _latlng: L.latLng(coordinates[0], coordinates[1]),
                _canvas: randomCircleStyles[Math.floor(Math.random() * colorCount)].getCanvas()
            });
        }
        var layer = graphicLayer(graphics).addTo(map);
        setTimeout(() => {
            expect(layer.graphics.length).toEqual(count);
            for (var i = 0; i < layer.graphics.length; i++) {
                expect(layer.graphics[i]._canvas).not.toBeNull();
                expect(layer.graphics[i]._latlng).not.toBeNull();
            }
            var isContainsPoint = layer._containsPoint();
            expect(isContainsPoint).not.toBe("false");
            //map.remove()时，canvas渲染的场景下render会先移除canvas的ctx，而path的移除会有重绘操作。
            //从而引起刷新延迟会报错，故在此移除重绘
            layer.on('remove', () => {
                var requestAnimId = map.getRenderer(layer)._redrawRequest;
                (requestAnimId != null) && L.Util.cancelAnimFrame(requestAnimId);
                done();
            });
            layer.remove();
        }, 1000)
    });
});

