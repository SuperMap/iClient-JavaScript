module("GetFieldsService");
var serviceFailedEventArgsSystem=null;
var getFieldsEventArgsSystem=null;
var dataServiceURL = GlobeParameter.dataServiceURL;

function initGetFieldsService() {
    var getFieldsService = new SuperMap.REST.GetFieldsService(dataServiceURL);
    return getFieldsService;
}
function getFieldsFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}

function getFieldsCompleted(getFieldsEventArgs){
    getFieldsEventArgsSystem=getFieldsEventArgs;
}

//存在对应数据源数据集返回查询结果
asyncTest("TestGetFieldsService_getResult",function(){
    expect(11);
    var getFieldsService = initGetFieldsService();
    ok(getFieldsService != null,"not null");
    getFieldsService.dataset = "Countries";
    getFieldsService.datasource = "World";

    getFieldsService.events.on({'processCompleted': getFieldsCompleted});
    getFieldsService.processAsync();
    setTimeout(function() {
        try{
            var getFieldsResult = getFieldsService.lastResult;
            ok(getFieldsEventArgsSystem != null,"getFieldsEventArgsSystem");
            
            ok(getFieldsResult != null,"getFieldsService.lastResult");
            ok(getFieldsResult.fieldNames != null,"getFieldsResult.resourceInfo");
            ok(getFieldsResult.childUriList != null,"getFieldsResult.childUriList");
            ok(getFieldsResult.fieldNames.length == 17,"getFieldsResult.fieldNames.length");
            
            getFieldsService.destroy();
            ok(getFieldsService.EVENT_TYPES==null,"getFieldsService.EVENT_TYPES");
            ok(getFieldsService.events==null,"getFieldsService.events");
            ok(getFieldsService.lastResult==null,"getFieldsService.lastResult");
            ok(getFieldsService.datasource==null,"getFieldsService.datasource");
            ok(getFieldsService.dataset==null,"getFieldsService.dataset");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },5000)
});

//错误数据集，查询错误
asyncTest("TestGetFieldsService_Wrong",function(){
    expect(7)
    var getFieldsService = initGetFieldsService();
    ok(getFieldsService!=null,"not null");
    getFieldsService.dataset = "NoDataset";
    getFieldsService.datasource = "World";
    
    getFieldsService.events.on({'processFailed': getFieldsFailed});
    getFieldsService.processAsync();
    setTimeout(function() {
        try{
            ok(getFieldsService.lastResult == null,"getFieldsService.lastResult");
            ok(serviceFailedEventArgsSystem!=null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error!=null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,404,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"资源不存在","serviceFailedEventArgsSystem.error.errorMsg");
            serviceFailedEventArgsSystem.destroy();
            ok(serviceFailedEventArgsSystem.error==null,"serviceFailedEventArgsSystem.error");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },3000);
});
