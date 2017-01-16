module("UpdateEdgeWeightService");

var serviceFailedEventArgsSystem = null;

//服务初始化时注册事件监听函数
function initUpdateEdgeWeightService_RegisterListener() {
    var myUpdateEdgeWeightService = new SuperMap.REST.UpdateEdgeWeightService(GlobeParameter.networkAnalystURL, {eventListeners:{'processFailed': updateEdgeWeightFailed}});
    return myUpdateEdgeWeightService;
}

function updateEdgeWeightFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

asyncTest("TestUpdateEdgeWeightService_Constructor",function(){
    var url = GlobeParameter.networkAnalystURL;
    var myUpdateEdgeWeightService = new SuperMap.REST.UpdateEdgeWeightService(url);
    ok(myUpdateEdgeWeightService instanceof SuperMap.REST.UpdateEdgeWeightService, "not null");
    myUpdateEdgeWeightService.processAsync();
    setTimeout(function() {
        try{
            var analystResult = myUpdateEdgeWeightService.lastResult;

            if(analystResult){
                ok(analystResult.updateResult != null, "updateResult");
            }

            myUpdateEdgeWeightService.destroy();
            equal(myUpdateEdgeWeightService.EVENT_TYPES, null,"myUpdateEdgeWeightService.EVENT_TYPES");
            equal(myUpdateEdgeWeightService.events, null,"myUpdateEdgeWeightService.events");
            equal(myUpdateEdgeWeightService.eventListeners, null,"myUpdateEdgeWeightService.eventListeners");
            equal(myUpdateEdgeWeightService.lastResult, null,"myUpdateEdgeWeightService.lastResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },5000)
});