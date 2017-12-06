require('../../../src/common/iServer/BurstPipelineAnalystService');
require('../../../src/common/util/FetchRequest');

var serviceFailedEventArgsSystem = null,
    serviceCompletedEventArgsSystem = null;
var url = "http://supermap:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun";
var options = {
    eventListeners: {
        "processCompleted": analyzeCompleted,
        'processFailed': analyzeFailed
    }
};
function initBurstPipelineAnalystService() {
    return new SuperMap.BurstPipelineAnalystService(url, options);
}
function analyzeFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
function analyzeCompleted(analyseEventArgs) {
    serviceCompletedEventArgsSystem = analyseEventArgs;
}
describe('BurstPipelineAnalystService', function () {
    var originalTimeout;
    var FetchRequest = SuperMap.FetchRequest;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceFailedEventArgsSystem = null;
        serviceCompletedEventArgsSystem = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor_default', function () {
        var burstPipelineAnalystService = new SuperMap.BurstPipelineAnalystService();
        expect(burstPipelineAnalystService).not.toBeNull();
        expect(burstPipelineAnalystService.CLASS_NAME).toBe("SuperMap.BurstPipelineAnalystService");
        var burstPipelineAnalystParams = new SuperMap.BurstPipelineAnalystParameters();
        expect(burstPipelineAnalystParams.sourceNodeIDs).toBeNull();
        expect(burstPipelineAnalystParams.edgeID).toBeNull();
        expect(burstPipelineAnalystParams.nodeID).toBeNull();
        expect(burstPipelineAnalystParams.isUncertainDirectionValid).toBeFalsy();
        burstPipelineAnalystService.destroy();
        burstPipelineAnalystParams.destroy();
    });

    it('constructor, destroy', function () {
        var burstPipelineAnalystService = initBurstPipelineAnalystService();
        burstPipelineAnalystService.events.on({"processCompleted": analyzeCompleted});
        var burstPipelineAnalystParams = new SuperMap.BurstPipelineAnalystParameters();
        burstPipelineAnalystParams.edgeID = 124;
        burstPipelineAnalystParams.isUncertainDirectionValid = true;
        expect(burstPipelineAnalystParams.sourceNodeIDs).toBeNull();
        expect(burstPipelineAnalystParams.edgeID).toEqual(124);
        expect(burstPipelineAnalystParams.nodeID).toBeNull();
        expect(burstPipelineAnalystParams.isUncertainDirectionValid).toBeTruthy();
        burstPipelineAnalystService.destroy();
        expect(burstPipelineAnalystService.EVENT_TYPES).toBeNull();
        expect(burstPipelineAnalystService.events).toBeNull();
        burstPipelineAnalystParams.destroy();
        expect(burstPipelineAnalystParams.sourceNodeIDs).toBeNull();
        expect(burstPipelineAnalystParams.edgeID).toBeNull();
        expect(burstPipelineAnalystParams.nodeID).toBeNull();
        expect(burstPipelineAnalystParams.isUncertainDirectionValid).toBeFalsy();
    });

    //参数不存在, 直接返回, 此处不应该直接返回,应该报错？待与开发协商
    it('processAsync_noParams', function (done) {
        var burstPipelineAnalystService = initBurstPipelineAnalystService();
        burstPipelineAnalystService.processAsync();
        setTimeout(function () {
            expect(serviceCompletedEventArgsSystem).toBeNull();
            expect(serviceFailedEventArgsSystem).toBeNull();
            burstPipelineAnalystService.destroy();
            done();
        }, 1000);
    });

    //正确返回结果
    it('processAsync_success', function (done) {
        var burstPipelineAnalystService = initBurstPipelineAnalystService();
        var burstPipelineAnalystParams = new SuperMap.BurstPipelineAnalystParameters({
            sourceNodeIDs: [1, 2],
            edgeID: 3434,
            nodeID: null,
            isUncertainDirectionValid: true
        });
        spyOn(FetchRequest, 'commit').and.callFake(function (method, testUrl, params, options) {
            expect(method).toBe('GET');
            expect(testUrl).toBe(url + "/burstAnalyse.json?");
            expect(params.edgeID).toEqual(3434);
            expect(params.isUncertainDirectionValid).toBe(true);
            expect(params.sourceNodeIDs[0]).toEqual(1);
            expect(params.sourceNodeIDs[1]).toEqual(2);
            expect(options).not.toBeNull();
            var escapedJson = "{\"normalNodes\":[],\"edges\":[1,2,3,4,5,6,7,8,9],\"criticalNodes\":[2]}";
            return Promise.resolve(new Response(escapedJson));
        });
        burstPipelineAnalystService.processAsync(burstPipelineAnalystParams);
        setTimeout(function () {
            var analystResult = serviceCompletedEventArgsSystem.result;
            expect(analystResult).not.toBeNull();
            expect(analystResult.succeed).toBeTruthy();
            expect(analystResult.criticalNodes.length).toEqual(1);
            expect(analystResult.criticalNodes[0]).toEqual(2);
            expect(analystResult.edges.length).toEqual(9);
            expect(analystResult.normalNodes.length).toEqual(0);
            burstPipelineAnalystService.destroy();
            burstPipelineAnalystParams.destroy();
            done();
        }, 1000)
    });
});