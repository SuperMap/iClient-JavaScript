import {AddressMatchService} from '../../../src/common/iServer/AddressMatchService';
import {GeoCodingParameter} from '../../../src/common/iServer/GeoCodingParameter';
import {GeoDecodingParameter} from '../../../src/common/iServer/GeoDecodingParameter';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var addressMatchURL_code = GlobeParameter.addressMatchURL_code;
var addressMatchURL_decode = GlobeParameter.addressMatchURL_decode;
describe('AddressMatchService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor, destroy', () => {
        var addressMatchService = new AddressMatchService(addressMatchURL_code);
        expect(addressMatchService).not.toBeNull();
        expect(addressMatchService.url).toEqual(addressMatchURL_code);
        expect(addressMatchService.isInTheSameDomain).toBeTruthy();
        addressMatchService.destroy();
        expect(addressMatchService.EVENT_TYPES).toBeNull();
        expect(addressMatchService.events).toBeNull();
        expect(addressMatchService.isInTheSameDomain).toBeNull();
        expect(addressMatchService.url).toBeNull();
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var addressMatchService = new AddressMatchService(addressMatchURL_code, { headers: myHeaders });
        expect(addressMatchService).not.toBeNull();
        expect(addressMatchService.headers).not.toBeNull();
        addressMatchService.destroy();
    });

    it('crossOrigin', () => {
        let myHeaders = new Headers();
        var addressMatchService = new AddressMatchService(addressMatchURL_code, { crossOrigin: false });
        expect(addressMatchService).not.toBeNull();
        expect(addressMatchService.crossOrigin).toBeFalsy();
        addressMatchService.destroy();
    });

    it('code', done => {
        var codingFailedEventArgs = null,
            codingSuccessEventArgs = null;
        var codeFailed = serviceFailedEventArgs => {
            codingFailedEventArgs = serviceFailedEventArgs;
        };
        var codeCompleted = analyseEventArgs => {
            codingSuccessEventArgs = analyseEventArgs;
            try {
                expect(addressCodeService).not.toBeNull();
                expect(codingSuccessEventArgs).not.toBeNull();
                expect(codingSuccessEventArgs.type).toBe('processCompleted');
                expect(codingSuccessEventArgs.result).not.toBeNull();
                expect(codingSuccessEventArgs.result.length).toEqual(10);
                addressCodeService.destroy();
                GeoCodingParams.destroy();
                codingFailedEventArgs = null;
                codingSuccessEventArgs = null;
                done();
            } catch (exception) {
                console.log("'code'案例失败：" + exception.name + ':' + exception.message);
                addressCodeService.destroy();
                GeoCodingParams.destroy();
                codingFailedEventArgs = null;
                codingSuccessEventArgs = null;
                expect(false).toBeTruthy();
                done();
            }
        };
        var options = {
            eventListeners: { processCompleted: codeCompleted, processFailed: codeFailed }
        };
        var GeoCodingParams = new GeoCodingParameter({
            address: '公司',
            fromIndex: 0,
            toIndex: 10,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1
        });
        var addressCodeService = new AddressMatchService(addressMatchURL_code, options);
        spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
            expect(testUrl).toBe(addressMatchURL_code);
            expect(params.address).toBe('公司');
            expect(params.prjCoordSys).toBe('{epsgcode:4326}');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(codeSuccessEscapedJson));
        });
        addressCodeService.code(addressMatchURL_code, GeoCodingParams);
    });

    it('decode', done => {
        var decodingFailedEventArgs = null,
            decodingSuccessEventArgs = null;
        var decodeFailed = serviceFailedEventArgs => {
            decodingFailedEventArgs = serviceFailedEventArgs;
        };
        var decodeCompleted = analyseEventArgs => {
            decodingSuccessEventArgs = analyseEventArgs;
            try {
                expect(addressDeCodeService).not.toBeNull();
                expect(decodingSuccessEventArgs).not.toBeNull();
                expect(decodingSuccessEventArgs.type).toBe('processCompleted');
                expect(decodingSuccessEventArgs.result).not.toBeNull();
                expect(decodingSuccessEventArgs.result.length).toEqual(5);
                addressDeCodeService.destroy();
                GeoDeCodingParams.destroy();
                decodingFailedEventArgs = null;
                decodingSuccessEventArgs = null;
                done();
            } catch (exception) {
                console.log("'code'案例失败：" + exception.name + ':' + exception.message);
                addressDeCodeService.destroy();
                GeoDeCodingParams.destroy();
                decodingFailedEventArgs = null;
                decodingSuccessEventArgs = null;
                expect(false).toBeTruthy();
                done();
            }
        };
        var options = {
            eventListeners: { processCompleted: decodeCompleted, processFailed: decodeFailed }
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
        var addressDeCodeService = new AddressMatchService(addressMatchURL_decode, options);
        spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
            expect(testUrl).toBe(addressMatchURL_decode);
            expect(params).not.toBeNull();
            expect(params.x).toBe(116.31740122415627);
            expect(params.prjCoordSys).toBe('{epsgcode:4326}');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(decodeSuccessEscapedJson));
        });
        addressDeCodeService.decode(addressMatchURL_decode, GeoDeCodingParams);
    });
});
