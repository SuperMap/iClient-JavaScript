/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/* control */
import { ChangeTileVersion, Logo, ScaleLine } from './control';

/* core */
import { StyleUtils, Util } from './core';

/* mapping */
import {
  BaiduMap,
  ImageSuperMapRest,
  SuperMapCloud,
  ImageTileSuperMapRest,
  Tianditu,
  TileSuperMapRest,
  WebMap
} from './mapping';

/* overlay */
import {
  CloverShape,
  OverlayGraphic,
  HitCloverShape,
  GeoFeature,
  Theme,
  ThemeFeature,
  MapboxStyles,
  VectorTileStyles,
  DataFlow,
  Graph,
  Graphic,
  HeatMap,
  Label,
  Mapv,
  Range,
  RankSymbol,
  Turf,
  Unique,
  VectorTileSuperMapRest
} from './overlay';

/* service */
import {
  AddressMatchService,
  ChartService,
  DataFlowService,
  DatasetService,
  DatasourceService,
  FeatureService,
  FieldService,
  GridCellInfosService,
  GeoprocessingService,
  LayerInfoService,
  MapService,
  MeasureService,
  NetworkAnalyst3DService,
  NetworkAnalystService,
  ProcessingService,
  QueryService,
  ServiceBase,
  SpatialAnalystService,
  ThemeService,
  TrafficTransferAnalystService,
  WebPrintingJobService,
  ImageService,
  ImageCollectionService
} from './services';

import { getFeatureBySQL, getFeatureProperties } from './mapping/webmap/Util';

if (window && window.ol) {
  let ol = window.ol;
  ol.supermap = window.ol.supermap || {};
  ol.supermap.control = window.ol.supermap.control || {};
  // control
  ol.supermap.control.ChangeTileVersion = ChangeTileVersion;
  ol.supermap.control.Logo = Logo;
  ol.supermap.control.ScaleLine = ScaleLine;
  // core
  ol.supermap.StyleUtils = StyleUtils;
  ol.supermap.Util = Util;
  ol.supermap.Util.getFeatureProperties = getFeatureProperties;
  ol.supermap.Util.getFeatureBySQL = getFeatureBySQL;
  // mapping
  ol.source.BaiduMap = BaiduMap;
  ol.source.ImageSuperMapRest = ImageSuperMapRest;
  ol.source.SuperMapCloud = SuperMapCloud;
  ol.source.ImageTileSuperMapRest = ImageTileSuperMapRest;
  ol.source.Tianditu = Tianditu;
  ol.source.TileSuperMapRest = TileSuperMapRest;
  ol.supermap.WebMap = WebMap;
  // overlay
  ol.style.CloverShape = CloverShape;
  ol.Graphic = OverlayGraphic;
  ol.style.HitCloverShape = HitCloverShape;
  ol.source.GeoFeature = GeoFeature;
  ol.source.Theme = Theme;
  ol.supermap.ThemeFeature = ThemeFeature;
  ol.supermap.MapboxStyles = MapboxStyles;
  ol.supermap.VectorTileStyles = VectorTileStyles;
  ol.source.DataFlow = DataFlow;
  ol.source.Graph = Graph;
  ol.source.Graphic = Graphic;
  ol.source.HeatMap = HeatMap;
  ol.source.Label = Label;
  ol.source.Mapv = Mapv;
  ol.source.Range = Range;
  ol.source.RankSymbol = RankSymbol;
  ol.source.Turf = Turf;
  ol.source.Unique = Unique;
  ol.source.VectorTileSuperMapRest = VectorTileSuperMapRest;
  // service
  ol.supermap.AddressMatchService = AddressMatchService;
  ol.supermap.ChartService = ChartService;
  ol.supermap.DataFlowService = DataFlowService;
  ol.supermap.DatasetService = DatasetService;
  ol.supermap.DatasourceService = DatasourceService;
  ol.supermap.FeatureService = FeatureService;
  ol.supermap.FieldService = FieldService;
  ol.supermap.GridCellInfosService = GridCellInfosService;
  ol.supermap.GeoprocessingService = GeoprocessingService;
  ol.supermap.LayerInfoService = LayerInfoService;
  ol.supermap.MapService = MapService;
  ol.supermap.MeasureService = MeasureService;
  ol.supermap.NetworkAnalyst3DService = NetworkAnalyst3DService;
  ol.supermap.NetworkAnalystService = NetworkAnalystService;
  ol.supermap.ProcessingService = ProcessingService;
  ol.supermap.QueryService = QueryService;
  ol.supermap.ServiceBase = ServiceBase;
  ol.supermap.SpatialAnalystService = SpatialAnalystService;
  ol.supermap.ThemeService = ThemeService;
  ol.supermap.TrafficTransferAnalystService = TrafficTransferAnalystService;
  ol.supermap.WebPrintingJobService = WebPrintingJobService;
  ol.supermap.ImageService = ImageService;
  ol.supermap.ImageCollectionService = ImageCollectionService;
}

export * from './control';
export * from './core';
export * from './mapping';
export * from './overlay';
export * from './services';

export {
  SuperMap,
  DataFormat,
  ServerType,
  GeometryType,
  QueryOption,
  JoinType,
  EngineType,
  MeasureMode,
  SpatialRelationType,
  DataReturnMode,
  Unit,
  BufferRadiusUnit,
  SpatialQueryMode,
  ThemeGraphTextFormat,
  ThemeGraphType,
  GraphAxesTextDisplayMode,
  GraduatedMode,
  RangeMode,
  ThemeType,
  ColorGradientType,
  TextAlignment,
  FillGradientMode,
  SideType,
  AlongLineDirection,
  LabelBackShape,
  LabelOverLengthMode,
  DirectionType,
  OverlayOperationType,
  SupplyCenterType,
  TurnType,
  BufferEndType,
  SmoothMethod,
  SurfaceAnalystMethod,
  ColorSpaceType,
  ChartType,
  EditType,
  TransferTactic,
  TransferPreference,
  GridType,
  ClientType,
  LayerType,
  UGCLayerType,
  StatisticMode,
  PixelFormat,
  SearchMode,
  SummaryType,
  InterpolationAlgorithmType,
  VariogramMode,
  Exponent,
  ClipAnalystMode,
  AnalystAreaUnit,
  AnalystSizeUnit,
  StatisticAnalystMode,
  TopologyValidatorRule,
  OutputType,
  MetricsAggType,
  BucketAggType,
  GetFeatureMode,
  //control
  TimeFlowControl,
  //iManager
  IManager,
  IManagerServiceBase,
  IManagerCreateNodeParam,
  //iPortal
  IPortal,
  IPortalQueryParam,
  IPortalResource,
  IPortalQueryResult,
  IPortalShareParam,
  IPortalShareEntity,
  IPortalServiceBase,
  IPortalUser,
  IPortalAddResourceParam,
  IPortalRegisterServiceParam,
  IPortalAddDataParam,
  IPortalDataMetaInfoParam,
  IPortalDataStoreInfoParam,
  IPortalDataConnectionInfoParam,
  //Online
  Online,
  OnlineData,
  OnlineQueryDatasParameter,
  ServiceStatus,
  DataItemType,
  DataItemOrderBy,
  FilterField,
  OnlineServiceBase,
  //security
  KeyServiceParameter,
  SecurityManager,
  ServerInfo,
  TokenServiceParameter,
  //thirdparty
  ElasticSearch,
  //util
  FetchRequest,
  ColorsPickerUtil,
  ArrayStatistic,
  //iServer
  AreaSolarRadiationParameters,
  AggregationParameter,
  BucketAggParameter,
  MetricsAggParameter,
  BufferAnalystParameters,
  BufferDistance,
  BuffersAnalystJobsParameter,
  BufferSetting,
  BurstPipelineAnalystParameters,
  ChartQueryFilterParameter,
  ChartQueryParameters,
  ClipParameter,
  ColorDictionary,
  ComputeWeightMatrixParameters,
  DataReturnOption,
  DatasetBufferAnalystParameters,
  DatasetInfo,
  DatasetOverlayAnalystParameters,
  DatasetSurfaceAnalystParameters,
  DatasetThiessenAnalystParameters,
  DatasourceConnectionInfo,
  DensityKernelAnalystParameters,
  EditFeaturesParameters,
  FacilityAnalyst3DParameters,
  FacilityAnalystSinks3DParameters,
  FacilityAnalystSources3DParameters,
  FacilityAnalystStreamParameters,
  FacilityAnalystTracedown3DParameters,
  FacilityAnalystTraceup3DParameters,
  FacilityAnalystUpstream3DParameters,
  FieldParameters,
  FieldStatisticsParameters,
  FilterParameter,
  FindClosestFacilitiesParameters,
  FindLocationParameters,
  FindMTSPPathsParameters,
  FindPathParameters,
  FindServiceAreasParameters,
  FindTSPPathsParameters,
  GenerateSpatialDataParameters,
  GeoCodingParameter,
  GeoDecodingParameter,
  GeoHashGridAggParameter,
  GeometryBufferAnalystParameters,
  GeometryOverlayAnalystParameters,
  GeometrySurfaceAnalystParameters,
  GeometryThiessenAnalystParameters,
  GeoRelationAnalystParameters,
  GetFeaturesByBoundsParameters,
  GetFeaturesByBufferParameters,
  GetFeaturesByGeometryParameters,
  GetFeaturesByIDsParameters,
  GetFeaturesBySQLParameters,
  GetGridCellInfosParameters,
  Grid,
  Image,
  InterpolationAnalystParameters,
  InterpolationIDWAnalystParameters,
  InterpolationKrigingAnalystParameters,
  InterpolationRBFAnalystParameters,
  JoinItem,
  KernelDensityJobParameter,
  LabelImageCell,
  LabelMatrixCell,
  LabelMixedTextStyle,
  LabelSymbolCell,
  LabelThemeCell,
  LayerStatus,
  LinkItem,
  MathExpressionAnalysisParameters,
  MeasureParameters,
  OutputSetting,
  MappingParameters,
  OverlapDisplayedOptions,
  OverlayAnalystParameters,
  OverlayGeoJobParameter,
  PointWithMeasure,
  QueryByBoundsParameters,
  QueryByDistanceParameters,
  QueryByGeometryParameters,
  QueryBySQLParameters,
  QueryParameters,
  Route,
  RouteCalculateMeasureParameters,
  RouteLocatorParameters,
  ServerColor,
  ServerFeature,
  ServerGeometry,
  ServerStyle,
  ServerTextStyle,
  ServerTheme,
  SetLayerInfoParameters,
  SetLayersInfoParameters,
  SetLayerStatusParameters,
  SingleObjectQueryJobsParameter,
  StopQueryParameters,
  SummaryAttributesJobsParameter,
  SummaryMeshJobParameter,
  SummaryRegionJobParameter,
  SupplyCenter,
  SurfaceAnalystParameters,
  SurfaceAnalystParametersSetting,
  TerrainCurvatureCalculationParameters,
  Theme as CommonTheme,
  ThemeDotDensity,
  ThemeFlow,
  ThemeGraduatedSymbol,
  ThemeGraduatedSymbolStyle,
  ThemeGraph,
  ThemeGraphAxes,
  ThemeGraphItem,
  ThemeGraphSize,
  ThemeGraphText,
  ThemeGridRange,
  ThemeGridRangeItem,
  ThemeGridUnique,
  ThemeGridUniqueItem,
  ThemeLabel,
  ThemeLabelAlongLine,
  ThemeLabelBackground,
  ThemeLabelItem,
  ThemeLabelText,
  ThemeLabelUniqueItem,
  ThemeMemoryData,
  ThemeOffset,
  ThemeParameters,
  ThemeRange,
  ThemeRangeItem,
  ThemeUnique,
  ThemeUniqueItem,
  ThiessenAnalystParameters,
  TopologyValidatorJobsParameter,
  TransferLine,
  TransferPathParameters,
  TransferSolutionParameters,
  TransportationAnalystParameter,
  TransportationAnalystResultSetting,
  UGCLayer,
  UGCMapLayer,
  UGCSubLayer,
  UpdateEdgeWeightParameters,
  UpdateTurnNodeWeightParameters,
  Vector,
  VectorClipJobsParameter,
  //components
  FileTypes,
  FileConfig,
  FileModel,
  MessageBox,
  CommonContainer,
  DropDownBox,
  Select,
  AttributesPopContainer,
  PopContainer,
  IndexTabsPageContainer,
  CityTabsPage,
  NavTabsPage,
  PaginationContainer,
  ComponentsUtil,
  FileReaderUtil
} from '@supermap/iclient-common/namespace';
