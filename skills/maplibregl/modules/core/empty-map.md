---
name: emptyMap
description: 使用 new maplibregl.Map 创建空白地图，适用于非 /rest/maps/ 场景。
---

# 空白地图创建

## 使用场景

- 没有可用的 `/rest/maps/` 服务。
- 直接用 WMTS / WMS / GeoJSON / MVT 作为底图。
- 需要一张无预加载底图的空白地图。

## 模板

```javascript
var map = new maplibregl.Map({
  container: 'map',
  style: { version: 8, sources: {}, layers: [] },
  center: [116.39, 39.9],
  zoom: 3
});

map.on('load', function () {
  // 必须在 load 回调内添加 sources / layers
  map.addSource('overlay', {
    /* 已核实的数据源配置 */
  });
  map.addLayer({
    /* 已核实的图层配置 */
  });
});

map.on('error', function (event) {
  if (event && event.error) {
    console.error('地图错误：', event.error);
  }
});
```

## 关键要点

- `{ version: 8, sources: {}, layers: [] }` 是合法空白样式，不带底图；空白地图必须自行添加底图或叠加数据，否则用户只会看到空白画布。
- 所有 `addSource` / `addLayer` 必须在 `map.on('load', ...)` 内执行，否则会抛 `Style is not done loading`。
- 只有用户提供了有效样式 URL/对象，或明确要空白地图时才走这条路；iServer REST Map URL 一律用 `maplibregl.supermap.initMap()`。

## 叠加其他服务

```javascript
var map = new maplibregl.Map({
  container: 'map',
  style: { version: 8, sources: {}, layers: [] },
  center: [116.39, 39.9],
  zoom: 3
});

map.on('load', function () {
  map.addSource('overlay-wmts', {
    type: 'raster',
    tileSize: 256,
    tiles: ['https://iserver.supermap.io/iserver/services/map-world/wmts100?...&tilematrix={z}&tilerow={y}&tilecol={x}']
  });
  map.addLayer({ id: 'overlay-wmts', type: 'raster', source: 'overlay-wmts' });
});
```

## 坐标系说明

投影与叠加要求见 [coordinate-system.md](../../rules/coordinate-system.md)。
