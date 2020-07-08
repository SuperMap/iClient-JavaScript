import { GridCellInfosService } from '../../../src/mapboxgl/services/GridCellInfosService';
import { GetGridCellInfosParameters } from '../../../src/common/iServer/GetGridCellInfosParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.dataServiceURL;

//数据栅格查询服务
describe('mapboxgl_GridCellInfosService', () => {
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

    it('getGridCellInfos', (done) => {
        var getGridCellInfosParam = new GetGridCellInfosParameters({
            dataSourceName: "World",
            datasetName: "WorldEarth",
            X: 4,
            Y: 20
        });
        var service = new GridCellInfosService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("GET");
            expect(options).not.toBeNull();
            if (testUrl.indexOf("WorldEarth") > 0) {
                return Promise.resolve(new Response(getDatasetInfoEcapedJson));
            } else {
                if (testUrl.indexOf("imageValue") > 0) {
                    return Promise.resolve(new Response(getGridCellInfosEcapedJson));
                }
            };
            return null;
        });

        service.getGridCellInfos(getGridCellInfosParam, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.dataSourceName).toEqual("World");
                expect(serviceResult.object.datasetName).toEqual("WorldEarth");
                expect(serviceResult.object.options.method).toEqual("GET");
                expect(serviceResult.result.centerPoint.x).toEqual(4);
                expect(serviceResult.result.centerPoint.y).toEqual(20);
                expect(serviceResult.result.color).not.toBeNull();
                expect(serviceResult.result.column).toEqual(1046);
                expect(serviceResult.result.row).toEqual(398);
                expect(serviceResult.result.value).toEqual(12295026);
                expect(FetchRequest.commit.calls.count()).toEqual(2);
                done();
            } catch (e) {
                console.log("'getGridCellInfos'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    })
});