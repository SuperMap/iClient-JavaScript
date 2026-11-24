---
name: supermap-iclient-leaflet-skills
description: 生成 SuperMap iClient for Leaflet 代码片段和完整 HTML 示例，覆盖地图加载、图层管理、数据查询、空间分析、Leaflet API 用法等场景，以及 iServer REST 服务、GeoJSON、WMTS/WMS、矢量瓦片等数据源接入。
---

# SuperMap iClient for Leaflet Skills

## 概述

本技能辅助开发者生成 SuperMap iClient for Leaflet 的代码片段和完整 HTML 文件。采用 API 与 examples 两类 SQLite 知识索引，并结合高频模板：

- **SQLite FTS5 API 索引**：完整 JSDoc API 记录检索入口，优先按类、成员或关键词查询，只返回相关记录
- **SQLite FTS5 examples 索引**：检索 Leaflet examples、include helper 与第三方插件资源配置
- **modules/**：高频场景的预构建模板，提供 Leaflet 语义下的参数说明、结果示例与可运行代码

行为规则（CDN 约束、API 选择、错误预防等）见 `prompts/system-prompt.md`。

## API 检索

API 索引查询需要 Node.js 22.5.0 或更高版本（使用内置 SQLite，无需安装 npm 依赖）：

```bash
node scripts/query-api.mjs search "缓冲区分析"
node scripts/query-api.mjs get FeatureService --member getFeaturesByBuffer
node scripts/query-api.mjs get initMap --member initMap
```

examples 与插件资源可通过以下命令检索：

```bash
node scripts/query-examples.mjs search "mapv MapVLayer"
node scripts/query-examples.mjs get examples/leaflet/mapVLayerQianxi.html
```

完整 HTML 原文以 gzip 存储在 `assets/iclient-leaflet-examples.sqlite`，命中后按需解压；不要把整个 examples 目录直接读入上下文。

完整 API JSON 大且不适合作为上下文直接读取；按类名/成员名查询，必要时缩小 `--limit`。

## 目录结构

```
skills/leaflet/
├── SKILL.md
├── assets/
│   ├── iclient-leaflet.sqlite       # SQLite FTS5 API 索引（已构建）
│   └── iclient-leaflet-examples.sqlite # SQLite FTS5 examples 与插件索引
├── metadata/
│   └── leaflet/
│       └── index.d.ts               # @types/leaflet 1.9.22
├── modules/
│   ├── core/                        # init-map.md, empty-map.md
│   ├── mapping/                     # add-geojson.md, vector-tile.md, WMTS.md, WMS.md
│   ├── services/                    # feature-service.md, query-service.md, buffer-analysis.md
│   └── utils/                       # ogc-capabilities.md
├── prompts/                         # system-prompt.md, fallback-questions.md, few-shot-examples/
├── rules/                           # intent-mapping.json, url-patterns.json, param-defaults.json,
│                                    # coordinate-system.md, error-handling.md
├── scripts/                         # API/examples 检索 CLI 和 SQLite 运行时辅助模块
└── templates/
    └── index.html                   # 最小 Leaflet HTML 模板
```

`metadata/leaflet/index.d.ts` 来自 `@types/leaflet@1.9.22`，原声明引用 `geojson` 类型；若在 TypeScript 项目中编译该文件，还需安装/提供 `@types/geojson`。该声明只覆盖 Leaflet 原生 API，不能代替 iClient 的 SQLite API 索引。

## 工作流

```text
用户请求
  ↓
识别意图（rules/intent-mapping.json）
  ↓
检索 iClient API（scripts/query-api.mjs）
  ↓
检索对应 modules/，检查坐标系和 URL 规则
  ↓
参数缺失 → 按 prompts/fallback-questions.md 补问
  ↓
生成 HTML 或代码片段，并检查 Leaflet 特有约束
```

### 各目录职责

| 场景 | 来源 | 说明 |
|------|------|------|
| 类名、方法名、参数和返回值 | SQLite FTS5 查询 CLI | iClient Leaflet API 权威来源 |
| examples 原文、include 标记和插件资源 | `assets/iclient-leaflet-examples.sqlite` | 从 examples 与 include helper 构建 |
| Leaflet 原生 API 类型 | `metadata/leaflet/index.d.ts` | 原生 `L.*` 类型；不含 `L.supermap` 扩展 |
| 高频代码模式 | `modules/` | 地图、图层、查询和缓冲分析场景 |
| 坐标、URL、错误约束 | `rules/` | 代码生成前校验 |
| CDN、API 选择和响应规范 | `prompts/system-prompt.md` | 生成行为约束 |
| HTML 骨架 | `templates/index.html` | 固定 Leaflet 1.9.4 CDN 的完整最小模板 |

## 工作时必须遵守的 Leaflet 规则

- iClient 命名空间为 `L.supermap.*`；原生 Leaflet API 为 `L.*`。
- `L.supermap.initMap` 只接受 `mapOptions` / `layerOptions` 等初始化选项，内部固定使用 `L.map('map', ...)`；页面必须提供 `<div id="map">`。
- `initMap` 返回 Promise `{ map, layer }`；Leaflet 不使用 MapboxGL 的 `map.on('load')` 作为添加图层前置条件。
- Leaflet 坐标顺序为 `[lat, lng]`；GeoJSON 标准坐标为 `[lng, lat]`。
- `L.geoJSON(data, options).addTo(map)` 用于 GeoJSON；不要生成 `addSource` / `addLayer`。
- WMS 使用 `L.TileLayer.WMS`，WMTS 使用 `L.supermap.WMTSLayer`。
- 查询地图图层使用 `QueryService` + `/rest/maps/`；查询数据集使用 `FeatureService` + `/rest/data`。
- 所有叠加瓦片必须与地图 CRS / resolutions 匹配。

## 限制与指南

### modules 的范围

- **包含**：地图初始化、空白地图、GeoJSON、矢量瓦片、WMTS/WMS、REST Map/Data 查询、缓冲区分析、Capabilities 检查
- **不包含**：所有低频专题图、网络分析、复杂空间叠加/插值分析等；使用 API 检索 CLI 查明接口后按需生成

### 模块新增标准

- 高频且稳定的业务模式，或补齐核心工作流缺口
- 示例需基于 `src/leaflet/**` 与 `examples/leaflet/**` 的真实 API
- MapboxGL / MapLibreGL API 不能机械替换为 Leaflet；需按 Leaflet 事件、坐标、图层模型重写

### 开发原则

- **API 索引优先**：模块未覆盖的接口用 `node scripts/query-api.mjs get <ClassName> --member <method>` 查证。
- **Leaflet 类型辅助**：原生方法查 `metadata/leaflet/index.d.ts`；iClient 扩展仍以 SQLite API 记录为准。
- **只描述 Leaflet 支持的行为**：不要生成 `map.on('load')`、`addSource`、`addLayer`、MapboxGL 样式 JSON 或 bbox 占位符。
- **错误显式处理**：异步服务调用应为 Promise 增加 `.catch()` 或使用 `try/catch`，不要吞掉请求错误。
- **CDN 固定版本**：Leaflet 核心固定 `1.9.4`；iClient 使用 `dist/leaflet/iclient-leaflet-es6.min.js` 与配套 CSS。
