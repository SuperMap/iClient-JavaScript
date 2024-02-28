import {SetLayersInfoService} from '../../../src/common/iServer/SetLayersInfoService';
import '../../resources/LayersInfo';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

var setLayersFailedEventArgsSystem = null, setLayersEventArgsSystem = null;
var initSetLayersInfoService = (url,) => {
    return new SetLayersInfoService(url, {
        isTempLayers: false
    });
};

describe('SetLayersInfoService', () => {
    var originalTimeout;
    var id;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        setLayersFailedEventArgsSystem = null;
        setLayersEventArgsSystem = null;
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var setLayersInfoService = new SetLayersInfoService("http://supermap:8090/iserver/services/map-world/rest/maps/World", { headers: myHeaders });
        expect(setLayersInfoService).not.toBeNull();
        expect(setLayersInfoService.headers).not.toBeNull();
        setLayersInfoService.destroy();
    });
    
    it('crossOrigin', () => {
        var setLayersInfoService = new SetLayersInfoService("http://supermap:8090/iserver/services/map-world/rest/maps/World", { crossOrigin: false });
        expect(setLayersInfoService).not.toBeNull();
        expect(setLayersInfoService.crossOrigin).toBeFalsy();
        setLayersInfoService.destroy();
    });

    //新建临时图层
    it('setNewTempLayer', (done) => {
        var setLayersFailedEventArgsSystem = null, setLayersEventArgsSystem = null;
        var url = "http://supermap:8090/iserver/services/map-world/rest/maps/World";
        var layers = layersInfo;
        var setLayersInfoCompleted = (setLayersInfoArgs) => {
            setLayersEventArgsSystem = setLayersInfoArgs;
            try {
                expect(setLayersEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = setLayersEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.postResultType).toEqual("CreateChild");
                expect(serviceResult.newResourceLocation).not.toBeNull();
                expect(serviceResult.newResourceID).not.toBeNull();
                id = serviceResult.newResourceID;
                setLayersInfoService.destroy();
                done();
            } catch (e) {
                console.log("'setNewTempLayer'案例失败" + e.name + ":" + e.message);
                setLayersInfoService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        };
        var setLayersInfoService = initSetLayersInfoService(url);
        expect(setLayersInfoService).not.toBeNull();
        expect(setLayersInfoService.url).toEqual(url);
        spyOn(FetchRequest, 'post').and.callFake((testUrl,params) => {
            expect(testUrl).toBe(url+"/tempLayersSet");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.dataSourceName).toBe("World");
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_1c0bda07fde943a4a5f3f3d4eb44235d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World/tempLayersSet/c01d29d8d41743adb673cd1cecda6ed0_1c0bda07fde943a4a5f3f3d4eb44235d.json"}`));
        });
        setLayersInfoService.processAsync(layers, setLayersInfoCompleted);
    });

    //修改临时图层的信息 isTempLayers=true
    it('setLayersInfo_isTempLayer', (done) => {
        var setLayersFailedEventArgsSystem = null, setLayersEventArgsSystem = null;
        var url = "http://supermap:8090/iserver/services/map-world/rest/maps/World";
        var setLayersInfoCompleted = (setLayersInfoArgs) => {
            setLayersEventArgsSystem = setLayersInfoArgs;
            expect(setLayersEventArgsSystem.type).toEqual("processCompleted");
            var serviceResult = setLayersEventArgsSystem.result;
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.succeed).toBeTruthy();
            setLayersInfoService.destroy();
            done();
        };
        var setLayersFailed = (serviceFailedEventArgs) => {
            setLayersFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var setLayersInfoService = new SetLayersInfoService(url, {
            isTempLayers: true,
            resourceID: id
        });
        var layers = layersInfo;
        layers.description = "test";
        var setLayersInfoService = initSetLayersInfoService(url,setLayersFailed,setLayersInfoCompleted);
        spyOn(FetchRequest, 'post').and.callFake((testUrl,params) => {
            expect(testUrl).toBe(url+"/tempLayersSet");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect( paramsObj[0].name).toBe("World");
            expect( paramsObj[0].subLayers.layers[0].ugcLayerType).toBe("VECTOR");
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        setLayersInfoService.processAsync(layers, setLayersInfoCompleted);
    });

    //失败事件
    it('failedEvent', (done) => {
        var setLayersFailedEventArgsSystem = null, setLayersEventArgsSystem = null;
        var url = "http://supermap:8090/iserver/services/map-world/rest/maps/World";
        var wrongLayerInfo = layerInfo;
        var setLayersFailed = (serviceFailedEventArgs) => {
            setLayersFailedEventArgsSystem = serviceFailedEventArgs;
            expect(setLayersEventArgsSystem).toBeNull();
            expect(setLayersFailedEventArgsSystem).not.toBeNull();
            expect(setLayersFailedEventArgsSystem.type).toEqual("processFailed");
            expect(setLayersFailedEventArgsSystem.error.code).toEqual(500);
            expect(setLayersFailedEventArgsSystem.error.errorMsg).toBe("Index:0不在（0，-1）范围之内。");
            setLayersInfoService.destroy();
            done();
        };
        var setLayersInfoService = initSetLayersInfoService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + "/tempLayersSet");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].datasetInfo.dataSourceName).toBe("World");
            expect(paramsObj[0].datasetInfo.name).toBe("continent_T");
            var escapedJson = "{\"succeed\":false,\"error\":{\"code\":500,\"errorMsg\":\"Index:0不在（0，-1）范围之内。\"}}";
            return Promise.resolve(new Response(escapedJson));
        });
        setLayersInfoService.processAsync(wrongLayerInfo, setLayersFailed);
    });
    it('setLayersInfo_customQueryParam', (done) => {
        var setLayersFailedEventArgsSystem = null;
        var url = "http://supermap:8090/iserver/services/map-world/rest/maps/World";
        var setLayersInfoCompleted = (setLayersInfoArgs) => {
            setLayersInfoService.destroy();
            done();
        };
        var setLayersFailed = (serviceFailedEventArgs) => {
            setLayersFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var setLayersInfoService = new SetLayersInfoService(url, {
            isTempLayers: true,
            resourceID: id
        });
        var layers = layersInfo;
        layers.description = "test";
        var setLayersInfoService = initSetLayersInfoService(url+'?key=123');
        spyOn(FetchRequest, 'post').and.callFake((testUrl,params) => {
            expect(testUrl).toBe(url+"/tempLayersSet?key=123");
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        setLayersInfoService.processAsync(layers, setLayersInfoCompleted);
    });
});