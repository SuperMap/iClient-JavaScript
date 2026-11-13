# 用户请求

生成一个能直接运行并方便继续开发的 SuperMap MapLibreGL 地图 HTML。

# 期望的回答

基于 `templates/index.html` 提供完整 HTML 文档。保留已发布的 `include-maplibregl.js` 依赖加载器，使用公开 World REST Map URL 初始化地图，设置合理的中心点和缩放级别，添加导航控件，并在页面上显示初始化失败和地图错误。包含可编辑的 GeoJSON 叠加示例，并且仅在地图触发 `load` 事件后添加数据源和图层。告诉用户可以将 `mapUrl`、`center`、`zoom` 和示例数据替换为自己的内容。不要使用 MapboxGL 命名空间或 CDN。
