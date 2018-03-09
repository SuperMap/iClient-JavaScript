import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {DatasetOverlayAnalystParameters} from '../../../src/common/iServer/DatasetOverlayAnalystParameters';
import {OverlayOperationType} from '../../../src/common/REST';

var originalTimeout, serviceResults;
var sampleServiceUrl = GlobeParameter.spatialAnalystURL;
describe('openlayers_SpatialAnalystService_overlayAnalysis', () => {
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //叠加分析
    it('overlayAnalysis', (done) => {
        var datasetOverlayAnalystParameters = new DatasetOverlayAnalystParameters({
            sourceDataset: "BaseMap_R@Jingjin",
            operateDataset: "Neighbor_R@Jingjin",
            tolerance: 0,
            operation: OverlayOperationType.UNION
        });
        var spatialAnalystService = new SpatialAnalystService(sampleServiceUrl);
        spatialAnalystService.overlayAnalysis(datasetOverlayAnalystParameters, (serviceResult) => {
            serviceResults = serviceResult;
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.recordset).not.toBeNull();
            done();
        });
    });
});