---
name: 'initMap'
description: '使用 SuperMap iClient initMap 方法初始化地图，适用于 /rest/maps/ 服务'
---

# initMap - 地图服务初始化地图

## 使用场景

- URL 包含 `/rest/maps/`
- 必须使用 `initMap`，不要创建空白地图后再 addSource —— initMap 会自动处理坐标系统、范围和底图
- 默认是栅格瓦片

## 模板

```javascript
mapboxgl.supermap.initMap(
    'http://host:8090/iserver/services/map-world/rest/maps/World',
    {
        mapOptions: {
            container: 'map',
            center: [116.39, 39.9],
            zoom: 3,
        }
    }
).then(function(result) {
    var map = result.map;
    // initMap 返回已加载完成的地图，可直接操作
    // 禁止使用 map.on('load', ...)，回调永远不会执行
    map.addSource('overlay', { ... });
    map.addLayer({ ... });
});
```

## 参数

- `url`: 字符串 — iServer RestMap 服务地址
- `options.mapOptions` — 传递给 mapboxgl.Map 的选项（container、center、zoom、bearing、pitch、maxZoom、minZoom）
- 返回 `Promise<{map: mapboxgl.Map}>`，自动配置坐标系统、范围、底图
- `options.mapOptions` 禁止传入 style，会覆盖自动生成的样式

## 关键要点

- `initMap` 返回已加载完成的地图，在 `.then()` 中直接操作
- 禁止在 `initMap` 之后使用 `map.on('load', ...)`
- 叠加 WMTS/WMS/GeoJSON 时，在 `.then()` 回调中添加

## 叠加其他服务

在 initMap 返回的地图上叠加 WMTS/WMS/GeoJSON：

```javascript
mapboxgl.supermap.initMap(
    'http://host:8090/iserver/services/map-world/rest/maps/World',
    { mapOptions: { container: 'map' } }
).then(function(result) {
    var map = result.map;
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
