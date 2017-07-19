require('../../../src/common/iServer/TransferSolutionService');

var serviceFailedEventArgsSystem = null;
var serviceCompletedEventArgsSystem = null;

//服务初始化时注册事件监听函数
var trafficTransferURL = GlobeParameter.trafficTransferURL;
function initTransferSolutionService() {
    return new SuperMap.TransferSolutionService(trafficTransferURL, {
        eventListeners: {
            processCompleted: succeed,
            processFailed: failed
        }
    });
}
function succeed(event) {
    serviceCompletedEventArgsSystem = event;
}
function failed(event) {
    serviceFailedEventArgsSystem = event;
}

describe('testTransferSolutionService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('noParams',function(done){
        var service = initTransferSolutionService();
        service.processAsync();

        setTimeout(function(){
            try{
                expect(typeof(service.processAsync()) === "undefined").toBeTruthy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("TransferSolutionService_" + exception.name + ":" + exception.message);
                service.destroy();
                done();
            }
        },2000);
    });

    it('success',function(done){
        var service = initTransferSolutionService();
        var params = new SuperMap.TransferSolutionParameters({
            solutionCount: 5,
            transferTactic: SuperMap.TransferTactic.LESS_TIME,
            transferPreference: SuperMap.TransferPreference.NONE,
            walkingRatio: 10,
            points: [175, 179]
        });
        service.events.on({"processCompleted":succeed});
        service.processAsync(params);

        setTimeout(function() {
            try{
                var result = serviceCompletedEventArgsSystem.result;
                expect(result).not.toBeNull();
                expect(result.defaultGuide).not.toBeNull();
                expect(result.defaultGuide.count).toEqual(5);
                expect(result.solutionItems).not.toBeNull();
                service.destroy();
                expect(service.events == null).toBeTruthy();
                expect(service.eventListeners == null).toBeTruthy();
                params.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("TransferSolutionService_" + exception.name + ":" + exception.message);
                service.destroy();
                params.destroy();
                done();
            }
        },2000);
    });
});
