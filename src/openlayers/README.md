# @supermap/iclient-openlayers

@supermap/iclient-openlayers 是一套基于OpenLayers的云GIS网络客户端开发平台， 支持访问SuperMap iServer / iExpress / iPortal / iManager / Online的地图、服务和资源，为用户提供了完整专业的GIS能力， 同时提供了优秀的可视化功能。

## 简介
* 官网：[http://iclient.supermap.io](http://iclient.supermap.io)
* 源码：[https://github.com/SuperMap/iClient-JavaScript/tree/master/src/openlayers](https://github.com/SuperMap/iClient-JavaScript/tree/master/src/openlayers)

## 安装

```
 npm install @supermap/iclient-openlayers
```

## 开发

```
import ol from 'openlayers';
import {Logo, TileSuperMapRest} from '@supermap/iclient-openlayers';

var url = "http://support.supermap.com.cn:8090/iserver/services/map-world/rest/maps/World";
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