import {
    SpatialAnalystService
} from '../../../src/openlayers/services/SpatialAnalystService';
import {
    DatasetThiessenAnalystParameters
} from '../../../src/common/iServer/DatasetThiessenAnalystParameters';
import {
    GeometryThiessenAnalystParameters
} from '../../../src/common/iServer/GeometryThiessenAnalystParameters';
import {
    FetchRequest
} from '../../../src/common/util/FetchRequest';

import Point from 'ol/geom/Point';

var originalTimeout, serviceResults;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;
describe('openlayers_SpatialAnalystService_thiessenAnalysis', () => {
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //数据集泰森多边形
    it('thiessenAnalysis_datasets', (done) => {
        var dThiessenAnalystParameters = new DatasetThiessenAnalystParameters({
            dataset: "Factory@Changchun"
        });
        var spatialAnalystService = new SpatialAnalystService(changchunServiceUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(changchunServiceUrl + "/datasets/Factory@Changchun/thiessenpolygon?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.dataset).toBe("Factory@Changchun");
            expect(paramsObj.returnResultRegion).toBeTruthy();
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(thiessenAnalysisDatasetsEscapedJson)));
        });
        spatialAnalystService.thiessenAnalysis(dThiessenAnalystParameters, (serviceResult) => {
            serviceResults = serviceResult;
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        });
    });

    //几何泰森多边形
    it('thiessenAnalysis_geometry', (done) => {
        //创建几何泰森多边形参数
        var pointsList = [
            new Point([5238.998556, -1724.229865]),
            new Point([4996.270055, -2118.538477]),
            new Point([5450.34263, -2070.794081]),
            new Point([5317.70775, -2521.162355]),
            new Point([5741.149405, -1970.130198]),
            new Point([4716.133098, -1575.858795]),
            new Point([5447.671615, -2255.928819]),
            new Point([4783.423507, -1135.598744]),
            new Point([5472.712382, -2189.15344]),
            new Point([5752.716961, -2425.40363])
        ];
        var gThiessenAnalystParameters = new GeometryThiessenAnalystParameters({
            points: pointsList
        });
        //创建泰森多边形服务实例
        var spatialAnalystService = new SpatialAnalystService(changchunServiceUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(changchunServiceUrl + "/geometry/thiessenpolygon?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.returnResultRegion).toBeTruthy();
            expect(paramsObj.points.length).toBeGreaterThan(9);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(thiessenAnalysisGeometryEscapedJson));
        });
        spatialAnalystService.thiessenAnalysis(gThiessenAnalystParameters, (serviceResult) => {
            serviceResults = serviceResult;
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            expect(serviceResults.result.succeed).toBeTruthy();
            var regions = serviceResults.result.regions;
            expect(regions).not.toBeNull();
            expect(regions.features).not.toBeNull();
            expect(regions.features.length).toBeGreaterThan(0);
            for (var i = 0; i < regions.features.length; i++) {
                expect(regions.features[i].type).toEqual("Feature");
                expect(regions.features[i].geometry.type).toEqual("MultiPolygon");
                var coordinates = regions.features[i].geometry.coordinates;
                expect(coordinates).not.toBeNull();
                expect(coordinates[0][0].length).toBeGreaterThan(0);
                for (var j = 0; j < coordinates[0][0].length; j++) {
                    expect(coordinates[0][0][j].length).toEqual(2);
                }
            }
            expect(regions.type).toEqual("FeatureCollection");
            done();
        });
    });
});
