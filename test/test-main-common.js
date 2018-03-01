/**common -- iServer**/
require('./common/iServer/AddressMatchServiceSpec.js');
require('./common/iServer/AreaSolarRadiationParametersSpec.js');
require('./common/iServer/BufferAnalystServiceSpec.js');
require('./common/iServer/BufferDistanceSpec.js');
require('./common/iServer/BufferSettingSpec.js');
require('./common/iServer/BurstPipelineAnalystServiceSpec.js');
require('./common/iServer/ChartQueryFilterParameterSpec.js');
require('./common/iServer/ChartQueryParametersSpec.js');
require('./common/iServer/ClipParameterSpec.js');
require('./common/iServer/ComputeWeightMatrixServiceSpec.js');
require('./common/iServer/DensityAnalystServiceSpec.js');
require('./common/iServer/EditFeaturesServiceSpec.js');
require('./common/iServer/FacilityAnalystStreamParametersSpec.js');
require('./common/iServer/FacilityAnalystUpstream3DParametersSpec.js');
require('./common/iServer/FieldStatisticServiceSpec.js');
require('./common/iServer/FindClosestFacilitiesServiceSpec.js');
require('./common/iServer/FindLocationServiceSpec.js');
require('./common/iServer/FindMTSPPathsServiceSpec.js');
require('./common/iServer/FindPathServiceSpec.js');
require('./common/iServer/FindServiceAreasServiceSpec.js');
require('./common/iServer/FindTSPPathsServiceSpec.js');
require('./common/iServer/GeometryBatchAnalystServiceSpec.js');
require('./common/iServer/GenerateSpatialDataServiceSpec.js');
require('./common/iServer/GeoRelationAnalystServiceSpec.js');
require('./common/iServer/GetFeaturesByBoundsServiceSpec.js');
require('./common/iServer/GetFeaturesByBufferServiceSpec.js');
require('./common/iServer/GetFeaturesByGeometryServiceSpec.js');
require('./common/iServer/GetFeaturesByIDsServiceSpec.js');
require('./common/iServer/GetFeaturesBySQLServiceSpec.js');
require('./common/iServer/GetFieldsServiceSpec.js');
require('./common/iServer/GetGridCellInfosServiceSpec.js');
require('./common/iServer/GetLayersInfoServiceSpec.js');
require('./common/iServer/GridSpec.js');
require('./common/iServer/ImageSpec.js');
require('./common/iServer/InterpolationAnalystServiceSpec.js');
require('./common/iServer/LabelImageCellSpec.js');
require('./common/iServer/LabelMixedStyleSpec.js');
require('./common/iServer/LinkItemSpec.js');
require('./common/iServer/MapServiceSpec.js');
require('./common/iServer/MathExpressionAnalysisServiceSpec.js');
require('./common/iServer/MeasureServiceSpec.js');
require('./common/iServer/OverlapDisplayedOptionsSpec.js');
require('./common/iServer/OverlayAnalystServiceSpec.js');
require('./common/iServer/QueryByBoundsServiceSpec.js');
require('./common/iServer/QueryByDistanceServiceSpec.js');
require('./common/iServer/QueryByGeometryServiceSpec.js');
require('./common/iServer/QueryBySQLServiceSpec.js');
require('./common/iServer/QueryServiceSpec.js');
require('./common/iServer/RouteCalculateMeasureServiceSpec.js');
require('./common/iServer/RouteLocatorServiceSpec.js');
require('./common/iServer/RouteSpec.js');
require('./common/iServer/ServerGeometrySpec.js');
require('./common/iServer/SetLayerInfoServiceSpec.js');
require('./common/iServer/SetLayersInfoServiceSpec.js');
require('./common/iServer/SetLayerStatusServiceSpec.js');
require('./common/iServer/StopQueryServiceSpec.js');
require('./common/iServer/SummaryAttributesJobsParameterSpec.js');
require('./common/iServer/SurfaceAnalystServiceSpec.js');
require('./common/iServer/TerrainCurvatureCalculationServiceSpec.js');
require('./common/iServer/ThemeDotDensitySpec.js');
require('./common/iServer/ThemeGridRangeSpec.js');
require('./common/iServer/ThemeGridUniqueSpec.js');
require('./common/iServer/ThemeLabelUniqueItemSpec.js');
require('./common/iServer/ThemeRangeSpec.js');
require('./common/iServer/ThemeServiceSpec.js');
require('./common/iServer/ThiessenAnalystServiceSpec.js');
require('./common/iServer/TilesetsServiceSpec.js');
require('./common/iServer/TransferLineSpec.js');
require('./common/iServer/TransferPathServiceSpec.js');
require('./common/iServer/TransferSolutionServiceSpec.js');
require('./common/iServer/UpdateEdgeWeightServiceSpec.js');
require('./common/iServer/UpdateTurnNodeWeightServiceSpec.js');
//require('./common/iServer/AreaSolarRadiationServiceSpec.js');     //iclient8注释掉
//require('./common/iServer/ChartFeatureInfoSpecsServiceSpec.js');  //iclient8注释掉,海图测试LayerServices相关的类，等待服务端支持后添加
//require('./common/iServer/ChartQueryServiceSpec.js');
//require('./common/iServer/FacilityAnalystSinks3DServiceSpec.js'); //三维网络分析Facility系列的测试全部被iClient8注释掉
//require('./common/iServer/FacilityAnalystSources3DServiceSpec.js');
//require('./common/iServer/FacilityAnalystStreamServiceSpec.js');
//require('./common/iServer/FacilityAnalystTracedown3DServiceSpec.js');
//require('./common/iServer/FacilityAnalystTraceup3DServiceSpec.js');
//require('./common/iServer/FacilityAnalystUpstream3DServiceSpec.js');

/**common -- control**/
require('./common/control/TimeControlBaseSpec.js');
require('./common/control/TimeFlowControlSpec.js');

/**common -- format**/
require('./common/format/JSONSpec.js');
require('./common/format/WKTSpec.js');

/**common -- style**/
require('./common/style/CartoCSSSpec.js');

/**common -- security**/
require('./common/security/KeyServiceParameterSpec.js');
require('./common/security/SecurityManagerSpec.js');

/**common -- commonTypes**/
require('./common/commonTypes/BaseTypesSpec.js');
require('./common/commonTypes/BoundsSpec.js');
require('./common/commonTypes/DateSpec.js');
require('./common/commonTypes/LonLatSpec.js');
require('./common/commonTypes/PixelSpec.js');
require('./common/commonTypes/VectorSpec.js');
require('./common/commonTypes/geometry/CollectionSpec.js');
require('./common/commonTypes/geometry/GeoTextSpec.js');
require('./common/commonTypes/geometry/LineStringSpec.js');
require('./common/commonTypes/geometry/LinearRingSpec.js');

/**common -- overlay**/
require('./common/overlay/feature/ShapeFactorySpec.js');
require('./common/overlay/levelRenderer/AreaSpec.js');
require('./common/overlay/levelRenderer/ClipSpec.js');
require('./common/overlay/levelRenderer/ColorSpec.js');
require('./common/overlay/levelRenderer/ComputeBoundingBoxSpec');
require('./common/overlay/levelRenderer/CurveSpec.js');
require('./common/overlay/levelRenderer/EasingSpec.js');
require('./common/overlay/levelRenderer/GroupSpec.js');
require('./common/overlay/levelRenderer/LevelRendererSpec.js');
require('./common/overlay/levelRenderer/MatrixSpec.js');
require('./common/overlay/levelRenderer/PainterSpec.js');
require('./common/overlay/levelRenderer/RenderSpec.js');
require('./common/overlay/levelRenderer/ShapeSepc.js');
require('./common/overlay/levelRenderer/SmicBrokenLineSpec.js');
require('./common/overlay/levelRenderer/SmicCircleSpec.js');
require('./common/overlay/levelRenderer/SmicEllipseSpec');
require('./common/overlay/levelRenderer/SmicImageSpec.js');
require('./common/overlay/levelRenderer/SmicIsogonSpec.js');
require('./common/overlay/levelRenderer/SmicPointSpec.js');
require('./common/overlay/levelRenderer/SmicPolygonSpec.js');
require('./common/overlay/levelRenderer/SmicRectangleSpec.js');
require('./common/overlay/levelRenderer/SmicRingSpec.js');
require('./common/overlay/levelRenderer/SmicSectorSpec.js');
require('./common/overlay/levelRenderer/SmicStarSpec.js');
require('./common/overlay/levelRenderer/SmicTextSpec.js');
require('./common/overlay/levelRenderer/StorageSpec.js');
require('./common/overlay/levelRenderer/TransformableSpec.js');
require('./common/overlay/levelRenderer/UtilSpec.js');
require('./common/overlay/levelRenderer/VectorSpec.js');
require('./common/overlay/GraphSpec');

/**common -- online**/
require('./common/online/OnlineDataSpec.js');
require('./common/online/OnlineSpec.js');
require('./common/online/OnlineQueryDatasParameterSpec');

/**common -- iManager**/
require('./common/iManager/iManagerCreateNodeParamSpec.js');

/**common -- iPortal**/
require('./common/iPortal/iPortalMapSpec.js');
require('./common/iPortal/iPortalMapsQueryParamSpec.js');
require('./common/iPortal/iPortalServiceSpec.js');
require('./common/iPortal/iPortalServicesQueryParamSpec.js');

/**common -- thirdparty**/
require('./common/thirdparty/elasticsearch/ElasticSearchSpec.js');