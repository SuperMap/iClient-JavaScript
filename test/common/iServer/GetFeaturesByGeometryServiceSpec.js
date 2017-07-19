require('../../../src/common/iServer/GetFeaturesByGeometryService');

var serviceFailedEventArgsSystem = null;
var getFeatureEventArgsSystem = null;
var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
    eventListeners: {
        processCompleted: getFeaturesByGeometryCompleted,
        processFailed: getFeaturesByGeometryFailed
    }
};
function initGetFeaturesByGeometryService() {
    return new SuperMap.GetFeaturesByGeometryService(dataServiceURL,options);
}
function getFeaturesByGeometryFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}
function getFeaturesByGeometryCompleted(getFeaturesEventArgs){
    getFeatureEventArgsSystem=getFeaturesEventArgs;
}

describe('testGetFeaturesByGeometryService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //不直接返回查询结果
    it('NotReturnContent',function(done){
        var point = new SuperMap.Geometry.Point(112,36);
        var getFeaturesByGeometryParameters = new SuperMap.GetFeaturesByGeometryParameters({
            returnContent:false,
            datasetNames: ["World:Countries"],
            fields: ["SMID"],
            fromIndex: 0,
            toIndex:-1,
            spatialQueryMode:SuperMap.SpatialQueryMode.INTERSECT,
            geometry:point
        });
        var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
        getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);

        setTimeout(function(){
            try{
                var getFeaturesResult = getFeatureEventArgsSystem.result;
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(getFeaturesResult).not.toBeNull();
                expect(getFeaturesResult.newResourceID).not.toBeNull();
                expect(getFeaturesResult.newResourceLocation).not.toBeNull();
                getFeaturesByGeometryService.destroy();
                expect(getFeaturesByGeometryService.EVENT_TYPES).toBeNull();
                expect(getFeaturesByGeometryService.events).toBeNull();
                expect(getFeaturesByGeometryService.eventListeners).toBeNull();
                expect(getFeaturesByGeometryService.returnContent).toBeNull();
                getFeaturesByGeometryParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GetFeaturesByGeometryService_" + exception.name + ":" + exception.message);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            }
        },4000);
    });

    //直接返回结果情况
    it('returnContent',function(done){
        var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
        var point = new SuperMap.Geometry.Point(112, 36);
        var getFeaturesByGeometryParameters = new SuperMap.GetFeaturesByGeometryParameters({
            datasetNames: ["World:Countries"],
            toIndex: -1,
            spatialQueryMode:SuperMap.SpatialQueryMode.INTERSECT,
            geometry:point
        });
        getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);

        setTimeout(function(){
            try{
                var getFeaturesResult = getFeatureEventArgsSystem.result.features;
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(getFeaturesResult).not.toBeNull();
                expect(getFeaturesResult.type).toBe("FeatureCollection");
                expect(getFeaturesResult.features).not.toBeNull();
                expect(getFeaturesResult.features[0].type).toBe("Feature");
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GetFeaturesByGeometryService_" + exception.name + ":" + exception.message);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            }
        },4000);
    });

    //具有attributeFilter直接返回结果情况
    it('returnContent_withAttributeFilter',function(done){
        var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
        var point = new SuperMap.Geometry.Point(112, 36);
        var getFeaturesByGeometryParameters = new SuperMap.GetFeaturesByGeometryParameters({
            datasetNames: ["World:Countries"],
            toIndex: -1,
            attributeFilter: "SMID<100",
            spatialQueryMode:SuperMap.SpatialQueryMode.INTERSECT,
            geometry:point
        });
        getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);

        setTimeout(function(){
            try{
                var getFeaturesResult = getFeatureEventArgsSystem.result.features;
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(getFeaturesResult).not.toBeNull();
                expect(getFeaturesResult.type).toBe("FeatureCollection");
                expect(getFeaturesResult.features.length).toEqual(0);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GetFeaturesByGeometryService_" + exception.name + ":" + exception.message);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            }
        },4000);
    });

    //测试没有传入参数时的情况
    it('noParams',function(done){
        var getFeaturesByGeometryParameters = new SuperMap.GetFeaturesByGeometryParameters({
            returnContent:false,
            datasetNames: ["World:Capitals"],
            toIndex: -1,
            spatialQueryMode: SuperMap.SpatialQueryMode.CONTAIN
        });
        var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
        getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);

        setTimeout(function(){
            try{
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(serviceFailedEventArgsSystem.result).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GetFeaturesByGeometryService_" + exception.name + ":" + exception.message);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            }
        },4000);
    });

    //查询目标图层不存在情况
    it('LayerNotExist',function(done){
        var point = new SuperMap.Geometry.Point(112, 36);
        var getFeaturesByGeometryParameters = new SuperMap.GetFeaturesByGeometryParameters({
            returnContent:false,
            datasetNames: ["World:CountriesNotExsit"],
            toIndex: -1,
            spatialQueryMode:SuperMap.SpatialQueryMode.INTERSECT,
            geometry:point
        });
        var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
        getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters );

        setTimeout(function(){
            try{
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(serviceFailedEventArgsSystem.result).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("GetFeaturesByGeometryService_" + exception.name + ":" + exception.message);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            }
        },4000);
    });
});
