---
name: bufferAnalysis
description: 调用 iServer 空间分析缓冲区操作。
---

# 缓冲区分析

使用 iServer 空间分析服务 URL 调用 `SpatialAnalystService`。查阅 `examples/maplibregl/04_bufferAnalystService.html`（数据集输入）或 `04_bufferAnalystService_geometry.html`（几何输入）及对应 API 定义，选择并填写正确的参数类。

```javascript
var analystUrl = 'https://example.invalid/iserver/services/spatialanalyst-xxx/restjsr/spatialanalyst';
var service = new maplibregl.supermap.SpatialAnalystService(analystUrl);

service.bufferAnalysis(bufferParameters).then(function(serviceResult) {
    // 查阅匹配示例，确认结果几何结构后将其渲染为 GeoJSON。
}).catch(function(error) {
    console.error('缓冲区分析失败：', error);
});
```

最终交付给用户的代码中，不要使用示例 URL 或未定义的参数对象。HTML 必须使用用户提供的真实输入构造已核实的参数类，处理对应的响应结构并报告错误。
