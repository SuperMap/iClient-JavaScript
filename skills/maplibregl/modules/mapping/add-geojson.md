---
name: addGeoJSON
description: 添加 GeoJSON 数据源和对应的 MapLibre 图层。
---

# 添加 GeoJSON

确认输入是有效的 GeoJSON，并使用 WGS84 经纬度坐标。根据几何类型选择图层类型；以下是可在地图 `load` 事件处理程序中使用的完整点图层示例：

```javascript
var geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        properties: { name: '示例点' },
        geometry: { type: 'Point', coordinates: [0, 0] }
    }]
};

map.addSource('example-points', {
    type: 'geojson',
    data: geojson
});
map.addLayer({
    id: 'example-points-circle',
    type: 'circle',
    source: 'example-points',
    paint: {
        'circle-radius': 7,
        'circle-color': '#e34a33',
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 1
    }
});
```

线几何使用 `line` 图层；面几何使用 `fill` 图层（也可另加 `line` 描边）。如果数据源或图层可能已存在，应通过 `getSource()`/`getLayer()` 检查，并使用 `setData()` 更新 GeoJSON 数据源，避免重复添加。仅在样式就绪后添加图层。
