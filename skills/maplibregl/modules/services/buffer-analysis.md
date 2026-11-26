---
name: bufferAnalysis
description: iServer 空间分析缓冲区分析 - 数据集与几何两类参数，结果渲染为 GeoJSON 或 FGB 图层。
---

# 缓冲区分析 - SpatialAnalystService.bufferAnalysis

> **版本与导入约定（先读）**：下文代码默认即 **v6（默认版本）** 写法，可直接复制——业务类无 `maplibregl.supermap.` 前缀。v6 module 头部按需导入：
>
> ```js
> import {
>   SpatialAnalystService, DatasetBufferAnalystParameters, GeometryBufferAnalystParameters,
>   FilterParameter, BufferSetting, BufferDistance, BufferEndType,
>   FeatureService, GetFeaturesByGeometryParameters
> } from 'https://iclient.supermap.io/dist/maplibregl/iclient-maplibregl.mjs';
> ```
>
> 仅当用户明确要 v5 时，才按 [version-routing.md](../../rules/version-routing.md) 第 4 节还原为 `maplibregl.supermap.*` 全局写法（见下表 v5 命名空间），类名与调用不变。

## 服务信息

| 属性 | 说明 |
|---|---|
| v5 命名空间 | `maplibregl.supermap.SpatialAnalystService` |
| v6 具名导入 | `import { SpatialAnalystService } from 'iclient-maplibregl.mjs'` |
| 服务类型 | 空间分析服务（`/restjsr/spatialanalyst`） |
| 相关类 | `DatasetBufferAnalystParameters`、`GeometryBufferAnalystParameters`、`BufferSetting`、`BufferDistance`、`BufferEndType`、`FilterParameter` |

## 使用场景

- URL 为 iServer 空间分析服务（例如 `/restjsr/spatialanalyst`）。
- 需要围绕数据集或几何对象生成缓冲面。
- 生成缓冲面后继续做空间查询时，使用 `SpatialAnalystService`，不是 `FeatureService`。

## 方式一：数据集缓冲 - DatasetBufferAnalystParameters

对应示例 `examples/maplibregl/04_bufferAnalystService.html`。

```javascript
var serviceUrl = 'https://iserver.supermap.io/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst';

var dsBufferAnalystParameters = new DatasetBufferAnalystParameters({
    dataset: 'Road_L@Jingjin',
    filterQueryParameter: new FilterParameter({
        attributeFilter: "NAME='莲花池东路'"
    }),
    bufferSetting: new BufferSetting({
        endType: BufferEndType.ROUND,
        leftDistance: { value: 300 },
        rightDistance: { value: 300 },
        semicircleLineSegment: 10,
        radiusUnit: 'METER'
    })
});

new SpatialAnalystService(serviceUrl)
    .bufferAnalysis(dsBufferAnalystParameters)
    .then(function(serviceResult) {
        map.addSource('buffer-result', {
            type: 'geojson',
            data: serviceResult.result.recordset.features
        });
        map.addLayer({
            id: 'buffer-result-layer',
            type: 'fill',
            source: 'buffer-result',
            paint: { 'fill-color': '#ff0000', 'fill-opacity': 0.4 }
        });
    })
    .catch(function(error) {
        console.error('数据集缓冲分析失败：', error);
    });
```

| 参数 | 必填 | 说明 |
|---|---|---|
| `dataset` | 是 | `数据集名称@数据源别名`，例如 `Road_L@Jingjin` |
| `filterQueryParameter` | 否 | `FilterParameter`，只有满足条件的对象参与分析 |
| `bufferSetting` | 否 | `BufferSetting`，缓冲通用设置 |
| `isUnion` | 否 | 是否与源记录集合并后返回，默认 `false` |
| `isAttributeRetained` | 否 | 是否保留源对象字段属性，默认 `true` |
| `resultSetting` | 否 | `DataReturnOption`，结果返回设置 |

结果为 `serviceResult.result.recordset.features`（单数 `recordset`），与 `QueryService` 的 `recordsets` 不同。

## 方式二：几何缓冲 - GeometryBufferAnalystParameters

对应示例 `examples/maplibregl/04_bufferAnalystService_geometry.html`。

```javascript
var geometryLine = {
    type: 'LineString',
    coordinates: [
        [116.1916654036, 39.8888542507],
        [116.2031567225, 39.8888542507],
        [116.2156351162, 39.8963250173],
        [116.2740019864, 39.8970124079]
    ]
};

var geoBufferAnalystParams = new GeometryBufferAnalystParameters({
    sourceGeometry: geometryLine,
    sourceGeometrySRID: 4326,
    bufferSetting: new BufferSetting({
        endType: BufferEndType.ROUND,
        leftDistance: new BufferDistance({ value: 300 }),
        rightDistance: new BufferDistance({ value: 300 }),
        semicircleLineSegment: 10,
        radiusUnit: 'METER'
    })
});

new SpatialAnalystService(serviceUrl)
    .bufferAnalysis(geoBufferAnalystParams)
    .then(function(serviceResult) {
        map.addSource('buffer-result', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [serviceResult.result.resultGeometry]
            }
        });
    });
```

| 参数 | 必填 | 说明 |
|---|---|---|
| `sourceGeometry` | 是 | GeoJSON 几何对象 |
| `sourceGeometrySRID` | 否 | 源几何坐标系代码，例如 `4326` |
| `bufferSetting` | 否 | `BufferSetting`，缓冲通用设置 |

结果为 `serviceResult.result.resultGeometry`（单个 GeoJSON 几何），需要包装成 Feature 后再放入 FeatureCollection。

## BufferSetting

| 参数 | 默认值 | 说明 |
|---|---|---|
| `endType` | `BufferEndType.FLAT` | 缓冲区端点类型，常用 `ROUND`、`FLAT`、`SQUARE` |
| `leftDistance` | `100` | 左侧缓冲距离，传 `BufferDistance` 或 `{ value }` |
| `rightDistance` | `100` | 右侧缓冲距离，仅线对象有效 |
| `semicircleLineSegment` | `4` | 圆头缓冲圆弧处线段个数，`ROUND` 时影响平滑度 |
| `radiusUnit` | `BufferRadiusUnit.METER` | 缓冲半径单位，例如 `'METER'`、`'KILOMETER'` |

左、右距离之和为缓冲区总宽度。生成用户代码时应显式写出端点类型、距离和单位，不要依赖默认值。

## FGB 结果

`04_bufferAnalystService_FGB.html` 通过第二参数获取 FGB 结果，再从 `serviceResult.result.newResourceLocation` 创建 `FGBLayer`。使用方式与 [rest-data-vector.md](../utils/rest-data-vector.md) 一致。

## 关键要点

- 使用 `SpatialAnalystService.bufferAnalysis`，不是 `FeatureService.getFeaturesByBuffer`。
- 数据集缓冲用 `DatasetBufferAnalystParameters`，几何缓冲用 `GeometryBufferAnalystParameters`。
- 数据集结果在 `result.recordset.features`，几何结果在 `result.resultGeometry`。
- 后续空间查询使用 `GetFeaturesByGeometryParameters`，把 `resultGeometry` 或 `recordset.features` 作为 `geometry`。

## 参数详情

```bash
node skills/maplibregl/scripts/query-api.mjs get DatasetBufferAnalystParameters
node skills/maplibregl/scripts/query-api.mjs get GeometryBufferAnalystParameters
node skills/maplibregl/scripts/query-api.mjs get BufferSetting
node skills/maplibregl/scripts/query-api.mjs get SpatialAnalystService --member bufferAnalysis
```
