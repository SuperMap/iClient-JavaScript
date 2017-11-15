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
                content: [{
                    name: "3857底图",
                    thumbnail: "mb_TileLayer.png",
                    fileName: "01_tiledMapLayer"
                }, {
                    name: "地图信息",
                    thumbnail: "mb_mapService.png",
                    fileName: "01_mapService"

                }, {
                    name: "距离测量",
                    thumbnail: "mb_measure-distance.png",
                    fileName: "01_measure_distance"
                }, {
                    name: "面积测量",
                    thumbnail: "mb_measure-area.png",
                    fileName: "01_measure_area"
                }, {
                    name: "范围查询",
                    thumbnail: "mb_mapQueryByBounds.png",
                    fileName: "01_mapQueryByBounds"
                }, {
                    name: "距离查询",
                    thumbnail: "mb_mapQueryByDistance.png",
                    fileName: "01_mapQueryByDistance"
                }, {
                    name: "几何查询",
                    thumbnail: "mb_mapQueryByGeometry.png",
                    fileName: "01_mapQueryByGeometry"
                }, {
                    name: "SQL查询",
                    thumbnail: "mb_mapQueryBySQL.png",
                    fileName: "01_mapQueryBySQL"
                }]
            },
            "data": {
                name: "数据",
                content: [{
                    name: "ID查询",
                    thumbnail: "mb_getFeatureByIDs.png",
                    fileName: "02_getFeatureByIDs"
                }, {
                    name: "SQL查询",
                    thumbnail: "mb_getFeatureBySQL.png",
                    fileName: "02_getFeatureBySQL"
                }, {
                    name: "范围查询",
                    thumbnail: "mb_getFeatureByBounds.png",
                    fileName: "02_getFeatureByBounds"
                }, {
                    name: "几何查询",
                    thumbnail: "mb_getFeatureByGeometry.png",
                    fileName: "02_getFeatureByGeometry"
                }, {
                    name: "缓冲区查询",
                    thumbnail: "mb_getFeatureByBuffer.png",
                    fileName: "02_getFeatureByBuffer"
                }, {
                    name: "栅格查询",
                    thumbnail: "mb_getGridCellInfos.png",
                    fileName: "02_getGridCellInfos"
                }, {
                    name: "字段信息",
                    thumbnail: "mb_fieldsService.png",
                    fileName: "02_fieldsService"
                }, {
                    name: "字段查询统计",
                    thumbnail: "mb_fieldStatistics.png",
                    fileName: "02_fieldStatistics"
                }, {
                    name: "地物编辑",
                    thumbnail: "mb_editFeatures.png",
                    fileName: "02_editFeatures"
                }]
            },
            "theme": {
                name: "专题图",
                content: [{
                    name: "点密度专题图",
                    thumbnail: "mb_themeDotDensity.png",
                    fileName: "03_themeDotDensity"
                }, {
                    name: "等级符号专题图",
                    thumbnail: "mb_themeGraduatedSymbol.png",
                    fileName: "03_themeGraduatedSymbol"
                }, {
                    name: "统计专题图",
                    thumbnail: "mb_themeGraph.png",
                    fileName: "03_themeGraph"
                }, {
                    name: "矩阵标签专题图",
                    thumbnail: "mb_themeLabel.png",
                    fileName: "03_themeLabel"
                }, {
                    name: "分段专题图",
                    thumbnail: "mb_themeRange.png",
                    fileName: "03_themeRange"
                }, {
                    name: "单值专题图",
                    thumbnail: "mb_themeUnique.png",
                    fileName: "03_themeUnique"
                }, {
                    name: "栅格分段专题图",
                    thumbnail: "mb_themeGridRange.png",
                    fileName: "03_themeGridRange"
                }, {
                    name: "栅格单值专题图",
                    thumbnail: "mb_themeGridUnique.png",
                    fileName: "03_themeGridUnique"
                }]
            },
            "spatialAnalyst": {
                name: "空间分析",
                content: [{
                    name: "数据集缓冲区分析",
                    thumbnail: "mb_bufferAnalystService.png",
                    fileName: "04_bufferAnalystService"
                }, {
                    name: "几何对象缓冲区分析",
                    thumbnail: "mb_bufferAnalystService_geometry.png",
                    fileName: "04_bufferAnalystService_geometry"
                }, {
                    name: "数据集泰森多边形",
                    thumbnail: "mb_thiessenAnalystService-datasets.png",
                    fileName: "04_thiessenAnalystService_datasets"
                }, {
                    name: "几何泰森多边形",
                    thumbnail: "mb_thiessenAnalystService-geometry.png",
                    fileName: "04_thiessenAnalystService_geometry"
                }, {
                    name: "叠加分析",
                    thumbnail: "mb_overlayAnalystService.png",
                    fileName: "04_overlayAnalystService"
                }, {
                    name: "点定里程",
                    thumbnail: "mb_routeCalculateMeasureService.png",
                    fileName: "04_routeCalculateMeasureService"
                }, {
                    name: "里程定点",
                    thumbnail: "mb_routeLocatorService_point.png",
                    fileName: "04_routeLocatorService_point"
                }, {
                    name: "里程定线",
                    thumbnail: "mb_routeLocatorService_line.png",
                    fileName: "04_routeLocatorService_line"
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
            "dataFlow": {
                name: "实时数据",
                content: [{
                    name: "实时数据",
                    thumbnail: "dataflow.gif",
                    fileName: "dataFlowService"
                }]
            },
            "processingService": {
                name: "分布式分析",
                content: [{
                    name: "密度分析",
                    thumbnail: "mb_kernelDensityJobService.png",
                    fileName: "kernelDensityJobService"
                }, {
                    name: "点聚合分析",
                    thumbnail: "mb_SummaryMeshJobService.png",
                    fileName: "SummaryMeshJobService"
                }, {
                    name: "单对象查询分析",
                    thumbnail: "mb_singleObjectQueryJob.png",
                    fileName: "singleObjectQueryJobService"
                }, {
                    name: "叠加分析",
                    thumbnail: "mb_overlayJobService.png",
                    fileName: "overlayGeoJobService"
                }, {
                    name: "缓冲区分析",
                    thumbnail: "mb_buffersAnalystJobService.png",
                    fileName: "buffersAnalystJobService"
                }, {
                    name: "区域汇总分析",
                    thumbnail: "mb_SummaryRegionJobService.png",
                    fileName: "SummaryRegionJobService"
                }, {
                    name: "矢量裁剪分析",
                    thumbnail: "mb_vectorClipJob.png",
                    fileName: "vectorClipJobService"
                }, {
                    name: "拓扑检查分析",
                    thumbnail: "mb_topologyValidatorJobService.png",
                    fileName: "topologyValidatorJobService"
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
                        thumbnail: "echarts_geoline.gif",
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
                        thumbnail: "mapvForceEdgeBuilding.gif",
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
                        thumbnail: "mapvPolylineTime.gif",
                        fileName: "mapvPolylineTime"
                    },
                    {
                        name: "迁徙时序图",
                        thumbnail: "mapvQianxiTime.gif",
                        fileName: "mapvQianxiTime"
                    },
                    {
                        name: "迁徙图",
                        thumbnail: "mapvQianxi.gif",
                        fileName: "mapvQianxi"
                    },
                    {
                        name: "北京村庄分布图",
                        thumbnail: "mapvBeijingVillage.png",
                        fileName: "mapvBeijingVillage"
                    }
                ]
            },
            "Theme2D": {
                name: "二维专题图",
                content: [
                    {
                        name: "单值专题图",
                        thumbnail: "uniqueThemeLayer.png",
                        fileName: "uniqueThemeLayer"
                    },
                    {
                        name: "分段专题图",
                        thumbnail: "rangeThemeLayer.png",
                        fileName: "rangeThemeLayer"
                    },
                    {
                        name: "等级符号专题图",
                        thumbnail: "rankSymbolThemeLayer.png",
                        fileName: "rankSymbolThemeLayer"
                    },
                    {
                        name: "标签专题图",
                        thumbnail: "mb_labelThemeLayer.png",
                        fileName: "labelThemeLayer"
                    },
                    {
                        name: "图表专题图",
                        thumbnail: "mb_graphThemeLayer.png",
                        fileName: "graphThemeLayer"
                    }
                ]
            },
            "Theme3D": {
                name: "三维专题图",
                content: [
                    {
                        name: "单值专题图",
                        thumbnail: "theme_3Dlayer_unique.png",
                        fileName: "uniqueTheme3DLayer"
                    },
                    {
                        name: "分段专题图",
                        thumbnail: "theme_3Dlayer_range.png",
                        fileName: "rangeTheme3DLayer"
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
                        thumbnail: "gtc2017.gif",
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