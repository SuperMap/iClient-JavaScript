import { FeatureService } from '../../../src/mapboxgl/services/FeatureService';
import { EditAttachmentsParameters } from '../../../src/common/iServer/EditAttachmentsParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.dataServiceURL;
describe('mapboxgl_GetFeatureAttachments', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('incomplete parameters', done => {
        let params = new EditAttachmentsParameters({
            dataSourceName: "World",
            dataSetName: "Countries",
        });
        var editFeatureAttachmentsService = new FeatureService(url, {});
        spyOn(FetchRequest, 'commit');
        editFeatureAttachmentsService.editFeatureAttachments(params);
        expect(FetchRequest.commit).not.toHaveBeenCalled();
        done();
    });
    it('complete parameters and add a file', done => {
        let file = new File(['file1 contents'], 'file1.txt', { type: 'text/plain' });
        let params = new EditAttachmentsParameters({
            dataSourceName: "World",
            dataSetName: "Countries",
            featureId: 1,
            file:file
        });
        let myService = new FeatureService(url)
        spyOn(FetchRequest, 'commit').and.callFake((method, url, params, options) => {
            expect(params.get('file') instanceof File).toBeTruthy();
            expect(method).toEqual('POST');
            expect(url).toEqual('http://localhost:9876/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/features/1/attachments');
            expect(params).not.toBeNull();
            expect(options).not.toBeNull();
            return Promise.resolve(
                new Response(`{"size":56,"name":"1.txt","id":-1403040659,"contentType":"text/plain"}`)
            )
        })
        myService.editFeatureAttachments(params).then(res => {
            let serviceResult = res;
            expect(serviceResult.result.succeed).toBeTruthy();
            expect(serviceResult.result.name).toBe('1.txt');
            expect(serviceResult.result.contentType).toBe('text/plain');
            expect(serviceResult.result.size).toBe(56);
            done();
        });
    })
});
