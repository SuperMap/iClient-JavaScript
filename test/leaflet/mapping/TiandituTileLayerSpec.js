import { tiandituTileLayer } from '../../../src/leaflet/mapping/TiandituTileLayer';
import { mockCreateTile } from '../../tool/mock_leaflet';
import { TianDiTu_WGS84CRS, TianDiTu_MercatorCRS } from '../../../src/leaflet/core/ExtendsCRS';

describe('leaflet_TiandituTileLayer', () => {
    var originalTimeout, map, layer,testDiv;
    beforeAll(() => {
        testDiv = document.createElement('div');
        testDiv.setAttribute('id', 'map');
        testDiv.style.styleFloat = 'left';
        testDiv.style.marginLeft = '8px';
        testDiv.style.marginTop = '50px';
        testDiv.style.width = '500px';
        testDiv.style.height = '500px';
        mockCreateTile();
        document.body.appendChild(testDiv);
        map = L.map('map', {
            center: [0, 0],
            maxZoom: 17,
            zoom: 1,
            crs: TianDiTu_MercatorCRS
        });
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        if (layer) {
            layer.remove();
            layer = null;
        }
    });
    afterAll(() => {
        document.body.removeChild(testDiv);
        map.remove();
    });

    it('initialize', () => {
        layer = tiandituTileLayer({
            key: '123456'
        }).addTo(map);
        expect(layer).not.toBeNull();
        expect(layer.options.layer).toBe('vec');
        expect(layer.options.isLabel).toBeFalse;
        expect(layer.options.tilematrixSet).toBe('w');
        expect(layer.options.maxZoom).toBe(17);
        expect(layer.options.requestEncoding).toBe('KVP');
        expect(layer.options.key).toBe('123456');
        expect(layer._url).toBe('https://t{s}.tianditu.gov.cn/vec_w/wmts?tk=123456');
    });

    it('initialize_img', () => {
        layer = tiandituTileLayer({
            layerType: 'img',
            isLabel: true,
            key: '123456'
        }).addTo(map);
        expect(layer).not.toBeNull();
        expect(layer.options.layer).toBe('cia');
        expect(layer.options.isLabel).toBeTrue;
        expect(layer.options.tilematrixSet).toBe('w');
        expect(layer.options.maxZoom).toBe(17);
        expect(layer.options.requestEncoding).toBe('KVP');
        expect(layer.options.key).toBe('123456');
        expect(layer._url).toBe('https://t{s}.tianditu.gov.cn/cia_w/wmts?tk=123456');
    });

    it('initialize_ter', () => {
        layer = tiandituTileLayer({
            layerType: 'ter',
            key: '123456'
        }).addTo(map);
        expect(layer).not.toBeNull();
        expect(layer.options.layer).toBe('ter');
        expect(layer.options.isLabel).toBeFalse;
        expect(layer.options.tilematrixSet).toBe('w');
        expect(layer.options.maxZoom).toBe(13);
        expect(layer.options.requestEncoding).toBe('KVP');
        expect(layer.options.key).toBe('123456');
        expect(layer._url).toBe('https://t{s}.tianditu.gov.cn/ter_w/wmts?tk=123456');
    });

    it('initialize_4326', () => {
        map.options.crs = TianDiTu_WGS84CRS;
        layer = tiandituTileLayer({
            layerType: 'ter',
            key: '123456'
        }).addTo(map);
        expect(layer).not.toBeNull();
        expect(layer.options.layer).toBe('ter');
        expect(layer.options.isLabel).toBeFalse;
        expect(layer.options.tilematrixSet).toBe('c');
        expect(layer.options.maxZoom).toBe(13);
        expect(layer.options.requestEncoding).toBe('KVP');
        expect(layer.options.key).toBe('123456');
        expect(layer._url).toBe('https://t{s}.tianditu.gov.cn/ter_c/wmts?tk=123456');
        map.options.crs = TianDiTu_MercatorCRS;
    });

    it('initialize_url', () => {
        layer = tiandituTileLayer({
            url: 'https://my.tianditu/{layer}_{proj}/wmts?',
            key: '123456'
        }).addTo(map);
        expect(layer).not.toBeNull();
        expect(layer.options.layer).toBe('vec');
        expect(layer.options.isLabel).toBeFalse;
        expect(layer.options.tilematrixSet).toBe('w');
        expect(layer._url).toBe('https://my.tianditu/vec_w/wmts?tk=123456');
    });

    it('getTileUrl', () => {
        var coords = { x: 0, y: 0, z: 0 };
        layer = tiandituTileLayer({
            layerType: 'img',
            isLabel: true,
            key: '123456'
        }).addTo(map);
        expect(layer).not.toBeNull();
        expect(layer.options.layer).toBe('cia');
        expect(layer.options.isLabel).toBeTrue;
        expect(layer.options.tilematrixSet).toBe('w');
        expect(layer.options.maxZoom).toBe(17);
        expect(layer.options.requestEncoding).toBe('KVP');
        expect(layer.options.key).toBe('123456');
        expect(layer._url).toBe('https://t{s}.tianditu.gov.cn/cia_w/wmts?tk=123456');
        expect(layer.getTileUrl(coords)).toBe(
            'https://t0.tianditu.gov.cn/cia_w/wmts?tk=123456&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=cia&tilematrix=2&tilerow=0&tilecol=0'
        );
    });

    it('getTileUrl_remove', () => {
        var coords = { x: 0, y: 0, z: 0 };
        layer = tiandituTileLayer({
            layerType: 'img',
            isLabel: true,
            key: '123456'
        }).addTo(map);
        expect(layer.getTileUrl(coords)).toBe(
            'https://t0.tianditu.gov.cn/cia_w/wmts?tk=123456&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=cia&tilematrix=2&tilerow=0&tilecol=0'
        );
        layer.remove();
        layer.addTo(map);
        expect(layer.getTileUrl(coords)).toBe(
            'https://t0.tianditu.gov.cn/cia_w/wmts?tk=123456&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=cia&tilematrix=2&tilerow=0&tilecol=0'
        );
    });
});
