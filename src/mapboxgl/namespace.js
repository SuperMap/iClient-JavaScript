/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Logo } from './control';
import { Util } from './core';
import {
  Graph,
  Label,
  MapvLayer,
  RangeTheme3DLayer,
  Range,
  RankSymbol,
  UniqueTheme3DLayer,
  Unique,
  GraphicLayer,
  ThreeLayer,
  HeatMapLayer,
  DeckglLayer,
  GraticuleLayer,
  Graphic,
  MapvDataSet,
  getDefaultVectorTileStyle,
  setBackground,
  setPaintProperty,
  GeoFeature,
  Theme3DLayer,
  ThemeFeature,
  ThemeLayer,
  Transform
} from './overlay';
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
  NetworkAnalystService,
  NetworkAnalyst3DService,
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

import { WebMap } from './mapping';
import mapboxgl from 'mapbox-gl';

mapboxgl.supermap = mapboxgl.supermap || {};
mapboxgl.supermap.map = mapboxgl.supermap.map || {};

mapboxgl.supermap.LogoControl = Logo;
mapboxgl.supermap.Util = Util;
mapboxgl.supermap.WebMap = WebMap;
mapboxgl.supermap.Graphic = Graphic;
mapboxgl.supermap.map.getDefaultVectorTileStyle = getDefaultVectorTileStyle;
mapboxgl.supermap.map.setBackground = setBackground;
mapboxgl.supermap.map.setPaintProperty = setPaintProperty;
mapboxgl.supermap.MapvDataSet = MapvDataSet;
mapboxgl.supermap.GeoFeatureThemeLayer = GeoFeature;
mapboxgl.supermap.Theme3DLayer = Theme3DLayer;
mapboxgl.supermap.ThemeFeature = ThemeFeature;
mapboxgl.supermap.ThemeLayer = ThemeLayer;
mapboxgl.supermap.Transform = Transform;
mapboxgl.supermap.DeckglLayer = DeckglLayer;
mapboxgl.supermap.GraphicLayer = GraphicLayer;
mapboxgl.supermap.GraphThemeLayer = Graph;
mapboxgl.supermap.GraticuleLayer = GraticuleLayer;
mapboxgl.supermap.HeatMapLayer = HeatMapLayer;
mapboxgl.supermap.LabelThemeLayer = Label;
mapboxgl.supermap.MapvLayer = MapvLayer;
mapboxgl.supermap.RangeTheme3DLayer = RangeTheme3DLayer;
mapboxgl.supermap.RangeThemeLayer = Range;
mapboxgl.supermap.RankSymbolThemeLayer = RankSymbol;
mapboxgl.supermap.ThreeLayer = ThreeLayer;
mapboxgl.supermap.UniqueTheme3DLayer = UniqueTheme3DLayer;
mapboxgl.supermap.UniqueThemeLayer = Unique;
mapboxgl.supermap.AddressMatchService = AddressMatchService;
mapboxgl.supermap.ChartService = ChartService;
mapboxgl.supermap.DataFlowService = DataFlowService;
mapboxgl.supermap.DatasetService = DatasetService;
mapboxgl.supermap.DatasourceService = DatasourceService;
mapboxgl.supermap.FeatureService = FeatureService;
mapboxgl.supermap.FieldService = FieldService;
mapboxgl.supermap.GeoprocessingService = GeoprocessingService;
mapboxgl.supermap.GridCellInfosService = GridCellInfosService;
mapboxgl.supermap.ImageCollectionService = ImageCollectionService;
mapboxgl.supermap.ImageService = ImageService;
mapboxgl.supermap.LayerInfoService = LayerInfoService;
mapboxgl.supermap.MapService = MapService;
mapboxgl.supermap.MeasureService = MeasureService;
mapboxgl.supermap.NetworkAnalyst3DService = NetworkAnalyst3DService;
mapboxgl.supermap.NetworkAnalystService = NetworkAnalystService;
mapboxgl.supermap.ProcessingService = ProcessingService;
mapboxgl.supermap.QueryService = QueryService;
mapboxgl.supermap.ServiceBase = ServiceBase;
mapboxgl.supermap.SpatialAnalystService = SpatialAnalystService;
mapboxgl.supermap.ThemeService = ThemeService;
mapboxgl.supermap.TrafficTransferAnalystService = TrafficTransferAnalystService;
mapboxgl.supermap.WebPrintingJobService = WebPrintingJobService;

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
  WebPrintingService,
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
  FileReaderUtil,
  ChartView,
  ChartViewModel,
  FieldsFilter,
  ImageGFAspect,
  ImageGFHillShade,
  ImageGFOrtho,
  ImageGFSlope,
  ImageSearchParameter,
  ImageRenderingRule,
  Sortby,
  ImageStretchOption
} from '@supermap/iclient-common';
export * from './control';
export * from './core';
export * from './overlay';
export * from './services';
export * from './mapping';
