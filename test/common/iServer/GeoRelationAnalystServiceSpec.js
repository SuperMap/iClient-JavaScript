require('../../../src/common/iServer/GeoRelationAnalystService');

var completedEventArgsSystem, failedEventArgsSystem;

var url = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    eventListeners: {
        processCompleted: generateSpatialDataCompleted,
        processFailed: generateSpatialDataFailed
    }
};
function initGeoRelationAnalystService() {
    return new SuperMap.GeoRelationAnalystService(url,options);
}
function generateSpatialDataCompleted(completedEventArgs){
    completedEventArgsSystem = completedEventArgs;
}
function generateSpatialDataFailed(failedEventArgs){
    failedEventArgsSystem = failedEventArgs;
}

describe('testGeoRelationAnalystService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //空间关系分析服务，比较返回结果
    it('returnFeature',function(done){
        var referenceFilter = new SuperMap.FilterParameter({
            name:"Frame_R@Changchun",
            attributeFilter:"SMID>0"
        });
        var sourceFilter = new SuperMap.FilterParameter({
            attributeFilter:"SMID>0"});
        var datasetGeoRelationParameters = new SuperMap.GeoRelationAnalystParameters({
            dataset: "Park@Changchun",
            startRecord: 0,
            expectCount: 20,
            sourceFilter: sourceFilter,
            referenceFilter: referenceFilter,
            spatialRelationType: SuperMap.SpatialRelationType.INTERSECT,
            isBorderInside: true,
            returnFeature: true,
            returnGeoRelatedOnly: true
        });
        var datasetRelationService = initGeoRelationAnalystService();
        datasetRelationService.processAsync(datasetGeoRelationParameters);

        setTimeout(function(){
            try{
                expect(datasetRelationService).not.toBeNull();
                expect(completedEventArgsSystem.result).not.toBeNull();
                expect(completedEventArgsSystem.result.length).toEqual(7);
                datasetRelationService.destroy();
                expect(datasetRelationService.EVENT_TYPES).toBeNull();
                expect(datasetRelationService.events).toBeNull();
                expect(datasetRelationService.eventListeners).toBeNull();
                datasetGeoRelationParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GeoRelationAnalystService_" + exception.name + ":" + exception.message);
                datasetRelationService.destroy();
                datasetGeoRelationParameters.destroy();
                done();
            }
        },2000);
    });

    //空间关系分析服务，比较返回结果
    it('Not_returnFeature',function(done){
        var referenceFilter = new SuperMap.FilterParameter({name:"Frame_R@Changchun",attributeFilter:"SMID>0"});
        var sourceFilter = new SuperMap.FilterParameter({
            attributeFilter:"SMID>0"});
        var datasetGeoRelationParameters = new SuperMap.GeoRelationAnalystParameters({
            dataset: "Park@Changchun",
            startRecord: 0,
            expectCount: 5,
            sourceFilter: sourceFilter,
            referenceFilter: referenceFilter,
            spatialRelationType: SuperMap.SpatialRelationType.INTERSECT,
            isBorderInside: true,
            returnFeature: false,
            returnGeoRelatedOnly: true
        });
        var datasetRelationService = initGeoRelationAnalystService();
        datasetRelationService.processAsync(datasetGeoRelationParameters);

        setTimeout(function(){
            try{
                expect(datasetRelationService).not.toBeNull();
                expect(completedEventArgsSystem.result).not.toBeNull();
                expect(completedEventArgsSystem.result.length).toEqual(5);
                datasetRelationService.destroy();
                expect(datasetRelationService.EVENT_TYPES).toBeNull();
                expect(datasetRelationService.events).toBeNull();
                expect(datasetRelationService.eventListeners).toBeNull();
                datasetGeoRelationParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GeoRelationAnalystService_" + exception.name + ":" + exception.message);
                datasetRelationService.destroy();
                datasetGeoRelationParameters.destroy();
                done();
            }
        },2000)
    });

    //空间关系分析服务，比较返回结果
    it('serviceFailed',function(done) {
        var referenceFilter = new SuperMap.FilterParameter({attributeFilter:"SMID>0"});
        var sourceFilter = new SuperMap.FilterParameter({
            attributeFilter:"SMID>0"});
        var datasetGeoRelationParameters = new SuperMap.GeoRelationAnalystParameters({
            dataset: "Park@Changchun",
            sourceFilter: sourceFilter,
            referenceFilter: referenceFilter,
            spatialRelationType: SuperMap.SpatialRelationType.INTERSECT,
            isBorderInside: true,
            returnFeature: false,
            returnGeoRelatedOnly: true
        });
        var datasetRelationService = initGeoRelationAnalystService();
        datasetRelationService.processAsync(datasetGeoRelationParameters);

        setTimeout(function(){
            try{
                expect(failedEventArgsSystem).not.toBeNull();
                expect(failedEventArgsSystem.error).not.toBeNull();
              //  expect(failedEventArgsSystem.error.code).toEqual(400);
               // expect(failedEventArgsSystem.error.errorMsg).not.toBeNull();
                datasetRelationService.destroy();
                expect(datasetRelationService.EVENT_TYPES).toBeNull();
                expect(datasetRelationService.events).toBeNull();
                expect(datasetRelationService.eventListeners).toBeNull();
                datasetGeoRelationParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GeoRelationAnalystService_" + exception.name + ":" + exception.message);
                datasetRelationService.destroy();
                datasetGeoRelationParameters.destroy();
                done();
            }
        },2000)
    });
});

