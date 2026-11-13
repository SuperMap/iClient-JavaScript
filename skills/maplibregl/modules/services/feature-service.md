---
name: FeatureService
description: 使用 FeatureService 查询 iServer REST Data 服务。
---

# REST Data 查询

`FeatureService` 仅用于 iServer REST Data 端点（`/rest/data`）。生成具体查询前，应对照 `examples/maplibregl/02_getFeatureBySQL.html` 或其他匹配的 REST Data 示例，核实参数类、数据集命名格式和结果结构。

Promise 调用的一般模式如下：

```javascript
var dataUrl = 'https://example.invalid/iserver/services/data-service/rest/data';
var service = new maplibregl.supermap.FeatureService(dataUrl);
service.getFeaturesBySQL(sqlParameters).then(function(serviceResult) {
    var featureCollection = serviceResult.result.features;
    // 地图样式就绪后，添加或更新 GeoJSON 数据源。
}).catch(function(error) {
    console.error('REST Data 查询失败：', error);
});
```

以上端点和 `sqlParameters` 仅用于说明，不是可运行的实际值。不要臆造数据集、查询参数字段或结果路径；应查阅对应的 MapLibreGL 示例和 API 定义。REST Data 与 REST Map 的参数和响应结构不同。
