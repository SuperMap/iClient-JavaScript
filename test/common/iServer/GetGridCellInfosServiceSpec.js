import { GetGridCellInfosService } from '../../../src/common/iServer/GetGridCellInfosService';
import { GetGridCellInfosParameters } from '../../../src/common/iServer/GetGridCellInfosParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var dataServiceURL = GlobeParameter.dataServiceURL;
var eventCompleted, eventFailed;

var initGetGridCellInfosService = (url) => {
    return new GetGridCellInfosService(url);
};

describe('GetGridCellInfosService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var getGridCellInfosService = new GetGridCellInfosService(dataServiceURL, { headers: myHeaders });
        expect(getGridCellInfosService).not.toBeNull();
        expect(getGridCellInfosService.headers).not.toBeNull();
        getGridCellInfosService.destroy();
    });

    it('crossOrigin', () => {
        var getGridCellInfosService = new GetGridCellInfosService(dataServiceURL, { crossOrigin: false });
        expect(getGridCellInfosService).not.toBeNull();
        expect(getGridCellInfosService.crossOrigin).toBeFalsy();
        getGridCellInfosService.destroy();
    });

    it('constructor, destroy', () => {
        var getGridCellInfosService = initGetGridCellInfosService(dataServiceURL);
        expect(getGridCellInfosService.CLASS_NAME).toEqual('SuperMap.GetGridCellInfosService');
        expect(getGridCellInfosService.datasetName).toBeNull();
        expect(getGridCellInfosService.dataSourceName).toBeNull();
        expect(getGridCellInfosService.datasetType).toBeNull();
        expect(getGridCellInfosService.X).toBeNull();
        expect(getGridCellInfosService.Y).toBeNull();
        getGridCellInfosService.destroy();
    });

    it('success:processAsync', done => {
        var queryParam = new GetGridCellInfosParameters({
            datasetName: 'LandCover',
            dataSourceName: 'World',
            X: '110',
            Y: '50'
        });
        var queryCompleted = event => {
            eventCompleted = event;
            try {
                expect(myService.url).toEqual(
                    dataServiceURL + '/datasources/World/datasets/LandCover'
                );
                myService.destroy();
                queryParam.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('GetGridCellInfosService_' + exception.name + ':' + exception.message);
                myService.destroy();
                queryParam.destroy();
                done();
            }
        };
        var queryError = event => {
            eventFailed = event;
        };
        var myService = initGetGridCellInfosService(dataServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('GET');
            expect(options).not.toBeNull();
            if (testUrl.indexOf('/datasources/World/datasets/LandCover') > 0) {
                return Promise.resolve(
                    new Response(
                        `{"childUriList":["http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/LandCover/fields","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/LandCover/features","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/LandCover/domain"],"supportAttachments":false,"supportFeatureMetadatas":false,"datasetInfo":{"pixelFormat":"BIT32","maxValue":13,"description":"","type":"GRID","blockSize":256,"dataSourceName":"World","tableName":"LandCover","noValue":-9999,"minValue":0,"isReadOnly":false,"encodeType":"SGL","width":5760,"bounds":{"top":90,"left":-180,"bottom":-90,"leftBottom":{"x":-180,"y":-90},"right":180,"rightTop":{"x":180,"y":90}},"name":"LandCover","prjCoordSys":{"distanceUnit":"METER","projectionParam":null,"epsgCode":4326,"coordUnit":"DEGREE","name":"Longitude / Latitude Coordinate System---GCS_WGS_1984","projection":null,"type":"PCS_EARTH_LONGITUDE_LATITUDE","coordSystem":{"datum":{"name":"D_WGS_1984","type":"DATUM_WGS_1984","spheroid":{"flatten":0.00335281066474748,"name":"WGS_1984","axis":6378137,"type":"SPHEROID_WGS_1984"}},"unit":"DEGREE","spatialRefType":"SPATIALREF_EARTH_LONGITUDE_LATITUDE","name":"GCS_WGS_1984","type":"GCS_WGS_1984","primeMeridian":{"longitudeValue":0,"name":"Greenwich","type":"PRIMEMERIDIAN_GREENWICH"}}},"datasourceConnectionInfo":null,"height":2880}}`
                    )
                );
            } else {
                if (testUrl.indexOf('/datasources/World/datasets/LandCover/gridValue?x=110&y=50') > 0) {
                    return Promise.resolve(
                        new Response(`{"column":4640,"row":640,"value":1,"centerPoint":{"x":110,"y":50}}`)
                    );
                }
            }
            return null;
        });
        myService.processAsync(queryParam, queryCompleted);
    });

    it('success:processAsync eventListeners', done => {
      var queryParam = new GetGridCellInfosParameters({
          datasetName: 'LandCover',
          dataSourceName: 'World',
          X: '110',
          Y: '50'
      });
      var queryCompleted = event => {
          eventCompleted = event;
          try {
              expect(myService.url).toEqual(
                  dataServiceURL + '/datasources/World/datasets/LandCover'
              );
              myService.destroy();
              queryParam.destroy();
              done();
          } catch (exception) {
              expect(false).toBeTruthy();
              console.log('GetGridCellInfosService_' + exception.name + ':' + exception.message);
              myService.destroy();
              queryParam.destroy();
              done();
          }
      };
      var queryError = event => {
          eventFailed = event;
      };
      var myService = new GetGridCellInfosService(dataServiceURL, {
          eventListeners: {
              processCompleted: queryCompleted,
              processFailed: queryError
          }
      });
      spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
          expect(method).toBe('GET');
          expect(options).not.toBeNull();
          if (testUrl.indexOf('/datasources/World/datasets/LandCover') > 0) {
              return Promise.resolve(
                  new Response(
                      `{"childUriList":["http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/LandCover/fields","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/LandCover/features","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/LandCover/domain"],"supportAttachments":false,"supportFeatureMetadatas":false,"datasetInfo":{"pixelFormat":"BIT32","maxValue":13,"description":"","type":"GRID","blockSize":256,"dataSourceName":"World","tableName":"LandCover","noValue":-9999,"minValue":0,"isReadOnly":false,"encodeType":"SGL","width":5760,"bounds":{"top":90,"left":-180,"bottom":-90,"leftBottom":{"x":-180,"y":-90},"right":180,"rightTop":{"x":180,"y":90}},"name":"LandCover","prjCoordSys":{"distanceUnit":"METER","projectionParam":null,"epsgCode":4326,"coordUnit":"DEGREE","name":"Longitude / Latitude Coordinate System---GCS_WGS_1984","projection":null,"type":"PCS_EARTH_LONGITUDE_LATITUDE","coordSystem":{"datum":{"name":"D_WGS_1984","type":"DATUM_WGS_1984","spheroid":{"flatten":0.00335281066474748,"name":"WGS_1984","axis":6378137,"type":"SPHEROID_WGS_1984"}},"unit":"DEGREE","spatialRefType":"SPATIALREF_EARTH_LONGITUDE_LATITUDE","name":"GCS_WGS_1984","type":"GCS_WGS_1984","primeMeridian":{"longitudeValue":0,"name":"Greenwich","type":"PRIMEMERIDIAN_GREENWICH"}}},"datasourceConnectionInfo":null,"height":2880}}`
                  )
              );
          } else {
              if (testUrl.indexOf('/datasources/World/datasets/LandCover/gridValue?x=110&y=50') > 0) {
                  return Promise.resolve(
                      new Response(`{"column":4640,"row":640,"value":1,"centerPoint":{"x":110,"y":50}}`)
                  );
              }
          }
          return null;
      });
      myService.processAsync(queryParam);
  });

    it('fail:processAsync', done => {
        var url = dataServiceURL + '/datasources/World/datasets';
        var queryCompleted = event => {
            eventCompleted = event;
        };
        var myService = new GetGridCellInfosService(url, {
            X: 110,
            Y: 50
        });
        myService.processAsync(queryCompleted);
        setTimeout(() => {
            try {
                expect(myService.processAsync() === undefined).toBeTruthy();
                myService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('GetGridCellInfosService_' + exception.name + ':' + exception.message);
                myService.destroy();
                done();
            }
        }, 0);
    });

    it('getDatasetInfoCompleted', () => {
        var myService = new GetGridCellInfosService(dataServiceURL);
        var result = {
            datasetInfo: {
                type: 'GRID'
            }
        };
        myService.url = dataServiceURL + '/datasources/World/datasets/LandCover';
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe('GET');
            expect(testUrl).toBe(dataServiceURL + '/datasources/World/datasets/LandCover/gridValue');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"请求体格式错误"}}`));
        });
        myService.getDatasetInfoCompleted(result);
        expect(myService.datasetType).toBe('GRID');
    });

    it('getDatasetInfoFailed', () => {
        var myService = initGetGridCellInfosService(dataServiceURL);
        var result = {};
        expect(result).not.toBeNull();
    });

    it('queryGridInfos', () => {
        var url = dataServiceURL + '/datasources/World/datasets/LandCover';
        var myService = initGetGridCellInfosService(url);
        myService.X = '110';
        myService.Y = '50';
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe('GET');
            expect(testUrl).toBe(dataServiceURL + '/datasources/World/datasets/LandCover/imageValue?x=110&y=50');
            expect(options).not.toBeNull();
            return Promise.resolve(
                new Response(
                    `{"succeed":false,"error":{"code":400,"errorMsg":"所查询的数据集的类型不正确！数据集类型应为影像数据集"}}`
                )
            );
        });
        myService.queryGridInfos();
        expect(myService.url).toEqual(
            dataServiceURL + '/datasources/World/datasets/LandCover'
        );
    });
    it('queryGridInfos Bounds exist and it is an object', () => {
        var url = dataServiceURL + '/datasources/World/datasets/WorldEarth';
        var myService = initGetGridCellInfosService(url);
        var bounds = {
            leftBottom: {
                x: 112,
                y: 34
            },
            rightTop: {
                x: 113,
                y: 35
            }
        };
        myService.bounds = bounds;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe('GET');
            expect(testUrl).toBe(dataServiceURL + '/datasources/World/datasets/WorldEarth/imageValues?bounds=%7B%22leftBottom%22%3A%7B%22x%22%3A112%2C%22y%22%3A34%7D%2C%22rightTop%22%3A%7B%22x%22%3A113%2C%22y%22%3A35%7D%7D');
            expect(options).not.toBeNull();
            return Promise.resolve(
                new Response(
                    `{"color":{"red":138,"green":118,"blue":91,"alpha":255},"column":1218,"bounds":null,"row":388,"value":9074267,"centerPoint":{"x":34.23738956451416,"y":21.64506733417511}}`
                )
            );
        });
        myService.queryGridInfos();
    })
    it('queryGridInfos Bounds exist and it is an Arrary', () => {
        var url = dataServiceURL + '/datasources/World/datasets/WorldEarth';
        var myService = initGetGridCellInfosService(url);
        var bounds = [
            {
                point: {
                    x: 112.361881,
                    y: 34.673401
                }
            },
            {
                point: { 
                    x: 107.669629,
                    y: 32.888868
                }
            }
        ];
        myService.bounds = bounds;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(dataServiceURL + '/datasources/World/datasets/WorldEarth/imageValues');
            expect(options).not.toBeNull();
            return Promise.resolve(
                new Response(
                    `[{"color":{"red":74, "green":84, "blue":50, "alpha":255}, "column":1663, "bounds":null, "row":314, "value":4871218, "centerPoint":{"x":112.361881, "y":34.673401}}, {"color":{"red":38, "green":48, "blue":21, "alpha":255}, "column":1636, "bounds":null, "row":324, "value":2502677, "centerPoint":{"x":107.669629, "y":32.888868}}]`
                )
            );
        });
        myService.queryGridInfos();
    })
    it('queryGridInfos_customQueryParam', () => {
        var url = dataServiceURL + '/datasources/World/datasets/LandCover?key=123';
        var myService = initGetGridCellInfosService(url);
        myService.X = '110';
        myService.Y = '50';
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(testUrl).toBe(dataServiceURL + '/datasources/World/datasets/LandCover/imageValue?key=123&x=110&y=50');
            return Promise.resolve(
                new Response(
                    `{"succeed":false,"error":{"code":400,"errorMsg":"所查询的数据集的类型不正确！数据集类型应为影像数据集"}}`
                )
            );
        });
        myService.queryGridInfos();
        expect(myService.url).toEqual(
            dataServiceURL + '/datasources/World/datasets/LandCover?key=123'
        );
    });
});
