/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.*/
/**
 * maplibregl 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var identification = {
  name: 'MapLibreGL'
};

var exampleConfig = {
  version: '11.1.0',
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
      processingService: {
        name: '分布式分析',
        name_en: 'Distributed analysis services',
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
            thumbnail: 'machinelearning_binaryclassification.png',
            fileName: 'machinelearning_binaryclassification'
          },
          {
            name: '目标检测结果叠加',
            name_en: 'Object Detection Result Overlay',
            thumbnail: 'machinelearning_objectdetection.png',
            fileName: 'machinelearning_objectdetection'
          }
          // ,
          // {
          //     name: "地物分类",
          //     name_en: "Landcover Classification",
          //     thumbnail: "machinelearning_landcoverclassification.png",
          //     fileName: "machinelearning_landcoverclassification"
          // }
        ]
      },
      KnowledgeGraph: {
        name: '知识图谱',
        name_en: 'KnowledgeGraph',
        content: [
            {
                name: '不动产图谱',
                name_en: 'Real Estate GraphMap',
                thumbnail: 'knowledgeGraphMap.png',
                fileName: 'knowledgeGraphMap'
            },
            {
              name: '河流流经省份图谱',
              name_en: 'Rivers flowing through provinces GraphMap',
              thumbnail: 'knowledgeGraphMap1.png',
              fileName: 'knowledgeGraphMap1'
          }
        ]
      },
    }
  },
  viz: {
    name: '可视化',
    name_en: 'Visualization',
    content: {
      heat: {
        name: '热力图',
        name_en: 'Heat map',
        content: [
          {
            name: '随机点',
            name_en: 'random points',
            thumbnail: 'mb_heatMapLayer.png',
            fileName: 'heatmaplayer_mbgl'
          },
          {
            name: '随机点 (Classic)',
            name_en: 'random points (Classic)',
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
            thumbnail: 'mvtVectorTile_landuse.png',
            fileName: 'mvtVectorTile_landuse'
          }
        ]
      },
      cluster: {
        name: '聚合',
        name_en: 'Cluster',
        content: [
          {
            name: '点聚合',
            name_en: 'Marker cluster',
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
            thumbnail: 'mb_echartsLinesMillionsBeijingRoads.png',
            fileName: 'echarts_linesDrawMillionsBeijingRoadsNetwork'
          },
          {
            name: '纽约出租车上车点分布图（140万点数据绘制）',
            name_en: 'Use scatter to draw 1.4 millions New York Taxi Points',
            localIgnore: true,
            thumbnail: 'mb_echartScatterMillionsNewYorkTaxi.png',
            fileName: 'echarts_scatterDrawMillionsNewYorkTaxiPoints'
          },
          {
            name: '全国铁路网络图（400万点数据绘制）',
            name_en: 'Use lines to draw 4 millions Chinese railways',
            localIgnore: true,
            thumbnail: 'mb_echartsLinesMillionsRailway.png',
            fileName: 'echarts_linesDrawMillionsRailwaysNetwork'
          },
          {
            name: '全国水系图（1400万点数据绘制）',
            name_en: 'Use lines to draw 14 millions Chinese water system',
            localIgnore: true,
            thumbnail: 'mb_echartsLinesMillionsWaterSystem.png',
            fileName: 'echarts_linesDrawMillionsWaterSystem'
          },
          {
            name: '全国道路网络图（2500万点数据绘制）',
            name_en: 'Use lines to draw 25 millions Chinese roads',
            localIgnore: true,
            thumbnail: 'mb_echartsLinesMillionsRoads.png',
            fileName: 'echarts_linesDrawMillionsRoadsNetwork_50WFeatures'
          },
          {
            name: '车辆监控模拟',
            name_en: 'Car Animation',
            thumbnail: 'mb_echartsAnimatorCar.png',
            fileName: 'echartsAnimatorCar'
          }]
      },
      DeckGL: {
        name: 'DeckGL',
        name_en: 'DeckGL',
        content: [
          {
            name: '路径图',
            name_en: 'path',
            thumbnail: 'mb_deckglLayer_pathLayer.png',
            fileName: 'deckglLayer_pathLayer'
          },
          {
            name: '曲线',
            name_en: 'arcLine',
            thumbnail: 'mb_deckglLayer_arcLayer.png',
            fileName: 'deckglLayer_arcLayer'
          },
          {
            name: '多边形(建筑物)',
            name_en: 'polygon',
            thumbnail: 'mb_deckglLayer_polygonLayer.png',
            fileName: 'deckglLayer_polygonLayer'
          },
          {
            name: '蜂巢图',
            name_en: 'honeycomb',
            thumbnail: 'mb_deckglLayer_hexagonLayer.png',
            fileName: 'deckglLayer_hexagonLayer'
          },
          {
            name: '纽约城市建筑变化图',
            name_en: 'New York Construction',
            localIgnore: true,
            thumbnail: 'mb_deckgl_nyBuilding.png',
            fileName: 'deckglLayer_nyBuilding'
          },
          {
            name: '加州地震分布图',
            name_en: 'California Earthquakes',
            thumbnail: 'mb_deckglLayer_scatterPlot.png',
            fileName: 'deckglLayer_scatterPlot'
          },
          {
            name: '纽约城市人口分布图',
            name_en: 'New york city population',
            thumbnail: 'mb_deckglLayer_nyc_census.png',
            fileName: 'deckglLayer_nyc_census'
          },
          {
            name: '旧金山等高线图',
            name_en: 'San Francisco Elevation Contour',
            localIgnore: true,
            thumbnail: 'mb_deckglLayer_sfcontour.png',
            fileName: 'deckglLayer_sfcontour'
          },
          {
            name: '旧金山街道树分布密度图',
            name_en: 'San Francisco Street Tree Map',
            thumbnail: 'mb_deckglLayer_sftrees.png',
            fileName: 'deckglLayer_sftrees'
          },
          {
            name: '英国通勤图',
            name_en: 'Commute Patterns in the UK',
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
            thumbnail: 'mb_mapVLayer_honeycomb.png',
            fileName: 'mapvLayerHoneycomb'
          },
          {
            name: '纽约出租车上车点',
            name_en: 'NY taxi car point',
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
            thumbnail: 'mb_threejs_buildings.png',
            fileName: 'threejsLayer_buildings'
          },
          {
            name: '设施点(mtl+obj格式)',
            name_en: 'facility(mtl+obj)',
            thumbnail: 'mb_threejs_facility.png',
            fileName: 'threejsLayer_facility'
          },
          {
            name: '飞机模型(gltf格式)',
            name_en: 'airplane(gltf)',
            thumbnail: 'mb_threejs_airplane.png',
            fileName: 'threejsLayer_airplane'
          },
          {
            name: '飞鸟模型',
            name_en: 'bird',
            thumbnail: 'mb_threejs_bird.png',
            fileName: 'threejsLayer_bird'
          }
        ]
      }, Graticule: {
        name: '经纬网',
        name_en: 'Graticule',
        content: [
          {
            name: '经纬网',
            name_en: 'graticule',
            thumbnail: 'graticule_3857.png',
            fileName: 'graticuleLayer_3857'
          }
        ]
      },
      FlatGeobuf: {
        name: 'FlatGeobuf',
        name_en: 'FlatGeobuf',
        content: [
          {
            name: 'FGB 全量加载（2500万点数据量）',
            name_en: 'FGB Full Load (Use lines to draw 25 millions Chinese roads)',
            thumbnail: 'fgb_all_load.png',
            fileName: 'fgb_all_load'
          },
          {
            name: 'FGB 按需加载（2500万点数据量）',
            name_en: 'FGB Extent Load (Use lines to draw 25 millions Chinese roads)',
            thumbnail: 'fgb_bbox_load.png',
            fileName: 'fgb_bbox_load'
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
window.maplibreglExampleConfig = exampleConfig;
