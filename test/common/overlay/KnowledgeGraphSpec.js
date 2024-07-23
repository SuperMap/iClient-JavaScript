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
    expect(graph.getGraph()).not.toBeNull();
    done();
  });

  it('node label 0', (done) => {
    var graphData = [
      {
        path: [
          {
            id: 17732923532771331,
            properties: {
              server: 0
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
              server: '0'
            },
            labels: ['面2']
          }
        ]
      },
      {
        id: 177329231,
        properties: {
          server: 0
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
    var captionField = { entityTypes: '["面1"]', name: 'server' };
    var data = KnowledgeGraph.dataFromGraphMap(graphData, {
      styles: { style },
      captionFields: { captionField: [captionField] }
    });
    expect(data.nodes[0].label).toBe('0');
    expect(data.edges).not.toBeNull();
    done();
  });

  it('showRelationTypes false', (done) => {
    var graphData = [
      {
        path: [
          {
            id: 17732923532771331,
            properties: {
              server: undefined
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
              server: undefined
            },
            labels: ['面2']
          }
        ]
      },
      {
        id: 177329231,
        properties: {
          server: 0
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
    var captionField = { entityTypes: '["面1"]', name: 'server' };
    var data = KnowledgeGraph.dataFromGraphMap(graphData, {
      styles: { style },
      captionFields: { captionField: [captionField] },
      showRelationTypes: false
    });
    expect(data.nodes[0].label).toBe('');
    expect(data.edges[0].label).toBeUndefined();
    done();
  });
  it('showRelationTypes true', (done) => {
    var graphData = [
      {
        path: [
          {
            id: 17732923532771331,
            properties: {
              server: 0
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
              server: '0'
            },
            labels: ['面2']
          }
        ]
      },
      {
        id: 177329231,
        properties: {
          server: 0
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
    var captionField = { entityTypes: '["面1"]', name: 'server' };
    var data = KnowledgeGraph.dataFromGraphMap(graphData, {
      styles: { style },
      captionFields: { captionField: [captionField] },
      showRelationTypes: true
    });
    expect(data.edges[0].label).toBe('邻接');
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
    var data = KnowledgeGraph.dataFromGraphMap(graphData, { styles: { style } });
    expect(data.nodes).not.toBeNull();
    expect(data.edges).not.toBeNull();
    expect(data.edges[0].label).toBe('邻接');
    done();
  });

  it('dataFromGraphMap captionField array', (done) => {
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
    var captionField = { entityTypes: '["面1"]', name: 'server' };
    var data = KnowledgeGraph.dataFromGraphMap(graphData, {
      styles: { style },
      captionFields: { captionField: [captionField] }
    });
    expect(data.nodes[0].label).toBe(
      '--server=E:/00testdata/知识图谱/基础地理实体/院落.udbx --dbType=UDBX --dataset=面1'
    );
    expect(data.edges).not.toBeNull();
    var data1 = KnowledgeGraph.dataFromGraphMap(graphData, { styles: { style }, captionFields: { captionField } });
    expect(data1.nodes[0].label).toBe(
      '--server=E:/00testdata/知识图谱/基础地理实体/院落.udbx --dbType=UDBX --dataset=面1'
    );
    expect(data1.edges).not.toBeNull();
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

  it('nodeLabelMaxWidth animate false', (done) => {
    var graph = new KnowledgeGraph({ nodeLabelMaxWidth: 100, animate: false });
    expect(graph).not.toBeNull();
    expect(graph.data).not.toBeNull();
    done();
  });
  it('expand collpase hidden Nodes', (done) => {
    var graph = new KnowledgeGraph();
    graph.setData(data);
    graph.handleNodeStatus({});
    graph.handleNodeStatus({ expand: [], collpase: [2], hidden: [] });
    console.log(graph.graphRender.collpasedData['2']);
    graph.handleNodeStatus({ expand: [2], hidden: [] });
    graph.handleNodeStatus({ expand: [2], collpase: [2, 5], hidden: [6] });
    done();
  });

  it('collpaseNode', (done) => {
    var graph = new KnowledgeGraph();
    const data = {
      nodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
      edges: [{ source: '2', target: '1' }]
    };
    graph.setData(data);
    graph.collapseNode('1');
    expect(graph.graphRender.collpasedData['1'].length).toBe(1);
    expect(graph.graphRender.collpasedData['1'][0].children).toBeUndefined();
    console.log('collpaseNodes4', graph.graphRender.collpasedData);
    graph.expandNode('1');
    done();
  });
  it('collpaseNode1', (done) => {
    var graph = new KnowledgeGraph();
    const data = { nodes: [{ id: '1' }, { id: '2' }], edges: [{ source: '1', target: '2' }] };
    graph.setData(data);
    graph.collapseNode('1');
    expect(graph.graphRender.collpasedData['1'].length).toBe(1);
    expect(graph.graphRender.collpasedData['1'][0].children).toBeUndefined();
    done();
  });
  it('collpaseNode2', (done) => {
    var graph = new KnowledgeGraph();
    const data = {
      nodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
      edges: [
        { source: '1', target: '2' },
        { source: '3', target: '2' }
      ]
    };
    graph.setData(data);
    graph.collapseNode('1');
    expect(graph.graphRender.collpasedData['1'].length).toBe(0);
    done();
  });
  it('collpaseNode3', (done) => {
    var graph = new KnowledgeGraph();
    const data = {
      nodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
      edges: [
        { source: '1', target: '2' },
        { source: '2', target: '3' }
      ]
    };
    graph.setData(data);
    graph.collapseNode('1');
    console.log('collpaseNodes3', graph.graphRender.collpasedData);
    expect(graph.graphRender.collpasedData['1'].length).toBe(0);
    graph.expandNode('1');
    done();
  });
  xit('collpaseNode5', (done) => {
    var graph = new KnowledgeGraph();
    const data = {
      nodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
      edges: [
        { source: '2', target: '1' },
        { source: '2', target: '3' }
      ]
    };
    graph.setData(data);
    graph.collapseNode('1');
    console.log('collpaseNodes5', graph.graphRender.collpasedData);
    expect(graph.graphRender.collpasedData['1'].length).toBe(1);
    expect(graph.graphRender.collpasedData['1'][0].children.length).toBe(1);
    graph.expandNode('1');
    done();
  });
  xit('collpaseNode6', (done) => {
    var graph = new KnowledgeGraph();
    const data = {
      nodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
      edges: [
        { source: '2', target: '1' },
        { source: '3', target: '2' }
      ]
    };
    graph.setData(data);
    graph.collapseNode('1');
    console.log('collpaseNodes6', graph.graphRender.collpasedData, graph.graphRender.collpasedData['1'][0].children);
    expect(graph.graphRender.collpasedData['1'].length).toBe(1);
    expect(graph.graphRender.collpasedData['1'][0].children.length).toBe(1);
    expect(graph.graphRender.collpasedData['1'][0].children[0].children).toBeUndefined();
    graph.expandNode('1');
    done();
  });
  xit('collpaseNode7', (done) => {
    var graph = new KnowledgeGraph();
    const data = {
      nodes: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }],
      edges: [
        { source: '2', target: '1' },
        { source: '3', target: '2' },
        { source: '3', target: '4' }
      ]
    };
    graph.setData(data);
    graph.collapseNode('1');
    console.log('collpaseNodes7', graph.graphRender.collpasedData);
    expect(graph.graphRender.collpasedData['1'].length).toBe(1);
    expect(graph.graphRender.collpasedData['1'][0].children).toBeUndefined();
    graph.expandNode('1');
    done();
  });
  xit('collpaseNode8', (done) => {
    var graph = new KnowledgeGraph();
    const data = {
      nodes: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }],
      edges: [
        { source: '2', target: '1' },
        { source: '3', target: '2' },
        { source: '4', target: '3' }
      ]
    };
    graph.setData(data);
    graph.collapseNode('1');
    console.log('collpaseNodes8', graph.graphRender.collpasedData);
    expect(graph.graphRender.collpasedData['1'].length).toBe(1);
    expect(graph.graphRender.collpasedData['1'][0].children.length).toBe(1);
    expect(graph.graphRender.collpasedData['1'][0].children).toBeUndefined();
    graph.expandNode('1');
    done();
  });
  it('graph_functions', (done) => {
    var graph = new KnowledgeGraph({ zoom: 7 });
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
    graph.hide(node);
    graph.show(node);
    expect(graph.isVisible(node)).toBe(true);
    expect(graph.getModel(node)).not.toBeNull();
    const edge = graph.find('edge', (res) => res);
    expect(graph.getSourceByEdge(edge)).not.toBeNull();
    expect(graph.getTargetByEdge(edge)).not.toBeNull();
    expect(node).not.toBeNull();
    expect(graph.find('node', (res) => res)).not.toBeNull();
    expect(graph.findAll('node', (res) => res)).not.toBeNull();
    expect(graph.findAll('node', (res) => res)).not.toBeNull();
    expect(graph.toDataURL('image')).not.toBeNull();
    // expect(graph.getZoom()).toBe(7);
    graph.zoom(5);
    graph.zoomTo(6);
    expect(graph.getGraphCenterPoint()).not.toBeNull();
    expect(graph.getViewPortCenterPoint()).not.toBeNull();
    graph.setMinZoom(2);
    expect(graph.getMinZoom()).toBe(2);
    graph.setMaxZoom(3);
    expect(graph.getMaxZoom()).toBe(3);
    expect(graph.getWidth()).toBe(450);
    try {
      graph.addItem('node', { id: 'test' });
      graph.removeItem('node', 'test');
      graph.updateItem('1', { id: '1' });
      graph.refreshItem('1');
      graph.refreshPositions();
      graph.on('beforerender', () => {});
      graph.off('beforerender', () => {});
      graph.fitView();
      graph.fitCenter();
      graph.expandNode();
      graph.collapseNode();
      graph.showItem();
      graph.hideItem();
      graph.getHeight();
      graph.updateGraph(data);
      graph.refresh();
    } catch {}
    done();
  });
  it('changeSize', (done) => {
    var graph = new KnowledgeGraph({ nodeLabelMaxWidth: 100 });
    graph.resize(20, 50);
    expect(graph.changeSize(20, 50)).not.toBeNull();
    done();
  });
  it('changeVisibility', (done) => {
    var graph = new KnowledgeGraph({ nodeLabelMaxWidth: 100 });
    const item = {
      changeVisibility: (params) => {
        expect(params).toBeTrue();
        done();
      }
    };
    graph.changeVisibility(item, true);
  });
  it('nodeLabelOpenEllipsis', (done) => {
    var graph = new KnowledgeGraph({ nodeLabelMaxWidth: 100 });
    var result = graph.nodeLabelOpenEllipsis(2);
    expect(result.length).toBe(0);
    result = graph.nodeLabelOpenEllipsis(0, ['node']);
    expect(result.length).toBe(1);
    result = graph.nodeLabelOpenEllipsis(2, [
      {
        labelCfg: {
          fontSize: 12
        },
        label: 'label'
      }
    ]);
    expect(result.length).toBe(1);
    done();
  });

  it('destroy', (done) => {
    var graph = new KnowledgeGraph({ nodeLabelMaxWidth: 100 });
    const params = {
      destroy: () => {
        done();
      }
    };
    graph.destroy(params);
  });

  it('clear', (done) => {
    var graph = new KnowledgeGraph({ nodeLabelMaxWidth: 100 });
    const params = {
      clear: () => {
        done();
      }
    };
    graph.clear(params);
  });

  it('mouse event highlightNode', (done) => {
    var graph = new KnowledgeGraph({ nodeLabelMaxWidth: 100 });
    spyOn(graph.graph, 'setItemState');
    spyOn(graph.graph, 'clearItemStates');

    graph.graph.emit('node:mouseenter', { item: { test: 'heloooo' } });
    expect(graph.graph.setItemState).toHaveBeenCalled();
    graph.graph.emit('node:mouseleave');
    expect(graph.graph.clearItemStates).toHaveBeenCalled();

    graph.graph.emit('edge:mouseenter', { item: { test: 'heloooo' } });
    expect(graph.graph.setItemState).toHaveBeenCalled();
    graph.graph.emit('edge:mouseleave');
    expect(graph.graph.clearItemStates).toHaveBeenCalled();
    done();
  });

  it('highlight', (done) => {
    var graph = new KnowledgeGraph({ nodeLabelMaxWidth: 100 });
    spyOn(graph.graph, 'setItemState');
    spyOn(graph.graph, 'updateItem');

    var highlightStateStyles = {
      nodeStateStyles: {
        lineWidth: 3,
        stroke: 'red'
      },
      edgeStateStyles: {
        stroke: 'yellow',
        shadowColor: 'yellow',
        shadowBlur: 10,
        endArrow: {
          path: 'M 0,0 L 4,2 L 4,-2 Z',
          fill: 'yellow'
        }
      }
    };

    graph.findById = () => false;
    graph.find = () => false;
    graph.highlight({ nodeIDs: [3], edgeIDs: [4] });
    expect(graph.graph.setItemState).not.toHaveBeenCalled();

    graph.findById = () => true;
    graph.find = () => true;
    graph.highlight({ nodeIDs: [1], edgeIDs: [2], ...highlightStateStyles });

    expect(graph.graph.setItemState).toHaveBeenCalled();
    expect(graph.graph.updateItem).toHaveBeenCalled();
    done();
  });

  it('clearHighlight', (done) => {
    var graph = new KnowledgeGraph({ nodeLabelMaxWidth: 100 });
    spyOn(graph.graph, 'clearItemStates');

    graph.findById = () => false;
    graph.find = () => false;
    graph.clearHighlight({ nodeIDs: [3], edgeIDs: [4] });
    expect(graph.graph.clearItemStates).not.toHaveBeenCalled();

    graph.findById = () => true;
    graph.find = () => true;
    graph.clearHighlight({ nodeIDs: [1], edgeIDs: [2] });
    expect(graph.graph.clearItemStates).toHaveBeenCalled();
    graph.clearHighlight();
    expect(graph.graph.clearItemStates).toHaveBeenCalled();
    done();
  });

  it('modes false', (done) => {
    var graph = new KnowledgeGraph({ dragCanvas: false, zoomCanvas: false, dragNode: false });
    expect(graph.config.modes.default).toEqual([]);
    done();
  });
});
