require('../../../src/common/iServer/SetLayerStatusService');

var setLayersStatusEvtArgs = null;
var setLayersStatusFaildEvtArgs = null;

function initSetLayerStatusService(url) {
    return new SuperMap.SetLayerStatusService(url, {
        eventListeners: {
            processCompleted: setLayerStatusCompleted,
            processFailed: setLayerStatusFailed
        }
    });
}
function setLayerStatusCompleted(result) {
    setLayersStatusEvtArgs = result;
}
function setLayerStatusFailed(result) {
    setLayersStatusFaildEvtArgs = result;
}

describe('testSetLayerStatusService_constructor',function(){
    it('constructor and destroy',function(){
        var url= GlobeParameter.WorldURL;
        var setLayerStatusService = new SuperMap.SetLayerStatusService(url,
            {eventListeners:{
                "processCompleted":this.setLayerComplted
            }});
        expect(setLayerStatusService.mapUrl).toEqual(url);
        expect(setLayerStatusService.events).not.toBeNull();
        expect(setLayerStatusService.eventListeners).not.toBeNull();
        setLayerStatusService.destroy();
        expect(setLayerStatusService.events == null).toBeTruthy();
        expect(setLayerStatusService.eventListeners == null).toBeTruthy();
        expect(setLayerStatusService.mapUrl == null).toBeTruthy();
        expect(setLayerStatusService.lastparams == null).toBeTruthy();
    });
});

describe('testSetLayerStatusService_getMapName',function(){
    it('getMapName',function(){
        var url = GlobeParameter.WorldURL;
        var setLayerStatusService = new SuperMap.SetLayerStatusService(url);
        var name = setLayerStatusService.getMapName(url);
        expect(name).toEqual("World");
        setLayerStatusService.destroy();
    })
});

describe('testSetLayerStatusService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        setLayersStatusEvtArgs = null;
        setLayersStatusFaildEvtArgs = null;

    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //processAsync没有参数的时候
    it('noParams',function(done){
        var worldURL= GlobeParameter.WorldURL;
        var setLayerStatusService = new SuperMap.SetLayerStatusService(worldURL);
        setLayerStatusService.processAsync();

        setTimeout(function(){
            try{
                expect(setLayersStatusEvtArgs).toBeNull();
                setLayerStatusService.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("SetLayerStatusService_" + exception.name + ":" + exception.message);
                setLayerStatusService.destroy();
                done();
            }
        })
    });

    //processAsyn有参数，没有resourceID属性
    it('resourceID_null',function(done){
        var url= GlobeParameter.WorldURL;
        var setLayerStatusService = initSetLayerStatusService(url);
        var setLayerStatusParams = new SuperMap.SetLayerStatusParameters();
        var layerStatus = new SuperMap.LayerStatus();
        layerStatus.layerName = "super";
        layerStatus.isVisible = true;
        setLayerStatusParams.layerStatusList.push(layerStatus);
        setLayerStatusService.events.on({"processCompleted":processCompleted});
        setLayerStatusService.processAsync(setLayerStatusParams);

        function processCompleted(createTempLayerEventArgs){
            setLayerStatusService.events.un({"processCompleted":processCompleted});
            _resourceID=createTempLayerEventArgs.result.newResourceID;
            try{
                expect(setLayersStatusEvtArgs.result).not.toBeNull();
                expect(setLayerStatusService.lastparams).not.toBeNull();
                setLayerStatusParams.destroy();
                setLayerStatusService.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("SetLayerStatusService_" + exception.name + ":" + exception.message);
                setLayerStatusParams.destroy();
                setLayerStatusService.destroy();
                done();
            }
        }
    })
});



