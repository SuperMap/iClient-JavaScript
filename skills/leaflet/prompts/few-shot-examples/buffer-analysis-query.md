# 示例：Leaflet 线缓冲分析并查询地图图层

## 用户请求

> 对地图上的道路折线做 250 米缓冲区分析，然后查询缓冲区内的地图要素。

## 生成代码

```javascript
var mapUrl = 'https://iserver.supermap.io/iserver/services/map-changchun/rest/maps/长春市区图';
var analystUrl = 'https://iserver.supermap.io/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst';

// points 使用 Leaflet 的 [lat, lng] 顺序；业务坐标必须与地图/分析服务 CRS 一致
var points = [
  [-4690.000, 2823.940],
  [-4690.301, 3448.940],
  [-3810.125, 3816.561],
  [-3609.158, 3917.383]
];
var roadLine = L.polyline(points, { color: 'red' }).addTo(map);

var bufferParams = new L.supermap.GeometryBufferAnalystParameters({
  sourceGeometry: roadLine,
  bufferSetting: new L.supermap.BufferSetting({
    endType: L.supermap.BufferEndType.ROUND,
    leftDistance: new L.supermap.BufferDistance({ value: 250 }),
    rightDistance: new L.supermap.BufferDistance({ value: 250 }),
    semicircleLineSegment: 10
  })
});

new L.supermap.SpatialAnalystService(analystUrl)
  .bufferAnalysis(bufferParams)
  .then(function (serviceResult) {
    var bufferLayer = L.geoJSON(serviceResult.result.resultGeometry, {
      style: { color: '#00aa00', weight: 2, fillOpacity: 0.25 }
    }).addTo(map);

    var queryParams = new L.supermap.QueryByGeometryParameters({
      queryParams: [new L.supermap.FilterParameter({ name: 'Company@Changchun.2' })],
      geometry: bufferLayer,
      spatialQueryMode: L.supermap.SpatialQueryMode.INTERSECT
    });
    return new L.supermap.QueryService(mapUrl).queryByGeometry(queryParams);
  })
  .then(function (queryResult) {
    var features = queryResult.result.recordsets[0].features;
    L.geoJSON(features, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(JSON.stringify(feature.properties));
      }
    }).addTo(map);
  })
  .catch(function (error) {
    console.error('缓冲区分析或空间查询失败：', error);
  });
```

## 关键点

- 使用 `SpatialAnalystService.bufferAnalysis` 创建缓冲几何，不是 `FeatureService.getFeaturesByBuffer`。
- iClient for Leaflet 示例接受 Leaflet polyline/polygon 图层作为几何输入；查询时也可传 `L.geoJSON` 结果图层。
- 分析结果在 `serviceResult.result.resultGeometry`；地图查询结果在 `queryResult.result.recordsets[0].features`。
- 缓冲距离单位取决于服务 CRS；未确认服务坐标系前，不要把任意投影坐标或经纬度值解释为米。
- 业务坐标数组应符合底图 CRS；Leaflet `LatLng` 顺序虽为 `[lat, lng]`，但非地理坐标系统也应按相应 CRS 的坐标定义处理。
