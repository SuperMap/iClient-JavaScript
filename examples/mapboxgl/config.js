/**
 * MapboxGL 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var identification = {
    name: "MapboxGL"
};

var exampleConfig = {
    "iServer": {
        name: "iServer",
        name_en: "iServer",
        content: {
            "map": {
                name: "地图",
                name_en: "map service",
                content: [{
                    name: "3857底图",
                    name_en: "3857 coordinate system",
                    thumbnail: "mb_TileLayer.png",
                    fileName: "01_tiledMapLayer"
                }, {
                    name: "地图信息",
                    name_en: "map query service",
                    thumbnail: "mb_mapService.png",
                    fileName: "01_mapService"

                }, {
                    name: "距离测量",
                    name_en: "distance measurement service",
                    thumbnail: "mb_measure-distance.png",
                    fileName: "01_measure_distance"
                }, {
                    name: "面积测量",
                    name_en: "area measurement service",
                    thumbnail: "mb_measure-area.png",
                    fileName: "01_measure_area"
                }, {
                    name: "范围查询",
                    name_en: "bounds query",
                    thumbnail: "mb_mapQueryByBounds.png",
                    fileName: "01_mapQueryByBounds"
                }, {
                    name: "距离查询",
                    name_en: "distance query",
                    thumbnail: "mb_mapQueryByDistance.png",
                    fileName: "01_mapQueryByDistance"
                }, {
                    name: "几何查询",
                    name_en: "geometry query",
                    thumbnail: "mb_mapQueryByGeometry.png",
                    fileName: "01_mapQueryByGeometry"
                }, {
                    name: "SQL查询",
                    name_en: "SQL query",
                    thumbnail: "mb_mapQueryBySQL.png",
                    fileName: "01_mapQueryBySQL"
                }]
            },
            "data": {
                name: "数据",
                name_en: "data service",
                content: [{
                    name: "ID查询",
                    name_en: "ID query",
                    thumbnail: "mb_getFeatureByIDs.png",
                    fileName: "02_getFeatureByIDs"
                }, {
                    name: "SQL查询",
                    name_en: "SQL query",
                    thumbnail: "mb_getFeatureBySQL.png",
                    fileName: "02_getFeatureBySQL"
                }, {
                    name: "范围查询",
                    name_en: "bounds query",
                    thumbnail: "mb_getFeatureByBounds.png",
                    fileName: "02_getFeatureByBounds"
                }, {
                    name: "几何查询",
                    name_en: "geometry query",
                    thumbnail: "mb_getFeatureByGeometry.png",
                    fileName: "02_getFeatureByGeometry"
                }, {
                    name: "缓冲区查询",
                    name_en: "buffer query",
                    thumbnail: "mb_getFeatureByBuffer.png",
                    fileName: "02_getFeatureByBuffer"
                }, {
                    name: "栅格查询",
                    name_en: "data gridcell query",
                    thumbnail: "mb_getGridCellInfos.png",
                    fileName: "02_getGridCellInfos"
                }, {
                    name: "字段信息",
                    name_en: "field service",
                    thumbnail: "mb_fieldsService.png",
                    fileName: "02_fieldsService"
                }, {
                    name: "字段查询统计",
                    name_en: "field statistics service",
                    thumbnail: "mb_fieldStatistics.png",
                    fileName: "02_fieldStatistics"
                }, {
                    name: "地物编辑",
                    name_en: "data editing",
                    thumbnail: "mb_editFeatures.png",
                    fileName: "02_editFeatures"
                }]
            },
            "theme": {
                name: "专题图",
                name_en: "server thematic service",
                content: [{
                    name: "点密度专题图",
                    name_en: "dot density",
                    thumbnail: "mb_themeDotDensity.png",
                    fileName: "03_themeDotDensity"
                }, {
                    name: "等级符号专题图",
                    name_en: "graduated symbol",
                    thumbnail: "mb_themeGraduatedSymbol.png",
                    fileName: "03_themeGraduatedSymbol"
                }, {
                    name: "统计专题图",
                    name_en: "statistical chart",
                    thumbnail: "mb_themeGraph.png",
                    fileName: "03_themeGraph"
                }, {
                    name: "矩阵标签专题图",
                    name_en: "label",
                    thumbnail: "mb_themeLabel.png",
                    fileName: "03_themeLabel"
                }, {
                    name: "分段专题图",
                    name_en: "range",
                    thumbnail: "mb_themeRange.png",
                    fileName: "03_themeRange"
                }, {
                    name: "单值专题图",
                    name_en: "unique",
                    thumbnail: "mb_themeUnique.png",
                    fileName: "03_themeUnique"
                }, {
                    name: "栅格分段专题图",
                    name_en: "grid range",
                    thumbnail: "mb_themeGridRange.png",
                    fileName: "03_themeGridRange"
                }, {
                    name: "栅格单值专题图",
                    name_en: "grid unique",
                    thumbnail: "mb_themeGridUnique.png",
                    fileName: "03_themeGridUnique"
                }]
            },
            "spatialAnalyst": {
                name: "空间分析",
                name_en: "spatial analysis service",
                content: [{
                    name: "数据集缓冲区分析",
                    name_en: "buffer",
                    thumbnail: "mb_bufferAnalystService.png",
                    fileName: "04_bufferAnalystService"
                }, {
                    name: "几何对象缓冲区分析",
                    name_en: "buffer-geometry",
                    thumbnail: "mb_bufferAnalystService_geometry.png",
                    fileName: "04_bufferAnalystService_geometry"
                }, {
                    name: "数据集泰森多边形",
                    name_en: "thiessen-dataset",
                    thumbnail: "mb_thiessenAnalystService-datasets.png",
                    fileName: "04_thiessenAnalystService_datasets"
                }, {
                    name: "几何泰森多边形",
                    name_en: "thiessen-geometry",
                    thumbnail: "mb_thiessenAnalystService-geometry.png",
                    fileName: "04_thiessenAnalystService_geometry"
                }, {
                    name: "叠加分析",
                    name_en: "overlay",
                    thumbnail: "mb_overlayAnalystService.png",
                    fileName: "04_overlayAnalystService"
                }, {
                    name: "地形曲率计算",
                    name_en: "terrain curvature calculation",
                    thumbnail: "mb_terrainCurvatureCalculationService.png",
                    fileName: "04_terrainCurvatureCalculationService"
                }, {
                    name: "栅格代数运算",
                    name_en: "math expression",
                    thumbnail: "mb_mathExpressionAnalysisService.png",
                    fileName: "04_mathExpressionAnalysisService"
                }, {
                    name: "点定里程",
                    name_en: "route calculate measure",
                    thumbnail: "mb_routeCalculateMeasureService.png",
                    fileName: "04_routeCalculateMeasureService"
                }, {
                    name: "里程定点",
                    name_en: "route locator - point",
                    thumbnail: "mb_routeLocatorService_point.png",
                    fileName: "04_routeLocatorService_point"
                }, {
                    name: "里程定线",
                    name_en: "route locator - line",
                    thumbnail: "mb_routeLocatorService_line.png",
                    fileName: "04_routeLocatorService_line"
                }, {
                    name: "几何对象批量空间分析",
                    name_en: "batchAnalyst_geometry",
                    thumbnail: "mb_geometryBatchAnalystService.png",
                    fileName: "04_geometryBatchAnalystService"
                }, {
                    name: "几何对象批量叠加分析",
                    name_en: "overlayBatchAnalyst_geometry",
                    thumbnail: "mb_geometryOverlayBatchAnalystService.png",
                    fileName: "04_geometryOverlayBatchAnalystService"
                }]
            },
            "addressMatch": {
                name: "地址匹配",
                name_en: "address matching service",
                content: [{
                    name: "地址匹配",
                    name_en: "address match",
                    thumbnail: "mb_addressService.png",
                    fileName: "addressMatchService"
                }]
            },
            "dataFlow": {
                name: "实时数据",
                name_en: "data flow service",
                content: [{
                    name: "实时数据",
                    name_en: "data flow",
                    thumbnail: "dataflow.gif",
                    fileName: "dataFlowService"
                }]
            },
            "processingService": {
                name: "分布式分析",
                name_en: "distributed analysis services",
                content: [{
                    name: "密度分析",
                    name_en: "density",
                    thumbnail: "mb_kernelDensityJobService.png",
                    fileName: "kernelDensityJobService"
                }, {
                    name: "点聚合分析",
                    name_en: "mesh summary",
                    thumbnail: "mb_SummaryMeshJobService.png",
                    fileName: "SummaryMeshJobService"
                }, {
                    name: "单对象查询分析",
                    name_en: "single object query",
                    thumbnail: "mb_singleObjectQueryJob.png",
                    fileName: "singleObjectQueryJobService"
                }, {
                    name: "叠加分析",
                    name_en: "overlay",
                    thumbnail: "mb_overlayJobService.png",
                    fileName: "overlayGeoJobService"
                }, {
                    name: "缓冲区分析",
                    name_en: "buffer",
                    thumbnail: "mb_buffersAnalystJobService.png",
                    fileName: "buffersAnalystJobService"
                }, {
                    name: "区域汇总分析",
                    name_en: "regional summary",
                    thumbnail: "mb_SummaryRegionJobService.png",
                    fileName: "SummaryRegionJobService"
                }, {
                    name: "矢量裁剪分析",
                    name_en: "vector clip",
                    thumbnail: "mb_vectorClipJob.png",
                    fileName: "vectorClipJobService"
                }, {
                    name: "属性汇总分析",
                    name_en: "summary attributes",
                    thumbnail: "mb_summaryAttributes.png",
                    fileName: "summaryAttributesJobService"
                }, {
                    name: "拓扑检查分析",
                    name_en: "topology validator",
                    thumbnail: "mb_topologyValidatorJobService.png",
                    fileName: "topologyValidatorJobService"
                }]
            }
        }
    },
    "viz": {
        name: "可视化",
        name_en: "visualization",
        content: {
            "heat": {
                name: "热力图",
                name_en: "heat map",
                content: [{
                    name: "随机点 (Classic)",
                    name_en: "random points (Classic)",
                    thumbnail: "mb_heatMapLayer.png",
                    fileName: "heatMapLayer"
                }]
            },
            "VectorTileLayer": {
                name: "矢量瓦片",
                name_en: "vector tile",
                content: [
                    {
                        name: "China",
                        name_en: "China",
                        thumbnail: "mvtVectorTile.png",
                        fileName: "mvtVectorTile"
                    },
                    {
                        name: "北京",
                        name_en: "Beijing",
                        thumbnail: "mvt_Beijing.png",
                        fileName: "mvtVectorTile_Beijing"
                    },
                    {
                        name: "北京-暗夜风格",
                        name_en: "Beijing - dark-blue style",
                        thumbnail: "mvt_Beijing_dark.png",
                        fileName: "mvtVectorTile_Beijing_dark"
                    },
                    {
                        name: "北京-深海风格",
                        name_en: "Beijing - fiord style",
                        thumbnail: "mvt_Beijing_fiordcolor.png",
                        fileName: "mvtVectorTile_Beijing_fiordcolor"
                    },
                    {
                        name: "北京-淡绿风格",
                        name_en: "Beijing - klokantech style",
                        thumbnail: "mvt_Beijing_klokantech.png",
                        fileName: "mvtVectorTile_Beijing_klokantech"
                    },
                    {
                        name: "北京-OSM风格",
                        name_en: "Beijing - OSM style",
                        thumbnail: "mvt_Beijing_osm.png",
                        fileName: "mvtVectorTile_Beijing_OSM"
                    },
                    {
                        name: "北京-淡灰风格",
                        name_en: "Beijing - positron style",
                        thumbnail: "mvt_Beijing_positron.png",
                        fileName: "mvtVectorTile_Beijing_positron"
                    },
                    {
                        name: "风格切换",
                        name_en: "style switch",
                        thumbnail: "mvt_changeStyle.png",
                        fileName: "mvtVectorTile_changeStyle"
                    },
                    {
                        name: "UGCV5(MVT)",
                        name_en: "UGCV5(MVT)",
                        thumbnail: "mvt_UGCV5.png",
                        fileName: "mvtVectorTile_UGCV5"
                    }
                ]
            },
            "ECharts": {
                name: "ECharts",
                name_en: "ECharts",
                content: [
                    {
                        name: "全国空气质量图",
                        name_en: "ECharts",
                        thumbnail: "echarts_effectScatter.png",
                        fileName: "echarts_effectScatter"
                    },
                    {
                        name: "迁徙图",
                        name_en: "Mock migration",
                        thumbnail: "echarts_geoline.gif",
                        fileName: "echarts_geoline"
                    },
                    {
                        name: "热力图",
                        name_en: "heat map",
                        thumbnail: "echarts_heatmap.png",
                        fileName: "echarts_heatmap"
                    },
                    {
                        name: "线路图",
                        name_en: "line",
                        thumbnail: "echarts_linesBus.png",
                        fileName: "echarts_linesBus"
                    },
                    {
                        name: "长春公交路径图",
                        name_en: "Changchun public transport network",
                        thumbnail: "echarts_ChangchunPublicTransportNetwork.gif",
                        fileName: "echarts_ChangchunPublicTransportNetwork"
                    },
                    {
                        name: "折线图",
                        name_en: "line chart",
                        thumbnail: "echarts_lineMarker.png",
                        fileName: "echarts_lineMarker"
                    },
                    {
                        name: "柱状图",
                        name_en: "bar chart",
                        thumbnail: "echarts_bar.png",
                        fileName: "echarts_bar"
                    },
                    {
                        name: "散点图",
                        name_en: "scatter chart",
                        thumbnail: "echarts_scatter.png",
                        fileName: "echarts_scatter"
                    },
                    {
                        name: "饼图",
                        name_en: "pie chart",
                        thumbnail: "echarts_pie.png",
                        fileName: "echarts_pie"
                    },
                    {
                        name: "世界飞机航线图",
                        name_en: "Airplane route map",
                        thumbnail: "echarts_linesAirline.png",
                        fileName: "echarts_linesAirline"
                    },
                    {
                        name: "微博签到图",
                        name_en: "scatter of Weibo user",
                        thumbnail: "echarts_scatterWeibo.png",
                        fileName: "echarts_scatterWeibo"
                    },

                    {
                        name: "格网图",
                        name_en: "cell map",
                        thumbnail: "echarts_cellMap.png",
                        fileName: "echarts_cellMap"
                    }
                ]
            },
            "EChartsGL": {
                name: "EChartsGL",
                name_en: "EChartsGL",
                content: [
                    {
                        name: "上海房价可视化图",
                        name_en: "Shanghai building price",
                        thumbnail: "echartsGL_ShanghaiBuildingPrice.png",
                        fileName: "echartsGL_ShanghaiBuildingPrice"
                    },
                    {
                        name: "飞行路径图",
                        name_en: "flight path",
                        thumbnail: "echartsGL_flightPath.gif",
                        fileName: "echartsGL_flightPath"
                    },
                    {
                        name: "开普敦的士路线图",
                        name_en: "taxi Routes Of CapeTown",
                        thumbnail: "echartsGL_taxiRoutesOfCapeTown.gif",
                        fileName: "echartsGL_taxiRoutesOfCapeTown"
                    },
                    {
                        name: "五彩城市建筑",
                        name_en: "colorful buildings",
                        thumbnail: "echartsGL_colorfulCity.png",
                        fileName: "echartsGL_colorfulCity"
                    },
                    {
                        name: "成都市出租车运行轨迹图",
                        name_en: "taxi trajectory map Of ChengDu",
                        thumbnail: "echartsGL_taxiTrajectoryMap.gif",
                        fileName: "echartsGL_taxiTrajectoryMap"
                    },
                    {
                        name: "全球风能可视化",
                        name_en: "Global wind visualization",
                        thumbnail: "echartsGL_GlobalWind.gif",
                        fileName: "echartsGL_GlobalWind"
                    }
                ]
            },
            "MapV": {
                name: "MapV",
                name_en: "MapV",
                content: [
                    {
                        name: "通勤图",
                        name_en: "OD",
                        thumbnail: "mapvCsvcar.png",
                        fileName: "mapvCsvcar"
                    },
                    {
                        name: "强边界图",
                        name_en: "force edge bundling",
                        thumbnail: "mapvForceEdgeBuilding.gif",
                        fileName: "mapvForceEdgeBuilding"
                    },
                    {
                        name: "强度线",
                        name_en: "line density",
                        thumbnail: "mapvPolylineIntensity.png",
                        fileName: "mapvPolylineIntensity"
                    },
                    {
                        name: "简单线",
                        name_en: "simple line",
                        thumbnail: "mapvPolylineSimple.png",
                        fileName: "mapvPolylineSimple"
                    },
                    {
                        name: "动态轨迹",
                        name_en: "dynamic trajectory",
                        thumbnail: "mapvPolylineTime.gif",
                        fileName: "mapvPolylineTime"
                    },
                    {
                        name: "迁徙时序图",
                        name_en: "Migration timing",
                        thumbnail: "mapvQianxiTime.gif",
                        fileName: "mapvQianxiTime"
                    },
                    {
                        name: "迁徙图",
                        name_en: "migration",
                        thumbnail: "mapvQianxi.gif",
                        fileName: "mapvQianxi"
                    },
                    {
                        name: "北京村庄分布图",
                        name_en: "village of beijing",
                        thumbnail: "mapvBeijingVillage.png",
                        fileName: "mapvBeijingVillage"
                    }
                ]
            },
            "threejs": {
                name: "threejs",
                name_en: "threejs",
                content: [
                    {
                        name: "3D建筑模型",
                        name_en: "3D buildings",
                        thumbnail: "mb_threejs_buildings.png",
                        fileName: "threejsLayer_buildings"
                    }
                ]
            },
            "Theme2D": {
                name: "二维专题图",
                name_en: "2D thematic layer",
                content: [
                    {
                        name: "单值专题图",
                        name_en: "unique",
                        thumbnail: "uniqueThemeLayer.png",
                        fileName: "uniqueThemeLayer"
                    },
                    {
                        name: "分段专题图",
                        name_en: "range",
                        thumbnail: "rangeThemeLayer.png",
                        fileName: "rangeThemeLayer"
                    },
                    {
                        name: "等级符号专题图",
                        name_en: "rank symbol",
                        thumbnail: "rankSymbolThemeLayer.png",
                        fileName: "rankSymbolThemeLayer"
                    },
                    {
                        name: "标签专题图",
                        name_en: "label",
                        thumbnail: "mb_labelThemeLayer.png",
                        fileName: "labelThemeLayer"
                    },
                    {
                        name: "图表专题图",
                        name_en: "statistical chart",
                        thumbnail: "mb_graphThemeLayer.png",
                        fileName: "graphThemeLayer"
                    }
                ]
            },
            "Theme3D": {
                name: "三维专题图",
                name_en: "3D thematic layer",
                content: [
                    {
                        name: "单值专题图",
                        name_en: "unique",
                        thumbnail: "theme_3Dlayer_unique.png",
                        fileName: "uniqueTheme3DLayer"
                    },
                    {
                        name: "分段专题图",
                        name_en: "range",
                        thumbnail: "theme_3Dlayer_range.png",
                        fileName: "rangeTheme3DLayer"
                    }
                ]
            }
        }
    },
    "control": {
        name: "控件",
        name_en: "control",
        content: {
            "BasicControl": {
                name: "基础控件",
                name_en: "Basic Control",
                content: [{
                    name: "导航控件",
                    name_en: "Navigation Control",
                    thumbnail: "control_navigationControl.png",
                    fileName: "control_navigationControl"
                }, {
                    name: "比例尺控件",
                    name_en: "Scale Control",
                    thumbnail: "control_scaleControl.png",
                    fileName: "control_scaleControl"
                }, {
                    name: "全屏控件",
                    name_en: "Fullscreen Control",
                    thumbnail: "control_fullscreenControl.png",
                    fileName: "control_fullscreenControl"
                }, {
                    name: "定位控件",
                    name_en: "Geolocate Control",
                    thumbnail: "control_geolocateControl.png",
                    fileName: "control_geolocateControl"
                }, {
                    name: "版权控件",
                    name_en: "Attribution Control",
                    thumbnail: "control_attributionControl.png",
                    fileName: "control_attributionControl"
                }, {
                    name: "绘图控件",
                    name_en: "Draw Control",
                    thumbnail: "control_drawControl.png",
                    fileName: "control_drawControl"
                }, {
                    name: "卷帘控件",
                    name_en: "Swipe between maps",
                    thumbnail: "control_swipeBetweenMaps.png",
                    fileName: "control_swipeBetweenMaps"
                }]
            }
        }
    },
    "GTC": {
        name: "GTC",
        name_en: "GTC",
        content: {
            "GTC2017": {
                name: "2017",
                name_en: "2017",
                content: [
                    {
                        name: "GTC2017",
                        name_en: "GTC2017",
                        thumbnail: "gtc2017.gif",
                        fileName: "GTC2017"
                    }
                ]
            }
        }
    }
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
    "control": "fa-sliders",
    "GTC": "fa-globe"
};

/**
 *key值：为exampleConfig配置的key值
 *value值：fontawesome字体icon名
 *与sideBarIconConfig的区别：sideBarIconConfig包括侧边栏所有层级目录的图标，exampleIconConfig仅包括一级标题的图标
 */
var exampleIconConfig = {
    "iServer": "fa-server",
    "viz": "fa-map",
    "GTC": "fa-globe"
};