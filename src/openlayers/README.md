# @supermapgis/iclient-ol

@supermapgis/iclient-ol 是一套基于 OpenLayers 的云 GIS 网络客户端开发平台， 支持访问 SuperMap iServer / iEdge / iPortal / iManager / Online 的地图、服务和资源，为用户提供了完整专业的 GIS 能力， 同时提供了优秀的可视化功能。

## 简介
* 官网：[https://iclient.supermap.io](https://iclient.supermap.io)
* 源码：[https://github.com/SuperMap/iClient-JavaScript/tree/master/src/openlayers](https://github.com/SuperMap/iClient-JavaScript/tree/master/src/openlayers)

## 安装

```
 npm install @supermapgis/iclient-ol
```
如果您使用的是 OpenLayers 4，请参考此[文档](https://www.npmjs.com/package/@supermapgis/iclient-openlayers/v/10.0.0)安装 SuperMap iClient for OpenLayers。

## 开发

在 HTML 文件中引入 CSS  文件

```html
<link href='https://iclient.supermap.io/web/libs/openlayers/6.1.1/ol.css' rel='stylesheet' />

<link href='https://iclient.supermap.io/dist/ol/iclient-ol.min.css' rel='stylesheet' />
```
在 JS 文件中加入如下代码

```js
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import * as control from 'ol/control';    
import { Logo, TileSuperMapRest } from '@supermapgis/iclient-ol';

var url = "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World";
var map = new Map({
    target: 'map',
    controls: control.defaults({attributionOptions: {collapsed: false}})
        .extend([new Logo()]),
    view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
    })
});
var layer = new TileLayer({
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
