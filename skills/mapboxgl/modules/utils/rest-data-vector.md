---
name: 'restDataVectorTile'
description: 'iServer数据服务（rest/data）矢量瓦片上图 — 获取 source layer 和 CRS'
---

# iServer REST Data 矢量瓦片上图 工具方法

## 核心工具方法

### 获取默认 Paint 样式

```javascript
function getDefaultPaint(layerType) {
    var paintMap = {
        'fill': {
            'fill-color': '#0088ff',
            'fill-opacity': 0.5
        },
        'line': {
            'line-color': '#0066cc',
            'line-width': 1
        },
        'circle': {
            'circle-radius': 4,
            'circle-color': '#ff4400'
        }
    };
    return paintMap[layerType] || {};
}
```

### 获取图层类型

```javascript
function getLayerType(datasetType) {
    var types = {
        'POINT': 'circle',
        'LINE': 'line',
        'REGION': 'fill',
        'TEXT': 'circle'
    };
    return types[datasetType];
}
```

### 获取 REST Data 图层信息

```javascript
async function getRestDataInfo(url, token) {
    var response = await fetch(url + '.json');
    var data = await response.json();
    var datasetInfo = data.datasetInfo;
    if (!datasetInfo) return;

    var prjCoordSys = datasetInfo.prjCoordSys;
    var type = datasetInfo.type;
    var bounds = datasetInfo.bounds;
    var name = datasetInfo.name;
    var dataSourceName = datasetInfo.dataSourceName;

    var epsgCode = prjCoordSys.epsgCode;
    var layerType = getLayerType(type);
    if (!layerType) return;

    var extent = [bounds.left, bounds.bottom, bounds.right, bounds.top];
    var id = Date.now();
    var sourceId = dataSourceName + '_' + name + '_' + id;
    var maplayerId = 'restdata_' + id;

    var tile = url + '/tileFeature.mvt?returnAttributes=true&width=512&height=512&x={x}&y={y}&z={z}';
    var projection = 'EPSG:' + epsgCode;

    if (projection && !['EPSG:3857', 'EPSG:4326'].includes(projection)) {
        tile = tile + '&scale={scale}';
    }
    if (token) {
        tile = tile + '&token=' + token;
    }

    var layer = {
        type: layerType,
        id: maplayerId,
        source: sourceId,
        'source-layer': name + '@' + dataSourceName,
        paint: getDefaultPaint(layerType)
    };

    var sources = {};
    sources[sourceId] = {
        type: 'vector',
        tiles: [tile],
        bounds: extent
    };

    return {
        sources: sources,
        layers: [layer],
        crs: { name: projection }
    };
}
```

## 使用示例

```javascript
var dataUrl = 'http://host:8090/iserver/services/data-world/rest/data';

async function initMap() {
    var info = await getRestDataInfo(dataUrl);
    if (!info) {
        console.error('获取 REST Data 信息失败');
        return;
    }

    var map = new mapboxgl.Map({
        container: 'map',
        style: {
            version: 8,
            sources: info.sources,
            layers: []
        },
        center: [116.39, 39.9],
        zoom: 4,
        crs: info.crs.name ? new mapboxgl.CRS(info.crs.name, '', info.crs.extent) : undefined
    });

    map.on('load', function() {
        var sources = info.sources;
        var layers = info.layers;
        for (var sourceId in sources) {
            map.addSource(sourceId, sources[sourceId]);
        }
        layers.forEach(function(layer) {
            map.addLayer(layer);
        });
    });
}

initMap();
```

## 关键参数说明

| 参数 | 说明 |
|------|------|
| `url + '.json'` | 获取数据集元信息 |
| `datasetInfo.prjCoordSys.epsgCode` | 坐标系 EPSG 代码 |
| `datasetInfo.type` | 数据集类型：POINT/LINE/REGION/TEXT |
| `datasetInfo.bounds` | 范围 `[left, bottom, right, top]` |
| `datasetInfo.name` | 数据集名称 |
| `datasetInfo.dataSourceName` | 数据源名称 |

## Tile URL 参数说明

| 参数 | 说明 |
|------|------|
| `returnAttributes=true` | 返回属性信息 |
| `width=512&height=512` | 瓦片尺寸 |
| `x={x}&y={y}&z={z}` | 瓦片坐标模板 |
| `scale={scale}` | 非标准坐标系需要 |
| `token={token}` | 认证 Token（可选） |

## 数据集类型到图层类型映射

| DatasetType | LayerType | Paint |
|-------------|-----------|-------|
| POINT | circle | circle-radius: 4, circle-color: #ff4400 |
| TEXT | circle | circle-radius: 4, circle-color: #ff4400 |
| LINE | line | line-color: #0066cc, line-width: 1 |
| REGION | fill | fill-color: #0088ff, fill-opacity: 0.5 |

## 注意事项

- REST Data 的 `source-layer` 格式为 `数据集名@数据源名`
- 非 EPSG:3857/EPSG:4326 坐标系需要添加 `&scale={scale}` 参数
- 需要引入 mapbox-gl-enhance 库以支持自定义坐标系（CRS）
- 坐标系与叠加要求详见：[coordinate-system.md](../../rules/coordinate-system.md)