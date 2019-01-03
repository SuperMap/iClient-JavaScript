import {SetLayersInfoService} from '../../../src/common/iServer/SetLayersInfoService';
import '../../resources/LayersInfo';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

var url = "http://supermap:8090/iserver/services/map-world/rest/maps/World";
var setLayersFailedEventArgsSystem = null, setLayersEventArgsSystem = null;
var setLayersInfoCompleted = (setLayersInfoArgs) => {
    setLayersEventArgsSystem = setLayersInfoArgs;
};
var setLayersFailed = (serviceFailedEventArgs) => {
    setLayersFailedEventArgsSystem = serviceFailedEventArgs;
};
var options = {
    eventListeners: {
        "processCompleted": setLayersInfoCompleted,
        'processFailed': setLayersFailed
    },
    isTempLayers: false
};
var initSetLayersInfoService = () => {
    return new SetLayersInfoService(url, options);
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

    //新建临时图层
    it('setNewTempLayer', (done) => {
        var layers = layersInfo;
        var setLayersInfoService = initSetLayersInfoService();
        expect(setLayersInfoService).not.toBeNull();
        expect(setLayersInfoService.url).toEqual(url);
        spyOn(FetchRequest, 'post').and.callFake((testUrl,options) => {
            expect(testUrl).toBe(url+"/tempLayersSet.json?");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_1c0bda07fde943a4a5f3f3d4eb44235d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World/tempLayersSet/c01d29d8d41743adb673cd1cecda6ed0_1c0bda07fde943a4a5f3f3d4eb44235d.json"}`));
        });
        setLayersInfoService.events.on({"processCompleted": setLayersInfoCompleted});
        setLayersInfoService.processAsync(layers);
        setTimeout(() => {
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
        }, 3000);
    });

    //修改临时图层的信息 isTempLayers=true
    it('setLayersInfo_isTempLayer', (done) => {
        var setLayersInfoService = new SetLayersInfoService(url, {
            eventListeners: {
                "processCompleted": setLayersInfoCompleted,
                'processFailed': setLayersFailed
            },
            isTempLayers: true,
            resourceID: id
        });
        var layers = layersInfo;
        layers.description = "test";
        setLayersInfoService.events.on({"processCompleted": setLayersInfoCompleted});
        spyOn(FetchRequest, 'put').and.callFake((testUrl) => {
            expect(testUrl).toBe(url+"/tempLayersSet/c01d29d8d41743adb673cd1cecda6ed0_1c0bda07fde943a4a5f3f3d4eb44235d.json?");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        setLayersInfoService.events.on({"processCompleted": setLayersInfoCompleted});
        setLayersInfoService.processAsync(layers);
        setTimeout(() => {
            expect(setLayersEventArgsSystem.type).toEqual("processCompleted");
            var serviceResult = setLayersEventArgsSystem.result;
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.succeed).toBeTruthy();
            setLayersInfoService.destroy();
            done();
        }, 1000)
    });

    //失败事件
    it('failedEvent', (done) => {
        var wrongLayerInfo = layerInfo;
        var setLayersInfoService = new SetLayersInfoService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + "/tempLayersSet.json?");
            expect(options).not.toBeNull();
            var escapedJson = "{\"succeed\":false,\"error\":{\"code\":500,\"errorMsg\":\"Index:0不在（0，-1）范围之内。\"}}";
            return Promise.resolve(new Response(escapedJson));
        });
        setLayersInfoService.events.on({"processFailed": setLayersFailed});
        setLayersInfoService.processAsync(wrongLayerInfo);
        setTimeout(() => {
            expect(setLayersEventArgsSystem).toBeNull();
            expect(setLayersFailedEventArgsSystem).not.toBeNull();
            expect(setLayersFailedEventArgsSystem.type).toEqual("processFailed");
            expect(setLayersFailedEventArgsSystem.error.code).toEqual(500);
            expect(setLayersFailedEventArgsSystem.error.errorMsg).toBe("Index:0不在（0，-1）范围之内。");
            setLayersInfoService.destroy();
            done();
        }, 1000)
    });
});