# 示例：加载 iServer REST 地图底图

## 用户请求

> 用 iClient for Leaflet 加载 World 地图服务作为底图，中心放在北京附近。

## 生成代码

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>iClient for Leaflet - World</title>
  <link rel="stylesheet" href="https://iclient.supermap.io/web/libs/leaflet/1.9.4/leaflet.css">
  <link rel="stylesheet" href="https://iclient.supermap.io/dist/leaflet/iclient-leaflet.min.css">
  <style>
    html, body, #map { width: 100%; height: 100%; margin: 0; }
    #map { position: absolute; inset: 0; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://iclient.supermap.io/web/libs/leaflet/1.9.4/leaflet.js"></script>
  <script src="https://iclient.supermap.io/dist/leaflet/iclient-leaflet-es6.min.js"></script>
  <script>
    var mapUrl = 'https://iserver.supermap.io/iserver/services/map-world/rest/maps/World';

    L.supermap.initMap(mapUrl, {
      mapOptions: {
        center: [39.9, 116.39], // Leaflet 顺序：[lat, lng]
        zoom: 4
      }
    }).then(function (result) {
      var map = result.map;
      var layer = result.layer;
      L.control.scale({ imperial: false }).addTo(map);
    }).catch(function (error) {
      console.error('地图初始化失败：', error);
    });
  </script>
</body>
</html>
```

## 关键点

- DOM 容器必须为 `id="map"`；`initMap` 内部不接受其它容器 id。
- `initMap` 返回 Promise，解析结果含 `{ map, layer }`。
- Leaflet 坐标为 `[lat, lng]`；此顺序与 MapboxGL 相反。
- 不监听 `map.on('load')`；在 `.then()` 内即可直接 `.addTo(map)`。
- `mapOptions` 不要放 `container` 属性。
