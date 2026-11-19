---
name: FeatureService
description: 要素数据集服务（REST Data）— 提供 ID 查询、范围查询、SQL 查询、空间查询和缓冲区查询。
---

# FeatureService - 要素数据集服务

## 服务信息

| 属性 | 说明 |
|---|---|
| 命名空间 | `maplibregl.supermap.FeatureService` |
| 服务类型 | REST 数据服务（`/rest/data`） |
| 所属模块 | services |
| 依赖 | 需先加载 maplibre-gl-enhance 与 iclient-maplibregl，版本见 `templates/index.html` |

## 构造函数

```javascript
new maplibregl.supermap.FeatureService(url, options);
```

| 参数 | 类型 | 说明 |
|---|---|---|
| `url` | string | REST Data 服务地址，例如 `https://iserver.supermap.io/iserver/services/data-world/rest/data` |
| `options.proxy` | string | 服务代理地址（可选） |
| `options.withCredentials` | boolean | 请求是否携带凭据（可选） |
| `options.crossOrigin` | boolean | 是否允许跨域请求（可选） |
| `options.headers` | Object | 请求头（可选） |

## 查询方法

| 方法 | 说明 |
|---|---|
| `getFeaturesBySQL(params, resultFormat?)` | SQL 查询；`resultFormat` 传 `'FGB'` 时返回 FGB 资源地址 |
| `getFeaturesByBounds(params)` | 范围查询 |
| `getFeaturesByGeometry(params)` | 空间查询 |
| `getFeaturesByBuffer(params)` | 缓冲区查询 |
| `getFeaturesByIDs(params)` | ID 查询 |

## 返回结构

```javascript
{
    result: {
        features: { type: 'FeatureCollection', features: [] },
        datasetInfo: { name: '', dataSourceName: '', type: '', prjCoordSys: {}, bounds: {} }
    }
}
```

| 字段 | 说明 |
|---|---|
| `result.features` | GeoJSON FeatureCollection，可直接传给 `map.addSource()` |
| `result.features.features` | GeoJSON Feature 数组 |
| `result.datasetInfo` | 数据集元信息 |
| `result.newResourceLocation` | 仅 FGB 查询返回，FGB 资源地址 |

## SQL 查询 - getFeaturesBySQL

数据集查询需要在 `datasetNames` 里给出 `数据源:数据集`，同时用 `queryParameter.name` 给出 `数据集@数据源`。两种写法都在 `examples/maplibregl/02_getFeatureBySQL.html` 中核实过。

```javascript
var dataUrl = 'https://iserver.supermap.io/iserver/services/data-world/rest/data';
var sqlParam = new maplibregl.supermap.GetFeaturesBySQLParameters({
    queryParameter: {
        name: 'Countries@World',
        attributeFilter: 'POPULATION > 10000000'
    },
    datasetNames: ['World:Countries']
});

new maplibregl.supermap.FeatureService(dataUrl)
    .getFeaturesBySQL(sqlParam)
    .then(function(serviceResult) {
        map.addSource('query-result', {
            type: 'geojson',
            data: serviceResult.result.features
        });
        map.addLayer({
            id: 'query-result-layer',
            type: 'fill',
            source: 'query-result',
            paint: { 'fill-color': '#ff8800', 'fill-opacity': 0.5 }
        });
    })
    .catch(function(error) {
        console.error('REST Data SQL 查询失败：', error);
    });
```

## 空间查询 - getFeaturesByGeometry

| `spatialQueryMode` | 说明 |
|---|---|
| `INTERSECT` | 与几何对象相交的要素 |
| `WITHIN` | 完全位于几何对象内的要素 |
| `CONTAIN` | 完全包含几何对象的要素 |
| `ADJOIN` | 与几何对象边界相触的要素 |

```javascript
var geometryParam = new maplibregl.supermap.GetFeaturesByGeometryParameters({
    datasetNames: ['Jingjin:GreenFeild_R'],
    geometry: bufferFeature,
    spatialQueryMode: 'INTERSECT'
});
```

`geometry` 必须是 GeoJSON 几何对象。查询前确认服务侧坐标系与几何坐标系一致，必要时通过参数类的投影字段转换，不要假定服务使用 EPSG:4326。

## 缓冲区查询 - getFeaturesByBuffer

```javascript
var queryBufferGeometry = {
    type: 'Polygon',
    coordinates: [[[-20, 20], [-20, -20], [20, -20], [20, 20], [-20, 20]]]
};

var bufferParam = new maplibregl.supermap.GetFeaturesByBufferParameters({
    datasetNames: ['World:Capitals'],
    bufferDistance: 30,
    geometry: queryBufferGeometry
});

new maplibregl.supermap.FeatureService(dataUrl)
    .getFeaturesByBuffer(bufferParam)
    .then(function(serviceResult) {
        map.addSource('queryDatas', {
            type: 'geojson',
            data: serviceResult.result.features
        });
        map.addLayer({
            id: 'queryDatas',
            type: 'circle',
            source: 'queryDatas',
            paint: { 'circle-radius': 6, 'circle-color': '#0000ff', 'circle-opacity': 0.5 }
        });
    });
```

`bufferDistance` 与 `geometry` 为必填参数。`GetFeaturesByBufferParameters` 用于在 REST Data 服务上按缓冲距离查询数据集要素；按几何缓冲并生成缓冲面请使用 [buffer-analysis.md](./buffer-analysis.md) 的 `SpatialAnalystService`。

## 关键要点

- 查询对象是数据集（`/rest/data`），不是地图上显示的图层。
- `datasetNames` 使用 `数据源:数据集`，`queryParameter.name` 使用 `数据集@数据源`。
- 结果是 `result.features`，可直接用于 `map.addSource()`。
- 查询结果为 FGB 时见 [rest-data-vector.md](../utils/rest-data-vector.md)。

## 与 QueryService 对比

| | FeatureService | QueryService |
|---|---|---|
| URL | `/rest/data` | `/rest/maps/{mapName}` |
| 查询对象 | 数据集 | 地图图层 |
| 参数键名 | `queryParameter` / `datasetNames` | `queryParams` |
| 返回格式 | `result.features` | `result.recordsets[].features` |

## 参数详情

```bash
node scripts/query-api.mjs get GetFeaturesBySQLParameters
node scripts/query-api.mjs get GetFeaturesByGeometryParameters
node scripts/query-api.mjs get GetFeaturesByBufferParameters
```
