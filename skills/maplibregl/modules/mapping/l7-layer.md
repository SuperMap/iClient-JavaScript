---
name: l7Layer
description: 叠加 @antv/L7 可视化图层（L7Layer）——重点是 3D 弧线/飞线（LineLayer 的 arc3d），含 maplibregl-l7-render 可选依赖的 v5/v6 加载方式。
---

# L7 可视化图层（3D 弧线 / 飞线）

> **版本与导入约定（先读）**：用户未指定 maplibre-gl 版本时默认 **v6**。本文业务代码默认 v6 具名导入写法；仅用户明确要 v5 时按 [version-routing.md](../../rules/version-routing.md) 第 4 节还原为 `maplibregl.supermap.L7Layer` 全局写法，图层链式调用两版完全一致。

iClient 的 `L7Layer` 是 @antv/L7 图层与 MapLibre 地图之间的桥接：用 `map.addLayer()` 管理生命周期，用 `getL7Layer()` 拿到原生 L7 图层后按 L7 官方 API 链式配置（source/size/shape/color/style/animate）。图层类型与配置项见 L7 官方文档（<https://l7.antv.antgroup.com/>），仓库示例见 `examples/maplibregl/l7_*.html`。

## 0. 必须先加载 maplibregl-l7-render（iClient 不内置 L7）

iClient 产物（v5 的 js 与 v6 的 mjs）**不打包 L7 渲染库**。地址/版本以 [param-defaults.json](../../rules/param-defaults.json) 的 `cdns` 段为准，禁止使用仅供官方示例页的 `include-maplibregl.js`。

**v6（默认）——L7 页面核心固定映到 enhance，import map 两条映射 + 业务 module 两行桥接：**

```html
<link rel="stylesheet" href="https://iclient.supermap.io/web/libs/maplibre-gl-js-enhance/6.14.0/maplibre-gl-enhance.css">
<script type="importmap">
{ "imports": {
  "maplibre-gl": "https://iclient.supermap.io/web/libs/maplibre-gl-js-enhance/6.14.0/maplibre-gl-enhance.mjs",
  "maplibregl-l7-render": "https://iclient.supermap.io/web/libs/maplibregl-l7-render/1.0.0/maplibregl-l7-render.mjs"
} }
</script>
<script type="module">
  import * as maplibregl from 'maplibre-gl';
  import * as L7Render from 'maplibregl-l7-render';
  import { L7Layer } from 'https://iclient.supermap.io/dist/maplibregl/iclient-maplibregl.mjs';
  window.L7 = L7Render; // iClient mjs 以懒读 window.L7 的 Proxy 取 render，真正 new L7Layer 时才穿透读取
</script>
```

- **L7 场景无条件使用 enhance，与底图坐标系无关**：fork 版 render 每帧经 `map.getCRS()` 取坐标系参数，普通 maplibre-gl 核心没有该方法（运行时 `getCRS is not a function`，L7 场景出不了图）；enhance 是核心超集 fork，直接把 `maplibre-gl` 映到 enhance 6.14.0 mjs 即可。这是 [coordinate-system.md](../../rules/coordinate-system.md) enhance 三分法之外的固定例外。仓库 67 个 l7 示例也一律 `include="L7,maplibre-gl-enhance"`（提交 adb7137a7）。
- iClient mjs（12.2.0 起构建）**不静态 import render**：`./L7/l7-render` 是一个懒读 `globalThis.L7` 的 var external Proxy，求值阶段不读全局，`new L7Layer` 时才穿透。因此 import map 的 `maplibregl-l7-render` 映射服务于**业务 module 自己的 import**，且必须在业务代码前完成 `window.L7 = L7Render` 桥接（import 提升先于语句求值，赋值在 map load 回调之前完成，时序可靠）；不挂 window 会报 `L7.LineLayer is not a constructor`。
- render mjs 内部同样裸名 `import 'maplibre-gl'`，与页面、iClient 经同一 import map 拿到**同一个含 CRS 的 enhance 模块实例**。
- 不用 L7 的页面不加 render 映射、不下载 render，基础导入不受影响；import map 缺 render 映射时，业务 module 的裸名 import 会在页面加载阶段报 `Failed to resolve module specifier "maplibregl-l7-render"`。
- render 1.x ESM 会把只读的 maplibre-gl 模块命名空间挂到 `window.maplibregl`，iClient 已用 `Object.isExtensible` 守卫跳过向只读对象挂 `supermap`（`src/maplibregl/namespace.js`），无需页面处理。
- 1.0.0 mjs 为待发布 CDN 地址（2026-11-25 核实仍 404）；生成时若仍 404，回复中注明可换自托管同目录 mjs，不因此降级 v5。enhance v6 mjs 同样已部署 200 但暂缺 Content-Type（见 [param-defaults.json](../../rules/param-defaults.json) `cdns.v6.enhance`），浏览器拦截时换自托管。
- 注意：1.0.0 mjs 发布前需完成 v6 适配——20261015 版 fork 代码（= CDN 0.0.4 同源）曾读 `map.transform.height/width`（v6 已移除该内部属性）；20261124 版实测在普通核心下相机回调抛 `map.getCRS is not a function`（映到 enhance 即提供该方法）。见 [DIRECTORY.md](../../DIRECTORY.md) 待办。

**v5——普通 script，顺序固定为 enhance → render → iClient（L7 场景核心固定用 enhance，不用普通核心）：**

```html
<script src="https://iclient.supermap.io/web/libs/maplibre-gl-js-enhance/5.9.0-2/maplibre-gl-enhance.js"></script>
<script src="https://iclient.supermap.io/web/libs/maplibregl-l7-render/0.0.4/maplibregl-l7-render.js"></script>
<script src="https://iclient.supermap.io/dist/maplibregl/iclient-maplibregl-es6.min.js"></script>
```

0.0.4 UMD 注册的全局名是 `L7`（依赖全局 `maplibregl`，所以不能放在 enhance 之前）。v5 场景 L7 同样无条件用 enhance——render 运行时调 `map.getCRS()`，普通 5.6.0 核心没有该方法。

## 1. 3D 弧线（arc3d）

弧线数据是**起终点对（OD）**，不是 LineString 坐标串。仓库示例数据 `https://iclient.supermap.io/web/data/L7/UEXQMifxtkQlYfChpPwT.txt` 为带表头 CSV，字段 `lng1,lat1,lng2,lat2,...`。

3D 效果依赖地图倾角：`new maplibregl.Map({ pitch: 58, ... })`，在 `map.on('load')` 内添加图层。

```javascript
// v6：L7Layer 已从 iclient-maplibregl.mjs 具名导入
map.on('load', function () {
  fetch('https://iclient.supermap.io/web/data/L7/UEXQMifxtkQlYfChpPwT.txt')
    .then((res) => res.text())
    .then((data) => {
      const layer = new L7Layer({ type: 'LineLayer' });
      layer
        .getL7Layer()
        .source(data, {
          parser: { type: 'csv', x: 'lng1', y: 'lat1', x1: 'lng2', y1: 'lat2' }
        })
        .size(1)
        .shape('arc3d')
        .color('#FF7C6A')
        .style({
          opacity: 0.8,
          sourceColor: '#ff0000',
          targetColor: '#6F19FF'
        });
      map.addLayer(layer);
    });
});
// v5 仅把 new L7Layer(...) 换成 new maplibregl.supermap.L7Layer(...)
```

内联数据用 JSON 数组 + `parser: { type: 'json', x: 'lng1', y: 'lat1', x1: 'lng2', y1: 'lat2' }`，字段映射规则相同；CSV/JSON 的经纬度均为 WGS84。

## 2. 飞线动画

`shape('arc3d')` 后接 `.animate({ interval, trailLength, duration })`，图层构造加 `options: { blend: 'normal' }`（暗色底图可用 `'additive'` 发光叠加）：

```javascript
const layer = new L7Layer({ type: 'LineLayer', options: { blend: 'normal' } });
layer
  .getL7Layer()
  .source(data, {
    parser: {
      type: 'csv',
      x: 'start station longitude',
      y: 'start station latitude',
      x1: 'end station longitude',
      y1: 'end station latitude'
    }
  })
  .size(2)
  .shape('arc3d')
  .color('#0C47BF')
  .animate({ interval: 0.5, trailLength: 0.5, duration: 5 })
  .style({ opacity: 0.5 });
map.addLayer(layer);
```

动画期间 L7Layer 内部持续 `map.triggerRepaint()`，无需额外处理（见 `examples/maplibregl/l7_line_arc3d_animation.html`）。

## 3. 线型选择与其他 L7 图层

| shape | 效果 | 参考示例 |
|---|---|---|
| `arc3d` | 3D 立体弧线（需 pitch） | l7_line_arc3d.html、l7_line_arc3d_animation.html |
| `arc` | 2D 平面弧线 | l7_line_arc.html |
| `greatcircle` | 大圆弧线（长距离/跨国航线） | l7_large_circular_arc.html |

`L7Layer` 的 `type` 可取任意 L7 图层类名（`PointLayer`、`HeatMapLayer`、`PolygonLayer` 等），配置方式相同：`new L7Layer({ type })` 后 `getL7Layer()` 链式调用。具体图层参数查 L7 官方文档，并用 `examples/maplibregl/l7_*.html`（l7_heatmap3D、l7_3d_column、l7_cluster 等）核实写法；不要凭空臆造 shape/style 名。

## 4. 关键要点与易错点

- **两版 L7 页面都固定用 enhance 核心**（与底图是否 3857 无关，render 每帧调 `map.getCRS()`）：v6 import map 把 `maplibre-gl` 映到 enhance 6.14.0 mjs 并加 `maplibregl-l7-render` 映射，业务 module 加 `import * as L7Render ...; window.L7 = L7Render` 两行桥接；v5 固定 enhance 5.9.0-2 → render 0.0.4 → iClient 三个普通 script 顺序。
- `source()` 数据必须在 `map.addLayer(layer)` 前配好；运行期换数据用 `layer.getL7Layer().setData(...)`，改配置后 `layer.reRender()`。
- OD 数据用 parser 的 `x/y/x1/y1` 字段映射，不要传 LineString 坐标数组。
- 3D 弧线要设置 `pitch`（建议 50~60）并缩放到合适层级，否则弧顶看不出高度。
- 一个地图只创建一个 L7 scene（首个 L7Layer `onAdd` 时自动创建并挂在 `map.$l7scene`）；多个 L7 图层各自 `new L7Layer` 后分别 `map.addLayer` 即可。
- v6 报 `Failed to resolve module specifier "maplibregl-l7-render"`：业务 module import 了 render 但 import map 缺该裸名（见 [error-handling.md](../../rules/error-handling.md) 第 7 节）；报 `L7.LineLayer is not a constructor`：缺 `window.L7 = L7Render` 桥接；报 `map.getCRS is not a function`：核心映成了普通核心，需改映 enhance。v5 报 `L7.LineLayer is not a constructor`：render 0.0.4 script 缺失或顺序不对。
