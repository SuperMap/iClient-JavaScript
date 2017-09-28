require('../../../src/openlayers/services/FeatureService');
var FeatureServiceURL = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};
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
        var getFeaturesByIDService = new ol.supermap.FeatureService(FeatureServiceURL, options);
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
        var getFeaturesByBoundsService = new ol.supermap.FeatureService(FeatureServiceURL, options);
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
                expect(serviceResult.result.featureCount).toEqual(24);
                expect(serviceResult.result.totalCount).toEqual(24);
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
        var getFeaturesByBuffeService = new ol.supermap.FeatureService(FeatureServiceURL, options);
        getFeaturesByBuffeService.getFeaturesByBuffer(bufferParam, function (result) {
            serviceResult = result;

        });
        setTimeout(function () {
            try {
                expect(getFeaturesByBuffeService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.featureCount).toEqual(88);
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
        var getFeaturesBySQLService = new ol.supermap.FeatureService(FeatureServiceURL, options);
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
        var getFeaturesByGeometryService = new ol.supermap.FeatureService(FeatureServiceURL, options);
        getFeaturesByGeometryService.getFeaturesByGeometry(geometryParam, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.featureCount).toEqual(13);
                expect(serviceResult.result.totalCount).toEqual(13);
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


    //地物编辑服务
    xit('editFeatures_test', function (done) {
        var xmax = 120, xmin = 100, ymax = 50, ymin = 20;
        var pointFeature = new ol.Feature(new ol.geom.Point([Math.floor(Math.random() * (xmax - xmin + 1) + xmin), Math.floor(Math.random() * (ymax - ymin + 1) + ymin)]));

        var addFeatureParams = new SuperMap.EditFeaturesParameters({
            features: pointFeature,
            dataSourceName: "World",
            dataSetName: "Capitals",
            editType: "add",
            returnContent: true
        });
        var featureService = new ol.supermap.FeatureService(FeatureServiceURL, options);
        featureService.editFeatures(addFeatureParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(featureService).not.toBeNull();
                expect(featureService.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result[0]).not.toBeNull();
                expect(serviceResult.result[0]).toBeGreaterThan(1);
                done();
            } catch (exception) {
                console.log("'editFeatures_test'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});