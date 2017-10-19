require('../../../src/mapboxgl/services/FeatureService');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.dataServiceURL;
var id;
describe('mapboxgl_FeatureService', function () {
    var serviceResult;
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //数据集ID查询服务
    it('getFeaturesByIDs_test', function (done) {
        var idsParam = new SuperMap.GetFeaturesByIDsParameters({
            IDs: [247],
            datasetNames: ["World:Countries"]
        });
        var service = new mapboxgl.supermap.FeatureService(url);
        service.getFeaturesByIDs(idsParam, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.options.data).toContain("World:Countries");
                expect(serviceResult.result.featureCount).toEqual(1);
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                expect(serviceResult.result.features.features[0].id).toEqual(247);
                expect(serviceResult.result.features.features[0].type).toEqual("Feature");
                expect(serviceResult.result.features.features[0].geometry.type).toEqual("MultiPolygon");
                var coordinates = serviceResult.result.features.features[0].geometry.coordinates;
                expect(coordinates.length).toBeGreaterThan(0);
                for (var i = 0; i < coordinates.length; i++) {
                    expect(coordinates[i][0].length).toBeGreaterThan(0);
                    for (var j = 0; j < coordinates[i][0].length; j++) {
                        expect(coordinates[i][0][j].length).toEqual(2);
                    }
                }
                done();

            } catch (e) {
                console.log("'getFeaturesByIDs_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //数据集Bounds查询服务
    it('getFeaturesByBounds_test', function (done) {
        var sw = new mapboxgl.LngLat(-20, -20);
        var ne = new mapboxgl.LngLat(20, 20);
        var lngLatBounds = new mapboxgl.LngLatBounds(sw, ne);
        var boundsParam = new SuperMap.GetFeaturesByBoundsParameters({
            datasetNames: ["World:Capitals"],
            bounds: lngLatBounds
        });
        var service = new mapboxgl.supermap.FeatureService(url);
        service.getFeaturesByBounds(boundsParam, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.options.data).toContain("World:Capitals");
                expect(serviceResult.result.featureCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.features.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual("Point");
                    expect(features[i].geometry.coordinates.length).toEqual(2);
                }
                done();
            } catch (e) {
                console.log("'getFeaturesByBounds_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //数据集Buffer查询服务
    it('getFeaturesByBuffer_test', function (done) {
        var queryBufferGeometry = {
            "type": "Polygon",
            "coordinates": [[[-20, 20], [-20, -20], [20, -20], [20, 20], [-20, 20]]]
        };
        var bufferParam = new SuperMap.GetFeaturesByBufferParameters({
            datasetNames: ["World:Capitals"],
            bufferDistance: 30,
            geometry: queryBufferGeometry
        });
        var service = new mapboxgl.supermap.FeatureService(url);
        service.getFeaturesByBuffer(bufferParam, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.options.data).toContain("World:Capitals");
                expect(serviceResult.result.featureCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.features.features;
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual("Point");
                    expect(features[i].geometry.coordinates.length).toEqual(2);
                }
                done();
            } catch (e) {
                console.log("'getFeaturesByBuffer_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);

    });

    //数据集SQL查询服务
    it('getFeaturesBySQL_test', function (done) {
        var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "Countries@World",
                attributeFilter: "SMID = 247"
            },
            datasetNames: ["World:Countries"]
        });
        var service = new mapboxgl.supermap.FeatureService(url);
        service.getFeaturesBySQL(sqlParam, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.options.data).toContain("Countries@World");
                expect(serviceResult.object.options.data).toContain("SMID = 247");
                expect(serviceResult.result.featureCount).toEqual(1);
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.features.features[0];
                expect(features.id).toEqual(247);
                expect(features.type).toEqual("Feature");
                expect(features.properties).not.toBeNull();
                expect(features.geometry.type).toEqual("MultiPolygon");
                var coordinates = features.geometry.coordinates;
                for (var i = 0; i < coordinates.length; i++) {
                    expect(coordinates[i][0].length).toBeGreaterThan(0);
                    for (var j = 0; j < coordinates[i][0].length; j++) {
                        expect(coordinates[i][0][j].length).toEqual(2);
                    }
                }
                done();
            } catch (e) {
                console.log("'getFeaturesBySQL_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //数据集几何查询服务类
    it('getFeaturesByGeometry_test', function (done) {
        var queryPolygonGeometry = {
            "type": "Polygon",
            "coordinates": [[[0, 0], [-10, 30], [-30, 0], [0, 0]]]
        };
        var geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
            datasetNames: ["World:Countries"],
            geometry: queryPolygonGeometry,
            spatialQueryMode: "INTERSECT"
        });
        var service = new mapboxgl.supermap.FeatureService(url);
        service.getFeaturesByGeometry(geometryParam, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.options.data).toContain("World:Countries");
                expect(serviceResult.result.featureCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.features.features[0];
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual("MultiPolygon");
                    expect(features[i].geometry.coordinates).not.toBeNull();
                }
                done();
            } catch (e) {
                console.log("'getFeaturesByGeometry_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //地物编辑服务 添加地物
    it('editFeatures_addFeature_test', function (done) {
        var pointFeature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [10, 15]
            },
            "properties": {POP: 1, CAPITAL: 'test'}
        };
        var marker = {
            "type": "FeatureCollection",
            "features": [pointFeature]
        };
        var addFeatureParams = new SuperMap.EditFeaturesParameters({
            features: marker,
            dataSourceName: "World",
            dataSetName: "Capitals",
            editType: "add",
            returnContent: true,
        });
        var service = new mapboxgl.supermap.FeatureService(url);
        service.editFeatures(addFeatureParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result[0]).not.toBeNull();
                id = serviceResult.result[0];
                expect(serviceResult.object.options.method).toBe("POST");
                expect(serviceResult.object.options.data).toContain('"POINT"');
                expect(serviceResult.object.options.data).toContain("'x':10");
                expect(serviceResult.object.options.data).toContain("'y':15");
                done();
            } catch (e) {
                console.log("'editFeatures_addFeature_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //地物编辑服务 删除地物
    it('editFeatures_deleteFeature_test', function (done) {
        var deleteFeatureParams = new SuperMap.EditFeaturesParameters({
            dataSourceName: "World",
            dataSetName: "Capitals",
            IDs: [id],
            editType: "delete",
        });
        var service = new mapboxgl.supermap.FeatureService(url);
        service.editFeatures(deleteFeatureParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.object.options.method).toBe("DELETE");
                expect(serviceResult.object.options.data).toContain(id);
                done();
            } catch (e) {
                console.log("'editFeatures_deleteFeature_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });


});