import {SetLayerStatusService} from '../../../src/common/iServer/SetLayerStatusService';
import {SetLayerStatusParameters} from '../../../src/common/iServer/SetLayerStatusParameters';
import {LayerStatus} from '../../../src/common/iServer/LayerStatus';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var setLayersStatusEvtArgs = null, setLayersStatusFaildEvtArgs = null;
var initSetLayerStatusService = (url,setLayerStatusCompleted,setLayerStatusFailed) => {
    return new SetLayerStatusService(url, {
        eventListeners: {
            processCompleted: setLayerStatusCompleted,
            processFailed: setLayerStatusFailed
        }
    });
};

describe('SetLayerStatusService_processAsync', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        setLayersStatusEvtArgs = null;
        setLayersStatusFaildEvtArgs = null;

    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var setLayerStatusService = new SetLayerStatusService(GlobeParameter.WorldURL, { headers: myHeaders });
        expect(setLayerStatusService).not.toBeNull();
        expect(setLayerStatusService.headers).not.toBeNull();
        setLayerStatusService.destroy();
    });
    
    it('crossOrigin', () => {
        var setLayerStatusService = new SetLayerStatusService(GlobeParameter.WorldURL, { crossOrigin: false });
        expect(setLayerStatusService).not.toBeNull();
        expect(setLayerStatusService.crossOrigin).toBeFalsy();
        setLayerStatusService.destroy();
    });

    it('constructor, destroy', () => {
        var url = GlobeParameter.WorldURL;
        var setLayersStatusEvtArgs = null, setLayersStatusFaildEvtArgs = null;
        var setLayerStatusCompleted = (result) => {
            setLayersStatusEvtArgs = result;
        };
        var setLayerStatusFailed = (result) => {
            setLayersStatusFaildEvtArgs = result;
        };
        var setLayerStatusService = initSetLayerStatusService(url,setLayerStatusCompleted,setLayerStatusFailed);
        expect(setLayerStatusService.mapUrl).toEqual(url);
        expect(setLayerStatusService.events).not.toBeNull();
        expect(setLayerStatusService.eventListeners).not.toBeNull();
        setLayerStatusService.destroy();
        expect(setLayerStatusService.events == null).toBeTruthy();
        expect(setLayerStatusService.eventListeners == null).toBeTruthy();
        expect(setLayerStatusService.mapUrl == null).toBeTruthy();
        expect(setLayerStatusService.lastparams == null).toBeTruthy();
    });

    it('getMapName', () => {
        var url = GlobeParameter.WorldURL;
        var setLayersStatusEvtArgs = null, setLayersStatusFaildEvtArgs = null;
        var setLayerStatusCompleted = (result) => {
            setLayersStatusEvtArgs = result;
        };
        var setLayerStatusFailed = (result) => {
            setLayersStatusFaildEvtArgs = result;
        };
        var setLayerStatusService = initSetLayerStatusService(url,setLayerStatusCompleted,setLayerStatusFailed);
        var name = setLayerStatusService.getMapName(url);
        expect(name).toEqual("World");
        setLayerStatusService.destroy();
    });

    //processAsync没有参数的时候
    it('processAsync_noParams', () => {
        var url = GlobeParameter.WorldURL;
        var flag=false;
        var setLayerStatusCompleted = (result) => {
            flag=true;
        };
        var setLayerStatusFailed = (result) => {
            flag=true;
        };
        var setLayerStatusService = initSetLayerStatusService(url,setLayerStatusCompleted,setLayerStatusFailed);
        setLayerStatusService.processAsync();
        expect(flag).toBeFalsy();
    });

    //processAsyn有参数，没有resourceID属性
    it('processAsync_resourceID_null', (done) => {
        var url = GlobeParameter.WorldURL;
        var setLayersStatusEvtArgs = null, setLayersStatusFaildEvtArgs = null;
        var resourceID;
        var setLayerStatusParams = new SetLayerStatusParameters();
        var layerStatus = new LayerStatus();
        layerStatus.layerName = "super";
        layerStatus.isVisible = true;
        setLayerStatusParams.layerStatusList.push(layerStatus);
        var processCompleted = (createTempLayerEventArgs) => {
            resourceID = createTempLayerEventArgs.result.newResourceID;
        };
        var setLayerStatusCompleted = (result) => {
            setLayersStatusEvtArgs = result;
            try {
                expect(setLayersStatusEvtArgs.result).not.toBeNull();
                expect(setLayerStatusService.lastparams).not.toBeNull();
                setLayerStatusParams.destroy();
                setLayerStatusService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("SetLayerStatusService_" + exception.name + ":" + exception.message);
                setLayerStatusParams.destroy();
                setLayerStatusService.destroy();
                done();
            }
        };
        var setLayerStatusFailed = (result) => {
            setLayersStatusFaildEvtArgs = result;
        };
        var setLayerStatusService = initSetLayerStatusService(url,setLayerStatusCompleted,setLayerStatusFailed);
        spyOn(FetchRequest, 'post').and.callFake((testUrl) => {
            expect(testUrl).toBe(url+"/tempLayersSet.json?");
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"f701028a2b7144b19b582f55c1902b18_e0d63a4c61b840d1b33852fae49bad11","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World/tempLayersSet/f701028a2b7144b19b582f55c1902b18_e0d63a4c61b840d1b33852fae49bad11.json"}`));
        });
        spyOn(FetchRequest, 'put').and.callFake((testUrl,params) => {
            expect(testUrl).toBe(url+"/tempLayersSet/f701028a2b7144b19b582f55c1902b18_e0d63a4c61b840d1b33852fae49bad11.json?elementRemain=true&reference=f701028a2b7144b19b582f55c1902b18_e0d63a4c61b840d1b33852fae49bad11&holdTime=15");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].name).toContain("World");
            expect(paramsObj[0].subLayers.layers[0].name).toBe("super");
            expect(paramsObj[0].subLayers.layers[0].type).toBe("UGC");
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        setLayerStatusService.events.on({"processCompleted": processCompleted});
        setLayerStatusService.processAsync(setLayerStatusParams);
    })
});



