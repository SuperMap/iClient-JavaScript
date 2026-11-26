---
name: initMap
description: 使用 SuperMap iClient initMap 初始化 MapLibre 地图，适用于 /rest/maps/ 服务。
---

# initMap - 地图服务初始化地图

> **版本与导入约定（先读）**：下文代码默认即 **v6（默认版本）** 写法，可直接复制——业务类从 mjs 具名导入，无 `maplibregl.supermap.` 前缀。仅当用户明确要 v5 时，按 [version-routing.md](../../rules/version-routing.md) 第 4 节还原（`initMap` 改写为 `maplibregl.supermap.initMap`，普通 script 引 v5 CDN）。
>
> v6 module 脚本头部固定写法：
>
> ```js
> import * as maplibregl from 'maplibre-gl';
> import { initMap } from 'https://iclient.supermap.io/dist/maplibregl/iclient-maplibregl.mjs';
> ```

## 使用场景

- URL 包含 `/rest/maps/`（iServer REST Map 服务）。
- 必须使用 `initMap`，不要先建空白地图再手工拼瓦片 —— `initMap` 会自动处理坐标系、范围和底图样式。
- 默认加载栅格瓦片；需要服务端矢量瓦片样式时传 `type: 'vector-tile'`（见 [vector-tile.md](../mapping/vector-tile.md)）。

## 模板

```javascript
initMap('https://iserver.supermap.io/iserver/services/map-world/rest/maps/World', {
    mapOptions: {
      container: 'map',
      center: [116.39, 39.9],
      zoom: 3
    }
  })
  .then(function (result) {
    var map = result.map;
    map.addControl(new maplibregl.NavigationControl(), 'top-left');

    // initMap 返回时地图实例已创建，但样式不一定加载完成：
    // 添加数据源/图层必须等 load。
    map.once('load', function () {
      map.addSource('overlay', {
        /* 已核实的数据源配置 */
      });
      map.addLayer({
        /* 已核实的图层配置 */
      });
    });
  })
  .catch(function (error) {
    console.error('地图初始化失败：', error);
    showStatus('地图初始化失败：' + error.message);
  });
```

## 参数

- `url`：iServer REST Map 服务地址，形如 `.../rest/maps/{mapName}`。
- `options.type`：`'raster'`（默认）或 `'vector-tile'`。
- `options.mapOptions`：传给 `new maplibregl.Map` 的选项（`container`、`center`、`zoom`、`bearing`、`pitch`、`maxZoom`、`minZoom` 等）。
- 返回 `Promise<{ map }>`；成功时自动配置坐标系、范围和底图样式。
- **禁止在 `mapOptions` 中传 `style`**，会覆盖 `initMap` 生成的样式。

## 关键要点

- `initMap` 解析代表地图实例已创建，**不代表样式已加载**；叠加任何数据源或图层都要先 `map.once('load', ...)` 或检查 `map.isStyleLoaded()`。
- 平面投影会直接 reject（`maplibre-gl cannot support plane coordinate system.`），不要试图绕过。
- enhance 按需加载（三分法，详见 [coordinate-system.md](../../rules/coordinate-system.md)）：3857 不需要；4326 服务接受动态投影到 3857 出图时不需要（要求服务开启动态投影）；**原生 4326 显示或 3857/4326 之外的自定义投影**需要 maplibre-gl-enhance 的 `maplibregl.CRS`。v5 用 enhance 5.9.0-2 普通脚本；**v6 默认仍生成 v6**：import map 把裸名 `maplibre-gl` 映到 enhance 6.14.0 mjs（核心超集 fork），写法见 coordinate-system.md，不退回 v5。
- initMap 的精确拦截条件是 `epsgCode !== 3857 && 服务未开启动态投影(dynamicProjection:false) && 无 maplibregl.CRS`。公共示例 map-world/World 是 4326 且关闭了动态投影的特例，无 enhance 时会 reject；要按 3857 动态投影显示可换开启动态投影的服务（如 map-china400/China），要原生 4326 则需 enhance（参考 `01_tiledMapLayer_4326.html`）。
- 面向用户的页面除 `console.error` 外，还必须在页面上显示错误信息。

## 叠加其他服务

在 `initMap` 返回的地图上叠加 WMTS / WMS / GeoJSON / MVT：

```javascript
initMap('https://iserver.supermap.io/iserver/services/map-world/rest/maps/World', {
    mapOptions: { container: 'map' }
  })
  .then(function (result) {
    var map = result.map;
    map.once('load', function () {
      map.addSource('overlay-wmts', {
        type: 'raster',
        tileSize: 256,
        tiles: ['https://iserver.supermap.io/iserver/services/map-world/wmts100?...&tilematrix={z}&tilerow={y}&tilecol={x}']
      });
      map.addLayer({ id: 'overlay-wmts', type: 'raster', source: 'overlay-wmts' });
    });
  });
```

## 坐标系说明

投影与叠加要求见 [coordinate-system.md](../../rules/coordinate-system.md)。
