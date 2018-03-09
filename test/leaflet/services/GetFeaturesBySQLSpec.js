import {featureService} from '../../../src/leaflet/services/FeatureService';
import {GetFeaturesBySQLParameters} from '../../../src/common/iServer/GetFeaturesBySQLParameters';

var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};

describe('leaflet_FeatureService_getFeaturesBySQL', () => {
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

    it('successEvent:getFeaturesBySQL_returnContent=true', (done) => {
        var getFeaturesBySQLParams = new GetFeaturesBySQLParameters({
            returnContent: true,
            queryParameter: {
                name: "Countries@World",
                attributeFilter: "SMID =247"
            },
            datasetNames: ["World:Countries"]
        });
        var getFeaturesBySQLService = featureService(dataServiceURL, options);
        getFeaturesBySQLService.getFeaturesBySQL(getFeaturesBySQLParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesBySQLService).not.toBeNull();
                expect(getFeaturesBySQLService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.featureCount).toEqual(1);
                expect(serviceResult.result.totalCount).toEqual(1);
                expect(serviceResult.result.features.type).toBe("FeatureCollection");
                expect(serviceResult.result.features.features.length).toEqual(1);
                expect(serviceResult.result.features.features[0].type).toBe("Feature");
                expect(serviceResult.result.features.features[0].geometry.type).toBe("MultiPolygon");
                expect(serviceResult.result.features.features[0].geometry.coordinates.length).toEqual(23);
                expect(serviceResult.result.features.features[0].properties).toEqual(Object({
                    SMID: '247',
                    SMSDRIW: '73.62005',
                    SMSDRIN: '53.55374',
                    SMSDRIE: '134.76846',
                    SMSDRIS: '18.168884',
                    SMUSERID: '220',
                    SMAREA: '9.474653104403307E12',
                    SMPERIMETER: '3.964840435482521E7',
                    SMGEOMETRYSIZE: '79904',
                    SQKM: '9367281.0',
                    SQMI: '3616707.25',
                    COLOR_MAP: '1',
                    CAPITAL: '北京',
                    COUNTRY: '中华人民共和国',
                    POP_1994: '1.128139689E9',
                    COLORID: '3',
                    CONTINENT: '亚洲',
                    ID: 247
                }));
                getFeaturesBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesBySQLService_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    it('successEvent:getFeaturesBySQL_returnContent=false', (done) => {
        var getFeaturesBySQLParams = new GetFeaturesBySQLParameters({
            returnContent: false,
            queryParameter: {
                name: "Countries@World",
                attributeFilter: "SMID>0"
            },
            datasetNames: ["World:Countries"]
        });
        var getFeaturesBySQLService = featureService(dataServiceURL, options);
        getFeaturesBySQLService.getFeaturesBySQL(getFeaturesBySQLParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesBySQLService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                getFeaturesBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesBySQLService_'successEvent:returnContent=false'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:getFeaturesBySQL_datasetNotExist', (done) => {
        var getFeaturesBySQLParams = new GetFeaturesBySQLParameters({
            queryParameter: {
                name: "Countries@World",
                attributeFilter: "SMID>0"
            },
            datasetNames: ["World1:Countries"]
        });
        var getFeaturesBySQLService = featureService(dataServiceURL, options);
        getFeaturesBySQLService.getFeaturesBySQL(getFeaturesBySQLParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesBySQLService).not.toBeNull();
                expect(getFeaturesBySQLService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                getFeaturesBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesBySQLService_'failEvent:datasetNotExist'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:getFeaturesBySQL_queryParameterNull', (done) => {
        var getFeaturesBySQLParams = new GetFeaturesBySQLParameters({
            queryParameter: null,
            datasetNames: ["World:Countries"]
        });
        var getFeaturesBySQLService = featureService(dataServiceURL, options);
        getFeaturesBySQLService.getFeaturesBySQL(getFeaturesBySQLParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesBySQLService).not.toBeNull();
                expect(getFeaturesBySQLService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("在FeatureResults资源中，检查请求体时，发现Queryparam为空。");
                getFeaturesBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leaflet_getFeaturesBySQL_'failEvent:queryParameterNull'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    })
});

