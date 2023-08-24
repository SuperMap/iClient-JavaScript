import {
    SurfaceAnalystService
} from '../../../src/common/iServer/SurfaceAnalystService';
import {
    DatasetSurfaceAnalystParameters
} from '../../../src/common/iServer/DatasetSurfaceAnalystParameters';
import {
    GeometrySurfaceAnalystParameters
} from '../../../src/common/iServer/GeometrySurfaceAnalystParameters';
import {
    SurfaceAnalystParametersSetting
} from '../../../src/common/iServer/SurfaceAnalystParametersSetting';
import {
    DataReturnOption
} from '../../../src/common/iServer/DataReturnOption';
import {
    Util
} from '../../../src/common/commontypes/Util';
import {
    Point
} from '../../../src/common/commontypes/geometry/Point';
import {
    SmoothMethod
} from '../../../src/common/REST';
import {
    SurfaceAnalystMethod
} from '../../../src/common/REST';
import {
    FetchRequest
} from '../../../src/common/util/FetchRequest';

var surfaceAnalystEventArgsSystem = null,
    serviceFailedEventArgsSystem = null;
var initSurfaceService = (url) => {
    return new SurfaceAnalystService(url);
};

describe('SurfaceAnalystService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        Util.lastSeqID = 0;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        surfaceAnalystEventArgsSystem = null;
        serviceFailedEventArgsSystem = null;
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var surfaceAnalystService = new SurfaceAnalystService("http://supermap:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst", { headers: myHeaders });
        expect(surfaceAnalystService).not.toBeNull();
        expect(surfaceAnalystService.headers).not.toBeNull();
        surfaceAnalystService.destroy();
    });
    
    it('crossOrigin', () => {
        var surfaceAnalystService = new SurfaceAnalystService("http://supermap:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst", { crossOrigin: false });
        expect(surfaceAnalystService).not.toBeNull();
        expect(surfaceAnalystService.crossOrigin).toBeFalsy();
        surfaceAnalystService.destroy();
    });

    //点数据集提取等值线
    it('Dataset_ISOLINE', (done) => {
        var spatialAnalystURL = "http://supermap:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst";
        var surfaceAnalystCompleted = (surfaceAnalystEventArgs) => {
            surfaceAnalystEventArgsSystem = surfaceAnalystEventArgs;
            var surfaceAnalystResult = surfaceAnalystEventArgsSystem.result;
            expect(surfaceAnalystResult).not.toBeNull();
            expect(surfaceAnalystResult.succeed).toBeTruthy();
            expect(surfaceAnalystResult.recordset.features.type).toEqual("FeatureCollection");
            var features = surfaceAnalystResult.recordset.features.features;
            expect(features.length).toBeGreaterThan(0);
            for (var i = 0; i < features.length; i++) {
                expect(features[i].type).toEqual("Feature");
                expect(features[i].id).not.toBeNull();
                expect(features[i].properties).not.toBeNull();
                expect(features[i].geometry.type).toEqual("LineString");
                var coordinates = features[i].geometry.coordinates;
                expect(coordinates.length).toBeGreaterThan(0);
                for (var j = 0; j < coordinates.length; j++) {
                    expect(coordinates[j].length).toEqual(2);
                }
            }
            var fieldCaptions = surfaceAnalystResult.recordset.fieldCaptions.length;
            expect(fieldCaptions).toBeGreaterThan(0);
            expect(surfaceAnalystResult.recordset.fieldTypes.length).toEqual(fieldCaptions);
            expect(surfaceAnalystResult.recordset.fields.length).toEqual(fieldCaptions);
            surfaceAnalystService.destroy();
            expect(surfaceAnalystService.lastResult == null).toBeTruthy();
            params.destroy();
            surfaceAnalystService.destroy();
            done();
        };
        var surfaceAnalystParameters = new SurfaceAnalystParametersSetting({
            datumValue: 0,
            interval: 2,
            resampleTolerance: 0,
            smoothMethod: SmoothMethod.BSPLINE,
            smoothness: 3,
            clipRegion: null
        });
        var params = new DatasetSurfaceAnalystParameters({
            extractParameter: surfaceAnalystParameters,
            dataset: "SamplesP@Interpolation",
            resolution: 3000,
            zValueFieldName: "AVG_TMP",
            surfaceAnalystMethod: SurfaceAnalystMethod.ISOLINE,
            resultSetting: new DataReturnOption({
                expectCount: 1
            })
        });
        var surfaceAnalystService = initSurfaceService(spatialAnalystURL);
        expect(surfaceAnalystService).not.toBeNull();
        expect(surfaceAnalystService.url).toEqual(spatialAnalystURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/SamplesP@Interpolation/isoline?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.resolution).toEqual(3000);
            expect(paramsObj.resultSetting.expectCount).toEqual(1);
            expect(paramsObj.zValueFieldName).toBe("AVG_TMP");
            return Promise.resolve(new Response(surfaceAnalystEscapedJson));
        });
        surfaceAnalystService.processAsync(params, surfaceAnalystCompleted);
    });

    //点数据集提取等值面
    it('Dataset_ISOREGION', (done) => {
        var spatialAnalystURL = "http://supermap:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst";
        var surfaceAnalystCompleted = (surfaceAnalystEventArgs) => {
            surfaceAnalystEventArgsSystem = surfaceAnalystEventArgs;
            var surfaceAnalystResult = surfaceAnalystEventArgsSystem.result.recordset.features;
            expect(surfaceAnalystResult).not.toBeNull();
            expect(surfaceAnalystResult.features).not.toBeNull();
            expect(surfaceAnalystResult.type).toBe("FeatureCollection");
            surfaceAnalystService.destroy();
            params.destroy();
            done();
        };
        var surfaceAnalystParameters = new SurfaceAnalystParametersSetting({
            datumValue: 70,
            interval: 100,
            resampleTolerance: 0.7,
            smoothMethod: SmoothMethod.BSPLINE,
            smoothness: 3
        });
        var params = new DatasetSurfaceAnalystParameters({
            extractParameter: surfaceAnalystParameters,
            dataset: "SamplesP@Interpolation",
            resolution: 3000,
            zValueFieldName: "AVG_WTR",
            surfaceAnalystMethod: SurfaceAnalystMethod.ISOREGION,
            resultSetting: new DataReturnOption({
                expectCount: 1
            })
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/SamplesP@Interpolation/isoregion?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.resolution).toEqual(3000);
            expect(paramsObj.resultSetting.expectCount).toEqual(1);
            expect(paramsObj.zValueFieldName).toBe("AVG_WTR");
            return Promise.resolve(new Response(surfaceAnalysis_Dataset_ISOREGION));
        });
        var surfaceAnalystService = initSurfaceService(spatialAnalystURL);
        surfaceAnalystService.processAsync(params, surfaceAnalystCompleted);
    });

    //对象提取等值线
    it('Geometry_ISOLINE', (done) => {
        var spatialAnalystURL = "http://supermap:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst";
        var surfaceAnalystCompleted = (surfaceAnalystEventArgs) => {
            surfaceAnalystEventArgsSystem = surfaceAnalystEventArgs;
            expect(surfaceAnalystEventArgsSystem.type).toBe("processCompleted");
            expect(surfaceAnalystEventArgsSystem.result.dataset).toBeNull();
            expect(surfaceAnalystEventArgsSystem.result.succeed).toBe(true);
            var surfaceAnalystResult = surfaceAnalystEventArgsSystem.result.recordset.features;
            expect(surfaceAnalystResult).not.toBeNull();
            expect(surfaceAnalystResult.features).not.toBeNull();
            expect(surfaceAnalystResult.type).toBe("FeatureCollection");
            surfaceAnalystService.destroy();
            params.destroy();
            done();
        };
        var surfaceAnalystParameters = new SurfaceAnalystParametersSetting({
            datumValue: -3,
            interval: 0.5,
            resampleTolerance: 0.7,
            smoothMethod: SmoothMethod.BSPLINE,
            smoothness: 3
        });
        var params = new GeometrySurfaceAnalystParameters({
            extractParameter: surfaceAnalystParameters,
            points: [new Point(-4000, 2000),
                new Point(-4500, 2000),
                new Point(-3000, 3000),
                new Point(-3000, 2000),
                new Point(-2500, 2500),
                new Point(-2000, 2000),
                new Point(-2000, 3000),
                new Point(-2000, 2000),
                new Point(2000, 4000),
                new Point(0, 0)
            ],
            resolution: 3000,
            zValues: [-3, -2, 0, -1, -3, 0, 1, 0, 1, 1],
            surfaceAnalystMethod: SurfaceAnalystMethod.ISOLINE,
            resultSetting: new DataReturnOption({
                expectCount: 1
            })
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(spatialAnalystURL + "/geometry/isoline?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.extractParameter.resampleTolerance).toBe(0.7);
            expect(paramsObj.resolution).toBe(3000);
            expect(paramsObj.surfaceAnalystMethod).toBe(SurfaceAnalystMethod.ISOLINE);
            return Promise.resolve(new Response(surfaceAnalysis_Geometry_ISOLINE));
        });
        var surfaceAnalystService = initSurfaceService(spatialAnalystURL);
        surfaceAnalystService.processAsync(params, surfaceAnalystCompleted);
    });

    //对象提取等值面
    it('Geometry_ISOREGION', (done) => {
        var spatialAnalystURL = "http://supermap:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst";
        var surfaceAnalystCompleted = (surfaceAnalystEventArgs) => {
            surfaceAnalystEventArgsSystem = surfaceAnalystEventArgs;
            expect(surfaceAnalystEventArgsSystem.type).toBe("processCompleted");
            expect(surfaceAnalystEventArgsSystem.result.dataset).toBeNull();
            expect(surfaceAnalystEventArgsSystem.result.succeed).toBe(true);
            var surfaceAnalystResult = surfaceAnalystEventArgsSystem.result.recordset.features;
            expect(surfaceAnalystResult).not.toBeNull();
            expect(surfaceAnalystResult.features).not.toBeNull();
            expect(surfaceAnalystResult.type).toBe("FeatureCollection");
            surfaceAnalystService.destroy();
            params.destroy();
            done();
        };
        var surfaceAnalystParameters = new SurfaceAnalystParametersSetting({
            datumValue: -3,
            interval: 0.5,
            resampleTolerance: 0.7,
            smoothMethod: SmoothMethod.BSPLINE,
            smoothness: 3
        });
        var params = new GeometrySurfaceAnalystParameters({
            extractParameter: surfaceAnalystParameters,
            points: [new Point(-4000, 2000),
                new Point(-4500, 2000),
                new Point(-3000, 3000),
                new Point(-3000, 2000),
                new Point(-2500, 2500),
                new Point(-2000, 2000),
                new Point(-2000, 3000),
                new Point(-2000, 2000),
                new Point(2000, 4000),
                new Point(0, 0)
            ],
            resolution: 3000,
            zValues: [-3, 0, 10, 20, 13, 8, 5, 20, 10, 15],
            surfaceAnalystMethod: SurfaceAnalystMethod.ISOREGION,
            resultSetting: new DataReturnOption({
                expectCount: 1
            })
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(spatialAnalystURL + "/geometry/isoregion?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.extractParameter.resampleTolerance).toBe(0.7);
            expect(paramsObj.resolution).toBe(3000);
            expect(paramsObj.surfaceAnalystMethod).toBe(SurfaceAnalystMethod.ISOREGION);
            return Promise.resolve(new Response(surfaceAnalysis_Geometry_ISOREGION));
        });
        var surfaceAnalystService = initSurfaceService(spatialAnalystURL);
        surfaceAnalystService.processAsync(params, surfaceAnalystCompleted);
    });

    //失败
    it('fail', (done) => {
        var spatialAnalystURL = "http://supermap:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst";
        var surfaceAnalystFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            expect(serviceFailedEventArgsSystem.type).toBe("processFailed");
            expect(serviceFailedEventArgsSystem.error.errorMsg).toBe("数据集SamplesP1@Interpolation不存在");
            expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
            surfaceAnalystService.destroy();
            params.destroy();
            done();
        };
        var surfaceAnalystParameters = new SurfaceAnalystParametersSetting({
            datumValue: 70,
            interval: 100,
            resampleTolerance: 0.7,
            smoothMethod: SmoothMethod.BSPLINE,
            smoothness: 3
        });
        var params = new DatasetSurfaceAnalystParameters({
            extractParameter: surfaceAnalystParameters,
            dataset: "SamplesP1@Interpolation",
            resolution: 3000,
            zValueFieldName: "AVG_WTR"
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/SamplesP1@Interpolation/isoline?returnContent=true");
            var escapedJson = "{\"succeed\":false,\"error\":{\"code\":400,\"errorMsg\":\"数据集SamplesP1@Interpolation不存在\"}}";
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.resolution).toEqual(3000);
            expect(paramsObj.zValueFieldName).toBe("AVG_WTR");
            return Promise.resolve(new Response(escapedJson));
        });
        var surfaceAnalystService = initSurfaceService(spatialAnalystURL);
        surfaceAnalystService.processAsync(params, surfaceAnalystFailed);
    })

    it('fail promise', (done) => {
      var spatialAnalystURL = "http://supermap:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst";
      var surfaceAnalystFailed = (serviceFailedEventArgs) => {
          serviceFailedEventArgsSystem = serviceFailedEventArgs;
          expect(serviceFailedEventArgsSystem.type).toBe("processFailed");
          expect(serviceFailedEventArgsSystem.error.errorMsg).toBe("数据集SamplesP1@Interpolation不存在");
          expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
          surfaceAnalystService.destroy();
          params.destroy();
          done();
      };
      var surfaceAnalystParameters = new SurfaceAnalystParametersSetting({
          datumValue: 70,
          interval: 100,
          resampleTolerance: 0.7,
          smoothMethod: SmoothMethod.BSPLINE,
          smoothness: 3
      });
      var params = new DatasetSurfaceAnalystParameters({
          extractParameter: surfaceAnalystParameters,
          dataset: "SamplesP1@Interpolation",
          resolution: 3000,
          zValueFieldName: "AVG_WTR"
      });
      spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
          expect(method).toBe('POST');
          expect(testUrl).toBe(spatialAnalystURL + "/datasets/SamplesP1@Interpolation/isoline?returnContent=true");
          var escapedJson = "{\"succeed\":false,\"error\":{\"code\":400,\"errorMsg\":\"数据集SamplesP1@Interpolation不存在\"}}";
          var paramsObj = JSON.parse(params.replace(/'/g, "\""));
          expect(paramsObj.resolution).toEqual(3000);
          expect(paramsObj.zValueFieldName).toBe("AVG_WTR");
          return Promise.resolve(new Response(escapedJson));
      });
      var surfaceAnalystService = initSurfaceService(spatialAnalystURL);
      surfaceAnalystService.processAsync(params).then(surfaceAnalystFailed);
  })
});