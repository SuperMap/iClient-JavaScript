import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {GeoRelationAnalystParameters} from '../../../src/common/iServer/GeoRelationAnalystParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {SpatialRelationType} from '../../../src/common/REST';
import {FetchRequest} from "@supermap/iclient-common";

var originalTimeout, serviceResults;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;
describe('openlayers_SpatialAnalystService_geoRelationAnalysis', () => {
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
        var service = new SpatialAnalystService(changchunServiceUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(changchunServiceUrl + "/datasets/Park@Changchun/georelation.json?returnContent=true");
            var expectParams = `{'dataset':"Park@Changchun",'sourceFilter':{'attributeFilter':"SMID%26gt;0",'name':null,'joinItems':null,'linkItems':null,'ids':null,'orderBy':null,'groupBy':null,'fields':null},'referenceFilter':{'attributeFilter':"SMID%26gt;0",'name':"Frame_R@Changchun",'joinItems':null,'linkItems':null,'ids':null,'orderBy':null,'groupBy':null,'fields':null},'spatialRelationType':"INTERSECT",'isBorderInside':true,'returnFeature':false,'returnGeoRelatedOnly':true,'startRecord':0,'expectCount':5}`;
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var geoRelationAnalystEscapedJson = `[{"result":[1],"count":1,"source":1},{"result":[1],"count":1,"source":2},{"result":[1],"count":1,"source":3},{"result":[1],"count":1,"source":4},{"result":[1],"count":1,"source":5}]`;
            return Promise.resolve(new Response(geoRelationAnalystEscapedJson));
        });
        service.geoRelationAnalysis(geoRelationAnalystParameters, (result) => {
            serviceResults = result;
        });
        setTimeout(() => {
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
        }, 5000)
    });
});