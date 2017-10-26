require('../../../src/mapboxgl/services/SpatialAnalystService');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.spatialAnalystURL_Changchun;
describe('mapboxgl_SpatialAnalystService_geoRelationAnalysis', function () {
    var serviceResults;
    var originalTimeout;     
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    //空间关系分析
    it('geoRelationAnalysis test', function (done) {
        var geoRelationAnalystParameters = new SuperMap.GeoRelationAnalystParameters({
            dataset: "Park@Changchun",
            startRecord: 0,
            expectCount: 5,
            //空间关系分析中的源数据集查询参数
            sourceFilter: new SuperMap.FilterParameter({attributeFilter: "SMID>0"}),
            referenceFilter: new SuperMap.FilterParameter({name: "Frame_R@Changchun", attributeFilter: "SMID>0"}),
            spatialRelationType: SuperMap.SpatialRelationType.INTERSECT,
            //位于面边线上的点是否被面包含
            isBorderInside: true,
            //是否返回Feature信息
            returnFeature: false,
            returnGeoRelatedOnly: true
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url);
        service.geoRelationAnalysis(geoRelationAnalystParameters, function (result) {
            serviceResults = result;
        });
        setTimeout(function () {
            expect(service).not.toBeNull();
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toEqual("processCompleted");
            expect(serviceResults.result.succeed).toEqual(true);
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