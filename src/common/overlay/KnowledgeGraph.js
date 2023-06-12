import { transformGraphMap } from './knowledge-graph/format';
import { G6Render } from './knowledge-graph/G6Render';

/**
 * @class KnowledgeGraph
 * @category iServer KnowledgeGraph
 * @classdesc KnowledgeGraph知识图谱
 * @version 11.1.0
 * @param { KnowledgeGraph.Config } config - 创建graph实例的配置项。
 * @usage
 */

/**
 * @typedef {Object} KnowledgeGraph.Data - 创建graph实例的数据项。
 * @property {Array.<KnowledgeGraph.Node>} data.nodes - 创建graph节点。
 * @property {Array.<KnowledgeGraph.Edge>} data.edges - 创建graph边。
 */

/**
 * @typedef {Object} KnowledgeGraph.Config - 创建graph实例的配置项。
 * @property {string | HTMLElement} container - 创建的容器 id 或容器本身, 默认是'knowledgeGraph'。
 * @property {number} width - 图的宽度, 默认是container的width。
 * @property {number} height - 图的高度,默认是container的height。
 * @property {string} [layout='force'] - 布局, 可选值：['force']； 默认是经典力导向布局。
 * @property {boolean} [autoResize=true] - 当视口变换时，是否自动重绘。
 * @property {KnowledgeGraph.NodeStyle} [defaultNode] - 默认状态下节点的配置，比如 type, size, color。会被写入的 data 覆盖。
 * @property {KnowledgeGraph.EdgeStyle} [defaultEdge] - 默认状态下边的配置，比如 type, size, color。会被写入的 data 覆盖。
 * @property {KnowledgeGraph.NodeStyle} [nodeHighlightStyle] - 鼠标移入节点高亮样式。默认样式：{strokeColor: 'blue',stroke: 10, opacity: 0.8}。
 * @property {KnowledgeGraph.EdgeStyle} [edgeHighlightStyle] - 鼠标移入边高亮样式。默认样式：{strokeColor: 'blue',stroke: 10, opacity: 0.8}。
 * @property {boolean} [highlightNode = true] - 鼠标移入是否高亮节点。
 * @property {boolean} [highlightEdge = true] - 鼠标移入是否高亮边。
 * @property {boolean} [showToolBar = true] - 是否打开工具条， 包含放大，缩小，切换到实际大小功能。
 * @property {boolean} [dragCanvas = true] - 是否可以拖拽canvas。
 * @property {boolean} [zoomCanvas = true] - 是否可以缩放canvas。
 * @property {boolean} [dragNode = true] - 是否可以拖拽node节点。
 * @property {number} [nodeLabelMaxWidth] - node节点的标签开启省略号配置项，大于该宽度使用省略号。
 */

/**
 * @typedef {Object} KnowledgeGraph.Layout - node节点配置项。
 * @property {string} id - 元素的标识 ID，必须是唯一的 string
 * @property {string} [category] - 分类。
 * @property {number} [x] - x坐标。
 * @property {number} [y] - y坐标。
 * @property {number} [size=20] - 节点的大小。
 * @property {Array.<number>|number} [anchorPoints=20] - 指定边连入节点的连接点的位置（相对于该节点而言），可以为空。例如: [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点。
 * @property {string} [type] - 元素的类型，不传则使用默认值，节点默认类型为 'circle'，边默认类型为 'line'，Combo 默认类型为 circle。
 * @property {string} [label] - 元素的文本标签，有该字段时默认会渲染 label 。
 * @property {KnowledgeGraph.NodeLabelCfg} [labelCfg] - 元素文本标签的配置项，详见各子模块内容。
 * @property {KnowledgeGraph.NodeStyle} [style] - 元素 keyShape 的样式属性，可配置内容与该 keyShape 的图形类型相关，各图形的具体属性参见各图形样式属性
 */

/**
 * @typedef {Object} KnowledgeGraph.Node - node节点配置项。
 * @property {string} id - 元素的标识 ID，必须是唯一的 string
 * @property {string} [category] - 分类。
 * @property {number} [x] - x坐标。
 * @property {number} [y] - y坐标。
 * @property {number} [size=20] - 节点的大小。
 * @property {Array.<number>|number} [anchorPoints=20] - 指定边连入节点的连接点的位置（相对于该节点而言），可以为空。例如: [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点。
 * @property {string} [type] - 元素的类型，不传则使用默认值，节点默认类型为 'circle'。可选值['circle','rect','ellipse','diamond', 'image']
 * @property {string} [label] - 元素的文本标签，有该字段时默认会渲染 label 。
 * @property {KnowledgeGraph.NodeLabelCfg} [labelCfg] - 元素文本标签的配置项，详见各子模块内容。
 * @property {KnowledgeGraph.NodeStyle} [style] - 样式属性。
 */

/**
 * @typedef {Object} KnowledgeGraph.Edge - edge边配置项。
 * @property {string} [source] -起始点 id 。
 * @property {string} [target] - 结束点 id 。
 * @property {number} [sourceAnchor] - 边的起始节点上的锚点的索引值。
 * @property {number} [targetAnchor] - 边的终止节点上的锚点的索引值。
 * @property {string} [type='line'] - 指定边的类型，可以是内置边的类型名称，也可以是自定义边的名称。默认为 'line'。可选值['line','arc','polyline','quadratic']。
 * @property {string} [label] - 文本文字，如果没有则不会显示。
 * @property {KnowledgeGraph.EdgeLabelCfg} [labelCfg] - 配置标签文本。
 * @property {KnowledgeGraph.EdgeStyle} [style] - 通过 style 配置来修改边的填充色、边框颜色、阴影等属性，具体配置属性见：图形样式属性。
 */

/**
 * @typedef {Object} KnowledgeGraph.NodeLabelCfg - node节点配置项。
 * @property {string} [position] - 文本相对于节点的位置，目前支持的位置有：'center'，'top'，'left'，'right'，'bottom'。默认为 'center'。modelRect 节点不支持该属性。
 * @property {KnowledgeGraph.TextStyle} [style] - 标签的样式属性。
 * @property {number} [offset] - 文本的偏移，position 为 'bottom' 时，文本的上方偏移量；position 为 'left' 时，文本的右方偏移量；以此类推在其他 position 时的情况。modelRect 节点的 offset 为左边距。
 */

/**
 * @typedef {Object} KnowledgeGraph.NodeStyle - 节点样式通用配置项。
 * @property {string} [fill] - 	节点填充色。
 * @property {string} [stroke] - 节点的描边颜色。
 * @property {number} [lineWidth] - 描边宽度。
 * @property {Array.<number>} [lineDash] -描边虚线，数组代表实、虚长度。
 * @property {number} [fillOpacity] - 	设置填充的 alpha 或透明值。
 * @property {string} [shadowColor] - 阴影颜色。
 * @property {number} [shadowBlur] -	阴影范围。
 * @property {number} [shadowOffsetX] - 阴影 x 方向偏移量。
 * @property {number} [shadowOffsetY] - 阴影 y 方向偏移量。
 * @property {number} [opacity] - 设置绘图的当前 alpha 或透明值。
 * @property {string} [cursor] - 鼠标在该边上时的鼠标样式，CSS 的 cursor 选项都支持。
 */
/**
 * @typedef {Object} KnowledgeGraph.TextStyle - 文本样式。
 * @property {string} [textAlign] - 设置文本内容的当前对齐方式。支持的属性：center / end / left / right / start，默认值为 start。
 * @property {string} [textBaseline] - 设置在绘制文本时使用的当前文本基线。支持的属性:top / middle / bottom / alphabetic / hanging。默认值为 bottom。
 * @property {string} [fontStyle] - 字体样式。对应 font-style。
 * @property {string} [fontVariant] - 设置为小型大写字母字体。对应 font-variant。
 * @property {number} [fontWeight] - 字体粗细。对应 font-weight。
 * @property {number} [fontSize] - 字体大小。对应 font-size， 边标签文本默认大小是7。
 * @property {string} [fontFamily] - 字体系列。对应 font-family。
 * @property {number} [lineHeight] - 行高。对应 line-height。
 */

/**
 * @typedef {Object} KnowledgeGraph.EdgeLabelCfg - node节点配置项。
 * @property {string} [position] - 文本相对于边的位置，目前支持的位置有：'start'，'middle'，'end'。默认为'middle'。
 * @property {number} [refX] - 标签在 x 方向的偏移量。
 * @property {number} [refY] -标签在 y 方向的偏移量。
 * @property {boolean} [autoRotate=true] - 标签文字是否跟随边旋转，默认： true。
 * @property { KnowledgeGraph.TextStyle} [style] - 标签的样式属性，默认： {fontSize: 3,fill: '#333'}。
 */
/**
 * @typedef {Object} KnowledgeGraph.EdgeStyle - 边样式通用配置项。
 * @property {string} [stroke] - 边的颜色。
 * @property {number} [lineWidth] - 边宽度。
 * @property {number} [lineAppendWidth] -边响应鼠标事件时的检测宽度，当 lineWidth 太小而不易选中时，可以通过该参数提升击中范围。
 * @property {boolean|Object} [endArrow=true] - 为 true 时在边的结束端绘制默认箭头，为 false 时不绘制结束端箭头, 默认值{path: 'M 0,0 L 2,1 L 2,-1 Z'}
 * @property {boolean|Object} [startArrow] - 为 true 时在边的开始端绘制默认箭头，为 false 时不绘制结束端箭头。
 * @property {number} [strokeOpacity] - 边透明度。
 * @property {string} [shadowColor] - 阴影颜色。
 * @property {number} [shadowBlur] - 阴影模糊程度。
 * @property {number} [shadowOffsetX] - 阴影 x 方向偏移量。
 * @property {number} [shadowOffsetY] - 阴影 y 方向偏移量。
 * @property {Array.<number>} [lineDash] - 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。
 * @property {string} [cursor] - 鼠标在该边上时的鼠标样式，CSS 的 cursor 选项都支持。
 */

export class KnowledgeGraph {
  constructor(config, type = 'G6') {
    /**
     * @member {string} KnowledgeGraph.prototype.graph
     * @description graph实例。
     */
    this.graph = null;
    this.config = config;
    this.graphRender = null;
    this.type = type;
    this.createGraphRender(this.type);
    this.config = this.graphRender._getGraphConfig(this.config);
    this.createGraph(this.config);
    this.CLASS_NAME = 'SuperMap.KnowledgeGraph';
  }

  /**
   * @function KnowledgeGraph.dataFromGraphMap
   * @description 将iServer GraphMap数据转换成KnowledgeGraph数据。
   * @param {Object} queryResult - iServer知识图谱服务query数据。
   * @param {Object} graphMapStyle - iServer知识图谱服务GraphMap的style属性(graphMap.styles.style)。
   * @return {KnowledgeGraph.Data} 返回数据。
   */
  static dataFromGraphMap(queryResult, graphMapStyle) {
    return transformGraphMap(queryResult, graphMapStyle);
  }

  /**
   * @function KnowledgeGraph.dataFromKnowledgeGraphQuery
   * @description 将iServer KnowledgeGraphService query数据转换成KnowledgeGraph数据。
   * @param {Object} queryResult - iServer知识图谱服务query数据。
   * @return {KnowledgeGraph.Data} 返回数据。
   */
  static dataFromKnowledgeGraphQuery(queryResult) {
    return transformGraphMap(queryResult);
  }

  /**
   * @function KnowledgeGraph.prototype.createGraphRender
   * @description 创建KnowledgeGraphRender
   * @param {string} type -类型， 默认是G6。
   * @private
   */
  createGraphRender(type) {
    if (type === 'G6') {
      this.graphRender = new G6Render();
    }
  }

  /**
   * @function KnowledgeGraph.prototype.createGraph
   * @description 创建KnowledgeGraph的guaph实例。
   * @param {Object} config - graph配置项。
   * @returns {Object} graph实例。
   */
  createGraph(config) {
    const graph = this.initGraph(config);
    this.graph = graph;
    this.autoResize();
    return graph;
  }

  /**
   * @function KnowledgeGraph.prototype.getGraph
   * @description 获取KnowledgeGraph的guaph实例。
   * @returns {Object} graph实例。
   */
  getGraph() {
    return this.graph;
  }

  /**
   * @function KnowledgeGraph.prototype.autoResize
   * @description 浏览器窗口大小发生改变时，重新设置canvas画布的大小，重新渲染。
   */
  autoResize() {
    if (this.config && this.config.autoResize !== false) {
      this.graphRender.autoResize();
    }
  }

  /**
   * @function KnowledgeGraph.prototype.initGraph
   * @description 创建KnowledgeGraph实例
   * @param {Object} config - graph配置项。
   * @returns {Object} graph实例。
   */
  initGraph(config) {
    const graph = this.graphRender.initGraph(config);
    this.graph = graph;
    return graph;
  }

  /**
   * @function KnowledgeGraph.prototype.setData
   * @description 设置默认数据
   * @param {KnowledgeGraph.Data} data - graph数据。
   * @param {Object} [graph = this.graph] - graph实例, 默认是。
   */
  setData(data, graph = this.graph) {
    data = data || { nodes: [], edges: [] };
    if (this.config && this.config.nodeLabelMaxWidth) {
      data.nodes = this.nodeLabelOpenEllipsis(this.config.nodeLabelMaxWidth, data.nodes);
    }
    this.data = data;
    this.graphRender.setData(data, graph);
    this.render(graph); // 渲染图
  }

  /**
   * @function KnowledgeGraph.prototype.render
   * @description 根据提供的数据渲染视图。
   */
  render(graph) {
    this.graphRender.render(graph);
  }

  /**
   * @function KnowledgeGraph.prototype.updateGraph
   * @description 更新数据
   * @param {KnowledgeGraph.Data} data - graph数据。
   * @param {Object} graph - graph实例。
   */
  updateGraph(data, graph) {
    this.graphRender.updateGraph(data, graph);
  }

  /**
   * @function KnowledgeGraph.prototype.refresh
   * @description 改变画布大小。
   */
  refresh() {
    return this.graphRender.refresh();
  }

  /**
   * @function KnowledgeGraph.prototype.changeSize
   * @description 改变画布大小。
   * @param {number} width - 宽度。
   * @param {number} height - 高度。
   */
  changeSize(width, height) {
    return this.graphRender.changeSize(width, height);
  }

  /**
   * @function G6Render.prototype.resize
   * @description 改变画布大小后，重新渲染。
   * @param {number} width - 宽度。
   * @param {number} height - 高度。
   */
  resize(width, height) {
    this.graphRender.changeSize(width, height);
    this.graphRender.refresh();
  }

  /**
   * @function KnowledgeGraph.prototype.getContainer
   * @description 获取 Graph 的 DOM 容器。
   * @return {HTMLElement} DOM 容器。
   */
  getContainer() {
    return this.graphRender.getContainer();
  }

  /**
   * @function KnowledgeGraph.prototype.getCanvas
   * @description 获取canvas。
   * @return {HTMLElement} canvas。
   */
  getCanvas() {
    return this.graphRender.getCanvas();
  }

  /**
   * @function KnowledgeGraph.prototype.getNodes
   * @description 获取图中所有节点的实例。
   * @return {Array} 返回值表示图中所有节点的实例。
   */
  getNodes() {
    return this.graphRender.getNodes();
  }

  /**
   * @function KnowledgeGraph.prototype.getEdges
   * @description 获取图中所有节点的实例。这里返回的是边的实例，而不是边的数据项。
   * @return {Array} 返回值表示图中所有边的实例。
   */
  getEdges() {
    return this.graphRender.getEdges();
  }

  /**
   * @function KnowledgeGraph.prototype.getNeighbors
   * @description 获取邻居节点数组。
   * @param {string | INode} node - 节点 ID 或节点实例。
   * @param {string | undefined} type - ['source'| 'target' | undefined]	邻居类型， 'source' 只获取当前节点的源节点，'target' 只获取当前节点指向的目标节点， 若不指定则返回所有类型的邻居。
   * @return {Array} 返回值符合要求的节点数组。
   */
  getNeighbors(node, type) {
    return this.graphRender.getNeighbors(node, type);
  }

  /**
   * @function KnowledgeGraph.prototype.findById
   * @description 根据 ID，查询对应的元素实例。
   * @param {string} id -	元素 ID。
   * @return {Object} 如果有符合规则的元素实例，则返回第一个匹配的元素实例，否则返回 undefined 。
   */
  findById(id) {
    return this.graphRender.findById(id);
  }

  /**
   * @function KnowledgeGraph.prototype.find
   * @description 获取邻居节点数组。
   * @param {string} type - 元素类型，可选值为 'node'、'edge'
   * @param {Function} fn -	查找的规则。
   * @return {Object} 如果有符合规则的元素实例，则返回第一个匹配的元素实例，否则返回 undefined 。
   */
  find(type, fn) {
    return this.graphRender.find(type, fn);
  }
  /**
   * @function KnowledgeGraph.prototype.findAll
   * @description 获取邻居节点数组。
   * @param {string} type - 元素类型，可选值为 'node'、'edge'。
   * @param {Function} fn - 查找的规则。
   * @return {Object} 如果有符合规则的元素实例，则返回所有元素实例，否则返回 undefined。
   */
  findAll(type, fn) {
    return this.graphRender.findAll(type, fn);
  }

  /**
   * @function G6Render.prototype.getEdgesByNode
   * @description 获取与当前节点有关联的所有边。
   * @param {Object} node - node实例。
   * @return {Array} edge实例数组。
   */
  getEdgesByNode(node) {
    return this.graphRender.getEdgesByNode(node);
  }

  /**
   * @function G6Render.prototype.getInEdges
   * @description 获取与当前节点关联的所有入边。
   * @param {Object} node - node实例。
   * @return {Array} edge实例数组。
   */
  getInEdges(node) {
    return this.graphRender.getInEdges(node);
  }

  /**
   * @function G6Render.prototype.getOutEdges
   * @description 获取与当前节点关联的所有出边。
   * @param {Object} node - node实例。
   * @return {Array} edge实例数组。
   */
  getOutEdges(node) {
    return this.graphRender.getOutEdges(node);
  }

  /**
   * @function G6Render.prototype.getSourceByEdge
   * @description 获取当前边的起始节点
   * @param {Object} edge - node实例。
   * @return {Object} 返回值为起始节点的实例。
   */
  getSourceByEdge(edge) {
    return this.graphRender.getSourceByEdge(edge);
  }

  /**
   * @function G6Render.prototype.getTargetByEdge
   * @description 获取当前边的终止节点。
   * @param {Object} edge - node实例。
   * @return {Object} 终止节点的实例。
   */
  getTargetByEdge(edge) {
    return this.graphRender.getTargetByEdge(edge);
  }

  /**
   * @function KnowledgeGraph.prototype.addItem
   * @description 新增元素（节点和边）。
   * @param {string} type - 元素类型，可选值为 'node'、'edge'。
   * @param {Object} model - 元素的数据模型，具体内容参见元素配置项。
   */
  addItem(type, model) {
    return this.graphRender.addItem(type, model);
  }

  /**
   * @function KnowledgeGraph.prototype.removeItem
   * @description 删除元素。
   * @param {string|Object} item - 	元素 ID 或元素实例。
   */
  removeItem(item) {
    return this.graphRender.removeItem(item);
  }

  /**
   * @function KnowledgeGraph.prototype.updateItem
   * @description 更新元素，包括更新数据、样式等。
   * @param {string|Object} item - 元素 ID 或元素实例。
   * @param {Object} model - 元素的数据模型，具体内容参见元素配置项。
   */
  updateItem(item, model) {
    return this.graphRender.updateItem(item, model);
  }

  /**
   * @function KnowledgeGraph.prototype.refreshItem
   * @description 刷新指定元素。
   * @param {string|Object} item - 元素 ID 或元素实例。
   */
  refreshItem(item) {
    return this.graphRender.refreshItem(item);
  }

  /**
   * @function KnowledgeGraph.prototype.refreshPositions
   * @description 当节点位置发生变化时，刷新所有节点位置，并重计算边的位置。
   */
  refreshPositions() {
    return this.graphRender.refreshPositions();
  }

  /**
   * @function KnowledgeGraph.prototype.on
   * @description graph监听事件
   * @param {string} eventName - 事件名，可选事件名参见： Node交互事件名、Edge交互事件名、Canvas交互事件名 时机事件
   * 通用事件名： click  dbclick mouseenter mousemove mouseout mouseover mouseleave mousedown mouseup contextmenu dragstart drag dragend dragenter dragleave drop keydown keyup wheel touchstart touchmove touchend
   * Node交互事件名： node:通用事件名， 例如 node:click
   * Edge交互事件名： edge:通用事件名， 例如 edge:click
   * Canvas交互事件名： canvas:通用事件名，例如 canvas:click
   * 时机事件：用于监听图的某方法调用前后的时机。
   * beforerender 调用 render 方法之前触发
   * afterrender 调用 render 方法之后触发
   * beforeadditem 	调用 addItem 方法之前触发
   * afteradditem 调用 addItem 方法之后触发
   * beforeremoveitem 调用 removeItem 方法之前触发
   * afterremoveitem 调用 removeItem 方法之后触发
   * beforeupdateitem 调用 updateItem  方法之前触发
   * afterupdateitem 调用 updateItem 方法之后触发
   * beforegraphrefresh 调用 refresh  方法之前触发
   * aftergraphrefresh 调用 refresh  方法之后触发
   * @param {Function} handler -	监听函数。
   */
  on(eventName, handler) {
    this.graphRender.on(eventName, handler);
  }

  /**
   * @function KnowledgeGraph.prototype.off
   * @description graph关闭事件。
   * @param {string} eventName - 事件名，参考on方法的事件名。
   * @param {Function} handler -	监听函数。
   */
  off(eventName, handler) {
    this.graphRender.off(eventName, handler);
  }

  /**
   * @function KnowledgeGraph.prototype.toDataURL
   * @description 转换成图片。
   * @param {string} type - 图片类型 'image/png' / 'image/jpeg' / 'image/webp' / 'image/bmp'。
   * @param {string} [backgroundColor] - 图片的背景色，可选，不传值时将导出透明背景的图片。
   * @return {string} 返回值表示生成的图片的 URL。
   */
  toDataURL(type, backgroundColor) {
    this.graphRender.toDataURL(type, backgroundColor);
  }

  /**
   * @function G6Render.prototype.nodeLabelOpenEllipsis
   * @description 转换label的省略号。
   * @param {Object} nodeLabelMaxWidth - node节点标签是否开启省略号
   * @param {Object} nodes - graph的nodes数据。
   * @return {Array} nodes
   */
  nodeLabelOpenEllipsis(nodeLabelMaxWidth, nodes) {
    if (!nodes) {
      return [];
    }
    if (!nodeLabelMaxWidth) {
      return nodes;
    }
    return nodes.map((node) => {
      const fontSize =
        (node.labelCfg && node.labelCfg.fontSize) ||
        (this.defaultNode && this.defaultNode.labelCfg && this.defaultNode.labelCfg.fontSize) ||
        14;
      node.label = fittingStr(node.label, nodeLabelMaxWidth, fontSize);
      return node;
    });
  }

  /**
   * @function KnowledgeGraph.prototype.clear
   * @description 清除画布元素。
   * @param {Object} graph - graph实例。
   */
  clear(graph) {
    graph.clear();
  }

  /**
   * @function KnowledgeGraph.prototype.destroy
   * @description 销毁画布。
   * @param {Object} graph - graph实例。
   */
  destroy(graph) {
    graph.destroy();
  }
}

/**
 * @private
 * @description 大于最大宽度的字符串会返回带有省略号的字符串 xxx...。
 * @param {string} label - 需要处理的字符串。
 * @param {number} maxWidth - 最大宽度。
 * @param {number} fontSize - 字体大小。
 * @returns {string} 处理之后的字符串。
 */
function fittingStr(label, maxWidth, fontSize) {
  const calcLabelLength = (label) => {
    let len = 0;
    for (let i = 0; i < label.length; i++) {
      if (label.charCodeAt(i) > 0 && label.charCodeAt(i) < 128) {
        len++;
      } else {
        len += 2;
      }
    }
    return len;
  };
  const fontWidth = fontSize * 1; //字号+边距
  maxWidth = maxWidth * 1.6; // 需要根据自己项目调整
  const width = calcLabelLength(label) * fontWidth;
  const ellipsis = '…';
  if (width > maxWidth) {
    const len = Math.floor((maxWidth - 20) / fontWidth);
    const result = label.substring(0, len);
    if ((label.substring(len).length + ellipsis.length) * fontWidth > maxWidth) {
      return result + '\n' + label.substring(len, len + len - 2) + ellipsis;
    } else if (label.substring(len).length == 0) {
      return result;
    } else {
      return result + '\n' + label.substring(len);
    }
  } else {
    return label;
  }
}
