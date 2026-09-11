import '../../../src/leaflet/core/Base';
import { tiledMapLayer } from '../../../src/leaflet/mapping/TiledMapLayer';
import { baiduTileLayer } from '../../../src/leaflet/mapping/BaiduTileLayer';
import { wmtsLayer } from '../../../src/leaflet/mapping/TileLayer.WMTS';
import L from 'leaflet';

var PIXEL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

describe('TileLayerBuffer', () => {
    var testDiv, map;

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

    afterEach(() => {
        map.eachLayer(function (layer) {
            map.removeLayer(layer);
        });
        map.setView([0, 0], 2, { animate: false });
    });

    afterAll(() => {
        map.remove();
        document.body.removeChild(testDiv);
    });

    function pixelBoundsSize(layer) {
        var bounds = layer._getTiledPixelBounds(map.getCenter());
        return L.point(bounds.max.x - bounds.min.x, bounds.max.y - bounds.min.y);
    }

    function tileRange(layer) {
        return layer._pxBoundsToTileRange(layer._getTiledPixelBounds(map.getCenter()));
    }

    it('L.TileLayer 默认关闭视野外预加载', () => {
        var layer = L.tileLayer(PIXEL);
        expect(layer.options.bufferTiles).toBe(0);
    });

    it('mapping 下 TileLayer 子类继承 bufferTiles 默认值', () => {
        var tiled = tiledMapLayer('http://localhost/map');
        var baidu = baiduTileLayer();
        var wmts = wmtsLayer('http://localhost/wmts', { layer: 'test', tilematrixSet: 'c' });
        expect(tiled.options.bufferTiles).toBe(0);
        expect(baidu.options.bufferTiles).toBe(0);
        expect(wmts.options.bufferTiles).toBe(0);
    });

    it('bufferTiles 为 0 时不扩展像素范围', () => {
        var layer = L.tileLayer(PIXEL, { bufferTiles: 0 }).addTo(map);
        var size = map.getSize();
        var boundsSize = pixelBoundsSize(layer);
        expect(Math.abs(boundsSize.x - size.x)).toBeLessThan(1);
        expect(Math.abs(boundsSize.y - size.y)).toBeLessThan(1);
    });

    it('bufferTiles 为 1 时四边各扩展一圈瓦片', () => {
        var layer0 = L.tileLayer(PIXEL, { bufferTiles: 0 }).addTo(map);
        var layer1 = L.tileLayer(PIXEL, { bufferTiles: 1 }).addTo(map);
        var tileSize = layer1.getTileSize();
        var size0 = pixelBoundsSize(layer0);
        var size1 = pixelBoundsSize(layer1);
        expect(size1.x).toBe(size0.x + tileSize.x * 2);
        expect(size1.y).toBe(size0.y + tileSize.y * 2);

        var range0 = tileRange(layer0);
        var range1 = tileRange(layer1);
        expect(range1.min.x).toBe(range0.min.x - 1);
        expect(range1.max.x).toBe(range0.max.x + 1);
        expect(range1.min.y).toBe(range0.min.y - 1);
        expect(range1.max.y).toBe(range0.max.y + 1);
    });

    it('bufferTiles 支持小数圈数', () => {
        var layer0 = L.tileLayer(PIXEL, { bufferTiles: 0 }).addTo(map);
        var layerHalf = L.tileLayer(PIXEL, { bufferTiles: 0.5 }).addTo(map);
        var tileSize = layerHalf.getTileSize();
        var size0 = pixelBoundsSize(layer0);
        var sizeHalf = pixelBoundsSize(layerHalf);
        expect(sizeHalf.x).toBe(size0.x + tileSize.x);
        expect(sizeHalf.y).toBe(size0.y + tileSize.y);
    });
});
