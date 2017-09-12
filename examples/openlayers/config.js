/**
 * OpenLayers 示例配置文件：包括示例的分类、名称、缩略图、文件路径
 */
var identification = {
    name: "OpenLayers"
};

var exampleConfig = {
    "iServer": {
        name: "iServer",
        content: {
            "map": {
                name: "地图",
                content: [{
                    name: "4326底图",
                    thumbnail: "ol_tiledMapLayer4326.png",
                    fileName: "01_tiledMapLayer4326"
                }, {
                    name: "3857底图",
                    thumbnail: "ol_tiledMapLayer3857.png",
                    fileName: "01_tiledMapLayer3857"
                }, {
                    name: "地图叠加",
                    thumbnail: "ol_tiledMapLayerOverlapped.png",
                    fileName: "01_tiledMapLayerOverlapped"

                }, {
                    name: "平面坐标系底图",
                    thumbnail: "ol_tiledMapLayerNoProj.png",
                    fileName: "01_tiledMapLayerNoProj"
                }, {
                    name: "地图信息",
                    thumbnail: "ol_mapService.png",
                    fileName: "01_mapService"

                }, {
                    name: "距离测量",
                    thumbnail: "ol_measure-distance.png",
                    fileName: "01_measure_distance"
                }, {
                    name: "面积测量",
                    thumbnail: "ol_measure-area.png",
                    fileName: "01_measure_area"
                }, {
                    name: "图层信息",
                    thumbnail: "ol_layerService.png",
                    fileName: "01_layerService"
                }, {
                    name: "范围查询",
                    thumbnail: "ol_mapQueryByBounds.png",
                    fileName: "01_mapQueryByBounds"
                }, {
                    name: "距离查询",
                    thumbnail: "ol_mapQueryByDistance.png",
                    fileName: "01_mapQueryByDistance"
                }, {
                    name: "几何查询",
                    thumbnail: "ol_mapQueryByGeometry.png",
                    fileName: "01_mapQueryByGeometry"
                }, {
                    name: "SQL查询",
                    thumbnail: "ol_mapQueryBySQL.png",
                    fileName: "01_mapQueryBySQL"
                }]
            },
            "data": {
                name: "数据",
                content: [{
                    name: "ID查询",
                    thumbnail: "ol_getFeatureByIDs.png",
                    fileName: "02_getFeatureByIDs"
                }, {
                    name: "SQL查询",
                    thumbnail: "ol_getFeatureBySQL.png",
                    fileName: "02_getFeatureBySQL"
                }, {
                    name: "范围查询",
                    thumbnail: "ol_getFeatureByBounds.png",
                    fileName: "02_getFeatureByBounds"
                }, {
                    name: "几何查询",
                    thumbnail: "ol_getFeatureByGeometry.png",
                    fileName: "02_getFeatureByGeometry"
                }, {
                    name: "缓冲区查询",
                    thumbnail: "ol_getFeatureByBuffer.png",
                    fileName: "02_getFeatureByBuffer"
                }, {
                    name: "栅格查询",
                    thumbnail: "ol_getGridCellInfos.png",
                    fileName: "02_getGridCellInfos"
                }, {
                    name: "字段信息",
                    thumbnail: "ol_fieldsService.png",
                    fileName: "02_fieldsService"
                }, {
                    name: "字段查询统计",
                    thumbnail: "ol_fieldStatistics.png",
                    fileName: "02_fieldStatistics"
                }, {
                    name: "地物编辑",
                    thumbnail: "ol_editFeatures.png",
                    fileName: "02_editFeatures"
                }]
            },
            "theme": {
                name: "专题图",
                content: [{
                    name: "点密度专题图",
                    thumbnail: "ol_themeDotDensity.png",
                    fileName: "03_themeDotDensity"
                }, {
                    name: "等级符号专题图",
                    thumbnail: "ol_themeGraduatedSymbol.png",
                    fileName: "03_themeGraduatedSymbol"
                }, {
                    name: "统计专题图",
                    thumbnail: "ol_themeGraph.png",
                    fileName: "03_themeGraph"
                }, {
                    name: "矩阵标签专题图",
                    thumbnail: "ol_themeLabel.png",
                    fileName: "03_themeLabel"
                }, {
                    name: "分段专题图",
                    thumbnail: "ol_themeRange.png",
                    fileName: "03_themeRange"
                }, {
                    name: "单值专题图",
                    thumbnail: "ol_themeUnique.png",
                    fileName: "03_themeUnique"
                }, {
                    name: "栅格分段专题图",
                    thumbnail: "ol_themeGridRange.png",
                    fileName: "03_themeGridRange"
                }, {
                    name: "栅格单值专题图",
                    thumbnail: "ol_themeGridUnique.png",
                    fileName: "03_themeGridUnique"
                }]
            },
            "spatialAnalyst": {
                name: "空间分析",
                content: [{
                    name: "缓冲区分析",
                    thumbnail: "ol_bufferAnalystService.png",
                    fileName: "04_bufferAnalystService"
                }, {
                    name: "缓冲区分析二",
                    thumbnail: "ol_bufferAnalystService_geometry.png",
                    fileName: "04_bufferAnalystService_geometry"
                }, {
                    name: "数据集泰森多边形",
                    thumbnail: "ol_thiessenAnalystService-datasets.png",
                    fileName: "04_thiessenAnalystService_datasets"
                }, {
                    name: "几何泰森多边形",
                    thumbnail: "ol_thiessenAnalystService-geometry.png",
                    fileName: "04_thiessenAnalystService_geometry"
                }, {
                    name: "叠加分析",
                    thumbnail: "ol_overlayAnalystService.png",
                    fileName: "04_overlayAnalystService"
                }, {
                    name: "表面分析",
                    thumbnail: "ol_surfaceAnalystService.png",
                    fileName: "04_surfaceAnalystService"
                }, {
                    name: "动态分析",
                    thumbnail: "ol_generateSpatialDataService.png",
                    fileName: "04_generateSpatialDataService"
                }, {
                    name: "点定里程",
                    thumbnail: "ol_routeCalculateMeasureService.png",
                    fileName: "04_routeCalculateMeasureService"
                }, {
                    name: "里程定点",
                    thumbnail: "ol_routeLocatorService_point.png",
                    fileName: "04_routeLocatorService_point"
                }, {
                    name: "里程定线",
                    thumbnail: "ol_routeLocatorService_line.png",
                    fileName: "04_routeLocatorService_line"
                }, {
                    name: "点密度插值分析",
                    thumbnail: "ol_interpolationAnalystService-Density.png",
                    fileName: "04_interpolationAnalystService_Density"
                }, {
                    name: "反距离加权插值分析",
                    thumbnail: "ol_interpolationAnalystService-IDW-dataset.png",
                    fileName: "04_interpolationAnalystService_IDW_dataset"
                }, {
                    name: "普通克吕金插值分析",
                    thumbnail: "ol_interpolationAnalystService-Kriging.png",
                    fileName: "04_interpolationAnalystService_Kriging"
                }, {
                    name: "泛克吕金插值分析",
                    thumbnail: "ol_interpolationAnalystService_KrigingUniversal.png",
                    fileName: "04_interpolationAnalystService_KrigingUniversal"
                }, {
                    name: "径向基函数插值分析",
                    thumbnail: "ol_interpolationAnalystService_RBF.png",
                    fileName: "04_interpolationAnalystService_RBF"
                }, {
                    name: "地形曲率计算",
                    thumbnail: "ol_terrainCurvatureCalculationService.png",
                    fileName: "04_terrainCurvatureCalculationService"
                }, {
                    name: "离散点插值分析",
                    thumbnail: "ol_interpolationAnalystService_IDW_geometry.png",
                    fileName: "04_interpolationAnalystService_IDW_geometry"
                }, {
                    name: "栅格代数运算",
                    thumbnail: "ol_mathExpressionAnalysisService.png",
                    fileName: "04_mathExpressionAnalysisService"
                }, {
                    name: "核密度分析",
                    thumbnail: "ol_densityAnalystService.png",
                    fileName: "04_densityKernelAnalystService"
                }]
            },
            "networkAnalyst": {
                name: "网络分析",
                content: [{
                    name: "服务区分析",
                    thumbnail: "ol_findServiceAreas.png",
                    fileName: "05_findServiceAreas"
                }, {
                    name: "最佳路径分析",
                    thumbnail: "ol_findPathService.png",
                    fileName: "05_findPathService"
                }, {
                    name: "最近设施分析",
                    thumbnail: "ol_findClosetFacilitiesService.png",
                    fileName: "05_findClosestFacilitiesService"
                }, {
                    name: "选址分区分析",
                    thumbnail: "ol_findLocationService.png",
                    fileName: "05_findLocationService"
                }, {
                    name: "多旅行商分析-物流配送",
                    thumbnail: "ol_findMTSPPathsService.png",
                    fileName: "05_findMTSPPathsService"
                }, {
                    name: "旅行商分析-质检巡查",
                    thumbnail: "ol_findTSPPathsService.png",
                    fileName: "05_findTSPPathsService"
                }]
            },
            "trafficTransferAnalyst": {
                name: "交通换乘",
                content: [{
                    name: "交通换乘",
                    thumbnail: "ol_trafficTransferAnalystService.png",
                    fileName: "06_trafficTransferAnalystService"
                }]
            },
            "processingService": {
                name: "分布式分析",
                content: [{
                    name: "密度分析",
                    thumbnail: "kernelDensityJobService.png",
                    fileName: "kernelDensityJobService"
                }, {
                    name: "点聚合分析",
                    thumbnail: "SummaryMeshJobService.png",
                    fileName: "SummaryMeshJobService"
                }, {
                    name: "单对象查询分析",
                    thumbnail: "ol_singleObjectQueryJob.png",
                    fileName: "singleObjectQueryJobService"
                }, {
                    name: "区域汇总分析",
                    thumbnail: "SummaryRegionJobService.png",
                    fileName: "SummaryRegionJobService"
                }, {
                    name: "矢量裁剪分析",
                    thumbnail: "ol_vectorClipJob.png",
                    fileName: "vectorClipJobService"
                }]
            },
            "addressMatch": {
                name: "地址匹配",
                content: [{
                    name: "地址匹配",
                    thumbnail: "addressService.png",
                    fileName: "addressMatchService"
                }]
            },
            "dataFlow": {
                name: "实时数据",
                content: [{
                    name: "实时数据",
                    thumbnail: "dataflow.png",
                    fileName: "dataFlowService"
                }]
            }
        }
    },
    "iPortal": {
        name: "iPortal",
        content: {
            "ip_map": {
                name: "地图",
                content: [{
                    name: "举办过奥运会的城市",
                    thumbnail: "ol_iPortalWebMap.png",
                    fileName: "iportalWebMap"
                }]
            },
            "ip_querymaps": {
                name: "地图列表",
                content: [{
                    name: "地图列表",
                    thumbnail: "ol_iPortalQueryMaps.png",
                    fileName: "iPortalQueryMaps"
                }]
            }
        }
    },
    "Online": {
        name: "Online",
        content: {
            "ol_map": {
                name: "地图",
                content: [{
                    name: "2014当了一回背包客",
                    thumbnail: "ol_onlineWebMap.png",
                    fileName: "onlineWebMap"
                }]
            }
        }
    },
    "iManager": {
        name: "iManager",
        content: null
    },
    "clientSpatialAnalyst": {
        name: "客户端分析",
        content: {
            "Turf": {
                name: "Turf",
                content: [{
                    name: "空间分析",
                    thumbnail: "turf_transformation.png",
                    fileName: "turf_transformation"
                }]
            }
        }
    },
    "viz": {
        name: "可视化",
        content: {
            "heat": {
                name: "热力图",
                content: [{
                    name: "随机点",
                    thumbnail: "ol_heatmap.png",
                    fileName: "07_HeatMap"
                }]
            },
            "cluster": {
                name: "聚点图",
                content: [{
                    name: "点聚合",
                    thumbnail: "ol_cluster.png",
                    fileName: "07_Cluster"
                }]
            },
            "animationFeature": {
                name: "动画要素图",
                content: [{
                    name: "动画点",
                    thumbnail: "ol_animationFeature.png",
                    fileName: "07_AnimationFeature"
                }]
            },
            "graphiclayer": {
                name: "高效率点图层",
                content: [{
                    name: "canvas渲染",
                    thumbnail: "graphiclayer_canvas.png",
                    fileName: "07_graphiclayer_canvas"
                }, {
                    name: "webgl渲染",
                    thumbnail: "graphiclayer_webgl.png",
                    fileName: "07_graphiclayer_webgl"
                }
                ]
            },
            "ECharts": {
                name: "ECharts",
                content: [
                    {
                        name: "折线图",
                        thumbnail: "ol_echartsLineMarker.png",
                        fileName: "echartsLineMarker"
                    },
                    {
                        name: "柱状图",
                        thumbnail: "ol_echartsBar.png",
                        fileName: "echartsBar"
                    },
                    {
                        name: "散点图",
                        thumbnail: "ol_echartsScatter.png",
                        fileName: "echartsScatter"
                    },
                    {
                        name: "饼图",
                        thumbnail: "ol_echartsPie.png",
                        fileName: "echartsPie"
                    }
                ]
            },
            "MapV": {
                name: "Mapv",
                content: [{
                    name: "蜂巢图",
                    thumbnail: "mapvHoneycomb.png",
                    fileName: "mapvHoneycomb"
                }, {
                    name: "纽约出租车上车点",
                    thumbnail: "mapNycTaxi.png",
                    fileName: "mapvNycTaxi"
                }, {
                    name: "强边界图",
                    thumbnail: "mapvForceEdgeBuilding.png",
                    fileName: "mapvForceEdgeBuilding"
                }, {
                    name: "迁徙图",
                    thumbnail: "mapvQianxiTime.png",
                    fileName: "mapvQianxiTime"
                }, {
                    name: "动态轨迹",
                    thumbnail: "mapvPolylineTime.png",
                    fileName: "mapvPolylineTime"
                }, {
                    name: "强度线",
                    thumbnail: "mapvPolylineIntensity.png",
                    fileName: "mapvPolylineIntensity"
                }, {
                    name: "通勤图",
                    thumbnail: "mapvCsvcar.png",
                    fileName: "mapvCsvcar"
                }, {
                    name: "北京村庄分布图",
                    thumbnail: "mapvBeijingVillage.png",
                    fileName: "mapvBeijingVillage"
                }, {
                    name: "简单线",
                    thumbnail: "mapvPolylineSimple.png",
                    fileName: "mapvPolylineSimple"
                }
                ]
            },
            "extrusion": {
                name: "OSMBuildings",
                content: [{
                    name: "建筑立体效果",
                    thumbnail: "ol_osmbuildings.png",
                    fileName: "osmbuildings"
                }]
            },
            "vectorTileLayer": {
                name: "矢量瓦片",
                content: [
                    {
                        name: "默认风格",
                        thumbnail: "tiledVectorLayer.png",
                        fileName: "tiledVectorLayer"
                    },
                    {
                        name: "月夜风格",
                        thumbnail: "cartoCSS_nightStyle.png",
                        fileName: "cartoCSS_nightStyle"
                    },
                    {
                        name: "强边界风格",
                        thumbnail: "cartoCSS_boundryStyle.png",
                        fileName: "cartoCSS_boundryStyle"
                    },
                    {
                        name: "深夜蓝黑风格",
                        thumbnail: "cartoCSS_darkBlue.png",
                        fileName: "cartoCSS_darkBlue"
                    },
                    {
                        name: "HelloKitty风格",
                        thumbnail: "cartoCSS_helloKitty.png",
                        fileName: "cartoCSS_helloKitty"
                    },
                    {
                        name: "淡雅绿风格",
                        thumbnail: "cartoCSS_naturalStyle.png",
                        fileName: "cartoCSS_naturalStyle"
                    },
                    {
                        name: "默认风格(MVT)",
                        thumbnail: "mvtVectorLayer.png",
                        fileName: "mvtVectorLayer"
                    },
                    {
                        name: "默认风格(MVT 4326)",
                        thumbnail: "mvtVectorLayer4326.png",
                        fileName: "mvtVectorLayer4326"
                    }
                ]
            },
            "themeLayer": {
                name: "客户端专题图",
                content: [{
                    name: "单值专题图",
                    thumbnail: "uniqueThemeLayer.png",
                    fileName: "uniqueThemeLayer"
                }, {
                    name: "分段专题图",
                    thumbnail: "rangeThemeLayer.png",
                    fileName: "rangeThemeLayer"
                }, {
                    name: "符号等级专题图",
                    thumbnail: "rankSymbolThemeLayer.png",
                    fileName: "rankSymbolThemeLayer"
                }]
            }
        }
    },
    "plot": {
        name: "标绘",
        content: {
            "draw": {
                name: "点线面绘制",
                content: [{
                    name: "绘制",
                    thumbnail: "drawFeatures.png",
                    fileName: "drawFeatures"
                }, {
                    name: "手写",
                    thumbnail: "freehandDrawFeatures.png",
                    fileName: "freehandDrawFeatures"
                }, {
                    name: "捕捉",
                    thumbnail: "snapDrawFeatures.png",
                    fileName: "snapDrawFeatures"
                }, {
                    name: "修改",
                    thumbnail: "modifyFeatures.png",
                    fileName: "modifyFeatures"
                }, {
                    name: "拖拽",
                    thumbnail: "dragFeatures.png",
                    fileName: "dragFeatures"
                }]
            }
        }
    },
    "control": {
        name: "控件",
        content: {
            "changeTileVersion": {
                name: "缓存切换",
                content: [{
                    name: "多版本缓存切换控件",
                    thumbnail: "ol_changeTileVersion.png",
                    fileName: "changeTileVersion"
                }]
            }
        }
    },
    "OGC": {
        name: "OGC",
        content: {
            "WMTS": {
                name: "WMTS",
                content: [{
                    name: "WMTS图层",
                    thumbnail: "ol_WMTSLayer.png",
                    fileName: "WMTSLayer"
                }]
            },
            "WMS": {
                name: "WMS",
                content: [{
                    name: "WMS图层",
                    thumbnail: "ol_WMSLayer.png",
                    fileName: "WMSLayer"
                }]
            }
        }
    },
    "mapping": {
        name: "互联网地图",
        content: {
            "Baidu": {
                name: "百度地图",
                content: [{
                    name: "百度地图",
                    thumbnail: "ol_baiduLayer.png",
                    fileName: "baiduLayer"
                }]
            },
            "Tianditu": {
                name: "天地图",
                content: [{
                    name: "天地图-经纬度",
                    thumbnail: "ol_tianditu_ll.png",
                    fileName: "tiandituLayer_ll"
                }, {
                    name: "天地图-墨卡托",
                    thumbnail: "ol_tianditu_mercator.png",
                    fileName: "tiandituLayer_mecartor"
                }]
            },
            "SuperMapCloud": {
                name: "超图云",
                content: [{
                    name: "超图云地图",
                    thumbnail: "ol_cloud.png",
                    fileName: "superMapCloudLayer"
                }]
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
    "iPortal": "fa-desktop",
    "Online": "fa-cloud",
    "iManager": "fa-group",
    "plot": "fa-edit",
    "control": "fa-sliders",
    "clientSpatialAnalyst": "fa-object-group",
    "viz": "fa-map",
    "OGC": "fa-globe",
    "mapping": "fa-send"
};

/**
 *key值：为exampleConfig配置的key值
 *value值：fontawesome字体icon名
 *与sideBarIconConfig的区别：sideBarIconConfig包括侧边栏所有层级目录的图标，exampleIconConfig仅包括一级标题的图标
 */
var exampleIconConfig = {
    "iServer": "fa-server",
    "iPortal": "fa-desktop",
    "Online": "fa-cloud",
    "iManager": "fa-group",
    "plot": "fa-edit",
    "control": "fa-sliders",
    "clientSpatialAnalyst": "fa-object-group",
    "viz": "fa-map",
    "OGC": "fa-globe",
    "mapping": "fa-send"
};