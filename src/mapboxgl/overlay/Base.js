export class CustomOverlayLayer {
  constructor(options) {
    this.type = 'custom';
    this.overlay = true;
    this.sourceId = options.sourceId;
    // interaction 控制是否支持事件
    this.interaction = options.interaction || false;
    // query 是否支持查询
    this.query = options.query || false;
    this.events = options.events || [];
  }
  
  // 获取 layer 的信息，如 type, id, sourceLayer， layout 等
  getLayer() {}

  // 更换 layer 的顺序
  moveLayer() {}

  // 获取 layer source的信息，如 id，type 等
  getSource() {}

  // 删除 layer source
  removeSource() {}

  // 返回指定source 是否加载完成
  isSourceLoaded() {
    return true;
  }

  // 返回指定样式图层中绘制属性的值
  getPaintProperty() {}

  // 返回指定样式图层中布局属性的值
  getLayoutProperty() {}

  // 修改指定样式图层中布局属性的值
  setLayoutProperty() {}

  // 返回应用于指定样式图层的过滤器
  getFilter() {}

  // 设定指定样式图层的过滤器
  setFilter() {}

  // map 添加 layer 时的钩子函数
  onAdd() {}

  // map 移除 layer 时的钩子函数
  onRemove() {}

  // map 渲染 layer 时的钩子函数
  render() {}

  // 注册 layer 事件，触发多次
  on() {}

  // 注册 layer 事件，触发一次
  once() {}

  // 移除 layer 事件
  off() {}

  // 查询足查询参数的可见要素的 GeoJSON 要素对象数组
  queryRenderedFeatures() {}

  // 查询满足查询参数的指定矢量切片或 GeoJSON 源中的要素
  querySourceFeatures() {}
}
