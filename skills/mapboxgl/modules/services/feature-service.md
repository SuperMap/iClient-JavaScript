---
name: "FeatureService"
description: "要素数据集服务（REST Data）— 提供 ID 查询、范围查询、SQL查询、空间查询、缓冲区查询、地物编辑"
---

# FeatureService - 要素数据集服务

## 服务信息

| 属性 | 说明 |
|------|------|
| **命名空间** | `mapboxgl.supermap.FeatureService` |
| **服务类型** | REST 数据服务（`/rest/data`） |
| **CDN** | `https://iclient.supermap.io/dist/mapboxgl/iclient-mapboxgl.js` |
| **所属模块** | Services |

## 构造函数

```javascript
new mapboxgl.supermap.FeatureService(url, options)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `url` | string | 服务地址，如 `http://host:8090/iserver/services/data-world/rest/data` |
| `options.proxy` | string | 服务代理地址（可选） |
| `options.withCredentials` | boolean | 请求是否携带凭据（可选） |
| `options.crossOrigin` | boolean | 是否允许跨域请求（可选） |
| `options.headers` | Object | 请求头（可选） |
| `options.preferServer` | boolean | 当 resultFormat=GEOJSON 时，使用服务器直接返回 geojson（可选） |

## 查询方法

| 方法 | 说明 |
|------|------|
| `getFeaturesBySQL(params)` | SQL 查询 |
| `getFeaturesByBounds(params)` | 范围查询 |
| `getFeaturesByGeometry(params)` | 空间查询 |
| `getFeaturesByBuffer(params)` | 缓冲区查询 |
| `getFeaturesByIDs(params)` | ID 查询 |
| `getFeaturesCount(params)` | 获取要素数量（v11.2.0+） |
| `getFeaturesDatasetInfo(params)` | 获取数据集信息（v11.2.0+） |

## 返回格式

### serviceResult 结构

```javascript
{
    result: {
        features: {
            type: "FeatureCollection",
            features: [...]  // GeoJSON Feature[]
        },
        datasetInfo: {
            name: string,
            dataSourceName: string,
            type: string,
            prjCoordSys: {...},
            bounds: {...}
        }
    }
}
```

### 返回格式说明

| 字段 | 说明 |
|------|------|
| `result.features` | GeoJSON FeatureCollection，直接可用于 `map.addSource()` |
| `result.features.features` | GeoJSON Feature 数组 |
| `result.datasetInfo` | 数据集元信息 |

## SQL 查询 - getFeaturesBySQL

### 使用场景
- 从 REST 数据服务（`/rest/data`）查询数据
- 使用 SQL WHERE 子句过滤数据

### 示例

```javascript
mapboxgl.supermap.initMap('http://host:8090/iserver/services/map-world/rest/maps/World').then(function(result) {
    var map = result.map;

    var dataUrl = 'http://host:8090/iserver/services/data-world/rest/data';
    var queryParam = new mapboxgl.supermap.GetFeaturesBySQLParameters({
        queryParameter: {
            name: 'World:Countries',
            attributeFilter: 'POPULATION > 10000000'
        },
        datasetNames: ['World:Countries'],
        targetPrj: { epsgCode: 4326 }
    });

    new mapboxgl.supermap.FeatureService(dataUrl).getFeaturesBySQL(queryParam).then(function(serviceResult) {
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
    });
});
```

## 空间查询 - getFeaturesByGeometry

### 使用场景
- 查询与几何对象相交、包含或被包含的要素
- 常用于缓冲区分析后查找缓冲区内的要素

### spatialQueryMode 选项

| 模式 | 说明 |
|------|------|
| `INTERSECT` | 与几何对象相交的要素 |
| `WITHIN` | 完全在几何对象内的要素 |
| `CONTAIN` | 完全包含几何对象的要素 |
| `ADJOIN` | 与几何对象边界相触的要素 |

### 示例

```javascript
var geometryParam = new mapboxgl.supermap.GetFeaturesByGeometryParameters({
    datasetNames: ['Jingjin:GreenFeild_R'],
    geometry: bufferFeature,
    spatialQueryMode: 'INTERSECT',
    targetPrj: { epsgCode: 4326 }
});

new mapboxgl.supermap.FeatureService('http://host:8090/iserver/services/data-jingjin/rest/data')
    .getFeaturesByGeometry(geometryParam)
    .then(function(queryResult) {
        map.addSource('query-by-geometry', {
            type: 'geojson',
            data: queryResult.result.features
        });
        map.addLayer({
            id: 'query-by-geometry-layer',
            type: 'fill',
            source: 'query-by-geometry',
            paint: { 'fill-color': '#ff0000', 'fill-opacity': 0.5 }
        });
    });
```

## 缓冲区查询 - getFeaturesByBuffer

### 使用场景
- 查询几何对象缓冲距离内的要素
- URL 包含 `/rest/data`

### 示例

```javascript
var dataUrl = 'https://iserver.supermap.io/iserver/services/data-world/rest/data';
var queryBufferGeometry = {
    type: 'Polygon',
    coordinates: [[[-20, 20], [-20, -20], [20, -20], [20, 20], [-20, 20]]]
};

var bufferParam = new mapboxgl.supermap.GetFeaturesByBufferParameters({
    datasetNames: ['World:Capitals'],
    bufferDistance: 30,
    geometry: queryBufferGeometry,
    targetPrj: { epsgCode: 4326 }
});

new mapboxgl.supermap.FeatureService(dataUrl).getFeaturesByBuffer(bufferParam).then(function(serviceResult) {
    map.addSource('queryDatas', {
        type: 'geojson',
        data: serviceResult.result.features
    });
    map.addLayer({
        id: 'queryDatas',
        type: 'circle',
        source: 'queryDatas',
        paint: { 'circle-radius': 6, 'circle-color': 'blue', 'circle-opacity': 0.5 }
    });
});
```

## 关键要点

- FeatureService 查询的是**数据集**，QueryService 查询的是地图上显示的**图层**
- `queryParameter.name` 格式：`DataSource:DatasetName`（例如 `World:Countries`）
- FeatureService 结果是直接的 GeoJSON FeatureCollection，可直接用于 `map.addSource()`
- `bufferDistance` 和 `geometry` 为 GetFeaturesByBuffer 的必填参数

## 与 QueryService 对比

| | FeatureService | QueryService |
|---|---|---|
| **URL** | `/rest/data` | `/rest/maps/{mapName}` |
| **服务类型** | REST 数据服务 | REST 地图服务 |
| **查询范围** | 数据集 | 地图图层（可见图层） |
| **参数键名** | `queryParameter` / `datasetNames` | `queryParams`（FilterParameter[]） |
| **返回格式** | `result.features`（GeoJSON） | `result.recordsets[].features` （GeoJSON）|

## 参数详情

> 详见 metadata：[@GetFeaturesBySQLParameters](../../metadata/iclient-mapboxgl/GetFeaturesBySQLParameters.json)、[@GetFeaturesByGeometryParameters](../../metadata/iclient-mapboxgl/GetFeaturesByGeometryParameters.json)、[@GetFeaturesByBufferParameters](../../metadata/iclient-mapboxgl/GetFeaturesByBufferParameters.json)