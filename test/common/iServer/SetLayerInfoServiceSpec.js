import {SetLayerInfoService} from '../../../src/common/iServer/SetLayerInfoService';
import {SetLayersInfoService} from '../../../src/common/iServer/SetLayersInfoService';
import '../../resources/LayersInfo';

var url = GlobeParameter.WorldURL;
var setLayerFailedEventArgsSystem = null, setLayerEventArgsSystem = null;
var id;
var setLayerInfoCompleted = (result) => {
    setLayerEventArgsSystem = result;
};
var setLayerFailed = (result) => {
    setLayerFailedEventArgsSystem = result;
};
var options = {
    eventListeners: {
        "processCompleted": setLayerInfoCompleted,
        'processFailed': setLayerFailed
    }
};
var initSetLayerInfoService = (url) => {
    return new SetLayerInfoService(url, options);
};

describe('SetLayerInfoService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setLayerEventArgsSystem = null;
        setLayerFailedEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //新建临时图层
    it('setNewTempLayer', (done) => {
        var layersInformation = layersInfo;
        var setLayersInfoService = new SetLayersInfoService(url, {
            eventListeners: {
                "processCompleted": setLayerInfoCompleted,
                'processFailed': setLayerFailed
            },
            isTempLayers: false
        });
        expect(setLayersInfoService).not.toBeNull();
        expect(setLayersInfoService.url).toEqual(url);
        setLayersInfoService.events.on({"processCompleted": setLayerInfoCompleted});
        setLayersInfoService.processAsync(layersInformation);
        setTimeout(() => {
            try {
                expect(setLayerEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = setLayerEventArgsSystem.result;
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
                console.log("setNewTempLayer 新建临时图层失败" + e.name + ":" + e.message);
                setLayersInfoService.destroy();
                done();
            }
        }, 5000)
    });

    //使用的临时图层id，为上一个it新建的图层
    it('setLayerInfo', (done) => {
        if (id == null) {
            console.log("没有得到临时图层ID");
        } else {
            var layerInformation = layerInfo;
            layerInformation.description = "this is a test";
            var url1 = url + "/tempLayersSet/" + id + "/continent_T@World.1@@World";
            var setLayerInfoService = initSetLayerInfoService(url1);
            expect(setLayerInfoService).not.toBeNull();
            expect(setLayerInfoService.url).toEqual(url1);
            setLayerInfoService.events.on({"processCompleted": setLayerInfoCompleted});
            setLayerInfoService.processAsync(layerInformation);
            setTimeout(() => {
                try {
                    expect(setLayerEventArgsSystem.type).toEqual("processCompleted");
                    var serviceResult = setLayerEventArgsSystem.result;
                    expect(serviceResult).not.toBeNull();
                    expect(serviceResult.succeed).toBeTruthy();
                    setLayerInfoService.destroy();
                    done();
                } catch (e) {
                    expect(false).toBeTruthy();
                    console.log("setLayerInfo" + e.name + ":" + e.message);
                    setLayerInfoService.destroy();
                    done();
                }
            }, 4000)
        }
    });
});