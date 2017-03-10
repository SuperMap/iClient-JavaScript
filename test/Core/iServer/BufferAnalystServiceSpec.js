require('../../../src/Core/iServer/BufferAnalystService');

var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var url = "http://localhost:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst";
var options = {
    eventListeners:{"processCompleted": analyzeCompleted,'processFailed': analyzeFailed}
};
function initBufferAnalystService() {
    return new SuperMap.REST.BufferAnalystService(url, options);
}
function analyzeFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
function analyzeCompleted(analyseEventArgs) {
    analystEventArgsSystem = analyseEventArgs;
}


describe('testBufferAnalystService_processAsync', function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        serviceFailedEventArgsSystem = null;
        analystEventArgsSystem = null;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //测试成功事件
    it('SuccessEvent:byDatasets_NotReturnContent',function(done){
        var bfServiceByDatasets = initBufferAnalystService();
        var resultSetting = new DataReturnOption({
            expectCount: 1000,
            dataset: null,
            dataReturnMode: DataReturnMode.DATASET_ONLY,
            deleteExistResultDataset: true
        });
        var dsBufferAnalystParameters = new DatasetBufferAnalystParameters();
        dsBufferAnalystParameters.dataset = "Landuse_R@Jingjin";
        dsBufferAnalystParameters.filterQueryParameter.attributeFilter = "smid like 48";
        dsBufferAnalystParameters.bufferSetting.endType = BufferEndType.ROUND;
        dsBufferAnalystParameters.bufferSetting.semicircleLineSegment = 5;
        dsBufferAnalystParameters.bufferSetting.leftDistance.value = 100;
        dsBufferAnalystParameters.resultSetting = resultSetting;
        bfServiceByDatasets.processAsync(dsBufferAnalystParameters);

        setTimeout(function(){
            try {
                expect(bfServiceByDatasets.mode).toEqual("datasets");
                expect(analystEventArgsSystem).not.toBeNull();
                bfServiceByDatasets.destroy();
                expect(bfServiceByDatasets.events).toBeNull();
                expect(bfServiceByDatasets.eventListeners).toBeNull();
                expect(bfServiceByDatasets.mode).toBeNull();
                dsBufferAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                bfServiceByDatasets.destroy();
                dsBufferAnalystParameters.destroy();
                done();
            }
        },6000)
    });

});


//GeometryBufferAnalyst在iclient9中暂未添加
/*    it('BufferAnalyzeByGeometry_NotReturnContent',function(done){

     var bfServiceByGeometry = initBufferAnalystService();
     expect(bfServiceByGeometry).not.toBeNull();
     expect(bfServiceByGeometry.url).toEqual(url);

     var sourceGeometry = new SuperMap.Geometry.Point(7884.79277012316, 5072.18865322196);
     var bufferSetting = new SuperMap.REST.BufferSetting();
     bufferSetting.endType = SuperMap.REST.BufferEndType.ROUND;
     bufferSetting.leftDistance.value = 300;
     bufferSetting.semicircleLineSegment = 5;
     var resultSetting = new DataReturnOption({
     expectCount: 1000,
     dataset: "Landuse_R@Jingjin",
     dataReturnMode: DataReturnMode.DATASET_ONLY,
     deleteExistResultDataset: false
     });
     var geometryBufferAnalystParameters = new GeometryBufferAnalystParameters();
     geometryBufferAnalystParameters.sourceGeometry = sourceGeometry;
     geometryBufferAnalystParameters.bufferSetting = bufferSetting;
     geometryBufferAnalystParameters.resultSetting = resultSetting;
     bfServiceByGeometry.processAsync(geometryBufferAnalystParameters);
     done();

     setTimeout(function () {
     try {
       var bfMode = bfServiceByGeometry.mode;
       expect(bfMode).toEqual("geometry");

       bfServiceByGeometry.destroy();
       expect(bfServiceByGeometry.events).toBeNull();
       expect(bfServiceByGeometry.eventListeners).toBeNull();
       expect(bfServiceByGeometry.mode).toBeNull();

       analystEventArgsSystem.destroy();
       expect(analystEventArgsSystem).not.toBeNull();
       expect(analystEventArgsSystem.result).toBeNull();
       done();
     } catch (exception) {
       done();
     }
     }, 10000)
     })*/

/*
//测试失败事件
describe('processAsync_FailedEvent',function(){
    it('BufferAnalyzeByGeometry_NotReturnContent',function(done){
        var bfServiceByGeometry = initBufferAnalystService();
        expect(bfServiceByGeometry).not.toBeNull();
        expect(bfServiceByGeometry.url).toEqual(url);

        var sourceGeometry = new SuperMap.Geometry.Point(7884.79277012316, 5072.18865322196);
        var bufferSetting = new SuperMap.REST.BufferSetting();
        bufferSetting.endType = SuperMap.REST.BufferEndType.ROUND;
        bufferSetting.leftDistance.value = -1;
        bufferSetting.semicircleLineSegment = 5;
        var resultSetting = new DataReturnOption({
            expectCount: 1000,
            dataset: null,
            dataReturnMode: DataReturnMode.DATASET_ONLY,
            deleteExistResultDataset: true
        });
        var geometryBufferAnalystParameters = new GeometryBufferAnalystParameters();
        geometryBufferAnalystParameters.sourceGeometry = sourceGeometry;
        geometryBufferAnalystParameters.bufferSetting = bufferSetting;
        geometryBufferAnalystParameters.resultSetting = resultSetting;

        bfServiceByGeometry.processAsync(geometryBufferAnalystParameters);

        setTimeout(function () {
            try {
                var bfMode = bfServiceByGeometry.mode;
                expect(bfMode).not.toBeNull();
                expect(serviceFailedEventArgsSystem).not.toBeNull();

                bfServiceByGeometry.destroy();
                expect(bfServiceByGeometry.events).toBeNull();
                expect(bfServiceByGeometry.eventListeners).toBeNull();
                expect(bfServiceByGeometry.mode).toBeNull();

                expect(analystEventArgsSystem).not.toBeNull();
                done();
            } catch (exception) {
                expect(false).toBe(true).toThrow("exception occcurs,message is:" + exception.message);
                done();
            }
        }, 10000)
    });
});*/

