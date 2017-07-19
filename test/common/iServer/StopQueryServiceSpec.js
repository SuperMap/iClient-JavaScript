require('../../../src/common/iServer/StopQueryService');

var stopQueryServiceEventArgsSystem = null,
    serviceFailedEventArgsSystem = null;
var trafficTransferURL = GlobeParameter.trafficTransferURL;
function initStopQueryService() {
    return new SuperMap.StopQueryService(trafficTransferURL, {
        eventListeners: {
            processCompleted: succeed,
            processFailed: failed
        }
    });
}
function succeed(event) {
    stopQueryServiceEventArgsSystem = event;
}
function failed(event) {
    serviceFailedEventArgsSystem = event;
}

describe('testStopQueryService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        stopQueryServiceEventArgsSystem = null;
        serviceFailedEventArgsSystem = null;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('noParams',function(done){
        var stopQueryService = initStopQueryService();
        stopQueryService.processAsync();

        setTimeout(function(){
            try{
                expect((stopQueryService.processAsync())===undefined).toBeTruthy();
                stopQueryService.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("StopQueryService_" + exception.name + ":" + exception.message);
                stopQueryService.destroy();
                done();
            }
        },2000);
    });

    it('success_returnPosition',function(done){
        var stopQueryService = initStopQueryService();
        var stopQueryServiceParams = new SuperMap.StopQueryParameters({
            keyWord: '人民',
            returnPosition: true
        });
        stopQueryService.processAsync(stopQueryServiceParams);

        setTimeout(function() {
            try{
                expect(stopQueryServiceEventArgsSystem.result).not.toBeNull();
                expect(stopQueryServiceEventArgsSystem.result[0].position).not.toBeNull();
                stopQueryService.destroy();
                expect(stopQueryService.eventListeners).toBeNull();
                expect(stopQueryService.events).toBeNull();
                stopQueryServiceParams.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("StopQueryService_" + exception.name + ":" + exception.message);
                stopQueryService.destroy();
                stopQueryServiceParams.destroy();
                done();
            }
        },2000);
    });

    it('success_returnPosition:false',function(done){
        var stopQueryService = initStopQueryService();
        var stopQueryServiceParams = new SuperMap.StopQueryParameters({
            keyWord: '人民',
            returnPosition: false
        });
        stopQueryService.processAsync(stopQueryServiceParams);

        setTimeout(function() {
            try{
                var result = stopQueryServiceEventArgsSystem.result;
                expect(result).not.toBeNull();
                expect(stopQueryServiceEventArgsSystem.result[0].position).toBeNull();
                expect(stopQueryServiceEventArgsSystem.result[0]).not.toBeNull();
                stopQueryService.destroy();
                stopQueryServiceParams.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("StopQueryService_" + exception.name + ":" + exception.message);
                stopQueryService.destroy();
                stopQueryServiceParams.destroy();
                done();
            }
        },2000);
    })
});
