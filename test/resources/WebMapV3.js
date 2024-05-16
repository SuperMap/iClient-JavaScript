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
        'icon-rotate': 0,
        'text-z-offset': 0
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

var mapstudioWebMap_l7_and_drill = JSON.stringify({
  metadata: {
    layerCatalog: [
      {
        visible: true,
        id: 'ms_buffer_up',
        title: '中华人民共和国行政区划边界上',
        type: 'basic'
      },
      {
        visible: true,
        parts: ['ms_administrative_center_text'],
        id: 'ms_administrative_polygon',
        title: '中华人民共和国行政区划',
        type: 'composite'
      },
      {
        visible: true,
        id: 'ms_buffer_down',
        title: '中华人民共和国行政区划边界下',
        type: 'basic'
      },
      {
        visible: true,
        id: '全球疫情累计数据',
        title: '全球疫情累计数据',
        type: 'basic'
      },
      {
        visible: true,
        id: 'ms_全球疫情累计数据_1714384292309_23',
        title: '全球疫情累计数据',
        type: 'basic'
      },
      {
        visible: true,
        id: 'ms_全球疫情累计数据_1714384276380_19',
        title: '全球疫情累计数据',
        type: 'basic'
      },
      {
        visible: true,
        id: 'ms_全球疫情累计数据_1714384211042_15',
        title: '全球疫情累计数据',
        type: 'basic'
      },
      {
        visible: true,
        id: 'ms_全球疫情累计数据_1714384188551_11',
        title: '全球疫情累计数据',
        type: 'basic'
      }
    ]
  },
  sources: {
    ms_1567920342_1714384276380_20: {
      tiles: [
        'http://172.16.15.206:8190/iportal/services/../web/datas/1567920342/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22confirmedIncrement%22%2C%22Center_Y%22%2C%22Center_X%22%2C%22UserID%22%2C%22Country%22%2C%22index%22%2C%22confirmed%22%5D&geometryFieldName=geometry'
      ],
      bounds: [-110.4475729945999, -76.60271072387695, 179.1861874739621, 78.31456756591797],
      type: 'vector'
    },
    ms_1567920342_1714384292309_24: {
      tiles: [
        'http://172.16.15.206:8190/iportal/services/../web/datas/1567920342/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22confirmedIncrement%22%2C%22Center_Y%22%2C%22Center_X%22%2C%22UserID%22%2C%22Country%22%2C%22index%22%2C%22confirmed%22%2C%22geometry%22%5D&geometryFieldName=geometry'
      ],
      bounds: [-110.4475729945999, -76.60271072387695, 179.1861874739621, 78.31456756591797],
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
    ms_1567920342_1714384123649_10: {
      data: {
        dataId: '1567920342',
        type: 'supermap-structured-data'
      },
      type: 'geojson'
    },
    ms_1567920342_1714384188552_12: {
      data: {
        dataId: '1567920342',
        type: 'supermap-structured-data'
      },
      type: 'geojson'
    },
    ms_1567920342_1714384211042_16: {
      tiles: [
        'http://172.16.15.206:8190/iportal/services/../web/datas/1567920342/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22confirmedIncrement%22%2C%22Center_Y%22%2C%22Center_X%22%2C%22UserID%22%2C%22Country%22%2C%22index%22%2C%22confirmed%22%2C%22geometry%22%5D&geometryFieldName=geometry'
      ],
      bounds: [-110.4475729945999, -76.60271072387695, 179.1861874739621, 78.31456756591797],
      type: 'vector'
    },
    'ms_administrative_buffer_source_province_{adcode}': {
      data: 'http://172.16.15.206:8190/iportal/services/../administrativeDivisions/line/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_polygon_source_city_{adcode}': {
      data: 'http://172.16.15.206:8190/iportal/services/../administrativeDivisions/polygon/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_center_source_city_{adcode}': {
      data: 'http://172.16.15.206:8190/iportal/services/../administrativeDivisions/point/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_buffer_source_city_{adcode}': {
      data: 'http://172.16.15.206:8190/iportal/services/../administrativeDivisions/line/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_polygon_source_china_{adcode}': {
      data: 'http://172.16.15.206:8190/iportal/services/../administrativeDivisions/polygon/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_polygon_source_province_{adcode}': {
      data: 'http://172.16.15.206:8190/iportal/services/../administrativeDivisions/polygon/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_center_source_china_{adcode}': {
      data: 'http://172.16.15.206:8190/iportal/services/../administrativeDivisions/point/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_center_source_province_{adcode}': {
      data: 'http://172.16.15.206:8190/iportal/services/../administrativeDivisions/point/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_buffer_source_china_{adcode}': {
      data: 'http://172.16.15.206:8190/iportal/services/../administrativeDivisions/line/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    }
  },
  crs: 'EPSG:3857',
  center: [105.40643853183451, 35.20260040017788],
  zoom: 4.0265953802940615,
  glyphs: {},
  version: '3.1.5',
  rootUrl: 'http://172.16.15.206:8190/iportal/',
  maxzoom: 12,
  name: '无标题地图',
  viewExtent: [-159.0499172798419, 78.23875449814814, 131.0072808340209, 12.738503516389864],
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
      maxzoom: 24,
      paint: {
        'circle-color': '#EE4D5A',
        'circle-opacity': 0.9,
        'circle-translate-anchor': 'map',
        'circle-radius': 4,
        'circle-translate': [0, 0]
      },
      id: 'ms_全球疫情累计数据_1714384276380_19',
      source: 'ms_1567920342_1714384276380_20',
      'source-layer': '1567920342$geometry',
      type: 'circle',
      minzoom: 0
    },
    {
      metadata: {},
      paint: {
        'background-color': '#242424'
      },
      id: 'ms-background',
      type: 'background'
    },
    {
      metadata: {},
      paint: {
        'fill-extrusion-height': ['*', 1000, 10],
        'fill-extrusion-opacity': 0.1,
        'fill-extrusion-base': ['*', 0, 10],
        'fill-extrusion-vertical-gradient': true,
        'fill-extrusion-translate-anchor': 'map',
        'fill-extrusion-color': 'rgba(13,204,255,1)',
        'fill-extrusion-translate': [0, 0]
      },
      id: 'ms_buffer_down',
      source: 'ms_administrative_buffer_source_china_100000',
      type: 'fill-extrusion'
    },
    {
      metadata: {},
      paint: {
        'fill-extrusion-height': ['*', 3000, 10],
        'fill-extrusion-opacity': 0.44,
        'fill-extrusion-base': ['*', 1000, 10],
        'fill-extrusion-vertical-gradient': true,
        'fill-extrusion-translate-anchor': 'map',
        'fill-extrusion-color': 'rgba(13,204,255,1)',
        'fill-extrusion-translate': [0, 0]
      },
      id: 'ms_administrative_polygon',
      source: 'ms_administrative_polygon_source_china_100000',
      type: 'fill-extrusion'
    },
    {
      layout: {
        'text-z-offset': 200000,
        'text-letter-spacing': 0,
        visibility: 'visible',
        'text-field': '{name}',
        'text-anchor': 'left',
        'text-size': 16,
        'text-allow-overlap': true,
        'text-font': ['sans-serif']
      },
      metadata: {},
      paint: {
        'text-halo-color': '#242424',
        'text-halo-blur': 2,
        'text-color': '#FFFFFF',
        'text-halo-width': 1,
        'text-opacity': 1,
        'text-translate': [10, 10]
      },
      id: 'ms_administrative_center_text',
      source: 'ms_administrative_center_source_china_100000',
      type: 'symbol'
    },
    {
      metadata: {},
      paint: {
        'fill-extrusion-height': ['*', 3005, 10],
        'fill-extrusion-opacity': 0.8,
        'fill-extrusion-base': ['*', 3000, 10],
        'fill-extrusion-vertical-gradient': true,
        'fill-extrusion-translate-anchor': 'map',
        'fill-extrusion-color': 'rgba(13,204,255,1)',
        'fill-extrusion-translate': [0, 0]
      },
      id: 'ms_buffer_up',
      source: 'ms_administrative_buffer_source_china_100000',
      type: 'fill-extrusion'
    }
  ],
  interaction: {
    drill: [
      {
        triggerUp: 'unclick',
        triggerDown: 'click',
        steps: [
          {
            identifierField: 'adcode',
            source: 'ms_administrative_buffer_source_china_{adcode}',
            upField: 'parent'
          },
          {
            identifierField: 'adcode',
            source: 'ms_administrative_buffer_source_province_{adcode}',
            upField: 'parent'
          },
          {
            identifierField: 'adcode',
            source: 'ms_administrative_buffer_source_city_{adcode}',
            upField: 'parent'
          }
        ],
        layerIds: ['ms_buffer_down']
      },
      {
        triggerUp: 'unclick',
        triggerDown: 'click',
        steps: [
          {
            identifierField: 'adcode',
            source: 'ms_administrative_polygon_source_china_{adcode}',
            upField: 'parent'
          },
          {
            identifierField: 'adcode',
            source: 'ms_administrative_polygon_source_province_{adcode}',
            upField: 'parent'
          },
          {
            identifierField: 'adcode',
            source: 'ms_administrative_polygon_source_city_{adcode}',
            upField: 'parent'
          }
        ],
        layerIds: ['ms_administrative_polygon']
      },
      {
        triggerUp: 'unclick',
        triggerDown: 'click',
        steps: [
          {
            identifierField: 'adcode',
            source: 'ms_administrative_center_source_china_{adcode}',
            upField: 'parent'
          },
          {
            identifierField: 'adcode',
            source: 'ms_administrative_center_source_province_{adcode}',
            upField: 'parent'
          },
          {
            identifierField: 'adcode',
            source: 'ms_administrative_center_source_city_{adcode}',
            upField: 'parent'
          }
        ],
        layerIds: ['ms_administrative_center_text']
      },
      {
        triggerUp: 'unclick',
        triggerDown: 'click',
        steps: [
          {
            identifierField: 'adcode',
            source: 'ms_administrative_buffer_source_china_{adcode}',
            upField: 'parent'
          },
          {
            identifierField: 'adcode',
            source: 'ms_administrative_buffer_source_province_{adcode}',
            upField: 'parent'
          },
          {
            identifierField: 'adcode',
            source: 'ms_administrative_buffer_source_city_{adcode}',
            upField: 'parent'
          }
        ],
        layerIds: ['ms_buffer_up']
      }
    ]
  },
  pitch: 60,
  minzoom: 0
});

var msProjectINfo_L7Layers = JSON.stringify({
  extent: null,
  controls: null,
  extentString: '',
  description: '',
  verifyReason: null,
  units: null,
  title: 'ms-动画图例_副本',
  resolution: 0,
  checkStatus: 'SUCCESSFUL',
  projectInfo:
    '{"images":"http://localhost:9876/base/resources/data/sprite","catalogs":[{"visualization":{"renderer":[{"intensity":2,"field":"SmID","color":[{"color":"#0000ff"},{"color":"#00ffff"},{"color":"#00ff00"},{"color":"#ffff00"},{"color":"#ff0000"}],"radius":10,"opacity":1,"type":"heat3D","styleRenderMode":"antvL7"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1715739545984_684","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"showLegend":true,"id":"ms_站点3_1715765345441_6350","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"3D热力图","layerSourceType":"Data","layersContent":[]},{"visualization":{"renderer":[{"heightMultiple":{"type":"simple","value":1},"color":{"type":"simple","value":"#4CC8A3"},"width":{"type":"simple","value":2},"heightfixed":{"type":"simple","value":false},"opacity":{"type":"simple","value":1},"dashArray":{"type":"simple","value":[1,4]},"type":"isoline3D","height":{"type":"simple","value":100},"styleRenderMode":"antvL7"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1715672103731_6","bounds":[116.10214436813241,39.72316247533395,116.4357788812853,40.088344539540586],"showLegend":true,"id":"ms_北京市轨道交通线路减_1715764088617_3426","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"终点y","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"标准名称","type":"FIELD"},{"fieldName":"起点x","type":"FIELD"},{"fieldName":"起点y","type":"FIELD"},{"fieldName":"testID","type":"FIELD"},{"fieldName":"终点x","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"北京市轨道交通线路减"},"title":"3D等值线","layerSourceType":"Data","layersContent":[]},{"visualization":{"renderer":[{"heightMultiple":{"type":"simple","value":1},"shape":{"type":"simple","value":"squareColumn"},"color":{"type":"simple","value":"#EE4D5A"},"size":{"type":"simple","value":12},"opacity":{"type":"simple","value":0.9},"type":"column","height":{"type":"simple","value":20},"styleRenderMode":"antvL7"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1715739545984_684","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"showLegend":true,"id":"ms_站点3_1715758105128_1774","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"3D柱状图","layerSourceType":"Data","layersContent":[]},{"visualization":{"renderer":[{"size":{"field":["smpid"],"defaultValue":60,"values":[{"value":8,"key":1},{"value":50,"key":4}],"interpolateInfo":{"type":"linear"},"type":"unique"},"color":{"type":"simple","value":"#EE4D5A"},"opacity":{"type":"simple","value":0.9},"type":"radarPoint","speed":{"type":"simple","value":2.9},"styleRenderMode":"antvL7"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1715739545984_684","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"showLegend":true,"id":"ms_站点3_1715739627423_909","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"雷达点","layerSourceType":"Data","layersContent":[]},{"visualization":{"renderer":[{"size":{"type":"simple","value":30},"color":{"type":"simple","value":"#EE4D5A"},"rings":{"type":"simple","value":3},"opacity":{"type":"simple","value":0.9},"type":"animatePoint","speed":{"type":"simple","value":1},"styleRenderMode":"antvL7"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1715739545984_684","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"showLegend":true,"id":"站点3","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"动画点","layerSourceType":"Data","layersContent":[]},{"visualization":{"renderer":[{"heightMultiple":{"type":"simple","value":1},"lineDasharray":{"type":"simple","value":[1,0]},"color":{"field":["smpid"],"defaultValue":"#ffffff","values":[{"value":"#d53e4f","key":1},{"value":"#3288bd","key":3}],"ribbon":["#d53e4f","#fc8d59","#fee08b","#ffffbf","#e6f598","#99d594","#3288bd"],"interpolateInfo":{"type":"linear"},"type":"unique"},"lineTranslateAnchor":{"type":"simple","value":"map"},"iconStep":{"type":"simple","value":26},"lineMiterLimit":{"type":"simple","value":2},"lineOffset":{"type":"simple","value":0},"lineJoin":{"type":"simple","value":"miter"},"type":"animateLine","lineRoundLimit":{"type":"simple","value":1.05},"lineTranslate":{"type":"simple","value":[0,0]},"styleRenderMode":"antvL7","textureBlend":{"type":"simple","value":"replace"},"duration":{"type":"simple","value":6},"symbolsContent":{"type":"simple","value":{"symbolId":"rectangle","style":{"layout":{"icon-image":"rectangle"}}}},"lineGapWidth":{"type":"simple","value":0},"lineCap":{"type":"simple","value":"butt"},"width":{"field":["smpid"],"defaultValue":2,"values":[{"value":10,"key":1},{"value":53,"key":3}],"interpolateInfo":{"type":"linear"},"type":"unique"},"heightfixed":{"type":"simple","value":false},"interval":{"type":"simple","value":0.6},"opacity":{"type":"simple","value":1},"trailLength":{"type":"simple","value":1.5},"height":{"type":"simple","value":0}}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1715672103731_6","bounds":[116.10214436813241,39.72316247533395,116.4357788812853,40.088344539540586],"showLegend":true,"id":"北京市轨道交通线路减","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"终点y","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"标准名称","type":"FIELD"},{"fieldName":"起点x","type":"FIELD"},{"fieldName":"起点y","type":"FIELD"},{"fieldName":"testID","type":"FIELD"},{"fieldName":"终点x","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"北京市轨道交通线路减"},"title":"动画线","layerSourceType":"Data","layersContent":[]}],"datas":[{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"云南_县级行政区划图","msDatasetId":"ms_datasetId_1715672103668_2","datasetId":"1688875102","geometryField":"geometry"}],"title":"云南_县级行政区划图"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"北京市轨道交通线路减","msDatasetId":"ms_datasetId_1715672103731_6","datasetId":"1052943054","geometryField":"geometry"}],"title":"北京市轨道交通线路减"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"站点3","msDatasetId":"ms_datasetId_1715739545984_684","datasetId":"1767084124","geometryField":"geometry"}],"title":"站点3"}],"baseLayer":{"internetMapName":"CHINA_DARK","type":"INTERNET_MAP"},"version":"3.0.4"}',
  visitCount: 3,
  centerString: '{"x":117.5037798870834,"y":40.077238929384094}',
  epsgCode: -1000,
  nickname: 'admin_123',
  layers: [],
  id: 617580084,
  searchSetting: null,
  thumbnail: 'http://172.16.15.94:8190/iportal/web/static/portal/img/map/defaultThumbnail.png',
  level: 8,
  center: {
    x: 117.5037798870834,
    y: 40.077238929384094
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
  updateTime: 1715766731668,
  userName: 'admin_123',
  tags: [],
  checkUser: null,
  checkUserNick: null,
  checkTime: null,
  sourceType: 'MAPSTUDIO',
  createTime: 1715765397999,
  controlsString: '',
  isDefaultBottomMap: false,
  status: null,
  favoriteCount: 0
});

var mapstudioWebMap_L7Layers = JSON.stringify({
  metadata: {
    layerCatalog: [
      {
        visible: true,
        id: 'ms_站点3_1715765345441_6350',
        title: '3D热力图',
        type: 'basic'
      },
      {
        visible: true,
        id: 'ms_北京市轨道交通线路减_1715764088617_3426',
        title: '3D等值线',
        type: 'basic'
      },
      {
        visible: true,
        id: 'ms_站点3_1715758105128_1774',
        title: '3D柱状图',
        type: 'basic'
      },
      {
        visible: true,
        id: 'ms_站点3_1715739627423_909',
        title: '雷达点',
        type: 'basic'
      },
      {
        visible: true,
        id: '站点3',
        title: '动画点',
        type: 'basic'
      },
      {
        visible: true,
        id: '北京市轨道交通线路减',
        title: '动画线',
        type: 'basic'
      }
    ]
  },
  sources: {
    ms_1767084124_1715758105128_1775: {
      tiles: [
        'http://172.16.15.94:8080/iportal/web/datas/1767084124/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%221111%E6%A0%87%E5%87%86%E5%90%8D%E7%A7%B0%22%2C%22SmID%22%2C%22SmGeometrySize%22%2C%221111SmUserID%22%2C%22SmY%22%2C%22SmGeoPosition%22%2C%22SmX%22%2C%22SmLibTileID%22%5D&geometryFieldName=geometry'
      ],
      bounds: [116.36331703990744, 39.89942692791154, 116.38141290077355, 39.9767738835847],
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
    ms_1052943054_1715672103742_8: {
      data: {
        dataId: '1052943054',
        type: 'supermap-structured-data'
      },
      type: 'geojson'
    },
    ms_1767084124_1715739556572_702: {
      tiles: [
        'http://172.16.15.94:8080/iportal/web/datas/1767084124/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%221111%E6%A0%87%E5%87%86%E5%90%8D%E7%A7%B0%22%2C%22SmID%22%2C%22SmGeometrySize%22%2C%221111SmUserID%22%2C%22SmY%22%2C%22SmGeoPosition%22%2C%22SmX%22%2C%22SmLibTileID%22%5D&geometryFieldName=geometry'
      ],
      bounds: [116.36331703990744, 39.89942692791154, 116.38141290077355, 39.9767738835847],
      type: 'vector'
    },
    ms_1767084124_1715765345442_6351: {
      data: {
        dataId: '1767084124',
        type: 'supermap-structured-data'
      },
      type: 'geojson'
    },
    ms_1767084124_1715739627423_910: {
      tiles: [
        'http://172.16.15.94:8080/iportal/web/datas/1767084124/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%221111%E6%A0%87%E5%87%86%E5%90%8D%E7%A7%B0%22%2C%22SmID%22%2C%22SmGeometrySize%22%2C%221111SmUserID%22%2C%22SmY%22%2C%22SmGeoPosition%22%2C%22SmX%22%2C%22SmLibTileID%22%5D&geometryFieldName=geometry'
      ],
      bounds: [116.36331703990744, 39.89942692791154, 116.38141290077355, 39.9767738835847],
      type: 'vector'
    },
    ms_1052943054_1715764088617_3427: {
      data: {
        dataId: '1052943054',
        type: 'supermap-structured-data'
      },
      type: 'geojson'
    }
  },
  crs: {
    extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244],
    wkt: 'PROJCS["WGS 84 / Pseudo-Mercator",GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]],PROJECTION["Mercator_1SP"],PARAMETER["central_meridian",0],PARAMETER["scale_factor",1],PARAMETER["false_easting",0],PARAMETER["false_northing",0],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AXIS["X",EAST],AXIS["Y",NORTH],EXTENSION["PROJ4","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"],AUTHORITY["EPSG","3857"]]',
    name: 'EPSG:3857'
  },
  center: [117.5037798870834, 40.077238929384094],
  zoom: 8.072381924882253,
  glyphs: {},
  version: '3.2.0',
  rootUrl: 'http://172.16.15.94:8190/iportal/',
  maxzoom: 12,
  name: 'ms-动画图例_副本',
  viewExtent: [112.58411053622409, 44.15082666388613, 122.42344923794698, 38.941422828756544],
  layers: [
    {
      maxzoom: 12,
      id: 'CHINA_DARK',
      source: 'CHINA_DARK',
      type: 'raster',
      minzoom: 0
    },
    {
      layout: {
        visibility: 'visible',
        'line-extrusion-pattern-interval': 26,
        'line-extrusion-animate-duration': 6,
        'line-extrusion-pattern-blend': 'replace',
        'line-extrusion-animate-trailLength': 1.5,
        'line-extrusion-animate-interval': 0.6
      },
      metadata: {
        MapStudio: {
          title: '动画线'
        }
      },
      paint: {
        'line-extrusion-base': 0,
        'line-extrusion-opacity': 1,
        'line-extrusion-width': ['interpolate', ['linear'], ['get', 'smpid'], 1, 10, 3, 53],
        'line-extrusion-base-fixed': false,
        'line-extrusion-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#d53e4f', 3, '#3288bd'],
        'line-extrusion-pattern': 'rectangle'
      },
      source: 'ms_1052943054_1715672103742_8',
      'source-layer': '1052943054$geometry',
      id: '北京市轨道交通线路减',
      type: 'line-extrusion'
    },
    {
      layout: {
        visibility: 'visible',
        'circle-animate-rings': 3,
        'circle-animate-speed': 1
      },
      metadata: {
        MapStudio: {
          title: '动画点'
        }
      },
      paint: {
        'circle-color': '#EE4D5A',
        'circle-opacity': 0.9,
        'circle-radius': 15
      },
      source: 'ms_1767084124_1715739556572_702',
      'source-layer': '1767084124$geometry',
      id: '站点3',
      type: 'circle'
    },
    {
      layout: {
        visibility: 'visible',
        'radar-animate-speed': 2.9
      },
      metadata: {
        MapStudio: {
          title: '雷达点'
        }
      },
      paint: {
        'radar-radius': ['interpolate', ['linear'], ['get', 'smpid'], 1, 4, 4, 25],
        'radar-color': '#EE4D5A',
        'radar-opacity': 0.9
      },
      source: 'ms_1767084124_1715739627423_910',
      'source-layer': '1767084124$geometry',
      id: 'ms_站点3_1715739627423_909',
      type: 'radar'
    },
    {
      layout: {
        visibility: 'visible',
        'point-extrusion-shape': 'squareColumn'
      },
      metadata: {
        MapStudio: {
          title: '3D柱状图'
        }
      },
      maxzoom: 24,
      paint: {
        'point-extrusion-width': 12,
        'point-extrusion-height': 20,
        'point-extrusion-opacity': 0.9,
        'point-extrusion-length': 12,
        'point-extrusion-color': '#EE4D5A'
      },
      source: 'ms_1767084124_1715758105128_1775',
      'source-layer': '1767084124$geometry',
      id: 'ms_站点3_1715758105128_1774',
      type: 'point-extrusion',
      minzoom: 0
    },
    {
      layout: {
        visibility: 'visible'
      },
      metadata: {
        MapStudio: {
          title: '3D等值线'
        }
      },
      maxzoom: 24,
      paint: {
        'line-extrusion-base': 100,
        'line-extrusion-opacity': 1,
        'line-extrusion-width': 2,
        'line-extrusion-base-fixed': false,
        'line-extrusion-dasharray': [1, 4],
        'line-extrusion-color': '#4CC8A3'
      },
      source: 'ms_1052943054_1715764088617_3427',
      'source-layer': '1052943054$geometry',
      id: 'ms_北京市轨道交通线路减_1715764088617_3426',
      type: 'line-extrusion',
      minzoom: 0
    },
    {
      layout: {
        visibility: 'visible'
      },
      metadata: {
        MapStudio: {
          title: '3D热力图'
        }
      },
      maxzoom: 24,
      paint: {
        'heatmap-extrusion-intensity': 2,
        'heatmap-extrusion-radius': 10,
        'heatmap-extrusion-opacity': 1,
        'heatmap-extrusion-weight': 'SmID',
        'heatmap-extrusion-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(0,0,0,0)',
          0.2,
          '#0000ff',
          0.4,
          '#00ffff',
          0.6000000000000001,
          '#00ff00',
          0.8,
          '#ffff00',
          1,
          '#ff0000'
        ]
      },
      source: 'ms_1767084124_1715765345442_6351',
      'source-layer': '1767084124$geometry',
      id: 'ms_站点3_1715765345441_6350',
      type: 'heatmap-extrusion',
      minzoom: 0
    }
  ],
  sprite: 'http://localhost:9876/base/resources/data/sprite',
  pitch: 60,
  minzoom: 0
});

var l7StructureData1052943054 = JSON.stringify({
  extent: {
    top: 40.088344539540586,
    left: 116.10214436813241,
    bottom: 39.72316247533395,
    leftBottom: {
      x: 116.10214436813241,
      y: 39.72316247533395
    },
    right: 116.4357788812853,
    rightTop: {
      x: 116.4357788812853,
      y: 40.088344539540586
    }
  },
  firstRowIsHead: false,
  fileEncoding: null,
  fieldNames: ['smpid', '终点y', 'SmID', '标准名称', '起点x', '起点y', 'testID', '终点x', 'geometry'],
  type: 'geojson',
  separator: null,
  tableName: 'smp1052943054_beijingshiguidaojiaotongxianlujian',
  urn: 'urn:supermapabc:since-1.0:bigdata:_defaulthost:1052943054',
  epsgCode: 4326,
  fieldTypes: ['INT', 'TEXT', 'LONG', 'TEXT', 'TEXT', 'TEXT', 'LONG', 'TEXT', 'LINESTRING'],
  name: '北京市轨道交通线路减',
  tableFieldNames: [
    'smpid',
    'zhongdiany',
    'smid',
    'biaozhunmingcheng',
    'qidianx',
    'qidiany',
    'testid',
    'zhongdianx',
    'geometry'
  ],
  id: '1052943054'
});

var l7StructureData1052943054Items = JSON.stringify({
  timeStamp: '2024-05-15T09:42:02Z',
  features: [
    {
      geometry: {
        coordinates: [
          [116.38050072430798, 39.94888011518407],
          [116.38714780612922, 39.94892587302934],
          [116.37993841640692, 39.94887730328765],
          [116.38050072430798, 39.94888011518407]
        ],
        type: 'LineString'
      },
      id: '1',
      type: 'Feature',
      properties: {
        终点y: '39.948990864179734',
        SmID: 1,
        标准名称: '地铁二号线',
        起点x: '116.38050072430798',
        smpid: 1,
        起点y: '39.94888011518407',
        testID: 1,
        终点x: '116.39553809862188'
      }
    },
    {
      geometry: {
        coordinates: [
          [116.42889857098183, 39.84623838293839],
          [116.42813538465113, 39.846249956793876],
          [116.40309870619934, 40.087151016112706],
          [116.40288077701345, 40.08713594411416]
        ],
        type: 'LineString'
      },
      id: '2',
      type: 'Feature',
      properties: {
        终点y: '',
        SmID: 2,
        标准名称: '地铁五号线',
        起点x: '',
        smpid: 2,
        起点y: '',
        testID: 2,
        终点x: ''
      }
    },
    {
      geometry: {
        coordinates: [
          [116.10214436813241, 39.73067515573697],
          [116.10229332066908, 39.730666640852405],
          [116.30174189450294, 39.81253350272267],
          [116.30196852786845, 39.814349188802616]
        ],
        type: 'LineString'
      },
      id: '3',
      type: 'Feature',
      properties: {
        终点y: '',
        SmID: 3,
        标准名称: '地铁房山线',
        起点x: '',
        smpid: 3,
        起点y: '',
        testID: 3,
        终点x: ''
      }
    }
  ],
  type: 'FeatureCollection'
});

var l7StructureData1767084124 = JSON.stringify({
  extent: {
    top: 39.9767738835847,
    left: 116.36331703990744,
    bottom: 39.89942692791154,
    leftBottom: {
      x: 116.36331703990744,
      y: 39.89942692791154
    },
    right: 116.38141290077355,
    rightTop: {
      x: 116.38141290077355,
      y: 39.9767738835847
    }
  },
  firstRowIsHead: false,
  fileEncoding: null,
  fieldNames: [
    'smpid',
    '1111标准名称',
    'SmID',
    'SmGeometrySize',
    '1111SmUserID',
    'SmY',
    'SmGeoPosition',
    'SmX',
    'SmLibTileID',
    'geometry'
  ],
  type: 'geojson',
  separator: null,
  tableName: 'smp1767084124_zhandian3',
  urn: 'urn:supermapabc:since-1.0:bigdata:_defaulthost:1767084124',
  epsgCode: 4326,
  fieldTypes: ['INT', 'TEXT', 'LONG', 'LONG', 'LONG', 'DOUBLE', 'LONG', 'DOUBLE', 'LONG', 'POINT'],
  name: '站点3',
  tableFieldNames: [
    'smpid',
    'smp_1111biaozhunmingcheng',
    'smid',
    'smgeometrysize',
    'smp_1111smuserid',
    'smy',
    'smgeoposition',
    'smx',
    'smlibtileid',
    'geometry'
  ],
  id: '1767084124'
});

var l7StructureData1767084124Items = JSON.stringify({
  timeStamp: '2024-05-15T09:42:02Z',
  features: [
    {
      geometry: {
        coordinates: [116.36331703990744, 39.89942692791154],
        type: 'Point'
      },
      id: '1',
      type: 'Feature',
      properties: {
        '1111标准名称': '长椿街站',
        SmID: 1,
        SmGeometrySize: 20,
        smpid: 1,
        '1111SmUserID': 0,
        SmGeoPosition: 393216,
        SmY: 4851338.01991207,
        SmLibTileID: 1,
        SmX: 1.29535051998988e7
      }
    },
    {
      geometry: {
        coordinates: [116.37438913096268, 39.89976329032906],
        type: 'Point'
      },
      id: '2',
      type: 'Feature',
      properties: {
        '1111标准名称': '宣武门站',
        SmID: 2,
        SmGeometrySize: 20,
        smpid: 2,
        '1111SmUserID': 0,
        SmGeoPosition: 393236,
        SmY: 4851386.82748852,
        SmLibTileID: 1,
        SmX: 1.2954737739437e7
      }
    },
    {
      geometry: {
        coordinates: [116.38141290077355, 39.9767738835847],
        type: 'Point'
      },
      id: '3',
      type: 'Feature',
      properties: {
        '1111标准名称': '健德门站',
        SmID: 0,
        SmGeometrySize: 20,
        smpid: 3,
        '1111SmUserID': 0,
        SmGeoPosition: 393256,
        SmY: 4862567.6973664,
        SmLibTileID: 1,
        SmX: 1.29555196219158e7
      }
    },
    {
      geometry: {
        coordinates: [116.38141290077355, 39.9767738835847],
        type: 'Point'
      },
      id: '4',
      type: 'Feature',
      properties: {
        '1111标准名称': '健德门站',
        SmID: 4,
        SmGeometrySize: 20,
        smpid: 4,
        '1111SmUserID': 0,
        SmGeoPosition: 393256,
        SmY: 4862568.6973664,
        SmLibTileID: 1,
        SmX: 1.29555196219158e7
      }
    }
  ],
  type: 'FeatureCollection'
});
