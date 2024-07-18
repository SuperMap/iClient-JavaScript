import { NetworkAnalyst3DService } from '../../../src/maplibregl/services/NetworkAnalyst3DService';

import { FacilityAnalystSources3DParameters } from '@supermapgis/iclient-common/iServer/FacilityAnalystSources3DParameters';
import { FacilityAnalystSinks3DParameters } from '@supermapgis/iclient-common/iServer/FacilityAnalystSinks3DParameters';
import { FacilityAnalystTraceup3DParameters } from '@supermapgis/iclient-common/iServer/FacilityAnalystTraceup3DParameters';
import { FetchRequest } from '@supermapgis/iclient-common/util/FetchRequest';
import { FacilityAnalystTracedown3DParameters, FacilityAnalystUpstream3DParameters } from '@supermapgis/iclient-common';

var url = GlobeParameter.networkAnalyst3DURL;
var options = {

};

describe('maplibregl_NetworkAnalyst3DService', () => {
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

    //汇查找服务
    it('sinksFacilityAnalyst', (done) => {
        var facilityAnalystSinks3DParameters = new FacilityAnalystSinks3DParameters({
            edgeID: 1,
            weightName: 'SMLENGTH',
            isUncertainDirectionValid: true
        });
        var service = new NetworkAnalyst3DService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url + "/sinks");
            return Promise.resolve(new Response(JSON.stringify(sinksFacilityAnalyst)));
        });
        service.sinksFacilityAnalyst(facilityAnalystSinks3DParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                var result = serviceResult.result;
                expect(result.edges.length).not.toBeFalse();
                done();
            } catch (exception) {
                console.log("'sinksFacilityAnalyst'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //源查找服务
    it('sourcesFacilityAnalyst', (done) => {
        var facilityAnalystSources3DParameters = new FacilityAnalystSources3DParameters({
            edgeID: 1,
            weightName: 'SMLENGTH'
        });
        var service = new NetworkAnalyst3DService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url + "/sources");
            return Promise.resolve(new Response(JSON.stringify(sourcesFacilityAnalyst)));
        });
        service.sourcesFacilityAnalyst(facilityAnalystSources3DParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                var result = serviceResult.result;
                expect(result.edges.length).not.toBeFalse();
                done();
            } catch (exception) {
                console.log("'sourcesFacilityAnalyst'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //上游追踪资源服务
    it('traceUpFacilityAnalyst', (done) => {
        var facilityAnalystTraceup3DParameters = new FacilityAnalystTraceup3DParameters({
            edgeID: 1,
            weightName: 'SMLENGTH'
        });
        var service = new NetworkAnalyst3DService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url + "/traceupresult");
            return Promise.resolve(new Response(JSON.stringify(traceUpFacilityAnalyst)));
        });
        service.traceUpFacilityAnalyst(facilityAnalystTraceup3DParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                var result = serviceResult.result;
                expect(result.edges.length).not.toBeFalse();
                done();
            } catch (exception) {
                console.log("'traceUpFacilityAnalyst'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    //下游追踪资源服务。
    it('traceDownFacilityAnalyst', (done) => {
        var facilityAnalystTracedown3DParameters = new FacilityAnalystTracedown3DParameters({
            edgeID: 1,
            weightName: 'SMLENGTH'
        });
        var service = new NetworkAnalyst3DService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url + "/tracedownresult");
            return Promise.resolve(new Response(JSON.stringify(traceDownFacilityAnalyst)));
        });
        service.traceDownFacilityAnalyst(facilityAnalystTracedown3DParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                var result = serviceResult.result;
                expect(result.edges.length).not.toBeFalse();
                done();
            } catch (exception) {
                console.log("'traceDownFacilityAnalyst'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    //上游关键设施查找服务。
    it('upstreamFacilityAnalyst', (done) => {
        var facilityAnalystUpstream3DParameters = new FacilityAnalystUpstream3DParameters({
            edgeID: 1,
            weightName: 'SMLENGTH'
        });
        var service = new NetworkAnalyst3DService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url + "/upstreamcirticalfaclilities");
            return Promise.resolve(new Response(JSON.stringify(upstreamFacilityAnalyst)));
        });
        service.upstreamFacilityAnalyst(facilityAnalystUpstream3DParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                var result = serviceResult.result;
                expect(result.edges.length).not.toBeFalse();
                done();
            } catch (exception) {
                console.log("'upstreamFacilityAnalyst'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});


