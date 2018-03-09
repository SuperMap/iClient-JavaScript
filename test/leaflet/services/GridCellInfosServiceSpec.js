import {gridCellInfosService} from '../../../src/leaflet/services/GridCellInfosService';
import {GetGridCellInfosParameters} from '../../../src/common/iServer/GetGridCellInfosParameters';

var url = GlobeParameter.dataServiceURL;
describe('leaflet_GridCellInfosService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('initialize', () => {
        var gridCellInfoService = gridCellInfosService(url);
        expect(gridCellInfoService.url).toEqual(url);
    });

    it('getGridCellInfos', () => {
        var params = new GetGridCellInfosParameters({
            dataSourceName: "World",
            datasetName: "WorldEarth",
            X: 4,
            Y: 20
        });
        gridCellInfosService(url).getGridCellInfos(params, (serviceResult) => {
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result.succeed).toBeTruthy();
            expect(serviceResult.result.centerPoint).not.toBeUndefined();
            expect(serviceResult.result.color).not.toBeUndefined();
            expect(serviceResult.result.column).not.toBeUndefined();
            expect(serviceResult.result.row).not.toBeUndefined();
            expect(serviceResult.result.value).not.toBeUndefined();
            expect(serviceResult.object.options.method).toBe("GET");
            expect(serviceResult.object.X).toEqual(4);
            expect(serviceResult.object.Y).toEqual(20);
            expect(serviceResult.object.dataSourceName).toBe("World");
            expect(serviceResult.object.datasetName).toBe("WorldEarth");
            expect(serviceResult.object.datasetType).toBe("IMAGE");
            params.destroy();
        });
    });
});
