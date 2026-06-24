---
name: 'addWMTS'
description: '添加 WMTS 图层，支持 OGC 标准 - 可通过 Capabilities 解析或手动 URL 方式'
---

# 添加 WMTS 图层

## URL 识别

- URL 包含 "WMTS" 或 "wmts"（不区分大小写）
- 格式：`https://{host}:{port}/iserver/services/{wmtsServiceName}`

## 使用 Capabilities 解析器

```javascript
// 通过 getWMTSCapabilities 获取 WMTS 参数（来自 modules/utils/ogc-capabilities.md）

var cap = await getWMTSCapabilities('http://host:8090/iserver/services/map-world/wmts100', 'EPSG:3857');
if (cap.error || !cap.layers.length) throw new Error(cap.error || 'WMTS 无可用图层');

var layerInfo = cap.layers[0];
map.addSource('wmts-source', {
  type: 'raster',
  tiles: [layerInfo.tileUrl],
  tileSize: layerInfo.tileSize || 256,
  minzoom: layerInfo.minzoom || 0,
  maxzoom: layerInfo.maxzoom || 22,
  bounds: layerInfo.bounds,
});
map.addLayer({ id: 'wmts-layer', type: 'raster', source: 'wmts-source' });
```

## 手动 KVP URL 方式

```javascript
var wmtsUrl = 'http://host:8090/iserver/services/map-world/wmts100';
map.addSource('wmts-layer', {
  type: 'raster',
  tiles: [
    wmtsUrl +
      '?service=WMTS&request=GetTile&version=1.0.0&layer=World&style=&tilematrixSet=GlobalCRS84Scale_World&format=image/png&tilematrix={z}&tilerow={y}&tilecol={x}',
  ],
  tileSize: 256,
});
map.addLayer({ id: 'wmts-layer', type: 'raster', source: 'wmts-layer' });
```

## URL 格式

- iServer WMTS 不使用 `/rest/maps/` 路径
- 直接格式：`/services/{wmtsServiceName}`

## 参数

- `url`: WMTS 服务 URL
- `layerName`: WMTS 图层名称
- `tileMatrixSet`: 例如 "GoogleMapsCompatible"、"EPSG:4490"
