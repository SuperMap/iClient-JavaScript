# 版本路由规则（maplibre-gl v5 / v6）

本技能同时支持 **maplibre-gl v5**（旧技术栈）与 **v6**（纯 ESM 新技术栈）两套路。生成任何代码前，先按本文件判定版本并在回复开头用一句话说明所选版本（例如"按 maplibre-gl v6 生成"）。

## 1. 默认版本：v6

**用户没有明确说版本时，一律按 v6 生成。** 不要因为用户页面里出现普通 `<script>` 标签就默认 v5——v6 也有桥接写法（组合③）。

## 2. 版本判定信号

| 信号 | 判定 |
|---|---|
| 未提版本 / "最新版" / 提到 ESM、`type="module"`、import map、npm + vite/webpack5 | **v6** |
| 明确说 v5、5.6、旧版、老项目；页面已引 `iclient-maplibregl-es6.min.js` 或 `iclient-maplibregl.js` 普通脚本并使用 `window.maplibregl`；要求不能改现有非 module 页面 | v5 |
| 页面必须继续用普通 `<script>` 且无法改成 module，但核心要用 v6 | v6 组合③（ESM 桥接） |
| 需要原生 EPSG:4326 等经纬度显示（`CRS.EPSG4326`）或 3857/4326 之外的自定义投影（maplibre-gl-enhance） | **仍默认 v6**：import map 改映到 enhance v6 mjs（见第 6 节）；v5 仅在用户明确要求时使用 |
| 使用 `L7Layer`（L7 3D 弧线/飞线/热力图等） | **仍默认 v6**：核心固定映 enhance v6 mjs + render 桥接（见第 5 节 L7 小节），L7 用 enhance 与坐标系无关 |
| npm 项目且 `maplibre-gl@5` 锁版本 | v5；`maplibre-gl@6` 或新装 | v6 |

信号冲突或无法判断时，按 [fallback-questions.md](../prompts/fallback-questions.md) 场景 10 补问，不要自行假设。

## 3. 两版差异矩阵

| 维度 | v5（旧） | v6（新，默认） |
|---|---|---|
| 核心版本 | maplibre-gl 5.6.0（UMD，有全局） | maplibre-gl 6.14.0（纯 ESM，无 UMD/全局） |
| iClient 页面产物 | `iclient-maplibregl-es6.min.js`（IIFE）或 `iclient-maplibregl.js`（UMD），普通 `<script>` | `iclient-maplibregl.mjs`，`<script type="module">` 经 **import map** 引入 |
| 核心加载 | `<script src=".../maplibre-gl.js">` | import map 把裸名 `maplibre-gl` 映到 `maplibre-gl.mjs` |
| iClient 业务类用法 | 全局 `maplibregl.supermap.FeatureService` 等 | **具名导入** `import { FeatureService } from '.../iclient-maplibregl.mjs'` |
| 核心 API | 全局 `maplibregl.Map` / `new maplibregl.Popup()` | `import * as maplibregl from 'maplibre-gl'` 后 `maplibregl.Map`（**禁止默认导入**，v6 无 default） |
| `window.maplibregl` | 存在 | 不存在（组合③桥接除外） |
| 多坐标系 enhance | maplibre-gl-enhance 5.9.0-2（普通 script，可用） | maplibre-gl-enhance 6.14.0 ESM fork，**import map 直接映 `maplibre-gl` 到 enhance.mjs**（类型已就位；mjs/css/worker 已部署 200，.mjs 暂缺 Content-Type 待服务端配置） |
| L7 渲染库（用 L7Layer 时必加载，iClient 不内置） | `maplibregl-l7-render/0.0.4/maplibregl-l7-render.js` 普通 script，注册全局 `L7`，顺序在 enhance 之后、iClient 之前（L7 核心固定用 enhance） | `maplibregl-l7-render/1.0.0/maplibregl-l7-render.mjs`（ESM，CDN 按约定待发布）；import map 加一条 render 裸名映射、**`maplibre-gl` 改映 enhance 6.14.0 mjs**，业务 module 再做 `window.L7 = L7Render` 两行桥接（iClient mjs 用懒 Proxy 读 window.L7，非静态 module external），详见 [modules/mapping/l7-layer.md](../modules/mapping/l7-layer.md) |
| worker | UMD 按脚本地址自动定位 | CDN/同目录自托管在 http(s) 下自动；打包后按工具链可能要 `setWorkerUrl()` |
| 打开方式 | http(s) 或 file:// 均可 | **必须 http(s)**，file:// 下模块 worker 被拦 |
| iClient 业务 API（类名、方法、参数、返回结构） | —— | **两版完全一致**，差异只在加载方式与导入写法 |

v5 是最后一个提供 UMD 的大版本。v5/v6 完整背景见仓库根目录 `maplibre-v6-upgrade-summary.md`。

## 4. 代码转换表（v6 为默认；v5 为还原方向）

**modules/ 中所有代码默认已是 v6 形态（无前缀具名调用），直接复制即可。** 业务类**类名与调用方式两版一致**，只换引入方式；仅当用户明确要 v5 时才反向还原前缀：

```js
// v5（普通 script 之后）
var svc = new maplibregl.supermap.FeatureService(url);
new maplibregl.supermap.FGBLayer({...});
maplibregl.supermap.initMap(url, opts);
```

```js
// v6（module 脚本，import map 之后）
import * as maplibregl from 'maplibre-gl';
import { FeatureService, FGBLayer, initMap } from 'https://iclient.supermap.io/dist/maplibregl/iclient-maplibregl.mjs';

const svc = new FeatureService(url);
new FGBLayer({...});
initMap(url, opts);
```

规则：

1. 默认 v6：业务类（参数类/枚举/initMap/FGBLayer 等）在 iClient mjs 的 import 列表中具名引入，代码中**不带** `maplibregl.supermap.` 前缀。还原 v5 时才加回该前缀并用普通 script。
2. `maplibregl.Map`、`maplibregl.Popup`、`maplibregl.NavigationControl` 等**核心原生 API** → v6 为 `import * as maplibregl from 'maplibre-gl'`，v5 为全局 `maplibregl`，调用写法两版相同。
3. **别名差异**：v5 的 `maplibregl.supermap.LogoControl` 在 v6 mjs 中只导出为 **`Logo`**（`import { Logo } ... new Logo()`）。v5 的 `LogoControl` 与 `Logo` 指向同一个类。
4. modules 文档中残留的 v5 全局写法只可能出现在明确标注"v5"的对照/表格里；无标注的代码块一律按 v6 直接复制，不要再做转换，也不要自行加回前缀。
5. 禁止 `import maplibregl from 'maplibre-gl'`（v6 无 default，得到 undefined）。

## 5. 三种已核实的页面加载组合

地址与版本号以 [param-defaults.json](param-defaults.json) 的 `cdns` 段为唯一数据源，不在代码中臆造。

- **组合①（v5）**：v5 核心普通 script + `iclient-maplibregl-es6.min.js`，模板 [templates/v5/index.html](../templates/v5/index.html)。
- **组合②（v6，默认推荐）**：import map + `<script type="module">`，核心 `import * as`、iClient 具名导入，模板 [templates/v6/index.html](../templates/v6/index.html)。import map 必须在所有 module 脚本之前；页面自身的 `import 'maplibre-gl'` 与 iClient 内部裸名经同一映射指向同一模块实例（单例）。
- **组合③（v6 桥接，页面无法改 module 时）**：先在 module 中 `import * as ns` 核心，`window.maplibregl = { ...ns }`（**必须复制为可变对象**，不能直接赋只读命名空间），再串行加载 UMD 版 `iclient-maplibregl.js`，之后沿用 `maplibregl.supermap.*`。

**可选可视化库（L7）**：使用 `L7Layer`（3D 弧线/飞线/L7 热力图等）时，iClient 两种产物都不内置 L7，必须按版本额外加载 maplibregl-l7-render（地址以 param-defaults.json `cdns.*.l7Render` 为准）。**L7 页面核心固定用 enhance**——fork 版 render 每帧调 `map.getCRS()`，普通核心没有该方法，这与底图坐标系无关，是第 6 节三分法的固定例外：

- v5：enhance 5.9.0-2 script → 0.0.4 render 普通 script（注册全局 `L7`，运行时读全局）→ iClient script，顺序固定。
- v6（12.2.0 起构建的 iClient mjs）：iClient mjs **不静态 import** render——`./L7/l7-render` 是懒读 `globalThis.L7` 的 var external Proxy，真正 `new L7Layer` 时才穿透。页面三步：① import map 把 `maplibre-gl` 映到 **enhance 6.14.0 mjs**（替换核心映射，不是新增），并加 `"maplibregl-l7-render": ".../1.0.0/maplibregl-l7-render.mjs"`；② 业务 module 中 `import * as L7Render from 'maplibregl-l7-render';` 后 `window.L7 = L7Render;`（import 提升先求值，赋值早于 map load 业务代码）；③ 照常具名导入 `L7Layer`。不使用 L7 的页面零配置：import map 只映核心、不请求 render。完整写法见 [modules/mapping/l7-layer.md](../modules/mapping/l7-layer.md)。

npm + 打包器：核心单独安装（peerDependency），`import * as maplibregl from 'maplibre-gl'` + `import { ... } from '@supermapgis/iclient-maplibregl'`；webpack4 需用户项目侧 alias/babel/worker 配置（见 `maplibre-v6-upgrade-summary.md` 第四节，技能不主动展开，除非用户明确在用 webpack4）。

## 6. 多坐标系 / maplibre-gl-enhance

三分法（与 v5/v6 无关，详见 [coordinate-system.md](coordinate-system.md)）：

1. EPSG:3857 → 不需要 enhance；
2. EPSG:4326 服务、接受 iServer **动态投影到 3857** 出图（initMap 栅格默认路径，要求服务 `dynamicProjection:true`）→ 不需要 enhance，但地图实际按 3857 渲染；
3. 需要**原生 4326**（`crs: maplibregl.CRS.EPSG4326` 等经纬度显示，如 `mvtVectorTile_4326.html`、`01_tiledMapLayer_4326.html`、graticule/draw 4326 等示例）或 3857/4326 之外的自定义投影 → **需要 enhance**。

**固定例外：使用 `L7Layer` 时一律配 enhance**（即使底图是 3857）——fork 版 maplibregl-l7-render 每帧调 `map.getCRS()`，普通核心无此方法（运行时报 `getCRS is not a function`，L7 场景不出图）。仓库全部 l7 示例均为 `include="L7,maplibre-gl-enhance"`（提交 adb7137a7）。

- v5：enhance 5.9.0-2 普通 script（与核心二选一加载，enhance 是核心的超集 fork），提供 `maplibregl.CRS`（EPSG4326/EPSG3857 常量与 `new CRS(name, wkt, extent)`）。
- v6：**自定义投影默认仍生成 v6，不退回 v5。** enhance v6（6.14.0）同样是核心超集 fork，ESM 形态，类型已就位（`metadata/maplibre-gl-enhance-v6/index.d.ts`，导出全部核心 API + 命名导出 `CRS`）。集成方式是 **import map 把裸名 `maplibre-gl` 直接映到 enhance.mjs**（不是额外再加一个模块映射），页面与 iClient 内部拿到同一命名空间，`maplibregl.CRS` 即可用：

```html
<link rel="stylesheet" href="https://iclient.supermap.io/web/libs/maplibre-gl-js-enhance/6.14.0/maplibre-gl-enhance.css">
<script type="importmap">
{ "imports": {
  "maplibre-gl": "https://iclient.supermap.io/web/libs/maplibre-gl-js-enhance/6.14.0/maplibre-gl-enhance.mjs"
} }
</script>
<script type="module">
  import * as maplibregl from 'maplibre-gl';   // 超集：Map/NavigationControl + CRS
  import { initMap } from 'https://iclient.supermap.io/dist/maplibregl/iclient-maplibregl.mjs';
  // maplibregl.CRS.EPSG4326 / new maplibregl.CRS('EPSG:4547', wkt, extent)
</script>
```

  - 不需要 CRS 的普通页面不要引 enhance，import map 仍映到核心 CDN mjs（见组合②）；**L7 页面例外**（见第 5 节 L7 小节），核心必须映 enhance。
  - URL/版本号以 [param-defaults.json](param-defaults.json) `cdns.v6.enhance` 为准（2026-11-25 核实已部署 200；.mjs 响应暂缺 Content-Type，浏览器严格 MIME 检查会拦截，需服务端配置 text/javascript；未修复时回复中注明可换本地/自托管同目录 mjs，worker/css 保持相邻）。
- **initMap 的精确拦截条件**（源码 `src/maplibregl/mapping/InitMap.js`）：`epsgCode !== 3857 && !dynamicProjection && !maplibregl.CRS` 三者同时成立才 reject。即非 3857 服务在**服务端关闭动态投影**（`dynamicProjection:false`）且无 enhance 时才报 "needs to include maplibre-gl-enhance.js"。公共示例 map-world/World 就是 4326 且关闭动态投影的特例；遇到时优先方案就是上面的 v6 + enhance import map，**不要因此降级到 v5**，除非用户明确要求 v5。

## 7. v6 易错点清单

- import map 缺失或拼写错误 → `Failed to resolve module specifier "maplibre-gl"`。
- 默认导入核心 → 得到 `undefined`，`new maplibregl.Map()` 抛错；一律 `import * as`。
- 把 ESM 命名空间直接赋给 `window.maplibregl` → 严格模式 TypeError（只读）；组合③必须 `{ ...ns }` 复制。
- file:// 双击打开 → module worker 被拦；改用 http(s) 静态服务。
- v6 worker 独立文件：映到 CDN 或核心/worker 同目录自托管时 http(s) 下无需手动设置；单独挪动 worker 或打包后探测失效时，在创建 Map 前 `maplibregl.setWorkerUrl(new URL('maplibre-gl-worker.mjs', location.href).href)`。
- CSP：`worker-src 'self' blob:`、`img-src data: blob: 'self'`。
- 用 `L7Layer` 时 v6 报 `Failed to resolve module specifier "maplibregl-l7-render"`：业务 module import 了 render 但 import map 缺该裸名（iClient mjs 本身不静态依赖它，见第 5 节）；报 `L7.LineLayer is not a constructor`：缺 `window.L7 = L7Render` 桥接；报 `map.getCRS is not a function`：核心仍映普通核心，需改映 enhance 6.14.0 mjs。v5 报 `L7.LineLayer is not a constructor`：0.0.4 普通 script 缺失或顺序不对。详见 [modules/mapping/l7-layer.md](../modules/mapping/l7-layer.md) 与 [error-handling.md](error-handling.md) 第 7 节。
- v6 行为回归（如用户代码涉及再提示）：事件判断用 `type` 而非 `instanceof`；`styleimagemissing` 回调内不能再 `addImage`，改用 `setMissingStyleImageResolver`。

## 8. 元数据检索路由

| 数据 | v5 | v6 |
|---|---|---|
| iClient 业务 API | sqlite CLI（两版通用，不区分） | 同左 |
| 核心原生 API 签名 | `metadata/maplibre-gl-enhance/index.d.ts`（片段检索） | `metadata/maplibre-gl-v6/index.d.ts`（片段检索） |
| 样式规范 | `metadata/maplibre-gl-enhance/style-spec.json` | 同左（v8 样式规范两版一致；有疑义以 v6 d.ts 为准） |
| 多坐标系 CRS | `metadata/maplibre-gl-enhance/index.d.ts`（5.9.0-2）+ examples | `metadata/maplibre-gl-enhance-v6/index.d.ts`（enhance 6.14.0，含 CRS 类） |
| enhance 其他扩展 | `metadata/maplibre-gl-enhance/index.d.ts` | `metadata/maplibre-gl-enhance-v6/index.d.ts`（自包含，含核心与 CRS，按需片段检索） |
