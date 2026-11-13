---
name: supermap-iclient-mapboxgl-skills
description: 生成 SuperMap iClient for MapboxGL 代码片段和完整 HTML 示例，覆盖地图加载、图层管理、数据查询、空间分析、MapboxGL API 用法等场景，以及 iServer REST 服务、GeoJSON、WMTS/WMS、矢量瓦片等数据源接入。
---

# SuperMap iClient for MapboxGL Skills

## 概述

本技能辅助开发者生成 SuperMap iClient for MapboxGL 的代码片段和完整 HTML 文件。采用两层策略：

- **SQLite FTS5 API 索引**：完整 JSDoc API 记录的检索入口，优先按类、成员或关键词查询，只返回相关记录
- **modules/**：高频场景的预构建模板，作为补充，提供参数说明、返回结果示例、完整可运行代码

行为规则（CDN 约束、API 选择、错误预防等）见 `prompts/system-prompt.md`。

## API 检索

查询和索引构建需要 Node.js 22.5.0 或更高版本（使用内置 SQLite，无需安装 npm 依赖）：

```bash
node scripts/query-api.mjs search "热力图专题图"
node scripts/query-api.mjs get HeatMapLayer --member addFeatures
```

## 目录结构

```
skills/
├── templates/        index.html
├── modules/
│   ├── core/         init-map.md, empty-map.md
│   ├── mapping/      add-geojson.md, vector-tile.md, WMTS.md, WMS.md
│   ├── services/     feature-service.md, query-service.md, buffer-analysis.md
│   └── utils/        ogc-capabilities.md, rest-data-vector.md
├── assets/
│   └── iclient-mapboxgl.sqlite  # SQLite FTS5 API 索引
├── scripts/
│   ├── api-index-utils.mjs # 检索运行时辅助模块
│   └── query-api.mjs       # API 检索 CLI
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
调用 CLI 检索 API
  ↓
检索成功 → 使用返回的 JSDoc API 记录，从 modules/ 获取代码示例
检索失败 → 尝试 modules/ 中是否有相似模板
  ↓
参数缺失 → 用 prompts/fallback-questions.md 补问
  ↓
生成完整 HTML / 代码片段
```

### 各目录职责

| 场景                           | 来源                      | 说明                                         |
| ------------------------------ | ------------------------- | -------------------------------------------- |
| 参数名、参数类型、返回值结构   | SQLite FTS5 检索 CLI       | 按类/成员返回 API 记录                       |
| 代码示例、模板、最佳实践       | `modules/`                | 补充说明，提供完整可运行示例                 |
| 业务规则、叠加要求、坐标系说明 | `rules/`                  | 校验和约束条件                               |
| URL 格式校验                   | `rules/url-patterns.json` | URL 格式由规则定义，API 类型信息可能仅为 string |
| CDN、API 选择、错误预防        | `prompts/system-prompt.md`| AI 行为规则，权威约束来源                    |

## 限制与指南

### modules 仅包含高频模式

- ✅ **包含**：地图初始化、GeoJSON/矢量瓦片/WMTS/WMS 图层、SQL/几何/缓冲区查询、缓冲区分析
- ❌ **不包含**：叠加分析、插值分析、量算、网络分析等 — 通过 API 检索 CLI 查询对应 API

### 模块新增标准

仅在满足以下条件时才添加新模块：

- **频率**：多次用户请求表明为高频需求
- **明确性**：存在稳定且清晰的最佳实践，变体少
- **互补性**：填补核心工作流缺口（非小众场景）

### 开发原则

- **以 API 索引为准**：模块未覆盖的 API 一律通过 API 检索 CLI 查询并校验
- **API 检索**：使用 `node scripts/query-api.mjs search "<关键词>"` 或 `get <类名> --member <成员名>`；不要把完整 API JSON 文件读入上下文
- **可伸缩设计**：避免穷举式枚举，优先使用 API 检索 CLI
- **可组合性**：modules 提供通用模式，SQLite FTS5 索引提供精确细节
