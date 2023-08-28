import {mapService} from '../../../src/leaflet/services/MapService';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
var url = GlobeParameter.ChinaURL;
describe('leaflet_MapService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('initialize', () => {
        var options = {
            projection: 'EPSG:3857'
        };
        var service = mapService(url, options);
        expect(service.options.projection).toBe('EPSG:3857');
        expect(service.url).toEqual(url);
    });

    it('getMapInfo', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            expect(testUrl).toBe(url);
            return Promise.resolve(new Response(`{"viewBounds":{"top":1.0018754171380693E7,"left":-1.0018754171380727E7,"bottom":-1.0018754171380745E7,"leftBottom":{"x":-1.0018754171380727E7,"y":-1.0018754171380745E7},"right":1.0018754171380712E7,"rightTop":{"x":1.0018754171380712E7,"y":1.0018754171380693E7}},"viewer":{"leftTop":{"x":0,"y":0},"top":0,"left":0,"bottom":256,"rightBottom":{"x":256,"y":256},"width":256,"right":256,"height":256},"distanceUnit":"METER","minVisibleTextSize":0.1,"coordUnit":"METER","scale":3.3803271432100002E-9,"description":"","paintBackground":true,"maxVisibleTextSize":1000,"maxVisibleVertex":3600000,"clipRegionEnabled":false,"antialias":true,"textOrientationFixed":false,"angle":0,"prjCoordSys":{"distanceUnit":"METER","projectionParam":{"centralParallel":0,"firstPointLongitude":0,"rectifiedAngle":0,"scaleFactor":1,"falseNorthing":0,"centralMeridian":0,"secondStandardParallel":0,"secondPointLongitude":0,"azimuth":0,"falseEasting":0,"firstStandardParallel":0},"epsgCode":3857,"coordUnit":"METER","name":"User Define","projection":{"name":"SPHERE_MERCATOR","type":"PRJ_SPHERE_MERCATOR"},"type":"PCS_USER_DEFINED","coordSystem":{"datum":{"name":"D_WGS_1984","type":"DATUM_WGS_1984","spheroid":{"flatten":0.00335281066474748,"name":"WGS_1984","axis":6378137,"type":"SPHEROID_WGS_1984"}},"unit":"DEGREE","spatialRefType":"SPATIALREF_EARTH_LONGITUDE_LATITUDE","name":"GCS_WGS_1984","type":"GCS_WGS_1984","primeMeridian":{"longitudeValue":0,"name":"Greenwich","type":"PRIMEMERIDIAN_GREENWICH"}}},"minScale":0,"markerAngleFixed":false,"overlapDisplayedOptions":{"allowPointWithTextDisplay":true,"horizontalOverlappedSpaceSize":0,"allowPointOverlap":false,"allowThemeGraduatedSymbolOverlap":false,"verticalOverlappedSpaceSize":0,"allowTextOverlap":false,"allowThemeGraphOverlap":false,"allowTextAndPointOverlap":false},"visibleScales":[1.6901635716026555E-9,3.3803271432053056E-9,6.760654286410611E-9,1.3521308572821242E-8,2.7042617145642484E-8,5.408523429128511E-8,1.0817046858256998E-7,2.1634093716513974E-7,4.3268187433028044E-7,8.653637486605571E-7,1.7307274973211203E-6,3.4614549946422405E-6,6.9229099892844565E-6],"visibleScalesEnabled":true,"customEntireBoundsEnabled":false,"clipRegion":{"center":null,"parts":null,"style":null,"prjCoordSys":null,"id":0,"type":"REGION","partTopo":null,"points":null},"maxScale":1.0E12,"customParams":"","center":{"x":-7.450580596923828E-9,"y":-2.60770320892334E-8},"dynamicPrjCoordSyses":[{"distanceUnit":null,"projectionParam":null,"epsgCode":0,"coordUnit":null,"name":null,"projection":null,"type":"PCS_ALL","coordSystem":null}],"colorMode":"DEFAULT","textAngleFixed":false,"overlapDisplayed":false,"userToken":{"userID":""},"cacheEnabled":true,"dynamicProjection":false,"autoAvoidEffectEnabled":true,"customEntireBounds":null,"name":"China","bounds":{"top":2.0037508342789087E7,"left":-2.0037508342789248E7,"bottom":-2.003750834278914E7,"leftBottom":{"x":-2.0037508342789248E7,"y":-2.003750834278914E7},"right":2.0037508342789244E7,"rightTop":{"x":2.0037508342789244E7,"y":2.0037508342789087E7}},"backgroundStyle":{"fillGradientOffsetRatioX":0,"markerSize":2.4,"fillForeColor":{"red":255,"green":255,"blue":255,"alpha":255},"fillGradientOffsetRatioY":0,"markerWidth":0,"markerAngle":0,"fillSymbolID":0,"lineColor":{"red":0,"green":0,"blue":0,"alpha":255},"markerSymbolID":0,"lineWidth":0.1,"markerHeight":0,"fillOpaqueRate":100,"fillBackOpaque":true,"fillBackColor":{"red":255,"green":255,"blue":255,"alpha":255},"fillGradientMode":"NONE","lineSymbolID":0,"fillGradientAngle":0}}`));
        });
        mapService(url).getMapInfo((serviceResult) => {
                try {
                    expect(serviceResult).not.toBeNull();
                    expect(serviceResult.type).toBe("processCompleted");
                    expect(serviceResult.result).not.toBeNull();
                    expect(serviceResult.options.method).toBe("GET");
                    done();
                    } catch (exception) {
                        expect(false).toBeTruthy();
                        console.log("getMapInfo'案例失败：" + exception.name + ":" + exception.message);
                        mapService.destroy();
                        done();
                    }
        });
    });

    it('getMapInfo promise', (done) => {
      spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
          expect(testUrl).toBe(url);
          return Promise.resolve(new Response(`{"viewBounds":{"top":1.0018754171380693E7,"left":-1.0018754171380727E7,"bottom":-1.0018754171380745E7,"leftBottom":{"x":-1.0018754171380727E7,"y":-1.0018754171380745E7},"right":1.0018754171380712E7,"rightTop":{"x":1.0018754171380712E7,"y":1.0018754171380693E7}},"viewer":{"leftTop":{"x":0,"y":0},"top":0,"left":0,"bottom":256,"rightBottom":{"x":256,"y":256},"width":256,"right":256,"height":256},"distanceUnit":"METER","minVisibleTextSize":0.1,"coordUnit":"METER","scale":3.3803271432100002E-9,"description":"","paintBackground":true,"maxVisibleTextSize":1000,"maxVisibleVertex":3600000,"clipRegionEnabled":false,"antialias":true,"textOrientationFixed":false,"angle":0,"prjCoordSys":{"distanceUnit":"METER","projectionParam":{"centralParallel":0,"firstPointLongitude":0,"rectifiedAngle":0,"scaleFactor":1,"falseNorthing":0,"centralMeridian":0,"secondStandardParallel":0,"secondPointLongitude":0,"azimuth":0,"falseEasting":0,"firstStandardParallel":0},"epsgCode":3857,"coordUnit":"METER","name":"User Define","projection":{"name":"SPHERE_MERCATOR","type":"PRJ_SPHERE_MERCATOR"},"type":"PCS_USER_DEFINED","coordSystem":{"datum":{"name":"D_WGS_1984","type":"DATUM_WGS_1984","spheroid":{"flatten":0.00335281066474748,"name":"WGS_1984","axis":6378137,"type":"SPHEROID_WGS_1984"}},"unit":"DEGREE","spatialRefType":"SPATIALREF_EARTH_LONGITUDE_LATITUDE","name":"GCS_WGS_1984","type":"GCS_WGS_1984","primeMeridian":{"longitudeValue":0,"name":"Greenwich","type":"PRIMEMERIDIAN_GREENWICH"}}},"minScale":0,"markerAngleFixed":false,"overlapDisplayedOptions":{"allowPointWithTextDisplay":true,"horizontalOverlappedSpaceSize":0,"allowPointOverlap":false,"allowThemeGraduatedSymbolOverlap":false,"verticalOverlappedSpaceSize":0,"allowTextOverlap":false,"allowThemeGraphOverlap":false,"allowTextAndPointOverlap":false},"visibleScales":[1.6901635716026555E-9,3.3803271432053056E-9,6.760654286410611E-9,1.3521308572821242E-8,2.7042617145642484E-8,5.408523429128511E-8,1.0817046858256998E-7,2.1634093716513974E-7,4.3268187433028044E-7,8.653637486605571E-7,1.7307274973211203E-6,3.4614549946422405E-6,6.9229099892844565E-6],"visibleScalesEnabled":true,"customEntireBoundsEnabled":false,"clipRegion":{"center":null,"parts":null,"style":null,"prjCoordSys":null,"id":0,"type":"REGION","partTopo":null,"points":null},"maxScale":1.0E12,"customParams":"","center":{"x":-7.450580596923828E-9,"y":-2.60770320892334E-8},"dynamicPrjCoordSyses":[{"distanceUnit":null,"projectionParam":null,"epsgCode":0,"coordUnit":null,"name":null,"projection":null,"type":"PCS_ALL","coordSystem":null}],"colorMode":"DEFAULT","textAngleFixed":false,"overlapDisplayed":false,"userToken":{"userID":""},"cacheEnabled":true,"dynamicProjection":false,"autoAvoidEffectEnabled":true,"customEntireBounds":null,"name":"China","bounds":{"top":2.0037508342789087E7,"left":-2.0037508342789248E7,"bottom":-2.003750834278914E7,"leftBottom":{"x":-2.0037508342789248E7,"y":-2.003750834278914E7},"right":2.0037508342789244E7,"rightTop":{"x":2.0037508342789244E7,"y":2.0037508342789087E7}},"backgroundStyle":{"fillGradientOffsetRatioX":0,"markerSize":2.4,"fillForeColor":{"red":255,"green":255,"blue":255,"alpha":255},"fillGradientOffsetRatioY":0,"markerWidth":0,"markerAngle":0,"fillSymbolID":0,"lineColor":{"red":0,"green":0,"blue":0,"alpha":255},"markerSymbolID":0,"lineWidth":0.1,"markerHeight":0,"fillOpaqueRate":100,"fillBackOpaque":true,"fillBackColor":{"red":255,"green":255,"blue":255,"alpha":255},"fillGradientMode":"NONE","lineSymbolID":0,"fillGradientAngle":0}}`));
      });
      mapService(url).getMapInfo().then((serviceResult) => {
        try {
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result).not.toBeNull();
            expect(serviceResult.options.method).toBe("GET");
            done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("getMapInfo'案例失败：" + exception.name + ":" + exception.message);
                mapService.destroy();
                done();
            }
});
  });
});
