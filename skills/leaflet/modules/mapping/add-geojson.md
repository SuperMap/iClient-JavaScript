---
name: 'addGeoJSON'
description: '使用 L.geoJSON 添加 GeoJSON 图层到地图 - 支持内联数据、文件选择器和查询结果'
---

# 添加 GeoJSON 图层

Leaflet 用 `L.geoJSON(data, options)` 一次性完成「数据源 + 图层 + 样式」，**不存在** `addSource` / `addLayer`。

## 内联 GeoJSON 数据

### 点

```javascript
L.geoJSON({
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [116.39, 39.9] }, // GeoJSON 是 [lng, lat]
    properties: { name: '北京' }
  }]
}, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, { radius: 6, color: '#ff0000', fillOpacity: 0.8 });
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.name);
  }
}).addTo(map);
```

### 线

```javascript
L.geoJSON({
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: [
      [116.1916654036, 39.8888542507],
      [116.2031567225, 39.8888542507]
    ]
  }
}, {
  style: { color: '#00ff00', weight: 3, opacity: 1 }
}).addTo(map);
```

### 面

```javascript
L.geoJSON({
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [[[x1, y1], [x2, y2], [x3, y3], [x1, y1]]]
  }
}, {
  style: {
    color: '#000000',
    weight: 1,
    fillColor: '#0000ff',
    fillOpacity: 0.5
  }
}).addTo(map);
```

## 统一 style 函数（混合几何类型）

```javascript
function style(feature) {
  switch (feature.geometry.type) {
    case 'Point':
    case 'MultiPoint':
      return { radius: 6, color: '#ff0000', fillOpacity: 0.8 };
    case 'LineString':
    case 'MultiLineString':
      return { color: '#00ff00', weight: 3 };
    default:
      return { color: '#000000', weight: 1, fillColor: '#0000ff', fillOpacity: 0.5 };
  }
}

var geoLayer = L.geoJSON(geojson, {
  style: style,
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, style(feature));
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(JSON.stringify(feature.properties));
  }
}).addTo(map);

map.fitBounds(geoLayer.getBounds()); // 缩放到数据范围
```

## 服务查询结果直接渲染

```javascript
new L.supermap.QueryService(mapUrl)
  .queryBySQL(new L.supermap.QueryBySQLParameters({
    queryParams: { name: 'Capitals@World.1', attributeFilter: 'SMID < 10' }
  }))
  .then(function (serviceResult) {
    var features = serviceResult.result.recordsets[0].features; // FeatureCollection
    resultLayer = L.geoJSON(features, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup('名称：' + feature.properties.CAPITAL);
      }
    }).addTo(map);
  });
```

## GeoJSON 文件选择器

### HTML

```html
<div id="map" style="position:absolute;top:0;left:0;width:100%;height:100%"></div>
<div id="file-bar" style="position:absolute;top:10px;right:10px;z-index:1000;background:#fff;padding:8px">
  <label>选择 GeoJSON：<input type="file" id="geojson-input" accept=".geojson,.json"></label>
</div>
```

### JavaScript

```javascript
var geoLayer = null;

document.getElementById('geojson-input').addEventListener('change', function (e) {
  var file = e.target.files[0];
  if (!file || !map) return;
  var reader = new FileReader();
  reader.onload = function (evt) {
    try {
      renderGeoJSON(JSON.parse(evt.target.result));
    } catch (err) {
      alert('GeoJSON 解析失败：' + err.message);
    }
  };
  reader.readAsText(file);
});

function renderGeoJSON(geojson) {
  // 重复加载：先移除旧图层（L.geoJSON 没有 setData）
  if (geoLayer) {
    map.removeLayer(geoLayer);
    geoLayer = null;
  }
  geoLayer = L.geoJSON(geojson, { style: style, onEachFeature: onEachFeature }).addTo(map);
  var bounds = geoLayer.getBounds();
  if (bounds.isValid()) map.fitBounds(bounds);
}
```

## 关键要点

- **无 `addSource` / `addLayer` / `setData`**：更新数据用 `map.removeLayer(geoLayer)` 后重新 `L.geoJSON(...)`。
- **`onEachFeature(feature, layer)`** 是绑定弹窗、事件的标准入口。
- **`pointToLayer`** 用于把点要素换成 `L.circleMarker` / `L.marker`，否则默认是 `L.Marker` 图标。
- **`L.geoJSON(...).addTo(map)` 返回图层对象**，可用于 `map.fitBounds(layer.getBounds())`、`map.removeLayer(layer)`。
- `L.supermap.TiledVectorLayer` 的要素样式更新用 `setFeatureStyle`，与 `L.geoJSON` 不同，见 [vector-tile.md](./vector-tile.md)。

## 坐标系说明

**GeoJSON 必须是 WGS84（EPSG:4326）坐标系。**

GeoJSON 规范要求坐标使用 WGS84 经纬度 `[经度, 纬度]` 表示。Leaflet 会按 `map.options.crs` 自动投影，**不要手工预先转换** GeoJSON 坐标。如果数据使用其他坐标系，需要先转换为 WGS84 才能正确叠加。

> 坐标系叠加规则详见：[coordinate-system.md](../../rules/coordinate-system.md)
