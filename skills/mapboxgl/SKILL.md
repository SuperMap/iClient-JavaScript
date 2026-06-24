---
name: supermap-iclient-mapboxgl-skills
description: 生成 SuperMap iClient for MapboxGL 代码片段和完整 HTML 示例，覆盖地图加载、图层管理、数据查询、空间分析、MapboxGL API 用法等场景，以及 iServer REST 服务、GeoJSON、WMTS/WMS、矢量瓦片等数据源接入。
---

# SuperMap iClient for MapboxGL Skills

## 概述

本技能辅助开发者生成 SuperMap iClient for MapboxGL 的代码片段和完整 HTML 文件。采用两层策略：

- **metadata/**：完整 JSDoc JSON 元数据，优先查阅，用于 API 精确查询（参数名、类型、返回值结构等）
- **modules/**：高频场景的预构建模板，作为补充，提供参数说明、返回结果示例、完整可运行代码

行为规则（CDN 约束、API 选择、错误预防等）见 `prompts/system-prompt.md`。

## 目录结构

```
skills/
├── templates/        index.html
├── modules/
│   ├── core/         init-map.md, empty-map.md
│   ├── mapping/      add-geojson.md, vector-tile.md, WMTS.md, WMS.md
│   ├── services/     feature-service.md, query-service.md, buffer-analysis.md
│   └── utils/        ogc-capabilities.md, rest-data-vector.md
├── metadata/
│   ├── iclient-mapboxgl/   # SDK API（JSDoc JSON）
│   └── mapbox-gl-enhance/  # 原生 API + enhance 扩展（index.d.ts, style-spec.json）
├── rules/            intent-mapping.json, url-patterns.json, param-defaults.json,
│                     coordinate-system.md, error-handling.md
└── prompts/          system-prompt.md, fallback-questions.md, few-shot-examples/
```

## 工作流

```
用户请求
  ↓
识别意图（关键词 → rules/intent-mapping.json）
  ↓
优先从 metadata/iclient-mapboxgl/ 检索 API
  ↓
检索成功 → 使用 metadata 参数定义，从 modules/ 获取代码示例
检索失败 → 尝试 modules/ 中是否有相似模板
  ↓
参数缺失 → 用 prompts/fallback-questions.md 补问
  ↓
生成完整 HTML / 代码片段
```

### 各目录职责

| 场景                           | 来源                      | 说明                                         |
| ------------------------------ | ------------------------- | -------------------------------------------- |
| 参数名、参数类型、返回值结构   | `metadata/`               | JSDoc 是权威来源                             |
| 代码示例、模板、最佳实践       | `modules/`                | 补充说明，提供完整可运行示例                 |
| 业务规则、叠加要求、坐标系说明 | `rules/`                  | 校验和约束条件                               |
| URL 格式校验                   | `rules/url-patterns.json` | 不依赖 JSDoc（JSDoc 中 URL 类型仅为 string） |
| CDN、API 选择、错误预防        | `prompts/system-prompt.md`| AI 行为规则，权威约束来源                    |

## 限制与指南

### modules 仅包含高频模式

- ✅ **包含**：地图初始化、GeoJSON/矢量瓦片/WMTS/WMS 图层、SQL/几何/缓冲区查询、缓冲区分析
- ❌ **不包含**：叠加分析、插值分析、量算、网络分析等 — 通过 metadata 检索对应 API

### 模块新增标准

仅在满足以下条件时才添加新模块：

- **频率**：多次用户请求表明为高频需求
- **明确性**：存在稳定且清晰的最佳实践，变体少
- **互补性**：填补核心工作流缺口（非小众场景）

### 开发原则

- **以元数据为权威**：模块未覆盖的 API 一律从 metadata 检索并校验
- **可伸缩设计**：避免穷举式枚举，优先自助式元数据查询
- **可组合性**：modules 提供通用模式，metadata 提供精确细节
