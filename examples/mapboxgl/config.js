/**
 * MapboxGL 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var identification = {
    name: "MapboxGL"
};

var exampleConfig = {
    "iServer": {
        name: "iServer",
        content: {
            "map": {
                name: "地图",
                content: [
                    {
                        name: "3857底图",
                        thumbnail: "mb_TileLayer.png",
                        fileName: "01_tiledMapLayer"
                    },
                    {
                        name: "地图信息",
                        thumbnail: "mb_mapService.png",
                        fileName: "01_mapService"

                    }
                ]
            },
            "data": {
                name: "数据",
                content: [{
                    name: "ID查询",
                    thumbnail: "mb_getFeatureByIDs.png",
                    fileName: "02_getFeatureByIDs"
                }
                ]},
            "theme": {
                name: "专题图",
                content: [{
                    name: "点密度专题图",
                    thumbnail: "mb_themeDotDensity.png",
                    fileName: "03_themeDotDensity"
                }]
            },
            "spatialAnalyst": {
                name: "空间分析",
                content: [{
                    name: "缓冲区分析",
                    thumbnail: "mb_bufferAnalystService.png",
                    fileName: "04_bufferAnalystService"
                }]
            },
            "addressMatch": {
                name: "地址匹配",
                content: [{
                    name: "地址匹配",
                    thumbnail: "mb_addressService.png",
                    fileName: "addressMatchService"
                }]
            },
            "processingService": {
                name: "分布式分析",
                content: [{
                    name: "密度分析",
                    thumbnail: "kernelDensityJobService.png",
                    fileName: "kernelDensityJobService"
                }]
            }
        }
    },
    "viz": {
        name: "可视化",
        content: {

            "VectorTileLayer": {
                name: "矢量瓦片",
                content: [
                    {
                        name: "China-矢量瓦片",
                        thumbnail: "mvtVectorTile.png",
                        fileName: "mvtVectorTile"
                    },
                    {
                        name: "北京",
                        thumbnail: "mvt_Beijing.png",
                        fileName: "mvtVectorTile_Beijing"
                    },
                    {
                        name: "北京-暗夜风格",
                        thumbnail: "mvt_Beijing_dark.png",
                        fileName: "mvtVectorTile_Beijing_dark"
                    },
                    {
                        name: "北京-深海风格",
                        thumbnail: "mvt_Beijing_fiordcolor.png",
                        fileName: "mvtVectorTile_Beijing_fiordcolor"
                    },
                    {
                        name: "北京-淡绿风格",
                        thumbnail: "mvt_Beijing_klokantech.png",
                        fileName: "mvtVectorTile_Beijing_klokantech"
                    },
                    {
                        name: "北京-OSM风格",
                        thumbnail: "mvt_Beijing_osm.png",
                        fileName: "mvtVectorTile_Beijing_OSM"
                    },
                    {
                        name: "北京-淡灰风格",
                        thumbnail: "mvt_Beijing_positron.png",
                        fileName: "mvtVectorTile_Beijing_positron"
                    },
                    {
                        name: "风格切换",
                        thumbnail: "mvt_changeStyle.png",
                        fileName: "mvtVectorTile_changeStyle"
                    }
                ]
            },
            "Echarts": {
                name: "Echarts",
                content: [
                    {
                        name: "全国主要城市空气质量图",
                        thumbnail: "echarts_effectScatter.png",
                        fileName: "echarts_effectScatter"
                    },
                    {
                        name: "模拟迁徙图",
                        thumbnail: "echarts_geoline.png",
                        fileName: "echarts_geoline"
                    },
                    {
                        name: "世界飞机航线图",
                        thumbnail: "echarts_linesAirline.png",
                        fileName: "echarts_linesAirline"
                    },
                    {
                        name: "微博签到图",
                        thumbnail: "echarts_scatterWeibo.png",
                        fileName: "echarts_scatterWeibo"
                    }
                ]
            },
            "MapV": {
                name: "MapV",
                content: [
                    {
                        name: "通勤图",
                        thumbnail: "mapvCsvcar.png",
                        fileName: "mapvCsvcar"
                    },
                    {
                        name: "强边界图",
                        thumbnail: "mapvForceEdgeBuilding.png",
                        fileName: "mapvForceEdgeBuilding"
                    },
                    {
                        name: "强度线",
                        thumbnail: "mapvPolylineIntensity.png",
                        fileName: "mapvPolylineIntensity"
                    },
                    {
                        name: "简单线",
                        thumbnail: "mapvPolylineSimple.png",
                        fileName: "mapvPolylineSimple"
                    },
                    {
                        name: "动态轨迹",
                        thumbnail: "mapvPolylineTime.png",
                        fileName: "mapvPolylineTime"
                    },
                    {
                        name: "迁徙时序图",
                        thumbnail: "mapvQianxiTime.png",
                        fileName: "mapvQianxiTime"
                    },
                    {
                        name: "迁徙图",
                        thumbnail: "mapvQianxi.png",
                        fileName: "mapvQianxi"
                    },
                    {
                        name: "北京村庄分布图",
                        thumbnail: "mapvBeijingVillage.png",
                        fileName: "mapvBeijingVillage"
                    }
                ]
            }
        }
    },
    "GTC": {
        name: "GTC",
        content: {
            "GTC2017": {
                name: "2017",
                content: [
                    {
                        name: "GTC2017",
                        thumbnail: "gtc2017.png",
                        fileName: "GTC2017"
                    }
                ]
            }
        }
    },
};
/**
 *key值：为exampleConfig配置的key值或者fileName值
 *      （为中间节点时是key值，叶结点是fileName值）
 *value值：fontawesome字体icon名
 *不分层
 */
var sideBarIconConfig = {
    "iServer": "fa-server",
    "viz": "fa-map",
    "GTC": "fa-globe",
};

/**
 *key值：为exampleConfig配置的key值
 *value值：fontawesome字体icon名
 *与sideBarIconConfig的区别：sideBarIconConfig包括侧边栏所有层级目录的图标，exampleIconConfig仅包括一级标题的图标
 */
var exampleIconConfig = {
    "iServer": "fa-server",
    "viz": "fa-map",
    "GTC": "fa-globe",
};