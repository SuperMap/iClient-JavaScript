# 需求澄清问题

只有缺少信息会改变 API 或导致示例不可运行时才提问；问题应简短，并优先一次收集必要信息。

## 加载底图

- 请提供 iServer REST 地图服务完整地址（`.../rest/maps/{mapName}`）。
- 页面中是否已经有 `<div id="map">`？`L.supermap.initMap` 固定使用此容器 id。
- 是否需要覆盖初始中心点、缩放级别或地图图层参数？

## 创建空白地图

- 地图要使用哪个 CRS（默认 EPSG:3857，还是 EPSG:4326/地方坐标系）？
- 初始中心与缩放级别是什么？注意 Leaflet 坐标顺序为 `[lat, lng]`。
- 地图上需要叠加什么图层（GeoJSON、WMS、WMTS、REST 瓦片）？

## 添加 GeoJSON

- GeoJSON 是内联数据、文件上传，还是服务查询结果？
- 是否需要设置点/线/面样式、弹窗或缩放到数据范围？
- 数据是否为 WGS84 GeoJSON 坐标（`[lng, lat]`）？

## WMS / WMTS

- 请提供完整服务地址和 `GetCapabilities`（若可访问）。
- WMS：目标 `layers` 名称是什么？是否要透明叠加？
- WMTS：`layer`、`style`、`tilematrixSet` 是什么？使用 KVP 还是 REST？矩阵标识是否需要 `matrixIds`？
- 底图 CRS / 瓦片分辨率是否已知？叠加图层必须匹配地图 CRS。

## 查询与分析

- 使用 REST Map `/rest/maps/{mapName}` 的 `QueryService`，还是 REST Data `/rest/data` 的 `FeatureService`？
- 地图图层名或数据集名是什么？请提供 SQL 条件、范围、距离或几何对象。
- 缓冲分析请提供 `/restjsr/spatialanalyst` 地址、源几何和距离/单位。
- 几何坐标的 CRS 与单位是什么？Leaflet 图层对象可以直接作为部分查询/分析参数。

## 服务地址不完整

- 这是地图服务、数据服务、空间分析服务、WMS 还是 WMTS？
- 若是 REST Map，请补充地图名；若是 WMTS，请提供版本、矩阵集和图层名。
