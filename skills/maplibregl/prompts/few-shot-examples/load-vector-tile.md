# 用户请求

生成一个将 iServer MVT 地图瓦片添加到 MapLibreGL 地图的完整 HTML 页面。

# 期望回答

基于 `templates/index.html` 保留可运行的地图初始化和错误处理，参考 `modules/mapping/vector-tile.md`：

- 若用户给的是 `/rest/maps/{map}` 地址且不需要改样式，用 `maplibregl.supermap.initMap(url, { type: 'vector-tile', mapOptions })`。
- 若用户要自定义样式，用 `templates/index.html` 的空白地图，在 `map.on('load')` 内用 `vector` source + `source-layer` 自行 addLayer。
- 若用户给的是 `/rest/data/datasources/{ds}/datasets/{dataset}` 地址，`source-layer` 为 `数据集名@数据源名`；非 3857/4326 还要补 `&scale={scale}` 并配置 `maplibregl.CRS`。

必须说明示例中的瓦片地址与 `source-layer` 需按用户自己的服务核对。不要使用 MapboxGL 专属资源或 API。
