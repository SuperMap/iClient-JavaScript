/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.*/
/**
 * maplibregl 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var identification = {
    name: 'MaplibreGL'
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
                        name: '数据集泰森多边形',
                        name_en: 'thiessen-dataset',
                        thumbnail: 'mb_thiessenAnalystService-datasets.png',
                        fileName: '04_thiessenAnalystService_datasets'
                    },               
                    {
                        name: '几何泰森多边形',
                        name_en: 'thiessen-geometry',
                        thumbnail: 'mb_thiessenAnalystService-geometry.png',
                        fileName: '04_thiessenAnalystService_geometry'
                    },             
                    {
                        name: '叠加分析',
                        name_en: 'overlay',
                        thumbnail: 'mb_overlayAnalystService.png',
                        fileName: '04_overlayAnalystService'
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
