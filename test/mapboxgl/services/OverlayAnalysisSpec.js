import {SpatialAnalystService} from '../../../src/mapboxgl/services/SpatialAnalystService';
import {DatasetOverlayAnalystParameters} from '../../../src/common/iServer/DatasetOverlayAnalystParameters';
import {OverlayOperationType} from '../../../src/common/REST';

var url = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_overlayAnalysis', () => {
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

    //叠加分析
    it('overlayAnalysis', (done) => {
        var datasetOverlayAnalystParameters = new DatasetOverlayAnalystParameters({
            //叠加分析中源数据集的名称
            sourceDataset: "BaseMap_R@Jingjin",
            //叠加分析中操作数据集的名称
            operateDataset: "Neighbor_R@Jingjin",
            //容限
            tolerance: 0,
            //叠加操作枚举值
            operation: OverlayOperationType.UNION
        });
        var service = new SpatialAnalystService(url, options);
        service.overlayAnalysis(datasetOverlayAnalystParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.recordset.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.recordset.features.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual("MultiPolygon");
                    var coordinates = features[i].geometry.coordinates[0][0];
                    expect(coordinates.length).toBeGreaterThan(0);
                    for (var j = 0; j < coordinates.length; j++) {
                        expect(coordinates[j].length).toEqual(2);
                    }
                }
                done();
            } catch (e) {
                console.log("'overlayAnalysis'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});