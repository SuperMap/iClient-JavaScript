---
name: vectorTile
description: 使用 MapLibre 加载 SuperMap iServer MVT 矢量瓦片（rest/maps 与 rest/data）。
---

# iServer 地图服务（rest/maps）加载矢量瓦片

## 方式一：initMap 配合 vector-tile 类型

`initMap` 的 `type` 支持 `'raster' | 'vector-tile'`（默认 `'raster'`）。传 `type: 'vector-tile'` 时，`initMap` 会自动把服务地址拼成
`.../rest/maps/{map}/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true&tileURLTemplate=ZXY` 作为样式，并按该样式创建地图：

```javascript
maplibregl.supermap
  .initMap('https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China', {
    type: 'vector-tile',
    mapOptions: {
      container: 'map',
      center: [108.9118, 30.0],
      zoom: 3
    }
  })
  .then(function (result) {
    var map = result.map;
    // 矢量瓦片样式已由服务端样式决定，可直接交互或继续 addLayer
  })
  .catch(function (err) {
    console.error(err);
  });
```

注意：

- `initMap` 返回的是 `{ map }`，`map` 已经创建完成；后续 `addSource` / `addLayer` 仍要在地图 `load` 之后执行。
- 平面投影会直接 reject（`maplibre-gl cannot support plane coordinate system.`）；非 `EPSG:3857` 服务依赖 maplibre-gl-enhance 提供的 `maplibregl.CRS`。

## 方式二：直接传 vectorstyles.json 作为 style

需要自行控制 `center` / `zoom` / `crs` 时，把服务端样式地址直接交给 `new maplibregl.Map`（示例：`examples/maplibregl/mvtVectorTile_4326.html`）：

```javascript
var map = new maplibregl.Map({
  container: 'map',
  style:
    'https://iserver.supermap.io/iserver/services/map-mvt-California/rest/maps/California/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true&tileURLTemplate=ZXY',
  center: [-122.2543440112645, 38.236059513982674],
  zoom: 13,
  renderWorldCopies: false,
  crs: maplibregl.CRS.EPSG4326
});
```

### vectorstyles.json 参数

| 参数                  | 说明                             |
| --------------------- | -------------------------------- |
| `type=MapBox_GL`      | 返回 Mapbox GL 样式格式          |
| `styleonly=true`      | 仅返回样式配置，不返回其他元数据 |
| `tileURLTemplate=ZXY` | 使用 Z/X/Y 瓦片寻址模板          |

### 自定义坐标系（maplibregl.CRS）

标准分幅坐标可直接用内置常量：

- `maplibregl.CRS.EPSG3857`（默认，可省略）
- `maplibregl.CRS.EPSG4326`

地方坐标系需要自行构造，`extent` 为 `[左, 下, 右, 上]`：

```javascript
var map = new maplibregl.Map({
  container: 'map',
  style: styleUrl,
  crs: new maplibregl.CRS(
    'EPSG:2362',
    wkt, // 服务端 getWKT 返回的 WKT，或 Proj4 字符串
    [32876993.777095847, -10001970.421227315, 52880934.61955048, 10001970.421227315]
  ),
  center: [108.9118776, 23.8260365],
  zoom: 1
});
```

`maplibregl.CRS` 由 maplibre-gl-enhance 提供，必须引入 enhance 包；标准 3857/4326 场景不需要它。

## 方式三：手动 vector source

需要自定义样式（而不是沿用服务端样式）时，用原生 `vector` source 加自己的图层。示例见 `examples/maplibregl/mvtVectorTile.html`。

```javascript
var map = new maplibregl.Map({
  container: 'map',
  style: { version: 8, sources: {}, layers: [] },
  center: [108.9118, 30.0],
  zoom: 3
});

map.on('load', function () {
  map.addSource('iserver-vector', {
    type: 'vector',
    tiles: [
      'https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China/tileFeature.mvt?returnAttributes=true&width=512&height=512&viewBounds={bbox-epsg-3857}'
    ],
    tileSize: 512,
    minzoom: 0,
    maxzoom: 14
  });

  map.addLayer({
    id: 'world-continent-fill',
    type: 'fill',
    source: 'iserver-vector',
    'source-layer': 'World_Continent_pg@China',
    paint: { 'fill-color': '#e6ebc9', 'fill-opacity': 0.8 }
  });
});
```

- `source-layer` 是瓦片内的图层名，必须与服务端一致，不能猜。用 `vectorstyles.json`（方式二）或服务端图层列表确认。
- 点 / 线 / 面要分别 `addLayer`（`circle` / `line` / `fill`），可配合 `filter` 按几何类型拆分。
- 服务地址与 `source-layer` 更换后必须重新核实，示例中的值只对示例服务有效。

# iServer 数据服务（rest/data）加载矢量瓦片

数据服务不返回样式，`source-layer` 的命名规则是 `数据集名@数据源名`。

## 方式一：getRestDataInfo 自动生成 source 与 crs

`getRestDataInfo` 是写在页面里的工具函数（不是库 API），完整实现见 [rest-data-vector.md](../utils/rest-data-vector.md)。

```javascript
var dataUrl =
  'https://iserver.supermap.io/iserver/services/data-world/rest/data/datasources/World/datasets/World_P';

getRestDataInfo(dataUrl).then(function (info) {
  var map = new maplibregl.Map({
    container: 'map',
    style: { version: 8, sources: info.sources, layers: [] },
    center: [116.39, 39.9],
    zoom: 4,
    crs: info.crs.name
      ? new maplibregl.CRS(info.crs.name, '', info.crs.extent)
      : maplibregl.CRS.EPSG3857
  });

  map.on('load', function () {
    info.layers.forEach(function (layer) {
      map.addLayer(layer);
    });
  });
});
```

| 字段      | 说明                                          |
| --------- | --------------------------------------------- |
| `sources` | MapLibre 数据源配置，包含 `tiles` 与 bounds   |
| `layers`  | 图层配置，包含 `type`、`source-layer`、`paint` |
| `crs`     | 坐标系信息，包含 `name` 与 `extent`           |

数据集类型与图层类型的对应关系、以及 `getRestDataInfo` 的完整实现，见 [rest-data-vector.md](../utils/rest-data-vector.md)。

## 方式二：直接写 MVT Tile URL

已知数据集时可直接拼 URL（示例：`examples/maplibregl/mvtVectorTile_restdata.html`）：

```javascript
map.on('load', function () {
  map.addSource('railways', {
    type: 'vector',
    tiles: [
      'https://iserver.supermap.io/iserver/services/data-osm-line/rest/data/datasources/osm-line/datasets/railways/tileFeature.mvt?returnAttributes=true&width=512&height=512&x={x}&y={y}&scale={scale}&origin=%7Bx%3A-180%2Cy%3A90%7D'
    ],
    tileSize: 512,
    minzoom: 0,
    maxzoom: 14
  });

  map.addLayer({
    id: 'railways-line',
    type: 'line',
    source: 'railways',
    'source-layer': 'railways@osm-line', // 数据集名@数据源名
    paint: { 'line-color': '#0066cc', 'line-width': 1 }
  });
});
```

| 参数               | 说明                        |
| ------------------ | --------------------------- |
| `tileFeature.mvt`  | 返回 MVT 格式矢量瓦片       |
| `returnAttributes` | 是否返回要素属性            |
| `width` / `height` | 瓦片尺寸，通常 512          |
| `x={x}&y={y}`      | 瓦片行列号模板              |
| `scale={scale}`    | 非 3857/4326 坐标系需要补充 |
| `origin`           | 瓦片原点，4326 场景下需显式给 |

## 关键要点

- 加载 iServer 地图服务矢量瓦片：**优先方式一 `initMap({ type: 'vector-tile' })`**，服务端样式自带 `source-layer`。
- 要改样式或加字段驱动渲染：用方式三手动 source，逐几何类型 addLayer。
- 数据服务必须先确认 `数据集名@数据源名`；不确定就调 `getRestDataInfo`。
- 非 3857 坐标系必须引入 maplibre-gl-enhance 并配置 `maplibregl.CRS`，否则 `initMap` 会 reject；投影与叠加细节见 [coordinate-system.md](../../rules/coordinate-system.md)。
- 已核实示例：`examples/maplibregl/mvtVectorTile.html`、`mvtVectorTile_4326.html`、`mvtVectorTile_restdata.html`、`mvtVectorTile_Beijing_OSM.html`。
