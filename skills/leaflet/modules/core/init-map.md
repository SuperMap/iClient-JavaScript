---
name: 'initMap'
description: '使用 L.supermap.initMap 根据 iServer 地图服务初始化地图与底图，适用于 /rest/maps/ 服务'
---

# initMap - 地图服务初始化地图

## 使用场景

- URL 包含 `/rest/maps/`
- 优先使用 `initMap`，不要手动创建空地图再拼装瓦片 —— `initMap` 会自动推导 CRS、中心点、缩放级别、瓦片格式与范围
- 默认创建栅格底图 `L.supermap.TiledMapLayer`

## 模板

```html
<div id="map" style="position:absolute;top:0;left:0;width:100%;height:100%"></div>
<script>
  L.supermap.initMap(
    'https://iserver.supermap.io/iserver/services/map-world/rest/maps/World',
    {
      mapOptions: { center: [40, 118], zoom: 7 },
      layerOptions: {}
    }
  ).then(function (result) {
    var map = result.map;
    var baseLayer = result.layer;
    // 地图已创建完成，直接添加图层
    new L.supermap.TiledMapLayer(overlayUrl, { transparent: true, opacity: 0.6 }).addTo(map);
  });
</script>
```

## 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `url` | string | iServer REST 地图服务地址，形如 `.../rest/maps/{mapName}` |
| `options.mapOptions` | Object | 传给 `L.map` 的选项（`center`、`zoom`、`maxZoom`、`minZoom`、`preferCanvas`、`crs`、`zoomControl` …）。未设置时使用服务参数 |
| `options.layerOptions` | Object | 传给 `L.supermap.TiledMapLayer` 的选项，详见 [TiledMapLayer 参数](#tiledmaplayer-图层参数) |
| `options.proxy` | string | 服务代理地址 |
| `options.withCredentials` | boolean | 请求是否携带凭据 |
| `options.crossOrigin` | boolean | 是否允许跨域请求 |
| `options.headers` | Object | 请求头 |

**返回值**：`Promise<{ map: L.Map, layer: L.supermap.TiledMapLayer }>`

## 关键要点

1. **容器 id 固定为 `'map'`**：`initMap` 内部写死 `L.map('map', ...)`，DOM 中必须存在 `<div id="map">`，**没有** `container` 参数。
2. **`initMap` 是 async 函数**：用 `.then(({ map, layer }) => ...)` 或 `await` 取结果。
3. **没有 `map.on('load')`**：Leaflet 图层用 `.addTo(map)` 同步挂载，`.then()` 里直接添加即可。
4. **不要传 `crs`**：`initMap` 已根据服务自动生成 CRS；只有在需要覆盖时才传。
5. **容器必须有实际尺寸**：否则地图空白且不报错。

## 叠加其他服务

```javascript
L.supermap.initMap(mapUrl, { mapOptions: { center: [39.89, 116.43], zoom: 5 } })
  .then(function ({ map, layer }) {
    // 栅格叠加
    var overlay = new L.supermap.TiledMapLayer(overlayMapUrl, {
      transparent: true,
      opacity: 0.6
    }).addTo(map);

    // 图层控制器
    L.control.layers({ '基础图层': layer }, { '叠加图层': overlay }).setPosition('topleft').addTo(map);

    // 矢量瓦片
    new L.supermap.TiledVectorLayer(mapUrl, {
      tileSize: 512,
      format: L.supermap.VectorTileFormat.MVT,
      cacheEnabled: true,
      returnAttributes: true
    }).addTo(map);

    // GeoJSON
    L.geoJSON(geojson).addTo(map);
  });
```

## TiledMapLayer 图层参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `noWrap` | boolean | `true` | 是否禁用 X 方向平铺 |
| `format` | string | 由服务推导 | 瓦片格式，如 `'png'`、`'webp'` |
| `transparent` | boolean | `true` | 瓦片是否透明 |
| `tileSize` | number | `256` | 瓦片大小 |
| `minZoom` / `maxZoom` | number | `0` / 由服务推导 | 缩放级别范围 |
| `bounds` | `L.LatLngBounds` | 由服务推导 | 图层范围 |
| `opacity` | number | `1` | 图层透明度 |
| `bufferTiles` | number | `0` | 视野外预加载的瓦片圈数 |
| `tileCache` | boolean | `false` | 是否启用客户端瓦片缓存 |
| `maxOverzooming` | number | — | 放大时保留父级瓦片的深度 |
| `maxUnderzooming` | number | — | 缩小时保留子级瓦片的深度 |
| `attribution` | string | iServer 版权 | 版权描述 |

## 替代方案：MapService + 手动 L.map

需要精细控制地图创建过程时使用：

```javascript
new L.supermap.MapService(mapUrl).getMapInfo().then(function (res) {
  var crs = L.supermap.crsFromMapJSON(res.result);   // 从地图信息推导 CRS
  var map = L.map('map', {
    crs: crs,
    center: [40, 118],
    maxZoom: 18,
    zoom: 7
  });
  new L.supermap.TiledMapLayer(mapUrl).addTo(map);
});
```

## 坐标系说明

> 详见：[coordinate-system.md](../../rules/coordinate-system.md)
