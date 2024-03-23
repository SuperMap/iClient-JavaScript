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
    graphMap.on('loaded',()=>{
      expect(graphMap).not.toBeNull();
      done();
    })
  });
});
