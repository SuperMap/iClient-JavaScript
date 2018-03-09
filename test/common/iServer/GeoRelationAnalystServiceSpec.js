﻿import {GeoRelationAnalystService} from '../../../src/common/iServer/GeoRelationAnalystService';
import {GeoRelationAnalystParameters} from '../../../src/common/iServer/GeoRelationAnalystParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {SpatialRelationType} from '../../../src/common/REST';

var url = GlobeParameter.spatialAnalystURL_Changchun;
var completedEventArgsSystem, failedEventArgsSystem;
var initGeoRelationAnalystService = () => {
    return new GeoRelationAnalystService(url, options);
};
var generateSpatialDataCompleted = (completedEventArgs) => {
    completedEventArgsSystem = completedEventArgs;
};
var generateSpatialDataFailed = (failedEventArgs) => {
    failedEventArgsSystem = failedEventArgs;
};
var options = {
    eventListeners: {
        processCompleted: generateSpatialDataCompleted,
        processFailed: generateSpatialDataFailed
    }
};

describe('GeoRelationAnalystService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //空间关系分析服务，比较返回结果
    it('returnFeature', (done) => {
        var referenceFilter = new FilterParameter({
            name: "Frame_R@Changchun",
            attributeFilter: "SMID>0"
        });
        var sourceFilter = new FilterParameter({
            attributeFilter: "SMID>0"
        });
        var datasetGeoRelationParameters = new GeoRelationAnalystParameters({
            dataset: "Park@Changchun",
            startRecord: 0,
            expectCount: 20,
            sourceFilter: sourceFilter,
            referenceFilter: referenceFilter,
            spatialRelationType: SpatialRelationType.INTERSECT,
            isBorderInside: true,
            returnFeature: true,
            returnGeoRelatedOnly: true
        });
        var datasetRelationService = initGeoRelationAnalystService();
        datasetRelationService.processAsync(datasetGeoRelationParameters);
        setTimeout(() => {
            try {
                expect(datasetRelationService).not.toBeNull();
                expect(completedEventArgsSystem.result).not.toBeNull();
                expect(completedEventArgsSystem.result.length).toEqual(7);
                datasetRelationService.destroy();
                expect(datasetRelationService.EVENT_TYPES).toBeNull();
                expect(datasetRelationService.events).toBeNull();
                expect(datasetRelationService.eventListeners).toBeNull();
                datasetGeoRelationParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GeoRelationAnalystService_" + exception.name + ":" + exception.message);
                datasetRelationService.destroy();
                datasetGeoRelationParameters.destroy();
                done();
            }
        }, 2000);
    });

    //空间关系分析服务，比较返回结果
    it('success:processAsync', (done) => {
        var referenceFilter = new FilterParameter({name: "Frame_R@Changchun", attributeFilter: "SMID>0"});
        var sourceFilter = new FilterParameter({
            attributeFilter: "SMID>0"
        });
        var datasetGeoRelationParameters = new GeoRelationAnalystParameters({
            dataset: "Park@Changchun",
            startRecord: 0,
            expectCount: 5,
            sourceFilter: sourceFilter,
            referenceFilter: referenceFilter,
            spatialRelationType: SpatialRelationType.INTERSECT,
            isBorderInside: true,
            returnFeature: false,
            returnGeoRelatedOnly: true
        });
        var datasetRelationService = initGeoRelationAnalystService();
        datasetRelationService.processAsync(datasetGeoRelationParameters);
        setTimeout(() => {
            try {
                expect(datasetRelationService).not.toBeNull();
                expect(completedEventArgsSystem.result).not.toBeNull();
                expect(completedEventArgsSystem.result.length).toEqual(5);
                datasetRelationService.destroy();
                expect(datasetRelationService.EVENT_TYPES).toBeNull();
                expect(datasetRelationService.events).toBeNull();
                expect(datasetRelationService.eventListeners).toBeNull();
                datasetGeoRelationParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GeoRelationAnalystService_" + exception.name + ":" + exception.message);
                datasetRelationService.destroy();
                datasetGeoRelationParameters.destroy();
                done();
            }
        }, 2000)
    });

    //空间关系分析服务，比较返回结果
    it('fail:processAsync', (done) => {
        var referenceFilter = new FilterParameter({attributeFilter: "SMID>0"});
        var sourceFilter = new FilterParameter({
            attributeFilter: "SMID>0"
        });
        var datasetGeoRelationParameters = new GeoRelationAnalystParameters({
            dataset: "Park@Changchun",
            sourceFilter: sourceFilter,
            referenceFilter: referenceFilter,
            spatialRelationType: SpatialRelationType.INTERSECT,
            isBorderInside: true,
            returnFeature: false,
            returnGeoRelatedOnly: true
        });
        var datasetRelationService = initGeoRelationAnalystService();
        datasetRelationService.processAsync(datasetGeoRelationParameters);
        setTimeout(() => {
            try {
                expect(failedEventArgsSystem).not.toBeNull();
                expect(failedEventArgsSystem.error).not.toBeNull();
                //  expect(failedEventArgsSystem.error.code).toEqual(400);
                // expect(failedEventArgsSystem.error.errorMsg).not.toBeNull();
                datasetRelationService.destroy();
                expect(datasetRelationService.EVENT_TYPES).toBeNull();
                expect(datasetRelationService.events).toBeNull();
                expect(datasetRelationService.eventListeners).toBeNull();
                datasetGeoRelationParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GeoRelationAnalystService_" + exception.name + ":" + exception.message);
                datasetRelationService.destroy();
                datasetGeoRelationParameters.destroy();
                done();
            }
        }, 2000)
    });
});

