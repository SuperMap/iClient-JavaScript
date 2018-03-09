import {trafficTransferAnalystService} from '../../../src/leaflet/services/TrafficTransferAnalystService';
import {StopQueryParameters} from '../../../src/common/iServer/StopQueryParameters';
import {TransferPathParameters} from '../../../src/common/iServer/TransferPathParameters';
import {TransferSolutionParameters} from '../../../src/common/iServer/TransferSolutionParameters';

var url = GlobeParameter.trafficTransferURL;
var options = {
    serverType: 'iServer'
};
describe('leaflet_TrafficTransferAnalystService', () => {
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

    //站点查询服务 返回坐标
    it('queryStop_returnPosition:true', (done) => {
        var stopQueryParams = new StopQueryParameters({
            keyWord: "人民",
            returnPosition: true
        });
        var service = trafficTransferAnalystService(url, options);
        service.queryStop(stopQueryParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(service.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result[0].id).toEqual(164);
                expect(serviceResult.result[0].name).toEqual("人民广场");
                expect(serviceResult.result[0].stopID).toEqual(serviceResult.result[0].id);
                expect(serviceResult.result[0].position.x).not.toBeNull();
                expect(serviceResult.result[0].position.y).not.toBeNull();
                service.destroy();
                done();
            } catch (exception) {
                console.log("'queryStop_returnPosition=true'案例失败" + exception.name + ":" + exception.message);
                service.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //站点查询服务 不返回坐标
    it('queryStop_returnPosition:false', (done) => {
        var stopQueryParams = new StopQueryParameters({
            keyWord: "人民",
            returnPosition: false
        });
        var service = trafficTransferAnalystService(url, options);
        service.queryStop(stopQueryParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(service.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result[0].id).toEqual(164);
                expect(serviceResult.result[0].name).toEqual("人民广场");
                expect(serviceResult.result[0].stopID).toEqual(serviceResult.result[0].id);
                expect(serviceResult.result[0].position).toBeNull();
                service.destroy();
                done();
            } catch (exception) {
                console.log("'queryStop_returnPosition:false'案例失败" + exception.name + ":" + exception.message);
                service.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //交通换乘线路查询服务 按ID进行查询
    it('analysisTransferPath_ID', (done) => {
        var transferPathParams = new TransferPathParameters({
            points: [175, 164],
            transferLines: [{"lineID": 27, "startStopIndex": 7, "endStopIndex": 9}]
        });
        var service = trafficTransferAnalystService(url, options);
        service.analysisTransferPath(transferPathParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(service.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.count).toEqual(2);
                var items = serviceResult.result.items;
                expect(items.length).toEqual(serviceResult.result.count);
                expect(items[0].distance).toBeGreaterThan(0);
                expect(items[0].lineType).toEqual(-1);
                expect(items[0].isWalking).toEqual(true);
                expect(items[0].endStopName).toEqual("金都饭店");
                expect(items[0].startStopName).toEqual("儿童医院");
                expect(items[1].distance).toEqual(501.84750942032434);
                expect(items[1].endStopName).toEqual("人民广场");
                expect(items[1].startStopName).toEqual("金都饭店");
                expect(items[1].lineName).toEqual("22路");
                expect(items[1].lineType).toEqual(0);
                expect(items[1].passStopCount).toEqual(3);
                expect(items[1].startIndex).toEqual(7);
                expect(items[1].endIndex).toEqual(9);
                expect(serviceResult.result.totalDistance).toBeGreaterThan(items[0].distance);
                expect(serviceResult.result.transferCount).toEqual(0);
                service.destroy();
                done();
            } catch (e) {
                console.log("'analysisTransferPath_ID'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                service.destroy();
                done();
            }
        }, 5000);
    });

    //交通换乘线路查询服务  按坐标进行查询
    it('analysisTransferPath_position', (done) => {
        var transferPathParams = new TransferPathParameters({
            points: [{x: 4941, y: -3566}, {x: 5308, y: -3935}],
            transferLines: [{"lineID": 27, "startStopIndex": 7, "endStopIndex": 9}]
        });
        var service = trafficTransferAnalystService(url, options);
        service.analysisTransferPath(transferPathParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(service.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.count).toEqual(2);
                var items = serviceResult.result.items;
                expect(items.length).toEqual(serviceResult.result.count);
                expect(items[0].distance).toBeGreaterThan(0);
                expect(items[0].lineType).toEqual(-1);
                expect(items[0].isWalking).toEqual(true);
                expect(items[0].endStopName).toEqual("金都饭店");
                expect(items[1].distance).toEqual(501.84750942032434);
                expect(items[1].endStopName).toEqual("人民广场");
                expect(items[1].startStopName).toEqual("金都饭店");
                expect(items[1].lineName).toEqual("22路");
                expect(items[1].lineType).toEqual(0);
                expect(items[1].passStopCount).toEqual(3);
                expect(items[1].startIndex).toEqual(7);
                expect(items[1].endIndex).toEqual(9);
                expect(serviceResult.result.totalDistance).toBeGreaterThan(items[0].distance);
                expect(serviceResult.result.transferCount).toEqual(0);
                service.destroy();
                done();
            } catch (e) {
                console.log("'analysisTransferPath_position'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                service.destroy();
                done();
            }
        }, 5000);
    });

    //交通换乘方案查询服务
    it('analysisTransferSolution', (done) => {
        var transferSolutionParams = new TransferSolutionParameters({
            solutionCount: 3,
            //交通换乘策略类型: 时间最短、距离最短、最少换乘、最少步行:transferTactic
            //乘车偏好枚举:transferPreference
            //步行与公交的消耗权重比
            walkingRatio: 5,
            points: [175, 179],
        });
        var service = trafficTransferAnalystService(url, options);
        service.analysisTransferSolution(transferSolutionParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(service.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.suggestWalking).toEqual(false);
                expect(serviceResult.result.defaultGuide.count).toEqual(5);
                var items = serviceResult.result.defaultGuide.items;
                expect(items.length).toEqual(serviceResult.result.defaultGuide.count);
                expect(items[0].endStopName).toEqual("百菊大厦");
                expect(items[0].startStopName).toEqual("儿童医院");
                expect(items[1].endStopName).toEqual("建设街");
                expect(items[1].startStopName).toEqual(items[0].endStopName);
                expect(items[2].endStopName).toEqual("西安桥");
                expect(items[2].startStopName).toEqual(items[1].endStopName);
                expect(items[3].endStopName).toEqual("亚泰大街");
                expect(items[3].startStopName).toEqual(items[2].endStopName);
                expect(items[4].endStopName).toEqual("净水厂");
                expect(items[4].startStopName).toEqual(items[3].endStopName);
                var solutionItems = serviceResult.result.solutionItems;
                expect(solutionItems.length).toEqual(3);
                expect(solutionItems[0].transferCount).toEqual(1);
                var lineItems = solutionItems[0].linesItems[0].lineItems;
                expect(lineItems[0].endStopIndex).toEqual(4);
                expect(lineItems[0].endStopName).toEqual("建设街");
                expect(lineItems[0].lineName).toEqual("25路");
                expect(lineItems[0].lineID).toEqual(28);
                expect(lineItems[0].startStopIndex).toEqual(3);
                expect(lineItems[0].startStopName).toEqual("百菊大厦");
                expect(serviceResult.result.defaultGuide.totalDistance).toBeGreaterThan(items[0].distance);
                expect(serviceResult.result.defaultGuide.transferCount).toEqual(1);
                service.destroy();
                done();
            } catch (e) {
                console.log("'analysisTransferSolution'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                service.destroy();
                done();
            }
        }, 5000);
    });
});
