require('../../../src/common/iServer/GetFieldsService');

var serviceFailedEventArgsSystem=null;
var getFieldsEventArgsSystem=null;
var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
    eventListeners: {
        processCompleted: getFieldsCompleted,
        processFailed: getFieldsFailed
    }
};
function initGetFieldsService() {
    return new SuperMap.GetFieldsService(dataServiceURL, options);
}
function getFieldsFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}
function getFieldsCompleted(getFieldsEventArgs){
    getFieldsEventArgsSystem=getFieldsEventArgs;
}


describe('testGetFieldsService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //存在对应数据源数据集返回查询结果
    it('getResult',function(done){
        var getFieldsService = initGetFieldsService();
        expect(getFieldsService).not.toBeNull();
        getFieldsService.dataset = "Countries";
        getFieldsService.datasource = "World";
        getFieldsService.events.on({'processCompleted': getFieldsCompleted});
        getFieldsService.processAsync();

        setTimeout(function(){
            try{
                var getFieldsResult = getFieldsEventArgsSystem.result;
                expect(getFieldsEventArgsSystem).not.toBeNull();
                expect(getFieldsResult).not.toBeNull();
                expect(getFieldsResult.fieldNames).not.toBeNull();
                expect(getFieldsResult.fieldNames.length).toEqual(17);
                expect(getFieldsResult.childUriList).not.toBeNull();
                getFieldsService.destroy();
                expect(getFieldsService.EVENT_TYPES).toBeNull();
                expect(getFieldsService.events).toBeNull();
                expect(getFieldsService.datasource).toBeNull();
                expect(getFieldsService.dataset).toBeNull();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("GetFieldsService_" + exception.name + ":" + exception.message);
                getFieldsService.destroy();
                done();
            }
        },2000)
    });

    //错误数据集，查询错误
    it('wrongDataset',function(done){
        var getFieldsService = initGetFieldsService();
        getFieldsService.dataset = "NoDataset";
        getFieldsService.datasource = "World";
        getFieldsService.events.on({'processFailed': getFieldsFailed});
        getFieldsService.processAsync();

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(404);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                getFieldsService.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("GetFieldsService_" + exception.name + ":" + exception.message);
                getFieldsService.destroy();
                done();
            }
        },2000);
    });
});
