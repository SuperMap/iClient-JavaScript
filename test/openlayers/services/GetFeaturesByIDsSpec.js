import {FeatureService} from '../../../src/openlayers/services/FeatureService';
import {GetFeaturesByIDsParameters} from '../../../src/common/iServer/GetFeaturesByIDsParameters';

var featureServiceURL = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};
describe('openlayers_FeatureService_getFeaturesByIDs', () => {
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
    //数据集ID查询服务
    it('getFeaturesByIDs', (done) => {
        var idsParam = new GetFeaturesByIDsParameters({
            IDs: [246, 247],
            datasetNames: ["World:Countries"]
        });
        var getFeaturesByIDService = new FeatureService(featureServiceURL, options);
        getFeaturesByIDService.getFeaturesByIDs(idsParam, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByIDService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.featureCount).toEqual(2);
                expect(serviceResult.result.totalCount).toEqual(2);
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.features.features;
                expect(features.length).toEqual(2);
                for (var i = 0; i < 2; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].properties).not.toBeNull();
                    if (i = 0) {
                        expect(features[i].properties.CAPITAL).toEqual("新德里");
                    }
                    else if (i = 1) {
                        expect(features[i].properties.CAPITAL).toEqual("北京");
                    }
                    expect(features[i].geometry.type).toEqual("MultiPolygon");
                    expect(features[i].geometry.coordinates[0][0].length).toBeGreaterThan(0);
                    for (var j = 0; j < features[i].geometry.coordinates[0][0].length - 300; j++) {
                        expect(features[i].geometry.coordinates[0][0][j].length).toEqual(2);
                    }
                }
                done();
            } catch (exception) {
                console.log("'getFeaturesByIDs'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});