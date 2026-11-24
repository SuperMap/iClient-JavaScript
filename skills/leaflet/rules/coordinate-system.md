# 坐标系叠加规则（Leaflet）

## 坐标系要求

Leaflet 的坐标系由 `L.CRS` 家族决定，并通过 `L.map(container, { crs })` 在创建地图时一次性绑定，**创建后不可更改**。

| 图层类型 | 坐标系要求 |
|----------|------------|
| 底图（`initMap`） | 由 iServer 地图服务自动推导（`L.supermap.crsFromMapJSON`） |
| 底图（手动 `L.map`） | 必须显式传 `crs`，默认 `L.CRS.EPSG3857` |
| GeoJSON | 只能是 WGS84（EPSG:4326） |
| 栅格瓦片叠加（`TiledMapLayer` / `WMTSLayer` / `L.TileLayer.WMS`） | 必须与底图投影一致 |
| 矢量瓦片叠加（`TiledVectorLayer`） | 必须与底图投影一致 |

## 默认坐标系

- **Leaflet 内置默认**：`L.CRS.EPSG3857`（Web 墨卡托）
- **地理坐标默认**：`L.CRS.EPSG4326`（WGS84）
- **GeoJSON**：必须是 WGS84（EPSG:4326）

## CRS 构造方式（Leaflet 特有）

```javascript
// 1. 用 EPSG 编号 + origin/resolutions 构造完整 CRS
var crs = new L.supermap.Proj.CRS('EPSG:3857', {
    origin: [-20037508.3427892, 20037508.3427892],
    resolutions: [156543.03392804097, 78271.51696402048, 39135.75848201024],
    bounds: L.bounds([-20037508.3427892, -20037508.3427892], [20037508.3427892, 20037508.3427892])
});

// 2. 非地球坐标系（CAD、室内、平面图等无地理意义的坐标）
var nonEarth = new L.supermap.CRS.NonEarthCRS({
    bounds: L.bounds([-1000, -1000], [1000, 1000]),
    origin: [-1000, 1000]
});

// 3. 内置地方坐标系
L.supermap.CRS.BaiduCRS              // 百度
L.supermap.CRS.TianDiTu_WGS84CRS      // 天地图（经纬度）
L.supermap.CRS.TianDiTu_MercatorCRS   // 天地图（墨卡托）

// 4. 从 iServer 地图服务信息自动推导（推荐）
L.supermap.crsFromMapJSON(mapJSON, { maxZoom: 22 });
```

## 叠加规则

1. 其他叠加的**栅格瓦片**、**矢量瓦片**只能和底图投影一致，否则无法正确叠加。
2. **GeoJSON** 必须是 WGS84 坐标系；Leaflet 会通过 `map.options.crs` 自动把经纬度投影到当前地图 CRS，因此不要手工转换 GeoJSON 的坐标。
3. `L.supermap.Proj.CRS` 的 `resolutions` 必须与瓦片服务的 `resolutions`（或 `visibleScales` 换算结果）**数量与顺序完全一致**，否则会出现瓦片错位。

## 非标准坐标系处理

- 使用 `initMap` 时无需手工传 `crs`，内部已调用 `L.supermap.crsFromMapJSON` 并合并 `mapOptions`。
- 手动 `new L.map(...)` 时必须显式传 `crs`，否则默认使用 `L.CRS.EPSG3857`，与地方坐标系底图不匹配。
- **禁止** 使用 MapboxGL 的 `mapboxgl.CRS(name, wkt, extent)` 写法，Leaflet 侧不存在该 API。

## 与 MapboxGL 的差异

| 项 | MapboxGL | Leaflet |
|----|----------|---------|
| CRS 类 | `mapboxgl.CRS(name, wkt, extent)` | `L.supermap.Proj.CRS(code, options)` |
| 绑定时机 | 可在 `map.setCRS` / 构造时 | 仅构造 `L.map` 时 |
| 单位 | 由 CRS 决定，需 `&scale={scale}` 参数 | 由 `L.supermap.Proj.CRS` 的 `resolutions` 决定 |
