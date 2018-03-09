import ol from 'openlayers';
import {FeatureService} from '../../../src/openlayers/services/FeatureService';
import {GetFeaturesByBufferParameters} from '../../../src/common/iServer/GetFeaturesByBufferParameters';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

var featureServiceURL = "http://supermap:8090/iserver/services/data-world/rest/data";
var options = {
    serverType: 'iServer'
};
describe('openlayers_FeatureService_getFeaturesByBuffer', () => {
    var serviceResult = null;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        serviceResult = null;
    });

    //数据集Buffer查询服务
    it('getFeaturesByBuffer', (done) => {
        var polygon = new ol.geom.Polygon([[[-20, 20], [-20, -20], [20, -20], [20, 20], [-20, 20]]]);
        var bufferParam = new GetFeaturesByBufferParameters({
            datasetNames: ["World:Capitals"],
            bufferDistance: 10,
            geometry: polygon,
            fromIndex: 1,
            toIndex: 3
        });
        var getFeaturesByBuffeService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(featureServiceURL + "/featureResults.json?returnContent=true&fromIndex=1&toIndex=3");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(getFeasByBuffer));
        });
        getFeaturesByBuffeService.getFeaturesByBuffer(bufferParam, (testResult) => {
            serviceResult = testResult;
            expect(getFeaturesByBuffeService).not.toBeNull();
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.object.format).toBe("GEOJSON");
            var result = serviceResult.result;
            expect(result.succeed).toBe(true);
            expect(result.featureCount).toEqual(29);
            expect(result.totalCount).toEqual(29);
            expect(serviceResult.result.features.type).toEqual("FeatureCollection");
            var features = result.features.features;
            expect(features.length).toEqual(3);
            expect(features[0].id).toEqual(18);
            expect(features[1].id).toEqual(19);
            expect(features[2].id).toEqual(20);
            for (var i = 0; i < features.length; i++) {
                expect(features[i].type).toEqual("Feature");
                expect(features[i].properties).not.toBeNull();
                expect(features[i].geometry.type).toEqual("Point");
                expect(features[i].geometry.coordinates.length).toEqual(2);
            }
            bufferParam.destroy();
            done();
        });
    });
});