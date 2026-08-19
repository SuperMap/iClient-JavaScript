---
name: "QueryService"
description: "地图查询服务类（REST Map）— 提供范围查询、SQL 查询、空间查询、距离查询"
---

# QueryService - 地图查询服务

## 服务信息

| 属性 | 说明 |
|------|------|
| **命名空间** | `mapboxgl.supermap.QueryService` |
| **服务类型** | REST 地图服务（`/rest/maps/`） |
| **CDN** | `https://iclient.supermap.io/dist/mapboxgl/iclient-mapboxgl.js` |
| **所属模块** | Services |

## 构造函数

```javascript
new mapboxgl.supermap.QueryService(url, options)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `url` | string | 服务地址，如 `http://host:8090/iserver/services/map-world/rest/maps/World` |
| `options.proxy` | string | 服务代理地址（可选） |
| `options.withCredentials` | boolean | 请求是否携带凭据（可选） |
| `options.crossOrigin` | boolean | 是否允许跨域请求（可选） |
| `options.headers` | Object | 请求头（可选） |

## 查询方法

| 方法 | 说明 |
|------|------|
| `queryBySQL(params)` | SQL 查询 |
| `queryByBounds(params)` | 范围查询 |
| `queryByGeometry(params)` | 空间查询 |
| `queryByDistance(params)` | 距离查询 |

## 返回格式

### serviceResult 结构

```javascript
{
    result: {
        currentCount: number,
        totalCount: number,
        recordsets: [
            {
                features: [...],  // GeoJSON Feature[]
                datasetName: string,
                dataSourceName: string
            }
        ]
    }
}
```

### 返回格式说明

| 字段 | 说明 |
|------|------|
| `result.currentCount` | 当前返回的要素数量 |
| `result.totalCount` | 满足查询条件的总要素数量 |
| `result.recordsets[].features` | GeoJSON FeatureCollection 对象 |
| `result.recordsets[].datasetName` | 数据集名称 |
| `result.recordsets[].dataSourceName` | 数据源名称 |

### 获取要素数组

```javascript
var features = serviceResult.result.recordsets[0].features;
// features 为 GeoJSON FeatureCollection 对象，可直接用于 map.addSource()
```

## 使用场景

- URL 包含 `/rest/maps/` —— 查询地图上显示的图层
- 需要按地图范围（可见区域）查询
- 需要基于距离的查询
- 查询与底图相同的服务

## SQL 查询 - queryBySQL

```javascript
var mapUrl = 'http://host:8090/iserver/services/map-world/rest/maps/World';

var queryParams = new mapboxgl.supermap.QueryBySQLParameters({
    queryParams: [{
        name: 'Countries@World',
        attributeFilter: 'POPULATION > 10000000'
    }],
    expectCount: 100,
    returnContent: true
});

new mapboxgl.supermap.QueryService(mapUrl)
    .queryBySQL(queryParams)
    .then(function(serviceResult) {
        var features = serviceResult.result.recordsets[0].features;
        map.addSource('map-query-result', {
            type: 'geojson',
            data: features
        });
        map.addLayer({
            id: 'map-query-layer',
            type: 'fill',
            source: 'map-query-result',
            paint: { 'fill-color': '#ff8800', 'fill-opacity': 0.5 }
        });
    });
```

## 范围查询 - queryByBounds

```javascript
var boundsParams = new mapboxgl.supermap.QueryByBoundsParameters({
    queryParams: [{
        name: 'Countries@World'
    }]
});
boundsParams.bounds = map.getBounds();

new mapboxgl.supermap.QueryService(mapUrl)
    .queryByBounds(boundsParams)
    .then(function(serviceResult) {
        var features = serviceResult.result.recordsets[0].features;
    });
```

## 空间查询 - queryByGeometry

```javascript
var geomParams = new mapboxgl.supermap.QueryByGeometryParameters({
    queryParams: [{
        name: 'Countries@World'
    }],
    geometry: {
        type: 'Point',
        coordinates: [116.39, 39.9]
    },
    spatialQueryMode: 'INTERSECT'
});

new mapboxgl.supermap.QueryService(mapUrl)
    .queryByGeometry(geomParams)
    .then(function(serviceResult) {
        var features = serviceResult.result.recordsets[0].features;
    });
```

## 距离查询 - queryByDistance

```javascript
var distParams = new mapboxgl.supermap.QueryByDistanceParameters({
    queryParams: [{
        name: 'Capitals@World'
    }],
    geometry: {
        type: 'Point',
        coordinates: [116.39, 39.9]
    },
    distance: 1000 // 单位为地图单位（EPSG:4326 时为度）
});

new mapboxgl.supermap.QueryService(mapUrl)
    .queryByDistance(distParams)
    .then(function(serviceResult) {
        var features = serviceResult.result.recordsets[0].features;
    });
```

## FilterParameter（queryParams 数组项）

| 参数 | 必填 | 说明 |
|-------|----------|-------------|
| `name` | 是 | 图层名称，格式 `LayerName@DataSource`（例如 `Countries@World`） |
| `attributeFilter` | 否 | SQL WHERE 子句（例如 `POPULATION > 10000000`） |
| `fields` | 否 | 需返回的字段名数组 |
| `ids` | 否 | 要查询的要素 ID |
| `orderBy` | 否 | 排序字段名 |
| `groupBy` | 否 | 分组字段名 |

## 关键要点

- QueryService 使用 `queryParams`（FilterParameter 数组），FeatureService 使用 `queryParameter`（单个对象）
- FilterParameter 的 `name` 格式：`LayerName@DataSource`（例如 `Countries@World`），而 FeatureService 使用 `DataSource:DatasetName`（例如 `World:Countries`）
- QueryService 结果嵌套在 `result.recordsets` 数组中，需通过 `[0].features` 获取要素
- FeatureService 结果是直接的 GeoJSON FeatureCollection，可直接用于 `map.addSource()`

## 与 FeatureService 对比

| | QueryService | FeatureService |
|---|---|---|
| **URL** | `/rest/maps/{mapName}` | `/rest/data` |
| **服务类型** | REST 地图服务 | REST 数据服务 |
| **查询范围** | 地图图层（可见图层） | 数据集 |
| **参数键名** | `queryParams`（FilterParameter[]） | `queryParameter` / `datasetNames` |
| **返回格式** | `result.recordsets[].features`（GeoJSON） | `result.features`（GeoJSON） |

## 参数详情

> 详见 metadata：[@QueryBySQLParameters](../../metadata/iclient-mapboxgl/QueryBySQLParameters.json)、[@QueryByBoundsParameters](../../metadata/iclient-mapboxgl/QueryByBoundsParameters.json)、[@QueryByGeometryParameters](../../metadata/iclient-mapboxgl/QueryByGeometryParameters.json)、[@QueryByDistanceParameters](../../metadata/iclient-mapboxgl/QueryByDistanceParameters.json)