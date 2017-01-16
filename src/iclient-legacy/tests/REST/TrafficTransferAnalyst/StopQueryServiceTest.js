module("StopQueryService");

function initStopQueryService() {
    return new SuperMap.REST.StopQueryService(GlobeParameter.trafficTransferURL, {
        eventListeners: {
            processCompleted: succeed,
            processFailed: failed
        }
    });
    function succeed(event) {
    
    }
    function failed(event) {
    
    }
}
test("StopQueryService_noparams", function(){
    expect(1);
    var service = initStopQueryService();
    var undefined = service.processAsync();
    ok(typeof(undefined) === "undefined", "undefined");
});

asyncTest("StopQueryService_success_returnPosition", function(){
    expect(6);
    var service = initStopQueryService();
    
    var params = new SuperMap.REST.StopQueryParameters({
        keyWord: '人民',
        returnPosition: true
    });
    service.processAsync(params);
    
    setTimeout(function() {
        try{
            var result = service.lastResult;
            ok(result !== null,"service.lastResult");
            ok(result.transferStopInfos.length > 0, "result.transferStopInfos.length");
            ok(result.transferStopInfos[0].position !== null,"result.transferStopInfos[0].position");
                  
            service.destroy();
            ok(service.eventListeners === null,"service.eventListeners");
            ok(service.events === null,"service.events");
            ok(service.lastResult === null,"service.lastResult");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
            }
    },6000);
});
asyncTest("StopQueryService_success_returnPosition_false", function(){
    expect(6);
    var service = initStopQueryService();
    
    var params = new SuperMap.REST.StopQueryParameters({
        keyWord: '人民',
        returnPosition: false
    });
    service.processAsync(params);
    
    setTimeout(function() {
        try{
            var result = service.lastResult;
            ok(result !== null,"service.lastResult");
            ok(result.transferStopInfos.length > 0, "result.transferStopInfos.length");
            ok(result.transferStopInfos[0].position === null,"result.transferStopInfos[0].position");
                  
            service.destroy();
            ok(service.eventListeners === null,"service.eventListeners");
            ok(service.events === null,"service.events");
            ok(service.lastResult === null,"service.lastResult");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
            }
    },6000);
});