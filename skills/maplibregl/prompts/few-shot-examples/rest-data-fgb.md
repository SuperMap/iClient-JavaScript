# 用户请求

生成一个查询 iServer REST Data 并用 FGB 图层展示结果的 MapLibreGL 示例。

# 期望回答

提供完整 HTML 或用户指定的代码片段。按 `examples/maplibregl/02_getFeatureBySQL_FGB.html` 核实 `GetFeaturesBySQLParameters`、`FeatureService.getFeaturesBySQL(..., 'FGB')`、`result.newResourceLocation` 和 `FGBLayer` 的调用方式。使用真实的数据服务、数据集和过滤条件；若用户未提供，可使用该示例的公开 World 数据参数，并明确告知替换位置。处理 Promise 错误，不要臆造 REST Data 与 REST Map 的结果结构。
