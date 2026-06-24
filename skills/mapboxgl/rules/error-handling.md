# SuperMap iClient 错误处理指南

## 常见错误

### 错误 1：使用旧版 API

**错误代码**：
```javascript
var map = new SuperMap.Map('map'); // ❌ 旧版 API
```

**正确代码**：
```javascript
var map = new mapboxgl.Map({ container: 'map', style: { version: 8, sources: {}, layers: [] } }); // ✅ 新版 API
```

---

### 错误 2：在 load 事件外添加图层（使用 new mapboxgl.Map 时）

**错误代码**：
```javascript
var map = new mapboxgl.Map({
    container: 'map',
    style: { version: 8, sources: {}, layers: [] },
    center: [116.39, 39.9],
    zoom: 3
});

map.addSource('overlay', { // ❌ 在 load 事件外
    type: 'raster',
    tiles: ['http://host:8090/iserver/services/map-jingjin/rest/maps/京津地区地图'],
    rasterSource: 'iserver'
});
map.addLayer({ id: 'overlay', type: 'raster', source: 'overlay' });
```

**正确代码**：
```javascript
var map = new mapboxgl.Map({
    container: 'map',
    style: { version: 8, sources: {}, layers: [] },
    center: [116.39, 39.9],
    zoom: 3
});

map.on('load', function() { // ✅ 在 load 事件内
    map.addSource('overlay', { ... });
    map.addLayer({ id: 'overlay', type: 'raster', source: 'overlay' });
});
```

---

### 错误 3：initMap 之后使用 map.on('load', ...)

**错误代码**：
```javascript
mapboxgl.supermap.initMap('http://host/iserver/services/xxx/rest/maps/xxx', {
    mapOptions: { container: 'map' }
}).then(function(result) {
    var map = result.map;
    map.on('load', function() { // ❌ 永远不会执行
        map.addSource('overlay', { ... });
    });
});
```

**正确代码**：
```javascript
mapboxgl.supermap.initMap('http://host/iserver/services/xxx/rest/maps/xxx', {
    mapOptions: { container: 'map' }
}).then(function(result) {
    var map = result.map;
    map.addSource('overlay', { ... }); // ✅ 直接执行
});
```

---

### 错误 4：在 initMap 的 mapOptions 中传入 style

**错误代码**：
```javascript
mapboxgl.supermap.initMap('http://host/iserver/services/xxx/rest/maps/xxx', {
  mapOptions: {
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // ❌ 覆盖了自动生成的样式
  },
});
```

**正确代码**：
```javascript
mapboxgl.supermap.initMap('http://host/iserver/services/xxx/rest/maps/xxx', {
  mapOptions: {
    container: 'map', // ✅ 不传 style
  },
});
```

---

### 错误 5：使用错误的命名空间

**错误代码**：
```javascript
var queryService = new SuperMap.QueryService('http://host/iserver/services/xxx/rest/data'); // ❌ 旧版命名空间
```

**正确代码**：
```javascript
var queryService = new mapboxgl.supermap.FeatureService('http://host/iserver/services/xxx/rest/data'); // ✅ 新版命名空间
```

---

### 错误 6：混淆 QueryService 与 FeatureService

QueryService 用于 `/rest/maps/`（地图图层查询），FeatureService 用于 `/rest/data`（数据集查询）。它们的参数名和结果格式不同。

**错误代码**：
```javascript
// ❌ 对 /rest/maps/ URL 使用 FeatureService
new mapboxgl.supermap.FeatureService('http://host/iserver/services/map-world/rest/maps/World')
    .getFeaturesBySQL({ datasetNames: ['World:Countries'] });

// ❌ 在 FeatureService 中使用 QueryService 的参数格式
var param = new mapboxgl.supermap.GetFeaturesBySQLParameters({
    queryParams: [{ name: 'Countries@World' }],  // ❌ QueryService 格式
    datasetNames: ['World:Countries']
});
```

**正确代码**：
```javascript
// ✅ 对 /rest/maps/ 使用 QueryService — 使用 queryParams，名称格式为 "LayerName@DataSource"
var param = new mapboxgl.supermap.QueryBySQLParameters({
    queryParams: [{ name: 'Countries@World', attributeFilter: 'POP > 10000000' }]
});
new mapboxgl.supermap.QueryService(mapUrl).queryBySQL(param)
    .then(function(result) {
        var features = result.result.recordsets[0].features;
    });

// ✅ 对 /rest/data 使用 FeatureService — 使用 datasetNames，名称格式为 "DataSource:DatasetName"
var param = new mapboxgl.supermap.GetFeaturesBySQLParameters({
    queryParameter: { name: 'World:Countries', attributeFilter: 'POP > 10000000' },
    datasetNames: ['World:Countries']
});
new mapboxgl.supermap.FeatureService(dataUrl).getFeaturesBySQL(param)
    .then(function(result) {
        var features = result.result.features;
    });
```

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
✓ https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China
✓ 使用 initMap: mapboxgl.supermap.initMap(host + '/iserver/services/map-world/rest/maps/World')
```

**检测条件**：URL 包含 `/iserver/services/` 但不包含 `/rest/maps/`

**警告 1.2：缺少 /rest/data/ 路径**
```
⚠️ 地址格式警告

您的 iServer 数据服务地址可能不完整。

错误示例：
✗ https://iserver.supermap.io/iserver/services/data-china
✗ https://iserver.supermap.io/iserver/services/data-china/rest

正确格式：
✓ https://iserver.supermap.io/iserver/services/data-china/rest/data
```

**检测条件**：URL 包含 `/iserver/services/` 和 'data' 但不包含 `/rest/data/`

---

## 严格约束

### CDN 约束
- CDN 版本固定为 1.12.1-11 (based on Mapbox GL JS v1.13.2)
- 必须使用增强版以支持 `initMap`
- 禁止根据用户版本要求更改 CDN 链接

**必需 CDN（严格顺序）**：
```html
<script src="https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/1.12.1-11/mapbox-gl-enhance.js"></script>
<link href="https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/1.12.1-11/mapbox-gl-enhance.css" rel="stylesheet">
<script src="https://iclient.supermap.io/dist/mapboxgl/iclient-mapboxgl-es6.min.js"></script>
<link href="https://iclient.supermap.io/dist/mapboxgl/iclient-mapboxgl.min.css" rel="stylesheet"
/>
```

### 命名空间约束
- 必须使用 `mapboxgl.supermap`（而非 `SuperMap`）
- 必须使用 `mapboxgl.supermap.FeatureService`（而非 `SuperMap.QueryService`）
- 缓冲区分析必须使用 `mapboxgl.supermap.SpatialAnalystService`

### 初始化约束
- 对 /rest/maps/ 服务：使用 `initMap`
- 对其他服务：使用 `new mapboxgl.Map` 配合空样式
- `initMap` 之后禁止使用 `map.on('load', ...)`
- `new mapboxgl.Map` 之后必须使用 `map.on('load', ...)`

---

## 校验规则（优先级: JSDoc JSON + url-patterns.json + modules）

### 校验优先级

| 校验内容 | 数据来源 | 说明 |
|---------|---------|-----|
| 类名/方法名 | `metadata/iclient-mapboxgl/*.json` | JSDoc 中 kind=class/member |
| 参数名 | `metadata/iclient-mapboxgl/*.json` | JSDoc 中 properties 数组 |
| URL 路径格式 | `rules/url-patterns.json` | **不是** JSDoc（JSDoc 只有 string 类型） |
| 参数具体值 | `modules/*.md` | 结合业务场景 |

### 1. 类名/方法名校验

**数据来源**：`metadata/iclient-mapboxgl/*.json`

```
校验方法: 搜索 "name": "类名", "kind": "class"
```

| 错误写法 | 正确写法 | 说明 |
|---------|---------|-----|
| `BufferAnalystParameters` | `GeometryBufferAnalystParameters` | 完整类名 |
| `SpatialQueryService` | `SpatialAnalystService` | 服务类名 |
| `bufferAnalyst()` | `bufferAnalysis()` | 方法名 |
| `getFeatureByBuffer` | `getFeaturesByBuffer` | 复数形式 |

### 2. URL 路径校验

**数据来源**：`rules/url-patterns.json`（**不是** JSDoc）

JSDoc JSON 中 URL 参数类型是 `string`，无法区分具体路径格式。

| 服务类型 | 正确 URL | 错误 URL |
|---------|---------|---------|
| REST Map | `/rest/maps/{mapName}` | `/rest/map/{name}` |
| REST Data | `/rest/data` | `/rest/dataset` |
| Spatial Analyst | `/restjsr/spatialanalyst` | `/rest/spatialanalyst` |

### 3. 参数值校验

**数据来源**：`modules/*.md` + `metadata/iclient-mapboxgl/*.json`

```
JSDoc 参数类型 (string, Object) → modules 中的具体业务值
```

| 参数 | JSDoc 类型 | modules 中的具体值 |
|-----|-----------|------------------|
| `bufferSetting.radiusUnit` | string | `'METER'`, `'KILOMETER'` |
| `bufferSetting.endType` | BufferEndType | `ROUND`, `FLAT`, `SQUARE` |
| `sourceGeometrySRID` | number | `4326`, `3857` |

### 4. 补全规则

**触发条件**：用户描述模糊时

**操作步骤**：
1. 从 `metadata/iclient-mapboxgl/*.json` 提取类的 `properties` 数组
2. 从 `modules/*.md` 提取该场景的必需参数
3. 向用户确认缺失参数

**示例**：
```
用户: "做缓冲区分析"
AI: "需要以下参数:
     - sourceGeometry: 源几何对象 (必填)
     - sourceGeometrySRID: 坐标系代码 (默认 4326)
     - bufferSetting.leftDistance/rightDistance: 缓冲距离 (必填)
     请提供几何对象和缓冲距离"
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
| `.../services/data-china` | 无关键词 | 询问是 rest/data 还是 rest/maps |
