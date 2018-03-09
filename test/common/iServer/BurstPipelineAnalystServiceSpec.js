import {BurstPipelineAnalystService} from '../../../src/common/iServer/BurstPipelineAnalystService';
import {BurstPipelineAnalystParameters} from '../../../src/common/iServer/BurstPipelineAnalystParameters';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

var url = "http://supermap:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun";
var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;
var initBurstPipelineAnalystService = () => {
    return new BurstPipelineAnalystService(url, options);
};
var analyzeFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var analyzeCompleted = (analyseEventArgs) => {
    serviceCompletedEventArgsSystem = analyseEventArgs;
};
var options = {
    eventListeners: {
        "processCompleted": analyzeCompleted,
        'processFailed': analyzeFailed
    }
};

describe('BurstPipelineAnalystService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceFailedEventArgsSystem = null;
        serviceCompletedEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor_default', () => {
        var burstPipelineAnalystService = new BurstPipelineAnalystService();
        expect(burstPipelineAnalystService).not.toBeNull();
        expect(burstPipelineAnalystService.CLASS_NAME).toBe("SuperMap.BurstPipelineAnalystService");
        var burstPipelineAnalystParams = new BurstPipelineAnalystParameters();
        expect(burstPipelineAnalystParams.sourceNodeIDs).toBeNull();
        expect(burstPipelineAnalystParams.edgeID).toBeNull();
        expect(burstPipelineAnalystParams.nodeID).toBeNull();
        expect(burstPipelineAnalystParams.isUncertainDirectionValid).toBeFalsy();
        burstPipelineAnalystService.destroy();
        burstPipelineAnalystParams.destroy();
    });

    it('constructor, destroy', () => {
        var burstPipelineAnalystService = initBurstPipelineAnalystService();
        burstPipelineAnalystService.events.on({"processCompleted": analyzeCompleted});
        var burstPipelineAnalystParams = new BurstPipelineAnalystParameters();
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
    it('processAsync_noParams', (done) => {
        var burstPipelineAnalystService = initBurstPipelineAnalystService();
        burstPipelineAnalystService.processAsync();
        setTimeout(() => {
            expect(serviceCompletedEventArgsSystem).toBeNull();
            expect(serviceFailedEventArgsSystem).toBeNull();
            burstPipelineAnalystService.destroy();
            done();
        }, 1000);
    });

    //正确返回结果
    it('processAsync_success', (done) => {
        var burstPipelineAnalystService = initBurstPipelineAnalystService();
        var burstPipelineAnalystParams = new BurstPipelineAnalystParameters({
            sourceNodeIDs: [1, 2],
            edgeID: 3434,
            nodeID: null,
            isUncertainDirectionValid: true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
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
        setTimeout(() => {
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