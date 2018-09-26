import { AddressMatchService } from '../../../src/openlayers/services/AddressMatchService';
import { GeoCodingParameter } from '../../../src/common/iServer/GeoCodingParameter';
import { GeoDecodingParameter } from '../../../src/common/iServer/GeoDecodingParameter';

var addressMatchURL = GlobeParameter.addressMatchURL;
describe('openlayers_AddressMatchService', () => {
    var originaTimeout;
    beforeEach(() => {
        originaTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originaTimeout;
    });
    it('constructor', () => {
        var addressMatchService = new AddressMatchService(addressMatchURL);
        expect(addressMatchService).not.toBeNull();
        expect(addressMatchService.url).toEqual(addressMatchURL);
        expect(addressMatchService.url).not.toBeNull();
    });

    it('code', (done) => {
        var codingFailedEventArgs = null, codingSuccessEventArgs = null;
        var codeCompleted = (analyseEventArgs) => {
            codingSuccessEventArgs = analyseEventArgs;
        };
        var codeFailed = (serviceFailedEventArgs) => {
            codingFailedEventArgs = serviceFailedEventArgs;
        };
        var options = {
            eventListeners: {"processCompleted": codeCompleted, "processFailed": codeFailed}
        };
        var GeoCodingParams = new GeoCodingParameter({
            address: '公司',
            fromIndex: 0,
            toIndex: 10,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1
        });
        var addressCodeService = new AddressMatchService(addressMatchURL, options);
        addressCodeService.code(GeoCodingParams, codeCompleted);
        setTimeout(() => {
            try {
                expect(addressCodeService).not.toBeNull();
                expect(codingSuccessEventArgs).not.toBeNull();
                expect(codingSuccessEventArgs.type).toBe('processCompleted');
                expect(codingSuccessEventArgs.result).not.toBeNull();
                expect(codingSuccessEventArgs.result.length).toBe(10);
                GeoCodingParams.destroy();
                codingSuccessEventArgs = null;
                codingFailedEventArgs = null;
                done();
            } catch (exception) {
                console.log("'code'案例失败：" + exception.name + ":" + exception.message);
                GeoCodingParams.destroy();
                codingFailedEventArgs = null;
                codingSuccessEventArgs = null;
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    it('decode', (done) => {
        var decodingFailedEventArgs = null, decodingSuccessEventArgs = null;
        var decodeFailed = (serviceFailedEventArgs) => {
            decodingFailedEventArgs = serviceFailedEventArgs;
        };
        var decodeCompleted = (analyseEventArgs) => {
            decodingSuccessEventArgs = analyseEventArgs;
        };
        var GeoDeCodingParams = new GeoDecodingParameter({
            x: 116.31740122415627,
            y: 39.92311315752059,
            fromIndex: 0,
            toIndex: 5,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1,
            geoDecodingRadius: 500
        });
        var addressDeCodeService = new AddressMatchService(addressMatchURL);
        addressDeCodeService.decode(GeoDeCodingParams, decodeCompleted);
        setTimeout(() => {
            try {
                expect(addressDeCodeService).not.toBeNull();
                expect(decodingSuccessEventArgs).not.toBeNull();
                expect(decodingSuccessEventArgs.type).toBe('processCompleted');
                expect(decodingSuccessEventArgs.result).not.toBeNull();
                expect(decodingSuccessEventArgs.result.length).toEqual(5);
                GeoDeCodingParams.destroy();
                decodingFailedEventArgs = null;
                decodingSuccessEventArgs = null;
                done();
            } catch (exception) {
                console.log("'decode'案例失败：" + exception.name + ":" + exception.message);
                GeoDeCodingParams.destroy();
                decodingFailedEventArgs = null;
                decodingSuccessEventArgs = null;
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});