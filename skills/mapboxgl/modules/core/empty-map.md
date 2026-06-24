---
name: "emptyMap"
description: "使用 new mapboxgl.Map 创建空白地图，适用于非 /rest/maps/ 场景"
---

# 空白地图创建

## 使用场景
- 没有可用的 `/rest/maps/` 服务
- 直接使用 WMTS/WMS/GeoJSON 作为底图
- 需要创建无预加载底图的空白地图

## 模板

```javascript
var map = new mapboxgl.Map({
    container: 'map',
    style: { version: 8, sources: {}, layers: [] },
    center: [116.39, 39.9],
    zoom: 3
});

map.on('load', function() {
    // 必须在 load 事件回调内添加 sources/layers
    map.addSource('overlay', { ... });
    map.addLayer({ ... });
});
```

## 关键要点
- 空白样式 `{ version: 8, sources: {}, layers: [] }` 创建无底图的地图
- 必须使用 `map.on('load', ...)` 来添加图层
- 不要在 load 回调之外添加图层

## 叠加其他服务

在空白地图上叠加 WMTS/WMS/GeoJSON：

```javascript
var map = new mapboxgl.Map({
    container: 'map',
    style: { version: 8, sources: {}, layers: [] },
    center: [116, 39],
    zoom: 3
});

map.on('load', function() {
    map.addSource('overlay-wmts', {
        type: 'raster',
        tileSize: 256,
        tiles: ['http://host:8090/iserver/services/xxx/wmts'],
        rasterSource: 'iserver'
    });
    map.addLayer({ id: 'overlay-wmts', type: 'raster', source: 'overlay-wmts' });
});
```

## 坐标系说明

> 详见：[coordinate-system.md](../../rules/coordinate-system.md)
