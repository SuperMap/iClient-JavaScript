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
  
  it('constructor with invalid es parameter', () => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    expect(() => {
      new ElasticSearch(dataUrl, null);
    }).toThrowError('Please enter the global variable of @elastic/elasticsearch@5.6.22 or elasticsearch@16.7.3 for the second parameter!');
  });
  
  it('setGeoFence', () => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    var geoFence = { 
      radius: 1000,
      center: [104.40, 30.43],
      unit: 'meter'
    };
    elasticSearch.setGeoFence(geoFence);
    expect(elasticSearch.geoFence).toEqual(geoFence);
  });
  
  it('clearScroll', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.client, 'clearScroll').and.callFake(function (params, callback) {
      const resp = { succeeded: true };
      callback(null, resp);
    });
    elasticSearch.clearScroll({}, function (err, result) {
      expect(result.succeeded).toBe(true);
      done();
    });
  });
  
  it('count', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.client, 'count').and.callFake(function (params, callback) {
      const resp = { count: 10 };
      callback(null, resp);
    });
    elasticSearch.count({}, function (err, result) {
      expect(result.count).toBe(10);
      done();
    });
  });
  
  it('create', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.client, 'create').and.callFake(function (params, callback) {
      const resp = { result: 'created' };
      callback(null, resp);
    });
    elasticSearch.create({}, function (err, result) {
      expect(result.result).toBe('created');
      done();
    });
  });
  
  it('delete', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.client, 'delete').and.callFake(function (params, callback) {
      const resp = { result: 'deleted' };
      callback(null, resp);
    });
    elasticSearch.delete({}, function (err, result) {
      expect(result.result).toBe('deleted');
      done();
    });
  });
  
  it('deleteByQuery', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.client, 'deleteByQuery').and.callFake(function (params, callback) {
      const resp = { deleted: 5 };
      callback(null, resp);
    });
    elasticSearch.deleteByQuery({}, function (err, result) {
      expect(result.deleted).toBe(5);
      done();
    });
  });
  
  it('exists', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.client, 'exists').and.callFake(function (params, callback) {
      const resp = true;
      callback(null, resp);
    });
    elasticSearch.exists({}, function (err, result) {
      expect(result).toBe(true);
      done();
    });
  });
  
  it('get', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.client, 'get').and.callFake(function (params, callback) {
      const resp = { _source: { id: '1', name: 'test' } };
      callback(null, resp);
    });
    elasticSearch.get({}, function (err, result) {
      expect(result._source.name).toBe('test');
      done();
    });
  });
  
  it('index', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.client, 'index').and.callFake(function (params, callback) {
      const resp = { result: 'indexed' };
      callback(null, resp);
    });
    elasticSearch.index({}, function (err, result) {
      expect(result.result).toBe('indexed');
      done();
    });
  });
  
  it('mget', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.client, 'mget').and.callFake(function (params, callback) {
      const resp = { docs: [{ _source: { id: '1' } }, { _source: { id: '2' } }] };
      callback(null, resp);
    });
    elasticSearch.mget({}, function (err, result) {
      expect(result.docs.length).toBe(2);
      done();
    });
  });
  
  it('ping', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.client, 'ping').and.callFake(function (params, callback) {
      callback(null, true);
    });
    elasticSearch.ping({}, function (err, result) {
      expect(result).toBe(true);
      done();
    });
  });
  
  it('scroll', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.client, 'scroll').and.callFake(function (params, callback) {
      const resp = { hits: { hits: [] } };
      callback(null, resp);
    });
    elasticSearch.scroll({}, function (err, result) {
      expect(result.hits).not.toBeNull();
      done();
    });
  });
  
  it('searchShards', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.client, 'searchShards').and.callFake(function (params, callback) {
      const resp = { shards: {} };
      callback(null, resp);
    });
    elasticSearch.searchShards({}, function (err, result) {
      expect(result.shards).not.toBeNull();
      done();
    });
  });
  
  it('suggest', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.client, 'suggest').and.callFake(function (params, callback) {
      const resp = { suggestions: [] };
      callback(null, resp);
    });
    elasticSearch.suggest({}, function (err, result) {
      expect(result.suggestions).not.toBeNull();
      done();
    });
  });
  
  it('update', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.client, 'update').and.callFake(function (params, callback) {
      const resp = { result: 'updated' };
      callback(null, resp);
    });
    elasticSearch.update({}, function (err, result) {
      expect(result.result).toBe('updated');
      done();
    });
  });
  
  it('_handleCallback with body wrapper', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    var callback = jasmine.createSpy('callback');
    var wrappedCallback = elasticSearch._handleCallback(callback);
    
    // 模拟带body包装的响应
    wrappedCallback(null, { body: { test: true }, statusCode: 200 });
    
    expect(callback).toHaveBeenCalledWith(null, { test: true }, 200, undefined);
    done();
  });
  
  it('_handleCallback without body wrapper', (done) => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    var callback = jasmine.createSpy('callback');
    var wrappedCallback = elasticSearch._handleCallback(callback);
    
    // 模拟不带body包装的响应
    wrappedCallback(null, { test: true });
    
    expect(callback).toHaveBeenCalledWith(null, { test: true });
    done();
  });
  
  it('_update without data', () => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.events, 'triggerEvent');
    
    elasticSearch._update(null, null);
    
    expect(elasticSearch.events.triggerEvent).not.toHaveBeenCalled();
  });
  
  it('_update with data and callback', () => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    spyOn(elasticSearch.events, 'triggerEvent');
    
    var callback = jasmine.createSpy('callback');
    var testData = { test: true };
    
    elasticSearch._update(testData, callback);
    
    expect(elasticSearch.events.triggerEvent).toHaveBeenCalledWith('change', { data: testData });
    expect(callback).toHaveBeenCalledWith(undefined, { responses: testData });
  });
  
  it('_distance calculation', () => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    
    var distance = elasticSearch._distance(0, 0, 3, 4); // Should be 5 (3-4-5 triangle)
    
    expect(distance).toBe(5);
  });
  
  it('_getMeterPerMapUnit meter', () => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    
    var meterPerUnit = elasticSearch._getMeterPerMapUnit('meter');
    
    expect(meterPerUnit).toBe(1);
  });
  
  it('_getMeterPerMapUnit degree', () => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es);
    
    var meterPerUnit = elasticSearch._getMeterPerMapUnit('degree');
    
    // Earth's circumference in meters divided by 360 degrees
    expect(meterPerUnit).toBe(Math.PI * 2 * 6378137 / 360);
  });
  
  it('_validateData with out of fence data', () => {
    var dataUrl = 'https://fake.iclient.supermap.io/es';
    var elasticSearch = new ElasticSearch(dataUrl, es, {
      openGeoFence: true,
      geoFence: {
        radius: 1000,
        center: [104.40, 30.43],
        unit: 'meter'
      }
    });
    
    spyOn(elasticSearch, 'outOfGeoFence');
    spyOn(elasticSearch.events, 'triggerEvent');
    
    var testData = {
      hits: {
        hits: [{
          _source: {
            x: 104.42, // Far away from center
            y: 30.45
          }
        }]
      }
    };
    
    elasticSearch._validateData(testData);
    
    expect(elasticSearch.outOfGeoFence).toHaveBeenCalled();
    expect(elasticSearch.events.triggerEvent).toHaveBeenCalledWith('outOfGeoFence', { data: testData });
  });
});