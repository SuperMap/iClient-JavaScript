# 错误处理规则

## 版本约定

先按 [version-routing.md](version-routing.md) 判定版本（用户未指定时默认 v6）。下文错误代码默认即 v6 具名导入写法（无 `maplibregl.supermap.` 前缀，使用前先 import）；用户明确要 v5 时按 version-routing.md 第 4 节还原全局写法，业务规则不变。CDN 地址与版本号以 [param-defaults.json](param-defaults.json) 的 `cdns.v5` / `cdns.v6` 为准，不按用户要求切换到未经核实的地址。

## 错误对照

以下错误在生成 MapLibreGL 代码时最常见。每类给出错误写法与正确写法，生成代码前逐项检查。

### 1. 使用 MapboxGL 命名空间或 CDN

MapLibreGL 的全局命名空间是 `maplibregl`，不是 `mapboxgl`。MapboxGL 的 CDN 与类名不能用于本技能。

**错误代码**：

```javascript
mapboxgl.supermap.initMap(mapUrl);
new mapboxgl.Map({ container: 'map' });
```

```html
<script src="https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/1.12.1-11/mapbox-gl-enhance.js"></script>
```

**正确代码**：

```javascript
initMap(mapUrl);
new maplibregl.Map({ container: 'map', style: { version: 8, sources: {}, layers: [] } });
```

v5 页面的 CDN 与版本固定为 `templates/v5/index.html` 中的 maplibre-gl-enhance 与 iclient-maplibregl；v6 页面按 `templates/v6/index.html` 的 import map + mjs 组合，不按用户要求切换到未经核实的地址。

### 2. 在样式就绪前添加数据源或图层

`initMap()` 解析时地图实例已创建，但样式尚未加载完成。此时直接调用 `addSource`/`addLayer` 会抛错。

**错误代码**：

```javascript
initMap(mapUrl, { mapOptions: { container: 'map' } }).then(function(result) {
    result.map.addSource('overlay', { type: 'geojson', data: geojson });
});
```

**正确代码**：

```javascript
initMap(mapUrl, { mapOptions: { container: 'map' } }).then(function(result) {
    var map = result.map;
    map.once('load', function() {
        map.addSource('overlay', { type: 'geojson', data: geojson });
    });
});
```

用 `map.loaded()` 判断就绪状态，未就绪时注册 `map.once('load', ...)`。不要照搬 MapboxGL 技能里「initMap 后禁止使用 load 监听」的说法，那是 MapboxGL 实现的行为。

### 3. 向 initMap 传入 style

`initMap()` 会根据 REST Map 服务自动生成样式。传入 `style` 会覆盖该样式，导致底图丢失。

**错误代码**：

```javascript
initMap(mapUrl, {
    mapOptions: { container: 'map', style: { version: 8, sources: {}, layers: [] } }
});
```

**正确代码**：

```javascript
initMap(mapUrl, {
    mapOptions: { container: 'map', center: [0, 0], zoom: 2 }
});
```

需要完全自定义样式时，改用 `new maplibregl.Map`，见 [empty-map.md](../modules/core/empty-map.md)。

### 4. 混淆 QueryService 与 FeatureService

`QueryService` 用于 `/rest/maps/`（地图图层查询），`FeatureService` 用于 `/rest/data`（数据集查询）。参数键名和结果路径都不同。

**错误代码**：

```javascript
// ❌ 对 /rest/maps/ 使用 FeatureService
new FeatureService(mapUrl).getFeaturesBySQL({ datasetNames: ['World:Countries'] });

// ❌ 在 FeatureService 参数中使用 QueryService 的键名
var param = new GetFeaturesBySQLParameters({
    queryParams: { name: 'Countries@World' },
    datasetNames: ['World:Countries']
});
```

**正确代码**：

```javascript
// ✅ /rest/maps/ 用 QueryService，name 为 图层@数据源，结果在 recordsets
var queryParam = new QueryBySQLParameters({
    queryParams: { name: 'Capitals@World.1', attributeFilter: 'POPULATION > 10000000' }
});
new QueryService(mapUrl).queryBySQL(queryParam).then(function(result) {
    var features = result.result.recordsets[0].features;
});

// ✅ /rest/data 用 FeatureService，datasetNames 为 数据源:数据集，结果在 features
var sqlParam = new GetFeaturesBySQLParameters({
    queryParameter: { name: 'Countries@World', attributeFilter: 'POPULATION > 10000000' },
    datasetNames: ['World:Countries']
});
new FeatureService(dataUrl).getFeaturesBySQL(sqlParam).then(function(result) {
    var features = result.result.features;
});
```

### 5. 用缓冲查询替代缓冲分析

`getFeaturesByBuffer` 只返回落在缓冲范围内的已有要素，不生成缓冲面。

**错误代码**：

```javascript
new FeatureService(dataUrl)
    .getFeaturesByBuffer(new GetFeaturesByBufferParameters({ datasetNames: ['World:Capitals'] }));
```

**正确代码**：

```javascript
new SpatialAnalystService(analystUrl)
    .bufferAnalysis(new GeometryBufferAnalystParameters({
        sourceGeometry: lineGeometry,
        sourceGeometrySRID: 4326,
        bufferSetting: new BufferSetting({
            endType: BufferEndType.ROUND,
            leftDistance: new BufferDistance({ value: 500 }),
            rightDistance: new BufferDistance({ value: 500 }),
            radiusUnit: 'METER',
            semicircleLineSegment: 10
        })
    })).then(function(result) {
        var bufferFeature = result.result.resultGeometry;
    });
```

### 6. 隐式改变坐标系或无提示降级

`initMap()` 对平面坐标系会直接拒绝。是否需要 maplibre-gl-enhance 按三分法：3857 不需要；4326 服务**接受动态投影到 3857 出图**时不需要（要求服务开启动态投影，地图实际按 3857 渲染）；**原生 4326 显示（`CRS.EPSG4326`）或 3857/4326 之外的自定义投影**需要 enhance。v5 用 5.9.0-2 普通脚本；v6 默认仍生成 v6——import map 把裸名 `maplibre-gl` 映到 enhance 6.14.0 mjs（超集 fork），见 [coordinate-system.md](coordinate-system.md)。拦截条件是 `非3857 && 服务未开启动态投影(dynamicProjection:false) && 无 maplibregl.CRS` 三者同时成立。

**错误代码**：

```javascript
// 服务是 EPSG:4326 或自定义坐标系，却按 3857 拼接瓦片模板
tiles: ['https://host/iserver/services/map-x/rest/maps/X/tileImage.png?bbox={bbox-epsg-3857}']
```

**正确代码**：先确认服务坐标系，再选择模板或 CRS 配置；无法确认时先询问用户，或按 [coordinate-system.md](./coordinate-system.md) 的定向检索流程核实，并说明增强脚本能力要求。

### 7. v6 加载与导入错误（仅 ESM 技术栈）

| 现象 | 原因 | 正确做法 |
|---|---|---|
| `Failed to resolve module specifier "maplibre-gl"` | 页面缺 import map，或 import map 出现在 module 脚本之后 | 在所有 module 脚本之前放置 import map，裸名映到核心 v6 mjs |
| `maplibregl is not a constructor` / 默认导入得到 undefined | v6 无 default 导出，用了 `import maplibregl from 'maplibre-gl'` | 改为 `import * as maplibregl from 'maplibre-gl'` |
| `Cannot add property supermap, object is not extensible`（严格模式 TypeError） | 组合③桥接时 `window.maplibregl = ns` 直接赋只读命名空间 | `window.maplibregl = { ...ns }` 复制为可变对象后，再串行加载 iclient UMD |
| file:// 打开白屏、worker 报错 | file:// 下 module worker 被浏览器拦截 | 经 http(s) 静态服务访问页面 |
| v6 页面用 `maplibregl.supermap.X` 报 undefined | v6 ESM 没有 `window.maplibregl` 全局 | 从 iclient-maplibregl.mjs 具名导入 `X`；注意 `LogoControl` 在 v6 改名为 `Logo` |
| `Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of ""`（核心或 enhance 的 mjs/worker） | CDN 上 .mjs 文件已部署（200）但响应缺 Content-Type，浏览器对 module 强制 MIME 检查直接拒绝 | 需服务端为 .mjs 配置 `text/javascript`；修复前核心 mjs 可临时映 unpkg 同文件（`https://unpkg.com/maplibre-gl@6.14.0/dist/maplibre-gl.mjs`，MIME 正常），enhance mjs 换自托管同目录文件（worker/css 相邻）；在回复中向用户说明，不因此降级 v5 |
| CDN 引 iClient mjs / render mjs 404 | iClient 12.2.0 或 maplibregl-l7-render 1.0.0 mjs 尚未部署到该 CDN | 本地开发用相对路径 `../../dist/maplibregl/iclient-maplibregl.mjs`；render mjs 未就位时换自托管同目录文件；正式页面待发布后使用 CDN 地址，并在回复中说明，不因此降级 v5 |
| v6 用 `L7Layer` 报 `Failed to resolve module specifier "maplibregl-l7-render"` | 业务 module `import ... from 'maplibregl-l7-render'`，但 import map 缺该裸名（iClient mjs 本身以懒 Proxy 读 `window.L7`，不静态依赖该裸名；报错来自业务脚本的 import） | import map 在 `maplibre-gl` 旁加 `"maplibregl-l7-render": "https://iclient.supermap.io/web/libs/maplibregl-l7-render/1.0.0/maplibregl-l7-render.mjs"`；同时把 `maplibre-gl` 映到 enhance 6.14.0 mjs。详见 [modules/mapping/l7-layer.md](../modules/mapping/l7-layer.md) |
| v6 用 `L7Layer` 报 `L7.LineLayer is not a constructor`，或 `Cannot read properties of undefined` | 只做了 import map 映射，缺 `window.L7 = L7Render` 桥接：iClient mjs 的 render external 是懒读 `window.L7` 的 Proxy，读不到全局时取到空对象 | 业务 module 中写 `import * as L7Render from 'maplibregl-l7-render'; window.L7 = L7Render;`（须在 `new L7Layer` 执行前，map load 回调内即可），再具名导入 `L7Layer` |
| v6 L7 场景运行时报 `map.getCRS is not a function` / `e.getCRS is not a function`，场景不出图 | 核心映成了普通 maplibre-gl 6.14.0；fork 版 render 每帧调 `map.getCRS()`，普通核心无此方法 | **L7 页面无条件使用 enhance**：import map 把 `maplibre-gl` 改映到 `maplibre-gl-js-enhance/6.14.0/maplibre-gl-enhance.mjs`（核心超集 fork，与底图是否 3857 无关），render mjs 经同一裸名拿到同一含 CRS 的实例 |
| v5 用 `L7Layer` 报 `L7.LineLayer is not a constructor`，或图层静默不渲染 | iClient 传统 js 产物运行时读全局 `L7`；未加载 0.0.4 render script，或顺序不对 | 普通 script 顺序固定为 **maplibre-gl-enhance 5.9.0-2**（L7 场景固定用 enhance，普通 5.6.0 核心缺 `getCRS`）→ `maplibregl-l7-render/0.0.4/maplibregl-l7-render.js`（注册全局 `L7`）→ iClient；不要用 include-maplibregl.js。详见 [modules/mapping/l7-layer.md](../modules/mapping/l7-layer.md) |
| render mjs 已正确映射并桥接，但 L7 场景报 `Cannot read properties of undefined (reading 'height')`（读 `map.transform`） | 1.0.0 发布前的 L7 fork 旧代码（20261015，= 0.0.4 同源）尚未完成 v6 适配：maplibre-gl v6 运行时已无 `map.transform` | 属 maplibregl-l7-render 1.0.0 的发布前适配项（viewport 尺寸/投影方法改用 v6 公开 API），不是页面配置问题；向用户说明并等待 1.0.0 mjs 发布，或临时使用 v5 组合。注意与 `getCRS` 报错区分：后者是核心没映 enhance |

## 报告要求

- 用 `.catch(...)` 或 `try/catch` 处理 `initMap()` 和服务请求的 Promise 拒绝（v6 module 脚本中同样需要，未捕获的拒绝只进控制台、页面无提示）。
- 注册地图 `error` 监听器报告网络、样式、数据源错误。
- 向用户显示简洁错误信息，同时在控制台记录底层错误。
- 不静默吞掉错误，不把失败包装成空数据或成功结果。
- 请求前核实服务 URL 与必填参数，缺信息时按 [fallback-questions.md](../prompts/fallback-questions.md) 询问。
- v6 页面还需在回复中说明：必须 http(s) 访问、import map 版本与 iClient mjs 地址的发布状态。
