# 坐标系规则

* 根据服务元数据或对应的 MapLibreGL 示例，确认底图及每个叠加图层的投影。
* 除非通过已核实的流程转换数据，否则 GeoJSON 坐标应使用 WGS84 经纬度，并按 `[longitude, latitude]` 排列。
* 栅格和矢量瓦片叠加必须使用兼容的投影、瓦片方案和缩放级别约定。不要认为格式正确的瓦片 URL 就一定能与底图对齐。
* 对于非标准 CRS，应先按需检索 `metadata/maplibre-gl-enhance/index.d.ts` 中的相关类型或成员，并在需要样式定义时定向检索 `metadata/maplibre-gl-enhance/style-spec.json`；再从 `examples/maplibregl/` 中匹配的示例确认支持情况及所需资源。不要整份读取 metadata 文件，未经核实也不要复用 MapboxGL enhance 配置。
* 不得把投影坐标误标为经纬度；也不得在未知源 CRS 或目标 CRS 时静默转换数据。
