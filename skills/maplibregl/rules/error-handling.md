# 错误处理规则

## 错误对照

以下 6 类错误在生成 MapLibreGL 代码时最常见。每类给出错误写法与正确写法，生成代码前逐项检查。

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
maplibregl.supermap.initMap(mapUrl);
new maplibregl.Map({ container: 'map', style: { version: 8, sources: {}, layers: [] } });
```

CDN 与版本固定为 `templates/index.html` 中的 maplibre-gl-enhance 与 iclient-maplibregl，不按用户要求切换版本。

### 2. 在样式就绪前添加数据源或图层

`initMap()` 解析时地图实例已创建，但样式尚未加载完成。此时直接调用 `addSource`/`addLayer` 会抛错。

**错误代码**：

```javascript
maplibregl.supermap.initMap(mapUrl, { mapOptions: { container: 'map' } }).then(function(result) {
    result.map.addSource('overlay', { type: 'geojson', data: geojson });
});
```

**正确代码**：

```javascript
maplibregl.supermap.initMap(mapUrl, { mapOptions: { container: 'map' } }).then(function(result) {
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
maplibregl.supermap.initMap(mapUrl, {
    mapOptions: { container: 'map', style: { version: 8, sources: {}, layers: [] } }
});
```

**正确代码**：

```javascript
maplibregl.supermap.initMap(mapUrl, {
    mapOptions: { container: 'map', center: [0, 0], zoom: 2 }
});
```

需要完全自定义样式时，改用 `new maplibregl.Map`，见 [empty-map.md](../modules/core/empty-map.md)。

### 4. 混淆 QueryService 与 FeatureService

`QueryService` 用于 `/rest/maps/`（地图图层查询），`FeatureService` 用于 `/rest/data`（数据集查询）。参数键名和结果路径都不同。

**错误代码**：

```javascript
// ❌ 对 /rest/maps/ 使用 FeatureService
new maplibregl.supermap.FeatureService(mapUrl).getFeaturesBySQL({ datasetNames: ['World:Countries'] });

// ❌ 在 FeatureService 参数中使用 QueryService 的键名
var param = new maplibregl.supermap.GetFeaturesBySQLParameters({
    queryParams: { name: 'Countries@World' },
    datasetNames: ['World:Countries']
});
```

**正确代码**：

```javascript
// ✅ /rest/maps/ 用 QueryService，name 为 图层@数据源，结果在 recordsets
var queryParam = new maplibregl.supermap.QueryBySQLParameters({
    queryParams: { name: 'Capitals@World.1', attributeFilter: 'POPULATION > 10000000' }
});
new maplibregl.supermap.QueryService(mapUrl).queryBySQL(queryParam).then(function(result) {
    var features = result.result.recordsets[0].features;
});

// ✅ /rest/data 用 FeatureService，datasetNames 为 数据源:数据集，结果在 features
var sqlParam = new maplibregl.supermap.GetFeaturesBySQLParameters({
    queryParameter: { name: 'Countries@World', attributeFilter: 'POPULATION > 10000000' },
    datasetNames: ['World:Countries']
});
new maplibregl.supermap.FeatureService(dataUrl).getFeaturesBySQL(sqlParam).then(function(result) {
    var features = result.result.features;
});
```

### 5. 用缓冲查询替代缓冲分析

`getFeaturesByBuffer` 只返回落在缓冲范围内的已有要素，不生成缓冲面。

**错误代码**：

```javascript
new maplibregl.supermap.FeatureService(dataUrl)
    .getFeaturesByBuffer(new maplibregl.supermap.GetFeaturesByBufferParameters({ datasetNames: ['World:Capitals'] }));
```

**正确代码**：

```javascript
new maplibregl.supermap.SpatialAnalystService(analystUrl)
    .bufferAnalysis(new maplibregl.supermap.GeometryBufferAnalystParameters({
        sourceGeometry: lineGeometry,
        sourceGeometrySRID: 4326,
        bufferSetting: new maplibregl.supermap.BufferSetting({
            endType: maplibregl.supermap.BufferEndType.ROUND,
            leftDistance: new maplibregl.supermap.BufferDistance({ value: 500 }),
            rightDistance: new maplibregl.supermap.BufferDistance({ value: 500 }),
            radiusUnit: 'METER',
            semicircleLineSegment: 10
        })
    })).then(function(result) {
        var bufferFeature = result.result.resultGeometry;
    });
```

### 6. 隐式改变坐标系或无提示降级

`initMap()` 对平面坐标系会直接拒绝。非 EPSG:3857 且服务未开启动态投影时，必须引入 maplibre-gl-enhance 才能定义 CRS。

**错误代码**：

```javascript
// 服务是 EPSG:4326 或自定义坐标系，却按 3857 拼接瓦片模板
tiles: ['https://host/iserver/services/map-x/rest/maps/X/tileImage.png?bbox={bbox-epsg-3857}']
```

**正确代码**：先确认服务坐标系，再选择模板或 CRS 配置；无法确认时先询问用户，或按 [coordinate-system.md](./coordinate-system.md) 的定向检索流程核实，并说明增强脚本能力要求。

## 报告要求

- 用 `.catch(...)` 或 `try/catch` 处理 `initMap()` 和服务请求的 Promise 拒绝。
- 注册地图 `error` 监听器报告网络、样式、数据源错误。
- 向用户显示简洁错误信息，同时在控制台记录底层错误。
- 不静默吞掉错误，不把失败包装成空数据或成功结果。
- 请求前核实服务 URL 与必填参数，缺信息时按 [fallback-questions.md](../prompts/fallback-questions.md) 询问。
