module("TransferPathService");

function initTransferPathService() {
    return new SuperMap.REST.TransferPathService(GlobeParameter.trafficTransferURL, {
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
test("TransferPathService_noparams", function(){
    expect(1);
    var service = initTransferPathService();
    var undefined = service.processAsync();
    ok(typeof(undefined) === "undefined", "undefined");
});

asyncTest("TransferPathService_success", function(){
    expect(5);
    var service = initTransferPathService();
    
    var params = new SuperMap.REST.TransferPathParameters({
        transferLines: [{"lineID":27,"startStopIndex":3,"endStopIndex":4},{"lineID":12,"startStopIndex":5,"endStopIndex":9}],
        points: [175, 164]
    });
    service.processAsync(params);
    
    setTimeout(function() {
        try{
            var result = service.lastResult;
            ok(result !== null,"service.lastResult");
            ok(result.transferGuide.items.length > 0, "result.transferGuide.items.length");
                  
            service.destroy();
            ok(service.events === null,"service.events");
            ok(service.lastResult === null,"service.lastResult");
			ok(service.eventListeners === null,"service.eventListeners");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
            }
    },6000);
});