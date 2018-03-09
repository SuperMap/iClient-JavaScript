import {AddressMatchService} from '../../../src/mapboxgl/services/AddressMatchService';
import {GeoCodingParameter} from '../../../src/common/iServer/GeoCodingParameter';
import {GeoDecodingParameter} from '../../../src/common/iServer/GeoDecodingParameter';

var addressMatchURL = GlobeParameter.addressMatchURL;
describe('mapboxgl_AddressMatchService', () => {
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

    //正向匹配，成功事件
    it('code_successEvent', (done) => {
        var geoCodingParams = new GeoCodingParameter({
            address: '公司',
            fromIndex: 0,
            toIndex: 10,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1
        });
        var service = new AddressMatchService(addressMatchURL);
        service.code(geoCodingParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
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
                done();
            } catch (exception) {
                console.log("'code_successEvent'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //反向匹配，成功事件
    it('decode_successEvent', (done) => {
        var geoDecodingParams = new GeoDecodingParameter({
            x: 116.31740122415627,
            y: 39.92311315752059,
            fromIndex: 0,
            toIndex: 5,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1,
            geoDecodingRadius: 500
        });
        var service = new AddressMatchService(addressMatchURL);
        service.decode(geoDecodingParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
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
                done();
            } catch (exception) {
                console.log("'decode_successEvent'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //正向匹配，失败事件
    it('code_failEvent', (done) => {
        var geoCodingParams = new GeoCodingParameter({
            address: null,
            fromIndex: 0,
            toIndex: 10,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1
        });
        var service = new AddressMatchService(addressMatchURL);
        service.code(geoCodingParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                expect(result.success).toBeFalsy();
                expect(result.error.code).toEqual(400);
                expect(result.error.errorMsg).toBe("address cannot be null!");
                done();
            } catch (exception) {
                console.log("'code_failEvent'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //反向匹配，失败事件
    it('decode_failEvent', (done) => {
        var geoDecodingParams = new GeoDecodingParameter({
            fromIndex: 0,
            toIndex: 5,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1,
            geoDecodingRadius: 500
        });
        var service = new AddressMatchService(addressMatchURL);
        service.decode(geoDecodingParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                expect(result).not.toBeNull();
                expect(result.success).toBeFalsy();
                expect(result.error.code).toEqual(400);
                expect(result.error.errorMsg).toBe("location not valid!");
                done();
            } catch (exception) {
                console.log("'decode_failEvent'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });
});

