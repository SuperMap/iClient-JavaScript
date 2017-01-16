module("TransferSolutionService");

function initTransferSolutionService() {
    return new SuperMap.REST.TransferSolutionService(GlobeParameter.trafficTransferURL, {
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
test("TransferSolutionService_noparams", function(){
    expect(1);
    var service = initTransferSolutionService();
    var undefined = service.processAsync();
    ok(typeof(undefined) === "undefined", "undefined");
});

asyncTest("TransferSolutionService_success", function(){
    expect(6);
    var service = initTransferSolutionService();
    
    var params = new SuperMap.REST.TransferSolutionParameters({
        solutionCount: 5,
        transferTactic: SuperMap.REST.TransferTactic.LESS_TIME,
		transferPreference: SuperMap.REST.TransferPreference.NONE,
        walkingRatio: 10,
        points: [175, 179]
    });
    service.processAsync(params);
    
    setTimeout(function() {
        try{
            var result = service.lastResult;
            ok(result != null,"service.lastResult");
			ok(result.solutionItems != null, "result.solutionItems");
            ok(result.transferGuide != null, "result.transferGuides");
            service.destroy();
            ok(service.events == null,"service.events");
            ok(service.lastResult == null,"service.lastResult");
			ok(service.eventListeners == null,"service.eventListeners");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
            }
    },6000);
});