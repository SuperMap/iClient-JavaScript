import {webMap} from '../../../src/leaflet/mapping/WebMap';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

describe('leaflet_WebMap', () => {
    var originalTimeout;
    var testDiv;
    var server = "http://supermapiserver";
    var map;
    beforeEach(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        map = null;
        window.document.body.removeChild(testDiv);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('getResolutionsFromScales', () => {
        map = webMap();
        var scales = [2.9582935545E8, 1.47914677725E8, 7.39573388625E7, 3.697866943125E7, 1.8489334715625E7],
            units = "meter";
        var resolutions = map.getResolutionsFromScales(scales, 96, units);
        expect(resolutions.length).toEqual(5);
        expect(resolutions[0]).toEqual(78271.5169628125);
        expect(resolutions[1]).toEqual(39135.75848140625);
        expect(resolutions[2]).toEqual(19567.879240703125);
        expect(resolutions[3]).toEqual(9783.939620351563);
        expect(resolutions[4]).toEqual(4891.969810175781);
    });

    it('initialize_SUPERMAP_REST', (done) => {
        var id = 55;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_SUPERMAP_REST;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toEqual(55);
            expect(map.layers.length).toEqual(0);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(3);
            expect(mapInfo.center.x).toEqual(12947612.637209);
            expect(mapInfo.center.y).toEqual(4849929.4446858);
            expect(mapInfo.centerString).toBe("{\"x\":1.2947612637209E7,\"y\":4849929.4446858}");
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(3857);
            expect(mapInfo.extent.bottom).toEqual(4820577.6258243);
            expect(mapInfo.extent.left).toEqual(12886539.451609);
            expect(mapInfo.extent.leftBottom).toEqual(Object({x: 12886539.451609, y: 4820577.6258243}));
            expect(mapInfo.extent.right).toEqual(13008685.822809);
            expect(mapInfo.extent.top).toEqual(4879281.2635473);
            expect(mapInfo.extent.rightTop).toEqual(Object({x: 13008685.822809, y: 4879281.2635473}));
            expect(mapInfo.extentString).toBe("{\"top\":4879281.2635473,\"left\":1.2886539451609E7,\"bottom\":4820577.6258243,\"leftBottom\":{\"x\":1.2886539451609E7,\"y\":4820577.6258243},\"right\":1.3008685822809E7,\"rightTop\":{\"x\":1.3008685822809E7,\"y\":4879281.2635473}}");
            expect(mapInfo.id).toEqual(55);
            expect(mapInfo.layers.length).toEqual(1);
            expect(mapInfo.layers[0].title).toBe("China");
            expect(mapInfo.layers[0].id).toEqual(466);
            expect(mapInfo.layers[0].type).toBe("SUPERMAP_REST");
            expect(mapInfo.layers[0].layerType).toBe("BASE_LAYER");
            expect(mapInfo.layers[0].url).toBe("http://supermapiserver:8090/iserver/services/map-china400/rest/maps/China");
            expect(mapInfo.level).toEqual(11);
            expect(mapInfo.nickname).toBe("test");
            expect(mapInfo.sourceType).toBe("SUPERMAP_REST");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags[0]).toBe("系统地图");
            expect(mapInfo.thumbnail).toBe("http://supermapiserver:8092/services/../resources/thumbnail/map55.png");
            expect(mapInfo.title).toBe("China");
            expect(mapInfo.userName).toBe("testH");
            expect(map.options.server).toBe(server);
            done();
        }, 1000)
    });

    it('initialize_TIANDITU_VEC', (done) => {
        var id = 568205813;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_TIANDITU_VEC;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toBe(id);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(2);
            expect(mapInfo.center.x).toEqual(1.1691682145618E7);
            expect(mapInfo.center.y).toEqual(4191132.2395179);
            expect(mapInfo.centerString).toBe("{\"x\":1.1691682145618E7,\"y\":4191132.2395179}");
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(3857);
            expect(mapInfo.extent.bottom).toEqual(957540.19552102);
            expect(mapInfo.extent.left).toEqual(6701872.9400555);
            expect(mapInfo.extent.leftBottom).toEqual(Object({x: 6701872.9400555, y: 957540.19552102}));
            expect(mapInfo.extent.right).toEqual(1.668149135118E7);
            expect(mapInfo.extent.top).toEqual(7424724.2835148);
            expect(mapInfo.extent.rightTop).toEqual(Object({x: 1.668149135118E7, y: 7424724.2835148}));
            expect(mapInfo.extentString).toBe("{\"top\":7424724.2835148,\"left\":6701872.9400555,\"bottom\":957540.19552102,\"leftBottom\":{\"x\":6701872.9400555,\"y\":957540.19552102},\"right\":1.668149135118E7,\"rightTop\":{\"x\":1.668149135118E7,\"y\":7424724.2835148}}");
            expect(mapInfo.id).toBe(id);
            expect(mapInfo.layers.length).toEqual(1);
            expect(mapInfo.layers[0].title).toBe("天地图");
            expect(mapInfo.layers[0].id).toEqual(14020);
            expect(mapInfo.layers[0].type).toBe("TIANDITU_VEC");
            expect(mapInfo.layers[0].layerType).toBe("BASE_LAYER");
            expect(mapInfo.layers[0].url).toBe("http://tianditutest");
            expect(mapInfo.level).toEqual(3);
            expect(mapInfo.nickname).toBe("OnlineUser");
            expect(mapInfo.sourceType).toBe("MAPVIEWER");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags.length).toEqual(3);
            expect(mapInfo.thumbnail).toBe("https://supermapoltest/services/../resources/thumbnail/map568205813.png");
            expect(mapInfo.title).toBe("天地图-地图");
            expect(mapInfo.userName).toBe("361143");
            expect(map.options.server).toBe(server);
            done();
        }, 1000);
    });

    it('initialize_TIANDITU_IMG', (done) => {
        var id = 567946816;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_TIANDITU_IMG;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toBe(id);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(2);
            expect(mapInfo.center.x).toEqual(1.2091862266267E7);
            expect(mapInfo.center.y).toEqual(4204912.9392719);
            expect(mapInfo.centerString).toBe("{\"x\":1.2091862266267E7,\"y\":4204912.9392719}");
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(3857);
            expect(mapInfo.extent.bottom).toEqual(971320.89527502);
            expect(mapInfo.extent.left).toEqual(7102053.0607045);
            expect(mapInfo.extent.leftBottom).toEqual(Object({x: 7102053.0607045, y: 971320.89527502}));
            expect(mapInfo.extent.right).toEqual(1.708167147183E7);
            expect(mapInfo.extent.top).toEqual(7438504.9832688);
            expect(mapInfo.extent.rightTop).toEqual(Object({x: 1.708167147183E7, y: 7438504.9832688}));
            expect(mapInfo.extentString).toBe("{\"top\":7438504.9832688,\"left\":7102053.0607045,\"bottom\":971320.89527502,\"leftBottom\":{\"x\":7102053.0607045,\"y\":971320.89527502},\"right\":1.708167147183E7,\"rightTop\":{\"x\":1.708167147183E7,\"y\":7438504.9832688}}");
            expect(mapInfo.id).toBe(id);
            expect(mapInfo.layers.length).toEqual(1);
            expect(mapInfo.layers[0].title).toBe("天地图影像");
            expect(mapInfo.layers[0].id).toEqual(14010);
            expect(mapInfo.layers[0].type).toBe("TIANDITU_IMG");
            expect(mapInfo.layers[0].layerType).toBe("BASE_LAYER");
            expect(mapInfo.layers[0].url).toBe("http://tianditutest");
            expect(mapInfo.level).toEqual(3);
            expect(mapInfo.nickname).toBe("OnlineUser");
            expect(mapInfo.sourceType).toBe("MAPVIEWER");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags.length).toEqual(5);
            expect(mapInfo.thumbnail).toBe("https://supermapoltest/services/../resources/thumbnail/map567946816.png");
            expect(mapInfo.title).toBe("天地图-影像");
            expect(mapInfo.userName).toBe("361143");
            expect(map.options.server).toBe(server);
            done();
        }, 1000);
    });

    it('initialize_TIANDITU_TER', (done) => {
        var id = 2048499925;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_TIANDITU_TER;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toBe(id);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(2);
            expect(mapInfo.center.x).toEqual(1.1964671051224E7);
            expect(mapInfo.center.y).toEqual(4322320.2146969);
            expect(mapInfo.centerString).toBe("{\"x\":1.1964671051224E7,\"y\":4322320.2146969}");
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(3857);
            expect(mapInfo.extent.bottom).toEqual(-2.0037508342789E7);
            expect(mapInfo.extent.left).toEqual(-2.0037508342789E7);
            expect(mapInfo.extent.leftBottom).toEqual(Object({x: -2.0037508342789E7, y: -2.0037508342789E7}));
            expect(mapInfo.extent.right).toEqual(2.0037508342789E7);
            expect(mapInfo.extent.top).toEqual(2.0037508342789E7);
            expect(mapInfo.extent.rightTop).toEqual(Object({x: 2.0037508342789E7, y: 2.0037508342789E7}));
            expect(mapInfo.extentString).toBe("{\"top\":2.0037508342789E7,\"left\":-2.0037508342789E7,\"bottom\":-2.0037508342789E7,\"leftBottom\":{\"x\":-2.0037508342789E7,\"y\":-2.0037508342789E7},\"right\":2.0037508342789E7,\"rightTop\":{\"x\":2.0037508342789E7,\"y\":2.0037508342789E7}}");
            expect(mapInfo.id).toBe(id);
            expect(mapInfo.layers.length).toEqual(1);
            expect(mapInfo.layers[0].title).toBe("天地图地形");
            expect(mapInfo.layers[0].id).toEqual(14018);
            expect(mapInfo.layers[0].type).toBe("TIANDITU_TER");
            expect(mapInfo.layers[0].layerType).toBe("BASE_LAYER");
            expect(mapInfo.layers[0].url).toBe("http://tianditutest");
            expect(mapInfo.level).toEqual(3);
            expect(mapInfo.nickname).toBe("OnlineUser");
            expect(mapInfo.sourceType).toBe("MAPVIEWER");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags.length).toEqual(4);
            expect(mapInfo.thumbnail).toBe("https://supermapoltest/services/../resources/thumbnail/map2048499925.png");
            expect(mapInfo.title).toBe("天地图-地形");
            expect(mapInfo.userName).toBe("361143");
            expect(map.options.server).toBe(server);
            done();
        }, 1000);
    });

    it('initialize_BAIDU', (done) => {
        var id = 1123771109;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_BAIDU;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toBe(id);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(2);
            expect(mapInfo.center.x).toEqual(1.2094541100772E7);
            expect(mapInfo.center.y).toEqual(4430210.0261344);
            expect(mapInfo.centerString).toBe("{\"x\":1.2094541100772E7,\"y\":4430210.0261344}");
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(910112);
            expect(mapInfo.extent.bottom).toEqual(1722754.0261344);
            expect(mapInfo.extent.left).toEqual(7916621.100772);
            expect(mapInfo.extent.leftBottom).toEqual(Object({x: 7916621.100772, y: 1722754.0261344}));
            expect(mapInfo.extent.right).toEqual(1.6272461100772E7);
            expect(mapInfo.extent.top).toEqual(7137666.0261344);
            expect(mapInfo.extent.rightTop).toEqual(Object({x: 1.6272461100772E7, y: 7137666.0261344}));
            expect(mapInfo.extentString).toBe("{\"top\":7137666.0261344,\"left\":7916621.100772,\"bottom\":1722754.0261344,\"leftBottom\":{\"x\":7916621.100772,\"y\":1722754.0261344},\"right\":1.6272461100772E7,\"rightTop\":{\"x\":1.6272461100772E7,\"y\":7137666.0261344}}");
            expect(mapInfo.id).toBe(id);
            expect(mapInfo.layers.length).toEqual(1);
            expect(mapInfo.layers[0].title).toBe("百度地图");
            expect(mapInfo.layers[0].id).toEqual(14008);
            expect(mapInfo.layers[0].type).toBe("BAIDU");
            expect(mapInfo.layers[0].layerType).toBe("BASE_LAYER");
            expect(mapInfo.layers[0].url).toBe("http://online1.map.bdimg.com");
            expect(mapInfo.level).toEqual(2);
            expect(mapInfo.nickname).toBe("OnlineUser");
            expect(mapInfo.sourceType).toBe("BAIDU");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags.length).toEqual(3);
            expect(mapInfo.thumbnail).toBe("https://supermapoltest/services/../resources/thumbnail/map1123771109.png");
            expect(mapInfo.title).toBe("百度地图");
            expect(mapInfo.userName).toBe("361143");
            expect(map.options.server).toBe(server);
            done();
        }, 1000);
    });

    it('initialize_WMS', (done) => {
        var id = 419;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_WMS;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toEqual(419);
            expect(map.layers.length).toEqual(0);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(2);
            expect(mapInfo.center.x).toEqual(3.5001335163543E-11);
            expect(mapInfo.center.y).toEqual(-1.7998047496803E-11);
            expect(mapInfo.centerString).toBe("{\"x\":3.5001335163543E-11,\"y\":-1.7998047496803E-11}");
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(4326);
            expect(mapInfo.extent.bottom).toEqual(-276.67968750002);
            expect(mapInfo.extent.left).toEqual(-304.45312499996);
            expect(mapInfo.extent.leftBottom).toEqual(Object({x: -304.45312499996, y: -276.67968750002}));
            expect(mapInfo.extent.right).toEqual(304.45312500004);
            expect(mapInfo.extent.top).toEqual(276.67968749998);
            expect(mapInfo.extent.rightTop).toEqual(Object({x: 304.45312500004, y: 276.67968749998}));
            expect(mapInfo.extentString).toBe("{\"top\":276.67968749998,\"left\":-304.45312499996,\"bottom\":-276.67968750002,\"leftBottom\":{\"x\":-304.45312499996,\"y\":-276.67968750002},\"right\":304.45312500004,\"rightTop\":{\"x\":304.45312500004,\"y\":276.67968749998}}");
            expect(mapInfo.id).toEqual(419);
            expect(mapInfo.layers.length).toEqual(1);
            expect(mapInfo.layers[0].title).toBe("世界地图_Day_wms");
            expect(mapInfo.layers[0].id).toEqual(1358);
            expect(mapInfo.layers[0].type).toBe("WMS");
            expect(mapInfo.layers[0].layerType).toBe("BASE_LAYER");
            expect(mapInfo.layers[0].url).toBe("http://supermapiserver:8090/iserver/services/maps/wms130/世界地图_Day");
            expect(mapInfo.level).toEqual(1);
            expect(mapInfo.nickname).toBe("supermap");
            expect(mapInfo.sourceType).toBe("MAPVIEWER");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags[0]).toBe("系统地图");
            expect(mapInfo.thumbnail).toBe("https://supermapoltest/services/../resources/thumbnail/map419.png");
            expect(mapInfo.title).toBe("world-wms");
            expect(mapInfo.userName).toBe("48372");
            expect(map.options.server).toBe("http://supermapiserver");
            done();
        }, 1000)
    });

    it('initialize_WMTS', (done) => {
        var id = 612;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_WMTS;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toEqual(612);
            expect(map.layers.length).toEqual(0);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(2);
            expect(mapInfo.center.x).toEqual(0);
            expect(mapInfo.center.y).toEqual(-4.9737991503207e-13);
            expect(mapInfo.centerString).toBe("{\"x\":0,\"y\":-4.9737991503207E-13}");
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(4326);
            expect(mapInfo.extent.bottom).toEqual(-118.4765625);
            expect(mapInfo.extent.left).toEqual(-180.3515625);
            expect(mapInfo.extent.leftBottom).toEqual(Object({x: -180.3515625, y: -118.4765625}));
            expect(mapInfo.extent.right).toEqual(180.3515625);
            expect(mapInfo.extent.top).toEqual(118.4765625);
            expect(mapInfo.extent.rightTop).toEqual(Object({x: 180.3515625, y: 118.4765625}));
            expect(mapInfo.extentString).toBe("{\"top\":118.4765625,\"left\":-180.3515625,\"bottom\":-118.4765625,\"leftBottom\":{\"x\":-180.3515625,\"y\":-118.4765625},\"right\":180.3515625,\"rightTop\":{\"x\":180.3515625,\"y\":118.4765625}}");
            expect(mapInfo.id).toEqual(612);
            expect(mapInfo.layers.length).toEqual(1);
            expect(mapInfo.layers[0].title).toBe("ChinaWMTS");
            expect(mapInfo.layers[0].id).toEqual(2423);
            expect(mapInfo.layers[0].type).toBe("WMTS");
            expect(mapInfo.layers[0].layerType).toBe("BASE_LAYER");
            expect(mapInfo.layers[0].url).toBe("http://supermapiserver:8090/iserver/services/map-china400/wmts-china");
            expect(mapInfo.level).toEqual(1);
            expect(mapInfo.nickname).toBe("hua_zi");
            expect(mapInfo.sourceType).toBe("WMTS");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags[0]).toBe("wmts-rest");
            expect(mapInfo.thumbnail).toBe("https://supermapoltest/services/../resources/thumbnail/map612.png");
            expect(mapInfo.title).toBe("wmts-china");
            expect(mapInfo.userName).toBe("180065");
            expect(map.options.server).toBe("http://supermapiserver");
            done();
        }, 1000)
    });

    it('initialize_CLOUD', (done) => {
        var id = 359319824;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_CLOUD;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toBe(id);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(2);
            expect(mapInfo.center.x).toEqual(1.2375596515534E7);
            expect(mapInfo.center.y).toEqual(4341888.0939903);
            expect(mapInfo.centerString).toBe("{\"x\":1.2375596515534E7,\"y\":4341888.0939903}");
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(910111);
            expect(mapInfo.extent.bottom).toEqual(1108296.0494142);
            expect(mapInfo.extent.left).toEqual(7385787.3090777);
            expect(mapInfo.extent.leftBottom).toEqual(Object({x: 7385787.3090777, y: 1108296.0494142}));
            expect(mapInfo.extent.right).toEqual(1.736540572199E7);
            expect(mapInfo.extent.top).toEqual(7575480.1385664);
            expect(mapInfo.extent.rightTop).toEqual(Object({x: 1.736540572199E7, y: 7575480.1385664}));
            expect(mapInfo.extentString).toBe("{\"top\":7575480.1385664,\"left\":7385787.3090777,\"bottom\":1108296.0494142,\"leftBottom\":{\"x\":7385787.3090777,\"y\":1108296.0494142},\"right\":1.736540572199E7,\"rightTop\":{\"x\":1.736540572199E7,\"y\":7575480.1385664}}");
            expect(mapInfo.id).toBe(id);
            expect(mapInfo.layers.length).toEqual(1);
            expect(mapInfo.layers[0].title).toBe("高德地图");
            expect(mapInfo.layers[0].id).toEqual(14007);
            expect(mapInfo.layers[0].type).toBe("CLOUD");
            expect(mapInfo.layers[0].layerType).toBe("BASE_LAYER");
            expect(mapInfo.layers[0].url).toBe("http://supermapcloudtest/FileService/image");
            expect(mapInfo.level).toEqual(1);
            expect(mapInfo.nickname).toBe("OnlineUser");
            expect(mapInfo.sourceType).toBe("CLOUD");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags.length).toEqual(4);
            expect(mapInfo.thumbnail).toBe("https://supermapoltest/services/../resources/thumbnail/map359319824.png");
            expect(mapInfo.title).toBe("高德地图");
            expect(mapInfo.userName).toBe("361143");
            expect(map.options.server).toBe(server);
            done();
        }, 1000)
    });

    it('CLOUD add FEATURE_LAYER', (done) => {
        var id = 840;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_FEATURE_LAYER;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toBe(id);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(2);
            expect(mapInfo.center.x).toEqual(13372201.86498);
            expect(mapInfo.center.y).toEqual(3541144.0539951);
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(3857);
            expect(mapInfo.extent.bottom).toEqual(3529315.423868);
            expect(mapInfo.extent.left).toEqual(13353379.246765);
            expect(mapInfo.extent.right).toEqual(13391024.483195);
            expect(mapInfo.extent.top).toEqual(3552972.6841222);
            expect(mapInfo.layers.length).toEqual(2);
            expect(mapInfo.layers[1].title).toBe("标注图层名称");
            expect(mapInfo.layers[1].id).toEqual(3035);
            expect(mapInfo.layers[1].type).toBeNull();
            expect(mapInfo.layers[1].layerType).toBe("FEATURE_LAYER");
            expect(mapInfo.layers[1].url).toBeNull();
            expect(mapInfo.layers[1].features.length).toBeGreaterThan(0);
            expect(mapInfo.level).toEqual(12);
            expect(mapInfo.sourceType).toBe("MAPVIEWER");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags.length).toEqual(1);
            expect(mapInfo.thumbnail).toBe("https://supermapoltest/services/../resources/thumbnail/map840.png");
            expect(mapInfo.title).toBe("DEMO1-副本");
            expect(mapInfo.userName).toBe("328215");
            expect(map.options.server).toBe(server);
            done();
        }, 1000)
    });

    it('SUPERMAP_REST add MARKER_LAYER', (done) => {
        var id = 370;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_MARKER_LAYER;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toBe(id);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(2);
            expect(mapInfo.center.x).toEqual(121.48414689911492);
            expect(mapInfo.center.y).toEqual(31.240839876776977);
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(4326);
            expect(mapInfo.extent.bottom).toEqual(31.22854463065271);
            expect(mapInfo.extent.left).toEqual(121.4764292897094);
            expect(mapInfo.extent.right).toEqual(121.49186450852044);
            expect(mapInfo.extent.top).toEqual(31.253135122901245);
            expect(mapInfo.id).toBe(id);
            expect(mapInfo.layers.length).toEqual(2);
            expect(mapInfo.layers[1].title).toBe("标注图层名称");
            expect(mapInfo.layers[1].id).toEqual(1170);
            expect(mapInfo.layers[1].type).toBeNull();
            expect(mapInfo.layers[1].layerType).toBe("MARKER_LAYER");
            expect(mapInfo.layers[1].url).toBeNull();
            expect(mapInfo.layers[1].markers.length).toBeGreaterThan(0);
            expect(mapInfo.level).toEqual(1);
            expect(mapInfo.sourceType).toBe("MAPVIEWER");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags.length).toEqual(1);
            expect(mapInfo.thumbnail).toBe("https://supermapoltest/services/../resources/thumbnail/map370.png");
            expect(mapInfo.title).toBe("未命名地图");
            expect(mapInfo.userName).toBe("10235");
            expect(map.options.server).toBe(server);
            done();
        }, 1000)
    });

    it('createThemeLayer_HeatLayer', (done) => {
        var id = 2489;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_HeatThemeLayer;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toBe(id);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(2);
            expect(mapInfo.center.x).toEqual(12964847.348465);
            expect(mapInfo.center.y).toEqual(4890489.673789);
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(910111);
            expect(mapInfo.extent.bottom).toEqual(4769107.6728721);
            expect(mapInfo.extent.left).toEqual(12771920.289073);
            expect(mapInfo.extent.right).toEqual(13157774.407857);
            expect(mapInfo.extent.top).toEqual(5011871.6747059);
            expect(mapInfo.layers.length).toEqual(1);
            expect(mapInfo.layers[0].title).toBe("北京市高等院校");
            expect(mapInfo.layers[0].id).toEqual(14248);
            expect(mapInfo.layers[0].type).toBeNull();
            expect(mapInfo.layers[0].identifier).toBe("THEME");
            expect(mapInfo.layers[0].layerType).toBe("FEATURE_LAYER");
            expect(mapInfo.layers[0].url).toBe("http://supermapol/iserver/services/map_ShiLiShuJu/rest/maps/北京市高等院校@公众数据");
            expect(mapInfo.layers[0].themeSettings).not.toBeNull();
            expect(mapInfo.level).toEqual(6);
            expect(mapInfo.sourceType).toBe("MAPVIEWER");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags.length).toEqual(1);
            expect(mapInfo.thumbnail).toBe("https://supermapol/services/../resources/thumbnail/map1765.png");
            expect(mapInfo.title).toBe("北京高校分布热点图");
            expect(mapInfo.userName).toBe("48372");
            expect(map.options.server).toBe(server);
            done();
        }, 1000)
    });

    it('createThemeLayer_UniqueLayer', (done) => {
        var id = 1765;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_UniqueThemeLayer;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toBe(id);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(2);
            expect(mapInfo.center.x).toEqual(12964847.348465);
            expect(mapInfo.center.y).toEqual(4890489.673789);
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(910111);
            expect(mapInfo.extent.bottom).toEqual(4769107.6728721);
            expect(mapInfo.extent.left).toEqual(12771920.289073);
            expect(mapInfo.extent.right).toEqual(13157774.407857);
            expect(mapInfo.extent.top).toEqual(5011871.6747059);
            expect(mapInfo.layers.length).toEqual(1);
            expect(mapInfo.layers[0].title).toBe("北京_县级行政区划图");
            expect(mapInfo.layers[0].id).toEqual(14247);
            expect(mapInfo.layers[0].type).toBeNull();
            expect(mapInfo.layers[0].identifier).toBe("THEME");
            expect(mapInfo.layers[0].layerType).toBe("FEATURE_LAYER");
            expect(mapInfo.layers[0].url).toBe("http://supermapol/iserver/services/map_ShiLiShuJu/rest/maps/北京_县级行政区划图@公众数据")
            expect(mapInfo.layers[0].themeSettings).not.toBeNull();
            expect(mapInfo.level).toEqual(6);
            expect(mapInfo.sourceType).toBe("MAPVIEWER");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags.length).toEqual(1);
            expect(mapInfo.thumbnail).toBe("https://supermapol/services/../resources/thumbnail/map1765.png");
            expect(mapInfo.title).toBe("北京高校分布热点图");
            expect(mapInfo.userName).toBe("48372");
            expect(map.options.server).toBe(server);
            done();
        }, 1000)
    });

    it('createThemeLayer_RangeLayer', (done) => {
        var id = 1959;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_RangeThemeLayer;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toBe(id);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(2);
            expect(mapInfo.center.x).toEqual(12955280.513852);
            expect(mapInfo.center.y).toEqual(4851954.7330724);
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(3857);
            expect(mapInfo.extent.bottom).toEqual(4833800.9388547);
            expect(mapInfo.extent.left).toEqual(12918590.740275);
            expect(mapInfo.extent.right).toEqual(12991970.287429);
            expect(mapInfo.extent.top).toEqual(4870108.5272901);
            expect(mapInfo.layers.length).toEqual(1);
            expect(mapInfo.layers[0].title).toBe("北京市三级综合医院");
            expect(mapInfo.layers[0].type).toBeNull();
            expect(mapInfo.layers[0].identifier).toBe("THEME");
            expect(mapInfo.layers[0].layerType).toBe("FEATURE_LAYER");
            expect(mapInfo.layers[0].url).toBe("http://supermapol/iserver/services/map_ShiLiShuJu/rest/maps/北京市三级综合医院@公众数据")
            expect(mapInfo.layers[0].themeSettings).not.toBeNull();
            expect(mapInfo.level).toEqual(12);
            expect(mapInfo.sourceType).toBe("MAPVIEWER");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags.length).toEqual(1);
            expect(mapInfo.thumbnail).toBe("https://supermapol/services/../resources/thumbnail/map1959.png");
            expect(mapInfo.title).toBe("北京三级甲等医院");
            expect(mapInfo.userName).toBe("10047");
            expect(map.options.server).toBe(server);
            done();
        }, 1000)
    });

    it('createThemeLayer_VectorThemeLayer', (done) => {
        var id = 1765;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_VectorThemeLayer;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toBe(id);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(2);
            expect(mapInfo.center.x).toEqual(12964847.348465);
            expect(mapInfo.center.y).toEqual(4890489.673789);
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(910111);
            expect(mapInfo.extent.bottom).toEqual(4769107.6728721);
            expect(mapInfo.extent.left).toEqual(12771920.289073);
            expect(mapInfo.extent.right).toEqual(13157774.407857);
            expect(mapInfo.extent.top).toEqual(5011871.6747059);
            expect(mapInfo.layers.length).toEqual(1);
            expect(mapInfo.layers[0].title).toBe("北京市高等院校(1)");
            expect(mapInfo.layers[0].id).toEqual(14249);
            expect(mapInfo.layers[0].type).toBeNull();
            expect(mapInfo.layers[0].identifier).toBe("THEME");
            expect(mapInfo.layers[0].layerType).toBe("FEATURE_LAYER");
            expect(mapInfo.layers[0].url).toBe("https://supermapol/iserver/services/map_ShiLiShuJu/rest/maps/北京市高等院校@公众数据")
            expect(mapInfo.layers[0].themeSettings).not.toBeNull();
            expect(mapInfo.level).toEqual(6);
            expect(mapInfo.sourceType).toBe("MAPVIEWER");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags.length).toEqual(1);
            expect(mapInfo.thumbnail).toBe("https://supermapol/services/../resources/thumbnail/map1765.png");
            expect(mapInfo.title).toBe("北京高校分布热点图");
            expect(mapInfo.userName).toBe("48372");
            expect(map.options.server).toBe(server);
            done();
        }, 1000)
    });

    it('createThemeLayer_LabelLayer', (done) => {
        var id = 2489;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === server + "/web/maps/" + id + ".json") {
                var escapedJson = webMap_LabelThemeLayer;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        map = webMap(id, {server: server});
        setTimeout(() => {
            expect(map.id).toBe(id);
            var mapInfo = map.mapInfo;
            expect(mapInfo.authorizeSetting.length).toEqual(4);
            expect(mapInfo.center.x).toEqual(11556632.936703);
            expect(mapInfo.center.y).toEqual(3923218.8401182);
            expect(mapInfo.checkStatus).toBe("SUCCESSFUL");
            expect(mapInfo.epsgCode).toEqual(3857);
            expect(mapInfo.extent.bottom).toEqual(3893408.3990923);
            expect(mapInfo.extent.left).toEqual(11501598.276348);
            expect(mapInfo.extent.right).toEqual(11611667.597058);
            expect(mapInfo.extent.top).toEqual(3953029.2811441);
            expect(mapInfo.id).toBe(id);
            expect(mapInfo.layers.length).toEqual(6);
            for (var i = 2; i < mapInfo.layers.length; i++) {
                expect(mapInfo.layers[i].identifier).toBe("THEME");
                expect(mapInfo.layers[i].layerType).toBe("FEATURE_LAYER");
                expect(mapInfo.layers[i].themeSettings).not.toBeNull();
            }
            expect(mapInfo.level).toEqual(10);
            expect(mapInfo.sourceType).toBe("MAPVIEWER");
            expect(mapInfo.resolution).toEqual(0);
            expect(mapInfo.tags.length).toEqual(1);
            expect(mapInfo.thumbnail).toBe("https://supermapoltest/services/../resources/thumbnail/map2489.png");
            expect(mapInfo.title).toBe("九寨沟地震分布");
            expect(mapInfo.userName).toBe("599184");
            expect(map.options.server).toBe(server);
            done();
        }, 1000)
    });
});