import {QueryByGeometryService} from '../../../src/common/iServer/QueryByGeometryService';
import {QueryByGeometryParameters} from '../../../src/common/iServer/QueryByGeometryParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {Polygon} from '../../../src/common/commontypes/geometry/Polygon';
import {LinearRing} from '../../../src/common/commontypes/geometry/LinearRing';
import {GeometryType} from '../../../src/common/REST';
import {QueryOption} from '../../../src/common/REST';
import {SpatialQueryMode} from '../../../src/common/REST';

var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;
var QueryByGeometryServiceFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
var QueryByGeometryServiceCompleted = (serviceCompletedEventArgs) => {
    serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
};
var initQueryByGeometryService = () => {
    return new QueryByGeometryService(worldMapURL);
};
var options = {
    eventListeners: {
        'processFailed': QueryByGeometryServiceFailed,
        'processCompleted': QueryByGeometryServiceCompleted
    }
};
//服务初始化时注册事件监听函数
var initQueryByGeometryService_RegisterListener = () => {
    return new QueryByGeometryService(worldMapURL, options);
};

describe('QueryByGeometryService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceFailedEventArgsSystem = null;
        serviceCompletedEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor, destroy', () => {
        var queryByGeometryService = initQueryByGeometryService();
        expect(queryByGeometryService).not.toBeNull();
        expect(queryByGeometryService.url).toEqual(worldMapURL + "/queryResults.json?");
        queryByGeometryService.destroy();
        expect(queryByGeometryService.EVENT_TYPES).toBeNull();
        expect(queryByGeometryService.events).toBeNull();
        expect(queryByGeometryService.returnContent).toBeNull();
    });

    it('processAsync_returnContent:false', (done) => {
        var queryByGeometryService = initQueryByGeometryService_RegisterListener();
        var points = [new Point(-90, -45),
            new Point(90, -45),
            new Point(90, 45),
            new Point(-90, 45),
            new Point(-90, -45)];
        var geometry = new Polygon(new LinearRing(points));
        var queryByGeometryParameters = new QueryByGeometryParameters({
            customParams: null,
            expectCount: 3,
            startRecord: 1,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTEANDGEOMETRY,
            spatialQueryMode: SpatialQueryMode.INTERSECT,
            queryParams: new Array(new FilterParameter({
                attributeFilter: "SmID<20",
                name: "Capitals@World"
            })),
            returnContent: false,
            geometry: geometry
        });
        queryByGeometryParameters.startRecord = 0;
        queryByGeometryParameters.holdTime = 10;
        queryByGeometryService.processAsync(queryByGeometryParameters);

        setTimeout(() => {
            try {
                var queryResult = serviceCompletedEventArgsSystem.result;
                expect(queryResult).not.toBeNull();
                expect(queryResult.succeed).toBeTruthy();
                expect(queryResult.newResourceLocation).not.toBeNull();
                expect(queryResult.newResourceLocation.length).toBeGreaterThan(0);
                expect(queryResult.newResourceID).not.toBeNull();
                queryByGeometryService.destroy();
                queryByGeometryParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByGeometryService_" + exception.name + ":" + exception.message);
                queryByGeometryService.destroy();
                queryByGeometryParameters.destroy();
                done();
            }
        }, 2000);
    });

    it('processAsync_returnContent:true', (done) => {
        var queryByGeometryService = initQueryByGeometryService_RegisterListener();
        var points = [
            new Point(-90, -45),
            new Point(90, -45),
            new Point(90, 45),
            new Point(-90, 45),
            new Point(-90, -45)
        ];
        var geometry = new Polygon(new LinearRing(points));
        var queryByGeometryParameters = new QueryByGeometryParameters({
            customParams: null,
            expectCount: 10,
            startRecord: 1,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTEANDGEOMETRY,
            spatialQueryMode: SpatialQueryMode.INTERSECT,
            queryParams: new Array(new FilterParameter({
                attributeFilter: "SmID<20",
                name: "Capitals@World"
            })),
            returnContent: true,
            geometry: geometry
        });
        queryByGeometryParameters.startRecord = 0;
        queryByGeometryParameters.holdTime = 10;
        queryByGeometryService.processAsync(queryByGeometryParameters);
        setTimeout(() => {
            try {
                var queryResult = serviceCompletedEventArgsSystem.result.recordsets[0].features;
                expect(queryResult).not.toBeNull();
                expect(queryResult.type).toBe("FeatureCollection");
                expect(queryResult.features.length).toEqual(10);
                queryByGeometryService.destroy();
                queryByGeometryParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByGeometryService_" + exception.name + ":" + exception.message);
                queryByGeometryService.destroy();
                queryByGeometryParameters.destroy();
                done();
            }
        }, 2000);
    });

    //查询参数为空
    it('fail:processAsync', (done) => {
        var queryByGeometryService = initQueryByGeometryService_RegisterListener();
        var queryByGeometryParameters = new QueryByGeometryParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTE,
            spatialQueryMode: SpatialQueryMode.OVERLAP,
            queryParams: new Array(),
            geometry: new Point(-50, -20)
        });
        queryByGeometryParameters.startRecord = 0;
        queryByGeometryParameters.holdTime = 10;
        queryByGeometryService.events.on({'processFailed': queryFailed});
        queryByGeometryService.processAsync(queryByGeometryParameters);

        var queryFailed = (e) => {
            failedResult = e;
        }

        setTimeout(() => {
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                queryByGeometryService.destroy();
                queryByGeometryParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByGeometryService_" + exception.name + ":" + exception.message);
                queryByGeometryService.destroy();
                queryByGeometryParameters.destroy();
                done();
            }
        }, 2000);
    })
});



