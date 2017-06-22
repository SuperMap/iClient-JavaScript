require('../../../src/leaflet/services/AddressService');

var addressMatchURL = GlobeParameter.addressMatchURL;
var options = {
    serverType: 'iServer'
};

describe('leaflet_testAddressService', function () {
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
        var GeoCodingService = L.supermap.AddressService(addressMatchURL, options).code(GeoCodingParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(GeoCodingService).not.toBeNull();
                expect(GeoCodingService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                /*expect(serviceResult.object.url).toBe("http://localhost:8090/iserver/services/data-world/rest/data/featureResults.jsonp?");
                 expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                 expect(serviceResult.result).not.toBeNull();
                 expect(serviceResult.result.succeed).toBeTruthy();
                 expect(serviceResult.result.featureCount).toEqual(7);
                 expect(serviceResult.result.totalCount).toEqual(7);
                 expect(serviceResult.result.features.type).toBe("FeatureCollection");
                 expect(serviceResult.result.features.features.length).toEqual(7);
                 for (var i = 0; i < serviceResult.result.features.features.length; i++) {
                 expect(serviceResult.result.features.features[i].type).toBe("Feature");
                 expect(serviceResult.result.features.features[i].geometry.type).toBe("Point");
                 expect(serviceResult.result.features.features[i].geometry.coordinates.length).toEqual(2);
                 }
                 expect(serviceResult.result.features.features[0].properties).toEqual(Object({
                 CAPITAL: "达累斯萨拉姆",
                 CAPITAL_CH: "达累斯萨拉姆",
                 CAPITAL_EN: "Dar es Salaam",
                 CAPITAL_LO: "Dodoma",
                 CAP_POP: "2698652.0",
                 COUNTRY: "坦桑尼亚",
                 COUNTRY_CH: "坦桑尼亚",
                 COUNTRY_EN: "Tanzania",
                 ID: 49,
                 POP: "2698652.0",
                 SMGEOMETRYSIZE: "16",
                 SMID: "49",
                 SMLIBTILEID: "1",
                 SMUSERID: "0",
                 SMX: "39.253347298189766",
                 SMY: "-6.817356064000194",
                 USERID: "0"
                 }));*/
                GeoCodingService.destroy();
                done();
            } catch (exception) {
                console.log("leafletAddressService_'successEvent:GeoCoding'案例失败：" + exception.name + ":" + exception.message);
                GeoCodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    it('successEvent:GeoDecoding', function (done) {
        var GeoDecodingParams = new SuperMap.GeoDecodingParameter({
            x: 116.3518541194752,
            y: 40.00097839595237,
            fromIndex: 0,
            toIndex: 10,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1,
            geoDecodingRadius: 500
        });
        var GeoDecodingService = L.supermap.AddressService(addressMatchURL, options).decode(GeoDecodingParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(GeoDecodingService).not.toBeNull();
                expect(GeoDecodingService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                /*expect(serviceResult.object.url).toBe("http://localhost:8090/iserver/services/data-world/rest/data/featureResults.jsonp?");
                 expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                 expect(serviceResult.result).not.toBeNull();
                 expect(serviceResult.result.succeed).toBeTruthy();
                 expect(serviceResult.result.featureCount).toEqual(7);
                 expect(serviceResult.result.totalCount).toEqual(7);
                 expect(serviceResult.result.features.type).toBe("FeatureCollection");
                 expect(serviceResult.result.features.features.length).toEqual(7);
                 for (var i = 0; i < serviceResult.result.features.features.length; i++) {
                 expect(serviceResult.result.features.features[i].type).toBe("Feature");
                 expect(serviceResult.result.features.features[i].geometry.type).toBe("Point");
                 expect(serviceResult.result.features.features[i].geometry.coordinates.length).toEqual(2);
                 }
                 expect(serviceResult.result.features.features[0].properties).toEqual(Object({
                 CAPITAL: "达累斯萨拉姆",
                 CAPITAL_CH: "达累斯萨拉姆",
                 CAPITAL_EN: "Dar es Salaam",
                 CAPITAL_LO: "Dodoma",
                 CAP_POP: "2698652.0",
                 COUNTRY: "坦桑尼亚",
                 COUNTRY_CH: "坦桑尼亚",
                 COUNTRY_EN: "Tanzania",
                 ID: 49,
                 POP: "2698652.0",
                 SMGEOMETRYSIZE: "16",
                 SMID: "49",
                 SMLIBTILEID: "1",
                 SMUSERID: "0",
                 SMX: "39.253347298189766",
                 SMY: "-6.817356064000194",
                 USERID: "0"
                 }));*/
                GeoDecodingService.destroy();
                done();
            } catch (exception) {
                console.log("leafletAddressService_'successEvent:GeoDecoding'案例失败：" + exception.name + ":" + exception.message);
                GeoDecodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
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
        var GeoCodingService = L.supermap.AddressService(addressMatchURL, options).code(GeoCodingParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(GeoCodingService).not.toBeNull();
                expect(GeoCodingService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.url).toBe("http://localhost:8090/iserver/services/data-world/rest/data/featureResults.jsonp?returnContent=true");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                //expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                GeoCodingService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByBoundsService_'failEvent:datasetNotExist'案例失败：" + exception.name + ":" + exception.message);
                GeoCodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:GeoDecodingAddressNull', function (done) {
        var GeoCodingParams = new SuperMap.GeoCodingParameter({
            address: null,
            fromIndex: 0,
            toIndex: 10,
            filters: '北京市,海淀区',
            prjCoordSys: '{epsgcode:4326}',
            maxReturn: -1
        });
        var GeoCodingService = L.supermap.AddressService(addressMatchURL, options).code(GeoCodingParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(GeoCodingService).not.toBeNull();
                expect(GeoCodingService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.url).toBe("http://localhost:8090/iserver/services/data-world/rest/data/featureResults.jsonp?returnContent=true");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                //expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                GeoCodingService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByBoundsService_'failEvent:datasetNotExist'案例失败：" + exception.name + ":" + exception.message);
                GeoCodingService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

});


