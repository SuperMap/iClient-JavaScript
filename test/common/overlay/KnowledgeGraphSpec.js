import { KnowledgeGraph } from '../../../src/common/overlay/KnowledgeGraph';
import '../../resources/KnowledgeGraphService';

const data = {
  nodes: [
    {
      id: '1',
      label: '房地产',
      x: 500,
      y: 100,
      style: { fill: '#f16667', lineWidth: 0 },
      labelCfg: { style: { fontSize: 5, fill: '#fff' } }
    },
    {
      id: '2',
      label: '房屋',
      x: 550,
      y: 150,
      style: { fill: '#ebc386', lineWidth: 0 },
      labelCfg: { style: { fontSize: 5, fill: '#fff' } }
    },
    {
      id: '3',
      label: '宗地',
      x: 600,
      y: 100,
      style: { fill: '#569480', lineWidth: 0 },
      labelCfg: { style: { fontSize: 5, fill: '#fff' } }
    },
    {
      id: '4',
      label: '地籍子区',
      x: 610,
      y: 0,
      style: { fill: '#da7194', lineWidth: 0 },
      labelCfg: { style: { fontSize: 5, fill: '#fff' } }
    },
    {
      id: '5',
      label: '地籍区',
      x: 650,
      y: 250,
      style: { fill: '#4c8eda', lineWidth: 0 },
      labelCfg: { style: { fontSize: 5, fill: '#fff' } }
    },
    {
      id: '6',
      label: '行政区划',
      x: 650,
      y: 100,
      style: { fill: '#00bcd4', lineWidth: 0 },
      labelCfg: { style: { fontSize: 5, fill: '#fff' } }
    }
  ],
  edges: [
    { source: '2', target: '1', label: '开发商' },
    { source: '2', target: '3', label: '隶属' },
    { source: '3', target: '4', label: '所属地籍子区' },
    { source: '4', target: '5', label: '所属地籍区' },
    { source: '5', target: '6', label: '所属地区' }
  ]
};

describe('KnowledgeGraph', () => {
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

  it('constructor', (done) => {
    var graph = new KnowledgeGraph();
    graph.setData(data);
    expect(graph).not.toBeNull();
    expect(graph.data).not.toBeNull();
    done();
  });

  it('dataFromGraphMap', (done) => {
    var graphData = [
      {
        path: [
          {
            id: 17732923532771331,
            properties: {
              server: '--server=E:/00testdata/知识图谱/基础地理实体/院落.udbx --dbType=UDBX --dataset=面1'
            },
            labels: ['面1']
          },
          {
            start: 17732923532771331,
            end: 18014398509481990,
            id: 20547673299877890,
            type: '邻接',
            properties: {}
          },
          {
            id: 18014398509481990,
            properties: {
              server: '--server=E:/00testdata/知识图谱/基础地理实体/院落.udbx --dbType=UDBX --dataset=面2'
            },
            labels: ['面2']
          }
        ]
      },
      {
        id: 177329231,
        properties: {
          server: '--server=E:/00testdata/知识图谱/基础地理实体/院落.udbx --dbType=UDBX --dataset=面1'
        },
        labels: ['面1']
      },
      {
        start: 177329231,
        end: 17732923,
        id: 20547673890,
        type: '邻接1',
        properties: {}
      }
    ];
    var style = [
      {
        type: 'entity',
        color: '#ffc454',
        textColor: '#ffffff',
        font: {
          fontName: 'Microsoft Yahei UI',
          fontSize: 13,
          fontStyle: 0
        },
        size: 20,
        entityIds: '[12,16,18,21,23,25,28,29]'
      },
      {
        type: 'entity',
        color: '#c990c0',
        textColor: '#595959',
        font: {
          fontName: 'Microsoft Yahei UI',
          fontSize: 6,
          fontStyle: 0
        },
        size: 20,
        entityTypes: '["地籍子区"]'
      }
    ];
    var data = KnowledgeGraph.dataFromGraphMap(graphData, style);
    expect(data.nodes).not.toBeNull();
    expect(data.edges).not.toBeNull();
    done();
  });

  it('dataFromKnowledgeGraphQuery', (done) => {
    var graphData = [
      {
        path: [
          {
            id: 17732923532771331,
            properties: {
              server: '--server=E:/00testdata/知识图谱/基础地理实体/院落.udbx --dbType=UDBX --dataset=面1'
            },
            labels: ['面1']
          },
          {
            start: 17732923532771331,
            end: 18014398509481990,
            id: 20547673299877890,
            type: '邻接',
            properties: {}
          },
          {
            id: 18014398509481990,
            properties: {
              server: '--server=E:/00testdata/知识图谱/基础地理实体/院落.udbx --dbType=UDBX --dataset=面2'
            },
            labels: ['面2']
          }
        ]
      },
      {
        id: 177329231,
        properties: {
          server: '--server=E:/00testdata/知识图谱/基础地理实体/院落.udbx --dbType=UDBX --dataset=面1'
        },
        labels: ['面1']
      },
      {
        start: 177329231,
        end: 17732923,
        id: 20547673890,
        type: '邻接1',
        properties: {}
      }
    ];
    var data = KnowledgeGraph.dataFromKnowledgeGraphQuery(graphData);
    expect(data.nodes).not.toBeNull();
    expect(data.edges).not.toBeNull();
    done();
  });

  it('nodeLabelMaxWidth', (done) => {
    var graph = new KnowledgeGraph({ nodeLabelMaxWidth: 100 });
    expect(graph).not.toBeNull();
    expect(graph.data).not.toBeNull();
    done();
  });
  it('graph_functions', (done) => {
    var graph = new KnowledgeGraph();
    graph.setData(data);
    expect(graph.getContainer()).not.toBeNull();
    expect(graph.getCanvas()).not.toBeNull();
    expect(graph.getNodes()).not.toBeNull();
    expect(graph.getEdges()).not.toBeNull();
    const node = graph.findById('1');
    expect(graph.getNeighbors(node, 'source')).not.toBeNull();
    expect(graph.getEdgesByNode(node)).not.toBeNull();
    expect(graph.getInEdges(node)).not.toBeNull();
    expect(graph.getOutEdges(node)).not.toBeNull();
    const edge = graph.find('edge', (res) => res);
    expect(graph.getSourceByEdge(edge)).not.toBeNull();
    expect(graph.getTargetByEdge(edge)).not.toBeNull();

    expect(node).not.toBeNull();
    expect(graph.find('node', (res) => res)).not.toBeNull();
    expect(graph.findAll('node', (res) => res)).not.toBeNull();
    expect(graph.findAll('node', (res) => res)).not.toBeNull();
    expect(graph.toDataURL('image')).not.toBeNull();
    try {
      graph.addItem('node', { id: 'test' });
      graph.removeItem('node', 'test');
      graph.updateItem('1', { id: '1' });
      graph.refreshItem('1');
      graph.refreshPositions();
      graph.clear();
      graph.destroy();
      graph.on('beforerender', () => {});
      graph.off('beforerender', () => {});
    } catch {}
    done();
  });
});
