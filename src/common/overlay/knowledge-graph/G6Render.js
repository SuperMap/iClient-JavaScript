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
    this.collpasedData = {};
    this.importG6();
    this.hoverColor = '#b4d6ff';
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
    if (config.dragCanvas !== false || config.dragNode !== false) {
      // 阻止事件冒泡
      this.stopDefaultEventPropagation();
    }
    return graph;
  }

  _getDefaultEdgeHighlightStyle(color = this.hoverColor) {
    return {
      stroke: color,
      shadowColor: color,
      shadowBlur: 5,
      endArrow: {
        path: 'M 0,0 L 4,2 L 4,-2 Z',
        fill: color
      }
    };
  }
  _getDefaultNodeHighlightStyle(color = this.hoverColor) {
    return {
      lineWidth: 3,
      stroke: color
    }
  }

  _getContextMenu() {
    const contextMenu = new G6.Menu({
      shouldBegin(evt) {
        if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
          return true;
        }
        if (evt.item) {
          return true;
        }
        return false;
      },
      getContent: (evt) => {
        const { item } = evt;
        if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
          return;
        }
        if (!item) {
          return;
        }
        const itemType = item.getType();
        const model = item.getModel();
        if (itemType && model) {
          if (itemType === 'node') {
            if (this.isCollpased(model.id)) {
              return `<ul>
              <li id='expand'>展开</li>
            </ul>`;
            } else {
              return `<ul>
              <li id='collapse'>折叠</li>
            </ul>`;
            }
          }
        }
      },
      handleMenuClick: (target, item) => {
        const liIdStrs = target.id.split('-');
        switch (liIdStrs[0]) {
          case 'hide':
            this.hideItem(item);
            break;
          case 'expand':
            this.expandNode(item);
            break;
          case 'collapse':
            this.collapseNode(item);
            break;
          case 'show':
            this.showItem(item);
            break;
          default:
            break;
        }
      },
      // 需要加上父级容器的 padding-left 16 与自身偏移量 10
      offsetX: 16 + 10,
      // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
      offsetY: 0,
      // 在哪些类型的元素上响应
      itemTypes: ['node', 'edge', 'canvas']
    });
    return contextMenu;
  }

  _getGraphConfig(config) {
    const animateConfig = {
      speed: 120,
      maxIteration: 83,
      tick: () => {
        this.refreshPositions();
      }
    };
    const defaultLayout = {
      type: 'fruchterman',
      gravity: 5
    };
    const defaultNode = {};
    const defaultEdge = {
      type: 'line',
      style: {
        endArrow: {
          path: 'M 0,0 L 4,2 L 4,-2 Z',
          fill: '#e0e0e0'
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
    const defaultMode = {
      default: ['drag-canvas', 'zoom-canvas', 'drag-node']
    };
    const contextMenu = this._getContextMenu();
    const defaultPlugins = [new G6.ToolBar(), contextMenu];
    const defaultGraphConfig = (container = 'knowledgeGraph') => {
      const dom = document.querySelector(`#${container}`);
      return {
        container: container, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: dom.scrollWidth, // Number，必须，图的宽度
        height: dom.scrollHeight, // Number，必须，图的高度
        plugins: defaultPlugins,
        modes: defaultMode,
        layout: { ...defaultLayout, ...animateConfig },
        defaultNode,
        defaultEdge,
        nodeStateStyles: {
          hover: this._getDefaultNodeHighlightStyle(),
          actived: this._getDefaultNodeHighlightStyle()
        },
        edgeStateStyles: {
          hover: this._getDefaultEdgeHighlightStyle(),
          actived: this._getDefaultEdgeHighlightStyle()
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
    config.layout = { ...defaultLayout, ...(config.layout || {}), ...(config.animate !== false ? animateConfig : {}) };
    config.defaultNode = { ...defaultNode, ...(config.defaultNode || {}) };
    config.defaultEdge = { ...defaultEdge, ...(config.defaultEdge || {}) };
    config.modes = { default: [] };
    if (config.dragCanvas !== false) {
      config.modes.default.push('drag-canvas');
    }
    if (config.zoomCanvas !== false) {
      config.modes.default.push('zoom-canvas');
    }
    if (config.dragNode !== false) {
      config.modes.default.push('drag-node');
    }
    const highlightNodeStyle = { ...this._getDefaultNodeHighlightStyle(), ...(config.nodeHighlightStyle || {}) };
    const highlightEdgeStyle = { ...this._getDefaultEdgeHighlightStyle(), ...(config.edgeHighlightStyle || {}) };
    config.nodeStateStyles = {
      hover: highlightNodeStyle,
      actived: highlightNodeStyle
    };
    config.edgeStateStyles = {
      hover: highlightEdgeStyle,
      actived: highlightEdgeStyle
    };
    if (config.showToolBar !== false) {
      config.plugins = [new G6.ToolBar()];
      this._setToolBarStyle();
    }
    if (config.showContextMenu !== false) {
      config.plugins = [...(config.plugins || []), contextMenu];
      this._setToolBarStyle();
    }
    return config;
  }

  /**
   * @function G6Render.prototype.changeSize
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
   * @function G6Render.prototype.zoom
   * @description 改变视口的缩放比例，在当前画布比例下缩放，是相对比例。
   * @param {number} ratio 缩放比例。
   * @param {Object} [center] 以 center 的 x、y 坐标为中心缩放，如果省略了 center 参数，则以元素当前位置为中心缩放。
   * @param {boolean} [animate] 是否开启动画。
   * @param {KnowledgeGraph.AnimateConfig} [animateCfg] 若带有动画，可配置动画。若未配置，则跟随 graph 的 animateCfg 参数。
   */
  zoom(ratio, center, animate, animateCfg) {
    this.graph.zoom(ratio, center, animate, animateCfg);
  }

  /**
   * @function G6Render.prototype.zoomTo
   * @description 改变视口的缩放比例，在当前画布比例下缩放，是相对比例。
   * @param {number} ratio 缩放比例。
   * @param {Object} [center] 以 center 的 x、y 坐标为中心缩放，如果省略了 center 参数，则以元素当前位置为中心缩放。
   * @param {boolean} [animate] 是否开启动画。
   * @param {KnowledgeGraph.AnimateConfig} [animateCfg] 若带有动画，可配置动画。若未配置，则跟随 graph 的 animateCfg 参数。
   */
  zoomTo(ratio, center, animate, animateCfg) {
    this.graph.zoomTo(ratio, center, animate, animateCfg);
  }

  /**
   * @function G6Render.prototype.fitView
   * @description 让画布内容适应视口。
   * @param {Array.<number>|number} [padding] [top, right, bottom, left] 四个方向上的间距值。
   * @param {Object} [rules] fitView 的规则，参数如下：{ onlyOutOfViewPort?: boolean; direction?: 'x' / 'y' / 'both'; ratioRule?: 'max' / 'min}。
   * @param {boolean} [animate] 是否开启动画。
   * @param {KnowledgeGraph.AnimateConfig} [animateCfg] 若带有动画，可配置动画。若未配置，则跟随 graph 的 animateCfg 参数。
   */
  fitView(padding, rules, animate, animateCfg) {
    this.graph.fitView(padding, rules, animate, animateCfg);
  }

  /**
   * @function G6Render.prototype.fitCenter
   * @description 平移图到中心将对齐到画布中心，但不缩放。优先级低于 fitView。
   * @param {boolean} [animate] 是否开启动画。
   * @param {KnowledgeGraph.AnimateConfig} [animateCfg] 若带有动画，可配置动画，参见基础动画教程。若未配置，则跟随 graph 的 animateCfg 参数。
   */
  fitCenter(animate, animateCfg) {
    this.graph.fitCenter(animate, animateCfg);
  }

  /**
   * @function G6Render.prototype.getGraphCenterPoint
   * @description 获取图内容的中心绘制坐标。
   * @return {Object} 包含的属性：x 和 y 属性，分别表示渲染坐标下的 x、y 值。
   */
  getGraphCenterPoint() {
    return this.graph.getGraphCenterPoint();
  }

  /**
   * @function G6Render.prototype.getViewPortCenterPoint
   * @description 获取视口中心绘制坐标。
   * @return {Object} 包含的属性：x 和 y 属性，分别表示渲染坐标下的 x、y 值。
   */
  getViewPortCenterPoint() {
    return this.graph.getViewPortCenterPoint();
  }

  /**
   * @function G6Render.prototype.getZoom
   * @description 获取当前视口的缩放比例。
   * @return {number} 返回值表示当前视口的缩放比例， 默认值为 1。
   */
  getZoom() {
    return this.graph.getZoom();
  }

  /**
   * @function G6Render.prototype.getMinZoom
   * @description 获取 graph 当前允许的最小缩放比例。
   * @return {number} 返回值表示当前视口的最小缩放比例。
   */
  getMinZoom() {
    return this.graph.getMinZoom();
  }

  /**
   * @function G6Render.prototype.setMinZoom
   * @description 设置 graph 当前允许的最小缩放比例。
   * @param {number} ratio 缩放比例。
   */
  setMinZoom(ratio) {
    this.graph.setMinZoom(ratio);
  }

  /**
   * @function G6Render.prototype.getMaxZoom
   * @description 获取 graph 当前允许的最大缩放比例。
   * @return {number} 返回值表示当前视口的最大缩放比例。
   */
  getMaxZoom() {
    return this.graph.getMaxZoom();
  }

  /**
   * @function G6Render.prototype.setMaxZoom
   * @description 设置 graph 当前允许的最大缩放比例。
   * @param {number} ratio 缩放比例。
   */
  setMaxZoom(ratio) {
    this.graph.setMaxZoom(ratio);
  }

  /**
   * @function G6Render.prototype.getWidth
   * @description获取 graph 当前的宽度。
   * @return {number} graph 当前的宽度。
   */
  getWidth() {
    return this.graph.getWidth();
  }

  /**
   * @function G6Render.prototype.getHeight
   * @description 获取 graph 当前的高度。
   * @return {number} graph 当前的高度。
   */
  getHeight() {
    return this.graph.getHeight();
  }

  setCenter(centerDrawPoint) {
    var centerCanvasPointX = this.graph.getWidth() / 2;
    var centerCanvasPointY = this.graph.getHeight() / 2;
    var centerCanvasPointNew = this.graph.getCanvasByPoint(centerDrawPoint.x, centerDrawPoint.y);
    this.graph.translate(centerCanvasPointX - centerCanvasPointNew.x, centerCanvasPointY - centerCanvasPointNew.y);
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
      .g6-component-contextmenu {
        position: absolute;
        z-index: 2;
        list-style-type: none;
        border-radius: 6px;
        font-size: 14px;
        width: fit-content;
        transition: opacity .2s;
        text-align: center;
        box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.6);
        border: 0px;
      }
      .g6-component-contextmenu ul {
        padding-left: 0px;
        margin: 0;
      }
      .g6-component-contextmenu li {
        cursor: pointer;
        list-style-type: none;
        list-style: none;
        margin-left: 0;
        line-height: 38px;
        padding: 0px 35px;
      }
      .g6-component-contextmenu li:hover {
        color: #333;
        background: #aaaaaa45;
      }
    `);
  }

  /**
   * @function G6Render.prototype.highlightNode
   * @description 鼠标移入节点，节点高亮
   * @param {Object} graph - graph实例。
   */
  highlightNode(graph = this.graph) {
    let node = null;
    function clearAllStats() {
      graph.setAutoPaint(false);
      if (node) {
        graph.clearItemStates(node, 'hover');
        node = null;
      }
      graph.paint();
      graph.setAutoPaint(true);
    }

    graph.on('node:mouseenter', function (e) {
      const item = e.item;
      graph.setAutoPaint(false);
      if (node) {
        graph.clearItemStates(node, 'hover');
      }
      graph.setItemState(item, 'hover', true);
      node = item;
      graph.paint();
      graph.setAutoPaint(true);
    });
    graph.on('node:mouseleave', clearAllStats);
  }

  /**
   * @function G6Render.prototype.highlightEdge
   * @description 鼠标移入边，边高亮
   * @param {Object} graph - graph实例。
   */
  highlightEdge(graph = this.graph) {
    let edge = null;
    function clearAllStats() {
      graph.setAutoPaint(false);
      if (edge) {
        graph.clearItemStates(edge, 'hover');
        edge = null;
      }
      graph.paint();
      graph.setAutoPaint(true);
    }

    graph.on('edge:mouseenter', function (e) {
      const item = e.item;
      graph.setAutoPaint(false);
      if (edge) {
        graph.clearItemStates(edge, 'hover');
      }
      graph.setItemState(item, 'hover', true);
      edge = item;
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
    graph.refresh();
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
   * @function G6Render.prototype.expandNode
   * @description 展开当前节点。
   * @param {Object} item - 元素 ID 或元素实例。
   */
  expandNode(item) {
    const id = item.getModel().id;
    this._expandCollapseNode(this.collpasedData[id], 'show');
    delete this.collpasedData[id];
  }

  /**
   * @function G6Render.prototype.collapseNode
   * @description 收起当前节点。
   * @param {Object} item - 元素 ID 或元素实例。
   * @param {Object} graph - graph实例。
   */
  collapseNode(item) {
    const id = item.getModel().id;
    const result = [];
    this._collapseFunc(item, result);
    this.collpasedData[id] = result;
    this._expandCollapseNode(result);
  }

  isCollpased(id) {
    return !!this.collpasedData[id];
  }

  _collapseFunc(item, res = []) {
    const sourceNodes = this.getNeighbors(item, 'target');
    const targetNodes = this.getNeighbors(item, 'source');

    // 指出节点， 如果没有其他链接，隐藏
    for (let i = 0; i < sourceNodes.length; i++) {
      const sourceNode = sourceNodes[i];
      const model = sourceNode.getModel();
      let nodes = this.getNeighbors(sourceNode);
      // if (nodes && exceptNode) {
      //   nodes = nodes.filter((item) => item.id !== exceptNode);
      // }
      if (nodes.length === 1) {
        res.push({ id: model.id });
      }
    }
    // 指入节点， 如果没有其他链接或者没有指入节点隐藏，隐藏
    for (let i = 0; i < targetNodes.length; i++) {
      const targetNode = targetNodes[i];
      const model = targetNode.getModel();
      let nodes = this.getNeighbors(targetNode);
      let targetNodeNodes = this.getNeighbors(targetNode, 'source');
      // if (nodes && exceptNode) {
      //   nodes = nodes.filter((item) => item.id !== exceptNode);
      // }
      // if (targetNodeNodes && exceptNode) {
      //   targetNodeNodes = targetNodeNodes.filter((item) => item.id !== exceptNode);
      // }
      if (nodes.length === 1 || targetNodeNodes.length === 0) {
        res.push({ id: model.id });
      } else {
        const result = [];
        this._collapseFunc(targetNode, result);
        res.push({ id: model.id, children: result });
      }
    }
    return res;
  }

  _expandCollapseNode(data, type = 'hide') {
    if (!data) {
      return;
    }
    data.forEach((item) => {
      if (type === 'hide') {
        this.hideItem(item.id);
      } else {
        this.showItem(item.id);
        // 如果是把之前的折叠也展开了， 就要把之前的折叠数据删除
        if (this.isCollpased(item.id)) {
          delete this.collpasedData[item.id];
        }
      }
      if (item.children) {
        this._expandCollapseNode(item.children, type);
      }
    });
  }

  /**
   * @function G6Render.prototype.showItem
   * @description 显示指定的元素。若 item 为节点，则相关边也会随之显示。而show() 则将只显示自身。
   * @param {string|Object} item - 元素 ID 或元素实例。
   * @param {boolean} [stack] - 	操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可。
   * @param {Object} graph - graph实例。
   */
  showItem(item, stack, graph = this.graph) {
    graph.showItem(item, stack);
  }

  /**
   * @function G6Render.prototype.showItem
   * @description 隐藏指定元素。若 item 为节点，则相关边也会随之隐藏。而 hide() 则将只隐藏自身。
   * @param {string|Object} item - 元素 ID 或元素实例。
   * @param {boolean} [stack] -操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可。
   * @param {Object} graph - graph实例。
   */
  hideItem(item, stack, graph = this.graph) {
    graph.hideItem(item, stack);
  }

  /**
   * @function G6Render.prototype.show
   * @description 显示元素。只显示 item 自身，若需要在显示节点的同时显示相关边，应调用showItem(item)。
   * @param {Object} item - 元素实例。
   */
  show(item) {
    item.show();
  }

  /**
   * @function G6Render.prototype.hide
   * @description 隐藏元素。只隐藏 item 自身，若需要在隐藏节点的同时隐藏相关边，应调用 hideItem(item)。
   * @param {Object} item - 元素实例。
   */
  hide(item) {
    item.hide();
  }

  /**
   * @function G6Render.prototype.changeVisibility
   * @description 更改元素是否显示。
   * @param {Object} item - 元素实例。
   * @param {boolean} visible - 是否显示元素，true 为显示，false 为隐藏。
   */
  changeVisibility(item, visible) {
    item.changeVisibility(visible);
  }

  /**
   * @function G6Render.prototype.isVisible
   * @description 查询元素显示状态。
   * @param {Object} item - 元素实例。
   * @return {boolean} - 返回值为 true，则表示当前元素处于显示状态，否则处于隐藏状态。
   */
  isVisible(item) {
    return item.isVisible();
  }

  /**
   * @function G6Render.prototype.getModel
   * @description 获取元素的数据模型。
   * @param {Object} item - 元素实例。
   * @return {KnowledgeGraph.Data} - 返回值为节点的数据模型。
   */
  getModel(item) {
    return item.getModel();
  }

  /**
   * @function G6Render.prototype.addItem
   * @description 新增元素（节点和边）。
   * @param {Object} graph - graph实例。
   * @param {string} type - 元素类型，可选值为 'node'、'edge'
   * @param {Object} model - 元素的数据模型，具体内容参见元素配置项。
   */
  addItem(type, model, graph = this.graph) {
    graph.addItem(type, model);
  }

  /**
   * @function G6Render.prototype.addItem
   * @description 删除元素。
   * @param {string|Object} item - 	元素 ID 或元素实例
   * @param {Object} graph - graph实例。
   */
  removeItem(item, graph = this.graph) {
    graph.removeItem(item);
  }

  /**
   * @function G6Render.prototype.updateItem
   * @description 更新元素，包括更新数据、样式等。
   * @param {Object} graph - graph实例。
   * @param {string|Object} item - 元素 ID 或元素实例。
   * @param {Object} model - 元素的数据模型，具体内容参见元素配置项。
   */
  updateItem(item, model, graph = this.graph) {
    graph.updateItem(item, model);
  }

  /**
   * @function G6Render.prototype.refreshItem
   * @description 刷新指定元素。
   *  @param {Object} graph - graph实例。
   * @param {string|Object} item - 元素 ID 或元素实例。
   */
  refreshItem(item, graph = this.graph) {
    graph.refreshItem(item);
  }

  /**
   * @function G6Render.prototype.refreshPositions
   * @description 当节点位置发生变化时，刷新所有节点位置，并重计算边的位置。
   *  @param {Object} graph - graph实例。
   */
  refreshPositions(graph = this.graph) {
    graph.refreshPositions();
  }
  /**
   * @function G6Render.prototype.on
   * @description graph监听事件
   * @param {Object} graph - graph实例。
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
   * @function G6Render.prototype.stopDefaultEventPropagation
   * @description 阻止点击事件冒泡
   * @param {Object} graph - graph实例。
   */
  stopDefaultEventPropagation(graph = this.graph) {
    graph.on('click', function (e) {
      e.stopPropagation();
    });
    graph.on('mousedown', function (e) {
      e.stopPropagation();
    });
    graph.on('mouseover', function (e) {
      e.stopPropagation();
    });
    graph.on('mouseout', function (e) {
      e.stopPropagation();
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
