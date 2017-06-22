require('../../../src/leaflet/services/FeatureService');

var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};

describe('leaflet_testFeatureService_getFeaturesByIDs', function () {
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

    it('successEvent:returnContent=true', function (done) {
        var getFeaturesByIDsParams = new SuperMap.GetFeaturesByIDsParameters({
            returnContent: true,
            datasetNames: ["World:Capitals"],
            IDs: [1, 2, 3]
        });
        var getFeaturesByIDsService = L.supermap.featureService(dataServiceURL, options).getFeaturesByIDs(getFeaturesByIDsParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(getFeaturesByIDsService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.featureCount).toEqual(3);
                expect(serviceResult.result.totalCount).toEqual(3);
                expect(serviceResult.result.features.type).toBe("FeatureCollection");
                expect(serviceResult.result.features.features.length).toEqual(3);
                for (var i = 0; i < serviceResult.result.features.features.length; i++) {
                    expect(serviceResult.result.features.features[i].type).toBe("Feature");
                    expect(serviceResult.result.features.features[i].geometry.type).toBe("Point");
                    expect(serviceResult.result.features.features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(serviceResult.result.features.features[0].properties).toEqual(Object({
                    CAPITAL: "巴西利亚",
                    CAPITAL_CH: "巴西利亚",
                    CAPITAL_EN: "Brasilia",
                    CAPITAL_LO: "Brasília",
                    CAP_POP: "2207718.0",
                    COUNTRY: "巴西",
                    COUNTRY_CH: "巴西",
                    COUNTRY_EN: "Brazil",
                    ID: 1,
                    POP: "2207718.0",
                    SMGEOMETRYSIZE: "16",
                    SMID: "1",
                    SMLIBTILEID: "1",
                    SMUSERID: "0",
                    SMX: "-47.8977476573595",
                    SMY: "-15.792110943058866",
                    USERID: "0"
                }));
                getFeaturesByIDsService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByIDsService_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByIDsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });


    it('successEvent:returnContent=false', function (done) {
        var getFeaturesByIDsParams = new SuperMap.GetFeaturesByIDsParameters({
            returnContent: false,
            datasetNames: ["World:Capitals"],
            IDs: [1, 2, 3]
        });
        var getFeaturesByIDsService = L.supermap.featureService(dataServiceURL, options).getFeaturesByIDs(getFeaturesByIDsParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(getFeaturesByIDsService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                getFeaturesByIDsService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByIDsService_'successEvent:returnContent=false'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByIDsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:datasetNotExist', function (done) {
        var getFeaturesByIDsParams = new SuperMap.GetFeaturesByIDsParameters({
            datasetNames: ["World1:Capitals"],
            IDs: [1, 2, 3]
        });
        var getFeaturesByIDsService = L.supermap.featureService(dataServiceURL, options).getFeaturesByIDs(getFeaturesByIDsParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(getFeaturesByIDsService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                getFeaturesByIDsService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByIDsService_'failEvent:datasetNotExist'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByIDsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:datasetNamesNull', function (done) {
        var getFeaturesByIDsParams = new SuperMap.GetFeaturesByIDsParameters({
            datasetNames: null
        });
        var getFeaturesByIDsService = L.supermap.featureService(dataServiceURL, options).getFeaturesByIDs(getFeaturesByIDsParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(getFeaturesByIDsService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("在FeatureResults中，在检验请求体时，请求体参数datasetNames为空");
                getFeaturesByIDsService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByIDsService_'failEvent:datasetNamesNull'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByIDsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    })
});

