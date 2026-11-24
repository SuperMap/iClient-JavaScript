# OGC Capabilities 检查与 Leaflet 图层配置

使用 WMS/WMTS 前先从 `GetCapabilities` 核对服务提供的图层名、格式和坐标系。iClient for Leaflet 不会自动读取 WMTS Capabilities；解析后仍需将参数传给对应 Leaflet 图层。

## 识别服务和地址

| 服务 | 常见 iServer 地址 | 图层类 |
|------|-------------------|--------|
| WMS | `/iserver/services/{service}/wms111/{mapName}` | 原生 `L.TileLayer.WMS` |
| WMTS | `/iserver/services/{service}/wmts100` | `L.supermap.WMTSLayer` |

Capabilities 查询参数：

```text
WMS:  ?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetCapabilities
WMTS: ?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities
```

不要把 MapboxGL `{bbox-epsg-3857}` 瓦片模板用于 Leaflet；Leaflet WMS/WMTS 图层会自行生成瓦片请求。

## 在浏览器中请求 XML

```javascript
async function fetchCapabilities(url, service, version) {
  var separator = url.indexOf('?') >= 0 ? '&' : '?';
  var requestUrl = url + separator +
    'SERVICE=' + encodeURIComponent(service) +
    '&VERSION=' + encodeURIComponent(version) +
    '&REQUEST=GetCapabilities';

  var response = await fetch(requestUrl);
  if (!response.ok) {
    throw new Error('GetCapabilities 请求失败：HTTP ' + response.status);
  }

  var xml = new DOMParser().parseFromString(await response.text(), 'application/xml');
  if (xml.querySelector('parsererror')) {
    throw new Error('GetCapabilities 返回了无效 XML');
  }
  return xml;
}

function getChildrenByLocalName(node, name) {
  return Array.prototype.filter.call(node.children || [], function (child) {
    return child.localName === name;
  });
}

function getFirstChildText(node, name) {
  var child = getChildrenByLocalName(node, name)[0];
  return child ? child.textContent.trim() : '';
}
```

跨域部署时，服务器必须允许页面来源访问 `GetCapabilities`；浏览器 CORS 限制不能通过 JavaScript 绕过。生产环境如需代理，应使用受控的同源代理。

## WMS：读取图层名并渲染

WMS 图层需使用 Capabilities 中 `<Layer><Name>`（不是 `<Title>`）作为 `layers` 参数。

```javascript
async function getWMSLayerNames(wmsUrl) {
  var xml = await fetchCapabilities(wmsUrl, 'WMS', '1.1.1');
  return Array.prototype.map.call(
    xml.getElementsByTagNameNS('*', 'Layer'),
    function (layer) {
      return getFirstChildText(layer, 'Name');
    }
  ).filter(Boolean);
}

getWMSLayerNames(wmsUrl).then(function (names) {
  if (!names.length) throw new Error('WMS Capabilities 中没有可用图层名');
  console.log('WMS 图层名：', names);

  new L.TileLayer.WMS(wmsUrl, {
    layers: names[0],
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    noWrap: true
  }).addTo(map);
}).catch(function (error) {
  console.error('读取 WMS Capabilities 失败：', error);
});
```

如服务使用不同版本，`GetCapabilities` 请求和 `L.TileLayer.WMS` 的 `version` 应保持一致。WMS 1.3.0 对 EPSG:4326 有轴序要求，优先使用 Leaflet 的 `version` 选项，不要自行拼接 BBOX。

## WMTS：读取图层与矩阵集信息

Capabilities 至少要确认 `<ows:Identifier>`（图层名）、`<TileMatrixSetLink>` 和 `TileMatrixSet`。使用浏览器 `localName` 以兼容 XML 命名空间前缀。

```javascript
async function getWMTSLayerInfo(wmtsUrl) {
  var xml = await fetchCapabilities(wmtsUrl, 'WMTS', '1.0.0');
  var contents = xml.getElementsByTagNameNS('*', 'Contents')[0];
  if (!contents) throw new Error('WMTS Capabilities 缺少 Contents');

  var layers = Array.prototype.map.call(
    contents.getElementsByTagNameNS('*', 'Layer'),
    function (layer) {
      var links = Array.prototype.map.call(
        layer.getElementsByTagNameNS('*', 'TileMatrixSetLink'),
        function (link) {
          return getFirstChildText(link, 'TileMatrixSet');
        }
      ).filter(Boolean);
      var styles = Array.prototype.map.call(
        layer.getElementsByTagNameNS('*', 'Style'),
        function (style) {
          return getFirstChildText(style, 'Identifier');
        }
      ).filter(Boolean);

      return {
        layer: getFirstChildText(layer, 'Identifier'),
        styles: styles,
        formats: Array.prototype.map.call(
          layer.getElementsByTagNameNS('*', 'Format'),
          function (format) { return format.textContent.trim(); }
        ),
        tilematrixSets: links
      };
    }
  ).filter(function (layer) { return Boolean(layer.layer); });

  if (!layers.length) throw new Error('WMTS Capabilities 中没有可用图层');
  return layers;
}

getWMTSLayerInfo(wmtsUrl).then(function (layers) {
  console.log('WMTS 图层及矩阵集：', layers);

  var selected = layers[0];
  if (!selected.tilematrixSets.length) {
    throw new Error('所选 WMTS 图层没有可用 TileMatrixSet');
  }

  new L.supermap.WMTSLayer(wmtsUrl, {
    layer: selected.layer,
    style: selected.styles[0] || 'default',
    tilematrixSet: selected.tilematrixSets[0],
    format: selected.formats[0] || 'image/png',
    requestEncoding: 'KVP'
  }).addTo(map);
}).catch(function (error) {
  console.error('读取 WMTS Capabilities 失败：', error);
});
```

上面读取到的 `TileMatrixSet` 需与地图 CRS、瓦片分辨率匹配。若 WMTS 使用非标准矩阵级别标识符，还需将 Capabilities 中 `TileMatrix/ows:Identifier` 逐级转成 `matrixIds: [{ identifier: '...' }]` 传给 `WMTSLayer`；不能默认把 Leaflet zoom 级别当作服务矩阵 ID。

## 最小配置原则

- **已知 WMS 图层名**：直接使用 `L.TileLayer.WMS(url, { layers, format, transparent })`，不必解析 Capabilities。
- **已知 WMTS 的 layer/style/tilematrixSet**：直接用 `L.supermap.WMTSLayer(url, options)`。
- WMTS 加载失败优先核对：`requestEncoding`（`KVP` 或 `REST`）、`layer`、`style`、`tilematrixSet`、`matrixIds` 和地图 CRS。
- Capabilities 不能被浏览器请求时，使用服务器端受控代理或请服务管理员提供图层/矩阵集信息，不要静默切换为未经验证的参数。

> 具体图层选项见 [WMS.md](../mapping/WMS.md) 和 [WMTS.md](../mapping/WMTS.md)；URL 路径规则见 [url-patterns.json](../../rules/url-patterns.json)。
