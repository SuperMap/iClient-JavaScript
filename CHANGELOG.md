# *Next release*

## API changes

### for Leaflet

- `L.supermap.webmap` 新增支持加载 "MapEditor" , "DataInsights" , "ISERVER" 格式 json 数据

- 客户端专题图新增支持 `L.CircleMarker` `L.Circle`

- 客户端专题图 `addFeatures` 方法默认只支持添加经纬度坐标要素，新增 `options.alwaysMapCRS` 参数，设置改参数为true , `addFeatures` 方法可添加底图坐标要素

- `L.supermap.wmtsLayer` , `L.supermap.tiandituTileLayer` , `L.supermap.baiduTileLayer` , `L.supermap.cloudTileLayer` , `L.supermap.imageMapLayer` , `L.supermap.tiledMapLayer` 新增 `options.tileProxy` 参数，支持获取代理服务下相关底图数据

- 废弃 `SuperMap.ElasticSearch` 的 `options.change` 参数,直接使用 `SuperMap.ElasticSearch.msearch` `SuperMap.ElasticSearch.msearch` 的 `callback` 参数

- `SuperMap.ElasticSearch.update` 方法新增 `callback` 参数

- `L.supermap.ServiceBase` 及其子类新增 `options.proxy`参数

- `L.supermap.spatialAnalystService` 新增 `geometrybatchAnalysis` 接口，支持几何要素批量空间分析

- 几何要素叠加分析新增支持多个要素进行分析

    - `SuperMap.SpatialAnalystBase` 类 `serviceProcessCompleted` 接口支持处理批量返回结果

    - `GeometryOverlayAnalystParameters` 新增 `operateGeometries` 和 `sourceGeometries` 参数

- `L.supermap.ThemeLayer` 及其子类新增 `options.id`参数

- 废弃 `L.supermap.graphic` 类的 `setCanvas` 和 `getCanvas` 接口，改用 `setStyle` 和 `getStyle` 接口

- 废弃 `L.supermap.circleStyle` 类的 `getCanvas` 接口，改用 `getStyle` 接口

- 增加 `L.supermap.cloverStyle`  `L.supermap.imageStyle` 类，`L.supermap.graphic` 支持三叶草要素风格、自定义图形要素风格

- 新增热力图层：

    - `L.supermap.heatMapLayer`

- `L.supermap.ThemeLayer` 及其子类支持传入 GeoJOSN 规范数据类型

- 废弃 `L.supermap.graphThemeLaye` 类的 `_createFeature` 接口

- 废弃 `L.supermap.GeoFeatureThemeLayer` 类的 `_createFeature` 接口

- `L.supermap.ThemeLayer` 类新增 `toFeature` 接口

### for OpenLayers

- `ol.supermap.WebMap` 新增支持加载 "MapEditor" , "DataInsights" , "ISERVER" 格式 json 数据

- 废弃 `SuperMap.ElasticSearch` 的 `options.change` 参数,直接使用 `SuperMap.ElasticSearch.msearch` `SuperMap.ElasticSearch.msearch` 的 `callback` 参数

- `SuperMap.ElasticSearch.update` 方法新增 `callback` 参数

- `ol.source.Tianditu` , `ol.source.BaiduMap` , `ol.source.SuperMapCloud` , `ol.source.ImageSuperMapRest` , `ol.source.TileSuperMapRest` 新增 `options.tileProxy` 参数，支持获取代理服务下相关底图数据

- `ol.supermap.ServiceBase` 及其子类新增 `options.proxy`参数

- `ol.supermap.SpatialAnalystService` 新增 `geometrybatchAnalysis` 接口，支持几何要素批量空间分析

- 几何要素叠加分析新增支持多个要素进行分析

    - `SuperMap.SpatialAnalystBase` 类 `serviceProcessCompleted` 接口支持处理批量返回结果

    - `GeometryOverlayAnalystParameters` 新增 `operateGeometries` 和 `sourceGeometries` 参数

- `ol.source.Theme` 及其子类新增 `options.id`参数

- 新增热力图资源：

    - `ol.supermap.HeatMapSource`
    
- 废弃 `ol.source.Theme` 类的 `toiClientFeature` 接口，改用 `toFeature`接口

- 增加 `ol.style.CloverShape` `ol.style.HitCloverShape` 类，`ol.source.Graphic` 支持三叶草要素风格

- 废弃 `ol.source.TileSuperMapRest` `ol.source.ImageSuperMapRest` 类的 `options._cache` 参数，由 `options.cacheEnabled` 代替
### for MapboxGL

- 废弃 `SuperMap.ElasticSearch` 的 `options.change` 参数,直接使用 `SuperMap.ElasticSearch.msearch` `SuperMap.ElasticSearch.msearch` 的 `callback` 参数

- `SuperMap.ElasticSearch.update` 方法新增 `callback` 参数

- `mapboxgl.supermap.ServiceBase` 及其子类新增 `options.proxy`参数

- `mapboxgl.supermap.SpatialAnalystService` 新增 `geometrybatchAnalysis` 接口，支持几何要素批量空间分析

- 几何要素叠加分析新增支持多个要素进行分析

    - `SuperMap.SpatialAnalystBase` 类 `serviceProcessCompleted` 接口支持处理批量返回结果

    - `GeometryOverlayAnalystParameters` 新增 `operateGeometries` 和 `sourceGeometries` 参数

- `mapboxgl.supermap.ThemeLayer` 类新增 `options.id`参数

- `mapboxgl.supermap.ThemeLayer` 类新增 `moveTo`接口，支持调整专题图层显示顺序

- 新增three图层：

    - `mapboxgl.supermap.ThreeLayer`

- 新增热力图层：

    - `mapboxgl.supermap.HeatMapLayer`


- `mapboxgl.supermap.ThemeLayer` 类新增 `setVisibility`接口，支持设置图层的显示和隐藏

- 废弃 `mapboxgl.supermap.ThemeLayer` 类的 `toiClientFeature` 接口，改用 `toFeature`接口

### Classic

- 废弃 `SuperMap.ElasticSearch` 的 `options.change` 参数,直接使用 `SuperMap.ElasticSearch.msearch` `SuperMap.ElasticSearch.msearch` 的 `callback` 参数
- `SuperMap.ElasticSearch.update` 增加 `callback` 参数

## Fixed

### for Leaflet

- 修复客户端专题图无法加载 `L.Polygon` 的问题
- 修改 `L.supermap.imageMapLayer` 的出图方式为整张image出图
- 修改矢量瓦片字体默认粗体的问题
- 修改 `L.supermap.imageMapLayer` `L.supermap.tiledMapLayer` 通过 `key` `token` 授权失败的问题

### for OpenLayers

- 修复 `ol.source.DataFlow` 修改传入父类参数无效的问题
- 修复 `ol.source.DataFlow` 的 `dataUpdated` 事件返回参数为空的问题
- 修复 `ol.source.Graphic` 在高分辨率屏下显示错位的问题
- 修改 `ol.source.TileSuperMapRest` `ol.source.ImageSuperMapRest` 通过 `key` `token` 授权失败的问题
- 修复 `ol.source.TileSuperMapRest` 的 `redirect` 参数默认为 `false` 但运行为 `true` 的问题

### for MapboxGL

- 修复多个客户端专题图叠加偏移的问题
- 修复 `mapboxgl.supermap.MapvLayer` 的 `clearData` 失败的问题
- 修复客户端3D专题图高亮时底色穿透问题
- 修复移除客户端3D专题图图层报错问题

### Classic

## Examples

### for Leaflet

- 新增几何要素批量空间分析示例

- 新增批量几何要素叠加分析示例

- 新增可视化随机三叶草示例

- 新增可视化纽约出租车18万点图片示例

- 修复 `05_findPathService.html` 例子显示错误的问题 

### for OpenLayers

- 新增几何要素批量空间分析示例

- 新增批量几何要素叠加分析示例

- 新增可视化纽约出租车18万点图片示例

- 新增可视化随机三叶草示例

### for MapboxGL

- 新增几何要素批量空间分析示例

- 新增批量几何要素叠加分析示例

- 新增three图层示例

### Classic

## Web Site &amp;&amp; Docs

- API 侧边栏分类显示

### for Leaflet
- 修复`L.supermap.wmtsLayer` `L.supermap.cloudTileLayer` `L.supermap.tiledMapLayer` 的 `options.transparent` 为 `{boolean}`类型

### for OpenLayers

### for MapboxGL

- `ThemeLayer.removeFromMap` `ThemeLayer.toiClientFeature` `ThemeLayer.resizeEvent` 增加api docs

### Classic

## Code Quality

## Project
- 新增ISSUE模板

# 9.0.1 (2017-12-27) #

## API changes

### for Leaflet

- 分布式分析服务(ProcessingService)接口变更

  - 新增缓冲区分析服务相关接口, 新增的接口如下：
    - getBuffersJobs
    - getBuffersJob
    - addBuffersJob
    - getBuffersJobState

  - 新增缓冲区分析服务参数类：
    - BuffersAnalystJobsParameter

  - 新增拓扑检查分析服务相关接口, 新增的接口如下：
    - getTopologyValidatorJobs
    - getTopologyValidatorJob
    - addTopologyValidatorJob
    - getTopologyValidatorJobState

  - 新增拓扑检查分析服务参数类：
    - TopologyValidatorJobsParameter

  - 新增叠加分析服务相关接口, 新增的接口如下：
    - getOverlayGeoJobs
    - getOverlayGeoJob
    - addOverlayGeoJob
    - getOverlayGeoJobState

  - 新增叠加分析服务参数类：
    - OverlayGeoJobParameter

  - 新增属性汇总分析服务相关接口, 新增的接口如下：
    - getSummaryAttributesJob
    - getSummaryAttributesJobs
    - addSummaryAttributesJob
    - getSummaryAttributesJobState

  - 新增属性汇总分析服务参数类：
    - SummaryAttributesJobsParameter

  - CommontypesConversion新增toProcessingParam接口

  - 单对象查询分析新增支持自定义绘制范围进行分析
    - SingleObjectQueryJobsParameter新增geometryQuery参数

  - 矢量裁剪分析新增支持自定义绘制范围进行分析
    - VectorClipJobsParameter新增geometryClip参数

- 新增d3图层： [d3Layer](https://github.com/SuperMap/Leaflet.D3SvgOverlay)(不包含在最终包中，需额外引入)
- 新增客户端标签专题图图层：LabelThemeLayer
- 新增 SuperMap.CORS ,  SuperMap.RequestTimeout两个配置
- WebMap支持加载专题图层
- 天地图图层(TiandituTileLayer)options参数变更
- layer更名为layerType
- 新增url、isLabel配置
- 去掉tilematrixSet配置
- SetLayerInfoParameters 参数变更
- 去掉tempLayerID
- 新增resourceID
- layerName更名为tempLayersName

### for OpenLayers

- 分布式分析服务(ProcessingService)接口变更

  - 新增缓冲区分析服务相关接口, 新增的接口如下：
    - getBuffersJobs
    - getBuffersJob
    - addBuffersJob
    - getBuffersJobState

  - 新增缓冲区分析服务参数类：
    - BuffersAnalystJobsParameter

  - 新增拓扑检查分析服务相关接口, 新增的接口如下：
    - getTopologyValidatorJobs
    - getTopologyValidatorJob
    - addTopologyValidatorJob
    - getTopologyValidatorJobState

  - 新增拓扑检查分析服务参数类：
    - TopologyValidatorJobsParameter

  - 新增叠加分析服务相关接口, 新增的接口如下：
    - getOverlayGeoJobs
    - getOverlayGeoJob
    - addOverlayGeoJob
    - getOverlayGeoJobState

  - 新增叠加分析服务参数类：
    - OverlayGeoJobParameter

  - 新增属性汇总分析服务相关接口, 新增的接口如下：
    - getSummaryAttributesJob
    - getSummaryAttributesJobs
    - addSummaryAttributesJob
    - getSummaryAttributesJobState

  - 新增属性汇总分析服务参数类：
    - SummaryAttributesJobsParameter

  - CommontypesConversion新增toProcessingParam接口

  - 单对象查询分析新增支持自定义绘制范围进行分析
    - SingleObjectQueryJobsParameter新增geometryQuery参数

  - 矢量裁剪分析新增支持自定义绘制范围进行分析
    - VectorClipJobsParameter新增geometryClip参数

- 新增客户端标签专题图图层: Label
- 新增 SuperMap.CORS , SuperMap.RequestTimeout两个配置
- 新增ECharts可视化图层：EchartsLayer
- WebMap支持加载专题图层
- 天地图图层(Tianditu)options参数变更
- 新增layerType ，style ，format ，isLabel 配置
- SetLayerInfoParameters参数变更
- 去掉tempLayerID
- 新增resourceID
- layerName更名为tempLayersName

### for MapboxGL

- 分布式分析服务(ProcessingService)接口变更

  - 新增缓冲区分析服务相关接口, 新增的接口如下：
    - getBuffersJobs
    - getBuffersJob
    - addBuffersJob
    - getBuffersJobState

  - 新增缓冲区分析服务参数类：
    - BuffersAnalystJobsParameter

  - 新增拓扑检查分析服务相关接口, 新增的接口如下：
    - getTopologyValidatorJobs
    - getTopologyValidatorJob
    - addTopologyValidatorJob
    - getTopologyValidatorJobState

  - 新增拓扑检查分析服务参数类：
    - TopologyValidatorJobsParameter

  - 新增叠加分析服务相关接口, 新增的接口如下：
    - getOverlayGeoJobs
    - getOverlayGeoJob
    - addOverlayGeoJob
    - getOverlayGeoJobState

  - 新增叠加分析服务参数类：
    - OverlayGeoJobParameter

  - 新增属性汇总分析服务相关接口, 新增的接口如下：
    - getSummaryAttributesJob
    - getSummaryAttributesJobs
    - addSummaryAttributesJob
    - getSummaryAttributesJobState

  - 新增属性汇总分析服务参数类：
    - SummaryAttributesJobsParameter

  - CommontypesConversion新增toProcessingParam接口

  - 单对象查询分析新增支持自定义绘制范围进行分析
    - SingleObjectQueryJobsParameter新增geometryQuery参数

  - 矢量裁剪分析新增支持自定义绘制范围进行分析
    - VectorClipJobsParameter新增geometryClip参数

- 新增三维单值专题图图层: UniqueTheme3DLayer
- 新增三维分段专题图图层: RangeTheme3DLayer
- 新增客户端标签专题图图层: LabelThemeLayer
- 新增 SuperMap.CORS , SuperMap.RequestTimeout两个配置
- 新增iServer服务相关service

    - AddressMatchService
    - ChartService
    - DataFlowService
    - FeatureService
    - FieldService
    - GridCellInfosService
    - LayerInfoService
    - MapService
    - MeasureService
    - ThemeService
    - QueryService
    - ProcessingService
    - NetworkAnalystService
    - NetworkAnalyst3DService
    - SpatialAnalystService
    - TrafficTransferAnalystService

- RankTheme3DLayer更名为RangeTheme3DLayer
- GraphThemeLayer ， RangeThemeLayer ，RankSymbolThemeLayer， UniqueThemeLayer， GeoFeatureThemeLayer去掉destroy方法
- SetLayerInfoParameters参数变更
- 去掉tempLayerID
- 新增resourceID
- layerName更名为tempLayersName

### Classic

- 分布式分析服务(ProcessingService)接口变更

  - 新增缓冲区分析服务相关接口, 新增的接口如下：
    - getBuffersJobs
    - getBuffersJob
    - addBuffersJob
    - getBuffersJobState

  - 新增缓冲区分析服务参数类：
    - BuffersAnalystJobsParameter

  - 新增拓扑检查分析服务相关接口, 新增的接口如下：
    - getTopologyValidatorJobs
    - getTopologyValidatorJob
    - addTopologyValidatorJob
    - getTopologyValidatorJobState

  - 新增拓扑检查分析服务参数类：
    - TopologyValidatorJobsParameter

  - 新增叠加分析服务相关接口, 新增的接口如下：
    - getOverlayGeoJobs
    - getOverlayGeoJob
    - addOverlayGeoJob
    - getOverlayGeoJobState

  - 新增叠加分析服务参数类：
    - OverlayGeoJobParameter

  - 新增属性汇总分析服务相关接口, 新增的接口如下：
    - getSummaryAttributesJob
    - getSummaryAttributesJobs
    - addSummaryAttributesJob
    - getSummaryAttributesJobState

  - 新增属性汇总分析服务参数类：
    - SummaryAttributesJobsParameter

  - CommontypesConversion新增toProcessingParam接口

  - 单对象查询分析新增支持自定义绘制范围进行分析
    - SingleObjectQueryJobsParameter新增geometryQuery参数

  - 矢量裁剪分析新增支持自定义绘制范围进行分析
    - VectorClipJobsParameter新增geometryClip参数

## Fixed

### for Leaflet

- 修复非3857,4326投影下的TiledMapLayer偏移问题
- 修复EchartsLayer在浏览器窗口大小改变时显示错位问题
- 修复MapVLayer 无法选中要素的问题
- 修复图层信息设置服务(LayerInfoService)更新图层信息失败问题
- 修复客户端专题图缩放不同步问题
- 修复ImageMapLayer，TiledMapLayer支持L.point形式的tilesize
- 修复非4326投影下统计专题图不显示的问题
- 修复WKT格式转换错误问题
- 修复mapv图层(MapVLayer)和ECharts图层(EchartsLayer)移除事件

    thanks @[shanligang](https://github.com/shanligang)

    pullrequest： [https://github.com/SuperMap/iClient-JavaScript/pull/3](https://github.com/SuperMap/iClient-JavaScript/pull/3)

### for OpenLayers

- 修复TileSuperMapRest 显示iSevrer的UGCV5缓存瓦片乱序错误问题
- 修复图层信息设置服务(LayerInfoService)更新图层信息失败问题

- 修复mvt矢量瓦片示例不能选中的问题
- 修复MapV图层无法选中要素的问题
- 修复MapV图层动画有重影的问题
- 修复MapV图层更新要素失败的问题
- 修复WKT格式转换错误问题

### for MapboxGL

- 修复WKT格式转换错误问题

### Classic

- 修复大数据边线透明度为0无效问题
- 修复要素SQL查询maxFeatures参数无效问题
- 修复feature中geometry为空，客户端专题图添加feature报错问题
- 修复客户端分段专题图最后一个点不加0.1不显示样式的问题
- 修复mapViwer支持移动端的要素点击

## Examples

- 统一页面弹窗和等待加载样式以及引用方式
- 新增widget.js，封装了alert和loader
- include-web.js 中include选项新增widget参数

### for Leaflet

- 新增iServer安全认证范例
- 新增Leaflet对接D3.js的示例
- 新增turf示例
- 新增图表专题图示例
- 新增客户端标签专题图示例
- 修复实时数据服务示例效率
- 新增热力图示例

### for OpenLayers

- 新增iServer安全认证范例
- 新增Online和iPortal安全认证示例
- 新增turf示例
- 新增图表专题图示例
- 新增客户端标签专题图示例
- 新增热力图示例

### for MapboxGL

- 新增二维客户端专题图示例
- 新增iServer服务示例
- 新增ECharts GL示例
- 新增热力图示例

### Classic

- 迁移iClient classic(iClient 8C)示例

## Web Site &amp;&amp; Docs

- 站点优化(站点导航改版)
- 支持英文版
- 支持历史版本
- 修复在线编辑及范例页侧边栏不能滚动问题
- 新增英文版API
- 修复jsdocs 中接口名包含search的链接无法跳转的问题
- 修订部分注释

## Code Quality

- 新增代码质量检查工具ESLint
- 加入在线代码质量管理平台SonarCloud，链接： [https://sonarcloud.io/dashboard?id=com.supermap:iClient9](https://sonarcloud.io/dashboard?id=com.supermap:iClient9)

## Project

- 发布npm项目

  - iclient-common: [https://www.npmjs.com/package/@supermap/iclient-common](https://www.npmjs.com/package/@supermap/iclient-common)
  - iclient-leaflet: [https://www.npmjs.com/package/@supermap/iclient-leaflet](https://www.npmjs.com/package/@supermap/iclient-leaflet)
  - iclient-openlayers: [https://www.npmjs.com/package/@supermap/iclient-openlayers](https://www.npmjs.com/package/@supermap/iclient-openlayers)
  - iclient-mapboxgl: [https://www.npmjs.com/package/@supermap/iclient-mapboxgl](https://www.npmjs.com/package/@supermap/iclient-mapboxgl)
  - iclient-classic: [https://www.npmjs.com/package/@supermap/iclient-classic](https://www.npmjs.com/package/@supermap/iclient-classic)

# 9.0.0 (2017-09-13)

SuperMap iClient for JavaScript 9D 云GIS网络客户端开发平台
