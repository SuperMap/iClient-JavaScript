import { FeatureService } from '../../../src/mapboxgl/services/FeatureService';
import { GetFeaturesByBufferParameters } from '../../../src/common/iServer/GetFeaturesByBufferParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = 'http://supermap:8090/iserver/services/data-world/rest/data';

describe('mapboxgl_FeatureService_getFeaturesByBuffer', () => {
    var serviceResult = null;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        serviceResult = null;
    });

    //数据集Buffer查询服务
    it('getFeaturesByBuffer_geometry', done => {
        var queryBufferGeometry = {
            type: 'Polygon',
            coordinates: [
                [
                    [-20, 20],
                    [-20, -20],
                    [20, -20],
                    [20, 20],
                    [-20, 20]
                ]
            ]
        };
        var bufferParam = new GetFeaturesByBufferParameters({
            datasetNames: ['World:Capitals'],
            bufferDistance: 10,
            geometry: queryBufferGeometry,
            fromIndex: 1,
            toIndex: 3
        });
        var service = new FeatureService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + '/featureResults?returnContent=true&fromIndex=1&toIndex=3');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.datasetNames[0]).toBe('World:Capitals');
            expect(paramsObj.bufferDistance).toEqual(10);
            expect(paramsObj.getFeatureMode).toBe('BUFFER');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByBuffer(bufferParam, testResult => {
            serviceResult = testResult;
            expect(service).not.toBeNull();
            expect(serviceResult.type).toBe('processCompleted');
            expect(serviceResult.object.format).toBe('GEOJSON');
            var result = serviceResult.result;
            expect(result.succeed).toBe(true);
            expect(result.featureCount).toEqual(1);
            expect(result.totalCount).toEqual(1);
            expect(serviceResult.result.features.type).toEqual('FeatureCollection');
            var features = result.features.features;
            expect(features.length).toEqual(1);
            expect(features[0].id).toEqual(127);
            for (var i = 0; i < features.length; i++) {
                expect(features[i].type).toEqual('Feature');
                expect(features[i].properties).not.toBeNull();
                expect(features[i].geometry.type).toEqual('MultiPolygon');
                expect(features[i].geometry.coordinates.length).toEqual(2);
            }
            bufferParam.destroy();
            done();
        });
    });
    it('GetFeaturesByBufferParameters:targetEpsgCode', done => {
        var queryBufferGeometry = {
            type: 'Polygon',
            coordinates: [
                [
                    [-20, 20],
                    [-20, -20],
                    [20, -20],
                    [20, 20],
                    [-20, 20]
                ]
            ]
        };
        var bufferParam = new GetFeaturesByBufferParameters({
            datasetNames: ['World:Capitals'],
            bufferDistance: 10,
            geometry: queryBufferGeometry,
            targetEpsgCode: 4326
        });
        var service = new FeatureService(url);

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetEpsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByBuffer(bufferParam, result => {
            serviceResult = result;
            bufferParam.destroy();
            done();
        });
    });
    it('GetFeaturesByBufferParameters:targetPrj', done => {
        var queryBufferGeometry = {
            type: 'Polygon',
            coordinates: [
                [
                    [-20, 20],
                    [-20, -20],
                    [20, -20],
                    [20, 20],
                    [-20, 20]
                ]
            ]
        };
        var bufferParam = new GetFeaturesByBufferParameters({
            datasetNames: ['World:Capitals'],
            bufferDistance: 10,
            geometry: queryBufferGeometry,
            targetPrj: { epsgCode: 4326 }
        });
        var service = new FeatureService(url);

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByBuffer(bufferParam, result => {
            serviceResult = result;
            bufferParam.destroy();
            done();
        });
    });
});
