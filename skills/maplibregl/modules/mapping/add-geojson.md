---
name: addGeoJSON
description: 添加 GeoJSON 数据源和对应的 MapLibre 图层 - 支持内联数据与文件选择器。
---

# 添加 GeoJSON 图层

GeoJSON 必须使用 WGS84（EPSG:4326）经纬度坐标。其他坐标系的数据需要先转换，再叠加到地图上，详见 [coordinate-system.md](../../rules/coordinate-system.md)。

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
            properties: { name: '示例点' }
        }]
    }
});

map.addLayer({
    id: 'geojson-layer',
    type: 'circle',
    source: 'geojson-data',
    paint: {
        'circle-radius': 6,
        'circle-color': '#e34a33',
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 1
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
                [116.2031567225, 39.8888542507],
                [116.2156351162, 39.8963250173]
            ]
        }
    }
});

map.addLayer({
    id: 'geojson-layer',
    type: 'line',
    source: 'geojson-data',
    paint: {
        'line-color': '#ff0000',
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
            coordinates: [[
                [116.19, 39.88],
                [116.28, 39.88],
                [116.28, 39.90],
                [116.19, 39.90],
                [116.19, 39.88]
            ]]
        }
    }
});

map.addLayer({
    id: 'geojson-layer',
    type: 'fill',
    source: 'geojson-data',
    paint: {
        'fill-color': '#ff8800',
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
document.getElementById('geojson-input').addEventListener('change', function(event) {
    var file = event.target.files && event.target.files[0];
    if (!file || !map) return;

    var reader = new FileReader();
    reader.onload = function(loadEvent) {
        try {
            var geojson = JSON.parse(loadEvent.target.result);
            if (map.loaded()) {
                renderGeoJSON(geojson);
            } else {
                map.once('load', function() { renderGeoJSON(geojson); });
            }
        } catch (error) {
            alert('GeoJSON 解析失败：' + error.message);
        }
    };
    reader.readAsText(file);
});

function renderGeoJSON(geojson) {
    if (map.getSource('geojson-data')) {
        map.getSource('geojson-data').setData(geojson);
        return;
    }

    var firstFeature = geojson.features && geojson.features[0];
    var geomType = firstFeature && firstFeature.geometry ? firstFeature.geometry.type : 'Point';

    map.addSource('geojson-data', {
        type: 'geojson',
        data: geojson
    });

    if (geomType === 'Point' || geomType === 'MultiPoint') {
        map.addLayer({
            id: 'geojson-layer',
            type: 'circle',
            source: 'geojson-data',
            paint: { 'circle-radius': 6, 'circle-color': '#e34a33' }
        });
    } else if (geomType === 'LineString' || geomType === 'MultiLineString') {
        map.addLayer({
            id: 'geojson-layer',
            type: 'line',
            source: 'geojson-data',
            paint: { 'line-color': '#ff0000', 'line-width': 3 }
        });
    } else {
        map.addLayer({
            id: 'geojson-layer',
            type: 'fill',
            source: 'geojson-data',
            paint: { 'fill-color': '#ff8800', 'fill-opacity': 0.5, 'fill-outline-color': '#000000' }
        });
    }
}
```

## 关键要点

- `initMap()` 解析后地图实例可用，但样式可能未就绪：用 `map.loaded()` 判断，未就绪时注册 `map.once('load', ...)`。
- 数据源已存在时用 `map.getSource(id).setData(...)` 更新，不要重复 `addSource`。
- 按几何类型选择图层类型：点用 `circle`，线用 `line`，面用 `fill`（可另加 `line` 描边）。
- 数据量大时考虑 `cluster`、`filter` 或改用矢量瓦片，见 [vector-tile.md](./vector-tile.md)。

## 坐标系说明

GeoJSON 规范要求 WGS84 经纬度 `[经度, 纬度]`。非 WGS84 数据需要先转换。

> 详见：[coordinate-system.md](../../rules/coordinate-system.md)
