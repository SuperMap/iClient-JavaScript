import {QueryByDistanceService} from '../../../src/common/iServer/QueryByDistanceService';
import {QueryByDistanceParameters} from '../../../src/common/iServer/QueryByDistanceParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {GeometryType} from '../../../src/common/REST';
import {QueryOption} from '../../../src/common/REST';

var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;
var QueryByDistanceFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var QueryByDistanceCompleted = (serviceCompletedEventArgs) => {
    serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
};
var initQueryByDistanceService = () => {
    return new QueryByDistanceService(worldMapURL);
};
var options = {
    eventListeners: {
        'processFailed': QueryByDistanceFailed,
        'processCompleted': QueryByDistanceCompleted
    }
};
//服务初始化时注册事件监听函数
var initQueryByDistanceService_RegisterListener = () => {
    return new QueryByDistanceService(worldMapURL, options);
};

describe('QueryByBoundsService', () => {
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
        var queryByDistanceService = initQueryByDistanceService();
        expect(queryByDistanceService).not.toBeNull();
        expect(queryByDistanceService.url).toEqual(worldMapURL + "/queryResults.json?");
        queryByDistanceService.destroy();
        expect(queryByDistanceService.EVENT_TYPES).toBeNull();
        expect(queryByDistanceService.events).toBeNull();
        expect(queryByDistanceService.returnContent).toBeNull();
    });

    it('processAsync_returnContent:true', (done) => {
        var queryByDistanceService = initQueryByDistanceService_RegisterListener();
        var queryByDistanceParameters = new QueryByDistanceParameters({
            customParams: null,
            startRecord: 1,
            queryOption: QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams: new Array(new FilterParameter({
                name: "Capitals@World"
            })),
            returnContent: true,
            distance: 20,
            geometry: new Point(-50, -10)
        });
        queryByDistanceParameters.holdTime = 10;
        queryByDistanceService.processAsync(queryByDistanceParameters);
        setTimeout(() => {
            try {
                var queryResult = serviceCompletedEventArgsSystem.result.recordsets[0].features;
                expect(queryResult).not.toBeNull();
                expect(queryResult.type).toBe("FeatureCollection");
                expect(queryResult.features.length).toEqual(5);
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByDistanceService_" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            }
        }, 2000);
    });

    it('processAsync_returnCotent:false', (done) => {
        var queryByDistanceService = initQueryByDistanceService_RegisterListener();
        var queryByDistanceParameters = new QueryByDistanceParameters({
            customParams: null,
            expectCount: 100,
            queryOption: QueryOption.GEOMETRY,
            queryParams: new Array(new FilterParameter({
                name: "Capitals@World"
            })),
            returnContent: false,
            distance: 20,
            isNearest: true,
            geometry: new Point(-50, -10)
        });
        queryByDistanceParameters.startRecord = 0;
        queryByDistanceParameters.holdTime = 10;
        queryByDistanceService.processAsync(queryByDistanceParameters);
        setTimeout(() => {
            try {
                var queryResult = serviceCompletedEventArgsSystem.result;
                expect(queryResult).not.toBeNull();
                expect(queryResult.newResourceLocation).not.toBeNull();
                expect(queryResult.newResourceLocation.length).toBeGreaterThan(0);
                expect(queryResult.newResourceID).not.toBeNull();
                expect(queryResult.succeed).toBeTruthy();
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByDistanceService_" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            }
        }, 2000);
    });

    it('fail:processAsync', (done) => {
        var failedResult;
        var queryFailed = (e) => {
            failedResult = e;
        };
        var queryByDistanceService = initQueryByDistanceService_RegisterListener();
        var queryByDistanceParameters = new QueryByDistanceParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTE,
            queryParams: new Array(),
            geometry: new Point(-50, -10),
            distance: 20,
            startRecord: 0,
            holdTime: 10
        });
        queryByDistanceService.events.on({'processFailed': queryFailed});
        queryByDistanceService.processAsync(queryByDistanceParameters);
        setTimeout(() => {
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(failedResult.error.code).toEqual(400);
                expect(failedResult.error.errorMsg).not.toBeNull();
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByDistanceService_" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            }
        }, 2000);
    })
});

