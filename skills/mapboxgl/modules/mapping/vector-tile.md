---
name: 'addVectorTile'
description: '添加矢量瓦片图层'
---

# iServer 地图服务(rest/maps)添加矢量瓦片图层

## 方式一：initMap 配合 vector-tile 类型

当将 iServer REST 地图服务作为矢量瓦片加载时，使用 `initMap` 并传入 `type: 'vector-tile'`。这是最简单的方式 —— `initMap` 会自动配置矢量瓦片数据源和样式。

```javascript
mapboxgl.supermap
  .initMap('http://host:8090/iserver/services/map-world/rest/maps/World', {
    type: 'vector-tile',
    mapOptions: {
      container: 'map',
      center: [116.39, 39.9],
      zoom: 3,
    },
  })
  .then(function (result) {
    var map = result.map;
    // 矢量瓦片图层已自动添加，可直接操作
  });
```

## 方式二：通过style参数，手动加载矢量瓦片

适用于需要精细控制或使用 mapbox-gl-enhance 扩展的场景：

```javascript
var map = new mapboxgl.Map({
  container: 'map',
  style:
    'http://host:8090/iserver/services/map-china400/rest/maps/China/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true&tileURLTemplate=ZXY',
  center: [108.9118776, 23.8260365],
  zoom: 1,
});
```

### 支持自定义坐标系（mapboxgl.CRS）

如果地图使用非标准坐标系（如地方坐标系），可以通过 `mapboxgl.CRS` 扩展：

```javascript
var host = 'http://localhost:8090';
var map = new mapboxgl.Map({
  container: 'map',
  style:
    host +
    '/iserver/services/map-china400/rest/maps/China/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true&tileURLTemplate=ZXY',
  crs: new mapboxgl.CRS(
    'EPSG:2362',
    WKT,
    [32876993.777095847, -10001970.421227315, 52880934.61955048, 10001970.421227315],
  ),
  center: [108.9118776, 23.8260365],
  zoom: 1,
});
```

**CRS 参数说明：**

- `name`：坐标系名称，必填（如 `'EPSG:2362'`）
- `wkt`：坐标系的 WKT 或 Proj4 表述，必填
- `extent`：当前坐标系范围，`[左, 下, 右, 上]`

### vectorstyles.json 参数说明

| 参数                  | 说明                             |
| --------------------- | -------------------------------- |
| `type=MapBox_GL`      | 返回 Mapbox GL 样式格式          |
| `styleonly=true`      | 仅返回样式配置，不返回其他元数据 |
| `tileURLTemplate=ZXY` | 使用 Z/X/Y 瓦片寻址模板          |

## 方式三：手动矢量瓦片数据源

适用于非 iServer 的 MVT 端点或自定义瓦片 URL：

```javascript
var map = new mapboxgl.Map({
  container: 'map',
  style: { version: 8, sources: {}, layers: [] },
  center: [116.39, 39.9],
  zoom: 3,
});

map.on('load', function () {
  map.addSource('vector-tiles', {
    type: 'vector',
    tiles: ['http://host:8090/iserver/services/map-world/rest/maps/World/tileFeature.mvt?z={z}&x={x}&y={y}'],
    tileSize: 512,
    minzoom: 0,
    maxzoom: 14,
  });

  map.addLayer({
    id: 'vt-polygon',
    type: 'fill',
    source: 'vector-tiles',
    'source-layer': 'layerName',
    paint: {
      'fill-color': '#0088ff',
      'fill-opacity': 0.5,
    },
    filter: ['==', '$type', 'Polygon'],
  });

  map.addLayer({
    id: 'vt-line',
    type: 'line',
    source: 'vector-tiles',
    'source-layer': 'layerName',
    paint: {
      'line-color': '#0066cc',
      'line-width': 1,
    },
    filter: ['==', '$type', 'LineString'],
  });

  map.addLayer({
    id: 'vt-point',
    type: 'circle',
    source: 'vector-tiles',
    'source-layer': 'layerName',
    paint: {
      'circle-radius': 4,
      'circle-color': '#ff4400',
    },
    filter: ['==', '$type', 'Point'],
  });
});
```

## 关键要点

- 对 iServer 地图服务矢量瓦片上图，**推荐使用方式一** ，`initMap` 配合 `type: 'vector-tile'`
- 如果是想自定义矢量瓦片图层的样式，选择方式三
  - 矢量瓦片图层必须指定 `source-layer` —— 它对应瓦片数据源中的图层名称
  - 矢量瓦片图层需要为每种几何类型（点/circle、线、面/fill）分别调用 addLayer
  - 使用 `mapboxgl.CRS` 可以支持地方坐标系等非标准投影
  - 矢量瓦片图层的样式配置（如颜色、透明度）需要在 addLayer 中指定 `paint` 选项

# iServer 数据服务（rest/data）添加矢量瓦片图层

## 方式一：调用 getRestDataInfo 获取图层信息

通过 `getRestDataInfo` 方法自动获取 source-layer、CRS 和 Tile URL：

```javascript
var dataUrl = 'http://host:8090/iserver/services/data-world/rest/data/datasources/World/datasets/World_P';

async function initRestDataMap() {
  var info = await getRestDataInfo(dataUrl);
  if (!info) {
    console.error('获取 REST Data 信息失败');
    return;
  }

  var map = new mapboxgl.Map({
    container: 'map',
    style: {
      version: 8,
      sources: info.sources,
      layers: [],
    },
    center: [116.39, 39.9],
    zoom: 4,
    crs: info.crs.name ? new mapboxgl.CRS(info.crs.name, '', info.crs.extent) : undefined,
  });

  map.on('load', function () {
    var sources = info.sources;
    var layers = info.layers;
    for (var sourceId in sources) {
      map.addSource(sourceId, sources[sourceId]);
    }
    layers.forEach(function (layer) {
      map.addLayer(layer);
    });
  });
}

initRestDataMap();
```

### getRestDataInfo 返回值说明

| 字段      | 说明                                       |
| --------- | ------------------------------------------ |
| `sources` | Mapbox GL 数据源配置，包含 tiles 和 bounds |
| `layers`  | 图层配置，包含 type、source-layer 和 paint |
| `crs`     | 坐标系信息，包含 name 和 extent            |

### 支持的数据集类型

| DatasetType | LayerType | Paint                                   |
| ----------- | --------- | --------------------------------------- |
| POINT       | circle    | circle-radius: 4, circle-color: #ff4400 |
| TEXT        | circle    | circle-radius: 4, circle-color: #ff4400 |
| LINE        | line      | line-color: #0066cc, line-width: 1      |
| REGION      | fill      | fill-color: #0088ff, fill-opacity: 0.5  |

### 完整工具方法参考

详见 [rest-data-vector.md](./rest-data-vector.md)

## 关键要点

- REST Data 的 `source-layer` 格式为 `数据集名@数据源名`
- 非 EPSG:3857/EPSG:4326 坐标系需要添加 `&scale={scale}` 参数
- 需要引入 mapbox-gl-enhance 库以支持自定义坐标系（CRS）
- 坐标系与叠加要求详见：[coordinate-system.md](../../rules/coordinate-system.md)

## 方式二：直接使用 MVT 格式 Tile URL

如果已知数据集的图层信息，可以直接使用 MVT 格式的 Tile URL 添加矢量瓦片图层：

```javascript
var map = new mapboxgl.Map({
  container: 'map',
  style: { version: 8, sources: {}, layers: [] },
  center: [116.39, 39.9],
  zoom: 3,
});

map.on('load', function () {
  map.addSource('railways', {
    type: 'vector',
    tiles: [
      'https://iserver.supermap.io/iserver/services/data-osm-line/rest/data/datasources/osm-line/datasets/railways/tileFeature.mvt?returnAttributes=true&width=512&height=512&x={x}&y={y}&scale={scale}&origin=%7Bx%3A-180%2Cy%3A90%7D',
    ],
    tileSize: 512,
    minzoom: 0,
    maxzoom: 14,
  });

  map.addLayer({
    id: 'railways-line',
    type: 'line',
    source: 'railways',
    'source-layer': 'railways@osm-line',
    paint: {
      'line-color': '#0066cc',
      'line-width': 1,
    },
  });
});
```

### MVT Tile URL 格式说明

| 参数              | 说明                                  |
| ----------------- | ------------------------------------- |
| `tileFeature.mvt` | 指定返回 MVT 格式的矢量瓦片           |
| `returnAttributes` | 是否返回要素属性                     |
| `width=512`       | 瓦片宽度                              |
| `height=512`      | 瓦片高度                              |
| `x={x}&y={y}`     | 瓦片坐标                              |
| `scale={scale}`   | 比例尺，用于坐标系转换                |
| `origin`          | 瓦片原点坐标 `{x:-180,y:90}` URL 编码 |

### source-layer 获取方式

`source-layer` 需要用户自行获取，格式为 `数据集名@数据源名`。可以通过以下方式获取：

1. **通过 iServer Service Management 界面查看**：访问服务的 metadata 或 capabilities
2. **通过 REST API 查询**：调用数据集接口获取图层列表
3. **通过 getRestDataInfo 方法**：使用 `getRestDataInfo` 获取完整信息后查看返回的 layers

### 与方式一的区别

| 方式 | 适用场景                                 |
| ---- | ---------------------------------------- |
| 方式一 | 需要自动获取图层信息、CRS 等完整配置     |
| 方式二 | 已知图层信息，需要精细控制样式           |
