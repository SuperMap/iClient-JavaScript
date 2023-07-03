import { GridCellInfosService } from '../../../src/openlayers/services/GridCellInfosService';
import { GetGridCellInfosParameters } from '../../../src/common/iServer/GetGridCellInfosParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.dataServiceURL;
describe('openlayers_GridCellInfosService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('initialize', () => {
        var gridCellInfoService = new GridCellInfosService(url);
        expect(gridCellInfoService.url).toEqual(url);
    });

    it('getGridCellInfos', (done) => {
        var params = new GetGridCellInfosParameters({
            dataSourceName: "World",
            datasetName: "WorldEarth",
            X: 4,
            Y: 20
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("GET");
            expect(options).not.toBeNull();
            if (testUrl.indexOf("imageValue") > 0) {
                return Promise.resolve(new Response(getGridCellInfosEcapedJson));
            }
            if (testUrl.indexOf("WorldEarth") > 0) {
                return Promise.resolve(new Response(getDatasetInfoEcapedJson));
            }
            return null;
        });
        new GridCellInfosService(url).getGridCellInfos(params, (serviceResult) => {
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.centerPoint).not.toBeUndefined();
                expect(serviceResult.result.color).not.toBeUndefined();
                expect(serviceResult.result.column).not.toBeUndefined();
                expect(serviceResult.result.row).not.toBeUndefined();
                expect(serviceResult.result.value).not.toBeUndefined();
                expect(serviceResult.options.method).toBe("GET");
                expect(serviceResult.object.X).toEqual(4);
                expect(serviceResult.object.Y).toEqual(20);
                expect(serviceResult.object.dataSourceName).toBe("World");
                expect(serviceResult.object.datasetName).toBe("WorldEarth");
                expect(serviceResult.object.datasetType).toBe("IMAGE");
                expect(FetchRequest.commit.calls.count()).toEqual(2);
                params.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("getGridCellInfos'案例失败：" + exception.name + ":" + exception.message);
                done();
            }
        });
    });
});
