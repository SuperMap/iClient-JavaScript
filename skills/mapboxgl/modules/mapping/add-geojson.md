---
name: "addGeoJSON"
description: "添加 GeoJSON 图层到地图 - 支持内联数据和文件选择器"
---

# 添加 GeoJSON 图层

## 内联 GeoJSON 数据

### 点

```javascript
map.addSource('geojson-data', {
    type: 'geojson',
    data: {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [116.39, 39.9] },
            properties: {}
        }]
    }
});

map.addLayer({
    id: 'geojson-layer',
    type: 'circle',
    source: 'geojson-data',
    paint: {
        'circle-radius': 6,
        'circle-color': '#ff0000'
    }
});
```

### 线

```javascript
map.addSource('geojson-data', {
    type: 'geojson',
    data: {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: [
                [116.1916654036, 39.8888542507],
                [116.2031567225, 39.8888542507]
            ]
        }
    }
});

map.addLayer({
    id: 'geojson-layer',
    type: 'line',
    source: 'geojson-data',
    paint: {
        'line-color': '#00ff00',
        'line-width': 3
    }
});
```

### 面

```javascript
map.addSource('geojson-data', {
    type: 'geojson',
    data: {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'Polygon',
            coordinates: [[[x1, y1], [x2, y2], [x3, y3], [x1, y1]]]
        }
    }
});

map.addLayer({
    id: 'geojson-layer',
    type: 'fill',
    source: 'geojson-data',
    paint: {
        'fill-color': '#0000ff',
        'fill-opacity': 0.5,
        'fill-outline-color': '#000000'
    }
});
```

## GeoJSON 文件选择器

### HTML

```html
<div id="map"></div>
<div id="file-bar">
  <label>选择 GeoJSON：<input type="file" id="geojson-input" accept=".geojson,.json"></label>
</div>
```

### JavaScript

```javascript
document.getElementById('geojson-input').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file || !map) return;
    var reader = new FileReader();
    reader.onload = function(evt) {
        try {
            var geojson = JSON.parse(evt.target.result);
            if (map.loaded()) {
                renderGeoJSON(geojson);
            } else {
                map.once('load', function() { renderGeoJSON(geojson); });
            }
        } catch(err) {
            alert('GeoJSON 解析失败：' + err.message);
        }
    };
    reader.readAsText(file);
});

function renderGeoJSON(geojson) {
    if (map.getSource('geojson-data')) {
        map.getSource('geojson-data').setData(geojson);
        return;
    }

    var geomType = (geojson.features && geojson.features[0])
        ? geojson.features[0].geometry.type : 'Point';

    map.addSource('geojson-data', {
        type: 'geojson',
        data: geojson
    });

    if (geomType === 'Point') {
        map.addLayer({
            id: 'geojson-layer',
            type: 'circle',
            source: 'geojson-data',
            paint: { 'circle-radius': 6, 'circle-color': '#ff0000' }
        });
    } else if (geomType === 'LineString' || geomType === 'MultiLineString') {
        map.addLayer({
            id: 'geojson-layer',
            type: 'line',
            source: 'geojson-data',
            paint: { 'line-color': '#00ff00', 'line-width': 3 }
        });
    } else if (geomType === 'Polygon' || geomType === 'MultiPolygon') {
        map.addLayer({
            id: 'geojson-layer',
            type: 'fill',
            source: 'geojson-data',
            paint: { 'fill-color': '#0000ff', 'fill-opacity': 0.5, 'fill-outline-color': '#000000' }
        });
    }
}
```

## 关键要点
- 如果使用的initMap方法，在 `.then()` 回调中使用map，使用 `map.loaded()` 检查地图是否就绪
- 地图未加载时，使用 `map.once('load', ...)` 等待
- 重复添加时，使用 `setData()` 更新已有数据源

## 坐标系说明

**GeoJSON 必须是 WGS84（EPSG:4326）坐标系。**

GeoJSON 规范要求坐标使用 WGS84 经纬度（[经度, 纬度]）表示。如果数据使用其他坐标系（如 EPSG:3857），需要先转换为 WGS84 才能叠加到地图上。

> 坐标系叠加规则详见：[coordinate-system.md](../../rules/coordinate-system.md)
