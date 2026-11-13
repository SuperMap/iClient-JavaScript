---
name: initMap
description: 根据 iServer REST Map URL 初始化 MapLibre 地图。
---

# 根据 REST Map 初始化地图

当 URL 是 iServer REST Map 端点（`/rest/maps/{mapName}`）时使用此模式。根据具体服务，查阅 `initMap` API 和 `examples/maplibregl/` 中最接近的示例，核实可用选项。

```javascript
var mapUrl = 'https://iserver.supermap.io/iserver/services/map-world/rest/maps/World';

maplibregl.supermap.initMap(mapUrl, {
    mapOptions: {
        container: 'map',
        center: [0, 0],
        zoom: 2
    }
}).then(function(result) {
    var map = result.map;
    map.addControl(new maplibregl.NavigationControl(), 'top-left');

    map.once('load', function() {
        // 在此处添加自定义数据源和图层。
    });
}).catch(function(error) {
    console.error('地图初始化失败：', error);
});
```

`initMap()` 解析时表示地图实例已创建，但不代表地图样式已加载完成。添加自定义数据源或图层前应注册 `load` 监听器。在面向用户的独立页面中，除了记录错误，还应在页面上显示错误信息。不要传入无关样式覆盖 REST Map 创建的样式。
