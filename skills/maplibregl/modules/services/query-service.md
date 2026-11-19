---
name: QueryService
description: 地图查询服务（REST Map）— 提供范围查询、SQL 查询、空间查询和距离查询。
---

# QueryService - 地图查询服务

## 服务信息

| 属性 | 说明 |
|---|---|
| 命名空间 | `maplibregl.supermap.QueryService` |
| 服务类型 | REST 地图服务（`/rest/maps/`） |
| 所属模块 | services |
| 依赖 | 需先加载 maplibre-gl-enhance 与 iclient-maplibregl，版本见 `templates/index.html` |

## 构造函数

```javascript
new maplibregl.supermap.QueryService(url, options);
```

| 参数 | 类型 | 说明 |
|---|---|---|
| `url` | string | REST Map 服务地址，例如 `https://iserver.supermap.io/iserver/services/map-world/rest/maps/World` |
| `options.proxy` | string | 服务代理地址（可选） |
| `options.withCredentials` | boolean | 请求是否携带凭据（可选） |
| `options.crossOrigin` | boolean | 是否允许跨域请求（可选） |
| `options.headers` | Object | 请求头（可选） |

## 查询方法

| 方法 | 说明 |
|---|---|
| `queryBySQL(params)` | SQL 查询 |
| `queryByBounds(params)` | 范围查询 |
| `queryByGeometry(params)` | 空间查询 |
| `queryByDistance(params)` | 距离查询 |

## 返回结构

```javascript
{
    result: {
        currentCount: 0,
        totalCount: 0,
        recordsets: [
            { features: { type: 'FeatureCollection', features: [] }, datasetName: '', dataSourceName: '' }
        ]
    }
}
```

| 字段 | 说明 |
|---|---|
| `result.currentCount` | 本次返回的要素数量 |
| `result.totalCount` | 满足条件的要素总数 |
| `result.recordsets[0].features` | GeoJSON FeatureCollection，可直接传给 `map.addSource()` |

读取结果时应逐层判空，示例写法：`serviceResult.result.recordsets[0].features`，在页面代码中先确认 `recordsets` 及其首项存在。

## 使用场景

- URL 包含 `/rest/maps/`，查询地图图层中的要素。
- 需要按地图当前范围或距离查询。
- 查询与底图同一个服务。

## SQL 查询 - queryBySQL

`queryParams` 为 `FilterParameter`，可直接传对象，也可传数组（API 声明为 `Array.<FilterParameter>`）。`name` 使用 `图层名@数据源名`。

```javascript
var mapServiceUrl = 'https://iserver.supermap.io/iserver/services/map-world/rest/maps/World';

var param = new maplibregl.supermap.QueryBySQLParameters({
    queryParams: {
        name: 'Capitals@World.1',
        attributeFilter: 'POPULATION > 10000000'
    }
});

new maplibregl.supermap.QueryService(mapServiceUrl)
    .queryBySQL(param)
    .then(function(serviceResult) {
        var recordsets = serviceResult && serviceResult.result && serviceResult.result.recordsets;
        var features = recordsets && recordsets[0] && recordsets[0].features;
        map.addSource('map-query-result', { type: 'geojson', data: features });
        map.addLayer({
            id: 'map-query-layer',
            type: 'fill',
            source: 'map-query-result',
            paint: { 'fill-color': '#ff8800', 'fill-opacity': 0.5 }
        });
    })
    .catch(function(error) {
        console.error('REST Map SQL 查询失败：', error);
    });
```

## 范围查询 - queryByBounds

```javascript
var boundsParam = new maplibregl.supermap.QueryByBoundsParameters({
    queryParams: { name: 'Capitals@World.1' }
});
boundsParam.bounds = map.getBounds();

new maplibregl.supermap.QueryService(mapServiceUrl)
    .queryByBounds(boundsParam)
    .then(function(serviceResult) {
        var features = serviceResult.result.recordsets[0].features;
    });
```

`bounds` 需为服务可识别的范围对象，示例使用 `map.getBounds()`。

## 空间查询 - queryByGeometry

```javascript
var geomParam = new maplibregl.supermap.QueryByGeometryParameters({
    queryParams: { name: 'Capitals@World.1' },
    geometry: { type: 'Point', coordinates: [116.39, 39.9] },
    spatialQueryMode: 'INTERSECT'
});

new maplibregl.supermap.QueryService(mapServiceUrl)
    .queryByGeometry(geomParam)
    .then(function(serviceResult) {
        var features = serviceResult.result.recordsets[0].features;
    });
```

## 距离查询 - queryByDistance

```javascript
var distParam = new maplibregl.supermap.QueryByDistanceParameters({
    queryParams: { name: 'Capitals@World.1' },
    geometry: { type: 'Point', coordinates: [116.39, 39.9] },
    distance: 1000
});
```

`distance` 的单位是地图服务坐标系的单位，EPSG:4326 下为度，不是米；需要米制距离时改用 [buffer-analysis.md](./buffer-analysis.md) 的缓冲分析或 REST Data 缓冲区查询。

## 关键要点

- QueryService 用 `queryParams`，FeatureService 用 `queryParameter` 与 `datasetNames`。
- `queryParams.name` 为 `图层名@数据源名`（例如 `Capitals@World.1`）。
- 结果在 `result.recordsets[0].features`，不像 FeatureService 直接返回 `result.features`。
- 查询参数类见 `node scripts/query-api.mjs get QueryBySQLParameters`。

## 与 FeatureService 对比

| | QueryService | FeatureService |
|---|---|---|
| URL | `/rest/maps/{mapName}` | `/rest/data` |
| 查询对象 | 地图图层 | 数据集 |
| 参数键名 | `queryParams` | `queryParameter` / `datasetNames` |
| 返回格式 | `result.recordsets[].features` | `result.features` |
