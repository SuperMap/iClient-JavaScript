import { FeatureAttachmentsService } from '../../../src/common/iServer/FeatureAttachmentsService';
import { AttachmentsParameters } from '../../../src/common/iServer/AttachmentsParameters';
import { EditAttachmentsParameters } from '../../../src/common/iServer/EditAttachmentsParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import { Util } from '../../../src/common/commontypes/Util';

let dataServiceURL = GlobeParameter.dataServiceURL;

describe('FeatureAttachmentsService', () => {
    let originalTimeout;
    let serviceResult;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        serviceResult = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('get feature attachments', done => {
        let params = new AttachmentsParameters({
            dataSourceName: "World",
            dataSetName: "Countries",
            featureId: 14,
        });
        let resInfo = [{ "size": 56, "name": "1.txt", "id": 1966180689, "contentType": "text/plain" }, { "size": 34991, "name": "test.png", "id": 1590279732, "contentType": "image/png" }];
        let serviceUrl = Util.urlPathAppend(dataServiceURL, "datasources/" + params.dataSourceName + "/datasets/" + params.dataSetName);
        let myService = new FeatureAttachmentsService(serviceUrl)
        spyOn(FetchRequest, 'commit').and.callFake((method, url, params, options) => {
            expect(method).toEqual('GET');
            expect(params).toBeUndefined();
            expect(options).not.toBeNull();
            expect(url).toEqual('http://localhost:9876/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/features/14/attachments');
            return Promise.resolve(new Response(JSON.stringify(resInfo)));
        })
        myService.getAttachments(params).then(res => {
            serviceResult = res;
            expect(serviceResult.result.length).toBe(2);
            done();
        });
    });
    it('add attachments of file type success', done => {
        let file = new File(['file1 contents'], 'file1.txt', { type: 'text/plain' });
        let params = new EditAttachmentsParameters({
            dataSourceName: "World",
            dataSetName: "Countries",
            featureId: 14,
            file: file
        });
        let serviceUrl = Util.urlPathAppend(dataServiceURL, "datasources/" + params.dataSourceName + "/datasets/" + params.dataSetName);
        let myService = new FeatureAttachmentsService(serviceUrl)

        spyOn(FetchRequest, 'commit').and.callFake((method, url, params, options) => {
            expect(params.get('file') instanceof File).toBeTruthy();
            expect(method).toEqual('POST');
            expect(url).toEqual('http://localhost:9876/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/features/14/attachments');
            expect(params).not.toBeNull();
            expect(options).not.toBeNull();
            return Promise.resolve(
                new Response(`{"size":56,"name":"1.txt","id":-1403040659,"contentType":"text/plain"}`)
            )
        })
        myService.processAsync(params).then(res => {
            serviceResult = res;
            expect(serviceResult.result.succeed).toBeTruthy();
            expect(serviceResult.result.name).toBe('1.txt');
            expect(serviceResult.result.contentType).toBe('text/plain');
            expect(serviceResult.result.size).toBe(56);
            done();
        });
    })

    it('add attachments of Blob type success', done => {
        let file = new Blob([{name: 'test'}], { type: 'application/json' });
        let params = new EditAttachmentsParameters({
            dataSourceName: "World",
            dataSetName: "Countries",
            featureId: 14,
            file: file
        });
        let serviceUrl = Util.urlPathAppend(dataServiceURL, "datasources/" + params.dataSourceName + "/datasets/" + params.dataSetName);
        let myService = new FeatureAttachmentsService(serviceUrl)

        spyOn(FetchRequest, 'commit').and.callFake((method, url, params, options) => {
            expect(params.get('file') instanceof Blob).toBeTruthy();
            expect(method).toEqual('POST');
            expect(url).toEqual('http://localhost:9876/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/features/14/attachments');
            expect(params).not.toBeNull();
            expect(options).not.toBeNull();
            return Promise.resolve(
                new Response(`{"size":22,"name":"blob","id":1622230032,"contentType":"application/json"}`)
            )
        })
        myService.processAsync(params).then(res => {
            serviceResult = res;
            expect(serviceResult.result.succeed).toBeTruthy();
            expect(serviceResult.result.name).toBe('blob');
            expect(serviceResult.result.contentType).toBe('application/json');
            expect(serviceResult.result.size).toBe(22);
            done();
        });
    })

    it('add attachments and file is not exist', done => {
        let file = null;
        let params = new EditAttachmentsParameters({
            dataSourceName: "World",
            dataSetName: "Countries",
            featureId: 14,
            file: file,
            editType: 'add'
        });
        let serviceUrl = Util.urlPathAppend(dataServiceURL, "datasources/" + params.dataSourceName + "/datasets/" + params.dataSetName);
        let myService = new FeatureAttachmentsService(serviceUrl)

        spyOn(FetchRequest, 'commit').and.callFake((method, url, params, options) => {
            expect(method).toEqual('POST');
            expect(url).toEqual('http://localhost:9876/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/features/14/attachments');
            expect(params).not.toBeNull();
            expect(options).not.toBeNull();
        })
        myService.processAsync(params);
        expect(FetchRequest.commit).not.toHaveBeenCalled();
        done();
    })

    it('add attachments with file type is not Blob or File', done => {
        let file = 'test';
        let params = new EditAttachmentsParameters({
            dataSourceName: "World",
            dataSetName: "Countries",
            featureId: 14,
            file: file,
            editType: 'add'
        });
        let serviceUrl = Util.urlPathAppend(dataServiceURL, "datasources/" + params.dataSourceName + "/datasets/" + params.dataSetName);
        let myService = new FeatureAttachmentsService(serviceUrl)

        spyOn(FetchRequest, 'commit').and.callFake((method, url, params, options) => {
            expect(method).toEqual('POST');
            expect(url).toEqual('http://localhost:9876/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/features/14/attachments');
            expect(params).not.toBeNull();
            expect(options).not.toBeNull();
        })
        myService.processAsync(params);
        expect(FetchRequest.commit).not.toHaveBeenCalled();
        done();
    })

    it('delete attachment by attachmentIDs', done => {
        let params = new EditAttachmentsParameters({
            dataSourceName: "World",
            dataSetName: "Countries",
            featureId: 14,
            IDs: ['313724927', -1344395825],
            editType: 'delete'
        });
        let serviceUrl = Util.urlPathAppend(dataServiceURL, "datasources/" + params.dataSourceName + "/datasets/" + params.dataSetName);
        let myService = new FeatureAttachmentsService(serviceUrl)

        spyOn(FetchRequest, 'commit').and.callFake((method, url, params, options) => {
            expect(method).toBe("DELETE");
            expect(params).not.toBeNull();;
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}}`));
        })
        myService.processAsync(params).then(res => {
            serviceResult = res;
            expect(serviceResult.length).toBe(2);
            done();
        });
    })
    it('add attachments with no params', done => {
        let dataSourceName = "World";
        let dataSetName = "Countries";
        let params = null;
        let serviceUrl = Util.urlPathAppend(dataServiceURL, "datasources/" + dataSourceName + "/datasets/" + dataSetName);
        let myService = new FeatureAttachmentsService(serviceUrl)
        spyOn(FetchRequest, 'commit');
        myService.getAttachments(params);
        expect(FetchRequest.commit).not.toHaveBeenCalled();
        done();
    })

    it('delete attachments with no params', done => {
        let dataSourceName = "World";
        let dataSetName = "Countries";
        let params = null;
        let serviceUrl = Util.urlPathAppend(dataServiceURL, "datasources/" + dataSourceName + "/datasets/" + dataSetName);
        let myService = new FeatureAttachmentsService(serviceUrl)
        spyOn(FetchRequest, 'commit');
        myService.processAsync(params);
        expect(FetchRequest.commit).not.toHaveBeenCalled();
        done();
    })
})