---
name: restDataFGB
description: 查询 iServer REST Data 并将 FGB 查询结果添加到 MapLibre 地图。
---

# REST Data 查询结果使用 FGB 图层

`examples/maplibregl/02_getFeatureBySQL_FGB.html` 展示了使用 `FeatureService` 获取 FGB 资源并创建 `FGBLayer` 的流程。确认数据服务地址、数据集名称和查询条件后再替换示例参数；以下代码片段应在地图样式加载完成后调用：

```javascript
var dataUrl = 'https://iserver.supermap.io/iserver/services/data-world/rest/data';
var sqlParameters = new maplibregl.supermap.GetFeaturesBySQLParameters({
    queryParameter: {
        name: 'world@World',
        attributeFilter: 'SMID > 0'
    },
    datasetNames: ['World:world']
});

new maplibregl.supermap.FeatureService(dataUrl)
    .getFeaturesBySQL(sqlParameters, 'FGB')
    .then(function(serviceResult) {
        var resourceUrl = serviceResult.result.newResourceLocation;
        if (!resourceUrl) {
            throw new Error('FGB 查询结果中没有资源地址。');
        }
        var layer = new maplibregl.supermap.FGBLayer({
            url: resourceUrl,
            layerID: 'query-result',
            strategy: 'all',
            paint: {
                'fill-color': '#ff3300',
                'fill-opacity': 0.6
            }
        });
        map.addLayer(layer);
    })
    .catch(function(error) {
        console.error('REST Data FGB 查询失败：', error);
    });
```

该示例使用面数据集及面样式。点、线数据需要按照对应的 MapLibreGL 示例选择图层类型和样式。FGB 临时资源地址由服务返回，不要自行拼接；生产环境还需处理资源过期、服务权限和跨域配置。
