/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.*/
/**
 * MapboxGL 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var identification = {
    name: 'MapboxGL'
};

var exampleConfig = {
    iServer: {
        name: 'iServer',
        name_en: 'iServer',
        content: {
            map: {
                name: '地图',
                name_en: 'Map service',
                content: [
                    {
                        name: '3857底图',
                        name_en: '3857 coordinate system',
                        thumbnail: 'mb_TileLayer.png',
                        fileName: '01_tiledMapLayer'
                    },
                    {
                        name: '地图-栅格分析',
                        name_en: 'map rasterFunction',
                        version: '10.0.0',
                        thumbnail: 'tiledMapLayerRasterfunction.png',
                        fileName: '01_tiledMapLayer_rasterfunction'
                    },
                    {
                        name: '地图信息',
                        name_en: 'map query service',
                        thumbnail: 'mb_mapService.png',
                        fileName: '01_mapService'
                    },
                    {
                        name: '距离测量',
                        name_en: 'distance measurement service',
                        thumbnail: 'mb_measure-distance.png',
                        fileName: '01_measure_distance'
                    },
                    {
                        name: '面积测量',
                        name_en: 'area measurement service',
                        thumbnail: 'mb_measure-area.png',
                        fileName: '01_measure_area'
                    },
                    {
                        name: '范围查询',
                        name_en: 'bounds query',
                        thumbnail: 'mb_mapQueryByBounds.png',
                        fileName: '01_mapQueryByBounds'
                    },
                    {
                        name: '距离查询',
                        name_en: 'distance query',
                        thumbnail: 'mb_mapQueryByDistance.png',
                        fileName: '01_mapQueryByDistance'
                    },
                    {
                        name: '几何查询',
                        name_en: 'geometry query',
                        thumbnail: 'mb_mapQueryByGeometry.png',
                        fileName: '01_mapQueryByGeometry'
                    },
                    {
                        name: 'SQL查询',
                        name_en: 'SQL query',
                        thumbnail: 'mb_mapQueryBySQL.png',
                        fileName: '01_mapQueryBySQL'
                    },
                    {
                      name: 'SQL查询 (FGB)',
                      name_en: 'SQL query (FGB)',
                      version: '11.1.0',
                      thumbnail: 'query_fgb_features.png',
                      fileName: '01_mapQueryBySQL_FGB'
                    }
                ]
            },
            data: {
                name: '数据',
                name_en: 'Data service',
                content: [
                    {
                        name: 'ID查询',
                        name_en: 'ID query',
                        thumbnail: 'mb_getFeatureByIDs.png',
                        fileName: '02_getFeatureByIDs'
                    },
                    {
                        name: 'SQL查询',
                        name_en: 'SQL query',
                        thumbnail: 'mb_getFeatureBySQL.png',
                        fileName: '02_getFeatureBySQL'
                    },
                    {
                      name: 'SQL查询 (FGB)',
                      name_en: 'SQL query (FGB)',
                      version: '11.1.0',
                      thumbnail: 'query_fgb_features.png',
                      fileName: '02_getFeatureBySQL_FGB'
                    },
                    {
                        name: '范围查询',
                        name_en: 'bounds query',
                        thumbnail: 'mb_getFeatureByBounds.png',
                        fileName: '02_getFeatureByBounds'
                    },
                    {
                        name: '几何查询',
                        name_en: 'geometry query',
                        thumbnail: 'mb_getFeatureByGeometry.png',
                        fileName: '02_getFeatureByGeometry'
                    },
                    {
                        name: '缓冲区查询',
                        name_en: 'buffer query',
                        thumbnail: 'mb_getFeatureByBuffer.png',
                        fileName: '02_getFeatureByBuffer'
                    },
                    {
                        name: '栅格查询',
                        name_en: 'data gridcell query',
                        thumbnail: 'mb_getGridCellInfos.png',
                        fileName: '02_getGridCellInfos'
                    },
                    {
                        name: '字段信息',
                        name_en: 'field service',
                        thumbnail: 'mb_fieldsService.png',
                        fileName: '02_fieldsService'
                    },
                    {
                        name: '字段查询统计',
                        name_en: 'field statistics service',
                        thumbnail: 'mb_fieldStatistics.png',
                        fileName: '02_fieldStatistics'
                    },
                    {
                        name: '地物编辑',
                        name_en: 'data editing',
                        thumbnail: 'mb_editFeatures.png',
                        fileName: '02_editFeatures'
                    },
                    {
                        name: '数据源信息查询',
                        name_en: 'datasource information service',
                        thumbnail: '02_datasourceService.png',
                        fileName: '02_datasourceService'
                    },
                    {
                        name: '数据集信息查询',
                        name_en: 'dataset information service',
                        thumbnail: '02_datasetService.png',
                        fileName: '02_datasetService'
                    }
                ]
            },
            theme: {
                name: '专题图',
                name_en: 'Server thematic service',
                content: [
                    {
                        name: '点密度专题图',
                        name_en: 'dot density',
                        thumbnail: 'mb_themeDotDensity.png',
                        fileName: '03_themeDotDensity'
                    },
                    {
                        name: '等级符号专题图',
                        name_en: 'graduated symbol',
                        thumbnail: 'mb_themeGraduatedSymbol.png',
                        fileName: '03_themeGraduatedSymbol'
                    },
                    {
                        name: '统计专题图',
                        name_en: 'statistical chart',
                        thumbnail: 'mb_themeGraph.png',
                        fileName: '03_themeGraph'
                    },
                    {
                        name: '标签专题图',
                        name_en: 'label',
                        thumbnail: 'mb_themeLabel.png',
                        fileName: '03_themeLabel'
                    },
                    {
                        name: '分段专题图',
                        name_en: 'range',
                        thumbnail: 'mb_themeRange.png',
                        fileName: '03_themeRange'
                    },
                    {
                        name: '单值专题图',
                        name_en: 'unique',
                        thumbnail: 'mb_themeUnique.png',
                        fileName: '03_themeUnique'
                    },
                    {
                        name: '栅格分段专题图',
                        name_en: 'grid range',
                        thumbnail: 'mb_themeGridRange.png',
                        fileName: '03_themeGridRange'
                    },
                    {
                        name: '栅格单值专题图',
                        name_en: 'grid unique',
                        thumbnail: 'mb_themeGridUnique.png',
                        fileName: '03_themeGridUnique'
                    }
                ]
            },
            spatialAnalyst: {
                name: '空间分析',
                name_en: 'Spatial analysis service',
                content: [
                    {
                        name: '数据集缓冲区分析',
                        name_en: 'buffer',
                        thumbnail: 'mb_bufferAnalystService.png',
                        fileName: '04_bufferAnalystService'
                    },
                    {
                      name: '数据集缓冲区分析 (FGB)',
                      name_en: 'buffer (FGB)',
                      version: '11.1.0',
                      thumbnail: 'mb_bufferAnalystService.png',
                      fileName: '04_bufferAnalystService_FGB'
                    },
                    {
                        name: '几何对象缓冲区分析',
                        name_en: 'buffer-geometry',
                        thumbnail: 'mb_bufferAnalystService_geometry.png',
                        fileName: '04_bufferAnalystService_geometry'
                    },
                    {
                      name: '几何对象缓冲区分析 (FGB)',
                      name_en: 'buffer-geometry (FGB)',
                      version: '11.1.0',
                      thumbnail: 'mb_bufferAnalystService_geometry.png',
                      fileName: '04_bufferAnalystService_geometry_FGB'
                    },
                    {
                        name: '数据集泰森多边形',
                        name_en: 'thiessen-dataset',
                        thumbnail: 'mb_thiessenAnalystService-datasets.png',
                        fileName: '04_thiessenAnalystService_datasets'
                    },
                    {
                      name: '数据集泰森多边形 (FGB)',
                      name_en: 'thiessen-dataset (FGB)',
                      version: '11.1.0',
                      thumbnail: 'mb_thiessenAnalystService-datasets.png',
                      fileName: '04_thiessenAnalystService_datasets_FGB'
                    },
                    {
                        name: '几何泰森多边形',
                        name_en: 'thiessen-geometry',
                        thumbnail: 'mb_thiessenAnalystService-geometry.png',
                        fileName: '04_thiessenAnalystService_geometry'
                    },
                    {
                      name: '几何泰森多边形 (FGB)',
                      name_en: 'thiessen-geometry (FGB)',
                      version: '11.1.0',
                      thumbnail: 'mb_thiessenAnalystService-geometry.png',
                      fileName: '04_thiessenAnalystService_geometry_FGB'
                    },
                    {
                        name: '叠加分析',
                        name_en: 'overlay',
                        thumbnail: 'mb_overlayAnalystService.png',
                        fileName: '04_overlayAnalystService'
                    },
                    {
                      name: '叠加分析 (FGB)',
                      name_en: 'overlay (FGB)',
                      version: '11.1.0',
                      thumbnail: 'mb_overlayAnalystService.png',
                      fileName: '04_overlayAnalystService_FGB'
                    },
                    {
                        name: '地形曲率计算',
                        name_en: 'terrain curvature calculation',
                        thumbnail: 'mb_terrainCurvatureCalculationService.png',
                        fileName: '04_terrainCurvatureCalculationService'
                    },
                    {
                        name: '栅格代数运算',
                        name_en: 'math expression',
                        thumbnail: 'mb_mathExpressionAnalysisService.png',
                        fileName: '04_mathExpressionAnalysisService'
                    },
                    {
                        name: '点定里程',
                        name_en: 'route calculate measure',
                        thumbnail: 'mb_routeCalculateMeasureService.png',
                        fileName: '04_routeCalculateMeasureService'
                    },
                    {
                        name: '里程定点',
                        name_en: 'route locator - point',
                        thumbnail: 'mb_routeLocatorService_point.png',
                        fileName: '04_routeLocatorService_point'
                    },
                    {
                        name: '里程定线',
                        name_en: 'route locator - line',
                        thumbnail: 'mb_routeLocatorService_line.png',
                        fileName: '04_routeLocatorService_line'
                    },
                    {
                        name: '几何对象批量空间分析',
                        name_en: 'batchAnalyst_geometry',
                        thumbnail: 'mb_geometryBatchAnalystService.png',
                        fileName: '04_geometryBatchAnalystService'
                    },
                    {
                        name: '几何对象批量叠加分析',
                        name_en: 'overlayBatchAnalyst_geometry',
                        thumbnail: 'mb_geometryOverlayBatchAnalystService.png',
                        fileName: '04_geometryOverlayBatchAnalystService'
                    }
                ]
            },
            addressMatch: {
                name: '地址匹配',
                name_en: 'Address matching service',
                content: [
                    {
                        name: '地址匹配',
                        name_en: 'address match',
                        thumbnail: 'mb_addressService.png',
                        fileName: 'addressMatchService'
                    }
                ]
            },
            dataFlow: {
                name: '数据流',
                name_en: 'Data flow service',
                content: [
                    {
                        name: '数据流',
                        name_en: 'data flow',
                        thumbnail: 'dataflow.gif',
                        fileName: 'dataFlowService'
                    }
                ]
            },
            webPrinting: {
                name: 'Web 打印',
                name_en: 'Web printing',
                content: [
                    {
                        name: 'Web 地图打印',
                        name_en: 'web map print',
                        version: '10.1.0',
                        thumbnail: 'webPrintingJob.png',
                        fileName: 'webPrintingJob'
                    }
                ]
            },
            processingService: {
                name: '分布式分析',
                name_en: 'Distributed analysis service',
                content: [
                    {
                        name: '密度分析',
                        name_en: 'density',
                        thumbnail: 'mb_kernelDensityJobService.png',
                        fileName: 'kernelDensityJobService'
                    },
                    {
                        name: '点聚合分析',
                        name_en: 'mesh summary',
                        thumbnail: 'mb_SummaryMeshJobService.png',
                        fileName: 'SummaryMeshJobService'
                    },
                    {
                        name: '单对象查询分析',
                        name_en: 'single object query',
                        thumbnail: 'mb_singleObjectQueryJob.png',
                        fileName: 'singleObjectQueryJobService'
                    },
                    {
                        name: '叠加分析',
                        name_en: 'overlay',
                        thumbnail: 'mb_overlayJobService.png',
                        fileName: 'overlayGeoJobService'
                    },
                    {
                        name: '缓冲区分析',
                        name_en: 'buffer',
                        thumbnail: 'mb_buffersAnalystJobService.png',
                        fileName: 'buffersAnalystJobService'
                    },
                    {
                        name: '区域汇总分析',
                        name_en: 'regional summary',
                        thumbnail: 'mb_SummaryRegionJobService.png',
                        fileName: 'SummaryRegionJobService'
                    },
                    {
                        name: '矢量裁剪分析',
                        name_en: 'vector clip',
                        thumbnail: 'mb_vectorClipJob.png',
                        fileName: 'vectorClipJobService'
                    },
                    {
                        name: '属性汇总分析',
                        name_en: 'summary attributes',
                        thumbnail: 'mb_summaryAttributes.png',
                        fileName: 'summaryAttributesJobService'
                    },
                    {
                        name: '拓扑检查分析',
                        name_en: 'topology validator',
                        thumbnail: 'mb_topologyValidatorJobService.png',
                        fileName: 'topologyValidatorJobService'
                    }
                ]
            },
            machinelearning: {
                name: '机器学习结果叠加',
                name_en: 'Machine Learning Result Overlay',
                content: [
                    {
                        name: '二元分类结果叠加',
                        name_en: 'Binary Classification Result Overlay',
                        version: '10.1.0',
                        thumbnail: 'machinelearning_binaryclassification.png',
                        fileName: 'machinelearning_binaryclassification'
                    },
                    {
                        name: '目标检测结果叠加',
                        name_en: 'Object Detection Result Overlay',
                        version: '10.1.0',
                        thumbnail: 'machinelearning_objectdetection.png',
                        fileName: 'machinelearning_objectdetection'
                    }
                    // ,
                    // {
                    //     name: "地物分类",
                    //     name_en: "Landcover Classification",
                    //     version: "10.1.0",
                    //     thumbnail: "machinelearning_landcoverclassification.png",
                    //     fileName: "machinelearning_landcoverclassification"
                    // }
                ]
            },
            image: {
              name: "影像服务",
              name_en: "Image service",
              content: [
                  {
                      name: "影像服务",
                      name_en: "Image Service",
                      version: "10.2.0",
                      thumbnail: "imageService.png",
                      fileName: "imageService"
                  }
              ]
            },
            KnowledgeGraph: {
              name: '知识图谱',
              name_en: 'KnowledgeGraph',
              version: '11.1.0',
              content: [
                  {
                      name: '不动产图谱',
                      name_en: 'Real Estate GraphMap',
                      version: '11.1.0',
                      thumbnail: 'knowledgeGraphMap.png',
                      fileName: 'knowledgeGraphMap'
                  },
                  {
                    name: '河流流经省份图谱',
                    name_en: 'Rivers flowing through provinces GraphMap',
                    version: '11.1.0',
                    thumbnail: 'knowledgeGraphMap1.png',
                    fileName: 'knowledgeGraphMap1'
                }
              ]
            }
        }
    },
    iPortal: {
        name: 'iPortal',
        name_en: 'iPortal',
        version: '9.1.2',
        content: {
            ip_map: {
                name: '地图',
                name_en: 'iPortal Web map',
                version: '9.1.2',
                content: [
                    {
                        name: '分段专题图',
                        name_en: 'Range',
                        version: '9.1.2',
                        thumbnail: 'iPortalWebmap_range.png',
                        fileName: 'iPortalWebmap_range'
                    },
                    {
                        name: '单值专题图',
                        name_en: 'Unique',
                        version: '9.1.2',
                        thumbnail: 'iPortalWebmap_unique.png',
                        fileName: 'iPortalWebmap_unique'
                    },
                    {
                        name: '标签专题图',
                        name_en: 'Label',
                        version: '9.1.2',
                        thumbnail: 'iPortalWebmap_label.png',
                        fileName: 'iPortalWebmap_label'
                    },
                    {
                        name: '热力图',
                        name_en: 'Heat map',
                        version: '9.1.2',
                        thumbnail: 'iPortalWebmap_heat.png',
                        fileName: 'iPortalWebmap_heat'
                    },
                    {
                        name: '点样式',
                        name_en: 'Point style',
                        version: '9.1.2',
                        thumbnail: 'iPortalWebmap_unicode.png',
                        fileName: 'iPortalWebmap_unicode'
                    }
                ]
            }
        }
    },
    viz: {
        name: '可视化',
        name_en: 'Visualization',
        content: {
            heat: {
                name: '热力图',
                name_en: 'Heat map',
                version: '9.1.0',
                content: [
                    {
                        name: '随机点',
                        name_en: 'random points',
                        version: '10.1.0',
                        thumbnail: 'mb_heatMapLayer.png',
                        fileName: 'heatmaplayer_mbgl'
                    },
                    {
                        name: '随机点 (Classic)',
                        name_en: 'random points (Classic)',
                        version: '9.1.0',
                        thumbnail: 'mb_heatMapLayer.png',
                        fileName: 'heatMapLayer'
                    }
                ]
            },
            VectorTileLayer: {
                name: '矢量瓦片',
                name_en: 'Vector tile',
                content: [
                    {
                        name: 'China',
                        name_en: 'China',
                        thumbnail: 'mvtVectorTile.png',
                        fileName: 'mvtVectorTile'
                    },
                    {
                        name: '北京',
                        name_en: 'Beijing',
                        localIgnore: true,
                        thumbnail: 'mvt_Beijing.png',
                        fileName: 'mvtVectorTile_Beijing'
                    },
                    {
                        name: '北京-暗夜风格',
                        name_en: 'Beijing - dark-blue style',
                        localIgnore: true,
                        thumbnail: 'mvt_Beijing_dark.png',
                        fileName: 'mvtVectorTile_Beijing_dark'
                    },
                    {
                        name: '北京-深海风格',
                        name_en: 'Beijing - fiord style',
                        localIgnore: true,
                        thumbnail: 'mvt_Beijing_fiordcolor.png',
                        fileName: 'mvtVectorTile_Beijing_fiordcolor'
                    },
                    {
                        name: '北京-淡绿风格',
                        name_en: 'Beijing - klokantech style',
                        localIgnore: true,
                        thumbnail: 'mvt_Beijing_klokantech.png',
                        fileName: 'mvtVectorTile_Beijing_klokantech'
                    },
                    {
                        name: '北京-OSM风格',
                        name_en: 'Beijing - OSM style',
                        localIgnore: true,
                        thumbnail: 'mvt_Beijing_osm.png',
                        fileName: 'mvtVectorTile_Beijing_OSM'
                    },
                    {
                        name: '北京-淡灰风格',
                        name_en: 'Beijing - positron style',
                        localIgnore: true,
                        thumbnail: 'mvt_Beijing_positron.png',
                        fileName: 'mvtVectorTile_Beijing_positron'
                    },
                    {
                        name: '风格切换',
                        name_en: 'style switch',
                        localIgnore: true,
                        thumbnail: 'mvt_changeStyle.png',
                        fileName: 'mvtVectorTile_changeStyle'
                    },
                    {
                        name: '预缓存(MVT)',
                        name_en: 'precache(MVT)',
                        localIgnore: true,
                        thumbnail: 'mvt_UGCV5.png',
                        fileName: 'mvtVectorTile_precache'
                    },
                    {
                        name: '土地利用',
                        name_en: 'Land Use',
                        localIgnore: true,
                        version: '9.1.0',
                        thumbnail: 'mvtVectorTile_landuse.png',
                        fileName: 'mvtVectorTile_landuse'
                    },
                    {
                        name: '矢量瓦片叠加',
                        name_en: 'MVT overlay',
                        localIgnore: true,
                        version: '9.1.2',
                        thumbnail: 'mvtVectorTile_overlay.png',
                        fileName: 'mvtVectorTile_overlay'
                    },
                    {
                        name: 'iServer数据服务矢量瓦片(2000万点)',
                        name_en: 'iServer REST Data VectorTile(20 million Point)',
                        version: '10.0.0',
                        localIgnore: true,
                        thumbnail: 'mvtVectorTile_restdata.png',
                        fileName: 'mvtVectorTile_restdata'
                    },
                    {
                        name: 'POI 标签高亮',
                        name_en: 'POI Label Highlight',
                        version: '10.1.3',
                        localIgnore: true,
                        thumbnail: 'mvt_poi_highlight.png',
                        fileName: 'mvtVectorTile_poi_highlight'
                    }
                ]
            },
            cluster: {
                name: '聚合',
                name_en: 'Cluster',
                version: '9.1.1',
                content: [
                    {
                        name: '点聚合',
                        name_en: 'Marker cluster',
                        version: '9.1.1',
                        thumbnail: 'markerCluster_3857.png',
                        fileName: 'markerCluster_3857'
                    }
                ]
            },
            graphicLayer: {
                name: '高效率点图层',
                name_en: 'High efficiency point layer',
                content: [
                    {
                        name: '纽约出租车145万上车点',
                        name_en: 'points of 1.45 million NYC taxis',
                        version: '9.1.0',
                        thumbnail: 'mb_graphicLayer.png',
                        fileName: 'graphicLayer'
                    }
                ]
            },
            ECharts: {
                name: 'ECharts',
                name_en: 'ECharts',
                content: [
                    {
                        name: '全国空气质量图',
                        name_en: 'ECharts',
                        thumbnail: 'echarts_effectScatter.png',
                        fileName: 'echarts_effectScatter'
                    },
                    {
                        name: '迁徙图',
                        name_en: 'Mock migration',
                        thumbnail: 'echarts_geoline.gif',
                        fileName: 'echarts_geoline'
                    },
                    {
                        name: '热力图',
                        name_en: 'heat map',
                        thumbnail: 'echarts_heatmap.png',
                        fileName: 'echarts_heatmap'
                    },
                    {
                        name: '线路图',
                        name_en: 'line',
                        thumbnail: 'echarts_linesBus.png',
                        fileName: 'echarts_linesBus'
                    },
                    {
                        name: '长春公交路径图',
                        name_en: 'Changchun public transport network',
                        thumbnail: 'echarts_ChangchunPublicTransportNetwork.gif',
                        fileName: 'echarts_ChangchunPublicTransportNetwork'
                    },
                    {
                        name: '折线图',
                        name_en: 'line chart',
                        thumbnail: 'echarts_lineMarker.png',
                        fileName: 'echarts_lineMarker'
                    },
                    {
                        name: '柱状图',
                        name_en: 'bar chart',
                        thumbnail: 'echarts_bar.png',
                        fileName: 'echarts_bar'
                    },
                    {
                        name: '散点图',
                        name_en: 'scatter chart',
                        thumbnail: 'echarts_scatter.png',
                        fileName: 'echarts_scatter'
                    },
                    {
                        name: '饼图',
                        name_en: 'pie chart',
                        thumbnail: 'echarts_pie.png',
                        fileName: 'echarts_pie'
                    },
                    {
                        name: '世界飞机航线图',
                        name_en: 'Airplane route map',
                        thumbnail: 'echarts_linesAirline.png',
                        fileName: 'echarts_linesAirline'
                    },
                    {
                        name: '微博签到图',
                        name_en: 'scatter of Weibo user',
                        thumbnail: 'echarts_scatterWeibo.png',
                        fileName: 'echarts_scatterWeibo'
                    },

                    {
                        name: '格网图',
                        name_en: 'cell map',
                        thumbnail: 'echarts_cellMap.png',
                        fileName: 'echarts_cellMap'
                    },
                    {
                        name: '北京道路网络图（130万点数据绘制）',
                        name_en: 'Use lines to draw 1.3 millions Beijing streets',
                        localIgnore: true,
                        version: '9.1.0',
                        thumbnail: 'mb_echartsLinesMillionsBeijingRoads.png',
                        fileName: 'echarts_linesDrawMillionsBeijingRoadsNetwork'
                    },
                    {
                        name: '纽约出租车上车点分布图（140万点数据绘制）',
                        name_en: 'Use scatter to draw 1.4 millions New York Taxi Points',
                        localIgnore: true,
                        version: '9.1.0',
                        thumbnail: 'mb_echartScatterMillionsNewYorkTaxi.png',
                        fileName: 'echarts_scatterDrawMillionsNewYorkTaxiPoints'
                    },
                    {
                        name: '全国铁路网络图（400万点数据绘制）',
                        name_en: 'Use lines to draw 4 millions Chinese railways',
                        localIgnore: true,
                        version: '9.1.0',
                        thumbnail: 'mb_echartsLinesMillionsRailway.png',
                        fileName: 'echarts_linesDrawMillionsRailwaysNetwork'
                    },
                    {
                        name: '全国水系图（1400万点数据绘制）',
                        name_en: 'Use lines to draw 14 millions Chinese water system',
                        localIgnore: true,
                        version: '9.1.0',
                        thumbnail: 'mb_echartsLinesMillionsWaterSystem.png',
                        fileName: 'echarts_linesDrawMillionsWaterSystem'
                    },
                    {
                        name: '全国道路网络图（2500万点数据绘制）',
                        name_en: 'Use lines to draw 25 millions Chinese roads',
                        localIgnore: true,
                        version: '9.1.0',
                        thumbnail: 'mb_echartsLinesMillionsRoads.png',
                        fileName: 'echarts_linesDrawMillionsRoadsNetwork_50WFeatures'
                    },
                    {
                        name: '车辆监控模拟',
                        name_en: 'Car Animation',
                        version: '9.1.0',
                        thumbnail: 'mb_echartsAnimatorCar.png',
                        fileName: 'echartsAnimatorCar'
                    }
                ]
            },
            EChartsGL: {
                name: 'EChartsGL',
                name_en: 'EChartsGL',
                content: [
                    {
                        name: '上海房价可视化图',
                        name_en: 'Shanghai building price',
                        thumbnail: 'echartsGL_ShanghaiBuildingPrice.png',
                        fileName: 'echartsGL_ShanghaiBuildingPrice'
                    },
                    {
                        name: '飞行路径图',
                        name_en: 'flight path',
                        thumbnail: 'echartsGL_flightPath.gif',
                        fileName: 'echartsGL_flightPath'
                    },
                    {
                        name: '开普敦的士路线图',
                        name_en: 'taxi Routes Of CapeTown',
                        thumbnail: 'echartsGL_taxiRoutesOfCapeTown.gif',
                        fileName: 'echartsGL_taxiRoutesOfCapeTown'
                    },
                    {
                        name: '五彩城市建筑',
                        name_en: 'colorful buildings',
                        thumbnail: 'echartsGL_colorfulCity.png',
                        fileName: 'echartsGL_colorfulCity'
                    },
                    {
                        name: '成都市出租车运行轨迹图',
                        name_en: 'taxi trajectory map Of ChengDu',
                        thumbnail: 'echartsGL_taxiTrajectoryMap.gif',
                        fileName: 'echartsGL_taxiTrajectoryMap'
                    },
                    {
                        name: '全球风能可视化',
                        name_en: 'Global wind visualization',
                        thumbnail: 'echartsGL_GlobalWind.gif',
                        fileName: 'echartsGL_GlobalWind'
                    }
                ]
            },
            DeckGL: {
                name: 'DeckGL',
                name_en: 'DeckGL',
                content: [
                    {
                        name: '路径图',
                        name_en: 'path',
                        version: '9.1.0',
                        thumbnail: 'mb_deckglLayer_pathLayer.png',
                        fileName: 'deckglLayer_pathLayer'
                    },
                    {
                        name: '曲线',
                        name_en: 'arcLine',
                        version: '9.1.0',
                        thumbnail: 'mb_deckglLayer_arcLayer.png',
                        fileName: 'deckglLayer_arcLayer'
                    },
                    {
                        name: '多边形(建筑物)',
                        name_en: 'polygon',
                        version: '9.1.0',
                        thumbnail: 'mb_deckglLayer_polygonLayer.png',
                        fileName: 'deckglLayer_polygonLayer'
                    },
                    {
                        name: '蜂巢图',
                        name_en: 'honeycomb',
                        version: '9.1.0',
                        thumbnail: 'mb_deckglLayer_hexagonLayer.png',
                        fileName: 'deckglLayer_hexagonLayer'
                    },
                    {
                        name: '纽约城市建筑变化图',
                        name_en: 'New York Construction',
                        localIgnore: true,
                        version: '9.1.0',
                        thumbnail: 'mb_deckgl_nyBuilding.png',
                        fileName: 'deckglLayer_nyBuilding'
                    },
                    {
                        name: '加州地震分布图',
                        name_en: 'California Earthquakes',
                        version: '9.1.0',
                        thumbnail: 'mb_deckglLayer_scatterPlot.png',
                        fileName: 'deckglLayer_scatterPlot'
                    },
                    {
                        name: '纽约城市人口分布图',
                        name_en: 'New york city population',
                        version: '9.1.0',
                        thumbnail: 'mb_deckglLayer_nyc_census.png',
                        fileName: 'deckglLayer_nyc_census'
                    },
                    {
                        name: '旧金山等高线图',
                        name_en: 'San Francisco Elevation Contour',
                        localIgnore: true,
                        version: '9.1.0',
                        thumbnail: 'mb_deckglLayer_sfcontour.png',
                        fileName: 'deckglLayer_sfcontour'
                    },
                    {
                        name: '旧金山街道树分布密度图',
                        name_en: 'San Francisco Street Tree Map',
                        version: '9.1.0',
                        thumbnail: 'mb_deckglLayer_sftrees.png',
                        fileName: 'deckglLayer_sftrees'
                    },
                    {
                        name: '英国通勤图',
                        name_en: 'Commute Patterns in the UK',
                        version: '9.1.0',
                        localIgnore: true,
                        thumbnail: 'mb_deckglLayer_ukcommute.png',
                        fileName: 'deckglLayer_ukcommute'
                    }
                ]
            },
            MapV: {
                name: 'MapV',
                name_en: 'MapV',
                content: [
                    {
                        name: '蜂巢图',
                        name_en: 'honeycomb',
                        version: '9.1.0',
                        thumbnail: 'mb_mapVLayer_honeycomb.png',
                        fileName: 'mapvLayerHoneycomb'
                    },
                    {
                        name: '纽约出租车上车点',
                        name_en: 'NY taxi car point',
                        version: '9.1.0',
                        thumbnail: 'mb_mapVLayer_point.png',
                        fileName: 'mapvNyTaxi'
                    },
                    {
                        name: '通勤图',
                        name_en: 'OD',
                        thumbnail: 'mapvCsvcar.png',
                        fileName: 'mapvCsvcar'
                    },
                    {
                        name: '强边界图',
                        name_en: 'force edge bundling',
                        thumbnail: 'mapvForceEdgeBuilding.gif',
                        fileName: 'mapvForceEdgeBuilding'
                    },
                    {
                        name: '强度线',
                        name_en: 'line density',
                        thumbnail: 'mapvPolylineIntensity.png',
                        fileName: 'mapvPolylineIntensity'
                    },
                    {
                        name: '简单线',
                        name_en: 'simple line',
                        thumbnail: 'mapvPolylineSimple.png',
                        fileName: 'mapvPolylineSimple'
                    },
                    {
                        name: '动态轨迹',
                        name_en: 'dynamic trajectory',
                        thumbnail: 'mapvPolylineTime.gif',
                        fileName: 'mapvPolylineTime'
                    },
                    {
                        name: '迁徙时序图',
                        name_en: 'Migration timing',
                        thumbnail: 'mapvQianxiTime.gif',
                        fileName: 'mapvQianxiTime'
                    },
                    {
                        name: '迁徙图',
                        name_en: 'migration',
                        thumbnail: 'mapvQianxi.gif',
                        fileName: 'mapvQianxi'
                    },
                    {
                        name: '面',
                        name_en: 'simple polygon',
                        thumbnail: 'mb_mapvLayer_polygon.png',
                        fileName: 'mapvLayerPolyon'
                    },
                    {
                        name: '北京村庄分布图',
                        name_en: 'village of beijing',
                        thumbnail: 'mapvBeijingVillage.png',
                        fileName: 'mapvBeijingVillage'
                    },
                    {
                        name: '2018年2月北京房价',
                        name_en: 'Beijing house prices(2018.2)',
                        localIgnore: true,
                        version: '9.1.0',
                        thumbnail: 'mb_mapvLianjia.png',
                        fileName: 'mapvLinanJiaData'
                    }
                ]
            },
            threejs: {
                name: 'threejs',
                name_en: 'threejs',
                content: [
                    {
                        name: '建筑模型',
                        name_en: 'buildings',
                        version: '9.1.0',
                        thumbnail: 'mb_threejs_buildings.png',
                        fileName: 'threejsLayer_buildings'
                    },
                    {
                        name: '设施点(mtl+obj格式)',
                        name_en: 'facility(mtl+obj)',
                        version: '9.1.0',
                        thumbnail: 'mb_threejs_facility.png',
                        fileName: 'threejsLayer_facility'
                    },
                    {
                        name: '飞机模型(gltf格式)',
                        name_en: 'airplane(gltf)',
                        version: '9.1.0',
                        thumbnail: 'mb_threejs_airplane.png',
                        fileName: 'threejsLayer_airplane'
                    },
                    {
                        name: '飞鸟模型',
                        name_en: 'bird',
                        version: '9.1.0',
                        thumbnail: 'mb_threejs_bird.png',
                        fileName: 'threejsLayer_bird'
                    }
                ]
            },
            Theme2D: {
                name: '二维专题图',
                name_en: '2D thematic layer',
                content: [
                    {
                        name: '单值专题图',
                        name_en: 'unique',
                        thumbnail: 'uniqueThemeLayer.png',
                        fileName: 'uniqueThemeLayer'
                    },
                    {
                        name: '分段专题图',
                        name_en: 'range',
                        thumbnail: 'rangeThemeLayer.png',
                        fileName: 'rangeThemeLayer'
                    },
                    {
                        name: '等级符号专题图',
                        name_en: 'rank symbol',
                        thumbnail: 'rankSymbolThemeLayer.png',
                        fileName: 'rankSymbolThemeLayer'
                    },
                    {
                        name: '标签专题图',
                        name_en: 'label',
                        thumbnail: 'mb_labelThemeLayer.png',
                        fileName: 'labelThemeLayer'
                    },
                    {
                        name: '图表专题图',
                        name_en: 'statistical chart',
                        thumbnail: 'mb_graphThemeLayer.png',
                        fileName: 'graphThemeLayer'
                    }
                ]
            },
            Theme3D: {
                name: '三维专题图',
                name_en: '3D thematic layer',
                content: [
                    {
                        name: '单值专题图',
                        name_en: 'unique',
                        thumbnail: 'theme_3Dlayer_unique.png',
                        fileName: 'uniqueTheme3DLayer'
                    },
                    {
                        name: '分段专题图',
                        name_en: 'range',
                        thumbnail: 'theme_3Dlayer_range.png',
                        fileName: 'rangeTheme3DLayer'
                    }
                ]
            },
            Graticule: {
                name: '经纬网',
                name_en: 'Graticule',
                version: '10.1.1',
                content: [
                    {
                        name: '经纬网',
                        name_en: 'graticule',
                        version: '10.1.1',
                        thumbnail: 'graticule_3857.png',
                        fileName: 'graticuleLayer_3857'
                    }
                ]
            },
            FlatGeobuf: {
              name: 'FlatGeobuf',
              name_en: 'FlatGeobuf',
              version: '11.0.1',
              content: [
                  {
                      name: 'FGB 全量加载（2500万点数据量）',
                      name_en: 'FGB Full Load (Use lines to draw 25 millions Chinese roads)',
                      version: '11.1.0',
                      thumbnail: 'fgb_all_load.png',
                      fileName: 'fgb_all_load'
                  },
                  {
                    name: 'FGB 按需加载（2500万点数据量）',
                    name_en: 'FGB Extent Load (Use lines to draw 25 millions Chinese roads)',
                    version: '11.1.0',
                    thumbnail: 'fgb_bbox_load.png',
                    fileName: 'fgb_bbox_load'
                  }
                ]
            },
            WebSymbol: {
              name: 'Web符号',
              name_en: 'WebSymbol',
              version: '11.1.0',
              content: [{
                name: 'Web符号库',
                name_en: 'WebSymbol Gallery',
                version: '11.1.0',
                showCode: false,
                thumbnail: 'websymbol_gallery.png',
                fileName: 'websymbol_gallery'
                },{
                  name: 'Web符号编辑器',
                  name_en: 'WebSymbol Editor',
                  version: '11.1.0',
                  showCode: false,
                  thumbnail: 'websymbol_editor.png',
                  fileName: 'websymbol_editor'
                },{
                  name: '长江三角洲',
                  name_en: 'Yangtze River Delta',
                  version: '11.1.0',
                  thumbnail: 'websymbol_YangtzeRiverdelta.png',
                  fileName: 'websymbol_YangtzeRiverdelta'
                },{
                  name: '土地利用',
                  name_en: 'Land Use',
                  version: '11.1.0',
                  thumbnail: 'websymbol_landuse.png',
                  fileName: 'websymbol_landuse'
                }
                ,{
                  name: '数字线划地图',
                  name_en: 'DLG_I49',
                  version: '11.1.0',
                  thumbnail: 'websymbol_DLG_I49.png',
                  fileName: 'websymbol_DLG_I49'
                }
                ,{
                  name: '新疆土地利用',
                  name_en: 'Land Use of Xinjiang',
                  version: '11.1.0',
                  thumbnail: 'websymbol_landuseOfXinjiang.png',
                  fileName: 'websymbol_landuseOfXinjiang'
                },{
                  name: '自定义Web符号',
                  name_en: 'Custom WebSymbol',
                  version: '11.1.0',
                  thumbnail: 'websymbol_customWebSymbol.png',
                  fileName: 'websymbol_customWebSymbol'
                },{
                  name: '京津地区土地利用现状图',
                  name_en: 'Land Use of Jingjin ',
                  version: '11.1.0',
                  thumbnail: 'websymbol_landuseOfJingjin.png',
                  fileName: 'websymbol_landuseOfJingjin'
                },{
                  name: '2019年中国各省GDP',
                  name_en: "2019 China's GDP by Province",
                  version: '11.1.0',
                  thumbnail: 'websymbol_2019ChinaGDP.png',
                  fileName: 'websymbol_2019ChinaGDP'
                }
              ]
            }
        }
    },
    control: {
        name: '控件',
        name_en: 'Control',
        content: {
            BasicControl: {
                name: '基础控件',
                name_en: 'Basic Control',
                content: [
                    {
                        name: '导航控件',
                        name_en: 'Navigation Control',
                        thumbnail: 'control_navigationControl.png',
                        fileName: 'control_navigationControl'
                    },
                    {
                        name: '比例尺控件',
                        name_en: 'Scale Control',
                        thumbnail: 'control_scaleControl.png',
                        fileName: 'control_scaleControl'
                    },
                    {
                        name: '全屏控件',
                        name_en: 'Fullscreen Control',
                        thumbnail: 'control_fullscreenControl.png',
                        fileName: 'control_fullscreenControl'
                    },
                    {
                        name: '定位控件',
                        name_en: 'Geolocate Control',
                        thumbnail: 'control_geolocateControl.png',
                        fileName: 'control_geolocateControl'
                    },
                    {
                        name: '版权控件',
                        name_en: 'Attribution Control',
                        thumbnail: 'control_attributionControl.png',
                        fileName: 'control_attributionControl'
                    },
                    {
                        name: '绘图控件',
                        name_en: 'Draw Control',
                        thumbnail: 'control_drawControl.png',
                        fileName: 'control_drawControl'
                    },
                    {
                        name: '卷帘控件',
                        name_en: 'Swipe between maps',
                        thumbnail: 'control_swipeBetweenMaps.png',
                        fileName: 'control_swipeBetweenMaps'
                    }
                ]
            }
        }
    },
    multiCoordSys: {
        name: '多坐标系',
        name_en: 'Multiple CRS',
        version: '9.1.1',
        // localIgnore: true,
        content: {
            Multi_coordinate_Map: {
                name: '地图',
                name_en: 'Map service',
                version: '9.1.1',
                content: [
                    {
                        name: '地图_WGS84',
                        name_en: 'Map WGS84',
                        version: '9.1.1',
                        thumbnail: '01_tiledMapLayer_4326.png',
                        fileName: '01_tiledMapLayer_4326'
                    },
                    {
                        name: '地图_China2000',
                        name_en: 'Map China2000',
                        localIgnore: true,
                        version: '9.1.1',
                        thumbnail: '01_tiledMapLayer.png',
                        fileName: '01_tiledMapLayer_4490'
                    },
                    {
                        name: '地图_Beijing54',
                        name_en: 'Map Beijing54',
                        version: '9.1.1',
                        localIgnore: true,
                        thumbnail: '01_tiledMapLayer.png',
                        fileName: '01_tiledMapLayer_4214'
                    },
                    {
                        name: '地图_Xian80',
                        name_en: 'Map Xian80',
                        localIgnore: true,
                        version: '9.1.1',
                        thumbnail: '01_tiledMapLayer.png',
                        fileName: '01_tiledMapLayer_4610'
                    },
                    {
                        name: '绘图控件_WGS84',
                        name_en: 'Draw control WGS84',
                        version: '9.1.1',
                        thumbnail: 'control_drawControl_4326.png',
                        fileName: 'control_drawControl_4326'
                    },
                    {
                        name: '矢量瓦片_WGS84',
                        name_en: 'MVT WGS84',
                        version: '9.1.1',
                        thumbnail: 'mvt_4326.png',
                        fileName: 'mvtVectorTile_4326'
                    },
                    {
                        name: '矢量瓦片_EPSG2362',
                        name_en: 'MVT EPSG2362',
                        version: '11.1.0',
                        thumbnail: 'mvtvectorlayer_mbstyle_landuse.png',
                        fileName: 'mvtVectorTile_2362'
                    },
                    {
                        name: '地图打印',
                        name_en: 'Map Print',
                        version: '10.1.0',
                        thumbnail: 'print_pdf.png',
                        fileName: 'print_pdf'
                    },
                    {
                        name: '经纬网_WGS84',
                        name_en: 'graticule_WGS84',
                        version: '10.1.1',
                        thumbnail: 'graticule.png',
                        fileName: 'graticuleLayer_4326'
                    }
                ]
            },
            Multi_coordinate_cluster: {
                name: '聚合',
                name_en: 'Cluster',
                version: '9.1.1',
                content: [
                    {
                        name: '点聚合_WGS84',
                        name_en: 'Marker Cluster WGS84',
                        version: '9.1.1',
                        thumbnail: 'markerCluster_4326.png',
                        fileName: 'markerCluster_4326'
                    }
                ]
            },
            Multi_coordinate_DeckGL: {
                name: 'DeckGL',
                name_en: 'DeckGL',
                version: '9.1.1',
                content: [
                    {
                        name: '路径图_WGS84',
                        name_en: 'Path-layer WGS84',
                        version: '9.1.1',
                        thumbnail: 'deckglLayer_pathLayer_4326.png',
                        fileName: 'deckglLayer_pathLayer_4326'
                    }
                ]
            },
            Multi_coordinate_ECharts: {
                name: 'ECharts',
                name_en: 'ECharts',
                version: '9.1.1',
                content: [
                    {
                        name: '迁徙图_WGS84',
                        name_en: 'Mock migration WGS84',
                        version: '9.1.1',
                        thumbnail: 'echarts_geoline_4326.png',
                        fileName: 'echarts_geoline_4326'
                    },
                    {
                        name: '微博签到图_WGS84',
                        name_en: 'Scatter of Weibo user WGS84',
                        version: '9.1.1',
                        thumbnail: 'echarts_scatterWeibo_4326.png',
                        fileName: 'echarts_scatterWeibo_4326'
                    },
                    {
                        name: '全国铁路网络图（400万点数据绘制）_WGS84',
                        name_en: 'Use lines to draw 4 millions Chinese railways WGS84',
                        localIgnore: true,
                        version: '9.1.1',
                        thumbnail: 'echarts_linesDrawMillionsRailwaysNetwork_4326.png',
                        fileName: 'echarts_linesDrawMillionsRailwaysNetwork_4326'
                    }
                ]
            },
            Multi_coordinate_graphicLayer: {
                name: '高效率点图层',
                name_en: 'High efficiency point layer',
                version: '9.1.1',
                content: [
                    {
                        name: '纽约出租车145万上车点_WGS84',
                        name_en: 'Points of 1.45 million NYC taxis WGS84',
                        version: '9.1.1',
                        thumbnail: 'graphicLayer_4326.png',
                        fileName: 'graphicLayer_4326'
                    }
                ]
            },
            Multi_coordinate_heatMap: {
                name: '热力图',
                name_en: 'Heat map',
                version: '9.1.1',
                content: [
                    {
                        name: '地震数据_WGS84',
                        name_en: 'Earthquake Data WGS84',
                        version: '9.1.1',
                        thumbnail: 'heatMapLayer_earthQuake_4326.png',
                        fileName: 'earthquakeHeatMap'
                    },
                    {
                        name: '地震数据（Classic）_WGS84',
                        name_en: 'Earthquake Data WGS84(Classic)',
                        version: '9.1.1',
                        thumbnail: 'heatMapLayer_earthQuake_iclient_4326.png',
                        fileName: 'earthquakeHeatMapIclient'
                    }
                ]
            },
            Multi_coordinate_MapV: {
                name: 'MapV',
                name_en: 'MapV',
                version: '9.1.1',
                content: [
                    {
                        name: '通勤图_WGS84',
                        name_en: 'OD WGS84',
                        version: '9.1.1',
                        thumbnail: 'mapvCsvcar_4326.png',
                        fileName: 'mapvCsvcar_4326'
                    },
                    {
                        name: '面_WGS84',
                        name_en: 'Simple polygon WGS84',
                        version: '9.1.1',
                        thumbnail: 'mapvLayerPolyon_4326.png',
                        fileName: 'mapvLayerPolyon_4326'
                    }
                ]
            }
        }
    },
    GTC: {
        name: 'GTC',
        name_en: 'GTC',
        localIgnore: true,
        content: {
            GTC2017: {
                name: '2017',
                name_en: '2017',
                content: [
                    {
                        name: 'GTC2017',
                        name_en: 'GTC2017',
                        thumbnail: 'gtc2017.gif',
                        fileName: 'GTC2017'
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
    iServer: 'fa-server',
    iPortal: 'fa-desktop',
    viz: 'fa-map',
    control: 'fa-sliders',
    multiCoordSys: 'fa-globe',
    GTC: 'fa-globe'
};

/**
 *key值：为exampleConfig配置的key值
 *value值：fontawesome字体icon名
 *与sideBarIconConfig的区别：sideBarIconConfig包括侧边栏所有层级目录的图标，exampleIconConfig仅包括一级标题的图标
 */
var exampleIconConfig = {
    iServer: 'fa-server',
    iPortal: 'fa-desktop',
    viz: 'fa-map',
    GTC: 'fa-globe',
    multiCoordSys: 'fa-globe'
};
window.mapboxglExampleConfig = exampleConfig;
