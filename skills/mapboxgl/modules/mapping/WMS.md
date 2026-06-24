---
name: 'addWMS'
description: '添加 WMS 图层，支持 OGC 标准 - 可通过 Capabilities 解析或手动 URL 方式'
---

# 添加 WMS 图层

## URL 识别

- URL 包含 "WMS" 或 "wms"（不区分大小写）
- 格式：`https://{host}:{port}/iserver/services/{serviceName}/ogc/wms/{mapName}`

## 使用 Capabilities 解析器

```javascript
// 通过 getWMSCapabilities 获取 WMS 参数（来自 modules/utils/ogc-capabilities.md）
var cap = await getWMSCapabilities('http://host:8090/iserver/services/wms-world/wms');
if (cap.error || !cap.layers.length) throw new Error(cap.error || 'WMS 无可用图层');
var layerInfo = cap.layers[0];
map.addSource('wms-source', {
  type: 'raster',
  tiles: [layerInfo.tileUrl],
  tileSize: layerInfo.tileSize || 256,
  minzoom: layerInfo.minzoom || 0,
  maxzoom: layerInfo.maxzoom || 22,
  bounds: cap.bounds,
});
map.addLayer({ id: 'wms-layer', type: 'raster', source: 'wms-source' });
```

## 手动 URL 方式（WMS 1.3.0）

```javascript
map.addSource('wms-source', {
  type: 'raster',
  tileSize: 256,
  tiles: [
    'http://host:8090/iserver/services/wms-world/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=World&STYLES=&CRS=EPSG%3A3857&WIDTH=256&HEIGHT=256&BBOX={bbox-epsg-3857}',
  ],
});
map.addLayer({ id: 'wms-layer', type: 'raster', source: 'wms-source' });
```

## WMS 1.3.0 注意事项

- 参数名从 `SRS` 改为 `CRS`
- EPSG:4326 的 bbox 轴顺序为 纬度,经度（纬度在前）

## URL 格式

- 格式：`https://{host}:{port}/iserver/services/{serviceName}/ogc/wms/{mapName}`
