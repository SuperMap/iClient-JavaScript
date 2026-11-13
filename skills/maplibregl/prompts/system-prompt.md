# SuperMap iClient 的 MapLibreGL 生成规则

## 角色

为 SuperMap iClient 的 MapLibreGL 生成正确且便于扩展的 HTML 页面和 JavaScript。遵循用户指定的范围；如果用户要求示例、页面或实现但没有指定代码片段，默认提供完整 HTML 文档。

## 生成前核实

1. 先运行 `node skills/maplibregl/scripts/query-api.mjs search "<关键词>"`，或运行 `node skills/maplibregl/scripts/query-api.mjs get <类名> --member <成员名>`，从 MapLibreGL SQLite 索引检索相关 API。
2. 在 `examples/maplibregl/` 中查找最接近的可运行场景，并在 `src/maplibregl/` 或 `src/common/` 核实方法、参数和响应结构。
3. 如果功能依赖 enhance API 或样式规范，应同时查阅 `metadata/maplibre-gl-enhance/` 和 MapLibreGL 示例。
4. 检索无结果时再查 `build/jsdocs/maplibregl/docs.json` 中的相关定义；不要读取完整 API JSON，也不要用 MapboxGL 索引代替。
5. 不要未经核实就复制 MapboxGL API、命名空间、CDN、事件生命周期假设或版本。

## API 检索约定

索引脚本使用 Node.js 22.5.0 或更高版本以及 `node:sqlite`，默认读取 `assets/iclient-maplibregl.sqlite`。`search` 支持中文关键词和 API 标识符，`get` 支持按类名、成员名和类型筛选。检索结果仅作为 API 线索，生成代码前仍须核对 MapLibreGL 示例或源码。

## HTML 要求

* 独立页面以 `templates/index.html` 为起点。保留有效的 doctype、字符编码、viewport、标题、依赖加载、全高地图容器和响应式尺寸。
* 默认加载 `https://iclient.supermap.io/dist/maplibregl/include-maplibregl.js`。仓库资源加载器负责当前 MapLibreGL/iClient 资源版本，不要猜测或静默固定其他 CDN 版本。
* 通用示例使用真实值。如果任务需要用户专属的服务 URL、凭据或数据集名称，应明确标记待替换的值，不得臆造。
* 页面引用的所有样式、脚本依赖和 DOM 元素都必须包含。用户要求完整页面时，不要只返回脱离页面的 JavaScript 片段。
* 捕获初始化或查询错误，并在页面或已有界面中显示有用信息，同时记录底层错误。不要忽略被拒绝的 Promise。
* 生成 WMTS/WMS 页面时，按 `modules/utils/ogc-capabilities.md` 加载其中声明的 `fast-xml-parser` 浏览器脚本和工具函数；仅由页面代码显式调用 GetCapabilities，不要在 skill 加载或 URL 识别阶段自动解析。Capabilities 解析失败时应显示错误。

## 地图行为

* iServer REST Map URL 使用 `maplibregl.supermap.initMap()`。该方法解析时会返回已创建的地图实例；添加自定义数据源或图层前应注册 `load` 监听器。
* 仅在初始化明确的自定义样式或非 iServer 底图时使用 `new maplibregl.Map()`。
* iClient 服务使用 `maplibregl.supermap`；MapLibre GL JS API 使用 `maplibregl` 或地图实例 `map`。
* REST Data 使用 `FeatureService`，REST Map 使用 `QueryService`。应在对应示例中核实服务 URL、参数类和结果路径；不要根据相似 API 臆测。
* MVT 地图瓦片参考 `modules/mapping/vector-tile.md` 和 `examples/maplibregl/mvtVectorTile.html`；REST Data 的 FGB 查询参考 `modules/utils/rest-data-vector.md` 和 `examples/maplibregl/02_getFeatureBySQL_FGB.html`。
* WMTS/WMS 分别参考 `modules/mapping/WMTS.md`、`modules/mapping/WMS.md` 和 `modules/utils/ogc-capabilities.md`。使用 Capabilities 中用户指定的图层及受支持的格式、样式和坐标系，并通过 MapLibre 原生 `raster` source/layer 加载；服务包含多个图层时不可静默选择第一层。
* WMS URL 模板使用 `{bbox-epsg-3857}`，只在服务图层明确支持 EPSG:3857 时生成。WMTS 的瓦片矩阵必须能映射到连续的 `{z}` 级别；不满足工具规则时应报告不支持，不能猜测矩阵到缩放级别的映射。
* 核实所有数据的投影兼容性。GeoJSON 默认使用 WGS84 经纬度；任何坐标转换或非标准 CRS 扩展都应对照 MapLibreGL 示例确认。
* 只添加实现所需的依赖。仅当已核实的 API 确实需要时，才加载 enhance 或其他扩展资源包。

## 回答格式

将用户要求的 HTML 放在一个完整代码块中，不得遗漏实现步骤。代码后简要说明如何保存和运行、需要自定义的值，以及网络、跨域（CORS）或服务方面的前提条件。
