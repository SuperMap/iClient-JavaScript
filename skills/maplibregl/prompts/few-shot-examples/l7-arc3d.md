# 用户请求

用 L7 创建 3D 弧线（飞线）图的完整 HTML 页面。

# 期望回答

版本默认 **v6**（ESM + import map，基于 `templates/v6/index.html`）；用户明确要 v5 时用 `templates/v5/index.html`。参考 `modules/mapping/l7-layer.md`：

- 意图命中 L7：业务类是 `L7Layer`（v6 具名导入 / v5 `maplibregl.supermap.L7Layer`），先 `new L7Layer({ type: 'LineLayer', options: { blend: 'normal' } })`，再 `getL7Layer().source(data, { parser: { type: 'csv', x: 'lng1', y: 'lat1', x1: 'lng2', y1: 'lat2' } }).size(1).shape('arc3d').color(...).style(...)`，最后在 `map.on('load')` 内 `map.addLayer(layer)`；飞线动画在 shape 后接 `.animate({ interval: 0.5, trailLength: 0.5, duration: 5 })`。
- 地图构造必须带 `pitch`（约 50~60），否则看不出 3D 弧高；弧线数据是起终点对（OD），不是 LineString。
- **必须按版本额外加载 maplibregl-l7-render（iClient 产物不内置 L7；地址只从 `rules/param-defaults.json` 的 `cdns.*.l7Render` 取），且 L7 页面核心固定用 enhance（render 每帧调 `map.getCRS()`，普通核心无此方法，与底图坐标系无关）**：
  - v6（12.2.0 起的 iClient mjs）：import map 两条映射——`maplibre-gl` 映到 **enhance 6.14.0 mjs**（替换核心映射，不是新增），`maplibregl-l7-render` 映到 `.../maplibregl-l7-render/1.0.0/maplibregl-l7-render.mjs`；业务仍是**单个** `<script type="module">`，除具名导入 `L7Layer` 外再加两行桥接 `import * as L7Render from 'maplibregl-l7-render'; window.L7 = L7Render;`（iClient mjs 以懒 Proxy 读 `window.L7`，不是静态 module external；缺桥接报 `L7.LineLayer is not a constructor`）。import map 缺 render 映射时业务 module 加载即报 `Failed to resolve module specifier "maplibregl-l7-render"`；核心没映 enhance 时运行时报 `map.getCRS is not a function`。回复中注明 1.0.0 render mjs 与 enhance v6 mjs 的 CDN 发布状态，未就位可换自托管同目录文件，不降级 v5。
  - v5：普通 script 顺序固定为 maplibre-gl-enhance 5.9.0-2（不用普通核心）→ `maplibregl-l7-render/0.0.4/maplibregl-l7-render.js` → iclient-maplibregl-es6.min.js（render 注册全局 `L7`）。
- 两版都禁止使用 `dist/maplibregl/include-maplibregl.js` 的 `include="L7"`（仅供官方示例页）。
- 数据可用示例公开地址 `https://iclient.supermap.io/web/data/L7/UEXQMifxtkQlYfChpPwT.txt`（CSV，字段 lng1,lat1,lng2,lat2），fetch 后 res.text() 传入；换数据时按实际字段名改 parser 映射，坐标为 WGS84。
- 2D 平面弧线用 `shape('arc')`，长距离大圆弧线用 `shape('greatcircle')`；其他 L7 图层类型（PointLayer、HeatMapLayer 等）从 L7 官方文档与 `examples/maplibregl/l7_*.html` 核实，不臆造 shape/style 名。

不要使用 MapboxGL 专属资源或 API。
