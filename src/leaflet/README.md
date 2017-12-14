# @supermap/iclient-leaflet

@supermap/iclient-leaflet 是一套基于Leaflet的云GIS网络客户端开发平台， 支持访问SuperMap iServer / iExpress / iPortal / iManager / Online的地图、服务和资源，为用户提供了完整专业的GIS能力， 同时提供了优秀的可视化功能。

## 简介
* 官网：[http://iclient.supermap.io](http://iclient.supermap.io)
* 源码：[https://github.com/SuperMap/iClient-JavaScript/tree/master/src/leaflet](https://github.com/SuperMap/iClient-JavaScript/tree/master/src/leaflet)

## 安装

```
 npm install @supermap/iclient-leaflet
```

## 开发

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