import {QueryService} from '../../../src/openlayers/services/QueryService';
import {QueryByBoundsParameters} from '../../../src/common/iServer/QueryByBoundsParameters';
import {QueryByDistanceParameters} from '../../../src/common/iServer/QueryByDistanceParameters';
import {QueryBySQLParameters} from '../../../src/common/iServer/QueryBySQLParameters';
import {QueryByGeometryParameters} from '../../../src/common/iServer/QueryByGeometryParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

import Polygon from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';

var url = GlobeParameter.WorldURL;

describe('openlayers_QueryService', () => {
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

    //地图bounds查询
    it('queryByBounds', (done) => {
        var polygon = new Polygon([[[0, 0], [60, 0], [60, 39], [0, 39], [0, 0]]]);
        var param = new QueryByBoundsParameters({
            queryParams: {name: "Capitals@World"},
            bounds: polygon.getExtent()
        });
        var queryService = new QueryService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/queryResults?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryMode).toBe("BoundsQuery");
            expect(paramsObj.queryParameters.queryParams[0].name).toBe("Capitals@World");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(queryResultJson)));
        });
        queryService.queryByBounds(param, (result) => {
            serviceResult = result;
            try {
                expect(queryService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.currentCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.currentCount);
                var recordSets = serviceResult.result.recordsets[0];
                expect(recordSets.datasetName).toEqual("Capitals@World");
                expect(recordSets.features.type).toEqual("FeatureCollection");
                var features = recordSets.features.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual("Point");
                    expect(features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(recordSets.fieldCaptions.length).toEqual(2);
                expect(recordSets.fieldTypes.length).toEqual(recordSets.fieldCaptions.length);
                expect(recordSets.fields.length).toEqual(recordSets.fieldCaptions.length);
                done();
            } catch (e) {
                console.log("'queryByBounds'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //地图距离查询服务
    it('queryByDistance', (done) => {
        var point = new Point([104, 30]);
        var param = new QueryByDistanceParameters({
            queryParams: {name: "Capitals@World"},
            distance: 10,
            geometry: point
        });
        var queryService = new QueryService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/queryResults?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryMode).toBe("DistanceQuery");
            expect(paramsObj.queryParameters.queryParams[0].name).toBe("Capitals@World");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(queryResultJson)));
        });
        queryService.queryByDistance(param, (result) => {
            serviceResult = result;
            try {
                expect(queryService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.currentCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.currentCount);
                var recordSets = serviceResult.result.recordsets[0];
                expect(recordSets.datasetName).toEqual("Capitals@World");
                expect(recordSets.features.type).toEqual("FeatureCollection");
                var features = recordSets.features.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual("Point");
                    expect(features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(recordSets.fieldCaptions.length).toEqual(2);
                expect(recordSets.fieldTypes.length).toEqual(recordSets.fieldCaptions.length);
                expect(recordSets.fields.length).toEqual(recordSets.fieldCaptions.length);
                done();
            } catch (e) {
                console.log("'queryByDistance'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //地图SQL查询服务
    it('queryBySQL', (done) => {
        var param = new QueryBySQLParameters({
            queryParams: {
                name: "Capitals@World",
                attributeFilter: "SMID < 10"
            }
        });
        var queryService = new QueryService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/queryResults?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryMode).toBe("SqlQuery");
            expect(paramsObj.queryParameters.queryParams[0].name).toBe("Capitals@World");
            expect(paramsObj.queryParameters.queryParams[0].attributeFilter).toBe("SMID %26lt; 10");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(queryResultJson)));
        });
        queryService.queryBySQL(param, (result) => {
            serviceResult = result;
            try {
                expect(queryService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.currentCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.currentCount);
                var recordSets = serviceResult.result.recordsets[0];
                expect(recordSets.datasetName).toEqual("Capitals@World");
                expect(recordSets.features.type).toEqual("FeatureCollection");
                var features = recordSets.features.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual("Point");
                    expect(features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(recordSets.fieldCaptions.length).toEqual(2);
                expect(recordSets.fieldTypes.length).toEqual(recordSets.fieldCaptions.length);
                expect(recordSets.fields.length).toEqual(recordSets.fieldCaptions.length);
                done();
            } catch (e) {
                console.log("'queryBySQL'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //地图几何查询服务
    it('queryByGeometry', (done) => {
        var polygon = new Polygon([[[0, 0], [-30, 0], [-10, 30], [0, 0]]]);
        var param = new QueryByGeometryParameters({
            queryParams: {name: "Capitals@World"},
            geometry: polygon
        });
        var queryService = new QueryService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/queryResults?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryMode).toBe("SpatialQuery");
            expect(paramsObj.queryParameters.queryParams[0].name).toBe("Capitals@World");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(queryResultJson)));
        });
        queryService.queryByGeometry(param, (result) => {
            serviceResult = result;
            try {
                expect(queryService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.currentCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.currentCount);
                var recordSets = serviceResult.result.recordsets[0];
                expect(recordSets.datasetName).toEqual("Capitals@World");
                expect(recordSets.features.type).toEqual("FeatureCollection");
                var features = recordSets.features.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual("Point");
                    expect(features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(recordSets.fieldCaptions.length).toEqual(2);
                expect(recordSets.fieldTypes.length).toEqual(recordSets.fieldCaptions.length);
                expect(recordSets.fields.length).toEqual(recordSets.fieldCaptions.length);
                done();
            } catch (e) {
                console.log("'queryByGeometry'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});