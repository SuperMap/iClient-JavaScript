---
name: restDataFGB
description: 查询 iServer REST Data 并将 FGB 查询结果作为图层添加到 MapLibre 地图。
---

# REST Data 查询结果使用 FGB 图层

`FeatureService` 查询可以要求返回 FGB 资源：`getFeaturesBySQL(params, 'FGB')`，结果中的 `newResourceLocation` 是临时资源地址，供 `FGBLayer` 直接渲染。示例：`examples/maplibregl/02_getFeatureBySQL_FGB.html`。

```javascript
var dataUrl = 'https://iserver.supermap.io/iserver/services/data-world/rest/data';
var sqlParameters = new maplibregl.supermap.GetFeaturesBySQLParameters({
  queryParameter: {
    name: 'world@World', // 数据集名@数据源名
    attributeFilter: 'SMID > 0'
  },
  datasetNames: ['World:world'] // 数据源:数据集
});

new maplibregl.supermap.FeatureService(dataUrl)
  .getFeaturesBySQL(sqlParameters, 'FGB')
  .then(function (serviceResult) {
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
  .catch(function (error) {
    console.error('REST Data FGB 查询失败：', error);
  });
```

## 要点

- 第二个参数是输出格式，`'FGB'` 才返回 `newResourceLocation`；省略时返回的是 `result.features` 的 GeoJSON 结构。
- FGB 资源地址由服务返回，不要自行拼接；生产环境要处理资源过期、服务权限和跨域。
- `queryParameter.name` 是 `数据集名@数据源名`，`datasetNames` 是 `数据源:数据集`，两者写法不同，容易写错。
- 面数据用 `fill` 样式；点数据需换成 `circle`，线数据换成 `line`，见 [rest-data-vector.md](./rest-data-vector.md) 的图层类型映射。
