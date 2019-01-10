import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {GeoRelationAnalystParameters} from '../../../src/common/iServer/GeoRelationAnalystParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {SpatialRelationType} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.spatialAnalystURL_Changchun;

describe('leaflet_SpatialAnalystService_geoRelationAnalysis', () => {
    var serviceResults;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    //空间关系分析
    it('geoRelationAnalysis', (done) => {
        var geoRelationAnalystParameters = new GeoRelationAnalystParameters({
            dataset: "Park@Changchun",
            startRecord: 0,
            expectCount: 5,
            //空间关系分析中的源数据集查询参数
            sourceFilter: new FilterParameter({attributeFilter: "SMID>0"}),
            referenceFilter: new FilterParameter({name: "Frame_R@Changchun", attributeFilter: "SMID>0"}),
            spatialRelationType: SpatialRelationType.INTERSECT,
            //位于面边线上的点是否被面包含
            isBorderInside: true,
            //是否返回Feature信息
            returnFeature: false,
            returnGeoRelatedOnly: true
        });
        var service = spatialAnalystService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/datasets/Park@Changchun/georelation.json?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.spatialRelationType).toBe("INTERSECT");
            // expect(params).toContain("'spatialRelationType':\"INTERSECT\"");
            expect(options).not.toBeNull();
            var geoRelationAnalystEscapedJson = `[{"result":[1],"count":1,"source":1},{"result":[1],"count":1,"source":2},{"result":[1],"count":1,"source":3},{"result":[1],"count":1,"source":4},{"result":[1],"count":1,"source":5}]`;
            return Promise.resolve(new Response(geoRelationAnalystEscapedJson));
        });
        service.geoRelationAnalysis(geoRelationAnalystParameters, (result) => {
            serviceResults = result;
            expect(service).not.toBeNull();
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toEqual("processCompleted");
            expect(serviceResults.result.succeed).toBeTruthy();
            expect(serviceResults.result.length).toEqual(5);
            for (var i = 0; i < serviceResults.result.length; i++) {
                expect(serviceResults.result[i].count).toEqual(1);
                expect(serviceResults.result[i].source).toEqual(i + 1);
                expect(serviceResults.result[i].result.length).toEqual(1);
            }
            done();
        });
    });
});