---
name: addWMS
description: 通过 Capabilities 工具读取 WMS 图层信息，并以 MapLibre raster source 加载。
---

# 添加 WMS 栅格图层

> **版本与导入约定（先读）**：用户未指定 maplibre-gl 版本时默认 **v6**。本文使用 MapLibre 原生 raster source/layer 与页面内工具函数，两版写法一致；加载方式差异见 [version-routing.md](../../rules/version-routing.md)。

WMS 是栅格图像服务。使用 [OGC Capabilities 工具](../utils/ogc-capabilities.md)读取服务版本、图层、样式、图像格式和坐标系，再将选中的图层配置为 MapLibre `raster` source。

## URL 格式与解析

iServer WMS URL 通常为：

```text
https://{host}:{port}/iserver/services/{serviceName}/ogc/wms/{mapName}
```

URL 识别后，应在用户生成的页面代码中显式调用 `getWMSCapabilities()`；skill 不会在加载或识别阶段自动请求服务。服务如返回多个图层，应使用用户指定的 `layerId`，不要默认取第一项。

## 添加栅格图层

将 `ogc-capabilities.md` 中的 XML 工具函数及依赖加入页面，然后在地图样式加载完成后调用：

```javascript
async function addWMSLayer(map, wmsUrl, layerId) {
    var capabilities = await getWMSCapabilities(wmsUrl, 'EPSG:3857');
    var layerInfo = capabilities.layers.find(function(layer) {
        return layer.layerId === layerId;
    });
    if (!layerInfo) {
        throw new Error('Capabilities 中没有指定的 WMS 图层：' + layerId);
    }

    var source = {
        type: 'raster',
        tiles: [layerInfo.tileUrl],
        tileSize: 256
    };
    if (layerInfo.bounds) source.bounds = layerInfo.bounds;

    map.addSource('wms-source', source);
    map.addLayer({
        id: 'wms-layer',
        type: 'raster',
        source: 'wms-source',
        paint: { 'raster-opacity': 0.85 }
    });
}

map.once('load', function() {
    addWMSLayer(
        map,
        'https://iserver.supermap.io/iserver/services/map-world/ogc/wms/World',
        'World'
    ).catch(function(error) {
        console.error('WMS 图层加载失败：', error);
    });
});
```

要指定其他服务样式或图像格式，可通过 `buildWMSRasterUrl()` 重新生成 `tiles` URL，并从 Capabilities 返回的 `styles`、`formats` 中选择。不要传入服务未声明的值。

## 手动 URL 方式（WMS 1.3.0）

无法读取 Capabilities 时，可在用户明确提供版本、图层名和坐标参考系的前提下手写 GetMap 模板。WMS 1.3.0 使用 `CRS`，1.1.x 使用 `SRS`：

```javascript
map.addSource('wms-source', {
    type: 'raster',
    tiles: [
        'https://iserver.supermap.io/iserver/services/map-world/ogc/wms/World' +
        '?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap' +
        '&LAYERS=World&STYLES=&FORMAT=image/png' +
        '&TRANSPARENT=true&CRS=EPSG:3857' +
        '&WIDTH=256&HEIGHT=256' +
        '&BBOX={bbox-epsg-3857}'
    ],
    tileSize: 256
});
map.addLayer({ id: 'wms-layer', type: 'raster', source: 'wms-source' });
```

`FORMAT`、`LAYERS`、`CRS` 必须来自服务声明；手写 URL 时不要省略这些参数，也不要假定服务支持 PNG 或 EPSG:3857。

## 版本与坐标系

* 工具根据 Capabilities 返回的版本自动使用 WMS 1.3.0 的 `CRS` 或 1.1.x 的 `SRS` 参数。
* 当前 URL 模板使用 `{bbox-epsg-3857}`，因此仅接受明确支持 EPSG:3857 的图层。若服务只支持其他坐标系，不要把该模板直接套用；需另行实现并验证 BBOX 坐标和轴顺序。
* WMS 1.3.0 将 `EPSG:4326` 的 BBOX 定义为纬度在前（`minLat,minLon,maxLat,maxLon`），与 MapLibre 的 `{bbox-epsg-3857}` 顺序不同。只有服务声明支持 EPSG:3857 时才可直接使用该模板；使用 4326 时必须自行核对轴顺序，不能用 `{bbox-epsg-4326}` 直接替代。
* 1.1.1 使用 `SRS` 而非 `CRS`，且 4326 的 BBOX 为经度在前。切换版本时两处都要改。
* 浏览器必须能跨域请求 GetCapabilities 和 GetMap。失败时检查服务 CORS、认证和网络策略。

