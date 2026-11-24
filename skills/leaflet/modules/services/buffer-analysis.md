---
name: 'bufferAnalysis'
description: 'iServer 空间分析缓冲区分析 - SpatialAnalystService.bufferAnalysis'
---

# 缓冲区分析 - SpatialAnalystService.bufferAnalysis

## 使用场景

- 服务地址为 iServer 空间分析服务（`/restjsr/spatialanalyst`）
- 需要围绕点、线或面几何创建缓冲区
- 使用 `L.supermap.SpatialAnalystService`，不要误用 `FeatureService.getFeaturesByBuffer`（后者是数据集缓冲区查询）

## 使用 Leaflet 图层执行几何缓冲

```javascript
var serviceUrl = 'https://iserver.supermap.io/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst';
var points = [
  [39.8888542507, 116.1916654036],
  [39.8888542507, 116.2031567225],
  [39.8963250173, 116.2156351162],
  [39.8970124079, 116.2740019864]
];

var roadLine = L.polyline(points, { color: 'red' }).addTo(map);
var params = new L.supermap.GeometryBufferAnalystParameters({
  sourceGeometry: roadLine,
  bufferSetting: new L.supermap.BufferSetting({
    endType: L.supermap.BufferEndType.ROUND,
    leftDistance: new L.supermap.BufferDistance({ value: 500 }),
    rightDistance: new L.supermap.BufferDistance({ value: 500 }),
    semicircleLineSegment: 10
  })
});

new L.supermap.SpatialAnalystService(serviceUrl)
  .bufferAnalysis(params)
  .then(function (serviceResult) {
    var geometry = serviceResult.result.resultGeometry;
    resultLayer = L.geoJSON(geometry, {
      style: { color: '#00aa00', weight: 2, fillOpacity: 0.25 }
    }).addTo(map);
  });
```

**Leaflet 坐标数组顺序为 `[lat, lng]`**；若从 GeoJSON 读取坐标，GeoJSON 使用 `[lng, lat]`。务必确认输入坐标与服务 CRS 一致。

## 参数要点

| 字段 | 说明 |
|------|------|
| `sourceGeometry` | 源几何；Leaflet 示例中直接传 `L.Polyline` / `L.Polygon` / `L.Marker` 图层 |
| `sourceGeometrySRID` | 可选的源坐标系代码；需要时按服务 CRS 显式指定 |
| `bufferSetting.endType` | 缓冲端点类型，如 `L.supermap.BufferEndType.ROUND` |
| `bufferSetting.leftDistance` / `rightDistance` | 左右缓冲距离，使用 `new L.supermap.BufferDistance({ value })` |
| `bufferSetting.radiusUnit` | 距离单位；按服务/业务需求显式设置并确认支持值 |
| `bufferSetting.semicircleLineSegment` | 圆弧半圆分段数，常用 `10` |

缓冲总宽度由左右距离共同决定；不要把 `leftDistance`、`rightDistance` 误认为总宽度。

## 缓冲结果与地图查询串联

```javascript
new L.supermap.SpatialAnalystService(serviceUrl)
  .bufferAnalysis(params)
  .then(function (serviceResult) {
    var bufferLayer = L.geoJSON(serviceResult.result.resultGeometry).addTo(map);

    var queryParams = new L.supermap.QueryByGeometryParameters({
      queryParams: [new L.supermap.FilterParameter({ name: 'Company@Changchun.2' })],
      geometry: bufferLayer,
      spatialQueryMode: L.supermap.SpatialQueryMode.INTERSECT
    });

    return new L.supermap.QueryService(mapUrl).queryByGeometry(queryParams);
  })
  .then(function (queryResult) {
    resultLayer = L.geoJSON(queryResult.result.recordsets[0].features).addTo(map);
  });
```

Leaflet iClient 示例会把 `L.geoJSON` 结果图层直接作为查询 geometry。若需传服务几何对象，可用 API 索引确认对应转换工具；Leaflet iClient 也提供 `L.supermap.Util.toGeoJSON` / `toSuperMapGeometry` 等工具，须按输入类型选择。

## FeatureService 缓冲区查询不是分析

| 需求 | API | URL |
|------|-----|-----|
| 创建新缓冲几何 | `SpatialAnalystService.bufferAnalysis(GeometryBufferAnalystParameters)` | `/restjsr/spatialanalyst` |
| 查询指定距离/几何范围内的数据集要素 | `FeatureService.getFeaturesByBuffer(GetFeaturesByBufferParameters)` | `/rest/data` |

两者名称相似但结果和参数不同。数据集查询示例见 [feature-service.md](./feature-service.md)。

## 常见问题

1. **坐标单位错**：缓冲距离采用服务坐标系单位；经纬度坐标系的单位不是米。不要盲目将米制值用于经纬度地图。
2. **传错几何类型**：`sourceGeometry` 应为 Leaflet 图层对象或 API 接受的服务几何格式；优先沿用 Leaflet 示例直接传图层。
3. **结果不显示**：检查 `resultGeometry` 是否为空、坐标系是否一致，再用 `L.geoJSON(resultGeometry).addTo(map)` 渲染。
4. **服务类型错**：空间分析用 `/restjsr/spatialanalyst`；要素缓冲查询用 `/rest/data`。

## API 查询

```text
node scripts/query-api.mjs get SpatialAnalystService --member bufferAnalysis
node scripts/query-api.mjs get GeometryBufferAnalystParameters
node scripts/query-api.mjs get BufferSetting
node scripts/query-api.mjs get BufferDistance
node scripts/query-api.mjs get BufferEndType
```
