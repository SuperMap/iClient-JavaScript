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
  //control
  TimeControlBase,
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
  Graph,
  Line,
  Pie,
  OverlayPoint,
  RankSymbol,
  Ring,
  ThemeVector,
  ShapeFactory,
  ShapeParameters,
  FeatureCircle,
  Image,
  Label,
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

import { Logo, logo, ChangeTileVersion, changeTileVersion } from './control';

import {
  CommontypesConversion,
  BaiduCRS,
  TianDiTu_WGS84CRS,
  TianDiTu_MercatorCRS,
  NonProjection,
  nonProjection,
  NonEarthCRS,
  nonEarthCRS,
  CRS,
  crs,
  toGeoJSON,
  toSuperMapGeometry,
  getMeterPerMapUnit,
  resolutionToScale,
  scaleToResolution,
  GetResolutionFromScaleDpi,
  NormalizeScale,
  transform
} from './core';

import {
  BaiduTileLayer,
  baiduTileLayer,
  CloudTileLayer,
  cloudTileLayer,
  ImageMapLayer,
  imageMapLayer,
  TiandituTileLayer,
  tiandituTileLayer,
  TiledMapLayer,
  tiledMapLayer,
  WMTSLayer,
  wmtsLayer,
  WebMap,
  webMap,
  ImageTileLayer,
  imageTileLayer
} from './mapping';

import {
  DataFlowLayer,
  dataFlowLayer,
  EchartsLayer,
  echartsLayer,
  LeafletMapCoordSys,
  GraphicLayer,
  graphicLayer,
  GraphThemeLayer,
  graphThemeLayer,
  heatMapFeature,
  HeatMapFeature,
  heatMapLayer,
  HeatMapLayer,
  LabelThemeLayer,
  labelThemeLayer,
  MapVLayer,
  mapVLayer,
  RangeThemeLayer,
  rangeThemeLayer,
  RankSymbolThemeLayer,
  rankSymbolThemeLayer,
  TileVectorLayer,
  tiledVectorLayer,
  tileVectorLayer,
  TurfLayer,
  turfLayer,
  UnicodeMarker,
  unicodeMarker,
  UniqueThemeLayer,
  uniqueThemeLayer,
  VectorTileFormat,
  CartoCSSToLeaflet,
  DefaultStyle,
  CartoStyleMap,
  ServerStyleMap,
  CompOpMap,
  ImageStyle,
  imageStyle,
  CircleStyle,
  circleStyle,
  Graphic,
  graphic,
  CloverStyle,
  cloverStyle,
  MapVRenderer,
  GeoFeatureThemeLayer,
  ThemeFeature,
  themeFeature,
  ThemeLayer,
  CanvasRenderer,
  LineSymbolizer,
  PointSymbolizer,
  RegionSymbolizer,
  SVGRenderer,
  Symbolizer,
  PolyBase,
  TextSymbolizer,
  VectorFeatureType,
  VectorGrid,
  VectorTile,
  VectorTileJSON,
  VectorTilePBF
} from './overlay';

import {
  AddressMatchService,
  addressMatchService,
  ChartService,
  chartService,
  DataFlowService,
  dataFlowService,
  DatasetService,
  datasetService,
  DatasourceService,
  datasourceService,
  FeatureService,
  featureService,
  FieldService,
  fieldService,
  geoprocessingService,
  GeoprocessingService,
  GridCellInfosService,
  gridCellInfosService,
  imageCollectionService,
  ImageCollectionService,
  imageService,
  ImageService,
  LayerInfoService,
  layerInfoService,
  MapService,
  mapService,
  MeasureService,
  measureService,
  NetworkAnalyst3DService,
  networkAnalyst3DService,
  NetworkAnalystService,
  networkAnalystService,
  ProcessingService,
  processingService,
  QueryService,
  queryService,
  ServiceBase,
  SpatialAnalystService,
  spatialAnalystService,
  ThemeService,
  themeService,
  TrafficTransferAnalystService,
  trafficTransferAnalystService,
  WebPrintingJobService,
  webPrintingJobService
} from './services';

import {
  OpenFileView,
  openFileView,
  OpenFileViewModel,
  openFileViewModel,
  SearchView,
  searchView,
  DataFlowView,
  dataFlowView,
  dataFlowViewModel,
  DataFlowViewModel,
  ClientComputationView,
  clientComputationView,
  ClientComputationViewModel,
  clientComputationViewModel,
  ClientComputationLayer,
  clientComputationLayer,
  GeoJSONLayerWithName,
  geoJSONLayerWithName,
  GeoJsonLayersDataModel,
  GeoJsonLayerDataModel,
  DistributedAnalysisModel,
  DistributedAnalysisView,
  distributedAnalysisView,
  DistributedAnalysisViewModel,
  distributedAnalysisViewModel,
  DataServiceQueryView,
  dataServiceQueryView,
  DataServiceQueryViewModel,
  dataServiceQueryViewModel,
  searchViewModel,
  SearchViewModel,
  componentsViewBase,
  ComponentsViewBase
} from './components';

import L from 'leaflet';

L.supermap = L.supermap || {};
L.supermap.components = L.supermap.components || {};
L.supermap.Components = L.supermap.Components || {};
L.supermap.control = L.supermap.control || {};

// ./core
// L.Util.supermap_callbacks = coreUtil.supermap_callbacks;
L.supermap.Util = L.supermap.Util || {};
L.Util.toGeoJSON = toGeoJSON;
L.supermap.Util.toGeoJSON = toGeoJSON;
L.Util.toSuperMapGeometry = toSuperMapGeometry;
L.supermap.Util.toSuperMapGeometry = toSuperMapGeometry;
L.Util.resolutionToScale = resolutionToScale;
L.supermap.Util.resolutionToScale = resolutionToScale;
L.Util.scaleToResolution = scaleToResolution;
L.supermap.Util.scaleToResolution = scaleToResolution;
L.Util.getMeterPerMapUnit = getMeterPerMapUnit;
L.supermap.Util.getMeterPerMapUnit = getMeterPerMapUnit;
L.Util.GetResolutionFromScaleDpi = GetResolutionFromScaleDpi;
L.supermap.Util.GetResolutionFromScaleDpi = GetResolutionFromScaleDpi;
L.Util.NormalizeScale = NormalizeScale;
L.supermap.Util.NormalizeScale = NormalizeScale;
L.Util.transform = transform;
L.supermap.Util.transform = transform;
// L.Proj4Leaflet
L.Proj = L.Proj || {};
L.supermap.Proj = L.supermap.Proj || {};
L.Proj.CRS = crs;
L.supermap.Proj.crs = crs;
L.supermap.Proj.CRS = CRS;
// core/NonEarthCRS
L.Projection = {};
L.supermap.Projection = L.supermap.Projection || {};
L.Projection.NonProjection = nonProjection;
L.supermap.Projection.nonProjection = nonProjection;
L.supermap.Projection.NonProjection = NonProjection;
L.supermap.CRS = L.supermap.CRS || {};
L.CRS.NonEarthCRS = nonEarthCRS;
L.supermap.CRS.NonEarthCRS = NonEarthCRS;
L.supermap.CRS.nonEarthCRS = nonEarthCRS;
// core/ExtendsCRS
L.CRS.BaiduCRS = BaiduCRS;
L.supermap.CRS.BaiduCRS = BaiduCRS;
L.CRS.TianDiTu_WGS84CRS = TianDiTu_WGS84CRS;
L.supermap.CRS.TianDiTu_WGS84CRS = TianDiTu_WGS84CRS;
L.CRS.TianDiTu_MercatorCRS = TianDiTu_MercatorCRS;
L.supermap.CRS.TianDiTu_MercatorCRS = TianDiTu_MercatorCRS;
L.CRS.TianDiTu_Mercator = TianDiTu_MercatorCRS;
L.supermap.CRS.TianDiTu_Mercator = TianDiTu_MercatorCRS;
L.CRS.TianDiTu_WGS84 = TianDiTu_WGS84CRS;
L.supermap.CRS.TianDiTu_WGS84 = TianDiTu_WGS84CRS;
L.CRS.Baidu = BaiduCRS;
L.supermap.CRS.Baidu = BaiduCRS;
L.supermap.CommontypesConversion = CommontypesConversion;
// components
L.supermap.components.clientComputationLayer = clientComputationLayer;
L.supermap.Components.ClientComputationLayer = ClientComputationLayer;
L.supermap.components.clientComputation = clientComputationView;
L.supermap.Components.ClientComputation = ClientComputationView;
L.supermap.components.clientComputationViewModel = clientComputationViewModel;
L.supermap.Components.ClientComputationViewModel = ClientComputationViewModel;
L.supermap.components.geoJSONLayerWithName = geoJSONLayerWithName;
L.supermap.Components.GeoJsonLayersDataModel = GeoJsonLayersDataModel;
L.supermap.components.GeoJSONLayerWithName = GeoJSONLayerWithName;
L.supermap.Components.GeoJSONLayerWithName = GeoJSONLayerWithName;
L.supermap.components.dataFlow = dataFlowView;
L.supermap.Components.DataFlow = DataFlowView;
L.supermap.components.dataFlowViewModel = dataFlowViewModel;
L.supermap.Components.DataFlowViewModel = DataFlowViewModel;
L.supermap.components.dataServiceQuery = dataServiceQueryView;
L.supermap.Components.DataServiceQuery = DataServiceQueryView;
L.supermap.components.dataServiceQueryViewModel = dataServiceQueryViewModel;
L.supermap.Components.DataServiceQueryViewModel = DataServiceQueryViewModel;
L.supermap.components.DistributedAnalysisModel = DistributedAnalysisModel;
L.supermap.Components.DistributedAnalysisModel = DistributedAnalysisModel;
L.supermap.components.distributedAnalysis = distributedAnalysisView;
L.supermap.Components.DistributedAnalysis = DistributedAnalysisView;
L.supermap.components.distributedAnalysisViewModel = distributedAnalysisViewModel;
L.supermap.Components.DistributedAnalysisViewModel = DistributedAnalysisViewModel;
L.supermap.components.openFile = openFileView;
L.supermap.Components.OpenFile = OpenFileView;
L.supermap.components.openFileViewModel = openFileViewModel;
L.supermap.Components.OpenFileViewModel = OpenFileViewModel;
L.supermap.components.search = searchView;
L.supermap.Components.Search = SearchView;
L.supermap.components.searchViewModel = searchViewModel;
L.supermap.Components.SearchViewModel = SearchViewModel;
L.supermap.components.componentsViewBase = componentsViewBase;
L.supermap.Components.ComponentsViewBase = ComponentsViewBase;
// control
L.supermap.control.changeTileVersion = changeTileVersion;
L.supermap.control.ChangeTileVersion = ChangeTileVersion;
L.supermap.control.logo = logo;
L.supermap.control.Logo = Logo;
// mapping
L.supermap.baiduTileLayer = baiduTileLayer;
L.supermap.BaiduTileLayer = BaiduTileLayer;
L.supermap.cloudTileLayer = cloudTileLayer;
L.supermap.CloudTileLayer = CloudTileLayer;
L.supermap.imageMapLayer = imageMapLayer;
L.supermap.ImageMapLayer = ImageMapLayer;
L.supermap.imageTileLayer = imageTileLayer;
L.supermap.ImageTileLayer = ImageTileLayer;
L.supermap.tiandituTileLayer = tiandituTileLayer;
L.supermap.TiandituTileLayer = TiandituTileLayer;
L.supermap.tiledMapLayer = tiledMapLayer;
L.supermap.TiledMapLayer = TiledMapLayer;
L.supermap.wmtsLayer = wmtsLayer;
L.supermap.WMTSLayer = WMTSLayer;
L.supermap.webmap = webMap;
L.supermap.WebMap = WebMap;
// overlay
L.supermap.CartoCSSToLeaflet = CartoCSSToLeaflet;
L.supermap.DefaultStyle = DefaultStyle;
L.supermap.CartoStyleMap = CartoStyleMap;
L.supermap.ServerStyleMap = ServerStyleMap;
L.supermap.CompOpMap = CompOpMap;
L.supermap.circleStyle = circleStyle;
L.supermap.CircleStyle = CircleStyle;
L.supermap.cloverStyle = cloverStyle;
L.supermap.CloverStyle = CloverStyle;
L.supermap.graphic = graphic;
L.supermap.Graphic = Graphic;
L.supermap.imageStyle = imageStyle;
L.supermap.ImageStyle = ImageStyle;
L.supermap.themeFeature = themeFeature;
L.supermap.ThemeFeature = ThemeFeature;
L.supermap.dataFlowLayer = dataFlowLayer;
L.supermap.DataFlowLayer = DataFlowLayer;
L.supermap.echartsLayer = echartsLayer;
L.supermap.EchartsLayer = EchartsLayer;
L.supermap.graphicLayer = graphicLayer;
L.supermap.GraphicLayer = GraphicLayer;
L.supermap.graphThemeLayer = graphThemeLayer;
L.supermap.GraphThemeLayer = GraphThemeLayer;
L.supermap.heatMapFeature = heatMapFeature;
L.supermap.HeatMapFeature = HeatMapFeature;
L.supermap.heatMapLayer = heatMapLayer;
L.supermap.HeatMapLayer = HeatMapLayer;
L.supermap.labelThemeLayer = labelThemeLayer;
L.supermap.LabelThemeLayer = LabelThemeLayer;
L.supermap.mapVLayer = mapVLayer;
L.supermap.MapVLayer = MapVLayer;
L.supermap.rangeThemeLayer = rangeThemeLayer;
L.supermap.RangeThemeLayer = RangeThemeLayer;
L.supermap.rankSymbolThemeLayer = rankSymbolThemeLayer;
L.supermap.RankSymbolThemeLayer = RankSymbolThemeLayer;
L.supermap.tiledVectorLayer = tiledVectorLayer;
L.supermap.tileVectorLayer = tileVectorLayer;
L.supermap.TileVectorLayer = TileVectorLayer;
L.supermap.turfLayer = turfLayer;
L.supermap.TurfLayer = TurfLayer;
L.supermap.unicodeMarker = unicodeMarker;
L.supermap.UnicodeMarker = UnicodeMarker;
L.supermap.uniqueThemeLayer = uniqueThemeLayer;
L.supermap.UniqueThemeLayer = UniqueThemeLayer;
L.supermap.VectorTileFormat = VectorTileFormat;
L.supermap.addressMatchService = addressMatchService;
L.supermap.AddressMatchService = AddressMatchService;
L.supermap.chartService = chartService;
L.supermap.ChartService = ChartService;
L.supermap.dataFlowService = dataFlowService;
L.supermap.DataFlowService = DataFlowService;
L.supermap.datasetService = datasetService;
L.supermap.DatasetService = DatasetService;
L.supermap.datasourceService = datasourceService;
L.supermap.DatasourceService = DatasourceService;
L.supermap.featureService = featureService;
L.supermap.FeatureService = FeatureService;
L.supermap.fieldService = fieldService;
L.supermap.FieldService = FieldService;
L.supermap.geoprocessingService = geoprocessingService;
L.supermap.GeoprocessingService = GeoprocessingService;
L.supermap.gridCellInfosService = gridCellInfosService;
L.supermap.GridCellInfosService = GridCellInfosService;
L.supermap.imageCollectionService = imageCollectionService;
L.supermap.ImageCollectionService = ImageCollectionService;
L.supermap.imageService = imageService;
L.supermap.ImageService = ImageService;
L.supermap.layerInfoService = layerInfoService;
L.supermap.LayerInfoService = LayerInfoService;
L.supermap.mapService = mapService;
L.supermap.MapService = MapService;
L.supermap.measureService = measureService;
L.supermap.MeasureService = MeasureService;
L.supermap.networkAnalyst3DService = networkAnalyst3DService;
L.supermap.NetworkAnalyst3DService = NetworkAnalyst3DService;
L.supermap.networkAnalystService = networkAnalystService;
L.supermap.NetworkAnalystService = NetworkAnalystService;
L.supermap.processingService = processingService;
L.supermap.ProcessingService = ProcessingService;
L.supermap.queryService = queryService;
L.supermap.QueryService = QueryService;
L.supermap.ServiceBase = ServiceBase;
L.supermap.spatialAnalystService = spatialAnalystService;
L.supermap.SpatialAnalystService = SpatialAnalystService;
L.supermap.themeService = themeService;
L.supermap.ThemeService = ThemeService;
L.supermap.trafficTransferAnalystService = trafficTransferAnalystService;
L.supermap.TrafficTransferAnalystService = TrafficTransferAnalystService;
L.supermap.webPrintingJobService = webPrintingJobService;
L.supermap.WebPrintingJobService = WebPrintingJobService;

// 挂载common中SuperMap上所有的内容
L.supermap.Lang = Lang;
L.supermap.i18n = L.supermap.Lang.i18n;
// CommonUtil
L.supermap.CommonUtil = CommonUtil || {};
L.supermap.Browser = Browser;
L.supermap.INCHES_PER_UNIT = INCHES_PER_UNIT;
L.supermap.METERS_PER_INCH = METERS_PER_INCH;
L.supermap.DOTS_PER_INCH = DOTS_PER_INCH;
L.supermap.IS_GECKO = IS_GECKO;

// FetchRequest
L.supermap.setCORS = setCORS;
L.supermap.isCORS = isCORS;
L.supermap.setRequestTimeout = setRequestTimeout;
L.supermap.getRequestTimeout = getRequestTimeout;
L.supermap.FetchRequest = FetchRequest;

// commontypes
L.supermap.Event = Event;
L.supermap.Bounds = Bounds;
L.supermap.Credential = Credential;
L.supermap.Events = Events;
L.supermap.Feature = Feature;
L.supermap.Geometry = Geometry;
L.supermap.LonLat = LonLat;
L.supermap.Pixel = Pixel;
L.supermap.Size = Size;
L.supermap.Feature.Vector = GeometryVector;
L.supermap.Geometry.Collection = Collection;
L.supermap.Geometry.Curve = Curve;
L.supermap.Geometry.GeoText = GeoText;
L.supermap.Geometry.LinearRing = LinearRing;
L.supermap.Geometry.LineString = LineString;
L.supermap.Geometry.MultiLineString = MultiLineString;
L.supermap.Geometry.MultiPoint = MultiPoint;
L.supermap.Geometry.MultiPolygon = MultiPolygon;
L.supermap.Geometry.Point = GeometryPoint;
L.supermap.Geometry.Polygon = Polygon;
L.supermap.Geometry.Rectangle = Rectangle;
// Components
L.supermap.Components.Chart = Chart;
L.supermap.Components.ChartViewModel = ChartViewModel;
L.supermap.Components.MessageBox = MessageBox;
L.supermap.Components.AttributesPopContainer = AttributesPopContainer;
L.supermap.Components.CityTabsPage = CityTabsPage;
L.supermap.Components.CommonContainer = CommonContainer;
L.supermap.Components.DropDownBox = DropDownBox;
L.supermap.Components.IndexTabsPageContainer = IndexTabsPageContainer;
L.supermap.Components.NavTabsPage = NavTabsPage;
L.supermap.Components.PaginationContainer = PaginationContainer;
L.supermap.Components.PopContainer = PopContainer;
L.supermap.Components.Select = Select;
L.supermap.Components.TemplateBase = TemplateBase;
L.supermap.Components.FileReaderUtil = FileReaderUtil;
// control
L.supermap.TimeControlBase = TimeControlBase;
L.supermap.TimeFlowControl = TimeFlowControl;
// Format
L.supermap.Format = L.supermap.Format || Format;
L.supermap.Format.GeoJSON = GeoJSON;
L.supermap.Format.JSON = JSONFormat;
L.supermap.Format.WKT = WKT;
// iManager
L.supermap.iManager = IManager;
L.supermap.iManagerCreateNodeParam = IManagerCreateNodeParam;
L.supermap.iManagerServiceBase = IManagerServiceBase;
// iPortal
L.supermap.iPortal = IPortal;
L.supermap.iPortalAddDataParam = IPortalAddDataParam;
L.supermap.iPortalAddResourceParam = IPortalAddResourceParam;
L.supermap.iPortalDataConnectionInfoParam = IPortalDataConnectionInfoParam;
L.supermap.iPortalDataMetaInfoParam = IPortalDataMetaInfoParam;
L.supermap.iPortalDataStoreInfoParam = IPortalDataStoreInfoParam;
L.supermap.iPortalQueryParam = IPortalQueryParam;
L.supermap.iPortalQueryResult = IPortalQueryResult;
L.supermap.iPortalRegisterServiceParam = IPortalRegisterServiceParam;
L.supermap.iPortalResource = IPortalResource;
L.supermap.iPortalServiceBase = IPortalServiceBase;
L.supermap.iPortalShareEntity = IPortalShareEntity;
L.supermap.iPortalShareParam = IPortalShareParam;
L.supermap.iPortalUser = IPortalUser;
// iServer
L.supermap.AggregationParameter = AggregationParameter;
L.supermap.AreaSolarRadiationParameters = AreaSolarRadiationParameters;
L.supermap.BucketAggParameter = BucketAggParameter;
L.supermap.BufferAnalystParameters = BufferAnalystParameters;
L.supermap.BufferDistance = BufferDistance;
L.supermap.BuffersAnalystJobsParameter = BuffersAnalystJobsParameter;
L.supermap.BufferSetting = BufferSetting;
L.supermap.BurstPipelineAnalystParameters = BurstPipelineAnalystParameters;
L.supermap.ChartQueryFilterParameter = ChartQueryFilterParameter;
L.supermap.ChartQueryParameters = ChartQueryParameters;
L.supermap.ClipParameter = ClipParameter;
L.supermap.ColorDictionary = ColorDictionary;
L.supermap.CommonServiceBase = CommonServiceBase;
L.supermap.ComputeWeightMatrixParameters = ComputeWeightMatrixParameters;
L.supermap.CreateDatasetParameters = CreateDatasetParameters;
L.supermap.DataReturnOption = DataReturnOption;
L.supermap.DatasetBufferAnalystParameters = DatasetBufferAnalystParameters;
L.supermap.DatasetInfo = DatasetInfo;
L.supermap.DatasetOverlayAnalystParameters = DatasetOverlayAnalystParameters;
L.supermap.DatasetSurfaceAnalystParameters = DatasetSurfaceAnalystParameters;
L.supermap.DatasetThiessenAnalystParameters = DatasetThiessenAnalystParameters;
L.supermap.DatasourceConnectionInfo = DatasourceConnectionInfo;
L.supermap.DensityKernelAnalystParameters = DensityKernelAnalystParameters;
L.supermap.EditFeaturesParameters = EditFeaturesParameters;
L.supermap.FacilityAnalyst3DParameters = FacilityAnalyst3DParameters;
L.supermap.FacilityAnalystSinks3DParameters = FacilityAnalystSinks3DParameters;
L.supermap.FacilityAnalystSources3DParameters = FacilityAnalystSources3DParameters;
L.supermap.FacilityAnalystStreamParameters = FacilityAnalystStreamParameters;
L.supermap.FacilityAnalystTracedown3DParameters = FacilityAnalystTracedown3DParameters;
L.supermap.FacilityAnalystTraceup3DParameters = FacilityAnalystTraceup3DParameters;
L.supermap.FacilityAnalystUpstream3DParameters = FacilityAnalystUpstream3DParameters;
L.supermap.FieldParameters = FieldParameters;
L.supermap.FieldsFilter = FieldsFilter;
L.supermap.FieldStatisticsParameters = FieldStatisticsParameters;
L.supermap.FilterParameter = FilterParameter;
L.supermap.FindClosestFacilitiesParameters = FindClosestFacilitiesParameters;
L.supermap.FindLocationParameters = FindLocationParameters;
L.supermap.FindMTSPPathsParameters = FindMTSPPathsParameters;
L.supermap.FindPathParameters = FindPathParameters;
L.supermap.FindServiceAreasParameters = FindServiceAreasParameters;
L.supermap.FindTSPPathsParameters = FindTSPPathsParameters;
L.supermap.GenerateSpatialDataParameters = GenerateSpatialDataParameters;
L.supermap.GeoCodingParameter = GeoCodingParameter;
L.supermap.GeoDecodingParameter = GeoDecodingParameter;
L.supermap.GeoHashGridAggParameter = GeoHashGridAggParameter;
L.supermap.GeometryBufferAnalystParameters = GeometryBufferAnalystParameters;
L.supermap.GeometryOverlayAnalystParameters = GeometryOverlayAnalystParameters;
L.supermap.GeometrySurfaceAnalystParameters = GeometrySurfaceAnalystParameters;
L.supermap.GeometryThiessenAnalystParameters = GeometryThiessenAnalystParameters;
L.supermap.GeoRelationAnalystParameters = GeoRelationAnalystParameters;
L.supermap.GetFeaturesByBoundsParameters = GetFeaturesByBoundsParameters;
L.supermap.GetFeaturesByBufferParameters = GetFeaturesByBufferParameters;
L.supermap.GetFeaturesByGeometryParameters = GetFeaturesByGeometryParameters;
L.supermap.GetFeaturesByIDsParameters = GetFeaturesByIDsParameters;
L.supermap.GetFeaturesBySQLParameters = GetFeaturesBySQLParameters;
L.supermap.GetFeaturesParametersBase = GetFeaturesParametersBase;
L.supermap.GetFeaturesServiceBase = GetFeaturesServiceBase;
L.supermap.GetGridCellInfosParameters = GetGridCellInfosParameters;
L.supermap.Grid = Grid;
L.supermap.HillshadeParameter = HillshadeParameter;
L.supermap.Image = UGCImage;
L.supermap.ImageGFAspect = ImageGFAspect;
L.supermap.ImageGFHillShade = ImageGFHillShade;
L.supermap.ImageGFOrtho = ImageGFOrtho;
L.supermap.ImageGFSlope = ImageGFSlope;
L.supermap.ImageRenderingRule = ImageRenderingRule;
L.supermap.ImageSearchParameter = ImageSearchParameter;
L.supermap.ImageStretchOption = ImageStretchOption;
L.supermap.InterpolationAnalystParameters = InterpolationAnalystParameters;
L.supermap.InterpolationDensityAnalystParameters = InterpolationDensityAnalystParameters;
L.supermap.InterpolationIDWAnalystParameters = InterpolationIDWAnalystParameters;
L.supermap.InterpolationKrigingAnalystParameters = InterpolationKrigingAnalystParameters;
L.supermap.InterpolationRBFAnalystParameters = InterpolationRBFAnalystParameters;
L.supermap.JoinItem = JoinItem;
L.supermap.KernelDensityJobParameter = KernelDensityJobParameter;
L.supermap.LabelImageCell = LabelImageCell;
L.supermap.LabelMatrixCell = LabelMatrixCell;
L.supermap.LabelMixedTextStyle = LabelMixedTextStyle;
L.supermap.LabelSymbolCell = LabelSymbolCell;
L.supermap.LabelThemeCell = LabelThemeCell;
L.supermap.LayerStatus = LayerStatus;
L.supermap.LinkItem = LinkItem;
L.supermap.MappingParameters = MappingParameters;
L.supermap.MathExpressionAnalysisParameters = MathExpressionAnalysisParameters;
L.supermap.MeasureParameters = MeasureParameters;
L.supermap.MetricsAggParameter = MetricsAggParameter;
L.supermap.NDVIParameter = NDVIParameter;
L.supermap.NetworkAnalystServiceBase = NetworkAnalystServiceBase;
L.supermap.OutputSetting = OutputSetting;
L.supermap.OverlapDisplayedOptions = OverlapDisplayedOptions;
L.supermap.OverlayAnalystParameters = OverlayAnalystParameters;
L.supermap.OverlayGeoJobParameter = OverlayGeoJobParameter;
L.supermap.PointWithMeasure = PointWithMeasure;
L.supermap.ProcessingServiceBase = ProcessingServiceBase;
L.supermap.QueryByBoundsParameters = QueryByBoundsParameters;
L.supermap.QueryByDistanceParameters = QueryByDistanceParameters;
L.supermap.QueryByGeometryParameters = QueryByGeometryParameters;
L.supermap.QueryBySQLParameters = QueryBySQLParameters;
L.supermap.QueryParameters = QueryParameters;
L.supermap.RasterFunctionParameter = RasterFunctionParameter;
L.supermap.Route = Route;
L.supermap.RouteCalculateMeasureParameters = RouteCalculateMeasureParameters;
L.supermap.RouteLocatorParameters = RouteLocatorParameters;
L.supermap.ServerColor = ServerColor;
L.supermap.ServerFeature = ServerFeature;
L.supermap.ServerGeometry = ServerGeometry;
L.supermap.ServerStyle = ServerStyle;
L.supermap.ServerTextStyle = ServerTextStyle;
L.supermap.ServerTheme = ServerTheme;
L.supermap.SetDatasourceParameters = SetDatasourceParameters;
L.supermap.SetLayerInfoParameters = SetLayerInfoParameters;
L.supermap.SetLayersInfoParameters = SetLayersInfoParameters;
L.supermap.SetLayerStatusParameters = SetLayerStatusParameters;
L.supermap.SingleObjectQueryJobsParameter = SingleObjectQueryJobsParameter;
L.supermap.Sortby = Sortby;
L.supermap.SpatialAnalystBase = SpatialAnalystBase;
L.supermap.StopQueryParameters = StopQueryParameters;
L.supermap.SummaryAttributesJobsParameter = SummaryAttributesJobsParameter;
L.supermap.SummaryMeshJobParameter = SummaryMeshJobParameter;
L.supermap.SummaryRegionJobParameter = SummaryRegionJobParameter;
L.supermap.SupplyCenter = SupplyCenter;
L.supermap.SurfaceAnalystParameters = SurfaceAnalystParameters;
L.supermap.SurfaceAnalystParametersSetting = SurfaceAnalystParametersSetting;
L.supermap.TerrainCurvatureCalculationParameters = TerrainCurvatureCalculationParameters;
L.supermap.Theme = CommonTheme;
L.supermap.ThemeDotDensity = ThemeDotDensity;
L.supermap.ThemeFlow = ThemeFlow;
L.supermap.ThemeGraduatedSymbol = ThemeGraduatedSymbol;
L.supermap.ThemeGraduatedSymbolStyle = ThemeGraduatedSymbolStyle;
L.supermap.ThemeGraph = ThemeGraph;
L.supermap.ThemeGraphAxes = ThemeGraphAxes;
L.supermap.ThemeGraphItem = ThemeGraphItem;
L.supermap.ThemeGraphSize = ThemeGraphSize;
L.supermap.ThemeGraphText = ThemeGraphText;
L.supermap.ThemeGridRange = ThemeGridRange;
L.supermap.ThemeGridRangeItem = ThemeGridRangeItem;
L.supermap.ThemeGridUnique = ThemeGridUnique;
L.supermap.ThemeGridUniqueItem = ThemeGridUniqueItem;
L.supermap.ThemeLabel = ThemeLabel;
L.supermap.ThemeLabelAlongLine = ThemeLabelAlongLine;
L.supermap.ThemeLabelBackground = ThemeLabelBackground;
L.supermap.ThemeLabelItem = ThemeLabelItem;
L.supermap.ThemeLabelText = ThemeLabelText;
L.supermap.ThemeLabelUniqueItem = ThemeLabelUniqueItem;
L.supermap.ThemeMemoryData = ThemeMemoryData;
L.supermap.ThemeOffset = ThemeOffset;
L.supermap.ThemeParameters = ThemeParameters;
L.supermap.ThemeRange = ThemeRange;
L.supermap.ThemeRangeItem = ThemeRangeItem;
L.supermap.ThemeUnique = ThemeUnique;
L.supermap.ThemeUniqueItem = ThemeUniqueItem;
L.supermap.ThiessenAnalystParameters = ThiessenAnalystParameters;
L.supermap.TopologyValidatorJobsParameter = TopologyValidatorJobsParameter;
L.supermap.TransferLine = TransferLine;
L.supermap.TransferPathParameters = TransferPathParameters;
L.supermap.TransferSolutionParameters = TransferSolutionParameters;
L.supermap.TransportationAnalystParameter = TransportationAnalystParameter;
L.supermap.TransportationAnalystResultSetting = TransportationAnalystResultSetting;
L.supermap.UGCLayer = UGCLayer;
L.supermap.UGCMapLayer = UGCMapLayer;
L.supermap.UGCSubLayer = UGCSubLayer;
L.supermap.UpdateDatasetParameters = UpdateDatasetParameters;
L.supermap.UpdateEdgeWeightParameters = UpdateEdgeWeightParameters;
L.supermap.UpdateTurnNodeWeightParameters = UpdateTurnNodeWeightParameters;
L.supermap.Vector = Vector;
L.supermap.VectorClipJobsParameter = VectorClipJobsParameter;
L.supermap.WebPrintingJobContent = WebPrintingJobContent;
L.supermap.WebPrintingJobCustomItems = WebPrintingJobCustomItems;
L.supermap.WebPrintingJobExportOptions = WebPrintingJobExportOptions;
L.supermap.WebPrintingJobImage = WebPrintingJobImage;
L.supermap.WebPrintingJobLayers = WebPrintingJobLayers;
L.supermap.WebPrintingJobLayoutOptions = WebPrintingJobLayoutOptions;
L.supermap.WebPrintingJobLegendOptions = WebPrintingJobLegendOptions;
L.supermap.WebPrintingJobLittleMapOptions = WebPrintingJobLittleMapOptions;
L.supermap.WebPrintingJobNorthArrowOptions = WebPrintingJobNorthArrowOptions;
L.supermap.WebPrintingJobParameters = WebPrintingJobParameters;
L.supermap.WebPrintingJobScaleBarOptions = WebPrintingJobScaleBarOptions;
//Online
L.supermap.Online = Online;
L.supermap.OnlineData = OnlineData;
L.supermap.OnlineQueryDatasParameter = OnlineQueryDatasParameter;
L.supermap.ServiceStatus = ServiceStatus;
// 包含online中的DataItemType数据类型
L.supermap.DataItemType = DataItemType;
L.supermap.DataItemOrderBy = DataItemOrderBy;
L.supermap.FilterField = FilterField;
L.supermap.OnlineServiceBase = OnlineServiceBase;
// overlay
L.supermap.Feature = L.supermap.Feature || {};
L.supermap.Feature.Theme = FeatureTheme;
L.supermap.Feature.Theme.Bar = Bar;
L.supermap.Feature.Theme.Bar3D = Bar3D;
L.supermap.Feature.Theme.Circle = Circle;
L.supermap.Feature.Theme.Graph = Graph;
L.supermap.Feature.Theme.Line = Line;
L.supermap.Feature.Theme.Pie = Pie;
L.supermap.Feature.Theme.Point = OverlayPoint;
L.supermap.Feature.Theme.RankSymbol = RankSymbol;
L.supermap.Feature.Theme.Ring = Ring;
L.supermap.Feature.Theme.ThemeVector = ThemeVector;
L.supermap.Feature.ShapeParameters = ShapeParameters;
L.supermap.Feature.ShapeParameters.Circle = FeatureCircle;
L.supermap.Feature.ShapeParameters.Image = Image;
L.supermap.Feature.ShapeParameters.Label = Label;
L.supermap.Feature.ShapeParameters.Line = FeatureLine;
L.supermap.Feature.ShapeParameters.Point = Point;
L.supermap.Feature.ShapeParameters.Polygon = FeaturePolygon;
L.supermap.Feature.ShapeParameters.Rectangle = FeatureRectangle;
L.supermap.Feature.ShapeParameters.Sector = Sector;
L.supermap.Feature.ShapeFactory = ShapeFactory;
// LevelRenderer
L.supermap.LevelRenderer = LevelRenderer;

// security
L.supermap.KeyServiceParameter = KeyServiceParameter;
L.supermap.SecurityManager = SecurityManager;
L.supermap.ServerInfo = ServerInfo;
L.supermap.TokenServiceParameter = TokenServiceParameter;
// style
L.supermap.ThemeStyle = ThemeStyle;
L.supermap.CartoCSS = CartoCSS;
// thirdparty
// L.supermap.BinaryClassification = BinaryClassification;
// L.supermap.LandcoverClassification = LandcoverClassification;
// L.supermap.ObjectDetection = ObjectDetection;
// L.supermap.WebMachineLearning = WebMachineLearning;
L.supermap.ElasticSearch = ElasticSearch;
// util
L.supermap.ArrayStatistic = ArrayStatistic;
L.supermap.ColorsPickerUtil = ColorsPickerUtil;

// REST
L.supermap.DataFormat = DataFormat;
L.supermap.ServerType = ServerType;
L.supermap.GeometryType = GeometryType;
L.supermap.QueryOption = QueryOption;
L.supermap.JoinType = JoinType;
L.supermap.SpatialQueryMode = SpatialQueryMode;
L.supermap.SpatialRelationType = SpatialRelationType;
L.supermap.MeasureMode = MeasureMode;
L.supermap.Unit = Unit;
L.supermap.BufferRadiusUnit = BufferRadiusUnit;
L.supermap.EngineType = EngineType;
L.supermap.ThemeGraphTextFormat = ThemeGraphTextFormat;
L.supermap.ThemeGraphType = ThemeGraphType;
L.supermap.GraphAxesTextDisplayMode = GraphAxesTextDisplayMode;
L.supermap.GraduatedMode = GraduatedMode;
L.supermap.RangeMode = RangeMode;
L.supermap.ThemeType = ThemeType;
L.supermap.ColorGradientType = ColorGradientType;
L.supermap.TextAlignment = TextAlignment;
L.supermap.FillGradientMode = FillGradientMode;
L.supermap.AlongLineDirection = AlongLineDirection;
L.supermap.LabelBackShape = LabelBackShape;
L.supermap.LabelOverLengthMode = LabelOverLengthMode;
L.supermap.DirectionType = DirectionType;
L.supermap.OverlayOperationType = OverlayOperationType;
L.supermap.OutputType = OutputType;
L.supermap.SideType = SideType;
L.supermap.SupplyCenterType = SupplyCenterType;
L.supermap.TurnType = TurnType;
L.supermap.BufferEndType = BufferEndType;
L.supermap.SmoothMethod = SmoothMethod;
L.supermap.SurfaceAnalystMethod = SurfaceAnalystMethod;
L.supermap.DataReturnMode = DataReturnMode;
L.supermap.EditType = EditType;
L.supermap.TransferTactic = TransferTactic;
L.supermap.TransferPreference = TransferPreference;
L.supermap.GridType = GridType;
L.supermap.ColorSpaceType = ColorSpaceType;
L.supermap.LayerType = LayerType;
L.supermap.UGCLayerType = UGCLayerType;
L.supermap.StatisticMode = StatisticMode;
L.supermap.PixelFormat = PixelFormat;
L.supermap.SearchMode = SearchMode;
L.supermap.InterpolationAlgorithmType = InterpolationAlgorithmType;
L.supermap.VariogramMode = VariogramMode;
L.supermap.Exponent = Exponent;
L.supermap.ClientType = ClientType;
L.supermap.ChartType = ChartType;
L.supermap.ClipAnalystMode = ClipAnalystMode;
L.supermap.AnalystAreaUnit = AnalystAreaUnit;
L.supermap.AnalystSizeUnit = AnalystSizeUnit;
L.supermap.StatisticAnalystMode = StatisticAnalystMode;
L.supermap.SummaryType = SummaryType;
L.supermap.TopologyValidatorRule = TopologyValidatorRule;
L.supermap.BucketAggType = BucketAggType;
L.supermap.MetricsAggType = MetricsAggType;
L.supermap.GetFeatureMode = GetFeatureMode;
L.supermap.RasterFunctionType = RasterFunctionType;
L.supermap.ResourceType = ResourceType;
L.supermap.OrderBy = OrderBy;
L.supermap.OrderType = OrderType;
L.supermap.SearchType = SearchType;
L.supermap.AggregationTypes = AggregationTypes;
L.supermap.PermissionType = PermissionType;
L.supermap.EntityType = EntityType;
L.supermap.WebExportFormatType = WebExportFormatType;
L.supermap.WebScaleOrientationType = WebScaleOrientationType;
L.supermap.WebScaleType = WebScaleType;
L.supermap.WebScaleUnit = WebScaleUnit;

export {
  OpenFileView,
  openFileView,
  OpenFileViewModel,
  openFileViewModel,
  SearchView,
  searchView,
  SearchViewModel,
  searchViewModel,
  componentsViewBase,
  ComponentsViewBase,
  DataFlowView,
  dataFlowView,
  dataFlowViewModel,
  DataFlowViewModel,
  clientComputationView,
  ClientComputationView,
  clientComputationViewModel,
  ClientComputationViewModel,
  ClientComputationLayer,
  clientComputationLayer,
  GeoJSONLayerWithName,
  geoJSONLayerWithName,
  GeoJsonLayersDataModel,
  GeoJsonLayerDataModel,
  DistributedAnalysisView,
  distributedAnalysisView,
  DistributedAnalysisViewModel,
  distributedAnalysisViewModel,
  DataServiceQueryView,
  dataServiceQueryView,
  DataServiceQueryViewModel,
  dataServiceQueryViewModel
};

export { Logo, logo, ChangeTileVersion, changeTileVersion };
export {
  CommontypesConversion,
  BaiduCRS,
  TianDiTu_WGS84CRS,
  TianDiTu_MercatorCRS,
  NonProjection,
  nonProjection,
  NonEarthCRS,
  nonEarthCRS,
  CRS,
  crs,
  toGeoJSON,
  toSuperMapGeometry,
  getMeterPerMapUnit,
  resolutionToScale,
  scaleToResolution,
  GetResolutionFromScaleDpi,
  NormalizeScale
};
export {
  BaiduTileLayer,
  baiduTileLayer,
  CloudTileLayer,
  cloudTileLayer,
  ImageMapLayer,
  imageMapLayer,
  TiandituTileLayer,
  tiandituTileLayer,
  TiledMapLayer,
  tiledMapLayer,
  WMTSLayer,
  wmtsLayer,
  WebMap,
  webMap,
  ImageTileLayer,
  imageTileLayer
};
export {
  DataFlowLayer,
  dataFlowLayer,
  EchartsLayer,
  echartsLayer,
  LeafletMapCoordSys,
  GraphicLayer,
  graphicLayer,
  GraphThemeLayer,
  graphThemeLayer,
  heatMapFeature,
  HeatMapFeature,
  heatMapLayer,
  HeatMapLayer,
  LabelThemeLayer,
  labelThemeLayer,
  MapVLayer,
  mapVLayer,
  RangeThemeLayer,
  rangeThemeLayer,
  RankSymbolThemeLayer,
  rankSymbolThemeLayer,
  TileVectorLayer,
  tiledVectorLayer,
  tileVectorLayer,
  TurfLayer,
  turfLayer,
  UnicodeMarker,
  unicodeMarker,
  UniqueThemeLayer,
  uniqueThemeLayer,
  VectorTileFormat,
  CartoCSSToLeaflet,
  DefaultStyle,
  CartoStyleMap,
  ServerStyleMap,
  CompOpMap,
  ImageStyle,
  imageStyle,
  CircleStyle,
  circleStyle,
  Graphic,
  graphic,
  CloverStyle,
  cloverStyle,
  MapVRenderer,
  GeoFeatureThemeLayer,
  ThemeFeature,
  themeFeature,
  ThemeLayer,
  CanvasRenderer,
  LineSymbolizer,
  PointSymbolizer,
  RegionSymbolizer,
  SVGRenderer,
  Symbolizer,
  PolyBase,
  TextSymbolizer,
  VectorFeatureType,
  VectorGrid,
  VectorTile,
  VectorTileJSON,
  VectorTilePBF
};
export {
  AddressMatchService,
  addressMatchService,
  ChartService,
  chartService,
  DataFlowService,
  dataFlowService,
  DatasetService,
  datasetService,
  DatasourceService,
  datasourceService,
  FeatureService,
  featureService,
  FieldService,
  fieldService,
  geoprocessingService,
  GeoprocessingService,
  GridCellInfosService,
  gridCellInfosService,
  LayerInfoService,
  layerInfoService,
  MapService,
  mapService,
  MeasureService,
  measureService,
  NetworkAnalyst3DService,
  networkAnalyst3DService,
  NetworkAnalystService,
  networkAnalystService,
  ProcessingService,
  processingService,
  QueryService,
  queryService,
  ServiceBase,
  SpatialAnalystService,
  spatialAnalystService,
  ThemeService,
  themeService,
  TrafficTransferAnalystService,
  trafficTransferAnalystService,
  WebPrintingJobService,
  webPrintingJobService,
  imageCollectionService,
  ImageCollectionService,
  imageService,
  ImageService
};

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
  Graph,
  Line,
  Pie,
  OverlayPoint,
  RankSymbol,
  Ring,
  ThemeVector,
  ShapeFactory,
  ShapeParameters,
  FeatureCircle,
  Image,
  Label,
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
  //lang
  Lang
};
