# 用户请求（maplibre-gl v5 技术栈）

生成一个能直接运行并方便继续开发的 SuperMap MapLibreGL 地图 HTML，使用 maplibre-gl v5（普通 script + `window.maplibregl` 全局）。

# 期望回答

基于 `templates/v5/index.html` 提供完整 HTML 文档。使用 v5 固定的 maplibre-gl-enhance 与 iclient-maplibregl CDN 标签（版本见 `rules/param-defaults.json` 的 `cdns.v5`），不要改用 `include-maplibregl.js` 加载器，也不要切换版本。使用公开 World REST Map URL 初始化地图，设置合理的中心点和缩放级别，添加导航控件，并在页面上显示初始化失败和地图错误。包含可编辑的 GeoJSON 叠加示例，并且仅在 `map` 触发 `load` 事件后添加数据源和图层。告诉用户可以将 `mapUrl`、`center`、`zoom` 和示例数据替换为自己的内容。不要使用 MapboxGL 命名空间或 CDN。

# 输出示例

**用户请求**：「加载底图 http://localhost:8090/iserver/services/map-china400/rest/maps/China，中心点为 [116.2156351162, 39.8963250173]，级别为 12」

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SuperMap iClient MapLibreGL v5</title>
    <script src="https://iclient.supermap.io/web/libs/maplibre-gl-js-enhance/5.9.0-2/maplibre-gl-enhance.js"></script>
    <link href="https://iclient.supermap.io/web/libs/maplibre-gl-js-enhance/5.9.0-2/maplibre-gl-enhance.css" rel="stylesheet">
    <script src="https://iclient.supermap.io/dist/maplibregl/iclient-maplibregl-es6.min.js"></script>
    <link href="https://iclient.supermap.io/dist/maplibregl/iclient-maplibregl.min.css" rel="stylesheet">
    <style>
        html, body, #map { margin: 0; padding: 0; width: 100%; height: 100%; }
        #status {
            position: absolute;
            top: 12px;
            left: 12px;
            padding: 8px 12px;
            background: rgba(255, 255, 255, 0.95);
            font: 14px/1.5 sans-serif;
        }
        #status[hidden] { display: none; }
    </style>
</head>
<body>
    <div id="map"></div>
    <div id="status" role="status" aria-live="polite">正在加载地图...</div>
    <script>
        (function() {
            var status = document.getElementById('status');
            var mapUrl = 'http://localhost:8090/iserver/services/map-china400/rest/maps/China';

            function showError(error) {
                status.hidden = false;
                status.textContent = '地图加载失败：' + (error && error.message ? error.message : String(error));
                console.error(error);
            }

            maplibregl.supermap.initMap(mapUrl, {
                mapOptions: {
                    container: 'map',
                    center: [116.2156351162, 39.8963250173],
                    zoom: 12
                }
            }).then(function(result) {
                var map = result.map;
                window.map = map;
                map.addControl(new maplibregl.NavigationControl(), 'top-left');

                map.once('load', function() {
                    map.addSource('sample-geojson', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: { name: '可编辑示例点' },
                            geometry: { type: 'Point', coordinates: [116.2156351162, 39.8963250173] }
                        }
                    });
                    map.addLayer({
                        id: 'sample-geojson',
                        type: 'circle',
                        source: 'sample-geojson',
                        paint: { 'circle-radius': 7, 'circle-color': '#e34a33' }
                    });
                    status.hidden = true;
                });

                map.on('error', function(event) {
                    if (event && event.error) showError(event.error);
                });
            }).catch(showError);
        })();
    </script>
</body>
</html>
```
