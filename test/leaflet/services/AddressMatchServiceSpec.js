import {addressMatchService} from '../../../src/leaflet/services/AddressMatchService';
import {GeoCodingParameter} from '../../../src/common/iServer/GeoCodingParameter';
import {GeoDecodingParameter} from '../../../src/common/iServer/GeoDecodingParameter';

var addressMatchURL = GlobeParameter.addressMatchURL;
var options = {
    serverType: 'iServer'
};

describe('leaflet_AddressMatchService', () => {
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

    it('successEvent:code', (done) => {
        var geoCodingParams = new GeoCodingParameter({
            address: '公司',
            fromIndex: 0,
            toIndex: 10,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1
        });
        var geoCodingService = addressMatchService(addressMatchURL, options);
        geoCodingService.code(geoCodingParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(geoCodingService).not.toBeNull();
                expect(geoCodingService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                expect(result.length).toEqual(10);
                for (var i = 0; i < result.length; i++) {
                    expect(result[i].filters.length).toEqual(2);
                    expect(result[i].filters[0]).toBe("北京市");
                    expect(result[i].filters[1]).toBe("海淀区");
                }
                expect(result[0].score).not.toBeNull();
                geoCodingService.destroy();
                done();
            } catch (exception) {
                console.log("'successEvent:code'案例失败：" + exception.name + ":" + exception.message);
                geoCodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    it('successEvent:decode', (done) => {
        var GeoDecodingParams = new GeoDecodingParameter({
            x: 116.31740122415627,
            y: 39.92311315752059,
            fromIndex: 0,
            toIndex: 5,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1,
            geoDecodingRadius: 500
        });
        var GeoDecodingService = addressMatchService(addressMatchURL, options);
        GeoDecodingService.decode(GeoDecodingParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(GeoDecodingService).not.toBeNull();
                expect(GeoDecodingService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                expect(result.length).toEqual(5);
                for (var i = 0; i < result.length; i++) {
                    expect(result[i].filters.length).toEqual(2);
                    expect(result[i].filters[0]).toBe("北京市");
                    expect(result[i].filters[1]).toBe("海淀区");
                }
                expect(result[0].score).not.toBeNull();
                GeoDecodingService.destroy();
                done();
            } catch (exception) {
                console.log("'successEvent:decode'案例失败：" + exception.name + ":" + exception.message);
                GeoDecodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    it('failEvent:code_AddressNull', (done) => {
        var geoCodingParams = new GeoCodingParameter({
            address: null,
            fromIndex: 0,
            toIndex: 10,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1
        });
        var geoCodingService = addressMatchService(addressMatchURL, options);
        geoCodingService.code(geoCodingParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(geoCodingService).not.toBeNull();
                expect(geoCodingService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                expect(result.success).toBeFalsy();
                expect(result.error.code).toEqual(400);
                expect(result.error.errorMsg).toBe("address cannot be null!");
                geoCodingService.destroy();
                done();
            } catch (exception) {
                console.log("'failEvent:code_AddressNull'案例失败：" + exception.name + ":" + exception.message);
                geoCodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    it('failEvent:decode_LocationInvalid', (done) => {
        var GeoDecodingParams = new GeoDecodingParameter({
            fromIndex: 0,
            toIndex: 5,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1,
            geoDecodingRadius: 500
        });
        var geoDecodingService = addressMatchService(addressMatchURL, options);
        geoDecodingService.decode(GeoDecodingParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(geoDecodingService).not.toBeNull();
                expect(geoDecodingService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                expect(result).not.toBeNull();
                expect(result.success).toBeFalsy();
                expect(result.error.code).toEqual(400);
                expect(result.error.errorMsg).toBe("location not valid!");
                geoDecodingService.destroy();
                done();
            } catch (exception) {
                console.log("'failEvent:decode_LocationInvalid'案例失败：" + exception.name + ":" + exception.message);
                geoDecodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });
});


