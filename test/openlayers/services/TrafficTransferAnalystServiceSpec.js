require('../../../src/openlayers/services/TrafficTransferAnalystService');

var url = GlobeParameter.trafficTransferURL;
var options = {
    serverType: 'iServer'
};
describe('openlayers_TrafficTransferAnalystService', function () {
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

    //站点查询服务 返回坐标
    it('queryStop_returnPosition:true', function (done) {
        var stopQueryParameters = new SuperMap.StopQueryParameters({
            keyWord: "人民",
            //是否返回站点坐标信息
            returnPosition: true
        });
        var service = new ol.supermap.TrafficTransferAnalystService(url, options);
        service.queryStop(stopQueryParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(service.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result[0].name).toEqual("人民广场");
                expect(serviceResult.result[0].id).toEqual(164);
                expect(serviceResult.result[0].position.x).not.toBeNull();
                expect(serviceResult.result[0].position.y).not.toBeNull();
                expect(serviceResult.result[0].stopID).toEqual(serviceResult.result[0].id);
                done();
            } catch (e) {
                console.log("'queryStop_returnPosition'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //站点查询服务, 不返回坐标
    it('queryStop_returnPosition:false', function (done) {
        var stopQueryParameters = new SuperMap.StopQueryParameters({
            keyWord: "人民",
            //是否返回站点坐标信息
            returnPosition: false
        });
        var service = new ol.supermap.TrafficTransferAnalystService(url, options);
        service.queryStop(stopQueryParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(service.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result[0].name).toEqual("人民广场");
                expect(serviceResult.result[0].id).toEqual(164);
                expect(serviceResult.result[0].position).toBeNull();
                expect(serviceResult.result[0].stopID).toEqual(serviceResult.result[0].id);
                done();
            } catch (e) {
                console.log("'queryStop_returnPosition_false'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //交通换乘线路查询服务  按ID进行查询
    it('analysisTransferPath_ID', function (done) {
        var transferPathParameters = new SuperMap.TransferPathParameters({
            points: [175, 164],
            transferLines: [{"lineID": 27, "startStopIndex": 7, "endStopIndex": 9}]
        });
        var service = new ol.supermap.TrafficTransferAnalystService(url, options);
        service.analysisTransferPath(transferPathParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(service.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.count).toEqual(2);
                var items = serviceResult.result.items;
                expect(items.length).toEqual(serviceResult.result.count);
                expect(items[0].distance).toEqual(291.00463130468444);
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
                expect(serviceResult.result.totalDistance).toEqual(792.8521407250088);
                expect(serviceResult.result.transferCount).toEqual(0);
                done();
            } catch (e) {
                console.log("'analysisTransferPath_ID'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //交通换乘线路查询服务  按坐标进行查询
    it('analysisTransferPath_position', function (done) {
        var transferPathParameters = new SuperMap.TransferPathParameters({
            points: [{x: 4941, y: -3566}, {x: 5308, y: -3935}],
            transferLines: [{"lineID": 27, "startStopIndex": 7, "endStopIndex": 9}]
        });
        var service = new ol.supermap.TrafficTransferAnalystService(url, options);
        service.analysisTransferPath(transferPathParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(service.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.count).toEqual(2);
                var items = serviceResult.result.items;
                expect(items.length).toEqual(serviceResult.result.count);
                expect(items[0].distance).toEqual(289.5549539610702);
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
                expect(serviceResult.result.totalDistance).toEqual(796.7259786798306);
                expect(serviceResult.result.transferCount).toEqual(0);
                done();
            } catch (e) {
                console.log("'analysisTransferPath_position'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //交通换乘方案查询服务
    it('analysisTransferSolution', function (done) {
        var transferSolutionParameters = new SuperMap.TransferSolutionParameters({
            solutionCount: 3,
            //交通换乘策略类型: 时间最短、距离最短、最少换乘、最少步行:transferTactic
            //乘车偏好枚举:transferPreference
            //步行与公交的消耗权重比
            walkingRatio: 5,
            points: [175, 179]
        });
        var service = new ol.supermap.TrafficTransferAnalystService(url, options);
        service.analysisTransferSolution(transferSolutionParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
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
                expect(serviceResult.result.defaultGuide.totalDistance).toEqual(7953.67659198908);
                expect(serviceResult.result.defaultGuide.transferCount).toEqual(1);
                done();
            } catch (e) {
                console.log("'analysisTransferSolution'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});