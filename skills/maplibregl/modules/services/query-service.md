---
name: QueryService
description: 查询 iServer REST Map 服务中的地图图层。
---

# REST Map 查询

对 iServer REST Map URL（`/rest/maps/{mapName}`）使用 `QueryService`。在 `examples/maplibregl/01_mapQueryBySQL.html` 或匹配的范围/几何查询示例中，确认查询参数类型和服务结果结构。

```javascript
var mapServiceUrl = 'https://example.invalid/iserver/services/map-service/rest/maps/MapName';
var service = new maplibregl.supermap.QueryService(mapServiceUrl);
service.queryBySQL(queryParameters).then(function(serviceResult) {
    var features = serviceResult.result.recordsets[0].features;
    // 将已核实的查询结果渲染到地图上。
}).catch(function(error) {
    console.error('REST Map 查询失败：', error);
});
```

以上端点和 `queryParameters` 仅用于说明。使用前应核对真实参数名称，并确认结果中是否包含 `recordsets`。不要将 `FeatureService` 参数类型或 REST Data 响应路径用于此处。
