require('../../../src/openlayers/services/SpatialAnalystService');

var originalTimeout, serviceResults;
var changchunBaseUrl = GlobeParameter.tileSetsURL;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;

describe('openlayers_SpatialAnalystService_routeCalculateMeasure', function () {
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    //点定里程
    it('routeCalculateMeasure test', function (done) {
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

            //在组成路由的点中选取一个查询点(数组中第8个点),并添加到地图上
            var point = new ol.geom.Point([routeObj[7][0], routeObj[7][1]]);

            //点定里程服务
            routeCalculateMeasureService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
            routeCalculateMeasureParameters = new SuperMap.RouteCalculateMeasureParameters({
                "sourceRoute": routeLine,   //必选,路由类型
                "point": point,            //必选
                "tolerance": 10,
                "isIgnoreGap": false
            });
            routeCalculateMeasureService.routeCalculateMeasure(routeCalculateMeasureParameters, function (routeCaculateServiceResult) {
                serviceResults = routeCaculateServiceResult;
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