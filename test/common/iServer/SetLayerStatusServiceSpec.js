require('../../../src/common/iServer/SetLayerStatusService');

var setLayersStatusEvtArgs = null;
var setLayersStatusFaildEvtArgs = null;
var url = GlobeParameter.WorldURL;

function setLayerStatusCompleted(result) {
    setLayersStatusEvtArgs = result;
}

function setLayerStatusFailed(result) {
    setLayersStatusFaildEvtArgs = result;
}

function initSetLayerStatusService() {
    return new SuperMap.SetLayerStatusService(url, {
        eventListeners: {
            processCompleted: setLayerStatusCompleted,
            processFailed: setLayerStatusFailed
        }
    });
}

describe('SetLayerStatusService_processAsync', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        setLayersStatusEvtArgs = null;
        setLayersStatusFaildEvtArgs = null;

    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor, destroy', function () {
        var setLayerStatusService = initSetLayerStatusService();
        expect(setLayerStatusService.mapUrl).toEqual(url);
        expect(setLayerStatusService.events).not.toBeNull();
        expect(setLayerStatusService.eventListeners).not.toBeNull();
        setLayerStatusService.destroy();
        expect(setLayerStatusService.events == null).toBeTruthy();
        expect(setLayerStatusService.eventListeners == null).toBeTruthy();
        expect(setLayerStatusService.mapUrl == null).toBeTruthy();
        expect(setLayerStatusService.lastparams == null).toBeTruthy();
    });

    it('getMapName', function () {
        var setLayerStatusService = initSetLayerStatusService();
        var name = setLayerStatusService.getMapName(url);
        expect(name).toEqual("World");
        setLayerStatusService.destroy();
    });

    //processAsync没有参数的时候
    it('processAsync_noParams', function (done) {
        var setLayerStatusService = initSetLayerStatusService();
        setLayerStatusService.processAsync();

        setTimeout(function () {
            try {
                expect(setLayersStatusEvtArgs).toBeNull();
                setLayerStatusService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("SetLayerStatusService_" + exception.name + ":" + exception.message);
                setLayerStatusService.destroy();
                done();
            }
        }, 3000)
    });

    //processAsyn有参数，没有resourceID属性
    it('processAsync_resourceID_null', function (done) {
        var setLayerStatusService = initSetLayerStatusService();
        var setLayerStatusParams = new SuperMap.SetLayerStatusParameters();
        var layerStatus = new SuperMap.LayerStatus();
        layerStatus.layerName = "super";
        layerStatus.isVisible = true;
        setLayerStatusParams.layerStatusList.push(layerStatus);
        setLayerStatusService.events.on({"processCompleted": processCompleted});
        setLayerStatusService.processAsync(setLayerStatusParams);

        function processCompleted(createTempLayerEventArgs) {
            setLayerStatusService.events.on({"processCompleted": processCompleted});
            var resourceID = createTempLayerEventArgs.result.newResourceID;
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
        }
    })
});



