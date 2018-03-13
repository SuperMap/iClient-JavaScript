import {SurfaceAnalystService} from '../../../src/common/iServer/SurfaceAnalystService';
import {DatasetSurfaceAnalystParameters} from '../../../src/common/iServer/DatasetSurfaceAnalystParameters';
import {GeometrySurfaceAnalystParameters} from '../../../src/common/iServer/GeometrySurfaceAnalystParameters';
import {SurfaceAnalystParametersSetting} from '../../../src/common/iServer/SurfaceAnalystParametersSetting';
import {DataReturnOption} from '../../../src/common/iServer/DataReturnOption';
import {Util} from '../../../src/common/commontypes/Util';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {SmoothMethod} from '../../../src/common/REST';
import {SurfaceAnalystMethod} from '../../../src/common/REST';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

var spatialAnalystURL = "http://supermap:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst";
var surfaceAnalystEventArgsSystem = null, serviceFailedEventArgsSystem = null;
var surfaceAnalystCompleted = (surfaceAnalystEventArgs) => {
    surfaceAnalystEventArgsSystem = surfaceAnalystEventArgs;
};
var surfaceAnalystFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var initSurfaceService = () => {
    return new SurfaceAnalystService(spatialAnalystURL, {
        eventListeners: {
            "processCompleted": surfaceAnalystCompleted,
            'processFailed': surfaceAnalystFailed
        }
    });
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

    //点数据集提取等值线
    it('Dataset_ISOLINE', (done) => {
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
            resultSetting: new DataReturnOption({expectCount: 1})
        });
        var surfaceAnalystService = initSurfaceService();
        expect(surfaceAnalystService).not.toBeNull();
        expect(surfaceAnalystService.url).toEqual(spatialAnalystURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/SamplesP@Interpolation/isoline.json?returnContent=true");
            var expectParams = "{'resolution':3000,'extractParameter':{'clipRegion':null,'datumValue':0,'expectedZValues':null,'interval':2,'resampleTolerance':0,'smoothMethod':\"BSPLINE\",'smoothness':3},'resultSetting':{'expectCount':1,'dataset':null,'dataReturnMode':\"RECORDSET_ONLY\",'deleteExistResultDataset':true},'zValueFieldName':\"AVG_TMP\",'filterQueryParameter':{'attributeFilter':null,'name':null,'joinItems':null,'linkItems':null,'ids':null,'orderBy':null,'groupBy':null,'fields':null}}";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(surfaceAnalystEscapedJson));
        });
        surfaceAnalystService.processAsync(params);
        setTimeout(() => {
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
            expect(surfaceAnalystService.EVENT_TYPES == null).toBeTruthy();
            expect(surfaceAnalystService.events == null).toBeTruthy();
            expect(surfaceAnalystService.lastResult == null).toBeTruthy();
            expect(surfaceAnalystService.eventListeners == null).toBeTruthy();
            params.destroy();
            surfaceAnalystService.destroy();
            done();
        }, 1000);
    });

    //点数据集提取等值面
    it('Dataset_ISOREGION', (done) => {
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
            resultSetting: new DataReturnOption({expectCount: 1})
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/SamplesP@Interpolation/isoregion.json?returnContent=true");
            var expectParams = "{'resolution':3000,'extractParameter':{'clipRegion':null,'datumValue':70,'expectedZValues':null,'interval':100,'resampleTolerance':0.7,'smoothMethod':\"BSPLINE\",'smoothness':3},'resultSetting':{'expectCount':1,'dataset':null,'dataReturnMode':\"RECORDSET_ONLY\",'deleteExistResultDataset':true},'zValueFieldName':\"AVG_WTR\",'filterQueryParameter':{'attributeFilter':null,'name':null,'joinItems':null,'linkItems':null,'ids':null,'orderBy':null,'groupBy':null,'fields':null}}";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(surfaceAnalysis_Dataset_ISOREGION));
        });
        var surfaceAnalystService = initSurfaceService();
        surfaceAnalystService.processAsync(params);
        setTimeout(() => {
            var surfaceAnalystResult = surfaceAnalystEventArgsSystem.result.recordset.features;
            expect(surfaceAnalystResult).not.toBeNull();
            expect(surfaceAnalystResult.features).not.toBeNull();
            expect(surfaceAnalystResult.type).toBe("FeatureCollection");
            surfaceAnalystService.destroy();
            params.destroy();
            done();
        }, 1000);
    });

    //对象提取等值线
    it('Geometry_ISOLINE', (done) => {
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(spatialAnalystURL + "/geometry/isoline.json?returnContent=true");
            var expectParams = "{'resolution':3000,'extractParameter':{'clipRegion':null,'datumValue':-3,'expectedZValues':null,'interval':0.5,'resampleTolerance':0.7,'smoothMethod':\"BSPLINE\",'smoothness':3},'resultSetting':{'expectCount':1,'dataset':null,'dataReturnMode':\"RECORDSET_ONLY\",'deleteExistResultDataset':true},'surfaceAnalystMethod':\"ISOLINE\",'points':[{'id':\"SuperMap.Geometry_1\",'bounds':null,'SRID':null,'x':-4000,'y':2000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_2\",'bounds':null,'SRID':null,'x':-4500,'y':2000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_3\",'bounds':null,'SRID':null,'x':-3000,'y':3000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_4\",'bounds':null,'SRID':null,'x':-3000,'y':2000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_5\",'bounds':null,'SRID':null,'x':-2500,'y':2500,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_6\",'bounds':null,'SRID':null,'x':-2000,'y':2000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_7\",'bounds':null,'SRID':null,'x':-2000,'y':3000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_8\",'bounds':null,'SRID':null,'x':-2000,'y':2000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_9\",'bounds':null,'SRID':null,'x':2000,'y':4000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_10\",'bounds':null,'SRID':null,'x':0,'y':0,'tag':null,'type':\"Point\"}],'zValues':[-3,-2,0,-1,-3,0,1,0,1,1]}";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(surfaceAnalysis_Geometry_ISOLINE));
        });
        var surfaceAnalystService = initSurfaceService();
        surfaceAnalystService.processAsync(params);
        setTimeout(() => {
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
        }, 1000);
    });

    //对象提取等值面
    it('Geometry_ISOREGION', (done) => {
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(spatialAnalystURL + "/geometry/isoregion.json?returnContent=true");
            var expectParams = "{'resolution':3000,'extractParameter':{'clipRegion':null,'datumValue':-3,'expectedZValues':null,'interval':0.5,'resampleTolerance':0.7,'smoothMethod':\"BSPLINE\",'smoothness':3},'resultSetting':{'expectCount':1,'dataset':null,'dataReturnMode':\"RECORDSET_ONLY\",'deleteExistResultDataset':true},'surfaceAnalystMethod':\"ISOREGION\",'points':[{'id':\"SuperMap.Geometry_1\",'bounds':null,'SRID':null,'x':-4000,'y':2000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_2\",'bounds':null,'SRID':null,'x':-4500,'y':2000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_3\",'bounds':null,'SRID':null,'x':-3000,'y':3000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_4\",'bounds':null,'SRID':null,'x':-3000,'y':2000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_5\",'bounds':null,'SRID':null,'x':-2500,'y':2500,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_6\",'bounds':null,'SRID':null,'x':-2000,'y':2000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_7\",'bounds':null,'SRID':null,'x':-2000,'y':3000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_8\",'bounds':null,'SRID':null,'x':-2000,'y':2000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_9\",'bounds':null,'SRID':null,'x':2000,'y':4000,'tag':null,'type':\"Point\"},{'id':\"SuperMap.Geometry_10\",'bounds':null,'SRID':null,'x':0,'y':0,'tag':null,'type':\"Point\"}],'zValues':[-3,0,10,20,13,8,5,20,10,15]}";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(surfaceAnalysis_Geometry_ISOREGION));
        });
        var surfaceAnalystService = initSurfaceService();
        surfaceAnalystService.processAsync(params);
        setTimeout(() => {
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
        }, 1000);
    });

    //失败
    it('fail', (done) => {
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/SamplesP1@Interpolation/isoline.json?returnContent=true");
            var escapedJson = "{\"succeed\":false,\"error\":{\"code\":400,\"errorMsg\":\"数据集SamplesP1@Interpolation不存在\"}}";
            return Promise.resolve(new Response(escapedJson));
        });
        var surfaceAnalystService = initSurfaceService();
        surfaceAnalystService.processAsync(params);
        setTimeout(() => {
            expect(serviceFailedEventArgsSystem.type).toBe("processFailed");
            expect(serviceFailedEventArgsSystem.error.errorMsg).toBe("数据集SamplesP1@Interpolation不存在");
            expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
            surfaceAnalystService.destroy();
            params.destroy();
            done();
        }, 1000);
    })
});


