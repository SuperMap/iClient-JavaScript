# 补问问题 - 缺失参数

当参数校验发现缺失或类型不匹配时，按下列场景补问。能由示例默认值推断的信息不要追问，不要编造服务端点、图层标识、数据集名或分析参数。

## 场景 1：缺少 iServer URL

**触发条件**：意图为加载地图，但未提供 URL。

```
加载地图需要 iServer 地图服务地址。

请提供以下任一形式：
- 完整地址：https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China
- 仅服务名：map-china400（我会补全为 /rest/maps/{mapName}，地图名不确定时会再确认）

如果暂时没有服务，可以先用公开的 World 地图服务生成可运行示例：
https://iserver.supermap.io/iserver/services/map-world/rest/maps/World
```

## 场景 2：缺少中心点

**触发条件**：URL 有效，但未提供中心坐标。

```
地图服务地址已确认。您想以哪里为中心显示？

1. 城市名：北京、上海、广州、深圳
2. 坐标：[经度, 纬度]，例如 [116.4, 39.9]
3. 使用服务默认中心点

WGS84 下可直接使用经纬度；其他坐标系请说明 EPSG 代码。
```

| 城市 | 坐标 |
|---|---|
| 北京 | [116.39, 39.9] |
| 上海 | [121.47, 31.23] |
| 广州 | [113.26, 23.13] |
| 深圳 | [114.05, 22.55] |

## 场景 3：缺少缩放级别

**触发条件**：URL 与中心点明确，但未提供缩放级别。

```
地图将以 [经度, 纬度] 为中心显示。需要多大范围？

- 全国/全省：zoom 4-6
- 全市/全区：zoom 8-10
- 街道/详细：zoom 12-15
```

## 场景 4：查询缺少数据集或图层名称

**触发条件**：意图为查询分析，未提供数据集或图层名称。

```
请确认查询对象：

- REST Data（数据集查询）：数据服务地址 + datasetNames（数据源:数据集），例如
  https://iserver.supermap.io/iserver/services/data-world/rest/data + World:Countries
- REST Map（地图图层查询）：地图服务地址 + 图层名（图层@数据源），例如
  https://iserver.supermap.io/iserver/services/map-world/rest/maps/World + Capitals@World.1

还需要属性过滤条件时，请给出 SQL WHERE 片段。
```

## 场景 5：缺少缓冲距离

**触发条件**：请求了缓冲区分析但未提供距离。

```
请提供缓冲半径和单位：

- 步行范围：500 米 - 1 公里
- 骑行范围：2-5 公里
- 驾车范围：10-50 公里

例如「500 米」「2 公里」「1000（米）」。同时请确认端点类型（ROUND/FLAT/SQUARE），未指定时使用 ROUND。
```

## 场景 6：地图操作缺少目标参数

**触发条件**：意图为地图操作，但未提供目标坐标或缩放级别。

```
请提供地图操作参数：

1. 目标中心点：[经度, 纬度]
2. 缩放级别：10（市级）、14（街道级）
3. 或直接描述意图：「飞到北京」「放大到街道级别」
```

## 场景 7：无法识别服务 URL 类型

**触发条件**：已提供 URL，但无法判断服务类型。

```
无法从地址判断服务类型，请确认：

1. REST 地图服务：.../rest/maps/{mapName}
2. REST 数据服务：.../rest/data
3. 空间分析服务：.../restjsr/spatialanalyst
4. MVT 矢量瓦片：.../rest/maps/{mapName}/tileFeature.mvt 或 .../rest/data/datasources/{ds}/datasets/{dataset}/tileFeature.mvt
5. WMTS 服务：.../wmts100
6. WMS 服务：.../ogc/wms/{mapName}
```

## 场景 8：OGC 服务缺少图层或矩阵信息

**触发条件**：URL 为 WMTS/WMS，但未指定要加载的图层。

```
该 OGC 服务可能包含多个图层。请指定要加载的图层标识（Layer/Identifier）。

我不会默认使用第一个图层；也可以用你提供的 URL 生成调用 GetCapabilities 的代码，由页面加载后列出可用图层再选择。
```

## 场景 9：原生 4326 显示或自定义坐标系

**触发条件**：用户要求在**原生 EPSG:4326（等经纬度）**坐标系下显示，或服务为 3857/4326 之外的自定义/地方投影。注意区分：4326 服务**接受动态投影到 3857 出图**时不需要 enhance（initMap 栅格默认路径）；只有要原生 4326 渲染（`crs: maplibregl.CRS.EPSG4326`，如 mvtVectorTile_4326 示例）或自定义投影才需要 `maplibregl.CRS`。

```
该需求需要在非 Web Mercator（EPSG:3857）的原生坐标系下渲染，需要确认：

1. EPSG 代码或 WKT（如 EPSG:4326、EPSG:4547、EPSG:2362）
2. 数据范围（extent）
3. 投影参数（WKT/PROJ 字符串、比例尺 scale 等）

将按默认 maplibre-gl v6 生成：import map 把裸名 maplibre-gl 映到 enhance 6.14.0 mjs
（含 CRS 的核心超集 fork），无需退回 v5。仅当你明确要求兼容旧页面时才用 v5
（enhance 5.9.0-2 普通 script）。

补充：如果只是加载 4326 数据服务、接受动态投影成 3857 显示，则不需要 enhance，
请说明是否可以接受。

平面坐标系无法在 MapLibreGL 中直接渲染，需要先确认可行方案。
```

## 场景 10：版本信号冲突或不明确

**触发条件**：用户同时提到 ESM/import map 与普通 script 全局写法，或项目特征无法判断 maplibre-gl 版本。注意：用户**完全没提版本**时不追问，直接按默认 v6 生成。

```
检测到 v5 与 v6 的特征同时存在，请确认目标版本：

1. maplibre-gl v6（默认）：纯 ESM + import map，适用于新页面和现代打包器（vite/webpack5）
2. maplibre-gl v5：普通 <script> + window.maplibregl 全局，适用于存量页面或需要
   maplibre-gl-enhance 多坐标系支持的场景

也可以直接描述你的页面现在是怎么引入 maplibre-gl 的，我来判断。
```

## 通用补问模板

- 参数缺失

```
需要参数 `{{paramName}}` 才能继续（例如：{{example}}）。
请提供该值，或回复「使用默认值」以采用 `{{default}}`。
```

- 单位不明确

```
您提供的值是 `{{value}}`，但未指定单位。
请确认是：米 / 公里 / 度（经纬度）。
例如「500 米」或「0.5 公里」。
```

- 参数类型不符

```
参数 `{{paramName}}` 期望类型为 `{{expectedType}}`，实际收到 `{{receivedValue}}`（{{receivedType}}）。
请提供符合类型的值，例如：{{example}}。
```

- 操作确认

```
我将按以下方式执行：
- 操作：{{operation}}
- 目标图层/数据集：{{dataset}}
- 参数：{{params}}

是否确认继续？（回复「确认」或列出需要修改的项）
```
