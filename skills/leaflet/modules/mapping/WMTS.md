---
name: 'addWMTS'
description: '使用 L.supermap.WMTSLayer 加载 OGC WMTS 服务'
---

# 添加 WMTS 图层

WMTS 在 Leaflet 侧使用 `L.supermap.WMTSLayer`（继承 `L.TileLayer`）。

## 基础用法

```javascript
var wmtsUrl = 'https://iserver.supermap.io/iserver/services/map-china/wmts100';

new L.supermap.WMTSLayer(wmtsUrl, {
  layer: 'China',
  style: 'default',
  tilematrixSet: 'CUSTOM_China',
  format: 'image/png',
  requestEncoding: 'REST',
  attribution: "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span>"
}).addTo(map);
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `url` | string | — | WMTS 服务地址（到 `wmts100` 为止，不含 `?`） |
| `layer` | string | `''` | 要显示的图层标识符 |
| `style` | string | `''` | 图层样式标识符，通常为 `'default'` |
| `tilematrixSet` | string | `''` | 瓦片矩阵集标识符 |
| `matrixIds` | Array\<Object\> | `null` | 瓦片矩阵对象数组 `[{ identifier: '0' }, ...]`；不设置时直接以级别作为 `tilematrix` |
| `format` | string | `'image/png'` | 图像格式，透明叠加用 `'image/png'` |
| `tileSize` | number \| `L.Point` | `256` | 瓦片大小 |
| `requestEncoding` | string | `'KVP'` | `'KVP'` 或 `'REST'` |
| `version` | string | `'1.0.0'` | WMTS 版本 |
| `tileProxy` | string | — | 服务代理地址 |
| `noWrap` | boolean | `true` | 是否禁止 X 方向平铺 |
| `bufferTiles` | number | `0` | 视野外预加载的瓦片圈数，`1` 可减少平移空白块 |
| `tileCache` | boolean | `false` | 是否启用客户端瓦片缓存，缩放时优先用缓存瓦片填充 |
| `tileCacheZoomRange` | number | `5` | `tileCache` 生效时的缓存缩放范围倍数 |
| `maxOverzooming` | number | `8` | 放大时保留父级瓦片的深度 |
| `maxUnderzooming` | number | `3` | 缩小时保留子级瓦片的深度 |
| `attribution` | string | `''` | 版权描述 |

## KVP 与 REST

| 方式 | URL 形态 | 适用 |
|------|----------|------|
| `KVP` | `{url}?service=WMTS&request=GetTile&version=1.0.0&layer=..&tilematrix=..&tilerow=..&tilecol=..` | 通用，参数自动拼接 |
| `REST` | `{url}/{layer}/{style}/{tilematrixSet}/{tilematrix}/{tilerow}/{tilecol}.{ext}` | iServer `wmts100` 推荐 |

`REST` 下 `format` 会自动映射为扩展名（`image/png` → `.png`，`image/jpeg` → `.jpg`）。

## matrixIds：非标准矩阵标识

iServer 的矩阵标识常常不是纯数字（如 `CUSTOM_China_0`），此时需要显式传 `matrixIds`：

```javascript
var matrixIds = [];
for (var i = 0; i < 22; i++) {
  matrixIds.push({ identifier: 'CUSTOM_China_' + i });
}

new L.supermap.WMTSLayer(wmtsUrl, {
  layer: 'China',
  style: 'default',
  tilematrixSet: 'CUSTOM_China',
  matrixIds: matrixIds,
  format: 'image/png',
  requestEncoding: 'REST'
}).addTo(map);
```

## 手动创建地图时的 CRS 配置

WMTS 对分辨率极其敏感。若不用 `initMap`，必须提供与瓦片矩阵集一致的 `resolutions`，否则会出现瓦片错位：

```javascript
var res = [];
for (var i = 0; i < 22; i++) {
  res.push(19567.879240041664 / Math.pow(2, i));
}

var map = L.map('map', {
  center: [39, 105],
  maxZoom: 18,
  zoom: 5,
  crs: new L.supermap.Proj.CRS('EPSG:3857', {
    origin: [-2.0037508342789244E7, 2.0037508342789244E7],
    resolutions: res,
    bounds: L.bounds(
      [-2.0037508342789244E7, -2.0037508342789244E7],
      [2.0037508342789244E7, 2.0037508342789244E7]
    )
  })
});

new L.supermap.WMTSLayer(wmtsUrl, {
  layer: 'China',
  style: 'default',
  tilematrixSet: 'CUSTOM_China',
  format: 'image/png',
  requestEncoding: 'REST'
}).addTo(map);
```

也可以直接 `L.supermap.crsFromMapJSON(mapJSONObj, mapOptions)` 从地图 JSON 推导 CRS。

## 常见错误

```javascript
// ❌ 错误：用原生 TileLayer 拼 WMTS REST 模板，行列号/矩阵标识容易错
new L.tileLayer(wmtsUrl + '/{layer}/{style}/{tilematrixSet}/{z}/{y}/{x}.png', {});

// ✅ 正确
new L.supermap.WMTSLayer(wmtsUrl, { layer: 'China', style: 'default', tilematrixSet: 'CUSTOM_China', requestEncoding: 'REST' }).addTo(map);
```

> 坐标系与 resolutions 匹配规则详见：[coordinate-system.md](../../rules/coordinate-system.md)
