module("UpdateTurnNodeWeightService");

var serviceFailedEventArgsSystem = null;

//服务初始化时注册事件监听函数
function initUpdateTurnNodeWeightService_RegisterListener() {
    var myUpdateTurnNodeWeightService = new SuperMap.REST.UpdateTurnNodeWeightService(GlobeParameter.networkAnalystURL, {eventListeners:{'processFailed': updateTurnNodeWeightFailed}});
    return myUpdateTurnNodeWeightService;
}

function updateTurnNodeWeightFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

asyncTest("TestUpdateTurnNodeWeightService_Constructor",function(){
    var url = GlobeParameter.networkAnalystURL;
    var myUpdateTurnNodeWeightService = new SuperMap.REST.UpdateTurnNodeWeightService(url);
    ok(myUpdateTurnNodeWeightService instanceof SuperMap.REST.UpdateTurnNodeWeightService, "not null");
    myUpdateTurnNodeWeightService.processAsync();
    setTimeout(function() {
        try{
            var analystResult = myUpdateTurnNodeWeightService.lastResult;

            if(analystResult){
                ok(analystResult.updateResult != null, "updateResult");
            }

            myUpdateTurnNodeWeightService.destroy();
            equal(myUpdateTurnNodeWeightService.EVENT_TYPES, null,"myUpdateTurnNodeWeightService.EVENT_TYPES");
            equal(myUpdateTurnNodeWeightService.events, null,"myUpdateTurnNodeWeightService.events");
            equal(myUpdateTurnNodeWeightService.eventListeners, null,"myUpdateTurnNodeWeightService.eventListeners");
            equal(myUpdateTurnNodeWeightService.lastResult, null,"myUpdateTurnNodeWeightService.lastResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },5000)
});