import {GeoRelationAnalystService} from '../../../src/common/iServer/GeoRelationAnalystService';
import {GeoRelationAnalystParameters} from '../../../src/common/iServer/GeoRelationAnalystParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {SpatialRelationType} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.spatialAnalystURL_Changchun;
var completedEventArgsSystem, failedEventArgsSystem;
var initGeoRelationAnalystService = (generateSpatialDataCompleted,generateSpatialDataFailed) => {
    return new GeoRelationAnalystService(url,{
        eventListeners: {
            processCompleted: generateSpatialDataCompleted,
            processFailed: generateSpatialDataFailed
        }
    });
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

        var generateSpatialDataCompleted = (completedEventArgs) => {
            completedEventArgsSystem = completedEventArgs;
            try {
                expect(datasetRelationService).not.toBeNull();
                expect(completedEventArgsSystem.result).not.toBeNull();
                expect(completedEventArgsSystem.result.length).toEqual(1);
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
        };
        var generateSpatialDataFailed = (failedEventArgs) => {
            failedEventArgsSystem = failedEventArgs;
        };

        var datasetRelationService =initGeoRelationAnalystService(generateSpatialDataCompleted,generateSpatialDataFailed);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/datasets/Park@Changchun/georelation.json?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.spatialRelationType).toBe("INTERSECT");
            expect(paramsObj.expectCount).toBe(20);

            // expect(params).toContain("'expectCount':20");
            // expect(params).toContain("'spatialRelationType':\"INTERSECT\"");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(geoRelationAnalystCommonResultJson)));
        });
        datasetRelationService.processAsync(datasetGeoRelationParameters);
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
        var generateSpatialDataCompleted = (completedEventArgs) => {
            completedEventArgsSystem = completedEventArgs;
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
        };
        var generateSpatialDataFailed = (failedEventArgs) => {
            failedEventArgsSystem = failedEventArgs;
        };
        var datasetRelationService =initGeoRelationAnalystService(generateSpatialDataCompleted,generateSpatialDataFailed);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/datasets/Park@Changchun/georelation.json?returnContent=true");
            // expect(params).toContain("'expectCount':5");
            // expect(params).toContain("'spatialRelationType':\"INTERSECT\"");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.spatialRelationType).toBe("INTERSECT");
            expect(paramsObj.expectCount).toBe(5);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`[{"result":[1],"count":1,"source":1},{"result":[1],"count":1,"source":2},{"result":[1],"count":1,"source":3},{"result":[1],"count":1,"source":4},{"result":[1],"count":1,"source":5}]`));
        });
        datasetRelationService.processAsync(datasetGeoRelationParameters);

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
        var generateSpatialDataCompleted = (completedEventArgs) => {
            completedEventArgsSystem = completedEventArgs;
        };
        var generateSpatialDataFailed = (failedEventArgs) => {
            failedEventArgsSystem = failedEventArgs;
            try {
                expect(failedEventArgsSystem).not.toBeNull();
                expect(failedEventArgsSystem.error).not.toBeNull();
                expect(failedEventArgsSystem.error.code).toEqual(400);
                expect(failedEventArgsSystem.error.errorMsg).not.toBeNull();
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
        };
        var datasetRelationService =initGeoRelationAnalystService(generateSpatialDataCompleted,generateSpatialDataFailed);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/datasets/Park@Changchun/georelation.json?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.spatialRelationType).toBe("INTERSECT");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"数据集标识为null。"}}`));
        });
        datasetRelationService.processAsync(datasetGeoRelationParameters);
    });
});

