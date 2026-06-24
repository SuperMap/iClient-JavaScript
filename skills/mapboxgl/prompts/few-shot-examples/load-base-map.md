# Example 1: Load Base Map

**User Request**: "加载底图 http://localhost:8090/iserver/services/map-china400/rest/maps/China，中心点为 [116.2156351162, 39.8963250173]，级别为 12"

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
        });
    </script>
</body>
</html>
```
