import {UpdateTurnNodeWeightService} from '../../../src/common/iServer/UpdateTurnNodeWeightService';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import { UpdateTurnNodeWeightParameters } from '../../../src/common/iServer/UpdateTurnNodeWeightParameters';

var serviceCompletedEventArgsSystem = null;
var initUpdateTurnNodeWeightService_RegisterListener = (url) => {
    return new UpdateTurnNodeWeightService(url);
};

describe('UpdateTurnNodeWeightService', () => {
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
        var myUpdateTurnNodeWeightService = new UpdateTurnNodeWeightService(GlobeParameter.networkAnalystURL, { headers: myHeaders });
        expect(myUpdateTurnNodeWeightService).not.toBeNull();
        expect(myUpdateTurnNodeWeightService.headers).not.toBeNull();
        myUpdateTurnNodeWeightService.destroy();
    });

    it('crossOrigin', () => {
        var myUpdateTurnNodeWeightService = new UpdateTurnNodeWeightService(GlobeParameter.networkAnalystURL, { crossOrigin: false });
        expect(myUpdateTurnNodeWeightService).not.toBeNull();
        expect(myUpdateTurnNodeWeightService.crossOrigin).toBeFalsy();
        myUpdateTurnNodeWeightService.destroy();
    });

    it('processAsync', (done) => {
        var networkAnalystURL = GlobeParameter.networkAnalystURL;
        var myUpdateTurnNodeWeightService;
        var updateTurnNodeWeightCompleted = (serviceCompletedEventArgs) => {
            serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
            try {
                expect(typeof(myUpdateTurnNodeWeightService.processAsync()) === "undefined").toBeTruthy();
                myUpdateTurnNodeWeightService.destroy();
                expect(serviceCompletedEventArgsSystem).not.toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("UpdateTurnNodeWeightService_" + exception.name + ":" + exception.message);
                myUpdateTurnNodeWeightService.destroy();
                done();
            }
        };
        var updateTurnNodeWeightParam = new UpdateTurnNodeWeightParameters({
           nodeId:"106",
           fromEdgeId:"6508",
           toEdgeId:"6504",
           weightField:"TurnCost",
           turnNodeWeight:"50"
        });
        myUpdateTurnNodeWeightService = initUpdateTurnNodeWeightService_RegisterListener(networkAnalystURL);
        expect(myUpdateTurnNodeWeightService).not.toBeNull();
        spyOn(FetchRequest, 'put').and.callFake((testUrl,params) => {
            expect(testUrl).toBe(networkAnalystURL+"/turnnodeweight/106/fromedge/6508/toedge/6504/weightfield/TurnCost");
            expect(params).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        myUpdateTurnNodeWeightService.processAsync(updateTurnNodeWeightParam, updateTurnNodeWeightCompleted);
    })

    it('processAsync promise', (done) => {
      var networkAnalystURL = GlobeParameter.networkAnalystURL;
      var myUpdateTurnNodeWeightService;
      var updateTurnNodeWeightCompleted = (serviceCompletedEventArgs) => {
          serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
          try {
              expect(typeof(myUpdateTurnNodeWeightService.processAsync()) === "undefined").toBeTruthy();
              myUpdateTurnNodeWeightService.destroy();
              expect(serviceCompletedEventArgsSystem).not.toBeNull();
              done();
          } catch (exception) {
              expect(false).toBeTruthy();
              console.log("UpdateTurnNodeWeightService_" + exception.name + ":" + exception.message);
              myUpdateTurnNodeWeightService.destroy();
              done();
          }
      };
      var updateTurnNodeWeightParam = new UpdateTurnNodeWeightParameters({
         nodeId:"106",
         fromEdgeId:"6508",
         toEdgeId:"6504",
         weightField:"TurnCost",
         turnNodeWeight:"50"
      });
      myUpdateTurnNodeWeightService = initUpdateTurnNodeWeightService_RegisterListener(networkAnalystURL);
      expect(myUpdateTurnNodeWeightService).not.toBeNull();
      spyOn(FetchRequest, 'put').and.callFake((testUrl,params) => {
          expect(testUrl).toBe(networkAnalystURL+"/turnnodeweight/106/fromedge/6508/toedge/6504/weightfield/TurnCost");
          expect(params).not.toBeNull();
          return Promise.resolve(new Response(`{"succeed":true}`));
      });
      myUpdateTurnNodeWeightService.processAsync(updateTurnNodeWeightParam).then(updateTurnNodeWeightCompleted);
  })
});
