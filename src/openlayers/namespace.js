/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import {
  // REST
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
  // commontypes
  Collection,
  Curve,
  GeoText,
  LinearRing,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  GeometryPoint,
  Polygon,
  Rectangle,
  Bounds,
  Credential,
  Event,
  Events,
  Feature,
  Geometry,
  LonLat,
  Pixel,
  Size,
  CommonUtil,
  Browser,
  INCHES_PER_UNIT,
  METERS_PER_INCH,
  DOTS_PER_INCH,
  IS_GECKO,
  GeometryVector,
  //format
  Format,
  GeoJSON,
  JSONFormat,
  WKT,
  // control
  TimeControlBase,
  TimeFlowControl,
  // iManager
  IManager,
  IManagerCreateNodeParam,
  IManagerServiceBase,
  // iPortal
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
  // iServer
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
  UGCImage,
  InterpolationAnalystParameters,
  InterpolationAnalystService,
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
  CommonTheme,
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
  InterpolationDensityAnalystParameters,
  // Online,
  Online,
  OnlineData,
  OnlineQueryDatasParameter,
  ServiceStatus,
  DataItemOrderBy,
  FilterField,
  OnlineServiceBase,
  //security
  KeyServiceParameter,
  SecurityManager,
  ServerInfo,
  TokenServiceParameter,
  //thirdparty
  // BinaryClassification,
  // LandcoverClassification,
  // ObjectDetection,
  // WebMachineLearning,
  ElasticSearch,
  // util
  setCORS,
  isCORS,
  setRequestTimeout,
  getRequestTimeout,
  FetchRequest,
  ColorsPickerUtil,
  ArrayStatistic,
  // style
  CartoCSS,
  ThemeStyle,
  // overlay
  Bar,
  Bar3D,
  Circle,
  Line,
  Pie,
  OverlayPoint,
  Ring,
  ThemeVector,
  ShapeFactory,
  ShapeParameters,
  FeatureCircle,
  Image,
  FeatureLine,
  Point,
  FeaturePolygon,
  FeatureRectangle,
  Sector,
  FeatureTheme,
  LevelRenderer,
  // components
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
  Chart,
  ChartViewModel,
  // lang
  Lang
} from '@supermap/iclient-common/namespace';

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

  // 挂载common中SuperMap上所有的内容
  ol.supermap.Lang = Lang;
  ol.supermap.i18n = ol.supermap.Lang.i18n;
  // CommonUtil
  ol.supermap.CommonUtil = CommonUtil || {};
  ol.supermap.Browser = Browser;
  ol.supermap.INCHES_PER_UNIT = INCHES_PER_UNIT;
  ol.supermap.METERS_PER_INCH = METERS_PER_INCH;
  ol.supermap.DOTS_PER_INCH = DOTS_PER_INCH;
  ol.supermap.IS_GECKO = IS_GECKO;

  // FetchRequest
  ol.supermap.setCORS = setCORS;
  ol.supermap.isCORS = isCORS;
  ol.supermap.setRequestTimeout = setRequestTimeout;
  ol.supermap.getRequestTimeout = getRequestTimeout;
  ol.supermap.FetchRequest = FetchRequest;

  // commontypes
  ol.supermap.Event = Event;
  ol.supermap.Bounds = Bounds;
  ol.supermap.Credential = Credential;
  ol.supermap.Events = Events;
  ol.supermap.Feature = Feature;
  ol.supermap.Geometry = Geometry;
  ol.supermap.LonLat = LonLat;
  ol.supermap.Pixel = Pixel;
  ol.supermap.Size = Size;
  ol.supermap.Feature.Vector = GeometryVector;
  ol.supermap.Geometry.Collection = Collection;
  ol.supermap.Geometry.Curve = Curve;
  ol.supermap.Geometry.GeoText = GeoText;
  ol.supermap.Geometry.LinearRing = LinearRing;
  ol.supermap.Geometry.LineString = LineString;
  ol.supermap.Geometry.MultiLineString = MultiLineString;
  ol.supermap.Geometry.MultiPoint = MultiPoint;
  ol.supermap.Geometry.MultiPolygon = MultiPolygon;
  ol.supermap.Geometry.Point = GeometryPoint;
  ol.supermap.Geometry.Polygon = Polygon;
  ol.supermap.Geometry.Rectangle = Rectangle;
  // Components
  ol.supermap.Components = ol.supermap.Components || {};
  ol.supermap.Components.Chart = Chart;
  ol.supermap.Components.ChartViewModel = ChartViewModel;
  ol.supermap.Components.MessageBox = MessageBox;
  ol.supermap.Components.AttributesPopContainer = AttributesPopContainer;
  ol.supermap.Components.CityTabsPage = CityTabsPage;
  ol.supermap.Components.CommonContainer = CommonContainer;
  ol.supermap.Components.DropDownBox = DropDownBox;
  ol.supermap.Components.IndexTabsPageContainer = IndexTabsPageContainer;
  ol.supermap.Components.NavTabsPage = NavTabsPage;
  ol.supermap.Components.PaginationContainer = PaginationContainer;
  ol.supermap.Components.PopContainer = PopContainer;
  ol.supermap.Components.Select = Select;
  ol.supermap.Components.TemplateBase = TemplateBase;
  ol.supermap.Components.FileReaderUtil = FileReaderUtil;
  // control
  ol.supermap.TimeControlBase = TimeControlBase;
  ol.supermap.TimeFlowControl = TimeFlowControl;
  // Format
  ol.supermap.Format = ol.supermap.Format || Format;
  ol.supermap.Format.GeoJSON = GeoJSON;
  ol.supermap.Format.JSON = JSONFormat;
  ol.supermap.Format.WKT = WKT;
  // iManager
  ol.supermap.iManager = IManager;
  ol.supermap.iManagerCreateNodeParam = IManagerCreateNodeParam;
  ol.supermap.iManagerServiceBase = IManagerServiceBase;
  // iPortal
  ol.supermap.iPortal = IPortal;
  ol.supermap.iPortalAddDataParam = IPortalAddDataParam;
  ol.supermap.iPortalAddResourceParam = IPortalAddResourceParam;
  ol.supermap.iPortalDataConnectionInfoParam = IPortalDataConnectionInfoParam;
  ol.supermap.iPortalDataMetaInfoParam = IPortalDataMetaInfoParam;
  ol.supermap.iPortalDataStoreInfoParam = IPortalDataStoreInfoParam;
  ol.supermap.iPortalQueryParam = IPortalQueryParam;
  ol.supermap.iPortalQueryResult = IPortalQueryResult;
  ol.supermap.iPortalRegisterServiceParam = IPortalRegisterServiceParam;
  ol.supermap.iPortalResource = IPortalResource;
  ol.supermap.iPortalServiceBase = IPortalServiceBase;
  ol.supermap.iPortalShareEntity = IPortalShareEntity;
  ol.supermap.iPortalShareParam = IPortalShareParam;
  ol.supermap.iPortalUser = IPortalUser;
  // iServer
  ol.supermap.AggregationParameter = AggregationParameter;
  ol.supermap.AreaSolarRadiationParameters = AreaSolarRadiationParameters;
  ol.supermap.BucketAggParameter = BucketAggParameter;
  ol.supermap.BufferAnalystParameters = BufferAnalystParameters;
  ol.supermap.BufferDistance = BufferDistance;
  ol.supermap.BuffersAnalystJobsParameter = BuffersAnalystJobsParameter;
  ol.supermap.BufferSetting = BufferSetting;
  ol.supermap.BurstPipelineAnalystParameters = BurstPipelineAnalystParameters;
  ol.supermap.ChartQueryFilterParameter = ChartQueryFilterParameter;
  ol.supermap.ChartQueryParameters = ChartQueryParameters;
  ol.supermap.ClipParameter = ClipParameter;
  ol.supermap.ColorDictionary = ColorDictionary;
  ol.supermap.CommonServiceBase = CommonServiceBase;
  ol.supermap.ComputeWeightMatrixParameters = ComputeWeightMatrixParameters;
  ol.supermap.CreateDatasetParameters = CreateDatasetParameters;
  ol.supermap.DataReturnOption = DataReturnOption;
  ol.supermap.DatasetBufferAnalystParameters = DatasetBufferAnalystParameters;
  ol.supermap.DatasetInfo = DatasetInfo;
  ol.supermap.DatasetOverlayAnalystParameters = DatasetOverlayAnalystParameters;
  ol.supermap.DatasetSurfaceAnalystParameters = DatasetSurfaceAnalystParameters;
  ol.supermap.DatasetThiessenAnalystParameters = DatasetThiessenAnalystParameters;
  ol.supermap.DatasourceConnectionInfo = DatasourceConnectionInfo;
  ol.supermap.DensityKernelAnalystParameters = DensityKernelAnalystParameters;
  ol.supermap.EditFeaturesParameters = EditFeaturesParameters;
  ol.supermap.FacilityAnalyst3DParameters = FacilityAnalyst3DParameters;
  ol.supermap.FacilityAnalystSinks3DParameters = FacilityAnalystSinks3DParameters;
  ol.supermap.FacilityAnalystSources3DParameters = FacilityAnalystSources3DParameters;
  ol.supermap.FacilityAnalystStreamParameters = FacilityAnalystStreamParameters;
  ol.supermap.FacilityAnalystTracedown3DParameters = FacilityAnalystTracedown3DParameters;
  ol.supermap.FacilityAnalystTraceup3DParameters = FacilityAnalystTraceup3DParameters;
  ol.supermap.FacilityAnalystUpstream3DParameters = FacilityAnalystUpstream3DParameters;
  ol.supermap.FieldParameters = FieldParameters;
  ol.supermap.FieldsFilter = FieldsFilter;
  ol.supermap.FieldStatisticsParameters = FieldStatisticsParameters;
  ol.supermap.FilterParameter = FilterParameter;
  ol.supermap.FindClosestFacilitiesParameters = FindClosestFacilitiesParameters;
  ol.supermap.FindLocationParameters = FindLocationParameters;
  ol.supermap.FindMTSPPathsParameters = FindMTSPPathsParameters;
  ol.supermap.FindPathParameters = FindPathParameters;
  ol.supermap.FindServiceAreasParameters = FindServiceAreasParameters;
  ol.supermap.FindTSPPathsParameters = FindTSPPathsParameters;
  ol.supermap.GenerateSpatialDataParameters = GenerateSpatialDataParameters;
  ol.supermap.GeoCodingParameter = GeoCodingParameter;
  ol.supermap.GeoDecodingParameter = GeoDecodingParameter;
  ol.supermap.GeoHashGridAggParameter = GeoHashGridAggParameter;
  ol.supermap.GeometryBufferAnalystParameters = GeometryBufferAnalystParameters;
  ol.supermap.GeometryOverlayAnalystParameters = GeometryOverlayAnalystParameters;
  ol.supermap.GeometrySurfaceAnalystParameters = GeometrySurfaceAnalystParameters;
  ol.supermap.GeometryThiessenAnalystParameters = GeometryThiessenAnalystParameters;
  ol.supermap.GeoRelationAnalystParameters = GeoRelationAnalystParameters;
  ol.supermap.GetFeaturesByBoundsParameters = GetFeaturesByBoundsParameters;
  ol.supermap.GetFeaturesByBufferParameters = GetFeaturesByBufferParameters;
  ol.supermap.GetFeaturesByGeometryParameters = GetFeaturesByGeometryParameters;
  ol.supermap.GetFeaturesByIDsParameters = GetFeaturesByIDsParameters;
  ol.supermap.GetFeaturesBySQLParameters = GetFeaturesBySQLParameters;
  ol.supermap.GetFeaturesParametersBase = GetFeaturesParametersBase;
  ol.supermap.GetFeaturesServiceBase = GetFeaturesServiceBase;
  ol.supermap.GetGridCellInfosParameters = GetGridCellInfosParameters;
  ol.supermap.Grid = Grid;
  ol.supermap.HillshadeParameter = HillshadeParameter;
  ol.supermap.Image = UGCImage;
  ol.supermap.ImageGFAspect = ImageGFAspect;
  ol.supermap.ImageGFHillShade = ImageGFHillShade;
  ol.supermap.ImageGFOrtho = ImageGFOrtho;
  ol.supermap.ImageGFSlope = ImageGFSlope;
  ol.supermap.ImageRenderingRule = ImageRenderingRule;
  ol.supermap.ImageSearchParameter = ImageSearchParameter;
  ol.supermap.ImageStretchOption = ImageStretchOption;
  ol.supermap.InterpolationAnalystParameters = InterpolationAnalystParameters;
  ol.supermap.InterpolationAnalystService = InterpolationAnalystService;
  ol.supermap.InterpolationDensityAnalystParameters = InterpolationDensityAnalystParameters;
  ol.supermap.InterpolationIDWAnalystParameters = InterpolationIDWAnalystParameters;
  ol.supermap.InterpolationKrigingAnalystParameters = InterpolationKrigingAnalystParameters;
  ol.supermap.InterpolationRBFAnalystParameters = InterpolationRBFAnalystParameters;
  ol.supermap.JoinItem = JoinItem;
  ol.supermap.KernelDensityJobParameter = KernelDensityJobParameter;
  ol.supermap.LabelImageCell = LabelImageCell;
  ol.supermap.LabelMatrixCell = LabelMatrixCell;
  ol.supermap.LabelMixedTextStyle = LabelMixedTextStyle;
  ol.supermap.LabelSymbolCell = LabelSymbolCell;
  ol.supermap.LabelThemeCell = LabelThemeCell;
  ol.supermap.LayerStatus = LayerStatus;
  ol.supermap.LinkItem = LinkItem;
  ol.supermap.MappingParameters = MappingParameters;
  ol.supermap.MathExpressionAnalysisParameters = MathExpressionAnalysisParameters;
  ol.supermap.MeasureParameters = MeasureParameters;
  ol.supermap.MetricsAggParameter = MetricsAggParameter;
  ol.supermap.NDVIParameter = NDVIParameter;
  ol.supermap.NetworkAnalystServiceBase = NetworkAnalystServiceBase;
  ol.supermap.OutputSetting = OutputSetting;
  ol.supermap.OverlapDisplayedOptions = OverlapDisplayedOptions;
  ol.supermap.OverlayAnalystParameters = OverlayAnalystParameters;
  ol.supermap.OverlayGeoJobParameter = OverlayGeoJobParameter;
  ol.supermap.PointWithMeasure = PointWithMeasure;
  ol.supermap.ProcessingServiceBase = ProcessingServiceBase;
  ol.supermap.QueryByBoundsParameters = QueryByBoundsParameters;
  ol.supermap.QueryByDistanceParameters = QueryByDistanceParameters;
  ol.supermap.QueryByGeometryParameters = QueryByGeometryParameters;
  ol.supermap.QueryBySQLParameters = QueryBySQLParameters;
  ol.supermap.QueryParameters = QueryParameters;
  ol.supermap.RasterFunctionParameter = RasterFunctionParameter;
  ol.supermap.Route = Route;
  ol.supermap.RouteCalculateMeasureParameters = RouteCalculateMeasureParameters;
  ol.supermap.RouteLocatorParameters = RouteLocatorParameters;
  ol.supermap.ServerColor = ServerColor;
  ol.supermap.ServerFeature = ServerFeature;
  ol.supermap.ServerGeometry = ServerGeometry;
  ol.supermap.ServerStyle = ServerStyle;
  ol.supermap.ServerTextStyle = ServerTextStyle;
  ol.supermap.ServerTheme = ServerTheme;
  ol.supermap.SetDatasourceParameters = SetDatasourceParameters;
  ol.supermap.SetLayerInfoParameters = SetLayerInfoParameters;
  ol.supermap.SetLayersInfoParameters = SetLayersInfoParameters;
  ol.supermap.SetLayerStatusParameters = SetLayerStatusParameters;
  ol.supermap.SingleObjectQueryJobsParameter = SingleObjectQueryJobsParameter;
  ol.supermap.Sortby = Sortby;
  ol.supermap.SpatialAnalystBase = SpatialAnalystBase;
  ol.supermap.StopQueryParameters = StopQueryParameters;
  ol.supermap.SummaryAttributesJobsParameter = SummaryAttributesJobsParameter;
  ol.supermap.SummaryMeshJobParameter = SummaryMeshJobParameter;
  ol.supermap.SummaryRegionJobParameter = SummaryRegionJobParameter;
  ol.supermap.SupplyCenter = SupplyCenter;
  ol.supermap.SurfaceAnalystParameters = SurfaceAnalystParameters;
  ol.supermap.SurfaceAnalystParametersSetting = SurfaceAnalystParametersSetting;
  ol.supermap.TerrainCurvatureCalculationParameters = TerrainCurvatureCalculationParameters;
  ol.supermap.Theme = CommonTheme;
  ol.supermap.ThemeDotDensity = ThemeDotDensity;
  ol.supermap.ThemeFlow = ThemeFlow;
  ol.supermap.ThemeGraduatedSymbol = ThemeGraduatedSymbol;
  ol.supermap.ThemeGraduatedSymbolStyle = ThemeGraduatedSymbolStyle;
  ol.supermap.ThemeGraph = ThemeGraph;
  ol.supermap.ThemeGraphAxes = ThemeGraphAxes;
  ol.supermap.ThemeGraphItem = ThemeGraphItem;
  ol.supermap.ThemeGraphSize = ThemeGraphSize;
  ol.supermap.ThemeGraphText = ThemeGraphText;
  ol.supermap.ThemeGridRange = ThemeGridRange;
  ol.supermap.ThemeGridRangeItem = ThemeGridRangeItem;
  ol.supermap.ThemeGridUnique = ThemeGridUnique;
  ol.supermap.ThemeGridUniqueItem = ThemeGridUniqueItem;
  ol.supermap.ThemeLabel = ThemeLabel;
  ol.supermap.ThemeLabelAlongLine = ThemeLabelAlongLine;
  ol.supermap.ThemeLabelBackground = ThemeLabelBackground;
  ol.supermap.ThemeLabelItem = ThemeLabelItem;
  ol.supermap.ThemeLabelText = ThemeLabelText;
  ol.supermap.ThemeLabelUniqueItem = ThemeLabelUniqueItem;
  ol.supermap.ThemeMemoryData = ThemeMemoryData;
  ol.supermap.ThemeOffset = ThemeOffset;
  ol.supermap.ThemeParameters = ThemeParameters;
  ol.supermap.ThemeRange = ThemeRange;
  ol.supermap.ThemeRangeItem = ThemeRangeItem;
  ol.supermap.ThemeUnique = ThemeUnique;
  ol.supermap.ThemeUniqueItem = ThemeUniqueItem;
  ol.supermap.ThiessenAnalystParameters = ThiessenAnalystParameters;
  ol.supermap.TopologyValidatorJobsParameter = TopologyValidatorJobsParameter;
  ol.supermap.TransferLine = TransferLine;
  ol.supermap.TransferPathParameters = TransferPathParameters;
  ol.supermap.TransferSolutionParameters = TransferSolutionParameters;
  ol.supermap.TransportationAnalystParameter = TransportationAnalystParameter;
  ol.supermap.TransportationAnalystResultSetting = TransportationAnalystResultSetting;
  ol.supermap.UGCLayer = UGCLayer;
  ol.supermap.UGCMapLayer = UGCMapLayer;
  ol.supermap.UGCSubLayer = UGCSubLayer;
  ol.supermap.UpdateDatasetParameters = UpdateDatasetParameters;
  ol.supermap.UpdateEdgeWeightParameters = UpdateEdgeWeightParameters;
  ol.supermap.UpdateTurnNodeWeightParameters = UpdateTurnNodeWeightParameters;
  ol.supermap.Vector = Vector;
  ol.supermap.VectorClipJobsParameter = VectorClipJobsParameter;
  ol.supermap.WebPrintingJobContent = WebPrintingJobContent;
  ol.supermap.WebPrintingJobCustomItems = WebPrintingJobCustomItems;
  ol.supermap.WebPrintingJobExportOptions = WebPrintingJobExportOptions;
  ol.supermap.WebPrintingJobImage = WebPrintingJobImage;
  ol.supermap.WebPrintingJobLayers = WebPrintingJobLayers;
  ol.supermap.WebPrintingJobLayoutOptions = WebPrintingJobLayoutOptions;
  ol.supermap.WebPrintingJobLegendOptions = WebPrintingJobLegendOptions;
  ol.supermap.WebPrintingJobLittleMapOptions = WebPrintingJobLittleMapOptions;
  ol.supermap.WebPrintingJobNorthArrowOptions = WebPrintingJobNorthArrowOptions;
  ol.supermap.WebPrintingJobParameters = WebPrintingJobParameters;
  ol.supermap.WebPrintingJobScaleBarOptions = WebPrintingJobScaleBarOptions;
  //Online
  ol.supermap.Online = Online;
  ol.supermap.OnlineData = OnlineData;
  ol.supermap.OnlineQueryDatasParameter = OnlineQueryDatasParameter;
  ol.supermap.ServiceStatus = ServiceStatus;
  // 包含online中的DataItemType数据类型
  ol.supermap.DataItemType = DataItemType;
  ol.supermap.DataItemOrderBy = DataItemOrderBy;
  ol.supermap.FilterField = FilterField;
  ol.supermap.OnlineServiceBase = OnlineServiceBase;
  // overlay
  ol.supermap.Feature = ol.supermap.Feature || {};
  ol.supermap.Feature.Theme = FeatureTheme;
  ol.supermap.Feature.Theme.Bar = Bar;
  ol.supermap.Feature.Theme.Bar3D = Bar3D;
  ol.supermap.Feature.Theme.Circle = Circle;
  ol.supermap.Feature.Theme.Line = Line;
  ol.supermap.Feature.Theme.Pie = Pie;
  ol.supermap.Feature.Theme.Point = OverlayPoint;
  ol.supermap.Feature.Theme.Ring = Ring;
  ol.supermap.Feature.Theme.ThemeVector = ThemeVector;
  ol.supermap.Feature.ShapeParameters = ShapeParameters;
  ol.supermap.Feature.ShapeParameters.Circle = FeatureCircle;
  ol.supermap.Feature.ShapeParameters.Image = Image;
  ol.supermap.Feature.ShapeParameters.Line = FeatureLine;
  ol.supermap.Feature.ShapeParameters.Point = Point;
  ol.supermap.Feature.ShapeParameters.Polygon = FeaturePolygon;
  ol.supermap.Feature.ShapeParameters.Rectangle = FeatureRectangle;
  ol.supermap.Feature.ShapeParameters.Sector = Sector;
  ol.supermap.Feature.ShapeFactory = ShapeFactory;
  // LevelRenderer
  ol.supermap.LevelRenderer = LevelRenderer;

  // security
  ol.supermap.KeyServiceParameter = KeyServiceParameter;
  ol.supermap.SecurityManager = SecurityManager;
  ol.supermap.ServerInfo = ServerInfo;
  ol.supermap.TokenServiceParameter = TokenServiceParameter;
  // style
  ol.supermap.ThemeStyle = ThemeStyle;
  ol.supermap.CartoCSS = CartoCSS;
  // thirdparty
  // ol.supermap.BinaryClassification = BinaryClassification;
  // ol.supermap.LandcoverClassification = LandcoverClassification;
  // ol.supermap.ObjectDetection = ObjectDetection;
  // ol.supermap.WebMachineLearning = WebMachineLearning;
  ol.supermap.ElasticSearch = ElasticSearch;
  // util
  ol.supermap.ArrayStatistic = ArrayStatistic;
  ol.supermap.ColorsPickerUtil = ColorsPickerUtil;

  // REST
  ol.supermap.DataFormat = DataFormat;
  ol.supermap.ServerType = ServerType;
  ol.supermap.GeometryType = GeometryType;
  ol.supermap.QueryOption = QueryOption;
  ol.supermap.JoinType = JoinType;
  ol.supermap.SpatialQueryMode = SpatialQueryMode;
  ol.supermap.SpatialRelationType = SpatialRelationType;
  ol.supermap.MeasureMode = MeasureMode;
  ol.supermap.Unit = Unit;
  ol.supermap.BufferRadiusUnit = BufferRadiusUnit;
  ol.supermap.EngineType = EngineType;
  ol.supermap.ThemeGraphTextFormat = ThemeGraphTextFormat;
  ol.supermap.ThemeGraphType = ThemeGraphType;
  ol.supermap.GraphAxesTextDisplayMode = GraphAxesTextDisplayMode;
  ol.supermap.GraduatedMode = GraduatedMode;
  ol.supermap.RangeMode = RangeMode;
  ol.supermap.ThemeType = ThemeType;
  ol.supermap.ColorGradientType = ColorGradientType;
  ol.supermap.TextAlignment = TextAlignment;
  ol.supermap.FillGradientMode = FillGradientMode;
  ol.supermap.AlongLineDirection = AlongLineDirection;
  ol.supermap.LabelBackShape = LabelBackShape;
  ol.supermap.LabelOverLengthMode = LabelOverLengthMode;
  ol.supermap.DirectionType = DirectionType;
  ol.supermap.OverlayOperationType = OverlayOperationType;
  ol.supermap.OutputType = OutputType;
  ol.supermap.SideType = SideType;
  ol.supermap.SupplyCenterType = SupplyCenterType;
  ol.supermap.TurnType = TurnType;
  ol.supermap.BufferEndType = BufferEndType;
  ol.supermap.SmoothMethod = SmoothMethod;
  ol.supermap.SurfaceAnalystMethod = SurfaceAnalystMethod;
  ol.supermap.DataReturnMode = DataReturnMode;
  ol.supermap.EditType = EditType;
  ol.supermap.TransferTactic = TransferTactic;
  ol.supermap.TransferPreference = TransferPreference;
  ol.supermap.GridType = GridType;
  ol.supermap.ColorSpaceType = ColorSpaceType;
  ol.supermap.LayerType = LayerType;
  ol.supermap.UGCLayerType = UGCLayerType;
  ol.supermap.StatisticMode = StatisticMode;
  ol.supermap.PixelFormat = PixelFormat;
  ol.supermap.SearchMode = SearchMode;
  ol.supermap.InterpolationAlgorithmType = InterpolationAlgorithmType;
  ol.supermap.VariogramMode = VariogramMode;
  ol.supermap.Exponent = Exponent;
  ol.supermap.ClientType = ClientType;
  ol.supermap.ChartType = ChartType;
  ol.supermap.ClipAnalystMode = ClipAnalystMode;
  ol.supermap.AnalystAreaUnit = AnalystAreaUnit;
  ol.supermap.AnalystSizeUnit = AnalystSizeUnit;
  ol.supermap.StatisticAnalystMode = StatisticAnalystMode;
  ol.supermap.SummaryType = SummaryType;
  ol.supermap.TopologyValidatorRule = TopologyValidatorRule;
  ol.supermap.BucketAggType = BucketAggType;
  ol.supermap.MetricsAggType = MetricsAggType;
  ol.supermap.GetFeatureMode = GetFeatureMode;
  ol.supermap.RasterFunctionType = RasterFunctionType;
  ol.supermap.ResourceType = ResourceType;
  ol.supermap.OrderBy = OrderBy;
  ol.supermap.OrderType = OrderType;
  ol.supermap.SearchType = SearchType;
  ol.supermap.AggregationTypes = AggregationTypes;
  ol.supermap.PermissionType = PermissionType;
  ol.supermap.EntityType = EntityType;
  ol.supermap.WebExportFormatType = WebExportFormatType;
  ol.supermap.WebScaleOrientationType = WebScaleOrientationType;
  ol.supermap.WebScaleType = WebScaleType;
  ol.supermap.WebScaleUnit = WebScaleUnit;
}

export * from './control';
export * from './core';
export * from './mapping';
export * from './overlay';
export * from './services';

export {
  // REST
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
  // commontypes
  Collection,
  Curve,
  GeoText,
  LinearRing,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  GeometryPoint,
  Polygon,
  Rectangle,
  Bounds,
  Credential,
  Event,
  Events,
  Feature,
  Geometry,
  LonLat,
  Pixel,
  Size,
  CommonUtil,
  Browser,
  INCHES_PER_UNIT,
  METERS_PER_INCH,
  DOTS_PER_INCH,
  IS_GECKO,
  GeometryVector,
  //format
  Format,
  GeoJSON,
  JSONFormat,
  WKT,
  // control
  TimeControlBase,
  TimeFlowControl,
  // iManager
  IManager,
  IManagerCreateNodeParam,
  IManagerServiceBase,
  // iPortal
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
  // iServer
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
  UGCImage,
  InterpolationAnalystParameters,
  InterpolationAnalystService,
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
  CommonTheme,
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
  InterpolationDensityAnalystParameters,
  // Online,
  Online,
  OnlineData,
  OnlineQueryDatasParameter,
  ServiceStatus,
  DataItemOrderBy,
  FilterField,
  OnlineServiceBase,
  //security
  KeyServiceParameter,
  SecurityManager,
  ServerInfo,
  TokenServiceParameter,
  //thirdparty
  // BinaryClassification,
  // LandcoverClassification,
  // ObjectDetection,
  // WebMachineLearning,
  ElasticSearch,
  // util
  setCORS,
  isCORS,
  setRequestTimeout,
  getRequestTimeout,
  FetchRequest,
  ColorsPickerUtil,
  ArrayStatistic,
  CartoCSS,
  ThemeStyle,
  // overlay
  Bar,
  Bar3D,
  Circle,
  Line,
  Pie,
  OverlayPoint,
  Ring,
  ThemeVector,
  ShapeFactory,
  ShapeParameters,
  FeatureCircle,
  Image,
  FeatureLine,
  Point,
  FeaturePolygon,
  FeatureRectangle,
  Sector,
  FeatureTheme,
  LevelRenderer,
  //components
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
  Chart,
  ChartViewModel,
  //lang
  Lang
};
