---
name: maplibregl
description: "为 SuperMap iClient 的 MapLibreGL 生成可直接运行的完整 HTML 页面和 JavaScript 代码。适用于 MapLibreGL 地图、iServer REST 服务、GeoJSON、MVT 矢量瓦片、WMTS、WMS、FGB 查询、数据查询、空间分析、控件和图层样式等场景。"
---

# SuperMap iClient 的 MapLibreGL 技能

生成用户可以保存、运行和继续扩展的独立 HTML；只有用户明确要求时才仅生成 JavaScript 代码片段。使用本仓库中的 MapLibreGL API 和示例；MapboxGL 示例不作为本技能的依据。

## 必须遵循的工作流程

1. 判断用户需要完整页面还是代码片段。需要页面时，以 [HTML 起始模板](./templates/index.html) 作为文档结构。
2. 判断数据或服务类型，并确认 URL 格式。缺少必要的 URL、数据集或操作信息时，参考[补充问题](./prompts/fallback-questions.md)；否则使用模板中的公开 World REST 地图作为可运行的默认底图。
3. 先使用下方的 API 检索命令查找相关类或成员，再从 `examples/maplibregl/`、`src/maplibregl/` 和 `src/common/` 核实调用方式、参数和结果结构。检索结果不足时，只查看 `build/jsdocs/maplibregl/docs.json` 中相关 API，不要一次性读取完整文件。
4. 遵循[意图映射](./rules/intent-mapping.json)、[URL 格式规则](./rules/url-patterns.json)、[参数默认值](./rules/param-defaults.json)、[坐标系规则](./rules/coordinate-system.md)和[错误处理规则](./rules/error-handling.md)。WMTS/WMS 使用[Capabilities 工具](./modules/utils/ogc-capabilities.md)在生成页面中按需读取服务元数据，并使用 MapLibre 原生栅格数据源。
5. 用户要求完整页面时，在一个代码块中提供完整 HTML。确保包含完整文档结构、依赖加载、全屏地图容器、明确的初始化代码和可见的错误提示。除非必须由用户填写服务专属信息，否则不要使用伪代码或未替换的占位符；需要填写时应明确标注。
6. 简要说明如何保存和运行页面、需要替换的值，以及相关服务和跨域（CORS）要求。代码应结构清晰、命名明确，便于用户继续扩展。

## API 检索

索引文件为 `assets/iclient-maplibregl.sqlite`，包含当前 MapLibreGL iClient API 记录。在 iClient-JavaScript 仓库根目录使用 Node.js 22.5.0 或更高版本运行检索脚本：

```bash
node skills/maplibregl/scripts/query-api.mjs search "热力图专题图"
node skills/maplibregl/scripts/query-api.mjs search "HeatMapLayer featureWeight"
node skills/maplibregl/scripts/query-api.mjs get FeatureService --member getFeaturesBySQL
```

`search` 用于按中文场景、类名或成员关键词检索；`get` 用于按类名和成员名精确查询。CLI 只返回匹配的 API 记录。不要把 MapboxGL API 索引或完整 JSDoc JSON 当作 MapLibreGL API 的替代来源。

## 高频场景模块

| 场景 | 模块 |
|---|---|
| iServer REST Map 初始化 | [init-map.md](./modules/core/init-map.md) |
| 空白或自定义样式地图 | [empty-map.md](./modules/core/empty-map.md) |
| GeoJSON 图层 | [add-geojson.md](./modules/mapping/add-geojson.md) |
| MVT 矢量瓦片 | [vector-tile.md](./modules/mapping/vector-tile.md) |
| WMTS 栅格瓦片 | [WMTS.md](./modules/mapping/WMTS.md) |
| WMS 栅格图层 | [WMS.md](./modules/mapping/WMS.md) |
| WMTS/WMS Capabilities 解析 | [ogc-capabilities.md](./modules/utils/ogc-capabilities.md) |
| REST Data 查询 | [feature-service.md](./modules/services/feature-service.md) |
| REST Data FGB 查询 | [rest-data-vector.md](./modules/utils/rest-data-vector.md) |
| REST Map 查询 | [query-service.md](./modules/services/query-service.md) |
| 缓冲区分析 | [buffer-analysis.md](./modules/services/buffer-analysis.md) |

生成对应场景时，优先使用模块中引用的 MapLibreGL 示例核对参数和调用方式。WMTS/WMS 按对应模块中的 Capabilities 工具处理；其他未覆盖的服务类型不要凭空补全。

## few-shot 示例

* [加载基础地图](./prompts/few-shot-examples/load-base-map.md)
* [加载 MVT 矢量瓦片](./prompts/few-shot-examples/load-vector-tile.md)
* [查询 REST Data 并加载 FGB](./prompts/few-shot-examples/rest-data-fgb.md)
* [加载 WMTS 栅格瓦片](./prompts/few-shot-examples/load-wmts.md)
* [加载 WMS 栅格图层](./prompts/few-shot-examples/load-wms.md)

## 已核实的依赖加载方式

独立页面应加载仓库发布的 MapLibreGL 资源加载器。该加载器会加载匹配的 MapLibre GL JS、iClient JavaScript 及对应 CSS：

```html
<script src="https://iclient.supermap.io/dist/maplibregl/include-maplibregl.js"></script>
```

该加载器当前配置 MapLibre GL JS 5.6.0 和 MapLibreGL iClient 包。默认使用此加载器，不要猜测 CDN 地址或版本。不要混用 MapboxGL 资源包、`mapboxgl` 命名空间或 Mapbox 专属 API。如果功能需要 `maplibre-gl-enhance` 或其他扩展，添加前应对照 `dist/maplibregl/include-maplibregl.js` 和匹配的 MapLibreGL 示例核实加载方式与版本。

## 地图与 API 规则

* iClient API 使用 `maplibregl.supermap`；原生地图、数据源、图层和控件 API 使用 `maplibregl` 及地图实例。
* iServer REST Map URL（`/rest/maps/{mapName}`）使用 `maplibregl.supermap.initMap(url, options)`。该方法返回一个解析为 `{ map }` 的 Promise；地图样式可能仍在加载，添加数据源或图层前应注册 `load` 监听器。
* 对于空白或自定义 MapLibre 样式，以及非 REST 底图，使用 `new maplibregl.Map(...)` 并提供有效的样式。不要对无关服务 URL 调用 `initMap`。
* REST Data（`/rest/data`）使用 `FeatureService`；REST Map（`/rest/maps/`）使用 `QueryService`。编写查询前，先从匹配示例中核实服务参数和结果路径。
* 使用 `map.addSource()` 和 `map.addLayer()` 添加 GeoJSON。除非明确采用了经核实支持的转换方式，否则 GeoJSON 坐标必须使用 WGS84 经纬度顺序 `[longitude, latitude]`。
* 栅格或矢量瓦片叠加必须使用与地图兼容的数据源定义和投影。不要臆造瓦片模板、图层名称、服务参数或凭据。
* WMTS/WMS 的 Capabilities 解析工具只在生成的页面代码中显式调用，不在 skill 加载或 URL 识别阶段自动请求。页面需按工具说明加载 `fast-xml-parser`，并将服务图层作为 `type: 'raster'` 的 source 和 `type: 'raster'` 的 layer 添加。
* WMS 工具当前只生成适用于 EPSG:3857 的 `{bbox-epsg-3857}` 模板；WMTS 仅支持能够安全映射到 MapLibre `{z}/{x}/{y}` 的连续瓦片矩阵。工具不能支持时应明确报错，不得猜测投影或缩放级别。
* 使用 `.catch(...)`、错误事件监听器或仓库已有的回调错误处理方式显式报告异步错误。不要静默吞掉错误。

## 输出质量检查清单

* 默认提供独立 HTML；仅在用户要求时提供代码片段。
* HTML 中引用的脚本、样式表、样式和 DOM 元素都必须存在。
* 使用正确的 `maplibregl` 命名空间和 MapLibreGL 专用资源加载器。
* 安全时使用具体默认值；用户专属的 URL、数据集名称和凭据必须明确标出。
* 地图样式就绪后再添加叠加数据，并向用户显示初始化或服务错误。
* 用户要求实现的功能中不得留有“在此处添加代码”等占位注释。

生成约束见[系统提示词](./prompts/system-prompt.md)，可运行的基础页面见[起始模板](./templates/index.html)。
