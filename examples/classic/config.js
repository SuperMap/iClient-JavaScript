/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.*/
/**
 * classic 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var identification = {
    name: "iClient Classic"
};

var exampleConfig = {
    "map": {
        name: "地图",
        name_en: "Map",
        content: {
            "SuperMapLayer": {
                name: "SuperMap地图",
                name_en: "SuperMap map",
                content: [{
                    name: "4326底图",
                    name_en: "4326 coordinate system",
                    thumbnail: "map_4326Map.png",
                    fileName: "map_4326Map"
                }, {
                    name: "3857底图",
                    name_en: "3857 coordinate system",
                    thumbnail: "map_3857Map.png",
                    fileName: "map_3857Map"
                }, {
                    name: "平面坐标系图层",
                    name_en: "planar coordinate system",
                    thumbnail: "map_changchunMap.png",
                    fileName: "map_changchunMap"

                }, {
                    name: "SuperMap 云图层",
                    name_en: "SuperMap Cloud layer",
                    thumbnail: "map_cloudLayer.png",
                    fileName: "map_cloudLayer"
                }, {
                    name: "Image图层",
                    name_en: "image layer",
                    thumbnail: "map_image.png",
                    fileName: "map_image"
                }, {
                    name: "图层叠加",
                    name_en: "overlay tile layer",
                    thumbnail: "map_overlayLayer.png",
                    fileName: "map_overlayLayer"

                }, {
                    name: "动态图层",
                    name_en: "dynamic layer",
                    thumbnail: "map_dynamiclayers.png",
                    fileName: "map_dynamiclayers"

                }]
            },
            "thirdParty": {
                name: "第三方地图",
                name_en: "Third party map",
                content: [{
                    name: "天地图",
                    name_en: "tianditu layer",
                    thumbnail: "map_3tianditu.png",
                    fileName: "map_3tianditu"

                }, {
                    name: "百度",
                    name_en: "baidu layer",
                    thumbnail: "map_3baidu.png",
                    fileName: "map_3baidu"

                }, {
                    name: "谷歌地图",
                    name_en: "google layer",
                    thumbnail: "map_3googlelayer.png",
                    fileName: "map_3googlelayer"

                }, {
                    name: "bing地图",
                    name_en: "bing layer",
                    thumbnail: "map_3bing.png",
                    fileName: "map_3bing"

                }, {
                    name: "OSM地图",
                    name_en: "OSM layer",
                    thumbnail: "map_3osm.png",
                    fileName: "map_3osm"

                }]
            },
            "operation": {
                name: "地图操作",
                name_en: "Map operation",
                content: [{
                    name: "缩放与平移",
                    name_en: "translation",
                    thumbnail: "map_translation.png",
                    fileName: "map_translation"

                }, {
                    name: "坐标转换",
                    name_en: "coordinate transformation",
                    thumbnail: "map_coordinate_transformation.png",
                    fileName: "map_coordinate_transformation"

                }, {
                    name: "地图事件",
                    name_en: "map event",
                    thumbnail: "map_mapevent.png",
                    fileName: "map_mapevent"

                }, {
                    name: "设置缩放级别",
                    name_en: "zoom range",
                    thumbnail: "map_zoomRange.png",
                    fileName: "map_zoomRange"

                }, {
                    name: "底图切换",
                    name_en: "basemap toggle",
                    thumbnail: "map_toggleMaps.png",
                    fileName: "map_toggleMaps"

                }]
            }
        }
    },
    "overlay": {
        name: "覆盖物",
        name_en: "Overlay",
        content: {
            "vectorLayer": {
                name: "矢量图层",
                name_en: "Vector layer",
                content: [{
                    name: "矢量图形数据",
                    name_en: "vector layer data",
                    thumbnail: "overlay_vectorLayerData.png",
                    fileName: "overlay_vectorLayerData"
                }, {
                    name: "标签矢量图层数据",
                    name_en: "label vector layer data",
                    thumbnail: "overlay_labelVectorLayerData.png",
                    fileName: "overlay_labelVectorLayerData"
                }, {
                    name: "渐变色样式矢量图形数据",
                    name_en: "gradient style vector layer data",
                    thumbnail: "overlay_ombreStyleLayer.png",
                    fileName: "overlay_ombreStyleLayer"
                }, {
                    name: "矢量图层数据点击事件",
                    name_en: "vector layer data event",
                    thumbnail: "overlay_vectorDataEvent.png",
                    fileName: "overlay_vectorDataEvent"
                }, {
                    name: "B样条曲线",
                    name_en: "B-spline curve",
                    thumbnail: "overlay_splinesData.png",
                    fileName: "overlay_splinesData"
                }, {
                    name: "电信符号数据",
                    name_en: "telecom symbol data",
                    thumbnail: "overlay_telecomIconData.png",
                    fileName: "overlay_telecomIconData"
                }, {
                    name: "岛洞与多面",
                    name_en: "island hole and multipolygon",
                    thumbnail: "overlay_islandMultiPolygonData.png",
                    fileName: "overlay_islandMultiPolygonData"
                }, {
                    name: "Graphic图层符号绘制（一）",
                    name_en: "graphic symbol data (1)",
                    thumbnail: "overlay_graphicSymbolData.png",
                    fileName: "overlay_graphicSymbolData"
                }, {
                    name: "Graphic图层符号绘制(二)",
                    name_en: "graphic symbol data (2)",
                    thumbnail: "overlay_graphicSymbolData2.png",
                    fileName: "overlay_graphicSymbolData2"
                }, {
                    name: "Graphic图层符号绘制(三)",
                    name_en: "graphic symbol data (3)",
                    thumbnail: "overlay_graphicSymbolData3.png",
                    fileName: "overlay_graphicSymbolData3"
                }]
            },
            "markerLayer": {
                name: "标记图层",
                name_en: "Marker layer",
                content: [{
                    name: "标记图层",
                    name_en: "marker layer",
                    thumbnail: "overlay_markerLayer.png",
                    fileName: "overlay_markerLayer"
                }, {
                    name: "标记图层支持的事件",
                    name_en: "marker layer event",
                    thumbnail: "overlay_markerLayerEvent.png",
                    fileName: "overlay_markerLayerEvent"
                }]
            }

        }
    },
    "control": {
        name: "控件",
        name_en: "Control",
        content: {
            "mapControl": {
                name: "地图类控件",
                name_en: "Map control",
                content: [{
                    name: "缩放控件",
                    name_en: "zoom control",
                    thumbnail: "controler_zoom.png",
                    fileName: "controler_zoom"
                }, {
                    name: "平移缩放控件",
                    name_en: "pan zoom control",
                    thumbnail: "controler_panzoombar.png",
                    fileName: "controler_panzoombar"
                }, {
                    name: "拉框缩放控件",
                    name_en: "box zoom control",
                    thumbnail: "controler_zoomBox.png",
                    fileName: "controler_zoomBox"
                }, {
                    name: "地图基础操作控件",
                    name_en: "navigation control",
                    thumbnail: "controler_navigation.png",
                    fileName: "controler_navigation"
                }, {
                    name: "图层管理器",
                    name_en: "layer switch control",
                    thumbnail: "controler_layerswitcher.png",
                    fileName: "controler_layerswitcher"
                }, {
                    name: "鹰眼控件",
                    name_en: "overview map control",
                    thumbnail: "controler_overviewmap.png",
                    fileName: "controler_overviewmap"
                }, {
                    name: "比例尺控件",
                    name_en: "scale control",
                    thumbnail: "controler_scaleline.png",
                    fileName: "controler_scaleline"
                }, {
                    name: "版权控件",
                    name_en: "attribution control",
                    thumbnail: "controler_attribution.png",
                    fileName: "controler_attribution"
                }, {
                    name: "地图拖拽控件",
                    name_en: "drag control",
                    thumbnail: "controler_dragpan.png",
                    fileName: "controler_dragpan"
                }, {
                    name: "定位控件",
                    name_en: "location control",
                    thumbnail: "controler_geolocate.png",
                    fileName: "controler_geolocate"
                }, {
                    name: "控件皮肤切换",
                    name_en: "skin switch control",
                    thumbnail: "controler_changeControlsSkin.png",
                    fileName: "controler_changeControlsSkin"
                }]
            },
            "featureControl": {
                name: "要素类控件",
                name_en: "Feature control",
                content: [{
                    name: "点线面绘制",
                    name_en: "draw control",
                    thumbnail: "controler_drawGeometry.png",
                    fileName: "controler_drawGeometry"
                }, {
                    name: "要素编辑",
                    name_en: "feature snap control",
                    thumbnail: "controler_featureSnap.png",
                    fileName: "controler_featureSnap"
                }, {
                    name: "距离量算",
                    name_en: "distance measure control",
                    thumbnail: "controler_distanceMeasure.png",
                    fileName: "controler_distanceMeasure"
                }, {
                    name: "面积量算",
                    name_en: "area measure control",
                    thumbnail: "controler_areaMeasure.png",
                    fileName: "controler_areaMeasure"
                }, {
                    name: "鼠标拖拽要素控件",
                    name_en: "drag feature control",
                    thumbnail: "controler_dragFeature.png",
                    fileName: "controler_dragFeature"
                }]
            }
        }
    },
    "popup": {
        name: "信息框",
        name_en: "Popup",
        content: {
            "infoBox": {
                name: "信息框",
                name_en: "Popup",
                content: [{
                    name: "简易信息框",
                    name_en: "simple popup",
                    thumbnail: "popup_simplePopup.png",
                    fileName: "popup_simplePopup"
                }, {
                    name: "自适应信息框",
                    name_en: "anchored popup",
                    thumbnail: "popup_anchored.png",
                    fileName: "popup_anchored"
                }, {
                    name: "带阴影弹窗",
                    name_en: "shadow popup",
                    thumbnail: "popup_shadowPopup.png",
                    fileName: "popup_shadowPopup"
                }, {
                    name: "自定义信息框",
                    name_en: "custom popup",
                    thumbnail: "popup_customPopup.png",
                    fileName: "popup_customPopup"
                }, {
                    name: "第三方信息框",
                    name_en: "third-party popup",
                    thumbnail: "popup_infoWindow.png",
                    fileName: "popup_infoWindow"
                }
                ]
            }
        }
    },
    "query": {
        name: "查询",
        name_en: "Query",
        content: {
            "mapQuery": {
                name: "地图查询",
                name_en: "Map query",
                content: [{
                    name: "地图范围查询",
                    name_en: "bounds query",
                    thumbnail: "query_queryByBounds.png",
                    fileName: "query_queryByBounds"
                }, {
                    name: "距离查询",
                    name_en: "distance query",
                    thumbnail: "query_queryByDistance.png",
                    fileName: "query_queryByDistance"
                }, {
                    name: "几何查询",
                    name_en: "geometry query",
                    thumbnail: "query_queryByGeometry.png",
                    fileName: "query_queryByGeometry"
                }, {
                    name: "SQL查询",
                    name_en: "SQL query",
                    thumbnail: "query_queryBySQL.png",
                    fileName: "query_queryBySQL"
                }, {
                    name: "查询交互",
                    name_en: "query interaction",
                    thumbnail: "query_vectorLayerRegionName.png",
                    fileName: "query_vectorLayerRegionName"
                }]
            },
            "datasetQuery": {
                name: "数据集查询",
                name_en: "Data query",
                content: [{
                    name: "ID 查询",
                    name_en: "ID query",
                    thumbnail: "query_getFeatureByIDs.png",
                    fileName: "query_getFeatureByIDs"
                }, {
                    name: "缓冲区查询",
                    name_en: "buffer query",
                    thumbnail: "query_getFeatureByBuffer.png",
                    fileName: "query_getFeatureByBuffer"
                }, {
                    name: "几何查询",
                    name_en: "geometry query",
                    thumbnail: "query_getFeatureByGeometry.png",
                    fileName: "query_getFeatureByGeometry"
                }, {
                    name: "数据集SQL查询",
                    name_en: "SQL query",
                    thumbnail: "query_getFeatureBySQL.png",
                    fileName: "query_getFeatureBySQL"
                }, {
                    name: "数据集范围查询",
                    name_en: "bounds query",
                    thumbnail: "query_getFeatureByBounds.png",
                    fileName: "query_getFeatureByBounds"
                }, {
                    name: "地物编辑",
                    name_en: "data editing",
                    thumbnail: "query_editFeature.png",
                    fileName: "query_editFeature"
                }, {
                    name: "字段查询统计",
                    name_en: "field statistics",
                    thumbnail: "query_fieldStatistic.png",
                    fileName: "query_fieldStatistic"
                }, {
                    name: "数据服务栅格查询",
                    name_en: "data gridcell query",
                    thumbnail: "query_gridInfosQuery.png",
                    fileName: "query_gridInfosQuery"
                }, {
                    name: "数据源信息查询",
                    name_en: "datasource information service",
                    thumbnail: "query_datasourceInfo.png",
                    fileName: "query_datasourceInfo"
                },
                {
                    name: "数据集信息查询",
                    name_en: "dataset information service",
                    thumbnail: "query_datasetInfo.png",
                    fileName: "query_datasetInfo"
                }
            ]
            }

        }
    },
    "theme": {
        name: "专题图",
        name_en: "Thematic map",
        content: {
            "serviceTheme": {
                name: "服务器专题图",
                name_en: "Server thematic map",
                content: [{
                    name: "点密度专题图",
                    name_en: "dot density",
                    thumbnail: "theme_themeDotDensity.png",
                    fileName: "theme_themeDotDensity"
                }, {
                    name: "等级符号专题图",
                    name_en: "graduated symbol",
                    thumbnail: "theme_themeGraduatedSymbol.png",
                    fileName: "theme_themeGraduatedSymbol"
                }, {
                    name: "统计专题图",
                    name_en: "statistical chart",
                    thumbnail: "theme_themeGraph.png",
                    fileName: "theme_themeGraph"
                }, {
                    name: "标签专题图",
                    name_en: "label",
                    thumbnail: "theme_themeLabel.png",
                    fileName: "theme_themeLabel"
                }, {
                    name: "范围分段专题图",
                    name_en: "range",
                    thumbnail: "theme_themeRange.png",
                    fileName: "theme_themeRange"
                }, {
                    name: "单值专题图",
                    name_en: "unique",
                    thumbnail: "theme_themeUnique.png",
                    fileName: "theme_themeUnique"
                }, {
                    name: "栅格分段专题图",
                    name_en: "grid range",
                    thumbnail: "theme_themeGridRange.png",
                    fileName: "theme_themeGridRange"
                }, {
                    name: "栅格单值专题图",
                    name_en: "grid unique",
                    thumbnail: "theme_themeGridUnique.png",
                    fileName: "theme_themeGridUnique"
                }]
            },
            "clientTheme": {
                name: "客户端专题图",
                name_en: "Client thematic layer",
                content: [{
                    name: "标签专题图层",
                    name_en: "label ",
                    thumbnail: "theme_themeLabelLayer.png",
                    fileName: "theme_themeLabelLayer"
                }, {
                    name: "单值专题图",
                    name_en: "unique",
                    thumbnail: "theme_ctl_landuseUnique.png",
                    fileName: "theme_ctl_landuseUnique"
                }, {
                    name: "分段专题图",
                    name_en: "range",
                    thumbnail: "theme_ctl_popDensityRange.png",
                    fileName: "theme_ctl_popDensityRange"
                }, {
                    name: "空气质量指数专题图",
                    name_en: "PM 2.5",
                    thumbnail: "theme_themePM2_5.png",
                    fileName: "theme_themePM2_5"
                }, {
                    name: "世界首都人口统计",
                    name_en: "world capitals population",
                    thumbnail: "theme_ctl_worldCapitalsGraphBar.png",
                    fileName: "theme_ctl_worldCapitalsGraphBar"
                }, {
                    name: "柱状图",
                    name_en: "bar chart",
                    thumbnail: "theme_ctl_GraphBar.png",
                    fileName: "theme_ctl_GraphBar"
                }, {
                    name: "折线图",
                    name_en: "line chart",
                    thumbnail: "theme_ctl_GraphLine.png",
                    fileName: "theme_ctl_GraphLine"
                }, {
                    name: "饼图",
                    name_en: "pie chart",
                    thumbnail: "theme_ctl_GraphPie.png",
                    fileName: "theme_ctl_GraphPie"
                }, {
                    name: "三维柱状图",
                    name_en: "3D bar chart",
                    thumbnail: "theme_ctl_GraphBar3D.png",
                    fileName: "theme_ctl_GraphBar3D"
                }, {
                    name: "点状图",
                    name_en: "point chart",
                    thumbnail: "theme_ctl_GraphPoint.png",
                    fileName: "theme_ctl_GraphPoint"
                }, {
                    name: "环状图",
                    name_en: "ring chart",
                    thumbnail: "theme_ctl_GraphRing.png",
                    fileName: "theme_ctl_GraphRing"
                }, {
                    name: "统计图表切换",
                    name_en: "statistical chart switch",
                    thumbnail: "theme_ctl_jingjinPopGraph.png",
                    fileName: "theme_ctl_jingjinPopGraph"
                }, {
                    name: "符号专题图",
                    name_en: "rank symbol",
                    thumbnail: "theme_ctl_RankSymbol.png",
                    fileName: "theme_ctl_RankSymbol"
                }]
            }
        }
    },

    "analysis": {
        name: "分析",
        name_en: "Analysis",
        content: {
            "spatialAnalyst": {
                name: "空间分析",
                name_en: "Spatial analysis",
                content: [{
                    name: "缓冲区分析一",
                    name_en: "buffer analysis (1)",
                    thumbnail: "analysis_bufferAnalyst.png",
                    fileName: "analysis_bufferAnalyst"
                }, {
                    name: "缓冲区分析二",
                    name_en: "buffer analysis (2)",
                    thumbnail: "analysis_bufferQuery.png",
                    fileName: "analysis_bufferQuery"
                }, {
                    name: "泰森多边形",
                    name_en: "thiessen analysis",
                    thumbnail: "analysis_thiessenAnalyst.png",
                    fileName: "analysis_thiessenAnalyst"
                }, {
                    name: "叠加分析",
                    name_en: "overlay analysis",
                    thumbnail: "analysis_overlayAnalystService.png",
                    fileName: "analysis_overlayAnalystService"
                }, {
                    name: "表面分析",
                    name_en: "surface analysis",
                    thumbnail: "analysis_surfaceAnalyst.png",
                    fileName: "analysis_surfaceAnalyst"
                }, {
                    name: "动态分段",
                    name_en: "dynamic segmentation",
                    thumbnail: "analysis_dynamicSegmentation.png",
                    fileName: "analysis_dynamicSegmentation"
                }, {
                    name: "点定里程",
                    name_en: "route calculate measurement",
                    thumbnail: "analysis_routeCalculateMeasure.png",
                    fileName: "analysis_routeCalculateMeasure"
                }, {
                    name: "里程定点",
                    name_en: "route locator - point",
                    thumbnail: "analysis_routeLocatorPoint.png",
                    fileName: "analysis_routeLocatorPoint"
                }, {
                    name: "点密度插值分析",
                    name_en: "point density analysis",
                    thumbnail: "analysis_interpolationAnalystByDensity.png",
                    fileName: "analysis_interpolationAnalystByDensity"
                }, {
                    name: "反距离加权插值分析",
                    name_en: "inverse distance weighted analysis",
                    thumbnail: "analysis_interpolationAnalystByIDW.png",
                    fileName: "analysis_interpolationAnalystByIDW"
                }, {
                    name: "克吕金插值分析",
                    name_en: "kriging interpolation",
                    thumbnail: "analysis_interpolationAnalystByKriging.png",
                    fileName: "analysis_interpolationAnalystByKriging"
                }, {
                    name: "径向基函数插值分析",
                    name_en: "kriging universal interpolation",
                    thumbnail: "analysis_interpolationAnalystByRBF.png",
                    fileName: "analysis_interpolationAnalystByRBF"
                }, {
                    name: "离散点插值分析",
                    name_en: "radial basis function interpolation",
                    thumbnail: "analysis_interpolationAnalystByGeometry.png",
                    fileName: "analysis_interpolationAnalystByGeometry"
                }, {
                    name: "地形曲率计算",
                    name_en: "discrete point interpolation",
                    thumbnail: "analysis_terrainCurvatureCalculation.png",
                    fileName: "analysis_terrainCurvatureCalculation"
                }, {
                    name: "栅格代数运算",
                    name_en: "terrain curvature calculation",
                    thumbnail: "analysis_mathExpression.png",
                    fileName: "analysis_mathExpression"
                }, {
                    name: "核密度分析",
                    name_en: "math expression",
                    thumbnail: "analysis_densityKernelAnalyst.png",
                    fileName: "analysis_densityKernelAnalyst"
                },
                ]
            },
            "networkAnalyst": {
                name: "网络分析",
                name_en: "Network analysis",
                content: [{
                    name: "最近设施分析",
                    name_en: "closest facilities",
                    thumbnail: "analysis_closestFacilities.png",
                    fileName: "analysis_closestFacilities"
                }, {
                    name: "选址分区分析",
                    name_en: "find location",
                    thumbnail: "analysis_findLocation.png",
                    fileName: "analysis_findLocation"
                }, {
                    name: "多旅行商分析",
                    name_en: "multi-traveler",
                    thumbnail: "analysis_findMTSPPaths.png",
                    fileName: "analysis_findMTSPPaths"
                }, {
                    name: "多旅行商分析（综合应用）",
                    name_en: "multi-traveler(comprehensive application)",
                    thumbnail: "analysis_findMTSPPathsAndTSPPaths.png",
                    fileName: "analysis_findMTSPPathsAndTSPPaths"
                }, {
                    name: "最佳路径分析",
                    name_en: "best path",
                    thumbnail: "analysis_findPath.png",
                    fileName: "analysis_findPath"
                }, {
                    name: "旅行商分析",
                    name_en: "traveler",
                    thumbnail: "analysis_findTSPPaths.png",
                    fileName: "analysis_findTSPPaths"
                }, {
                    name: "服务区分析",
                    name_en: "service area",
                    thumbnail: "analysis_serviceAreas.png",
                    fileName: "analysis_serviceAreas"
                },
                ]
            },
            "trafficTransferAnalyst": {
                name: "交通换乘",
                name_en: "Traffic transfer analysis",
                content: [{
                    name: "公交换乘服务",
                    name_en: "traffic transfer",
                    thumbnail: "analysis_trafficTransfer.png",
                    fileName: "analysis_trafficTransfer"
                }]
            },
            "processingService": {
                name: "分布式分析",
                name_en: "Distributed analysis services",
                content: [{
                    name: "密度分析",
                    name_en: "density",
                    thumbnail: "kernelDensityJobService.png",
                    fileName: "kernelDensityJobService"
                }, {
                    name: "点聚合分析",
                    name_en: "mesh summary",
                    thumbnail: "SummaryMeshJobService.png",
                    fileName: "SummaryMeshJobService"
                }, {
                    name: "单对象查询分析",
                    name_en: "single object query",
                    thumbnail: "lg_singleObjectQueryJob.png",
                    fileName: "singleObjectQueryJobService"
                }, {
                    name: "叠加分析",
                    name_en: "overlay",
                    thumbnail: "lg_overlayJobService.png",
                    fileName: "overlayGeoJobService"
                }, {
                    name: "缓冲区分析",
                    name_en: "buffer",
                    thumbnail: "lg_buffersAnalystJobService.png",
                    fileName: "buffersAnalystJobService"
                }, {
                    name: "区域汇总分析",
                    name_en: "regional summary",
                    thumbnail: "SummaryRegionJobService.png",
                    fileName: "SummaryRegionJobService"
                }, {
                    name: "矢量裁剪分析",
                    name_en: "vector clip",
                    thumbnail: "lg_vectorClipJob.png",
                    fileName: "vectorClipJobService"
                }, {
                    name: "属性汇总分析",
                    name_en: "summary attributes",
                    thumbnail: "lg_summaryAttributes.png",
                    fileName: "summaryAttributesJobService"
                }, {
                    name: "拓扑检查分析",
                    name_en: "topology validator",
                    thumbnail: "lg_topologyValidatorJobService.png",
                    fileName: "topologyValidatorJobService"
                }]
            },
            "addressMatch": {
                name: "地址匹配",
                name_en: "Address matching service",
                content: [{
                    name: "地址匹配",
                    name_en: "address match",
                    thumbnail: "addressMatchService.png",
                    fileName: "addressMatchService"
                }]
            }

        }
    },
    "viz": {
        name: "可视化",
        name_en: "Visualization",
        content: {
            "vizLayer": {
                name: "可视化图层",
                name_en: "Visualization layer",
                content: [{
                    name: "热点图",
                    name_en: "heat map",
                    thumbnail: "vizLayer_heatmapLayer.png",
                    fileName: "vizLayer_heatmapLayer"
                }, {
                    name: "新版热点图",
                    name_en: "fast heat map layer",
                    thumbnail: "vizLayer_heatmapFastLayer.png",
                    fileName: "vizLayer_heatmapFastLayer"
                }, {
                    name: "热点图颜色分段配置",
                    name_en: "heat map color section",
                    thumbnail: "vizLayer_heatmapColorSection.png",
                    fileName: "vizLayer_heatmapColorSection"
                }, {
                    name: "热点图颜色手动配置",
                    name_en: "heat map color manual",
                    thumbnail: "vizLayer_heatmapColorManual.png",
                    fileName: "vizLayer_heatmapColorManual"
                }, {
                    name: "热点网格图",
                    name_en: "heat grid map layer",
                    thumbnail: "vizLayer_heatGridLayer.png",
                    fileName: "vizLayer_heatGridLayer"
                }, {
                    name: "聚类图层",
                    name_en: "cluster layer",
                    thumbnail: "vizLayer_clusterLayer.png",
                    fileName: "vizLayer_clusterLayer"
                }, {
                    name: "UTFGrid图层",
                    name_en: "utf grid layer",
                    thumbnail: "vizLayer_utfGridLayer.png",
                    fileName: "vizLayer_utfGridLayer"
                }, {
                    name: "UTFGrid国旗版",
                    name_en: "utf grid layer-flags",
                    thumbnail: "vizLayer_utfGridLayerFlags.png",
                    fileName: "vizLayer_utfGridLayerFlags"
                }, {
                    name: "麻点图",
                    name_en: "goi layer",
                    thumbnail: "vizLayer_gois.png",
                    fileName: "vizLayer_gois"
                }, {
                    name: "要素图层扩展",
                    name_en: "elements layer extension",
                    thumbnail: "vizLayer_elements.png",
                    fileName: "vizLayer_elements"
                }]
            },
            "animation": {
                name: "时空数据",
                name_en: "Animation",
                content: [{
                    name: "基础渲染",
                    name_en: "basic animation",
                    thumbnail: "vizLayer_animatorBase.png",
                    fileName: "vizLayer_animatorBase"
                }, {
                    name: "点渐变",
                    name_en: "point animation",
                    thumbnail: "vizLayer_animatorPoint.png",
                    fileName: "vizLayer_animatorPoint"
                }, {
                    name: "线渐变",
                    name_en: "line animation",
                    thumbnail: "vizLayer_animatorLine.png",
                    fileName: "vizLayer_animatorLine"
                }, {
                    name: "面渐变模拟",
                    name_en: "polygon animation",
                    thumbnail: "vizLayer_animatorPolygon.png",
                    fileName: "vizLayer_animatorPolygon"
                }, {
                    name: "火车监控模拟",
                    name_en: "train animation",
                    thumbnail: "vizLayer_animatorTrain.png",
                    fileName: "vizLayer_animatorTrain"
                }, {
                    name: "车辆监控模拟",
                    name_en: "car animation",
                    thumbnail: "vizLayer_animatorCar.png",
                    fileName: "vizLayer_animatorCar"
                }, {
                    name: "地铁修建模拟",
                    name_en: "metro construction animation (1)",
                    thumbnail: "vizLayer_animatorMetro.png",
                    fileName: "vizLayer_animatorMetro"
                }, {
                    name: "地铁修建模拟2",
                    name_en: "metro construction animation (2)",
                    thumbnail: "vizLayer_animatorMetro2.png",
                    fileName: "vizLayer_animatorMetro2"
                }, {
                    name: "气象监测",
                    name_en: "weather monitor animation",
                    thumbnail: "vizLayer_animatorWeatherMonitor.png",
                    fileName: "vizLayer_animatorWeatherMonitor"
                }, {
                    name: "春运模拟",
                    name_en: "migrate animation",
                    thumbnail: "vizLayer_animatorMigrate.png",
                    fileName: "vizLayer_animatorMigrate"
                }]
            },
            "vectorBlock": {
                name: "矢量分块",
                name_en: "Carto CSS",
                content: [{
                    name: "矢量分块图",
                    name_en: "carto CSS vector tile layer",
                    thumbnail: "vizLayer_tiledVectorLayer.png",
                    fileName: "vizLayer_tiledVectorLayer"
                }, {
                    name: "点符号",
                    name_en: "carto CSS - point",
                    thumbnail: "vizLayer_cartoCSS_point.png",
                    fileName: "vizLayer_cartoCSS_point"
                }, {
                    name: "线符号",
                    name_en: "carto CSS - line",
                    thumbnail: "vizLayer_cartoCSS_line.png",
                    fileName: "vizLayer_cartoCSS_line"
                }, {
                    name: "面符号",
                    name_en: "carto CSS - polygon",
                    thumbnail: "vizLayer_cartoCSS_polygon.png",
                    fileName: "vizLayer_cartoCSS_polygon"
                }, {
                    name: "文本符号",
                    name_en: "carto CSS - text",
                    thumbnail: "vizLayer_cartoCSS_text.png",
                    fileName: "vizLayer_cartoCSS_text"
                }, {
                    name: "高亮显示",
                    name_en: "carto CSS - hightlight",
                    thumbnail: "vizLayer_cartoCSS_hightlight.png",
                    fileName: "vizLayer_cartoCSS_hightlight"
                }, {
                    name: "CartoCSS编辑",
                    name_en: "carto CSS - edit",
                    thumbnail: "vizLayer_cartoCSS_edit.png",
                    fileName: "vizLayer_cartoCSS_edit"
                }, {
                    name: "强边界风格",
                    name_en: "carto CSS - boundry style",
                    thumbnail: "vizLayer_cartoCSS_boundryStyle.png",
                    fileName: "vizLayer_cartoCSS_boundryStyle"
                }, {
                    name: "深夜蓝黑风格",
                    name_en: "carto CSS - dark-blue style",
                    thumbnail: "vizLayer_cartoCSS_darkblueStyle.png",
                    fileName: "vizLayer_cartoCSS_darkblueStyle"
                }, {
                    name: "淡雅绿风格",
                    name_en: "carto CSS - natural style",
                    thumbnail: "vizLayer_cartoCSS_naturalStyle.png",
                    fileName: "vizLayer_cartoCSS_naturalStyle"
                }, {
                    name: "月夜风格",
                    name_en: "carto CSS - night style",
                    thumbnail: "vizLayer_cartoCSS_nightStyle.png",
                    fileName: "vizLayer_cartoCSS_nightStyle"
                }, {
                    name: "Hellokitty风格",
                    name_en: "carto CSS - hellokitty style",
                    thumbnail: "vizLayer_cartoCSS_helloKitty.png",
                    fileName: "vizLayer_cartoCSS_helloKitty"
                }]
            },
            "MapV": {
                name: "MapV",
                name_en: "MapV",
                content: [{
                    name: "蜂巢图",
                    name_en: "honeycom",
                    thumbnail: "lg_mapVLayer_honeycomb.png",
                    fileName: "mapVLayerHoneycomb"
                }, {
                    name: "简单线",
                    name_en: "simple polyline",
                    thumbnail: "lg_mapVLayer_polylineSimple.png",
                    fileName: "mapVLayerPolylineSimple"
                }]
            }

        }
    },
    "OGC": {
        name: "OGC",
        name_en: "OGC",
        content: {
            "mapService": {
                name: "地图服务",
                name_en: "Map service",
                content: [{
                    name: "WMTS图层",
                    name_en: "WMTS layer",
                    thumbnail: "OGC_wmtsLayer.png",
                    fileName: "OGC_wmtsLayer"
                }, {
                    name: "WCS图层",
                    name_en: "WCS layer",
                    thumbnail: "OGC_wcs.png",
                    fileName: "OGC_wcs"
                }, {
                    name: "WMS图层",
                    name_en: "WMS layer",
                    thumbnail: "OGC_wms.png",
                    fileName: "OGC_wms"
                }]
            },
            "dataService": {
                name: "数据服务",
                name_en: "Data service",
                content: [{
                    name: "kml",
                    name_en: "kml",
                    thumbnail: "OGC_kml.png",
                    fileName: "OGC_kml"
                }, {
                    name: "GeoJSON数据展示",
                    name_en: "GeoJSON",
                    thumbnail: "OGC_GeoJSON.png",
                    fileName: "OGC_GeoJSON"
                }, {
                    name: "WFS查询",
                    name_en: "WFS query",
                    thumbnail: "OGC_queryByWFS.png",
                    fileName: "OGC_queryByWFS"
                }]
            }
        }
    },
    "plot": {
        name: "动态标绘",
        name_en: "Plot",
        content: {
            "basic": {
                name: "标绘",
                name_en: "Basic",
                content: [{
                    name: "动态标绘",
                    name_en: "dynamic plot",
                    thumbnail: "plot_dynamicPlot.png",
                    fileName: "plot_dynamicPlot"

                }, {
                    name: "图层操作",
                    name_en: "layer operations",
                    thumbnail: "plot_operatePlottingLayer.png",
                    fileName: "plot_operatePlottingLayer"
                }, {
                    name: "图层编辑",
                    name_en: "layer editing",
                    thumbnail: "plot_editPlottingLayer.png",
                    fileName: "plot_editPlottingLayer"
                }, {
                    name: "鼠标标绘",
                    name_en: "plot symbol",
                    thumbnail: "plot_plotSymbol.png",
                    fileName: "plot_plotSymbol"
                }, {
                    name: "点线面绘制",
                    name_en: "draw",
                    thumbnail: "plot_drawGeoGraphicObject.png",
                    fileName: "plot_drawGeoGraphicObject"
                }, {
                    name: "属性修改",
                    name_en: "modify symbol style",
                    thumbnail: "plot_modifySymbolStyle.png",
                    fileName: "plot_modifySymbolStyle"
                }, {
                    name: "缺省属性",
                    name_en: "default symbol style",
                    thumbnail: "plot_defaultStyle.png",
                    fileName: "plot_defaultStyle"
                }, {
                    name: "自定义属性",
                    name_en: "extend symbol properties",
                    thumbnail: "plot_symbolExtendProperty.png",
                    fileName: "plot_symbolExtendProperty"
                }, {
                    name: "查询标号",
                    name_en: "query symbol",
                    thumbnail: "plot_querySymbolLib.png",
                    fileName: "plot_querySymbolLib"
                }, {
                    name: "编辑器",
                    name_en: "symbol editor",
                    thumbnail: "plot_symbolEditor.png",
                    fileName: "plot_symbolEditor"
                }, {
                    name: "标号库加载",
                    name_en: "load symbol library",
                    thumbnail: "plot_loadSymbolLib.png",
                    fileName: "plot_loadSymbolLib"
                }]
            },
            "trendMap": {
                name: "态势图",
                name_en: "Trend plot",
                content: [{
                    name: "保存和加载",
                    name_en: "save and load",
                    thumbnail: "plot_saveload.png",
                    fileName: "plot_saveload"
                }, {
                    name: "态势图叠加",
                    name_en: "add plot symbol file",
                    thumbnail: "plot_addfile.png",
                    fileName: "plot_addfile"
                }, {
                    name: "态势图上传下载",
                    name_en: "plot symbol file upload and download",
                    thumbnail: "plot_filetransfer.png",
                    fileName: "plot_filetransfer"
                },]
            },
            "other": {
                name: "其他",
                name_en: "Others",
                content: [{
                    name: "几何查询",
                    name_en: "symbol geometry query",
                    thumbnail: "plot_symbolGeometricQuery.png",
                    fileName: "plot_symbolGeometricQuery"
                }, {
                    name: "动态标绘高性能图层",
                    name_en: "high-performance plot",
                    thumbnail: "plot_plotSymbolPerformance.png",
                    fileName: "plot_plotSymbolPerformance"
                }, {
                    name: "态势推演",
                    name_en: "situation deduction",
                    thumbnail: "plot_plotGOAnimation.png",
                    fileName: "plot_plotGOAnimation"
                }, {
                    name: "复杂对象",
                    name_en: "draw graphics",
                    thumbnail: "plot_drawGraphics.png",
                    fileName: "plot_drawGraphics"
                }, {
                    name: "避让区域",
                    name_en: "symbol avoid",
                    thumbnail: "plot_symbolAvoid.png",
                    fileName: "plot_symbolAvoid"
                }, {
                    name: "航线",
                    name_en: "draw route",
                    thumbnail: "plot_drawRoute.png",
                    fileName: "plot_drawRoute"
                }]
            }
        }
    },
    "others": {
        name: "其它",
        name_en: "Others",
        content: {
            "otherFeatures": {
                name: "其它功能",
                name_en: "Other features",
                content: [{
                    name: "地图打印",
                    name_en: "map print",
                    thumbnail: "others_mapPrint.png",
                    fileName: "others_mapPrint"
                }, {
                    name: "地图截图",
                    name_en: "print screen",
                    thumbnail: "others_printscreen.png",
                    fileName: "others_printscreen"
                }, {
                    name: "地图A0大幅打印",
                    name_en: "map A0 print",
                    thumbnail: "others_a0mapPrint.png",
                    fileName: "others_a0mapPrint"
                }, {
                    name: "投影转换",
                    name_en: "projection",
                    thumbnail: "others_projection.png",
                    fileName: "others_projection"
                }, {
                    name: "子图层控制",
                    name_en: "layer status",
                    thumbnail: "others_setlayerstatus.png",
                    fileName: "others_setlayerstatus"
                }, {
                    name: "图层组控制",
                    name_en: "layer group",
                    thumbnail: "others_layerGroup.png",
                    fileName: "others_layerGroup"
                }, {
                    name: "鼠标样式",
                    name_en: "mouse style",
                    thumbnail: "others_mousestyle.png",
                    fileName: "others_mousestyle"
                }, {
                    name: "自定义右键菜单",
                    name_en: "context menu",
                    thumbnail: "others_contextMenu.png",
                    fileName: "others_contextMenu"
                }, {
                    name: "标记图层右键事件",
                    name_en: "right click",
                    thumbnail: "others_rightClick.png",
                    fileName: "others_rightClick"
                }, {
                    name: "要素右键菜单",
                    name_en: "feature right click",
                    thumbnail: "others_featureRightClick.png",
                    fileName: "others_featureRightClick"
                }, {
                    name: "jquery右键菜单",
                    name_en: "jquery context menu",
                    thumbnail: "others_jqueryContextMenu.png",
                    fileName: "others_jqueryContextMenu"
                }]
            },
            "othersShows": {
                name: "其它展示",
                name_en: "Others shows",
                content: [{
                    name: "WebGL Globe数据展示",
                    name_en: "WebGL Globe",
                    thumbnail: "others_dataWebGL.png",
                    fileName: "others_dataWebGL"
                }, {
                    name: "D3风向图",
                    name_en: "D3 wind map",
                    thumbnail: "others_d3_windmap.png",
                    fileName: "others_d3_windmap"
                }, {
                    name: "卷帘",
                    name_en: "roller blinds",
                    thumbnail: "others_layerSwitch.png",
                    fileName: "others_layerSwitch"
                }, {
                    name: "D3拾取器",
                    name_en: "D3 picker",
                    thumbnail: "others_d3_zoomablePacking.png",
                    fileName: "others_d3_zoomablePacking"
                }, {
                    name: "动态饼图",
                    name_en: "dynamic pie chart",
                    thumbnail: "others_d3_dynamicPieChart.png",
                    fileName: "others_d3_dynamicPieChart"
                }, {
                    name: "eChart柱状图",
                    name_en: "eChart bar chart",
                    thumbnail: "others_echart_graphBar.png",
                    fileName: "others_echart_graphBar"
                }, {
                    name: "OSMBuildings 添加geojson数据",
                    name_en: "OSMBuildings - add data",
                    thumbnail: "others_SM_OSMBuildings_addGeoJson.png",
                    fileName: "others_SM_OSMBuildings_addGeoJson"
                }, {
                    name: "OSMBuildings 绘制",
                    name_en: "OSMBuildings - draw",
                    thumbnail: "others_SM_OSMBuildings_DrawBuildings.png",
                    fileName: "others_SM_OSMBuildings_DrawBuildings"
                }, {
                    name: "OSMBuildings RestData",
                    name_en: "OSMBuildings - RestData",
                    thumbnail: "others_SM_OSMBuildings_RestData.png",
                    fileName: "others_SM_OSMBuildings_RestData"
                }, {
                    name: "获取经纬度坐标",
                    name_en: "OSMBuildings - coordinate transfer",
                    thumbnail: "others_coordTransfer.png",
                    fileName: "others_coordTransfer"
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
    "map": "fa-map-marker",
    "overlay": "fa-image",
    "control": "fa-cog",
    "popup": "fa-commenting-o",
    "query": "fa-search",
    "theme": " fa-area-chart",
    "analysis": "fa-leanpub",
    "viz": "fa-map",
    "OGC": "fa fa-globe",
    "plot": "fa-edit",
    "others": "fa-th-large",
};

/**
 *key值：为exampleConfig配置的key值
 *value值：fontawesome字体icon名
 *与sideBarIconConfig的区别：sideBarIconConfig包括侧边栏所有层级目录的图标，exampleIconConfig仅包括一级标题的图标
 */
var exampleIconConfig = {
    "map": "fa-map-marker",
    "overlay": "fa-image",
    "control": "fa-cog",
    "popup": "fa-commenting-o",
    "query": "fa-search",
    "theme": " fa-area-chart",
    "analysis": "fa-leanpub",
    "viz": "fa-map",
    "OGC": "fa fa-globe",
    "plot": "fa-edit",
    "others": "fa-th-large"
};
window.classicExampleConfig = exampleConfig;