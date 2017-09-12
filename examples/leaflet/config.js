/**
 * Leaflet 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var identification = {
    name: "Leaflet"
};

var exampleConfig = {
    "iServer": {
        name: "iServer",
        content: {
            "map": {
                name: "地图",
                content: [{
                    name: "4326底图",
                    thumbnail: "l_tiledMapLayer4326.png",
                    fileName: "01_tiledMapLayer4326"
                }, {
                    name: "3857底图",
                    thumbnail: "l_tiledMapLayer3857.png",
                    fileName: "01_tiledMapLayer3857"
                }, {
                    name: "地图叠加",
                    thumbnail: "l_overlayTiledMapLayer.png",
                    fileName: "01_overlayTiledMapLayer"

                }, {
                    name: "平面坐标系底图",
                    thumbnail: "l_tiledMapLayerNonEarth.png",
                    fileName: "01_tiledMapLayerNonEarth"
                }, {
                    name: "自定义比例尺",
                    thumbnail: "l_tiledMapLayerProj4.png",
                    fileName: "01_tiledMapLayerProj4"
                }, {
                    name: "地图信息",
                    thumbnail: "l_mapService.png",
                    fileName: "01_mapService"

                }, {
                    name: "距离测量",
                    thumbnail: "l_measure-distance.png",
                    fileName: "01_measure_distance"
                }, {
                    name: "面积测量",
                    thumbnail: "l_measure-area.png",
                    fileName: "01_measure_area"
                }, {
                    name: "图层信息",
                    thumbnail: "l_layerService.png",
                    fileName: "01_layerService"
                }, {
                    name: "范围查询",
                    thumbnail: "l_mapQueryByBounds.png",
                    fileName: "01_mapQueryByBounds"
                }, {
                    name: "距离查询",
                    thumbnail: "l_mapQueryByDistance.png",
                    fileName: "01_mapQueryByDistance"
                }, {
                    name: "几何查询",
                    thumbnail: "l_mapQueryByGeometry.png",
                    fileName: "01_mapQueryByGeometry"
                }, {
                    name: "SQL查询",
                    thumbnail: "l_mapQueryBySQL.png",
                    fileName: "01_mapQueryBySQL"
                }]
            },
            "data": {
                name: "数据",
                content: [{
                    name: "ID查询",
                    thumbnail: "l_getFeatureByIDs.png",
                    fileName: "02_getFeatureByIDs"
                }, {
                    name: "SQL查询",
                    thumbnail: "l_getFeatureBySQL.png",
                    fileName: "02_getFeatureBySQL"
                }, {
                    name: "范围查询",
                    thumbnail: "l_getFeatureByBounds.png",
                    fileName: "02_getFeatureByBounds"
                }, {
                    name: "几何查询",
                    thumbnail: "l_getFeatureByGeometry.png",
                    fileName: "02_getFeatureByGeometry"
                }, {
                    name: "缓冲区查询",
                    thumbnail: "l_getFeatureByBuffer.png",
                    fileName: "02_getFeatureByBuffer"
                }, {
                    name: "栅格查询",
                    thumbnail: "l_getGridCellInfos.png",
                    fileName: "02_getGridCellInfos"
                }, {
                    name: "字段信息",
                    thumbnail: "l_fieldsService.png",
                    fileName: "02_fieldsService"
                }, {
                    name: "字段查询统计",
                    thumbnail: "l_fieldStatistics.png",
                    fileName: "02_fieldStatistics"
                }, {
                    name: "地物编辑",
                    thumbnail: "l_editFeatures.png",
                    fileName: "02_editFeatures"
                }]
            },
            "theme": {
                name: "专题图",
                content: [{
                    name: "点密度专题图",
                    thumbnail: "l_themeDotDensity.png",
                    fileName: "03_themeDotDensity"
                }, {
                    name: "等级符号专题图",
                    thumbnail: "l_themeGraduatedSymbol.png",
                    fileName: "03_themeGraduatedSymbol"
                }, {
                    name: "统计专题图",
                    thumbnail: "l_themeGraph.png",
                    fileName: "03_themeGraph"
                }, {
                    name: "矩阵标签专题图",
                    thumbnail: "l_themeLabel.png",
                    fileName: "03_themeLabel"
                }, {
                    name: "分段专题图",
                    thumbnail: "l_themeRange.png",
                    fileName: "03_themeRange"
                }, {
                    name: "单值专题图",
                    thumbnail: "l_themeUnique.png",
                    fileName: "03_themeUnique"
                }, {
                    name: "栅格分段专题图",
                    thumbnail: "l_themeGridRange.png",
                    fileName: "03_themeGridRange"
                }, {
                    name: "栅格单值专题图",
                    thumbnail: "l_themeGridUnique.png",
                    fileName: "03_themeGridUnique"
                }]
            },
            "spatialAnalyst": {
                name: "空间分析",
                content: [{
                    name: "缓冲区分析",
                    thumbnail: "l_bufferAnalystService.png",
                    fileName: "04_bufferAnalystService"
                }, {
                    name: "缓冲区分析二",
                    thumbnail: "l_bufferAnalystService-geometry.png",
                    fileName: "04_bufferAnalystService_geometry"
                }, {
                    name: "数据集泰森多边形",
                    thumbnail: "l_thiessenAnalystService-datasets.png",
                    fileName: "04_thiessenAnalystService_datasets"
                }, {
                    name: "几何泰森多边形",
                    thumbnail: "l_thiessenAnalystService-geometry.png",
                    fileName: "04_thiessenAnalystService_geometry"
                }, {
                    name: "叠加分析",
                    thumbnail: "l_overlayAnalystService.png",
                    fileName: "04_overlayAnalystService"
                }, {
                    name: "表面分析",
                    thumbnail: "l_surfaceAnalystService.png",
                    fileName: "04_surfaceAnalystService"
                }, {
                    name: "动态分段",
                    thumbnail: "l_generateSpatialDataService.png",
                    fileName: "04_generateSpatialDataService"
                }, {
                    name: "点定里程",
                    thumbnail: "l_routeCalculateMeasureService.png",
                    fileName: "04_routeCalculateMeasureService"
                }, {
                    name: "里程定点",
                    thumbnail: "l_routeLocatorService_point.png",
                    fileName: "04_routeLocatorService_point"
                }, {
                    name: "里程定线",
                    thumbnail: "l_routeLocatorService_line.png",
                    fileName: "04_routeLocatorService_line"
                }, {
                    name: "点密度插值分析",
                    thumbnail: "l_interpolationAnalystService-Density.png",
                    fileName: "04_interpolationAnalystService_Density"
                }, {
                    name: "反距离加权插值分析",
                    thumbnail: "l_interpolationAnalystService-IDW-dataset.png",
                    fileName: "04_interpolationAnalystService_IDW_dataset"
                }, {
                    name: "普通克吕金插值分析",
                    thumbnail: "l_interpolationAnalystService-Kriging.png",
                    fileName: "04_interpolationAnalystService_Kriging"
                }, {
                    name: "泛克吕金插值分析",
                    thumbnail: "l_interpolationAnalystService_KrigingUniversal.png",
                    fileName: "04_interpolationAnalystService_KrigingUniversal"
                }, {
                    name: "径向基函数插值分析",
                    thumbnail: "l_interpolationAnalystService_RBF.png",
                    fileName: "04_interpolationAnalystService_RBF"
                }, {
                    name: "离散点插值分析",
                    thumbnail: "l_interpolationAnalystService_IDW_geometry.png",
                    fileName: "04_interpolationAnalystService_IDW_geometry"
                }, {
                    name: "地形曲率计算",
                    thumbnail: "l_terrainCurvatureCalculationService.png",
                    fileName: "04_terrainCurvatureCalculationService"
                }, {
                    name: "栅格代数运算",
                    thumbnail: "l_mathExpressionAnalysisService.png",
                    fileName: "04_mathExpressionAnalysisService"
                }, {
                    name: "核密度分析",
                    thumbnail: "l_densityKernelAnalystService.png",
                    fileName: "04_densityKernelAnalystService"
                }]
            },
            "networkAnalyst": {
                name: "网络分析",
                content: [{
                    name: "服务区分析",
                    thumbnail: "l_findServiceAreas.png",
                    fileName: "05_findServiceAreas"
                }, {
                    name: "最近设施分析",
                    thumbnail: "l_findClosetFacilitiesService.png",
                    fileName: "05_findClosestFacilitiesService"
                }, {
                    name: "选址分区分析",
                    thumbnail: "l_findLocationService.png",
                    fileName: "05_findLocationService"
                }, {
                    name: "多旅行商分析-物流配送",
                    thumbnail: "l_findMTSPPathsService.png",
                    fileName: "05_findMTSPPathsService"
                }, {
                    name: "旅行商分析-质检巡查",
                    thumbnail: "l_findTSPPathsService.png",
                    fileName: "05_findTSPPathsService"
                }, {
                    name: "最佳路径分析",
                    thumbnail: "l_findPathService.png",
                    fileName: "05_findPathService"
                }]
            },
            "trafficTransferAnalyst": {
                name: "交通换乘",
                content: [{
                    name: "交通换乘",
                    thumbnail: "l_trafficTransferAnalystService.png",
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
                    thumbnail: "l_singleObjectQueryJob.png",
                    fileName: "singleObjectQueryJobService"
                }, {
                    name: "区域汇总分析",
                    thumbnail: "SummaryRegionJobService.png",
                    fileName: "SummaryRegionJobService"
                }, {
                    name: "矢量裁剪分析",
                    thumbnail: "l_vectorClipJob.png",
                    fileName: "vectorClipJobService"
                }]
            },
            "addressMatch": {
                name: "地址匹配",
                content: [{
                    name: "地址匹配",
                    thumbnail: "l_addressService.png",
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
                    thumbnail: "l_iPortalWebmap.png",
                    fileName: "iPortalWebmap"
                }]
            },
            "ip_security": {
                name: "安全",
                content: [{
                    name: "安全认证",
                    thumbnail: "l_iportalSecurity.png",
                    fileName: "iPortalSecurity"
                }]
            },
            "ip_querymaps": {
                name: "地图列表",
                content: [{
                    name: "地图列表",
                    thumbnail: "l_iPortalQueryMaps.png",
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
                    name: "黄龙溪徒步",
                    thumbnail: "l_onlineWebmap.png",
                    fileName: "onlineWebmap"
                }]
            },
            "ol_security": {
                name: "安全",
                content: [{
                    name: "安全认证",
                    thumbnail: "l_onlineSecurity.png",
                    fileName: "onlineSecurity"
                }]
            }
        }
    },
    "iManager": {
        name: "iManager",
        content: {
            "im_node": {
                name: "节点",
                content: [{
                    name: "节点管理",
                    thumbnail: "imanagerNodeManager.png",
                    fileName: "iManagerNodeManager"
                }]
            }
        }
    },
    "ElasticSearch": {
        name: "ElasticSearch",
        content: {
            "": {
                name: "可视化",
                content: [{
                    name: "热力/格网图",
                    thumbnail: "l_ESHeatMap.png",
                    fileName: "ESHeatMap"
                }, {
                    name: "航班监控",
                    thumbnail: "l_PlanesMonitor.png",
                    fileName: "PlanesMonitor"
                }]
            }
        }
    },
    "clientSpatialAnalyst": {
        name: "客户端分析",
        content: {
            "Turf": {
                name: "Turf",
                content: [{
                    name: "空间分析",
                    thumbnail: "l_turf_transformation.png",
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
                    name: "热力图-随机点",
                    thumbnail: "l_heat.png",
                    fileName: "12_heatMap"
                }, {
                    name: "热力图-纽约出租车上车点",
                    thumbnail: "l_heatmap_nyc.png",
                    fileName: "12_heatMap_NY"
                }]
            },
            "animate": {
                name: "动画",
                content: [{
                    name: "闪烁点",
                    thumbnail: "l_pulse.png",
                    fileName: "12_pulse"
                }]
            },
            "cluster": {
                name: "聚合",
                content: [{
                    name: "点聚合",
                    thumbnail: "l_markerCluster.png",
                    fileName: "12_markerCluster"
                }]
            },
            "graphicLayer": {
                name: "高效率点图层",
                content: [{
                    name: "随机点",
                    thumbnail: "l_graphicLayer.png",
                    fileName: "12_graphicLayer"
                }]
            },
            // "D3Theme": {
            //     name: "D3-单值专题图",
            //     content: null
            // },
            "ECharts": {
                name: "ECharts",
                content: [
                    {
                        name: "散点地图",
                        thumbnail: "l_echartsEffectScatter.png",
                        fileName: "echartsEffectScatter"
                    },
                    {
                        name: "迁徙图",
                        thumbnail: "l_echartsGeoLines.png",
                        fileName: "echartsGeoLines"
                    },
                    {
                        name: "热力图",
                        thumbnail: "l_echartsHeatmap.png",
                        fileName: "echartsHeatmap"
                    },
                    {
                        name: "线路图",
                        thumbnail: "l_echartsLinesBus.png",
                        fileName: "echartsLinesBus"
                    },
                    {
                        name: "线特效",
                        thumbnail: "l_echartsLinesEffect.png",
                        fileName: "echartsLinesEffect"
                    },
                    {
                        name: "折线图",
                        thumbnail: "l_echartsLineMarker.png",
                        fileName: "echartsLineMarker"
                    },
                    {
                        name: "柱状图",
                        thumbnail: "l_echartsBar.png",
                        fileName: "echartsBar"
                    },
                    {
                        name: "散点图",
                        thumbnail: "l_echartsScatter.png",
                        fileName: "echartsScatter"
                    },
                    {
                        name: "饼图",
                        thumbnail: "l_echartsPie.png",
                        fileName: "echartsPie"
                    }
                ]

            },
            "MapV": {
                name: "MapV",
                content: [{
                    name: "蜂巢图",
                    thumbnail: "l_mapVLayer_honeycomb.png",
                    fileName: "mapVLayerHoneycomb"
                }, {
                    name: "纽约出租车上车点",
                    thumbnail: "l_mapVLayer_point.png",
                    fileName: "mapVLayerPoint"
                }, {
                    name: "通勤图",
                    thumbnail: "l_mapvLayer_csvCar.png",
                    fileName: "mapVLayerCSVCar"
                }, {
                    name: "强边界图",
                    thumbnail: "l_mapvLayer_forceEdgeBunding.png",
                    fileName: "mapVLayerForceEdgeBunding"
                }, {
                    name: "迁徙图",
                    thumbnail: "l_mapvLayer_qianxi.png",
                    fileName: "mapVLayerQianxi"
                }, {
                    name: "动态轨迹",
                    thumbnail: "l_mapvLayer_polylineTime.png",
                    fileName: "mapVLayerPolylineTime"
                }, {
                    name: "简单线",
                    thumbnail: "l_mapvLayer_polyline.png",
                    fileName: "mapVLayerPolylineSimple"
                }, {
                    name: "强度线",
                    thumbnail: "l_mapvLayer_polylineIntensity.png",
                    fileName: "mapVLayerPolylineIntensity"
                }, {
                    name: "面",
                    thumbnail: "l_mapvLayer_polygon.png",
                    fileName: "mapVLayerPolygon"
                }, {
                    name: "北京",
                    thumbnail: "l_mapvLayer_polygonBuildings.png",
                    fileName: "mapVLayerPolygonBuildings"
                }]
            },
            "extrusion": {
                name: "OSMBuildings",
                content: [{
                    name: "建筑立体效果",
                    thumbnail: "l_osmbuildings.png",
                    fileName: "osmbuildings"
                }]
            },
            "tileVectorLayer": {
                name: "矢量瓦片",
                content: [
                    {
                        name: "默认风格",
                        thumbnail: "l_tileVectorLayer_normal.png",
                        fileName: "vectorTileLayerNormal"
                    }, {
                        name: "月夜风格",
                        thumbnail: "l_tileVectorLayer_night.png",
                        fileName: "vectorTileLayerNight"
                    }, {
                        name: "强边界风格",
                        thumbnail: "l_tileVectorLayer_boundray.png",
                        fileName: "vectorTileLayerBoundary"
                    }, {
                        name: "深夜蓝黑风格",
                        thumbnail: "l_tileVectorLayer_darkBlue.png",
                        fileName: "vectorTileLayerDarkBlue"
                    }, {
                        name: "HelloKitty风格",
                        thumbnail: "l_tileVectorLayer_helloKitty.png",
                        fileName: "vectorTileLayerHelloKitty"
                    }, {
                        name: "淡雅绿风格",
                        thumbnail: "l_tileVectorLayer_natural.png",
                        fileName: "vectorTileLayerNatural"
                    }, {
                        name: "默认风格(MVT)",
                        thumbnail: "l_tileVectorLayer_normal.png",
                        fileName: "vectorTileLayerMVT"

                    }, {
                        name: "默认风格(MVT 4326)",
                        thumbnail: "l_tileVectorLayer_mvt4326.png",
                        fileName: "vectorTileLayerMVT_4326"

                    }
                ]
            },
            "themeLayer": {
                name: "客户端专题图",
                content: [{
                    name: "单值专题图",
                    thumbnail: "l_uniqueThemeLayer.png",
                    fileName: "uniqueThemeLayer"
                }, {
                    name: "分段专题图",
                    thumbnail: "l_rangeThemeLayer.png",
                    fileName: "rangeThemeLayer"
                }, {
                    name: "等级符号专题图",
                    thumbnail: "l_rankSymbolThemeLayer.png",
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
                    name: "绘制与修改",
                    thumbnail: "l_drawAndModify.png",
                    fileName: "drawAndModify"
                }, {
                    name: "捕捉与修改",
                    thumbnail: "l_snapAndModify.png",
                    fileName: "snapAndModify"
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
                    thumbnail: "l_changeTileVersion.png",
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
                    thumbnail: "l_WMTSLayer.png",
                    fileName: "WMTSLayer"
                }]
            },
            "WMS": {
                name: "WMS",
                content: [{
                    name: "WMS图层",
                    thumbnail: "l_WMSLayer.png",
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
                    thumbnail: "l_baiduLayer.png",
                    fileName: "baiduLayer"
                }]
            },
            "Tianditu": {
                name: "天地图",
                content: [{
                    name: "天地图-墨卡托",
                    thumbnail: "l_tiandituLayer_mercator.png",
                    fileName: "tiandituLayer_mercator"
                }, {
                    name: "天地图-经纬度",
                    thumbnail: "l_tiandituLayer_ll.png",
                    fileName: "tiandituLayer_ll"
                }]
            },
            "cloud": {
                name: "超图云",
                content: [{
                    name: "超图云地图",
                    thumbnail: "l_cloudLayer.png",
                    fileName: "cloudLayer"
                }]
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
    "iPortal": "fa-desktop",
    "Online": "fa-cloud",
    "iManager": "fa-group",
    "ElasticSearch": "fa-tasks",
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
    "ElasticSearch": "fa-tasks",
    "plot": "fa-edit",
    "control": "fa-sliders",
    "clientSpatialAnalyst": "fa-object-group",
    "viz": "fa-map",
    "OGC": "fa-globe",
    "mapping": "fa-send"
};