import { KnowledgeGraphService } from '../../../src/common/iServer/KnowledgeGraphService';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import '../../resources/KnowledgeGraphService';

var knowledgegraphURL = 'http://fake:8090/iserver/services/knowledgeGraph-test/restjsr/graph';
describe('KnowledgeGraphService', () => {
  var originalTimeout;
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('constructor, destroy', () => {
    var knowledgeGraphService = new KnowledgeGraphService(knowledgegraphURL);
    expect(knowledgeGraphService).not.toBeNull();
    expect(knowledgeGraphService.url).toEqual(knowledgegraphURL);
    knowledgeGraphService.destroy();
    expect(knowledgeGraphService.url).toBeNull();
  });

  it('headers', () => {
    let myHeaders = new Headers();
    var knowledgeGraphService = new KnowledgeGraphService(knowledgegraphURL, { headers: myHeaders });
    expect(knowledgeGraphService).not.toBeNull();
    expect(knowledgeGraphService.headers).not.toBeNull();
    knowledgeGraphService.destroy();
  });

  it('crossOrigin', () => {
    var knowledgeGraphService = new KnowledgeGraphService(knowledgegraphURL, { crossOrigin: false });
    expect(knowledgeGraphService).not.toBeNull();
    expect(knowledgeGraphService.crossOrigin).toBeFalsy();
    knowledgeGraphService.destroy();
  });

  it('query', (done) => {
    var knowledgeGraphService = new KnowledgeGraphService(knowledgegraphURL);
    spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
      expect(testUrl).toBe(knowledgegraphURL + '/query.json?cypherQuery=cypherQuery');
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(queryData));
    });
    knowledgeGraphService.query('cypherQuery', (res) => {
      try {
        expect(knowledgeGraphService).not.toBeNull();
        expect(res).not.toBeNull();
        expect(res.type).toBe('processCompleted');
        expect(res.result).not.toBeNull();
        expect(res.result.length).toEqual(5);
        knowledgeGraphService.destroy();
        done();
      } catch (exception) {
        console.log("'query'案例失败：" + exception.name + ':' + exception.message);
        knowledgeGraphService.destroy();
        expect(false).toBeTruthy();
        done();
      }
    });
  });
  it('getGraphMap', (done) => {
    var knowledgeGraphService = new KnowledgeGraphService(knowledgegraphURL);
    spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
      expect(testUrl).toBe(knowledgegraphURL + '/graphmaps/xxx图谱.json');
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(graphmapData));
    });
    knowledgeGraphService.getGraphMap('xxx图谱', (res) => {
      try {
        expect(knowledgeGraphService).not.toBeNull();
        expect(res).not.toBeNull();
        expect(res.type).toBe('processCompleted');
        expect(res.result).not.toBeNull();
        knowledgeGraphService.destroy();
        done();
      } catch (exception) {
        console.log("'getGraphMap'案例失败：" + exception.name + ':' + exception.message);
        knowledgeGraphService.destroy();
        expect(false).toBeTruthy();
        done();
      }
    });
  });
  it('getGraphMaps', (done) => {
    var knowledgeGraphService = new KnowledgeGraphService(knowledgegraphURL);
    spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
      expect(testUrl).toBe(knowledgegraphURL + '/graphmaps.json');
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(graphmaps));
    });
    knowledgeGraphService.getGraphMaps((res) => {
      try {
        expect(knowledgeGraphService).not.toBeNull();
        expect(res).not.toBeNull();
        expect(res.type).toBe('processCompleted');
        expect(res.result).not.toBeNull();
        knowledgeGraphService.destroy();
        done();
      } catch (exception) {
        console.log("'getGraphMaps'案例失败：" + exception.name + ':' + exception.message);
        knowledgeGraphService.destroy();
        expect(false).toBeTruthy();
        knowledgeGraphService.destroy();
        done();
      }
    });
  });
  it('getGraphMapData', (done) => {
    var knowledgeGraphService = new KnowledgeGraphService(knowledgegraphURL);
    spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
      if (testUrl.includes('/query.json')) {
        return Promise.resolve(new Response(queryData));
      }
      if (testUrl === knowledgegraphURL + '/graphmaps/xxx图谱.json') {
        expect(testUrl).toBe(knowledgegraphURL + '/graphmaps/xxx图谱.json');
        return Promise.resolve(new Response(graphmapData));
      }
    });
    knowledgeGraphService
      .getGraphMapData('xxx图谱')
      .then((res) => {
        expect(res).not.toBeNull();
        done();
      })
      .catch((res) => {
        console.log("'getGraphMapData'案例失败：" + res);
        expect(false).toBeTruthy();
      })
      .finally(() => {
        knowledgeGraphService.destroy();
      });
  });
});
