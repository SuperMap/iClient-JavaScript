---
name: 'addWMS'
description: '使用原生 L.TileLayer.WMS 加载 OGC WMS 服务'
---

# 添加 WMS 图层

**iClient for Leaflet 没有封装 WMS 类**，直接使用 Leaflet 原生的 `L.TileLayer.WMS`。

## 基础用法

```javascript
var wmsUrl = 'https://iserver.supermap.io/iserver/services/map-china/wms111/China';

new L.TileLayer.WMS(wmsUrl, {
  layers: 'China',
  format: 'image/png',
  transparent: true,
  noWrap: true,
  attribution: "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span>"
}).addTo(map);
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `layers` | string | **必填** | 逗号分隔的 WMS 图层名，来自 GetCapabilities |
| `styles` | string | `''` | 逗号分隔的样式名 |
| `format` | string | `'image/jpeg'` | 出图格式，透明叠加用 `'image/png'` |
| `transparent` | boolean | `false` | 是否透明背景 |
| `version` | string | `'1.1.1'` | WMS 版本，可选 `'1.3.0'` |
| `crs` | `L.CRS` | 继承地图 | 若服务要求的 CRS 与地图不同，需要显式指定 |
| `uppercase` | boolean | `false` | 是否将请求参数名转为大写 |
| `noWrap` | boolean | `false` | `true` 时禁止经度方向重复渲染（推荐） |
| `tileSize` | number | `256` | 瓦片大小 |
| `bounds` | `L.LatLngBounds` | — | 服务实际覆盖范围 |
| `attribution` | string | — | 版权描述 |

## 图层名从 GetCapabilities 获取

`layers` **必须**与服务 `GetCapabilities` 返回的 `<Name>` 完全一致，大小写敏感。

```javascript
fetch(wmsUrl + '?service=WMS&request=GetCapabilities')
  .then(function (res) { return res.text(); })
  .then(function (xml) {
    var doc = new DOMParser().parseFromString(xml, 'text/xml');
    // WMS 1.1.1: <Layer><Name>，WMS 1.3.0 命名空间不同
    var names = Array.prototype.map.call(
      doc.getElementsByTagName('Name'),
      function (n) { return n.textContent.trim(); }
    );
    console.log('可用图层：', names.slice(1)); // 第 1 个通常是服务根名称
  });
```

> 完整的 Capabilities 解析与「探测 → 出图」流程见 [ogc-capabilities.md](../utils/ogc-capabilities.md)。

## WMS 1.3.0 坐标轴顺序

WMS **1.3.0** 使用 `CRS=EPSG:4326` 且轴序为 `lat,lng`（纬度在前）；WMS **1.1.1** 使用 `SRS=EPSG:4326` 且轴序为 `lng,lat`。Leaflet 的 `L.TileLayer.WMS` 会按 `version` 自动处理，**不要手动拼 BBOX 参数**。

若服务端要求 `EPSG:3857`，直接用默认 Web 墨卡托地图即可，无需额外配置。

## 唯一正确写法

```javascript
// ✅ 正确：原生 L.TileLayer.WMS
new L.TileLayer.WMS(wmsUrl, { layers: 'China', format: 'image/png', transparent: true, noWrap: true }).addTo(map);

// ❌ 错误：iClient 没有 WMSLayer 类
new L.supermap.WMSLayer(wmsUrl, { layers: 'China' });

// ❌ 错误：不要手写 WMS 瓦片 URL 模板
new L.TileLayer(wmsUrl + '?bbox={bbox-epsg-3857}&width=256&height=256', {});
```

## 与 MapboxGL 的差异

| 项 | MapboxGL | Leaflet |
|----|----------|---------|
| 类 | `addSource({ type: 'raster', tiles: [wmsUrl + '?...&bbox={bbox-epsg-3857}'] })` | `L.TileLayer.WMS(url, options)`，**无需手写 URL 模板** |
| BBOX 占位符 | 需手动拼 `{bbox-epsg-3857}` | 由 Leaflet 内部生成 |
| 图层名 | 拼进 `layers=` 查询参数 | `layers` 选项 |
| 版本差异 | 手动处理 1.1.1 / 1.3.0 | `version` 选项自动处理轴序 |

> 坐标系与叠加规则详见：[coordinate-system.md](../../rules/coordinate-system.md)
