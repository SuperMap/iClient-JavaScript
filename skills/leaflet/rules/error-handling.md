# SuperMap iClient for Leaflet 错误处理指南

## 常见错误

### 错误 1：使用旧版 / MapboxGL 命名空间

**错误代码**：
```javascript
var map = new SuperMap.Map('map');                       // ❌ 旧版 API
var fs = new mapboxgl.supermap.FeatureService(url);       // ❌ MapboxGL 命名空间
```

**正确代码**：
```javascript
var map = L.map('map', { center: [39.9, 116.39], zoom: 3 });        // ✅ Leaflet 地图
var fs = new L.supermap.FeatureService(url);                        // ✅ L.supermap 命名空间
```

---

### 错误 2：DOM 中没有 id="map" 的容器

`L.supermap.initMap` 内部写死 `L.map('map', ...)`，容器 id 不可配置。

**错误代码**：
```html
<div id="container" style="height:100%"></div>  <!-- ❌ id 不是 map -->
<script>
  L.supermap.initMap(url, { mapOptions: { container: 'container' } }); // ❌ container 参数无效
</script>
```

**正确代码**：
```html
<div id="map" style="position:absolute;top:0;left:0;width:100%;height:100%"></div>
<script>
  L.supermap.initMap(url, { mapOptions: { center: [40, 118], zoom: 7 } });
</script>
```

---

### 错误 3：容器高度为 0 或未设置定位

Leaflet 依赖容器实际像素尺寸渲染瓦片；容器没有高度时地图空白且不报错。

**错误代码**：
```html
<div id="map"></div>  <!-- ❌ 无高度 -->
```

**正确代码**：
```html
<div id="map" style="position:absolute;top:0;left:0;width:100%;height:100%"></div>
```

地图容器尺寸变化后需要手动通知 Leaflet：
```javascript
map.invalidateSize(); // ✅ 容器尺寸变化后调用
```

---

### 错误 4：在 initMap 之后等待 map.on('load')

Leaflet 没有 MapboxGL 的 `load` 事件；图层通过 `.addTo(map)` 同步挂载。

**错误代码**：
```javascript
L.supermap.initMap(url, { mapOptions: {} }).then(function (result) {
    var map = result.map;
    map.on('load', function () {  // ❌ Leaflet 无此事件，永远不会执行
        new L.supermap.TiledMapLayer(overlayUrl).addTo(map);
    });
});
```

**正确代码**：
```javascript
L.supermap.initMap(url, { mapOptions: {} }).then(function (result) {
    var map = result.map;
    new L.supermap.TiledMapLayer(overlayUrl).addTo(map); // ✅ 直接添加
});
```

---

### 错误 5：用 addSource / addLayer 添加图层

**错误代码**：
```javascript
map.addSource('overlay', { type: 'raster', tiles: [url] });  // ❌ Leaflet 无这些方法
map.addLayer({ id: 'overlay', type: 'raster', source: 'overlay' });
```

**正确代码**：
```javascript
// 栅格底图/叠加
new L.supermap.TiledMapLayer(url, { transparent: true, opacity: 0.6 }).addTo(map);

// GeoJSON
var geoLayer = L.geoJSON(geojson, { style: style, onEachFeature: onEachFeature }).addTo(map);

// 移除
map.removeLayer(geoLayer);
```

---

### 错误 6：经纬度顺序写成 [lng, lat]

Leaflet 的 `LatLng` 是 `[lat, lng]`，与 MapboxGL 的 `[lng, lat]` 相反。

**错误代码**：
```javascript
var map = L.map('map', { center: [116.39, 39.9], zoom: 5 }); // ❌ 被当作南纬 116°
```

**正确代码**：
```javascript
var map = L.map('map', { center: [39.9, 116.39], zoom: 5 });          // ✅
var marker = L.marker(L.latLng(39.9, 116.39)).addTo(map);            // ✅
```

---

### 错误 7：WMTS/WMS 使用 MapboxGL 的瓦片模板

**错误代码**：
```javascript
// ❌ Leaflet 侧不存在的瓦片模板写法
map.addSource('wms', { type: 'raster', tiles: ['...wms?...&bbox={bbox-epsg-3857}'], tileSize: 256 });
```

**正确代码**：
```javascript
// WMS：Leaflet 原生
new L.TileLayer.WMS(wmsUrl, {
    layers: 'China', format: 'image/png', transparent: true, noWrap: true
}).addTo(map);

// WMTS：iClient 类
new L.supermap.WMTSLayer(wmtsUrl, {
    layer: 'China', style: 'default', tilematrixSet: 'CUSTOM_China',
    format: 'image/png', requestEncoding: 'REST'
}).addTo(map);
```

---

### 错误 8：CRS 与底图不一致 / resolutions 数量不匹配

`crs` 只能在 `L.map()` 构造时指定，创建后无法切换。

**错误代码**：
```javascript
var map = L.map('map', { center: [39, 105], zoom: 5 });  // ❌ 默认 EPSG:3857，与地方坐标系底图不匹配
new L.supermap.TiledMapLayer(nonEarthMapUrl).addTo(map);
```

**正确代码**：
```javascript
var map = L.map('map', {
    crs: new L.supermap.CRS.NonEarthCRS({
        bounds: L.bounds([48.4, -7668.25], [8958.85, -55.58]),
        origin: L.point(48.4, -55.58)
    }),
    center: [-3861.911, 5100],
    zoom: 2
});
new L.supermap.TiledMapLayer(nonEarthMapUrl, { noWrap: true }).addTo(map);
```

`L.supermap.Proj.CRS` 的 `resolutions` 必须与瓦片服务的分辨率数组逐项对应，否则瓦片错位。

---

### 错误 9：混淆 QueryService 与 FeatureService

QueryService 用于 `/rest/maps/`（地图图层查询），FeatureService 用于 `/rest/data`（数据集查询）。它们的参数名和结果格式不同。

**错误代码**：
```javascript
// ❌ 对 /rest/maps/ URL 使用 FeatureService
new L.supermap.FeatureService('http://host/iserver/services/map-world/rest/maps/World')
    .getFeaturesBySQL({ datasetNames: ['World:Countries'] });

// ❌ FeatureService 中使用 QueryService 的图层名格式
var param = new L.supermap.GetFeaturesBySQLParameters({
    queryParameter: { name: 'Countries@World.1' },   // ❌ 这是地图图层名
    datasetNames: ['World:Countries']
});
```

**正确代码**：
```javascript
// ✅ /rest/maps/ → QueryService，名称格式 "图层名@数据源[.n]"
var param = new L.supermap.QueryBySQLParameters({
    queryParams: { name: 'Countries@World.1', attributeFilter: 'SMID < 10' }
});
new L.supermap.QueryService(mapUrl).queryBySQL(param).then(function (r) {
    var features = r.result.recordsets[0].features;
    L.geoJSON(features).addTo(map);
});

// ✅ /rest/data → FeatureService，名称格式 "数据源:数据集"
var param = new L.supermap.GetFeaturesBySQLParameters({
    queryParameter: { name: 'Countries@World', attributeFilter: 'SMID = 234' },
    datasetNames: ['World:Countries']
});
new L.supermap.FeatureService(dataUrl).getFeaturesBySQL(param).then(function (r) {
    var features = r.result.features;
    L.geoJSON(features).addTo(map);
});
```

---

### 错误 10：分析参数传入裸 GeoJSON 而不是 Leaflet 图层

Leaflet 侧 `sourceGeometry` / `geometry` 可直接接收 `L.polyline`、`L.polygon` 等图层对象。

**错误代码**：
```javascript
var param = new L.supermap.GeometryBufferAnalystParameters({
    sourceGeometry: {
        type: 'LineString',
        coordinates: [[116.39, 39.9], [116.40, 39.9]]
    } // ❌ 不会自动转换
});
```

**正确代码**：
```javascript
var roadLine = L.polyline(pointsList, { color: 'red' }).addTo(map);
var param = new L.supermap.GeometryBufferAnalystParameters({
    sourceGeometry: roadLine,   // ✅ 直接传 Leaflet 图层
    bufferSetting: new L.supermap.BufferSetting({
        endType: L.supermap.BufferEndType.ROUND,
        leftDistance: new L.supermap.BufferDistance({ value: 250 }),
        rightDistance: new L.supermap.BufferDistance({ value: 250 }),
        semicircleLineSegment: 10
    })
});
```

需要显式转换时可使用 `L.supermap.Util.toGeoJSON(layer)` / `L.supermap.Util.toSuperMapGeometry(layer)`。

---

## 警告分类

### 分类 1：URL 格式错误

**警告 1.1：缺少 /rest/maps/ 路径**
```
⚠️ 地址格式警告

您的 iServer 地图地址可能不完整。

错误示例：
✗ https://iserver.supermap.io/iserver/services/map-china400
✗ https://iserver.supermap.io/iserver/services/map-china400/rest

正确格式：
✓ https://iserver.supermap.io/iserver/services/map-world/rest/maps/World
✓ 使用 initMap: L.supermap.initMap(host + '/iserver/services/map-world/rest/maps/World')
```

**检测条件**：URL 包含 `/iserver/services/` 但不包含 `/rest/maps/`，且不是 wmts/wms 路径

**警告 1.2：缺少 /rest/data 路径**
```
⚠️ 地址格式警告

您的 iServer 数据服务地址可能不完整。

错误示例：
✗ https://iserver.supermap.io/iserver/services/data-world
✗ https://iserver.supermap.io/iserver/services/data-world/rest

正确格式：
✓ https://iserver.supermap.io/iserver/services/data-world/rest/data
```

**检测条件**：URL 包含 `/iserver/services/` 和 `data-` 但不包含 `/rest/data`

**警告 1.3：WMTS / WMS 路径混淆**
```
⚠️ 服务类型警告

WMTS 与 WMS 的路径段不同，且使用不同的图层类：

✗ https://iserver.supermap.io/iserver/services/map-china/ogc/wmts/China
✓ https://iserver.supermap.io/iserver/services/map-china/wmts100

✗ https://iserver.supermap.io/iserver/services/map-china/wms111   （缺地图名）
✓ https://iserver.supermap.io/iserver/services/map-china/wms111/China
```

---

## 严格约束

### CDN 约束
- Leaflet 核心版本固定为 **1.9.4**
- iClient for Leaflet 脚本使用 `dist/leaflet/iclient-leaflet-es6.min.js`
- 禁止根据用户版本要求更改 CDN 链接
- 普通 Leaflet 场景**不要**引入 `mapbox-gl-js-enhance`（仅在 `leaflet-mapbox-gl` 等插件场景需要）

**必需 CDN（Leaflet JS 必须先于 iClient JS；CSS 放在页面 `<head>`）**：
```html
<link rel="stylesheet" href="https://iclient.supermap.io/web/libs/leaflet/1.9.4/leaflet.css">
<script src="https://iclient.supermap.io/web/libs/leaflet/1.9.4/leaflet.js"></script>
<script src="https://iclient.supermap.io/dist/leaflet/iclient-leaflet-es6.min.js"></script>
<link rel="stylesheet" href="https://iclient.supermap.io/dist/leaflet/iclient-leaflet.min.css">
```

### 命名空间约束
- 必须使用 `L.supermap`（而非 `SuperMap`、`mapboxgl.supermap`、`maplibregl.supermap`）
- CRS 使用 `L.supermap.Proj.CRS` / `L.supermap.CRS.*`；**禁止** `mapboxgl.CRS(...)`
- 缓冲区分析必须使用 `L.supermap.SpatialAnalystService`

### 初始化约束
- 对 `/rest/maps/` 服务：优先使用 `L.supermap.initMap(url, { mapOptions, layerOptions })`
- `initMap` 的容器 id 固定为 `'map'`，不得传 `container`
- `initMap` 后直接 `.addTo(map)`，禁止 `map.on('load', ...)`
- 手动 `L.map(...)` 时必须显式传 `crs`（非 EPSG:3857 场景）
- 手动 `L.map(...)` 后可直接添加图层，**不需要**等待任何 load 事件

---

## 校验规则（优先级: SQLite FTS5 API 索引 + url-patterns.json + modules）

### 校验优先级

| 校验内容 | 数据来源 | 说明 |
|---------|---------|-----|
| 类名/方法名 | SQLite FTS5 API 检索 CLI | 从 API 索引按类名/成员名查询 |
| 参数名 | SQLite FTS5 API 检索 CLI | 查询匹配 API 记录中的参数定义 |
| URL 路径格式 | `rules/url-patterns.json` | **不是** JSDoc（JSDoc 只有 string 类型） |
| 参数具体值 | `modules/*.md` | 结合业务场景 |

### 1. 类名/方法名校验

**数据来源**：SQLite FTS5 API 检索 CLI

```
校验方法: `node scripts/query-api.mjs get <类名>`，需要时指定 `--member <成员名>`
```

| 错误写法 | 正确写法 | 说明 |
|---------|---------|-----|
| `mapboxgl.supermap.WMTSLayer` | `L.supermap.WMTSLayer` | 命名空间 |
| `L.supermap.WMSLayer` | `L.TileLayer.WMS` | Leaflet 侧无 WMSLayer 类 |
| `L.supermap.TileVectorLayer` | `L.supermap.TiledVectorLayer` | 类名（Tiled） |
| `getFeatureByBuffer` | `getFeaturesByBuffer` | 复数形式 |
| `bufferAnalyst()` | `bufferAnalysis()` | 方法名 |
| `L.supermap.initmap` | `L.supermap.initMap` | 大小写 |

### 2. URL 路径校验

**数据来源**：`rules/url-patterns.json`（**不是** JSDoc）

JSDoc JSON 中 URL 参数类型是 `string`，无法区分具体路径格式。

| 服务类型 | 正确 URL | 错误 URL |
|---------|---------|---------|
| REST Map | `/rest/maps/{mapName}` | `/rest/map/{name}` |
| REST Data | `/rest/data` | `/rest/dataset` |
| Spatial Analyst | `/restjsr/spatialanalyst` | `/rest/spatialanalyst` |
| WMTS | `/services/{name}/wmts100` | `/rest/maps/{name}/wmts` |
| WMS | `/services/{name}/wms111/{mapName}` | `/services/{name}/wms111` |

### 3. 参数值校验

**数据来源**：`modules/*.md` + SQLite FTS5 API 检索 CLI

```
JSDoc 参数类型 (string, Object) → modules 中的具体业务值
```

| 参数 | JSDoc 类型 | modules 中的具体值 |
|-----|-----------|------------------|
| `bufferSetting.radiusUnit` | string | `'METER'`, `'KILOMETER'` |
| `bufferSetting.endType` | BufferEndType | `L.supermap.BufferEndType.ROUND` / `FLAT` / `SQUARE` |
| `requestEncoding` | string | `'KVP'`, `'REST'` |
| `format`（矢量瓦片） | VectorTileFormat | `L.supermap.VectorTileFormat.MVT` |
| `spatialQueryMode` | SpatialQueryMode | `L.supermap.SpatialQueryMode.INTERSECT` |

### 4. 补全规则

**触发条件**：用户描述模糊时

**操作步骤**：
1. 使用 `node scripts/query-api.mjs get <类名>` 查询类的 `properties` 参数定义
2. 从 `modules/*.md` 提取该场景的必需参数
3. 向用户确认缺失参数

**示例**：
```
用户: "做缓冲区分析"
AI: "需要以下参数:
     - sourceGeometry: 源几何对象或 Leaflet 图层（必填）
     - bufferSetting.leftDistance/rightDistance: 缓冲距离（必填）
     - 分析服务地址（形如 .../restjsr/spatialanalyst）
     请提供图层与缓冲距离"
```

### 5. 规则推断

**触发条件**：用户提供了部分 URL

**操作步骤**：
1. 检测 URL 中的服务类型关键词
2. 从 `rules/url-patterns.json` 补全路径

| 用户输入 | 检测关键词 | 自动补全 |
|---------|----------|---------|
| `.../services/xxx` | 无 | 询问服务类型 |
| `.../services/spatialanalyst` | spatialanalyst | → `/restjsr/spatialanalyst` |
| `.../services/data-china` | `data-` | → `/rest/data` |
| `.../services/map-china/wmts` | wmts | → `wmts100`（确认版本段） |
| `.../services/map-china/wms` | wms | → `wms111/{mapName}` |
