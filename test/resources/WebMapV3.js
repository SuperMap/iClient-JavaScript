var mapstudioWebMap_background = JSON.stringify({
  sources: {},
  crs: 'EPSG:3857',
  center: [3.1638902212669554e-9, 5.664923641290895e-9],
  zoom: 0.8328899937067508,
  glyphs: {},
  version: '3.0.0',
  rootUrl: 'http://localhost:8190/iportal/services/../',
  maxzoom: 22,
  name: '空地图',
  viewExtent: [-313.4210570760131, 85.051129, 313.4210570760141, -85.05112899999985],
  layers: [{ paint: { 'background-color': 'rgba(228,30,30,1)' }, id: 'background', type: 'background' }],
  pitch: 0,
  minzoom: 0
});

var mapstudioWebMap_raster = JSON.stringify({
  sources: {
    PopulationDistribution_1635401107248_1: {
      tiles: [
        'https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark'
      ],
      tileSize: 256,
      bounds: [71.94738367915619, 3.4373340998870576, 135.08727119000017, 53.56026110410313],
      type: 'raster'
    },
    CHINA_DARK: {
      tiles: [
        'https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark'
      ],
      tileSize: 256,
      attribution: '',
      bounds: [-180, -90, 180, 90],
      type: 'raster'
    }
  },
  crs: 'EPSG:3857',
  center: [116.3949, 39.9478],
  zoom: 3.4124046147084117,
  glyphs: {},
  version: '3.0.0',
  rootUrl: 'http://localhost:8190/iportal/services/../',
  maxzoom: 22,
  name: 'restmap服务',
  viewExtent: [56.29988764148828, 56.54690484364866, 161.16883084629046, 8.623684226963277],
  layers: [
    { maxzoom: 12, id: 'CHINA_DARK', source: 'CHINA_DARK', type: 'raster', minzoom: 0 },
    { metadata: {}, source: 'PopulationDistribution_1635401107248_1', id: 'PopulationDistribution', type: 'raster' }
  ],
  pitch: 0,
  minzoom: 0
});

var mapstudioAppInfo = JSON.stringify({
  extent: null,
  controls: null,
  extentString: '',
  description: '',
  verifyReason: null,
  units: null,
  title: 'restmap服务',
  resolution: 0,
  checkStatus: 'SUCCESSFUL',
  projectInfo:
    '{"images":[],"datas":[],"baseLayer":{"visible":true,"id":"CHINA_DARK"},"layers":[{"id":"PopulationDistribution","title":"PopulationDistribution","zoomRange":[0,24]}],"groups":[],"version":"1.2.0"}',
  visitCount: 122,
  centerString: '{"x":1.210425350276273E7,"y":4315848.836257313}',
  epsgCode: 3857,
  nickname: 'admin_123',
  layers: [],
  id: 617580084,
  searchSetting: null,
  thumbnail: 'http://localhost:8190/iportal/services/../resources/thumbnail/map/map617580084.png',
  level: 3,
  center: { x: 12104253.50276273, y: 4315848.836257313 },
  authorizeSetting: [
    {
      permissionType: 'DELETE',
      aliasName: 'admin_123',
      entityRoles: ['ADMIN', 'SYSTEM'],
      entityType: 'USER',
      entityName: 'admin_123',
      entityId: null
    },
    {
      permissionType: 'READWRITE',
      aliasName: 'GUEST',
      entityRoles: [],
      entityType: 'USER',
      entityName: 'GUEST',
      entityId: null
    }
  ],
  updateTime: 1635401130784,
  userName: 'admin_123',
  tags: [],
  checkUser: null,
  checkUserNick: null,
  checkTime: null,
  sourceType: 'MAPSTUDIO',
  createTime: 1635401130784,
  controlsString: '',
  isDefaultBottomMap: false,
  status: null
});

var msSpriteInfo = JSON.stringify({
  rectangle: {
    sdf: true,
    pixelRatio: 1,
    width: 104,
    x: 0,
    y: 0,
    height: 104
  },
  circle: {
    sdf: true,
    pixelRatio: 1,
    width: 104,
    x: 104,
    y: 0,
    height: 104
  },
  triangle: {
    sdf: true,
    pixelRatio: 1,
    width: 104,
    x: 0,
    y: 104,
    height: 104
  },
  'polygon-83040554': {
    sdf: false,
    pixelRatio: 1,
    width: 76,
    x: 104,
    y: 104,
    height: 76
  }
});
var msProjectINfo_symbol = JSON.stringify({
  extent: {
    top: 39.060244465996576,
    left: 115.3932226740005,
    bottom: 40.7783804924719,
    leftBottom: {
      x: 115.3932226740005,
      y: 40.7783804924719
    },
    right: 117.94649844460855,
    rightTop: {
      x: 117.94649844460855,
      y: 39.060244465996576
    }
  },
  controls: null,
  extentString:
    '{"top":39.060244465996576,"left":115.3932226740005,"bottom":40.7783804924719,"leftBottom":{"x":115.3932226740005,"y":40.7783804924719},"right":117.94649844460855,"rightTop":{"x":117.94649844460855,"y":39.060244465996576}}',
  description: '',
  verifyReason: null,
  units: null,
  title: 'ms-点',
  resolution: 0,
  checkStatus: 'SUCCESSFUL',
  projectInfo:
    '{"images":"http://localhost:8190/iportal/web/maps/617580084/sprites/sprite","catalogs":[{"visualization":{"renderer":[{"lineDasharray":{"type":"simple","value":[1,0]},"color":{"field":["smpid"],"defaultValue":"#ffffff","values":[{"value":"#D53E4F","key":1},{"value":"#3288BD","key":3}],"ribbon":["#D53E4F","#FC8D59","#FEE08B","#FFFFBF","#E6F598","#99D594","#3288BD"],"interpolateInfo":{"type":"linear"},"type":"unique"},"lineTranslateAnchor":{"type":"simple","value":"map"},"lineMiterLimit":{"type":"simple","value":2},"lineOffset":{"type":"simple","value":0},"lineJoin":{"type":"simple","value":"miter"},"lineRoundLimit":{"type":"simple","value":1.05},"lineTranslate":{"type":"simple","value":[0,0]},"styleRenderMode":"mapboxgl","symbolsContent":{"field":["smpid"],"defaultValue":{"symbolId":"line-83030269","style":[{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":-2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}},{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}}]},"values":[{"value":{"symbolId":"line-83030269","style":[{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":-2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}},{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}}]},"key":1},{"value":{"symbolId":"line-83030269","style":[{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":-2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}},{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}}]},"key":2},{"value":{"symbolId":"line-83030269","style":[{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":-2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}},{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}}]},"key":3}],"interpolateInfo":{"type":"custom"},"type":"unique"},"lineGapWidth":{"type":"simple","value":0},"lineCap":{"type":"simple","value":"butt"},"width":{"type":"simple","value":4.92},"opacity":{"type":"simple"}}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1712736126050_150","bounds":[116.10214436813241,39.72316247533395,116.4357788812853,40.088344539540586],"showLegend":true,"id":"北京市轨道交通线路减","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"终点y","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"标准名称","type":"FIELD"},{"fieldName":"起点x","type":"FIELD"},{"fieldName":"起点y","type":"FIELD"},{"fieldName":"testID","type":"FIELD"},{"fieldName":"终点x","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"北京市轨道交通线路减"},"title":"北京市轨道交通线路减","layerSourceType":"Data","layersContent":["ms_composite_symbol_北京市轨道交通线路减_1712739736707_14","ms_composite_symbol_北京市轨道交通线路减_1712739736707_15","ms_composite_symbol_北京市轨道交通线路减_1712739736707_16","ms_composite_symbol_北京市轨道交通线路减_1712739736707_17","ms_composite_symbol_北京市轨道交通线路减_1712739736707_18","ms_composite_symbol_北京市轨道交通线路减_1712739736707_19","ms_composite_symbol_北京市轨道交通线路减_1712739736707_20"]},{"visualization":{"renderer":[{"rotate":{"type":"simple","value":0},"textLetterSpacing":{"type":"simple","value":0},"textTranslate":{"type":"simple","value":[0,0]},"color":{"type":"simple","value":"rgba(0,255,228,1)"},"textZOffset":{"type":"simple","value":0},"symbolPlacement":{"type":"simple","value":"point"},"textAnchor":{"type":"simple","value":"center"},"translate":{"type":"simple","value":[50,0]},"textRotate":{"type":"simple","value":0},"textField":{"type":"simple","value":""},"styleRenderMode":"mapboxgl","textHaloBlur":{"type":"simple","value":2},"transform":{"type":"simple","value":"none"},"symbolsContent":{"field":["smpid"],"defaultValue":{"symbolId":"rectangle","style":{"layout":{"icon-image":"rectangle"}}},"values":[{"value":{"symbolId":"rectangle","style":{"layout":{"icon-image":"rectangle"}}},"key":1},{"value":{"symbolId":"circle","style":{"layout":{"icon-image":"circle"}}},"key":2},{"value":{"symbolId":"triangle","style":{"layout":{"icon-image":"triangle"}}},"key":3},{"value":{"symbolId":"rectangle","style":{"layout":{"icon-image":"rectangle"}}},"key":4}],"interpolateInfo":{"type":"custom"},"type":"unique"},"textTranslateAnchor":{"type":"simple","value":"map"},"justify":{"type":"simple","value":"center"},"ignorePlacement":{"type":"simple","value":false},"textAllowOverlap":{"type":"simple","value":true},"maxWidth":{"type":"simple","value":10},"textSize":{"type":"simple","value":16},"textHaloColor":{"type":"simple","value":"#242424"},"textColor":{"type":"simple","value":"#FFFFFF"},"size":{"type":"simple","value":20},"allowOverlap":{"type":"simple","value":true},"translateAnchor":{"type":"simple","value":"map"},"anchor":{"type":"simple","value":"center"},"textOpacity":{"type":"simple","value":1},"textHaloWidth":{"type":"simple","value":1},"lineHeight":{"type":"simple","value":1.2},"textFont":{"type":"simple","value":["Microsoft YaHei"]},"textIgnorePlacement":{"type":"simple","value":false},"opacity":{"type":"simple","value":0.9}}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1712735782333_13","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"id":"ms_站点3_1712735857741_21","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"站点3","layerSourceType":"Data"},{"visualization":{"renderer":[{"symbolsContent":{"type":"simple","value":{"symbolId":"circle","style":{"layout":{"icon-image":"circle"}}}},"size":{"type":"simple","value":8},"color":{"type":"simple","value":"#EE4D5A"},"translateAnchor":{"type":"simple","value":"map"},"opacity":{"type":"simple","value":0.9},"translate":{"type":"simple","value":[0,0]},"styleRenderMode":"mapboxgl"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1712735782333_13","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"id":"站点3","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"站点3","layerSourceType":"Data"},{"visualization":{"renderer":[{"field":"smpid","color":[{"color":"#0000ff"},{"color":"#00ffff"},{"color":"#00ff00"},{"color":"#ffff00"},{"color":"#ff0000"}],"radius":20,"opacity":1,"type":"heat"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1712735782333_13","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"id":"ms_站点3_1712735793051_16","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"站点3","layerSourceType":"Data"},{"visualization":{"renderer":[{"fillExtrusionTranslateAnchor":{"type":"simple","value":"map"},"fillExtrusionVerticalGradient":{"type":"simple","value":true},"color":{"type":"simple"},"fillExtrusionBase":{"type":"simple","value":0},"fillExtrusionBaseMultiple":{"type":"simple"},"styleRenderMode":"mapboxgl","fillExtrusionHeightMultiple":{"type":"simple"},"symbolsContent":{"field":["smpid"],"defaultValue":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"values":[{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":1},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":10},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":11},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":12},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":13},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":14},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":15},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":16},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":2},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":3},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":4},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":5},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":6},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":7},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":8},{"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}},"key":9}],"interpolateInfo":{"type":"custom"},"type":"unique"},"fillExtrusionTranslate":{"type":"simple","value":[0,0]},"antialias":{"type":"simple","value":true},"outlineColor":{"type":"simple","value":"#FFFFFF"},"opacity":{"type":"simple","value":0.9},"fillExtrusionHeight":{"type":"simple","value":0}}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1712735745613_10","bounds":[115.423411,39.442758,117.514583,41.0608],"id":"北京市","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"parent","type":"FIELD"},{"fieldName":"adcode","type":"FIELD"},{"fieldName":"level","type":"FIELD"},{"fieldName":"centroid","type":"FIELD"},{"fieldName":"childrenNum","type":"FIELD"},{"fieldName":"center","type":"FIELD"},{"fieldName":"subFeatureIndex","type":"FIELD"},{"fieldName":"name","type":"FIELD"},{"fieldName":"acroutes","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"北京市"},"title":"北京市","layerSourceType":"Data"}],"datas":[{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"上海疫情点标注(1)","msDatasetId":"ms_datasetId_1712731623855_7","datasetId":"443715040","geometryField":"geometry"}],"title":"上海疫情点标注(1)"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"北京市","msDatasetId":"ms_datasetId_1712735745613_10","datasetId":"435608982","geometryField":"geometry"}],"title":"北京市"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"站点3","msDatasetId":"ms_datasetId_1712735782333_13","datasetId":"1755873792","geometryField":"geometry"}],"title":"站点3"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"未命名数据(1)","msDatasetId":"ms_datasetId_1712736088320_147","datasetId":"680165081","geometryField":"geometry"}],"title":"未命名数据(1)"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"北京市轨道交通线路减","msDatasetId":"ms_datasetId_1712736126050_150","datasetId":"2111415064","geometryField":"geometry"}],"title":"北京市轨道交通线路减"}],"baseLayer":{"internetMapName":"CHINA_DARK","type":"INTERNET_MAP"},"version":"3.0.3"}',
  visitCount: 7,
  centerString: '{"x":1.2987629468383811E7,"y":4855006.171145054}',
  epsgCode: 3857,
  nickname: 'admin_123',
  layers: null,
  id: 617580084,
  searchSetting: null,
  thumbnail: 'http://localhost:8190/iportal/resources/thumbnail/map/map249495311.png',
  level: 8,
  center: {
    x: 1.2987629468383811e7,
    y: 4855006.171145054
  },
  authorizeSetting: [
    {
      permissionType: 'DELETE',
      aliasName: 'admin_123',
      entityRoles: ['ADMIN', 'SYSTEM'],
      entityType: 'USER',
      entityName: 'admin_123',
      entityId: null
    },
    {
      permissionType: 'READWRITE',
      aliasName: 'GUEST',
      entityRoles: [],
      entityType: 'USER',
      entityName: 'GUEST',
      entityId: null
    }
  ],
  updateTime: 1712739748056,
  userName: 'admin_123',
  tags: [],
  checkUser: null,
  checkUserNick: null,
  checkTime: null,
  sourceType: 'MAPSTUDIO',
  createTime: 1712731634188,
  controlsString: '',
  isDefaultBottomMap: false,
  status: null,
  favoriteCount: 0
});
var mapstudioWebMap_symbol = JSON.stringify({
  metadata: {
    layerCatalog: [
      {
        visible: true,
        parts: [
          'ms_composite_symbol_北京市轨道交通线路减_1712739736707_14',
          'ms_composite_symbol_北京市轨道交通线路减_1712739736707_15',
          'ms_composite_symbol_北京市轨道交通线路减_1712739736707_16',
          'ms_composite_symbol_北京市轨道交通线路减_1712739736707_17',
          'ms_composite_symbol_北京市轨道交通线路减_1712739736707_18',
          'ms_composite_symbol_北京市轨道交通线路减_1712739736707_19',
          'ms_composite_symbol_北京市轨道交通线路减_1712739736707_20'
        ],
        id: '北京市轨道交通线路减',
        title: '北京市轨道交通线路减',
        type: 'composite'
      },
      {
        visible: true,
        id: 'ms_站点3_1712735857741_21',
        title: '站点3',
        type: 'basic'
      },
      {
        visible: true,
        id: '站点3',
        title: '站点3',
        type: 'basic'
      },
      {
        visible: true,
        id: 'ms_站点3_1712735793051_16',
        title: '站点3',
        type: 'basic'
      },
      {
        visible: true,
        id: '北京市',
        title: '北京市',
        type: 'basic'
      }
    ]
  },
  sources: {
    ms_435608982_1712735745629_12: {
      tiles: [
        'http://localhost:8190/iportal/services/../web/datas/435608982/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22parent%22%2C%22adcode%22%2C%22level%22%2C%22centroid%22%2C%22childrenNum%22%2C%22center%22%2C%22subFeatureIndex%22%2C%22name%22%2C%22acroutes%22%2C%22geometry%22%5D&geometryFieldName=geometry'
      ],
      bounds: [115.423411, 39.442758, 117.514583, 41.0608],
      type: 'vector'
    },
    CHINA_DARK: {
      tiles: [
        'https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark'
      ],
      tileSize: 256,
      attribution: '',
      bounds: [-180, -90, 180, 90],
      type: 'raster'
    },
    ms_1755873792_1712735857741_22: {
      tiles: [
        'http://localhost:8190/iportal/services/../web/datas/1755873792/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%221111%E6%A0%87%E5%87%86%E5%90%8D%E7%A7%B0%22%2C%22SmID%22%2C%22SmGeometrySize%22%2C%221111SmUserID%22%2C%22SmY%22%2C%22SmGeoPosition%22%2C%22SmX%22%2C%22SmLibTileID%22%2C%22geometry%22%5D&geometryFieldName=geometry'
      ],
      bounds: [116.36331703990744, 39.89942692791154, 116.38141290077355, 39.9767738835847],
      type: 'vector'
    },
    ms_aggregation_1755873792_1712735796586_18: {
      tiles: [
        'http://localhost:8190/iportal/web/datas/1755873792/structureddata/aggregation.mvt?zxyFilter={z},{x},{y},3857&pixelGroupBy=%7B%22aggCellSize%22%3A1%2C%22aggCellUnit%22%3A%22PX%22%7D&aggType=AVG&aggField=smpid'
      ],
      bounds: [116.36331703990744, 39.89942692791154, 116.38141290077355, 39.9767738835847],
      type: 'vector'
    },
    ms_1755873792_1712735782349_15: {
      tiles: [
        'http://localhost:8190/iportal/services/../web/datas/1755873792/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%221111%E6%A0%87%E5%87%86%E5%90%8D%E7%A7%B0%22%2C%22SmID%22%2C%22SmGeometrySize%22%2C%221111SmUserID%22%2C%22SmY%22%2C%22SmGeoPosition%22%2C%22SmX%22%2C%22SmLibTileID%22%2C%22geometry%22%5D&geometryFieldName=geometry'
      ],
      bounds: [116.36331703990744, 39.89942692791154, 116.38141290077355, 39.9767738835847],
      type: 'vector'
    },
    ms_2111415064_1712736129943_152: {
      tiles: [
        'http://localhost:8190/iportal/services/../web/datas/2111415064/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22%E7%BB%88%E7%82%B9y%22%2C%22SmID%22%2C%22%E6%A0%87%E5%87%86%E5%90%8D%E7%A7%B0%22%2C%22%E8%B5%B7%E7%82%B9x%22%2C%22%E8%B5%B7%E7%82%B9y%22%2C%22testID%22%2C%22%E7%BB%88%E7%82%B9x%22%2C%22geometry%22%5D&geometryFieldName=geometry'
      ],
      bounds: [116.10214436813241, 39.72316247533395, 116.4357788812853, 40.088344539540586],
      type: 'vector'
    }
  },
  crs: 'EPSG:3857',
  center: [116.3949, 39.9478],
  zoom: 8.122497304292184,
  glyphs: {},
  version: '3.1.4',
  rootUrl: 'http://localhost:8190/iportal/',
  maxzoom: 12,
  name: 'ms-点',
  viewExtent: [115.3932226740005, 40.7783804924719, 117.94649844460855, 39.060244465996576],
  layers: [
    {
      metadata: {},
      maxzoom: 12,
      id: 'CHINA_DARK',
      source: 'CHINA_DARK',
      type: 'raster',
      minzoom: 0
    },
    {
      metadata: {},
      paint: {
        'fill-outline-color': '#FFFFFF',
        'fill-pattern': [
          'match',
          ['get', 'smpid'],
          1,
          'polygon-83040554',
          10,
          'polygon-83040554',
          11,
          'polygon-83040554',
          12,
          'polygon-83040554',
          13,
          'polygon-83040554',
          14,
          'polygon-83040554',
          15,
          'polygon-83040554',
          16,
          'polygon-83040554',
          2,
          'polygon-83040554',
          3,
          'polygon-83040554',
          4,
          'polygon-83040554',
          5,
          'polygon-83040554',
          6,
          'polygon-83040554',
          7,
          'polygon-83040554',
          8,
          'polygon-83040554',
          9,
          'polygon-83040554',
          'polygon-83040554'
        ],
        'fill-opacity': 0.9
      },
      id: '北京市',
      source: 'ms_435608982_1712735745629_12',
      'source-layer': '435608982$geometry',
      type: 'fill'
    },
    {
      layout: {
        visibility: 'visible'
      },
      metadata: {},
      paint: {
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(0,0,0,0)',
          0.2,
          '#0000ff',
          0.4,
          '#00ffff',
          0.6,
          '#00ff00',
          0.8,
          '#ffff00',
          1,
          '#ff0000'
        ],
        'heatmap-opacity': 1,
        'heatmap-weight': ['get', 'weight'],
        'heatmap-radius': 20
      },
      id: 'ms_站点3_1712735793051_16',
      source: 'ms_aggregation_1755873792_1712735796586_18',
      'source-layer': '1755873792$geometry',
      type: 'heatmap'
    },
    {
      metadata: {},
      paint: {
        'circle-color': '#EE4D5A',
        'circle-opacity': 0.9,
        'circle-translate-anchor': 'map',
        'circle-radius': 4,
        'circle-translate': [0, 0]
      },
      id: '站点3',
      source: 'ms_1755873792_1712735782349_15',
      'source-layer': '1755873792$geometry',
      type: 'circle'
    },
    {
      layout: {
        'icon-allow-overlap': true,
        'text-line-height': 1.2,
        visibility: 'visible',
        'text-anchor': 'center',
        'text-size': 16,
        'text-allow-overlap': true,
        'icon-size': 0.2,
        'symbol-placement': 'point',
        'icon-image': [
          'match',
          ['get', 'smpid'],
          1,
          'rectangle',
          2,
          'circle',
          3,
          'triangle',
          4,
          'rectangle',
          'rectangle'
        ],
        'icon-ignore-placement': false,
        'text-font': ['Microsoft YaHei'],
        'text-rotate': 0,
        'text-transform': 'none',
        'text-justify': 'center',
        'text-letter-spacing': 0,
        'text-max-width': 10,
        'icon-anchor': 'center',
        'text-ignore-placement': false,
        'icon-rotate': 0
      },
      metadata: {},
      paint: {
        'icon-translate': [50, 0],
        'text-halo-color': '#242424',
        'text-translate-anchor': 'map',
        'icon-color': 'rgba(0,255,228,1)',
        'text-halo-blur': 2,
        'icon-translate-anchor': 'map',
        'text-color': '#FFFFFF',
        'text-halo-width': 1,
        'icon-opacity': 0.9,
        'text-opacity': 1,
        'text-translate': [0, 0]
      },
      id: 'ms_站点3_1712735857741_21',
      source: 'ms_1755873792_1712735857741_22',
      'source-layer': '1755873792$geometry',
      type: 'symbol'
    },
    {
      filter: ['==', 'smpid', 1],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {},
      paint: {
        'line-width': 0.38,
        'line-offset': -2.27,
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: '北京市轨道交通线路减',
      source: 'ms_2111415064_1712736129943_152',
      'source-layer': '2111415064$geometry',
      type: 'line'
    },
    {
      filter: ['==', 'smpid', 1],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {},
      paint: {
        'line-width': 0.38,
        'line-offset': 2.27,
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: 'ms_composite_symbol_北京市轨道交通线路减_1712739736707_14',
      source: 'ms_2111415064_1712736129943_152',
      'source-layer': '2111415064$geometry',
      type: 'line'
    },
    {
      filter: ['==', 'smpid', 2],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {},
      paint: {
        'line-width': 0.38,
        'line-offset': -2.27,
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: 'ms_composite_symbol_北京市轨道交通线路减_1712739736707_15',
      source: 'ms_2111415064_1712736129943_152',
      'source-layer': '2111415064$geometry',
      type: 'line'
    },
    {
      filter: ['==', 'smpid', 2],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {},
      paint: {
        'line-width': 0.38,
        'line-offset': 2.27,
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: 'ms_composite_symbol_北京市轨道交通线路减_1712739736707_16',
      source: 'ms_2111415064_1712736129943_152',
      'source-layer': '2111415064$geometry',
      type: 'line'
    },
    {
      filter: ['==', 'smpid', 3],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {},
      paint: {
        'line-width': 0.38,
        'line-offset': -2.27,
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: 'ms_composite_symbol_北京市轨道交通线路减_1712739736707_17',
      source: 'ms_2111415064_1712736129943_152',
      'source-layer': '2111415064$geometry',
      type: 'line'
    },
    {
      filter: ['==', 'smpid', 3],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {},
      paint: {
        'line-width': 0.38,
        'line-offset': 2.27,
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: 'ms_composite_symbol_北京市轨道交通线路减_1712739736707_18',
      source: 'ms_2111415064_1712736129943_152',
      'source-layer': '2111415064$geometry',
      type: 'line'
    },
    {
      filter: ['none', ['==', 'smpid', 1], ['==', 'smpid', 2], ['==', 'smpid', 3]],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {},
      paint: {
        'line-width': 0.38,
        'line-offset': -2.27,
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: 'ms_composite_symbol_北京市轨道交通线路减_1712739736707_19',
      source: 'ms_2111415064_1712736129943_152',
      'source-layer': '2111415064$geometry',
      type: 'line'
    },
    {
      filter: ['none', ['==', 'smpid', 1], ['==', 'smpid', 2], ['==', 'smpid', 3]],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {},
      paint: {
        'line-width': 0.38,
        'line-offset': 2.27,
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: 'ms_composite_symbol_北京市轨道交通线路减_1712739736707_20',
      source: 'ms_2111415064_1712736129943_152',
      'source-layer': '2111415064$geometry',
      type: 'line'
    }
  ],
  sprite: 'http://localhost:9876/base/resources/data/sprite',
  pitch: 0,
  minzoom: 0
});
