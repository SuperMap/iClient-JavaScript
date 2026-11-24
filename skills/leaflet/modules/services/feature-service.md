---
name: 'featureService'
description: '使用 L.supermap.FeatureService 进行数据服务要素查询（SQL / 缓冲区 / 几何）'
---

# 数据服务要素查询（FeatureService）

`L.supermap.FeatureService` 对接 iServer **数据服务**（`/rest/data`），用于直接取要素，返回结果里就是要素的 `FeatureCollection`。

## 服务地址

```
https://iserver.supermap.io/iserver/services/data-world/rest/data
```

注意：`FeatureService` 用的是**数据服务**地址（`/rest/data`），不是地图服务地址（`/rest/maps/{mapName}`）。

## 按 SQL 查询

```javascript
var dataUrl = 'https://iserver.supermap.io/iserver/services/data-world/rest/data';

var sqlParam = new L.supermap.GetFeaturesBySQLParameters({
  queryParameter: {
    name: 'Countries@World',            // 数据集名（不带 .1 后缀）
    attributeFilter: 'SMID = 234'       // SQL 过滤条件
  },
  datasetNames: ['World:Countries']     // 数据源:数据集
});

new L.supermap.FeatureService(dataUrl)
  .getFeaturesBySQL(sqlParam)
  .then(function (serviceResult) {
    resultLayer = L.geoJSON(serviceResult.result.features).addTo(map);
  });
```

## 按缓冲区查询

```javascript
var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]], { color: 'red' })
  .addTo(map)
  .bindPopup('bufferDistance = 10')
  .openPopup();

var bufferParam = new L.supermap.GetFeaturesByBufferParameters({
  datasetNames: ['World:Capitals'],
  bufferDistance: 10,
  geometry: polygon               // 直接传 Leaflet 图层对象
});

new L.supermap.FeatureService(dataUrl)
  .getFeaturesByBuffer(bufferParam)
  .then(function (serviceResult) {
    resultLayer = L.geoJSON(serviceResult.result.features, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup('首都：' + feature.properties.CAPITAL);
      }
    }).addTo(map);
  });
```

## 按几何对象查询

```javascript
var geom = L.polygon([[10, 10], [30, 10], [30, 30], [10, 30], [10, 10]]).addTo(map);

var geometryParam = new L.supermap.GetFeaturesByGeometryParameters({
  datasetNames: ['World:Countries'],
  geometry: geom,
  spatialQueryMode: L.supermap.SpatialQueryMode.INTERSECT
});

new L.supermap.FeatureService(dataUrl)
  .getFeaturesByGeometry(geometryParam)
  .then(function (serviceResult) {
    resultLayer = L.geoJSON(serviceResult.result.features).addTo(map);
  });
```

## 参数类

| 参数类 | 关键字段 |
|--------|----------|
| `L.supermap.GetFeaturesBySQLParameters` | `queryParameter: { name, attributeFilter }`、`datasetNames: ['ds:dt']`、`maxFeatures`、`fromIndex` |
| `L.supermap.GetFeaturesByBufferParameters` | `datasetNames`、`bufferDistance`、`geometry`、`attributeFilter` |
| `L.supermap.GetFeaturesByGeometryParameters` | `datasetNames`、`geometry`、`spatialQueryMode`、`attributeFilter` |
| `L.supermap.GetFeaturesByIDsParameters` | `IDs`、`datasetNames` |
| `L.supermap.GetFeaturesByBoundsParameters` | `bounds`、`datasetNames` |

## 方法

| 方法 | 说明 |
|------|------|
| `getFeaturesBySQL(params, callback?)` | SQL 查询 |
| `getFeaturesByBuffer(params, callback?)` | 缓冲区查询 |
| `getFeaturesByGeometry(params, callback?)` | 几何查询 |
| `getFeaturesByIDs(params, callback?)` | ID 查询 |
| `getFeaturesByBounds(params, callback?)` | 范围查询 |

都返回 Promise，也支持回调形式。

## 结果结构

```javascript
// GeoJSON FeatureCollection
serviceResult.result.features
```

```javascript
var serviceResult = {
  result: {
    featureCount: 1,
    features: {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [116.39, 39.9] },
        properties: { CAPITAL: 'Example' }
      }]
    }
  }
};
```

**注意**：`FeatureService` 的结果是 `result.features`（**没有** `recordsets`），与 `QueryService` 不同。

## 名称格式

| 位置 | 格式 | 示例 |
|------|------|------|
| `datasetNames` | `数据源:数据集` | `'World:Countries'` |
| `queryParameter.name` | 数据集名，**不带** `.1` 后缀 | `'Countries@World'` |

> 与 `QueryService` 的名称格式不同，混用是最常见的报错来源，见 [query-service.md](./query-service.md)。

## 与 QueryService 的选择

| 场景 | 用哪个 |
|------|--------|
| 需要**要素本身**（几何 + 属性，用于渲染） | `FeatureService` |
| 需要查出要素用于**下一步空间分析** | `FeatureService` |
| 需要**地图服务**已配好的图层符号/查询过滤条件 | `QueryService` |
| 只拿到 `/rest/maps/{mapName}` 地址 | `QueryService` |

> 错误对照见：[error-handling.md](../../rules/error-handling.md)
