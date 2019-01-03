import {MapService} from '../../../src/mapboxgl/services/MapService';
import {ServerType} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.WorldURL;
var options = {
    serverType: ServerType.ISERVER
};
describe('mapboxgl_MapService', () => {
    var serviceResult;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //地图信息查询服务
    it('getMapInfo', (done) => {
        var service = new MapService(url, options);
        spyOn(FetchRequest, 'get').and.callFake(() => {
            return Promise.resolve(new Response(`{"viewBounds":{"top":51.458251340507125,"left":-51.458251340507125,"bottom":-51.458251340507125,"leftBottom":{"x":-51.458251340507125,"y":-51.458251340507125},"right":51.458251340507125,"rightTop":{"x":51.458251340507125,"y":51.458251340507125}},"viewer":{"leftTop":{"x":0,"y":0},"top":0,"left":0,"bottom":256,"rightBottom":{"x":256,"y":256},"width":256,"right":256,"height":256},"distanceUnit":"METER","minVisibleTextSize":0.1,"coordUnit":"DEGREE","scale":5.912160537196359E-9,"description":"","paintBackground":true,"maxVisibleTextSize":1000,"maxVisibleVertex":3600000,"clipRegionEnabled":false,"antialias":true,"textOrientationFixed":false,"angle":0,"prjCoordSys":{"distanceUnit":"METER","projectionParam":null,"epsgCode":4326,"coordUnit":"DEGREE","name":"Longitude / Latitude Coordinate System---GCS_WGS_1984","projection":null,"type":"PCS_EARTH_LONGITUDE_LATITUDE","coordSystem":{"datum":{"name":"D_WGS_1984","type":"DATUM_WGS_1984","spheroid":{"flatten":0.00335281066474748,"name":"WGS_1984","axis":6378137,"type":"SPHEROID_WGS_1984"}},"unit":"DEGREE","spatialRefType":"SPATIALREF_EARTH_LONGITUDE_LATITUDE","name":"GCS_WGS_1984","type":"GCS_WGS_1984","primeMeridian":{"longitudeValue":0,"name":"Greenwich","type":"PRIMEMERIDIAN_GREENWICH"}}},"minScale":0,"markerAngleFixed":false,"overlapDisplayedOptions":{"allowPointWithTextDisplay":true,"horizontalOverlappedSpaceSize":0,"allowPointOverlap":true,"allowThemeGraduatedSymbolOverlap":false,"verticalOverlappedSpaceSize":0,"allowTextOverlap":false,"allowThemeGraphOverlap":false,"allowTextAndPointOverlap":true},"visibleScales":[1.6901635716026555E-9,3.375595414562003E-9,6.751190829124006E-9,1.3502381658248012E-8,2.7004763316496024E-8,5.400952663299205E-8,1.080190532659841E-7,2.1603810653196843E-7,4.320762130639359E-7,8.641524261278681E-7],"visibleScalesEnabled":false,"customEntireBoundsEnabled":false,"clipRegion":{"center":null,"parts":null,"style":null,"prjCoordSys":null,"id":0,"type":"REGION","partTopo":null,"points":null},"maxScale":1.0E12,"customParams":"","center":{"x":0,"y":0},"dynamicPrjCoordSyses":[{"distanceUnit":null,"projectionParam":null,"epsgCode":0,"coordUnit":null,"name":null,"projection":null,"type":"PCS_ALL","coordSystem":null}],"colorMode":"DEFAULT","textAngleFixed":false,"overlapDisplayed":false,"userToken":{"userID":""},"cacheEnabled":true,"dynamicProjection":false,"autoAvoidEffectEnabled":true,"customEntireBounds":null,"name":"World","bounds":{"top":90,"left":-180,"bottom":-90,"leftBottom":{"x":-180,"y":-90},"right":180,"rightTop":{"x":180,"y":90}},"backgroundStyle":{"fillGradientOffsetRatioX":0,"markerSize":2.4,"fillForeColor":{"red":179,"green":209,"blue":255,"alpha":255},"fillGradientOffsetRatioY":0,"markerWidth":0,"markerAngle":0,"fillSymbolID":0,"lineColor":{"red":0,"green":0,"blue":0,"alpha":255},"markerSymbolID":0,"lineWidth":0.1,"markerHeight":0,"fillOpaqueRate":100,"fillBackOpaque":false,"fillBackColor":{"red":255,"green":255,"blue":255,"alpha":255},"fillGradientMode":"NONE","lineSymbolID":0,"fillGradientAngle":0}}`));
        });
        service.getMapInfo((result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.antialias).toEqual(true);
                expect(serviceResult.result.bounds).not.toBeNull();
                expect(serviceResult.result.clipRegion).not.toBeNull();
                expect(serviceResult.result.clipRegion.type).toEqual("REGION");
                expect(serviceResult.result.colorMode).toEqual("DEFAULT");
                expect(serviceResult.result.coordUnit).toEqual("DEGREE");
                expect(serviceResult.result.distanceUnit).toEqual("METER");
                expect(serviceResult.result.name).toEqual("World");
                expect(serviceResult.result.prjCoordSys.coordSystem).not.toBeNull();
                expect(serviceResult.result.prjCoordSys.coordUnit).toEqual("DEGREE");
                expect(serviceResult.result.prjCoordSys.distanceUnit).toEqual("METER");
                expect(serviceResult.result.prjCoordSys.epsgCode).toEqual(4326);
                expect(serviceResult.result.viewer).not.toBeNull();
                done();
            } catch (e) {
                console.log("'getMapInfo'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 3000)
    });

    //切片列表信息查询服务
    it('getTilesets', (done) => {
        var service = new MapService(url, options);
        spyOn(FetchRequest, 'get').and.callFake(() => {
            return Promise.resolve(new Response(`[]`));
        });
        service.getTilesets((result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBeTruthy();
                done();
            } catch (e) {
                console.log("'getMapInfo'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 3000)
    });
});


