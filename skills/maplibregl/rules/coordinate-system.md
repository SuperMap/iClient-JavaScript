# 坐标系规则

## 版本前提

先按 [version-routing.md](version-routing.md) 判定 maplibre-gl 版本（默认 v6），坐标系处理随版本分流。

## 是否需要 maplibre-gl-enhance（三分法，与 v5/v6 无关）

maplibre-gl 核心只支持 EPSG:3857；其他坐标系的能力由 enhance 的 `maplibregl.CRS` 提供。

| 场景 | 需要 enhance？ | 说明 |
|---|---|---|
| 底图/服务为 EPSG:3857 | **不需要** | 核心原生支持 |
| EPSG:4326 服务，**接受动态投影到 3857 出图**（initMap 栅格默认路径） | **不需要** | iClient 非 enhance 分支把 crs 设为 3857、瓦片走 `zxyTileImage.png?z/x/y`，iServer 服务端动态投影；要求服务开启了动态投影（`dynamicProjection:true`）。地图实际按 3857 渲染 |
| 需要在**原生 EPSG:4326** 下渲染（`crs: maplibregl.CRS.EPSG4326` 等经纬度显示） | **需要** | 如 MVT 4326 矢量瓦片（`mvtVectorTile_4326.html`）、`01_tiledMapLayer_4326.html`、经纬网、draw 4326 等示例全部加载 enhance |
| 非 3857 服务且**未开启动态投影**（`dynamicProjection:false`），又不用 enhance | —— | initMap 直接 reject（见下方精确条件） |
| EPSG:3857/4326 之外的自定义/地方投影 | **需要** | 用 `new maplibregl.CRS(name, wkt, extent)` 定义 |

**initMap 的精确拦截条件**（源码 `src/maplibregl/mapping/InitMap.js`）：

```js
epsgCode !== 3857 && !dynamicProjection && !maplibregl.CRS
```

三者同时成立才 reject（"The EPSG code xxxx needs to include maplibre-gl-enhance.js"）。公共示例 map-world/World 是"4326 且 `dynamicProjection:false`"的特例，所以无 enhance 时被拦——这不代表"4326 一律需要 enhance"，也不代表"4326 一律不需要"：用户要原生 4326 显示（场景 3）时仍必须加载 enhance。

**与上表无关的固定例外：使用 `L7Layer` 时一律加载 enhance**（即使底图是 3857）。fork 版 maplibregl-l7-render 每帧经 `map.getCRS()` 取坐标系参数，普通 maplibre-gl 核心没有该方法，运行时抛 `getCRS is not a function`、L7 场景出不了图。依据：提交 adb7137a7 将全部 l7 示例统一改为 `include="L7,maplibre-gl-enhance"`。L7 两版加载写法见 [l7-layer.md](../modules/mapping/l7-layer.md)。

## v5 / v6 资源形态

* **v5**：enhance 5.9.0-2 普通 script（`maplibregl.CRS` 全局可用）。
* **v6（默认，含自定义投影，不退回 v5）**：enhance v6（6.14.0）是核心超集 fork，ESM 形态。类型定义已就位（`metadata/maplibre-gl-enhance-v6/index.d.ts`，命名导出 `CRS` 与全部核心 API）。用法：**import map 把裸名 `maplibre-gl` 直接映到 enhance.mjs**（而非核心 mjs），页面与 iClient 内部拿到同一命名空间，`maplibregl.CRS` 即可用：

  ```html
  <link rel="stylesheet" href="https://iclient.supermap.io/web/libs/maplibre-gl-js-enhance/6.14.0/maplibre-gl-enhance.css">
  <script type="importmap">
  { "imports": { "maplibre-gl": "https://iclient.supermap.io/web/libs/maplibre-gl-js-enhance/6.14.0/maplibre-gl-enhance.mjs" } }
  </script>
  ```

  * 3857、或 4326 接受动态投影到 3857 的场景不引 enhance，import map 仍映核心 CDN mjs（`web/libs/maplibre-gl-js/6.14.0/maplibre-gl.mjs`）；
  * 自定义投影页面正常生成 v6；URL/版本以 [param-defaults.json](param-defaults.json) `cdns.v6.enhance` 为准（2026-11-25 核实 mjs/css/worker 已部署 200；.mjs 暂缺 Content-Type，浏览器严格 MIME 检查会拦截，需服务端配置 text/javascript，未修复前回复中注明可换自托管同目录 mjs，worker/css 相邻）；
  * 只有用户明确要求 v5 时才用 v5 组合①。

## 通用铁律

* 根据服务元数据或对应版本的 MapLibreGL 示例，确认底图及每个叠加图层的投影。
* 除非通过已核实的流程转换数据，否则 GeoJSON 坐标应使用 WGS84 经纬度，并按 `[longitude, latitude]` 排列。
* 栅格和矢量瓦片叠加必须使用兼容的投影、瓦片方案和缩放级别约定。不要认为格式正确的瓦片 URL 就一定能与底图对齐。
* 对于自定义 CRS，先按需（关键字定位、只读所需片段）检索对应版本的类型定义：v5 查 `metadata/maplibre-gl-enhance/index.d.ts`（需要样式定义时再查同目录 `style-spec.json`）；v6 核心原生 API 查 `metadata/maplibre-gl-v6/index.d.ts`，**多坐标系/enhance 扩展查 `metadata/maplibre-gl-enhance-v6/index.d.ts`（enhance 6.14.0 类型已就位，含 CRS 类）**。再从 `examples/maplibregl/` 中匹配的示例确认支持情况及所需资源。不要整份读取 metadata 文件，未经核实也不要复用 MapboxGL enhance 配置。
* 不得把投影坐标误标为经纬度；也不得在未知源 CRS 或目标 CRS 时静默转换数据。
