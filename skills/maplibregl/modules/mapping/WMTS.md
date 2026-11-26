---
name: addWMTS
description: 添加 WMTS 栅格图层，支持 Capabilities 解析或手动 KVP URL 两种方式。
---

# 添加 WMTS 栅格图层

> **版本与导入约定（先读）**：用户未指定 maplibre-gl 版本时默认 **v6**。本文使用 MapLibre 原生 raster source/layer 与页面内工具函数，两版写法一致；加载方式差异见 [version-routing.md](../../rules/version-routing.md)。

## URL 识别

- URL 含 `WMTS` / `wmts`（不区分大小写）。
- 格式：`https://{host}:{port}/iserver/services/{wmtsServiceName}`，**不带** `/rest/maps/`。

## 方式一：Capabilities 解析（推荐）

WMTS 瓦片通过 MapLibre `raster` source 加载。用 [OGC Capabilities 工具](../utils/ogc-capabilities.md)读取图层、样式、格式、坐标系和 `TileMatrixSet`，由工具生成瓦片 URL 模板：

```javascript
// getWMTSCapabilities 来自 modules/utils/ogc-capabilities.md
var cap = await getWMTSCapabilities('https://iserver.supermap.io/iserver/services/map-world/wmts100', 'EPSG:3857');
if (cap.error || !cap.layers.length) {
  throw new Error(cap.error || 'WMTS 无可用图层');
}

var layerInfo = cap.layers.find(function (layer) {
  return layer.layerId === 'World';
});
if (!layerInfo) {
  throw new Error('Capabilities 中没有指定的 WMTS 图层');
}

var source = {
  type: 'raster',
  tiles: [layerInfo.tileUrl],
  tileSize: layerInfo.tileSize || 256,
  minzoom: layerInfo.minzoom || 0,
  maxzoom: layerInfo.maxzoom || 22
};
if (layerInfo.bounds) source.bounds = layerInfo.bounds;

map.addSource('wmts-source', source);
map.addLayer({ id: 'wmts-layer', type: 'raster', source: 'wmts-source' });
```

- 服务含多个图层时必须用用户指定的 `layerId` 选择，不要静默取第一项。
- 工具会优先选择与请求坐标系相符、且矩阵可映射的 `TileMatrixSet`。

## 方式二：手动 KVP URL

已知图层、矩阵集和格式时可直接拼 GetTile 模板：

```javascript
var wmtsUrl = 'https://iserver.supermap.io/iserver/services/map-world/wmts100';

map.once('load', function () {
  map.addSource('wmts-source', {
    type: 'raster',
    tiles: [
      wmtsUrl +
        '?service=WMTS&request=GetTile&version=1.0.0&layer=World&style=&tilematrixSet=GlobalCRS84Scale_World&format=image/png&tilematrix={z}&tilerow={y}&tilecol={x}'
    ],
    tileSize: 256
  });
  map.addLayer({ id: 'wmts-layer', type: 'raster', source: 'wmts-source' });
});
```

手动方式下 `tilematrix` / `tilerow` / `tilecol` 的取值必须与服务端 `TileMatrixSet` 真正对应。层级标识不是从 0 连续编号时（如 `EPSG:3857:0`），不能直接替换成 `{z}`，应改用方式一。

## 瓦片矩阵限制

- 工具支持同一前缀、连续数字结尾且瓦片尺寸一致的 `TileMatrix` 标识，并映射到 MapLibre `{z}`，例如 `0, 1, 2` 或 `EPSG:3857:0, EPSG:3857:1`。
- 非数字、非连续、前缀不一致或瓦片尺寸变化的矩阵无法安全映射；工具会把对应图层放进 `unsupportedLayers`，全部不支持时抛错，**不得猜测缩放级别**。
- 浏览器必须能跨域请求 GetCapabilities 与瓦片。

## 参数

| 参数            | 说明                                                     |
| --------------- | -------------------------------------------------------- |
| `url`           | WMTS 服务地址，`/services/{wmtsServiceName}`             |
| `layer`         | WMTS 图层标识，对应 Capabilities 中的 `<Layer><Identifier>` |
| `tilematrixSet` | 矩阵集标识，如 `GoogleMapsCompatible`、`EPSG:4490`       |
| `format`        | 图像格式，如 `image/png`                                 |
| `tileSize`      | 瓦片尺寸，iServer WMTS 通常 256                          |

## 坐标系说明

投影与叠加要求见 [coordinate-system.md](../../rules/coordinate-system.md)。
