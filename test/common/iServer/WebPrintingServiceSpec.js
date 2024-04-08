import { WebPrintingService } from '../../../src/common/iServer/WebPrintingService';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.webPrintingURL;
var initWebPringtingService = () => {
  return new WebPrintingService(url);
}
describe('WebPrintingService', () => {
  it("constructor", () => {
    var webPrintingService = initWebPringtingService();
    expect(webPrintingService).not.toBeNull();
    expect(webPrintingService.url).toEqual(url);
  });

  it('headers', () => {
    let myHeaders = new Headers();
    var webPrintingService = new WebPrintingService(url, { headers: myHeaders });
    expect(webPrintingService).not.toBeNull();
    expect(webPrintingService.headers).not.toBeNull();
    webPrintingService.destroy();
  });

  it('crossOrigin', () => {
    var webPrintingService = new WebPrintingService(url, { crossOrigin: false });
    expect(webPrintingService).not.toBeNull();
    expect(webPrintingService.crossOrigin).toBeFalsy();
    webPrintingService.destroy();
  });

  it('running status not trigger callback', (done) => {
    var count = 0;
    var webPrintingService = new WebPrintingService(url, { crossOrigin: false });
    var jobId = 'e3ff26fa-a0b5-46d3-ad4a-096611a59c03@9fd5defe-d77d-4e17-967e-643c4f34d67e';
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
      count++;
      expect(method).toBe('GET');
      expect(testUrl).toBe(url + `/jobs/${jobId}`);
      if (count === 3) {
        return Promise.resolve(new Response(JSON.stringify(getPrintingJobResultJson)));
      }
      return Promise.resolve(new Response(JSON.stringify(getPrintingJobRunningJson)));
    });
    webPrintingService.getPrintingJob(jobId, (result) => {
      var serviceResult = result;
      try {
        expect(serviceResult).not.toBeNull();
        expect(serviceResult.type).toBe('processCompleted');
        expect(serviceResult.result).not.toBeNull();
        expect(serviceResult.result.id).toEqual(jobId);
        expect(serviceResult.result.status).toEqual('FINISHED');
        done();
      } catch (e) {
        console.log("'getPrintingJob'案例失败" + e.name + ':' + e.message);
        expect(false).toBeTruthy();
        done();
      }
    });
  });
});
