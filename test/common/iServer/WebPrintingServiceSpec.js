import {WebPrintingService} from '../../../src/common/iServer/WebPrintingService';

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

});
