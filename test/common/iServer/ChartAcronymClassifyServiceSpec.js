import { ChartAcronymClassifyService } from '../../../src/common/iServer/ChartAcronymClassifyService';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = "http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图";

describe('ChartAcronymClassifyService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //正确返回结果
    it('processAsync_success', (done) => {
        var analyzeCompleted = (analyseEventArgs) => {
          var analystResult = analyseEventArgs.result;
            expect(analystResult).not.toBeNull();
            expect(analystResult.succeed).toBeTruthy();
            expect(analystResult.length).toEqual(1);
            chartAcronymClassifyService.destroy();
            done();
        };
        var chartAcronymClassifyService = new ChartAcronymClassifyService(url);

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe('GET');
            expect(testUrl).toBe(url + "/chartAcronymClassify");
            return Promise.resolve(new Response(JSON.stringify(chartAcronymClassify)));
        });
        chartAcronymClassifyService.processAsync(analyzeCompleted);
    });

});