import { ElasticSearch } from '../../../../src/common/thirdparty/elasticsearch/ElasticSearch.js';
import es from 'elasticsearch';

export function mockES() {
  spyOn(es, 'Client').and.callFake(function () {
    const res = es.Client({
      host: ''
    });
    return res;
  });
}
describe('old ElasticSearch', () => {
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
      const resp = { responses: { aggregations: { zoomedInView: {} } } };
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
      const resp = { items: [] };
      callback('', resp);
      return { err: '', resp };
    });
    elasticSearch.bulk({}, function (err, result) {
      expect(result.items).not.toBeNull();
      done();
    });
  });
});