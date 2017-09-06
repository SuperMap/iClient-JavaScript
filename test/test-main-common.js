/**common -- iServer**/
//require('./common/iServer/AreaSolarRadiationServiceSpec.js');     //iclient8注释掉
require('./common/iServer/AddressMatchServiceSpec.js');

require('./common/iServer/BufferAnalystServiceSpec.js');
require('./common/iServer/BufferDistanceSpec.js');
require('./common/iServer/BufferSettingSpec.js');
require('./common/iServer/BurstPipelineAnalystServiceSpec.js');

//iclient8注释掉,海图测试LayerServices相关的类，等待服务端支持后添加
//require('./common/iServer/ChartFeatureInfoSpecsServiceSpec.js');
//require('./common/iServer/ChartQueryServiceSpec.js');

require('./common/iServer/ComputeWeightMatrixServiceSpec.js');

//require('./common/iServer/DensityAnalystServiceSpec.js');         //iclient8注释掉,fieldName

require('./common/iServer/EditFeaturesServiceSpec.js');

//三维网络分析Facility系列的测试全部被iClient8注释掉
//require('./common/iServer/FacilityAnalystSinks3DServiceSpec.js');
//require('./common/iServer/FacilityAnalystSources3DServiceSpec.js');
//require('./common/iServer/FacilityAnalystStreamServiceSpec.js');
//require('./common/iServer/FacilityAnalystTracedown3DServiceSpec.js');
//require('./common/iServer/FacilityAnalystTraceup3DServiceSpec.js');
//require('./common/iServer/FacilityAnalystUpstream3DServiceSpec.js');

require('./common/iServer/FieldStatisticServiceSpec.js');
require('./common/iServer/FindClosestFacilitiesServiceSpec.js');
require('./common/iServer/FindLocationServiceSpec.js');
require('./common/iServer/FindMTSPPathsServiceSpec.js');
require('./common/iServer/FindPathServiceSpec.js');
require('./common/iServer/FindServiceAreasServiceSpec.js');
require('./common/iServer/FindTSPPathsServiceSpec.js');

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

//require('./common/iServer/InterpolationAnalystServiceSpec.js');   //iclient8注释掉

require('./common/iServer/MapServiceSpec.js');
require('./common/iServer/MathExpressionAnalysisServiceSpec.js');
require('./common/iServer/MeasureServiceSpec.js');

require('./common/iServer/OverlayAnalystServiceSpec.js');

require('./common/iServer/QueryByBoundsServiceSpec.js');
require('./common/iServer/QueryByDistanceServiceSpec.js');
require('./common/iServer/QueryByGeometryServiceSpec.js');
require('./common/iServer/QueryBySQLServiceSpec.js');
require('./common/iServer/QueryServiceSpec.js');

require('./common/iServer/RouteCalculateMeasureServiceSpec.js');
require('./common/iServer/RouteLocatorServiceSpec.js');

//require('./common/iServer/SetLayerInfoServiceSpec.js');          //待开发先进行验证,再进行测试,暂时忽略
//require('./common/iServer/SetLayersInfoServiceSpec.js');         //待开发先进行验证,再进行测试,暂时忽略
require('./common/iServer/SetLayerStatusServiceSpec.js');
require('./common/iServer/StopQueryServiceSpec.js');
//require('./common/iServer/SurfaceAnalystServiceSpec.js');        //待开发将等值线LinearRing添加到GeoJason后再补充对应测试

require('./common/iServer/TerrainCurvatureCalculationServiceSpec.js');
require('./common/iServer/ThemeServiceSpec.js');
require('./common/iServer/ThiessenAnalystServiceSpec.js');
require('./common/iServer/TilesetsServiceSpec.js');
require('./common/iServer/TransferPathServiceSpec.js');
require('./common/iServer/TransferSolutionServiceSpec.js');

require('./common/iServer/UpdateEdgeWeightServiceSpec.js');
require('./common/iServer/UpdateTurnNodeWeightServiceSpec.js');
require('./common/format/JSONSpec.js');
require('./common/control/TimeControlBaseSpec.js');
require('./common/control/TimeFlowControlSpec.js');
require('./common/security/SecurityManagerSpec.js');
require('./common/iServer/RouteSpec.js');






