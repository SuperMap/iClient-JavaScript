import { ImageRenderingRule, ImageCollectionService } from '../../../src/mapboxgl';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
describe('ImageCollectionService', () => {
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

    it('should call getLegend successfully', function (done) {
        var queryParams = {
            renderingRule: new ImageRenderingRule({ displayMode: 'Composite' })
        };
        service = new ImageCollectionService(requestUrl, { collectionId: 'collectionId' });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/legend');
            return Promise.resolve(new Response(JSON.stringify(getCollectionLegendJson)));
        });
        service.getLegend(queryParams, (res) => {
            try {
                var result = res.result;
                expect(result).not.toBeNull();
                expect(result.layerId).toEqual(0);
                expect(result.layerName).toEqual('DLTB');
                expect(result.legendType).toEqual('Unique Values');
                expect(result.legendCells.length).toEqual(1);
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                done();
            }
        });
    });

    it('should call getLegend parameter wrong', function (done) {
        service = new ImageCollectionService(requestUrl, { collectionId: 'wrongId' });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/legend');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":404,"description":"not found in resources."}}`)
            );
        });
        service.getLegend(null, (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(404);
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                done();
            }
        });
    });

    it('should call getStatistics successfully', function (done) {
        service = new ImageCollectionService(requestUrl, { collectionId: 'collectionId' });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/statistics');
            return Promise.resolve(new Response(JSON.stringify(getCollectionStatisticsJson)));
        });
        service.getStatistics((res) => {
            try {
                var result = res.result;
                expect(result).not.toBeNull();
                expect(result.extent).not.toBeNull();
                expect(result.storageType[0]).toEqual('Local');
                expect(result.collectionId).toEqual('string');
                expect(result.pixelType).toEqual('UNKNOWN');
                expect(result.bandCount).toEqual(0);
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);

                done();
            }
        });
    });

    it('should call getStatistics parameter wrong', function (done) {
        service = new ImageCollectionService(requestUrl, { collectionId: 'wrongId' });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/statistics');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":404,"description":"not found in resources."}}`)
            );
        });
        service.getStatistics((res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(404);

                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);

                done();
            }
        });
    });

    it('should call getTileInfo successfully', function (done) {
        service = new ImageCollectionService(requestUrl, { collectionId: 'collectionId' });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/tileInfo');
            return Promise.resolve(new Response(JSON.stringify(getCollectionTileInfoJson)));
        });
        service.getTileInfo((res) => {
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
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                done();
            }
        });
    });

    it('should call getTileInfo parameter wrong', function (done) {
        service = new ImageCollectionService(requestUrl, { collectionId: 'wrongId' });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/tileInfo');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":404,"description":"not found in resources."}}`)
            );
        });
        service.getTileInfo((res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(404);

                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);

                done();
            }
        });
    });

    it('should call deleteItemByID successfully', function (done) {
        service = new ImageCollectionService(requestUrl, { collectionId: 'collectionId' });

        spyOn(FetchRequest, 'delete').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/items/featureId');
            return Promise.resolve(
                new Response(`{"succeed":true,"result":{"code":204,"description":"The resource was deleted."}}`)
            );
        });
        service.deleteItemByID('featureId', (res) => {
            try {
                expect(true).toBeTruthy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);

                done();
            }
        });
    });

    it('should call deleteItemByID parameter wrong', function (done) {
        service = new ImageCollectionService(requestUrl, { collectionId: 'wrongId' });
        spyOn(FetchRequest, 'delete').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/items/featureId');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":400,"description":"not found in resources."}}`)
            );
        });
        service.deleteItemByID('featureId', (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(400);
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                done();
            }
        });
    });

    it('should call getItemByID successfully', function (done) {
        service = new ImageCollectionService(requestUrl, { collectionId: 'collectionId' });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/items/featureId');
            return Promise.resolve(new Response(`{"succeed":true,"result":{"code":200,"description":""}}`));
        });
        service.getItemByID('featureId', (res) => {
            try {
                expect(true).toBeTruthy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                done();
            }
        });
    });

    it('should call getItemByID parameter wrong', function (done) {
        service = new ImageCollectionService(requestUrl, { collectionId: 'wrongId' });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/items/wrongId');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":400,"description":"not found in resources."}}`)
            );
        });
        service.getItemByID('wrongId', (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(400);
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                done();
            }
        });
    });

    it('should call getTileInfo getStatistics getLegend', function (done) {
      var queryParams = {
        renderingRule: new ImageRenderingRule({ displayMode: 'Composite' })
      };
      service = new ImageCollectionService(requestUrl, { collectionId: 'collectionId' });
      spyOn(FetchRequest, 'get').and.callFake((url) => {
        if(url.includes('tileInfo')) {
          expect(url).toEqual(requestUrl + '/collections/collectionId/tileInfo');
          return Promise.resolve(new Response(JSON.stringify(getCollectionTileInfoJson)));
        }
        if(url.includes('statistics')) {
          expect(url).toEqual(requestUrl + '/collections/collectionId/statistics');
          return Promise.resolve(new Response(JSON.stringify(getCollectionStatisticsJson)));
        }
        if(url.includes('legend')) {
          expect(url).toEqual(requestUrl + '/collections/collectionId/legend');
          return Promise.resolve(new Response(JSON.stringify(getCollectionLegendJson)));
        }
        if(url.includes('items')) {
          expect(url).toEqual(requestUrl + '/collections/collectionId/items/wrongId');
          return Promise.resolve(
            new Response(`{"succeed":false,"error":{"code":400,"description":"not found in resources."}}`)
          );
        }
      });
      service.getTileInfo((res) => {
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
          } catch (exception) {
            expect(false).toBeTruthy();
            console.log('ImageCollectionService' + exception.name + ':' + exception.message);
          }
      });
      service.getStatistics((res) => {
        try {
          var result = res.result;
          expect(result).not.toBeNull();
          expect(result.extent).not.toBeNull();
          expect(result.storageType[0]).toEqual('Local');
          expect(result.collectionId).toEqual('string');
          expect(result.pixelType).toEqual('UNKNOWN');
          expect(result.bandCount).toEqual(0);
        } catch (exception) {
          expect(false).toBeTruthy();
          console.log('ImageCollectionService' + exception.name + ':' + exception.message);
        }
      });
      service.getLegend(queryParams, (res) => {
        try {
          var result = res.result;
          expect(result).not.toBeNull();
          expect(result.layerId).toEqual(0);
          expect(result.layerName).toEqual('DLTB');
          expect(result.legendType).toEqual('Unique Values');
          expect(result.legendCells.length).toEqual(1);
        } catch (exception) {
          expect(false).toBeTruthy();
          console.log('ImageCollectionService' + exception.name + ':' + exception.message);
        }
      });
      service.getItemByID('wrongId', (res) => {
        try {
          expect(res.error.description).not.toBeNull();
          expect(res.error.code).toEqual(400);
        } catch (exception) {
          expect(false).toBeTruthy();
          console.log('ImageCollectionService' + exception.name + ':' + exception.message);
        } finally {
          done();
        }
      });
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
        service = new ImageCollectionService(requestUrl);
        spyOn(FetchRequest, 'patch').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/items/featureId');
            return Promise.resolve(new Response(`{"succeed":true,"result":{"code":204,"description":""}}`));
        });
        service.patchFeature('collectionId', 'featureId', {}, (res) => {
            try {
                expect(true).toBeTruthy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                done();
            }
        });
    });

    xit('should call patchFeature parameter wrong', function (done) {
        service = new ImageCollectionService(requestUrl);
        spyOn(FetchRequest, 'patch').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/items/wrongId');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":404,"description":"not found in resources."}}`)
            );
        });
        service.patchFeature('wrongId', 'wrongId', null, (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(404);

                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);

                done();
            }
        });
    });

    xit('should call postFeature successfully', function (done) {
        // var bodyParam = new Items(postFeatureJson);
        service = new ImageCollectionService(requestUrl);
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/items');
            return Promise.resolve(new Response(JSON.stringify(postFeatureJson)));
        });
        service.postFeature('collectionId', {}, (res) => {
            try {
                var result = res.result;
                expect(result).not.toBeNull();
                expect(result.type).toEqual('Feature');
                expect(result.geometry).not.toBeNull();
                expect(result.properties).not.toBeNull();
                expect(result.assets).not.toBeNull();
                expect(result.bbox.length).toEqual(4);
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                done();
            }
        });
    });

    xit('should call postFeature parameter wrong', function (done) {
        service = new ImageCollectionService(requestUrl);
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/items');
            return Promise.resolve(
                new Response(`{"succeed":false,"error":{"code":400,"description":"not found in resources."}}`)
            );
        });
        service.postFeature('wrongId', null, (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(400);
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                done();
            }
        });
    });

    xit('should call updateFeature successfully', function (done) {
        // var bodyParam = new Item(postFeatureJson);
        service = new ImageCollectionService(requestUrl);
        spyOn(FetchRequest, 'put').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/collectionId/items/featureId');
            return Promise.resolve(new Response(`{"succeed":true,"result":{"code":204,"description":""}}`));
        });
        service.updateFeature('collectionId', 'featureId', {}, (res) => {
            try {
                expect(true).toBeTruthy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);
                done();
            }
        });
    });

    xit('should call updateFeature parameter wrong', function (done) {
        service = new ImageCollectionService(requestUrl);
        spyOn(FetchRequest, 'put').and.callFake((url) => {
            expect(url).toEqual(requestUrl + '/collections/wrongId/items/wrongId');
            return Promise.resolve(
                new Response(`{"succeed":true,"error":{"code":400,"description":"not found in resources."}}`)
            );
        });
        service.updateFeature('wrongId', 'wrongId', null, (res) => {
            try {
                expect(res.error.description).not.toBeNull();
                expect(res.error.code).toEqual(400);

                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('ImageCollectionService' + exception.name + ':' + exception.message);

                done();
            }
        });
    });
});
