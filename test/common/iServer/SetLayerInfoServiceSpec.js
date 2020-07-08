import {SetLayerInfoService} from '../../../src/common/iServer/SetLayerInfoService';
import {SetLayersInfoService} from '../../../src/common/iServer/SetLayersInfoService';
import '../../resources/LayersInfo';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.WorldURL;
var setLayerFailedEventArgsSystem = null, setLayerEventArgsSystem = null;
var id;
var initSetLayerInfoService = (url,setLayerFailed,setLayerInfoCompleted) => {
    return new SetLayerInfoService(url, {
        eventListeners: {
            "processCompleted": setLayerInfoCompleted,
            'processFailed': setLayerFailed
        }
    });
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

    it('headers', () => {
        let myHeaders = new Headers();
        var setLayerInfoService = new SetLayerInfoService(url, { headers: myHeaders });
        expect(setLayerInfoService).not.toBeNull();
        expect(setLayerInfoService.headers).not.toBeNull();
        setLayerInfoService.destroy();
    });
    
    it('crossOrigin', () => {
        var setLayerInfoService = new SetLayerInfoService(url, { crossOrigin: false });
        expect(setLayerInfoService).not.toBeNull();
        expect(setLayerInfoService.crossOrigin).toBeFalsy();
        setLayerInfoService.destroy();
    });

    //新建临时图层
    it('setNewTempLayer', (done) => {
        var layersInformation = layersInfo;
        var setLayerInfoCompleted = (result) => {
            setLayerEventArgsSystem = result;
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
        };
        var setLayerFailed = (result) => {
            setLayerFailedEventArgsSystem = result;
        };
        var setLayersInfoService = new SetLayersInfoService(url, {
            eventListeners: {
                "processCompleted": setLayerInfoCompleted,
                'processFailed': setLayerFailed
            },
            isTempLayers: false
        });
        expect(setLayersInfoService).not.toBeNull();
        expect(setLayersInfoService.url).toEqual(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl,params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url+"/tempLayersSet");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.dataSourceName).toBe("World");
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"f701028a2b7144b19b582f55c1902b18_4b85e5ba2d65456c82e430c7636fba8d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World/tempLayersSet/f701028a2b7144b19b582f55c1902b18_4b85e5ba2d65456c82e430c7636fba8d.json"}`));
        });
        setLayersInfoService.events.on({"processCompleted": setLayerInfoCompleted});
        setLayersInfoService.processAsync(layersInformation);
    });

    //使用的临时图层id，为上一个it新建的图层
    it('setLayerInfo', (done) => {
        if (id == null) {
            console.log("没有得到临时图层ID");
        } else {
            var layerInformation = layerInfo;
            layerInformation.description = "this is a test";
            var url1 = url + "/tempLayersSet/" + id + "/continent_T@World.1@@World";
            var setLayerInfoCompleted = (result) => {
                setLayerEventArgsSystem = result;
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
            };
            var setLayerFailed = (result) => {
                setLayerFailedEventArgsSystem = result;
            };
            var setLayerInfoService = initSetLayerInfoService(url1,setLayerFailed,setLayerInfoCompleted);
            expect(setLayerInfoService).not.toBeNull();
            expect(setLayerInfoService.url).toEqual(url1);
            spyOn(FetchRequest, 'commit').and.callFake((method, testUrl,params) => {
                expect(method).toBe("PUT");
                expect(testUrl).toBe(url1);
                var paramsObj = JSON.parse(params.replace(/'/g, "\""));
                expect(paramsObj.datasetInfo.dataSourceName).toBe("World");
                expect(paramsObj.datasetInfo.type).toBe("TEXT");
                return Promise.resolve(new Response(`{"succeed":true}`));
            });
            setLayerInfoService.events.on({"processCompleted": setLayerInfoCompleted});
            setLayerInfoService.processAsync(layerInformation);
        }
    });
});