import ol from 'openlayers';
import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {RouteLocatorParameters} from '../../../src/common/iServer/RouteLocatorParameters';
import {QueryService} from '../../../src/openlayers/services/QueryService';
import {QueryBySQLParameters} from '../../../src/common/iServer/QueryBySQLParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';


var originalTimeout, serviceResults;
var changchunBaseUrl = GlobeParameter.tileSetsURL;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;
describe('openlayers_SpatialAnalystService_routeLocate', () => {
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //里程定线
    it('routeLocate_line', (done) => {
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
            //里程定线服务
            var routeLocatorService = new SpatialAnalystService(changchunServiceUrl);
            var routeLocatorParameters_line = new RouteLocatorParameters({
                "sourceRoute": routeLine,
                "type": "LINE",
                "startMeasure": 200,
                "endMeasure": 1000,
                "isIgnoreGap": true
            });
            routeLocatorService.routeLocate(routeLocatorParameters_line, (routeLocateServiceResult) => {
                serviceResults = routeLocateServiceResult;
            });
        });
        setTimeout(() => {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });

    //里程定点
    it('routeLocate_point', (done) => {
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
            //里程定点服务
            var routeLocatorService = new SpatialAnalystService(changchunServiceUrl);
            var routeLocatorParameters_point = new RouteLocatorParameters({
                "sourceRoute": routeLine,
                "type": "POINT",
                "measure": 800,
                "offset": 0,
                "isIgnoreGap": true
            });
            routeLocatorService.routeLocate(routeLocatorParameters_point, (routeLocateServiceResult) => {
                serviceResults = routeLocateServiceResult;
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