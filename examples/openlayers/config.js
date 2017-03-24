/**
 * OpenLayers 示例配置文件：包括示例的分类、名称、缩略图、文件路径
 */
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
                    name: "测量",
                    thumbnail: "ol_measure.png",
                    fileName: "01_measure"
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
                }]
            },
            "networkAnalyst": {
                name: "网络分析",
                content: [{
                    name: "服务区分析",
                    thumbnail: "ol_findServiceAreas.png",
                    fileName: "05_findServiceAreas"
                }]
            },
            "trafficTransferAnalyst": {
                name: "交通换乘",
                content: null
            }
        }
    },
    "iPortal": {
        name: "iPortal",
        content: null
    },
    "online": {
        name: "online",
        content: null
    },
    "iManager": {
        name: "iManager",
        content: null
    },
    "plot": {
        name: "标绘",
        content: {
            "draw": {
                name: "点线面绘制",
                content: null
            },
            "drawPlot": {
                name: "动态标绘",
                content: null
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
            // "D3": {
            //     name: "D3-单值专题图",
            //     content: [{
            //         name: "D3-单值专题图",
            //         content: null
            //     }]
            // },
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

            }
        }
    },
    "OGC": {
        name: "OGC",
        content: null
    }
}