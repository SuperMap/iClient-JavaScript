require('../../../src/openlayers/services/FeatureService');
var featureServiceURL = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};
var id, id1, id2;
describe('openlayers_FeatureService', function () {
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
            IDs: [246, 247],
            datasetNames: ["World:Countries"]
        });
        var getFeaturesByIDService = new ol.supermap.FeatureService(featureServiceURL, options);
        getFeaturesByIDService.getFeaturesByIDs(idsParam, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(getFeaturesByIDService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.featureCount).toEqual(2);
                expect(serviceResult.result.totalCount).toEqual(2);
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.features.features;
                expect(features.length).toEqual(2);
                for (var i = 0; i < 2; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].properties).not.toBeNull();
                    if (i = 0) {
                        expect(features[i].properties.CAPITAL).toEqual("新德里");
                    }
                    else if (i = 1) {
                        expect(features[i].properties.CAPITAL).toEqual("北京");
                    }
                    expect(features[i].geometry.type).toEqual("MultiPolygon");
                    expect(features[i].geometry.coordinates[0][0].length).toBeGreaterThan(0);
                    for (var j = 0; j < features[i].geometry.coordinates[0][0].length - 300; j++) {
                        expect(features[i].geometry.coordinates[0][0][j].length).toEqual(2);
                    }
                }
                done();
            } catch (exception) {
                console.log("'getFeaturesByIDs_test'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);

    });


    //数据集Bounds查询服务
    it('getFeaturesByBounds_test', function (done) {
        var polygon = new ol.geom.Polygon([[[-20, 20], [-20, -20], [20, -20], [20, 20], [-20, 20]]]);
        var boundsParam = new SuperMap.GetFeaturesByBoundsParameters({
            datasetNames: ["World:Capitals"],
            bounds: polygon.getExtent()
        });
        var getFeaturesByBoundsService = new ol.supermap.FeatureService(featureServiceURL, options);
        getFeaturesByBoundsService.getFeaturesByBounds(boundsParam, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(getFeaturesByBoundsService).not.toBeNull();
                expect(getFeaturesByBoundsService.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.featureCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.features.features;
                expect(features).not.toBeNull();
                expect(features.length).toEqual(20);
                expect(features[0].properties.CAPITAL).toEqual("蒙罗维亚");
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual("Point");
                    expect(features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(features[0].id).not.toBeNull();
                expect(features[0].geometry.type).toEqual("Point");
                done();
            } catch (exception) {
                console.log("'getFeaturesByBounds_test'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);

    });


    //数据集Buffer查询服务
    it('getFeaturesByBuffer_test', function (done) {
        var polygon = new ol.geom.Polygon([[[-20, 20], [-20, -20], [20, -20], [20, 20], [-20, 20]]]);
        var bufferParam = new SuperMap.GetFeaturesByBufferParameters({
            datasetNames: ["World:Capitals"],
            bufferDistance: 30,
            geometry: polygon
        });
        var getFeaturesByBuffeService = new ol.supermap.FeatureService(featureServiceURL, options);
        getFeaturesByBuffeService.getFeaturesByBuffer(bufferParam, function (result) {
            serviceResult = result;

        });
        setTimeout(function () {
            try {
                expect(getFeaturesByBuffeService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.featureCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.features.features;
                expect(features.length).toBeGreaterThan(0);
                expect(features[0].properties.CAPITAL).toEqual("巴西利亚");
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual("Point");
                    expect(features[i].geometry.coordinates.length).toEqual(2);
                }
                done();
            } catch (exception) {
                console.log("'getFeaturesByBuffer_test'案例失败" + exception.name + ":" + exception.message);
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
        var getFeaturesBySQLService = new ol.supermap.FeatureService(featureServiceURL, options);
        getFeaturesBySQLService.getFeaturesBySQL(sqlParam, function (result) {
            serviceResult = result;
            setTimeout(function () {
                try {
                    expect(getFeaturesBySQLService).not.toBeNull();
                    expect(serviceResult).not.toBeNull();
                    expect(serviceResult.type).toBe("processCompleted");
                    expect(serviceResult.result.succeed).toBe(true);
                    expect(serviceResult.result.featureCount).toEqual(1);
                    expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                    expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                    var features = serviceResult.result.features.features;
                    expect(features.length).not.toBeNull();
                    expect(features[0].id).not.toBeNull();
                    expect(features[0].type).toEqual("Feature");
                    expect(features[0].properties.CAPITAL).toEqual("北京");
                    expect(features[0].geometry.type).toEqual("MultiPolygon");
                    expect(features[0].geometry.coordinates.length).toBeGreaterThan(0);
                    expect(features[0].geometry.coordinates[0][0].length).toBeGreaterThan(0);
                    for (var i = 0; i < features[0].geometry.coordinates[0][0].length; i++) {
                        expect(features[0].geometry.coordinates[0][0][i].length).toEqual(2);
                    }
                    done();
                } catch (exception) {
                    console.log("'getFeaturesBySQL_test'案例失败" + exception.name + ":" + exception.message);
                    expect(false).toBeTruthy();
                    done();
                }

            }, 5000);
        });
    });


    //数据集几何查询服务类
    it('getFeaturesByGeometry_test', function (done) {
        var polygon = new ol.geom.Polygon([[[0, 0], [-10, 30], [-30, 0], [0, 0]]]);
        var geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
            datasetNames: ["World:Countries"],
            geometry: polygon,
            spatialQueryMode: "INTERSECT"
        });
        var getFeaturesByGeometryService = new ol.supermap.FeatureService(featureServiceURL, options);
        getFeaturesByGeometryService.getFeaturesByGeometry(geometryParam, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.featureCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.features.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].properties.ID).toEqual(features[i].id);
                    expect(features[i].geometry.type).toEqual("MultiPolygon");
                    expect(features[i].geometry.coordinates[0][0].length).toBeGreaterThan(0);
                    for (var j = 0; j < features[i].geometry.coordinates[0][0].length; j++) {
                        expect(features[i].geometry.coordinates[0][0][j].length).toEqual(2);
                    }
                }
                done();
            } catch (exception) {
                console.log("'getFeaturesByGeometry_test'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });


    //地物编辑服务 添加一个地物
    it('editFeatures_addFeature_test', function (done) {
        var marker = new ol.Feature(new ol.geom.Point([118.05408801141, 58.837029131724]));
        marker.setProperties({POP: 1, CAPITAL: 'test'});
        var addFeatureParams = new SuperMap.EditFeaturesParameters({
            features: marker,
            dataSourceName: "World",
            dataSetName: "Capitals",
            editType: "add",
            returnContent: true,
        });
        var featureService = new ol.supermap.FeatureService(featureServiceURL, options);
        featureService.editFeatures(addFeatureParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(featureService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result[0]).not.toBeNull();
                id = serviceResult.result[0];
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.object.options.method).toBe("POST");
                expect(serviceResult.object.options.data).toContain("'parts':[1]");
                expect(serviceResult.object.options.data).toContain('"POINT"');
                expect(serviceResult.object.options.data).toContain("'x':118.05408801141");
                expect(serviceResult.object.options.data).toContain("'y':58.837029131724");
                done();
            } catch (e) {
                console.log("'editFeatures_addFeature_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //地物编辑服务 批量添加地物   isUseBatch为true
    it('editFeatures_addFeature_isUseBatch_true_test', function (done) {
        var marker = new ol.Feature(new ol.geom.Point([100, 58]));
        var marker1 = new ol.Feature(new ol.geom.Point([120, 42]));
        marker.setProperties({POP: 1, CAPITAL: 'test'});
        marker1.setProperties({POP: 1, CAPITAL: 'test'});
        var addFeatureParams = new SuperMap.EditFeaturesParameters({
            features: [marker, marker1],
            dataSourceName: "World",
            dataSetName: "Capitals",
            editType: "add",
            returnContent: true,
            isUseBatch: true
        });
        var featureService = new ol.supermap.FeatureService(featureServiceURL, options);
        featureService.editFeatures(addFeatureParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(featureService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.postResultType).toEqual("CreateChild");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.isUseBatch).toBe(true);
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.object.options.method).toBe("POST");
                expect(serviceResult.object.options.data).toContain("'parts':[1]");
                expect(serviceResult.object.options.data).toContain('"POINT"');
                expect(serviceResult.object.options.data).toContain("'x':100");
                expect(serviceResult.object.options.data).toContain("'y':58");
                expect(serviceResult.object.options.data).toContain("'x':120");
                expect(serviceResult.object.options.data).toContain("'y':42");
                id1 = id + 1;
                id2 = id + 2;
                done();
            } catch (e) {
                console.log("'editFeatures_addFeature_isUseBatch_true_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //地物编辑服务 删除地物
    it('editFeatures_deleteFeature_test', function (done) {
        var deleteFeatureParams = new SuperMap.EditFeaturesParameters({
            dataSourceName: "World",
            dataSetName: "Capitals",
            IDs: [id, id1, id2],
            editType: "delete",
        });
        var featureService = new ol.supermap.FeatureService(featureServiceURL, options);
        featureService.editFeatures(deleteFeatureParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(featureService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.object.options.method).toBe("DELETE");
                expect(serviceResult.object.options.data).toContain(id);
                expect(serviceResult.object.options.data).toContain(id1);
                expect(serviceResult.object.options.data).toContain(id2);
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                done();
            } catch (e) {
                console.log("'editFeatures_deleteFeature_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //地物编辑服务 删除地物失败事件
    it('editFeatures_deleteFeature_failed_test', function (done) {
        id = id + 3;
        var deleteFeatureParams = new SuperMap.EditFeaturesParameters({
            dataSourceName: "World",
            dataSetName: "Capitals",
            IDs: [id],
            editType: "delete",
        });
        var featureService = new ol.supermap.FeatureService(featureServiceURL, options);
        featureService.editFeatures(deleteFeatureParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(featureService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.error.code).toBe(400);
                expect(serviceResult.error.errorMsg).toEqual("the specified features does not exist");
                done();
            } catch (e) {
                console.log("'editFeatures_deleteFeature_failed_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });


});