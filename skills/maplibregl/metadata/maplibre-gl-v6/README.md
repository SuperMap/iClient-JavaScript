# maplibre-gl v6 原生 API 类型定义

`index.d.ts` 复制自仓库 `node_modules/maplibre-gl/dist/maplibre-gl.d.ts`（maplibre-gl **6.14.0**）。

- 用途：生成 **v6** 代码时，按需（关键词定位、只读所需片段）核实核心原生 API（Map、Source、Layer、Control、事件、setWorkerUrl 等）的签名与类型。
- 样式规范仍使用 `../maplibre-gl-enhance/style-spec.json`（v8 样式规范两版一致）；有疑义以本文件为准。
- 多坐标系（`CRS`）类型不属于核心 v6，由 ESM 版 maplibre-gl-enhance 6.14.0 mjs 提供，类型已在 `../maplibre-gl-enhance-v6/index.d.ts` 补充就位。
- 升级核心版本时，用 `node_modules/maplibre-gl/dist/maplibre-gl.d.ts` 重新覆盖本文件。
