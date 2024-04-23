var mapstudioWebMap_background = JSON.stringify({
  metadata: {
    layerCatalog: []
  },
  sources: {},
  crs: 'EPSG:3857',
  center: [0, 2.5444437451708134e-14],
  zoom: 0.7960395883717759,
  glyphs: {},
  version: '3.1.5',
  rootUrl: 'http://localhost:8190/iportal/',
  maxzoom: 12,
  viewExtent: [-172.71091358521875, 85.05112900000005, 172.71091358521878, -85.05112900000015],
  name: '空地图',
  layers: [
    {
      metadata: {},
      paint: {
        'background-color': '#242424'
      },
      id: 'ms-background',
      type: 'background'
    }
  ],
  pitch: 0,
  minzoom: 0
});

var masBackgroundAppInfo = JSON.stringify({
  extent: {
    top: -85.05112900000015,
    left: -172.71091358521875,
    bottom: 85.05112900000005,
    leftBottom: {
      x: -172.71091358521875,
      y: 85.05112900000005
    },
    right: 172.71091358521878,
    rightTop: {
      x: 172.71091358521878,
      y: -85.05112900000015
    }
  },
  controls: null,
  extentString:
    '{"top":-85.05112900000015,"left":-172.71091358521875,"bottom":85.05112900000005,"leftBottom":{"x":-172.71091358521875,"y":85.05112900000005},"right":172.71091358521878,"rightTop":{"x":172.71091358521878,"y":-85.05112900000015}}',
  description: '',
  verifyReason: null,
  units: null,
  title: 'ms-background',
  resolution: 0,
  checkStatus: 'SUCCESSFUL',
  projectInfo:
    '{"catalogs":[],"datas":[],"baseLayer":{"color":"#242424","projection":"EPSG:3857","type":"BACKGROUND"},"version":"3.0.3"}',
  visitCount: 0,
  centerString: '{"x":0,"y":2.5444437451708134E-14}',
  epsgCode: 3857,
  nickname: 'admin_123',
  layers: null,
  id: 2103260949,
  searchSetting: null,
  thumbnail: 'http://localhost:8190/iportal/resources/thumbnail/map/map2103260949.png',
  level: 0,
  center: {
    x: 0,
    y: 2.5444437451708134e-14
  },
  authorizeSetting: [
    {
      permissionType: 'DELETE',
      aliasName: 'admin_123',
      entityRoles: ['ADMIN', 'SYSTEM'],
      entityType: 'USER',
      entityName: 'admin_123',
      entityId: null
    }
  ],
  updateTime: 1713756541302,
  userName: 'admin_123',
  tags: [],
  checkUser: null,
  checkUserNick: null,
  checkTime: null,
  sourceType: 'MAPSTUDIO',
  createTime: 1713756540071,
  controlsString: '',
  isDefaultBottomMap: false,
  status: null,
  favoriteCount: 0
});

var mapstudioWebMap_raster = JSON.stringify({
  sources: {
    PopulationDistribution_1635401107248_1: {
      tiles: ['https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark'],
      tileSize: 256,
      bounds: [71.94738367915619, 3.4373340998870576, 135.08727119000017, 53.56026110410313],
      type: 'raster'
    },
    CHINA_DARK: {
      tiles: ['https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark'],
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
  minzoom: 0,
  metadata: {
    layerCatalog: [
      {
        visible: true,
        id: 'PopulationDistribution',
        title: 'PopulationDistribution',
        type: 'basic'
      }
    ]
  }
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
    '{"catalogs":[{"catalogType":"layer","id":"PopulationDistribution","title":"PopulationDistribution","layerSourceType":"TileService"}],"datas":[],"baseLayer":{"internetMapName":"CHINA_DARK","type":"INTERNET_MAP"},"version":"3.0.3"}',
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
    '{"images":"http://localhost:9876/base/resources/data/sprite","catalogs":[{"visualization":{"renderer":{"rotate":{"type":"simple","value":0},"textLetterSpacing":{"type":"simple","value":0},"textTranslate":{"type":"simple","value":[0,0]},"color":{"type":"simple","value":"#EE4D5A"},"symbolPlacement":{"type":"simple","value":"point"},"textAnchor":{"type":"simple","value":"center"},"type":"point-cluster","translate":{"type":"simple","value":[0,0]},"textRotate":{"type":"simple","value":0},"textField":{"type":"simple","value":"weight"},"textHaloBlur":{"type":"simple","value":2},"transform":{"type":"simple","value":"none"},"symbolsContent":{"type":"simple","value":{"symbolId":"circle","style":{"layout":{"icon-image":"circle"}}}},"textTranslateAnchor":{"type":"simple","value":"map"},"justify":{"type":"simple","value":"center"},"ignorePlacement":{"type":"simple","value":false},"textAllowOverlap":{"type":"simple","value":true},"maxWidth":{"type":"simple","value":10},"textSize":{"type":"simple","value":12},"textHaloColor":{"type":"simple","value":"#242424"},"textColor":{"type":"simple","value":"#FFFFFF"},"size":{"field":"weight","type":"linear","value":[{"value":8,"key":1},{"value":100,"key":4}]},"allowOverlap":{"type":"simple","value":true},"translateAnchor":{"type":"simple","value":"map"},"anchor":{"type":"simple","value":"center"},"textOpacity":{"type":"simple","value":1},"textHaloWidth":{"type":"simple","value":1},"lineHeight":{"type":"simple","value":1.2},"textFont":{"type":"simple","value":["Microsoft YaHei"]},"textIgnorePlacement":{"type":"simple","value":false},"opacity":{"type":"simple","value":0.9}}},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1713695373901_183","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"showLegend":true,"id":"ms_站点3_1713695373911_194","source":{"option":{"clusterOption":{"aggType":"COUNT","groupBy":{"aggCellSize":100,"aggCellUnit":"PX"}},"cluster":true}},"popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"站点3","layerSourceType":"Data"},{"visualization":{"renderer":[{"lineDasharray":{"type":"simple","value":[1,0]},"color":{"field":["smpid"],"defaultValue":"#ffffff","values":[{"value":"#D53E4F","key":1},{"value":"#3288BD","key":3}],"ribbon":["#D53E4F","#FC8D59","#FEE08B","#FFFFBF","#E6F598","#99D594","#3288BD"],"interpolateInfo":{"type":"linear"},"type":"unique"},"lineTranslateAnchor":{"type":"simple","value":"map"},"lineMiterLimit":{"type":"simple","value":2},"lineOffset":{"type":"simple","value":0},"lineJoin":{"type":"simple","value":"miter"},"lineRoundLimit":{"type":"simple","value":1.05},"lineTranslate":{"type":"simple","value":[0,0]},"styleRenderMode":"mapboxgl","symbolsContent":{"field":["smpid"],"defaultValue":{"symbolId":"line-83030269","style":[{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":-2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}},{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}}]},"values":[{"value":{"symbolId":"line-83030269","style":[{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":-2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}},{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}}]},"key":1},{"value":{"symbolId":"line-83030269","style":[{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":-2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}},{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}}]},"key":2},{"value":{"symbolId":"line-83030269","style":[{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":-2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}},{"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":0.38,"line-offset":2.27,"line-dasharray":[69.63,29.84,318.26,0],"line-color":"rgba(255, 0, 0, 1.00)"}}]},"key":3}],"interpolateInfo":{"type":"custom"},"type":"unique"},"lineGapWidth":{"type":"simple","value":0},"lineCap":{"type":"simple","value":"butt"},"width":{"field":["smpid"],"defaultValue":4.92,"values":[{"value":2,"key":1},{"value":20,"key":3}],"interpolateInfo":{"type":"linear"},"type":"unique"},"opacity":{"type":"simple"}}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1712736126050_150","bounds":[116.10214436813241,39.72316247533395,116.4357788812853,40.088344539540586],"showLegend":true,"id":"北京市轨道交通线路减","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"终点y","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"标准名称","type":"FIELD"},{"fieldName":"起点x","type":"FIELD"},{"fieldName":"起点y","type":"FIELD"},{"fieldName":"testID","type":"FIELD"},{"fieldName":"终点x","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"北京市轨道交通线路减"},"title":"北京市轨道交通线路减","layerSourceType":"Data","layersContent":["ms_composite_symbol_北京市轨道交通线路减_1712908151359_384","ms_composite_symbol_北京市轨道交通线路减_1712908151359_385","ms_composite_symbol_北京市轨道交通线路减_1712908151359_386","ms_composite_symbol_北京市轨道交通线路减_1712908151359_387","ms_composite_symbol_北京市轨道交通线路减_1712908151359_388","ms_composite_symbol_北京市轨道交通线路减_1712908151359_389","ms_composite_symbol_北京市轨道交通线路减_1712908151359_390"]},{"visualization":{"renderer":[{"rotate":{"type":"simple","value":0},"textLetterSpacing":{"type":"simple","value":0},"textTranslate":{"type":"simple","value":[0,0]},"color":{"type":"simple","value":"rgba(0,255,228,1)"},"textZOffset":{"type":"simple","value":0},"symbolPlacement":{"type":"simple","value":"point"},"textAnchor":{"type":"simple","value":"center"},"translate":{"type":"simple","value":[50,0]},"textRotate":{"type":"simple","value":0},"textField":{"type":"simple","value":""},"styleRenderMode":"mapboxgl","textHaloBlur":{"type":"simple","value":2},"transform":{"type":"simple","value":"none"},"symbolsContent":{"field":["smpid"],"defaultValue":{"symbolId":"rectangle","style":{"layout":{"icon-image":"rectangle"}}},"values":[{"value":{"symbolId":"rectangle","style":{"layout":{"icon-image":"rectangle"}}},"key":1},{"value":{"symbolId":"circle","style":{"layout":{"icon-image":"circle"}}},"key":2},{"value":{"symbolId":"triangle","style":{"layout":{"icon-image":"triangle"}}},"key":3},{"value":{"symbolId":"rectangle","style":{"layout":{"icon-image":"rectangle"}}},"key":4}],"interpolateInfo":{"type":"custom"},"type":"unique"},"textTranslateAnchor":{"type":"simple","value":"map"},"justify":{"type":"simple","value":"center"},"ignorePlacement":{"type":"simple","value":false},"textAllowOverlap":{"type":"simple","value":true},"maxWidth":{"type":"simple","value":10},"textSize":{"type":"simple","value":16},"textHaloColor":{"type":"simple","value":"#242424"},"textColor":{"type":"simple","value":"#FFFFFF"},"size":{"type":"simple","value":20},"allowOverlap":{"type":"simple","value":true},"translateAnchor":{"type":"simple","value":"map"},"anchor":{"type":"simple","value":"center"},"textOpacity":{"type":"simple","value":1},"textHaloWidth":{"type":"simple","value":1},"lineHeight":{"type":"simple","value":1.2},"textFont":{"type":"simple","value":["Microsoft YaHei"]},"textIgnorePlacement":{"type":"simple","value":false},"opacity":{"type":"simple","value":0.9}}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1712735782333_13","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"id":"ms_站点3_1712735857741_21","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"站点3","layerSourceType":"Data"},{"visualization":{"renderer":[{"symbolsContent":{"type":"simple","value":{"symbolId":"circle","style":{"layout":{"icon-image":"circle"}}}},"size":{"type":"simple","value":8},"color":{"type":"simple","value":"#EE4D5A"},"translateAnchor":{"type":"simple","value":"map"},"opacity":{"type":"simple","value":0.9},"translate":{"type":"simple","value":[0,0]},"styleRenderMode":"mapboxgl"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1712735782333_13","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"id":"站点3","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"站点3","layerSourceType":"Data"},{"visualization":{"renderer":[{"field":"smpid","color":[{"color":"#0000ff"},{"color":"#00ffff"},{"color":"#00ff00"},{"color":"#ffff00"},{"color":"#ff0000"}],"radius":20,"opacity":1,"type":"heat"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1712735782333_13","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"id":"ms_站点3_1712735793051_16","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"站点3","layerSourceType":"Data"},{"visualization":{"renderer":[{"fillExtrusionTranslateAnchor":{"type":"simple","value":"map"},"fillExtrusionVerticalGradient":{"type":"simple","value":true},"color":{"type":"simple"},"fillExtrusionBase":{"type":"simple","value":0},"fillExtrusionBaseMultiple":{"type":"simple"},"styleRenderMode":"mapboxgl","fillExtrusionHeightMultiple":{"type":"simple"},"symbolsContent":{"field":["smpid"],"defaultValue":{"symbolId":"polygon-0","style":{"paint":{"fill-color":"#826DBA"}}},"values":[{"start":1,"end":3.5,"value":{"symbolId":"polygon-83040554","style":{"paint":{"fill-pattern":"polygon-83040554"}}}},{"start":3.5,"end":6,"value":{"symbolId":"polygon-0","style":{"paint":{"fill-color":"#826DBA"}}}},{"start":6,"end":8.5,"value":{"symbolId":"polygon-0","style":{"paint":{"fill-color":"#826DBA"}}}},{"start":8.5,"end":11,"value":{"symbolId":"polygon-0","style":{"paint":{"fill-color":"#826DBA"}}}},{"start":11,"end":13.5,"value":{"symbolId":"polygon-0","style":{"paint":{"fill-color":"#826DBA"}}}},{"start":13.5,"end":16.1,"value":{"symbolId":"polygon-0","style":{"paint":{"fill-color":"#826DBA"}}}}],"type":"range","segmentMethod":"EQUALINTERVAL","segmentCount":6},"fillExtrusionTranslate":{"type":"simple","value":[0,0]},"antialias":{"type":"simple","value":true},"outlineColor":{"field":["smpid"],"defaultValue":"#ffffff","values":[{"value":"#D53E4F","key":1},{"value":"#3288BD","key":16}],"ribbon":["#D53E4F","#FC8D59","#FEE08B","#FFFFBF","#E6F598","#99D594","#3288BD"],"interpolateInfo":{"type":"linear"},"type":"unique"},"opacity":{"type":"simple","value":0.9},"fillExtrusionHeight":{"type":"simple","value":0}}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1712735745613_10","bounds":[115.423411,39.442758,117.514583,41.0608],"showLegend":true,"id":"北京市","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"parent","type":"FIELD"},{"fieldName":"adcode","type":"FIELD"},{"fieldName":"level","type":"FIELD"},{"fieldName":"centroid","type":"FIELD"},{"fieldName":"childrenNum","type":"FIELD"},{"fieldName":"center","type":"FIELD"},{"fieldName":"subFeatureIndex","type":"FIELD"},{"fieldName":"name","type":"FIELD"},{"fieldName":"acroutes","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"北京市"},"title":"北京市","layerSourceType":"Data","layersContent":["ms_北京市_1712822459356_412"]}],"datas":[{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"上海疫情点标注(1)","msDatasetId":"ms_datasetId_1712731623855_7","datasetId":"443715040","geometryField":"geometry"}],"title":"上海疫情点标注(1)"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"北京市","msDatasetId":"ms_datasetId_1712735745613_10","datasetId":"435608982","geometryField":"geometry"}],"title":"北京市"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"站点3","msDatasetId":"ms_datasetId_1712735782333_13","datasetId":"1755873792","geometryField":"geometry"}],"title":"站点3"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"未命名数据(1)","msDatasetId":"ms_datasetId_1712736088320_147","datasetId":"680165081","geometryField":"geometry"}],"title":"未命名数据(1)"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"北京市轨道交通线路减","msDatasetId":"ms_datasetId_1712736126050_150","datasetId":"2111415064","geometryField":"geometry"}],"title":"北京市轨道交通线路减"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"站点3","msDatasetId":"ms_datasetId_1713695373901_183","datasetId":"1755873792","geometryField":"geometry"}],"title":"站点3"}],"baseLayer":{"internetMapName":"CHINA_DARK","type":"INTERNET_MAP"},"version":"3.0.3"}',
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
  updateTime: 1713695404712,
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
        id: 'ms_站点3_1713695373911_194',
        title: '站点3',
        type: 'basic'
      },
      {
        visible: true,
        parts: [
          'ms_composite_symbol_北京市轨道交通线路减_1712908151359_384',
          'ms_composite_symbol_北京市轨道交通线路减_1712908151359_385',
          'ms_composite_symbol_北京市轨道交通线路减_1712908151359_386',
          'ms_composite_symbol_北京市轨道交通线路减_1712908151359_387',
          'ms_composite_symbol_北京市轨道交通线路减_1712908151359_388',
          'ms_composite_symbol_北京市轨道交通线路减_1712908151359_389',
          'ms_composite_symbol_北京市轨道交通线路减_1712908151359_390'
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
        parts: ['ms_北京市_1712822459356_412'],
        id: '北京市',
        title: '北京市',
        type: 'composite'
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
        'https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark/tileimage.png?scale={scale}&x={x}&y={y}&width={width}&height={height}&transparent=true&redirect=false&cacheEnabled=true'
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
    ms_aggregation_1755873792_1713695380060_432: {
      tiles: [
        'http://localhost:8190/iportal/web/datas/1755873792/structureddata/aggregation.mvt?zxyFilter={z},{x},{y},3857&pixelGroupBy=%7B%22aggCellSize%22%3A100%2C%22aggCellUnit%22%3A%22PX%22%7D&aggType=COUNT'
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
  center: [116.34412667383185, 39.93811133359088],
  zoom: 12,
  glyphs: {},
  version: '3.1.5',
  rootUrl: 'http://localhost:8190/iportal/',
  maxzoom: 12,
  name: 'ms-点',
  viewExtent: [116.23572251428592, 39.99659112475634, 116.4525308333773, 39.879581525048216],
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
      filter: ['any', ['all', ['>=', 'smpid', 1], ['<', 'smpid', 3.5]]],
      metadata: {},
      paint: {
        'fill-outline-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 16, '#3288BD'],
        'fill-pattern': [
          'case',
          ['all', ['>=', ['to-number', ['get', 'smpid']], 1], ['<', ['to-number', ['get', 'smpid']], 3.5]],
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
      filter: ['all', ['none', ['all', ['>=', 'smpid', 1], ['<', 'smpid', 3.5]]]],
      metadata: {},
      paint: {
        'fill-outline-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 16, '#3288BD'],
        'fill-color': [
          'case',
          ['all', ['>=', ['to-number', ['get', 'smpid']], 3.5], ['<', ['to-number', ['get', 'smpid']], 6]],
          '#826DBA',
          ['all', ['>=', ['to-number', ['get', 'smpid']], 6], ['<', ['to-number', ['get', 'smpid']], 8.5]],
          '#826DBA',
          ['all', ['>=', ['to-number', ['get', 'smpid']], 8.5], ['<', ['to-number', ['get', 'smpid']], 11]],
          '#826DBA',
          ['all', ['>=', ['to-number', ['get', 'smpid']], 11], ['<', ['to-number', ['get', 'smpid']], 13.5]],
          '#826DBA',
          ['all', ['>=', ['to-number', ['get', 'smpid']], 13.5], ['<', ['to-number', ['get', 'smpid']], 16.1]],
          '#826DBA',
          '#826DBA'
        ],
        'fill-opacity': 0.9
      },
      id: 'ms_北京市_1712822459356_412',
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
        'line-width': ['interpolate', ['linear'], ['get', 'smpid'], 1, 0.15, 3, 1.54],
        'line-offset': ['interpolate', ['linear'], ['get', 'smpid'], 1, -0.92, 3, -9.23],
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
        'line-width': ['interpolate', ['linear'], ['get', 'smpid'], 1, 0.15, 3, 1.54],
        'line-offset': ['interpolate', ['linear'], ['get', 'smpid'], 1, 0.92, 3, 9.23],
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: 'ms_composite_symbol_北京市轨道交通线路减_1712908151359_384',
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
        'line-width': ['interpolate', ['linear'], ['get', 'smpid'], 1, 0.15, 3, 1.54],
        'line-offset': ['interpolate', ['linear'], ['get', 'smpid'], 1, -0.92, 3, -9.23],
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: 'ms_composite_symbol_北京市轨道交通线路减_1712908151359_385',
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
        'line-width': ['interpolate', ['linear'], ['get', 'smpid'], 1, 0.15, 3, 1.54],
        'line-offset': ['interpolate', ['linear'], ['get', 'smpid'], 1, 0.92, 3, 9.23],
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: 'ms_composite_symbol_北京市轨道交通线路减_1712908151359_386',
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
        'line-width': ['interpolate', ['linear'], ['get', 'smpid'], 1, 0.15, 3, 1.54],
        'line-offset': ['interpolate', ['linear'], ['get', 'smpid'], 1, -0.92, 3, -9.23],
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: 'ms_composite_symbol_北京市轨道交通线路减_1712908151359_387',
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
        'line-width': ['interpolate', ['linear'], ['get', 'smpid'], 1, 0.15, 3, 1.54],
        'line-offset': ['interpolate', ['linear'], ['get', 'smpid'], 1, 0.92, 3, 9.23],
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: 'ms_composite_symbol_北京市轨道交通线路减_1712908151359_388',
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
        'line-width': ['interpolate', ['linear'], ['get', 'smpid'], 1, 0.15, 3, 1.54],
        'line-offset': ['interpolate', ['linear'], ['get', 'smpid'], 1, -0.92, 3, -9.23],
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: 'ms_composite_symbol_北京市轨道交通线路减_1712908151359_389',
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
        'line-width': ['interpolate', ['linear'], ['get', 'smpid'], 1, 0.15, 3, 1.54],
        'line-offset': ['interpolate', ['linear'], ['get', 'smpid'], 1, 0.92, 3, 9.23],
        'line-dasharray': [69.63, 29.84, 318.26, 0],
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#D53E4F', 3, '#3288BD']
      },
      id: 'ms_composite_symbol_北京市轨道交通线路减_1712908151359_390',
      source: 'ms_2111415064_1712736129943_152',
      'source-layer': '2111415064$geometry',
      type: 'line'
    },
    {
      layout: {
        'icon-allow-overlap': true,
        'text-line-height': 1.2,
        visibility: 'visible',
        'text-size': 12,
        'text-anchor': 'center',
        'text-allow-overlap': true,
        'icon-size': [
          'interpolate',
          ['linear'],
          ['to-number', ['get', 'weight']],
          1,
          0.15384615384615385,
          4,
          1.9230769230769231
        ],
        'symbol-placement': 'point',
        'icon-ignore-placement': false,
        'icon-image': 'circle',
        'text-font': ['Microsoft YaHei'],
        'text-rotate': 0,
        'text-transform': 'none',
        'text-max-width': 10,
        'text-justify': 'center',
        'text-letter-spacing': 0,
        'icon-anchor': 'center',
        'text-ignore-placement': false,
        'icon-rotate': 0
      },
      metadata: {},
      paint: {
        'icon-translate': [0, 0],
        'text-halo-color': '#242424',
        'text-translate-anchor': 'map',
        'icon-color': '#EE4D5A',
        'text-halo-blur': 2,
        'text-color': '#FFFFFF',
        'icon-opacity': 0.9,
        'text-halo-width': 1,
        'text-opacity': 1,
        'text-translate': [0, 0]
      },
      id: 'ms_站点3_1713695373911_194',
      source: 'ms_aggregation_1755873792_1713695380060_432',
      'source-layer': '1755873792$geometry',
      type: 'symbol'
    }
  ],
  sprite: 'http://localhost:9876/base/resources/data/sprite',
  pitch: 0,
  minzoom: 0
});
