---
name: addWMTS
description: 通过 Capabilities 工具读取 WMTS 瓦片模板，并以 MapLibre raster source 加载。
---

# 添加 WMTS 栅格瓦片

WMTS 瓦片应通过 MapLibre `raster` source 加载。使用 [OGC Capabilities 工具](../utils/ogc-capabilities.md)读取可用图层、样式、格式、坐标系和 `TileMatrixSet`，由工具生成栅格瓦片 URL 模板。

## URL 格式与解析

iServer WMTS 通常直接使用服务 URL，不带 `/rest/maps/`：

```text
https://{host}:{port}/iserver/services/{wmtsServiceName}
```

需要调用 `getWMTSCapabilities(url, 'EPSG:3857')` 获取服务信息。若服务含多个图层，应通过 `layerId` 选择用户指定的图层；不要静默使用第一项。工具会优先选择与请求坐标系相符且矩阵可映射的 `TileMatrixSet`。

## 添加栅格图层

将 `ogc-capabilities.md` 中的 XML 工具函数及依赖加入页面，然后在地图样式加载完成后调用：

```javascript
async function addWMTSLayer(map, wmtsUrl, layerId) {
    var capabilities = await getWMTSCapabilities(wmtsUrl, 'EPSG:3857');
    var layerInfo = capabilities.layers.find(function(layer) {
        return layer.layerId === layerId;
    });
    if (!layerInfo) {
        throw new Error('Capabilities 中没有可用的 WMTS 图层：' + layerId);
    }

    var source = {
        type: 'raster',
        tiles: [layerInfo.tileUrl],
        tileSize: layerInfo.tileSize,
        minzoom: layerInfo.minzoom,
        maxzoom: layerInfo.maxzoom
    };
    if (layerInfo.bounds) source.bounds = layerInfo.bounds;

    map.addSource('wmts-source', source);
    map.addLayer({
        id: 'wmts-layer',
        type: 'raster',
        source: 'wmts-source'
    });
}

map.once('load', function() {
    addWMTSLayer(
        map,
        'https://iserver.supermap.io/iserver/services/map-world/wmts100',
        'World'
    ).catch(function(error) {
        console.error('WMTS 图层加载失败：', error);
    });
});
```

## 瓦片矩阵限制

* 工具支持同一前缀、连续数字结尾且瓦片尺寸一致的 `TileMatrix` 标识符，并将其映射到 MapLibre `{z}`；例如 `0, 1, 2` 或 `EPSG:3857:0, EPSG:3857:1`。
* 非数字、非连续、前缀不一致或瓦片尺寸变化的矩阵不能安全映射。工具会将相应图层列入 `unsupportedLayers`；若没有可用图层则抛出错误，不得猜测缩放级别。
* 浏览器必须能跨域请求 GetCapabilities 和瓦片。需要其他坐标系或特殊矩阵映射时，先验证对应服务和 MapLibre 扩展能力，再扩展工具。
