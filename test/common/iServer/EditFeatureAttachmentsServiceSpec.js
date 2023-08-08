import { EditFeatureAttachmentsService } from '../../../src/common/iServer/EditFeatureAttachmentsService';
import { EditFeatureAttachmentsParameters } from '../../../src/common//iServer/EditFeatureAttachmentsParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

let dataServiceURL = GlobeParameter.dataServiceURL;

let initEditFeatureAttachmentsService = (url, succ, failed) => {
    return new EditFeatureAttachmentsService(url, {
        eventListeners: {
            processCompleted: succ,
            processFailed: failed
        }
    })
}

describe('EditFeatureAttachmentsService', () => {
    let originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('headers', () => {
        let myHeaders = new Headers();
        let editFeatureAttachmentsService = new EditFeatureAttachmentsService(dataServiceURL, { headers: myHeaders });
        expect(editFeatureAttachmentsService).not.toBeNull();
        expect(editFeatureAttachmentsService.headers).not.toBeNull();
        editFeatureAttachmentsService.destroy();
    });
    it('crossOrigin', () => {
        let editFeatureAttachmentsService = new EditFeatureAttachmentsService(dataServiceURL, { crossOrigin: false });
        expect(editFeatureAttachmentsService).not.toBeNull();
        expect(editFeatureAttachmentsService.crossOrigin).not.toBeNull();
        editFeatureAttachmentsService.destroy();
    });

    it('constructor, destroy', () => {
        let editFeatureAttachmentsService = initEditFeatureAttachmentsService(dataServiceURL);
        expect(editFeatureAttachmentsService.CLASS_NAME).toEqual('SuperMap.EditFeatureAttachmentsService');
        expect(editFeatureAttachmentsService.EVENT_TYPES.length).toEqual(2);
        expect(editFeatureAttachmentsService.EVENT_TYPES[0]).toEqual('processCompleted');
        expect(editFeatureAttachmentsService.EVENT_TYPES[1]).toEqual('processFailed');
        expect(editFeatureAttachmentsService.events).not.toBeNull();
        expect(editFeatureAttachmentsService.eventListeners).not.toBeNull();
        editFeatureAttachmentsService.destroy();
        expect(editFeatureAttachmentsService.EVENT_TYPES).toBeNull();
        expect(editFeatureAttachmentsService.events).toBeNull();
        expect(editFeatureAttachmentsService.eventListeners).toBeNull();
    });
    
    it('success:processAsync:get', done => {
        let Params = new EditFeatureAttachmentsParameters({
            dataSourceName: "World",
            dataSetName: "Countries",
            id: 14,
        });
        let queryCompleted = event => {
            try {
                myService.destroy()
                Params.destroy()
                done()
            } catch (exception) {
                console.log('initEditFeatureAttachmentsService' + exception.name + ':' + exception.message);
                myService.destroy();
                queryParam.destroy();
                done();
            }
        }
        let queryError = event => {
        }
        let myService = initEditFeatureAttachmentsService(dataServiceURL, queryCompleted, queryError)
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toEqual('GET')
            expect(params).toBeUndefined()
            expect(options).not.toBeNull()
            if (testUrl.indexOf('0-11') > 0) {
                expect(myService.url).toEqual(dataServiceURL + '/feature/0-11-14/attachments')
                return Promise.resolve(
                    new Response(`[{"size":56,"name":"1.txt","id":1966180689,"contentType":"text/plain"},{"size":34991,"name":"test.png","id":1590279732,"contentType":"image/png"}]`)
                )
            } else {
                return null
            }
        })
        myService.processAsync(Params)
    });
    it('success:processAsync:post', done => {
        let file = new File(['file1 contents'], 'file1.txt', { type: 'text/plain' });
        let formData = new FormData();
        formData.append('file', file);
        let Params = new EditFeatureAttachmentsParameters({
            dataSourceName: "World",
            dataSetName: "Countries",
            id: 14,
            file: formData 
        });
        expect(Params).not.toBeNull()
        let queryCompleted = event => {
            try {
                expect(myService.file).not.toBeNull()
                myService.destroy()
                Params.destroy()
                done()
            } catch (exception) {
                console.log('initEditFeatureAttachmentsService' + exception.name + ':' + exception.message);
                myService.destroy();
                queryParam.destroy();
                done();
            }
        }
        let queryError = event => {
        }
        let myService = initEditFeatureAttachmentsService(dataServiceURL, queryCompleted, queryError)

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toEqual('POST')
            expect(params).not.toBeNull()
            expect(options).not.toBeNull()
            if (testUrl.indexOf('0-11') > 0) {
                expect(myService.url).toEqual(dataServiceURL + '/feature/0-11-14/attachments')
                return Promise.resolve(
                    new Response(`{"size":56,"name":"1.txt","id":-1403040659,"contentType":"text/plain"}`)
                )
            } else {
                return null
            }
        })
        myService.processAsync(Params)
    })

    it('failEvent:addAttachments_noParameters', done => {
        let noParamsCompleted = () => {};

        let noParamsFailed = () =>{
            expect(myService.file).toBeNull()
            done()
        }
        
        let noParams = new EditFeatureAttachmentsParameters({});

        let myService = initEditFeatureAttachmentsService(dataServiceURL, noParamsCompleted, noParamsFailed)

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) =>{
            expect(method).toBe("GET");
            expect(params).toBeUndefined;
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"the params is empty"}}`));
        })
        myService.processAsync(noParams)
    })
})