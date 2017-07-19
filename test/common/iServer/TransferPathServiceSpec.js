require('../../../src/common/iServer/TransferPathService');

var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;

var trafficTransferURL = GlobeParameter.trafficTransferURL;
var options = {
    eventListeners:{"processCompleted": succeed,
        "processFailed": failed}
};
function initTransferPathService() {
    return new SuperMap.TransferPathService(trafficTransferURL, options);
}
function succeed(event){
    analystEventArgsSystem = event;
}
function failed(event){
    serviceFailedEventArgsSystem = event;
}

describe('testTransferPathService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('noParams',function(done){
        var service = initTransferPathService();
        service.processAsync();
        setTimeout(function(){
          try{
              expect(typeof(service.processAsync()) === "undefined").toBeTruthy();
              service.destroy();
              done();
          }catch (exception){
              expect(false).toBeTruthy();
              console.log("TransferPathService_" + exception.name + ":" + exception.message);
              service.destroy();
              done();
          }
        },1500)
    });

    it('success',function(done){
        var service = initTransferPathService();
        var params = new SuperMap.TransferPathParameters({
            transferLines: [
                {"lineID":27,"startStopIndex":3,"endStopIndex":4},
                {"lineID":12,"startStopIndex":5,"endStopIndex":9}
            ],
            points: [175, 164]
        });
        service.processAsync(params);

        setTimeout(function() {
            try{
                var result = analystEventArgsSystem.result;
                expect(result).not.toBeNull();
                expect(result.succeed).toBeTruthy();
                expect(result.items.length).toBeGreaterThan(0);
                expect(result.count).toEqual(4);
                expect(result.totalDistance).toEqual(3732.3529872895324);
                service.destroy();
                expect(service.events).toBeNull();
                expect(service.eventListeners).toBeNull();
                params.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("TransferPathService_" + exception.name + ":" + exception.message);
                service.destroy();
                params.destroy();
                done();
            }
        },1500);
    })
});
