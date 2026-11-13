# 用户请求

生成一个将指定 WMTS 图层添加到 MapLibreGL 地图的完整 HTML 页面。

# 期望回答

基于 `templates/index.html` 保留可运行的地图初始化和错误处理。参考 `modules/mapping/WMTS.md`，在页面中加入 `modules/utils/ogc-capabilities.md` 声明的 `fast-xml-parser` 依赖及工具函数，并在地图加载后显式调用 `getWMTSCapabilities()`。从 Capabilities 中选择用户指定的图层和可映射的 `TileMatrixSet`，使用 `type: 'raster'` 的 source 和 layer；不猜测矩阵到 `{z}` 的映射。服务含多个图层但用户没有指定时，先询问图层标识。不要在 skill 加载或 URL 识别时自动请求服务。
