require('../../../src/common/iServer/QueryBySQLService');
var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
describe('testQueryBySQLService_constructor', function () {
    it('constructor and destroy', function () {
        var queryBySQLService = new SuperMap.QueryBySQLService(worldMapURL);
        expect(queryBySQLService).not.toBeNull();
        expect(queryBySQLService.url).toEqual(worldMapURL + "/queryResults.json?");
        queryBySQLService.destroy();
        expect(queryBySQLService.EVENT_TYPES).toBeNull();
        expect(queryBySQLService.events).toBeNull();
        expect(queryBySQLService.returnContent).toBeNull();
    })
});
describe('testQueryBySQLService_processAsync', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //不直接返回查询结果
    it('notReturnContent', function (done) {
        var queryFailedEventArgs = null, serviceSuccessEventArgs = null;
        var options = {
            eventListeners: {
                'processFailed': QueryBySQLFailed,
                'processCompleted': QueryBySQLCompleted
            }
        };

        function QueryBySQLFailed(serviceFailedEventArgs) {
            queryFailedEventArgs = serviceFailedEventArgs;
        }

        function QueryBySQLCompleted(queryEventArgs) {
            serviceSuccessEventArgs = queryEventArgs;
        }

        var queryBySQLService = new SuperMap.QueryBySQLService(worldMapURL, options);
        var queryBySQLParameters = new SuperMap.QueryBySQLParameters({
            customParams: null,
            expectCount: 100,
            networkType: SuperMap.GeometryType.POINT,
            queryOption: SuperMap.QueryOption.ATTRIBUTE,
            queryParams: new Array(new SuperMap.FilterParameter({
                attributeFilter: "SmID>0",
                name: "Countries@World"
            })),
            returnContent: false
        });
        queryBySQLParameters.startRecord = 0;
        queryBySQLParameters.holdTime = 10;
        returnCustomResult = false;
        queryBySQLService.processAsync(queryBySQLParameters);

        setTimeout(function () {
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
    it('returnContent', function (done) {
        var queryFailedEventArgs = null, serviceSuccessEventArgs = null;
        var options = {
            eventListeners: {
                'processFailed': QueryBySQLFailed,
                'processCompleted': QueryBySQLCompleted
            }
        };

        function QueryBySQLFailed(serviceFailedEventArgs) {
            queryFailedEventArgs = serviceFailedEventArgs;
        }

        function QueryBySQLCompleted(queryEventArgs) {
            serviceSuccessEventArgs = queryEventArgs;
        }

        var queryBySQLService = new SuperMap.QueryBySQLService(worldMapURL, options);
        var queryBySQLParameters = new SuperMap.QueryBySQLParameters({
            customParams: null,
            expectCount: 100,
            networkType: SuperMap.GeometryType.POINT,
            queryOption: SuperMap.QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams: [
                new SuperMap.FilterParameter({
                    attributeFilter: "SmID<3",
                    name: "Capitals@World"
                }),
                new SuperMap.FilterParameter({
                    attributeFilter: "SmID<3",
                    name: "Countries@World",
                    fields: new Array("COLOR_MAP", "CAPITAL")
                })],
            returnContent: true
        });
        queryBySQLParameters.startRecord = 0;
        queryBySQLParameters.holdTime = 10;
        queryBySQLParameters.returnCustomResult = false;
        queryBySQLService.events.on({'processCompleted': QueryBySQLCompleted});
        queryBySQLService.processAsync(queryBySQLParameters);

        setTimeout(function () {
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
        }, 2000)
    });

    //返回bounds信息
    it('returnCustomResult', function (done) {
        var queryFailedEventArgs = null, serviceSuccessEventArgs = null;
        var options = {
            eventListeners: {
                'processFailed': QueryBySQLFailed,
                'processCompleted': QueryBySQLCompleted
            }
        };

        function QueryBySQLFailed(serviceFailedEventArgs) {
            queryFailedEventArgs = serviceFailedEventArgs;
        }

        function QueryBySQLCompleted(queryEventArgs) {
            serviceSuccessEventArgs = queryEventArgs;
        }

        var queryBySQLService = new SuperMap.QueryBySQLService(worldMapURL, options);
        var queryBySQLParameters = new SuperMap.QueryBySQLParameters({
            customParams: null,
            expectCount: 100,
            networkType: SuperMap.GeometryType.POINT,
            queryOption: SuperMap.QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams: new Array(new SuperMap.FilterParameter({
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

        setTimeout(function () {
            try {
                queryResult = serviceSuccessEventArgs.result;
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

    it('noParams', function (done) {
        var queryFailedEventArgs = null, serviceSuccessEventArgs = null;
        var options = {
            eventListeners: {
                'processFailed': QueryBySQLFailed,
                'processCompleted': QueryBySQLCompleted
            }
        };

        function QueryBySQLFailed(serviceFailedEventArgs) {
            queryFailedEventArgs = serviceFailedEventArgs;
        }

        function QueryBySQLCompleted(queryEventArgs) {
            serviceSuccessEventArgs = queryEventArgs;
        }

        var queryBySQLService = new SuperMap.QueryBySQLService(worldMapURL, options);
        var queryBySQLParameters = new SuperMap.QueryBySQLParameters({
            customParams: null,
            expectCount: 100,
            networkType: SuperMap.GeometryType.POINT,
            queryOption: SuperMap.QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams: new Array()
        });
        queryBySQLService.events.on({'processFailed': QueryBySQLFailed});
        queryBySQLService.processAsync(queryBySQLParameters);

        setTimeout(function () {
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
    it('LayerNotExist', function (done) {
        var queryFailedEventArgs = null, serviceSuccessEventArgs = null;
        var options = {
            eventListeners: {
                'processFailed': QueryBySQLFailed,
                'processCompleted': QueryBySQLCompleted
            }
        };

        function QueryBySQLFailed(serviceFailedEventArgs) {
            queryFailedEventArgs = serviceFailedEventArgs;
        }

        function QueryBySQLCompleted(queryEventArgs) {
            serviceSuccessEventArgs = queryEventArgs;
        }

        var queryBySQLService = new SuperMap.QueryBySQLService(worldMapURL, options);
        var queryBySQLParameters = new SuperMap.QueryBySQLParameters({
            customParams: null,
            expectCount: 100,
            networkType: SuperMap.GeometryType.POINT,
            queryOption: SuperMap.QueryOption.ATTRIBUTE,
            queryParams: new Array(new SuperMap.FilterParameter({
                attributeFilter: "SmID>0",
                name: "notExist",
            })),
            returnContent: false
        });
        queryBySQLService.events.on({'processFailed': QueryBySQLFailed});
        queryBySQLService.processAsync(queryBySQLParameters);

        setTimeout(function () {
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
    })
});
