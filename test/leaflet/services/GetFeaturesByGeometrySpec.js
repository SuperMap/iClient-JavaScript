import {featureService} from '../../../src/leaflet/services/FeatureService';
import {GetFeaturesByGeometryParameters} from '../../../src/common/iServer/GetFeaturesByGeometryParameters';

var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};

describe('leaflet_FeatureService_getFeaturesByGeometry', () => {
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

    it('successEvent:getFeaturesByGeometry_returnContent=true', (done) => {
        var polygon = L.polygon([[0, 0], [-30, 0], [-10, 30], [0, 0]]);
        var getFeaturesByGeometryParams = new GetFeaturesByGeometryParameters({
            returnContent: true,
            datasetNames: ["World:Countries"],
            geometry: polygon,
            spatialQueryMode: "INTERSECT"
        });
        var getFeaturesByGeometryService = featureService(dataServiceURL, options);
        getFeaturesByGeometryService.getFeaturesByGeometry(getFeaturesByGeometryParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(getFeaturesByGeometryService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.featureCount).toEqual(6);
                expect(serviceResult.result.totalCount).toEqual(6);
                expect(serviceResult.result.features.type).toBe("FeatureCollection");
                expect(serviceResult.result.features.features.length).toEqual(6);
                for (var i = 0; i < serviceResult.result.features.features.length; i++) {
                    expect(serviceResult.result.features.features[i].type).toBe("Feature");
                    expect(serviceResult.result.features.features[i].geometry.type).toBe("MultiPolygon");
                }
                expect(serviceResult.result.features.features[0].geometry.coordinates.length).toEqual(2);
                expect(serviceResult.result.features.features[0].properties).toEqual(Object({
                    CAPITAL: "利伯维尔",
                    COLORID: "3",
                    COLOR_MAP: "2",
                    CONTINENT: "非洲",
                    COUNTRY: "加蓬",
                    ID: 127,
                    POP_1994: "1561195.0",
                    SMAREA: "2.6069257614190192E11",
                    SMGEOMETRYSIZE: "7852",
                    SMID: "127",
                    SMPERIMETER: "4057062.431196515",
                    SMSDRIE: "14.519582",
                    SMSDRIN: "2.3178983",
                    SMSDRIS: "-3.9252772",
                    SMSDRIW: "8.700832",
                    SMUSERID: "133",
                    SQKM: "261859.89",
                    SQMI: "101104.11"
                }));
                getFeaturesByGeometryService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByGeometryService_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByGeometryService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    it('successEvent:getFeaturesByGeometry_returnContent=false', (done) => {
        var polygon = L.polygon([[0, 0], [-30, 0], [-10, 30], [0, 0]]);
        var getFeaturesByGeometryParams = new GetFeaturesByGeometryParameters({
            returnContent: false,
            datasetNames: ["World:Countries"],
            geometry: polygon,
            spatialQueryMode: "INTERSECT"
        });
        var getFeaturesByGeometryService = featureService(dataServiceURL, options);
        getFeaturesByGeometryService.getFeaturesByGeometry(getFeaturesByGeometryParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByGeometryService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                getFeaturesByGeometryService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByGeometryService_'successEvent:returnContent=false'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByGeometryService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:getFeaturesByGeometry_datasetNotExist', (done) => {
        var getFeaturesByGeometryParams = new GetFeaturesByGeometryParameters({
            queryParameter: {
                name: "Countries@World",
                attributeFilter: "SMID>0"
            },
            datasetNames: ["World1:Countries"]
        });
        var getFeaturesByGeometryService = featureService(dataServiceURL, options);
        getFeaturesByGeometryService.getFeaturesByGeometry(getFeaturesByGeometryParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(getFeaturesByGeometryService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                getFeaturesByGeometryService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByGeometryService_'failEvent:datasetNotExist'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByGeometryService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:getFeaturesByGeometry_queryParamsNull', (done) => {
        var getFeaturesByGeometryParams = new GetFeaturesByGeometryParameters({
            queryParameter: null,
            datasetNames: ["World:Countries"]
        });
        var getFeaturesByGeometryService = featureService(dataServiceURL, options);
        getFeaturesByGeometryService.getFeaturesByGeometry(getFeaturesByGeometryParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(getFeaturesByGeometryService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                //expect(serviceResult.error.errorMsg).toBe("在FeatureResults资源中，检查请求体时，发现Queryparam为空。");
                getFeaturesByGeometryService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByGeometryService_'failEvent:queryParameterNull'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByGeometryService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    })
});

