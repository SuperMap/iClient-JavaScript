# 用户请求

生成一个将 iServer MVT 地图瓦片添加到 MapLibreGL 地图的完整 HTML 页面。

# 期望回答

版本默认 **v6**（ESM + import map，基于 `templates/v6/index.html`）；用户明确要 v5 时用 `templates/v5/index.html`。参考 `modules/mapping/vector-tile.md`：

- 若用户给的是 `/rest/maps/{map}` 地址且不需要改样式，用 `initMap(url, { type: 'vector-tile', mapOptions })`（v5 写 `maplibregl.supermap.initMap`；v6 具名导入 `import { initMap } from '.../iclient-maplibregl.mjs'`，转换规则见 `rules/version-routing.md` 第 4 节）。
- 若用户要自定义样式，用对应版本模板的空白地图，在 `map.on('load')` 内用 `vector` source + `source-layer` 自行 addLayer。
- 若用户给的是 `/rest/data/datasources/{ds}/datasets/{dataset}` 地址，`source-layer` 为 `数据集名@数据源名`；非 3857（含按原生 4326 显示）要配置 `maplibregl.CRS`，3857/4326 之外还要补 `&scale={scale}`（v5 用 enhance 5.9.0-2；**v6 默认仍生成 v6**，import map 映到 enhance 6.14.0 mjs；4326 若接受动态投影到 3857 出图则不需要 enhance，按 `rules/coordinate-system.md` 三分法判断）。

必须说明示例中的瓦片地址与 `source-layer` 需按用户自己的服务核对。不要使用 MapboxGL 专属资源或 API。
