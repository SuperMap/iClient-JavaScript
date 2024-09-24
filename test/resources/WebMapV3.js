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
      tiles: ['base/resources/img/baiduTileTest.png'],
      tileSize: 256,
      bounds: [71.94738367915619, 3.4373340998870576, 135.08727119000017, 53.56026110410313],
      type: 'raster'
    },
    CHINA_DARK: {
      tiles: ['base/resources/img/baiduTileTest.png'],
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
      tiles: ['base/resources/img/baiduTileTest.png'],
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

var mapstudioWebMap_drill = JSON.stringify({
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
        parts: ['ms_administrative_polygon', 'ms_administrative_center_text'],
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
        id: 'ms-background',
        title: '纯色底图',
        type: 'basic'
      }
    ]
  },
  sources: {
    'ms_administrative_buffer_source_province_{adcode}': {
      data: 'http://localhost:8190/iportal/administrativeDivisions/line/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_polygon_source_city_{adcode}': {
      data: 'http://localhost:8190/iportal/administrativeDivisions/polygon/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_center_source_city_{adcode}': {
      data: 'http://localhost:8190/iportal/administrativeDivisions/point/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_buffer_source_city_{adcode}': {
      data: 'http://localhost:8190/iportal/administrativeDivisions/line/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_polygon_source_china_{adcode}': {
      data: 'http://localhost:8190/iportal/administrativeDivisions/polygon/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_polygon_source_province_{adcode}': {
      data: 'http://localhost:8190/iportal/administrativeDivisions/polygon/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_center_source_china_{adcode}': {
      data: 'http://localhost:8190/iportal/administrativeDivisions/point/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_center_source_province_{adcode}': {
      data: 'http://localhost:8190/iportal/administrativeDivisions/point/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    },
    'ms_administrative_buffer_source_china_{adcode}': {
      data: 'http://localhost:8190/iportal/administrativeDivisions/line/{adcode}.pbf',
      attribution: '本页面数据来源于高德开放平台<br>该版本数据更新于2021.5, 仅供学习交流使用。',
      type: 'geojson'
    }
  },
  crs: 'EPSG:3857',
  center: [105.40643853183451, 35.20260040017788],
  zoom: 4.0265953802940615,
  glyphs: {},
  version: '3.1.5',
  rootUrl: 'http://localhost:8190/iportal/',
  maxzoom: 12,
  name: '无标题地图',
  viewExtent: [-159.0499172798419, 78.23875449814814, 131.0072808340209, 12.738503516389864],
  layers: [
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
    '{"images":"http://localhost:9876/base/resources/data/sprite","catalogs":[{"visualization":{"renderer":[{"intensity":2,"field":"SmID","color":[{"color":"#0000ff"},{"color":"#00ffff"},{"color":"#00ff00"},{"color":"#ffff00"},{"color":"#ff0000"}],"radius":10,"opacity":1,"type":"heat3D","styleRenderMode":"antvL7"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1715739545984_684","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"showLegend":true,"id":"ms_站点3_1715765345441_6350","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"3D热力图","layerSourceType":"Data","layersContent":[]},{"visualization":{"renderer":[{"heightMultiple":{"type":"simple","value":1},"color":{"type":"simple","value":"#4CC8A3"},"width":{"type":"simple","value":2},"heightfixed":{"type":"simple","value":false},"opacity":{"type":"simple","value":1},"dashArray":{"type":"simple","value":[1,4]},"type":"isoline3D","height":{"type":"simple","value":100},"styleRenderMode":"antvL7"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1715672103731_6","bounds":[116.10214436813241,39.72316247533395,116.4357788812853,40.088344539540586],"showLegend":true,"id":"ms_北京市轨道交通线路减_1715764088617_3426","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"终点y","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"标准名称","type":"FIELD"},{"fieldName":"起点x","type":"FIELD"},{"fieldName":"起点y","type":"FIELD"},{"fieldName":"testID","type":"FIELD"},{"fieldName":"终点x","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"北京市轨道交通线路减"},"title":"3D等值线","layerSourceType":"Data","layersContent":[]},{"visualization":{"renderer":[{"heightMultiple":{"type":"simple","value":1},"shape":{"type":"simple","value":"squareColumn"},"color":{"type":"simple","value":"#EE4D5A"},"size":{"type":"simple","value":12},"opacity":{"type":"simple","value":0.9},"type":"column","height":{"type":"simple","value":20},"styleRenderMode":"antvL7"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1715739545984_684","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"showLegend":true,"id":"ms_站点3_1715758105128_1774","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"3D柱状图","layerSourceType":"Data","layersContent":[]},{"visualization":{"renderer":[{"size":{"field":["smpid"],"defaultValue":60,"values":[{"value":8,"key":1},{"value":50,"key":4}],"interpolateInfo":{"type":"linear"},"type":"unique"},"color":{"type":"simple","value":"#EE4D5A"},"opacity":{"type":"simple","value":0.9},"type":"radarPoint","speed":{"type":"simple","value":2.9},"styleRenderMode":"antvL7"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1715739545984_684","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"showLegend":true,"id":"ms_站点3_1715739627423_909","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"雷达点","layerSourceType":"Data","layersContent":[]},{"visualization":{"renderer":[{"size":{"type":"simple","value":30},"color":{"type":"simple","value":"#EE4D5A"},"rings":{"type":"simple","value":3},"opacity":{"type":"simple","value":0.9},"type":"animatePoint","speed":{"type":"simple","value":1},"styleRenderMode":"antvL7"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1715739545984_684","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"showLegend":true,"id":"站点3","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"动画点","layerSourceType":"Data","layersContent":[]},{"visualization":{"renderer":[{"heightMultiple":{"type":"simple","value":1},"lineDasharray":{"type":"simple","value":[1,0]},"color":{"field":["smpid"],"defaultValue":"#ffffff","values":[{"value":"#d53e4f","key":1},{"value":"#3288bd","key":3}],"ribbon":["#d53e4f","#fc8d59","#fee08b","#ffffbf","#e6f598","#99d594","#3288bd"],"interpolateInfo":{"type":"linear"},"type":"unique"},"lineTranslateAnchor":{"type":"simple","value":"map"},"iconStep":{"type":"simple","value":26},"lineMiterLimit":{"type":"simple","value":2},"lineOffset":{"type":"simple","value":0},"lineJoin":{"type":"simple","value":"miter"},"type":"animateLine","lineRoundLimit":{"type":"simple","value":1.05},"lineTranslate":{"type":"simple","value":[0,0]},"styleRenderMode":"antvL7","textureBlend":{"type":"simple","value":"replace"},"duration":{"type":"simple","value":6},"symbolsContent":{"type":"simple","value":{"symbolId":"rectangle","style":{"layout":{"icon-image":"rectangle"}}}},"lineGapWidth":{"type":"simple","value":0},"lineCap":{"type":"simple","value":"butt"},"width":{"field":["smpid"],"defaultValue":2,"values":[{"value":10,"key":1},{"value":53,"key":3}],"interpolateInfo":{"type":"linear"},"type":"unique"},"heightfixed":{"type":"simple","value":false},"interval":{"type":"simple","value":0.6},"opacity":{"type":"simple","value":1},"trailLength":{"type":"simple","value":1.5},"height":{"type":"simple","value":0}}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1715672103731_6","bounds":[116.10214436813241,39.72316247533395,116.4357788812853,40.088344539540586],"showLegend":true,"id":"北京市轨道交通线路减","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"终点y","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"标准名称","type":"FIELD"},{"fieldName":"起点x","type":"FIELD"},{"fieldName":"起点y","type":"FIELD"},{"fieldName":"testID","type":"FIELD"},{"fieldName":"终点x","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"北京市轨道交通线路减"},"title":"动画线","layerSourceType":"Data","layersContent":[]},{"visualization":{"renderer":{"coverage":{"type":"simple","value":1},"heightMultiple":{"type":"simple","value":1},"color":{"field":["mean"],"defaultValue":"#ffffff","values":[{"value":"#d53e4f","key":4856965.310533348}],"ribbon":["#d53e4f","#fc8d59","#fee08b","#ffffbf","#e6f598","#99d594","#3288bd"],"interpolateInfo":{"type":"linear"},"type":"unique"},"angle":{"type":"simple","value":0},"opacity":{"type":"simple","value":0.9},"type":"heat3DHexagon","height":{"type":"simple","value":20000},"styleRenderMode":"antvL7"}},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1715739545984_684","bounds":[116.36331703990744,39.89942692791154,116.38141290077355,39.9767738835847],"showLegend":true,"id":"ms_站点3_1715844838827_6329","source":{"option":{"clusterOption":{"aggType":"AVG","aggField":"SmY","groupBy":{"aggCellSize":20000,"aggCellUnit":"PX"}},"cluster":true}},"popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"站点3"},"title":"3D格网热力","layerSourceType":"Data","layersContent":[]}],"datas":[{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"云南_县级行政区划图","msDatasetId":"ms_datasetId_1715672103668_2","datasetId":"1688875102","geometryField":"geometry"}],"title":"云南_县级行政区划图"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"北京市轨道交通线路减","msDatasetId":"ms_datasetId_1715672103731_6","datasetId":"1052943054","geometryField":"geometry"}],"title":"北京市轨道交通线路减"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"站点3","msDatasetId":"ms_datasetId_1715739545984_684","datasetId":"1767084124","geometryField":"geometry"}],"title":"站点3"}],"baseLayer":{"internetMapName":"CHINA_DARK","type":"INTERNET_MAP"},"version":"3.0.4"}',
  visitCount: 3,
  centerString: '{"x":117.5037798870834,"y":40.077238929384094}',
  epsgCode: -1000,
  nickname: 'admin_123',
  layers: [],
  id: 617580084,
  searchSetting: null,
  thumbnail: 'http://localhost:8190/iportal/web/static/portal/img/map/defaultThumbnail.png',
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

var msProjectINfo_L7Layers2 = JSON.stringify({
  extent: {
    top: 39.59816416039695,
    left: 115.18399681228337,
    bottom: 41.19689764172645,
    leftBottom: {
      x: 115.18399681228337,
      y: 41.19689764172645
    },
    right: 117.6072209745858,
    rightTop: {
      x: 117.6072209745858,
      y: 39.59816416039695
    }
  },
  controls: null,
  extentString:
    '{"top":39.59816416039695,"left":115.18399681228337,"bottom":41.19689764172645,"leftBottom":{"x":115.18399681228337,"y":41.19689764172645},"right":117.6072209745858,"rightTop":{"x":117.6072209745858,"y":39.59816416039695}}',
  description: '',
  verifyReason: null,
  units: null,
  title: '无标题地图-le11',
  resolution: 0,
  checkStatus: 'SUCCESSFUL',
  projectInfo:
    '{"images":"http://localhost:9876/base/resources/data/sprite","catalogs":[{"visualization":{"renderer":[{"lineDasharray":{"type":"simple","value":[1,0]},"color":{"field":["smpid"],"defaultValue":"#ffffff","values":[{"value":"#d53e4f","key":1},{"value":"#3288bd","key":17}],"ribbon":["#d53e4f","#fc8d59","#fee08b","#ffffbf","#e6f598","#99d594","#3288bd"],"interpolateInfo":{"type":"linear"},"type":"unique"},"lineTranslateAnchor":{"type":"simple","value":"map"},"lineMiterLimit":{"type":"simple","value":2},"lineOffset":{"type":"simple","value":0},"lineJoin":{"type":"simple","value":"miter"},"lineRoundLimit":{"type":"simple","value":1.05},"lineTranslate":{"type":"simple","value":[0,0]},"lineGapWidth":{"type":"simple","value":0},"symbolsContent":{"type":"simple","value":{"symbolId":"line-0","style":{"paint":{"line-width":2,"line-color":"#4CC8A3"}}}},"lineCap":{"type":"simple","value":"butt"},"width":{"type":"simple","value":2},"opacity":{"type":"simple","value":1}}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1718247414231_51","bounds":[116.10214436813241,39.6703694682177,116.68907341874268,40.20693349910421],"showLegend":true,"id":"北京市轨道交通线路-打印","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"标准名称","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"北京市轨道交通线路-打印"},"title":"北京市轨道交通线路","layerSourceType":"Data","layersContent":[]},{"visualization":{"renderer":[{"rotate":{"type":"simple","value":0},"textLetterSpacing":{"type":"simple","value":0},"textTranslate":{"type":"simple","value":[0,0]},"color":{"field":["smpid"],"defaultValue":"#ffffff","values":[{"value":"#d53e4f","key":1},{"value":"#3288bd","key":241}],"ribbon":["#d53e4f","#fc8d59","#fee08b","#ffffbf","#e6f598","#99d594","#3288bd"],"interpolateInfo":{"type":"linear"},"type":"unique"},"symbolPlacement":{"type":"simple","value":"point"},"textAnchor":{"type":"simple","value":"center"},"translate":{"type":"simple","value":[0,0]},"textRotate":{"type":"simple","value":0},"textField":{"type":"simple","value":""},"styleRenderMode":"mapboxgl","textHaloBlur":{"type":"simple","value":2},"transform":{"type":"simple","value":"none"},"symbolsContent":{"type":"simple","value":{"symbolId":"point-907605","style":{"layout":{"icon-image":"point-907605"}}}},"textTranslateAnchor":{"type":"simple","value":"map"},"justify":{"type":"simple","value":"center"},"ignorePlacement":{"type":"simple","value":false},"textAllowOverlap":{"type":"simple","value":true},"maxWidth":{"type":"simple","value":10},"textSize":{"type":"simple","value":16},"textHaloColor":{"type":"simple","value":"#242424"},"textColor":{"type":"simple","value":"#FFFFFF"},"size":{"type":"simple","value":8},"allowOverlap":{"type":"simple","value":true},"translateAnchor":{"type":"simple","value":"map"},"anchor":{"type":"simple","value":"center"},"textOpacity":{"type":"simple","value":1},"textHaloWidth":{"type":"simple","value":1},"lineHeight":{"type":"simple","value":1.2},"textFont":{"type":"simple","value":["Microsoft YaHei"]},"textIgnorePlacement":{"type":"simple","value":false},"opacity":{"type":"simple","value":0.9}}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1718246071547_196","bounds":[115.7011413574,39.67036946821771,116.68625288435837,40.20693349910422],"showLegend":true,"id":"北京市轨道交通站点(13)(2)(1)","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"1111标准名称","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmGeometrySize","type":"FIELD"},{"fieldName":"1111SmUserID","type":"FIELD"},{"fieldName":"SmY","type":"FIELD"},{"fieldName":"SmGeoPosition","type":"FIELD"},{"fieldName":"SmX","type":"FIELD"},{"fieldName":"SmLibTileID","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"北京市轨道交通站点(13)(2)(1)"},"title":"北京市轨道交通站点(13)(2)(1)","layerSourceType":"Data"},{"visualization":{"renderer":[{"heightMultiple":{"type":"simple","value":1},"textureBlend":{"type":"simple","value":"replace"},"symbolsContent":{"type":"simple","value":{"symbolId":"ms_icon_point-8310","style":{"layout":{"icon-image":"ms_icon_point-8310"}}}},"color":{"field":["smpid"],"defaultValue":"#ffffff","values":[{"value":"#d53e4f","key":1},{"value":"#3288bd","key":17}],"ribbon":["#d53e4f","#fc8d59","#fee08b","#ffffbf","#e6f598","#99d594","#3288bd"],"interpolateInfo":{"type":"linear"},"type":"unique"},"iconStep":{"type":"simple","value":20},"width":{"type":"simple","value":2},"heightfixed":{"type":"simple","value":false},"opacity":{"type":"simple","value":1},"type":"line3D","height":{"type":"simple","value":100},"styleRenderMode":"antvL7"}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1718241075083_4","bounds":[116.10214436813241,39.6703694682177,116.68907341874268,40.20693349910421],"showLegend":true,"id":"北京市轨道交通线路-打印(1)","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"标准名称","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"北京市轨道交通线路-打印(1)"},"title":"北京市轨道交通线路-打印(1)","layerSourceType":"Data","layersContent":[]}],"datas":[{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"北京市轨道交通线路-打印(1)","msDatasetId":"ms_datasetId_1718241075083_4","datasetId":"720626591","geometryField":"geometry"}],"title":"北京市轨道交通线路-打印(1)"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"北京市轨道交通站点(13)(2)(1)","msDatasetId":"ms_datasetId_1718246071547_196","datasetId":"248323554","geometryField":"geometry"}],"title":"北京市轨道交通站点(13)(2)(1)"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"北京市轨道交通线路-打印","msDatasetId":"ms_datasetId_1718247414231_51","datasetId":"1832028287","geometryField":"geometry"}],"title":"北京市轨道交通线路-打印"}],"baseLayer":{"internetMapName":"CHINA_DARK","type":"INTERNET_MAP"},"version":"3.0.4"}',
  visitCount: 4,
  centerString: '{"x":116.39560889343761,"y":39.939177386003514}',
  epsgCode: 3857,
  nickname: 'admin_123',
  layers: null,
  id: 617580084,
  searchSetting: null,
  thumbnail: 'http://127.0.0.1:8089/iportal/resources/thumbnail/map/map617580084.png',
  level: 9,
  center: {
    x: 116.39560889343761,
    y: 39.939177386003514
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
  updateTime: 1718247455503,
  userName: 'admin_123',
  tags: [],
  checkUser: null,
  checkUserNick: null,
  checkTime: null,
  sourceType: 'MAPSTUDIO',
  createTime: 1718241097421,
  controlsString: '',
  isDefaultBottomMap: false,
  status: null,
  favoriteCount: 0
});

var mapstudioWebMap_L7Layers2 = JSON.stringify({
  metadata: {
    layerCatalog: [
      {
        visible: true,
        id: '北京市轨道交通线路-打印',
        title: '北京市轨道交通线路',
        type: 'basic'
      },
      {
        visible: true,
        id: '北京市轨道交通站点(13)(2)(1)',
        title: '北京市轨道交通站点(13)(2)(1)',
        type: 'basic'
      },
      {
        visible: true,
        id: '北京市轨道交通线路-打印(1)',
        title: '北京市轨道交通线路-打印(1)',
        type: 'basic'
      },
      {
        visible: true,
        id: 'CHINA_DARK',
        title: '中国暗色地图',
        type: 'basic'
      }
    ]
  },
  sources: {
    ms_248323554_1718246071602_200: {
      tiles: [
        'http://127.0.0.1:8089/iportal/web/datas/248323554/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%221111%E6%A0%87%E5%87%86%E5%90%8D%E7%A7%B0%22%2C%22SmID%22%2C%22SmGeometrySize%22%2C%221111SmUserID%22%2C%22SmY%22%2C%22SmGeoPosition%22%2C%22SmX%22%2C%22SmLibTileID%22%5D&geometryFieldName=geometry'
      ],
      bounds: [115.7011413574, 39.67036946821771, 116.68625288435837, 40.20693349910422],
      type: 'vector'
    },
    ms_720626591_1718241075102_6: {
      tiles: [
        'http://127.0.0.1:8089/iportal/web/datas/720626591/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22SmID%22%2C%22%E6%A0%87%E5%87%86%E5%90%8D%E7%A7%B0%22%5D&geometryFieldName=geometry'
      ],
      bounds: [116.10214436813241, 39.6703694682177, 116.68907341874268, 40.20693349910421],
      type: 'vector'
    },
    CHINA_DARK: {
      tiles: ['base/resources/img/baiduTileTest.png'],
      tileSize: 256,
      attribution: '',
      bounds: [-180, -90, 180, 90],
      type: 'raster'
    },
    ms_1832028287_1718247414276_56: {
      tiles: [
        'http://127.0.0.1:8089/iportal/web/datas/1832028287/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22SmID%22%2C%22%E6%A0%87%E5%87%86%E5%90%8D%E7%A7%B0%22%5D&geometryFieldName=geometry'
      ],
      bounds: [116.10214436813241, 39.6703694682177, 116.68907341874268, 40.20693349910421],
      type: 'vector'
    }
  },
  crs: 'EPSG:3857',
  center: [116.39560889343761, 39.939177386003514],
  zoom: 9.760029715326183,
  glyphs: {},
  version: '3.2.1',
  rootUrl: 'http://127.0.0.1:8089/iportal/',
  maxzoom: 12,
  name: '无标题地图-le11',
  viewExtent: [115.18399681228337, 41.19689764172645, 117.6072209745858, 39.59816416039695],
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
        'line-extrusion-pattern-interval': 20,
        'line-extrusion-pattern-blend': 'replace'
      },
      metadata: {
        MapStudio: {
          title: '北京市轨道交通线路-打印(1)'
        }
      },
      paint: {
        'line-extrusion-base': 100,
        'line-extrusion-opacity': 1,
        'line-extrusion-width': 2,
        'line-extrusion-base-fixed': false,
        'line-extrusion-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#d53e4f', 17, '#3288bd'],
        'line-extrusion-pattern': 'ms_icon_point-8310'
      },
      source: 'ms_720626591_1718241075102_6',
      'source-layer': '720626591$geometry',
      id: '北京市轨道交通线路-打印(1)',
      type: 'line-extrusion'
    },
    {
      layout: {
        'icon-allow-overlap': true,
        'text-line-height': 1.2,
        visibility: 'visible',
        'text-field': '',
        'text-anchor': 'center',
        'text-size': 16,
        'text-allow-overlap': true,
        'icon-size': 0.08,
        'symbol-placement': 'point',
        'icon-image': 'point-907605',
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
      maxzoom: 24,
      paint: {
        'icon-translate': [0, 0],
        'text-halo-color': '#242424',
        'text-translate-anchor': 'map',
        'icon-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#d53e4f', 241, '#3288bd'],
        'text-halo-blur': 2,
        'icon-translate-anchor': 'map',
        'text-color': '#FFFFFF',
        'text-halo-width': 1,
        'icon-opacity': 0.9,
        'text-opacity': 1,
        'text-translate': [0, 0]
      },
      id: '北京市轨道交通站点(13)(2)(1)',
      source: 'ms_248323554_1718246071602_200',
      'source-layer': '248323554$geometry',
      type: 'symbol',
      minzoom: 0
    },
    {
      metadata: {},
      maxzoom: 24,
      paint: {
        'line-width': 2,
        'line-opacity': 1,
        'line-color': ['interpolate', ['linear'], ['get', 'smpid'], 1, '#d53e4f', 17, '#3288bd']
      },
      id: '北京市轨道交通线路-打印',
      source: 'ms_1832028287_1718247414276_56',
      'source-layer': '1832028287$geometry',
      type: 'line',
      minzoom: 0
    }
  ],
  sprite: 'http://localhost:9876/base/resources/data/sprite',
  pitch: 60,
  minzoom: 0
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
      },
      {
        visible: true,
        id: 'ms_站点3_1715844838827_6329',
        title: '3D格网热力',
        type: 'basic'
      }
    ]
  },
  sources: {
    ms_1767084124_1715758105128_1775: {
      tiles: [
        'http://localhost:8190/iportal/web/datas/1767084124/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%221111%E6%A0%87%E5%87%86%E5%90%8D%E7%A7%B0%22%2C%22SmID%22%2C%22SmGeometrySize%22%2C%221111SmUserID%22%2C%22SmY%22%2C%22SmGeoPosition%22%2C%22SmX%22%2C%22SmLibTileID%22%5D&geometryFieldName=geometry'
      ],
      bounds: [116.36331703990744, 39.89942692791154, 116.38141290077355, 39.9767738835847],
      type: 'vector'
    },
    CHINA_DARK: {
      tiles: ['base/resources/img/baiduTileTest.png'],
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
        'http://localhost:8190/iportal/web/datas/1767084124/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%221111%E6%A0%87%E5%87%86%E5%90%8D%E7%A7%B0%22%2C%22SmID%22%2C%22SmGeometrySize%22%2C%221111SmUserID%22%2C%22SmY%22%2C%22SmGeoPosition%22%2C%22SmX%22%2C%22SmLibTileID%22%5D&geometryFieldName=geometry'
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
        'http://localhost:8190/iportal/web/datas/1767084124/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%221111%E6%A0%87%E5%87%86%E5%90%8D%E7%A7%B0%22%2C%22SmID%22%2C%22SmGeometrySize%22%2C%221111SmUserID%22%2C%22SmY%22%2C%22SmGeoPosition%22%2C%22SmX%22%2C%22SmLibTileID%22%5D&geometryFieldName=geometry'
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
    },
    ms_1767084124_1715844838827_6330: {
      cluster: true,
      clusterType: 'hexagon',
      clusterMethod: 'avg',
      data: {
        dataId: '1767084124',
        type: 'supermap-structured-data'
      },
      type: 'geojson',
      clusterField: 'SmY',
      clusterRadius: 20000
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
  rootUrl: 'http://localhost:8190/iportal/',
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
    },
    {
      layout: {
        'heatmap-extrusion-rotate': 0,
        'heatmap-extrusion-coverage': 1,
        visibility: 'visible',
        'heatmap-extrusion-shape': 'hexagonColumn'
      },
      metadata: {
        MapStudio: {
          title: '3D格网热力'
        }
      },
      paint: {
        'heatmap-extrusion-height': 20000,
        'heatmap-extrusion-opacity': 0.9,
        'heatmap-extrusion-color': ['interpolate', ['linear'], ['get', 'mean'], 4856965.310533348, '#d53e4f']
      },
      source: 'ms_1767084124_1715844838827_6330',
      'source-layer': '1767084124$geometry',
      id: 'ms_站点3_1715844838827_6329',
      type: 'heatmap-extrusion'
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

var RESTDATA_FIELDS_RES = JSON.stringify([
  {
    isRequired: true,
    defaultValue: '',
    name: 'SmID',
    caption: 'SmID',
    type: 'INT32',
    maxLength: 4,
    isZeroLengthAllowed: true,
    isSystemField: true
  },
  {
    isRequired: true,
    defaultValue: '0',
    name: 'SmUserID',
    caption: 'SmUserID',
    type: 'INT32',
    maxLength: 4,
    isZeroLengthAllowed: true,
    isSystemField: false
  },
  {
    isRequired: true,
    defaultValue: '0',
    name: 'SmLength',
    caption: 'SmLength',
    type: 'DOUBLE',
    maxLength: 8,
    isZeroLengthAllowed: true,
    isSystemField: true
  },
  {
    isRequired: true,
    defaultValue: '0',
    name: 'SmTopoError',
    caption: 'SmTopoError',
    type: 'INT32',
    maxLength: 4,
    isZeroLengthAllowed: true,
    isSystemField: true
  },
  {
    isRequired: true,
    defaultValue: '',
    name: 'SmGeoParam',
    caption: 'SmGeoParam',
    type: 'LONGBINARY',
    maxLength: 0,
    isZeroLengthAllowed: true,
    isSystemField: true
  },
  {
    isRequired: true,
    defaultValue: '',
    name: 'SmGeometry',
    caption: 'SmGeometry',
    type: 'LONGBINARY',
    maxLength: 0,
    isZeroLengthAllowed: true,
    isSystemField: true
  },
  {
    isRequired: false,
    defaultValue: '0',
    name: 'Field_SmUserID',
    caption: 'Field_SmUserID',
    type: 'INT32',
    maxLength: 4,
    isZeroLengthAllowed: true,
    isSystemField: false
  },
  {
    isRequired: false,
    defaultValue: '',
    name: 'Name',
    caption: 'Name',
    type: 'WTEXT',
    maxLength: 60,
    isZeroLengthAllowed: true,
    isSystemField: false
  },
  {
    isRequired: false,
    defaultValue: '',
    name: 'VIDEO',
    caption: 'VIDEO',
    type: 'WTEXT',
    maxLength: 255,
    isZeroLengthAllowed: true,
    isSystemField: false
  },
  {
    isRequired: false,
    defaultValue: '',
    name: 'IMG',
    caption: 'IMG',
    type: 'WTEXT',
    maxLength: 255,
    isZeroLengthAllowed: true,
    isSystemField: false
  }
]);

var RESTDATA_DOMAINS_RES = JSON.stringify([
  {
    fieldName: 'fakename'
  },
  {
    fieldName: 'Name',
    type: 'RANGE',
    rangeInfos: []
  },
  {
    fieldName: 'IMG',
    codeInfos: []
  }
]);

var RESTDATA_FEATURES_RES = JSON.stringify({
  type: 'FeatureCollection',
  features: [
    {
      geometry: {
        coordinates: [
          [
            [106.47124921867669, 29.47033178888113],
            [106.47119912104279, 29.470401658110177]
          ],
          [
            [106.47119912104279, 29.470401658110177],
            [106.47113903373958, 29.470271617041654]
          ],
          [
            [106.47119912104279, 29.470401658110177],
            [106.47119910665361, 29.47050160426579],
            [106.47116896677461, 29.471111217808648],
            [106.47116894249285, 29.471281125823456],
            [106.47114887142345, 29.47153095299127]
          ],
          [
            [106.47114887142345, 29.47153095299127],
            [106.4710887481474, 29.471660771027924],
            [106.47200865477578, 29.483526027704155],
            [106.47207877311706, 29.483546145538366]
          ],
          [
            [106.47114887142345, 29.47153095299127],
            [106.47121897627488, 29.471661012945546],
            [106.47202869346961, 29.48349608117939],
            [106.47208879426262, 29.48351618012777]
          ]
        ],
        type: 'MultiLineString'
      },
      id: '1',
      type: 'Feature',
      properties: {
        SMLENGTH: '3295.723073587066',
        IMG: 'http://localhost:8190/iportal/apps/mapdashboard/v2/static/component-thumbnail/container.png',
        SMID: '1',
        VIDEO: 'https://iclient.supermap.io/web/data/video/VID_1.mp4',
        SMTOPOERROR: '0',
        FIELD_SMUSERID: '0',
        SMGEOPARAM: '',
        SMUSERID: '0',
        NAME: '翠柏路'
      }
    }
  ]
});

var apstudioWebMap_layerData = JSON.stringify({
  metadata: {
    layerCatalog: [
      {
        visible: true,
        id: '北京市轨道交通线路-打印(1)',
        title: '北京市轨道交通线路-打印(1)',
        type: 'basic'
      },
      {
        visible: true,
        id: 'Buildings_R_3857@Buildings',
        title: 'Buildings_R_3857@Buildings',
        type: 'basic'
      },
      {
        visible: true,
        id: 'ms_New_LINE_1718091329989_7',
        title: 'New_LINE',
        type: 'basic'
      },
      {
        visible: true,
        id: 'CHINA_DARK',
        title: '中国暗色地图',
        type: 'basic'
      },
      {
        visible: true,
        id: 'D_3857_P@multi(0_24)',
        title: 'D_3857_P@multi',
        type: 'basic'
      }
    ]
  },
  sources: {
    ms_1718091533292_9_1718091533294_10: {
      tiles: [
        'http://localhost:8090/iserver/services/map-Building/rest/maps/Buildings_R_3857%40Buildings/tileimage.png?scale={scale}&x={x}&y={y}&width={width}&height={height}&transparent=true&redirect=false&cacheEnabled=true&origin=%7B%22x%22%3A-20037508.342789244%2C%22y%22%3A20037508.342789244%7D'
      ],
      tileSize: 256,
      bounds: [0, 0, 0, 0],
      type: 'raster'
    },
    ms_M_3857_1719917169016_4: {
      tiles: [
        'http://localhost:8090/iserver/services/map-multi0508/rest/maps/M_3857/tileFeature.mvt?returnAttributes=true&width=512&height=512&z={z}&x={x}&y={y}'
      ],
      bounds: [-180.00000000000003, -88, 180.00000000000003, 83.62359619140625],
      type: 'vector'
    },
    CHINA_DARK: {
      tiles: ['base/resources/img/baiduTileTest.png'],
      tileSize: 256,
      attribution: '',
      bounds: [-180, -90, 180, 90],
      type: 'raster'
    },
    ms_720626591_1718099782613_8: {
      tiles: [
        'http://localhost:8190/iportal/web/datas/720626591/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22SmID%22%2C%22%E6%A0%87%E5%87%86%E5%90%8D%E7%A7%B0%22%5D&geometryFieldName=geometry'
      ],
      bounds: [116.10214436813241, 39.6703694682177, 116.68907341874268, 40.20693349910421],
      type: 'vector'
    },
    ms_New_LINE_ms_datasetId_1718091328992_4_1718091329990_8: {
      tiles: [
        'http://localhost:8090/iserver/services/data-Building/rest/data/datasources/newBuilding/datasets/New_LINE/tileFeature.mvt?returnAttributes=true&width=512&height=512&x={x}&y={y}&scale={scale}&origin=%7B%22x%22%3A-20037508.3427892%2C%22y%22%3A20037508.3427892%7D'
      ],
      bounds: [106.44543352643626, 29.46270920536568, 106.51524799939585, 29.515272642718454],
      type: 'vector'
    }
  },
  crs: 'EPSG:3857',
  center: [116.39560889343761, 39.939177386003514],
  zoom: 9.789811175067591,
  glyphs: {
    "ms_M_3857_1719917169016_4": "http://localhost:8090/iserver/services/map-multi0508/rest/maps/M_3857/tileFeature/sdffonts/{fontstack}/{range}.pbf"
  },
  version: '3.2.1',
  rootUrl: 'http://localhost:8190/iportal/',
  maxzoom: 12,
  name: 'ms_restdata_dataset',
  viewExtent: [116.0580149440603, 40.20693349910433, 116.73320284281802, 39.67036946821758],
  layers: [
    {
      maxzoom: 12,
      id: 'CHINA_DARK',
      source: 'CHINA_DARK',
      type: 'raster',
      minzoom: 0
    },
    {
      metadata: {},
      paint: {
        'line-width': 2,
        'line-color': '#4CC8A3'
      },
      id: 'ms_New_LINE_1718091329989_7',
      source: 'ms_New_LINE_ms_datasetId_1718091328992_4_1718091329990_8',
      'source-layer': 'New_LINE@newBuilding',
      type: 'line'
    },
    {
      layout: {
        visibility: 'visible'
      },
      metadata: {},
      id: 'Buildings_R_3857@Buildings',
      source: 'ms_1718091533292_9_1718091533294_10',
      type: 'raster'
    },
    {
      metadata: {},
      maxzoom: 24,
      paint: {
        'line-width': 2,
        'line-color': '#4CC8A3'
      },
      id: '北京市轨道交通线路-打印(1)',
      source: 'ms_720626591_1718099782613_8',
      'source-layer': '720626591$geometry',
      type: 'line',
      minzoom: 0
    },
    {
      filter: ['all', ['==', '$type', 'Point']],
      layout: {
        visibility: 'visible'
      },
      metadata: {
        MapStudio: {
          title: 'D_3857_P@multi'
        }
      },
      maxzoom: 24,
      paint: {
        'circle-color': '#EE4D5A'
      },
      source: 'ms_M_3857_1719917169016_4',
      'source-layer': 'D_3857_P@multi',
      id: 'D_3857_P@multi(0_24)',
      type: 'circle',
      minzoom: 0
    }
  ],
  pitch: 0,
  minzoom: 0
});

var msProjectINfo_layerData = JSON.stringify({
  extent: {
    top: 39.67036946821758,
    left: 116.0580149440603,
    bottom: 40.20693349910433,
    leftBottom: {
      x: 116.0580149440603,
      y: 40.20693349910433
    },
    right: 116.73320284281802,
    rightTop: {
      x: 116.73320284281802,
      y: 39.67036946821758
    }
  },
  controls: null,
  extentString:
    '{"top":39.67036946821758,"left":116.0580149440603,"bottom":40.20693349910433,"leftBottom":{"x":116.0580149440603,"y":40.20693349910433},"right":116.73320284281802,"rightTop":{"x":116.73320284281802,"y":39.67036946821758}}',
  description: '',
  verifyReason: null,
  units: null,
  title: 'ms_restdata_dataset',
  resolution: 0,
  checkStatus: 'SUCCESSFUL',
  projectInfo:
    '{"catalogs":[{"filter":["all",["==","$type","Point"]],"visualization":{"renderer":[{"heightMultiple":{"type":"simple","value":1},"shape":{"type":"simple","value":"cylinder"},"color":{"type":"simple","value":"#EE4D5A"},"size":{"type":"simple","value":12},"opacity":{"type":"simple","value":0.9},"type":"column","height":{"type":"simple","value":20},"styleRenderMode":"antvL7"}]},"visible":true,"catalogType":"layer","labelsContent":[],"serviceLayerId":"D_3857_P@multi","id":"D_3857_P@multi(0_24)","popupInfo":{"elements":[{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmUserID","type":"FIELD"},{"fieldName":"USERID","type":"FIELD"},{"fieldName":"CAPITAL_LO","type":"FIELD"},{"fieldName":"CAPITAL_EN","type":"FIELD"},{"fieldName":"COUNTRY_EN","type":"FIELD"},{"fieldName":"CAP_POP","type":"FIELD"}],"title":"D_3857_P@multi"},"title":"D_3857_P@multi","layerSourceType":"VectorTileService","zoomRange":[0,24],"layersContent":[]},{"visualization":{"renderer":[{"lineDasharray":{"type":"simple","value":[1,0]},"color":{"type":"simple","value":"#4CC8A3"},"lineTranslateAnchor":{"type":"simple","value":"map"},"lineMiterLimit":{"type":"simple","value":2},"lineOffset":{"type":"simple","value":0},"lineJoin":{"type":"simple","value":"miter"},"lineRoundLimit":{"type":"simple","value":1.05},"lineTranslate":{"type":"simple","value":[0,0]},"lineGapWidth":{"type":"simple","value":0},"symbolsContent":{"type":"simple","value":{"symbolId":"line-0","style":{"paint":{"line-width":2,"line-color":"#4CC8A3"}}}},"lineCap":{"type":"simple","value":"butt"},"width":{"type":"simple","value":2},"opacity":{"type":"simple","value":1}}]},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1718099782604_6","bounds":[116.10214436813241,39.6703694682177,116.68907341874268,40.20693349910421],"id":"北京市轨道交通线路-打印(1)","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"SmID","type":"FIELD"},{"fieldName":"标准名称","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"北京市轨道交通线路-打印(1)"},"title":"北京市轨道交通线路-打印(1)","layerSourceType":"Data"},{"visible":true,"catalogType":"layer","id":"Buildings_R_3857@Buildings","title":"Buildings_R_3857@Buildings","layerSourceType":"TileService"},{"visualization":{"renderer":[{"lineDasharray":{"type":"simple","value":[1,0]},"color":{"type":"simple","value":"#4CC8A3"},"lineTranslateAnchor":{"type":"simple","value":"map"},"lineMiterLimit":{"type":"simple","value":2},"lineOffset":{"type":"simple","value":0},"lineJoin":{"type":"simple","value":"miter"},"lineRoundLimit":{"type":"simple","value":1.05},"lineTranslate":{"type":"simple","value":[0,0]},"styleRenderMode":"mapboxgl","symbolsContent":{"type":"simple","value":{"symbolId":"line-0","style":{"paint":{"line-width":2,"line-color":"#4CC8A3"}}}},"lineGapWidth":{"type":"simple","value":0},"lineCap":{"type":"simple","value":"butt"},"width":{"type":"simple","value":2},"opacity":{"type":"simple","value":1}}]},"catalogType":"layer","msDatasetId":"ms_datasetId_1718091328992_4","bounds":[106.44543352643626,29.46270920536568,106.51524799939585,29.515272642718454],"id":"ms_New_LINE_1718091329989_7","popupInfo":{"elements":[{"fieldName":"SmID","type":"FIELD"},{"fieldName":"SmLength","type":"FIELD"},{"fieldName":"SmTopoError","type":"FIELD"},{"fieldName":"SmGeoParam","type":"FIELD"},{"fieldName":"SmGeometry","type":"FIELD"},{"fieldName":"SmUserID","type":"FIELD"},{"fieldName":"Field_SmUserID","type":"FIELD"},{"fieldName":"Name","type":"FIELD"},{"fieldName":"VIDEO","type":"FIELD"},{"fieldName":"IMG","type":"FIELD"}],"title":"New_LINE"},"title":"New_LINE","layerSourceType":"DataService"}],"datas":[{"sourceType":"REST_DATA","datasets":[{"datasetTitle":"New_LINE","msDatasetId":"ms_datasetId_1718091328992_4","datasetName":"New_LINE"}],"title":"newBuilding","url":"http://localhost:8090/iserver/services/data-Building/rest/data/datasources/newBuilding"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"北京市轨道交通线路-打印(1)","msDatasetId":"ms_datasetId_1718099782604_6","datasetId":"720626591","geometryField":"geometry"}],"title":"北京市轨道交通线路-打印(1)"}],"baseLayer":{"internetMapName":"CHINA_DARK","type":"INTERNET_MAP"},"version":"3.0.4"}',
  visitCount: 11,
  centerString: '{"x":116.39560889343761,"y":39.939177386003514}',
  epsgCode: 3857,
  nickname: 'admin_123',
  layers: null,
  id: 617580084,
  searchSetting: null,
  thumbnail: 'http://localhost:8190/iportal/resources/thumbnail/map/map1093493210.png',
  level: 9,
  center: {
    x: 116.39560889343761,
    y: 39.939177386003514
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
  updateTime: 1718099788134,
  userName: 'admin_123',
  tags: [],
  checkUser: null,
  checkUserNick: null,
  checkTime: null,
  sourceType: 'MAPSTUDIO',
  createTime: 1718091348865,
  controlsString: '',
  isDefaultBottomMap: false,
  status: null,
  favoriteCount: 0
});

var msProjectINfo_labelLegend= JSON.stringify({
  extent: {
      top: 30.581626133861924, 
      left: 119.50387266758831, 
      bottom: 33.47830971105678, 
      leftBottom: {
          x: 119.50387266758831, 
          y: 33.47830971105678
      }, 
      right: 123.44840733243328, 
      rightTop: {
          x: 123.44840733243328, 
          y: 30.581626133861924
      }
  }, 
  controls: null, 
  extentString: "{\"top\":30.581626133861924,\"left\":119.50387266758831,\"bottom\":33.47830971105678,\"leftBottom\":{\"x\":119.50387266758831,\"y\":33.47830971105678},\"right\":123.44840733243328,\"rightTop\":{\"x\":123.44840733243328,\"y\":30.581626133861924}}", 
  description: "", 
  verifyReason: null, 
  units: null, 
  title: "无标题地图-text-legend", 
  resolution: 0, 
  checkStatus: "SUCCESSFUL", 
  projectInfo: '{"images":"http://127.0.0.1:8089/iportal/web/maps/587670427/sprites/sprite","catalogs":[{"visualization":{"renderer":[{"symbolsContent":{"type":"simple","value":{"symbolId":"polygon-0","style":{"layout":{"visibility":"visible"},"paint":{"fill-outline-color":"#FFFFFF","fill-color":"#826DBA","fill-opacity":0.9}}}},"color":{"type":"simple","value":"#826DBA"},"antialias":{"type":"simple","value":true},"outlineColor":{"type":"simple","value":"#FFFFFF"},"opacity":{"type":"simple","value":0.9}}],"label":{"rotate":{"type":"simple","value":0},"textLetterSpacing":{"type":"simple","value":0},"textTranslate":{"type":"simple","value":[0,0]},"color":{"type":"simple","value":"#EE4D5A"},"symbolPlacement":{"type":"simple","value":"point"},"textAnchor":{"type":"simple","value":"center"},"translate":{"type":"simple","value":[0,0]},"textRotate":{"type":"simple","value":0},"textField":{"type":"simple","value":"{name}"},"textHaloBlur":{"type":"simple","value":2},"transform":{"type":"simple","value":"none"},"symbolsContent":{"type":"simple","value":{"symbolId":"","style":{"layout":{"icon-image":""}}}},"textTranslateAnchor":{"type":"simple","value":"map"},"justify":{"type":"simple","value":"center"},"ignorePlacement":{"type":"simple","value":false},"textAllowOverlap":{"type":"simple","value":true},"maxWidth":{"type":"simple","value":10},"textSize":{"type":"simple","value":16},"textHaloColor":{"type":"simple","value":"#242424"},"textColor":{"field":["smpid"],"defaultValue":"#ffffff","values":[{"value":"#d53e4f","key":1},{"value":"#3288bd","key":3}],"ribbon":["#d53e4f","#fc8d59","#fee08b","#ffffbf","#e6f598","#99d594","#3288bd"],"interpolateInfo":{"type":"linear"},"type":"unique"},"size":{"type":"simple","value":8},"allowOverlap":{"type":"simple","value":true},"translateAnchor":{"type":"simple","value":"map"},"anchor":{"type":"simple","value":"center"},"textOpacity":{"type":"simple","value":1},"textHaloWidth":{"type":"simple","value":1},"lineHeight":{"type":"simple","value":1.2},"textFont":{"type":"simple","value":["Microsoft YaHei"]},"textIgnorePlacement":{"type":"simple","value":false},"opacity":{"type":"simple","value":0.9}}},"visible":true,"catalogType":"layer","msDatasetId":"ms_datasetId_1721356340588_82","bounds":[101.06785732906204,29.800258509171595,104.27317208155472,31.478587256555958],"showLegend":true,"labelsContent":["ms_label_ms_未命名数据(8)_1721356340655_87_1721356397778_218"],"id":"ms_未命名数据(8)_1721356340655_87","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"name","type":"FIELD"},{"fieldName":"index","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"未命名数据(8)"},"title":"未命名数据(8)","layerSourceType":"Data","zoomRange":[0,24]},{"visualization":{"renderer":[{"lineDasharray":{"type":"simple","value":[1,0]},"color":{"type":"simple","value":"#4CC8A3"},"lineTranslateAnchor":{"type":"simple","value":"map"},"lineMiterLimit":{"type":"simple","value":2},"lineOffset":{"type":"simple","value":0},"lineJoin":{"type":"simple","value":"miter"},"lineRoundLimit":{"type":"simple","value":1.05},"lineTranslate":{"type":"simple","value":[0,0]},"lineGapWidth":{"type":"simple","value":0},"symbolsContent":{"type":"simple","value":{"symbolId":"line-0","style":{"layout":{"visibility":"visible","line-miter-limit":2,"line-round-limit":1.05,"line-join":"miter","line-cap":"butt"},"paint":{"line-translate-anchor":"map","line-width":2,"line-gap-width":0,"line-offset":0,"line-opacity":1,"line-dasharray":[1,0],"line-translate":[0,0],"line-color":"#4CC8A3"}}}},"lineCap":{"type":"simple","value":"butt"},"width":{"type":"simple","value":2},"opacity":{"type":"simple","value":1}}],"label":{"rotate":{"type":"simple","value":0},"textLetterSpacing":{"type":"simple","value":0},"textTranslate":{"type":"simple","value":[0,0]},"color":{"type":"simple","value":"#EE4D5A"},"symbolPlacement":{"type":"simple","value":"point"},"textAnchor":{"type":"simple","value":"center"},"translate":{"type":"simple","value":[0,0]},"textRotate":{"type":"simple","value":0},"textField":{"type":"simple","value":"{smpid}"},"textHaloBlur":{"type":"simple","value":2},"transform":{"type":"simple","value":"none"},"symbolsContent":{"type":"simple","value":{"symbolId":"circle","style":{"layout":{"icon-image":"circle"}}}},"textTranslateAnchor":{"type":"simple","value":"map"},"justify":{"type":"simple","value":"center"},"ignorePlacement":{"type":"simple","value":false},"textAllowOverlap":{"type":"simple","value":true},"maxWidth":{"type":"simple","value":10},"textSize":{"type":"simple","value":16},"textHaloColor":{"type":"simple","value":"#242424"},"textColor":{"field":["smpid"],"defaultValue":"#ffffff","values":[{"value":"#d53e4f","key":1},{"value":"#3288bd","key":3}],"ribbon":["#d53e4f","#fc8d59","#fee08b","#ffffbf","#e6f598","#99d594","#3288bd"],"interpolateInfo":{"type":"linear"},"type":"unique"},"size":{"type":"simple","value":8},"allowOverlap":{"type":"simple","value":true},"translateAnchor":{"type":"simple","value":"map"},"anchor":{"type":"simple","value":"center"},"textOpacity":{"type":"simple","value":1},"textHaloWidth":{"type":"simple","value":1},"lineHeight":{"type":"simple","value":1.2},"textFont":{"type":"simple","value":["Microsoft YaHei"]},"textIgnorePlacement":{"type":"simple","value":false},"opacity":{"type":"simple","value":0.9}}},"visible":true,"catalogType":"layer","showLegend":true,"labelsContent":["ms_label_未命名数据(6)_1721356417065_271"],"title":"未命名数据(6)","layerSourceType":"Data","zoomRange":[0,24],"layersContent":[],"msDatasetId":"ms_datasetId_1721299204449_245","bounds":[99.9531563324067,28.059225801622308,106.40158916912902,32.57195517306453],"id":"未命名数据(6)","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"新建字段","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"未命名数据(6)"}},{"visualization":{"renderer":[{"rotate":{"type":"simple","value":0},"textLetterSpacing":{"type":"simple","value":0},"textTranslate":{"type":"simple","value":[0,0]},"color":{"type":"simple","value":"#EE4D5A"},"symbolPlacement":{"type":"simple","value":"point"},"textAnchor":{"type":"simple","value":"center"},"translate":{"type":"simple","value":[0,0]},"textRotate":{"type":"simple","value":0},"textField":{"type":"simple","value":"{学习中心（点）名称}"},"styleRenderMode":"mapboxgl","textHaloBlur":{"type":"simple","value":0},"transform":{"type":"simple","value":"none"},"symbolsContent":{"type":"simple","value":{"symbolId":"circle","style":{"layout":{"icon-image":"circle"}}}},"textTranslateAnchor":{"type":"simple","value":"map"},"justify":{"type":"simple","value":"center"},"ignorePlacement":{"type":"simple","value":false},"textAllowOverlap":{"type":"simple","value":true},"maxWidth":{"type":"simple","value":10},"textSize":{"type":"simple","value":16},"textHaloColor":{"type":"simple","value":"#242424"},"textColor":{"type":"simple","value":"#FFFFFF"},"size":{"type":"simple","value":8},"allowOverlap":{"type":"simple","value":true},"translateAnchor":{"type":"simple","value":"map"},"anchor":{"type":"simple","value":"center"},"textOpacity":{"type":"simple","value":1},"textHaloWidth":{"type":"simple","value":0},"lineHeight":{"type":"simple","value":1.2},"textFont":{"type":"simple","value":["Microsoft YaHei"]},"textIgnorePlacement":{"type":"simple","value":false},"opacity":{"type":"simple","value":0.9}}]},"visible":true,"catalogType":"layer","showLegend":true,"labelsContent":[],"title":"上海市可校外学习中心(1)","layerSourceType":"Data","zoomRange":[0,24],"layersContent":[],"msDatasetId":"ms_datasetId_1721274351187_3693","bounds":[121.12147,30.71292682,121.83081,31.68730001],"id":"上海市可校外学习中心(1)","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"﻿序号","type":"FIELD"},{"fieldName":"试点高校","type":"FIELD"},{"fieldName":"依托单位","type":"FIELD"},{"fieldName":"学习中心（点）名称","type":"FIELD"},{"fieldName":"地址","type":"FIELD"},{"fieldName":"经度","type":"FIELD"},{"fieldName":"纬度","type":"FIELD"},{"fieldName":"msgeometry","type":"FIELD"}],"title":"上海市可校外学习中心(1)"}},{"visualization":{"renderer":[{"fillExtrusionTranslateAnchor":{"type":"simple","value":"map"},"fillExtrusionVerticalGradient":{"type":"simple","value":true},"fillExtrusionHeightMultiple":{"type":"simple","value":1},"symbolsContent":{"type":"simple","value":{"symbolId":"polygon-0","style":{"layout":{"visibility":"visible"},"paint":{"fill-outline-color":"#FFFFFF","fill-color":"#826DBA","fill-opacity":0.9}}}},"color":{"type":"simple","value":"#826DBA"},"fillExtrusionBase":{"type":"simple","value":1000},"fillExtrusionTranslate":{"type":"simple","value":[0,0]},"fillExtrusionBaseMultiple":{"type":"simple","value":1},"opacity":{"type":"simple","value":0.9},"type":"fillExtrusion","fillExtrusionHeight":{"type":"simple","value":30000},"styleRenderMode":"mapboxgl"}],"label":{"textLetterSpacing":{"type":"simple","value":0},"textTranslate":{"type":"simple","value":[0,0]},"textSize":{"field":["smpid"],"defaultValue":16,"values":[{"value":8,"key":1},{"value":50,"key":3}],"interpolateInfo":{"type":"linear"},"type":"unique"},"textZOffset":{"type":"simple","value":200000},"textHaloColor":{"type":"simple","value":"#242424"},"textAnchor":{"type":"simple","value":"center"},"textColor":{"type":"simple","value":"#FFFFFF"},"textField":{"type":"simple","value":"{smpid}"},"styleRenderMode":"antvL7","textHaloBlur":{"type":"simple","value":2},"textOpacity":{"type":"simple","value":0.9},"textHaloWidth":{"type":"simple","value":1},"textFont":{"type":"simple"},"textAllowOverlap":{"type":"simple","value":true}}},"visible":true,"catalogType":"layer","showLegend":true,"labelsContent":["ms_label_未命名数据(8)_1721355394193_51"],"title":"未命名数据(8)","layerSourceType":"Data","zoomRange":[0,24],"layersContent":[],"msDatasetId":"ms_datasetId_1721185747321_438","bounds":[101.06785732906204,29.800258509171595,104.27317208155472,31.478587256555958],"id":"未命名数据(8)","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"name","type":"FIELD"},{"fieldName":"index","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"未命名数据(8)"}}],"datas":[{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"北京市轨道交通线路-打印(2)","msDatasetId":"ms_datasetId_1721093667551_4","datasetId":"1442585533","geometryField":"geometry"}],"title":"北京市轨道交通线路-打印(2)"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"北京市轨道交通站点(13)(2)(2)","msDatasetId":"ms_datasetId_1721097420598_230","datasetId":"540737853","geometryField":"geometry"}],"title":"北京市轨道交通站点(13)(2)(2)"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"县级行政区划","msDatasetId":"ms_datasetId_1721097693397_915","datasetId":"932916417","geometryField":"geometry"}],"title":"县级行政区划"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"未命名数据(8)","msDatasetId":"ms_datasetId_1721183007022_44","datasetId":"40654641","geometryField":"geometry"}],"title":"未命名数据(8)"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"未命名数据(8)","msDatasetId":"ms_datasetId_1721185747321_438","datasetId":"40654641","geometryField":"geometry"}],"title":"未命名数据(8)"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"上海市可校外学习中心(1)","msDatasetId":"ms_datasetId_1721274351187_3693","datasetId":"166003414","geometryField":"msgeometry"}],"title":"上海市可校外学习中心(1)"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"未命名数据(6)","msDatasetId":"ms_datasetId_1721299204449_245","datasetId":"347730291","geometryField":"geometry"}],"title":"未命名数据(6)"},{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"未命名数据(8)","msDatasetId":"ms_datasetId_1721356340588_82","datasetId":"40654641","geometryField":"geometry"}],"title":"未命名数据(8)"}],"baseLayer":{"internetMapName":"CHINA_DARK","type":"INTERNET_MAP"},"version":"3.0.4"}',
  visitCount: 110, 
  centerString: "{\"x\":121.47614000000556,\"y\":31.201367876214704}", 
  epsgCode: 3857, 
  nickname: "admin_123", 
  layers: null, 
  id: 587670427, 
  searchSetting: null, 
  thumbnail: "http://172.16.15.52:8080/iportal/resources/thumbnail/map/map587670427.png", 
  level: 9, 
  center: {
      x: 121.47614000000556, 
      y: 31.201367876214704
  }, 
  authorizeSetting: [
      {
          permissionType: "DELETE", 
          aliasName: "admin_123", 
          entityRoles: [
              "ADMIN", 
              "SYSTEM"
          ], 
          entityType: "USER", 
          entityName: "admin_123", 
          entityId: null
      }
  ], 
  updateTime: 1721283134814, 
  userName: "admin_123", 
  tags: [ ], 
  checkUser: null, 
  checkUserNick: null, 
  checkTime: null, 
  sourceType: "MAPSTUDIO", 
  createTime: 1721093824271, 
  controlsString: "", 
  isDefaultBottomMap: false, 
  status: null, 
  favoriteCount: 0
})

var mapstudioWebMap_labelLegend = JSON.stringify({
  metadata: {
      "layerCatalog": [
          {
              "visible": true,
              "parts": [
                  "ms_未命名数据(8)_1721356340655_87",
                  "ms_label_ms_未命名数据(8)_1721356340655_87_1721356397778_218"
              ],
              "id": "ms_未命名数据(8)_1721356340655_87",
              "title": "未命名数据(8)",
              "type": "composite"
          },
          {
              "visible": true,
              "parts": [
                  "未命名数据(6)",
                  "ms_label_未命名数据(6)_1721356417065_271"
              ],
              "id": "未命名数据(6)",
              "title": "未命名数据(6)",
              "type": "composite"
          },
          {
              "visible": true,
              "id": "上海市可校外学习中心(1)",
              "title": "上海市可校外学习中心(1)",
              "type": "basic"
          },
          {
              "visible": true,
              "parts": [
                  "未命名数据(8)",
                  "ms_label_未命名数据(8)_1721355394193_51"
              ],
              "id": "未命名数据(8)",
              "title": "未命名数据(8)",
              "type": "composite"
          },
          {
              "visible": true,
              "id": "CHINA_DARK",
              "title": "中国暗色地图",
              "type": "basic"
          }
      ]
  },
  sources: {
      "40654641": {
          "tiles": [
              "http://127.0.0.1:8089/iportal/web/datas/40654641/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22name%22%2C%22index%22%5D&geometryFieldName=geometry"
          ],
          "bounds": [
              101.06785732906204,
              29.800258509171595,
              104.27317208155472,
              31.478587256555958
          ],
          "type": "vector"
      },
      "166003414": {
          "tiles": [
              "http://127.0.0.1:8089/iportal/web/datas/166003414/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22%EF%BB%BF%E5%BA%8F%E5%8F%B7%22%2C%22%E8%AF%95%E7%82%B9%E9%AB%98%E6%A0%A1%22%2C%22%E4%BE%9D%E6%89%98%E5%8D%95%E4%BD%8D%22%2C%22%E5%AD%A6%E4%B9%A0%E4%B8%AD%E5%BF%83%EF%BC%88%E7%82%B9%EF%BC%89%E5%90%8D%E7%A7%B0%22%2C%22%E5%9C%B0%E5%9D%80%22%2C%22%E7%BB%8F%E5%BA%A6%22%2C%22%E7%BA%AC%E5%BA%A6%22%5D&geometryFieldName=msgeometry"
          ],
          "bounds": [
              121.12147,
              30.71292682,
              121.83081,
              31.68730001
          ],
          "type": "vector"
      },
      "347730291": {
          "tiles": [
              "http://127.0.0.1:8089/iportal/web/datas/347730291/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22%E6%96%B0%E5%BB%BA%E5%AD%97%E6%AE%B5%22%5D&geometryFieldName=geometry"
          ],
          "bounds": [
              99.9531563324067,
              28.059225801622308,
              106.40158916912902,
              32.57195517306453
          ],
          "type": "vector"
      },
      "label_40654641": {
          "tiles": [
              "http://127.0.0.1:8089/iportal/services/../web/datas/40654641/structureddata/pointonsurface/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22name%22%2C%22index%22%5D&geometryFieldName=geometry"
          ],
          "bounds": [
              101.06785732906204,
              29.800258509171595,
              104.27317208155472,
              31.478587256555958
          ],
          "type": "vector"
      },
      "CHINA_DARK": {
          "tiles": [
              "https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark/tileimage.png?scale={scale}&x={x}&y={y}&width={width}&height={height}&transparent=true&redirect=false&cacheEnabled=true"
          ],
          "tileSize": 256,
          "attribution": "",
          "bounds": [
              -180,
              -90,
              180,
              90
          ],
          "type": "raster"
      },
      "ms_label_未命名数据(8)_1721355394193_51_source": {
          "tiles": [
              "http://127.0.0.1:8089/iportal/services/../web/datas/40654641/structureddata/pointonsurface/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22name%22%2C%22index%22%5D&geometryFieldName=geometry"
          ],
          "bounds": [
              11250822.413438408,
              3477900.689062408,
              11607636.419518061,
              3695060.0329264207
          ],
          "type": "vector"
      },
      "ms_40654641_1721356340655_88": {
          "tiles": [
              "http://127.0.0.1:8089/iportal/web/datas/40654641/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22name%22%2C%22index%22%5D&geometryFieldName=geometry"
          ],
          "bounds": [
              101.06785732906204,
              29.800258509171595,
              104.27317208155472,
              31.478587256555958
          ],
          "type": "vector"
      }
  },
  crs: "EPSG:3857",
  center: [
      102.67051470530828,
      30.64306329279174
  ],
  zoom: 8.281022030055908,
  glyphs: {},
  version: "3.2.2",
  rootUrl: "http://127.0.0.1:8089/iportal/",
  maxzoom: 12,
  name: "无标题地图-text-legend",
  viewExtent: [
      99.29306203193539,
      34.53068708094793,
      106.04796737868641,
      29.573208134867993
  ],
  layers: [
      {
          "maxzoom": 12,
          "id": "CHINA_DARK",
          "source": "CHINA_DARK",
          "type": "raster",
          "minzoom": 0
      },
      {
          "layout": {
              "visibility": "visible"
          },
          "metadata": {},
          "maxzoom": 24,
          "paint": {
              "fill-extrusion-height": [
                  "*",
                  30000,
                  1
              ],
              "fill-extrusion-opacity": 0.9,
              "fill-extrusion-base": [
                  "*",
                  1000,
                  1
              ],
              "fill-extrusion-vertical-gradient": true,
              "fill-extrusion-translate-anchor": "map",
              "fill-extrusion-color": "#826DBA",
              "fill-extrusion-translate": [
                  0,
                  0
              ]
          },
          "id": "未命名数据(8)",
          "source": "40654641",
          "source-layer": "40654641$geometry",
          "type": "fill-extrusion",
          "minzoom": 0
      },
      {
          "layout": {
              "text-z-offset": 200000,
              "text-letter-spacing": 0,
              "visibility": "visible",
              "text-field": "{smpid}",
              "text-anchor": "center",
              "text-size": [
                  "interpolate",
                  [
                      "linear"
                  ],
                  [
                      "get",
                      "smpid"
                  ],
                  1,
                  8,
                  3,
                  50
              ],
              "text-allow-overlap": true
          },
          "metadata": {
              "MapStudio": {
                  "title": "ms_label_未命名数据(8)_1721355394193_51"
              }
          },
          "maxzoom": 24,
          "paint": {
              "text-halo-color": "#242424",
              "text-halo-blur": 2,
              "text-color": "#FFFFFF",
              "text-halo-width": 1,
              "text-opacity": 0.9,
              "text-translate": [
                  0,
                  0
              ]
          },
          "source": "ms_label_未命名数据(8)_1721355394193_51_source",
          "source-layer": "40654641$geometry",
          "id": "ms_label_未命名数据(8)_1721355394193_51",
          "type": "symbol",
          "minzoom": 0
      },
      {
          "layout": {
              "icon-allow-overlap": true,
              "text-line-height": 1.2,
              "visibility": "visible",
              "text-field": "{学习中心（点）名称}",
              "text-size": 16,
              "text-anchor": "center",
              "text-allow-overlap": true,
              "icon-size": 0.08,
              "symbol-placement": "point",
              "icon-image": "circle",
              "icon-ignore-placement": false,
              "text-font": [
                  "Microsoft YaHei"
              ],
              "text-rotate": 0,
              "text-transform": "none",
              "text-max-width": 10,
              "text-justify": "center",
              "text-letter-spacing": 0,
              "icon-anchor": "center",
              "text-ignore-placement": false,
              "icon-rotate": 0
          },
          "metadata": {},
          "maxzoom": 24,
          "paint": {
              "icon-translate": [
                  0,
                  0
              ],
              "text-halo-color": "#242424",
              "text-translate-anchor": "map",
              "icon-color": "#EE4D5A",
              "icon-translate-anchor": "map",
              "text-halo-blur": 0,
              "text-color": "#FFFFFF",
              "icon-opacity": 0.9,
              "text-halo-width": 13,
              "text-opacity": 1,
              "text-translate": [
                  0,
                  0
              ]
          },
          "id": "上海市可校外学习中心(1)",
          "source": "166003414",
          "source-layer": "166003414$msgeometry",
          "type": "symbol",
          "minzoom": 0
      },
      {
          "layout": {
              "visibility": "visible",
              "line-miter-limit": 2,
              "line-round-limit": 1.05,
              "line-join": "miter",
              "line-cap": "butt"
          },
          "metadata": {},
          "maxzoom": 24,
          "paint": {
              "line-translate-anchor": "map",
              "line-width": 2,
              "line-gap-width": 0,
              "line-offset": 0,
              "line-opacity": 1,
              "line-dasharray": [
                  1,
                  0
              ],
              "line-translate": [
                  0,
                  0
              ],
              "line-color": "#4CC8A3"
          },
          "id": "未命名数据(6)",
          "source": "347730291",
          "source-layer": "347730291$geometry",
          "type": "line",
          "minzoom": 0
      },
      {
          "layout": {
              "icon-allow-overlap": true,
              "text-line-height": 1.2,
              "visibility": "visible",
              "text-field": "{smpid}",
              "text-anchor": "center",
              "text-size": 16,
              "text-allow-overlap": true,
              "icon-size": 0.08,
              "symbol-placement": "point",
              "icon-image": "circle",
              "icon-ignore-placement": false,
              "text-font": [
                  "Microsoft YaHei"
              ],
              "text-rotate": 0,
              "text-transform": "none",
              "text-justify": "center",
              "text-letter-spacing": 0,
              "text-max-width": 10,
              "icon-anchor": "center",
              "text-ignore-placement": false,
              "icon-rotate": 0
          },
          "metadata": {},
          "maxzoom": 24,
          "paint": {
              "icon-translate": [
                  0,
                  0
              ],
              "text-halo-color": "#242424",
              "text-translate-anchor": "map",
              "icon-color": "#EE4D5A",
              "text-halo-blur": 2,
              "text-color": [
                  "interpolate",
                  [
                      "linear"
                  ],
                  [
                      "get",
                      "smpid"
                  ],
                  1,
                  "#d53e4f",
                  3,
                  "#3288bd"
              ],
              "text-halo-width": 1,
              "icon-opacity": 0.9,
              "text-opacity": 1,
              "text-translate": [
                  0,
                  0
              ]
          },
          "id": "ms_label_未命名数据(6)_1721356417065_271",
          "source": "347730291",
          "source-layer": "347730291$geometry",
          "type": "symbol",
          "minzoom": 0
      },
      {
          "metadata": {},
          "maxzoom": 24,
          "paint": {
              "fill-outline-color": "#FFFFFF",
              "fill-color": "#826DBA",
              "fill-opacity": 0.9
          },
          "id": "ms_未命名数据(8)_1721356340655_87",
          "source": "ms_40654641_1721356340655_88",
          "source-layer": "40654641$geometry",
          "type": "fill",
          "minzoom": 0
      },
      {
          "layout": {
              "icon-allow-overlap": true,
              "text-line-height": 1.2,
              "visibility": "visible",
              "text-field": "{name}",
              "text-anchor": "center",
              "text-size": 16,
              "text-allow-overlap": true,
              "icon-size": 0.08,
              "symbol-placement": "point",
              "icon-image": "",
              "icon-ignore-placement": false,
              "text-font": [
                  "Microsoft YaHei"
              ],
              "text-rotate": 0,
              "text-transform": "none",
              "text-justify": "center",
              "text-letter-spacing": 0,
              "text-max-width": 10,
              "icon-anchor": "center",
              "text-ignore-placement": false,
              "icon-rotate": 0
          },
          "metadata": {},
          "maxzoom": 24,
          "paint": {
              "icon-translate": [
                  0,
                  0
              ],
              "text-halo-color": "#242424",
              "text-translate-anchor": "map",
              "icon-color": "#EE4D5A",
              "text-halo-blur": 2,
              "text-color": [
                  "interpolate",
                  [
                      "linear"
                  ],
                  [
                      "get",
                      "smpid"
                  ],
                  1,
                  "#d53e4f",
                  3,
                  "#3288bd"
              ],
              "text-halo-width": 1,
              "icon-opacity": 0.9,
              "text-opacity": 1,
              "text-translate": [
                  0,
                  0
              ]
          },
          "id": "ms_label_ms_未命名数据(8)_1721356340655_87_1721356397778_218",
          "source": "label_40654641",
          "source-layer": "40654641$geometry",
          "type": "symbol",
          "minzoom": 0
      }
  ],
  sprite: "http://127.0.0.1:8089/iportal/web/maps/587670427/sprites/sprite",
  pitch: 60,
  minzoom: 0
});

var mapstudioWebMap_group = JSON.stringify({
  metadata: {
    layerCatalog: [
      {
        visible: true,
        children: [
          {
            visible: true,
            id: '四川省市级边界',
            title: '四川省市级边界',
            type: 'basic'
          }
        ],
        id: 'ms_group_1719799741965_7',
        title: '未命名分组',
        type: 'group'
      },
      {
        visible: true,
        id: 'CHINA_DARK',
        title: '中国暗色地图',
        type: 'basic'
      }
    ]
  },
  sources: {
    ms_10451348_1719799738109_6: {
      tiles: [
        'http://localhost:8190/iportal/web/datas/10451348/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22parent%22%2C%22adcode%22%2C%22level%22%2C%22centroid%22%2C%22childrenNum%22%2C%22center%22%2C%22subFeatureIndex%22%2C%22name%22%2C%22acroutes%22%5D&geometryFieldName=geometry'
      ],
      bounds: [97.350096, 26.045865, 108.546488, 34.312446],
      type: 'vector'
    },
    CHINA_DARK: {
      tiles: ['base/resources/img/baiduTileTest.png'],
      tileSize: 256,
      attribution: '',
      bounds: [-180, -90, 180, 90],
      type: 'raster'
    }
  },
  crs: 'EPSG:3857',
  center: [101.12284196390647, 30.26608027222483],
  zoom: 5.9855446883732935,
  glyphs: {},
  version: '3.2.1',
  rootUrl: 'http://localhost:8190/iportal/',
  maxzoom: 12,
  name: '无标题地图group1',
  viewExtent: [94.1151112782352, 34.31244599999984, 108.13057264957897, 26.045864999999523],
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
        visibility: 'visible'
      },
      metadata: {},
      maxzoom: 24,
      paint: {
        'fill-outline-color': '#FFFFFF',
        'fill-color': '#826DBA',
        'fill-opacity': 0.9
      },
      id: '四川省市级边界',
      source: 'ms_10451348_1719799738109_6',
      'source-layer': '10451348$geometry',
      type: 'fill',
      minzoom: 0
    }
  ],
  pitch: 0,
  minzoom: 0
});

var mapstudio_multiProjection = JSON.stringify({
  metadata: {
    layerCatalog: [
      {
        visible: true,
        id: 'NewPoint4548',
        title: 'NewPoint4548',
        type: 'basic'
      },
      {
        visible: true,
        id: 'ms-background',
        title: '纯色底图',
        type: 'basic'
      }
    ]
  },
  sources: {
    ms_aggregation_962426788_1724056440862_23: {
      cluster: true,
      clusterType: 'grid',
      clusterMethod: 'avg',
      data: {
        dataId: '962426788',
        type: 'supermap-structured-data'
      },
      type: 'geojson',
      clusterField: 'smpid',
      clusterRadius: 900000
    }
  },
  crs: {
    extent: [345754.3017317925, 2500241.087997996, 3374092.172217019, 5528578.958483222],
    wkt: 'PROJCS["CGCS2000 / 3-degree Gauss-Kruger CM 117E",GEOGCS["China Geodetic Coordinate System 2000",DATUM["China_2000",SPHEROID["CGCS2000",6378137,298.257222101,AUTHORITY["EPSG","1024"]],AUTHORITY["EPSG","1043"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4490"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",117],PARAMETER["scale_factor",1],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],AXIS["Northing", "NORTH"],AXIS["Easting", "EAST"],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AUTHORITY["EPSG","4548"]]',
    name: 'EPSG:4548'
  },
  center: [133.2673120035025, 32.94911515042364],
  zoom: 0.5203223527391135,
  glyphs: {},
  version: '3.2.2',
  rootUrl: 'http://localhost:8190/iportal/',
  maxzoom: 12,
  name: '2343-ms',
  viewExtent: [114.85431014925224, 20.37423487607389, 152.81962894145246, 49.86984527494917],
  layers: [
    {
      paint: {
        'background-color': 'rgba(14,14,14,1)'
      },
      id: 'ms-background',
      type: 'background'
    },
    {
      layout: {
        'heatmap-coverage': 1,
        visibility: 'visible',
        'heatmap-rotate': 0,
        'heatmap-shape': 'square'
      },
      metadata: {
        MapStudio: {
          title: 'NewPoint4548'
        }
      },
      maxzoom: 24,
      paint: {
        'heatmap-color': '#EE4D5A',
        'heatmap-opacity': 0.9
      },
      source: 'ms_aggregation_962426788_1724056440862_23',
      id: 'NewPoint4548',
      type: 'heatmap',
      minzoom: 0
    }
  ],
  pitch: 37.00000000000002,
  minzoom: 0
});

var msProjectINfo_multiProjection = JSON.stringify({
  extent: null,
  controls: null,
  extentString: '',
  description: '',
  verifyReason: null,
  units: null,
  title: '2343-ms',
  resolution: 0,
  checkStatus: 'SUCCESSFUL',
  projectInfo:
    '{"catalogs":[{"visualization":{"renderer":{"coverage":{"type":"simple","value":1},"color":{"type":"simple","value":"#EE4D5A"},"angle":{"type":"simple","value":0},"opacity":{"type":"simple","value":0.9},"type":"heatGrid","styleRenderMode":"antvL7"}},"visible":true,"catalogType":"layer","labelsContent":[],"source":{"option":{"clusterOption":{"aggType":"AVG","aggField":"smpid","groupBy":{"aggCellSize":900000,"aggCellUnit":"PX"}},"cluster":true}},"title":"NewPoint4548","layerSourceType":"Data","zoomRange":[0,24],"layersContent":[],"msDatasetId":"ms_datasetId_1724056435204_20","bounds":[116.80751966064098,24.657602137018205,117.60524238203818,42.48026915788759],"id":"NewPoint4548","popupInfo":{"elements":[{"fieldName":"smpid","type":"FIELD"},{"fieldName":"num","type":"FIELD"},{"fieldName":"SmUserID","type":"FIELD"},{"fieldName":"name","type":"FIELD"},{"fieldName":"geometry","type":"FIELD"}],"title":"NewPoint4548"}}],"datas":[{"sourceType":"STRUCTURE_DATA","datasets":[{"datasetTitle":"NewPoint4548","msDatasetId":"ms_datasetId_1724056435204_20","datasetId":"962426788","geometryField":"geometry"}],"title":"NewPoint4548"}],"baseLayer":{"color":"rgba(14,14,14,1)","projection":"EPSG:4548","type":"BACKGROUND"},"version":"3.0.4"}',
  visitCount: 73,
  centerString: '{"x":133.2673120035025,"y":32.94911515042364}',
  epsgCode: 4548,
  nickname: 'admin_123',
  layers: [],
  id: 473422324,
  thumbnail: 'http://localhost:8190/iportal/resources/thumbnail/map/map473422324.png',
  level: 0,
  center: {
    x: 133.2673120035025,
    y: 32.94911515042364
  }
});

var l7StructureData962426788Items = JSON.stringify({
  timeStamp: '2024-09-24T05:42:46Z',
  features: [
    {
      geometry: {
        coordinates: [507276.4742796922, 4705161.709043069],
        type: 'Point'
      },
      id: '1',
      type: 'Feature',
      properties: {
        smpid: 1,
        num: 1,
        name: 1,
        SmUserID: 0
      }
    },
    {
      geometry: {
        coordinates: [515356.3470900338, 4438766.589724715],
        type: 'Point'
      },
      id: '2',
      type: 'Feature',
      properties: {
        smpid: 2,
        num: 2,
        name: 2,
        SmUserID: 0
      }
    },
    {
      geometry: {
        coordinates: [549766.0475474435, 4032304.717571498],
        type: 'Point'
      },
      id: '3',
      type: 'Feature',
      properties: {
        smpid: 3,
        num: 3,
        name: 3,
        SmUserID: 0
      }
    },
    {
      geometry: {
        coordinates: [497691.9905545708, 3794406.293987407],
        type: 'Point'
      },
      id: '4',
      type: 'Feature',
      properties: {
        smpid: 4,
        num: 4,
        name: 4,
        SmUserID: 0
      }
    },
    {
      geometry: {
        coordinates: [480515.5660373094, 3439828.3757625716],
        type: 'Point'
      },
      id: '5',
      type: 'Feature',
      properties: {
        smpid: 5,
        num: 5,
        name: 5,
        SmUserID: 0
      }
    },
    {
      geometry: {
        coordinates: [504696.1104849293, 2999163.261754166],
        type: 'Point'
      },
      id: '6',
      type: 'Feature',
      properties: {
        smpid: 6,
        num: 6,
        name: 6,
        SmUserID: 0
      }
    },
    {
      geometry: {
        coordinates: [480819.0020892108, 2728140.293486495],
        type: 'Point'
      },
      id: '7',
      type: 'Feature',
      properties: {
        smpid: 7,
        num: 7,
        name: 7,
        SmUserID: 0
      }
    }
  ],
  numberReturned: 7,
  links: [
    {
      rel: 'self',
      href: 'http://172.16.14.44:8190/iportal/web/datas/962426788/structureddata/ogc-features/collections/all/items.json',
      type: 'application/geo+json',
      title: 'this document'
    }
  ],
  numberMatched: 7,
  type: 'FeatureCollection'
});

var l7StructureData962426788 = JSON.stringify({
  extent: {
    top: 4705161.709043069,
    left: 480515.5660373094,
    bottom: 2728140.293486495,
    leftBottom: {
      x: 480515.5660373094,
      y: 2728140.293486495
    },
    right: 549766.0475474435,
    rightTop: {
      x: 549766.0475474435,
      y: 4705161.709043069
    }
  },
  firstRowIsHead: false,
  fileEncoding: null,
  fieldNames: ['smpid', 'num', 'SmUserID', 'name', 'geometry'],
  type: 'json',
  separator: null,
  tableName: 'smp962426788_newpoint4548',
  urn: 'urn:supermapabc:since-1.0:bigdata:_defaulthost:962426788',
  epsgCode: 4548,
  fieldTypes: ['INT', 'LONG', 'LONG', 'LONG', 'POINT'],
  name: 'NewPoint4548',
  tableFieldNames: ['smpid', 'num', 'smuserid', 'name', 'geometry'],
  links: [
    {
      rel: null,
      href: 'http://172.16.14.44:8190/iportal/analytics',
      type: 'ANALYTICS_SERVICE',
      title: null
    }
  ],
  id: '962426788'
});