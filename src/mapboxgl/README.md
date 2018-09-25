# @supermap/iclient-mapboxgl

@supermap/iclient-mapboxgl 是一套基于 Mapbox GL 的云 GIS 网络客户端开发平台， 支持访问 SuperMap iServer / iEdge / iPortal / iManager / Online 的地图、服务和资源，为用户提供了完整专业的 GIS 能力， 同时提供了优秀的可视化功能。

## 简介
* 官网：[http://iclient.supermap.io](http://iclient.supermap.io)
* 源码：[https://github.com/SuperMap/iClient-JavaScript/tree/master/src/mapboxgl](https://github.com/SuperMap/iClient-JavaScript/tree/master/src/mapboxgl)

## 安装

```
 npm install @supermap/iclient-mapboxgl
```

## 开发

在 HTML 文件中引入 CSS  文件

```
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.45.0/mapbox-gl.css' rel='stylesheet' />

```

在 JS 文件中加入如下代码

```
import mapboxgl from 'mapbox-gl';
import {Logo, QueryByBoundsParameters, QueryService} from '@supermap/iclient-mapboxgl';

var map, host = "http://support.supermap.com.cn:8090";
var url = host + "/iserver/services/map-world/rest/maps/World";
var attribution = "<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Mapbox </a>" +
    "| Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> " + " with <span>© <a href='http://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>";

var map = new mapboxgl.Map({
    container: 'map',
    style: {
        "version": 8,
        "sources": {
            "raster-tiles": {
                "attribution": attribution,
                "type": "raster",
                "tiles": [host + '/iserver/services/maps/rest/maps/World/zxyTileImage.png?prjCoordSys={"epsgCode":3857}&z={z}&x={x}&y={y}'],
                "tileSize": 256
            }
        },
        "layers": [{
            "id": "simple-tiles",
            "type": "raster",
            "source": "raster-tiles",
            "minzoom": 0,
            "maxzoom": 22
        }],
        "sprite": "http://iclient.supermap.io/web/styles/street/sprite"
    },
    center: [0, 0],
    maxZoom: 18,
    zoom: 2
});
map.addControl(new Logo(), 'bottom-right');
map.addControl(new mapboxgl.NavigationControl(), 'top-left');

map.on('load', function () {
    query();
});

function query() {
    map.addLayer({
        'id': 'polygonLayer',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [[[0, 0], [60, 0], [60, 39], [0, 39], [0, 0]]]
                }
            }
        },
        'paint': {
            'fill-outline-color': 'blue',
            'fill-color': 'rgba(0, 0, 255, 0.1)'
        }
    });

    var param = new QueryByBoundsParameters({
        queryParams: {name: "Capitals@World.1"},
        bounds: new mapboxgl.LngLatBounds([0, 0], [60, 39])
    });

    new QueryService(url).queryByBounds(param, function (serviceResult) {
        var recordsets = serviceResult && serviceResult.result && serviceResult.result.recordsets;
        var features = recordsets && recordsets[0] && recordsets[0].features;
        map.addLayer({
            "id": "points",
            "type": "circle",
            "paint": {
                "circle-radius": 6,
                "circle-color": "#007cbf",
                "circle-opacity": 0.1,
                "circle-stroke-width": 2,
                "circle-stroke-color": "#007cbf",
                "circle-stroke-opacity": 0.5
            },
            "source": {
                "type": "geojson",
                "data": features
            }
        });
    });
}
```

## 示例
 [https://github.com/SuperMap/iClient-JavaScript/tree/master/examples/mapboxgl](https://github.com/SuperMap/iClient-JavaScript/tree/master/examples/mapboxgl)