import {featureService} from '../../../src/leaflet/services/FeatureService';
import {GetFeaturesByBoundsParameters} from '../../../src/common/iServer/GetFeaturesByBoundsParameters';

var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};

describe('leaflet_FeatureService_getFeaturesByBounds', () => {
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

    it('successEvent:getFeaturesByBounds_returnContent=true', (done) => {
        var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
        var getFeaturesByBoundsParams = new GetFeaturesByBoundsParameters({
            datasetNames: ["World:Capitals"],
            bounds: polygon.getBounds(),
            returnContent: true
        });
        var getFeaturesByBoundsService = featureService(dataServiceURL, options);
        getFeaturesByBoundsService.getFeaturesByBounds(getFeaturesByBoundsParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByBoundsService).not.toBeNull();
                expect(getFeaturesByBoundsService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
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
                }));
                getFeaturesByBoundsService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByBoundsService_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByBoundsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    it('successEvent:getFeaturesByBounds_returnContent=false', (done) => {
        var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
        var getFeaturesByBoundsParams = new GetFeaturesByBoundsParameters({
            datasetNames: ["World:Capitals"],
            bounds: polygon.getBounds(),
            returnContent: false
        });
        var getFeaturesByBoundsService = featureService(dataServiceURL, options);
        getFeaturesByBoundsService.getFeaturesByBounds(getFeaturesByBoundsParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByBoundsService).not.toBeNull();
                expect(getFeaturesByBoundsService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                getFeaturesByBoundsService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByBoundsService_'successEvent:returnContent=false'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByBoundsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:getFeaturesByBounds_datasetNotExist', (done) => {
        var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
        var getFeaturesByBoundsParams = new GetFeaturesByBoundsParameters({
            datasetNames: ["World1:Capitals"],
            bounds: polygon.getBounds()
        });
        var getFeaturesByBoundsService = featureService(dataServiceURL, options);
        getFeaturesByBoundsService.getFeaturesByBounds(getFeaturesByBoundsParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByBoundsService).not.toBeNull();
                expect(getFeaturesByBoundsService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                getFeaturesByBoundsService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByBoundsService_'failEvent:datasetNotExist'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByBoundsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });
});

