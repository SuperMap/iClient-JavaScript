import {ElasticSearch} from '../../../../src/common/thirdparty/elasticsearch/ElasticSearch.js';
import {Point} from '../../../../src/common/commontypes/geometry/Point';
import {LinearRing} from '../../../../src/common/commontypes/geometry/LinearRing';
import {Polygon} from '../../../../src/common/commontypes/geometry/Polygon';

describe('ElasticSearch', () => {
    it('constructor, setGeoFence', () => {
        var elasticSearch = new ElasticSearch();
        expect(elasticSearch.geoFence).toBeNull();
        var points = [new Point(0, 4010338),
            new Point(1063524, 4010338),
            new Point(1063524, 3150322),
            new Point(0, 3150322)
        ];
        var linearRings = new LinearRing(points);
        var geoFence = new Polygon([linearRings]);
        elasticSearch.setGeoFence(geoFence);
        expect(elasticSearch.geoFence).not.toBeNull();
        expect(elasticSearch.geoFence.CLASS_NAME).toBe("SuperMap.Geometry.Polygon");
        expect(elasticSearch.geoFence.componentTypes).not.toBeNull();
        expect(elasticSearch.geoFence.components).not.toBeNull();
        expect(elasticSearch.geoFence.id).not.toBeNull();
    })
});