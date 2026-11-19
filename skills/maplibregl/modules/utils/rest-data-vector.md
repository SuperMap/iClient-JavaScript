---
name: restDataVectorTile
description: iServer 数据服务（rest/data）矢量瓦片上图 —— 获取 source-layer 与 CRS 的工具方法。
---

# iServer REST Data 矢量瓦片上图工具方法

这些函数直接写在生成的页面里（不是库 API）。数据集级 URL 形如
`https://{host}:{port}/iserver/services/data-{name}/rest/data/datasources/{ds}/datasets/{dataset}`。

## 核心工具方法

### 数据集类型 → 图层类型与默认 paint

```javascript
function getLayerType(datasetType) {
  var types = { POINT: 'circle', TEXT: 'circle', LINE: 'line', REGION: 'fill' };
  return types[datasetType];
}

function getDefaultPaint(layerType) {
  var paintMap = {
    fill: { 'fill-color': '#0088ff', 'fill-opacity': 0.5 },
    line: { 'line-color': '#0066cc', 'line-width': 1 },
    circle: { 'circle-radius': 4, 'circle-color': '#ff4400' }
  };
  return paintMap[layerType] || {};
}
```

### 获取 REST Data 图层信息

```javascript
async function getRestDataInfo(url, token) {
  var response = await fetch(url + '.json');
  var data = await response.json();
  var datasetInfo = data.datasetInfo;
  if (!datasetInfo) return null;

  var prjCoordSys = datasetInfo.prjCoordSys;
  var type = datasetInfo.type;
  var bounds = datasetInfo.bounds;
  var name = datasetInfo.name;
  var dataSourceName = datasetInfo.dataSourceName;

  var layerType = getLayerType(type);
  if (!layerType) return null;

  var extent = [bounds.left, bounds.bottom, bounds.right, bounds.top];
  var id = Date.now();
  var sourceId = dataSourceName + '_' + name + '_' + id;
  var maplayerId = 'restdata_' + id;

  var tile =
    url + '/tileFeature.mvt?returnAttributes=true&width=512&height=512&x={x}&y={y}&z={z}';
  var projection = 'EPSG:' + prjCoordSys.epsgCode;

  if (projection && ['EPSG:3857', 'EPSG:4326'].indexOf(projection) === -1) {
    tile += '&scale={scale}';
  }
  if (token) {
    tile += '&token=' + token;
  }

  var sources = {};
  sources[sourceId] = { type: 'vector', tiles: [tile], bounds: extent };

  return {
    sources: sources,
    layers: [
      {
        type: layerType,
        id: maplayerId,
        source: sourceId,
        'source-layer': name + '@' + dataSourceName,
        paint: getDefaultPaint(layerType)
      }
    ],
    crs: { name: projection, extent: extent }
  };
}
```

## 使用示例

```javascript
var dataUrl =
  'https://iserver.supermap.io/iserver/services/data-world/rest/data/datasources/World/datasets/World_P';

getRestDataInfo(dataUrl).then(function (info) {
  if (!info) {
    showStatus('获取 REST Data 信息失败');
    return;
  }

  var map = new maplibregl.Map({
    container: 'map',
    style: { version: 8, sources: info.sources, layers: [] },
    center: [(info.crs.extent[0] + info.crs.extent[2]) / 2, (info.crs.extent[1] + info.crs.extent[3]) / 2],
    zoom: 4,
    crs:
      info.crs.name === 'EPSG:3857'
        ? maplibregl.CRS.EPSG3857
        : info.crs.name === 'EPSG:4326'
          ? maplibregl.CRS.EPSG4326
          : new maplibregl.CRS(info.crs.name, '', info.crs.extent)
  });

  map.on('load', function () {
    info.layers.forEach(function (layer) {
      map.addLayer(layer);
    });
  });
});
```

`maplibregl.CRS` 由 maplibre-gl-enhance 提供；只加载标准 3857/4326 时不需要 enhance。

## 关键字段

| 字段                             | 说明                                    |
| -------------------------------- | --------------------------------------- |
| `datasetInfo.prjCoordSys.epsgCode` | 坐标系 EPSG 代码                      |
| `datasetInfo.type`               | 数据集类型：POINT / LINE / REGION / TEXT |
| `datasetInfo.bounds`             | 范围 `left` / `bottom` / `right` / `top` |
| `datasetInfo.name`               | 数据集名称                              |
| `datasetInfo.dataSourceName`     | 数据源名称                              |

## Tile URL 参数

| 参数                    | 说明                        |
| ----------------------- | --------------------------- |
| `returnAttributes=true` | 返回要素属性                |
| `width=512&height=512`  | 瓦片尺寸                    |
| `x={x}&y={y}&z={z}`     | 瓦片坐标模板                |
| `scale={scale}`         | 非 3857/4326 坐标系需要补充 |
| `token={token}`         | 认证 Token（可选）          |

## 数据集类型 → 图层类型

| DatasetType | LayerType | Paint                                   |
| ----------- | --------- | --------------------------------------- |
| POINT       | circle    | circle-radius: 4, circle-color: #ff4400 |
| TEXT        | circle    | circle-radius: 4, circle-color: #ff4400 |
| LINE        | line      | line-color: #0066cc, line-width: 1      |
| REGION      | fill      | fill-color: #0088ff, fill-opacity: 0.5  |

## 注意事项

- `source-layer` 固定为 `数据集名@数据源名`，写错不会报错，只会什么都不显示。
- 非 `EPSG:3857` / `EPSG:4326` 必须补 `&scale={scale}`，并引入 enhance 才能设置 `maplibregl.CRS`。
- 数据服务不能直接出样式，颜色/线宽都要自己写 `paint`。
- 坐标系与叠加要求见 [coordinate-system.md](../../rules/coordinate-system.md)。
- 查询结果（FGB）展示见 [rest-data-fgb.md](./rest-data-fgb.md)。
