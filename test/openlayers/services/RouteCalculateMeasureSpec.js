import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {RouteCalculateMeasureParameters} from '../../../src/common/iServer/RouteCalculateMeasureParameters';
import {QueryService} from '../../../src/openlayers/services/QueryService';
import {QueryBySQLParameters} from '../../../src/common/iServer/QueryBySQLParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';

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
        spyOn(FetchRequest, 'commit').and.callFake((method,url,params) => {
            expect(method).toBe("POST");
            if(url.indexOf("/queryResults.json?returnContent=true")>-1){
                expect(params).not.toBeNull();
                var paramsObj = JSON.parse(params.replace(/'/g, "\""));
                expect(paramsObj.queryMode).toBe("SqlQuery");
                expect(paramsObj.queryParameters.queryParams[0].attributeFilter).toBe("RouteID=1690");
                expect(paramsObj.queryParameters.queryParams[0].name).toBe("RouteDT_road@Changchun");
                return Promise.resolve(new Response(JSON.stringify(routeCalculateMeasure_queryBySQLServiceResult)));
            }else if(url.indexOf("/calculatemeasure.json?returnContent=true")>-1){
                expect(params).not.toBeNull();
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
            //在组成路由的点中选取一个查询点(数组中第8个点),并添加到地图上
            var point = new Point([routeObj[3][0], routeObj[3][1]]);
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
                expect(serviceResults).not.toBeNull();
                expect(serviceResults.type).toBe('processCompleted');
                expect(serviceResults.result.dataset).not.toBeNull();
                done();
            });
        });
    });
});