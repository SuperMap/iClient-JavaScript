import { ImageSearchParameter, ImageService } from '../../../src/maplibregl';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

describe('maplibregl_ImageService', () => {
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

    it('should call getCollections successfully', function (done) {
        service = new ImageService(requestUrl);
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections');
            return Promise.resolve(new Response(JSON.stringify(getCollectionsJson)));
        });
        service.getCollections((res) => {
            try {
                var result = res.result;
                expect(result).not.toBeNull();
                expect(result.length).toEqual(1);
                expect(result[0].id).toEqual('Sentinel-2');
                expect(result[0].summaries).not.toBeNull();
                expect(result[0].extent).not.toBeNull();
                expect(result[0].links.length).toEqual(1);
                expect(result[0].providers.length).toEqual(1);
                expect(result[0].keywords.length).toEqual(6);
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageService' + exception.name + ':' + exception.message);

                done();
            }
        });
    });

    it('should call getCollections failed', function (done) {
        service = new ImageService(requestUrl);
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"not found in resources."}}`)
            );
        });
        service.getCollections((res) => {
            try {
                console.log(res);
                expect(res.error.errorMsg).not.toBeNull();
                expect(res.error.code).toEqual(400);
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageService' + exception.name + ':' + exception.message);
                done();
            }
        });
    });

    it('should call getCollectionByID successfully', function (done) {
        service = new ImageService(requestUrl);
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId');
            return Promise.resolve(new Response(JSON.stringify(getCollectionByIDJson)));
        });
        service.getCollectionByID('collectionId', (res) => {
            try {
                var result = res.result;
                expect(result).not.toBeNull();
                expect(result.id).toEqual('Sentinel-2');
                expect(result.summaries).not.toBeNull();
                expect(result.extent).not.toBeNull();
                expect(result.links.length).toEqual(1);
                expect(result.providers.length).toEqual(1);
                expect(result.keywords.length).toEqual(6);
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageService' + exception.name + ':' + exception.message);

                done();
            }
        });
    });

    it('should call getCollectionByID parameter wrong', function (done) {
        service = new ImageService(requestUrl);
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":404,"description":"not found in resources."}}`)
            );
        });
        service.getCollectionByID('wrongId', (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(404);
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageService' + exception.name + ':' + exception.message);
                done();
            }
        });
    });

    it('should call search successfully', function (done) {
        var bodyParam = new ImageSearchParameter({
            bbox: [-110, 39.5, -105, 40.5],
            datetimeFilter: '2018-02-12T00:00:00Z/2018-03-18T12:31:12Z',
            limit: 10
        });
        service = new ImageService(requestUrl);

        spyOn(FetchRequest, 'post').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/search');
            return Promise.resolve(new Response(JSON.stringify(ItemSearchJson)));
        });
        service.search(bodyParam, (res) => {
            try {
                var result = res.result;
                expect(result).not.toBeNull();
                expect(result.type).toEqual('FeatureCollection');
                expect(result.stac_extensions.length).toEqual(2);
                expect(result.features.length).toEqual(1);
                expect(result.links.length).toEqual(1);
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageService' + exception.name + ':' + exception.message);

                done();
            }
        });
    });

    it('should call search parameter wrong', function (done) {
        var bodyParam = new ImageSearchParameter({
            bbox: ['fff']
        });
        service = new ImageService(requestUrl);
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/search');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":400,"description":"not found in resources."}}`)
            );
        });
        service.search(bodyParam, (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(400);

                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageService' + exception.name + ':' + exception.message);

                done();
            }
        });
    });
});
