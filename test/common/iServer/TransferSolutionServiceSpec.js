import {TransferSolutionService} from '../../../src/common/iServer/TransferSolutionService';
import {TransferSolutionParameters} from '../../../src/common/iServer/TransferSolutionParameters';
import {TransferTactic} from '../../../src/common/REST';
import {TransferPreference} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var trafficTransferURL = GlobeParameter.trafficTransferURL;
var serviceCompletedEventArgsSystem = null;
var initTransferSolutionService = (url) => {
    return new TransferSolutionService(url);
};

describe('TransferSolutionService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var transferSolutionService = new TransferSolutionService(trafficTransferURL, { headers: myHeaders });
        expect(transferSolutionService).not.toBeNull();
        expect(transferSolutionService.headers).not.toBeNull();
        transferSolutionService.destroy();
    });
    
    it('crossOrigin', () => {
        var transferSolutionService = new TransferSolutionService(trafficTransferURL, { crossOrigin: false });
        expect(transferSolutionService).not.toBeNull();
        expect(transferSolutionService.crossOrigin).toBeFalsy();
        transferSolutionService.destroy();
    });

    it('processAsync_noParams', (done) => {
        var service = initTransferSolutionService(trafficTransferURL);
        service.processAsync();
        setTimeout(() => {
            try {
                expect(typeof(service.processAsync()) === "undefined").toBeTruthy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TransferSolutionService_" + exception.name + ":" + exception.message);
                service.destroy();
                done();
            }
        }, 0);
    });

    it('success:processAsync', (done) => {
        var trafficTransferURL = GlobeParameter.trafficTransferURL;
        var succeed = (event) => {
            serviceCompletedEventArgsSystem = event;
            try {
                var result = serviceCompletedEventArgsSystem.result;
                expect(result).not.toBeNull();
                expect(result.defaultGuide).not.toBeNull();
                expect(result.defaultGuide.count).toEqual(1);
                expect(result.solutionItems).not.toBeNull();
                service.destroy();
                params.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("TransferSolutionService_" + exception.name + ":" + exception.message);
                service.destroy();
                params.destroy();
                done();
            }
        };
        var service = initTransferSolutionService(trafficTransferURL);
        var params = new TransferSolutionParameters({
            solutionCount: 5,
            transferTactic: TransferTactic.LESS_TIME,
            transferPreference: TransferPreference.NONE,
            walkingRatio: 10,
            points: [175, 179]
        });
        spyOn(FetchRequest, 'commit').and.callFake((method,testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(trafficTransferURL+"/solutions");
            return Promise.resolve(new Response(JSON.stringify(TransferSolutionServiceResult)));
        });
        service.processAsync(params, succeed);
    });

    it('success:processAsync promise', (done) => {
      var trafficTransferURL = GlobeParameter.trafficTransferURL;
      var succeed = (event) => {
          serviceCompletedEventArgsSystem = event;
          try {
              var result = serviceCompletedEventArgsSystem.result;
              expect(result).not.toBeNull();
              expect(result.defaultGuide).not.toBeNull();
              expect(result.defaultGuide.count).toEqual(1);
              expect(result.solutionItems).not.toBeNull();
              service.destroy();
              params.destroy();
              done();
          } catch (exception) {
              expect(false).toBeTruthy();
              console.log("TransferSolutionService_" + exception.name + ":" + exception.message);
              service.destroy();
              params.destroy();
              done();
          }
      };
      var service = initTransferSolutionService(trafficTransferURL);
      var params = new TransferSolutionParameters({
          solutionCount: 5,
          transferTactic: TransferTactic.LESS_TIME,
          transferPreference: TransferPreference.NONE,
          walkingRatio: 10,
          points: [175, 179]
      });
      spyOn(FetchRequest, 'commit').and.callFake((method,testUrl) => {
          expect(method).toBe("GET");
          expect(testUrl).toBe(trafficTransferURL+"/solutions");
          return Promise.resolve(new Response(JSON.stringify(TransferSolutionServiceResult)));
      });
      service.processAsync(params, succeed);
  });
});
