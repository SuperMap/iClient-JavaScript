import { FeatureAttachmentsService } from '../../../src/openlayers/services/FeatureAttachmentsService';
import { EditFeatureAttachmentsParameters } from '../../../src/common/iServer/EditFeatureAttachmentsParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.dataServiceURL;
describe('openlayers_FeatureAttachmentsService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('initialize', () => {
        var featureAttachmentsService = new FeatureAttachmentsService(url);
        expect(featureAttachmentsService.url).toEqual(url);
    });

    it('getAttachments', (done) => {
        let Params = new EditFeatureAttachmentsParameters({
            dataSourceName: "World",
            dataSetName: "Countries",
            id: 14,
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toEqual('GET')
            expect(params).toBeUndefined()
            expect(options).not.toBeNull()
            return Promise.resolve(
                new Response(`[{"size":56,"name":"1.txt","id":1966180689,"contentType":"text/plain"},{"size":34991,"name":"test.png","id":1590279732,"contentType":"image/png"}]`)
            )
        });
        new FeatureAttachmentsService(url).featureAttachments(Params, (serviceResult) => {
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.options.method).toBe("GET");
                expect(serviceResult.object.dataSourceName).toBe("World");
                expect(serviceResult.object.dataSetName).toBe("Countries");
                expect(FetchRequest.commit.calls.count()).toEqual(1);
                Params.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FeatureAttachmentsService'案例失败：" + exception.name + ":" + exception.message);
                done();
            }
        });
    });
});
