---
name: 'emptyMap'
description: '使用 new L.map 创建空白 Leaflet 地图，适用于非 /rest/maps/ 场景'
---

# 空白地图创建

## 使用场景

- 没有可用的 `/rest/maps/` 地图服务
- 直接用 WMTS / WMS / 矢量瓦片 / GeoJSON 作为底图
- 需要完全控制 `crs`、`center`、`zoom` 的创建过程

## 模板

```html
<div id="map" style="position:absolute;top:0;left:0;width:100%;height:100%"></div>
<script>
  var map = L.map('map', {
    center: [39.89, 116.43],      // [lat, lng]
    zoom: 5,
    maxZoom: 18,
    preferCanvas: true
  });

  // Leaflet 没有 load 事件，图层直接同步挂载
  new L.supermap.TiledVectorLayer(url, {
    tileSize: 512,
    format: L.supermap.VectorTileFormat.MVT
  }).addTo(map);
</script>
```

## 关键要点

1. **`center` 是 `[lat, lng]`**（Leaflet 顺序），与 MapboxGL 的 `[lng, lat]` 相反。也可写成 `{ lon: 116.43, lat: 39.89 }`。
2. **没有 `style: { version: 8, ... }`**：Leaflet 不需要空样式对象。
3. **没有 `map.on('load')`**：图层用 `.addTo(map)` 同步挂载，不需要等待任何事件。
4. **`crs` 只能在构造时指定**；默认 `L.CRS.EPSG3857`，地理坐标场景用 `L.CRS.EPSG4326`。
5. **容器必须有实际尺寸并有定位**：`position:absolute;top:0;left:0;width:100%;height:100%` 是最稳妥写法；尺寸变化后调用 `map.invalidateSize()`。

## 叠加其他服务

```javascript
var map = L.map('map', {
  crs: L.CRS.EPSG4326,
  center: [0, 0],
  zoom: 2,
  maxZoom: 18
});

// 栅格底图
new L.supermap.TiledMapLayer('https://iserver.supermap.io/iserver/services/map-world/rest/maps/World', {
  noWrap: true
}).addTo(map);

// WMS
new L.TileLayer.WMS('https://iserver.supermap.io/iserver/services/map-china/wms111/China', {
  layers: 'China',
  format: 'image/png',
  transparent: true,
  noWrap: true
}).addTo(map);

// WMTS
new L.supermap.WMTSLayer('https://iserver.supermap.io/iserver/services/map-china/wmts100', {
  layer: 'China',
  style: 'default',
  tilematrixSet: 'CUSTOM_China',
  format: 'image/png',
  requestEncoding: 'REST'
}).addTo(map);

// GeoJSON
L.geoJSON(geojson).addTo(map);
```

## 常见地图控件

```javascript
L.control.scale({ imperial: false }).addTo(map);       // 比例尺
L.control.zoom({ position: 'bottomright' }).addTo(map); // 缩放按钮（默认已在 topleft）
L.control.layers(baseLayers, overlays).addTo(map);      // 图层控制
```

## 坐标系说明

> 详见：[coordinate-system.md](../../rules/coordinate-system.md)
