import G6 from '@antv/g6';
import insertCss from 'insert-css';
/**
 * @private
 * @class G6Render
 * @category iServer G6Render
 * @classdesc G6Render
 * @param {KnowledgeGraph.Data} data - 创建graph实例的数据项。
 * @param {KnowledgeGraph.Config} [config] - 创建graph实例的配置项。
 * @private
 */

export class G6Render {
  constructor() {
    this.config = null;
    this.graph = null;
    this.data = null;
    this.importG6();
    this.CLASS_NAME = 'SuperMap.G6Render';
  }
  importG6() {
    if (!G6) {
      console.log('please import g6, eg：https://gw.alipayobjects.com/os/lib/antv/g6/4.3.2/dist/g6.min.js');
    }
  }
  /**
   * @function G6Render.prototype.initGraph
   * @description 创建KnowledgeGraph实例
   * @param {KnowledgeGraph.Config} config - graph配置项。
   * @returns {Object} graph实例。
   */
  initGraph(config) {
    const graph = new G6.Graph(config);
    this.graph = graph;
    if (!config || config.highlightNode !== false) {
      this.highlightNode(graph);
    }
    if (!config || config.highlightEdge !== false) {
      this.highlightEdge(graph);
    }
    return graph;
  }

  _getGraphConfig(config) {
    const defaultLayout = {
      type: 'force',
      linkDistance: 80,
      nodeSpacing: 20,
      preventOverlap: true,
      nodeStrength: 0,
      animate: false
    };
    const defaultNode = {};
    const defaultEdge = {
      type: 'line',
      style: {
        endArrow: {
          path: 'M 0,0 L 2,1 L 2,-1 Z'
        },
        lineWidth: 0.5
      },
      labelCfg: {
        autoRotate: true,
        style: {
          fontSize: 4,
          fill: '#333'
        }
      }
    };
    const defaultMode = { default: ['drag-canvas', 'zoom-canvas', 'drag-node'] };
    const defaultPlugins = [new G6.ToolBar()];
    const hoverColor = '#b4d6ff';
    const defaultNodeHighlightStyle = {
      lineWidth: 3,
      stroke: hoverColor
    };
    const defaultEdgeHighlightStyle = {
      stroke: hoverColor,
      lineWidth: 2,
      endArrow: {
        path: 'M 0,0 L 2,1 L 2,-1 Z',
        fill: hoverColor
      }
    };
    const defaultGraphConfig = (container = 'knowledgeGraph') => {
      const dom = document.querySelector(`#${container}`);
      return {
        container: container, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: dom.scrollWidth, // Number，必须，图的宽度
        height: dom.scrollHeight, // Number，必须，图的高度
        plugins: defaultPlugins,
        modes: defaultMode,
        layout: defaultLayout,
        defaultNode,
        defaultEdge,
        nodeStateStyles: {
          hover: defaultNodeHighlightStyle
        },
        edgeStateStyles: {
          hover: defaultEdgeHighlightStyle
        }
      };
    };
    if (!config) {
      this._setToolBarStyle();
      return defaultGraphConfig();
    }
    config.container = config.container || 'knowledgeGraph';
    const dom =
      typeof config.container === 'string' ? document.querySelector(`#${config.container}`) : config.container;
    config.width = config.width || dom.scrollWidth;
    config.height = config.height || dom.scrollHeight;
    config.center = [config.width / 2, config.height / 2];
    config.layout = config.layout || defaultLayout;
    config.defaultNode = config.defaultNode || defaultNode;
    config.defaultEdge = config.defaultEdge || defaultEdge;
    config.modes = {
      default: [
        config.dragCanvas !== false && 'drag-canvas',
        config.zoomCanvas !== false && 'zoom-canvas',
        config.dragNode !== false && 'drag-node'
      ]
    };
    config.nodeStateStyles = {
      hover: config.nodeHighlightStyle || defaultNodeHighlightStyle
    };
    config.edgeStateStyles = {
      hover: config.edgeHighlightStyle || defaultEdgeHighlightStyle
    };
    if (config.showToolBar !== false) {
      config.plugins = defaultPlugins;
      this._setToolBarStyle();
    }

    return config;
  }

  /**
   * @function KnowledgeGraph.prototype.changeSize
   * @description 当源数据中现有节点/边 的数据项发生配置的变更时，根据新数据刷新视图。
   * @param {number} width - 宽度。
   * @param {number} height - 高度。
   */
  changeSize(width, height) {
    return this.graph.changeSize(width, height);
  }

  /**
   * @function G6Render.prototype.autoResize
   * @description 浏览器窗口大小发生改变时，重新渲染；
   */
  autoResize() {
    const dom = this.getContainer();
    window.addEventListener('resize', () => {
      const width = dom.scrollWidth;
      const height = dom.scrollHeight;
      this.graph.changeSize(width, height);
      this.graph.refresh();
    });
  }

  /**
   * @function G6Render.prototype._setToolBarStyle
   * @description 隐藏工具栏的redo undo realZoom按钮
   * @private
   */
  _setToolBarStyle() {
    insertCss(`
      .g6-component-toolbar li[code='redo'],
      .g6-component-toolbar li[code='undo'],
      .g6-component-toolbar li[code='realZoom'] {
        display: none;
      }
    `);
  }

  /**
   * @function G6Render.prototype.highlightNode
   * @description 鼠标移入节点，节点高亮
   * @param {Object} graph - graph实例。
   */
  highlightNode(graph = this.graph) {
    function clearAllStats() {
      graph.setAutoPaint(false);
      graph.getNodes().forEach(function (node) {
        graph.clearItemStates(node);
      });
      graph.paint();
      graph.setAutoPaint(true);
    }

    graph.on('node:mouseenter', function (e) {
      const item = e.item;
      graph.setAutoPaint(false);
      graph.getNodes().forEach(function (node) {
        graph.clearItemStates(node);
      });
      graph.setItemState(item, 'hover', true);
      graph.paint();
      graph.setAutoPaint(true);
    });
    graph.on('node:mouseleave', clearAllStats);
  }

  /**
   * @function G6Render.prototype.highlightNode
   * @description 鼠标移入节点，节点高亮
   * @param {Object} graph - graph实例。
   */
  highlightEdge(graph = this.graph) {
    function clearAllStats() {
      graph.setAutoPaint(false);
      graph.getEdges().forEach(function (edge) {
        graph.clearItemStates(edge);
      });
      graph.paint();
      graph.setAutoPaint(true);
    }

    graph.on('edge:mouseenter', function (e) {
      const item = e.item;
      graph.setAutoPaint(false);
      graph.getNodes().forEach(function (node) {
        graph.clearItemStates(node);
      });
      graph.setItemState(item, 'hover', true);
      graph.paint();
      graph.setAutoPaint(true);
    });
    graph.on('edge:mouseleave', clearAllStats);
  }

  /**
   * @function G6Render.prototype.setData
   * @description 设置数据
   * @param {KnowledgeGraph.Data} data - graph数据。
   * @param {Object} [graph] - graph实例。
   */
  setData(data, graph = this.graph) {
    if (!this.data) {
      graph.data(data);
    } else {
      graph.changeData(data);
    }
    this.data = data;
  }

  /**
   * @function G6Render.prototype.render
   * @description 根据提供的数据渲染视图。
   */
  render(graph = this.graph) {
    return graph.render();
  }

  /**
   * @function G6Render.prototype.updateGraph
   * @description 更新数据
   * @param {Object} graph - graph实例。
   * @param {KnowledgeGraph.Data} data - graph数据。
   */
  updateGraph(data, graph = this.graph) {
    this.data = data;
    graph.changeData(data);
  }

  /**
   * @function G6Render.prototype.refresh
   * @description 当源数据中现有节点/边的数据项发生配置的变更时，根据新数据刷新视图。
   * @param {Object} graph - graph实例。
   */
  refresh(graph = this.graph) {
    return graph.refresh();
  }

  /**
   * @function G6Render.prototype.getContainer
   * @description 获取 Graph 的 DOM 容器。
   * @param {Object} graph - graph实例。
   * @return {HTMLElement}  DOM 容器。
   */
  getContainer(graph = this.graph) {
    return graph.getContainer();
  }

  /**
   * @function G6Render.prototype.getCanvas
   * @description 获取canvas。
   * @param {Object} graph - graph实例。
   * @return {HTMLElement} canvas。
   */
  getCanvas(graph = this.graph) {
    return graph.get('canvas');
  }

  /**
   * @function G6Render.prototype.getNodes
   * @description 获取图中所有节点的实例。
      * @param {Object} graph - graph实例。

   * @return {Array} 返回值表示图中所有节点的实例。
   */
  getNodes(graph = this.graph) {
    return graph.getNodes();
  }

  /**
   * @function G6Render.prototype.getEdges
   * @description 获取图中所有节点的实例。这里返回的是边的实例，而不是边的数据项。
   * @param {Object} graph - graph实例。
   * @return {Array} 返回值表示图中所有边的实例。
   */
  getEdges(graph = this.graph) {
    return graph.getEdges();
  }

  /**
   * @function G6Render.prototype.getNeighbors
   * @description 获取邻居节点数组。
   * @param {Object} graph - graph实例。
   * @param {string | INode} node - 节点 ID 或节点实例。
   * @param {string|undefined} type -['source'| 'target' |undefined]	邻居类型， 'source' 只获取当前节点的源节点，'target' 只获取当前节点指向的目标节点， 若不指定则返回所有类型的邻居。
   * @return {Array} 返回值符合要求的节点数组。
   */
  getNeighbors(node, type, graph = this.graph) {
    return graph.getNeighbors(node, type);
  }

  /**
   * @function G6Render.prototype.findById
   * @description 根据 ID，查询对应的元素实例。
   * @param {Object} graph - graph实例。
   * @param {string} id -	元素 ID
   * @return {Object} 如果有符合规则的元素实例，则返回第一个匹配的元素实例，否则返回 undefined 。
   */
  findById(id, graph = this.graph) {
    return graph.findById(id);
  }

  /**
   * @function G6Render.prototype.find
   * @description 获取邻居节点数组。
   * @param {Object} graph - graph实例。
   * @param {string} type - 元素类型，可选值为 'node'、'edge'
   * @param {Function} fn - 	查找的规则。
   * @return {Object} 如果有符合规则的元素实例，则返回第一个匹配的元素实例，否则返回 undefined 。
   */
  find(type, fn, graph = this.graph) {
    return graph.find(type, fn);
  }
  /**
   * @function G6Render.prototype.findAll
   * @description 获取邻居节点数组。
   * @param {Object} graph - graph实例。
   * @param {string} type - 元素类型，可选值为 'node'、'edge'
   * @param {Function} fn - 	查找的规则。
   * @return {Object} 如果有符合规则的元素实例，则返回所有元素实例，否则返回 undefined。
   */
  findAll(type, fn, graph = this.graph) {
    return graph.findAll(type, fn);
  }

  /**
   * @function G6Render.prototype.getEdgesByNode
   * @description 获取与当前节点有关联的所有边。
   * @param {Object} node - node实例。
   * @return {Array} edge实例数组。
   */
  getEdgesByNode(node) {
    return node.getEdges();
  }

  /**
   * @function G6Render.prototype.getEdgesByNode
   * @description 获取与当前节点关联的所有入边。
   * @param {Object} node - node实例。
   * @return {Array} edge实例数组。
   */
  getInEdges(node) {
    return node.getInEdges();
  }

  /**
   * @function G6Render.prototype.getEdgesByNode
   * @description 获取与当前节点关联的所有出边。
   * @param {Object} node - node实例。
   * @return {Array} edge实例数组。
   */
  getOutEdges(node) {
    return node.getOutEdges();
  }

  /**
   * @function G6Render.prototype.getSourceByEdge
   * @description 获取当前边的起始节点
   * @param {Object} edge - node实例。
   * @return {Object} 返回值为起始节点的实例。
   */
  getSourceByEdge(edge) {
    return edge.getSource();
  }

  /**
   * @function G6Render.prototype.getTargetByEdge
   * @description 获取当前边的终止节点。
   * @param {Object} edge - node实例。
   * @return {Object} 终止节点的实例。
   */
  getTargetByEdge(edge) {
    return edge.getTarget();
  }

  /**
   * @function G6Render.prototype.addItem
   * @description 新增元素（节点和边）。
   * @param {Object} graph - graph实例。
   * @param {string} type - 元素类型，可选值为 'node'、'edge'
   * @param {Object} model - 元素的数据模型，具体内容参见元素配置项。
   */
  addItem(type, model, graph = this.graph) {
    return graph.addItem(type, model);
  }

  /**
   * @function G6Render.prototype.addItem
   * @description 删除元素。
   * @param {Object} graph - graph实例。
   * @param {string|Object} item - 	元素 ID 或元素实例
   */
  removeItem(item, graph = this.graph) {
    return graph.removeItem(item);
  }

  /**
   * @function G6Render.prototype.updateItem
   * @description 更新元素，包括更新数据、样式等。
   * @param {Object} graph - graph实例。
   * @param {string|Object} item - 元素 ID 或元素实例。
   * @param {Object} model - 元素的数据模型，具体内容参见元素配置项。
   */
  updateItem(item, model, graph = this.graph) {
    return graph.updateItem(item, model);
  }

  /**
   * @function G6Render.prototype.refreshItem
   * @description 刷新指定元素。
   *  @param {Object} graph - graph实例。
   * @param {string|Object} item - 元素 ID 或元素实例。
   */
  refreshItem(item, graph = this.graph) {
    return graph.refreshItem(item);
  }

  /**
   * @function G6Render.prototype.refreshPositions
   * @description 当节点位置发生变化时，刷新所有节点位置，并重计算边的位置。
   *  @param {Object} graph - graph实例。
   */
  refreshPositions(graph = this.graph) {
    return graph.refreshPositions();
  }
  /**
   * @function G6Render.prototype.on
   * @description graph监听事件
   *  @param {Object} graph - graph实例。
   * @param {string} eventName - 事件名，可选事件名参见 Event。
   * @param {Function} handler -	监听函数。
   */
  on(eventName, handler, graph = this.graph) {
    graph.on(eventName, handler);
  }
  /**
   * @function G6Render.prototype.off
   * @description graph关闭事件
   *  @param {Object} graph - graph实例。
   * @param {string} eventName - 事件名，可选事件名参见 Event。
   * @param {Function} handler -	监听函数。
   */
  off(eventName, handler, graph = this.graph) {
    graph.off(eventName, handler);
  }
  /**
   * @function G6Render.prototype.toDataURL
   * @description 转换成图片
   *  @param {Object} graph - graph实例。
   * @param {string} type - 图片类型 'image/png' / 'image/jpeg' / 'image/webp' / 'image/bmp'。
   * @param {string} [backgroundColor] - 图片的背景色，可选，不传值时将导出透明背景的图片。
   * @return {string} 返回值表示生成的图片的 URL。
   */
  toDataURL(type, backgroundColor, graph = this.graph) {
    graph.toDataURL(type, backgroundColor);
  }

  /**
   * @function G6Render.prototype.bindNodeDefaultDragEvent
   * @description 给graph的节点绑定默认的拖拽事件
   *
   * @param {Object} graph - graph实例。
   */
  bindNodeDefaultDragEvent(graph = this.graph) {
    graph.on('node:dragstart', function (e) {
      refreshDragedNodePosition(e);
    });
    graph.on('node:drag', function (e) {
      refreshDragedNodePosition(e);
    });
    graph.on('node:dragend', function (e) {
      e.item.get('model').fx = null;
      e.item.get('model').fy = null;
    });
  }

  /**
   * @function G6Render.prototype.clear
   * @description 清除画布元素
   * @param {Object} graph - graph实例。
   */
  clear(graph = this.graph) {
    graph.clear();
  }
  /**
   * @function G6Render.prototype.destroy
   * @description 销毁画布
   * @param {Object} graph - graph实例。
   */
  destroy(graph = this.graph) {
    graph.destroy();
  }
}
/**
 * @description 更新拖拽后节点的x ,y
 */
function refreshDragedNodePosition(e) {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
  model.x = e.x;
  model.y = e.y;
  return model;
}
