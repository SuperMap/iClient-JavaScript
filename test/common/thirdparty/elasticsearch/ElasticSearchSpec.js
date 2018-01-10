require('../../../../src/common/thirdparty/elasticsearch/ElasticSearch.js');

describe('ElasticSearch', function () {
    it('constructor, setGeoFence', function () {
        var elasticSearch = new SuperMap.ElasticSearch();
        expect(elasticSearch.geoFence).toBeNull();
        var points = [new SuperMap.Geometry.Point(0, 4010338),
            new SuperMap.Geometry.Point(1063524, 4010338),
            new SuperMap.Geometry.Point(1063524, 3150322),
            new SuperMap.Geometry.Point(0, 3150322)
        ];
        var linearRings = new SuperMap.Geometry.LinearRing(points);
        var geoFence = new SuperMap.Geometry.Polygon([linearRings]);
        elasticSearch.setGeoFence(geoFence);
        expect(elasticSearch.geoFence).not.toBeNull();
        expect(elasticSearch.geoFence.CLASS_NAME).toBe("SuperMap.Geometry.Polygon");
        expect(elasticSearch.geoFence.componentTypes).not.toBeNull();
        expect(elasticSearch.geoFence.components).not.toBeNull();
        expect(elasticSearch.geoFence.id).not.toBeNull();
    })
});