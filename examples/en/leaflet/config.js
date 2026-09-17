/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.*/
/**
 * Leaflet iServer 英文示例配置文件
 */
var identification = {
  name: 'Leaflet'
};
var exampleConfig = {};
exampleConfig.iServer = {
  name: 'iServer',
  name_en: 'iServer',
  content: {
    map: {
      name: '地图',
      name_en: 'Map service',
      content: [
        {
          name: '3857底图',
          name_en: '3857 coordinate system',
          thumbnail: 'l_tiledMapLayer3857.png',
          fileName: '01_tiledMapLayer3857'
        }
      ]
    }
  }
};

window.leafletExampleConfig = exampleConfig;
