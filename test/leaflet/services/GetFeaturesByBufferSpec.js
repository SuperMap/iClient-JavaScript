import {featureService} from '../../../src/leaflet/services/FeatureService';
import {GetFeaturesByBufferParameters} from '../../../src/common/iServer/GetFeaturesByBufferParameters';

var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};

describe('leaflet_FeatureService_getFeaturesByBuffer', () => {
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

    it('successEvent:getFeaturesByBuffer_returnContent=true', (done) => {
        var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
        var getFeaturesByBufferParams = new GetFeaturesByBufferParameters({
            returnContent: true,
            datasetNames: ["World:Capitals"],
            attributeFilter: "SMID>0",
            bufferDistance: 30,
            geometry: polygon,
            fromIndex: 0,
            toIndex: 19
        });
        var getFeaturesByBufferService = featureService(dataServiceURL, options);
        getFeaturesByBufferService.getFeaturesByBuffer(getFeaturesByBufferParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByBufferService).not.toBeNull();
                expect(getFeaturesByBufferService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.featureCount).toBeGreaterThan(0);
                expect(serviceResult.result.totalCount).toBeGreaterThan(0);
                expect(serviceResult.result.features.type).toBe("FeatureCollection");
                expect(serviceResult.result.features.features.length).toEqual(20);
                for (var i = 0; i < serviceResult.result.features.features.length; i++) {
                    expect(serviceResult.result.features.features[i].type).toBe("Feature");
                    expect(serviceResult.result.features.features[i].geometry.type).toBe("Point");
                    expect(serviceResult.result.features.features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(serviceResult.result.features.features[0].properties).toEqual(Object({
                    CAPITAL: "圣多美",
                    CAPITAL_CH: "圣多美",
                    CAPITAL_EN: "Sao Tome",
                    CAPITAL_LO: "São Tomé",
                    CAP_POP: "53300.0",
                    COUNTRY: "圣多美和普林西比",
                    COUNTRY_CH: "圣多美和普林西比",
                    COUNTRY_EN: "Sao Tome & Principe",
                    ID: 19,
                    POP: "53300.0",
                    SMGEOMETRYSIZE: "16",
                    SMID: "19",
                    SMLIBTILEID: "1",
                    SMUSERID: "0",
                    SMX: "6.728004415891377",
                    SMY: "0.33699598913014484",
                    USERID: "0"
                }));
                getFeaturesByBufferService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByBufferService_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByBufferService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    it('successEvent:getFeaturesByBuffer_returnContent=false', (done) => {
        var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
        var getFeaturesByBufferParams = new GetFeaturesByBufferParameters({
            returnContent: false,
            datasetNames: ["World:Capitals"],
            attributeFilter: "SMID>0",
            bufferDistance: 30,
            geometry: polygon
        });
        var getFeaturesByBufferService = featureService(dataServiceURL, options);
        getFeaturesByBufferService.getFeaturesByBuffer(getFeaturesByBufferParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByBufferService).not.toBeNull();
                expect(getFeaturesByBufferService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                getFeaturesByBufferService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByBufferService_'successEvent:returnContent=false'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByBufferService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:getFeaturesByBuffer_datasetNotExist', (done) => {
        var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
        var getFeaturesByBufferParams = new GetFeaturesByBufferParameters({
            datasetNames: ["World1:Capitals"],
            attributeFilter: "SMID>0",
            bufferDistance: 30,
            geometry: polygon
        });
        var getFeaturesByBufferService = featureService(dataServiceURL, options);
        getFeaturesByBufferService.getFeaturesByBuffer(getFeaturesByBufferParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByBufferService).not.toBeNull();
                expect(getFeaturesByBufferService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                getFeaturesByBufferService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByBufferService_'failEvent:datasetNotExist'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByBufferService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:getFeaturesByBuffer_datasetNamesNull', (done) => {
        var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
        var getFeaturesByBufferParams = new GetFeaturesByBufferParameters({
            datasetNames: null,
            attributeFilter: "SMID>0",
            bufferDistance: 30,
            geometry: polygon
        });
        var getFeaturesByBufferService = featureService(dataServiceURL, options);
        getFeaturesByBufferService.getFeaturesByBuffer(getFeaturesByBufferParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByBufferService).not.toBeNull();
                expect(getFeaturesByBufferService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("在FeatureResults中，在检验请求体时，请求体参数datasetNames为空");
                getFeaturesByBufferService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("leafletGetFeaturesByBufferService_'failEvent:datasetNamesNull'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByBufferService.destroy();
                done();
            }
        }, 2000);
    })
});

