import ol from 'openlayers';
import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {RouteCalculateMeasureParameters} from '../../../src/common/iServer/RouteCalculateMeasureParameters';
import {QueryService} from '../../../src/openlayers/services/QueryService';
import {QueryBySQLParameters} from '../../../src/common/iServer/QueryBySQLParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';


var originalTimeout, serviceResults;
var changchunBaseUrl = GlobeParameter.tileSetsURL;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;

describe('openlayers_SpatialAnalystService_routeCalculateMeasure', () => {
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //点定里程
    it('routeCalculateMeasure', (done) => {
        var queryBySQLService = new QueryService(changchunBaseUrl);
        var queryBySQLParams = new QueryBySQLParameters({
            queryParams: [
                new FilterParameter({
                    name: "RouteDT_road@Changchun",
                    attributeFilter: "RouteID=1690"
                })
            ]
        });
        queryBySQLService.queryBySQL(queryBySQLParams, (SQLQueryServiceResult) => {
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
            var routeCalculateMeasureService = new SpatialAnalystService(changchunServiceUrl);
            var routeCalculateMeasureParameters = new RouteCalculateMeasureParameters({
                "sourceRoute": routeLine,   //必选,路由类型
                "point": point,            //必选
                "tolerance": 10,
                "isIgnoreGap": false
            });
            routeCalculateMeasureService.routeCalculateMeasure(routeCalculateMeasureParameters, (routeCaculateServiceResult) => {
                serviceResults = routeCaculateServiceResult;
            });
        });
        setTimeout(() => {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });
});