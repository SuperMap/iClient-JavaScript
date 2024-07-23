import { FeatureService } from '../../../src/leaflet/services/FeatureService';
import { AttachmentsParameters } from '../../../src/common/iServer/AttachmentsParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.dataServiceURL;
describe('leaflet_GetFeatureAttachments', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('incomplete parameters', done => {
        let params = new AttachmentsParameters({
            dataSourceName: "World"
        });
        var getFeatureAttachmentsService = new FeatureService(url, {});
        spyOn(FetchRequest, 'commit');
        getFeatureAttachmentsService.getFeatureAttachments(params);
        expect(FetchRequest.commit).not.toHaveBeenCalled();
        done();
    });
    it('complete parameters', done => {
        let params = new AttachmentsParameters({
            dataSourceName: "World",
            dataSetName: "Countries",
            featureId: 1,
        });
        let resInfo = [{ "size": 56, "name": "1.txt", "id": 1966180689, "contentType": "text/plain" }, { "size": 34991, "name": "test.png", "id": 1590279732, "contentType": "image/png" }];
        let myService = new FeatureService(url)
        spyOn(FetchRequest, 'commit').and.callFake((method, url, params, options) => {
            expect(method).toEqual('GET');
            expect(params).toBeUndefined();
            expect(options).not.toBeNull();
            expect(url).toEqual('http://localhost:9876/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/features/1/attachments');
            return Promise.resolve(new Response(JSON.stringify(resInfo)));
        })
        myService.getFeatureAttachments(params).then(res => {
            let serviceResult = res;
            expect(serviceResult.result.length).toBe(2);
            done();
        });
    })
});
