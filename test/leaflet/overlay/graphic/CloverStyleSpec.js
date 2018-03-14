import {graphicLayer} from '../../../../src/leaflet/overlay/GraphicLayer';
import {tiledMapLayer} from '../../../../src/leaflet/mapping/TiledMapLayer';
import {graphic} from '../../../../src/leaflet/overlay/graphic/Graphic';
import {cloverStyle} from '../../../../src/leaflet/overlay/graphic/CloverStyle';

var url = "http://supermapiserver:8090/iserver/services/map-world/rest/maps/World";
describe('leaflet_CloverStyle', () => {
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

    it('initialize, getStyle', (done) => {
        var count = 6;
        var graphics = [];
        var e = 45;
        var clovers = [];
        var radius = [10, 14, 18];
        var styles = [{angle: 60, count: 3}, {angle: 45, count: 4}, {angle: 30, count: 6}];
        const randCount = 9;
        for (var i = 0; i < radius.length; i++) {
            for (var j = 0; j < styles.length; j++) {
                clovers.push(cloverStyle({
                    radius: radius[i],
                    angle: styles[j].angle,
                    count: styles[j].count,
                    color: "rgba(0,166,0,1)",
                    fillColor: "rgba(0,200,0,0.6)",
                    fillOpacity: 1,
                    fill: true
                }));
            }
        }
        //设置每个点的经纬度和传入三叶草样式
        for (var i = 0; i < count; ++i) {
            var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
            graphics[i] = graphic({
                latlng: L.latLng(coordinates[0], coordinates[1]),
                style: clovers[Math.floor(Math.random() * randCount)].getStyle()
            });
        }
        //将三叶草要素风格画在地图上
        var layer = graphicLayer(graphics).addTo(map);

        setTimeout(() => {
            expect(layer.graphics.length).toEqual(count);
            for (var i = 0; i < layer.graphics.length; i++) {
                expect(layer.graphics[i]._style).not.toBeNull();
                expect(layer.graphics[i]._latlng).not.toBeNull();
                expect(layer.graphics[i]._latlng.lat).not.toBeNull();
                expect(layer.graphics[i]._latlng.lng).not.toBeNull();
            }
            //map.remove()时，canvas渲染的场景下render会先移除canvas的ctx，而path的移除会有重绘操作。
            //从而引起刷新延迟会报错，故在此移除重绘
            layer.on('remove', () => {
                var requestAnimId = map.getRenderer(layer)._redrawRequest;
                (requestAnimId != null) && L.Util.cancelAnimFrame(requestAnimId);
                done();
            });
            layer.remove();
            done();
        }, 1000)
    });
});

