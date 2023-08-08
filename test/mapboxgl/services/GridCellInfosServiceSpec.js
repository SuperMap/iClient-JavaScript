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

    it('initialize', () => {
        var gridCellInfoService = new GridCellInfosService(url);
        expect(gridCellInfoService).not.toBeNull();
        expect(gridCellInfoService.options).not.toBeNull();
    });

    it('getGridCellInfos', (done) => {
        var GP = new GetGridCellInfosParameters({
            dataSourceName: "World",
            datasetName: "WorldEarth",
            X: 4,
            Y: 20
        });
        expect(GP).not.toBeNull()

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            // 首先判断是否为数据集的请求
            JudgeMethod(GP, method, testUrl, params, options)

            if (testUrl.indexOf("gridValue") > 0) {
                return Promise.resolve(new Response(JSON.stringify(gridValueJson)));
            } else if (testUrl.indexOf("imageValue") > 0) {
                return Promise.resolve(new Response(JSON.stringify(imageValueJson)));
            }
            return Promise.resolve(new Response(JSON.stringify(getDatasetWordEarthJson)));
        });

        new GridCellInfosService(url).getGridCellInfos(GP, (result) => {
            serviceResult = result;
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.centerPoint).not.toBeUndefined();
                expect(serviceResult.result.color).not.toBeUndefined();
                expect(serviceResult.result.column).not.toBeUndefined();
                expect(serviceResult.result.row).not.toBeUndefined();
                expect(serviceResult.result.value).not.toBeUndefined();
                expect(FetchRequest.commit.calls.count()).toEqual(2);
                GP.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("getGridCellInfos'案例失败：" + exception.name + ":" + exception.message);
                done();
            }
        });
    })

    it('getGridCellInfosWithBounds', done => {
        var GP = new GetGridCellInfosParameters({
            dataSourceName: "World",
            datasetName: "WorldEarth",
            bounds: { "leftBottom": { "x": 112.351881, "y": 34.663401 }, "rightTop": { "x": 113.361881, "y": 35.673401 } },
            X: 4,
            Y: 20
        });
        expect(GP).not.toBeNull()

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            // 首先判断是否为数据集的请求
            JudgeMethod(GP, method, testUrl, params, options)
            if (testUrl.indexOf("gridValues") > 0) {
                return Promise.resolve(new Response(JSON.stringify(grindValuesJson)));
            } else if (testUrl.indexOf("imageValues") > 0) {
                return Promise.resolve(new Response(JSON.stringify(imageValuesJson)));
            }
            return Promise.resolve(new Response(JSON.stringify(getDatasetWordEarthJson)));
        });

        new GridCellInfosService(url).getGridCellInfos(GP, serviceResult => {
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.options.method).toBe("GET");
                expect(FetchRequest.commit.calls.count()).toEqual(2);
                GP.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("getGridCellInfos'案例失败：" + exception.name + ":" + exception.message);
                done();
            }
        });

    })

    it('getGridCellInfosWithBoundsPost', done => {
        var GP = new GetGridCellInfosParameters({
            dataSourceName: "World",
            datasetName: "WorldEarth",
            bounds: [{ "leftBottom": { "x": 107.669629, "y": 32.888868 }, "rightTop": { "x": 108.674593, "y": 33.281041 } }, { "leftBottom": { "x": 112.351881, "y": 34.663401 }, "rightTop": { "x": 113.361881, "y": 35.673401 } }],
            X: 4,
            Y: 20
        });
        expect(GP).not.toBeNull()

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            // 首先判断是否为数据集的请求
            JudgeMethod(GP, method, testUrl, params, options)
            if (testUrl.indexOf("gridValues") > 0) {
                return Promise.resolve(new Response(JSON.stringify(girdValuesPostJson)));
            } else if (testUrl.indexOf("imageValues") > 0) {
                return Promise.resolve(new Response(JSON.stringify(imageValuesPostJson)));
            }
            return Promise.resolve(new Response(JSON.stringify(getDatasetWordEarthJson)));
        });
        new GridCellInfosService(url).getGridCellInfos(GP, serviceResult => {
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                // expect(serviceResult.result.succeed).toBeTruthy();
                // expect(serviceResult.options.method).toBe("GET");
                expect(FetchRequest.commit.calls.count()).toEqual(2);
                GP.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("getGridCellInfos'案例失败：" + exception.name + ":" + exception.message);
                done();
            }
        });

    })
});

function JudgeMethod(para, m, u, p, o) {
    if (para.bounds) {
        if (Array.isArray(para.bounds) && u.indexOf('imageValue') > -1) {
            expect(m).toBe("POST");
            expect(o).not.toBeNull()
        } else {
            expect(m).toBe("GET");
        }
    } else {
        expect(m).toBe("GET");
    }
}
