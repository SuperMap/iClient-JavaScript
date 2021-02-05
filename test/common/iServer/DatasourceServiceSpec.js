import {DatasourceService} from '../../../src/common/iServer/DatasourceService';

var url = GlobeParameter.dataServiceURL;
var initDatasourceService = () => {
    return new DatasourceService(url);
}
describe('DatasourceService', () => {
    it("constructor", () => {
        var datasourceService = initDatasourceService();
        expect(datasourceService).not.toBeNull();
        expect(datasourceService.url).toEqual(url);
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var datasourceService = new DatasourceService(url, { headers: myHeaders });
        expect(datasourceService).not.toBeNull();
        expect(datasourceService.headers).not.toBeNull();
        datasourceService.destroy();
    });

    it('crossOrigin', () => {
        var datasourceService = new DatasourceService(url, { crossOrigin: false });
        expect(datasourceService).not.toBeNull();
        expect(datasourceService.crossOrigin).toBeFalsy();
        datasourceService.destroy();
    });

});