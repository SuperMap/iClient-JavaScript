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
    },
    "viz": {
        name: "可视化",
        content: {
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
    "control": "fa-cog",
    "OGC": "fa fa-globe",
    "theme": " fa-area-chart",
    "others": "fa-th-large",
    "viz": "fa-map"

};

/**
 *key值：为exampleConfig配置的key值
 *value值：fontawesome字体icon名
 *与sideBarIconConfig的区别：sideBarIconConfig包括侧边栏所有层级目录的图标，exampleIconConfig仅包括一级标题的图标
 */
var exampleIconConfig = {
    "map": "fa-map-marker",
    "control": "fa-cog",
    "OGC": "fa fa-globe",
    "theme": " fa-area-chart",
    "others": "fa-th-large",
    "viz": "fa-map"
};