import {FeatureService} from '../../../src/openlayers/services/FeatureService';
import {GetFeaturesBySQLParameters} from '../../../src/common/iServer/GetFeaturesBySQLParameters';

var featureServiceURL = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};
describe('openlayers_FeatureService_getFeaturesBySQL', () => {
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

    //数据集SQL查询服务
    it('getFeaturesBySQL', (done) => {
        var sqlParam = new GetFeaturesBySQLParameters({
            queryParameter: {
                name: "Countries@World",
                attributeFilter: "SMID = 247"
            },
            datasetNames: ["World:Countries"]
        });
        var getFeaturesBySQLService = new FeatureService(featureServiceURL, options);
        getFeaturesBySQLService.getFeaturesBySQL(sqlParam, (result) => {
            serviceResult = result;
            setTimeout(() => {
                try {
                    expect(getFeaturesBySQLService).not.toBeNull();
                    expect(serviceResult).not.toBeNull();
                    expect(serviceResult.type).toBe("processCompleted");
                    expect(serviceResult.result.succeed).toBe(true);
                    expect(serviceResult.result.featureCount).toEqual(1);
                    expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                    expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                    var features = serviceResult.result.features.features;
                    expect(features.length).not.toBeNull();
                    expect(features[0].id).not.toBeNull();
                    expect(features[0].type).toEqual("Feature");
                    expect(features[0].properties.CAPITAL).toEqual("北京");
                    expect(features[0].geometry.type).toEqual("MultiPolygon");
                    expect(features[0].geometry.coordinates.length).toBeGreaterThan(0);
                    expect(features[0].geometry.coordinates[0][0].length).toBeGreaterThan(0);
                    for (var i = 0; i < features[0].geometry.coordinates[0][0].length; i++) {
                        expect(features[0].geometry.coordinates[0][0][i].length).toEqual(2);
                    }
                    done();
                } catch (exception) {
                    console.log("'getFeaturesBySQL'案例失败" + exception.name + ":" + exception.message);
                    expect(false).toBeTruthy();
                    done();
                }
            }, 5000);
        });
    });
});