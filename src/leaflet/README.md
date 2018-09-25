# @supermap/iclient-leaflet

@supermap/iclient-leaflet 是一套基于 Leaflet 的云 GIS 网络客户端开发平台， 支持访问 SuperMap iServer / iEdge / iPortal / iManager / Online 的地图、服务和资源，为用户提供了完整专业的 GIS 能力， 同时提供了优秀的可视化功能。

## 简介
* 官网：[http://iclient.supermap.io](http://iclient.supermap.io)
* 源码：[https://github.com/SuperMap/iClient-JavaScript/tree/master/src/leaflet](https://github.com/SuperMap/iClient-JavaScript/tree/master/src/leaflet)

## 安装

```
 npm install @supermap/iclient-leaflet
```

## 开发

在 HTML 文件中引入 CSS  文件

```
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"/>

<link rel="stylesheet" href="http://iclient.supermap.io/dist/leaflet/iclient9-leaflet.min.css"/>
```

在 JS 文件中加入如下代码

```
import L from 'leaflet';
import {tiledMapLayer} from '@supermap/iclient-leaflet';

var url = "http://support.supermap.com.cn:8090/iserver/services/map-world/rest/maps/World";
var map = L.map('map', {
    crs: L.CRS.EPSG4326,
    center: [0, 0],
    maxZoom: 18,
    zoom: 1
});
tiledMapLayer(url).addTo(map);
```

## 示例
 [https://github.com/SuperMap/iClient-JavaScript/tree/master/examples/leaflet](https://github.com/SuperMap/iClient-JavaScript/tree/master/examples/leaflet)