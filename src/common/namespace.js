/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {
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
  RasterFunctionType,
  ResourceType,
  OrderBy,
  OrderType,
  SearchType,
  AggregationTypes,
  PermissionType,
  EntityType,
  WebExportFormatType,
  WebScaleOrientationType,
  WebScaleType,
  WebScaleUnit,
  DataItemType,
  GeometryCollection,
  GeometryCurve,
  GeometryGeoText,
  GeometryLinearRing,
  GeometryLineString,
  GeometryMultiLineString,
  GeometryMultiPoint,
  GeometryMultiPolygon,
  GeometryPoint,
  GeometryPolygon,
  GeometryRectangle,
  inheritExt,
  mixinExt,
  StringExt,
  NumberExt,
  FunctionExt,
  ArrayExt,
  Bounds,
  Credential,
  DateExt,
  Event,
  Events,
  Feature,
  Geometry,
  Pixel,
  Size,
  CommonUtil,
  Browser,
  Format,
  GeoJSONFormat,
  JSONFormat,
  WKTFormat,
  FeatureVector,
  TimeControlBase,
  TimeFlowControl,
  IManager,
  IManagerCreateNodeParam,
  IManagerServiceBase,
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
  AggregationParameter,
  BucketAggParameter,
  MetricsAggParameter,
  AreaSolarRadiationParameters,
  BufferAnalystParameters,
  BufferDistance,
  BufferSetting,
  BuffersAnalystJobsParameter,
  BurstPipelineAnalystParameters,
  ChartQueryFilterParameter,
  ChartQueryParameters,
  ClipParameter,
  ColorDictionary,
  CommonServiceBase,
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
  InterpolationDensityAnalystParameters,
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
  GetFeaturesParametersBase,
  GetFeaturesServiceBase,
  GetGridCellInfosParameters,
  Grid,
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
  NetworkAnalystServiceBase,
  OutputSetting,
  MappingParameters,
  OverlapDisplayedOptions,
  OverlayAnalystParameters,
  OverlayGeoJobParameter,
  PointWithMeasure,
  ProcessingServiceBase,
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
  SetDatasourceParameters,
  SetLayerInfoParameters,
  SetLayersInfoParameters,
  SetLayerStatusParameters,
  SingleObjectQueryJobsParameter,
  SpatialAnalystBase,
  StopQueryParameters,
  SummaryAttributesJobsParameter,
  SummaryMeshJobParameter,
  SummaryRegionJobParameter,
  SupplyCenter,
  SurfaceAnalystParameters,
  SurfaceAnalystParametersSetting,
  TerrainCurvatureCalculationParameters,
  Theme,
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
  TransportationAnalystParameter,
  TransportationAnalystResultSetting,
  TransferSolutionParameters,
  UGCLayer,
  UGCMapLayer,
  UGCSubLayer,
  UpdateEdgeWeightParameters,
  UpdateTurnNodeWeightParameters,
  UpdateDatasetParameters,
  CreateDatasetParameters,
  Vector,
  VectorClipJobsParameter,
  RasterFunctionParameter,
  NDVIParameter,
  HillshadeParameter,
  WebPrintingJobCustomItems,
  WebPrintingJobImage,
  WebPrintingJobLayers,
  WebPrintingJobLegendOptions,
  WebPrintingJobLittleMapOptions,
  WebPrintingJobNorthArrowOptions,
  WebPrintingJobScaleBarOptions,
  WebPrintingJobContent,
  WebPrintingJobLayoutOptions,
  WebPrintingJobExportOptions,
  WebPrintingJobParameters,
  FieldsFilter,
  ImageGFAspect,
  ImageGFHillShade,
  ImageGFOrtho,
  ImageGFSlope,
  ImageSearchParameter,
  ImageRenderingRule,
  Sortby,
  ImageStretchOption,
  Online,
  OnlineData,
  OnlineQueryDatasParameter,
  ServiceStatus,
  DataItemOrderBy,
  FilterField,
  OnlineServiceBase,
  KeyServiceParameter,
  SecurityManager,
  ServerInfo,
  TokenServiceParameter,
  // BinaryClassification,
  // LandcoverClassification,
  // ObjectDetection,
  // WebMachineLearning,
  ElasticSearch,
  isCORS,
  setCORS,
  FetchRequest,
  ColorsPickerUtil,
  ArrayStatistic,
  CartoCSS,
  ThemeStyle,
  FeatureThemeGraph,
  FeatureThemeRankSymbol,
  FeatureThemeVector,
  FeatureShapeFactory,
  ShapeParameters,
  ShapeParametersImage,
  ShapeParametersLabel,
  ShapeParametersCircle,
  ShapeParametersPoint,
  ShapeParametersLine,
  ShapeParametersPolygon,
  ShapeParametersRectangle,
  ShapeParametersSector,
  FeatureTheme,
  LevelRenderer,
  MessageBox,
  CommonContainer,
  DropDownBox,
  Select,
  TemplateBase,
  AttributesPopContainer,
  PopContainer,
  IndexTabsPageContainer,
  CityTabsPage,
  NavTabsPage,
  PaginationContainer,
  FileReaderUtil,
  ChartView,
  ChartViewModel,
  Lang,
  // service
  AddressMatchService,
  AreaSolarRadiationService,
  BufferAnalystService,
  BuffersAnalystJobsService,
  BurstPipelineAnalystService,
  ChartFeatureInfoSpecsService,
  ChartQueryService,
  ComputeWeightMatrixService,
  DatasetService,
  DatasourceService,
  DataFlowService,
  DensityAnalystService,
  EditFeaturesService,
  FacilityAnalystSinks3DService,
  FacilityAnalystSources3DService,
  FacilityAnalystStreamService,
  FacilityAnalystTracedown3DService,
  FacilityAnalystTraceup3DService,
  FacilityAnalystUpstream3DService,
  FieldStatisticService,
  FindClosestFacilitiesService,
  FindLocationService,
  FindMTSPPathsService,
  FindPathService,
  FindServiceAreasService,
  FindTSPPathsService,
  GeoprocessingService,
  GenerateSpatialDataService,
  GeoRelationAnalystService,
  GetFeaturesByBoundsService,
  GetFeaturesByBufferService,
  GetFeaturesByGeometryService,
  GetFeaturesByIDsService,
  GetFeaturesBySQLService,
  GetFieldsService,
  GetGridCellInfosService,
  GetLayersInfoService,
  GeometryBatchAnalystService,
  InterpolationAnalystService,
  KernelDensityJobsService,
  MapService,
  MathExpressionAnalysisService,
  MeasureService,
  OverlayAnalystService,
  OverlayGeoJobsService,
  QueryByBoundsService,
  QueryByDistanceService,
  QueryByGeometryService,
  QueryBySQLService,
  QueryService,
  RouteCalculateMeasureService,
  RouteLocatorService,
  SetLayerInfoService,
  SetLayersInfoService,
  SetLayerStatusService,
  SingleObjectQueryJobsService,
  StopQueryService,
  SummaryAttributesJobsService,
  SummaryMeshJobsService,
  SummaryRegionJobsService,
  SurfaceAnalystService,
  TerrainCurvatureCalculationService,
  ThemeService,
  ThiessenAnalystService,
  TilesetsService,
  TopologyValidatorJobsService,
  TransferPathService,
  TransferSolutionService,
  UpdateEdgeWeightService,
  UpdateTurnNodeWeightService,
  VectorClipJobsService,
  WebPrintingService,
  ImageCollectionService,
  ImageService
} from './index.all';

import { INCHES_PER_UNIT, METERS_PER_INCH, DOTS_PER_INCH, IS_GECKO } from './commontypes/Util';
import { UGCImage } from './iServer/Image';
import { setRequestTimeout, getRequestTimeout } from './util/FetchRequest';
import {
  FeatureThemeBar,
  FeatureThemeBar3D,
  FeatureThemeCircle,
  FeatureThemeLine,
  FeatureThemePie,
  FeatureThemePoint,
  FeatureThemeRing
} from './overlay';

// Lang
SuperMap.Lang = Lang;
SuperMap.i18n = SuperMap.Lang.i18n;
// CommonUtil
SuperMap.Util = { ...SuperMap.Util, ...CommonUtil };
SuperMap.Browser = Browser;
SuperMap.INCHES_PER_UNIT = INCHES_PER_UNIT;
SuperMap.METERS_PER_INCH = METERS_PER_INCH;
SuperMap.DOTS_PER_INCH = DOTS_PER_INCH;
SuperMap.IS_GECKO = IS_GECKO;

// FetchRequest
SuperMap.setCORS = setCORS;
SuperMap.isCORS = isCORS;
SuperMap.setRequestTimeout = setRequestTimeout;
SuperMap.getRequestTimeout = getRequestTimeout;
SuperMap.FetchRequest = FetchRequest;

// commontypes
SuperMap.inherit = inheritExt;
SuperMap.mixin = mixinExt;
SuperMap.String = StringExt;
SuperMap.Number = NumberExt;
SuperMap.Function = FunctionExt;
SuperMap.Array = ArrayExt;
SuperMap.Date = DateExt;
SuperMap.Event = Event;
SuperMap.Bounds = Bounds;
SuperMap.Credential = Credential;
SuperMap.Events = Events;
SuperMap.Feature = Feature;
SuperMap.Geometry = Geometry;
SuperMap.Pixel = Pixel;
SuperMap.Size = Size;
SuperMap.Feature.Vector = FeatureVector;
SuperMap.Geometry.Collection = GeometryCollection;
SuperMap.Geometry.Curve = GeometryCurve;
SuperMap.Geometry.GeoText = GeometryGeoText;
SuperMap.Geometry.LinearRing = GeometryLinearRing;
SuperMap.Geometry.LineString = GeometryLineString;
SuperMap.Geometry.MultiLineString = GeometryMultiLineString;
SuperMap.Geometry.MultiPoint = GeometryMultiPoint;
SuperMap.Geometry.MultiPolygon = GeometryMultiPolygon;
SuperMap.Geometry.Point = GeometryPoint;
SuperMap.Geometry.Polygon = GeometryPolygon;
SuperMap.Geometry.Rectangle = GeometryRectangle;
// Components
SuperMap.Components.Chart = ChartView;
SuperMap.Components.ChartViewModel = ChartViewModel;
SuperMap.Components.MessageBox = MessageBox;
SuperMap.Components.AttributesPopContainer = AttributesPopContainer;
SuperMap.Components.CityTabsPage = CityTabsPage;
SuperMap.Components.CommonContainer = CommonContainer;
SuperMap.Components.DropDownBox = DropDownBox;
SuperMap.Components.IndexTabsPageContainer = IndexTabsPageContainer;
SuperMap.Components.NavTabsPage = NavTabsPage;
SuperMap.Components.PaginationContainer = PaginationContainer;
SuperMap.Components.PopContainer = PopContainer;
SuperMap.Components.Select = Select;
SuperMap.Components.TemplateBase = TemplateBase;
SuperMap.Components.FileReaderUtil = FileReaderUtil;
// control
SuperMap.TimeControlBase = TimeControlBase;
SuperMap.TimeFlowControl = TimeFlowControl;
// Format
SuperMap.Format = SuperMap.Format || Format;
SuperMap.Format.GeoJSON = GeoJSONFormat;
SuperMap.Format.JSON = JSONFormat;
SuperMap.Format.WKT = WKTFormat;
// iManager
SuperMap.iManager = IManager;
SuperMap.iManagerCreateNodeParam = IManagerCreateNodeParam;
SuperMap.iManagerServiceBase = IManagerServiceBase;
// iPortal
SuperMap.iPortal = IPortal;
SuperMap.iPortalAddDataParam = IPortalAddDataParam;
SuperMap.iPortalAddResourceParam = IPortalAddResourceParam;
SuperMap.iPortalDataConnectionInfoParam = IPortalDataConnectionInfoParam;
SuperMap.iPortalDataMetaInfoParam = IPortalDataMetaInfoParam;
SuperMap.iPortalDataStoreInfoParam = IPortalDataStoreInfoParam;
SuperMap.iPortalQueryParam = IPortalQueryParam;
SuperMap.iPortalQueryResult = IPortalQueryResult;
SuperMap.iPortalRegisterServiceParam = IPortalRegisterServiceParam;
SuperMap.iPortalResource = IPortalResource;
SuperMap.iPortalServiceBase = IPortalServiceBase;
SuperMap.iPortalShareEntity = IPortalShareEntity;
SuperMap.iPortalShareParam = IPortalShareParam;
SuperMap.iPortalUser = IPortalUser;
// iServer
SuperMap.AddressMatchService = AddressMatchService;
SuperMap.AggregationParameter = AggregationParameter;
SuperMap.AreaSolarRadiationParameters = AreaSolarRadiationParameters;
SuperMap.AreaSolarRadiationService = AreaSolarRadiationService;
SuperMap.BucketAggParameter = BucketAggParameter;
SuperMap.BufferAnalystParameters = BufferAnalystParameters;
SuperMap.BufferAnalystService = BufferAnalystService;
SuperMap.BufferDistance = BufferDistance;
SuperMap.BuffersAnalystJobsParameter = BuffersAnalystJobsParameter;
SuperMap.BuffersAnalystJobsService = BuffersAnalystJobsService;
SuperMap.BufferSetting = BufferSetting;
SuperMap.BurstPipelineAnalystParameters = BurstPipelineAnalystParameters;
SuperMap.BurstPipelineAnalystService = BurstPipelineAnalystService;
SuperMap.ChartFeatureInfoSpecsService = ChartFeatureInfoSpecsService;
SuperMap.ChartQueryFilterParameter = ChartQueryFilterParameter;
SuperMap.ChartQueryParameters = ChartQueryParameters;
SuperMap.ChartQueryService = ChartQueryService;
SuperMap.ClipParameter = ClipParameter;
SuperMap.ColorDictionary = ColorDictionary;
SuperMap.CommonServiceBase = CommonServiceBase;
SuperMap.ComputeWeightMatrixParameters = ComputeWeightMatrixParameters;
SuperMap.ComputeWeightMatrixService = ComputeWeightMatrixService;
SuperMap.CreateDatasetParameters = CreateDatasetParameters;
SuperMap.DataFlowService = DataFlowService;
SuperMap.DataReturnOption = DataReturnOption;
SuperMap.DatasetBufferAnalystParameters = DatasetBufferAnalystParameters;
SuperMap.DatasetInfo = DatasetInfo;
SuperMap.DatasetOverlayAnalystParameters = DatasetOverlayAnalystParameters;
SuperMap.DatasetService = DatasetService;
SuperMap.DatasetSurfaceAnalystParameters = DatasetSurfaceAnalystParameters;
SuperMap.DatasetThiessenAnalystParameters = DatasetThiessenAnalystParameters;
SuperMap.DatasourceConnectionInfo = DatasourceConnectionInfo;
SuperMap.DatasourceService = DatasourceService;
SuperMap.DensityAnalystService = DensityAnalystService;
SuperMap.DensityKernelAnalystParameters = DensityKernelAnalystParameters;
SuperMap.EditFeaturesParameters = EditFeaturesParameters;
SuperMap.EditFeaturesService = EditFeaturesService;
SuperMap.FacilityAnalyst3DParameters = FacilityAnalyst3DParameters;
SuperMap.FacilityAnalystSinks3DParameters = FacilityAnalystSinks3DParameters;
SuperMap.FacilityAnalystSinks3DService = FacilityAnalystSinks3DService;
SuperMap.FacilityAnalystSources3DParameters = FacilityAnalystSources3DParameters;
SuperMap.FacilityAnalystSources3DService = FacilityAnalystSources3DService;
SuperMap.FacilityAnalystStreamParameters = FacilityAnalystStreamParameters;
SuperMap.FacilityAnalystStreamService = FacilityAnalystStreamService;
SuperMap.FacilityAnalystTracedown3DParameters = FacilityAnalystTracedown3DParameters;
SuperMap.FacilityAnalystTracedown3DService = FacilityAnalystTracedown3DService;
SuperMap.FacilityAnalystTraceup3DParameters = FacilityAnalystTraceup3DParameters;
SuperMap.FacilityAnalystTraceup3DService = FacilityAnalystTraceup3DService;
SuperMap.FacilityAnalystUpstream3DParameters = FacilityAnalystUpstream3DParameters;
SuperMap.FacilityAnalystUpstream3DService = FacilityAnalystUpstream3DService;
SuperMap.FieldParameters = FieldParameters;
SuperMap.FieldsFilter = FieldsFilter;
SuperMap.FieldStatisticService = FieldStatisticService;
SuperMap.FieldStatisticsParameters = FieldStatisticsParameters;
SuperMap.FilterParameter = FilterParameter;
SuperMap.FindClosestFacilitiesParameters = FindClosestFacilitiesParameters;
SuperMap.FindClosestFacilitiesService = FindClosestFacilitiesService;
SuperMap.FindLocationParameters = FindLocationParameters;
SuperMap.FindLocationService = FindLocationService;
SuperMap.FindMTSPPathsParameters = FindMTSPPathsParameters;
SuperMap.FindMTSPPathsService = FindMTSPPathsService;
SuperMap.FindPathParameters = FindPathParameters;
SuperMap.FindPathService = FindPathService;
SuperMap.FindServiceAreasParameters = FindServiceAreasParameters;
SuperMap.FindServiceAreasService = FindServiceAreasService;
SuperMap.FindTSPPathsParameters = FindTSPPathsParameters;
SuperMap.FindTSPPathsService = FindTSPPathsService;
SuperMap.GenerateSpatialDataParameters = GenerateSpatialDataParameters;
SuperMap.GenerateSpatialDataService = GenerateSpatialDataService;
SuperMap.GeoCodingParameter = GeoCodingParameter;
SuperMap.GeoDecodingParameter = GeoDecodingParameter;
SuperMap.GeoHashGridAggParameter = GeoHashGridAggParameter;
SuperMap.GeometryBatchAnalystService = GeometryBatchAnalystService;
SuperMap.GeometryBufferAnalystParameters = GeometryBufferAnalystParameters;
SuperMap.GeometryOverlayAnalystParameters = GeometryOverlayAnalystParameters;
SuperMap.GeometrySurfaceAnalystParameters = GeometrySurfaceAnalystParameters;
SuperMap.GeometryThiessenAnalystParameters = GeometryThiessenAnalystParameters;
SuperMap.GeoprocessingService = GeoprocessingService;
SuperMap.GeoRelationAnalystParameters = GeoRelationAnalystParameters;
SuperMap.GeoRelationAnalystService = GeoRelationAnalystService;
SuperMap.GetFeaturesByBoundsParameters = GetFeaturesByBoundsParameters;
SuperMap.GetFeaturesByBoundsService = GetFeaturesByBoundsService;
SuperMap.GetFeaturesByBufferParameters = GetFeaturesByBufferParameters;
SuperMap.GetFeaturesByBufferService = GetFeaturesByBufferService;
SuperMap.GetFeaturesByGeometryParameters = GetFeaturesByGeometryParameters;
SuperMap.GetFeaturesByGeometryService = GetFeaturesByGeometryService;
SuperMap.GetFeaturesByIDsParameters = GetFeaturesByIDsParameters;
SuperMap.GetFeaturesByIDsService = GetFeaturesByIDsService;
SuperMap.GetFeaturesBySQLParameters = GetFeaturesBySQLParameters;
SuperMap.GetFeaturesBySQLService = GetFeaturesBySQLService;
SuperMap.GetFeaturesParametersBase = GetFeaturesParametersBase;
SuperMap.GetFeaturesServiceBase = GetFeaturesServiceBase;
SuperMap.GetFieldsService = GetFieldsService;
SuperMap.GetGridCellInfosParameters = GetGridCellInfosParameters;
SuperMap.GetGridCellInfosService = GetGridCellInfosService;
SuperMap.GetLayersInfoService = GetLayersInfoService;
SuperMap.Grid = Grid;
SuperMap.HillshadeParameter = HillshadeParameter;
SuperMap.Image = UGCImage;
SuperMap.ImageCollectionService = ImageCollectionService;
SuperMap.ImageGFAspect = ImageGFAspect;
SuperMap.ImageGFHillShade = ImageGFHillShade;
SuperMap.ImageGFOrtho = ImageGFOrtho;
SuperMap.ImageGFSlope = ImageGFSlope;
SuperMap.ImageRenderingRule = ImageRenderingRule;
SuperMap.ImageSearchParameter = ImageSearchParameter;
SuperMap.ImageService = ImageService;
SuperMap.ImageStretchOption = ImageStretchOption;
SuperMap.InterpolationAnalystParameters = InterpolationAnalystParameters;
SuperMap.InterpolationAnalystService = InterpolationAnalystService;
SuperMap.InterpolationDensityAnalystParameters = InterpolationDensityAnalystParameters;
SuperMap.InterpolationIDWAnalystParameters = InterpolationIDWAnalystParameters;
SuperMap.InterpolationKrigingAnalystParameters = InterpolationKrigingAnalystParameters;
SuperMap.InterpolationRBFAnalystParameters = InterpolationRBFAnalystParameters;
SuperMap.JoinItem = JoinItem;
SuperMap.KernelDensityJobParameter = KernelDensityJobParameter;
SuperMap.KernelDensityJobsService = KernelDensityJobsService;
SuperMap.LabelImageCell = LabelImageCell;
SuperMap.LabelMatrixCell = LabelMatrixCell;
SuperMap.LabelMixedTextStyle = LabelMixedTextStyle;
SuperMap.LabelSymbolCell = LabelSymbolCell;
SuperMap.LabelThemeCell = LabelThemeCell;
SuperMap.LayerStatus = LayerStatus;
SuperMap.LinkItem = LinkItem;
SuperMap.MappingParameters = MappingParameters;
SuperMap.MapService = MapService;
SuperMap.MathExpressionAnalysisParameters = MathExpressionAnalysisParameters;
SuperMap.MathExpressionAnalysisService = MathExpressionAnalysisService;
SuperMap.MeasureParameters = MeasureParameters;
SuperMap.MeasureService = MeasureService;
SuperMap.MetricsAggParameter = MetricsAggParameter;
SuperMap.NDVIParameter = NDVIParameter;
SuperMap.NetworkAnalystServiceBase = NetworkAnalystServiceBase;
SuperMap.OutputSetting = OutputSetting;
SuperMap.OverlapDisplayedOptions = OverlapDisplayedOptions;
SuperMap.OverlayAnalystParameters = OverlayAnalystParameters;
SuperMap.OverlayAnalystService = OverlayAnalystService;
SuperMap.OverlayGeoJobParameter = OverlayGeoJobParameter;
SuperMap.OverlayGeoJobsService = OverlayGeoJobsService;
SuperMap.PointWithMeasure = PointWithMeasure;
SuperMap.ProcessingServiceBase = ProcessingServiceBase;
SuperMap.QueryByBoundsParameters = QueryByBoundsParameters;
SuperMap.QueryByBoundsService = QueryByBoundsService;
SuperMap.QueryByDistanceParameters = QueryByDistanceParameters;
SuperMap.QueryByDistanceService = QueryByDistanceService;
SuperMap.QueryByGeometryParameters = QueryByGeometryParameters;
SuperMap.QueryByGeometryService = QueryByGeometryService;
SuperMap.QueryBySQLParameters = QueryBySQLParameters;
SuperMap.QueryBySQLService = QueryBySQLService;
SuperMap.QueryParameters = QueryParameters;
SuperMap.QueryService = QueryService;
SuperMap.RasterFunctionParameter = RasterFunctionParameter;
SuperMap.Route = Route;
SuperMap.RouteCalculateMeasureParameters = RouteCalculateMeasureParameters;
SuperMap.RouteCalculateMeasureService = RouteCalculateMeasureService;
SuperMap.RouteLocatorParameters = RouteLocatorParameters;
SuperMap.RouteLocatorService = RouteLocatorService;
SuperMap.ServerColor = ServerColor;
SuperMap.ServerFeature = ServerFeature;
SuperMap.ServerGeometry = ServerGeometry;
SuperMap.ServerStyle = ServerStyle;
SuperMap.ServerTextStyle = ServerTextStyle;
SuperMap.ServerTheme = ServerTheme;
SuperMap.SetDatasourceParameters = SetDatasourceParameters;
SuperMap.SetLayerInfoParameters = SetLayerInfoParameters;
SuperMap.SetLayerInfoService = SetLayerInfoService;
SuperMap.SetLayersInfoParameters = SetLayersInfoParameters;
SuperMap.SetLayersInfoService = SetLayersInfoService;
SuperMap.SetLayerStatusParameters = SetLayerStatusParameters;
SuperMap.SetLayerStatusService = SetLayerStatusService;
SuperMap.SingleObjectQueryJobsParameter = SingleObjectQueryJobsParameter;
SuperMap.SingleObjectQueryJobsService = SingleObjectQueryJobsService;
SuperMap.Sortby = Sortby;
SuperMap.SpatialAnalystBase = SpatialAnalystBase;
SuperMap.StopQueryParameters = StopQueryParameters;
SuperMap.StopQueryService = StopQueryService;
SuperMap.SummaryAttributesJobsParameter = SummaryAttributesJobsParameter;
SuperMap.SummaryAttributesJobsService = SummaryAttributesJobsService;
SuperMap.SummaryMeshJobParameter = SummaryMeshJobParameter;
SuperMap.SummaryMeshJobsService = SummaryMeshJobsService;
SuperMap.SummaryRegionJobParameter = SummaryRegionJobParameter;
SuperMap.SummaryRegionJobsService = SummaryRegionJobsService;
SuperMap.SupplyCenter = SupplyCenter;
SuperMap.SurfaceAnalystParameters = SurfaceAnalystParameters;
SuperMap.SurfaceAnalystParametersSetting = SurfaceAnalystParametersSetting;
SuperMap.SurfaceAnalystService = SurfaceAnalystService;
SuperMap.TerrainCurvatureCalculationParameters = TerrainCurvatureCalculationParameters;
SuperMap.TerrainCurvatureCalculationService = TerrainCurvatureCalculationService;
SuperMap.Theme = Theme;
SuperMap.ThemeDotDensity = ThemeDotDensity;
SuperMap.ThemeFlow = ThemeFlow;
SuperMap.ThemeGraduatedSymbol = ThemeGraduatedSymbol;
SuperMap.ThemeGraduatedSymbolStyle = ThemeGraduatedSymbolStyle;
SuperMap.ThemeGraph = ThemeGraph;
SuperMap.ThemeGraphAxes = ThemeGraphAxes;
SuperMap.ThemeGraphItem = ThemeGraphItem;
SuperMap.ThemeGraphSize = ThemeGraphSize;
SuperMap.ThemeGraphText = ThemeGraphText;
SuperMap.ThemeGridRange = ThemeGridRange;
SuperMap.ThemeGridRangeItem = ThemeGridRangeItem;
SuperMap.ThemeGridUnique = ThemeGridUnique;
SuperMap.ThemeGridUniqueItem = ThemeGridUniqueItem;
SuperMap.ThemeLabel = ThemeLabel;
SuperMap.ThemeLabelAlongLine = ThemeLabelAlongLine;
SuperMap.ThemeLabelBackground = ThemeLabelBackground;
SuperMap.ThemeLabelItem = ThemeLabelItem;
SuperMap.ThemeLabelText = ThemeLabelText;
SuperMap.ThemeLabelUniqueItem = ThemeLabelUniqueItem;
SuperMap.ThemeMemoryData = ThemeMemoryData;
SuperMap.ThemeOffset = ThemeOffset;
SuperMap.ThemeParameters = ThemeParameters;
SuperMap.ThemeRange = ThemeRange;
SuperMap.ThemeRangeItem = ThemeRangeItem;
SuperMap.ThemeService = ThemeService;
SuperMap.ThemeUnique = ThemeUnique;
SuperMap.ThemeUniqueItem = ThemeUniqueItem;
SuperMap.ThiessenAnalystParameters = ThiessenAnalystParameters;
SuperMap.ThiessenAnalystService = ThiessenAnalystService;
SuperMap.TilesetsService = TilesetsService;
SuperMap.TopologyValidatorJobsParameter = TopologyValidatorJobsParameter;
SuperMap.TopologyValidatorJobsService = TopologyValidatorJobsService;
SuperMap.TransferLine = TransferLine;
SuperMap.TransferPathParameters = TransferPathParameters;
SuperMap.TransferPathService = TransferPathService;
SuperMap.TransferSolutionParameters = TransferSolutionParameters;
SuperMap.TransferSolutionService = TransferSolutionService;
SuperMap.TransportationAnalystParameter = TransportationAnalystParameter;
SuperMap.TransportationAnalystResultSetting = TransportationAnalystResultSetting;
SuperMap.UGCLayer = UGCLayer;
SuperMap.UGCMapLayer = UGCMapLayer;
SuperMap.UGCSubLayer = UGCSubLayer;
SuperMap.UpdateDatasetParameters = UpdateDatasetParameters;
SuperMap.UpdateEdgeWeightParameters = UpdateEdgeWeightParameters;
SuperMap.UpdateEdgeWeightService = UpdateEdgeWeightService;
SuperMap.UpdateTurnNodeWeightParameters = UpdateTurnNodeWeightParameters;
SuperMap.UpdateTurnNodeWeightService = UpdateTurnNodeWeightService;
SuperMap.Vector = Vector;
SuperMap.VectorClipJobsParameter = VectorClipJobsParameter;
SuperMap.VectorClipJobsService = VectorClipJobsService;
SuperMap.WebPrintingJobContent = WebPrintingJobContent;
SuperMap.WebPrintingJobCustomItems = WebPrintingJobCustomItems;
SuperMap.WebPrintingJobExportOptions = WebPrintingJobExportOptions;
SuperMap.WebPrintingJobImage = WebPrintingJobImage;
SuperMap.WebPrintingJobLayers = WebPrintingJobLayers;
SuperMap.WebPrintingJobLayoutOptions = WebPrintingJobLayoutOptions;
SuperMap.WebPrintingJobLegendOptions = WebPrintingJobLegendOptions;
SuperMap.WebPrintingJobLittleMapOptions = WebPrintingJobLittleMapOptions;
SuperMap.WebPrintingJobNorthArrowOptions = WebPrintingJobNorthArrowOptions;
SuperMap.WebPrintingJobParameters = WebPrintingJobParameters;
SuperMap.WebPrintingJobScaleBarOptions = WebPrintingJobScaleBarOptions;
SuperMap.WebPrintingService = WebPrintingService;
//Online
SuperMap.Online = Online;
SuperMap.OnlineData = OnlineData;
SuperMap.OnlineQueryDatasParameter = OnlineQueryDatasParameter;
SuperMap.ServiceStatus = ServiceStatus;
// 包含online中的DataItemType数据类型
SuperMap.DataItemType = DataItemType;
SuperMap.DataItemOrderBy = DataItemOrderBy;
SuperMap.FilterField = FilterField;
SuperMap.OnlineServiceBase = OnlineServiceBase;
// overlay
SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.Theme = FeatureTheme;
SuperMap.Feature.Theme.Bar = FeatureThemeBar;
SuperMap.Feature.Theme.Bar3D = FeatureThemeBar3D;
SuperMap.Feature.Theme.Circle = FeatureThemeCircle;
SuperMap.Feature.Theme.Graph = FeatureThemeGraph;
SuperMap.Feature.Theme.Line = FeatureThemeLine;
SuperMap.Feature.Theme.Pie = FeatureThemePie;
SuperMap.Feature.Theme.Point = FeatureThemePoint;
SuperMap.Feature.Theme.RankSymbol = FeatureThemeRankSymbol;
SuperMap.Feature.Theme.Ring = FeatureThemeRing;
SuperMap.Feature.Theme.ThemeVector = FeatureThemeVector;
SuperMap.Feature.ShapeParameters = ShapeParameters;
SuperMap.Feature.ShapeParameters.Circle = ShapeParametersCircle;
SuperMap.Feature.ShapeParameters.Image = ShapeParametersImage;
SuperMap.Feature.ShapeParameters.Label = ShapeParametersLabel;
SuperMap.Feature.ShapeParameters.Line = ShapeParametersLine;
SuperMap.Feature.ShapeParameters.Point = ShapeParametersPoint;
SuperMap.Feature.ShapeParameters.Polygon = ShapeParametersPolygon;
SuperMap.Feature.ShapeParameters.Rectangle = ShapeParametersRectangle;
SuperMap.Feature.ShapeParameters.Sector = ShapeParametersSector;
SuperMap.Feature.ShapeFactory = FeatureShapeFactory;
// LevelRenderer
SuperMap.LevelRenderer = LevelRenderer;

// security
SuperMap.KeyServiceParameter = KeyServiceParameter;
SuperMap.SecurityManager = SecurityManager;
SuperMap.ServerInfo = ServerInfo;
SuperMap.TokenServiceParameter = TokenServiceParameter;
// style
SuperMap.ThemeStyle = ThemeStyle;
SuperMap.CartoCSS = CartoCSS;
// thirdparty
// SuperMap.BinaryClassification = BinaryClassification;
// SuperMap.LandcoverClassification = LandcoverClassification;
// SuperMap.ObjectDetection = ObjectDetection;
// SuperMap.WebMachineLearning = WebMachineLearning;
SuperMap.ElasticSearch = ElasticSearch;
// util
SuperMap.ArrayStatistic = ArrayStatistic;
SuperMap.ColorsPickerUtil = ColorsPickerUtil;

// REST
SuperMap.DataFormat = DataFormat;
SuperMap.ServerType = ServerType;
SuperMap.GeometryType = GeometryType;
SuperMap.QueryOption = QueryOption;
SuperMap.JoinType = JoinType;
SuperMap.SpatialQueryMode = SpatialQueryMode;
SuperMap.SpatialRelationType = SpatialRelationType;
SuperMap.MeasureMode = MeasureMode;
SuperMap.Unit = Unit;
SuperMap.BufferRadiusUnit = BufferRadiusUnit;
SuperMap.EngineType = EngineType;
SuperMap.ThemeGraphTextFormat = ThemeGraphTextFormat;
SuperMap.ThemeGraphType = ThemeGraphType;
SuperMap.GraphAxesTextDisplayMode = GraphAxesTextDisplayMode;
SuperMap.GraduatedMode = GraduatedMode;
SuperMap.RangeMode = RangeMode;
SuperMap.ThemeType = ThemeType;
SuperMap.ColorGradientType = ColorGradientType;
SuperMap.TextAlignment = TextAlignment;
SuperMap.FillGradientMode = FillGradientMode;
SuperMap.AlongLineDirection = AlongLineDirection;
SuperMap.LabelBackShape = LabelBackShape;
SuperMap.LabelOverLengthMode = LabelOverLengthMode;
SuperMap.DirectionType = DirectionType;
SuperMap.OverlayOperationType = OverlayOperationType;
SuperMap.OutputType = OutputType;
SuperMap.SideType = SideType;
SuperMap.SupplyCenterType = SupplyCenterType;
SuperMap.TurnType = TurnType;
SuperMap.BufferEndType = BufferEndType;
SuperMap.SmoothMethod = SmoothMethod;
SuperMap.SurfaceAnalystMethod = SurfaceAnalystMethod;
SuperMap.DataReturnMode = DataReturnMode;
SuperMap.EditType = EditType;
SuperMap.TransferTactic = TransferTactic;
SuperMap.TransferPreference = TransferPreference;
SuperMap.GridType = GridType;
SuperMap.ColorSpaceType = ColorSpaceType;
SuperMap.LayerType = LayerType;
SuperMap.UGCLayerType = UGCLayerType;
SuperMap.StatisticMode = StatisticMode;
SuperMap.PixelFormat = PixelFormat;
SuperMap.SearchMode = SearchMode;
SuperMap.InterpolationAlgorithmType = InterpolationAlgorithmType;
SuperMap.VariogramMode = VariogramMode;
SuperMap.Exponent = Exponent;
SuperMap.ClientType = ClientType;
SuperMap.ChartType = ChartType;
SuperMap.ClipAnalystMode = ClipAnalystMode;
SuperMap.AnalystAreaUnit = AnalystAreaUnit;
SuperMap.AnalystSizeUnit = AnalystSizeUnit;
SuperMap.StatisticAnalystMode = StatisticAnalystMode;
SuperMap.SummaryType = SummaryType;
SuperMap.TopologyValidatorRule = TopologyValidatorRule;
SuperMap.BucketAggType = BucketAggType;
SuperMap.MetricsAggType = MetricsAggType;
SuperMap.GetFeatureMode = GetFeatureMode;
SuperMap.RasterFunctionType = RasterFunctionType;
SuperMap.ResourceType = ResourceType;
SuperMap.OrderBy = OrderBy;
SuperMap.OrderType = OrderType;
SuperMap.SearchType = SearchType;
SuperMap.AggregationTypes = AggregationTypes;
SuperMap.PermissionType = PermissionType;
SuperMap.EntityType = EntityType;
SuperMap.WebExportFormatType = WebExportFormatType;
SuperMap.WebScaleOrientationType = WebScaleOrientationType;
SuperMap.WebScaleType = WebScaleType;
SuperMap.WebScaleUnit = WebScaleUnit;
export * from './index.all';
