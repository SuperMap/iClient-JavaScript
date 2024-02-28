import request from 'request';
import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {InterpolationDensityAnalystParameters} from '../../../src/common/iServer/InterpolationDensityAnalystParameters';
import {InterpolationIDWAnalystParameters} from '../../../src/common/iServer/InterpolationIDWAnalystParameters';
import {QueryService} from '../../../src/openlayers/services/QueryService';
import {QueryBySQLParameters} from '../../../src/common/iServer/QueryBySQLParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {PixelFormat} from '../../../src/common/REST';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

import Point from 'ol/geom/Point';

var originalTimeout, serviceResults;
var sampleServiceUrl = GlobeParameter.spatialAnalystURL;
describe('openlayers_SpatialAnalystService_interpolationAnalysis', () => {
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset_density = "Interpolation_density_olTest";
    //点密度插值分析
    it('interpolationAnalysis_density', (done) => {
        var interpolationAnalystParameters = new InterpolationDensityAnalystParameters({
            dataset: "SamplesP@Interpolation",
            //插值分析结果数据集的名称
            outputDatasetName: resultDataset_density,
            //插值分析结果数据源的名称
            outputDatasourceName: "Interpolation",
            //结果栅格数据集存储的像素格式
            pixelFormat: PixelFormat.DOUBLE,
            //插值结果栅格数据集的分辨率
            resolution: 3000,
            // 存储用于进行插值分析的字段名称
            zValueFieldName: "AVG_TMP",
            //结果栅格数据集的范围（生效）
            bounds: [-2640403.63, 1873792.1, 3247669.39, 5921501.4]
        });
        var spatialAnalystService = new SpatialAnalystService(sampleServiceUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(sampleServiceUrl + "/datasets/SamplesP@Interpolation/interpolation/density?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.resolution).toEqual(3000);
            expect(paramsObj.zValueFieldName).toBe("AVG_TMP");
            expect(paramsObj.pixelFormat).toBe("DOUBLE");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true,"recordset":null,"message":null,"dataset":"Interpolation_density_olTest_6@Interpolation"}`));
        });
        spatialAnalystService.interpolationAnalysis(interpolationAnalystParameters, (serviceResult) => {
            serviceResults = serviceResult;
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        });
    });

    var resultDataset_IDW_dataset = "Interpolation_IDW_dataset_olTest";
    //反距离加权插值分析
    it('interpolationAnalysis_IDW_dataset', (done) => {
        var interpolationAnalystParameters = new InterpolationIDWAnalystParameters({
            //用于做插值分析的数据源中数据集的名称
            dataset: "SamplesP@Interpolation",
            //插值分析结果数据集的名称
            outputDatasetName: resultDataset_IDW_dataset,
            //插值分析结果数据源的名称
            outputDatasourceName: "Interpolation",
            //结果栅格数据集存储的像素格式
            pixelFormat: PixelFormat.DOUBLE,
            zValueFieldName: "AVG_TMP",
            resolution: 7923.84989108,
            //采取固定点数查找参与运算点的方式
            searchMode: "KDTREE_FIXED_COUNT",
            //固定点数查找方式下，参与插值运算的点数默认为12
            expectedCount: 12,
            bounds: [-2640403.63, 1873792.1, 3247669.39, 5921501.4]
        });
        var spatialAnalystService = new SpatialAnalystService(sampleServiceUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(sampleServiceUrl + "/datasets/SamplesP@Interpolation/interpolation/idw?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.resolution).toEqual(7923.84989108);
            expect(paramsObj.searchMode).toBe("KDTREE_FIXED_COUNT");
            expect(paramsObj.expectedCount).toEqual(12);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true,"recordset":null,"message":null,"dataset":"Interpolation_IDW_dataset_olTest_5@Interpolation"}`));
        });
        spatialAnalystService.interpolationAnalysis(interpolationAnalystParameters, (serviceResult) => {
            serviceResults = serviceResult;
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        });
    });

    var resultDataset_IDW_geometry = "Interpolation_IDW_geometry_olTest";
    //离散点插值分析
    it('interpolationAnalysis_IDW_geometry', (done) => {
        var baseurl = GlobeParameter.mapTemperatureURL + "全国温度变化图";
        //通过SQL查询的方法获取用于插值分析的geometry
        var queryBySQLParams, queryBySQLService;
        queryBySQLService = new QueryService(baseurl);
        queryBySQLParams = new QueryBySQLParameters({
            queryParams: [
                new FilterParameter({
                    name: "SamplesP@Interpolation",
                    attributeFilter: "SMID>0"
                })
            ]
        });
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            if (url.indexOf("/queryResults?returnContent=true") > -1) {
                return Promise.resolve(new Response(JSON.stringify(interpolationAnalysis_IDW_geometryResultJson)));
            } else if (url.indexOf("/geometry/interpolation/idw?returnContent=true") > -1) {
                return Promise.resolve(new Response(`{"succeed":true,"recordset":null,"message":null,"dataset":"Interpolation_IDW_geometry_olTest_7@Interpolation"}`));
            }
            return Promise.resolve();
        });
        queryBySQLService.queryBySQL(queryBySQLParams, (serviceResult) => {
            var result = serviceResult.result;
            var z;
            var zMin = parseFloat(-5), zMax = parseFloat(28);
            var points = [];
            if (result) {
                for (var i = 0; i < result.recordsets[0].features.features.length; i++) {
                    var gp = result.recordsets[0].features.features[i].geometry;
                    var point = new Point([gp.coordinates[0], gp.coordinates[1]]);
                    //每个插值点在插值过程中的权重值
                    z = Math.random() * (zMax - zMin) + zMin;
                    point.tag = z;
                    points.push(point);
                }
            }
            //创建离散点插值分析服务实例
            var interpolationAnalystService = new SpatialAnalystService(sampleServiceUrl);
            //创建离散点插值分析参数实例
            var interpolationAnalystParameters = new InterpolationIDWAnalystParameters({
                // 插值分析类型,geometry类型表示对离散点插值分析,默认为“dataset”
                InterpolationAnalystType: "geometry",
                // 插值分析结果数据集的名称
                outputDatasetName: resultDataset_IDW_geometry,
                // 插值分析结果数据源的名称
                outputDatasourceName: "Interpolation",
                // 结果栅格数据集存储的像素格式
                pixelFormat: PixelFormat.BIT16,
                // 用于做插值分析的离散点集合
                inputPoints: points,
                searchMode: "KDTREE_FIXED_RADIUS",
                // 查找半径,与点数据单位相同
                searchRadius: 200,
                resolution: 3000,
                bounds: [-2640403.63, 1873792.1, 3247669.39, 5921501.4]
            });
            interpolationAnalystService.interpolationAnalysis(interpolationAnalystParameters, (serviceResult) => {
                serviceResults = serviceResult;
                expect(serviceResults).not.toBeNull();
                expect(serviceResults.type).toBe('processCompleted');
                expect(serviceResults.result.dataset).not.toBeNull();
                done();
            });
        });
    });

});