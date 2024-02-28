import { chartService } from '../../../src/leaflet/services/ChartService';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';
import { ChartQueryFilterParameter, ChartQueryParameters } from '@supermap/iclient-common';
import {Bounds} from '../../../src/common/commontypes/Bounds';

var url = GlobeParameter.chartServiceURL;
const options = {};
describe('leaflet_ChartService', () => {
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
        var service = chartService(url, options);
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
        var service = chartService(url, options);

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
        var service = chartService(url, options);
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
    it('_processFormat', (done) => {
        var service = chartService(url, {});
        expect(service._processFormat()).not.toBeFalsy();
        expect(service._processFormat('json')).toBeTruthy();
        done();
    });
});