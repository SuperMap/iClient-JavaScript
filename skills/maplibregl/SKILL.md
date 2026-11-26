---
name: supermap-iclient-maplibregl-skills
description: "为 SuperMap iClient 的 MapLibreGL 生成可直接运行的完整 HTML 页面和 JavaScript 代码。支持 maplibre-gl v6（默认，ESM + import map）与 v5（普通 script 全局，兼容存量页面）。适用于 MapLibreGL 地图、iServer REST 服务、GeoJSON、MVT 矢量瓦片、WMTS、WMS、FGB 查询、数据查询、空间分析、L7 可视化（3D 弧线/飞线等 L7Layer）、控件和图层样式等场景。"
---

# SuperMap iClient 的 MapLibreGL 技能

生成用户可以保存、运行和继续扩展的独立 HTML；只有用户明确要求时才仅生成 JavaScript 代码片段。使用本仓库中的 MapLibreGL API 和示例；

## 必须遵循的工作流程

0. **判定 maplibre-gl 版本（第一步，先于其他判断）**：按 [版本路由规则](./rules/version-routing.md) 判定。**用户未指定版本时默认 v6**（ESM + import map）；v5 仅用于用户明确要求、维护存量普通 script 页面或需要 v5 版 enhance 多坐标系能力。判定后在回复开头用一句话说明所选版本。信号冲突无法判断时，按[补充问题](./prompts/fallback-questions.md)场景 10 补问；用户完全没提版本时不要追问。
1. 判断用户需要完整页面还是代码片段。需要页面时，v6 以 [v6 HTML 起始模板](./templates/v6/index.html)、v5 以 [v5 HTML 起始模板](./templates/v5/index.html) 作为文档结构。
2. 判断数据或服务类型，并确认 URL 格式。缺少必要的 URL、数据集或操作信息时，参考[补充问题](./prompts/fallback-questions.md)；否则使用模板中的公开 World REST 地图作为可运行的默认底图。
3. 先使用下方的 API 检索命令查找相关类或成员，再从 `examples/maplibregl/`、`src/maplibregl/` 和 `src/common/` 核实调用方式、参数和结果结构（业务 API 在 v5/v6 完全一致）。涉及原生 MapLibreGL API、样式规范时，按版本定向检索类型定义：**v6 核心**用 `metadata/maplibre-gl-v6/index.d.ts`，**v6 enhance 扩展/多坐标系（CRS）**用 `metadata/maplibre-gl-enhance-v6/index.d.ts`（enhance 6.14.0 类型）；**v5 原生及 enhance 扩展**用 `metadata/maplibre-gl-enhance/index.d.ts`；样式规范用 `metadata/maplibre-gl-enhance/style-spec.json`。不得一次性读取完整文件。检索结果不足时，只查看 `build/jsdocs/maplibregl/docs.json` 中相关 API，不要一次性读取完整文件。
4. 遵循[版本路由](./rules/version-routing.md)、[意图映射](./rules/intent-mapping.json)、[URL 格式规则](./rules/url-patterns.json)、[参数默认值](./rules/param-defaults.json)、[坐标系规则](./rules/coordinate-system.md)和[错误处理规则](./rules/error-handling.md)。WMTS/WMS 使用[Capabilities 工具](./modules/utils/ogc-capabilities.md)在生成页面中按需读取服务元数据，并使用 MapLibre 原生栅格数据源。
5. 用户要求完整页面时，在一个代码块中提供完整 HTML。确保包含完整文档结构、依赖加载（与版本匹配）、全屏地图容器、明确的初始化代码和可见的错误提示。除非必须由用户填写服务专属信息，否则不要使用伪代码或未替换的占位符；需要填写时应明确标注。
6. 简要说明如何保存和运行页面、需要替换的值，以及相关服务和跨域（CORS）要求。v6 页面必须提示：经 http(s) 访问（不能 file:// 双击）、import map 先于 module 脚本、iClient mjs CDN 地址的发布状态。代码应结构清晰、命名明确，便于用户继续扩展。

## API 检索

索引文件为 `assets/iclient-maplibregl.sqlite`，包含当前 iClient MapLibreGL 业务 API 记录（v5/v6 通用，业务类名与方法一致）。在 iClient-JavaScript 仓库根目录使用 Node.js 22.5.0 或更高版本运行检索脚本：

```bash
node skills/maplibregl/scripts/query-api.mjs search "热力图专题图"
node skills/maplibregl/scripts/query-api.mjs search "HeatMapLayer featureWeight"
node skills/maplibregl/scripts/query-api.mjs get FeatureService --member getFeaturesBySQL
```

`search` 用于按中文场景、类名或成员关键词检索；`get` 用于按类名和成员名精确查询。CLI 只返回匹配的 API 记录。不要把 MapboxGL API 索引或完整 JSDoc JSON 当作 MapLibreGL API 的替代来源。

examples 与插件资源可用共享查询器按 MapLibreGL 平台检索：

```bash
node skills/leaflet/scripts/query-examples.mjs search "mapv MapVLayer" --platform maplibregl
node skills/leaflet/scripts/query-examples.mjs get examples/maplibregl/mapvQianxi.html --platform maplibregl
```

完整 examples HTML 与对应 include helper 原文以 gzip 存储在 `assets/iclient-maplibregl-examples.sqlite`，查询命中后按需解压。

## 高频场景模块

| 场景 | 模块 |
|---|---|
| iServer REST Map 初始化 | [init-map.md](./modules/core/init-map.md) |
| 空白或自定义样式地图 | [empty-map.md](./modules/core/empty-map.md) |
| GeoJSON 图层 | [add-geojson.md](./modules/mapping/add-geojson.md) |
| MVT 矢量瓦片 | [vector-tile.md](./modules/mapping/vector-tile.md) |
| WMTS 栅格瓦片 | [WMTS.md](./modules/mapping/WMTS.md) |
| WMS 栅格图层 | [WMS.md](./modules/mapping/WMS.md) |
| L7 可视化（3D 弧线/飞线等 L7Layer） | [l7-layer.md](./modules/mapping/l7-layer.md) |
| WMTS/WMS Capabilities 解析 | [ogc-capabilities.md](./modules/utils/ogc-capabilities.md) |
| REST Data 矢量瓦片 | [rest-data-vector.md](./modules/utils/rest-data-vector.md) |
| REST Data 查询 | [feature-service.md](./modules/services/feature-service.md) |
| REST Data FGB 查询结果 | [rest-data-fgb.md](./modules/utils/rest-data-fgb.md) |
| REST Map 查询 | [query-service.md](./modules/services/query-service.md) |
| 缓冲区分析 | [buffer-analysis.md](./modules/services/buffer-analysis.md) |

模块中的代码片段默认即 **v6 具名导入写法**，可直接复制（v6 为默认版本）；仅当用户明确要 v5 时，才按[版本路由规则](./rules/version-routing.md)第 4 节还原为 `maplibregl.supermap.*` 全局写法。生成对应场景时，优先使用模块中引用的 MapLibreGL 示例核对参数和调用方式。WMTS/WMS 按对应模块中的 Capabilities 工具处理；其他未覆盖的服务类型不要凭空补全。

## few-shot 示例

v6（默认）：

* [加载基础地图 v6](./prompts/few-shot-examples/load-base-map-v6.md)
* [缓冲区分析与空间查询 v6](./prompts/few-shot-examples/buffer-analysis-query-v6.md)
* [加载 MVT 矢量瓦片](./prompts/few-shot-examples/load-vector-tile.md)
* [查询 REST Data 并加载 FGB](./prompts/few-shot-examples/rest-data-fgb.md)
* [加载 WMTS 栅格瓦片](./prompts/few-shot-examples/load-wmts.md)
* [加载 WMS 栅格图层](./prompts/few-shot-examples/load-wms.md)
* [L7 3D 弧线/飞线](./prompts/few-shot-examples/l7-arc3d.md)

v5（用户明确要求时）：

* [加载基础地图 v5](./prompts/few-shot-examples/load-base-map-v5.md)
* [缓冲区分析与空间查询 v5](./prompts/few-shot-examples/buffer-analysis-query-v5.md)

## 已核实的依赖加载方式

三套已核实组合（地址/版本号的唯一数据源是 [param-defaults.json](./rules/param-defaults.json) 的 `cdns` 段，不要猜测或更改）：

**组合②（v6 默认）——import map + 原生 ESM：**

```html
<link rel="stylesheet" href="https://iclient.supermap.io/web/libs/maplibre-gl-js/6.14.0/maplibre-gl.css">
<link rel="stylesheet" href="https://iclient.supermap.io/dist/maplibregl/iclient-maplibregl.min.css">
<script type="importmap">
{ "imports": { "maplibre-gl": "https://iclient.supermap.io/web/libs/maplibre-gl-js/6.14.0/maplibre-gl.mjs" } }
</script>
<script type="module">
  import * as maplibregl from 'maplibre-gl';
  import { initMap } from 'https://iclient.supermap.io/dist/maplibregl/iclient-maplibregl.mjs';
  // ...
</script>
```

要点：核心必须 `import * as`（v6 无 default）；iClient 只支持具名导入，无 `window.maplibregl` 全局；`LogoControl` 在 v6 改名为具名导出 `Logo`；import map 必须在所有 module 脚本之前；页面经 http(s) 访问；CDN 引核心时 worker 同目录自动定位，CSP 需含 `worker-src 'self' blob:`。iClient mjs 随 12.2.0 发布后在 CDN 可用，发布前本地用相对路径 `../../dist/maplibregl/iclient-maplibregl.mjs`。

**组合①（v5）——普通 script + 全局：**

```html
<script src="https://iclient.supermap.io/web/libs/maplibre-gl-js-enhance/5.9.0-2/maplibre-gl-enhance.js"></script>
<link href="https://iclient.supermap.io/web/libs/maplibre-gl-js-enhance/5.9.0-2/maplibre-gl-enhance.css" rel="stylesheet">
<script src="https://iclient.supermap.io/dist/maplibregl/iclient-maplibregl-es6.min.js"></script>
<link href="https://iclient.supermap.io/dist/maplibregl/iclient-maplibregl.min.css" rel="stylesheet">
```

**组合③（v6 桥接）**：页面无法改成 module 时，module 内 `import * as ns` 核心 → `window.maplibregl = { ...ns }`（必须复制，不能赋只读命名空间）→ 串行加载 UMD `iclient-maplibregl.js`，之后沿用 `maplibregl.supermap.*`。

**L7 可视化（L7Layer）的可选依赖**：iClient 两种产物都不内置 L7。凡是 L7 场景（`L7Layer`、3D 弧线 `arc3d`/飞线/大圆弧 `greatcircle`、L7 热力图、3D 柱图等，见 [l7-layer.md](modules/mapping/l7-layer.md)），必须按版本额外加载 maplibregl-l7-render（地址是 param-defaults.json `cdns.*.l7Render`）：

- v5：顺序固定为 **maplibre-gl-enhance 5.9.0-2**（L7 场景核心固定用 enhance，不用普通 5.6.0）→ `maplibregl-l7-render/0.0.4/maplibregl-l7-render.js` 普通 script（注册全局 `L7`）→ iClient script。
- v6（12.2.0 起的 iClient mjs）：iClient mjs **不静态 import** render——`./L7/l7-render` 是懒读 `window.L7` 的 var external Proxy。三步：① import map 把 `maplibre-gl` 映到 **enhance 6.14.0 mjs**（替换核心映射），并加 `maplibregl-l7-render` → `1.0.0/maplibregl-l7-render.mjs`；② 业务单个 module 内加 `import * as L7Render from 'maplibregl-l7-render'; window.L7 = L7Render;`；③ 照常具名导入 `L7Layer`。不使用 L7 的页面零配置（只映核心、不请求 render）。1.0.0 mjs CDN 待发布，未就位时注明可换自托管同目录 mjs，不降级 v5。
- **L7 场景无条件用 enhance**（v5/v6 都是）：fork 版 render 每帧调 `map.getCRS()`，普通核心没有该方法，运行时报 `getCRS is not a function`、场景出不了图；与底图是否 3857 无关，是 enhance 三分法的固定例外（仓库 67 个 l7 示例均为 `include="L7,maplibre-gl-enhance"`）。

不要混用 MapboxGL 资源包、`mapboxgl` 命名空间或 Mapbox 专属 API。仅当已核实的功能确实需要时才加载 enhance 资源（**原生 EPSG:4326 显示（`CRS.EPSG4326`）或 3857/4326 之外的自定义投影**；4326 服务接受动态投影到 3857 出图时不需要；**使用 `L7Layer` 时无条件需要**，与坐标系无关）。v5 用 enhance 5.9.0-2 普通脚本；**v6 默认仍生成 v6**：import map 把裸名 `maplibre-gl` 映到 enhance 6.14.0 mjs（核心超集 fork，含 CRS），不因此降级 v5（写法见 [coordinate-system.md](rules/coordinate-system.md)）。不要让用户使用 `dist/maplibregl/include-maplibregl.js`，该脚本仅用于官方示例页。

## 地图与 API 规则

* **v5**：iClient API 使用 `maplibregl.supermap.*` 全局；**v6**：业务类具名导入（`import { FeatureService } from '.../iclient-maplibregl.mjs'`），核心原生 API 使用导入的 `maplibregl` 命名空间及地图实例。两类版本中类名、方法、参数结构一致。
* iServer REST Map URL（`/rest/maps/{mapName}`）使用 `initMap(url, options)`。该方法返回一个解析为 `{ map }` 的 Promise；地图样式可能仍在加载，添加数据源或图层前应注册 `load` 监听器。
* 对于空白或自定义 MapLibre 样式，以及非 REST 底图，使用 `new maplibregl.Map(...)` 并提供有效的样式。不要对无关服务 URL 调用 `initMap`。
* REST Data（`/rest/data`）使用 `FeatureService`；REST Map（`/rest/maps/`）使用 `QueryService`。编写查询前，先从匹配示例中核实服务参数和结果路径。
* 使用 `map.addSource()` 和 `map.addLayer()` 添加 GeoJSON。除非明确采用了经核实支持的转换方式，否则 GeoJSON 坐标必须使用 WGS84 经纬度顺序 `[longitude, latitude]`。
* 栅格或矢量瓦片叠加必须使用与地图兼容的数据源定义和投影。不要臆造瓦片模板、图层名称、服务参数或凭据。
* WMTS/WMS 的 Capabilities 解析工具只在生成的页面代码中显式调用，不在 skill 加载或 URL 识别阶段自动请求。页面需按工具说明加载 `fast-xml-parser`（v6 module 页面仍可用其经典 script，经 `window.XMLParser` 访问），并将服务图层作为 `type: 'raster'` 的 source 和 `type: 'raster'` 的 layer 添加。
* WMS 工具当前只生成适用于 EPSG:3857 的 `{bbox-epsg-3857}` 模板；WMTS 仅支持能够安全映射到 MapLibre `{z}/{x}/{y}` 的连续瓦片矩阵。工具不能支持时应明确报错，不得猜测投影或缩放级别。
* 使用 `.catch(...)`、错误事件监听器或仓库已有的回调错误处理方式显式报告异步错误。不要静默吞掉错误。v6 特有报错排查见[错误处理规则](./rules/error-handling.md)第 7 节。

## 输出质量检查清单

* 默认提供独立 HTML、默认按 v6 生成；仅在用户要求时提供代码片段或 v5。
* **默认 v6 输出前自检（任一不满足即为错误）**：不出现 `iclient-maplibregl-es6.min.js`/`iclient-maplibregl.js` 普通 script（组合③桥接除外）；有 `<script type="importmap">` 且在 module 脚本之前；业务代码无 `maplibregl.supermap.` 前缀、业务类全部在 mjs 的 `import { ... }` 列表中；核心为 `import * as maplibregl`。
* 含 `L7Layer` 的页面：v5 script 顺序固定为 enhance 5.9.0-2（不是普通核心）→ `maplibregl-l7-render/0.0.4/maplibregl-l7-render.js` → iClient；v6 import map 必须把 `maplibre-gl` 映到 enhance 6.14.0 mjs 且含裸名 `maplibregl-l7-render` → 1.0.0 render mjs，业务单个 module 内含 `import * as L7Render ...; window.L7 = L7Render` 桥接与 `L7Layer` 具名导入。两版都禁止用 `include-maplibregl.js` 的 `include="L7"`。
* HTML 中引用的脚本、样式表、样式和 DOM 元素都必须存在；v6 页面与 iClient 内部裸名指向同一核心 URL（单例）。
* 使用正确的导入方式：v6 核心 `import * as`、iClient 具名导入；v5 使用 `maplibregl` 全局与 `maplibregl.supermap.*`。
* 安全时使用具体默认值；用户专属的 URL、数据集名称和凭据必须明确标出。
* 地图样式就绪后再添加叠加数据，并向用户显示初始化或服务错误。
* v6 页面回复中说明：必须 http(s) 访问、mjs CDN 地址的发布状态（发布前用相对路径）。
* 用户要求实现的功能中不得留有"在此处添加代码"等占位注释。

生成约束见[系统提示词](./prompts/system-prompt.md)，可运行的基础页面见 v6 / v5 [起始模板](./templates/v6/index.html)。
