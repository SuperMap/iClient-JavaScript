import { FindClosestFacilitiesService } from '../../../src/common/iServer/FindClosestFacilitiesService';
import { FindClosestFacilitiesParameters } from '../../../src/common/iServer/FindClosestFacilitiesParameters';
import { TransportationAnalystParameter } from '../../../src/common/iServer/TransportationAnalystParameter';
import { TransportationAnalystResultSetting } from '../../../src/common/iServer/TransportationAnalystResultSetting';
import { Point } from '../../../src/common/commontypes/geometry/Point';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.networkAnalystURL;
var serviceFailedEventArgsSystem = null, serviceSucceedEventArgsSystem = null;
var initFindClosestFacilitiesService = (findClosestFacilitiesServiceCompleted, findClosestFacilitiesServiceFailed,newUrl) => {
    return new FindClosestFacilitiesService(newUrl || url, {
        eventListeners: {
            'processFailed': findClosestFacilitiesServiceFailed,
            'processCompleted': findClosestFacilitiesServiceCompleted
        }
    });
};


describe('FindClosestFacilitiesService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('processAsync:return:true', (done) => {
        var facilityPoints = [new Point(119.6100397551, -122.6278394459),
        new Point(171.9035599945, -113.2491141857)
        ];
        var eventPoint = new Point(159.6100397551, -116.6278394459);
        var analystParameter = new TransportationAnalystParameter();
        var resultSetting = new TransportationAnalystResultSetting();
        resultSetting.returnEdgeFeatures = true;
        resultSetting.returnEdgeGeometry = true;
        resultSetting.returnEdgeIDs = true;
        resultSetting.returnNodeFeatures = true;
        resultSetting.returnNodeGeometry = true;
        resultSetting.returnNodeIDs = true;
        resultSetting.returnPathGuides = true;
        resultSetting.returnRoutes = true;
        analystParameter.resultSetting = resultSetting;
        var parameter = new FindClosestFacilitiesParameters();
        parameter.isAnalyzeById = false;
        parameter.event = eventPoint;
        parameter.facilities = facilityPoints;
        parameter.expectFacilityCount = 2;
        parameter.parameter = analystParameter;
        var findClosestFacilitiesServiceCompleted = (serviceSucceedEventArgsSystem) => {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result.facilityPathList;
                expect(closestFacilitiesService).not.toBeNull();
                expect(serviceSucceedEventArgsSystem).not.toBeNull();
                expect(analystResult[0].edgeFeatures).not.toBeNull();
                expect(analystResult[0].edgeFeatures.type).toEqual("FeatureCollection");
                expect(analystResult[0].edgeFeatures.features[0].type).toEqual("Feature");
                expect(analystResult[0].edgeFeatures.features[0].geometry).not.toBeNull();
                expect(analystResult[0].nodeFeatures).not.toBeNull();
                expect(analystResult[0].pathGuideItems).not.toBeNull();
                expect(analystResult[0].route).not.toBeNull();
                closestFacilitiesService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindClosestFacilitiesService_" + exception.name + ":" + exception.message);
                closestFacilitiesService.destroy();
                parameter.destroy();
                done();
            }
        };
        var findClosestFacilitiesServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var closestFacilitiesService = initFindClosestFacilitiesService(findClosestFacilitiesServiceCompleted, findClosestFacilitiesServiceFailed);
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/closestfacility");
            return Promise.resolve(new Response(JSON.stringify(findClosetFacilitiesResultJson_False)));
        });
        var closestFacilitiesService = initFindClosestFacilitiesService(findClosestFacilitiesServiceCompleted, findClosestFacilitiesServiceFailed);
        closestFacilitiesService.processAsync(parameter);
    });

    // isAnalyzeById
    it('processAsync_isAnalyzeById', (done) => {
        var transReSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeIDs: true
        });
        var transAnaParams = new TransportationAnalystParameter();
        transAnaParams.resultSetting = transReSetting;
        var facilitiesParams = new FindClosestFacilitiesParameters({
            event: 4602,
            facilities: [4529, 4530],
            isAnalyzeById: true,
            expectFacilityCount: 2,
            fromEvent: true,
            maxWeight: 30,
            parameter: transAnaParams
        });
        var findClosestFacilitiesServiceCompleted = (serviceSucceedEventArgsSystem) => {
            try {
                expect(serviceSucceedEventArgsSystem).not.toBeNull();
                closestFacilitiesService.destroy();
                expect(closestFacilitiesService.EVENT_TYPES).toBeNull();
                expect(closestFacilitiesService.events).toBeNull();
                facilitiesParams.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindClosestFacilitiesService_" + exception.name + ":" + exception.message);
                closestFacilitiesService.destroy();
                facilitiesParams.destroy();
                done();
            }
        };
        var findClosestFacilitiesServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/closestfacility");
            return Promise.resolve(new Response(`{"facilityPathList":null}`));
        });
        var closestFacilitiesService = initFindClosestFacilitiesService(findClosestFacilitiesServiceCompleted, findClosestFacilitiesServiceFailed);
        closestFacilitiesService.processAsync(facilitiesParams);
    });

    //参数为空
    it('processAsync_parameterNull', () => {
        var transReSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeIDs: true
        });
        var transAnaParams = new TransportationAnalystParameter();
        transAnaParams.resultSetting = transReSetting;
        var facilitiesParams = new FindClosestFacilitiesParameters({
            event: 4602,
            facilities: [4529, 4530],
            isAnalyzeById: true,
            expectFacilityCount: 2,
            fromEvent: true,
            maxWeight: 30,
            parameter: transAnaParams
        });
        var flag = false;
        var findClosestFacilitiesServiceCompleted = (serviceSucceedEventArgsSystem) => {
            flag = true;
        };
        var findClosestFacilitiesServiceFailed = (serviceFailedEventArgs) => {
            flag = true;
        };
        var closestFacilitiesService = initFindClosestFacilitiesService(findClosestFacilitiesServiceCompleted, findClosestFacilitiesServiceFailed);
        closestFacilitiesService.processAsync();
        expect(flag).toBeFalsy;
    });

    it('processAsync_customQueryParam', (done) => {
        var transReSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeIDs: true
        });
        var transAnaParams = new TransportationAnalystParameter();
        transAnaParams.resultSetting = transReSetting;
        var facilitiesParams = new FindClosestFacilitiesParameters({
            event: 4602,
            facilities: [4529, 4530],
            isAnalyzeById: true,
            expectFacilityCount: 2,
            fromEvent: true,
            maxWeight: 30,
            parameter: transAnaParams
        });
        var findClosestFacilitiesServiceCompleted = (serviceSucceedEventArgsSystem) => {
            try {
                closestFacilitiesService.destroy();
                facilitiesParams.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindClosestFacilitiesService_" + exception.name + ":" + exception.message);
                closestFacilitiesService.destroy();
                facilitiesParams.destroy();
                done();
            }
        };
        var findClosestFacilitiesServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/closestfacility?key=123");
            return Promise.resolve(new Response(`{"facilityPathList":null}`));
        });
        var closestFacilitiesService = initFindClosestFacilitiesService(findClosestFacilitiesServiceCompleted, findClosestFacilitiesServiceFailed, url + '?key=123');
        closestFacilitiesService.processAsync(facilitiesParams);
    });

    it('fail_processAsync', (done) => {
        var transReSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeIDs: true
        });
        var transAnaParams = new TransportationAnalystParameter();
        transAnaParams.resultSetting = transReSetting;
        var facilitiesParams = new FindClosestFacilitiesParameters({
            event: 4602,
            facilities: "facil”",
            isAnalyzeById: true,
            expectFacilityCount: 2,
            fromEvent: true,
            maxWeight: 30,
            parameter: transAnaParams
        });
        var findClosestFacilitiesServiceCompleted = (serviceSucceedEventArgsSystem) => {
        };
        var findClosestFacilitiesServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                closestFacilitiesService.destroy();
                facilitiesParams.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindClosestFacilitiesService_" + exception.name + ":" + exception.message);
                closestFacilitiesService.destroy();
                facilitiesParams.destroy();
                done();
            }

        };

        var closestFacilitiesService = initFindClosestFacilitiesService(findClosestFacilitiesServiceCompleted, findClosestFacilitiesServiceFailed);
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/closestfacility");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数facilities 不是有效的JSON 字符串对象"}}`));
        });
        closestFacilitiesService.processAsync(facilitiesParams);
    })
});



