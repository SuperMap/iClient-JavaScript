import {QueryService} from '../../../src/mapboxgl/services/QueryService';
import {QueryByBoundsParameters} from '../../../src/common/iServer/QueryByBoundsParameters';
import {QueryByDistanceParameters} from '../../../src/common/iServer/QueryByDistanceParameters';
import {QueryBySQLParameters} from '../../../src/common/iServer/QueryBySQLParameters';
import {QueryByGeometryParameters} from '../../../src/common/iServer/QueryByGeometryParameters';
import mapboxgl from 'mapbox-gl';

var url = GlobeParameter.WorldURL;

describe('mapboxgl_QueryService', () => {
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
        var param = new QueryByBoundsParameters({
            queryParams: {name: "Capitals@World.1"},
            bounds: new mapboxgl.LngLatBounds([0, 0], [60, 39])
        });
        var queryService = new QueryService(url);
        queryService.queryByBounds(param, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(queryService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.currentCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.currentCount);
                var recordSets = serviceResult.result.recordsets[0];
                expect(recordSets.datasetName).toEqual("Capitals@World#1");
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
                expect(recordSets.fieldCaptions.length).toEqual(16);
                expect(recordSets.fieldTypes.length).toEqual(recordSets.fieldCaptions.length);
                expect(recordSets.fields.length).toEqual(recordSets.fieldCaptions.length);
                done();
            } catch (e) {
                console.log("'queryByBounds'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //地图距离查询服务
    it('queryByDistance', (done) => {
        var param = new QueryByDistanceParameters({
            queryParams: {name: "Capitals@World.1"},
            distance: 10,
            geometry: new mapboxgl.LngLat(104, 30)
        });
        var queryService = new QueryService(url);
        queryService.queryByDistance(param, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(queryService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.currentCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.currentCount);
                var recordSets = serviceResult.result.recordsets[0];
                expect(recordSets.datasetName).toEqual("Capitals@World#1");
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
                expect(recordSets.fieldCaptions.length).toEqual(16);
                expect(recordSets.fieldTypes.length).toEqual(recordSets.fieldCaptions.length);
                expect(recordSets.fields.length).toEqual(recordSets.fieldCaptions.length);
                done();
            } catch (e) {
                console.log("'queryByDistance'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //地图SQL查询服务
    it('queryBySQL', (done) => {
        var param = new QueryBySQLParameters({
            queryParams: {
                name: "Capitals@World.1",
                attributeFilter: "SMID < 10"
            }
        });
        var queryService = new QueryService(url);
        queryService.queryBySQL(param, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(queryService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.currentCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.currentCount);
                var recordSets = serviceResult.result.recordsets[0];
                expect(recordSets.datasetName).toEqual("Capitals@World#1");
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
                expect(recordSets.fieldCaptions.length).toEqual(16);
                expect(recordSets.fieldTypes.length).toEqual(recordSets.fieldCaptions.length);
                expect(recordSets.fields.length).toEqual(recordSets.fieldCaptions.length);
                done();
            } catch (e) {
                console.log("'queryBySQL'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //地图几何查询服务
    it('queryByGeometry', (done) => {
        var geo = {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[[0, 0], [-30, 0], [-10, 30], [0, 0]]],
            }
        };
        var param = new QueryByGeometryParameters({
            queryParams: {name: "Capitals@World.1"},
            geometry: geo
        });
        var queryService = new QueryService(url);
        queryService.queryByGeometry(param, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(queryService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.currentCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.currentCount);
                var recordSets = serviceResult.result.recordsets[0];
                expect(recordSets.datasetName).toEqual("Capitals@World#1");
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
                expect(recordSets.fieldCaptions.length).toEqual(16);
                expect(recordSets.fieldTypes.length).toEqual(recordSets.fieldCaptions.length);
                expect(recordSets.fields.length).toEqual(recordSets.fieldCaptions.length);
                done();
            } catch (e) {
                console.log("'queryByGeometry'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });
});