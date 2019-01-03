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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?");
            expect(params).not.toBeNull();
            expect(params).toContain("'name':\"Countries@World\"");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"f701028a2b7144b19b582f55c1902b18_86887442ecde4880b55f40812fd898b6","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World Map/queryResults/f701028a2b7144b19b582f55c1902b18_86887442ecde4880b55f40812fd898b6.json"}`));
        });
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?returnContent=true");
            expect(params).not.toBeNull();
            expect(params).toContain("'name':\"Countries@World\"");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(queryResultJson)));
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?returnCustomResult=true");
            expect(params).not.toBeNull();
            expect(params).toContain("attributeFilter':\"SmID=50\"");
            expect(params).toContain("'name':\"Countries@World\"");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"f701028a2b7144b19b582f55c1902b18_4fbe0a1122a947978a94aaf1f7a3bd2e","succeed":true,"customResult":{"top":33.17113494873047,"left":9.31138801574707,"bottom":19.499065399169922,"leftBottom":{"x":9.31138801574707,"y":19.499065399169922},"right":25.15166473388672,"rightTop":{"x":25.15166473388672,"y":33.17113494873047}},"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World Map/queryResults/f701028a2b7144b19b582f55c1902b18_4fbe0a1122a947978a94aaf1f7a3bd2e.json"}`));
        });
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?returnContent=true");
            expect(params).not.toBeNull();
            expect(params).toContain("'holdTime':10");
            expect(params).toContain("'networkType':\"POINT\"");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数 queryParameters 非法，queryParameters.queryParams 不能为空。"}}`));
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?");
            expect(params).not.toBeNull();
            expect(params).toContain("'attributeFilter':\"SmID%26gt;0\"");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"查询目标图层不存在。(notExist)"}}`));
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
            returnContent: true
        });
        queryBySQLParameters.startRecord = 0;
        queryBySQLParameters.holdTime = 10;
        queryBySQLParameters.returnCustomResult = false;

        spyOn(FetchRequest, 'post').and.callFake((url, params, options) => {
            expect(url).toBe(worldMapURL + "/queryResults.json?returnContent=true");
            expect(params).not.toBeNull();
            expect(params).toContain("'name':\"Countries@World\"");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(queryResultJson)));
        });

        queryBySQLService.processAsync(queryBySQLParameters);
        setTimeout(() => {
            try {
                var queryResult = serviceSuccessEventArgs.result.recordsets[0].features;
                expect(queryResult).not.toBeNull();
                expect(queryResult.type).toBe("FeatureCollection");
                expect(queryResult.features.length).toBe(1);
                expect(queryResult.features[0].properties).not.toBeNull();
                expect(queryResult.features[0].properties["CAPITAL"]).toBe('拉巴斯');
                expect(queryResult.features[0].properties["SmID"]).toEqual('59');
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
