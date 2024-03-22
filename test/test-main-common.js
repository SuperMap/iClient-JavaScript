/**common -- iServer**/
import './common/iServer/KnowledgeGraphServiceSpec.js';
import './common/iServer/AddressMatchServiceSpec.js';
import './common/iServer/AggregationParameterSpec.js';
import './common/iServer/BucketAggParameterSpec.js';
import './common/iServer/MetricsAggParameterSpec.js';
import './common/iServer/AreaSolarRadiationParametersSpec.js';
import './common/iServer/BufferAnalystServiceSpec.js';
import './common/iServer/BufferDistanceSpec.js';
import './common/iServer/BufferSettingSpec.js';
import './common/iServer/BurstPipelineAnalystServiceSpec.js';
import './common/iServer/ChartQueryFilterParameterSpec.js';
import './common/iServer/ChartQueryParametersSpec.js';
import './common/iServer/ChartAcronymClassifyServiceSpec.js';
import './common/iServer/ChartSettingSpec.js';
import './common/iServer/ClipParameterSpec.js';
import './common/iServer/ComputeWeightMatrixServiceSpec.js';
import './common/iServer/DensityAnalystServiceSpec.js';
import './common/iServer/EditFeaturesServiceSpec.js';
import './common/iServer/FeatureAttachmentsServiceSpec.js';
import './common/iServer/FacilityAnalystStreamParametersSpec.js';
import './common/iServer/FacilityAnalystUpstream3DParametersSpec.js';
import './common/iServer/FieldStatisticServiceSpec.js';
import './common/iServer/FindClosestFacilitiesServiceSpec.js';
import './common/iServer/FindLocationServiceSpec.js';
import './common/iServer/FindMTSPPathsServiceSpec.js';
import './common/iServer/FindPathServiceSpec.js';
import './common/iServer/FindServiceAreasServiceSpec.js';
import './common/iServer/FindTSPPathsServiceSpec.js';
import './common/iServer/TraceAnalystServiceSpec.js';
import './common/iServer/ConnectedEdgesAnalystServiceSpec.js';
import './common/iServer/GenerateSpatialDataServiceSpec.js';
import './common/iServer/GeoHashGridAggParameterSpec.js';
import './common/iServer/GeoprocessingServiceSpec.js';
import './common/iServer/ConvexHullAnalystServiceSpec.js';
import './common/iServer/ConvexHullAnalystParametersSpec.js';
import './common/iServer/MinDistanceAnalystServiceSpec.js';

import './common/iServer/GeometryBatchAnalystServiceSpec.js';
import './common/iServer/GeoRelationAnalystServiceSpec.js';
import './common/iServer/GetFeaturesByBoundsServiceSpec.js';
import './common/iServer/GetFeaturesByBufferServiceSpec.js';
import './common/iServer/GetFeaturesByGeometryServiceSpec.js';
import './common/iServer/GetFeaturesByIDsServiceSpec.js';
import './common/iServer/GetFeaturesBySQLServiceSpec.js';
import './common/iServer/GetFieldsServiceSpec.js';
import './common/iServer/GetGridCellInfosServiceSpec.js';
import './common/iServer/GetLayersInfoServiceSpec.js';
import './common/iServer/GetLayersLegendInfoServiceSpec.js';
import './common/iServer/GridSpec.js';
import './common/iServer/ImageSpec.js';
import './common/iServer/InterpolationAnalystServiceSpec.js';
import './common/iServer/LabelImageCellSpec.js';
import './common/iServer/LabelMixedStyleSpec.js';
import './common/iServer/LinkItemSpec.js';
import './common/iServer/MapServiceSpec.js';
import './common/iServer/MathExpressionAnalysisServiceSpec.js';
import './common/iServer/MeasureServiceSpec.js';
import './common/iServer/OverlapDisplayedOptionsSpec.js';
import './common/iServer/OverlayAnalystServiceSpec.js';
import './common/iServer/QueryByBoundsServiceSpec.js';
import './common/iServer/QueryByDistanceServiceSpec.js';
import './common/iServer/QueryByGeometryServiceSpec.js';
import './common/iServer/QueryBySQLServiceSpec.js';
import './common/iServer/QueryServiceSpec.js';
import './common/iServer/RouteCalculateMeasureServiceSpec.js';
import './common/iServer/RouteLocatorServiceSpec.js';
import './common/iServer/RouteSpec.js';
import './common/iServer/ServerGeometrySpec.js';
import './common/iServer/SetLayerInfoServiceSpec.js';
import './common/iServer/SetLayersInfoServiceSpec.js';
import './common/iServer/SetLayerStatusServiceSpec.js';
import './common/iServer/StopQueryServiceSpec.js';
import './common/iServer/SummaryAttributesJobsParameterSpec.js';
import './common/iServer/SurfaceAnalystServiceSpec.js';
import './common/iServer/TerrainCurvatureCalculationServiceSpec.js';
import './common/iServer/TerrainAspectCalculationServiceSpec.js';
import './common/iServer/TerrainSlopeCalculationServiceSpec.js';
import './common/iServer/TerrainCutFillCalculationServiceSpec.js';
import './common/iServer/ThemeDotDensitySpec.js';
import './common/iServer/ThemeGridRangeSpec.js';
import './common/iServer/ThemeGridUniqueSpec.js';
import './common/iServer/ThemeLabelUniqueItemSpec.js';
import './common/iServer/ThemeRangeSpec.js';
import './common/iServer/ThemeServiceSpec.js';
import './common/iServer/ThiessenAnalystServiceSpec.js';
import './common/iServer/TilesetsServiceSpec.js';
import './common/iServer/TransferLineSpec.js';
import './common/iServer/TransferPathServiceSpec.js';
import './common/iServer/TransferSolutionServiceSpec.js';
import './common/iServer/UpdateEdgeWeightServiceSpec.js';
import './common/iServer/UpdateTurnNodeWeightServiceSpec.js';
import './common/iServer/WebPrintingServiceSpec.js';
import './common/iServer/DatasetServiceSpec.js';
import './common/iServer/DatasourceServiceSpec.js';
// import './common/iServer/AreaSolarRadiationServiceSpec.js';       //iclient8注释掉
// import './common/iServer/ChartFeatureInfoSpecsServiceSpec.js';    //iclient8注释掉,海图测试LayerServices相关的类，等待服务端支持后添加
// import './common/iServer/ChartQueryServiceSpec.js';
// import './common/iServer/FacilityAnalystSinks3DServiceSpec.js';   //三维网络分析Facility系列的测试全部被iClient8注释掉
// import './common/iServer/FacilityAnalystSources3DServiceSpec.js';
// import './common/iServer/FacilityAnalystStreamServiceSpec.js';
// import './common/iServer/FacilityAnalystTracedown3DServiceSpec.js';
// import './common/iServer/FacilityAnalystTraceup3DServiceSpec.js';
// import './common/iServer/FacilityAnalystUpstream3DServiceSpec.js';
import './common/iServer/ImageServiceSpec';
import './common/iServer/imageCollectionServiceSpec';
import './common/iServer/FieldsFilterSpec';
import './common/iServer/ImageGFAspectSpec';
import './common/iServer/ImageGFHillShadeSpec';
import './common/iServer/ImageGFOrthoSpec';
import './common/iServer/ImageGFSlopeSpec';
import './common/iServer/ImageSearchParameterSpec';
import './common/iServer/ImageRenderingRuleSpec';
import './common/iServer/SortbySpec';
import './common/iServer/ImageStretchOptionSpec';
import './common/iServer/CompatibleSpec.js';

/**common -- control**/
import './common/control/TimeControlBaseSpec.js';
import './common/control/TimeFlowControlSpec.js';

/**common -- format**/
import './common/format/GeoJSONSpec.js';
import './common/format/JSONSpec.js';
import './common/format/WKTSpec.js';

/**common -- style**/
import './common/style/CartoCSSSpec.js';

/**common -- security**/
import './common/security/KeyServiceParameterSpec.js';
import './common/security/SecurityManagerSpec.js';

/**common -- commontypes**/
import './common/commontypes/BaseTypesSpec.js';
import './common/commontypes/BoundsSpec.js';
import './common/commontypes/DateSpec.js';
import './common/commontypes/LonLatSpec.js';
import './common/commontypes/PixelSpec.js';
import './common/commontypes/VectorSpec.js';
import './common/commontypes/UtilSpec.js';
import './common/commontypes/geometry/CollectionSpec.js';
import './common/commontypes/geometry/GeoTextSpec.js';
import './common/commontypes/geometry/LineStringSpec.js';
import './common/commontypes/geometry/LinearRingSpec.js';

/**common -- overlay**/
import './common/overlay/feature/ShapeFactorySpec.js';
import './common/overlay/levelRenderer/AreaSpec.js';
import './common/overlay/levelRenderer/ClipSpec.js';
import './common/overlay/levelRenderer/AnimationSpec.js';
import './common/overlay/levelRenderer/ColorSpec.js';
import './common/overlay/levelRenderer/ComputeBoundingBoxSpec';
import './common/overlay/levelRenderer/CurveSpec.js';
import './common/overlay/levelRenderer/EasingSpec.js';
import './common/overlay/levelRenderer/GroupSpec.js';
import './common/overlay/levelRenderer/LevelRendererSpec.js';
import './common/overlay/levelRenderer/MatrixSpec.js';
import './common/overlay/levelRenderer/PainterSpec.js';
import './common/overlay/levelRenderer/RenderSpec.js';
import './common/overlay/levelRenderer/ShapeSpec.js';
import './common/overlay/levelRenderer/SmicBrokenLineSpec.js';
import './common/overlay/levelRenderer/SmicCircleSpec.js';
import './common/overlay/levelRenderer/SmicEllipseSpec';
import './common/overlay/levelRenderer/SmicImageSpec.js';
import './common/overlay/levelRenderer/SmicIsogonSpec.js';
import './common/overlay/levelRenderer/SmicPointSpec.js';
import './common/overlay/levelRenderer/SmicPolygonSpec.js';
import './common/overlay/levelRenderer/SmicRectangleSpec.js';
import './common/overlay/levelRenderer/SmicRingSpec.js';
import './common/overlay/levelRenderer/SmicSectorSpec.js';
import './common/overlay/levelRenderer/SmicStarSpec.js';
import './common/overlay/levelRenderer/SmicTextSpec.js';
import './common/overlay/levelRenderer/StorageSpec.js';
import './common/overlay/levelRenderer/TransformableSpec.js';
import './common/overlay/levelRenderer/UtilSpec.js';
import './common/overlay/levelRenderer/VectorSpec.js';
import './common/overlay/levelRenderer/HandlerSpec.js';
import './common/overlay/GraphSpec';
import './common/overlay/KnowledgeGraphSpec.js'

/**common -- online**/
import './common/online/OnlineDataSpec.js';
import './common/online/OnlineSpec.js';
import './common/online/OnlineQueryDatasParameterSpec';

/**common -- iManager**/
import './common/iManager/iManagerSpec.js';
import './common/iManager/iManagerCreateNodeParamSpec.js';

/**common -- iPortal**/
import './common/iPortal/iPortalQueryParamSpec.js';
import './common/iPortal/iPortalUserSpec.js';
import './common/iPortal/iPortalShareEntitySpec.js';
import './common/iPortal/iPortalShareParamSpec.js';
import './common/iPortal/iPortalResourceSpec.js';
import './common/iPortal/iPortalQueryResultSpec.js';
import './common/iPortal/iPortalSpec.js';
import './common/iPortal/iPortalAddResourceParamSpec';
import './common/iPortal/iPortalRegisterServiceParamSpec';
import './common/iPortal/iPortalAddDataParamSpec.js';
import './common/iPortal/iPortalDataMetaInfoParamSpec.js';
import './common/iPortal/iPortalDataStoreInfoParamSpec.js';
import './common/iPortal/iPortalDataConnectionInfoParamSpec.js';

// /**common -- thirdparty**/
import './common/thirdparty/elasticsearch/@elasticSpec.js';
import './common/thirdparty/elasticsearch/ElasticSearchSpec.js';
// import './common/thirdparty/ai/BinaryClassificationSpec.js';
// import './common/thirdparty/ai/LandcoverClassificationSpec.js';
// import './common/thirdparty/ai/WebMachineLearningSpec.js';
// import './common/thirdparty/ai/ObjectDetectionSpec.js';
/**common -- component**/
import './common/components/templates/IndexTabsPageContainerSpec.js';
import './common/components/templates/NavTabsPageSpec.js';
import './common/components/templates/CommonContainerSpec.js';
import './common/components/chart/ChartModelSpec.js';
import './common/components/chart/ChartViewModelSpec';
import './common/components/chart/ChartViewSpec';

import './common/util/FetchRequestSpec';
import './common/lang/LangSpec.js';
import './common/util/EncryptRequestSpec';
