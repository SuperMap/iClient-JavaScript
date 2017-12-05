require('../../../src/common/iServer/SetLayersInfoService');
require('../../resources/LayersInfo');
require('../../../src/common/util/FetchRequest');

var setLayersFailedEventArgsSystem = null;
var setLayersEventArgsSystem = null;
var id;
var url = GlobeParameter.WorldURL;
var options = {
    eventListeners: {
        "processCompleted": setLayersInfoCompleted,
        'processFailed': setLayersFailed
    },
    isTempLayers: false
};

function initSetLayersInfoService() {
    return new SuperMap.SetLayersInfoService(url, options);
}

function setLayersInfoCompleted(setLayersInfoArgs) {
    setLayersEventArgsSystem = setLayersInfoArgs;
}

function setLayersFailed(serviceFailedEventArgs) {
    setLayersFailedEventArgsSystem = serviceFailedEventArgs;
}

describe('SetLayersInfoService', function () {
    var originalTimeout;
    var FetchRequest = SuperMap.FetchRequest;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        setLayersFailedEventArgsSystem = null;
        setLayersEventArgsSystem = null;
    });

    //新建临时图层
    it('setNewTempLayer', function (done) {
        var layers = layersInfo;
        var setLayersInfoService = initSetLayersInfoService();
        expect(setLayersInfoService).not.toBeNull();
        expect(setLayersInfoService.url).toEqual(url);
        setLayersInfoService.events.on({"processCompleted": setLayersInfoCompleted});
        setLayersInfoService.processAsync(layers);
        setTimeout(function () {
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
        }, 5000)
    });

    //修改临时图层的信息 isTempLayers=true
    it('setLayersInfo_isTempLayer', function (done) {
        var setLayersInfoService = new SuperMap.SetLayersInfoService(url, {
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
        setLayersInfoService.processAsync(layers);
        setTimeout(function () {
            expect(setLayersEventArgsSystem.type).toEqual("processCompleted");
            var serviceResult = setLayersEventArgsSystem.result;
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.succeed).toBeTruthy();
            setLayersInfoService.destroy();
            done();
        }, 4000)
    });

    //失败事件
    it('failedEvent', function (done) {
        var wrongLayer = layerInfo;
        var testUrl = "http://supermap:8090/iserver/services/map-world/rest/maps/World";
        var setLayersInfoService = new SuperMap.SetLayersInfoService(testUrl, options);
        spyOn(FetchRequest, 'commit').and.callFake(function () {
            var escapedJson = "{\"succeed\":false,\"error\":{\"code\":500,\"errorMsg\":\"Index:0不在（0，-1）范围之内。\"}}";
            return Promise.resolve(new Response(escapedJson));
        });
        setLayersInfoService.events.on({"processFailed": setLayersFailed});
        setLayersInfoService.processAsync(wrongLayer);
        setTimeout(function () {
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