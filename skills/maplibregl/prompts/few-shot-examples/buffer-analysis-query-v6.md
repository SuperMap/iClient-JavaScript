# Example: Add Line Layer + Buffer Analysis + Spatial Query（maplibre-gl v6 技术栈，默认）

**User Request**:
1. 添加底图 http://localhost:8090/iserver/services/map-china400/rest/maps/China，中心点 [116.2156351162, 39.8963250173]，级别 12
2. 添加线 [[116.1916654036, 39.8888542507], [116.2031567225, 39.8888542507], [116.2156351162, 39.8963250173], [116.2740019864, 39.8970124079]]
3. 对线进行半径 500 米缓冲分析
4. 查询与 Jingjin:GreenFeild_R 数据集相交要素

用户未指定版本，按默认 **v6** 生成：import map + `type="module"`，核心 `import * as`，iClient 业务类全部具名导入（类名、参数、调用链与 v5 完全一致，仅去掉 `maplibregl.supermap.` 前缀）。

**Output HTML**:
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SuperMap iClient MapLibreGL v6</title>
    <link rel="stylesheet" href="https://iclient.supermap.io/web/libs/maplibre-gl-js/6.14.0/maplibre-gl.css">
    <link href="https://iclient.supermap.io/dist/maplibregl/iclient-maplibregl.min.css" rel="stylesheet">
    <script type="importmap">
    {
        "imports": {
            "maplibre-gl": "https://iclient.supermap.io/web/libs/maplibre-gl-js/6.14.0/maplibre-gl.mjs"
        }
    }
    </script>
    <style>
        html, body, #map { margin: 0; padding: 0; width: 100%; height: 100%; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script type="module">
        import * as maplibregl from 'maplibre-gl';
        import {
            initMap,
            SpatialAnalystService,
            FeatureService,
            GeometryBufferAnalystParameters,
            BufferSetting,
            BufferDistance,
            BufferEndType,
            GetFeaturesByGeometryParameters
        } from 'https://iclient.supermap.io/dist/maplibregl/iclient-maplibregl.mjs';

        const analystUrl = 'http://localhost:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst';
        const dataUrl = 'http://localhost:8090/iserver/services/data-jingjin/rest/data';
        const lineGeometry = {
            type: 'LineString',
            coordinates: [
                [116.1916654036, 39.8888542507],
                [116.2031567225, 39.8888542507],
                [116.2156351162, 39.8963250173],
                [116.2740019864, 39.8970124079]
            ]
        };

        initMap(
            'http://localhost:8090/iserver/services/map-china400/rest/maps/China',
            {
                mapOptions: {
                    container: 'map',
                    center: [116.2156351162, 39.8963250173],
                    zoom: 12
                }
            }
        ).then(function(result) {
            const map = result.map;

            map.once('load', function() {
                // Step 2: 添加线
                map.addSource('route', {
                    type: 'geojson',
                    data: { type: 'Feature', properties: {}, geometry: lineGeometry }
                });
                map.addLayer({
                    id: 'route-layer',
                    type: 'line',
                    source: 'route',
                    paint: { 'line-color': '#ff0000', 'line-width': 4 }
                });

                // Step 3: 缓冲区分析
                const bufferParams = new GeometryBufferAnalystParameters({
                    sourceGeometry: lineGeometry,
                    sourceGeometrySRID: 4326,
                    bufferSetting: new BufferSetting({
                        endType: BufferEndType.ROUND,
                        leftDistance: new BufferDistance({ value: 500 }),
                        rightDistance: new BufferDistance({ value: 500 }),
                        radiusUnit: 'METER',
                        semicircleLineSegment: 10
                    })
                });

                new SpatialAnalystService(analystUrl)
                    .bufferAnalysis(bufferParams)
                    .then(function(serviceResult) {
                        const bufferFeature = serviceResult.result.resultGeometry;
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

                        // Step 4: 空间查询
                        const geometryParam = new GetFeaturesByGeometryParameters({
                            datasetNames: ['Jingjin:GreenFeild_R'],
                            geometry: bufferFeature,
                            spatialQueryMode: 'INTERSECT'
                        });

                        return new FeatureService(dataUrl)
                            .getFeaturesByGeometry(geometryParam);
                    })
                    .then(function(queryResult) {
                        map.addSource('query-result', {
                            type: 'geojson',
                            data: queryResult.result.features
                        });
                        map.addLayer({
                            id: 'query-result-layer',
                            type: 'fill',
                            source: 'query-result',
                            paint: {
                                'fill-color': '#ff0000',
                                'fill-opacity': 0.5,
                                'fill-outline-color': '#ff0000'
                            }
                        });
                    })
                    .catch(function(error) {
                        console.error('缓冲分析或空间查询失败：', error);
                    });
            });
        }).catch(function(error) {
            console.error('地图初始化失败：', error);
        });
    </script>
</body>
</html>
```

> 说明：iClient mjs 的 CDN 地址在 12.2.0 正式发布后可用；发布前本地自测可换成 `../../dist/maplibregl/iclient-maplibregl.mjs`。页面必须经 http(s) 访问。
