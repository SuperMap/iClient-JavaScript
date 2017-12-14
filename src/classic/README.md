# @supermap/iclient-classic

@supermap/iclient-classic 是一套基于SuperMap iClient 8C(2017) for JavaScript的GIS客户端应用程序开发工具，通过它用户可以在SuperMap iClient 8C(2017) for JavaScript的基础上使用最新的SuperMap服务功能。

## 简介
* 官网：[http://iclient.supermap.io](http://iclient.supermap.io)
* 源码：[https://github.com/SuperMap/iClient-JavaScript/tree/master/src/classic](https://github.com/SuperMap/iClient-JavaScript/tree/master/src/classic)

## 安装

```
 npm install @supermap/iclient-classic
```

## 开发

```
import '../lib/iclient8c/SuperMap-8.1.1';
import {MapVLayer} from '@supermap/iclient-classic';
import {utilCityCenter, DataSet} from 'mapv';

var map, baseLayer, mapvLayer,
    url = "http://support.supermap.com.cn:8090/iserver/services/map-china400/rest/maps/China_4326";

init();

function init() {
    map = new SuperMap.Map("map", {
        controls: [
            new SuperMap.Control.Attribution(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            })]
    });
    baseLayer = new SuperMap.Layer.TiledDynamicRESTLayer("China", url, {
        transparent: true,
        cacheEnabled: true
    }, {maxResolution: "auto"});
    baseLayer.events.on({"layerInitialized": addLayer});
}

function addLayer() {
    map.addLayers([baseLayer]);
    map.setCenter(new SuperMap.LonLat(104, 34.7), 2);
    createMapVLayer();
}

function createMapVLayer() {
    var randomCount = 1000;

    var data = [];

    var citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南",
        "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州",
        "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];

    while (randomCount--) {
        var cityCenter = utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
        data.push({
            geometry: {
                type: 'Point',
                coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
            },
            count: 30 * Math.random()
        });
    }

    var dataSet = new DataSet(data);

    var options = {
        fillStyle: 'rgba(55, 50, 250, 0.8)',
        shadowColor: 'rgba(255, 250, 50, 1)',
        shadowBlur: 20,
        max: 100,
        size: 50,
        label: {
            show: true,
            fillStyle: 'white'
        },
        globalAlpha: 0.5,
        gradient: {0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
        draw: 'honeycomb'
    };

    mapvLayer = new MapVLayer("mapv", {dataSet: dataSet, options: options});
    map.addLayer(mapvLayer);
}
```

## 示例
 [https://github.com/SuperMap/iClient-JavaScript/tree/master/examples/classic](https://github.com/SuperMap/iClient-JavaScript/tree/master/examples/classic)