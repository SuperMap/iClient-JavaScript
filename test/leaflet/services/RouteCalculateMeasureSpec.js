import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {RouteCalculateMeasureParameters} from '../../../src/common/iServer/RouteCalculateMeasureParameters';

var spatialAnalystURL = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    serverType: 'iServer'
};
describe('leaflet_SpatialAnalystService_routeCalculateMeasure', ()=> {
    var serviceResult;
    var originalTimeout;
    beforeEach(()=> {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(()=> {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('routeCalculateMeasure', (done)=> {
        var pointsList = [];
        var routeObj = [
            [4020.0045221720466, -4377.027184298267, 0],
            [4057.0600591960642, -4381.569363260499, 37.33288381391519],
            [4064.595810063362, -4382.60877717323, 44.93998065935882],
            [4076.2655245045335, -4382.939424428795, 56.614378405970754],
            [4215.049444583775, -4382.333381109672, 195.39962171759203],
            [4247.756955878764, -4382.389670274902, 228.1071814489743]
        ];
        for (var i = 0; i < routeObj.length; i++) {
            pointsList.push([routeObj[i][1], routeObj[i][0], routeObj[i][2]])
        }
        var routeLine = L.polyline(pointsList);
        var routeCalculateMeasureParams = new RouteCalculateMeasureParameters({
            "sourceRoute": routeLine,   //必选,路由类型                                   
            "point": L.point(routeObj[4][0], routeObj[4][1]),            //必选
            "tolerance": 10,
            "isIgnoreGap": false
        });
        var routeCalculateMeasureService = spatialAnalystService(spatialAnalystURL, options);
        routeCalculateMeasureService.routeCalculateMeasure(routeCalculateMeasureParams, (result)=> {
            serviceResult = result;
        });
        setTimeout(()=> {
            try {
                expect(routeCalculateMeasureService).not.toBeNull();
                expect(routeCalculateMeasureService.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.measure).toBe(195.39962171759203);
                routeCalculateMeasureService.destroy();
                done();
            } catch (exception) {
                console.log("'routeCalculateMeasure'案例失败" + exception.name + ":" + exception.message);
                routeCalculateMeasureService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});