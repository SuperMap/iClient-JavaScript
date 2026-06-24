# Example 2: Add Line Layer + Buffer Analysis + Spatial Query

**User Request**: 
1. 添加底图 http://localhost:8090/iserver/services/map-china400/rest/maps/China，中心点 [116.2156351162, 39.8963250173]，级别 12
2. 添加线 [[116.1916654036, 39.8888542507], [116.2031567225, 39.8888542507], [116.2156351162, 39.8963250173], [116.2740019864, 39.8970124079]]
3. 对线进行半径500米缓冲分析
4. 查询与 Jingjin:GreenFeild_R 数据集相交要素

**Output HTML**:
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SuperMap iClient MapboxGL</title>
    <script src="https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/1.12.1-11/mapbox-gl-enhance.js"></script>
    <link href="https://iclient.supermap.io/web/libs/mapbox-gl-js-enhance/1.12.1-11/mapbox-gl-enhance.css" rel="stylesheet">
    <script src="https://iclient.supermap.io/dist/mapboxgl/iclient-mapboxgl-es6.min.js"></script>
    <link href="https://iclient.supermap.io/dist/mapboxgl/iclient-mapboxgl.min.css" rel="stylesheet">
    <style>
        html, body, #map { margin: 0; padding: 0; width: 100%; height: 100%; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        mapboxgl.supermap.initMap(
            'http://localhost:8090/iserver/services/map-china400/rest/maps/China',
            {
                mapOptions: {
                    container: 'map',
                    center: [116.2156351162, 39.8963250173],
                    zoom: 12
                }
            }
        ).then(function(result) {
            var map = result.map;

            // Step 2: Add Line
            map.addSource('route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [116.1916654036, 39.8888542507],
                            [116.2031567225, 39.8888542507],
                            [116.2156351162, 39.8963250173],
                            [116.2740019864, 39.8970124079]
                        ]
                    }
                }
            });
            map.addLayer({
                id: 'route-layer',
                type: 'line',
                source: 'route',
                paint: { 'line-color': '#ff0000', 'line-width': 4 }
            });

            // Step 3: Buffer Analysis
            // modulex (mapboxgl.supermap) 命名空间下的空间分析相关类
            // GeometryBufferAnalystParameters: 缓冲区分析参数类
            // SpatialAnalystService: 空间分析服务类
            // BufferSetting: 缓冲分析设置类
            // BufferDistance: 缓冲距离类
            // BufferEndType: 缓冲端点类型枚举

            var geometryLine = {
                type: 'LineString',
                coordinates: [
                    [116.1916654036, 39.8888542507],
                    [116.2031567225, 39.8888542507],
                    [116.2156351162, 39.8963250173],
                    [116.2740019864, 39.8970124079]
                ]
            };

            var geoBufferAnalystParams = new mapboxgl.supermap.GeometryBufferAnalystParameters({
                sourceGeometry: geometryLine,
                sourceGeometrySRID: 4326,
                bufferSetting: new mapboxgl.supermap.BufferSetting({
                    endType: mapboxgl.supermap.BufferEndType.ROUND,
                    leftDistance: new mapboxgl.supermap.BufferDistance({ value: 500 }),
                    rightDistance: new mapboxgl.supermap.BufferDistance({ value: 500 }),
                    radiusUnit: 'METER',
                    semicircleLineSegment: 10
                })
            });

            new mapboxgl.supermap.SpatialAnalystService('http://localhost:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst')
                .bufferAnalysis(geoBufferAnalystParams)
                .then(function(serviceResult) {
                    var bufferFeature = serviceResult.result.resultGeometry;
                    map.addSource('buffer-result', {
                        type: 'geojson',
                        data: { type: 'FeatureCollection', features: [bufferFeature] }
                    });
                    map.addLayer({
                        id: 'buffer-layer',
                        type: 'fill',
                        source: 'buffer-result',
                        paint: { 'fill-color': '#00ff00', 'fill-opacity': 0.4 }
                    });

                    // Step 4: Spatial Query
                    var geometryParam = new mapboxgl.supermap.GetFeaturesByGeometryParameters({
                        datasetNames: ['Jingjin:GreenFeild_R'],
                        geometry: bufferFeature,
                        spatialQueryMode: 'INTERSECT',
                        targetPrj: { epsgCode: 4326 }
                    });

                    new mapboxgl.supermap.FeatureService('http://localhost:8090/iserver/services/data-jingjin/rest/data')
                        .getFeaturesByGeometry(geometryParam)
                        .then(function(queryResult) {
                            map.addSource('query-by-buffer', {
                                type: 'geojson',
                                data: queryResult.result.features
                            });
                            map.addLayer({
                                id: 'query-by-buffer-layer',
                                type: 'fill',
                                source: 'query-by-buffer',
                                paint: { 'fill-color': '#ff0000', 'fill-opacity': 0.5, 'fill-outline-color': '#ff0000' }
                            });
                        });
                });
        });
    </script>
</body>
</html>
```
