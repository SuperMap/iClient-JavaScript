---
name: vectorTile
description: 使用 MapLibre 矢量数据源加载 SuperMap iServer MVT 地图瓦片。
---

# 加载 iServer 矢量瓦片

当用户需要叠加或直接渲染 iServer MVT 地图服务时，使用 MapLibre 原生 `vector` source 和对应的图层。先查阅 `examples/maplibregl/mvtVectorTile.html`，核实服务端点、瓦片模板和 `source-layer` 名称。

下面的片段应在地图 `load` 事件中执行。示例 URL 和图层名来自 MapLibreGL 示例；更换服务后必须按新服务的元数据更新 `source-layer` 和瓦片 URL。

```javascript
map.addSource('iserver-vector', {
    type: 'vector',
    tiles: [
        'https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China/tileFeature.mvt?_cache=false&returnAttributes=true&width=512&height=512&viewBounds={bbox-epsg-3857}'
    ]
});

map.addLayer({
    id: 'world-continent-fill',
    type: 'fill',
    source: 'iserver-vector',
    'source-layer': 'World_Continent_pg@China',
    paint: {
        'fill-color': '#e6ebc9',
        'fill-opacity': 0.8
    }
});
```

使用 iServer REST Map 初始化底图时，在 `initMap()` 解析后注册 `map.once('load', ...)`，再添加数据源和图层。确认底图与瓦片投影兼容；非标准坐标系的加载方式应参考 `mvtVectorTile_2362.html` 及相应的 MapLibreGL 扩展配置，不要套用 MapboxGL 资源。
