﻿import {FindClosestFacilitiesService} from '../../../src/common/iServer/FindClosestFacilitiesService';
import {FindClosestFacilitiesParameters} from '../../../src/common/iServer/FindClosestFacilitiesParameters';
import {TransportationAnalystParameter} from '../../../src/common/iServer/TransportationAnalystParameter';
import {TransportationAnalystResultSetting} from '../../../src/common/iServer/TransportationAnalystResultSetting';
import {Point} from '../../../src/common/commontypes/geometry/Point';

var url = GlobeParameter.networkAnalystURL;
var serviceFailedEventArgsSystem = null, serviceSucceedEventArgsSystem = null;
var initFindClosestFacilitiesService = () => {
    return new FindClosestFacilitiesService(url, options);
};
var findClosestFacilitiesServiceCompleted = (serviceSucceedEventArgs) => {
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
};
var findClosestFacilitiesServiceFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var options = {
    eventListeners: {
        'processFailed': findClosestFacilitiesServiceFailed,
        'processCompleted': findClosestFacilitiesServiceCompleted
    }
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
        var closestFacilitiesService = initFindClosestFacilitiesService();
        closestFacilitiesService.processAsync(parameter);
        setTimeout(() => {
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
        }, 2000);
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
        var closestFacilitiesService = initFindClosestFacilitiesService();
        closestFacilitiesService.processAsync(facilitiesParams);
        setTimeout(() => {
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
        }, 2000)
    });

    //参数为空
    it('processAsync_parameterNull', (done) => {
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
        var closestFacilitiesService = initFindClosestFacilitiesService();
        closestFacilitiesService.processAsync();
        setTimeout(() => {
            try {
                expect(serviceSucceedEventArgsSystem.result.facilityPathList).toBeNull();
                closestFacilitiesService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindClosestFacilitiesService_" + exception.name + ":" + exception.message);
                closestFacilitiesService.destroy();
                done();
            }
        }, 2000);
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
        var closestFacilitiesService = initFindClosestFacilitiesService();
        closestFacilitiesService.processAsync(facilitiesParams);
        setTimeout(() => {
            try {
                expect(serviceSucceedEventArgsSystem.result.facilityPathList).toBeNull();
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
        }, 2000)
    })
});



