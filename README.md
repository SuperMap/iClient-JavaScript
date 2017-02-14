# SuperMap iClient for JavaScript

SuperMap iClient for JavaScript 是一套由 JavaScript 语言编写的 GIS 客户端应用开发包， 支持多源数据地图，支持多终端，跨浏览器， 通过本产品可快速实现浏览器上美观、流畅的地图呈现。

---

## 产品兼容性
##### 支持的服务列表

* SuperMap iServer 服务
 * 地图服务
 * 数据服务
 * 量算服务
 * 查询服务
 * UGC 图层服务(UGC 栅格图层、UGC 影像图层、UGC 专题图图层、UGC 矢量图层)
 * 空间关系服务
 * 专题图服务
 * 交通换乘服务
 * 空间分析服务类
 * 网络分析服务类
* SuperMap 云服务
* OGC 标准的服务 (WMS、WFS、WMTS、KML)
* 其他第三方服务，如天地图等

##### 与其他框架的兼容性

* jQuery 1.6 +
* ExtJS 2.0 +
* PhoneGap 1.7.0 +
* OpenLayers 2.11， 其中 Geometry 类的子类、继承 Strategy 类的 Paging 类、Filter 类不兼容
* proj4js.js

##### 终端设备与浏览器兼容性

* PC机终端
 * IE：6.0 及以上系列，推荐 9.0 及其以上版本
 * Chrome：1.0 及以上系列，推荐 1.0 及其以上版本
 * Firefox：2.0 及其以上系列，推荐 5.0 及其以上版本
 * Opera：9.5 及以上系列，推荐 10.0 及其以上版本
 * Safari：3.0 及其以上系列（推荐 4.0 及其以上版本
* Android 2.1+ 移动终端
 * Chrome：Chrome Lite
 * Firefox：Firefox for Mobile
 * Opera：Opera Mobile
 * 移动端 webkit 内核浏览器：
   * UC U3 内核浏览器、QQ 浏览器 2.0 及其以上版本、海豚浏览器 4.0 及其以上版本、360 浏览器 2.0 及其以上版本、iOS 4.0+ 移动终端
 * Safari for iOS
* WP 7.5 移动终端
 * Internet Explorer Mobile（以及基于IE内核的QQ浏览器和UC浏览器）

##### 其他兼容性

* 支持Windows8应用商店

---

## 产品变更信息
当前版本：*8.0.2*

上次版本：*8.0*
##### 新增功能

*  iConnector bing地图的支持
*  客户端专题图中增加等级符号专题图
*  新增对GeoJSON数据格式的支持
*  网络分析中新增二维爆管分析服务
*  新增版本切换的控件

##### 接口变更

* SuperMap.REST.ThemeParameters.fieldValueDisplayFilter.filedName属性更改为fieldName
* Geometry中的Rectangle类新增Move接口

##### 产品包以及产品化工作的完善

* 客户端专题图坐标轴优化已及柱状图填充支持渐变色
* 完善接口说明，增加接口示例

##### 新增范例

* 新增iConnector bing地图范例
* 新增等级符号专题图范例
* 新增对GeoJSON格式数据支持的范例

##### 修复的问题

* 修复比例尺不一样时，切换地图出现错误
* 修复热点图只有一个点时根据默认属性不能进行渲染
* 修复客户端专题图中之饼图只有一个数据来填充图形，饼图的mouseover事件失效
* 修复图层中添加wrapDateLine属性为true时，缩放动画不正确

---


当前版本：*8.0*

上次版本：*7.2 Beta*

##### 新增功能
* OSMBuilding与产品结合
* 矢量要素图层样式增加线性渐变和放射渐变功能

##### 接口变更 
* 增加公交换乘避让站点和避让线路接口
* 数据集查询新增动态投影参数

##### 产品包以及产品化工作的完善
* 范例增加锚点功能

##### 新增范例
* 新增百度地图范例
* 新增天地图范例
* 新增四维图景地图范例
* 新增标签矢量图层范例
* 新增渐变样式矢量图形范例
* 新增OSMBuilding绘制范例
* 新增OSMBuildingGeoJSON数据范例
* 新增OSMBuilding数据集查询范例

##### 修复的问题
* 修改范例MapBOX地图不出图的问题
* 修改矢量要素图层的文档描述问题

---

当前版本：*7.2 Beta*

上次版本：*7.1 SP2*

##### 新增功能
* 新增客户端统计专题图之三维柱状专题图
* 新增客户端统计专题图之点状专题图
* 新增客户端统计专题图之环状专题图
* 新增矢量地图编辑器控件

##### 接口变更
* 路由对象支持tojson方法
* marker点击事件支持移动端的touchstart
* 矢量地图和时空数据支持虚线
* 统计专题图支持压盖判断的权重

##### 产品包以及产品化工作的完善
* 完善接口说明，增加接口示例

##### 新增范例
* 新增客户端统计专题图之三维柱状专题图范例
* 新增客户端统计专题图之点状专题图范例
* 新增客户端统计专题图之环状专题图范例

##### 修复的问题
* 解决麻点图作为叠加图层并且和底图比例次不一致时出图错乱的缺陷
* 修改选址分析范例说明
* 解决时空数据图层移除数据后没清空的缺陷
* 修改专题图排序字段displayOrderBy的无法识别的缺陷

---

当前版本：*7.1 SP2*

上次版本：*7.1 SP1*

##### 新增功能
* 新增客户端统计专题图之饼状专题图
* 新增客户端统计专题图之柱状专题图
* 新增客户端统计专题图之折线专题图

##### 接口变更
* Elements 图层新增固定图层属性isFixed
* DrawFeature 控件增加属性style ，以支持所绘制feature的样式

##### 产品包以及产品化工作的完善
* 新增客户端统计专题图相关类参考
* 完善接口说明，增加接口示例

##### 新增范例
* 新增标签专题图范例--全国空气质量指数专题图
* 新增客户端统计专题图之饼状专题图范例
* 新增客户端统计专题图之柱状专题图范例
* 新增客户端统计专题图之折线专题图范例
* 新增地图的右键菜单范例
* 新增feature的右键菜单范例
* 新增marker的右键菜单范例
* 新增iConnector对OpenLayers3的支持及其范例
* 新增在地图中使用百度 EChart 图表的范例

##### 修复的问题
* 解决麻点图设置过滤条件后报错的问题
* 解决专题图中 addfeatures 时，map Bounds 与 feature Bounds 判断失败的问题
* 解决查询路由数据集而绘制结果错误的问题
* 修改地图和feature在快速拖动时不能重叠的缺陷
* 修改时空数据feature add之后的排序缺陷

---

当前版本：*7.1 SP1*

上次版本：*7.1*

##### 新增功能

* 新增客户端单值专题图
* 新增客户端分段专题图
* 新增热点图颜色分段配置的功能
* 新增数据集查询的bounds查询服务功能

##### 接口变更
无

##### 产品包以及产品化工作的完善：
* 库文件增加拆分后的基础库、iServer服务库、可视化库和OGC库

##### 新增范例
* 新增客户端单值专题图范例
* 新增客户端分段专题图范例
* 新增泰森多边形范例
* 新增MapBox范例
* 新增CartoDB范例
* 新增Polymaps范例
* 新增wms范例
* 新增热点图颜色手动配置范例

##### 修复的问题
* 解决矢量分块在设置要素的偏移效果时产生的裂缝问题
* 修改矢量分块的面填充颜色与外围边界颜色的透明度，使其能被分别设置
* 解决vector在设置style.backgroundGraphic后无法随地图缩放的问题
* 解决TiledDynamicRESTLayer图层设置部分参数后地图在chrome和opera浏览器中的显隐问题

---

当前版本：*7.1*

上次版本：*7.1Beta*

##### 新增功能
* 新增矢量地图符号系统
* 新增时空数据线面渲染

##### 接口变更
* Layer.TiledVectorLayer新增useLocalStorage属性
* Layer.TiledVectorLayer新增setCatoCSS，getCatoCSS方法

##### 产品包以及产品化工作的完善
* 范例目录结构调整
* 增加时空数据线面渲染相关类参考
* 增加矢量地图符号系统相关类参考

##### 新增范例
* 新增地铁修建范例
* 新增春运模拟范例
* 新增符号系统高亮显示范例
* 新增CatoCSS编辑范例
* 新增D3拾取器范例

##### 修复的问题
* 修复鹰眼在ie8下进行3857地图切换为4326地图不显示的缺陷
* 修复TiledDynamicRESTLayer和TiledVectorLayer叠加后出现页面报错的缺陷
* 修复矢量分块点数据集无法显示的缺陷
* 修复wms服务在ie浏览器请求地图有中文的图层名参数中的中文会出现乱码的缺陷
* 修复使用selectFeature传入多图层在chrome和Firefox上出现问题的缺陷
* 修复Layer.Elements在map中的图层显示顺序有问题的缺陷
* 修复kml地图无法显示的缺陷
* 修复WMTS图层、iServer地图服务叠加后，地图上添加UTFGrid图层，JSON中不包含属性数据的缺陷

---

当前版本：*7.1 Beta*

上次版本：*7.0 SP2*

##### 新增功能
* 新增时空数据可视化
* 增加绘制、编辑要素时节点捕捉功能
* 支持A0和A1纸张的大幅地图打印

##### 接口变更
* Layer.ClusterLayer增加聚散完成事件，并返回聚散点集合
* Layer.Vector新增客户端标签专题图策略（Strategy.GeoText），新增Geometry.GeoText对象

##### 产品包以及产品化工作的完善
* 范例目录结构调整
* 增加时空数据可视化相关类参考

##### 新增范例
* 新增基于Canvas的截取地图并保存为图片的范例
* 新增A0和A1纸张大幅地图打印的范例
* 新增基于时空数据可视化实现的火车监控模拟范例
* 新增基于时空数据可视化实现的汽车监控模拟范例

##### 修复的问题
* 修复Layer.Image当useCanvas:true时图片偏移的缺陷
* 修复Layer.Vector添加复杂面时出现错误线条的缺陷
* 修复地图在触屏ie11上无法缩放的缺陷
* 修复feature旋转时label也跟着旋转的缺陷
* 修复在Feature选中状态时平移地图，Feature的风格变回非选中状态的问题
* 修复使用控件 LayerSwitcher 切换地图时报错的问题

---

当前版本：*7.0 SP2*

上次版本：*7.0 SP1*
##### 新增功能
* 新增对接MapABC的示例代码

##### 修复的问题：
* 修复SuperMap.Layer.Vector,在Canvas和Canvas2下无法绘制矩形对象的错误
* 修复SuperMap.Layer.Image当useCanvas:true时地图偏移的错误
* 修复ie8下无法打印vml元素的错误

---

当前版本：*7.0 SP1*

上次版本：*7.0*

##### 新增功能
* 新增EdgeWeight和TurnNodeWeight服务
* 新增kml服务
* 新增客户端标签专题图
* 支持wfs1.1.0
* 增加webgl渲染地图的方式以及范例
* UTFGridLayer增加Token管理
* 热点图支持颜色线性渐变设置，增加colors属性

##### 接口变更
* 移除EdgeWeightNames和TurnNodeWeightNames服务
* 移除选址分区分析参数类（SuperMap.REST.FindLocationParameters）的属性"结点需求量字段（nodeDemandField）"
* 热点图增加自定义颜色接口
* 新增SuperMap.Geometry.GeoText类
* SuperMap.REST.GenerateSpatialDataParameters增加retainedFields属性

##### 产品包以及产品化工作的完善
* 增加属性图（utfgird）专题文档
* 增加扩展图（Elements Layer）专题文档
* 增加热点图专题文档
* 增加热点格网图专题文档
* 增加聚散图专题文档
* 专题文档结构调整
* 第三方地图服务范例修改为采用iConnector实现
* 鼠标增加小手样式
* 增加麻点图专题文档
* 帮助文档属性方法支持按字母排序
* 增加UML类结构图

##### 新增范例
* 新增KML范例。
* 新增客户端标签专题图范例。
* 新增地图渲染范例。
* 新增轮询范例。
* 新增卷帘范例。
* 新增Elements Layer扩展范例。
* 增加四种地图渲染方式比较的范例。
* 增加插值分析范例。

##### 修复的问题
* 修复chrome下点击“查看源码”，浏览器崩溃的问题以及源代码窗口无滚动条的问题。
* 控件样式美化
* SuperMap.Control.SelectFeature支持鼠标右键事件
* SuperMap.Control.Measure的measurepartial事件区分点击和平移
* 对非法闭合feature采用过滤处理
* 修改在Canvas渲染下，设置SelectFeature控件的selectStyle属性，样式变化错误的缺陷
* 修改设置Credential的name属性无效问题
* 修改wms图层先缩放再resize，地图白图的问题
* 修改初始化鹰眼设置为最小后在点击打开不出图的问题
* 修改麻点图不支持自定义坐标和自定义范围的问题

---

当前版本：*7.0*

上次版本：*6.1 SP3*

本版本在地图可视化上做了很大的改进，不仅提供了大数据量渲染的解决方案，而且新增了格网图、D3等渲染方式。另外在移动端和REST服务上持续更新。同时提供了和第三方地图之间的开源连接器iConnector。具体变更如下：

##### 新增功能
* 新增UTFGrid图层
* 新增iConnector，支持在第三方地图（包括百度地图、天地图、Leaflet、Google地图、ArcGIS）API的基础上无缝引入iServer的地图服务
* 新增热点格网图特色图层
* 新增移动端产品对iServer生成的MBTiles离线缓存的支持
* 新增HTML5 Android工程，降低了JavaScript产品安卓开发的门槛，提高了易用性
* 新增麻点图，支持大数据量poi的展现
* 新增路由对象定位对路由对象参数Dataset设置方式的支持
* 新增缓冲区分析对几何对象的投影参数的支持

##### 产品包以及产品化工作的完善
* 范例调整，可直接拷贝重用
* Feature对象绘制方式优化
* 删除SuperMap.REST.SpatialAnalyst 命名空间的SpatialAnalystEventArgs类

##### 新增范例
* 热点格网图范例
* UTFGrid范例
* 麻点图范例

##### 修复的问题
* 修复SQL属性查询只返回属性信息时报错的问题
* 修复histest查询接口范例的问题
* 修复map的属性restrictedExtent失效的问题
* 修复不使用缓存、出图方式选择gif格式时地图浏览有黑块的问题

---

当前版本：*6.1 SP3*

上次版本：*6.1 SP2*

产品提供了地图图层、地图控件、专题图、查询、量算、空间分析、网络分析、数据集查询、交通换乘、UGC图层服务等功能， 较之前版本本次改版的产品功能更加丰富、性能 更加优越、扩展性更强、 兼容效果更好，本次版本主要做了以下改进和优化：

##### 新增功能
* 新增并发访问功能，支持 TileDynamicLayer、WMS/WMTS 多 URLS 并发访问
* 新增第三方地图服务API，包括 Google、ArcGis、OpenStreetMap、Bing、Baidu 地图支持
* 新增聚散图层，热点图特色图层
* 新增栅格单值专题图，栅格范围分段专题图，丰富专题图效果
* 新增插值分析服务，支持 IDW/RBF/Density/Kriging
* 新增贝塞尔曲线，B样条曲线，丰富Geometry类型
* 新增 WCS、WFS 协议支持
* 新增海图查询和符号库的支持
* 新增 2G/3G/4G 符号的几何对象支持
* 新增 Android 移动端 MBTile 离线数据的支持，IE10、WinRT 支持
* 新增 Permalink 控件，用于分享视图
* 增加 zoom 控件
* 增加地图缩放到任意比例尺
* 增加瓦片渐出显示效果
* 增加Credential认证功能

##### 接口变更
* 投影支持EPSG:900913,EPSG:3857，EPSG:4326 对于这三种投影，只需要设置投影参数如projection:"EPSG:4326", 而不需要设置maxExtent,units等其他相关信息即可
* 部分方法加入参数判断，当参数不合法时会抛出TypeError异常到控制台
* 天地图接口升级
* 地图查询返回的feature的style，7C变为null

##### 产品包以及产品化工作的完善
* Proj4as 库集成到产品包
* 删除 Rico 文件夹下所有文件

##### 新增范例
* 热点图范例
* 地图投影转换范例
* WCS 图层范例
* Google 图层范例
* Bing 图层范例
* ArcGIS 图层范例
* OpenStreetMap 图层范例
* 百度图层范例
* 栅格分段专题图范例
* 栅格单值专题图范例
* WFS 查询范例
* 字段查询统计范例
* 聚散点图层范例
* 地图打印范例
* 子图层控制范例
* Token认证范例

##### 修复的问题
* 修复岛洞多边形显示问题
* 修复 Popup.FramedCloud 引角处不可点击图层的问题
* 修复 天地图鹰眼问题问题

---

当前版本：*6.1 SP1*

上次版本：*6.1.0 *

产品提供了地图图层、地图控件、专题图、查询、量算、空间分析、网络分析、数据集查询、交通换乘、UGC图层服务等功能， 较之前版本本次改版的产品功能更加丰富、性能 更加优越、扩展性更强、 兼容效果更好，本次版本主要做了以下改进和优化：

##### 新增功能
* 新增动态分段服务，仅支持 SuperMap iServer 6.1.2 及其以上版本的动态分段服务
* 新增数据服务，提供 ID 查询、几何查询、缓冲区查询、SQL 查询、地物编辑等功能
* 新增 Canvas2 渲染方式，适用于制作矢量数据的动画渲染
* 新增离线存储和访问功能，支持基于 PhoneGap 开发的移动 Web 应用， 实现离线状态下的地图存储与访问
* 新增交通换乘服务，仅支持 SuperMap iServer 6.1.2 及其以上版本的交通换乘服务
* 新增 UGC 图层服务，包括 UGC 栅格图层，UGC 矢量图层，UGC 影像图层，UGC 专题图图层
* 新增空间关系分析服务，仅支持 SuperMap iServer 6.1.2 及其以上版本的空间关系服务

##### 接口变更
* CanvasLayer 类新增 dpi 属性
* SampleCacheLayer 类删除了viewBounds、viewer、format三个属性
* CloudLayer 类新增 url 属性
* PathGuideItem 类新增 geometry 和 description 属性
* SuperMap.Feature.Vector 中 attributes 属性修改为键值对形式
* SuperMap.Control.PanZoomBar 中新增 showSlider 属性
* SuperMap.Control.PanZoomBar 新增 levelsDesc 属性
* SuperMap.Layer.TiledDynamicRESTLayer 新增 dpi 和 projection 属性，同时关闭 viewBounds 、viewer、scale 三个属性， 删除设置在 url上的 maxVisibleVertex 参数
* 删除 Ajax 类
* SuperMap.REST.ThemeParameters 新增 displayFilter 和 displayOrderBy 属性
* SuperMap.REST.TransportationAnalystParameter 新增 barrierPoints 属性

##### 性能优化
* 缩放动画与平移交互操作优化
* 瓦片渐进效果优化
* 多图层叠加性能优化
* 动画重构与插件化

##### 产品包以及产品化工作的完善
* 统一命名空间为 SuperMap
* 精简库文件，压缩核心库
* 全新的产品页面样式，对产品页面整体的内容结构、页面布局做了重大调整
* 帮助文档本地化
* 控件及其样式的调整，部分控件进行了功能完善和改进，删除了 Pan， PanPanel， ZoomIn， ZoomOut， ZoomPanel， ZoomToMavExtent 等控件， 将 PanZoom 合并到 PanZoomBar，并且优化了 PanZoomBar

##### 新增范例
* 动态分段专题范例
* 数据集缓冲区查询范例
* 数据集 SQL 查询范例
* 数据集几何查询范例
* 数据集 ID 查询范例
* 高性能矢量图层渲染---车辆监控系统范例，须在支持 HTML5 Canvas 的浏览器下运行
* 高性能矢量图层渲染---大数据矢量地物查询与交互范例，须在支持 HTML5 Canvas 的浏览器下运行
* 高性能矢量图层渲染---气象监测范例，须在支持 HTML5 Canvas 的浏览器下运行
* WMTS 图层使用范例
* 新增交通换乘范例

##### 修复的问题
* 修复地图控件设置固定比例尺后，PanZoomBar 控件显示异常问题
* 修复 WMTS 图层出图问题
* 更新天地图图片地址
* 修复使用 map 获取比例尺出错问题
* 解决多点量算、跨域量算问题
* 修复加载 4.0 + 缓存的出图错误问题