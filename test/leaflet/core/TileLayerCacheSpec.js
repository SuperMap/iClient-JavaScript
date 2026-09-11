import '../../../src/leaflet/core/Base';
import { tiledMapLayer } from '../../../src/leaflet/mapping/TiledMapLayer';
import { baiduTileLayer } from '../../../src/leaflet/mapping/BaiduTileLayer';
import { wmtsLayer } from '../../../src/leaflet/mapping/TileLayer.WMTS';
import L from 'leaflet';

var PIXEL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

function whenImageReady(img, callback) {
    if (img.complete && img.naturalWidth) {
        callback();
        return;
    }
    img.onload = function () {
        callback();
    };
    img.onerror = function () {
        callback();
    };
}

function waitLayerLoad(layer, callback) {
    if (!layer._loading && layer._noTilesToLoad()) {
        L.Util.requestAnimFrame(callback);
        return;
    }
    layer.once('load', function () {
        L.Util.requestAnimFrame(callback);
    });
}

describe('TileLayerCache', () => {
    var testDiv, map, originalTimeout;

    beforeAll(() => {
        testDiv = document.createElement('div');
        testDiv.style.width = '256px';
        testDiv.style.height = '256px';
        document.body.appendChild(testDiv);
        map = L.map(testDiv, {
            fadeAnimation: false,
            zoomAnimation: false,
            markerZoomAnimation: false,
            center: [0, 0],
            zoom: 2,
            maxZoom: 18
        });
    });

    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        map.eachLayer(function (layer) {
            map.removeLayer(layer);
        });
        map.setView([0, 0], 2, { animate: false });
    });

    afterAll(() => {
        map.remove();
        document.body.removeChild(testDiv);
    });

    it('L.TileLayer 默认关闭瓦片内存缓存', () => {
        var layer = L.tileLayer(PIXEL);
        expect(layer.options.tileCache).toBe(false);
        expect(layer.options.tileCacheZoomRange).toBe(5);
        expect(layer.options.maxOverzooming).toBe(8);
        expect(layer.options.maxUnderzooming).toBe(3);
    });

    it('mapping 下 TileLayer 子类继承缓存参数', () => {
        var tiled = tiledMapLayer('http://localhost/map');
        var baidu = baiduTileLayer();
        var wmts = wmtsLayer('http://localhost/wmts', { layer: 'test', tilematrixSet: 'c' });
        expect(tiled.options.tileCache).toBe(false);
        expect(baidu.options.tileCache).toBe(false);
        expect(wmts.options.tileCache).toBe(false);
        expect(tiled.options.tileCacheZoomRange).toBe(5);
    });

    it('可以通过 tileCache 开启瓦片内存缓存', () => {
        var layer = L.tileLayer(PIXEL, { tileCache: true });
        expect(layer._isTileCacheEnabled()).toBe(true);
    });

    it('默认按视野和 tileCacheZoomRange 动态计算缓存上限', () => {
        var layer = L.tileLayer(PIXEL, { tileCache: true });
        layer.addTo(map);
        // 256x256 容器、256 瓦片：(ceil(256/256)+1)^2 * 5 = 20
        expect(layer.options.tileCacheZoomRange).toBe(5);
        expect(layer._getMaxTileCacheSize()).toBe(20);
    });

    it('tileCacheZoomRange 会改变动态缓存上限', () => {
        var layer = L.tileLayer(PIXEL, { tileCache: true, tileCacheZoomRange: 2 });
        layer.addTo(map);
        // 256x256 容器、256 瓦片：(ceil(256/256)+1)^2 * 2 = 8
        expect(layer._getMaxTileCacheSize()).toBe(8);
    });

    it('tileCacheZoomRange 为 0 时关闭瓦片内存缓存', () => {
        var layer = L.tileLayer(PIXEL, { tileCache: true, tileCacheZoomRange: 0 });
        expect(layer._isTileCacheEnabled()).toBe(false);
    });

    it('移除已加载瓦片时写入缓存，再次添加时复用且不再请求', (done) => {
        var layer = L.tileLayer('http://example.com/{z}/{x}/{y}.png', { tileCache: true });
        var requestCount = 0;
        layer.getTileUrl = function () {
            requestCount++;
            return PIXEL;
        };
        layer.addTo(map);

        waitLayerLoad(layer, function () {
            var key = Object.keys(layer._tiles)[0];
            expect(key).toBeDefined();
            var tile = layer._tiles[key];
            var coords = tile.coords;
            var firstCount = requestCount;
            expect(firstCount).toBeGreaterThan(0);
            expect(tile.loaded).toBeTruthy();

            layer._removeTile(key);
            expect(layer._tiles[key]).toBeUndefined();
            expect(layer._tileCache.has(key)).toBe(true);

            var createSpy = spyOn(layer, 'createTile').and.callThrough();
            var fragment = document.createDocumentFragment();
            layer._addTile(coords, fragment);
            expect(createSpy).not.toHaveBeenCalled();
            expect(requestCount).toBe(firstCount);
            expect(layer._tiles[key].el._fromTileCache).toBe(true);
            done();
        });
    });

    it('tileCache 为 false 时移除瓦片不写入缓存', (done) => {
        var layer = L.tileLayer('http://example.com/{z}/{x}/{y}.png', { tileCache: false });
        layer.getTileUrl = function () {
            return PIXEL;
        };
        layer.addTo(map);

        waitLayerLoad(layer, function () {
            var key = Object.keys(layer._tiles)[0];
            layer._removeTile(key);
            expect(layer._tileCache).toBeUndefined();
            done();
        });
    });

    it('超出缓存上限时按 LRU 淘汰，并优先淘汰当前级别瓦片', (done) => {
        var layer = L.tileLayer(PIXEL, { tileCache: true, tileCacheZoomRange: 0.5 });
        layer._tileZoom = 5;
        var img1 = document.createElement('img');
        var img2 = document.createElement('img');
        var img3 = document.createElement('img');
        img1.src = PIXEL;
        img2.src = PIXEL;
        img3.src = PIXEL;

        whenImageReady(img1, function () {
            whenImageReady(img2, function () {
                whenImageReady(img3, function () {
                    layer._putTileCache('0:0:3', img1, 3);
                    layer._putTileCache('0:0:5', img2, 5);
                    layer._putTileCache('1:0:5', img3, 5);
                    expect(layer._tileCache.size).toBe(2);
                    expect(layer._tileCache.has('0:0:3')).toBe(true);
                    expect(layer._tileCache.has('0:0:5')).toBe(false);
                    expect(layer._tileCache.has('1:0:5')).toBe(true);
                    done();
                });
            });
        });
    });

    it('redraw 会清空瓦片内存缓存', (done) => {
        var layer = L.tileLayer(PIXEL, { tileCache: true });
        var img = document.createElement('img');
        img.src = PIXEL;
        whenImageReady(img, function () {
            layer._putTileCache('0:0:1', img, 1);
            expect(layer._tileCache.size).toBe(1);
            layer.redraw();
            expect(layer._tileCache.size).toBe(0);
            done();
        });
    });

    it('放大后仍保留原级别四周瓦片，缩小不再重复请求', (done) => {
        var layer = L.tileLayer('http://example.com/{z}/{x}/{y}.png', { tileCache: true });
        var requested = {};
        layer.getTileUrl = function (coords) {
            var key = coords.x + ':' + coords.y + ':' + (coords.z != null ? coords.z : layer._tileZoom);
            requested[key] = (requested[key] || 0) + 1;
            return PIXEL;
        };
        layer.addTo(map);
        map.setView([0, 0], 2, { animate: false });

        waitLayerLoad(layer, function () {
            var zoom2Keys = Object.keys(layer._tiles).filter(function (key) {
                return layer._tiles[key].coords.z === 2;
            });
            expect(zoom2Keys.length).toBeGreaterThan(0);
            zoom2Keys.forEach(function (key) {
                expect(requested[key]).toBe(1);
            });

            map.setView([0, 0], 4, { animate: false });
            waitLayerLoad(layer, function () {
                zoom2Keys.forEach(function (key) {
                    expect(layer._tiles[key] || (layer._tileCache && layer._tileCache.get(key))).toBeDefined();
                });

                map.setView([0, 0], 2, { animate: false });
                waitLayerLoad(layer, function () {
                    zoom2Keys.forEach(function (key) {
                        expect(requested[key]).toBe(1);
                        expect(layer._tiles[key]).toBeDefined();
                    });
                    done();
                });
            });
        });
    });
});
