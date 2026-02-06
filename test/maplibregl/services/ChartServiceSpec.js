import { ChartService } from '../../../src/maplibregl/services/ChartService';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

import { ChartQueryParameters, ChartWaterDepthParameter, ChartWaterLevelParameter, ChartWLTimeRangeParameter } from '@supermapgis/iclient-common';
import {Bounds} from '../../../src/common/commontypes/Bounds';

var url = GlobeParameter.chartServiceURL;
var dataUrl = GlobeParameter.chartServiceDataURL;
const options = {};
describe('maplibregl_ChartService', () => {
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

    it('queryChart', (done) => {
        var chartQueryParameters = new ChartQueryParameters({
            queryMode: "ChartAttributeQuery",
            bounds: new Bounds(-180, -90, 180, 90),
        });
        var service = new ChartService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/queryResults?returnContent=true");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(queryChartResult)));
        });
        service.queryChart(chartQueryParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                done();
            } catch (e) {
                console.log("'queryChart'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    it('getChartFeatureInfo', (done) => {
        var service = new ChartService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url + "/chartFeatureInfoSpecs");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getChartFeatureInfo)));
        });
        service.getChartFeatureInfo((result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                done();
            } catch (e) {
                console.log("'getChartFeatureInfo'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    it('getChartAcronymClassify', (done) => {
        var service = new ChartService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url + "/chartAcronymClassify");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(chartAcronymClassify)));
        });
        service.getChartAcronymClassify((result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                done();
            } catch (e) {
                console.log("'getChartAcronymClassify'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    it('getChartWaterDepth', (done) => {
        var service = new ChartService(url, dataUrl, options);
        var parms = new ChartWaterDepthParameter({
            dataSource: 'testDataSrouce1',
            X:113.62145767211913,
            Y:22.775788497924808
        });
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl.indexOf(url + "/layers") > -1) {
                return Promise.resolve(new Response(JSON.stringify(layersRes)));
            } 
            if (testUrl.indexOf("/gridValue") > -1) {
                return Promise.resolve(new Response(JSON.stringify(gridValue)));
            } 
            if (testUrl.indexOf("S102_102YYYY000000000002_Group01_D") > -1) {
                return Promise.resolve(new Response(JSON.stringify(datasetRes)));
            } 

            return Promise.resolve();
        });
        var service2 = new ChartService(url);
        const service2Res = service2.getChartWaterDepth(parms);
        expect(service2Res).toBeNull();
        service.getChartWaterDepth(parms).then(res => {
          expect(res.result.value).toBe(12)
          expect(res.result.row).toBe(845)
          expect(res.result.column).toBe(385)
          done();
        })
    });

    it('getWaterLevel', (done) => {
        var service = new ChartService(url, dataUrl, options);
        var parms = new ChartWaterLevelParameter({
            dataSource: 'testDataSrouce1',
            bounds: [113.6307273864746, 22.780766677856448, 113.6358772277832, 22.785916519165042]
        });
        spyOn(FetchRequest, 'post').and.callFake((testUrl, params) => {
            if (params.includes('S104WaterLevel')) {
              return Promise.resolve(new Response(JSON.stringify(WLfeaturesRes)));
            }
            if (params.includes('S104Time')) {
              return Promise.resolve(new Response(JSON.stringify(timefeaturesRes)));
            }
            if (testUrl.indexOf("featureResults") > -1) {
              return Promise.resolve(new Response(JSON.stringify(featuresRes)));
            } 
            return Promise.resolve();
        });
        var service2 = new ChartService(url);
        const service2Res = service2.getWaterLevel(parms);
        expect(service2Res).toBeNull();
        service.getWaterLevel(parms).then(res => {
          expect(res.stationFeature).not.toBeNull();
          expect(res.features).not.toBeNull();
          expect(res.features.features[0].properties.TIMEPOINT).not.toBeNull();
          done();
        })
    });

    it('getWLTimeRange', (done) => {
        var service = new ChartService(url, dataUrl, options);
        var parms = new ChartWLTimeRangeParameter({
            dataSource: 'testDataSrouce1'
        });
        spyOn(FetchRequest, 'post').and.callFake((testUrl, params) => {
            if (params.includes('S104Time')) {
              return Promise.resolve(new Response(JSON.stringify(timefeaturesRes)));
            }
            if (testUrl.indexOf("featureResults") > -1) {
              return Promise.resolve(new Response(JSON.stringify(featuresRes)));
            } 
            return Promise.resolve();
        });
        var service2 = new ChartService(url);
        const service2Res = service2.getWLTimeRange(parms);
        expect(service2Res).toBeNull();
        service.getWLTimeRange(parms).then(res => {
          expect(res.features).not.toBeNull();
          done();
        })
    });
    it('_processFormat', (done) => {
        var service = new ChartService(url, {});
        expect(service._processFormat()).not.toBeFalsy();
        expect(service._processFormat('json')).toBeTruthy();
        done();
    });
});