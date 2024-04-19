import { GraphMap } from '../../../src/maplibregl/overlay/GraphMap';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import '../../resources/KnowledgeGraphService';

var knowledgegraphURL = `http://fake:8090/iserver/services/knowledgeGraph-test/restjsr/graph`;
var knowledgegraphmapURL = knowledgegraphURL + '/graphmaps/xxx图谱';

describe('GraphMap maplibregl', () => {
  var originalTimeout;
  var dom;
  beforeAll(() => {
    dom = window.document.createElement('div');
    dom.setAttribute('id', 'knowledgeGraph');
    dom.style.width = '450px';
    dom.style.height = '350px';
    window.document.body.appendChild(dom);
  });
  afterAll(() => {
    window.document.body.removeChild(dom);
  });
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('createGraphMap', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
      if (testUrl.includes('/query.json')) {
        return Promise.resolve(new Response(queryData));
      }
      if (testUrl === knowledgegraphURL + '/graphmaps/xxx图谱.json') {
        expect(testUrl).toBe(knowledgegraphURL + '/graphmaps/xxx图谱.json');
        return Promise.resolve(new Response(graphmapData));
      }
    });
    var graphMap = new GraphMap(knowledgegraphmapURL);
    graphMap.on('loaded', () => {
      expect(graphMap).not.toBeNull();
      done();
    });
  });
  it('findShortestPath', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
      if (testUrl.includes('/query.json')) {
        return Promise.resolve(new Response(queryData));
      }
      if (testUrl === knowledgegraphURL + '/graphmaps/xxx图谱.json') {
        expect(testUrl).toBe(knowledgegraphURL + '/graphmaps/xxx图谱.json');
        return Promise.resolve(new Response(graphmapData));
      }
      if (testUrl.includes('/shortestPath.json')) {
        expect(testUrl).toBe(knowledgegraphURL + '/shortestPath.json?startID=38756&endID=38757');
        expect(options).not.toBeNull();
        return Promise.resolve(new Response(findShortestPathData));
      }
    });
    var graphMap = new GraphMap(knowledgegraphmapURL, { config: { center: [0, 0] } });
    graphMap.on('loaded', () => {
      try {
        expect(graphMap).not.toBeNull();
        spyOn(graphMap.graph, 'highlight');
        spyOn(graphMap.graph, 'clearHighlight');
        graphMap.findShortestPath({ startID: 38756, endID: 38757 }, (res) => {
          expect(res).not.toBeNull();
          expect(res.type).toBe('processCompleted');
          expect(res.result).not.toBeNull();
          expect(res.result.nodeIDs).toEqual([40229, 40237, 64058]);
          expect(res.result.edgeIDs).toEqual([69575, 66619]);
          graphMap.highlight({ nodeIDs: [40229], edgeIDs: [69575] });
          expect(graphMap.graph.highlight).toHaveBeenCalled();
          graphMap.clearHighlight({ nodeIDs: [40229], edgeIDs: [69575] });
          expect(graphMap.graph.clearHighlight).toHaveBeenCalled();
          done();
        });
      } catch (exception) {
        console.log("'findShortestPath'案例失败：" + exception.name + ':' + exception.message);
        expect(false).toBeTruthy();
        done();
      }
    });
  });
});
