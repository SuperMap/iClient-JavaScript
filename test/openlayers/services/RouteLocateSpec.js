import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {RouteLocatorParameters} from '../../../src/common/iServer/RouteLocatorParameters';
import {QueryService} from '../../../src/openlayers/services/QueryService';
import {QueryBySQLParameters} from '../../../src/common/iServer/QueryBySQLParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

import LineString from 'ol/geom/LineString';

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
        spyOn(FetchRequest, 'commit').and.callFake((method,url,params) => {
            expect(method).toBe("POST");
            if(url.indexOf("/queryResults.json?returnContent=true")>-1){
                expect(params).not.toBeNull();
                var paramsObj = JSON.parse(params.replace(/'/g, "\""));
                expect(paramsObj.queryParameters.queryParams[0].attributeFilter).toBe("RouteID=1690");
                expect(paramsObj.queryParameters.queryParams[0].name).toBe("RouteDT_road@Changchun");
                return Promise.resolve(new Response(JSON.stringify(routeCalculateMeasure_queryBySQLServiceResult)));
            }else if(url.indexOf("/routelocator.json?returnContent=true")>-1){
                var param= JSON.parse(params.replace(/'/g, "\""));
                expect(param.sourceRoute.type).toBe("LINEM");
                return Promise.resolve(new Response(JSON.stringify(routeCalculateMeasureServiceResult)));
            }
            return Promise.resolve();
        });
        queryBySQLService.queryBySQL(queryBySQLParams, (SQLQueryServiceResult) => {
            var queryBySQLResult = SQLQueryServiceResult.result.recordsets[0].features;
            //将形成路由的点提出来，为了构造下面点定里程服务sourceRoute
            var pointsList = [];
            var routeObj = queryBySQLResult.features[0].geometry.coordinates[0];
            for (var i = 0; i < routeObj.length; i++) {
                pointsList.push([routeObj[i][0], routeObj[i][1], routeObj[i][2]])
            }
            var routeLine = new LineString([pointsList]);
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
                expect(serviceResults).not.toBeNull();
                expect(serviceResults.type).toBe('processCompleted');
                expect(serviceResults.result.dataset).not.toBeNull();
                done();
            });
        });
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
        spyOn(FetchRequest, 'commit').and.callFake((method,url,params) => {
            expect(method).toBe("POST");
            if(url.indexOf("/queryResults.json?returnContent=true")>-1){
                var paramsObj = JSON.parse(params.replace(/'/g, "\""));
                expect(paramsObj.queryParameters.queryParams[0].attributeFilter).toBe("RouteID=1690");
                expect(paramsObj.queryParameters.queryParams[0].name).toBe("RouteDT_road@Changchun");
                return Promise.resolve(new Response(JSON.stringify(routeCalculateMeasure_queryBySQLServiceResult)));
            }else if(url.indexOf("/routelocator.json?returnContent=true")>-1){
                var paramObj = JSON.parse(params.replace(/'/g, "\""));
                expect(paramObj.sourceRoute.type).toBe("LINEM");
                return Promise.resolve(new Response(JSON.stringify(routeCalculateMeasureServiceResult)));
            }
            return Promise.resolve();
        });
        queryBySQLService.queryBySQL(queryBySQLParams, (SQLQueryServiceResult) => {
            var queryBySQLResult = SQLQueryServiceResult.result.recordsets[0].features;
            //将形成路由的点提出来，为了构造下面点定里程服务sourceRoute
            var pointsList = [];
            var routeObj = queryBySQLResult.features[0].geometry.coordinates[0];
            for (var i = 0; i < routeObj.length; i++) {
                pointsList.push([routeObj[i][0], routeObj[i][1], routeObj[i][2]])
            }
            var routeLine = new LineString([pointsList]);
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
                expect(serviceResults).not.toBeNull();
                expect(serviceResults.type).toBe('processCompleted');
                expect(serviceResults.result.dataset).not.toBeNull();
                done();
            });
        });
    });
});