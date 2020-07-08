import {OverlayAnalystService} from '../../../src/common/iServer/OverlayAnalystService';
import {DatasetOverlayAnalystParameters} from '../../../src/common/iServer/DatasetOverlayAnalystParameters';
import {GeometryOverlayAnalystParameters} from '../../../src/common/iServer/GeometryOverlayAnalystParameters';
import {OverlayOperationType} from '../../../src/common/REST';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {Polygon} from '../../../src/common/commontypes/geometry/Polygon';
import {LineString} from '../../../src/common/commontypes/geometry/LineString';
import {LinearRing} from '../../../src/common/commontypes/geometry/LinearRing';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var initOverlayAnalystService_Register = (url,OverlayAnalystServiceFailed,OverlayAnalystServiceCompleted) => {
    return new OverlayAnalystService(url, {
        eventListeners: {
            'processFailed': OverlayAnalystServiceFailed,
            'processCompleted': OverlayAnalystServiceCompleted
        }
    });
};
describe('OverlayAnalystService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceFailedEventArgsSystem = null;
        analystEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('headers', () => {
      let myHeaders = new Headers();
      var overlayService = new OverlayAnalystService(GlobeParameter.spatialAnalystURL, { headers: myHeaders });
      expect(overlayService).not.toBeNull();
      expect(overlayService.headers).not.toBeNull();
      overlayService.destroy();
    });
    
    it('crossOrigin', () => {
        var overlayService = new OverlayAnalystService(GlobeParameter.spatialAnalystURL, { crossOrigin: false });
        expect(overlayService).not.toBeNull();
        expect(overlayService.crossOrigin).toBeFalsy();
        overlayService.destroy();
    });

    //不直接返回查询结果
    it('processAsync_byDatasets_returnContent:false', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var OverlayAnalystServiceCompleted = (eventArgs) => {
            analystEventArgsSystem = eventArgs;
            try {
                var overlayResult = analystEventArgsSystem.result;
                expect(overlayResult).not.toBeNull();
                overlayServiceByDatasets.destroy();
                expect(overlayServiceByDatasets.EVENT_TYPES).toBeNull();
                expect(overlayServiceByDatasets.eventListeners).toBeNull();
                expect(overlayServiceByDatasets.events).toBeNull();
                dsOverlayAnalystParameters.destroy();
                done();
            } catch (exception) {
                console.log("OverlayAnalystService_" + exception.name + ":" + exception.message);
                overlayServiceByDatasets.destroy();
                dsOverlayAnalystParameters.destroy();
                expect(false).toBeTruthy();
                done();
            }
        };
        var OverlayAnalystServiceFailed = (eventArgs) => {
            serviceFailedEventArgsSystem = eventArgs;
        };
        var overlayServiceByDatasets = initOverlayAnalystService_Register(spatialAnalystURL,OverlayAnalystServiceFailed,OverlayAnalystServiceCompleted);
        expect(overlayServiceByDatasets).not.toBeNull();
        expect(overlayServiceByDatasets.url).toEqual(spatialAnalystURL);
        var dsOverlayAnalystParameters = new DatasetOverlayAnalystParameters();
        dsOverlayAnalystParameters.sourceDataset = "Landuse_R@Jingjin";
        dsOverlayAnalystParameters.operateDataset = "Lake_R@Jingjin";
        dsOverlayAnalystParameters.operation = OverlayOperationType.UPDATE;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/Landuse_R@Jingjin/overlay?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.operateDataset).toBe("Lake_R@Jingjin");
            expect(paramsObj.operation).toBe("UPDATE");
            return Promise.resolve(new Response(overlayEscapedJson));
        });
        overlayServiceByDatasets.events.on({"processCompleted": OverlayAnalystServiceCompleted});
        overlayServiceByDatasets.processAsync(dsOverlayAnalystParameters);
    });

    it('fail:processAsync_byDatasets', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var OverlayAnalystServiceCompleted = (eventArgs) => {
            analystEventArgsSystem = eventArgs;
        };
        var OverlayAnalystServiceFailed = (eventArgs) => {
            serviceFailedEventArgsSystem = eventArgs;
            try {
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                overlayServiceByDatasets.destroy();
                dsOverlayAnalystParameters.destroy();
                done();
            } catch (exception) {
                console.log("OverlayAnalystService_" + exception.name + ":" + exception.message);
                overlayServiceByDatasets.destroy();
                dsOverlayAnalystParameters.destroy();
                expect(false).toBeTruthy();
                done();
            }
        };
        var overlayServiceByDatasets = initOverlayAnalystService_Register(spatialAnalystURL,OverlayAnalystServiceFailed,OverlayAnalystServiceCompleted);
        expect(overlayServiceByDatasets).not.toBeNull();
        var dsOverlayAnalystParameters = new DatasetOverlayAnalystParameters();
        dsOverlayAnalystParameters.sourceDataset = "Landu@Jingjin";
        dsOverlayAnalystParameters.operateDataset = "Lake_R@Jingjin";
        dsOverlayAnalystParameters.operation = OverlayOperationType.UPDATE;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/Landu@Jingjin/overlay?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.operateDataset).toBe("Lake_R@Jingjin");
            expect(paramsObj.operation).toBe("UPDATE");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"数据集Landu@Jingjin不存在"}}`));
        });
        overlayServiceByDatasets.events.on({"processFailed": OverlayAnalystServiceFailed});
        overlayServiceByDatasets.processAsync(dsOverlayAnalystParameters);
    });

    it('processAsync_byGeometry', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var OverlayAnalystServiceCompleted = (eventArgs) => {
            analystEventArgsSystem = eventArgs;
            try {
                var overlayResult = analystEventArgsSystem.result;
                expect(overlayResult).not.toBeNull();
                overlayServiceByDatasets.destroy();
                geOverlayAnalystParameters.destroy();
                done();
            } catch (exception) {
                console.log("OverlayAnalystService_" + exception.name + ":" + exception.message);
                overlayServiceByDatasets.destroy();
                geOverlayAnalystParameters.destroy();
                expect(false).toBeTruthy();
                done();
            }
        };
        var OverlayAnalystServiceFailed = (eventArgs) => {
            serviceFailedEventArgsSystem = eventArgs;
        };
        var overlayServiceByDatasets = initOverlayAnalystService_Register(spatialAnalystURL,OverlayAnalystServiceFailed,OverlayAnalystServiceCompleted);
        expect(overlayServiceByDatasets).not.toBeNull();
        var points = [new Point(47.9909960608, 382.4873382105),
            new Point(47.9909960608, 437.8615644344),
            new Point(170.3545301069, 437.8615644344),
            new Point(170.3545301069, 382.4873382105)];
        var sourceGeometry = new LineString(points);
        var points1 = [new Point(111.4687675858, 353.8548114800),
            new Point(111.4687675858, 408.1485649972),
            new Point(208.9814293754, 408.1485649972),
            new Point(208.9814293754, 353.8548114800)];
        var operateGeometry = new Polygon(new LinearRing(points1));
        var geOverlayAnalystParameters = new GeometryOverlayAnalystParameters();
        geOverlayAnalystParameters.sourceGeometry = sourceGeometry;
        geOverlayAnalystParameters.operateGeometry = operateGeometry;
        geOverlayAnalystParameters.operation = OverlayOperationType.CLIP;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/geometry/overlay?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.operation).toBe("CLIP");
            return Promise.resolve(new Response(`{"image":null,"resultGeometry":{"center":{"x":170.3545301069,"y":395.31795160385},"parts":[2],"style":null,"prjCoordSys":null,"id":0,"type":"LINE","partTopo":null,"points":[{"x":170.3545301069,"y":408.1485649972},{"x":170.3545301069,"y":382.4873382105}]},"succeed":true,"message":null}`));
        });
        overlayServiceByDatasets.events.on({"processCompleted": OverlayAnalystServiceCompleted});
        overlayServiceByDatasets.processAsync(geOverlayAnalystParameters);
    });
});
