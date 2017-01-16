module("GetLayersInfoService");

function initService(url) {
    return new SuperMap.REST.GetLayersInfoService(url, {
        eventListeners: {
            processCompleted: completed,
            processFailed: failed
        }
    });
    function completed(result) {
    }
    function failed(result) {
    }
}
test("GetLayersInfoService_destroy", function() {
    expect(4);
    var service = initService(GlobeParameter.vectorURL);
    
    ok(service !== null, "not null");
    service.destroy();
    ok(service.events === null, "service.events");
    ok(service.eventListeners === null,"service.eventListeners");
    ok(service.lastResult === null, "service.lastResult");
});
asyncTest("GetLayersInfoService_Vector", function(){
    expect(2);
    var service = initService(GlobeParameter.vectorURL);
 
    service.processAsync();
    
    setTimeout(function() {
        try{
            var res = service.lastResult;
            ok(res !== null,"service.lastResult");
            ok(res.subLayers.layers !== null,"subLayers");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
            }
    },6000);
});
asyncTest("GetLayersInfoService_Image", function(){
    expect(2);
    var service = initService(GlobeParameter.imageURL);
 
    service.processAsync();
    
    setTimeout(function() {
        try{
            var res = service.lastResult;
            ok(res !== null,"service.lastResult");
            ok(res.subLayers.layers !== null,"subLayers");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
            }
    },6000);
});
asyncTest("GetLayersInfoService_Grid", function(){
    expect(2);
    var service = initService(GlobeParameter.gridURL);
 
    service.processAsync();
    
    setTimeout(function() {
        try{
            var res = service.lastResult;
            ok(res !== null,"service.lastResult");
            ok(res.subLayers.layers !== null,"subLayers");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
            }
    },6000);
});