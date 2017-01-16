module("FieldStatisticService");
var serviceFailedEventArgsSystem=null;
var fieldStatisticEventArgsSystem=null;
var dataServiceURL = GlobeParameter.dataServiceURL;

function initFieldStatisticService() {
    var fieldStatisticService = new SuperMap.REST.FieldStatisticService(dataServiceURL);
    return fieldStatisticService;
}
function fieldStatisticFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}

function fieldStatisticCompleted(getFeaturesEventArgs){
    fieldStatisticEventArgsSystem=getFeaturesEventArgs;
}

//存在对应数据源数据集返回查询结果
asyncTest("TestFieldStatisticService_getResult",function(){
    expect(12);
    var fieldStatisticService = initFieldStatisticService();
    ok(fieldStatisticService != null,"not null");
    fieldStatisticService.dataset = "Countries";
    fieldStatisticService.datasource = "World";
    fieldStatisticService.field = "SmID";
    fieldStatisticService.statisticMode = SuperMap.REST.StatisticMode.AVERAGE;

    fieldStatisticService.events.on({'processCompleted': fieldStatisticCompleted});
    fieldStatisticService.processAsync();
    setTimeout(function() {
        try{
            var fieldStatisticResult = fieldStatisticService.lastResult;
            ok(fieldStatisticEventArgsSystem != null,"fieldStatisticEventArgsSystem");
            
            ok(fieldStatisticResult != null,"fieldStatisticService.lastResult");
            ok(fieldStatisticResult.mode == SuperMap.REST.StatisticMode.AVERAGE,"fieldStatisticResult.mode");
            ok(fieldStatisticResult.result == 124,"fieldStatisticResult.result");
            
            fieldStatisticService.destroy();
            ok(fieldStatisticService.EVENT_TYPES == null,"fieldStatisticService.EVENT_TYPES");
            ok(fieldStatisticService.events == null,"fieldStatisticService.events");
            ok(fieldStatisticService.lastResult == null,"fieldStatisticService.lastResult");
            ok(fieldStatisticService.datasource == null,"fieldStatisticService.datasource");
            ok(fieldStatisticService.field == null,"fieldStatisticService.field");
            ok(fieldStatisticService.statisticMode == null,"fieldStatisticService.statisticMode");
            ok(fieldStatisticService.dataset == null,"fieldStatisticService.dataset");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },5000)
});

//错误数据集，查询错误
asyncTest("TestFieldStatisticService_Wrong",function(){
    expect(7)
    var fieldStatisticService = initFieldStatisticService();
    ok(fieldStatisticService!=null,"not null");
    fieldStatisticService.dataset = "NoDataset";
    fieldStatisticService.datasource = "World";
    fieldStatisticService.field = "NotIDThis";
    fieldStatisticService.statisticMode = SuperMap.REST.StatisticMode.AVERAGE;
    
    fieldStatisticService.events.on({'processFailed': fieldStatisticFailed});
    fieldStatisticService.processAsync();
    setTimeout(function() {
        try{
            ok(fieldStatisticService.lastResult == null,"fieldStatisticService.lastResult");
            ok(serviceFailedEventArgsSystem!=null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error!=null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,500,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"抛出未被捕获的异常,错误信息是数据集NoDataset在数据源中不存在","serviceFailedEventArgsSystem.error.errorMsg");
            serviceFailedEventArgsSystem.destroy();
            ok(serviceFailedEventArgsSystem.error==null,"serviceFailedEventArgsSystem.error");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },3000);
});
