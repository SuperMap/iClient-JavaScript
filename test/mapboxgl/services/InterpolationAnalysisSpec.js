require('../../../src/mapboxgl/services/SpatialAnalystService');
import {FetchRequest} from '../../../src/common/util/FetchRequest';
var mapboxgl = require('mapbox-gl');
var request = require('request');

var url = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_interpolationAnalysis', function () {
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

    var resultDataset_density = "Interpolation_density_mapboxglTest";
    //插值分析 点密度插值分析
    it('interpolationAnalysis_density', function (done) {
        var interpolationAnalystParameters = new SuperMap.InterpolationDensityAnalystParameters({
            dataset: "SamplesP@Interpolation",
            //插值分析结果数据集的名称
            outputDatasetName: resultDataset_density,
            //插值分析结果数据源的名称
            outputDatasourceName: "Interpolation",
            //结果栅格数据集存储的像素格式
            pixelFormat: SuperMap.PixelFormat.DOUBLE,
            //插值结果栅格数据集的分辨率
            resolution: 3000,
            // 存储用于进行插值分析的字段名称
            zValueFieldName: "AVG_TMP",
            //结果栅格数据集的范围（生效）
            bounds: [-2640403.63, 1873792.1, 3247669.39, 5921501.4]
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/datasets/SamplesP@Interpolation/interpolation/density.json?returnContent=true");
            // var expectParams = "{'bounds':{'left':-2640403.63,'bottom':1873792.1, 'right':3247669.39,'top':5921501.4,'centerLonLat':null},'searchRadius':0,'zValueFieldName':\"AVG_TMP\",'zValueScale':1,'resolution':3000,'filterQueryParameter':null,'outputDatasetName':\"Interpolation_density_mapboxglTest\",'outputDatasourceName':\"Interpolation\", 'pixelFormat':\"DOUBLE\",'dataset':\"SamplesP@Interpolation\",'inputPoints':null,'InterpolationAnalystType':\"dataset\",'clipParam':null}";
            // expect(params).toBe(expectParams);

            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.resolution).toEqual(3000);
            expect(paramsObj.zValueFieldName).toBe("AVG_TMP");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(interpolationDensityEscapedJson));
        }); 
        service.interpolationAnalysis(interpolationAnalystParameters, function (result) {
            serviceResult = result;
       
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.dataset).toContain(resultDataset_density);
                expect(serviceResult.result.dataset).toContain("@Interpolation");
                expect(serviceResult.object.mode).toEqual("Density");
                done();
            } catch (e) {
                console.log("'interpolationAnalysis_density'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            } 
        });
    }); 

    var resultDataset_IDW_dataset = "Interpolation_IDW_dataset_mapboxglTest";
    //插值分析 反距离加权插值分析
    it('interpolationAnalysis_IDW_dataset', function (done) {
        var interpolationAnalystParameters = new SuperMap.InterpolationIDWAnalystParameters({
            //用于做插值分析的数据源中数据集的名称
            dataset: "SamplesP@Interpolation",
            //插值分析结果数据集的名称
            outputDatasetName: resultDataset_IDW_dataset,
            //插值分析结果数据源的名称
            outputDatasourceName: "Interpolation",
            //结果栅格数据集存储的像素格式
            pixelFormat: SuperMap.PixelFormat.DOUBLE,
            zValueFieldName: "AVG_TMP",
            resolution: 7923.84989108,
            //采取固定点数查找参与运算点的方式
            searchMode: "KDTREE_FIXED_COUNT",
            //固定点数查找方式下,参与差值运算的点数默认为12。
            expectedCount: 12,
            bounds: [-2640403.63, 1873792.1, 3247669.39, 5921501.4]
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);


        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/datasets/SamplesP@Interpolation/interpolation/idw.json?returnContent=true");
            // var expectParams = "{'bounds':{'left':-2640403.63,'bottom':1873792.1,'right':3247669.39,'top':5921501.4,'centerLonLat':null},'searchRadius':0,'zValueFieldName':\"AVG_TMP\",'zValueScale':1,'resolution':7923.84989108,'filterQueryParameter':null,'outputDatasetName':\"Interpolation_IDW_dataset_mapboxglTest\",'outputDatasourceName':\"Interpolation\",'pixelFormat':\"DOUBLE\",'dataset':\"SamplesP@Interpolation\",'inputPoints':null,'InterpolationAnalystType':\"dataset\",'clipParam':null,'searchMode':\"KDTREE_FIXED_COUNT\",'expectedCount':12,'power':2}";
            // expect(params).toBe(expectParams);
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.zValueFieldName).toBe("AVG_TMP");

            expect(options).not.toBeNull();
            return Promise.resolve(new Response(interpolationIDWsEcapedJson));
        }); 

        service.interpolationAnalysis(interpolationAnalystParameters, function (result) {
            serviceResult = result;
               try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.dataset).toContain(resultDataset_IDW_dataset);
                expect(serviceResult.result.dataset).toContain("@Interpolation");
                expect(serviceResult.object.mode).toEqual("IDW");
                done();
            } catch (e) {
                console.log("'interpolationAnalysis_IDW_dataset'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});