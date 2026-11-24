---
name: 'addVectorTile'
description: '使用 L.supermap.TiledVectorLayer 添加 iServer 矢量瓦片图层'
---

# 添加矢量瓦片图层

Leaflet 侧矢量瓦片由 `L.supermap.TiledVectorLayer` 负责，服务地址复用 iServer REST 地图服务（`/rest/maps/{mapName}`），由 `format` 决定切片格式。

## 基础用法

```javascript
var url = 'https://iserver.supermap.io/iserver/services/map-china/rest/maps/China';

var vectorLayer = new L.supermap.TiledVectorLayer(url, {
  tileSize: 512,
  format: L.supermap.VectorTileFormat.MVT,
  cacheEnabled: true,
  returnAttributes: true,
  attribution: 'Tile Data © SuperMap iServer'
}).addTo(map);
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `url` | string | — | iServer REST 地图服务地址 |
| `format` | VectorTileFormat | `JSON` | 切片格式，见下表 |
| `tileSize` | number | `256` | 瓦片大小，MVT 场景一般用 `512` |
| `layerNames` | string | — | 指定参与的图层名称列表（矢量图层） |
| `layersID` | string | — | 获取进行切片的地图图层 ID |
| `cartoCSS` | string | `null` | 客户端 CartoCSS 样式字符串 |
| `serverCartoCSSStyle` | boolean | `true` | 是否使用服务端 CartoCSS 样式 |
| `processCharacters` | boolean | `false` | 设置客户端 CartoCSS 时是否做特定字符转换 |
| `crs` | `L.CRS` | `null`（继承地图） | 坐标系统类 |
| `returnAttributes` | boolean | `false` | 是否返回要素属性（`evt.layer.properties` 需要开启） |
| `expands` | string | `null` | 图层扩展的像素值 |
| `cacheEnabled` | boolean | `false` | 是否启用缓存（示例中常显式设为 `true`） |
| `tileTemplate` | Object | `null` | 自定义瓦片模板（对接第三方瓦片时使用） |
| `subdomains` | string | `'abc'` | 子域名 |
| `timeout` | number | `10000` | 请求超时（毫秒） |
| `noWrap` | boolean | `true` | 是否禁止经度方向重复渲染 |
| `vectorTileLayerStyles` | Object | `null` | 矢量瓦片图层风格（继承自 `VectorGrid`） |
| `renderer` | string | `'SVG'` | 渲染器类型，可选 `'SVG'` / `'Canvas'` |
| `attribution` | string | iServer 版权 | 版权描述 |

> `TiledVectorLayer` 在源码中标记为 `@deprecated`，但仍是 Leaflet 侧矢量瓦片的主要实现，`L.supermap.TiledVectorLayer` 为兼容旧命名保留小写别名 `L.supermap.tiledVectorLayer`。

## VectorTileFormat

```javascript
L.supermap.VectorTileFormat.JSON     // 默认值
L.supermap.VectorTileFormat.MVT      // Mapbox Vector Tile（推荐）
L.supermap.VectorTileFormat.PBF      // 兼容 PBF
```

## 要素点击与高亮

```javascript
var selectId = null;
var selectLayerName = null;

vectorLayer.on('click', function (evt) {
  var id = evt.layer.properties.id;      // 需 returnAttributes: true
  var layerName = evt.layer.layerName;
  clearHighlight();
  selectId = id;
  selectLayerName = layerName;

  vectorLayer.setFeatureStyle(id, layerName, {
    fillColor: '#800026',
    fillOpacity: 0.5,
    stroke: true,
    fill: true,
    color: 'red',
    opacity: 1,
    weight: 2
  });
});

function clearHighlight() {
  if (selectId && selectLayerName) {
    vectorLayer.resetFeatureStyle(selectId, selectLayerName);
  }
  selectId = null;
  selectLayerName = null;
}
```

**关键 API**

| 方法 | 说明 |
|------|------|
| `setFeatureStyle(id, layerName, layerStyle)` | 修改单个要素样式；`layerStyle` 可为对象或函数 |
| `resetFeatureStyle(id, layerName)` | 还原指定要素样式 |
| `getStyle(layerName)` | 获取指定图层当前样式 |
| `getStyles()` | 获取全部图层样式 |
| `getDataLayerNames()` | 获取数据中出现的图层名列表 |
| `setServerCartoCSS(cartoCSS)` | 切换为服务端 CartoCSS |
| `setClientCartoCSS(cartoCSS)` | 切换为客户端 CartoCSS |

## 客户端 CartoCSS 定制

```javascript
new L.supermap.TiledVectorLayer(url, {
  tileSize: 512,
  format: L.supermap.VectorTileFormat.MVT,
  renderer: 'Canvas',
  serverCartoCSSStyle: false,
  cartoCSS: [
    '#China {',
    '  line-color: #3388ff;',
    '  line-width: 1;',
    '  polygon-fill: #aad3df;',
    '}',
    '#China[pop>1000000] {',
    '  polygon-fill: #ff8800;',
    '}'
  ].join('\n')
}).addTo(map);
```

## 与 MapboxGL 的差异

| 项 | MapboxGL | Leaflet |
|----|----------|---------|
| 数据来源 | `addSource({ type: 'vector', tiles: [...] })` | `new L.supermap.TiledVectorLayer(url, opts)` 直接接管服务 |
| 样式 | `style` JSON 中 `layers[].paint` | 服务端/客户端 CartoCSS + `vectorTileLayerStyles` |
| 要素高亮 | `setFeatureState` | `setFeatureStyle(id, layerName, style)` |
| 底图一体化 | `initMap(url, { type: 'vector-tile' })` | 无：底图与矢量瓦片分别创建图层 |

## 坐标系说明

矢量瓦片必须与底图投影一致，否则无法正确叠加。`initMap` 场景下直接继承地图 CRS；手动 `L.map` 场景需自行保证 `crs` 与瓦片服务匹配。

> 详见：[coordinate-system.md](../../rules/coordinate-system.md)
