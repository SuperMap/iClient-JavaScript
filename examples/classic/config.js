/**
 * classic 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var identification = {
    name: "iClient Classic"
};

var exampleConfig = {
    "map": {
        name: "地图",
        content: {
            "SuperMapLayer": {
                name: "SuperMap地图",
                content: [{
                    name: "4326底图",
                    thumbnail: "map_4326Map.png",
                    fileName: "map_4326Map"
                }, {
                    name: "3857底图",
                    thumbnail: "map_3857Map.png",
                    fileName: "map_3857Map"
                }, {
                    name: "平面坐标系图层",
                    thumbnail: "map_changchunMap.png",
                    fileName: "map_changchunMap"

                }, {
                    name: "SuperMap 云图层",
                    thumbnail: "map_cloudLayer.png",
                    fileName: "map_cloudLayer"
                }, {
                    name: "Image图层",
                    thumbnail: "map_image.png",
                    fileName: "map_image"
                }, {
                    name: "图层叠加",
                    thumbnail: "map_overlayLayer.png",
                    fileName: "map_overlayLayer"

                }, {
                    name: "动态图层",
                    thumbnail: "map_dynamiclayers.png",
                    fileName: "map_dynamiclayers"

                }]
            },
            "thirdParty": {
                name: "第三方地图",
                content: [{
                    name: "天地图",
                    thumbnail: "map_3tianditu.png",
                    fileName: "map_3tianditu"

                }, {
                    name: "百度",
                    thumbnail: "map_3baidu.png",
                    fileName: "map_3baidu"

                }, {
                    name: "google layer",
                    thumbnail: "map_3googlelayer.png",
                    fileName: "map_3googlelayer"

                }, {
                    name: "bing地图",
                    thumbnail: "map_3bing.png",
                    fileName: "map_3bing"

                }, {
                    name: "OSM",
                    thumbnail: "map_3osm.png",
                    fileName: "map_3osm"

                }]
            },
            "operation": {
                name: "地图操作",
                content: [{
                    name: "缩放与平移",
                    thumbnail: "map_translation.png",
                    fileName: "map_translation"

                }, {
                    name: "坐标转换",
                    thumbnail: "map_coordinate_transformation.png",
                    fileName: "map_coordinate_transformation"

                }, {
                    name: "地图事件",
                    thumbnail: "map_mapevent.png",
                    fileName: "map_mapevent"

                }, {
                    name: "设置缩放级别",
                    thumbnail: "map_zoomRange.png",
                    fileName: "map_zoomRange"

                }, {
                    name: "底图切换",
                    thumbnail: "map_toggleMaps.png",
                    fileName: "map_toggleMaps"

                }]
            }
        }
    },
    "overlay": {
        name: "覆盖物",
        content: {
            "vectorLayer": {
                name: "矢量图层",
                content: [{
                    name: "矢量图形数据",
                    thumbnail: "overlay_vectorLayerData.png",
                    fileName: "overlay_vectorLayerData"
                }, {
                    name: "标签矢量图层数据",
                    thumbnail: "overlay_labelVectorLayerData.png",
                    fileName: "overlay_labelVectorLayerData"
                }, {
                    name: "渐变色样式矢量图形数据",
                    thumbnail: "overlay_ombreStyleLayer.png",
                    fileName: "overlay_ombreStyleLayer"
                }, {
                    name: "矢量图层数据点击事件",
                    thumbnail: "overlay_vectorDataEvent.png",
                    fileName: "overlay_vectorDataEvent"
                }, {
                    name: "B样条曲线",
                    thumbnail: "overlay_splinesData.png",
                    fileName: "overlay_splinesData"
                }, {
                    name: "电信符号数据",
                    thumbnail: "overlay_telecomIconData.png",
                    fileName: "overlay_telecomIconData"
                }, {
                    name: "岛洞与多面",
                    thumbnail: "overlay_islandMultiPolygonData.png",
                    fileName: "overlay_islandMultiPolygonData"
                }, {
                    name: "Graphic图层符号绘制（一）",
                    thumbnail: "overlay_graphicSymbolData.png",
                    fileName: "overlay_graphicSymbolData"
                }, {
                    name: "Graphic图层符号绘制(二)",
                    thumbnail: "overlay_graphicSymbolData2.png",
                    fileName: "overlay_graphicSymbolData2"
                }, {
                    name: "Graphic图层符号绘制(三)",
                    thumbnail: "overlay_graphicSymbolData3.png",
                    fileName: "overlay_graphicSymbolData3"
                }]
            },
            "markerLayer": {
                name: "标记图层",
                content: [{
                    name: "标记图层",
                    thumbnail: "overlay_markerLayer.png",
                    fileName: "overlay_markerLayer"
                }, {
                    name: "标记图层支持的事件",
                    thumbnail: "overlay_markerLayerEvent.png",
                    fileName: "overlay_markerLayerEvent"
                }]
            },

        }
    },
    "control": {
        name: "控件",
        content: {
            "mapControl": {
                name: "地图类控件",
                content: [{
                    name: "缩放控件",
                    thumbnail: "controler_zoom.png",
                    fileName: "controler_zoom"
                }, {
                    name: "平移缩放控件",
                    thumbnail: "controler_panzoombar.png",
                    fileName: "controler_panzoombar"
                }, {
                    name: "拉框缩放控件",
                    thumbnail: "controler_zoomBox.png",
                    fileName: "controler_zoomBox"
                }, {
                    name: "地图基础操作控件",
                    thumbnail: "controler_navigation.png",
                    fileName: "controler_navigation"
                }, {
                    name: "layerswitcher",
                    thumbnail: "controler_layerswitcher.png",
                    fileName: "controler_layerswitcher"
                }, {
                    name: "鹰眼控件",
                    thumbnail: "controler_overviewmap.png",
                    fileName: "controler_overviewmap"
                }, {
                    name: "比例尺控件",
                    thumbnail: "controler_scaleline.png",
                    fileName: "controler_scaleline"
                }, {
                    name: "版权控件",
                    thumbnail: "controler_attribution.png",
                    fileName: "controler_attribution"
                }, {
                    name: "地图拖拽控件",
                    thumbnail: "controler_dragpan.png",
                    fileName: "controler_dragpan"
                }, {
                    name: "Geolocate",
                    thumbnail: "controler_geolocate.png",
                    fileName: "controler_geolocate"
                }, {
                    name: "控件皮肤切换",
                    thumbnail: "controler_changeControlsSkin.png",
                    fileName: "controler_changeControlsSkin"
                }]
            },
            "featureControl": {
                name: "要素类控件",
                content: [{
                    name: "点线面绘制",
                    thumbnail: "controler_drawGeometry.png",
                    fileName: "controler_drawGeometry"
                }, {
                    name: "要素编辑",
                    thumbnail: "controler_featureSnap.png",
                    fileName: "controler_featureSnap"
                }, {
                    name: "距离量算",
                    thumbnail: "controler_distanceMeasure.png",
                    fileName: "controler_distanceMeasure"
                }, {
                    name: "面积量算",
                    thumbnail: "controler_areaMeasure.png",
                    fileName: "controler_areaMeasure"
                }, {
                    name: "鼠标拖拽要素控件",
                    thumbnail: "controler_dragFeature.png",
                    fileName: "controler_dragFeature"
                }]
            }
        }
    },
    "popup": {
        name: "信息框",
        content: {
            "infoBox": {
                name: "信息框",
                content: [{
                    name: "简易信息框",
                    thumbnail: "popup_simplePopup.png",
                    fileName: "popup_simplePopup"
                }, {
                    name: "自适应信息框",
                    thumbnail: "popup_anchored.png",
                    fileName: "popup_anchored"
                }, {
                    name: "带阴影弹窗",
                    thumbnail: "popup_shadowPopup.png",
                    fileName: "popup_shadowPopup"
                }, {
                    name: "自定义信息框",
                    thumbnail: "popup_customPopup.png",
                    fileName: "popup_customPopup"
                }, {
                    name: "第三方信息框",
                    thumbnail: "popup_infoWindow.png",
                    fileName: "popup_infoWindow"
                }
                ]
            }
        }
    },
    "query": {
        name: "查询",
        content: {
            "mapQuery": {
                name: "地图查询",
                content: [{
                    name: "地图范围查询",
                    thumbnail: "query_queryByBounds.png",
                    fileName: "query_queryByBounds"
                }, {
                    name: "距离查询",
                    thumbnail: "query_queryByDistance.png",
                    fileName: "query_queryByDistance"
                }, {
                    name: "几何查询",
                    thumbnail: "query_queryByGeometry.png",
                    fileName: "query_queryByGeometry"
                }, {
                    name: "SQL查询",
                    thumbnail: "query_queryBySQL.png",
                    fileName: "query_queryBySQL"
                }, {
                    name: "查询交互",
                    thumbnail: "query_vectorLayerRegionName.png",
                    fileName: "query_vectorLayerRegionName"
                }]
            },
            "datasetQuery": {
                name: "数据集查询",
                content: [{
                    name: "ID 查询",
                    thumbnail: "query_getFeatureByIDs.png",
                    fileName: "query_getFeatureByIDs"
                }, {
                    name: "缓冲区查询",
                    thumbnail: "query_getFeatureByBuffer.png",
                    fileName: "query_getFeatureByBuffer"
                }, {
                    name: "几何查询",
                    thumbnail: "query_getFeatureByGeometry.png",
                    fileName: "query_getFeatureByGeometry"
                }, {
                    name: "数据集SQL查询",
                    thumbnail: "query_getFeatureBySQL.png",
                    fileName: "query_getFeatureBySQL"
                }, {
                    name: "数据集范围查询",
                    thumbnail: "query_getFeatureByBounds.png",
                    fileName: "query_getFeatureByBounds"
                }, {
                    name: "地物编辑",
                    thumbnail: "query_editFeature.png",
                    fileName: "query_editFeature"
                }, {
                    name: "字段查询统计",
                    thumbnail: "query_fieldStatistic.png",
                    fileName: "query_fieldStatistic"
                }, {
                    name: "数据服务栅格查询",
                    thumbnail: "query_gridInfosQuery.png",
                    fileName: "query_gridInfosQuery"
                }]
            }

        }
    },
    "theme": {
        name: "专题图",
        content: {
            "serviceTheme": {
                name: "服务器专题图",
                content: [{
                    name: "点密度专题图",
                    thumbnail: "theme_themeDotDensity.png",
                    fileName: "theme_themeDotDensity"
                }, {
                    name: "等级符号专题图",
                    thumbnail: "theme_themeGraduatedSymbol.png",
                    fileName: "theme_themeGraduatedSymbol"
                }, {
                    name: "统计专题图",
                    thumbnail: "theme_themeGraph.png",
                    fileName: "theme_themeGraph"
                }, {
                    name: "标签专题图",
                    thumbnail: "theme_themeLabel.png",
                    fileName: "theme_themeLabel"
                }, {
                    name: "范围分段专题图",
                    thumbnail: "theme_themeRange.png",
                    fileName: "theme_themeRange"
                }, {
                    name: "单值专题图",
                    thumbnail: "theme_themeUnique.png",
                    fileName: "theme_themeUnique"
                }, {
                    name: "栅格分段专题图",
                    thumbnail: "theme_themeGridRange.png",
                    fileName: "theme_themeGridRange"
                }, {
                    name: "栅格单值专题图",
                    thumbnail: "theme_themeGridUnique.png",
                    fileName: "theme_themeGridUnique"
                }]
            },
            "clientTheme": {
                name: "客户端专题图",
                content: [{
                    name: "标签专题图层",
                    thumbnail: "theme_themeLabelLayer.png",
                    fileName: "theme_themeLabelLayer"
                }, {
                    name: "单值专题图",
                    thumbnail: "theme_ctl_landuseUnique.png",
                    fileName: "theme_ctl_landuseUnique"
                }, {
                    name: "分段专题图",
                    thumbnail: "theme_ctl_popDensityRange.png",
                    fileName: "theme_ctl_popDensityRange"
                }, {
                    name: "空气质量指数专题图",
                    thumbnail: "theme_themePM2_5.png",
                    fileName: "theme_themePM2_5"
                }, {
                    name: "世界首都人口统计",
                    thumbnail: "theme_ctl_worldCapitalsGraphBar.png",
                    fileName: "theme_ctl_worldCapitalsGraphBar"
                }, {
                    name: "柱状图",
                    thumbnail: "theme_ctl_GraphBar.png",
                    fileName: "theme_ctl_GraphBar"
                }, {
                    name: "折线图",
                    thumbnail: "theme_ctl_GraphLine.png",
                    fileName: "theme_ctl_GraphLine"
                }, {
                    name: "饼图",
                    thumbnail: "theme_ctl_GraphPie.png",
                    fileName: "theme_ctl_GraphPie"
                }, {
                    name: "三维柱状图",
                    thumbnail: "theme_ctl_GraphBar3D.png",
                    fileName: "theme_ctl_GraphBar3D"
                }, {
                    name: "点状图",
                    thumbnail: "theme_ctl_GraphPoint.png",
                    fileName: "theme_ctl_GraphPoint"
                }, {
                    name: "环状图",
                    thumbnail: "theme_ctl_GraphRing.png",
                    fileName: "theme_ctl_GraphRing"
                }, {
                    name: "统计图表切换",
                    thumbnail: "theme_ctl_jingjinPopGraph.png",
                    fileName: "theme_ctl_jingjinPopGraph"
                }, {
                    name: "符号专题图",
                    thumbnail: "theme_ctl_RankSymbol.png",
                    fileName: "theme_ctl_RankSymbol"
                }]
            }
        }
    },
    "analysis": {
        name: "分析",
        content: {
            "spatialAnalyst": {
                name: "空间分析",
                content: [{
                    name: "缓冲区分析一",
                    thumbnail: "analysis_bufferAnalyst.png",
                    fileName: "analysis_bufferAnalyst"
                }, {
                    name: "缓冲区分析二",
                    thumbnail: "analysis_bufferQuery.png",
                    fileName: "analysis_bufferQuery"
                }, {
                    name: "泰森多边形",
                    thumbnail: "analysis_thiessenAnalyst.png",
                    fileName: "analysis_thiessenAnalyst"
                }, /*{
                    name: "叠加分析",
                    thumbnail: "analysis_overlayAnalystService.png",
                    fileName: "analysis_overlayAnalystService"
                },*/ {
                    name: "表面分析",
                    thumbnail: "analysis_surfaceAnalyst.png",
                    fileName: "analysis_surfaceAnalyst"
                }, {
                    name: "动态分段",
                    thumbnail: "analysis_dynamicSegmentation.png",
                    fileName: "analysis_dynamicSegmentation"
                }, {
                    name: "点定里程",
                    thumbnail: "analysis_routeCalculateMeasure.png",
                    fileName: "analysis_routeCalculateMeasure"
                }, {
                    name: "里程定点",
                    thumbnail: "analysis_routeLocatorPoint.png",
                    fileName: "analysis_routeLocatorPoint"
                }, /*{
                    name: "点密度插值分析",
                    thumbnail: "analysis_interpolationAnalystByDensity.png",
                    fileName: "analysis_interpolationAnalystByDensity"
                }, {
                    name: "反距离加权插值分析",
                    thumbnail: "analysis_interpolationAnalystByIDW.png",
                    fileName: "analysis_interpolationAnalystByIDW"
                }, {
                    name: "克吕金插值分析",
                    thumbnail: "analysis_interpolationAnalystByKriging.png",
                    fileName: "analysis_interpolationAnalystByKriging"
                },{
                    name: "径向基函数插值分析",
                    thumbnail: "analysis_interpolationAnalystByRBF.png",
                    fileName: "analysis_interpolationAnalystByRBF"
                }, {
                    name: "离散点插值分析",
                    thumbnail: "analysis_interpolationAnalystByGeometry.png",
                    fileName: "analysis_interpolationAnalystByGeometry"
                }, {
                    name: "地形曲率计算",
                    thumbnail: "analysis_terrainCurvatureCalculation.png",
                    fileName: "analysis_terrainCurvatureCalculation"
                }, {
                    name: "栅格代数运算",
                    thumbnail: "analysis_mathExpression.png",
                    fileName: "analysis_mathExpression"
                }, {
                    name: "核密度分析",
                    thumbnail: "analysis_densityKernelAnalyst.png",
                    fileName: "analysis_densityKernelAnalyst"
                },*/
                ]
            },
            "networkAnalyst": {
                name: "网络分析",
                content: [{
                    name: "最近设施分析 选址分区分析",
                    thumbnail: "analysis_closestFacilities.png",
                    fileName: "analysis_closestFacilities"
                }, {
                    name: "选址分区分析",
                    thumbnail: "analysis_findLocation.png",
                    fileName: "analysis_findLocation"
                }, {
                    name: "多旅行商分析",
                    thumbnail: "analysis_findMTSPPaths.png",
                    fileName: "analysis_findMTSPPaths"
                }, {
                    name: "多旅行商分析（综合应用）",
                    thumbnail: "analysis_findMTSPPathsAndTSPPaths.png",
                    fileName: "analysis_findMTSPPathsAndTSPPaths"
                }, {
                    name: "最佳路径分析",
                    thumbnail: "analysis_findPath.png",
                    fileName: "analysis_findPath"
                }, {
                    name: "旅行商分析",
                    thumbnail: "analysis_findTSPPaths.png",
                    fileName: "analysis_findTSPPaths"
                }, {
                    name: "服务区分析",
                    thumbnail: "analysis_serviceAreas.png",
                    fileName: "analysis_serviceAreas"
                },
                ]
            },
            "trafficTransferAnalyst": {
                name: "交通换乘",
                content: [{
                    name: "公交换乘服务",
                    thumbnail: "analysis_trafficTransfer.png",
                    fileName: "analysis_trafficTransfer"
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
                    thumbnail: "lg_singleObjectQueryJob.png",
                    fileName: "singleObjectQueryJobService"
                }, {
                    name: "叠加分析",
                    thumbnail: "lg_overlayJobService.png",
                    fileName: "overlayGeoJobService"
                }, {
                    name: "缓冲区分析",
                    thumbnail: "lg_buffersAnalystJobService.png",
                    fileName: "buffersAnalystJobService"
                }, {
                    name: "区域汇总分析",
                    thumbnail: "SummaryRegionJobService.png",
                    fileName: "SummaryRegionJobService"
                }, {
                    name: "矢量裁剪分析",
                    thumbnail: "lg_vectorClipJob.png",
                    fileName: "vectorClipJobService"
                }, {
                    name: "拓扑检查分析",
                    thumbnail: "lg_topologyValidatorJobService.png",
                    fileName: "topologyValidatorJobService"
                }]
            },
            "addressMatch": {
                name: "地址匹配",
                content: [{
                    name: "地址匹配",
                    thumbnail: "addressMatchService.png",
                    fileName: "addressMatchService"
                }]
            }

        }
    },
    "viz": {
        name: "可视化",
        content: {
            "vizLayer": {
                name: "可视化图层",
                content: [{
                    name: "热点图",
                    thumbnail: "vizLayer_heatmapLayer.png",
                    fileName: "vizLayer_heatmapLayer"
                }, {
                    name: "新版热点图",
                    thumbnail: "vizLayer_heatmapFastLayer.png",
                    fileName: "vizLayer_heatmapFastLayer"
                }, {
                    name: "热点图颜色分段配置",
                    thumbnail: "vizLayer_heatmapColorSection.png",
                    fileName: "vizLayer_heatmapColorSection"
                }, /*{
                    name: "热点图颜色手动配置",
                    thumbnail: "vizLayer_heatmapColorManual.png",
                    fileName: "vizLayer_heatmapColorManual"
                },*/ {
                    name: "热点网格图",
                    thumbnail: "vizLayer_heatGridLayer.png",
                    fileName: "vizLayer_heatGridLayer"
                }, {
                    name: "聚类图层",
                    thumbnail: "vizLayer_clusterLayer.png",
                    fileName: "vizLayer_clusterLayer"
                }, {
                    name: "UTFGrid图层",
                    thumbnail: "vizLayer_utfGridLayer.png",
                    fileName: "vizLayer_utfGridLayer"
                }, {
                    name: "UTFGrid国旗版",
                    thumbnail: "vizLayer_utfGridLayerFlags.png",
                    fileName: "vizLayer_utfGridLayerFlags"
                }, {
                    name: "麻点图",
                    thumbnail: "vizLayer_gois.png",
                    fileName: "vizLayer_gois"
                }, {
                    name: "Elements Layer 扩展",
                    thumbnail: "vizLayer_elements.png",
                    fileName: "vizLayer_elements"
                }]
            },
            "spaceTimeData": {
                name: "时空数据",
                content: [{
                    name: "基础渲染",
                    thumbnail: "vizLayer_animatorBase.png",
                    fileName: "vizLayer_animatorBase"
                }, {
                    name: "点渐变",
                    thumbnail: "vizLayer_animatorPoint.png",
                    fileName: "vizLayer_animatorPoint"
                }, {
                    name: "线渐变",
                    thumbnail: "vizLayer_animatorLine.png",
                    fileName: "vizLayer_animatorLine"
                }, {
                    name: "面渐变模拟",
                    thumbnail: "vizLayer_animatorPolygon.png",
                    fileName: "vizLayer_animatorPolygon"
                }, {
                    name: "火车监控模拟",
                    thumbnail: "vizLayer_animatorTrain.png",
                    fileName: "vizLayer_animatorTrain"
                }, {
                    name: "车辆监控模拟",
                    thumbnail: "vizLayer_animatorCar.png",
                    fileName: "vizLayer_animatorCar"
                }, {
                    name: "地铁修建模拟",
                    thumbnail: "vizLayer_animatorMetro.png",
                    fileName: "vizLayer_animatorMetro"
                }, {
                    name: "地铁修建模拟2",
                    thumbnail: "vizLayer_animatorMetro2.png",
                    fileName: "vizLayer_animatorMetro2"
                }, {
                    name: "气象监测",
                    thumbnail: "vizLayer_animatorWeatherMonitor.png",
                    fileName: "vizLayer_animatorWeatherMonitor"
                }, {
                    name: "春运模拟",
                    thumbnail: "vizLayer_animatorMigrate.png",
                    fileName: "vizLayer_animatorMigrate"
                }]
            },
            "vectorBlock": {
                name: "矢量分块",
                content: [{
                    name: "矢量分块图",
                    thumbnail: "vizLayer_tiledVectorLayer.png",
                    fileName: "vizLayer_tiledVectorLayer"
                }, {
                    name: "点符号",
                    thumbnail: "vizLayer_cartoCSS_point.png",
                    fileName: "vizLayer_cartoCSS_point"
                }, {
                    name: "线符号",
                    thumbnail: "vizLayer_cartoCSS_line.png",
                    fileName: "vizLayer_cartoCSS_line"
                }, {
                    name: "面符号",
                    thumbnail: "vizLayer_cartoCSS_polygon.png",
                    fileName: "vizLayer_cartoCSS_polygon"
                }, {
                    name: "文本符号",
                    thumbnail: "vizLayer_cartoCSS_text.png",
                    fileName: "vizLayer_cartoCSS_text"
                }, {
                    name: "高亮显示",
                    thumbnail: "vizLayer_cartoCSS_hightlight.png",
                    fileName: "vizLayer_cartoCSS_hightlight"
                }, {
                    name: "CartoCSS编辑",
                    thumbnail: "vizLayer_cartoCSS_edit.png",
                    fileName: "vizLayer_cartoCSS_edit"
                }, {
                    name: "强边界风格",
                    thumbnail: "vizLayer_cartoCSS_boundryStyle.png",
                    fileName: "vizLayer_cartoCSS_boundryStyle"
                }, {
                    name: "深夜蓝黑风格",
                    thumbnail: "vizLayer_cartoCSS_darkblueStyle.png",
                    fileName: "vizLayer_cartoCSS_darkblueStyle"
                }, {
                    name: "淡雅绿风格",
                    thumbnail: "vizLayer_cartoCSS_naturalStyle.png",
                    fileName: "vizLayer_cartoCSS_naturalStyle"
                }, {
                    name: "月夜风格",
                    thumbnail: "vizLayer_cartoCSS_nightStyle.png",
                    fileName: "vizLayer_cartoCSS_nightStyle"
                }, {
                    name: "Hellokitty风格",
                    thumbnail: "vizLayer_cartoCSS_helloKitty.png",
                    fileName: "vizLayer_cartoCSS_helloKitty"
                }]
            },
            "MapV": {
                name: "MapV",
                content: [{
                    name: "蜂巢图",
                    thumbnail: "lg_mapVLayer_honeycomb.png",
                    fileName: "mapVLayerHoneycomb"
                }, {
                    name: "简单线",
                    thumbnail: "lg_mapVLayer_polylineSimple.png",
                    fileName: "mapVLayerPolylineSimple"
                }]
            }

        }
    },
    "OGC": {
        name: "OGC",
        content: {
            "mapService": {
                name: "地图服务",
                content: [{
                    name: "WMTS图层",
                    thumbnail: "OGC_wmtsLayer.png",
                    fileName: "OGC_wmtsLayer"
                }, {
                    name: "WCS图层",
                    thumbnail: "OGC_wcs.png",
                    fileName: "OGC_wcs"
                }, {
                    name: "WMS图层",
                    thumbnail: "OGC_wms.png",
                    fileName: "OGC_wms"
                }]
            },
            "dataService": {
                name: "数据服务",
                content: [{
                    name: "kml",
                    thumbnail: "OGC_kml.png",
                    fileName: "OGC_kml"
                }, {
                    name: "GeoJSON数据展示",
                    thumbnail: "OGC_GeoJSON.png",
                    fileName: "OGC_GeoJSON"
                }, {
                    name: "WFS 查询",
                    thumbnail: "OGC_queryByWFS.png",
                    fileName: "OGC_queryByWFS"
                }]
            }
        }
    },
    "plot": {
        name: "动态标绘",
        content: {
            "plot": {
                name: "标绘",
                content: [/*{
                    name: "动态标绘",
                    thumbnail: "plot_dynamicPlot.png",
                    fileName: "plot_dynamicPlot"
                    //todo 迁插件迁的头大
                }, */{
                    name: "图层操作",
                    thumbnail: "plot_operatePlottingLayer.png",
                    fileName: "plot_operatePlottingLayer"
                }, {
                    name: "图层编辑",
                    thumbnail: "plot_editPlottingLayer.png",
                    fileName: "plot_editPlottingLayer"
                }, /*{
                    name: "鼠标标绘",
                    thumbnail: "plot_plotSymbol.png",
                    fileName: "plot_plotSymbol"
                    //todo 插件与bootstrap冲突
                }, */{
                    name: "点线面绘制",
                    thumbnail: "plot_drawGeoGraphicObject.png",
                    fileName: "plot_drawGeoGraphicObject"
                }, /*{
                    name: "属性修改",
                    thumbnail: "plot_modifySymbolStyle.png",
                    fileName: "plot_modifySymbolStyle"
                }, {
                    name: "缺省属性",
                    thumbnail: "plot_defaultStyle.png",
                    fileName: "plot_defaultStyle"
                }, */{
                    name: "自定义属性",
                    thumbnail: "plot_symbolExtendProperty.png",
                    fileName: "plot_symbolExtendProperty"
                }, {
                    name: "查询标号",
                    thumbnail: "plot_querySymbolLib.png",
                    fileName: "plot_querySymbolLib"
                }, {
                    name: "编辑器",
                    thumbnail: "plot_symbolEditor.png",
                    fileName: "plot_symbolEditor"
                }, {
                    name: "标号库加载",
                    thumbnail: "plot_loadSymbolLib.png",
                    fileName: "plot_loadSymbolLib"
                }]
            }
        }
    },
    "others": {
        name: "其它",
        content: {
            "othersOperation": {
                name: "其它操作",
                content: [{
                    name: "地图打印",
                    thumbnail: "others_mapPrint.png",
                    fileName: "others_mapPrint"
                }, {
                    name: "地图截图",
                    thumbnail: "others_printscreen.png",
                    fileName: "others_printscreen"
                }, {
                    name: "地图A0大幅打印",
                    thumbnail: "others_a0mapPrint.png",
                    fileName: "others_a0mapPrint"
                }, {
                    name: "投影转换",
                    thumbnail: "others_projection.png",
                    fileName: "others_projection"
                }, {
                    name: "子图层控制",
                    thumbnail: "others_setlayerstatus.png",
                    fileName: "others_setlayerstatus"
                }, {
                    name: "图层组控制",
                    thumbnail: "others_layerGroup.png",
                    fileName: "others_layerGroup"
                }, {
                    name: "鼠标样式",
                    thumbnail: "others_mousestyle.png",
                    fileName: "others_mousestyle"
                }, {
                    name: "自定义右键菜单",
                    thumbnail: "others_contextMenu.png",
                    fileName: "others_contextMenu"
                }, {
                    name: "标记图层右键事件",
                    thumbnail: "others_rightClick.png",
                    fileName: "others_rightClick"
                }, {
                    name: "要素右键菜单",
                    thumbnail: "others_featureRightClick.png",
                    fileName: "others_featureRightClick"
                }, {
                    name: "jquery右键菜单",
                    thumbnail: "others_jqueryContextMenu.png",
                    fileName: "others_jqueryContextMenu"
                }]
            },
            "othersShow": {
                name: "其它展示",
                content: [{
                    name: "WebGL Globe数据展示",
                    thumbnail: "others_dataWebGL.png",
                    fileName: "others_dataWebGL"
                }, {
                    name: "D3风向图",
                    thumbnail: "others_d3_windmap.png",
                    fileName: "others_d3_windmap"
                }, {
                    name: "卷帘",
                    thumbnail: "others_layerSwitch.png",
                    fileName: "others_layerSwitch"
                }, {
                    name: "D3拾取器",
                    thumbnail: "others_d3_zoomablePacking.png",
                    fileName: "others_d3_zoomablePacking"
                }, {
                    name: "动态饼图",
                    thumbnail: "others_d3_dynamicPieChart.png",
                    fileName: "others_d3_dynamicPieChart"
                }, {
                    name: "eChart柱状图",
                    thumbnail: "others_echart_graphBar.png",
                    fileName: "others_echart_graphBar"
                }, {
                    name: "OSMBuildings AddData",
                    thumbnail: "others_SM_OSMBuildings_addGeoJson.png",
                    fileName: "others_SM_OSMBuildings_addGeoJson"
                }, {
                    name: "OSMBuildings 绘制",
                    thumbnail: "others_SM_OSMBuildings_DrawBuildings.png",
                    fileName: "others_SM_OSMBuildings_DrawBuildings"
                }, {
                    name: "OSMBuildings Rest",
                    thumbnail: "others_SM_OSMBuildings_RestData.png",
                    fileName: "others_SM_OSMBuildings_RestData"
                }, {
                    name: "获取经纬度坐标",
                    thumbnail: "others_coordTransfer.png",
                    fileName: "others_coordTransfer"
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
    "others": "fa-th-large",
};