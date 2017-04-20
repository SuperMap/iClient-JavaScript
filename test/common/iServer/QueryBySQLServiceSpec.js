require('../../../src/common/iServer/QueryBySQLService');

var serviceFailedEventArgsSystem=null;
var queryEventArgsSystem=null;
var worldMapURL = GlobeParameter.mapServiceURL + "World Map";

function initQueryBySQLService() {
    return new SuperMap.REST.QueryBySQLService(worldMapURL);
}
var options = {
    eventListeners: {
        'processFailed':QueryBySQLFailed,
        'processCompleted':QueryBySQLCompleted
    }
};
function initQueryBySQLService_Register(){
    return new SuperMap.REST.QueryBySQLService(worldMapURL, options);
}
function QueryBySQLFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}
function QueryBySQLCompleted(queryEventArgs){
    queryEventArgsSystem=queryEventArgs;
}

describe('testQueryBySQLService_constructor',function(){
    it('constructor and destroy',function(){
        var queryBySQLService = initQueryBySQLService();
        expect(queryBySQLService).not.toBeNull();
        expect(queryBySQLService.url).toEqual(worldMapURL+ "/queryResults.jsonp?");
        queryBySQLService.destroy();
        expect(queryBySQLService.EVENT_TYPES).toBeNull();
        expect(queryBySQLService.events).toBeNull();
        expect(queryBySQLService.returnContent).toBeNull();
    })
});

describe('testQueryBySQLService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceFailedEventArgsSystem=null;
        queryEventArgsSystem=null;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //不直接返回查询结果
    it('notReturnContent',function(done){
        var queryBySQLService = initQueryBySQLService_Register();
        var queryBySQLParameters = new SuperMap.QueryBySQLParameters({
            customParams:null,
            expectCount:100,
            networkType: SuperMap.GeometryType.POINT,
            queryOption: SuperMap.QueryOption.ATTRIBUTE,
            queryParams:new Array(new SuperMap.FilterParameter({
                attributeFilter:"SmID>0",
                name:"Countries@World"
            })),
            returnContent:false
        });
        queryBySQLParameters.startRecord=0;
        queryBySQLParameters.holdTime=10;
        returnCustomResult=false;
        queryBySQLService.processAsync(queryBySQLParameters);

        setTimeout(function() {
            try{
                var queryResult= queryEventArgsSystem.result;
                expect(queryResult).not.toBeNull();
                expect(queryResult.succeed).toBeTruthy();
                expect(queryResult.newResourceLocation).not.toBeNull();
                expect(queryResult.newResourceLocation.length).toBeGreaterThan(0);
                expect(queryResult.newResourceID).not.toBeNull();
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                done();
            }
        },6000)
    });

    //直接返回查询结果
    it('returnContent',function(done){
        var queryBySQLService = initQueryBySQLService_Register();
        var queryBySQLParameters = new SuperMap.QueryBySQLParameters({
            customParams:null,
            expectCount:100,
            networkType: SuperMap.GeometryType.POINT,
            queryOption: SuperMap.QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams:new Array(
               /* new SuperMap.FilterParameter({
                    attributeFilter:"SmID<3",
                    name:"CountryLabel@World"
                }),*/    //geojason暂不支持文本查询，后续会改进
                new SuperMap.FilterParameter({
                    attributeFilter:"SmID<3",
                    name:"Capitals@World"
                }),
                new SuperMap.FilterParameter({
                    attributeFilter:"SmID<3",
                    name:"Countries@World",
                    fields:new Array("COLOR_MAP","CAPITAL")
                })),
            returnContent:true
        });
        queryBySQLParameters.startRecord=0;
        queryBySQLParameters.holdTime=10;
        queryBySQLParameters.returnCustomResult=false;
        queryBySQLService.events.on({'processCompleted':QueryBySQLCompleted});
       // queryBySQLService.processAsync();    //此代码纯粹是为了提高覆盖率
        queryBySQLService.processAsync(queryBySQLParameters);

        setTimeout(function() {
            try{
                var queryResult=  queryEventArgsSystem.result;
                expect(queryResult).not.toBeNull();
                expect(queryEventArgsSystem.result[0].type).toBe("FeatureCollection");
                expect(queryEventArgsSystem.result[0].features).not.toBeNull();
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                done();
            }
        },6000)
    });

    //返回bounds信息
    it('returnCustomResult',function(done){
        var queryBySQLService = initQueryBySQLService_Register();
        var queryBySQLParameters = new SuperMap.QueryBySQLParameters({
            customParams:null,
            expectCount:100,
            networkType: SuperMap.GeometryType.POINT,
            queryOption: SuperMap.QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams:new Array(new SuperMap.FilterParameter({
                attributeFilter:"SmID=50",
                name:"Countries@World",
                fields:null
            })),
            returnContent:false
        });
        queryBySQLParameters.startRecord=0;
        queryBySQLParameters.holdTime=10;
        queryBySQLParameters.returnCustomResult=true;
        queryBySQLService.processAsync(queryBySQLParameters);

        setTimeout(function() {
            try{
                queryResult= queryEventArgsSystem.result;
                expect(queryResult).not.toBeNull();
                expect(queryResult.newResourceLocation).not.toBeNull();
                expect(queryResult.newResourceLocation.length).toBeGreaterThan(0);
                expect(queryResult.newResourceID).not.toBeNull();
                expect(queryResult.customResult).not.toBeNull();
                expect(queryResult.customResult.bottom).toEqual(19.499065399169922);
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                done();
            }
        },6000)
    });

    it('noParams',function(done){
        var queryBySQLService = initQueryBySQLService_Register();
        var queryBySQLParameters = new SuperMap.QueryBySQLParameters({
            customParams:null,
            expectCount:100,
            networkType: SuperMap.GeometryType.POINT,
            queryOption: SuperMap.QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams:new Array()
        });
        queryBySQLService.events.on({'processFailed':QueryBySQLFailed});
        queryBySQLService.processAsync(queryBySQLParameters);

        setTimeout(function() {
            try{
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                done();
            }catch(excepion){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                done();
            }
        },6000);
    });

    //查询目标图层不存在情况
    it('LayerNotExist',function(done){
        var queryBySQLService = initQueryBySQLService_Register();
        var queryBySQLParameters = new SuperMap.QueryBySQLParameters({
            customParams:null,
            expectCount:100,
            networkType: SuperMap.GeometryType.POINT,
            queryOption: SuperMap.QueryOption.ATTRIBUTE,
            queryParams:new Array(new SuperMap.FilterParameter({
                attributeFilter:"SmID>0",
                name:"notExist",
            })),
            returnContent:false
        });
        queryBySQLService.events.on({'processFailed':QueryBySQLFailed});
        queryBySQLService.processAsync(queryBySQLParameters );

        setTimeout(function() {
            try{
                expect(queryEventArgsSystem).toBeNull();
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("查询目标图层不存在");
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                done();
            }catch(excepion){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                done();
            }
        },6000);
    })
});
