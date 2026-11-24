---
name: "QueryService"
description: "地图查询服务类（REST Map）— 提供范围、SQL、空间与距离查询"
---

# QueryService - 地图查询服务

## 服务信息

| 属性 | 说明 |
|------|------|
| 命名空间 | `L.supermap.QueryService` |
| 服务类型 | REST 地图服务（`/rest/maps/{mapName}`） |
| 所属模块 | Services |

## 构造函数

```javascript
new L.supermap.QueryService(url, options)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `url` | string | iServer REST 地图服务地址 |
| `options.proxy` | string | 服务代理地址（可选） |
| `options.withCredentials` | boolean | 请求是否携带凭据（可选） |
| `options.crossOrigin` | boolean | 是否允许跨域请求（可选） |
| `options.headers` | Object | 请求头（可选） |

## 查询方法

| 方法 | 参数类 | 说明 |
|------|--------|------|
| `queryBySQL(params)` | `L.supermap.QueryBySQLParameters` | SQL 属性查询 |
| `queryByBounds(params)` | `L.supermap.QueryByBoundsParameters` | 地图范围查询 |
| `queryByGeometry(params)` | `L.supermap.QueryByGeometryParameters` | 几何空间查询 |
| `queryByDistance(params)` | `L.supermap.QueryByDistanceParameters` | 距离查询 |

方法返回 Promise；所有几何参数可直接传 Leaflet 图层对象。

## SQL 查询

```javascript
var mapUrl = 'https://iserver.supermap.io/iserver/services/map-world/rest/maps/World';
var param = new L.supermap.QueryBySQLParameters({
  queryParams: {
    name: 'Capitals@World.1',
    attributeFilter: 'SMID < 10'
  }
});

new L.supermap.QueryService(mapUrl)
  .queryBySQL(param)
  .then(function (serviceResult) {
    var features = serviceResult.result.recordsets[0].features;
    resultLayer = L.geoJSON(features).addTo(map);
  });
```

`queryParams` 可传单个过滤对象（如示例）或过滤对象数组。

## 范围查询

```javascript
var param = new L.supermap.QueryByBoundsParameters({
  queryParams: { name: 'Capitals@World.1' },
  bounds: drawnRectangle.getBounds()
});

new L.supermap.QueryService(mapUrl)
  .queryByBounds(param)
  .then(function (serviceResult) {
    resultLayer = L.geoJSON(serviceResult.result.recordsets[0].features, {
      style: { color: 'red' }
    }).addTo(map);
  });
```

`bounds` 可使用 Leaflet `L.LatLngBounds`，例如 `rectangle.getBounds()` 或 `map.getBounds()`。

## 几何空间查询

```javascript
var searchPolygon = L.polygon([
  [20, -20], [20, 0], [40, 0], [40, -20], [20, -20]
]).addTo(map);

var param = new L.supermap.QueryByGeometryParameters({
  queryParams: [new L.supermap.FilterParameter({ name: 'Company@Changchun.2' })],
  geometry: searchPolygon,
  spatialQueryMode: L.supermap.SpatialQueryMode.INTERSECT
});

new L.supermap.QueryService(mapUrl)
  .queryByGeometry(param)
  .then(function (serviceResult) {
    resultLayer = L.geoJSON(serviceResult.result.recordsets[0].features).addTo(map);
  });
```

`geometry` 支持 `L.Polygon`、`L.Polyline`、`L.Marker` 等 Leaflet 图层。空间关系通过 `L.supermap.SpatialQueryMode` 指定；示例使用 `INTERSECT`，其它枚举值以 API 索引为准。

## 距离查询

```javascript
var centerMarker = L.circleMarker([30, 104], { color: 'red' }).addTo(map);
var param = new L.supermap.QueryByDistanceParameters({
  queryParams: { name: 'Capitals@World.1' },
  distance: 10,
  geometry: centerMarker
});

new L.supermap.QueryService(mapUrl)
  .queryByDistance(param)
  .then(function (serviceResult) {
    resultLayer = L.geoJSON(serviceResult.result.recordsets[0].features).addTo(map);
  });
```

`distance` 使用服务地图坐标单位；经纬度地图（如 `L.CRS.EPSG4326`）中单位可能是度，不应直接把米数当作距离传入。若业务要求米制距离，先确认服务坐标系和 API 参数约定。

## 返回结构

```javascript
serviceResult.result.recordsets[0].features // GeoJSON FeatureCollection
```

`QueryService` 的查询结果位于 `result.recordsets[]`；FeatureCollection 可直接交给 `L.geoJSON(...).addTo(map)` 渲染。

## FilterParameter 字段

| 字段 | 说明 |
|------|------|
| `name` | 地图图层名，如 `Countries@World.1` |
| `attributeFilter` | SQL WHERE 条件 |
| `fields` | 返回字段 |
| `ids` | 要查询的要素 ID |
| `orderBy` / `groupBy` | 排序 / 分组字段 |

地图图层名格式通常为 `LayerName@DataSource[.n]`，具体名称应以地图服务图层信息为准。

## 与 FeatureService 对比

| | QueryService | FeatureService |
|---|---|---|
| URL | `/rest/maps/{mapName}` | `/rest/data` |
| 查询对象 | 地图服务图层 | 数据集 |
| 名称格式 | `LayerName@DataSource[.n]` | `DataSource:DatasetName` |
| 结果路径 | `result.recordsets[0].features` | `result.features` |

> 不要交叉使用两种服务的参数类与结果路径。详见 [feature-service.md](./feature-service.md) 和 [error-handling.md](../../rules/error-handling.md)。

## API 查询

通过 SQLite API 索引查询准确参数与支持的方法：

```text
node scripts/query-api.mjs get QueryService
node scripts/query-api.mjs get QueryBySQLParameters
node scripts/query-api.mjs get QueryByBoundsParameters
node scripts/query-api.mjs get QueryByGeometryParameters
node scripts/query-api.mjs get QueryByDistanceParameters
```
