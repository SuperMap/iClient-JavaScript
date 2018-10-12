import { QueryBySQLService } from '../../../src/common/iServer/QueryBySQLService';
import { QueryBySQLParameters } from '../../../src/common/iServer/QueryBySQLParameters';
import { FilterParameter } from '../../../src/common/iServer/FilterParameter';
import { GeometryType } from '../../../src/common/REST';
import { QueryOption } from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
describe('testQueryBySQLService_processAsync', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor, destroy', () => {
        var queryBySQLService = new QueryBySQLService(worldMapURL);
        expect(queryBySQLService).not.toBeNull();
        expect(queryBySQLService.url).toEqual(worldMapURL + "/queryResults.json?");
        queryBySQLService.destroy();
        expect(queryBySQLService.EVENT_TYPES).toBeNull();
        expect(queryBySQLService.events).toBeNull();
        expect(queryBySQLService.returnContent).toBeNull();
    });

    //不直接返回查询结果
    it('processAsync_returnContent:false', (done) => {
        var queryFailedEventArgs = null, serviceSuccessEventArgs = null;
        var QueryBySQLFailed = (serviceFailedEventArgs) => {
            queryFailedEventArgs = serviceFailedEventArgs;
        };
        var QueryBySQLCompleted = (queryEventArgs) => {
            serviceSuccessEventArgs = queryEventArgs;
        };
        var options = {
            eventListeners: {
                'processFailed': QueryBySQLFailed,
                'processCompleted': QueryBySQLCompleted
            }
        };
        var queryBySQLService = new QueryBySQLService(worldMapURL, options);
        var queryBySQLParameters = new QueryBySQLParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTE,
            queryParams: new Array(new FilterParameter({
                attributeFilter: "SmID>0",
                name: "Countries@World"
            })),
            returnContent: false
        });
        queryBySQLParameters.startRecord = 0;
        queryBySQLParameters.holdTime = 10;
        queryBySQLParameters.returnCustomResult = false;
        queryBySQLService.processAsync(queryBySQLParameters);
        setTimeout(() => {
            try {
                var queryResult = serviceSuccessEventArgs.result;
                expect(queryResult).not.toBeNull();
                expect(queryResult.succeed).toBeTruthy();
                expect(queryResult.newResourceLocation).not.toBeNull();
                expect(queryResult.newResourceLocation.length).toBeGreaterThan(0);
                expect(queryResult.newResourceID).not.toBeNull();
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                queryFailedEventArgs = null;
                serviceSuccessEventArgs = null;
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryBySQLService_" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                queryFailedEventArgs = null;
                serviceSuccessEventArgs = null;
                done();
            }
        }, 2000)
    });

    //直接返回查询结果
    it('processAsync_returnContent:true', (done) => {
        var queryFailedEventArgs = null, serviceSuccessEventArgs = null;
        var QueryBySQLFailed = (serviceFailedEventArgs) => {
            queryFailedEventArgs = serviceFailedEventArgs;
        };
        var QueryBySQLCompleted = (queryEventArgs) => {
            serviceSuccessEventArgs = queryEventArgs;
        };
        var options = {
            eventListeners: {
                'processFailed': QueryBySQLFailed,
                'processCompleted': QueryBySQLCompleted
            }
        };
        var queryBySQLService = new QueryBySQLService(worldMapURL, options);
        var queryBySQLParameters = new QueryBySQLParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams: [
                new FilterParameter({
                    attributeFilter: "SmID<3",
                    name: "Capitals@World"
                }),
                new FilterParameter({
                    attributeFilter: "SmID<3",
                    name: "Countries@World",
                    fields: new Array("COLOR_MAP", "CAPITAL")
                })],
            returnContent: true,
            startRecord: 0,
            holdTime: 10
        });
        queryBySQLService.events.on({'processCompleted': QueryBySQLCompleted});
        queryBySQLService.processAsync(queryBySQLParameters);
        setTimeout(() => {
            try {
                var queryResult = serviceSuccessEventArgs.result.recordsets[0].features;
                expect(queryResult).not.toBeNull();
                expect(queryResult.type).toBe("FeatureCollection");
                expect(queryResult.features).not.toBeNull();
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                queryFailedEventArgs = null;
                serviceSuccessEventArgs = null;
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryBySQLService_" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                queryFailedEventArgs = null;
                serviceSuccessEventArgs = null;
                done();
            }
        }, 4000)
    });

    //返回bounds信息
    it('processAsync_returnCustomResult', (done) => {
        var queryFailedEventArgs = null, serviceSuccessEventArgs = null;
        var QueryBySQLFailed = (serviceFailedEventArgs) => {
            queryFailedEventArgs = serviceFailedEventArgs;
        };
        var QueryBySQLCompleted = (queryEventArgs) => {
            serviceSuccessEventArgs = queryEventArgs;
        };
        var options = {
            eventListeners: {
                'processFailed': QueryBySQLFailed,
                'processCompleted': QueryBySQLCompleted
            }
        };
        var queryBySQLService = new QueryBySQLService(worldMapURL, options);
        var queryBySQLParameters = new QueryBySQLParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams: new Array(new FilterParameter({
                attributeFilter: "SmID=50",
                name: "Countries@World",
                fields: null
            })),
            returnContent: false
        });
        queryBySQLParameters.startRecord = 0;
        queryBySQLParameters.holdTime = 10;
        queryBySQLParameters.returnCustomResult = true;
        queryBySQLService.processAsync(queryBySQLParameters);
        setTimeout(() => {
            try {
                var queryResult = serviceSuccessEventArgs.result;
                expect(queryResult).not.toBeNull();
                expect(queryResult.newResourceLocation).not.toBeNull();
                expect(queryResult.newResourceLocation.length).toBeGreaterThan(0);
                expect(queryResult.newResourceID).not.toBeNull();
                expect(queryResult.customResult).not.toBeNull();
                expect(queryResult.customResult.bottom).toEqual(19.499065399169922);
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                queryFailedEventArgs = null;
                serviceSuccessEventArgs = null;
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryBySQLService_" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                queryFailedEventArgs = null;
                serviceSuccessEventArgs = null;
                done();
            }
        }, 2000)
    });

    it('processAsync_noParams', (done) => {
        var queryFailedEventArgs = null, serviceSuccessEventArgs = null;
        var QueryBySQLFailed = (serviceFailedEventArgs) => {
            queryFailedEventArgs = serviceFailedEventArgs;
        };
        var QueryBySQLCompleted = (queryEventArgs) => {
            serviceSuccessEventArgs = queryEventArgs;
        };
        var options = {
            eventListeners: {
                'processFailed': QueryBySQLFailed,
                'processCompleted': QueryBySQLCompleted
            }
        };
        var queryBySQLService = new QueryBySQLService(worldMapURL, options);
        var queryBySQLParameters = new QueryBySQLParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams: new Array()
        });
        queryBySQLService.events.on({'processFailed': QueryBySQLFailed});
        queryBySQLService.processAsync(queryBySQLParameters);
        setTimeout(() => {
            try {
                expect(queryFailedEventArgs).not.toBeNull();
                expect(queryFailedEventArgs.error).not.toBeNull();
                expect(queryFailedEventArgs.error.code).toEqual(400);
                expect(queryFailedEventArgs.error.errorMsg).not.toBeNull();
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                queryFailedEventArgs = null;
                serviceSuccessEventArgs = null;
                done();
            } catch (exception) {
                console.log("QueryBySQLService_" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                queryFailedEventArgs = null;
                serviceSuccessEventArgs = null;
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    //查询目标图层不存在情况
    it('processAsync_LayerNotExist', (done) => {
        var queryFailedEventArgs = null, serviceSuccessEventArgs = null;
        var QueryBySQLFailed = (serviceFailedEventArgs) => {
            queryFailedEventArgs = serviceFailedEventArgs;
        };
        var QueryBySQLCompleted = (queryEventArgs) => {
            serviceSuccessEventArgs = queryEventArgs;
        };
        var options = {
            eventListeners: {
                'processFailed': QueryBySQLFailed,
                'processCompleted': QueryBySQLCompleted
            }
        };
        var queryBySQLService = new QueryBySQLService(worldMapURL, options);
        var queryBySQLParameters = new QueryBySQLParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTE,
            queryParams: new Array(new FilterParameter({
                attributeFilter: "SmID>0",
                name: "notExist"
            })),
            returnContent: false
        });
        queryBySQLService.events.on({'processFailed': QueryBySQLFailed});
        queryBySQLService.processAsync(queryBySQLParameters);
        setTimeout(() => {
            try {
                expect(serviceSuccessEventArgs).toBeNull();
                expect(queryFailedEventArgs).not.toBeNull();
                expect(queryFailedEventArgs.error).not.toBeNull();
                expect(queryFailedEventArgs.error.code).toEqual(400);
                expect(queryFailedEventArgs.error.errorMsg).not.toBeNull();
                expect(queryFailedEventArgs.error.errorMsg).toContain("查询目标图层不存在");
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                queryFailedEventArgs = null;
                serviceSuccessEventArgs = null;
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryBySQLService_" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                queryFailedEventArgs = null;
                serviceSuccessEventArgs = null;
                done();
            }
        }, 2000);
    });

    //测试字段别名 #20
    it('processAsync_returnFeatureWithFieldCaption:true_#20', (done) => {
        var queryFailedEventArgs = null, serviceSuccessEventArgs = null;
        var QueryBySQLFailed = (serviceFailedEventArgs) => {
            queryFailedEventArgs = serviceFailedEventArgs;
        };
        var QueryBySQLCompleted = (queryEventArgs) => {
            serviceSuccessEventArgs = queryEventArgs;
        };
        var options = {
            eventListeners: {
                'processFailed': QueryBySQLFailed,
                'processCompleted': QueryBySQLCompleted
            }
        };
        var queryBySQLService = new QueryBySQLService(worldMapURL, options);
        var queryBySQLParameters = new QueryBySQLParameters({
            customParams: null,
            expectCount: 2,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTE,
            queryParams: new Array(new FilterParameter({
                attributeFilter: "SmID>0",
                name: "Countries@World"
            })),
            returnFeatureWithFieldCaption:true,
            //returnFeatureWithFieldCaption
            returnContent: true
        });
        queryBySQLParameters.startRecord = 0;
        queryBySQLParameters.holdTime = 10;
        queryBySQLParameters.returnCustomResult = false;

        spyOn(FetchRequest, 'post').and.callFake((url, params, options) => {
            // http://54.223.164.155:8090/iserver/services/map-world/rest/maps/World%20Map/queryResults.json?returnContent=true
            expect(url).toBe(worldMapURL + "/queryResults.json?returnContent=true");
            expect(params).not.toBeNull();
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(queryEscapedJson)));
        }); 

        queryBySQLService.processAsync(queryBySQLParameters);
        setTimeout(() => {
            try {
                var queryResult = serviceSuccessEventArgs.result.recordsets[0].features;
                expect(queryResult).not.toBeNull();
                expect(queryResult.type).toBe("FeatureCollection");
                expect(queryResult.features.length).toBe(2);
                expect(queryResult.features[0].properties).not.toBeNull();
                // queryResult.features[0].properties["COLOR_MAP"]
                //  console.log("QueryBySQLService_" + queryResult.features[1].properties["COLOR_MAP"]);   
                expect(queryResult.features[1].properties["ColorIDtest"]).toEqual('1');   
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();

                queryFailedEventArgs = null;
                serviceSuccessEventArgs = null;
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryBySQLService_" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                queryBySQLParameters.destroy();
                queryFailedEventArgs = null;
                serviceSuccessEventArgs = null;
                done();
            }
        }, 4000)
    });
});
