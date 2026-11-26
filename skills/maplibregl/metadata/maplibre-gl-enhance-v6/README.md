# maplibre-gl-enhance v6 类型定义

`index.d.ts` 复制自 `E:/Work/Code/iClient_Project/maplibre-gl-js-enhance/dist/maplibre-gl-enhance.d.ts`（maplibre-gl-enhance **6.14.0**，dts-bundle 自包含产物，无相对路径 import）。

- 用途：生成 **v6** 代码且涉及 enhance 扩展能力时按需检索——多坐标系（`CRS` 类、`CRS.EPSG4326/EPSG3857`、`new CRS(epsgCode, wktOrExtent, extent)`）、`rasterSource: 'iserver'` 等。核心原生 API 仍查 `../maplibre-gl-v6/index.d.ts`。
- v5 的 enhance 类型在 `../maplibre-gl-enhance/index.d.ts`（5.9.0-2），两目录并存，按 `rules/version-routing.md` 的版本判定取用。
- 同目录源工程 dist 里还有一份 `maplibre-gl.d.ts`（约 4 万行，core 风格中间产物，未被 package.json 的 `types` 引用），不需要拷贝。
- **运行时用法**：该包是核心超集 fork（含全部核心 API + 命名导出 `CRS`）。v6 页面需要原生 4326/自定义投影时，**import map 直接把裸名 `maplibre-gl` 映到 `dist/maplibre-gl-enhance.mjs`**（替换核心 mjs，不是新增映射），页面与 iClient 内部即共享带 `CRS` 的同一命名空间；不需要 CRS 的页面仍映核心 mjs（**L7 页面例外**：用 `L7Layer` 时即使底图是 3857 也映 enhance，render 每帧调 `map.getCRS()`，见 `modules/mapping/l7-layer.md`）。CDN 路径为 `https://iclient.supermap.io/web/libs/maplibre-gl-js-enhance/6.14.0/maplibre-gl-enhance.mjs`（2026-11-25 核实 mjs/css/同目录 worker 均已部署、HTTP 200；但 .mjs 响应暂缺 Content-Type，浏览器会按严格 MIME 检查拦截，需服务端配置 text/javascript，未修复前可换自托管同目录 mjs）。规则见 `rules/coordinate-system.md`，**默认生成 v6，不降级 v5**。
- 升级 enhance 版本时，用源工程 `dist/maplibre-gl-enhance.d.ts` 重新覆盖 `index.d.ts`。
