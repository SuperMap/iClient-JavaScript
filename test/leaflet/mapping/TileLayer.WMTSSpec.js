import {wmtsLayer} from '../../../src/leaflet/mapping/TileLayer.WMTS';

var url = GlobeParameter.WMTSURL;
describe('leaflet_TileLayerWMTS', () => {
    var originalTimeout;
    var WMTStiledMapLayerObject;

    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('initialize_badRequestEncoding', () => {
        var option = {
            layer: "China",
            style: "default",
            tilematrixSet: "Custom_China",
            format: "image/png",
            requestEncoding: '',
            attribution: "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <span>© <a href='http://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>"
        };
        WMTStiledMapLayerObject = wmtsLayer(url, option);
        expect(WMTStiledMapLayerObject).not.toBeNull();
        expect(WMTStiledMapLayerObject.options.layer).toBe(option.layer);
        expect(WMTStiledMapLayerObject.options.style).toBe(option.style);
        expect(WMTStiledMapLayerObject.options.tilematrixSet).toBe(option.tilematrixSet);
        expect(WMTStiledMapLayerObject.options.format).toBe(option.format);
        expect(WMTStiledMapLayerObject.options.requestEncoding).toBe("KVP");
    });

    it("getTileUrl_KVPRequestEncoding", () => {
        var coords = {x: 0, y: 0, z: 0};
        var option = {
            layer: "China",
            style: "default",
            tilematrixSet: "Custom_China",
            format: "image/png",
            requestEncoding: 'KVP'
        };
        WMTStiledMapLayerObject = wmtsLayer(url, option);
        expect(WMTStiledMapLayerObject).not.toBeNull();
        expect(WMTStiledMapLayerObject.options.layer).toBe(option.layer);
        expect(WMTStiledMapLayerObject.options.style).toBe(option.style);
        expect(WMTStiledMapLayerObject.options.tilematrixSet).toBe(option.tilematrixSet);
        expect(WMTStiledMapLayerObject.options.format).toBe(option.format);
        expect(WMTStiledMapLayerObject.options.requestEncoding).toBe(option.requestEncoding);
        expect(WMTStiledMapLayerObject.getTileUrl(coords)).not.toBeNull();
        expect(WMTStiledMapLayerObject.getTileUrl(coords)).toBe(url + '?service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=Custom_China&format=image%2Fpng&width=256&height=256&layer=China&tilematrix=NaN&tilerow=0&tilecol=0');
    });

    it("getTileUrl_RESTRequestEncoding", () => {
        var coords = {x: 0, y: 0, z: 0};
        var option = {
            layer: "China",
            style: "default",
            tilematrixSet: "Custom_China",
            format: "image/png",
            requestEncoding: 'REST'
        };
        WMTStiledMapLayerObject = wmtsLayer(url, option);
        expect(WMTStiledMapLayerObject).not.toBeNull();
        expect(WMTStiledMapLayerObject.options.layer).toBe(option.layer);
        expect(WMTStiledMapLayerObject.options.style).toBe(option.style);
        expect(WMTStiledMapLayerObject.options.tilematrixSet).toBe(option.tilematrixSet);
        expect(WMTStiledMapLayerObject.options.format).toBe(option.format);
        expect(WMTStiledMapLayerObject.options.requestEncoding).toBe(option.requestEncoding);
        expect(WMTStiledMapLayerObject.getTileUrl(coords)).not.toBeNull();
        expect(WMTStiledMapLayerObject.getTileUrl(coords)).toBe(url + '/China/default/Custom_China/NaN/0/0.png');
    });

});