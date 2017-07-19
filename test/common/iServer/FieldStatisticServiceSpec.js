require('../../../src/common/iServer/FieldStatisticService');

var serviceFailedEventArgsSystem = null;
var fieldStatisticEventArgsSystem = null;
var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
    eventListeners:{
        'processCompleted': fieldStatisticCompleted,
        'processFailed':fieldStatisticFailed
    }
};
function initFieldStatisticService() {
    return new SuperMap.FieldStatisticService(dataServiceURL, options);
}
function fieldStatisticCompleted(getFeaturesEventArgs){
    fieldStatisticEventArgsSystem = getFeaturesEventArgs;
}
function fieldStatisticFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

describe('testFieldStatisticService_processAsync', function () {
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //存在对应数据源数据集返回查询结果
    it('getResult', function (done) {
        var fieldStatisticService =initFieldStatisticService();
        expect(fieldStatisticService).not.toBeNull();
        expect(fieldStatisticService.url).toBe(dataServiceURL);
        fieldStatisticService.dataset = "Countries";
        fieldStatisticService.datasource = "World";
        fieldStatisticService.field = "SmID";
        fieldStatisticService.statisticMode = SuperMap.StatisticMode.AVERAGE;
        fieldStatisticService.events.on({'processCompleted': fieldStatisticCompleted});
        fieldStatisticService.processAsync();
        setTimeout(function(){
            try{
                expect(fieldStatisticEventArgsSystem).not.toBeNull();
                expect(fieldStatisticEventArgsSystem.result.mode).toBe("AVERAGE");
                expect(fieldStatisticEventArgsSystem.result.result).toEqual(124);
                fieldStatisticService.destroy();
                expect(fieldStatisticService.EVENT_TYPES).toBeNull();
                expect(fieldStatisticService.events).toBeNull();
                expect(fieldStatisticService.datasource).toBeNull();
                expect(fieldStatisticService.field).toBeNull();
                expect(fieldStatisticService.statisticMode).toBeNull();
                expect(fieldStatisticService.dataset).toBeNull();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                fieldStatisticService.destroy();
                done();
            }
        },2000);
    });

    //错误数据集，查询错误
    it('WrongDatasets', function (done){
        var fieldStatisticService = initFieldStatisticService();
        fieldStatisticService.dataset = "NoDataset";
        fieldStatisticService.datasource = "World";
        fieldStatisticService.field = "NotIDThis";
        fieldStatisticService.statisticMode = SuperMap.StatisticMode.AVERAGE;
        fieldStatisticService.events.on({'processFailed': fieldStatisticFailed});
        fieldStatisticService.processAsync();
        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(500);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                fieldStatisticService.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                fieldStatisticService.destroy();
                done();
            }
        },2000);
    })
});
