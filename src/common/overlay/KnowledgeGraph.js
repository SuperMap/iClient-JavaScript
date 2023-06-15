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
 * @property {number} [zoom] - 缩放比例。
 * @property {number} [minZoom] - 最小缩放比例。若 fitView、zoom、zoomTo 等操作导致图的缩放比例小于该值，则将使用该值进行缩放，并返回 false。
 * @property {number} [maxZoom] - 最大缩放比例。若 fitView、zoom、zoomTo 等操作导致图的缩放比例大于该值，则将使用该值进行缩放，并返回 false。
 * @property {KnowledgeGraph.Layout} [layout] - 布局。
 * @property {boolean} [autoResize=true] - 当视口变换时，是否自动重绘。
 * @property {KnowledgeGraph.NodeStyle} [defaultNode] - 默认状态下节点的配置，比如 type, size, color。会被写入的 data 覆盖。
 * @property {KnowledgeGraph.EdgeStyle} [defaultEdge] - 默认状态下边的配置，比如 type, size, color。会被写入的 data 覆盖。
 * @property {KnowledgeGraph.NodeStyle} [nodeHighlightStyle] - 鼠标移入节点高亮样式。默认样式：{strokeColor: 'blue',stroke: 10, opacity: 0.8}。
 * @property {KnowledgeGraph.EdgeStyle} [edgeHighlightStyle] - 鼠标移入边高亮样式。默认样式：{strokeColor: 'blue',stroke: 10, opacity: 0.8}。
 * @property {boolean} [highlightNode = true] - 鼠标移入是否高亮节点。
 * @property {boolean} [highlightEdge = true] - 鼠标移入是否高亮边。
 * @property {boolean} [showToolBar = true] - 是否打开工具条， 包含放大，缩小，切换到实际大小功能。
 * @property {boolean} [showContextMenu = true] - 是否打开节点的右键菜单， 包含展开\折叠、隐藏功能。
 * @property {boolean} [dragCanvas = true] - 是否可以拖拽canvas。
 * @property {boolean} [zoomCanvas = true] - 是否可以缩放canvas。
 * @property {boolean} [dragNode = true] - 是否可以拖拽node节点。
 * @property {number} [nodeLabelMaxWidth] - node节点的标签开启省略号配置项，大于该宽度使用省略号。
 */

/**
 * @typedef {Object} KnowledgeGraph.Layout - 布局。
 * @property {string} [type='force'] - 布局类型， 可选值：['force']。 默认'force'。
 * @property {Array.<number>} [center] - 布局的中心, 图的中心。
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
/**
 * @typedef {Object} KnowledgeGraph.AnimateConfig - 动画配置项。
 * @property {number} [duration= 500] - 一次动画的时长。
 * @property {string} [easing='linearEasing'] - 动画函数。
 * @property {number} [delay=0] - 是否重复执行动画。
 * @property {boolean} [repeat=false] - 边透明度。
 * @property {string} [shadowColor] - 阴影颜色。
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
   * @function KnowledgeGraph.prototype.handleNodeStatus
   * @description 展开、折叠、隐藏节点
   * @param {Object} data - 展开 折叠 隐藏的对象, eg: {expand:['id1'], collapse:['id2'], hidden:['id3']}
   */
  handleNodeStatus(data) {
    const { expand, collapse, hidden } = data;
    // 解析expand参数,里面的节点再执行一次查询显示出来
    this.expandNodes(expand);
    // 解析collapse参数,折叠这个里面的节点
    this.collapseNodes(collapse);
    // 解析hidden，隐藏这个里面额的节点
    this.hideNodes(hidden);
  }

  /**
   * @function KnowledgeGraph.prototype.expandNodes
   * @description 展开节点。
   * @param {Array.<string>} expandData - 元素 ID 数组。
   */
  expandNodes(expandData) {
    if (!expandData) {
      return;
    }
    expandData.forEach((item) => {
      this.expandNode(item + '');
    });
  }

  /**
   * @function KnowledgeGraph.prototype.collapseNodes
   * @description 折叠节点。
   * @param {Array.<string>} collapseData - 元素 ID 数组。
   */
  collapseNodes(collapseData) {
    if (!collapseData) {
      return;
    }
    collapseData.forEach((item) => {
      this.collapseNode(item + '');
    });
  }

  /**
   * @function KnowledgeGraph.prototype.hideNodes
   * @description 隐藏节点。
   * @param {Array.<string>} hiddenData - 元素 ID 数组。
   */
  hideNodes(hiddenData) {
    if (!hiddenData) {
      return;
    }
    hiddenData.forEach((item) => {
      this.hideItem(item + '');
    });
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
   * @function KnowledgeGraph.prototype.zoom
   * @description 改变视口的缩放比例，在当前画布比例下缩放，是相对比例。
   * @param {number} ratio 缩放比例。
   * @param {Object} [center] 以 center 的 x、y 坐标为中心缩放，如果省略了 center 参数，则以元素当前位置为中心缩放。
   * @param {boolean} [animate] 是否开启动画。
   * @param {KnowledgeGraph.AnimateConfig} [animateCfg] 若带有动画，可配置动画。若未配置，则跟随 graph 的 animateCfg 参数。
   */
  zoom(ratio, center, animate, animateCfg) {
    this.graphRender.zoom(ratio, center, animate, animateCfg);
  }

  /**
   * @function KnowledgeGraph.prototype.zoomTo
   * @description 改变视口的缩放比例，在当前画布比例下缩放，是相对比例。
   * @param {number} ratio 缩放比例。
   * @param {Object} [center] 以 center 的 x、y 坐标为中心缩放，如果省略了 center 参数，则以元素当前位置为中心缩放。
   * @param {boolean} [animate] 是否开启动画。
   * @param {KnowledgeGraph.AnimateConfig} [animateCfg] 若带有动画，可配置动画。若未配置，则跟随 graph 的 animateCfg 参数。
   */
  zoomTo(ratio, center, animate, animateCfg) {
    this.graphRender.zoomTo(ratio, center, animate, animateCfg);
  }

  /**
   * @function KnowledgeGraph.prototype.fitView
   * @description 让画布内容适应视口。
   * @param {Array.<number>|number} [padding] [top, right, bottom, left] 四个方向上的间距值。
   * @param {Object} [rules] fitView 的规则，参数如下：{ onlyOutOfViewPort?: boolean; direction?: 'x' / 'y' / 'both'; ratioRule?: 'max' / 'min}。
   * @param {boolean} [animate] 是否开启动画。
   * @param {KnowledgeGraph.AnimateConfig} [animateCfg] 若带有动画，可配置动画。若未配置，则跟随 graph 的 animateCfg 参数。
   */
  fitView(padding, rules, animate, animateCfg) {
    this.graphRender.fitView(padding, rules, animate, animateCfg);
  }

  /**
   * @function KnowledgeGraph.prototype.fitCenter
   * @description 平移图到中心将对齐到画布中心，但不缩放。优先级低于 fitView。
   * @param {boolean} [animate] 是否开启动画。
   * @param {KnowledgeGraph.AnimateConfig} [animateCfg] 若带有动画，可配置动画，参见基础动画教程。若未配置，则跟随 graph 的 animateCfg 参数。
   */
  fitCenter(animate, animateCfg) {
    this.graphRender.fitCenter(animate, animateCfg);
  }

  /**
   * @function KnowledgeGraph.prototype.getGraphCenterPoint
   * @description 获取图内容的中心绘制坐标。
   * @return {Object} 包含的属性：x 和 y 属性，分别表示渲染坐标下的 x、y 值。
   */
  getGraphCenterPoint() {
    return this.graph.getGraphCenterPoint();
  }

  /**
   * @function KnowledgeGraph.prototype.getZoom
   * @description 获取当前视口的缩放比例。
   * @return {number} 返回值表示当前视口的缩放比例， 默认值为 1。
   */
  getZoom() {
    return this.graphRender.getZoom();
  }

  /**
   * @function KnowledgeGraph.prototype.getMinZoom
   * @description 获取 graph 当前允许的最小缩放比例。
   * @return {number} 返回值表示当前视口的最小缩放比例。
   */
  getMinZoom() {
    return this.graphRender.getMinZoom();
  }

  /**
   * @function KnowledgeGraph.prototype.setMinZoom
   * @description 设置 graph 当前允许的最小缩放比例。
   * @param {number} ratio 缩放比例。
   */
  setMinZoom(ratio) {
    this.graphRender.setMinZoom(ratio);
  }

  /**
   * @function KnowledgeGraph.prototype.getMaxZoom
   * @description 获取 graph 当前允许的最大缩放比例。
   * @return {number} 返回值表示当前视口的最大缩放比例。
   */
  getMaxZoom() {
    return this.graphRender.getMaxZoom();
  }

  /**
   * @function KnowledgeGraph.prototype.setMaxZoom
   * @description 设置 graph 当前允许的最大缩放比例。
   * @param {number} ratio 缩放比例。
   */
  setMaxZoom(ratio) {
    this.graphRender.setMaxZoom(ratio);
  }

  /**
   * @function KnowledgeGraph.prototype.getWidth
   * @description获取 graph 当前的宽度。
   * @return {number} graph 当前的宽度。
   */
  getWidth() {
    return this.graphRender.getWidth();
  }

  /**
   * @function KnowledgeGraph.prototype.getHeight
   * @description 获取 graph 当前的高度。
   * @return {number} graph 当前的高度。
   */
  getHeight() {
    return this.graphRender.getHeight();
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
    this.graphRender.setData(data, graph);
    this.render(graph); // 渲染图
    if (this.config.zoom !== undefined) {
      const center = this.config.center ? { x: center[0], y: center[1] } : center;
      this.zoomTo(this.config.zoom, center);
    }
    this.data = data;
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
   * @function KnowledgeGraph.prototype.resize
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
   * @function KnowledgeGraph.prototype.getEdgesByNode
   * @description 获取与当前节点有关联的所有边。
   * @param {Object} node - node实例。
   * @return {Array} edge实例数组。
   */
  getEdgesByNode(node) {
    return this.graphRender.getEdgesByNode(node);
  }

  /**
   * @function KnowledgeGraph.prototype.getInEdges
   * @description 获取与当前节点关联的所有入边。
   * @param {Object} node - node实例。
   * @return {Array} edge实例数组。
   */
  getInEdges(node) {
    return this.graphRender.getInEdges(node);
  }

  /**
   * @function KnowledgeGraph.prototype.getOutEdges
   * @description 获取与当前节点关联的所有出边。
   * @param {Object} node - node实例。
   * @return {Array} edge实例数组。
   */
  getOutEdges(node) {
    return this.graphRender.getOutEdges(node);
  }

  /**
   * @function KnowledgeGraph.prototype.getSourceByEdge
   * @description 获取当前边的起始节点
   * @param {Object} edge - node实例。
   * @return {Object} 返回值为起始节点的实例。
   */
  getSourceByEdge(edge) {
    return this.graphRender.getSourceByEdge(edge);
  }

  /**
   * @function KnowledgeGraph.prototype.getTargetByEdge
   * @description 获取当前边的终止节点。
   * @param {Object} edge - node实例。
   * @return {Object} 终止节点的实例。
   */
  getTargetByEdge(edge) {
    return this.graphRender.getTargetByEdge(edge);
  }

  /**
   * @function KnowledgeGraph.prototype.expandNode
   * @description 展开当前节点。
   * @param {string} id - 元素 ID。
   */
  expandNode(id) {
    const item = this.findById(id);
    item && this.graphRender.expandNode(item);
  }

  /**
   * @function KnowledgeGraph.prototype.collapseNode
   * @description 收起当前节点。
   * @param {string} id - 元素 ID。
   * @param {Object} graph - graph实例。
   */
  collapseNode(id) {
    const item = this.findById(id);
    item && this.graphRender.collapseNode(item);
  }

  /**
   * @function KnowledgeGraph.prototype.showItem
   * @description 显示指定的元素。若 item 为节点，则相关边也会随之显示。而show() 则将只显示自身。
   * @param {string|Object} item - 元素 ID 或元素实例。
   * @param {boolean} [stack] - 	操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可。
   */
  showItem(item, stack) {
    this.graphRender.showItem(item, stack);
  }

  /**
   * @function KnowledgeGraph.prototype.showItem
   * @description 隐藏指定元素。若 item 为节点，则相关边也会随之隐藏。而 hide() 则将只隐藏自身。
   * @param {string|Object} item - 元素 ID 或元素实例。
   * @param {boolean} [stack] -操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可。
   */
  hideItem(item, stack) {
    this.graphRender.hideItem(item, stack);
  }

  /**
   * @function KnowledgeGraph.prototype.show
   * @description 显示元素。只显示 item 自身，若需要在显示节点的同时显示相关边，应调用showItem(item)。
   * @param {Object} item - 元素实例。
   */
  show(item) {
    this.graphRender.show(item);
  }

  /**
   * @function KnowledgeGraph.prototype.hide
   * @description 隐藏元素。只隐藏 item 自身，若需要在隐藏节点的同时隐藏相关边，应调用 hideItem(item)。
   * @param {Object} item - 元素实例。
   */
  hide(item) {
    this.graphRender.hide(item);
  }

  /**
   * @function KnowledgeGraph.prototype.changeVisibility
   * @description 更改元素是否显示。
   * @param {Object} item - 元素实例。
   * @param {boolean} visible - 是否显示元素，true 为显示，false 为隐藏。
   */
  changeVisibility(item, visible) {
    this.graphRender.changeVisibility(item, visible);
  }

  /**
   * @function KnowledgeGraph.prototype.isVisible
   * @description 查询元素显示状态。
   * @param {Object} item - 元素实例。
   * @return {boolean} - 返回值为 true，则表示当前元素处于显示状态，否则处于隐藏状态。
   */
  isVisible(item) {
    return this.graphRender.isVisible(item);
  }

  /**
   * @function KnowledgeGraph.prototype.getModel
   * @description 获取元素的数据模型。
   * @param {Object} item - 元素实例。
   * @return {Object} - 返回值为节点的数据模型。
   */
  getModel(item) {
    return this.graphRender.getModel(item);
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
   * beforelayout	布局前触发。调用 graph.render 时会进行布局，因此 render 时会触发。或用户主动调用图的 graph.layout 时触发
   * afterlayout	布局完成后触发。调用 graph.render 时会进行布局，因此 render 时布局完成后会触发。或用户主动调用图的 graph.layout 时布局完成后触发
   * viewportchange 调用 graph.moveTo 或 graph.zoom 均会触发该事件
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
   * @function KnowledgeGraph.prototype.nodeLabelOpenEllipsis
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
