require('../../../src/leaflet/services/AddressMatchService');

var addressMatchURL = GlobeParameter.addressMatchURL;
var options = {
    serverType: 'iServer'
};

describe('leaflet_testAddressMatchService', function () {
    var serviceResult;
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('successEvent:GeoCoding', function (done) {
        var GeoCodingParams = new SuperMap.GeoCodingParameter({
            address: '公司',
            fromIndex: 0,
            toIndex: 10,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1
        });
        var GeoCodingService = L.supermap.addressMatchService(addressMatchURL, options).code(GeoCodingParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(GeoCodingService).not.toBeNull();
                expect(GeoCodingService.options.serverType).toBe("iServer");
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
                GeoCodingService.destroy();
                done();
            } catch (exception) {
                console.log("'successEvent:GeoCoding'案例失败：" + exception.name + ":" + exception.message);
                GeoCodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });


    it('successEvent:GeoDecoding', function (done) {
        var GeoDecodingParams = new SuperMap.GeoDecodingParameter({
            x: 116.31740122415627,
            y: 39.92311315752059,
            fromIndex: 0,
            toIndex: 5,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1,
            geoDecodingRadius: 500
        });
        var GeoDecodingService = L.supermap.addressMatchService(addressMatchURL, options).decode(GeoDecodingParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
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
                console.log("'successEvent:GeoDecoding'案例失败：" + exception.name + ":" + exception.message);
                GeoDecodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    it('failEvent:GeocodingAddressNull', function (done) {
        var GeoCodingParams = new SuperMap.GeoCodingParameter({
            address: null,
            fromIndex: 0,
            toIndex: 10,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1
        });
        var GeoCodingService = L.supermap.addressMatchService(addressMatchURL, options).code(GeoCodingParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(GeoCodingService).not.toBeNull();
                expect(GeoCodingService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                expect(result.success).toBeFalsy();
                expect(result.error.code).toEqual(400);
                expect(result.error.errorMsg).toBe("address cannot be null!");
                GeoCodingService.destroy();
                done();
            } catch (exception) {
                console.log("'failEvent:GeocodingAddressNull'案例失败：" + exception.name + ":" + exception.message);
                GeoCodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    it('failEvent:GeoDecodingLocationInvalid', function (done) {
        var GeoDecodingParams = new SuperMap.GeoDecodingParameter({
            fromIndex: 0,
            toIndex: 5,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1,
            geoDecodingRadius: 500
        });
        var GeoDecodingService = L.supermap.addressMatchService(addressMatchURL, options).decode(GeoDecodingParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(GeoDecodingService).not.toBeNull();
                expect(GeoDecodingService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                expect(result).not.toBeNull();
                expect(result.success).toBeFalsy();
                expect(result.error.code).toEqual(400);
                expect(result.error.errorMsg).toBe("location not valid!");
                GeoDecodingService.destroy();
                done();
            } catch (exception) {
                console.log("'failEvent:GeoDecodingLocationInvalid'案例失败：" + exception.name + ":" + exception.message);
                GeoDecodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

});


