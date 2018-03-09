import {SpatialAnalystService} from '../../../src/mapboxgl/services/SpatialAnalystService';
import {RouteCalculateMeasureParameters} from '../../../src/common/iServer/RouteCalculateMeasureParameters';

var url = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};

describe('mapboxgl_SpatialAnalystService_routeCalculateMeasure', () => {
    var serviceResult;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //路由测量计算
    it('routeCalculateMeasure', (done) => {
        var piontLists = [
            [116.2143386597, 39.8959419733, 0],
            [116.217501999125, 39.896670999665, 282.3879789906],
            [116.220156000875, 39.896820999605, 509.9746364534],
            [116.228716999, 39.8968419995966, 1242.1340098965],
            [116.25000000025, 39.8968619995886, 3062.3045713007],
            [116.27412300025, 39.8967689996258, 5125.3836697258],
            [116.310443000875, 39.8971139994878, 8231.7823666408],
            [116.344168500812, 39.8976724992644, 11116.7053546891]
        ];
        var lineGeometryData = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": piontLists
            }
        };
        var routeObj = lineGeometryData.geometry.coordinates;
        var routeLine = lineGeometryData;
        var point = [routeObj[4][0], routeObj[4][1]];
        var pointGeometryData = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": point
            }
        };
        var routeCalculateMeasureParameters = new RouteCalculateMeasureParameters({
            "sourceRoute": routeLine,   //必选,路由类型
            "point": pointGeometryData,            //必选
            "tolerance": 10,
            "isIgnoreGap": false
        });
        var service = new SpatialAnalystService(url, options);
        service.routeCalculateMeasure(routeCalculateMeasureParameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.measure).toEqual(3103.167523778722);
                done();
            } catch (e) {
                console.log("'routeCalculateMeasure'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });
});