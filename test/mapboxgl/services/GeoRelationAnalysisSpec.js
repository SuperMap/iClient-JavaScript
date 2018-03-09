import {SpatialAnalystService} from '../../../src/mapboxgl/services/SpatialAnalystService';
import {GeoRelationAnalystParameters} from '../../../src/common/iServer/GeoRelationAnalystParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {SpatialRelationType} from '../../../src/common/REST';

var url = GlobeParameter.spatialAnalystURL_Changchun;
describe('mapboxgl_SpatialAnalystService_geoRelationAnalysis', () => {
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
        var service = new SpatialAnalystService(url);
        service.geoRelationAnalysis(geoRelationAnalystParameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            expect(service).not.toBeNull();
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toEqual("processCompleted");
            expect(serviceResult.result.succeed).toEqual(true);
            expect(serviceResult.result.length).toEqual(5);
            for (var i = 0; i < serviceResult.result.length; i++) {
                expect(serviceResult.result[i].count).toEqual(1);
                expect(serviceResult.result[i].source).toEqual(i + 1);
                expect(serviceResult.result[i].result.length).toEqual(1);
            }
            done();
        }, 5000)
    });
});