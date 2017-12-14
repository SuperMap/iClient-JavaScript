var ol = require('openlayers');
require('../../../src/openlayers/services/SpatialAnalystService');

var originalTimeout, serviceResults;
var changchunBaseUrl = GlobeParameter.tileSetsURL;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;
describe('openlayers_SpatialAnalystService_routeLocate', function () {
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //里程定线
    it('routeLocate_line', function (done) {
        queryBySQLService = new ol.supermap.QueryService(changchunBaseUrl);
        queryBySQLParams = new SuperMap.QueryBySQLParameters({
            queryParams: [
                new SuperMap.FilterParameter({
                    name: "RouteDT_road@Changchun",
                    attributeFilter: "RouteID=1690"
                })
            ]
        });
        queryBySQLService.queryBySQL(queryBySQLParams, function (SQLQueryServiceResult) {
            var queryBySQLResult = SQLQueryServiceResult.result.recordsets[0].features;
            //将形成路由的点提出来，为了构造下面点定里程服务sourceRoute
            var pointsList = [];
            var routeObj = queryBySQLResult.features[0].geometry.coordinates[0];
            for (var i = 0; i < routeObj.length; i++) {
                pointsList.push([routeObj[i][0], routeObj[i][1], routeObj[i][2]])
            }
            var routeLine = new ol.geom.LineString([pointsList]);
            //里程定线服务
            routeLocatorService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
            routeLocatorParameters_line = new SuperMap.RouteLocatorParameters({
                "sourceRoute": routeLine,
                "type": "LINE",
                "startMeasure": 200,
                "endMeasure": 1000,
                "isIgnoreGap": true
            });
            routeLocatorService.routeLocate(routeLocatorParameters_line, function (routeLocateServiceResult) {
                serviceResults = routeLocateServiceResult;
            });
        });
        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });

    //里程定点
    it('routeLocate_point', function (done) {
        queryBySQLService = new ol.supermap.QueryService(changchunBaseUrl);
        queryBySQLParams = new SuperMap.QueryBySQLParameters({
            queryParams: [
                new SuperMap.FilterParameter({
                    name: "RouteDT_road@Changchun",
                    attributeFilter: "RouteID=1690"
                })
            ]
        });
        queryBySQLService.queryBySQL(queryBySQLParams, function (SQLQueryServiceResult) {
            var queryBySQLResult = SQLQueryServiceResult.result.recordsets[0].features;
            //将形成路由的点提出来，为了构造下面点定里程服务sourceRoute
            var pointsList = [];
            var routeObj = queryBySQLResult.features[0].geometry.coordinates[0];
            for (var i = 0; i < routeObj.length; i++) {
                pointsList.push([routeObj[i][0], routeObj[i][1], routeObj[i][2]])
            }
            var routeLine = new ol.geom.LineString([pointsList]);
            //里程定点服务
            routeLocatorService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
            routeLocatorParameters_point = new SuperMap.RouteLocatorParameters({
                "sourceRoute": routeLine,
                "type": "POINT",
                "measure": 800,
                "offset": 0,
                "isIgnoreGap": true
            });
            routeLocatorService.routeLocate(routeLocatorParameters_point, function (routeLocateServiceResult) {
                serviceResults = routeLocateServiceResult;
            });
        });
        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });
});