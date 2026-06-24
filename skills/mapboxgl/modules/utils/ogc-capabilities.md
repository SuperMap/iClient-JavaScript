# OGC Capabilities 解析工具

## 1) 浏览器依赖和工具函数

```javascript
/**
 * 必须在 HTML 中引入 fast-xml-parser：
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/fast-xml-parser/5.2.5/fxparser.min.js"></script>
 */

if (!XMLParser) {
  throw new Error('fast-xml-parser not loaded, check CDN script inclusion.');
}

function appendQ(url, qs) {
  const base = String(url || '');
  const sep = base.includes('?') ? (/[?&]$/.test(base) ? '' : '&') : '?';
  return base + sep + qs;
}

function toArr(v) {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

function first(v, fallback) {
  if (Array.isArray(v)) return v.length ? v[0] : fallback;
  return v == null ? fallback : v;
}

function ensureMapReady(map) {
  if (map.loaded()) return Promise.resolve();
  return new Promise(function (resolve) {
    map.once('load', resolve);
  });
}
```

## 2) WMTS Capabilities 解析器

```javascript
async function getWMTSCapabilities(url, mapCRS) {
  try {
    const capUrl = appendQ(url, 'REQUEST=GetCapabilities&SERVICE=WMTS&VERSION=1.0.0');
    const resp = await fetch(capUrl);
    if (!resp.ok) return { layers: [], error: 'HTTP ' + resp.status };

    const xml = await resp.text();
    const parser = new XMLParser.default({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      isArray: function (name) {
        return ['Layer', 'TileMatrixSet', 'TileMatrixSetLink', 'TileMatrix', 'Style', 'ResourceURL', 'ows:Operation', 'ows:Get'].indexOf(name) > -1;
      }
    });
    const cap = parser.parse(xml).Capabilities;
    if (!cap || !cap.Contents) return { layers: [], error: 'Invalid WMTS Capabilities' };

    const matrixMap = {};
    toArr(cap.Contents.TileMatrixSet).forEach(function (ms) {
      const id = ms['ows:Identifier'];
      const matrices = toArr(ms.TileMatrix);
      const zList = matrices
        .map(function (m) { return Number(m['ows:Identifier']); })
        .filter(function (n) { return Number.isFinite(n); });

      matrixMap[id] = {
        tileSize: Number(first(matrices, {}).TileWidth) || 256,
        minzoom: zList.length ? Math.min.apply(Math, zList) : 0,
        maxzoom: zList.length ? Math.max.apply(Math, zList) : 22
      };
    });

    const kvpUrl = getWMTSKvpUrl(cap);
    const layers = [];

    toArr(cap.Contents.Layer).forEach(function (layer) {
      const layerId = layer['ows:Identifier'];
      const links = toArr(layer.TileMatrixSetLink);

      let chosen = null;
      for (let i = 0; i < links.length; i += 1) {
        const msId = links[i].TileMatrixSet;
        const info = matrixMap[msId];
        if (!info) continue;
        if (!chosen) chosen = { msId: msId, info: info };
        if (mapCRS && String(msId).toUpperCase().indexOf(String(mapCRS).toUpperCase()) >= 0) {
          chosen = { msId: msId, info: info };
          break;
        }
      }
      if (!chosen) return;

      const style = first(toArr(layer.Style), {})['ows:Identifier'] || '';
      const resourceUrls = toArr(layer.ResourceURL);
      const tileResource = resourceUrls.find(function (r) { return r['@_resourceType'] === 'tile'; });
      const format = (tileResource && tileResource['@_format']) || first(toArr(layer.Format), 'image/png');

      let tileUrl = '';
      if (tileResource && tileResource['@_template']) {
        tileUrl = decodeURIComponent(tileResource['@_template'])
          .replace('{Style}', style)
          .replace('{style}', style)
          .replace('{TileMatrixSet}', chosen.msId)
          .replace('{TileMatrix}', '{z}')
          .replace('{TileRow}', '{y}')
          .replace('{TileCol}', '{x}');
      } else if (kvpUrl) {
        tileUrl = appendQ(
          kvpUrl,
          'service=WMTS&request=GetTile&version=1.0.0' +
            '&layer=' + encodeURIComponent(layerId) +
            '&style=' + encodeURIComponent(style) +
            '&tilematrixSet=' + encodeURIComponent(chosen.msId) +
            '&format=' + encodeURIComponent(format) +
            '&tilematrix={z}&tilerow={y}&tilecol={x}'
        );
      }

      if (!tileUrl) return;

      const wgs84 = layer['ows:WGS84BoundingBox'];
      let bounds;
      if (wgs84 && wgs84['ows:LowerCorner'] && wgs84['ows:UpperCorner']) {
        const lo = String(wgs84['ows:LowerCorner']).split(/\s+/);
        const hi = String(wgs84['ows:UpperCorner']).split(/\s+/);
        bounds = [Number(lo[0]), Number(lo[1]), Number(hi[0]), Number(hi[1])];
      }

      layers.push({
        layerId: layerId,
        tileUrl: tileUrl,
        tileSize: chosen.info.tileSize,
        minzoom: chosen.info.minzoom,
        maxzoom: chosen.info.maxzoom,
        bounds: bounds
      });
    });

    return { layers: layers };
  } catch (e) {
    return { layers: [], error: String(e) };
  }
}

function getWMTSKvpUrl(cap) {
  const ops = toArr(cap['ows:OperationsMetadata'] && cap['ows:OperationsMetadata']['ows:Operation']);
  const getTile = ops.find(function (o) { return o['@_name'] === 'GetTile'; });
  if (!getTile) return '';
  const gets = toArr(getTile['ows:DCP'] && getTile['ows:DCP']['ows:HTTP'] && getTile['ows:DCP']['ows:HTTP']['ows:Get']);
  for (let i = 0; i < gets.length; i += 1) {
    const g = gets[i];
    const vals = toArr(g['ows:Constraint'] && g['ows:Constraint']['ows:AllowedValues'] && g['ows:Constraint']['ows:AllowedValues']['ows:Value']);
    if (vals.indexOf('KVP') > -1) return g['@_xlink:href'] || '';
  }
  return '';
}
```

## 3) WMS Capabilities 解析器

```javascript
async function getWMSCapabilities(url, mapCRS) {
  try {
    const capUrl = appendQ(url, 'REQUEST=GetCapabilities&SERVICE=WMS');
    const resp = await fetch(capUrl, { headers: { Accept: 'text/xml' } });
    if (!resp.ok) return { version: '', layers: [], bounds: undefined, error: 'HTTP ' + resp.status };

    const xml = await resp.text();
    const parser = new XMLParser.default({ ignoreAttributes: false, attributeNamePrefix: '@_' });
    const parsed = parser.parse(xml);
    const cap = parsed.WMT_MS_Capabilities || parsed.WMS_Capabilities;
    if (!cap) return { version: '', layers: [], bounds: undefined, error: 'Invalid WMS Capabilities' };

    const version = cap['@_version'] || '1.1.1';
    const rootLayer = cap.Capability && cap.Capability.Layer;

    const layers = [];
    collectWMSLayers(rootLayer, layers, {
      version: version,
      serviceUrl: url,
      mapCRS: mapCRS || 'EPSG:3857'
    });

    let bounds;
    if (rootLayer && rootLayer.LatLonBoundingBox) {
      const ll = rootLayer.LatLonBoundingBox;
      bounds = [Number(ll['@_minx']), Number(ll['@_miny']), Number(ll['@_maxx']), Number(ll['@_maxy'])];
    }
    if (rootLayer && rootLayer.EX_GeographicBoundingBox) {
      const ex = rootLayer.EX_GeographicBoundingBox;
      bounds = [Number(ex.westBoundLongitude), Number(ex.southBoundLatitude), Number(ex.eastBoundLongitude), Number(ex.northBoundLatitude)];
    }

    return { version: version, layers: layers, bounds: bounds };
  } catch (e) {
    return { version: '', layers: [], bounds: undefined, error: String(e) };
  }
}

function collectWMSLayers(layer, layers, ctx) {
  if (!layer) return;
  const name = layer.Name;
  const title = layer.Title || name || '';
  const layers2 = toArr(layer.Layer);
  layers2.forEach(function (sub) {
    if (sub.Name) {
      const SRS = toArr(sub.SRS || sub.CRS || []);
      const proj = SRS.find(function (s) { return String(s).toUpperCase().indexOf(String(ctx.mapCRS).toUpperCase()) >= 0; }) || SRS[0];
      layers.push({
        layerId: sub.Name,
        tileUrl: ctx.serviceUrl + '?SERVICE=WMS&VERSION=' + ctx.version + '&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&LAYERS=' + sub.Name + '&STYLES=&WIDTH=256&HEIGHT=256&CRS=' + (proj || 'EPSG:3857') + '&BBOX={bbox-epsg-3857}',
        minzoom: 0,
        maxzoom: 22
      });
    }
    collectWMSLayers(sub, layers, ctx);
  });
}
```

## 4) 使用示例

```javascript
// WMTS
var cap = await getWMTSCapabilities('http://host:8090/iserver/services/wmts-china', 'EPSG:3857');
if (!cap.error && cap.layers.length) {
    var layer = cap.layers[0];
    map.addSource('wmts', { type: 'raster', tiles: [layer.tileUrl], tileSize: layer.tileSize });
    map.addLayer({ id: 'wmts', type: 'raster', source: 'wmts' });
}

// WMS
var wmsCap = await getWMSCapabilities('http://host:8090/iserver/services/wms-china/wms');
if (!wmsCap.error && wmsCap.layers.length) {
    var layer = wmsCap.layers[0];
    map.addSource('wms', { type: 'raster', tiles: [layer.tileUrl], tileSize: 256 });
    map.addLayer({ id: 'wms', type: 'raster', source: 'wms' });
}
```

## CDN 依赖
- 需要 fast-xml-parser：`https://cdnjs.cloudflare.com/ajax/libs/fast-xml-parser/5.2.5/fxparser.min.js`
