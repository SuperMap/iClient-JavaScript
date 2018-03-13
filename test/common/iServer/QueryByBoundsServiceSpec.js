import {QueryByBoundsService} from '../../../src/common/iServer/QueryByBoundsService';
import {QueryByBoundsParameters} from '../../../src/common/iServer/QueryByBoundsParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {Bounds} from '../../../src/common/commontypes/Bounds';
import {GeometryType} from '../../../src/common/REST';
import {QueryOption} from '../../../src/common/REST';

var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;

var QueryByBoundsFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var QueryByBoundsCompleted = (serviceCompletedEventArgs) => {
    serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
};
var initQueryByBoundsService = () => {
    return new QueryByBoundsService(worldMapURL);
};
var options = {
    eventListeners: {
        'processFailed': QueryByBoundsFailed,
        'processCompleted': QueryByBoundsCompleted
    }
};
//服务初始化时注册事件监听函数
var initQueryByBoundsService_RegisterListener = () => {
    return new QueryByBoundsService(worldMapURL, options);
};

describe('QueryByBoundsService_processAsync', () => {
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
        var queryByBoundsService = initQueryByBoundsService();
        expect(queryByBoundsService).not.toBeNull();
        expect(queryByBoundsService.url).toEqual(worldMapURL + "/queryResults.json?");
        queryByBoundsService.destroy();
        expect(queryByBoundsService.EVENT_TYPES).toBeNull();
        expect(queryByBoundsService.events).toBeNull();
        expect(queryByBoundsService.returnContent).toBeNull();
    })

    it('success:processAsync', (done) => {
        var queryByBoundsService = initQueryByBoundsService_RegisterListener();
        var queryByBoundsParameters = new QueryByBoundsParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams: new Array(new FilterParameter({
                attributeFilter: "SmID<21",
                name: "Countries@World",
            })),
            returnContent: true,
            bounds: new Bounds(0, 0, 100, 100)
        });
        queryByBoundsParameters.startRecord = 0;
        queryByBoundsParameters.holdTime = 10;
        queryByBoundsService.processAsync(queryByBoundsParameters);
        setTimeout(() => {
            try {
                var queryResult = serviceCompletedEventArgsSystem.result.recordsets[0].features;
                expect(queryResult).not.toBeNull();
                expect(queryResult.type).toBe("FeatureCollection");
                expect(queryResult.features.length).toEqual(15);
                queryByBoundsService.destroy();
                expect(queryByBoundsService.EVENT_TYPES).toBeNull();
                expect(queryByBoundsService.events).toBeNull();
                expect(queryByBoundsService.returnContent).toBeNull();
                queryByBoundsParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByBoundsService_" + exception.name + ":" + exception.message);
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            }
        }, 4000);
    });

    it('processAsync_customsResult', (done) => {
        var queryByBoundsService = initQueryByBoundsService_RegisterListener();
        var queryByBoundsParameters = new QueryByBoundsParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams: new Array(new FilterParameter({
                attributeFilter: "SmID<3",
                name: "Countries@World",
            })),
            returnContent: false,
            bounds: new Bounds(0, 0, 100, 100)
        });
        queryByBoundsParameters.startRecord = 0;
        queryByBoundsParameters.holdTime = 10;
        queryByBoundsParameters.returnCustomResult = true;
        queryByBoundsService.processAsync(queryByBoundsParameters);

        setTimeout(() => {
            try {
                var queryResult = serviceCompletedEventArgsSystem.result;
                expect(queryResult).not.toBeNull();
                expect(queryResult.succeed).toBeTruthy();
                expect(queryResult.newResourceLocation).not.toBeNull();
                expect(queryResult.newResourceLocation.length).toBeGreaterThan(0);
                expect(queryResult.newResourceID).not.toBeNull();
                expect(queryResult.customResult).not.toBeNull();
                expect(queryResult.customResult.bottom).toEqual(41.19657897949219);
                expect(queryResult.customResult.left).toEqual(-180);
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByBoundsService_" + exception.name + ":" + exception.message);
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            }
        }, 4000);
    });

    //查询参数为空
    it('fail:processAsync', (done) => {
        var queryByBoundsService = initQueryByBoundsService_RegisterListener();
        var queryByBoundsParameters = new QueryByBoundsParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTE,
            queryParams: new Array(),
            bounds: new Bounds(0, 0, 100, 100)
        });
        queryByBoundsParameters.startRecord = 0;
        queryByBoundsParameters.holdTime = 10;
        queryByBoundsService.processAsync(queryByBoundsParameters);

        setTimeout(() => {
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByBoundsService_" + exception.name + ":" + exception.message);
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            }
        }, 4000);
    })
});

