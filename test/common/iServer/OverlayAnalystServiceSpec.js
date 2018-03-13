import {OverlayAnalystService} from '../../../src/common/iServer/OverlayAnalystService';
import {DatasetOverlayAnalystParameters} from '../../../src/common/iServer/DatasetOverlayAnalystParameters';
import {GeometryOverlayAnalystParameters} from '../../../src/common/iServer/GeometryOverlayAnalystParameters';
import {OverlayOperationType} from '../../../src/common/REST';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {Polygon} from '../../../src/common/commontypes/geometry/Polygon';
import {LineString} from '../../../src/common/commontypes/geometry/LineString';
import {LinearRing} from '../../../src/common/commontypes/geometry/LinearRing';

var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var OverlayAnalystServiceCompleted = (eventArgs) => {
    analystEventArgsSystem = eventArgs;
};
var OverlayAnalystServiceFailed = (eventArgs) => {
    serviceFailedEventArgsSystem = eventArgs;
};
var options = {
    eventListeners: {
        'processFailed': OverlayAnalystServiceFailed,
        'processCompleted': OverlayAnalystServiceCompleted
    }
};
var initOverlayAnalystService_Register = () => {
    return new OverlayAnalystService(spatialAnalystURL, options);
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

    //不直接返回查询结果
    it('processAsync_byDatasets_returnContent:false', (done) => {
        var overlayServiceByDatasets = initOverlayAnalystService_Register();
        expect(overlayServiceByDatasets).not.toBeNull();
        expect(overlayServiceByDatasets.url).toEqual(spatialAnalystURL);
        var dsOverlayAnalystParameters = new DatasetOverlayAnalystParameters();
        dsOverlayAnalystParameters.sourceDataset = "Landuse_R@Jingjin";
        dsOverlayAnalystParameters.operateDataset = "Lake_R@Jingjin";
        dsOverlayAnalystParameters.operation = OverlayOperationType.UPDATE;
        overlayServiceByDatasets.events.on({"processCompleted": OverlayAnalystServiceCompleted});
        overlayServiceByDatasets.processAsync(dsOverlayAnalystParameters);
        setTimeout(() => {
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
        }, 4000)
    });

    it('fail:processAsync_byDatasets', (done) => {
        var overlayServiceByDatasets = initOverlayAnalystService_Register();
        expect(overlayServiceByDatasets).not.toBeNull();
        var dsOverlayAnalystParameters = new DatasetOverlayAnalystParameters();
        dsOverlayAnalystParameters.sourceDataset = "Landu@Jingjin";
        dsOverlayAnalystParameters.operateDataset = "Lake_R@Jingjin";
        dsOverlayAnalystParameters.operation = OverlayOperationType.UPDATE;
        overlayServiceByDatasets.events.on({"processFailed": OverlayAnalystServiceFailed});
        overlayServiceByDatasets.processAsync(dsOverlayAnalystParameters);

        setTimeout(() => {
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
        }, 4000)
    });

    it('processAsync_byGeometry', (done) => {
        var overlayServiceByDatasets = initOverlayAnalystService_Register();
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
        overlayServiceByDatasets.events.on({"processCompleted": OverlayAnalystServiceCompleted});
        overlayServiceByDatasets.processAsync(geOverlayAnalystParameters);

        setTimeout(() => {
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
        }, 4000)
    });
});
