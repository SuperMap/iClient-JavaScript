import { GetLayersLegendInfoService } from '../../../src/common/iServer/GetLayersLegendInfoService';
import { GetLayersLegendInfoParameters } from '../../../src/common/iServer/GetLayersLegendInfoParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var serviceFailedEventArgsSystem = null,analystEventArgsSystem = null;
var initGetLayersLegendInfoService = (url) => {
    return new GetLayersLegendInfoService(url);
};

describe('GetLayersLegendInfoService', () => {
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
        var getLayersLegendInfoService = new GetLayersLegendInfoService(GlobeParameter.worldMapURL, { headers: myHeaders });
        expect(getLayersLegendInfoService).not.toBeNull();
        expect(getLayersLegendInfoService.headers).not.toBeNull();
        getLayersLegendInfoService.destroy();
    });

    it('crossOrigin', () => {
        var getLayersLegendInfoService = new GetLayersLegendInfoService(GlobeParameter.worldMapURL, { crossOrigin: false });
        expect(getLayersLegendInfoService).not.toBeNull();
        expect(getLayersLegendInfoService.crossOrigin).toBeFalsy();
        getLayersLegendInfoService.destroy();
    });

    it('processAsync_success', (done) => {
      var worldMapURL = GlobeParameter.worldMapURL;
      var getLegendFailed = (serviceFailedEventArgs) => {
        serviceFailedEventArgsSystem = serviceFailedEventArgs;
      };
      var getLegendCompleted = (analyseEventArgs) => {
        analystEventArgsSystem = analyseEventArgs;
        try {
            var result = analystEventArgsSystem.result;
            expect(result.layerLegends[0].legends[0].url).not.toBeUndefined();
            getLayersLegendInfoService.destroy();
            getLayersLegendInfoParameters.destroy();
            done();
        } catch (exception) {
            expect(false).toBeTruthy();
            console.log("ConnectedEdgesAnalystService" + exception.name + ":" + exception.message);
            getLayersLegendInfoService.destroy();
            done();
        }
      };
      var getLayersLegendInfoService = initGetLayersLegendInfoService(worldMapURL);
      var getLayersLegendInfoParameters = new GetLayersLegendInfoParameters({
        bbox: "-180,90,180,90",
        width: 18,
        height: 18
      });
      spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
          expect(method).toBe("GET");
          expect(testUrl).toBe(worldMapURL + "/legend");
          return Promise.resolve(new Response(JSON.stringify(legendInfo)));
      });
      getLayersLegendInfoService.processAsync(getLayersLegendInfoParameters, getLegendCompleted);
    });

    it('processAsync_fail', (done) => {
      var worldMapURL = GlobeParameter.worldMapURL;
      var getLegendFailed = (serviceFailedEventArgs) => {
        serviceFailedEventArgsSystem = serviceFailedEventArgs;
        try {
            expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
            expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
            getLayersLegendInfoService.destroy();
            getLayersLegendInfoParameters.destroy();
            done();
        } catch (exception) {
            expect(false).toBeTruthy();
            console.log("getLayersLegendInfoService" + exception.name + ":" + exception.message);
            getLayersLegendInfoService.destroy();
            getLayersLegendInfoParameters.destroy();
            done();
        }
      };
      var getLegendCompleted = (analyseEventArgs) => {
        analystEventArgsSystem = analyseEventArgs;
      };
      var getLayersLegendInfoService = initGetLayersLegendInfoService(worldMapURL);
      var getLayersLegendInfoParameters = new GetLayersLegendInfoParameters({});
      spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
          expect(method).toBe("GET");
          expect(testUrl).toBe(worldMapURL + "/legend");
          return Promise.resolve(
            new Response(`{"succeed":false,"error":{"code":400,"description":"bbox或layers参数必须至少设置一个参数"}}`)
          );
      });
      getLayersLegendInfoService.processAsync(getLayersLegendInfoParameters, getLegendFailed);
    });
});
