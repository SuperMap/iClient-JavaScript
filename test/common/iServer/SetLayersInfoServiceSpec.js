require('../../../src/common/iServer/SetLayersInfoService');
require('../../resrces/LayersInfo');

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
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        serviceFailedEventArgsSystem = null;
        setEventArgsSystem = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //新建临时图层
    it('setNewTempLayer', function (done) {
        var layers = layersInfo;
        var setLayersInfoService = initSetLayersInfoService();
        expect(setLayersInfoService).not.toBeNull();
        expect(setLayersInfoService.url).toEqual(url);
        setLayersInfoService.processAsync(layers);
        setLayersInfoService.events.on({"processCompleted": setLayersInfoCompleted});
        setTimeout(function () {
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
                expect(false).toBeTruthy();
                console.log("setNewTemLayer" + e.name + ":" + e.message);
                setLayersInfoService.destroy();
                done();
            }
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
            resourceID: id,
        });
        expect(setLayersInfoService).not.toBeNull();
        expect(setLayersInfoService.url).toEqual(url);
        var layers = layersInfo;
        layers.description = "test";
        setLayersInfoService.processAsync(layers);
        setLayersInfoService.events.on({"processCompleted": setLayersInfoCompleted});
        setTimeout(function () {
            try {
                expect(setLayersEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = setLayersEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                setLayersInfoService.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("setLayersInfo_isTempLayer" + e.name + ":" + e.message);
                setLayersInfoService.destroy();
                done();
            }
        }, 4000)
    });

    //失败事件
    it('failedEvent', function (done) {
        var layer = layerInfo;
        var setLayersInfoService = initSetLayersInfoService();
        expect(setLayersInfoService).not.toBeNull();
        expect(setLayersInfoService.url).toEqual(url);
        setLayersInfoService.processAsync(layer);
        setLayersInfoService.events.on({"processFailed": setLayersFailed});
        setTimeout(function () {
            try {
                var serviceResult = setLayersFailedEventArgsSystem;
                expect(serviceResult.type).toEqual("processFailed");
                expect(serviceResult.error.code).not.toBeNull();
                expect(serviceResult.error.errorMsg).not.toBeNull();
                setLayersInfoService.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("setNewTemLayer" + e.name + ":" + e.message);
                setLayersInfoService.destroy();
                done();
            }
        }, 5000)
    });
});