---
name: "bufferAnalysis"
description: "iServer 空间分析缓冲区分析 - GeometryBufferAnalystParameters"
---

# 缓冲区分析 - SpatialAnalystService.bufferAnalysis

## 类（mapboxgl.supermap 命名空间）

- **GeometryBufferAnalystParameters**: 缓冲区分析参数类
- **SpatialAnalystService**: 空间分析服务类
- **BufferSetting**: 缓冲分析设置类
- **BufferDistance**: 缓冲距离类
- **BufferEndType**: 缓冲端点类型枚举

## 使用场景
- URL 为 iServer 空间分析服务（例如 `/restjsr/spatialanalyst`）
- 需要在几何对象周围创建缓冲区
- 使用 `SpatialAnalystService`，而非 `FeatureService`

## 模板

```javascript
var serviceUrl = 'http://localhost:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst';

var geometryLine = {
    type: 'LineString',
    coordinates: [
        [116.1916654036, 39.8888542507],
        [116.2031567225, 39.8888542507],
        [116.2156351162, 39.8963250173],
        [116.2740019864, 39.8970124079]
    ]
};

var geoBufferAnalystParams = new mapboxgl.supermap.GeometryBufferAnalystParameters({
    sourceGeometry: geometryLine,
    sourceGeometrySRID: 4326,
    bufferSetting: new mapboxgl.supermap.BufferSetting({
        endType: mapboxgl.supermap.BufferEndType.ROUND,
        leftDistance: new mapboxgl.supermap.BufferDistance({ value: 500 }),
        rightDistance: new mapboxgl.supermap.BufferDistance({ value: 500 }),
        radiusUnit: 'METER',
        semicircleLineSegment: 10
    })
});

new mapboxgl.supermap.SpatialAnalystService(serviceUrl)
    .bufferAnalysis(geoBufferAnalystParams)
    .then(function(serviceResult) {
        var feature = serviceResult.result.resultGeometry;
    });
```

## 关键要点
- 使用 `mapboxgl.supermap.SpatialAnalystService`（而非 FeatureService）
- 使用 `GeometryBufferAnalystParameters`（而非 GetFeaturesByBufferParameters）
- 结果为 `serviceResult.result.resultGeometry`（GeoJSON 格式）
- 缓冲距离单位为米（左距离 + 右距离 = 总宽度）

## 类参考
详细参数说明请参考 JSDoc 元数据：`metadata/iclient-mapboxgl/*.json`
- `GeometryBufferAnalystParameters`: kind=class
- `SpatialAnalystService.bufferAnalysis`: kind=function
- `BufferSetting`, `BufferDistance`, `BufferEndType`: kind=class
