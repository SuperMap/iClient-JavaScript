# 用户请求

生成一个将指定 WMS 图层添加到 MapLibreGL 地图的完整 HTML 页面。

# 期望回答

基于 `templates/index.html` 保留可运行的地图初始化和错误处理。参考 `modules/mapping/WMS.md`，在页面中加入 `modules/utils/ogc-capabilities.md` 声明的 `fast-xml-parser` 依赖及工具函数，并在地图加载后显式调用 `getWMSCapabilities()`。从 Capabilities 中读取版本、图层、样式、图像格式及 CRS，使用用户指定的图层并通过 MapLibre `raster` source/layer 加载。仅在图层支持 EPSG:3857 时使用 `{bbox-epsg-3857}`；不能静默选择多图层服务的第一层，也不要在 skill 加载或 URL 识别时自动请求服务。
