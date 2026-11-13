---
name: customMap
description: 使用 MapLibre 原生 API 创建自定义样式地图或非 REST 底图。
---

# 初始化自定义样式地图

仅当用户提供了有效的样式 URL/对象，或明确要创建空白地图时，才使用 MapLibre 原生构造方法。空白样式不含底图，应向用户说明还需添加数据源和图层。

```javascript
var map = new maplibregl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {},
        layers: []
    },
    center: [0, 0],
    zoom: 2
});

map.once('load', function() {
    // 样式就绪后再添加核实过的数据源和图层。
});
map.on('error', function(event) {
    if (event && event.error) {
        console.error('地图错误：', event.error);
    }
});
```

iServer REST Map URL 应改用 `maplibregl.supermap.initMap()`。
