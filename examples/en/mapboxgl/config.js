/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.*/
/**
 * MapboxGL iServer 英文示例配置文件
 */
var identification = {
    name: 'MapboxGL'
};
var exampleConfig = {};
exampleConfig.iServer = {
    name: 'iServer',
    name_en: 'iServer',
    content: {
        "map": {
            name: '地图',
            name_en: 'Map service',
            content: [
                {
                    name: '3857底图',
                    name_en: '3857 coordinate system',
                    thumbnail: 'mb_TileLayer.png',
                    fileName: '01_tiledMapLayer'
                }
            ]
        }
    }
};

window.mapboxglExampleConfig = exampleConfig;
