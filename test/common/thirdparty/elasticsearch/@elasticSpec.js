import { ElasticSearch } from '../../../../src/common/thirdparty/elasticsearch/ElasticSearch.js';
import { Point } from '../../../../src/common/commontypes/geometry/Point';
import { LinearRing } from '../../../../src/common/commontypes/geometry/LinearRing';
import { Polygon } from '../../../../src/common/commontypes/geometry/Polygon';
import es from '@elastic/elasticsearch';

describe('@elastic/ElasticSearch', () => {
  it('constructor, setGeoFence', () => {
    var elasticSearch = new ElasticSearch('https://fake.iclient.supermap.io/es', es);
    expect(elasticSearch.geoFence).toBeNull();
    var points = [
      new Point(0, 4010338),
      new Point(1063524, 4010338),
      new Point(1063524, 3150322),
      new Point(0, 3150322)
    ];
    var linearRings = new LinearRing(points);
    var geoFence = new Polygon([linearRings]);
    elasticSearch.setGeoFence(geoFence);
    expect(elasticSearch.geoFence).not.toBeNull();
    expect(elasticSearch.geoFence.CLASS_NAME).toBe('SuperMap.Geometry.Polygon');
    expect(elasticSearch.geoFence.componentTypes).not.toBeNull();
    expect(elasticSearch.geoFence.components).not.toBeNull();
    expect(elasticSearch.geoFence.id).not.toBeNull();
  });
  it('search', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    expect(elasticSearch.url).toBe(dataUrl);
    spyOn(elasticSearch.client, 'search').and.callFake(function () {
      const resp = { aggregations: { zoomedInView: {} } };
      return new Promise((resolve, reject) => {
        resolve(resp);
      });
    });
    elasticSearch.search({}).then(function (response) {
      expect(response.aggregations).not.toBeNull();
      done();
    });
  });
  it('msearch', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    expect(elasticSearch.url).toBe(dataUrl);
    spyOn(elasticSearch.client, 'msearch').and.callFake(function () {
      const resp = { body: { responses: {} } };
      return new Promise((resolve, reject) => {
        resolve(resp);
      });
    });
    elasticSearch.msearch({}).then(function (result) {
      expect(result.responses).not.toBeNull();
      done();
    });
  });
  it('bulk', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    expect(elasticSearch.url).toBe(dataUrl);
    spyOn(elasticSearch.client, 'bulk').and.callFake(function (params, callback) {
      const resp = { body: { items: [] } };
      callback('', resp);
      return { err: '', resp };
    });
    elasticSearch.bulk({}, function (err, result) {
      expect(result.items).not.toBeNull();
      done();
    });
  });
  it('no es', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    try {
      new ElasticSearch(dataUrl);
    } catch (e) {
      expect(e.message).toBe('Please enter the global variable of @elastic/elasticsearch@5.6.22 or elasticsearch@16.7.3 for the second parameter!');
    }
    try {
      new ElasticSearch(dataUrl, {});
    } catch (e) {
      expect(e.message).toBe('Please enter the global variable of @elastic/elasticsearch@5.6.22 or elasticsearch@16.7.3 for the second parameter!');
    }
    try {
      new ElasticSearch(dataUrl, function () {});
    } catch (e) {
      expect(e.message).toBe('Please enter the global variable of @elastic/elasticsearch@5.6.22 or elasticsearch@16.7.3 for the second parameter!');
      done();
    }
  });
});
