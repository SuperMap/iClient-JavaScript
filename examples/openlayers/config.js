/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.*/
/**
 * OpenLayers 示例配置文件：包括示例的分类、名称、缩略图、文件路径
 */
var identification = {
    name: "OpenLayers"
};

var exampleConfig = {
    "iServer": {
        name: "iServer",
        name_en: "iServer",
        content: {
            "map": {
                name: "地图",
                name_en: "Map service",
                content: [{
                    name: "4326底图",
                    name_en: "4326 coordinate system",
                    thumbnail: "ol_tiledMapLayer4326.png",
                    fileName: "01_tiledMapLayer4326"
                }, {
                    name: "3857底图",
                    name_en: "3857 coordinate system",
                    thumbnail: "ol_tiledMapLayer3857.png",
                    fileName: "01_tiledMapLayer3857"
                }, {
                    name: "地图叠加",
                    name_en: "overlay tile layer",
                    thumbnail: "ol_tiledMapLayerOverlapped.png",
                    fileName: "01_tiledMapLayerOverlapped"

                }, {
                    name: "平面坐标系底图",
                    name_en: "planar coordinate system",
                    thumbnail: "ol_tiledMapLayerNoProj.png",
                    fileName: "01_tiledMapLayerNoProj"
                // }, {
                //     name: "地图-栅格分析",
                //     name_en: "map rasterFunction",
                //     version: "10.0.0",
                //     thumbnail: "ol_tiledMapLayerRasterfunction.png",
                //     fileName: "01_tiledmaplayer_rasterfunction"
                }, {
                    name: "地图信息",
                    name_en: "map query service",
                    thumbnail: "ol_mapService.png",
                    fileName: "01_mapService"

                }, {
                    name: "距离测量",
                    name_en: "distance measurement service",
                    thumbnail: "ol_measure-distance.png",
                    fileName: "01_measure_distance"
                }, {
                    name: "面积测量",
                    name_en: "area measurement service",
                    thumbnail: "ol_measure-area.png",
                    fileName: "01_measure_area"
                }, {
                    name: "图层信息",
                    name_en: "layer service",
                    thumbnail: "ol_layerService.png",
                    fileName: "01_layerService"
                }, {
                    name: "范围查询",
                    name_en: "bounds query",
                    thumbnail: "ol_mapQueryByBounds.png",
                    fileName: "01_mapQueryByBounds"
                }, {
                    name: "距离查询",
                    name_en: "distance query",
                    thumbnail: "ol_mapQueryByDistance.png",
                    fileName: "01_mapQueryByDistance"
                }, {
                    name: "几何查询",
                    name_en: "geometry query",
                    thumbnail: "ol_mapQueryByGeometry.png",
                    fileName: "01_mapQueryByGeometry"
                }, {
                    name: "SQL查询",
                    name_en: "SQL query",
                    thumbnail: "ol_mapQueryBySQL.png",
                    fileName: "01_mapQueryBySQL"
                },
                {
                  name: "SQL查询 (FGB)",
                  name_en: "SQL query (FGB)",
                  version: '11.1.0',
                  thumbnail: "query_fgb_features.png",
                  fileName: "01_mapQueryBySQL_FGB"
                }, 
                {
                  name: "图例",
                  name_en: "Legend",
                  version: '11.1.1',
                  thumbnail: "layersLegend.png",
                  fileName: "01_layersLegend"
                },
                {
                  name: "海图",
                  name_en: "Chart",
                  version: '11.2.0',
                  thumbnail: "chart.png",
                  fileName: "01_chartService"
                },
                {
                  name: "创建临时图层",
                  name_en: "Create temporary layer",
                  version: '11.3.0',
                  thumbnail: "createTempLayer.png",
                  fileName: "createTempLayer"
                }
              ]
            },
            "data": {
                name: "数据",
                name_en: "Data service",
                content: [{
                    name: "ID查询",
                    name_en: "ID query",
                    thumbnail: "ol_getFeatureByIDs.png",
                    fileName: "02_getFeatureByIDs"
                }, {
                    name: "SQL查询",
                    name_en: "SQL query",
                    thumbnail: "ol_getFeatureBySQL.png",
                    fileName: "02_getFeatureBySQL"
                }, {
                  name: "SQL查询 (FGB)",
                  name_en: "SQL query (FGB)",
                  version: '11.1.0',
                  thumbnail: "query_fgb_features.png",
                  fileName: "02_getFeatureBySQL_FGB"
                }, 
                {
                    name: "范围查询",
                    name_en: "bounds query",
                    thumbnail: "ol_getFeatureByBounds.png",
                    fileName: "02_getFeatureByBounds"
                }, {
                    name: "几何查询",
                    name_en: "geometry query",
                    thumbnail: "ol_getFeatureByGeometry.png",
                    fileName: "02_getFeatureByGeometry"
                }, {
                    name: "缓冲区查询",
                    name_en: "buffer query",
                    thumbnail: "ol_getFeatureByBuffer.png",
                    fileName: "02_getFeatureByBuffer"
                }, {
                    name: "栅格查询",
                    name_en: "data gridcell query",
                    thumbnail: "ol_getGridCellInfos.png",
                    fileName: "02_getGridCellInfos"
                }, {
                    name: "字段信息",
                    name_en: "field service",
                    thumbnail: "ol_fieldsService.png",
                    fileName: "02_fieldsService"
                }, {
                    name: "字段查询统计",
                    name_en: "field statistics service",
                    thumbnail: "ol_fieldStatistics.png",
                    fileName: "02_fieldStatistics"
                },
                {
                    name: "要素关联附件",
                    name_en: "feature attachment",
                    thumbnail: "ol_featureAttachments.png",
                    fileName: "02_FeatureAttachment"
                },
                {
                    name: "数据源信息查询",
                    name_en: "datasource information service",
                    thumbnail: "02_datasourceService.png",
                    fileName: "02_datasourceService"
                },
                {
                    name: "数据集信息查询",
                    name_en: "dataset information service",
                    thumbnail: "02_datasetService.png",
                    fileName: "02_datasetService"
                },
                {
                    name: "要素编辑",
                    name_en: "draw and edit features",
                    version: '11.2.0',
                    thumbnail: "drawAndEditFeatures.png",
                    fileName: "drawAndEditFeatures"
                },
                {
                  name: "属性表",
                  name_en: "attributes",
                  version: '11.2.0',
                  thumbnail: "attributes.png",
                  fileName: "02_attributes"
              }]
            },
            "theme": {
                name: "专题图",
                name_en: "Server thematic service",
                content: [{
                    name: "点密度专题图",
                    name_en: "dot density",
                    thumbnail: "ol_themeDotDensity.png",
                    fileName: "03_themeDotDensity"
                }, {
                    name: "等级符号专题图",
                    name_en: "graduated symbol",
                    thumbnail: "ol_themeGraduatedSymbol.png",
                    fileName: "03_themeGraduatedSymbol"
                }, {
                    name: "统计专题图",
                    name_en: "statistical chart",
                    thumbnail: "ol_themeGraph.png",
                    fileName: "03_themeGraph"
                }, {
                    name: "标签专题图",
                    name_en: "label",
                    thumbnail: "ol_themeLabel.png",
                    fileName: "03_themeLabel"
                }, {
                    name: "分段专题图",
                    name_en: "range",
                    thumbnail: "ol_themeRange.png",
                    fileName: "03_themeRange"
                }, {
                    name: "单值专题图",
                    name_en: "unique",
                    thumbnail: "ol_themeUnique.png",
                    fileName: "03_themeUnique"
                }, {
                    name: "栅格分段专题图",
                    name_en: "grid range",
                    thumbnail: "ol_themeGridRange.png",
                    fileName: "03_themeGridRange"
                }, {
                    name: "栅格单值专题图",
                    name_en: "grid unique",
                    thumbnail: "ol_themeGridUnique.png",
                    fileName: "03_themeGridUnique"
                }]
            },
            "spatialAnalyst": {
                name: "空间分析",
                name_en: "Spatial analysis service",
                content: [{
                    name: "数据集缓冲区分析",
                    name_en: "buffer",
                    thumbnail: "ol_bufferAnalystService.png",
                    fileName: "04_bufferAnalystService"
                }, {
                  name: "数据集缓冲区分析 (FGB)",
                  name_en: "buffer (FGB)",
                  version: '11.1.0',
                  thumbnail: "ol_bufferAnalystService.png",
                  fileName: "04_bufferAnalystService_FGB"
                },{
                    name: "几何对象缓冲区分析",
                    name_en: "buffer-geometry",
                    thumbnail: "ol_bufferAnalystService_geometry.png",
                    fileName: "04_bufferAnalystService_geometry"
                },{
                  name: "几何对象缓冲区分析 (FGB)",
                  name_en: "buffer-geometry",
                  version: '11.1.0',
                  thumbnail: "ol_bufferAnalystService_geometry.png",
                  fileName: "04_bufferAnalystService_geometry_FGB"
                }, {
                    name: "数据集泰森多边形",
                    name_en: "thiessen-dataset",
                    thumbnail: "ol_thiessenAnalystService-datasets.png",
                    fileName: "04_thiessenAnalystService_datasets"
                },{
                  name: "数据集泰森多边形 (FGB)",
                  name_en: "thiessen-dataset (FGB)",
                  version: '11.1.0',
                  thumbnail: "ol_thiessenAnalystService-datasets.png",
                  fileName: "04_thiessenAnalystService_datasets_FGB"
                },  {
                    name: "几何泰森多边形",
                    name_en: "thiessen-geometry",
                    thumbnail: "ol_thiessenAnalystService-geometry.png",
                    fileName: "04_thiessenAnalystService_geometry"
                }, {
                  name: "几何泰森多边形 (FGB)",
                  name_en: "thiessen-geometry (FGB)",
                  version: '11.1.0',
                  thumbnail: "ol_thiessenAnalystService-geometry.png",
                  fileName: "04_thiessenAnalystService_geometry_FGB"
                }, {
                    name: "叠加分析",
                    name_en: "overlay",
                    thumbnail: "ol_overlayAnalystService.png",
                    fileName: "04_overlayAnalystService"
                }, {
                  name: "叠加分析 (FGB)",
                  name_en: "overlay (FGB)",
                  version: '11.1.0',
                  thumbnail: "ol_overlayAnalystService.png",
                  fileName: "04_overlayAnalystService_FGB"
                },{
                    name: "表面分析(提取等值线)",
                    name_en: "surface(Getting Contour Line)",
                    thumbnail: "ol_surfaceAnalystService.png",
                    fileName: "04_surfaceAnalystService"
                }, {
                  name: "表面分析(提取等值线) (FGB)",
                  name_en: "surface(Getting Contour Line) (FGB)",
                  version: '11.1.0',
                  thumbnail: "ol_surfaceAnalystService.png",
                  fileName: "04_surfaceAnalystService_FGB"
                },{
                    name: "动态分析",
                    name_en: "dynamic segmentation",
                    thumbnail: "ol_generateSpatialDataService.png",
                    fileName: "04_generateSpatialDataService"
                }, {
                    name: "点定里程",
                    name_en: "route calculate measure",
                    thumbnail: "ol_routeCalculateMeasureService.png",
                    fileName: "04_routeCalculateMeasureService"
                }, {
                    name: "里程定点",
                    name_en: "route locator - point",
                    thumbnail: "ol_routeLocatorService_point.png",
                    fileName: "04_routeLocatorService_point"
                }, {
                    name: "里程定线",
                    name_en: "route locator - line",
                    thumbnail: "ol_routeLocatorService_line.png",
                    fileName: "04_routeLocatorService_line"
                }, {
                    name: "点密度插值分析",
                    name_en: "point density analysis",
                    thumbnail: "ol_interpolationAnalystService-Density.png",
                    fileName: "04_interpolationAnalystService_Density"
                }, {
                    name: "反距离加权插值分析",
                    name_en: "inverse distance weighted analysis",
                    thumbnail: "ol_interpolationAnalystService-IDW-dataset.png",
                    fileName: "04_interpolationAnalystService_IDW_dataset"
                }, {
                    name: "普通克吕金插值分析",
                    name_en: "Kriging interpolation",
                    thumbnail: "ol_interpolationAnalystService-Kriging.png",
                    fileName: "04_interpolationAnalystService_Kriging"
                }, {
                    name: "泛克吕金插值分析",
                    name_en: "KrigingUniversal interpolation",
                    thumbnail: "ol_interpolationAnalystService_KrigingUniversal.png",
                    fileName: "04_interpolationAnalystService_KrigingUniversal"
                }, {
                    name: "径向基函数插值分析",
                    name_en: "radial basis function interpolation",
                    thumbnail: "ol_interpolationAnalystService_RBF.png",
                    fileName: "04_interpolationAnalystService_RBF"
                }, {
                    name: "地形曲率计算",
                    name_en: "terrain curvature calculation",
                    thumbnail: "ol_terrainCurvatureCalculationService.png",
                    fileName: "04_terrainCurvatureCalculationService"
                }, {
                    name: "地形坡度计算",
                    name_en: "terrain slope calculation",
                    version: '11.1.1',
                    thumbnail: "terrainSlopeCalculationService.png",
                    fileName: "04_terrainSlopeCalculationService"
                }, {
                    name: "地形坡向计算",
                    name_en: "terrain aspect calculation",
                    version: '11.1.1',
                    thumbnail: "terrainAspectCalculationService.png",
                    fileName: "04_terrainAspectCalculationService"
                }, {
                    name: "填挖方计算",
                    name_en: "terrain cutfill calculation",
                    version: '11.1.1',
                    thumbnail: "terrainCutFillCalculationService.png",
                    fileName: "04_terrainCutFillCalculationService"
                }, {
                    name: "最近距离计算",
                    name_en: "min distance analysis",
                    version: '11.1.1',
                    thumbnail: "minDistanceAnalysisService.png",
                    fileName: "04_minDistanceAnalysisService"
                },{
                    name: "离散点插值分析",
                    name_en: "discrete point interpolation",
                    thumbnail: "ol_interpolationAnalystService_IDW_geometry.png",
                    fileName: "04_interpolationAnalystService_IDW_geometry"
                }, {
                    name: "栅格代数运算",
                    name_en: "math expression",
                    thumbnail: "ol_mathExpressionAnalysisService.png",
                    fileName: "04_mathExpressionAnalysisService"
                }, {
                    name: "核密度分析",
                    name_en: "kernel density",
                    thumbnail: "ol_densityAnalystService.png",
                    fileName: "04_densityKernelAnalystService"
                }, {
                    name: "几何对象批量空间分析",
                    name_en: "batchAnalyst_geometry",
                    thumbnail: "ol_geometryBatchAnalystService.png",
                    fileName: "04_geometryBatchAnalystService"
                }, {
                    name: "几何对象批量叠加分析",
                    name_en: "overlayBatchAnalyst_geometry",
                    thumbnail: "ol_geometryOverlayBatchAnalystService.png",
                    fileName: "04_geometryOverlayBatchAnalystService"
                }]
            },
            "networkAnalyst": {
                name: "网络分析",
                name_en: "Network analysis service",
                content: [{
                    name: "服务区分析",
                    name_en: "service area",
                    thumbnail: "ol_findServiceAreas.png",
                    fileName: "05_findServiceAreas"
                }, {
                    name: "最佳路径分析",
                    name_en: "best path",
                    thumbnail: "ol_findPathService.png",
                    fileName: "05_findPathService"
                }, {
                    name: "最近设施分析",
                    name_en: "closest facilities",
                    thumbnail: "ol_findClosetFacilitiesService.png",
                    fileName: "05_findClosestFacilitiesService"
                }, {
                    name: "选址分区分析",
                    name_en: "find location",
                    thumbnail: "ol_findLocationService.png",
                    fileName: "05_findLocationService"
                }, {
                    name: "多旅行商分析-物流配送",
                    name_en: "multi-traveler - logistics",
                    thumbnail: "ol_findMTSPPathsService.png",
                    fileName: "05_findMTSPPathsService"
                }, {
                    name: "旅行商分析-质检巡查",
                    name_en: "traveler - quality inspection",
                    thumbnail: "ol_findTSPPathsService.png",
                    fileName: "05_findTSPPathsService"
                }, {
                    name: "连通性分析",
                    name_en: "connectivity analysis",
                    version: '11.1.1',
                    thumbnail: "connectedEdgesService.png",
                    fileName: "05_connectedEdgesService"
                }, {
                    name: "上下游追踪分析",
                    name_en: "upstream and downstream trace",
                    version: '11.1.1',
                    thumbnail: "traceAnalystService.png",
                    fileName: "05_traceAnalystService"
                }]
            },
            "trafficTransferAnalyst": {
                name: "交通换乘",
                name_en: "Traffic transfer analysis",
                content: [{
                    name: "交通换乘",
                    name_en: "traffic transfer",
                    thumbnail: "ol_trafficTransferAnalystService.png",
                    fileName: "06_trafficTransferAnalystService"
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
                    thumbnail: "ol_singleObjectQueryJob.png",
                    fileName: "singleObjectQueryJobService"
                }, {
                    name: "叠加分析",
                    name_en: "overlay",
                    thumbnail: "ol_overlayJobService.png",
                    fileName: "overlayGeoJobService"
                }, {
                    name: "缓冲区分析",
                    name_en: "buffer",
                    thumbnail: "ol_buffersAnalystJobService.png",
                    fileName: "buffersAnalystJobService"
                }, {
                    name: "区域汇总分析",
                    name_en: "regional summary",
                    thumbnail: "SummaryRegionJobService.png",
                    fileName: "SummaryRegionJobService"
                }, {
                    name: "矢量裁剪分析",
                    name_en: "vector clip",
                    thumbnail: "ol_vectorClipJob.png",
                    fileName: "vectorClipJobService"
                }, {
                    name: "属性汇总分析",
                    name_en: "summary attributes",
                    thumbnail: "ol_summaryAttributes.png",
                    fileName: "summaryAttributesJobService"
                }, {
                    name: "拓扑检查分析",
                    name_en: "topology validator",
                    thumbnail: "ol_topologyValidatorJobService.png",
                    fileName: "topologyValidatorJobService"
                }]
            },
            "addressMatch": {
                name: "地址匹配",
                name_en: "Address matching service",
                content: [{
                    name: "地址匹配",
                    name_en: "address match",
                    thumbnail: "addressService.png",
                    fileName: "addressMatchService"
                }]
            },
            "dataFlow": {
                name: "数据流",
                name_en: "Data flow service",
                content: [{
                    name: "数据流",
                    name_en: "data flow",
                    thumbnail: "dataflow.gif",
                    fileName: "dataFlowService"
                }]
            },
            "webPrinting": {
                name: "Web 打印",
                name_en: "Web Printing",
                content: [
                    {
                        name: "Web 地图打印",
                        name_en: "Web Map Print",
                        version: "10.1.0",
                        thumbnail: "webPrintingJob.png",
                        fileName: "webPrintingJob"
                    }
                ]
            },
            "image": {
              name: "影像服务",
              name_en: "Image Service",
              content: [
                  {
                      name: "影像服务",
                      name_en: "Image Service",
                      version: "10.2.0",
                      thumbnail: "imageService.png",
                      fileName: "imageService"
                  },
                  {
                    name: "多时相播放",
                    name_en: "Multiphase play",
                    version: '11.3.0',
                    thumbnail: "multiphaseplay.png",
                    fileName: "multiphaseplay"
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
                    name: '不动产图谱-样式',
                    name_en: 'Real Estate GraphMap',
                    version: '11.1.0',
                    thumbnail: 'knowledgeGraphMap2.png',
                    fileName: 'knowledgeGraphMap2'
                  },
                  {
                    name: '河流流经省份图谱',
                    name_en: 'Rivers flowing through provinces GraphMap',
                    version: '11.1.0',
                    thumbnail: 'knowledgeGraphMap1.png',
                    fileName: 'knowledgeGraphMap1'
                },
                {
                  name: '最短路径',
                  name_en: 'Shortest Path',
                  version: '11.2.0',
                  thumbnail: 'knowledgeGraphMap2.png',
                  fileName: 'knowledgeGraph_shortestpath'
                }
              ]
            },
            "security": {
                name: "安全",
                name_en: "Security",
                content: [{
                    name: "安全认证",
                    name_en: "security certification",
                    thumbnail: "ol_iserver_security.png",
                    fileName: "iServerSecurity"
                }]
            }
        }
    },
    "iPortal": {
        name: "iPortal",
        name_en: "iPortal",
        content: {
            "ip_map": {
                name: "地图",
                name_en: "Web map",
                content: [{
                    name: "分段专题图",
                    name_en: "Range",
                    thumbnail: "iPortalWebmap_range.png",
                    fileName: "iportalWebMap"
                }]
            },
            "ip_security": {
                name: "安全",
                name_en: "Security",
                content: [{
                    name: "安全认证",
                    name_en: "security certification",
                    thumbnail: "ol_iportalSecurity.png",
                    fileName: "iPortalSecurity"
                }]
            },
            "ip_queryresources": {
                name: "资源中心",
                name_en: "Resources Center",
                content: [{
                    name: "资源中心",
                    name_en: "Resources Center",
                    version: "10.0.1",
                    thumbnail: "ol_iPortalQueryResources.png",
                    fileName: "iPortalQueryResources"
                }]
            },
            "ip_querymyresources": {
                name: "我的资源",
                name_en: "My Resource",
                content: [{
                    name: "我的资源",
                    name_en: "My Resource",
                    version: "10.0.1",
                    thumbnail: "ol_iPortalQueryMyResources.png",
                    fileName: "iPortalQueryMyResources"
                }]
            },
            "ip_batchaddresource": {
                name: "添加地图/场景",
                name_en: "Batch Add Map/Scene",
                content: [{
                    name: "添加地图/场景",
                    name_en: "Batch Add Map/Scene",
                    version: "10.1.0",
                    thumbnail: "ol_iPortalAddResource.png",
                    fileName: "iPortalBatchAddResource"
                }]
            },
            "ip_uploaddata": {
                name: "上传数据",
                name_en: "Upload Data",
                content: [{
                    name: "上传数据",
                    name_en: "Upload Data",
                    version: "10.1.0",
                    thumbnail: "ol_iPortalUploadData.png",
                    fileName: "iPortalUploadData"
                }]
            },
            "ip_registerdata": {
                name: "注册数据",
                name_en: "Register Data",
                content: [{
                    name: "注册数据",
                    name_en: "Register Data",
                    version: "10.1.0",
                    thumbnail: "ol_iPortalRegisterData.png",
                    fileName: "iPortalRegisterData"
                }]
            },
            "ip_publishdata": {
                name: "发布数据",
                name_en: "Publish Data",
                content: [{
                    name: "发布数据",
                    name_en: "Publish Data",
                    version: "10.1.0",
                    thumbnail: "ol_iportalPublishData.png",
                    fileName: "iPortalPublishData"
                }]
            }
        }
    },
    "Online": {
        name: "Online",
        name_en: "Online",
        localIgnore: true,
        content: {
            "ol_map": {
                name: "地图",
                name_en: "Web map",
                content: [{
                    name: "地图",
                    name_en: "Web Map",
                    thumbnail: "ol_onlineWebMap.png",
                    fileName: "onlineWebMap"
                }]
            },
            "ol_security": {
                name: "安全",
                name_en: "Security",
                content: [{
                    name: "安全认证",
                    name_en: "security certification",
                    thumbnail: "ol_onlineSecurity.png",
                    fileName: "onlineSecurity"
                }]
            }
        }
    },
    "viz": {
        name: "可视化",
        name_en: "Visualization",
        content: {
            "heat": {
                name: "热力图",
                name_en: "Heat map",
                content: [{
                    name: "随机点",
                    name_en: "random points",
                    thumbnail: "ol_heatmap.png",
                    fileName: "07_HeatMap"
                }, {
                    name: "随机点(Classic)",
                    name_en: "random points (Classic)",
                    version: "9.1.0",
                    thumbnail: "ol_heatMapLayer.png",
                    fileName: "heatMapLayer"
                }, {
                    name: "2005-2016地震次数(Classic)",
                    name_en: "earthquake occurrences(2005-2016)(classic)",
                    version: "9.1.0",
                    thumbnail: "ol_earthquakeHeatMapLayer.png",
                    fileName: 'earthquakeHeatMapLayer'
                }]
            },
            "cluster": {
                name: "聚点图",
                name_en: "Cluster",
                content: [{
                    name: "点聚合",
                    name_en: "point cluster",
                    thumbnail: "ol_cluster.png",
                    fileName: "07_Cluster"
                }]
            },
            "animationFeature": {
                name: "动画要素图",
                name_en: "Animation",
                content: [{
                    name: "动画点",
                    name_en: "flashing points",
                    thumbnail: "ol_animationFeature.gif",
                    fileName: "07_AnimationFeature"
                }]
            },
            "graphiclayer": {
                name: "高效率点图层",
                name_en: "High efficiency point layer",
                content: [{
                    name: "纽约出租车18万点-canvas渲染",
                    name_en: "canvas rendering",
                    thumbnail: "graphiclayer_canvas.png",
                    fileName: "07_graphiclayer_canvas"
                }, {
                    name: "纽约出租车18万点-canvas渲染",
                    name_en: "canvas rendering",
                    thumbnail: "graphiclayer_webgl.png",
                    fileName: "07_graphiclayer_circle"
                }, {
                    name: "纽约145万出租车-webgl",
                    name_en: "picture drawing of 1.45 million NY taxis",
                    version: "9.1.0",
                    thumbnail: "graphiclayer_webgl2.png",
                    fileName: "07_graphiclayer_webgl2"
                }, {
                    name: "纽约18万出租车-符号绘制",
                    name_en: "picture drawing of 180K NY taxis",
                    thumbnail: "graphiclayer_image.png",
                    fileName: "07_graphiclayer_image"
                }, {
                    name: "随机点-三叶草",
                    name_en: "random points(clover)",
                    version: "9.1.0",
                    thumbnail: "graphiclayer_clover.png",
                    fileName: "07_graphiclayer_clover"
                }]
            },
            "ECharts": {
                name: "ECharts",
                name_en: "ECharts",
                content: [
                    {
                        name: "折线图",
                        name_en: "line chart",
                        thumbnail: "ol_echartsLineMarker.png",
                        fileName: "echartsLineMarker"
                    },
                    {
                        name: "柱状图",
                        name_en: "bar chart",
                        thumbnail: "ol_echartsBar.png",
                        fileName: "echartsBar"
                    },
                    {
                        name: "散点图",
                        name_en: "scatter chart",
                        thumbnail: "ol_echartsScatter.png",
                        fileName: "echartsScatter"
                    },
                    {
                        name: "饼图",
                        name_en: "pie chart",
                        thumbnail: "ol_echartsPie.png",
                        fileName: "echartsPie"
                    },
                    {
                        name: "全国空气质量图",
                        name_en: "ECharts",
                        version: "9.1.0",
                        thumbnail: "ol_echartsEffectScatter.png",
                        fileName: "echartsEffectScatter"
                    },
                    {
                        name: "迁徙图",
                        name_en: "Mock migration",
                        version: "9.1.0",
                        thumbnail: "ol_echartsGeoLines.gif",
                        fileName: "echartsGeoLines"
                    },
                    {
                        name: "热力图",
                        name_en: "heat map",
                        version: "9.1.0",
                        thumbnail: "ol_echartsHeatmap.png",
                        fileName: "echartsHeatmap"
                    },
                    {
                        name: "线路图",
                        name_en: "line",
                        version: "9.1.0",
                        thumbnail: "ol_echartsLinesBus.png",
                        fileName: "echartsLinesBus"
                    },
                    {
                        name: "线特效",
                        name_en: "line effect",
                        version: "9.1.0",
                        thumbnail: "ol_echartsLinesEffect.gif",
                        fileName: "echartsLinesEffect"
                    },
                    {
                        name: "世界飞机航线图",
                        name_en: "Airplane route map",
                        version: "9.1.0",
                        thumbnail: "ol_echartsLinesAirline.png",
                        fileName: "echartsLinesAirline"
                    },
                    {
                        name: "微博签到图",
                        name_en: "scatter of Weibo user",
                        version: "9.1.0",
                        thumbnail: "ol_echartsScatterWeibo.png",
                        fileName: "echartsScatterWeibo"
                    },

                    {
                        name: "格网图",
                        name_en: "cell map",
                        version: "9.1.0",
                        thumbnail: "ol_echartsCellMap.png",
                        fileName: "echartsCellMap"
                    },
                    {
                        name: "2005到2016年地震概况统计",
                        name_en: "Earthquake occurrences(2005-2016)",
                        version: "9.1.0",
                        thumbnail: "ol_echartsEarthquake.png",
                        fileName: "echartsEarthquake"

                    }, {
                        name: "北京房价信息",
                        name_en: "Beijing house prices(2018.2)",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "ol_echartsLianjia.png",
                        fileName: "echartsLianjia"
                    }, {
                        name: "北京道路网络图（130万点数据绘制）",
                        name_en: "Use lines to draw 1.3 millions Beijing streets",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "ol_echartsLinesMillionsBeijingRoads.png",
                        fileName: "echarts_linesDrawMillionsBeijingRoadsNetwork"
                    }, {
                        name: "全国铁路网络图（400万点数据绘制）",
                        name_en: "Use lines to draw 4 millions Chinese railways",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "ol_echartsLinesMillionsRailway.png",
                        fileName: "echarts_linesDrawMillionsRailwaysNetwork"
                    }, {
                        name: "全国水系图（1400万点数据绘制）",
                        name_en: "Use lines to draw 14 millions Chinese water system",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "ol_echartsLinesMillionsWaterSystem.png",
                        fileName: "echarts_linesDrawMillionsWaterSystem"
                    }, {
                        name: "全国道路网络图（2500万点数据绘制）",
                        name_en: "Use lines to draw 25 millions Chinese roads",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "ol_echartsLinesMillionsRoads.png",
                        fileName: "echarts_linesDrawMillionsRoadsNetwork_50WFeatures"
                    }, {
                        name: "车辆监控模拟",
                        name_en: "Car Animation",
                        version: "9.1.0",
                        thumbnail: "ol_echartsAnimatorCar.png",
                        fileName: "echartsAnimatorCar"
                    }
                ]
            },
            "MapV": {
                name: "Mapv",
                name_en: "MapV",
                content: [{
                    name: "蜂巢图",
                    name_en: "honeycomb",
                    thumbnail: "mapvHoneycomb.png",
                    fileName: "mapvHoneycomb"
                }, {
                    name: "纽约出租车上车点",
                    name_en: "NY taxi car point",
                    thumbnail: "mapNycTaxi.png",
                    fileName: "mapvNycTaxi"
                }, {
                    name: "强边界图",
                    name_en: "force edge bundling",
                    thumbnail: "mapvForceEdgeBuilding.gif",
                    fileName: "mapvForceEdgeBuilding"
                }, {
                    name: "迁徙时序图",
                    name_en: "Migration timing",
                    thumbnail: "mapvQianxiTime.gif",
                    fileName: "mapvQianxiTime"
                }, {
                    name: "迁徙图",
                    name_en: "migration",
                    thumbnail: "mapvQianxi.gif",
                    fileName: "mapvQianxi"
                }, {
                    name: "动态轨迹",
                    name_en: "dynamic trajectory",
                    thumbnail: "mapvPolylineTime.gif",
                    fileName: "mapvPolylineTime"
                }, {
                    name: "强度线",
                    name_en: "line density",
                    thumbnail: "mapvPolylineIntensity.png",
                    fileName: "mapvPolylineIntensity"
                }, {
                    name: "通勤图",
                    name_en: "OD",
                    thumbnail: "mapvCsvcar.png",
                    fileName: "mapvCsvcar"
                }, {
                    name: "简单线",
                    name_en: "simple line",
                    thumbnail: "mapvPolylineSimple.png",
                    fileName: "mapvPolylineSimple"
                }, {
                    name: "面",
                    name_en: "simple polygon",
                    thumbnail: "ol_mapvLayer_polygon.png",
                    fileName: "mapvPolygon"
                }, {
                    name: "北京村庄分布图",
                    name_en: "village of beijing",
                    thumbnail: "mapvBeijingVillage.png",
                    fileName: "mapvBeijingVillage"
                }, {
                    name: "2018年2月北京房价信息",
                    name_en: "Beijing house prices(2018.2)",
                    version: "9.1.0",
                    localIgnore: true,
                    thumbnail: "mapvLianjia.png",
                    fileName: "mapvLianjia"
                }
                ]
            },
            "extrusion": {
                name: "OSMBuildings",
                name_en: "OSMBuildings",
                content: [{
                    name: "建筑立体效果",
                    name_en: "OSMBuildings",
                    thumbnail: "ol_osmbuildings.png",
                    fileName: "osmbuildings"
                }]
            },
            "vectorTileLayer": {
                name: "矢量瓦片",
                name_en: "Vector tile layer",
                content: [
                    // {
                    //     name: "默认风格",
                    //     name_en: "normal style",
                    //     thumbnail: "tiledVectorLayer.png",
                    //     fileName: "tiledVectorLayer"
                    // },
                    // {
                    //     name: "月夜风格",
                    //     name_en: "normal style",
                    //     thumbnail: "cartoCSS_nightStyle.png",
                    //     fileName: "cartoCSS_nightStyle"
                    // },
                    // {
                    //     name: "强边界风格",
                    //     name_en: "boundray style",
                    //     thumbnail: "cartoCSS_boundryStyle.png",
                    //     fileName: "cartoCSS_boundryStyle"
                    // },
                    // {
                    //     name: "深夜蓝黑风格",
                    //     name_en: "dark-blue style",
                    //     thumbnail: "cartoCSS_darkBlue.png",
                    //     fileName: "cartoCSS_darkBlue"
                    // },
                    // {
                    //     name: "HelloKitty风格",
                    //     name_en: "hellokitty style",
                    //     thumbnail: "cartoCSS_helloKitty.png",
                    //     fileName: "cartoCSS_helloKitty"
                    // },
                    // {
                    //     name: "淡雅绿风格",
                    //     name_en: "natural style",
                    //     thumbnail: "cartoCSS_naturalStyle.png",
                    //     fileName: "cartoCSS_naturalStyle"
                    // },
                    // {
                    //     name: "默认风格(MVT)",
                    //     name_en: "normal(MVT)",
                    //     thumbnail: "mvtVectorLayer.png",
                    //     fileName: "mvtVectorLayer"
                    // },
                    // {
                    //     name: "默认风格(MVT WGS84)",
                    //     name_en: "normal(MVT WGS84)",
                    //     thumbnail: "mvtVectorLayer4326.png",
                    //     fileName: "mvtVectorLayer4326"
                    // },
                    {
                        name: "OSM风格(MVT WGS84)",
                        name_en: "OSM Style(MVT WGS84)",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "mvtvectorlayer_mbstyle_4326.png",
                        fileName: "mvtvectorlayer_mbstyle_4326"
                    },
                    {
                        name: "风格动态切换",
                        name_en: "Style Switch",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "mvtvectorlayer_mbstyle_beijing.png",
                        fileName: "mvtvectorlayer_mbstyle_beijing"
                    },
                    {
                        name: "线样式编辑",
                        name_en: "Line Style Edit",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "mvtvectorlayer_mbstyle_linestyle.png",
                        fileName: "mvtvectorlayer_mbstyle_linestyle"
                    },
                    {
                        name: "土地利用",
                        name_en: "Land Use",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "mvtvectorlayer_mbstyle_landuse.png",
                        fileName: "mvtvectorlayer_mbstyle_landuse"
                    },
                    {
                        name: "iServer 矢量瓦片服务",
                        name_en: "iServer REST Vectortile",
                        version: "9.1.1",
                        thumbnail: "mvtvectorlayer_vectortilerest.png",
                        fileName: "mvtvectorlayer_vectortilerest"
                    }


                ]
            },
            "themeLayer": {
                name: "客户端专题图",
                name_en: "Client thematic layer",
                content: [{
                    name: "单值专题图",
                    name_en: "unique",
                    thumbnail: "uniqueThemeLayer.png",
                    fileName: "uniqueThemeLayer"
                }, {
                    name: "分段专题图",
                    name_en: "range",
                    thumbnail: "rangeThemeLayer.png",
                    fileName: "rangeThemeLayer"
                }, {
                    name: "符号等级专题图",
                    name_en: "rank symbol",
                    thumbnail: "rankSymbolThemeLayer.png",
                    fileName: "rankSymbolThemeLayer"
                }, {
                    name: "标签专题图",
                    name_en: "label ",
                    thumbnail: "labelThemeLayer.png",
                    fileName: "labelThemeLayer"
                }, {
                    name: "图表专题图",
                    name_en: "statistical chart",
                    thumbnail: "ol_graphThemeLayer.png",
                    fileName: "graphThemeLayer"
                }]
            },
            "mask": {
                name: "掩膜",
                name_en: "Mask",
                version: "10.1.0",
                content: [{
                    name: "图层掩膜",
                    name_en: "Layer Mask",
                    version: "10.1.0",
                    thumbnail: "mask.png",
                    fileName: "mask"
                }]
            },
            FlatGeobuf: {
              name: 'FlatGeobuf',
              name_en: 'FlatGeobuf',
              version: '11.1.0',
              content: [
                  {
                    name: 'FGB 全量加载（1400万点数据量）',
                    name_en: 'FGB Full Load (Use lines to draw 14 millions Chinese roads)',
                    version: '11.1.0',
                    thumbnail: 'fgb_all_load.png',
                    fileName: 'fgb_all_load'
                  },
                  {
                    name: 'FGB 按需加载（1400万点数据量）',
                    name_en: 'FGB Extent Load (Use lines to draw 14 millions Chinese roads)',
                    version: '11.1.0',
                    thumbnail: 'fgb_bbox_load.png',
                    fileName: 'fgb_bbox_load'
                  }
                ]
            }
        }
    },
    "plot": {
        name: "标绘",
        name_en: "Plot",
        content: {
            "draw": {
                name: "点线面绘制",
                name_en: "Draw",
                content: [{
                    name: "图形绘制",
                    name_en: "Features Drawing",
                    thumbnail: "drawFeatures.png",
                    fileName: "drawFeatures"
                }, {
                    name: "手写图形绘制",
                    name_en: "Handwritten Graphic Drawing",
                    thumbnail: "freehandDrawFeatures.png",
                    fileName: "freehandDrawFeatures"
                }, {
                    name: "捕捉图形绘制",
                    name_en: "Snap Features Drawing",
                    thumbnail: "snapDrawFeatures.png",
                    fileName: "snapDrawFeatures"
                }, {
                    name: "修改图形",
                    name_en: "Modify Features",
                    thumbnail: "modifyFeatures.png",
                    fileName: "modifyFeatures"
                }, {
                    name: "拖拽图形",
                    name_en: "Features Dragging",
                    thumbnail: "dragFeatures.png",
                    fileName: "dragFeatures"
                }]
            }
        }
    },
    "clientSpatialAnalyst": {
        name: "客户端分析",
        name_en: "Client spatial analysis",
        content: {
            "Turf": {
                name: "Turf",
                name_en: "Turf",
                content: [{
                    name: "插值分析",
                    name_en: "interpolation analysis",
                    thumbnail: "ol_interpolationAnalysis.png",
                    fileName: "turf_interpolationAnalysis"
                }, {
                    name: "分类分析",
                    name_en: "classification analysis",
                    thumbnail: "ol_classificationAnalysis.png",
                    fileName: "turf_classificationAnalysis"
                }, {
                    name: "格网分析",
                    name_en: "grid analysis",
                    thumbnail: "ol_gridAnalysis.png",
                    fileName: "turf_gridAnalysis"
                }, {
                    name: "测量计算",
                    name_en: "measurement",
                    thumbnail: "ol_turf_measurement.png",
                    fileName: "turf_measurement"
                }]
            },
            WebAssembly: {
              name: "WebAssembly",
              version: "11.2.0",
              content: [{
                name: "缓冲区分析",
                version: "11.2.0",
                name_en: "buffer analysis",
                thumbnail: "ugc_buffer.png",
                fileName: "ugc_buffer"
              }, {
                name: "凹凸面计算",
                version: "11.2.0",
                name_en: "convexHull calculate",
                thumbnail: "ugc_convexHull.png",
                fileName: "ugc_convexHull"
              }, {
                name: "地理面积计算",
                version: "11.2.0",
                name_en: "geodesic area calculate",
                thumbnail: "ugc_computeGeodesicArea.png",
                fileName: "ugc_computeGeodesicArea"
              }, {
                name: "测地线计算",
                version: "11.2.0",
                name_en: "geodesic distance calculate",
                thumbnail: "ugc_computeGeodesicDistance.png",
                fileName: "ugc_computeGeodesicDistance"
              }, {
                name: "平行线分析",
                name_en: "parallel analysis",
                version: "11.2.0",
                thumbnail: "ugc_computeParallel.png",
                fileName: "ugc_computeParallel"
              }, {
                name: "点线距离分析",
                version: "11.2.0",
                name_en: "distance To lineSegment analysis",
                thumbnail: "ugc_distanceToLineSegment.png",
                fileName: "ugc_distanceToLineSegment"
              }, {
                name: "面面相交分析",
                version: "11.2.0",
                name_en: "intersectRegion with rect analysis",
                thumbnail: "ugc_isIntersectRegionWithRect.png",
                fileName: "ugc_isIntersectRegionWithRect"
              }, {
                name: "线线计算",
                version: "11.2.0",
                name_en: "parallel and perpendicular calculate",
                thumbnail: "ugc_ParallelAndPerpendicular.png",
                fileName: "ugc_ParallelAndPerpendicular"
              }, {
                name: "重采样分析",
                version: "11.2.0",
                name_en: "resample analysis",
                thumbnail: "ugc_resample.png",
                fileName: "ugc_resample"
              }, {
                name: "点线计算",
                version: "11.2.0",
                name_en: "point and line calculate",
                thumbnail: "ugc_pointPositon.png",
                fileName: "ugc_pointPositon"
              },
              {
                name: "线光滑分析",
                version: "11.2.0",
                name_en: "smooth analysis",
                thumbnail: "ugc_smooth.png",
                fileName: "ugc_smooth"
              }, 
              {
                name: "空间分析",
                version: "11.2.0",
                name_en: "spatial analysis",
                thumbnail: "ugc_spatialRelationship.png",
                fileName: "ugc_spatialRelationship"
              }]
            }
        }
    },
    "control": {
        name: "控件",
        name_en: "Control",
        content: {
            // "changeTileVersion": {
            //     name: "缓存切换",
            //     name_en: "Tile version switch",
            //     content: [{
            //         name: "多版本缓存切换控件",
            //         name_en: "tile version switch control",
            //         thumbnail: "ol_changeTileVersion.png",
            //         fileName: "changeTileVersion"
            //     }]
            // },
            "openlayersOfficialControl": {
                name: "基础控件",
                name_en: "Base control",
                content: [{
                    name: "缩放控件",
                    name_en: "zoom control",
                    thumbnail: "ol_controler_zoom.png",
                    fileName: "controler_zoom"
                }, {
                    name: "比例尺控件",
                    name_en: "scaleline control",
                    thumbnail: "ol_controler_scaleline.png",
                    fileName: "controler_scaleline"
                }, {
                    name: "版权控件",
                    name_en: "attribution control",
                    thumbnail: "ol_controler_attribution.png",
                    fileName: "controler_attribution"
                }, {
                    name: "图层切换",
                    name_en: "layer switch control",
                    thumbnail: "ol_controler_layerswitcher.png",
                    fileName: "controler_layerswitcher"
                }, {
                    name: "卷帘",
                    name_en: "roller blinds",
                    thumbnail: "ol_controler_layerswitch.png",
                    fileName: "controler_layerswitch"
                }, {
                    name: "鹰眼图",
                    name_en: "overview map control",
                    thumbnail: "ol_controler_overviewMap.png",
                    fileName: "controler_overviewMap"
                }]
            }
        }
    },
    "OGC": {
        name: "OGC",
        name_en: "OGC",
        content: {
            "WMTS": {
                name: "WMTS",
                name_en: "WMTS",
                content: [{
                    name: "WMTS图层",
                    name_en: "WMTS layer",
                    thumbnail: "ol_WMTSLayer.png",
                    fileName: "WMTSLayer"
                }]
            },
            "WMS": {
                name: "WMS",
                name_en: "WMS",
                content: [{
                    name: "WMS图层",
                    name_en: "WMS layer",
                    thumbnail: "ol_WMSLayer.png",
                    fileName: "WMSLayer"
                }]
            }
        }
    },
    "mapping": {
        name: "互联网地图",
        name_en: "Third party map",
        localIgnore: true,
        content: {
            "Baidu": {
                name: "百度地图",
                name_en: "Baidu map",
                content: [{
                    name: "百度地图",
                    name_en: "baidu layer",
                    thumbnail: "ol_baiduLayer.png",
                    fileName: "baiduLayer"
                }]
            },
            "Tianditu": {
                name: "天地图",
                name_en: "Tianditu",
                content: [{
                    name: "天地图-影像-墨卡托",
                    name_en: "tianditu-iamge-mercator",
                    thumbnail: "ol_tianditu_mercator.png",
                    fileName: "tiandituLayer_mecartor"
                },{
                    name: "天地图-矢量-经纬度",
                    name_en: "tianditu-vector-wgs84",
                    thumbnail: "ol_tianditu_ll.png",
                    fileName: "tiandituLayer_vector"
                },{
                    name: "天地图-地形-经纬度",
                    name_en: "tianditu-terrain-wgs84",
                    thumbnail: "ol_tiandituLayer_ll_ter.png",
                    fileName: "tiandituLayer_ll"
                }
                ]
            },
            "SuperMapCloud": {
                name: "超图云",
                name_en: "SuperMap Cloud",
                content: [{
                    name: "超图云地图",
                    name_en: "SuperMap Cloud layer",
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
window.openlayersExampleConfig = exampleConfig;
