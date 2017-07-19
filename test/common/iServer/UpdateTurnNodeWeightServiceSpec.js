require('../../../src/common/iServer/UpdateTurnNodeWeightService');

var serviceFailedEventArgsSystem = null;
var serviceCompletedEventArgsSystem = null;

//服务初始化时注册事件监听函数
var networkAnalystURL = GlobeParameter.networkAnalystURL;
function initUpdateTurnNodeWeightService_RegisterListener() {
    return new SuperMap.UpdateTurnNodeWeightService(networkAnalystURL,
        {eventListeners:{
            'processFailed':updateTurnNodeWeightFailed,
            'processCompleted': updateTurnNodeWeightCompleted
        }}
    );
}
function updateTurnNodeWeightFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
function updateTurnNodeWeightCompleted(serviceCompletedEventArgs){
    serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
}

describe('testUpdateTurnNodeWeightService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('basicTest',function(done){
        var myUpdateTurnNodeWeightService = initUpdateTurnNodeWeightService_RegisterListener();
        expect(myUpdateTurnNodeWeightService).not.toBeNull();
        myUpdateTurnNodeWeightService.processAsync();

        setTimeout(function() {
            try{
                expect(typeof(myUpdateTurnNodeWeightService.processAsync()) === "undefined").toBeTruthy();
                myUpdateTurnNodeWeightService.destroy();
                expect(myUpdateTurnNodeWeightService.EVENT_TYPES).toBeNull();
                expect(myUpdateTurnNodeWeightService.events).toBeNull();
                expect(myUpdateTurnNodeWeightService.eventListeners).toBeNull();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("UpdateTurnNodeWeightService_" + exception.name + ":" + exception.message);
                myUpdateTurnNodeWeightService.destroy();
                done();
            }
        },2000)
    })
});