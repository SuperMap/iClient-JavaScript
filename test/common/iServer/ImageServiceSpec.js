import { ImageSearchParameter, ImageService } from '@supermap/iclient-common/iServer';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';

describe('ImageService', () => {
    var originalTimeout;
    var service;
    var requestUrl = GlobeParameter.imageServiceURL;

    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        service && service.destroy && service.destroy();
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var service = new ImageService(requestUrl, { headers: myHeaders });
        expect(service).not.toBeNull();
        expect(service.headers).not.toBeNull();
        service.destroy();
    });

    it('crossOrigin', () => {
        var service = new ImageService(requestUrl, { crossOrigin: false });
        expect(service).not.toBeNull();
        expect(service.crossOrigin).toBeFalsy();
        service.destroy();
    });

    it('should call getCollections successfully', function (done) {
        var getCollectionsProcessCompleted = (res) => {
            try {
                var result = res.result;
                expect(result).not.toBeNull();
                expect(result.length).toEqual(1);
                expect(result[0].id).toEqual('Sentinel-2');
                expect(result[0].extent).not.toBeNull();
                expect(result[0].links.length).toEqual(1);
                expect(result[0].providers.length).toEqual(1);
                expect(result[0].keywords.length).toEqual(6);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };
        var getCollectionsProcessFailed = (res) => {};

        service = new ImageService(requestUrl, {
            eventListeners: {
                processCompleted: getCollectionsProcessCompleted,
                processFailed: getCollectionsProcessFailed
            }
        });

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections');
            return Promise.resolve(new Response(JSON.stringify(getCollectionsJson)));
        });
        service.getCollections();
    });

    it('should call getCollections failed', function (done) {
        var getCollectionsProcessFailed = (res) => {
            try {
                console.log(res);
                expect(res.error.errorMsg).not.toBeNull();
                expect(res.error.code).toEqual(400);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageService' + exception.name + ':' + exception.message);
                service.destroy();
                parameter.destroy();
                done();
            }
        };

        service = new ImageService(requestUrl, {
            eventListeners: {
                processFailed: getCollectionsProcessFailed
            }
        });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"not found in resources."}}`)
            );
        });
        service.getCollections();
    });

    it('should call getCollectionByID successfully', function (done) {
        var getCollectionByIDProcessCompleted = (res) => {
            try {
                var result = res.result;
                expect(result).not.toBeNull();
                expect(result.id).toEqual('Sentinel-2');
                expect(result.extent).not.toBeNull();
                expect(result.links.length).toEqual(1);
                expect(result.providers.length).toEqual(1);
                expect(result.keywords.length).toEqual(6);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };

        service = new ImageService(requestUrl, {
            eventListeners: {
                processCompleted: getCollectionByIDProcessCompleted
            }
        });

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId');
            return Promise.resolve(new Response(JSON.stringify(getCollectionByIDJson)));
        });
        service.getCollectionByID('collectionId');
    });

    it('should call getCollectionByID parameter wrong', function (done) {
        var getCollectionByIDProcessFailed = (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(404);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                service.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };

        service = new ImageService(requestUrl, {
            eventListeners: {
                processFailed: getCollectionByIDProcessFailed
            }
        });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":404,"description":"not found in resources."}}`)
            );
        });
        service.getCollectionByID('wrongId');
    });

    it('should call search successfully', function (done) {
        var bodyParam = new ImageSearchParameter({
            bbox: [-110, 39.5, -105, 40.5],
            limit: 10
        });
        var postItemSearchProcessCompleted = (res) => {
            try {
                var result = res.result;
                expect(result).not.toBeNull();
                expect(result.type).toEqual('FeatureCollection');
                expect(result.stac_extensions.length).toEqual(2);
                expect(result.features.length).toEqual(1);
                expect(result.links.length).toEqual(1);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };

        service = new ImageService(requestUrl, {
            eventListeners: {
                processCompleted: postItemSearchProcessCompleted
            }
        });

        spyOn(FetchRequest, 'post').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/search');
            return Promise.resolve(new Response(JSON.stringify(ItemSearchJson)));
        });
        service.search(bodyParam);
    });

    it('should call search parameter wrong', function (done) {
        var bodyParam = new ImageSearchParameter({
            bbox: ['fff']
        });
        var postItemSearchProcessCompleted = (res) => {};
        var postItemSearchProcessFailed = (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(400);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();

                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageService' + exception.name + ':' + exception.message);
                service.destroy();

                done();
            }
        };

        service = new ImageService(requestUrl, {
            eventListeners: {
                processCompleted: postItemSearchProcessCompleted,
                processFailed: postItemSearchProcessFailed
            }
        });
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/search');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":400,"description":"not found in resources."}}`)
            );
        });
        service.search(bodyParam);
    });

    it('should call search options null', function (done) {
        service = new ImageService(null);
        expect(Object.keys(service.options).length).toBe(0);
        done();
    });
});
