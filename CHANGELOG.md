# 10.0.0 #

## Distribution package changes

### for Leaflet

- `iclient9-leaflet.js` 更名 `iclient-leaflet.js`
  
- `iclient9-leaflet.min.js` 更名 `iclient-leaflet.min.js`

- `iclient9-leaflet-es6.js` 更名 `iclient-leaflet-es6.js`

- `iclient9-leaflet-es6.min.js` 更名 `iclient-leaflet-es6.min.js`
  
- `iclient9-leaflet.css` 更名 `iclient-leaflet.css`

- `iclient9-leaflet.min.css` 更名 `iclient-leaflet.min.css`


### for OpenLayers

- `iclient9-openlayers.js` 更名 `iclient-openlayers.js`
  
- `iclient9-openlayers.min.js` 更名 `iclient-openlayers.min.js`

- `iclient9-openlayers-es6.js` 更名 `iclient-openlayers-es6.js`

- `iclient9-openlayers-es6.min.js` 更名 `iclient-openlayers-es6.min.js`
  
- `iclient9-openlayers.css` 更名 `iclient-openlayers.css`

- `iclient9-openlayers.min.css` 更名 `iclient-openlayers.min.css`

### for MapboxGL

- `iclient9-mapboxgl.js` 更名 `iclient-mapboxgl.js`
  
- `iclient9-mapboxgl.min.js` 更名 `iclient-mapboxgl.min.js`

- `iclient9-mapboxgl-es6.js` 更名 `iclient-mapboxgl-es6.js`

- `iclient9-mapboxgl-es6.min.js` 更名 `iclient-mapboxgl-es6.min.js`
  
- `iclient9-mapboxgl.css` 更名 `iclient-mapboxgl.css`

- `iclient9-mapboxgl.min.css` 更名 `iclient-mapboxgl.min.css`


## API changes

### for Leaflet

- `L.supermap.imageMapLayer` `L.supermap.tiledMapLayer` 新增 `options.rasterfunction` 参数，支持对接 SuperMap iServer 的栅格运算。

- `L.supermap.ServiceBase` 及其子类

  - 新增 `options.headers` 参数，支持设置请求头内容。

- 命名空间 `L.supermap.widgets` 更名为 `L.supermap.components`

- 命名空间 `SuperMap.Widgets` 更名为 `SuperMap.Components`

### for OpenLayers

- `ol.source.TileSuperMapRest` `ol.source.ImageSuperMapRest` 新增 `options.rasterfunction` 参数，支持对接 SuperMap iServer 的栅格运算。

- `ol.supermap.ServiceBase` 及其子类

  - 新增 `options. headers` 参数，支持设置请求头内容

- 命名空间 `SuperMap.Widgets` 更名为 `SuperMap.Components`


### for MapboxGL

- `mapboxgl.supermap.ServiceBase` 及其子类

  - 新增 `options. headers` 参数，支持设置请求头内容

- 命名空间 `SuperMap.Widgets` 更名为 `SuperMap.Components`

## Fixed

### for Leaflet

- 修复 SuperMap iServer 地图设置可见比例尺时，手机端用双指缩放时，超出最大最小级别时出错的问题

- 修复 `L.supermap.mapVLayer` 在 Internet Explorer 11/10 浏览器上可能不出图的问题
  
- 修复 `L.supermap.tiledVectorLayer` 使用自定义 `cartoCSS` 样式时配置 `pointurl` 不生效的问题 


### for OpenLayers

- 修复 `ol.source.Mapv` 在 Internet Explorer 11/10 浏览器上可能不出图的问题

### for MapboxGL

- 修复 `mapboxgl.supermap.MapvLayer` 在 Internet Explorer 11/10 浏览器上可能不出图的问题


## Examples

- 新增 Component 分类

  - 新增 “Vue - 地图” 分类及相关示例
  
  - 新增 “Vue - 地图子组件” 分类及相关示例

  - 新增 “Vue - 天地图子组件” 分类及相关示例
  
  - 新增 “Vue - 可视化” 分类及相关示例
  
  - 新增 “Vue - 图表” 分类及相关示例
  
  - 新增 “Vue – 基础” 分类及相关示例
  
  - 新增 “Vue - 其他” 分类及相关示例

### for Leaflet

- iServer – 地图
  
  - 增加 “地图-栅格分析” 例子

### for OpenLayers

- iServer – 地图
  
  - 增加 “地图-栅格分析” 例子

### for MapboxGL

- 可视化 - 矢量瓦片
  
  - 增加 “iServer数据服务矢量瓦片(2000万点)” 例子


# 10.0.0 beta #

## 新特性

### 积木式搭建应用：[SuperMap iClient Vue 组件库](https://github.com/SuperMap/vue-iclient)
 - SuperMap iClient Vue 组件库在架构设计上采用 MVVM 模式（Model-View-ViewModel）同时也能兼容其它框架，例如 React、Angular 以及原生 H5 开发。 使用 SuperMap iClient Vue 组件库，可像搭积木一样快速的创建自定义的 WebGIS 应用
![1000-2](https://github.com/SuperMap/iClient-JavaScript/blob/master/.github/1000-2.png)

### 开箱即用：丰富的组件选择
 - 组件库采用了开箱即用的方案，现阶段提供了二/三维地图组件，丰富的地理可视化组件，图表类组件和基础 GIS 组件等
![1000-3](https://github.com/SuperMap/iClient-JavaScript/blob/master/.github/1000-3.gif)

### 一键主题切换
 - 在主题风格上，SuperMap iClient Vue 组件现阶段内置了多套主题，可一键切换所有组件的主题风格
![1000-1](https://github.com/SuperMap/iClient-JavaScript/blob/master/.github/1000-1.gif)


## API changes

### for MapboxGL

- `SuperMap.GetFeaturesByGeometryParameters` 的 `geometry` 参数支持传入 `mapboxgl.LngLatBounds` 

- `SuperMap.QueryByGeometryParameters` 的 `geometry` 参数支持传入 `mapboxgl.LngLatBounds` 

## Fixed

### for Leaflet

- 修复客户端专题图鼠标滑过要素时可能出现的闪动问题

- 修复 `L.supermap.echartsLayer` 的 `options` 传入 `pane` 参数无效的问题

### for OpenLayers

- `ol.supermap.WebMap`

  - 修复在跨域情况下访问地图失败的问题

  - 修正内置的互联网底图最大缩放级别

  - 修复访问坐标系为 epsg:0/epsg:-1000/epsg:-1 地图失败的问题


# 10.0.0 alpha #

## 新特性

- iClient for MapboxGL（for vue）组件库新增示例，新增房产项目可视化监控平台示例，使用 iClient Vue 组件快速搭建行业大屏应用

![whatsNewComponents](https://github.com/SuperMap/iClient-JavaScript/blob/master/.github/1000-1.gif)

## API changes

### for Leaflet
- `L.supermap.ServiceBase` 及其子类

  - 新增 `options.crossOrigin` 参数，支持设置是否允许跨域请求。

### for OpenLayers


- `ol.supermap.WebMap` 新增支持迁徙图、MVT矢量瓦片图层。

- `ol.supermap.MapboxStyles` 新增 `setSelectedObjects` `addSelectedObjects` `removeSelectedObjects` `clearSelectedObjects` 接口，支持设置、增加、移除、清除多个高亮要素。

- `ol.supermap.ServiceBase` 及其子类

  - 新增 `options.crossOrigin` 参数，支持设置是否允许跨域请求。


### for MapboxGL

- `mapboxgl.supermap.ServiceBase` 及其子类

  - 新增 `options.crossOrigin` 参数，支持设置是否允许跨域请求。

## Fixed

### for Leaflet

- 修复从 SuperMap iServer 获取要素可能多`stringID`和`ID`属性字段的问题,请使用`feature.id`获取要素id

### for OpenLayers

- 修复从 SuperMap iServer 获取要素可能多`stringID`和`ID`属性字段的问题,请使用`feature.getId()`获取要素id

### for MapboxGL

- 修复从 SuperMap iServer 获取要素可能多`stringID`和`ID`属性字段的问题,请使用`feature.id`获取要素id


## Examples

### for OpenLayers

- 修复平面无投影地图相关示例访问失败的问题。

### for MapboxGL

- 新增 `Vue 组件` 分类及相关示例。



# 9.1.2 (2019-04-26) #

## 新特性

### iClient for MapboxGL 新增组件（for vue）

- iClient for MapboxGL 新增 WebMap 地图组件，图表组件，图例组件，图层列表组件，量算组件，查询/搜索组件，进度条等基础组件，支持多种主题（可一键切换风格）

![whatsNewMapboxGlComponents](https://github.com/SuperMap/iClient-JavaScript/blob/master/.github/912-1.png)
 
## API changes

### for Leaflet

- 互联网地图 - 天地图
  - `L.supermap.tiandituTileLayer` 新增 `options.key` 参数，支持传入天地图服务密钥。

### for OpenLayers

- 互联网地图 - 天地图
  - `ol.source.Tianditu` 新增 `options.key` 参数，支持传入天地图服务密钥。
- 控件 - 基础控件 - 比例尺控件
  - 新增 `ol.supermap.control.ScaleLine` 类，修复了 OpenLayers V4.6.5 版本 WGS84 坐标系 数值错误问题。
- iPortal  
  - `ol.supermap.WebMap` 新增支持数据流图层，等级符号专题图图层。
  - `ol.supermap.MapboxStyles` 的 `options.source` 参数为可选参数，不传时为 `style` 中的第一个 `source`。
  - `ol.source.VectorTileSuperMapRest` 的 `options.source` 参数为可选参数，不传时为 `style` 中的第一个 `source`。

### for MapboxGL

- iPortal - 地图
  - 新增 `mapboxgl.supermap.WebMap` 类，支持加载 iPortal WebMap 图层。 

## Fixed

### for Leaflet
- 修复 `SuperMap.Widgets.Chart` 的 `type` 参数解析错误的问题
- 修复 `L.supermap.mapVLayer` 动态图层移除后可能出现的空值问题
- 修复 `L.supermap.mapVLayer` 地图缩放，图层位置偏差问题
- 修复 `L.supermap.echartsLayer` 同时加载两个 EchartsLayer 图层时，图层互相影响问题 
- 修复 `SuperMap.REST.ClipParameter` 的 `clipRegion` 参数解析错误的问题


### for OpenLayers

- 修复 `SuperMap.Widgets.Chart` 的 `type` 参数解析错误的问题
- 修复 `ol.supermap.WebMap` 专题图字段过滤错误问题
- 修复 `ol.supermap.WebMap` 加载小范围底图时，内存耗尽问题
- 修复 `ol.source.Mapv`  webgl 绘制模式时，在浏览器缩放比例非100%时，要素偏移的问题
- 修复 `SuperMap.REST.ClipParameter` 的 `clipRegion` 参数解析错误的问题


### for MapboxGL

- 修复 `SuperMap.Widgets.Chart` 的 `type` 参数解析错误的问题
- 修复 `SuperMap.REST.ClipParameter` 的 `clipRegion` 参数解析错误的问题


### Classic

- 修复 `SuperMap.Geometry.GeoText` 不能拖动问题
- 修复 `SuperMap.REST.ClipParameter` 的 `clipRegion` 参数解析错误的问题
- 修复 `SuperMap.Layer.TiledDynamicRESTLayer` 的 `origin` 在 IE 浏览器出图错误问题
- 修复加载谷歌地图失败问题
- 修复加载天地图失败问题

## Examples

### for Leaflet

  - 新增 “组件 - 基础 - 图表_iServer” 示例
  - 新增 “组件 - 基础 - 图表_iPortal” 示例

### for MapboxGL

  - 新增 “iPortal - 地图” 分类及相关示例
  - 新增 “组件 - for Vue” 分类及相关示例
  - 新增 “可视化 - 矢量瓦片 - 矢量瓦片叠加” 示例


# 9.1.1 (2018-12-27) #

## 新特性

### iClient for MapboxGL多坐标系支持

- iClient for MapboxGL新增支持WGS84、China2000、Xian80、Beijing54等标准地理坐标系，覆盖MVT矢量瓦片、栅格瓦片、可视化图层、标绘等功能

- 需单独引用iClient对Mapbox GL JS的增强库（基于2018年10月版本v0.51.0）
 https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/mapbox-gl-enhance.js

![whatsNewMultiCoordinate](https://github.com/SuperMap/iClient-JavaScript/blob/master/.github/911-1.png)
 
### 新增多款功能组件

-	iClient for Leaflet新增：文件打开组件、数据流组件、地址匹配与图层查询组件、客户端计算组件、分布式分析组件、数据服务查询组件

![whatsNewClientComputaion](https://github.com/SuperMap/iClient-JavaScript/blob/master/.github/911-2.png)
 
## API changes

### for Leaflet

- 组件
  - 新增打开文件组件 `L.supermap.widgets.openFile` 及功能类 `L.supermap.widgets.openFileViewModel`
  - 新增数据流组件 `L.supermap.widgets.dataFlow` 及功能类 `L.supermap.widgets.dataFlowViewModel`
  - 新增图层查询组件 `L.supermap.widgets.search` 及功能类 `L.supermap.widgets.searchViewModel`
  - 新增客户端计算组件 `L.supermap.widgets.clientComputation` 及功能类 `L.supermap.widgets.clientComputationViewModel`
  - 新增分布式分析组件 `L.supermap.widgets.distributedAnalysis` 及功能类 `L.supermap.widgets.distributedAnalysisViewModel`
  - 新增数据服务查询组件`L.supermap.widgets.dataServiceQuery` 及功能类 `L.supermap.widgets.dataServiceQueryViewModel`

### for OpenLayers

- 可视化 - 矢量瓦片

  - `ol.supermap.MapboxStyles` 样式类新增 `setStyle` 接口，支持整体更新样式
  - `ol.supermap.MapboxStyles` 样式类 `options.style` 支持传入获取 Mapbox Style JSON 对象的 URL 
  - `ol.source.VectorTileSuperMapRest` 新增 `options.style`  `options.source` 参数，支持传入 Mapbox Style JSON 对象或 URL

- 可视化 - 高效率点图层 

  - 支持通过 `ol.Map` 的 `forEachFeatureAtPixel` `getFeaturesAtPixel` 方法获取要素

### for MapboxGL

- 支持WGS84、China2000、Xian80、Beijing54等标准地理坐标系，需单独引用iClient对MapboxGL的增强库：
 https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/mapbox-gl-enhance.js

## Fixed

### for Leaflet

- 修复 `L.supermap.mapVLayer` 动态图层移除后可能出现的空值问题
- 修复 `SuperMap.KernelDensityJobParameter`的 `query` 参数解析错误的问题
- 修复无法解析 iServer 中数据类型为 `LINEEPS` `REGIONEPS` 的要素的问题
- 修复地图是平面无投影时，在手机上访问双指放大缩小可能的错乱问题

### for OpenLayers

- 修复 `ol.source.Graphic` 无法点击的问题
- 修复 `SuperMap.KernelDensityJobParameter`的 `query` 参数解析错误的问题
- 修复无法解析 iServer 中数据类型为 `LINEEPS` `REGIONEPS` 的要素的问题
- 修复对 `ol.layer.Group` 处理不当的问题([#26](https://github.com/SuperMap/iClient-JavaScript/issues/26))

### for MapboxGL

- 修复 `SuperMap.KernelDensityJobParameter`的 `query` 参数解析错误的问题
- 修复无法解析 iServer 中数据类型为 `LINEEPS` `REGIONEPS` 的要素的问题

### Classic

- 修复 `SuperMap.KernelDensityJobParameter`的 `query` 参数解析错误的问题
- 修复无法解析 iServer 中数据类型为 `LINEEPS` `REGIONEPS` 的要素的问题

## Examples

### for Leaflet

  - 新增 “组件” 分类及相关示例

### for OpenLayers

  - 新增 “可视化 - 矢量瓦片 - iServer 矢量瓦片服务” 示例

### for MapboxGL

  - 新增 “多坐标系” 分类及相关示例

  - 新增 “可视化 - 聚合” 示例



# 9.1.0 (2018-9-28) #

## API changes

### for Leaflet

- 可视化 - 矢量瓦片
  - `L.supermap.tiledVectorLayer` 新增 `options.processCharacters` 参数,支持本地设置服务端的CartoCSS样式时替换特殊字符
 
- `SuperMap.QueryParameters` 及其子类新增 `options.returnFeatureWithFieldCaption` 参数,支持指定返回的查询结果要素字段标识为字段别名

- 可视化 - 高效率点图层
  - `L.supermap.graphic` 
    - 新增 `options.id` 参数，以及 `getId` 和 `setId` 接口，支持设置与修改 `graphic` 要素`id`
 
  - `L.supermap.graphicLayer` 
    - 新增 `getGraphicBy` 接口支持通过要素属性值获取指定要素
    - 新增 `getGraphicById` 接口支持通过要素 `id` 获取指定要素
    - 新增 `getGraphicsByAttribute` 接口支持通过要素 `attribute`属性对象值获取指定要素数组
    - `removeGraphics` 接口新增删除单个或多个要素的功能
  - `L.supermap.ThemeLayer` 及其子类 
    - `addFeatures` 方法默认只支持添加经纬度坐标要素，新增 `options.alwaysMapCRS` 参数，设置该参数为true , `addFeatures` 方法可添加底图坐标要素

### for OpenLayers

- `SuperMap.QueryParameters` 及其子类新增 `options.returnFeatureWithFieldCaption` 参数,支持指定返回的查询结果要素字段标识为字段别名

- 可视化 - 高效率点图层
  - `ol.Graphic`
    - 新增 `options.id` 参数，以及 `getId` 和 `setId` 接口，支持设置与修改 `graphic` 要素`id`
  
  - `ol.source.Graphic`
    - 新增 `getGraphicBy` 接口支持通过要素属性值获取指定要素
    - 新增 `getGraphicById` 接口支持通过要素 `id` 获取指定要素
    - 新增 `getGraphicsByAttribute` 接口支持通过要素 `attribute`属性对象值获取指定要素数组
    - `removeGraphics` 接口新增删除单个或多个要素的功能
    
### for MapboxGL

- `SuperMap.QueryParameters` 及其子类新增 `options.returnFeatureWithFieldCaption` 参数,支持指定返回的查询结果要素字段标识为字段别名

- 可视化 - 高效率点图层
  - `mapboxgl.supermap.Graphic` 
    - 新增 `options.id` 参数，以及 `getId` 和 `setId` 接口，支持设置与修改 `graphic` 要素`id`
  
  - `mapboxgl.supermap.GraphThemeLayer` 
    - 新增 `getGraphicBy` 接口支持通过要素属性值获取指定要素
    - 新增 `getGraphicById` 接口支持通过要素 `id` 获取指定要素
    - 新增 `getGraphicsByAttribute` 接口支持通过要素 `attribute`属性对象值获取指定要素数组
    - `removeGraphics` 接口新增删除单个或多个要素的功能

### Classic
- `SuperMap.Layer.MapVLayer` 支持北京54 等其他坐标系（注：数据坐标系要求与地图保持一致）

## Fixed

### for Leaflet

- 修复 `L.supermap.featureService` 更新要素时没有携带凭据的问题
- 优化 `L.supermap.echartsLayer` 内存占用问题
- 修复 `L.supermap.labelThemeLayer` 移除所有要素后，放大缩小还是会显示要素的问题
- 修复 `L.supermap.graphicLayer` 从地图移除后再添加后，移动时要素偏移的问题，优化绘制性能
- 修复 `L.supermap.webmap` 在地图没有设置中心点的时候无法出图的问题
- 修复 Internet Explorer 11 浏览器上报错问题 


### for OpenLayers

- 修复 `ol.source.Graphic` 在浏览器窗口大小发生变化，要素偏移的问题
- 修复 `ol.source.DataFlow` 更新要素位置时可能出现的闪烁问题
- 修复 `ol.source.Label` 移除所有要素后，放大缩小还是会显示要素的问题
- 修复 `ol.supermap.WebMap` 在地图没有设置中心点的时候无法出图的问题
- 优化 `ol.source.Graphic` 三叶草样式仅有单个叶片时的选中逻辑
- 修复 Internet Explorer 11 浏览器上报错问题 

### for MapboxGL
- 修复 `mapboxgl.supermap.LabelThemeLayer` 移除所有要素后，放大缩小还是会显示要素的问题

## Examples

### for MapboxGL

- 可视化 - 矢量瓦片

  - 新增“土地利用”示例



# 9.1.0 beta (2018-8-2) #

## API changes

### for Leaflet

- 新增 `L.Util.transform` 方法，支持要素的投影转换

## Fixed

### for Leaflet

- 修复 `L.supermap.processingService` 获取任务信息时没有携带 token 的问题

- 修复 `L.supermap.themeFeature` 传入 `L.polyline`  `L.polygon` 失败的问题

### for OpenLayers

- 修复 `ol.supermap.ProcessingService` 获取任务信息时没有携带 token 的问题

- 修复 `ol.supermap.WebMap` 只会加载20个数据的问题

### for MapboxGL

- 修复 `mapboxgl.supermap.ProcessingService` 获取任务信息时没有携带 token 的问题

- 修复 `mapboxgl.supermap.DeckglLayer` 在浏览器缩放比例非100%时，要素偏移的问题

### Classic

- 修复 `SuperMap.REST.ProcessingService` 获取任务信息时没有携带 token 的问题

## Examples

### for Leaflet

- 新增“动态标绘“分类及示例

- 将“标绘 - 点线面绘制“示例移动至“控件 - 点线面绘制“

- iServer - 地图

  - 新增“几何查询(3857)”示例
  
  

# 9.1.0 alpha (2018-7-7) #

## 新特性

### 渲染性能再升级

- 高效率点图层GraphicLayer支持数据量由之前的30万提升至100万，相较9D版本有了3倍以上的性能提升，100万点数据可在1秒内完成渲染；同时，新增支持任意带经纬度的点数据格式，例如GeoJSON，TopoJSON，二维表等多种格式，同时可以实时改变点的样式，并支持交互操作如根据属性筛选和过滤和鼠标事件。[示例>>](https://iclient.supermap.io/examples/leaflet/editor.html#12_graphiclayer_webgl)

![GraphicLayer](https://github.com/SuperMap/iClient-JavaScript/blob/master/.github/910-1.png)

- 数据流图层DataFlowLayer增了MapV引擎，大幅提高了绘制Marker的性能，对于矢量点的渲染数据量由之前的1万提升至10万，对于栅格图片的渲染数据量由之前的3000提升至1万。[示例>>](https://iclient.supermap.io/examples/leaflet/editor.html#dataFlowService_mapv)

![DataFlowLayer](https://github.com/SuperMap/iClient-JavaScript/blob/master/.github/910-2.png)

### 对接最新ECharts，渲染千万级数据

- ECharts在今年1月发布了最新的版本4.0，新版本最大的亮点是支持了千万级数据的可视化渲染，通过对数据进行分块后加载，不需要漫长地等待所有数据加载完再进行绘制，以增量渲染的方式对数据进行可视化，从而提升性能。9D(2019)版本对EChartsLayer也同时进行了升级，已让Leaflet、OpenLayers、MapboxGL地图库都支持了ECharts 4.0的增量渲染能力。[示例>>](https://iclient.supermap.io/examples/leaflet/editor.html#echarts_linesDrawMillionsBeijingRoadsNetwork)

![EChartsLayer](https://github.com/SuperMap/iClient-JavaScript/blob/master/.github/910-3.png)

### MVT矢量瓦片细节优化

- OpenLayers地图库的三方插件对于MVT矢量瓦片的特性支持的不够完美，9D(2019)版本在MVT矢量瓦片的细节呈现方面做了很多优化并增加了新特性，例如：支持面填充、支持文字标签避让、优化中文沿线标注、支持自定义字体、解决多面丢失、优化了渲染性能等，从而让OpenLayers拥有了可以媲美MapboxGL对MVT矢量瓦片的渲染效果，同时还支持除3857以外的其它任意标准坐标系。[示例>>](https://iclient.supermap.io/examples/openlayers/editor.html#mvtvectorlayer_mbstyle_landuse)

![MVT](https://github.com/SuperMap/iClient-JavaScript/blob/master/.github/910-4.png)

### 更多优秀的可视化特效

- 9D版本为我们带来了很多炫酷的可视化效果，9D(2019)版本在这方面继续加强，新增集成了echarts / echartsgl / deck.gl可视化库的更多特效和范例。[示例>>](https://iclient.supermap.io/examples/mapboxgl/editor.html#deckglLayer_sfcontour)

![deck.gl](https://github.com/SuperMap/iClient-JavaScript/blob/master/.github/910-5.png)

### API文档优化

- 9D(2019)版本还对API文档进行了大幅优化，极大的提升了文档的可读性，现在您可以快速导航，轻松了解接口说明和使用范例，欢迎随时访问。

![APIDoc](https://github.com/SuperMap/iClient-JavaScript/blob/master/.github/910-6.png)


## API changes

### for Leaflet

- `L.supermap.imageMapLayer` `L.supermap.tiledMapLayer` 新增`options.format`参数，支持 "png" 、"bmp" 、"jpg" 和 "gif" 四种表述类型，默认为 "png"表述类型

- `L.supermap.wmtsLayer` , `L.supermap.tiandituTileLayer` , `L.supermap.baiduTileLayer` , `L.supermap.cloudTileLayer` , `L.supermap.imageMapLayer` , `L.supermap.tiledMapLayer` 新增 `options.tileProxy` 参数，支持设置代理地址

- 修改 `L.supermap.imageMapLayer` 的出图方式为整屏出图

- 新增全局配置 `SuperMap.setCORS` `SuperMap.isCORS` 设置或获取是否支持跨域

- 新增全局配置 `SuperMap.setRequestTimeout` `SuperMap.getRequestTimeout` 设置或获取请求超时时间
- `L.supermap.ServiceBase` 及其子类

  - 新增 `options.proxy` 参数，支持设置代理地址

  - 新增 `options.withCredentials` 参数,使服务请求支持携带cookie

- `SuperMap.Format.GeoJSON` 支持 iServer 数据类型 "RECTANGLE"

- `L.Proj.CRS` 增加 `options.dpi` 参数，支持自定义dpi

- iServer - 数据

  - `SuperMap.GetFeaturesParametersBase` 增加 `aggregations` 参数，增加 `SuperMap.AggQueryBuilderParameter` `SuperMap.AggregationParameter` `SuperMap.FilterAggParameter` `SuperMap.GeoBoundingBoxQueryBuilderParameter` `SuperMap.GeoHashGridAggParameter`类,支持聚合查询

- iServer - 空间分析

  - `L.supermap.spatialAnalystService` 增加 `geometrybatchAnalysis` 接口，支持 Geometry 批量空间分析

  - `SuperMap.GeometryOverlayAnalystParameters` 新增 `operateGeometries` 和 `sourceGeometries` 参数，支持批量空间对象叠加分析
  
  - `SuperMap.GenerateSpatialDataParameters` 增加 `attributeFilter` 参数,支持在动态分段时设置过滤参数

- iServer - 数据流

  - `L.supermap.dataFlowLayer` 增加 `mapv` 渲染方式，提高绘制marker的能力，`options` 新增 `render` 参数,可选值为 `normal`，`mapv`，默认为 `normal`

- ElasticSearch

  - 废弃 `SuperMap.ElasticSearch` 的 `options.change` 参数,直接使用 `SuperMap.ElasticSearch.msearch` `SuperMap.ElasticSearch.search`的 `callback` 参数

  - `SuperMap.ElasticSearch` 的 `update` 方法新增 `callback` 参数

- 可视化 - 客户端专题图

  - `L.supermap.ThemeLayer` 及其子类 
    - `addFeatures` 方法默认只支持添加经纬度坐标要素，新增 `options.alwaysMapCRS` 参数，设置该参数为true , `addFeatures` 方法可添加底图坐标要素

    - `addFeatures` 方法支持 `L.supermap.ThemeFeature` 类型和 `GeoJSON` 规范数据类型的 `feature` 数组

    - 废弃`_createFeature` 接口,由 `toiClientFeature` 接口代替

    - 新增 `options.id` 参数

  - `SuperMap.ThemeStyle` 的参数 `strokeDashstyle` 支持类型 `dashot` 更改为 `dashdot`

- 可视化 - 高效率点图层

  - 高效率点图层 `L.supermap.GraphicLayer` 

    - 支持`webgl`渲染，`options` 新增 `render` 参数,可选值为 `canvas` , `webgl`，默认为 `canvas`

    - `options` 新增 `webgl` 渲染相关参数，如：`color` , `highlightColor`, `opacity`,`radius`,`radiusScale`,`radiusMinPixels`,`radiusMaxPixels`,`strokeWidth`,`outline`，`onClick`,`onHover`
    
    - 增加 `setGraphics` 接口，支持设置点要素
    
    - 增加 `addGraphics` 接口，支持追加点要素
    
    - 增加 `clear` 接口，支持释放图层资源
    
    - 增加 `removeGraphics` 接口，支持移除所有要素

  - 高效率点图层要素类 `L.supermap.Graphic`

    - 废弃 `setCanvas` 和 `getCanvas` 接口，改用 `setStyle` 和 `getStyle` 接口

    - `options` 参数 `latlng` 更改为 `latLng`

    - `options` 新增参数 `attributes` ,支持设置要素属性

    - 增加 `setAttributes` 和 `getAttributes`接口

    - `setLatlng` 接口更改为 `setLatLng`

  - 废弃 `L.supermap.circleStyle` 类的 `getCanvas` 接口，改用 `getStyle` 接口

  - 增加 `L.supermap.cloverStyle`  `L.supermap.imageStyle` 类，支持三叶草要素风格、自定义图形要素风格

- 可视化 - 热力图

  - 新增热力图层 `L.supermap.heatMapLayer`

### for OpenLayers

- `ol.source.TileSuperMapRest` `ol.source.ImageSuperMapRest` 新增`options.format`参数，支持 "png" 、"bmp" 、"jpg" 和 "gif" 四种表述类型，默认为 "png"表述类型

- `ol.source.Tianditu` , `ol.source.BaiduMap` , `ol.source.SuperMapCloud` , `ol.source.ImageSuperMapRest` , `ol.source.TileSuperMapRest` 新增 `options.tileProxy` 参数，持设置代理地址

- 废弃 `ol.source.TileSuperMapRest` `ol.source.ImageSuperMapRest` 类的 `options._cache` 参数，由 `options.cacheEnabled` 代替

- 新增全局配置 `SuperMap.setCORS` `SuperMap.isCORS` 设置或获取是否支持跨域

- 新增全局配置 `SuperMap.setRequestTimeout` `SuperMap.getRequestTimeout` 设置或获取请求超时时间

- `ol.supermap.ServiceBase` 及其子类

  - 新增 `options.proxy` 参数，支持设置代理地址

  - 新增 `options.withCredentials` 参数,使服务请求支持携带cookie

- `SuperMap.Format.GeoJSON` 支持 iServer 数据类型 "RECTANGLE"

- iServer - 数据

  - `SuperMap.GetFeaturesParametersBase` 增加 `aggregations` 参数，增加 `SuperMap.AggQueryBuilderParameter` `SuperMap.AggregationParameter` `SuperMap.FilterAggParameter` `SuperMap.GeoBoundingBoxQueryBuilderParameter` `SuperMap.GeoHashGridAggParameter`类,支持聚合查询

- iServer - 空间分析

    - `ol.supermap.spatialAnalystService` 增加 `geometrybatchAnalysis` 接口，支持 Geometry 批量空间分析

    - `SuperMap.GeometryOverlayAnalystParameters` 新增 `operateGeometries` 和 `sourceGeometries` 参数，支持批量空间对象叠加分析
  
    - `SuperMap.GenerateSpatialDataParameters` 增加 `attributeFilter` 参数,支持在动态分段时设置过滤参数

- ElasticSearch

  - 废弃 `SuperMap.ElasticSearch` 的 `options.change` 参数,直接使用 `SuperMap.ElasticSearch.msearch` `SuperMap.ElasticSearch.search` 的 `callback` 参数

  - `SuperMap.ElasticSearch` 的 `update` 方法新增 `callback` 参数

- 可视化 - 客户端专题图

  - `ol.supermap.Theme` 及其子类
    - `addFeatures` 方法支持传入 `ol.supermap.ThemeFeature` 类型、`GeoJSON` 规范数据类型，以及`ol.Feature`类型的 `feature` 数组

    - 废弃 `toFeature` 方法,由 `toiClientFeature` 方法代替

    - 新增 `options.id` 参数

  - `SuperMap.ThemeStyle` 的参数 `strokeDashstyle` 支持类型 `dashot` 更改为 `dashdot`

- 可视化 - 高效率点图层

  - 高效率点图层源 `ol.source.Graphic` 

    - 支持`webgl`渲染，`options` 新增 `render` 参数,可选值为 `canvas` , `webgl`，默认为 `canvas`

    - `options` 新增 `webgl` 渲染相关参数，如：`color` , `highlightColor`, `opacity`,`radius`,`radiusScale`,`radiusMinPixels`,`radiusMaxPixels`,`strokeWidth`,`outline`，`onClick`,`onHover`

    - `options` 新增 `isHighLight` 参数 , 控制在 `onClick` 时是否高亮

    - 增加 `setGraphics` 接口，支持设置点要素
    
    - 增加 `addGraphics` 接口，支持追加点要素
    
    - 增加 `clear` 接口，支持释放图层资源
    
    - 增加 `removeGraphics` 接口，支持移除所有要素

  - 高效率点图层要素类 `ol.Graphic`

    - `options` 新增参数 `attributes` ,支持设置要素属性

    - 新增 `setAttributes` 和 `getAttributes`接口

- 可视化 - 矢量瓦片

  - 新增  `ol.supermap.MapboxStyles` 样式类，矢量瓦片支持使用 Mapbox 规范样式

- 可视化 - 热力图

  - 新增热力图源 `ol.source.HeatMap`

### for MapboxGL

- 新增全局配置 `SuperMap.setCORS` `SuperMap.isCORS` 设置或获取是否支持跨域

- 新增全局配置 `SuperMap.setRequestTimeout` `SuperMap.getRequestTimeout` 设置或获取请求超时时间

- `mapboxgl.supermap.ServiceBase` 及其子类

  - 新增 `options.proxy` 参数，支持设置代理地址

  - 新增 `options.withCredentials` 参数,使服务请求支持携带cookie

- `SuperMap.Format.GeoJSON` 支持 iServer 数据类型 "RECTANGLE"

- iServer - 数据

  - `SuperMap.GetFeaturesParametersBase` 增加 `aggregations` 参数，增加 `SuperMap.AggQueryBuilderParameter` `SuperMap.AggregationParameter` `SuperMap.FilterAggParameter` `SuperMap.GeoBoundingBoxQueryBuilderParameter` `SuperMap.GeoHashGridAggParameter`类,支持聚合查询

- iServer - 空间分析

  - `mapboxgl.supermap.spatialAnalystService` 增加 `geometrybatchAnalysis` 接口，支持 Geometry 批量空间分析

  - `SuperMap.GeometryOverlayAnalystParameters` 新增 `operateGeometries` 和 `sourceGeometries` 参数，支持批量空间对象叠加分析
  
  - `SuperMap.GenerateSpatialDataParameters` 增加 `attributeFilter` 参数,支持在动态分段时设置过滤参数

- ElasticSearch

  - 废弃 `SuperMap.ElasticSearch` 的 `options.change` 参数,直接使用 `SuperMap.ElasticSearch.msearch` `SuperMap.ElasticSearch.search` 的 `callback` 参数

  - `SuperMap.ElasticSearch` 的 `update` 方法新增 `callback` 参数

- 可视化 - 客户端专题图

  - `mapboxgl.supermap.ThemeLayer` 及其子类
    - `addFeatures` 方法，支持传入  `mapboxgl.supermap.ThemeFeature` 类型和 `GeoJSON` 规范数据类型的 `feature` 数组

    - 废弃 `toFeature` 方法，由 `toiClientFeature` 方法代替

    - 新增 `options.id`参数

    - 新增 `moveTo`接口，支持调整专题图层显示顺序

    - 新增 `setVisibility`接口，支持设置图层的显示和隐藏

  - `SuperMap.ThemeStyle` 参数 `strokeDashstyle` 类型 `dashot` 更改为 `dashdot`

- 可视化 - 高效率点图层

  - 新增高效率点图层 `mapboxgl.supermap.GraphicLayer`

- 可视化 - threejs

  - 新增three图层 `mapboxgl.supermap.ThreeLayer`

- 可视化 - 热力图

  - 新增热力图层 `mapboxgl.supermap.HeatMapLayer`

- 可视化 - deck.gl

  - 新增deck.gl图层 `mapboxgl.supermap.DeckglLayer`

### Classic

- ElasticSearch

  - 废弃 `SuperMap.ElasticSearch` 的 `options.change` 参数,直接使用 `SuperMap.ElasticSearch.msearch` `SuperMap.ElasticSearch.search` 的 `callback` 参数

  - `SuperMap.ElasticSearch` 的 `update` 方法新增 `callback` 参数


## Fixed

### for Leaflet

- 修复在不支持跨域情况下，jsonp请求发送失败的问题
- 修复 `SuperMap.SurfaceAnalystParametersSetting` 的 `clipRegion` 不起作用的问题
- 修复客户端专题图无法加载 `L.Polygon` 的问题
- 修改矢量瓦片字体默认粗体的问题
- 修改 `L.supermap.imageMapLayer` `L.supermap.tiledMapLayer` 通过 `key` `token` 授权失败的问题
- 修改 `L.supermap.tiandituLayer` 显示级别多一级的问题
- 修改 `L.supermap.mapVLayer` 在高分屏时无法选中要素的问题
- 修改 `L.supermap.echartsLayer` 删除其他图层 `zoomend` `moveend` 事件的问题
- 修复缓冲区分析SRID参数不可用问题
- 修复 `L.supermap.mapVLayer` 加载大量数据图层过于卡顿问题
- 优化 `L.supermap.echartsLayer` 图层性能
- 修复 `L.supermap.graphicLayer` 高效率图层大数据量内存性能问题
- 修复 `L.supermap.mapVLayer`的 `cleardata` 方法失败的问题
- 修复 `L.supermap.mapVLayer` 在浏览器缩放比例非100%时，要素偏移，点击事件获取不到要素的问题
- 修复`L.supermap.themeFeature` 的 `geometry` 不支持传入`L.CircleMarker` `L.Circle`的问题

### for OpenLayers

- 修复在不支持跨域情况下，jsonp请求发送失败的问题
- 修复 `SuperMap.SurfaceAnalystParametersSetting` 的 `clipRegion` 不起作用的问题
- 修复 `ol.source.DataFlow` 传入父类参数无效的问题
- 修复 `ol.source.DataFlow` 的 `dataUpdated` 事件返回参数为空的问题
- 修复 `ol.source.Graphic` 在浏览器缩放比例非100%显示错位的问题
- 修改 `ol.source.TileSuperMapRest` `ol.source.ImageSuperMapRest` 通过 `key` `token` 授权失败的问题
- 修复 `ol.source.TileSuperMapRest` 的 `redirect` 参数默认为 `false` 但运行为 `true` 的问题
- 修复缓冲区分析SRID参数不可用问题
- 修复 `ol.source.Mapv` 加载大量数据图层过于卡顿问题
- 修复 `ol.source.Graphic` 高效率图层大数据量内存性能问题
- 修复 `ol.source.Mapv` 在浏览器缩放比例非100%时，要素偏移，点击事件获取不到要素的问题

### for MapboxGL

- 修复在不支持跨域情况下，jsonp请求发送失败的问题
- 修复 `mapboxgl.supermap.ThemeLayer` 及其子类无法使用 `map.addLayer` `map.getLayer` `map.moveLayer` `map.removeLayer` `map.setLayoutProperty` 操作的问题
- 修复 `SuperMap.SurfaceAnalystParametersSetting` 的 `clipRegion` 不起作用的问题
- 修复多个客户端专题图叠加偏移的问题
- 修复 `mapboxgl.supermap.MapvLayer` 的 `clearData` 失败的问题
- 修复客户端3D专题图高亮时底色穿透问题
- 修复移除客户端3D专题图图层报错问题
- 修复 `mapboxgl.supermap.MapvLayer` 加载大量数据图层卡顿问题
- 修复 `mapboxgl.supermap.GraphicLayer` 大数据量内存性能问题
- 修复 `mapboxgl.supermap.MapvLayer` 在浏览器缩放比例非100%时，要素偏移，点击事件获取不到要素的问题

    thanks @[zhang6685979](https://github.com/zhang6685979)

    pullrequest： [https://github.com/SuperMap/iClient-JavaScript/pull/15](https://github.com/SuperMap/iClient-JavaScript/pull/15)

### Classic

- 修复 `SuperMap.Layer.MapVLayer` 加载大量数据图层过于卡顿问题


## Examples

- 所有示例国际化，支持中英文

- 示例使用的三方库以及插件升级至最新版

### for Leaflet

- iServer - 数据

  - 新增 “聚合查询” 示例
  
- iServer - 空间分析
  
  - 新增 “几何要素批量空间分析” 示例
  
  - 新增 “批量几何要素叠加分析” 示例

- iServer - 网络分析
  
  - 修复 “最佳路径分析” 示例路径线截断的问题
  
- iServer - 网络分析

  - 修复 “最佳路径分析” 示例显示错误的问题

- ElasticSearch - 可视化

  - 修改 “航班监控” 示例

- 可视化 - 热力图
  
  - 新增 “随机点(Classic)” 示例
    
  - 新增 “2000年到2015年地震热力图(Classic)” 示例

- 可视化 - 高效率点图层
  
  - 新增 “纽约18万出租车-符号绘制” 示例
  
  - 新增 “随机点-三叶草” 示例
  
  - 新增 “纽约145万出租车-webgl” 示例
  
- 可视化 - ECharts

  - 新增 “2005到2016年地震概况统计” 示例
  
  - 新增 “2018年2月北京房价信息” 示例

  - 新增  “车辆监控模拟” 示例
  
  - 新增 增量高效率图层示例，包括 “北京道路网络图” 、“纽约出租车上车点分布图”、“全国铁路网络图” 、“全国水系图” 以及 “全国道路网络图”

- 可视化 - MapV
  
  - 新增 “2018年2月北京房价信息” 示例
  
  - 新增 “迁徙时序图” 示例

### for OpenLayers

- iServer - 空间分析
  
  - 新增 “几何要素批量空间分析” 示例
  
  - 新增 “批量几何要素叠加分析” 示例

- 可视化 - 热力图
  
  - 新增 “随机点(Classic)” 示例
  
- 可视化 - 高效率点图层
  
  - 新增 “纽约18万出租车-符号绘制” 示例
  
  - 新增 “随机点-三叶草” 示例
  
  - 新增 webgl渲染示例，包括 “纽约出租车18万点-webgl渲染” 以及 “纽约145万出租车-webgl” 示例

- 可视化 - ECharts

  - 新增包括 “全国空气质量图”、“迁徙图”、“热力图”、“线路图”、“线特效”、“世界飞机航线图”、“微博签到图”、“格网图” 等示例
  
  - 新增 “2005到2016年地震概况统计” 示例
  
  - 新增 “2018年2月北京房价信息” 示例
  
  - 新增 增量高效率图层示例，包括 “北京道路网络图” 、“全国铁路网络图” 、“全国水系图” 以及 “全国道路网络图”
  
  - 新增 “车辆监控模拟” 示例

- 可视化 - MapV
  
  - 新增 “2018年2月北京房价信息” 示例
  
  - 新增 “迁徙图” 以及 “面” 示例

### for MapboxGL

- iServer - 空间分析
  
  - 新增 “几何要素批量空间分析” 示例
  
  - 新增 “批量几何要素叠加分析” 示例

- 新增 可视化 - 热力图 分类及示例

- 新增 可视化 - threejs  分类及示例

- 新增 可视化 - 高效率点图层  分类及示例

- 可视化 - MapV
  
  - 新增 “2018年2月北京房价信息” 示例
  
  - 新增 “蜂巢图”、“纽约出租车上车点” 以及 “面” 示例

- 可视化 - ECharts
  
  - 新增 增量高效率图层示例，包括 “北京道路网络图” 、“纽约出租车上车点分布图”、“全国铁路网络图” 、“全国水系图” 以及 “全国道路网络图”
  
  - 新增 “车辆监控模拟” 示例

- 新增 可视化 - DeckGL 分类及示例

### Classic

- 分析 - 网络分析
  
  - 修复 “最佳路径分析” 示例路径线截断的问题


## Web Site &amp;&amp; Docs

- 站点页面底部添加联系方式

- API 侧边栏分类显示

- 优化 API 内容


## Code Quality


## Project
- 新增ISSUE模板
- 移动SuperMap iClient 8C 库的位置至 src/classic 下
- npm
  - 修复 `turf` 引用错误的问题
  - 提出css，方便单独引用
  - 增加dist文件夹


## Pull Request
- [https://github.com/boundlessgeo/ol-mapbox-style/pull/83](https://github.com/boundlessgeo/ol-mapbox-style/pull/83)
- [https://github.com/boundlessgeo/ol-mapbox-style/pull/76](https://github.com/boundlessgeo/ol-mapbox-style/pull/76)



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
- 新增ECharts可视化图层：EChartsLayer
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
- 修复EChartsLayer在浏览器窗口大小改变时显示错位问题
- 修复MapVLayer 无法选中要素的问题
- 修复图层信息设置服务(LayerInfoService)更新图层信息失败问题
- 修复客户端专题图缩放不同步问题
- 修复ImageMapLayer，TiledMapLayer支持L.point形式的tilesize
- 修复非4326投影下统计专题图不显示的问题
- 修复WKT格式转换错误问题
- 修复mapv图层(MapVLayer)和ECharts图层(EChartsLayer)移除事件

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
- 修复数据流服务示例效率
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
