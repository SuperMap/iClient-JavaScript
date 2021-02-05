import {DatasetService} from '../../../src/common/iServer/DatasetService';

var url = GlobeParameter.dataServiceURL;
var initDatasetService = () => {
    return new DatasetService(url);
}
describe('DatasetService', () => {
    it("constructor", () => {
        var datasetService = initDatasetService();
        expect(datasetService).not.toBeNull();
        expect(datasetService.url).toEqual(url);
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var datasetService = new DatasetService(url, { headers: myHeaders });
        expect(datasetService).not.toBeNull();
        expect(datasetService.headers).not.toBeNull();
        datasetService.destroy();
    });

    it('crossOrigin', () => {
        var datasetService = new DatasetService(url, { crossOrigin: false });
        expect(datasetService).not.toBeNull();
        expect(datasetService.crossOrigin).toBeFalsy();
        datasetService.destroy();
    });

});