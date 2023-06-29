import { ImageRenderingRule, ImageCollectionService } from '@supermap/iclient-common/iServer';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';

describe('ImageCollectionService', () => {
    var originalTimeout;
    var service;
    var requestUrl = GlobeParameter.imageServiceURL;
    var options;

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
        var service = new ImageCollectionService(requestUrl, { headers: myHeaders });
        expect(service).not.toBeNull();
        expect(service.headers).not.toBeNull();
        service.destroy();
    });

    it('crossOrigin', () => {
        var service = new ImageCollectionService(requestUrl, { crossOrigin: false });
        expect(service).not.toBeNull();
        expect(service.crossOrigin).toBeFalsy();
        service.destroy();
    });

    it('should call getLegend successfully', function (done) {
        var queryParams = {
            renderingRule: new ImageRenderingRule({ displayMode: 'Composite' })
        };
        var getCollectionLegendProcessCompleted = (res) => {
            try {
                var result = res.result;
                expect(result).not.toBeNull();
                expect(result.layerId).toEqual(0);
                expect(result.layerName).toEqual('DLTB');
                expect(result.legendType).toEqual('Unique Values');
                expect(result.legendCells.length).toEqual(1);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };
        service = new ImageCollectionService(requestUrl, {
            collectionId: 'collectionId',
            eventListeners: {
                processCompleted: getCollectionLegendProcessCompleted
            }
        });

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/legend');
            return Promise.resolve(new Response(JSON.stringify(getCollectionLegendJson)));
        });
        service.getLegend(queryParams);
    });

    it('should call getLegend parameter wrong', function (done) {
        var getCollectionLegendProcessFailed = (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(404);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();

                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();

                done();
            }
        };
        service = new ImageCollectionService(requestUrl, {
            collectionId: 'wrongId',
            eventListeners: {
                processFailed: getCollectionLegendProcessFailed
            }
        });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/legend');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":404,"description":"not found in resources."}}`)
            );
        });
        service.getLegend();
    });

    it('should call getStatistics successfully', function (done) {
        var getCollectionStatisticsProcessCompleted = (res) => {
            try {
                var result = res.result;
                expect(result).not.toBeNull();
                expect(result.extent).not.toBeNull();
                expect(result.storageType[0]).toEqual('Local');
                expect(result.collectionId).toEqual('string');
                expect(result.pixelType).toEqual('UNKNOWN');
                expect(result.bandCount).toEqual(0);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };
        var getCollectionStatisticsProcessFailed = (res) => {};

        service = new ImageCollectionService(requestUrl, {
            collectionId: 'collectionId',
            eventListeners: {
                processCompleted: getCollectionStatisticsProcessCompleted,
                processFailed: getCollectionStatisticsProcessFailed
            }
        });

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/statistics');
            return Promise.resolve(new Response(JSON.stringify(getCollectionStatisticsJson)));
        });
        service.getStatistics();
    });

    it('should call getStatistics parameter wrong', function (done) {
        var getCollectionStatisticsProcessFailed = (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(404);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();

                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();

                done();
            }
        };

        service = new ImageCollectionService(requestUrl, {
            collectionId: 'wrongId',
            eventListeners: {
                processFailed: getCollectionStatisticsProcessFailed
            }
        });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/statistics');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":404,"description":"not found in resources."}}`)
            );
        });
        service.getStatistics();
    });

    it('should call getTileInfo successfully', function (done) {
        var getCollectionTileInfoProcessCompleted = (res) => {
            try {
                var result = res.result;
                expect(result).not.toBeNull();
                expect(result.origin).not.toBeNull();
                expect(result.levels[0]).not.toBeNull();
                expect(result.format).toEqual('string');
                expect(result.crs).toEqual('string');
                expect(result.width).toEqual(0);
                expect(result.height).toEqual(0);
                expect(result.dpi).toEqual(0);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };

        service = new ImageCollectionService(requestUrl, {
            collectionId: 'collectionId',
            eventListeners: {
                processCompleted: getCollectionTileInfoProcessCompleted
            }
        });

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/tileInfo');
            return Promise.resolve(new Response(JSON.stringify(getCollectionTileInfoJson)));
        });
        service.getTileInfo();
    });

    it('should call getTileInfo parameter wrong', function (done) {
        var getCollectionTileInfoProcessCompleted = (res) => {};
        var getCollectionTileInfoProcessFailed = (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(404);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();

                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();

                done();
            }
        };

        service = new ImageCollectionService(requestUrl, {
            collectionId: 'wrongId',
            eventListeners: {
                processCompleted: getCollectionTileInfoProcessCompleted,
                processFailed: getCollectionTileInfoProcessFailed
            }
        });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/tileInfo');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":404,"description":"not found in resources."}}`)
            );
        });
        service.getTileInfo();
    });

    it('should call deleteItemByID successfully', function (done) {
        var deleteFeatureProcessCompleted = (res) => {
            try {
                expect(true).toBeTruthy();
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };

        service = new ImageCollectionService(requestUrl, {
            collectionId: 'collectionId',
            eventListeners: {
                processCompleted: deleteFeatureProcessCompleted
            }
        });

        spyOn(FetchRequest, 'delete').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/items/featureId');
            return Promise.resolve(
                new Response(`{"succeed":true,"result":{"code":204,"description":"The resource was deleted."}}`)
            );
        });
        service.deleteItemByID('featureId');
    });

    it('should call deleteItemByID parameter wrong', function (done) {
        var deleteFeatureProcessCompleted = (res) => {};
        var deleteFeatureProcessFailed = (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(400);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();

                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();

                done();
            }
        };

        service = new ImageCollectionService(requestUrl, {
            collectionId: 'wrongId',
            eventListeners: {
                processCompleted: deleteFeatureProcessCompleted,
                processFailed: deleteFeatureProcessFailed
            }
        });
        spyOn(FetchRequest, 'delete').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/items/featureId');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":400,"description":"not found in resources."}}`)
            );
        });
        service.deleteItemByID('featureId');
    });

    it('should call getItemByID successfully', function (done) {
        var getFeatureProcessCompleted = (res) => {
            try {
                expect(true).toBeTruthy();
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };
        service = new ImageCollectionService(requestUrl, {
            collectionId: 'collectionId',
            eventListeners: {
                processCompleted: getFeatureProcessCompleted
            }
        });

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/items/featureId');
            return Promise.resolve(new Response(`{"succeed":true,"result":{"code":200,"description":""}}`));
        });
        service.getItemByID('featureId');
    });

    it('should call getItemByID parameter wrong', function (done) {
        var getFeatureProcessFailed = (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(400);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };
        service = new ImageCollectionService(requestUrl, {
            collectionId: 'wrongId',
            eventListeners: {
                processFailed: getFeatureProcessFailed
            }
        });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/items/wrongId');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":400,"description":"not found in resources."}}`)
            );
        });
        service.getItemByID('wrongId');
    });

    xit('should call patchFeature successfully', function (done) {
        // var bodyParam = new PartialItem({
        //     assets: {
        //         analytic: {
        //             title: '1-Band Analytic',
        //             href: 'http://cool-sat.com/catalog/collections/cs/items/CS3-201605XX_132130_04/analytic-1.tif'
        //         }
        //     }
        // });
        var patchFeatureProcessCompleted = (res) => {
            try {
                expect(true).toBeTruthy();
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };
        var patchFeatureProcessFailed = (res) => {};

        service = new ImageCollectionService(requestUrl, {
            collectionId: 'collectionId',
            eventListeners: {
                processCompleted: patchFeatureProcessCompleted,
                processFailed: patchFeatureProcessFailed
            }
        });

        spyOn(FetchRequest, 'patch').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/items/featureId');
            return Promise.resolve(new Response(`{"succeed":true,"result":{"code":204,"description":""}}`));
        });
        service.patchFeature('featureId', {});
    });

    xit('should call patchFeature parameter wrong', function (done) {
        var patchFeatureProcessFailed = (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(404);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };

        service = new ImageCollectionService(requestUrl, {
            collectionId: 'wrongId',
            eventListeners: {
                processFailed: patchFeatureProcessFailed
            }
        });
        spyOn(FetchRequest, 'patch').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/items/wrongId');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":404,"description":"not found in resources."}}`)
            );
        });
        service.patchFeature('wrongId');
    });

    xit('should call postFeature successfully', function (done) {
        // var bodyParam = new Items(postFeatureJson);
        var postFeatureProcessCompleted = (res) => {
            try {
                var result = res.result;
                expect(result).not.toBeNull();
                expect(result.type).toEqual('Feature');
                expect(result.geometry).not.toBeNull();
                expect(result.properties).not.toBeNull();
                expect(result.assets).not.toBeNull();
                expect(result.bbox.length).toEqual(4);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };
        service = new ImageCollectionService(requestUrl, {
            collectionId: 'collectionId',
            eventListeners: {
                processCompleted: postFeatureProcessCompleted
            }
        });
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/items');
            return Promise.resolve(new Response(JSON.stringify(postFeatureJson)));
        });
        service.postFeature({});
    });

    xit('should call postFeature parameter wrong', function (done) {
        var postFeatureProcessFailed = (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(400);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };

        service = new ImageCollectionService(requestUrl, {
            collectionId: 'wrongId',
            eventListeners: {
                processFailed: postFeatureProcessFailed
            }
        });
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/items');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":400,"description":"not found in resources."}}`)
            );
        });
        service.postFeature();
    });

    xit('should call updateFeature successfully', function (done) {
        // var bodyParam = new Item(postFeatureJson);
        var updateFeatureProcessCompleted = (res) => {
            try {
                expect(true).toBeTruthy();
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };
        service = new ImageCollectionService(requestUrl, {
            collectionId: 'collectionId',
            eventListeners: {
                processCompleted: updateFeatureProcessCompleted
            }
        });

        spyOn(FetchRequest, 'put').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/items/featureId');
            return Promise.resolve(new Response(`{"succeed":true,"result":{"code":204,"description":""}}`));
        });
        service.updateFeature('featureId', {});
    });

    xit('should call updateFeature parameter wrong', function (done) {
        var updateFeatureProcessFailed = (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(400);
                service.destroy();
                expect(service.EVENT_TYPES).toBeNull();
                expect(service.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                service.destroy();
                done();
            }
        };

        service = new ImageCollectionService(requestUrl, {
            collectionId: 'wrongId',
            eventListeners: {
                processFailed: updateFeatureProcessFailed
            }
        });
        spyOn(FetchRequest, 'put').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/items/wrongId');
            return Promise.resolve(
                new Response(`{"succeed":true,"error":{"code":400,"description":"not found in resources."}}`)
            );
        });
        service.updateFeature('wrongId');
    });
    
    it('should call search options null', function (done) {
        service = new ImageCollectionService(null);
        expect(Object.keys(service._serviceOptions).length).toBe(0);
        done();
    });
});
