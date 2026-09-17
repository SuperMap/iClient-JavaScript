/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.*/
/**
 * OpenLayers iServer 英文示例配置文件
 */
var identification = {
  name: "OpenLayers"
};
var exampleConfig = {};
exampleConfig.iServer = {
  name: "iServer",
  name_en: "iServer",
  content: {
    map: {
      name: "地图",
      name_en: "Map service",
      content: [
        {
          name: "4326底图",
          name_en: "4326 coordinate system",
          thumbnail: "ol_tiledMapLayer4326.png",
          fileName: "01_tiledMapLayer4326"
        },
        {
          name: "3857底图",
          name_en: "3857 coordinate system",
          thumbnail: "ol_tiledMapLayer3857.png",
          fileName: "01_tiledMapLayer3857"
        },
        {
          name: "地图叠加",
          name_en: "overlay tile layer",
          thumbnail: "ol_tiledMapLayerOverlapped.png",
          fileName: "01_tiledMapLayerOverlapped"
        },
        {
          name: "平面坐标系底图",
          name_en: "planar coordinate system",
          thumbnail: "ol_tiledMapLayerNoProj.png",
          fileName: "01_tiledMapLayerNoProj"
        },
        {
          name: "地图信息",
          name_en: "map query service",
          thumbnail: "ol_mapService.png",
          fileName: "01_mapService"
        },
        {
          name: "距离测量",
          name_en: "distance measurement service",
          thumbnail: "ol_measure-distance.png",
          fileName: "01_measure_distance"
        },
        {
          name: "面积测量",
          name_en: "area measurement service",
          thumbnail: "ol_measure-area.png",
          fileName: "01_measure_area"
        },
        {
          name: "图层信息",
          name_en: "layer service",
          thumbnail: "ol_layerService.png",
          fileName: "01_layerService"
        },
        {
          name: "范围查询",
          name_en: "bounds query",
          thumbnail: "ol_mapQueryByBounds.png",
          fileName: "01_mapQueryByBounds"
        },
        {
          name: "距离查询",
          name_en: "distance query",
          thumbnail: "ol_mapQueryByDistance.png",
          fileName: "01_mapQueryByDistance"
        },
        {
          name: "几何查询",
          name_en: "geometry query",
          thumbnail: "ol_mapQueryByGeometry.png",
          fileName: "01_mapQueryByGeometry"
        },
        {
          name: "SQL查询",
          name_en: "SQL query",
          thumbnail: "ol_mapQueryBySQL.png",
          fileName: "01_mapQueryBySQL"
        },
        {
          name: "SQL查询 (FGB)",
          name_en: "SQL query (FGB)",
          version: "11.1.0",
          thumbnail: "query_fgb_features.png",
          fileName: "01_mapQueryBySQL_FGB"
        },
        {
          name: "图例",
          name_en: "Legend",
          version: "11.1.1",
          thumbnail: "layersLegend.png",
          fileName: "01_layersLegend"
        },
        // {
        //   name: "海图",
        //   name_en: "Chart",
        //   version: "11.2.0",
        //   thumbnail: "chart.png",
        //   fileName: "01_chartService"
        // },
        {
          name: "创建临时图层",
          name_en: "Create temporary layer",
          version: "11.3.0",
          thumbnail: "createTempLayer.png",
          fileName: "createTempLayer"
        }
      ]
    },
    "en-data": {
      name: "数据",
      name_en: "Data service",
      content: [
        {
          name: "ID查询",
          name_en: "ID query",
          thumbnail: "ol_getFeatureByIDs.png",
          fileName: "02_getFeatureByIDs"
        },
        {
          name: "SQL查询",
          name_en: "SQL query",
          thumbnail: "ol_getFeatureBySQL.png",
          fileName: "02_getFeatureBySQL"
        },
        {
          name: "SQL查询 (FGB)",
          name_en: "SQL query (FGB)",
          version: "11.1.0",
          thumbnail: "query_fgb_features.png",
          fileName: "02_getFeatureBySQL_FGB"
        },
        {
          name: "范围查询",
          name_en: "bounds query",
          thumbnail: "ol_getFeatureByBounds.png",
          fileName: "02_getFeatureByBounds"
        },
        {
          name: "几何查询",
          name_en: "geometry query",
          thumbnail: "ol_getFeatureByGeometry.png",
          fileName: "02_getFeatureByGeometry"
        },
        {
          name: "缓冲区查询",
          name_en: "buffer query",
          thumbnail: "ol_getFeatureByBuffer.png",
          fileName: "02_getFeatureByBuffer"
        },
        // {
        //   name: "栅格查询",
        //   name_en: "data gridcell query",
        //   thumbnail: "ol_getGridCellInfos.png",
        //   fileName: "02_getGridCellInfos"
        // },
        {
          name: "字段信息",
          name_en: "field service",
          thumbnail: "ol_fieldsService.png",
          fileName: "02_fieldsService"
        },
        {
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
        // {
        //   name: "要素编辑",
        //   name_en: "draw and edit features",
        //   version: "11.2.0",
        //   thumbnail: "drawAndEditFeatures.png",
        //   fileName: "drawAndEditFeatures"
        // },
        {
          name: "属性表",
          name_en: "attributes",
          version: "11.2.0",
          thumbnail: "attributes.png",
          fileName: "02_attributes"
        }
      ]
    },
    "en-theme": {
      name: "专题图",
      name_en: "Server thematic service",
      content: [
        {
          name: "点密度专题图",
          name_en: "dot density",
          thumbnail: "ol_themeDotDensity.png",
          fileName: "03_themeDotDensity"
        },
        {
          name: "等级符号专题图",
          name_en: "graduated symbol",
          thumbnail: "ol_themeGraduatedSymbol.png",
          fileName: "03_themeGraduatedSymbol"
        },
        {
          name: "标签专题图",
          name_en: "label",
          thumbnail: "ol_themeLabel.png",
          fileName: "03_themeLabel"
        },
        {
          name: "分段专题图",
          name_en: "range",
          thumbnail: "ol_themeRange.png",
          fileName: "03_themeRange"
        },
        {
          name: "单值专题图",
          name_en: "unique",
          thumbnail: "ol_themeUnique.png",
          fileName: "03_themeUnique"
        }
        // ,
        // {
        //   name: "栅格分段专题图",
        //   name_en: "grid range",
        //   thumbnail: "ol_themeGridRange.png",
        //   fileName: "03_themeGridRange"
        // },
        // {
        //   name: "栅格单值专题图",
        //   name_en: "grid unique",
        //   thumbnail: "ol_themeGridUnique.png",
        //   fileName: "03_themeGridUnique"
        // }
      ]
    },
    "en-spatialAnalyst": {
      name: "空间分析",
      name_en: "Spatial analysis service",
      content: [
        {
          name: "数据集缓冲区分析",
          name_en: "buffer",
          thumbnail: "ol_bufferAnalystService.png",
          fileName: "04_bufferAnalystService"
        },
        {
          name: "数据集缓冲区分析 (FGB)",
          name_en: "buffer (FGB)",
          version: "11.1.0",
          thumbnail: "ol_bufferAnalystService.png",
          fileName: "04_bufferAnalystService_FGB"
        },
        {
          name: "几何对象缓冲区分析",
          name_en: "buffer-geometry",
          thumbnail: "ol_bufferAnalystService_geometry.png",
          fileName: "04_bufferAnalystService_geometry"
        },
//        {
//          name: "几何对象缓冲区分析 (FGB)",
//          name_en: "buffer-geometry (FGB)",
//          version: "11.1.0",
//          thumbnail: "ol_bufferAnalystService_geometry.png",
//          fileName: "04_bufferAnalystService_geometry_FGB"
//        },
        {
          name: "数据集泰森多边形",
          name_en: "thiessen-dataset",
          thumbnail: "ol_thiessenAnalystService-datasets.png",
          fileName: "04_thiessenAnalystService_datasets"
        },
        {
          name: "数据集泰森多边形 (FGB)",
          name_en: "thiessen-dataset (FGB)",
          version: "11.1.0",
          thumbnail: "ol_thiessenAnalystService-datasets.png",
          fileName: "04_thiessenAnalystService_datasets_FGB"
        },
        {
          name: "几何泰森多边形",
          name_en: "thiessen-geometry",
          thumbnail: "ol_thiessenAnalystService-geometry.png",
          fileName: "04_thiessenAnalystService_geometry"
        },
        {
          name: "几何泰森多边形 (FGB)",
          name_en: "thiessen-geometry (FGB)",
          version: "11.1.0",
          thumbnail: "ol_thiessenAnalystService-geometry.png",
          fileName: "04_thiessenAnalystService_geometry_FGB"
        },
        {
          name: "叠加分析",
          name_en: "overlay",
          thumbnail: "ol_overlayAnalystService.png",
          fileName: "04_overlayAnalystService"
        },
        {
          name: "叠加分析 (FGB)",
          name_en: "overlay (FGB)",
          version: "11.1.0",
          thumbnail: "ol_overlayAnalystService.png",
          fileName: "04_overlayAnalystService_FGB"
        },
        // {
        //   name: "表面分析(提取等值线)",
        //   name_en: "surface(Getting Contour Line)",
        //   thumbnail: "ol_surfaceAnalystService.png",
        //   fileName: "04_surfaceAnalystService"
        // },
        // {
        //   name: "表面分析(提取等值线) (FGB)",
        //   name_en: "surface(Getting Contour Line) (FGB)",
        //   version: "11.1.0",
        //   thumbnail: "ol_surfaceAnalystService.png",
        //   fileName: "04_surfaceAnalystService_FGB"
        // },
        // {
        //   name: "动态分析",
        //   name_en: "dynamic segmentation",
        //   thumbnail: "ol_generateSpatialDataService.png",
        //   fileName: "04_generateSpatialDataService"
        // },
        // {
        //   name: "点定里程",
        //   name_en: "route calculate measure",
        //   thumbnail: "ol_routeCalculateMeasureService.png",
        //   fileName: "04_routeCalculateMeasureService"
        // },
        // {
        //   name: "里程定点",
        //   name_en: "route locator - point",
        //   thumbnail: "ol_routeLocatorService_point.png",
        //   fileName: "04_routeLocatorService_point"
        // },
        // {
        //   name: "里程定线",
        //   name_en: "route locator - line",
        //   thumbnail: "ol_routeLocatorService_line.png",
        //   fileName: "04_routeLocatorService_line"
        // },
        // {
        //   name: "点密度插值分析",
        //   name_en: "point density analysis",
        //   thumbnail: "ol_interpolationAnalystService-Density.png",
        //   fileName: "04_interpolationAnalystService_Density"
        // },
        // {
        //   name: "反距离加权插值分析",
        //   name_en: "inverse distance weighted analysis",
        //   thumbnail: "ol_interpolationAnalystService-IDW-dataset.png",
        //   fileName: "04_interpolationAnalystService_IDW_dataset"
        // },
        // {
        //   name: "普通克吕金插值分析",
        //   name_en: "Kriging interpolation",
        //   thumbnail: "ol_interpolationAnalystService-Kriging.png",
        //   fileName: "04_interpolationAnalystService_Kriging"
        // },
        // {
        //   name: "泛克吕金插值分析",
        //   name_en: "KrigingUniversal interpolation",
        //   thumbnail: "ol_interpolationAnalystService_KrigingUniversal.png",
        //   fileName: "04_interpolationAnalystService_KrigingUniversal"
        // },
        // {
        //   name: "径向基函数插值分析",
        //   name_en: "radial basis function interpolation",
        //   thumbnail: "ol_interpolationAnalystService_RBF.png",
        //   fileName: "04_interpolationAnalystService_RBF"
        // },
        // {
        //   name: "地形曲率计算",
        //   name_en: "terrain curvature calculation",
        //   thumbnail: "ol_terrainCurvatureCalculationService.png",
        //   fileName: "04_terrainCurvatureCalculationService"
        // },
        // {
        //   name: "地形坡度计算",
        //   name_en: "terrain slope calculation",
        //   version: "11.1.1",
        //   thumbnail: "terrainSlopeCalculationService.png",
        //   fileName: "04_terrainSlopeCalculationService"
        // },
        // {
        //   name: "地形坡向计算",
        //   name_en: "terrain aspect calculation",
        //   version: "11.1.1",
        //   thumbnail: "terrainAspectCalculationService.png",
        //   fileName: "04_terrainAspectCalculationService"
        // },
        // {
        //   name: "填挖方计算",
        //   name_en: "terrain cutfill calculation",
        //   version: "11.1.1",
        //   thumbnail: "terrainCutFillCalculationService.png",
        //   fileName: "04_terrainCutFillCalculationService"
        // },
        // {
        //   name: "最近距离计算",
        //   name_en: "min distance analysis",
        //   version: "11.1.1",
        //   thumbnail: "minDistanceAnalysisService.png",
        //   fileName: "04_minDistanceAnalysisService"
        // },
        // {
        //   name: "离散点插值分析",
        //   name_en: "discrete point interpolation",
        //   thumbnail: "ol_interpolationAnalystService_IDW_geometry.png",
        //   fileName: "04_interpolationAnalystService_IDW_geometry"
        // },
        // {
        //   name: "栅格代数运算",
        //   name_en: "math expression",
        //   thumbnail: "ol_mathExpressionAnalysisService.png",
        //   fileName: "04_mathExpressionAnalysisService"
        // },
        // {
        //   name: "核密度分析",
        //   name_en: "kernel density",
        //   thumbnail: "ol_densityAnalystService.png",
        //   fileName: "04_densityKernelAnalystService"
        // },
        {
          name: "几何对象批量空间分析",
          name_en: "batchAnalyst_geometry",
          thumbnail: "ol_geometryBatchAnalystService.png",
          fileName: "04_geometryBatchAnalystService"
        },
        {
          name: "几何对象批量叠加分析",
          name_en: "overlayBatchAnalyst_geometry",
          thumbnail: "ol_geometryOverlayBatchAnalystService.png",
          fileName: "04_geometryOverlayBatchAnalystService"
        }
      ]
    }
  }
};

window.openlayersExampleConfig = exampleConfig;
