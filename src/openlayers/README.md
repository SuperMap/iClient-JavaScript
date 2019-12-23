# @supermap/iclient-openlayers

@supermap/iclient-openlayers 是一套基于 OpenLayers 的云 GIS 网络客户端开发平台， 支持访问 SuperMap iServer / iEdge / iPortal / iManager / Online 的地图、服务和资源，为用户提供了完整专业的 GIS 能力， 同时提供了优秀的可视化功能。

目前支持的OpenLayers版本为4.6.5，最新的5.x支持版本还在开发中。

## 简介
* 官网：[https://iclient.supermap.io](https://iclient.supermap.io)
* 源码：[https://github.com/SuperMap/iClient-JavaScript/tree/master/src/openlayers](https://github.com/SuperMap/iClient-JavaScript/tree/master/src/openlayers)

## 安装

```
 npm install @supermap/iclient-openlayers
```

## 开发

在 HTML 文件中引入 CSS  文件

```html
<link href='https://openlayers.org/en/v4.6.5/css/ol.css' rel='stylesheet' />

<link href='https://iclient.supermap.io/dist/openlayers/iclient-openlayers.min.css' rel='stylesheet' />

```
在 JS 文件中加入如下代码

```js
import ol from 'openlayers';
import {Logo, TileSuperMapRest} from '@supermap/iclient-openlayers';

var url = "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World";
var map = new ol.Map({
    target: 'map',
    controls: ol.control.defaults({attributionOptions: {collapsed: false}})
        .extend([new Logo()]),
    view: new ol.View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
    })
});
var layer = new ol.layer.Tile({
    source: new TileSuperMapRest({
        url: url,
        wrapX: true
    }),
    projection: 'EPSG:4326'
});
map.addLayer(layer);
```

## 示例
 [https://github.com/SuperMap/iClient-JavaScript/tree/master/examples/openlayers](https://github.com/SuperMap/iClient-JavaScript/tree/master/examples/openlayers)
