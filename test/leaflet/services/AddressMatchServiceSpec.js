import {addressMatchService} from '../../../src/leaflet/services/AddressMatchService';
import {GeoCodingParameter} from '../../../src/common/iServer/GeoCodingParameter';
import {GeoDecodingParameter} from '../../../src/common/iServer/GeoDecodingParameter';
import { FetchRequest } from '../../../src/common/util/FetchRequest';


var addressMatchURL = GlobeParameter.addressMatchURL;
var options = {
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

    it('headers', () => {
        let myHeaders = new Headers();
        var geoCodingService = addressMatchService(addressMatchURL, { headers: myHeaders });
        expect(geoCodingService).not.toBeNull();
        expect(geoCodingService.options).not.toBeNull();
        expect(geoCodingService.options.headers).not.toBeNull();
        geoCodingService.destroy();
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

        spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
             expect(testUrl).toBe(addressMatchURL + "/geocoding");
             expect(params).not.toBeNull();
             expect(params.address).toBe('公司');
             expect(params.prjCoordSys).toBe('{epsgcode:4326}');
             expect(options).not.toBeNull();
             return Promise.resolve(new Response(codeSuccessEscapedJson));
         }); 
        
         geoCodingService.code(geoCodingParams, (result) => {
            serviceResult = result;
             try {
                 expect(geoCodingService).not.toBeNull();
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
        });
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

        spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
            expect(testUrl).toBe(addressMatchURL + "/geodecoding");
            expect(params).not.toBeNull();
            expect(params.maxReturn).toEqual(-1);
            expect(params.prjCoordSys).toBe('{epsgcode:4326}');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(decodeSuccessEscapedJson));
        });

        GeoDecodingService.decode(GeoDecodingParams, (result) => {
            serviceResult = result;
            try {
                expect(GeoDecodingService).not.toBeNull();
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
        });
    });

    it('successEvent:decode promise', (done) => {
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

      spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
          expect(testUrl).toBe(addressMatchURL + "/geodecoding");
          expect(params).not.toBeNull();
          expect(params.maxReturn).toEqual(-1);
          expect(params.prjCoordSys).toBe('{epsgcode:4326}');
          expect(options).not.toBeNull();
          return Promise.resolve(new Response(decodeSuccessEscapedJson));
      });

      GeoDecodingService.decode(GeoDecodingParams).then((result) => {
        serviceResult = result;
        try {
            expect(GeoDecodingService).not.toBeNull();
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
    });
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

        spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
            expect(testUrl).toBe(addressMatchURL + "/geocoding");
            expect(params.address).toBeNull();
            expect(params.prjCoordSys).toBe('{epsgcode:4326}');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(codeFailEscapedJson));
        }); 

        geoCodingService.code(geoCodingParams, (result) => {
            serviceResult = result;
            try {
                expect(geoCodingService).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                var error = serviceResult.error;
                expect(error).not.toBeNull();
                expect(error.code).toEqual(400);
                expect(error.errorMsg).toBe("address cannot be null!");
                geoCodingService.destroy();
                done();
            } catch (exception) {
                console.log("'failEvent:code_AddressNull'案例失败：" + exception.name + ":" + exception.message);
                geoCodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
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

        spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
            expect(testUrl).toBe(addressMatchURL + "/geodecoding");
            expect(params.geoDecodingRadius).toEqual(500);
            expect(params.prjCoordSys).toBe('{epsgcode:4326}');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(decodeFailEscapedJson));
        });

        geoDecodingService.decode(GeoDecodingParams, (result) => {
            serviceResult = result;
            try {
                expect(geoDecodingService).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                var error = serviceResult.error;
                expect(error).not.toBeNull();
                expect(error.code).toEqual(400);
                expect(error.errorMsg).toBe("location not valid!");
                geoDecodingService.destroy();
                done();
            } catch (exception) {
                console.log("'failEvent:decode_LocationInvalid'案例失败：" + exception.name + ":" + exception.message);
                geoDecodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    it('code_customQueryParam', (done) => {
        var geoCodingParams = new GeoCodingParameter({
            address: '公司',
            fromIndex: 0,
            toIndex: 10,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1
        });
        var geoCodingService = addressMatchService(addressMatchURL +'?key=123', options);

        spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
             expect(testUrl).toBe(addressMatchURL + "/geocoding?key=123");
             return Promise.resolve(new Response(codeSuccessEscapedJson));
         }); 
        
         geoCodingService.code(geoCodingParams, (result) => {
            serviceResult = result;
             try {
                 geoCodingService.destroy();
                 done();
             } catch (exception) {
                 console.log("'successEvent:code'案例失败：" + exception.name + ":" + exception.message);
                 geoCodingService.destroy();
                 expect(false).toBeTruthy();
                 done();
             }
        });
    });

    it('decode_customQueryParam', (done) => {
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
        var GeoDecodingService = addressMatchService(addressMatchURL+'?key=123', options);

        spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
            expect(testUrl).toBe(addressMatchURL + "/geodecoding?key=123");
            return Promise.resolve(new Response(decodeSuccessEscapedJson));
        });

        GeoDecodingService.decode(GeoDecodingParams, (result) => {
            serviceResult = result;
            try {
                GeoDecodingService.destroy();
                done();
            } catch (exception) {
                console.log("'successEvent:decode'案例失败：" + exception.name + ":" + exception.message);
                GeoDecodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});


